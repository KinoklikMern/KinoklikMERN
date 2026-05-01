import  { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCamera, faTrashCan, faSpinner, faChevronDown } from "@fortawesome/free-solid-svg-icons";

export default function ResourceModal({
  isOpen,
  onClose,
  resource, 
  onSave,
  onDelete
}) {
  const { t } = useTranslation();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState(""); 
  
  // File & Image States
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  // Safety / Confirmation States
  const [originalState, setOriginalState] = useState({});
  const [showDiscardModal, setShowDiscardModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowDiscardModal(false);
      setShowDeleteModal(false);

      if (resource) {
        setTitle(resource.title || "");
        setDescription(resource.description || "");
        setTime(resource.time || "");
        
        setOriginalState({
          title: resource.title || "",
          description: resource.description || "",
          time: resource.time || "",
          image: resource.image || null
        });

        if (resource.image) {
           const url = resource.image.startsWith('http') || resource.image.startsWith('blob:') 
             ? resource.image 
             : `${process.env.REACT_APP_AWS_URL}/${resource.image}`;
           setPreviewUrl(url);
        } else {
           setPreviewUrl(null);
        }
      } else {
        setTitle("");
        setDescription("");
        setTime("");
        setPreviewUrl(null);
        setOriginalState({ title: "", description: "", time: "", image: null });
      }
      setSelectedFile(null);
    }
  }, [isOpen, resource]);

  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const isDirty = 
    title !== originalState.title ||
    description !== originalState.description ||
    time !== originalState.time ||
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
    if (onDelete && resource) {
      onDelete(resource);
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
        title,
        description,
        time, 
        file: selectedFile,
        originalUrl: resource?.image 
      };
      await onSave(dataToSave);
      onClose();
    } catch (error) {
      console.error("Error saving resource:", error);
      alert(t("Failed to save resource. Please try again."));
    } finally {
      setIsUploading(false);
    }
  };

  if (!isOpen) return null;

  const isEditMode = !!resource;

  return (
    <div className="tw-fixed tw-inset-0 tw-z-[1050] tw-flex tw-items-center tw-justify-center tw-p-4">
      {/* Darkened Backdrop */}
      <div 
        className="tw-absolute tw-inset-0 tw-bg-[#0a0014]/90 tw-backdrop-blur-sm" 
        onClick={handleCloseAttempt}
      />

      {/* Main Modal Container */}
      <div className="tw-relative tw-w-full tw-max-w-[896px] tw-bg-[#280D41] tw-border tw-border-[#5A3F49]/40 tw-shadow-[0_20px_50px_rgba(0,0,0,0.8)] tw-rounded-2xl tw-overflow-hidden tw-flex tw-flex-col tw-max-h-[95vh]">
        
        {/* HEADER */}
        <div className="tw-px-8 tw-py-6 tw-border-b tw-border-[#5A3F49]/40 tw-bg-[#1E0039]/50 tw-flex tw-justify-between tw-items-center tw-shrink-0">
          <h3 className="tw-text-white tw-text-[22px] tw-font-bold tw-flex tw-items-center tw-gap-3 tw-m-0">
            {isEditMode ? t("Edit Resource") : t("Create Resource")}
          </h3>
          <button 
            onClick={handleCloseAttempt}
            className="tw-w-8 tw-h-8 tw-rounded-full tw-bg-transparent hover:tw-bg-white/10 tw-text-[#E2BDC9] hover:tw-text-white tw-transition-colors tw-border-none tw-cursor-pointer tw-flex tw-items-center tw-justify-center"
          >
            <FontAwesomeIcon icon={faXmark} className="tw-text-lg" />
          </button>
        </div>

        {/* BODY (Split Layout) */}
        <div className="tw-flex tw-flex-col md:tw-flex-row tw-overflow-y-auto custom-scrollbar">
          
          {/* LEFT: Image Upload */}
          <div className="tw-w-full md:tw-w-[40%] tw-min-h-[220px] md:tw-min-h-full tw-shrink-0 tw-bg-[#1E0039]/50 tw-border-b md:tw-border-b-0 md:tw-border-r tw-border-[#5A3F49]/40 tw-p-6 md:tw-p-8 tw-flex tw-flex-col">
            
            <input 
              type="file" 
              accept="image/*" 
              ref={fileInputRef} 
              onChange={handleFileSelect} 
              className="tw-hidden" 
            />

            {!previewUrl ? (
              <div 
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current.click()}
                className="tw-flex-1 tw-w-full tw-p-6 tw-bg-[#1E0039]/50 tw-rounded-xl tw-border-2 tw-border-dashed tw-border-[#FF43A7] tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-3 tw-transition-colors hover:tw-bg-[#1E0039]/80 tw-cursor-pointer"
              >
                  <div className="tw-w-12 tw-h-12 md:tw-w-14 md:tw-h-14 tw-bg-[#371E51] tw-rounded-full tw-flex tw-items-center tw-justify-center tw-shrink-0">
                    <FontAwesomeIcon icon={faCamera} className="tw-text-[#FF43A7] tw-text-lg md:tw-text-xl" />
                  </div>
                  <span className="tw-font-bold tw-text-[10px] md:tw-text-xs tw-text-[#F0DBFF] tw-uppercase tw-text-center tw-tracking-widest">{t("Upload Image")}</span>
              </div>
            ) : (
              <div className="tw-flex-1 tw-w-full tw-relative tw-group tw-rounded-xl tw-overflow-hidden">
                <img 
                  src={previewUrl} 
                  alt={t("Resource preview")} 
                  className="tw-absolute tw-inset-0 tw-w-full tw-h-full tw-object-cover"
                />
                <div 
                  onClick={() => fileInputRef.current.click()}
                  className="tw-absolute tw-inset-0 tw-bg-black/60 tw-opacity-0 group-hover:tw-opacity-100 tw-transition-opacity tw-duration-300 tw-flex tw-flex-col tw-items-center tw-justify-center tw-cursor-pointer"
                >
                  <FontAwesomeIcon icon={faCamera} className="tw-text-white tw-text-2xl tw-mb-2" />
                  <span className="tw-font-bold tw-text-xs tw-text-white tw-uppercase">{t("Change Image")}</span>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: Form */}
          <div className="tw-w-full md:tw-w-[60%] tw-p-6 md:tw-p-8 tw-flex tw-flex-col tw-gap-6">
            
            {/* Title */}
            <div className="tw-flex tw-flex-col tw-gap-2">
               <label className="tw-text-[#FF43A7] tw-text-xs tw-font-bold tw-uppercase tw-tracking-widest">{t("Resource Title")}</label>
               <input 
                 type="text"
                 value={title}
                 onChange={(e) => setTitle(e.target.value)}
                 maxLength={25}
                 placeholder={t("e.g. High-End Sports Vehicle")}
                 className="tw-w-full tw-bg-[#1E0039] tw-border tw-border-[#5A3F49] tw-rounded-lg tw-px-4 tw-py-3 tw-text-white tw-font-bold focus:tw-outline-none focus:tw-border-[#FF43A7] tw-transition-colors" 
               />
            </div>

            {/* Duration */}
            <div className="tw-flex tw-flex-col tw-gap-2">
               <label className="tw-text-[#FF43A7] tw-text-xs tw-font-bold tw-uppercase tw-tracking-widest">{t("Duration")}</label>
               <div className="tw-relative">
                 <select 
                   value={time}
                   onChange={(e) => setTime(e.target.value)}
                   className="tw-w-full tw-bg-[#1E0039] tw-border tw-border-[#5A3F49] tw-rounded-lg tw-px-4 tw-py-3 tw-text-white tw-font-bold tw-appearance-none focus:tw-outline-none focus:tw-border-[#FF43A7] tw-transition-colors tw-cursor-pointer"
                 >
                   <option value="" disabled>{t("Select Days")}</option>
                   {Array.from({ length: 30 }, (_, i) => (
                     <option key={i + 1} value={i + 1}>
                       {i + 1} {i === 0 ? t("day") : t("days")}
                     </option>
                   ))}
                 </select>
                 <FontAwesomeIcon icon={faChevronDown} className="tw-absolute tw-right-4 tw-top-1/2 tw--translate-y-1/2 tw-text-[#AA8894] tw-pointer-events-none" />
               </div>
            </div>

            {/* Description */}
            <div className="tw-flex tw-flex-col tw-gap-2">
               <div className="tw-flex tw-justify-between tw-items-center">
                 <label className="tw-text-[#FF43A7] tw-text-xs tw-font-bold tw-uppercase tw-tracking-widest">{t("Description")}</label>
                 <span className={`tw-text-xs tw-font-bold ${description.length >= 160 ? 'tw-text-red-400' : 'tw-text-[#E2BDC9]'}`}>
                   {description.length}/160
                 </span>
               </div>
               <textarea 
                 value={description}
                 onChange={(e) => setDescription(e.target.value)}
                 maxLength={160}
                 placeholder={t("Details about the resource and its requirements...")}
                 className="tw-w-full tw-h-[140px] tw-bg-[#1E0039] tw-border tw-border-[#5A3F49] tw-rounded-lg tw-px-4 tw-py-3 tw-text-white focus:tw-outline-none focus:tw-border-[#FF43A7] tw-transition-colors tw-resize-none custom-scrollbar" 
               />
            </div>

          </div>
        </div>

        {/* FOOTER */}
        <div className="tw-px-8 tw-py-6 tw-border-t tw-border-[#5A3F49]/40 tw-bg-[#1E0039]/50 tw-flex tw-justify-between tw-items-center tw-shrink-0">
          
          <div className="tw-flex tw-gap-4">
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
               disabled={isUploading || (!previewUrl && !title)}
               className="tw-px-6 md:tw-px-8 tw-py-3 tw-bg-[#FF43A7] tw-rounded-lg tw-text-white tw-font-bold tw-text-xs tw-uppercase tw-tracking-widest tw-border-none tw-shadow-[0_0_15px_rgba(255,67,167,0.4)] hover:tw-bg-[#ff5cac] tw-transition-colors disabled:tw-opacity-50 disabled:tw-cursor-not-allowed disabled:tw-shadow-none tw-flex tw-items-center tw-gap-2 tw-cursor-pointer"
             >
               {isUploading ? (
                  <>
                    <FontAwesomeIcon icon={faSpinner} className="tw-animate-spin" />
                    <span>{t("Saving...")}</span>
                  </>
                ) : (
                  <span>{t("Save Resource")}</span>
                )}
             </button>
          </div>
        </div>

      </div>

      {/* --- DISCARD CONFIRMATION MODAL --- */}
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

      {/* --- DELETE CONFIRMATION MODAL --- */}
      {showDeleteModal && (
        <div className="tw-fixed tw-inset-0 tw-z-[1060] tw-flex tw-items-center tw-justify-center tw-bg-[#0a0014]/90 tw-backdrop-blur-sm tw-p-4">
          <div className="tw-bg-[#280D41] tw-border tw-border-[#5A3F49]/40 tw-rounded-2xl tw-p-6 md:tw-p-8 tw-max-w-md tw-w-full tw-shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <h3 className="tw-text-white tw-text-xl md:tw-text-2xl tw-font-bold tw-mb-4 tw-font-['Plus_Jakarta_Sans']">{t("Delete Resource?")}</h3>
            <p className="tw-text-[#E2BDC9] tw-text-sm tw-mb-8 tw-leading-relaxed">
              {t("Are you sure you want to remove")} <strong className="tw-text-white">{originalState.title || t("this resource")}</strong> {t("from your EPK? It will be permanently deleted when you save your changes.")}
            </p>
            <div className="tw-flex tw-justify-end tw-gap-4">
              <button 
                onClick={() => setShowDeleteModal(false)}
                className="tw-px-6 tw-py-2.5 tw-bg-transparent tw-border tw-border-[#5A3F49] tw-rounded-lg tw-text-[#E2BDC9] tw-font-bold tw-text-sm tw-uppercase tw-tracking-widest hover:tw-bg-white/5 tw-transition-colors tw-cursor-pointer"
              >
                {t("Cancel")}
              </button>
              <button 
                onClick={confirmDelete}
                className="tw-px-6 tw-py-2.5 tw-bg-red-500 hover:tw-bg-red-600 tw-rounded-lg tw-text-white tw-font-bold tw-text-sm tw-uppercase tw-tracking-widest tw-border-none tw-shadow-[0_0_15px_rgba(239,68,68,0.4)] tw-transition-colors tw-cursor-pointer"
              >
                {t("Delete")}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}