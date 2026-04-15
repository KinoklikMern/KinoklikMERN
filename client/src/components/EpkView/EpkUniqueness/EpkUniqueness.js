import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faSpinner, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { uploadSingleFile } from "../../../api/epks";

export default function EpkUniqueness({ epkInfo, isEditMode, onChange }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
  // Track original text for the mobile Cancel button to revert to
  const [originalTitle, setOriginalTitle] = useState("");
  const [originalDesc, setOriginalDesc] = useState("");

  const fileInputRef = useRef(null);
  const user = useSelector((state) => state.user);

  const image_uniqueness =
    epkInfo?.image_uniqueness &&
    (epkInfo.image_uniqueness.startsWith('http') || epkInfo.image_uniqueness.startsWith('blob:') 
      ? epkInfo.image_uniqueness 
      : `${process.env.REACT_APP_AWS_URL}/${epkInfo.image_uniqueness}`);

  // Hide section ONLY if it's not edit mode AND data is missing
  const hasData = epkInfo?.title_uniqueness || epkInfo?.description_uniqueness || image_uniqueness;
  if (!isEditMode && !hasData) {
    return null;
  }

  // --- IMAGE UPLOAD HANDLER ---
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const uploadedKey = await uploadSingleFile(file, user?.token);
      onChange("image_uniqueness", uploadedKey);
    } catch (error) {
      console.error("Failed to upload uniqueness image:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="tw-w-full tw-bg-[#1E0039] tw-py-16 tw-px-4 md:tw-px-16">
      
      {/* HEADER */}
      <div className="tw-max-w-[1200px] tw-mx-auto tw-flex tw-flex-col tw-mb-10 md:tw-mb-16 tw-px-4 md:tw-px-0">
        <span className="tw-text-[#FF43A7] tw-text-[10px] tw-font-bold tw-uppercase tw-tracking-widest tw-mb-1">
          Our originality
        </span>
        <h2 className="tw-text-white tw-text-3xl md:tw-text-4xl tw-font-bold tw-tracking-tight tw-mb-2">
          {isEditMode ? "Edit Uniqueness" : "Uniqueness"}
        </h2>
        {isEditMode && (
          <p className="tw-text-[#DDB7FF] tw-text-sm md:tw-text-base tw-leading-relaxed tw-max-w-[672px] tw-mt-2 tw-mb-0">
            Highlight what makes your project stand out. Upload a defining image and describe the unique elements, themes, or vision that make your film truly one-of-a-kind.
          </p>
        )}
      </div>

      {/* MAIN WRAPPER: Exact Pink-to-White gradient from your Crew Cards */}
      <div className="tw-max-w-[1200px] tw-mx-auto tw-p-[4px] tw-rounded-[43px] tw-bg-gradient-to-b tw-from-[#FF00A0] tw-to-white tw-shadow-lg">
        
        {/* Inner Container holding BOTH Image and Text */}
        <div className="tw-w-full tw-bg-[#1E0039] tw-rounded-[38px] tw-flex tw-flex-col md:tw-flex-row tw-items-center tw-py-12 tw-px-8 md:tw-px-12 tw-gap-10 md:tw-gap-16">
          
          {/* Left Side: Image / Upload Box */}
          <div className="tw-w-full md:tw-w-1/2 tw-flex tw-justify-center md:tw-justify-end">
            
            <input 
              type="file" 
              accept="image/*" 
              ref={fileInputRef} 
              onChange={handleImageUpload} 
              className="tw-hidden" 
            />

            {isUploading ? (
              <div className="tw-w-full tw-max-w-[500px] tw-aspect-[4/3] tw-bg-[#280D41] tw-border-2 tw-border-dashed tw-border-[#FF43A7]/40 tw-rounded-[24px] tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-4">
                <FontAwesomeIcon icon={faSpinner} className="tw-text-[#FF43A7] tw-text-3xl tw-animate-spin" />
                <span className="tw-text-[#FF43A7] tw-font-bold tw-text-xs tw-uppercase tw-tracking-widest">Uploading Image...</span>
              </div>
            ) : image_uniqueness ? (
              <div className="tw-relative tw-w-full tw-max-w-[500px] tw-group">
                <img
                  src={image_uniqueness}
                  alt="Uniqueness"
                  onClick={() => !isEditMode && setIsModalOpen(true)}
                  className={`tw-w-full tw-h-auto tw-object-cover tw-rounded-[24px] tw-shadow-[0_4px_10px_rgba(0,0,0,0.3)] ${!isEditMode ? 'tw-cursor-pointer hover:tw-opacity-90' : ''} tw-transition-opacity`}
                />
                
                {isEditMode && (
                  <div 
                    onClick={() => fileInputRef.current.click()}
                    className="tw-absolute tw-inset-0 tw-bg-black/60 tw-rounded-[24px] tw-opacity-0 group-hover:tw-opacity-100 tw-transition-opacity tw-flex tw-flex-col tw-items-center tw-justify-center tw-cursor-pointer"
                  >
                    <FontAwesomeIcon icon={faCamera} className="tw-text-white tw-text-3xl tw-mb-2" />
                    <span className="tw-text-white tw-font-bold tw-text-xs tw-uppercase tw-tracking-widest">Change Image</span>
                  </div>
                )}
              </div>
            ) : (
              isEditMode && (
                <div 
                  onClick={() => fileInputRef.current.click()}
                  className="tw-w-full tw-max-w-[500px] tw-aspect-[4/3] tw-bg-[#280D41] tw-border-2 tw-border-dashed tw-border-[#FF43A7] tw-rounded-[24px] tw-flex tw-flex-col tw-items-center tw-justify-center tw-cursor-pointer hover:tw-bg-[#371E51] tw-transition-colors"
                >
                  <div className="tw-w-16 tw-h-16 tw-bg-[#371E51] tw-rounded-full tw-flex tw-items-center tw-justify-center tw-mb-4">
                    <FontAwesomeIcon icon={faCamera} className="tw-text-[#FF43A7] tw-text-2xl" />
                  </div>
                  <h4 className="tw-text-white tw-text-lg tw-font-bold tw-mb-1 tw-font-['Plus_Jakarta_Sans']">Upload Image</h4>
                  <p className="tw-text-[#DDB7FF]/60 tw-text-sm tw-font-['Inter']">Recommended size: 1000x800</p>
                </div>
              )
            )}
          </div>

          {/* Right Side: Text & Inputs */}
          <div className="tw-w-full md:tw-w-1/2 tw-flex tw-flex-col tw-justify-center md:tw-justify-start">
                
            {isEditMode ? (
              <div className="tw-flex tw-flex-col tw-gap-6 tw-w-full">
                {/* Title Input */}
                <div className="tw-flex tw-flex-col tw-gap-2 tw-relative">
                  <FontAwesomeIcon icon={faPenToSquare} className="tw-absolute tw--left-6 tw-top-4 tw-text-[#FF00A0]/50 tw-text-sm" />
                  <input 
                    type="text"
                    value={epkInfo.title_uniqueness || ""}
                    onChange={(e) => onChange("title_uniqueness", e.target.value)}
                    // Clear text immediately on click/focus
                    onFocus={(e) => {
                      setOriginalTitle(e.target.value);
                      onChange("title_uniqueness", "");
                    }}
                    placeholder="Enter Uniqueness Title..."
                    className="tw-w-full tw-text-center tw-text-xl md:tw-text-2xl tw-font-semibold tw-text-[#FF00A0] tw-bg-transparent tw-border-2 tw-border-dashed tw-border-[#FF00A0]/40 tw-rounded-xl tw-p-3 focus:tw-outline-none focus:tw-border-[#FF00A0] tw-transition-colors placeholder:tw-text-[#FF00A0]/30"
                  />
                </div>

                {/* Description Textarea */}
                <div className="tw-flex tw-flex-col tw-gap-2 tw-relative">
                  <FontAwesomeIcon icon={faPenToSquare} className="tw-absolute tw--left-6 tw-top-4 tw-text-white/30 tw-text-sm" />
                  <textarea 
                    value={epkInfo.description_uniqueness || ""}
                    onChange={(e) => onChange("description_uniqueness", e.target.value)}
                    // Clear text immediately on click/focus
                    onFocus={(e) => {
                      setOriginalDesc(e.target.value);
                      onChange("description_uniqueness", "");
                    }}
                    placeholder="Describe what makes your film unique..."
                    className="tw-w-full tw-min-h-[160px] tw-text-center tw-text-base md:tw-text-lg tw-text-white tw-leading-relaxed tw-bg-transparent tw-border-2 tw-border-dashed tw-border-white/30 tw-rounded-xl tw-p-4 focus:tw-outline-none focus:tw-border-white/60 tw-transition-colors tw-resize-none custom-scrollbar placeholder:tw-text-white/30"
                  />
                </div>

                {/* Mobile-only keyboard dismiss / Save buttons */}
                <div className="tw-flex md:tw-hidden tw-justify-end tw-gap-4 tw-mt-2">
                  <button 
                    onClick={() => {
                      // Revert to original text if they cancel
                      if (!epkInfo.title_uniqueness) onChange("title_uniqueness", originalTitle);
                      if (!epkInfo.description_uniqueness) onChange("description_uniqueness", originalDesc);
                      document.activeElement.blur(); 
                    }}
                    className="tw-px-4 tw-py-2 tw-bg-transparent tw-border tw-border-[#5A3F49] tw-rounded-lg tw-text-[#E2BDC9] tw-font-bold tw-text-xs tw-uppercase"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => document.activeElement.blur()} // Drops keyboard
                    className="tw-px-4 tw-py-2 tw-bg-[#FF43A7] tw-text-[#570033] tw-rounded-lg tw-font-bold tw-text-xs tw-uppercase tw-border-none"
                  >
                    Save Edits
                  </button>
                </div>

              </div>
            ) : (
              <div className="tw-flex tw-flex-col tw-gap-6 tw-w-full">
                {/* View Mode Title */}
                <h3 className="tw-text-center tw-text-xl md:tw-text-2xl tw-font-semibold tw-text-[#FF00A0] tw-m-0">
                  {epkInfo.title_uniqueness}
                </h3>
                
                {/* View Mode Description */}
                <p className="tw-text-center tw-text-base md:tw-text-lg tw-text-white tw-leading-relaxed tw-whitespace-pre-wrap tw-m-0">
                  {epkInfo.description_uniqueness}
                </p>
              </div>
            )}
                
          </div>
        </div>

      </div>

      {/* IMAGE MODAL (Only works in View Mode) */}
      {isModalOpen && !isEditMode && (
        <div 
          className="tw-fixed tw-inset-0 tw-z-[100] tw-flex tw-items-center tw-justify-center tw-bg-black/90 tw-p-4" 
          onClick={() => setIsModalOpen(false)}
        >
          <button 
            className="tw-absolute tw-top-4 tw-right-6 tw-text-white tw-text-5xl hover:tw-text-[#FF00A0] tw-transition-colors tw-z-[101]"
            onClick={() => setIsModalOpen(false)}
            aria-label="Close modal"
          >
            &times;
          </button>
          
          <img 
            src={image_uniqueness} 
            alt="Uniqueness" 
            className="tw-w-[90vw] tw-h-auto tw-max-h-[85vh] md:tw-w-auto md:tw-h-[85vh] md:tw-max-w-[90vw] tw-object-contain tw-rounded-[16px] tw-shadow-2xl" 
            onClick={(e) => e.stopPropagation()} 
          />
        </div>
      )}
    </div>
  );
}