import  { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faChevronRight, faChevronLeft, faCamera, faCheck, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { uploadSingleFile } from "../../../../api/epks"; 
import http from "../../../../http-common"; 
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

export default function CreateEpkWizard({ isOpen, onClose }) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const user = useSelector((state) => state.user);

  // --- DYNAMIC ARRAYS FOR DROPDOWNS (Imported from EpkProductionDetailsEdit) ---
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: (currentYear + 5) - 1895 + 1 }, (_, i) => (currentYear + 5) - i);
  const movieGenre = [
    "Action", "Comedy", "Documentary", "Romance", "Horror", "Mystery", "Drama", "Western", "Science Fiction", 
    "Thriller", "Crime", "Animation", "Musical", "War", "Romantic Comedy", "Noir", "Disaster", "Dark Comedy", 
    "Historical Film", "Slasher", "Adventure", "Gangster", "Spy", "Fantasy", "Biographical", "Found Footage", 
    "Legal Drama", "Melodrama", "Superhero", "Slapstick", "Monster", "Historical Fiction", "Teen", "Apocalyptic", 
    "Post-Apocalyptic", "Psychological Thriller", "Stop Motion", "Sports", "Space Opera", "Mockumentary",
  ].sort();
  const languageType = ["English", "French", "Spanish"];
  const movieStatus = ["Preproduction", "Production", "Postproduction", "Completed", "Released"];
  const movieType = ["Movie", "Documentary", "TV Show", "Web Series"];
  const budgetRanges = [
    "0$ - 5,000$", "5,000$ - 10,000$", "10,000$ - 25,000$", "25,000$ - 50,000$", "50,000$ - 75,000$", 
    "75,000$ - 100,000$", "100,000$ - 150,000$", "150,000$ - 200,000$", "200,000$ - 300,000$", "300,000$ - 500,000$", 
    "500,000$ - 750,000$", "750,000$ - 1,000,000$", "1,000,000$ - 1,500,000$", "1,500,000$ - 2,000,000$", 
    "2,000,000$ - 3,000,000$", "3,000,000$ - 5,000,000$", "5,000,000$ - 7,500,000$", "7,500,000$ - 10,000,000$",
  ];

  // --- WIZARD STATE ---
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // --- FORM DATA (Pre-filled with defaults to pass database validation) ---
  const [formData, setFormData] = useState({
    title: "",
    production_type: "Movie",
    productionYear: currentYear.toString(),
    status: "Preproduction",
    logLine_short: "",
    genre: "Drama",
    language: "English",
    budget: "0$ - 5,000$",
  });

  // --- IMAGE UPLOAD STATE ---
  const [posterFile, setPosterFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  // Reset wizard when opened/closed
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setError("");
      setFormData({ 
        title: "", production_type: "Movie", productionYear: currentYear.toString(), status: "Preproduction",
        logLine_short: "", genre: "Drama", language: "English", budget: "0$ - 5,000$"
      });
      setPosterFile(null);
      setPreviewUrl(null);
    }
  }, [isOpen, currentYear]);

  if (!isOpen) return null;

  // --- HANDLERS ---
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError(""); // Clear errors when user types
  };

  const handleNext = () => {
    if (step === 1 && !formData.title.trim()) {
      setError(t("Please enter a project title."));
      return;
    }
    if (step === 2 && !formData.logLine_short.trim()) {
      setError(t("Please enter a short logline."));
      return;
    }
    setStep(prev => prev + 1);
  };

  const handleBack = () => setStep(prev => prev - 1);

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPosterFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!user || !user.token) {
      setError(t("Your session has expired or you are not logged in. Please log out and log back in."));
      return;
    }
    setIsSubmitting(true);
    setError("");

    try {
      let finalPosterKey = "";
      
      if (posterFile) {
        finalPosterKey = await uploadSingleFile(posterFile, user?.token);
      }

      const payload = {
        ...formData,
        film_maker: user?.id || user?._id, // Guarantee the owner ID is present
        image_details: finalPosterKey,
        reviews: [],
        crew: [],
        actors: [],
        banners: [],
        photo_albums: { posters: finalPosterKey ? [{ image: finalPosterKey, blur: false }] : [], stills: [], behind: [], premieres: [] },
        video_gallery: { trailers: [], behind: [], interviews: [], premieres: [] }
      };

      const response = await http.post("fepks", payload, {
        headers: { Authorization: `Bearer ${user?.token}` }
      });

      if (response.data && response.data.error) {
        throw new Error(response.data.error);
      }

      const newEpkId = response.data._id;
      
      if (!newEpkId) {
         throw new Error(t("Creation failed: Database did not return a valid ID."));
      }

      onClose();
      navigate(`/epk/${newEpkId}?edit=true`);

    } catch (err) {
      console.error("💥 FULL ERROR:", err);
      
      if (err.response && err.response.data) {
        console.error("💥 BACKEND SENT THIS DATA:", err.response.data);
      
        const backendMessage = err.response.data.message || err.response.data.error || JSON.stringify(err.response.data);
        
        if (err.response.status === 409) {
          setError(t("An EPK with this title already exists."));
        } else {
          setError(`${t("Server Error:")} ${backendMessage}`);
        }
      } else {
        setError(err.message || t("Failed to create EPK. Please try again."));
      }
      
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- STEP RENDERERS ---
  const renderStep1 = () => (
    <div className="tw-flex tw-flex-col tw-gap-6 tw-animate-fade-in">
      <div className="tw-flex tw-flex-col tw-gap-2">
        <label className="tw-text-[#FF43A7] tw-text-xs tw-font-bold tw-uppercase tw-tracking-widest">{t("Project Title")} *</label>
        <input 
          type="text" 
          value={formData.title} 
          onChange={(e) => handleChange("title", e.target.value)}
          placeholder={t("Enter your film's title...")}
          autoFocus
          className="tw-w-full tw-bg-[#1E0039] tw-border tw-border-[#5A3F49] tw-rounded-lg tw-px-4 tw-py-4 tw-text-white tw-text-lg tw-font-bold focus:tw-outline-none focus:tw-border-[#FF43A7] tw-transition-colors"
        />
      </div>
      
      <div className="tw-grid tw-grid-cols-2 tw-gap-4">
        <div className="tw-flex tw-flex-col tw-gap-2">
          <label className="tw-text-[#FF43A7] tw-text-[10px] tw-font-bold tw-uppercase tw-tracking-widest">{t("Format")} *</label>
          <select value={formData.production_type} onChange={(e) => handleChange("production_type", e.target.value)} className="tw-w-full tw-bg-[#1E0039] tw-border tw-border-[#5A3F49] tw-rounded-lg tw-px-3 tw-py-3 tw-text-white focus:tw-outline-none focus:tw-border-[#FF43A7] tw-appearance-none">
            {movieType.map(m => <option key={m} value={m}>{t(m)}</option>)}
          </select>
        </div>

        <div className="tw-flex tw-flex-col tw-gap-2">
          <label className="tw-text-[#FF43A7] tw-text-[10px] tw-font-bold tw-uppercase tw-tracking-widest">{t("Year")} *</label>
          <select value={formData.productionYear} onChange={(e) => handleChange("productionYear", e.target.value)} className="tw-w-full tw-bg-[#1E0039] tw-border tw-border-[#5A3F49] tw-rounded-lg tw-px-3 tw-py-3 tw-text-white focus:tw-outline-none focus:tw-border-[#FF43A7] tw-appearance-none">
            {years.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>

        <div className="tw-flex tw-flex-col tw-gap-2 tw-col-span-2">
          <label className="tw-text-[#FF43A7] tw-text-[10px] tw-font-bold tw-uppercase tw-tracking-widest">{t("Current Status")} *</label>
          <select value={formData.status} onChange={(e) => handleChange("status", e.target.value)} className="tw-w-full tw-bg-[#1E0039] tw-border tw-border-[#5A3F49] tw-rounded-lg tw-px-3 tw-py-3 tw-text-white focus:tw-outline-none focus:tw-border-[#FF43A7] tw-appearance-none">
            {movieStatus.map(s => <option key={s} value={s}>{t(s)}</option>)}
          </select>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="tw-flex tw-flex-col tw-gap-6 tw-animate-fade-in">
      <div className="tw-flex tw-flex-col tw-gap-2">
        <label className="tw-text-[#FF43A7] tw-text-xs tw-font-bold tw-uppercase tw-tracking-widest">{t("The Logline")} *</label>
        <p className="tw-text-[#E2BDC9] tw-text-[10px] tw-mb-1 tw-m-0">{t("Provide a one or two sentence summary of your project's plot.")}</p>
        <textarea 
          value={formData.logLine_short} 
          onChange={(e) => handleChange("logLine_short", e.target.value)}
          placeholder={t("When a former assassin is pulled back into the underworld...")}
          autoFocus
          className="tw-w-full tw-h-[100px] tw-bg-[#1E0039] tw-border tw-border-[#5A3F49] tw-rounded-lg tw-px-4 tw-py-3 tw-text-white tw-italic focus:tw-outline-none focus:tw-border-[#FF43A7] tw-transition-colors tw-resize-none custom-scrollbar"
        />
      </div>

      <div className="tw-grid tw-grid-cols-2 tw-gap-4">
        <div className="tw-flex tw-flex-col tw-gap-2 tw-col-span-2">
          <label className="tw-text-[#FF43A7] tw-text-[10px] tw-font-bold tw-uppercase tw-tracking-widest">{t("Primary Genre")} *</label>
          <select value={formData.genre} onChange={(e) => handleChange("genre", e.target.value)} className="tw-w-full tw-bg-[#1E0039] tw-border tw-border-[#5A3F49] tw-rounded-lg tw-px-3 tw-py-3 tw-text-white focus:tw-outline-none focus:tw-border-[#FF43A7] tw-appearance-none">
            {movieGenre.map(g => <option key={g} value={g}>{t(g)}</option>)}
          </select>
        </div>

        <div className="tw-flex tw-flex-col tw-gap-2">
          <label className="tw-text-[#FF43A7] tw-text-[10px] tw-font-bold tw-uppercase tw-tracking-widest">{t("Language")} *</label>
          <select value={formData.language} onChange={(e) => handleChange("language", e.target.value)} className="tw-w-full tw-bg-[#1E0039] tw-border tw-border-[#5A3F49] tw-rounded-lg tw-px-3 tw-py-3 tw-text-white focus:tw-outline-none focus:tw-border-[#FF43A7] tw-appearance-none">
            {languageType.map(l => <option key={l} value={l}>{t(l)}</option>)}
          </select>
        </div>

        <div className="tw-flex tw-flex-col tw-gap-2">
          <label className="tw-text-[#FF43A7] tw-text-[10px] tw-font-bold tw-uppercase tw-tracking-widest">{t("Budget")} *</label>
          <select value={formData.budget} onChange={(e) => handleChange("budget", e.target.value)} className="tw-w-full tw-bg-[#1E0039] tw-border tw-border-[#5A3F49] tw-rounded-lg tw-px-3 tw-py-3 tw-text-white focus:tw-outline-none focus:tw-border-[#FF43A7] tw-appearance-none">
            {budgetRanges.map(b => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="tw-flex tw-flex-col tw-gap-6 tw-animate-fade-in">
      <div className="tw-flex tw-flex-col tw-gap-2 tw-items-center">
        <label className="tw-text-[#FF43A7] tw-text-xs tw-font-bold tw-uppercase tw-tracking-widest">{t("Main Cover Poster (Optional)")}</label>
        <p className="tw-text-[#E2BDC9] tw-text-xs tw-mb-4 tw-m-0 tw-text-center">{t("You can skip this and upload it later in the editor.")}</p>
        
        <input 
          type="file" 
          accept="image/*" 
          ref={fileInputRef} 
          onChange={handleImageSelect} 
          className="tw-hidden" 
        />

        {!previewUrl ? (
          <div 
            onClick={() => fileInputRef.current.click()}
            className="tw-w-full tw-max-w-[240px] tw-aspect-[2/3] tw-bg-[#1E0039]/50 tw-rounded-xl tw-border-2 tw-border-dashed tw-border-[#FF43A7] tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-4 tw-transition-colors hover:tw-bg-[#1E0039]/80 tw-cursor-pointer"
          >
              <div className="tw-w-14 tw-h-14 tw-bg-[#371E51] tw-rounded-full tw-flex tw-items-center tw-justify-center">
                <FontAwesomeIcon icon={faCamera} className="tw-text-[#FF43A7] tw-text-xl" />
              </div>
              <span className="tw-font-bold tw-text-xs tw-text-[#F0DBFF] tw-uppercase">{t("Upload Poster")}</span>
          </div>
        ) : (
          <div className="tw-w-full tw-max-w-[240px] tw-aspect-[2/3] tw-relative tw-group tw-rounded-xl tw-overflow-hidden tw-border tw-border-[#5A3F49]">
            <img 
              src={previewUrl} 
              alt={t("Poster preview")} 
              className="tw-w-full tw-h-full tw-object-cover"
            />
            <div 
              onClick={() => fileInputRef.current.click()}
              className="tw-absolute tw-inset-0 tw-bg-black/60 tw-opacity-0 group-hover:tw-opacity-100 tw-transition-opacity tw-duration-300 tw-flex tw-flex-col tw-items-center tw-justify-center tw-cursor-pointer"
            >
              <FontAwesomeIcon icon={faCamera} className="tw-text-white tw-text-2xl tw-mb-2" />
              <span className="tw-font-bold tw-text-xs tw-text-white tw-uppercase">{t("Change Poster")}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="tw-fixed tw-inset-0 tw-z-[1050] tw-flex tw-items-center tw-justify-center tw-p-4">
      {/* Darkened Backdrop */}
      <div className="tw-absolute tw-inset-0 tw-bg-[#0a0014]/90 tw-backdrop-blur-sm" onClick={onClose} />

      {/* Main Modal Container */}
      <div className="tw-relative tw-w-full tw-max-w-[600px] tw-bg-[#280D41] tw-border tw-border-[#5A3F49]/40 tw-shadow-[0_20px_50px_rgba(0,0,0,0.8)] tw-rounded-2xl tw-overflow-hidden tw-flex tw-flex-col">
        
        {/* HEADER */}
        <div className="tw-px-8 tw-py-6 tw-border-b tw-border-[#5A3F49]/40 tw-bg-[#1E0039]/50 tw-flex tw-justify-between tw-items-center">
          <h3 className="tw-text-white tw-text-xl md:tw-text-[22px] tw-font-bold tw-m-0">
            {t("Create New EPK")}
          </h3>
          <button 
            onClick={onClose}
            className="tw-w-8 tw-h-8 tw-rounded-full tw-bg-transparent hover:tw-bg-white/10 tw-text-[#E2BDC9] hover:tw-text-white tw-transition-colors tw-border-none tw-cursor-pointer"
          >
            <FontAwesomeIcon icon={faXmark} className="tw-text-lg" />
          </button>
        </div>

        {/* PROGRESS BAR */}
        <div className="tw-w-full tw-bg-[#1E0039] tw-h-1.5">
          <div 
            className="tw-h-full tw-bg-[#FF43A7] tw-transition-all tw-duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        {/* BODY */}
        <div className="tw-px-8 tw-py-8 tw-min-h-[300px]">
          {error && (
             <div className="tw-w-full tw-bg-red-500/10 tw-border tw-border-red-500/50 tw-text-red-400 tw-px-4 tw-py-3 tw-rounded-lg tw-text-sm tw-mb-6 tw-font-bold">
               {error}
             </div>
          )}

          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
        </div>

        {/* FOOTER */}
        <div className="tw-px-8 tw-py-6 tw-border-t tw-border-[#5A3F49]/40 tw-bg-[#1E0039]/50 tw-flex tw-justify-between tw-items-center">
          
          <div className="tw-flex">
            {step > 1 ? (
              <button 
                onClick={handleBack}
                className="tw-px-4 tw-py-2.5 tw-bg-transparent tw-border tw-border-[#5A3F49] tw-rounded-lg tw-text-[#E2BDC9] tw-font-bold tw-text-sm tw-uppercase tw-cursor-pointer hover:tw-bg-white/5 tw-transition-colors tw-flex tw-items-center tw-gap-2"
              >
                <FontAwesomeIcon icon={faChevronLeft} className="tw-text-[10px]" /> {t("Back")}
              </button>
            ) : (
              <div />
            )}
          </div>

          <div className="tw-flex">
             {step < 3 ? (
               <button 
                 onClick={handleNext}
                 className="tw-px-8 tw-py-3 tw-bg-[#FF43A7] tw-rounded-lg tw-text-[#570033] tw-font-bold tw-text-sm tw-uppercase tw-tracking-widest tw-border-none tw-shadow-[0_0_15px_rgba(255,67,167,0.4)] hover:tw-bg-[#ff5cac] tw-transition-colors tw-cursor-pointer tw-flex tw-items-center tw-gap-2"
               >
                 {t("Next")} <FontAwesomeIcon icon={faChevronRight} className="tw-text-[10px]" />
               </button>
             ) : (
               <button 
                 onClick={handleSubmit}
                 disabled={isSubmitting}
                 className="tw-px-8 tw-py-3 tw-bg-[#FF43A7] tw-rounded-lg tw-text-white tw-font-bold tw-text-sm tw-uppercase tw-tracking-widest tw-border-none tw-shadow-[0_0_15px_rgba(255,67,167,0.4)] hover:tw-bg-[#ff5cac] tw-transition-colors disabled:tw-opacity-50 disabled:tw-cursor-not-allowed disabled:tw-shadow-none tw-flex tw-items-center tw-gap-2 tw-cursor-pointer"
               >
                 {isSubmitting ? (
                    <><FontAwesomeIcon icon={faSpinner} className="tw-animate-spin" /> {t("Creating...")}</>
                 ) : (
                    <><FontAwesomeIcon icon={faCheck} /> {t("Finish & Edit")}</>
                 )}
               </button>
             )}
          </div>
        </div>

      </div>
    </div>
  );
}