import { useState, useRef, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCamera, faTrashCan, faSpinner, faLink } from "@fortawesome/free-solid-svg-icons";

export default function ReviewModal({
  isOpen,
  onClose,
  review, 
  onSave,
  onDelete
}) {
  const { t } = useTranslation();
  const [magazine, setMagazine] = useState("");
  const [text, setText] = useState("");
  const [reviewsUrl, setReviewsUrl] = useState(""); 
  
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const [originalState, setOriginalState] = useState({});
  const [showDiscardModal, setShowDiscardModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowDiscardModal(false);
      setShowDeleteModal(false);

      if (review) {
        setMagazine(review.magazine || "");
        setText(review.text || "");
        setReviewsUrl(review.reviews_url || "");
        
        setOriginalState({
          magazine: review.magazine || "",
          text: review.text || "",
          reviews_url: review.reviews_url || "",
          image: review.award_logo || null
        });

        if (review.award_logo) {
           const url = review.award_logo.startsWith('http') || review.award_logo.startsWith('blob:') 
             ? review.award_logo 
             : `${process.env.REACT_APP_AWS_URL}/${review.award_logo}`;
           setPreviewUrl(url);
        } else {
           setPreviewUrl(null);
        }
      } else {
        setMagazine("");
        setText("");
        setReviewsUrl("");
        setPreviewUrl(null);
        setOriginalState({ magazine: "", text: "", reviews_url: "", image: null });
      }
      setSelectedFile(null);
    }
  }, [isOpen, review]);

  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const isDirty = 
    magazine !== originalState.magazine ||
    text !== originalState.text ||
    reviewsUrl !== originalState.reviews_url ||
    selectedFile !== null;

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

  const confirmDelete = () => {
    setShowDeleteModal(false);
    if (onDelete && review) {
      onDelete(review);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const localUrl = URL.createObjectURL(file);
      setPreviewUrl(localUrl);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      const localUrl = URL.createObjectURL(file);
      setPreviewUrl(localUrl);
    }
  };

  const handleSaveClick = async () => {
    setIsUploading(true);
    try {
      const dataToSave = {
        magazine,
        text,
        reviews_url: reviewsUrl, 
        file: selectedFile,
        originalUrl: review?.award_logo 
      };
      await onSave(dataToSave);
      onClose();
    } catch (error) {
      console.error("Error saving review:", error);
      alert(t("Failed to save. Please try again."));
    } finally {
      setIsUploading(false);
    }
  };

  if (!isOpen) return null;

  const isEditMode = !!review;

  return (
    <div className="tw-fixed tw-inset-0 tw-z-[1050] tw-flex tw-items-center tw-justify-center tw-p-4">
      {/* Darkened Backdrop */}
      <div 
        className="tw-absolute tw-inset-0 tw-bg-[#0a0014]/90 tw-backdrop-blur-sm" 
        onClick={handleCloseAttempt}
      />

      {/* Main Modal Container */}
      <div className="tw-relative tw-w-full tw-max-w-[672px] tw-bg-[#280D41] tw-border tw-border-[#5A3F49]/40 tw-shadow-[0_20px_50px_rgba(0,0,0,0.8)] tw-rounded-2xl tw-overflow-hidden tw-flex tw-flex-col tw-max-h-[95vh]">
        
        {/* HEADER */}
        <div className="tw-px-8 tw-py-6 tw-border-b tw-border-[#5A3F49]/40 tw-bg-[#1E0039]/50 tw-flex tw-justify-between tw-items-center tw-shrink-0">
          <h3 className="tw-text-white tw-text-[22px] tw-font-bold tw-flex tw-items-center tw-gap-3 tw-m-0">
            {isEditMode ? t("Edit Buzz") : t("Create Buzz")}
          </h3>
          <button 
            onClick={handleCloseAttempt}
            className="tw-w-8 tw-h-8 tw-rounded-full tw-bg-transparent hover:tw-bg-white/10 tw-text-[#E2BDC9] hover:tw-text-white tw-transition-colors tw-border-none tw-cursor-pointer tw-flex tw-items-center tw-justify-center"
          >
            <FontAwesomeIcon icon={faXmark} className="tw-text-lg" />
          </button>
        </div>

        {/* BODY */}
        <div className="tw-px-8 tw-py-6 tw-flex tw-flex-col tw-gap-6 tw-overflow-y-auto custom-scrollbar">
          
          {/* Top Row: {t("Media Source")} & Logo Upload */}
          <div className="tw-flex tw-flex-col md:tw-flex-row tw-gap-6 tw-items-start">
             
             {/* {t("Media Source")} Input */}
             <div className="tw-flex tw-flex-col tw-gap-2 tw-w-full md:tw-w-1/2">
                <label className="tw-text-[#FF43A7] tw-text-xs tw-font-bold tw-uppercase tw-tracking-widest">{t("Media Source")}</label>
                <input 
                  type="text"
                  value={magazine}
                  onChange={(e) => setMagazine(e.target.value)}
                  placeholder={t("e.g. IndieWire")}
                  className="tw-w-full tw-bg-[#1E0039] tw-border tw-border-[#5A3F49] tw-rounded-lg tw-px-4 tw-py-3 tw-text-white tw-font-bold focus:tw-outline-none focus:tw-border-[#FF43A7] tw-transition-colors" 
                />
             </div>

             {/* {t("Source Logo")} Upload Box */}
             <div className="tw-flex tw-flex-col tw-gap-2 tw-w-full md:tw-w-1/2">
                <label className="tw-text-[#FF43A7] tw-text-xs tw-font-bold tw-uppercase tw-tracking-widest">{t("Source Logo")}</label>
                
                <input 
                  type="file" 
                  accept="image/*" 
                  ref={fileInputRef} 
                  onChange={handleFileSelect} 
                  className="tw-hidden" 
                />

                <div 
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current.click()}
                  className="tw-w-full tw-h-[50px] tw-bg-[#1E0039] tw-border tw-border-dashed tw-border-[#FF43A7] tw-rounded-lg tw-px-4 tw-flex tw-items-center tw-gap-3 tw-cursor-pointer hover:tw-bg-[#371E51] tw-transition-colors tw-group"
                >
                  <div className="tw-w-8 tw-h-8 tw-bg-white/10 tw-rounded tw-flex tw-items-center tw-justify-center tw-shrink-0 tw-overflow-hidden">
                     {previewUrl ? (
                        <img src={previewUrl} alt="Logo preview" className="tw-w-full tw-h-full tw-object-contain tw-p-0.5" />
                     ) : (
                        <FontAwesomeIcon icon={faCamera} className="tw-text-[#FF43A7]" />
                     )}
                  </div>
                  <span className="tw-font-bold tw-text-xs tw-text-[#F0DBFF] tw-uppercase tw-tracking-wider group-hover:tw-text-white tw-transition-colors">
                     {previewUrl ? t("Change Logo") : t("Upload Image")}
                  </span>
                </div>
             </div>

          </div>

          {/* Quote / Description Textarea */}
          <div className="tw-flex tw-flex-col tw-gap-2">
             <div className="tw-flex tw-justify-between tw-items-center">
               <label className="tw-text-[#FF43A7] tw-text-xs tw-font-bold tw-uppercase tw-tracking-widest">{t("Short Description")}</label>
               <span className={`tw-text-xs tw-font-bold ${text.length >= 160 ? 'tw-text-red-400' : 'tw-text-[#E2BDC9]'}`}>
                 {text.length}/160
               </span>
             </div>
             <textarea 
               value={text}
               onChange={(e) => setText(e.target.value)}
               maxLength={160}
               placeholder={t("One of the most violent fighting movies in ages.")}
               className="tw-w-full tw-h-[120px] tw-bg-[#1E0039] tw-border tw-border-[#5A3F49] tw-rounded-lg tw-px-4 tw-py-3 tw-text-white tw-italic tw-leading-relaxed focus:tw-outline-none focus:tw-border-[#FF43A7] tw-transition-colors tw-resize-none custom-scrollbar" 
             />
          </div>

          {/* URL Input */}
          <div className="tw-flex tw-flex-col tw-gap-2">
             <label className="tw-text-[#FF43A7] tw-text-xs tw-font-bold tw-uppercase tw-tracking-widest">{t("Article URL")}</label>
             <div className="tw-relative">
                <FontAwesomeIcon icon={faLink} className="tw-absolute tw-left-4 tw-top-1/2 tw--translate-y-1/2 tw-text-[#AA8894]" />
                <input 
                  type="url"
                  value={reviewsUrl}
                  onChange={(e) => setReviewsUrl(e.target.value)}
                  placeholder="https://www.indiewire.com/article/..."
                  className="tw-w-full tw-bg-[#1E0039] tw-border tw-border-[#5A3F49] tw-rounded-lg tw-pl-10 tw-pr-4 tw-py-3 tw-text-white focus:tw-outline-none focus:tw-border-[#FF43A7] tw-transition-colors" 
                />
             </div>
          </div>

        </div>

        {/* FOOTER */}
        <div className="tw-px-8 tw-py-6 tw-border-t tw-border-[#5A3F49]/40 tw-bg-[#1E0039]/50 tw-flex tw-justify-between tw-items-center tw-shrink-0">
          
          <div className="tw-flex">
             {isEditMode && onDelete && (
                <button 
                  onClick={() => setShowDeleteModal(true)}
                  className="tw-px-4 md:tw-px-6 tw-py-2.5 tw-bg-transparent tw-border tw-border-red-500 tw-rounded-lg tw-text-red-500 tw-font-bold tw-text-sm tw-uppercase hover:tw-bg-red-500 hover:tw-text-white tw-transition-colors tw-flex tw-items-center tw-gap-2 tw-cursor-pointer"
                >
                  <FontAwesomeIcon icon={faTrashCan} />
                  <span className="tw-hidden md:tw-inline">{t("Delete")}</span>
                </button>
             )}
          </div>

          <div className="tw-flex tw-gap-3 md:tw-gap-4">
             <button 
               onClick={handleCloseAttempt}
               className="tw-px-4 md:tw-px-6 tw-py-2.5 tw-bg-transparent tw-border-none tw-text-[#E2BDC9] tw-font-bold tw-text-sm tw-uppercase tw-cursor-pointer hover:tw-text-white tw-transition-colors"
             >
               {t("Cancel")}
             </button>
             <button 
               onClick={handleSaveClick}
               disabled={isUploading || !magazine || !text}
               className="tw-px-6 md:tw-px-8 tw-py-3 tw-bg-[#FF43A7] tw-rounded-lg tw-text-white tw-font-bold tw-text-xs tw-uppercase tw-tracking-widest tw-border-none tw-shadow-[0_0_15px_rgba(255,67,167,0.4)] hover:tw-bg-[#ff5cac] tw-transition-colors disabled:tw-opacity-50 disabled:tw-cursor-not-allowed disabled:tw-shadow-none tw-flex tw-items-center tw-gap-2 tw-cursor-pointer"
             >
               {isUploading ? (
                  <>
                    <FontAwesomeIcon icon={faSpinner} className="tw-animate-spin" />
                    <span>{t("Saving...")}</span>
                  </>
                ) : (
                  <span>{t("Save Changes")}</span>
                )}
             </button>
          </div>
        </div>

      </div>

      {/* --- DISCARD CONFIRMATION MODAL --- */}
      {showDiscardModal && (
        <div className="tw-fixed tw-inset-0 tw-z-[1060] tw-flex tw-items-center tw-justify-center tw-bg-[#0a0014]/90 tw-backdrop-blur-sm tw-p-4">
          <div className="tw-bg-[#280D41] tw-border tw-border-[#5A3F49]/40 tw-rounded-2xl tw-p-6 md:tw-p-8 tw-max-w-md tw-w-full tw-shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <h3 className="tw-text-white tw-text-xl md:tw-text-2xl tw-font-bold tw-mb-4">{t("Discard Changes?")}</h3>
            <p className="tw-text-[#E2BDC9] tw-text-sm tw-mb-8 tw-leading-relaxed">
              {t("You have unsaved changes. Are you sure you want to discard them? All your progress will be lost.")}
            </p>
            <div className="tw-flex tw-justify-end tw-gap-4">
              <button onClick={() => setShowDiscardModal(false)} className="tw-px-6 tw-py-2.5 tw-bg-[#FF43A7] hover:tw-bg-[#FF00A0] tw-rounded-lg tw-text-[#570033] tw-font-bold tw-text-sm tw-uppercase tw-tracking-widest tw-border-none tw-shadow-[0_0_15px_rgba(255,67,167,0.4)] tw-transition-colors tw-cursor-pointer">{t("Keep Editing")}</button>
              <button onClick={confirmDiscard} className="tw-px-6 tw-py-2.5 tw-bg-transparent tw-border tw-border-red-500 tw-rounded-lg tw-text-red-500 tw-font-bold tw-text-sm tw-uppercase tw-tracking-widest hover:tw-bg-red-500 hover:tw-text-white tw-transition-colors tw-cursor-pointer">{t("Discard")}</button>
            </div>
          </div>
        </div>
      )}

      {/* --- DELETE CONFIRMATION MODAL --- */}
      {showDeleteModal && (
        <div className="tw-fixed tw-inset-0 tw-z-[1060] tw-flex tw-items-center tw-justify-center tw-bg-[#0a0014]/90 tw-backdrop-blur-sm tw-p-4">
          <div className="tw-bg-[#280D41] tw-border tw-border-[#5A3F49]/40 tw-rounded-2xl tw-p-6 md:tw-p-8 tw-max-w-md tw-w-full tw-shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <h3 className="tw-text-white tw-text-xl md:tw-text-2xl tw-font-bold tw-mb-4">{t("Delete Press Feature?")}</h3>
            <p className="tw-text-[#E2BDC9] tw-text-sm tw-mb-8 tw-leading-relaxed">
              {t("Are you sure you want to remove")} <strong className="tw-text-white">{originalState.magazine || t("this article")}</strong> {t("from your EPK? It will be permanently deleted when you save your changes.")}
            </p>
            <div className="tw-flex tw-justify-end tw-gap-4">
              <button onClick={() => setShowDeleteModal(false)} className="tw-px-6 tw-py-2.5 tw-bg-transparent tw-border tw-border-[#5A3F49] tw-rounded-lg tw-text-[#E2BDC9] tw-font-bold tw-text-sm tw-uppercase tw-tracking-widest hover:tw-bg-white/5 tw-transition-colors tw-cursor-pointer">{t("Cancel")}</button>
              <button onClick={confirmDelete} className="tw-px-6 tw-py-2.5 tw-bg-red-500 hover:tw-bg-red-600 tw-rounded-lg tw-text-white tw-font-bold tw-text-sm tw-uppercase tw-tracking-widest tw-border-none tw-shadow-[0_0_15px_rgba(239,68,68,0.4)] tw-transition-colors tw-cursor-pointer">{t("Delete")}</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}