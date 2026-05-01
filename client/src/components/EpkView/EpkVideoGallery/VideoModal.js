import  { useState, useEffect, useRef, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faUpload, faFilm, faCheck } from "@fortawesome/free-solid-svg-icons";

export default function VideoModal({ 
  isOpen, 
  onClose, 
  video, 
  epkInfo, 
  onSave 
}) {
  const { t } = useTranslation();
  const [title, setTitle] = useState("");
  const [isTrailer, setIsTrailer] = useState(false);
  const [activeCategory, setActiveCategory] = useState("trailers");
  
  // File & Thumbnail States
  const [selectedFile, setSelectedFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [thumbnails, setThumbnails] = useState([]);
  const [selectedThumbnail, setSelectedThumbnail] = useState(null);
  const [customThumbnailFile, setCustomThumbnailFile] = useState(null);
  const [isExtracting, setIsExtracting] = useState(false);
  
  // Validation & Safety States
  const [trailerError, setTrailerError] = useState("");
  const [showDiscardModal, setShowDiscardModal] = useState(false);
  const [originalState, setOriginalState] = useState({});
  const [localTitleSaved, setLocalTitleSaved] = useState(""); 

  const fileInputRef = useRef(null);
  const customThumbRef = useRef(null);
  const titleInputRef = useRef(null);

  // Lock background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // --- CANVAS FRAME EXTRACTOR (Wrapped in useCallback to fix ESLint warning) ---
  const extractFrames = useCallback((urlToExtract) => {
    if (!urlToExtract) return;
    setIsExtracting(true);

    const videoElement = document.createElement("video");
    videoElement.crossOrigin = "anonymous"; 
    videoElement.src = urlToExtract;
    videoElement.muted = true;
    videoElement.playsInline = true;

    videoElement.addEventListener("loadeddata", async () => {
      const duration = videoElement.duration;
      const timeStamps = [duration * 0.25, duration * 0.5, duration * 0.75];
      const extracted = [];

      for (let time of timeStamps) {
        videoElement.currentTime = time;
        await new Promise((resolve) => {
          videoElement.addEventListener("seeked", function onSeeked() {
            videoElement.removeEventListener("seeked", onSeeked);
            
            const canvas = document.createElement("canvas");
            canvas.width = videoElement.videoWidth;
            canvas.height = videoElement.videoHeight;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
            
            extracted.push(canvas.toDataURL("image/jpeg", 0.7));
            resolve();
          });
        });
      }
      setThumbnails(extracted);
      setSelectedThumbnail(prev => prev || extracted[0]); 
      setIsExtracting(false);
    });

    videoElement.addEventListener("error", () => {
      console.error("Error loading video for extraction");
      setIsExtracting(false);
    });
  }, []);

  // Initialize state when modal opens
  useEffect(() => {
    if (isOpen && video) {
      setTrailerError(""); 
      setShowDiscardModal(false);

      const isMainTrailer = video.url === epkInfo?.trailer_url || video.url === epkInfo?.trailer;
      const initialTitle = video.isNewUpload ? "" : (video.title || "");
      const initialCategory = video.category || "trailers";
      const initialThumb = video.thumbnail || null;

      setOriginalState({
        title: initialTitle,
        isTrailer: isMainTrailer,
        category: initialCategory,
        thumbnail: initialThumb
      });

      setTitle(initialTitle);
      setLocalTitleSaved(initialTitle);
      setIsTrailer(isMainTrailer);
      setActiveCategory(initialCategory);
      setSelectedFile(null);
      setSelectedThumbnail(initialThumb);
      setCustomThumbnailFile(null);
      setThumbnails([]);

      if (video.isNewUpload) {
        setVideoUrl(null);
      } else {
        const url = video.url?.startsWith('http') || video.url?.startsWith('blob:') 
          ? video.url 
          : `${process.env.REACT_APP_AWS_URL}/${video.url}`;
        setVideoUrl(url);
        extractFrames(url); 
      }
    }
  }, [isOpen, video, epkInfo, extractFrames]);

  // Safety: Uncheck "Set as Trailer" if user changes category away from trailers
  useEffect(() => {
    if (activeCategory !== "trailers") {
      setIsTrailer(false);
      setTrailerError("");
    }
  }, [activeCategory]);

  const isDirty = 
    title !== originalState.title ||
    isTrailer !== originalState.isTrailer ||
    activeCategory !== originalState.category ||
    selectedFile !== null ||
    customThumbnailFile !== null ||
    (selectedThumbnail !== null && selectedThumbnail !== originalState.thumbnail);

  const handleCloseAttempt = () => {
    if (isDirty) {
      setShowDiscardModal(true);
    } else {
      onClose();
    }
  };

  const confirmDiscard = () => {
    setShowDiscardModal(false);
    onClose();
  };

  // --- FILE HANDLING (Drag & Drop / Select) ---
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) processNewVideoFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('video/')) processNewVideoFile(file);
  };

  const processNewVideoFile = (file) => {
    setSelectedFile(file);
    const newTitle = file.name.split('.').slice(0, -1).join('.');
    if (!title || title.trim() === "") {
      setTitle(newTitle);
      setLocalTitleSaved(newTitle);
    }
    const localUrl = URL.createObjectURL(file);
    setVideoUrl(localUrl);
    extractFrames(localUrl);
  };

  const handleCustomThumbUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCustomThumbnailFile(file);
      setSelectedThumbnail(URL.createObjectURL(file));
    }
  };

  // --- TRAILER TOGGLE VALIDATION ---
  const handleTrailerToggle = (e) => {
    const isChecking = e.target.checked;
    const isCurrentlyMain = video && !video.isNewUpload && (video.url === epkInfo?.trailer_url || video.url === epkInfo?.trailer);

    if (!isChecking && isCurrentlyMain) {
      const trailerCount = epkInfo?.video_gallery?.trailers?.length || 0;
      if (trailerCount <= 1) {
        setTrailerError(t("This is your only trailer. You must upload another video before you can unset this as the Main Trailer."));
      } else {
        setTrailerError(t("To swap out the Main Trailer, edit the new video you want to use and check 'Set as Main Trailer'."));
      }
      return; 
    }

    setTrailerError("");
    setIsTrailer(isChecking);
  };

  const handleSave = () => {
    onSave({
      originalUrl: video.url,
      videoFile: selectedFile, 
      newTitle: title,
      category: activeCategory,
      isTrailer: isTrailer,
      newThumbnailUrl: typeof selectedThumbnail === 'string' && selectedThumbnail.startsWith('blob:') ? null : selectedThumbnail,
      customThumbnailFile: customThumbnailFile, 
      extractedBase64: typeof selectedThumbnail === 'string' && selectedThumbnail.startsWith('data:image') ? selectedThumbnail : null
    });
    onClose();
  };

  if (!isOpen || !video) return null;

  return (
    <div className="tw-fixed tw-inset-0 tw-z-[1050] tw-flex tw-items-center tw-justify-center tw-p-4">
      {/* Darkened Backdrop */}
      <div className="tw-absolute tw-inset-0 tw-bg-[#0a0014]/90 tw-backdrop-blur-sm" onClick={handleCloseAttempt} />

      {/* Modal Container */}
      <div className="tw-relative tw-w-full tw-max-w-[896px] tw-bg-[#280D41] tw-border tw-border-[#5A3F49]/40 tw-shadow-[0_20px_50px_rgba(0,0,0,0.8)] tw-rounded-2xl tw-overflow-hidden tw-flex tw-flex-col tw-max-h-[95vh]">
        
        {/* HEADER */}
        <div className="tw-px-8 tw-py-6 tw-border-b tw-border-[#5A3F49]/40 tw-bg-[#1E0039]/50 tw-flex tw-justify-between tw-items-center tw-shrink-0">
          <h3 className="tw-text-white tw-text-[22px] tw-font-bold tw-font-['Plus_Jakarta_Sans'] tw-flex tw-items-center tw-gap-3 tw-m-0">
            <FontAwesomeIcon icon={faFilm} className="tw-text-[#FF43A7]" />
            {video.isNewUpload && !videoUrl ? t("Upload New Video") : t("Video Details")}
          </h3>
          <button 
            onClick={handleCloseAttempt}
            className="tw-w-8 tw-h-8 tw-rounded-full tw-bg-transparent hover:tw-bg-white/10 tw-text-[#E2BDC9] hover:tw-text-white tw-transition-colors tw-border-none tw-cursor-pointer tw-flex tw-items-center tw-justify-center"
          >
            <FontAwesomeIcon icon={faXmark} className="tw-text-lg" />
          </button>
        </div>

        {/* BODY */}
        <div className="tw-px-8 tw-py-6 tw-overflow-y-auto custom-scrollbar tw-flex tw-flex-col tw-gap-8">
          
          {/* 1. META DETAILS (INFO) */}
          <div className="tw-flex tw-flex-col tw-gap-6">
            <div className="tw-flex tw-flex-col md:tw-flex-row tw-gap-6">
              
              {/* TITLE INPUT WITH MOBILE INLINE BUTTONS */}
              <div className="tw-flex tw-flex-col tw-gap-2 tw-flex-1">
                <label className="tw-text-[#FF43A7] tw-text-xs tw-font-bold tw-uppercase tw-tracking-widest tw-font-['Space_Grotesk']">
                  {t("Video Title")}
                </label>
                <div className="tw-relative tw-w-full">
                  <input 
                    ref={titleInputRef}
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder={t("e.g. Official Teaser Trailer")}
                    className={`tw-w-full tw-bg-[#1E0039] tw-border tw-border-[#5A3F49] tw-rounded-lg tw-px-4 tw-py-3 tw-text-white tw-font-bold focus:tw-outline-none focus:tw-border-[#FF43A7] tw-transition-colors ${title !== localTitleSaved ? 'md:tw-pr-4 tw-pr-[80px]' : ''}`}
                  />
                  
                  {title !== localTitleSaved && (
                    <div className="tw-absolute tw-right-2 tw-top-1/2 tw--translate-y-1/2 tw-flex md:tw-hidden tw-gap-1 tw-z-10">
                      <button 
                        onClick={() => { setLocalTitleSaved(title); titleInputRef.current?.blur(); }}
                        className="tw-w-8 tw-h-8 tw-bg-[#FF43A7] hover:tw-bg-[#FF00A0] tw-text-[#570033] tw-rounded tw-flex tw-items-center tw-justify-center tw-border-none tw-cursor-pointer"
                      >
                        <FontAwesomeIcon icon={faCheck} className="tw-text-sm" />
                      </button>
                      <button 
                        onClick={() => { setTitle(localTitleSaved); titleInputRef.current?.blur(); }}
                        className="tw-w-8 tw-h-8 tw-bg-[#371E51] hover:tw-bg-[#5A3F49] tw-text-[#E2BDC9] tw-rounded tw-flex tw-items-center tw-justify-center tw-border tw-border-[#5A3F49] tw-cursor-pointer"
                      >
                        <FontAwesomeIcon icon={faXmark} className="tw-text-sm" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* CATEGORY SELECTOR */}
              <div className="tw-flex tw-flex-col tw-gap-2 tw-w-full md:tw-w-48">
                <label className="tw-text-[#FF43A7] tw-text-xs tw-font-bold tw-uppercase tw-tracking-widest tw-font-['Space_Grotesk']">
                  {t("Category")}
                </label>
                <select 
                  value={activeCategory}
                  onChange={(e) => setActiveCategory(e.target.value)}
                  className="tw-w-full tw-bg-[#1E0039] tw-border tw-border-[#5A3F49] tw-rounded-lg tw-px-4 tw-py-3 tw-text-white tw-font-bold focus:tw-outline-none focus:tw-border-[#FF43A7] tw-transition-colors tw-cursor-pointer"
                >
                  <option value="trailers">{t("Trailers")}</option>
                  <option value="behind">{t("Behind The Scene")}</option>
                  <option value="interviews">{t("Interviews")}</option>
                  <option value="premieres">{t("Premieres")}</option>
                </select>
              </div>
            </div>

            {/* MAIN TRAILER TOGGLE */}
            {activeCategory === "trailers" && (
              <div className="tw-flex tw-flex-col tw-gap-2">
                <div className="tw-flex tw-items-center tw-justify-between tw-bg-[#1E0039] tw-border tw-border-[#5A3F49]/50 tw-rounded-lg tw-p-4">
                  <div className="tw-flex tw-flex-col">
                    <span className="tw-text-white tw-font-bold tw-text-sm">{t("Set as Main Trailer")}</span>
                    <span className="tw-text-[#E2BDC9] tw-text-xs tw-mt-1">{t("This will display the video at the very top of your EPK.")}</span>
                  </div>
                  <label className="tw-relative tw-inline-flex tw-items-center tw-cursor-pointer">
                    <input type="checkbox" checked={isTrailer} onChange={handleTrailerToggle} className="tw-sr-only tw-peer" />
                    <div className="tw-w-11 tw-h-6 tw-bg-[#5A3F49] peer-focus:tw-outline-none tw-rounded-full peer peer-checked:after:tw-translate-x-full peer-checked:after:tw-border-white after:tw-content-[''] after:tw-absolute after:tw-top-[2px] after:tw-left-[2px] after:tw-bg-white after:tw-border-gray-300 after:tw-border after:tw-rounded-full after:tw-h-5 after:tw-w-5 after:tw-transition-all peer-checked:tw-bg-[#FF43A7]"></div>
                  </label>
                </div>
                {trailerError && (
                  <span className="tw-text-red-400 tw-text-xs tw-font-bold tw-font-['Space_Grotesk'] tw-px-1 tw-animate-pulse">
                    {trailerError}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* 2. VIDEO PLAYER OR DRAG-AND-DROP ZONE */}
          {!videoUrl ? (
            <div 
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current.click()}
              className="tw-shrink-0 tw-relative tw-w-full tw-max-w-[640px] tw-mx-auto tw-py-12 md:tw-py-16 tw-px-6 tw-bg-[#1E0039]/50 tw-rounded-xl tw-border-2 tw-border-dashed tw-border-[#FF43A7] tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-4 tw-transition-colors hover:tw-bg-[#1E0039]/80 tw-cursor-pointer"
            >
              <div className="tw-absolute tw-inset-0 tw-bg-[#FF43A7]/5 tw-blur-[30px] tw-pointer-events-none" />
              
              <div className="tw-w-16 tw-h-16 tw-bg-[#371E51] tw-rounded-full tw-flex tw-items-center tw-justify-center tw-z-10">
                <FontAwesomeIcon icon={faFilm} className="tw-text-[#FF43A7] tw-text-2xl" />
              </div>
              <h3 className="tw-font-['Plus_Jakarta_Sans'] tw-font-bold tw-text-xl tw-text-[#F0DBFF] tw-m-0 tw-z-10 tw-text-center">
                {t("Drag and drop your cinematic file here")}
              </h3>
              <p className="tw-font-['Inter'] tw-text-sm tw-text-[#DDB7FF]/60 tw-m-0 tw-z-10">
                {t("or click to browse from your computer")}
              </p>
              
              <input type="file" accept="video/*" ref={fileInputRef} onChange={handleFileSelect} className="tw-hidden" />
              <button 
                className="tw-mt-4 tw-px-6 tw-py-2.5 tw-bg-[#42295C] tw-border tw-border-[#5A3F49]/30 tw-rounded-full tw-font-['Space_Grotesk'] tw-text-xs tw-text-[#F0DBFF] tw-tracking-[1.4px] hover:tw-bg-[#5A3F49] tw-transition-colors tw-z-10 tw-cursor-pointer"
              >
                {t("BROWSE FILES")}
              </button>
            </div>
          ) : (
            <div className="tw-shrink-0 tw-w-full tw-max-w-[640px] tw-mx-auto tw-aspect-video tw-bg-black tw-rounded-xl tw-overflow-hidden tw-border tw-border-[#5A3F49]/30 tw-shadow-inner">
              <video 
                src={videoUrl} 
                crossOrigin="anonymous"
                className="tw-w-full tw-h-full tw-block tw-object-contain tw-outline-none" 
                controls 
                preload="metadata"
                playsInline
              />
            </div>
          )}

          {/* 3. THUMBNAIL SELECTOR */}
          {videoUrl && (
            <div className="tw-flex tw-flex-col tw-gap-4">
              <div className="tw-flex tw-items-center tw-justify-between">
                 <label className="tw-text-[#FF43A7] tw-text-xs tw-font-bold tw-uppercase tw-tracking-widest tw-font-['Space_Grotesk']">
                   {t("Video Thumbnail")}
                 </label>
              </div>

              <div className="tw-flex tw-gap-4 tw-overflow-x-auto custom-scrollbar tw-pb-2">
                {thumbnails.length === 0 && selectedThumbnail && (
                  <div className="tw-shrink-0 tw-relative tw-w-[140px] md:tw-w-[170px] tw-aspect-video tw-rounded-lg tw-overflow-hidden tw-border-2 tw-border-[#FF43A7]">
                     <img src={selectedThumbnail?.startsWith('http') || selectedThumbnail?.startsWith('blob:') || selectedThumbnail?.startsWith('data:') ? selectedThumbnail : `${process.env.REACT_APP_AWS_URL}/${selectedThumbnail}`} alt={t("Current")} className="tw-w-full tw-h-full tw-object-cover" />
                     <div className="tw-absolute tw-inset-0 tw-bg-black/20 tw-flex tw-items-center tw-justify-center">
                       <div className="tw-w-6 tw-h-6 tw-bg-[#FF43A7] tw-rounded-full tw-flex tw-items-center tw-justify-center tw-shadow-lg">
                         <FontAwesomeIcon icon={faCheck} className="tw-text-[#570033] tw-text-[10px]" />
                       </div>
                     </div>
                  </div>
                )}

                {thumbnails.map((thumb, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => { setSelectedThumbnail(thumb); setCustomThumbnailFile(null); }}
                    className={`tw-shrink-0 tw-relative tw-w-[140px] md:tw-w-[170px] tw-aspect-video tw-rounded-lg tw-overflow-hidden tw-cursor-pointer tw-transition-all tw-box-border ${selectedThumbnail === thumb ? 'tw-border-[1.5px] tw-border-[#FF43A7] tw-opacity-100' : 'tw-border tw-border-[#5A3F49]/50 tw-opacity-60 hover:tw-opacity-100'}`}
                  >
                     <img src={thumb} alt={`${t("Extracted")} ${idx + 1}`} className="tw-w-full tw-h-full tw-object-cover" />
                     {selectedThumbnail === thumb && (
                       <div className="tw-absolute tw-inset-0 tw-bg-black/20 tw-flex tw-items-center tw-justify-center">
                         <div className="tw-w-6 tw-h-6 tw-bg-[#FF43A7] tw-rounded-full tw-flex tw-items-center tw-justify-center tw-shadow-lg">
                           <FontAwesomeIcon icon={faCheck} className="tw-text-white tw-text-[10px]" />
                         </div>
                       </div>
                     )}
                  </div>
                ))}

                {/* Upload Custom Box */}
                <div 
                  onClick={() => customThumbRef.current.click()}
                  className="tw-shrink-0 tw-w-[140px] md:tw-w-[170px] tw-aspect-video tw-bg-[#1E0039] tw-border tw-border-dashed tw-border-[#5A3F49] tw-rounded-lg tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-2 tw-cursor-pointer hover:tw-bg-[#371E51] tw-transition-colors"
                >
                  <FontAwesomeIcon icon={faUpload} className="tw-text-[#DDB7FF] tw-text-lg tw-mb-1" />
                  <span className="tw-font-['Space_Grotesk'] tw-text-[9px] tw-text-[#DDB7FF] tw-tracking-[1px] tw-uppercase tw-font-bold">{t("Upload Custom")}</span>
                  <input type="file" accept="image/*" ref={customThumbRef} onChange={handleCustomThumbUpload} className="tw-hidden" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="tw-px-8 tw-py-6 tw-border-t tw-border-[#5A3F49]/40 tw-bg-[#1E0039]/50 tw-flex tw-justify-between tw-items-center tw-shrink-0">
          <button 
            onClick={handleCloseAttempt}
            className="tw-px-6 tw-py-2.5 tw-bg-transparent tw-border-none tw-text-[#E2BDC9] tw-font-bold tw-text-sm tw-uppercase tw-tracking-widest hover:tw-text-white tw-transition-colors tw-cursor-pointer tw-m-0 tw-p-0"
          >
            {t("Cancel")}
          </button>
          <button 
            onClick={handleSave}
            disabled={!videoUrl || isExtracting}
            className="tw-px-8 tw-py-3 tw-bg-[#FF43A7] tw-rounded-lg tw-text-white tw-font-bold tw-text-xs tw-uppercase tw-tracking-widest tw-border-none tw-shadow-[0_0_15px_rgba(255,67,167,0.4)] tw-transition-colors hover:tw-bg-[#ff5cac] tw-cursor-pointer disabled:tw-opacity-50 disabled:tw-cursor-not-allowed disabled:tw-shadow-none"
          >
            {isExtracting ? t("Extracting...") : t("Save Media")}
          </button>
        </div>

      </div>

      {/* DISCARD CONFIRMATION MODAL */}
      {showDiscardModal && (
        <div className="tw-fixed tw-inset-0 tw-z-[1060] tw-flex tw-items-center tw-justify-center tw-bg-[#0a0014]/90 tw-backdrop-blur-sm tw-p-4">
          <div className="tw-bg-[#280D41] tw-border tw-border-[#5A3F49]/40 tw-rounded-2xl tw-p-6 md:tw-p-8 tw-max-w-md tw-w-full tw-shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <h3 className="tw-text-white tw-text-xl md:tw-text-2xl tw-font-bold tw-mb-4 tw-font-['Plus_Jakarta_Sans']">{t("Discard Changes?")}</h3>
            <p className="tw-text-[#E2BDC9] tw-text-sm tw-mb-8 tw-leading-relaxed">
              {t("You have unsaved changes. Are you sure you want to discard them? All your progress will be lost.")}
            </p>
            <div className="tw-flex tw-justify-end tw-gap-4">
              <button 
                onClick={() => setShowDiscardModal(false)}
                className="tw-px-6 tw-py-2.5 tw-bg-[#FF43A7] hover:tw-bg-[#FF00A0] tw-rounded-lg tw-text-[#570033] tw-font-bold tw-text-sm tw-uppercase tw-tracking-widest tw-border-none tw-shadow-[0_0_15px_rgba(255,67,167,0.4)] tw-transition-colors tw-cursor-pointer"
              >
                {t("Keep Editing")}
              </button>
              <button 
                onClick={confirmDiscard}
                className="tw-px-6 tw-py-2.5 tw-bg-transparent tw-border tw-border-red-500 tw-rounded-lg tw-text-red-500 tw-font-bold tw-text-sm tw-uppercase tw-tracking-widest hover:tw-bg-red-500 hover:tw-text-white tw-transition-colors tw-cursor-pointer"
              >
                {t("Discard")}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}