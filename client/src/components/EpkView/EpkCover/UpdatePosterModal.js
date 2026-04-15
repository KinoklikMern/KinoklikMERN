import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCloudArrowUp, faXmark } from "@fortawesome/free-solid-svg-icons";

export default function UpdatePosterModal({ isOpen, onClose, epkInfo, onSave }) {
  const [selectedOption, setSelectedOption] = useState("library"); // 'library' or 'local'
  const [selectedLibraryImage, setSelectedLibraryImage] = useState(null);
  
  // Local File States
  const [localFile, setLocalFile] = useState(null);
  const [localPreviewUrl, setLocalPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  const libraryImages = epkInfo?.photo_albums?.posters || [];

  // Automatically select 'local' if library is empty when modal opens
  useEffect(() => {
    if (isOpen) {
      if (libraryImages.length === 0) {
        setSelectedOption("local");
      } else {
        setSelectedOption("library");
      }
    }
  }, [isOpen, libraryImages.length]);

  if (!isOpen) return null;

  const handleLocalFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    if (localPreviewUrl) URL.revokeObjectURL(localPreviewUrl);
    setLocalFile(file);
    setLocalPreviewUrl(URL.createObjectURL(file));
  };

  const handleClose = () => {
    if (localPreviewUrl) URL.revokeObjectURL(localPreviewUrl);
    setLocalFile(null);
    setLocalPreviewUrl(null);
    setSelectedLibraryImage(null);
    onClose();
  };

  const handleSave = () => {
    if (selectedOption === "library" && selectedLibraryImage) {
      onSave({ type: "library", data: selectedLibraryImage });
    } else if (selectedOption === "local" && localFile) {
      onSave({ type: "local", file: localFile });
    }
  };

  return (
    <div className="tw-fixed tw-inset-0 tw-z-[1050] tw-flex tw-items-center tw-justify-center tw-p-4">
      {/* Blurred Backdrop */}
      <div className="tw-absolute tw-inset-0 tw-bg-[#190033]/80 tw-backdrop-blur-sm" onClick={handleClose} />

      {/* Hidden File Input */}
      <input type="file" ref={fileInputRef} onChange={handleLocalFileSelect} accept="image/png,image/jpeg,image/webp" className="tw-hidden" />

      {/* Modal Container */}
      <div className="tw-relative tw-w-full tw-max-w-[448px] tw-bg-[#280D41] tw-border tw-border-[#FFB0CF]/10 tw-shadow-[0_20px_40px_rgba(0,0,0,0.4)] tw-rounded-xl tw-overflow-hidden">
        
        {/* Header */}
        <div className="tw-p-8 tw-pb-4">
          <p className="tw-text-[#FF43A7] tw-text-[10px] tw-font-bold tw-uppercase tw-tracking-widest tw-mb-2">Visual Assets</p>
          <h2 className="tw-text-[#F0DBFF] tw-text-2xl tw-font-bold tw-mb-2">Update Film Cover</h2>
          <p className="tw-text-[#E2BDC9] tw-text-sm tw-m-0">Select how you want to refresh your project's visual identity.</p>
        </div>

        {/* Body */}
        <div className="tw-px-8 tw-py-4 tw-flex tw-flex-col tw-gap-4">
          
          {/* OPTION 1: Library */}
          <div 
            onClick={() => setSelectedOption("library")}
            className={`tw-cursor-pointer tw-border-2 tw-rounded-xl tw-p-4 tw-transition-all ${selectedOption === "library" ? "tw-bg-[#FF43A7]/10 tw-border-[#FF43A7]" : "tw-bg-[#2C1246] tw-border-[#5A3F49]/50 hover:tw-border-[#FF43A7]/50"}`}
          >
            <div className="tw-flex tw-items-start tw-gap-4">
              <div className={`tw-w-5 tw-h-5 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-border-2 tw-mt-0.5 tw-shrink-0 ${selectedOption === "library" ? "tw-bg-[#FF43A7] tw-border-[#FF43A7]" : "tw-bg-[#1F0439] tw-border-[#5A3F49]"}`}>
                {selectedOption === "library" && <FontAwesomeIcon icon={faCheck} className="tw-text-[#570033] tw-text-[10px]" />}
              </div>
              <div>
                <h3 className={`tw-font-bold tw-text-sm tw-m-0 ${selectedOption === "library" ? "tw-text-[#FF43A7]" : "tw-text-[#F0DBFF]"}`}>Choose from existing cover image</h3>
                <p className="tw-text-[11px] tw-text-[#E2BDC9] tw-uppercase tw-mt-1 tw-mb-0">Browse Studio Library</p>
              </div>
            </div>

            {selectedOption === "library" && (
              <div className="tw-mt-6 tw-w-full">
                <div className="tw-flex tw-gap-3 tw-overflow-x-auto custom-scrollbar tw-pb-2">
                  {libraryImages.length > 0 ? libraryImages.map((img, idx) => {
                    const imgUrl = img.image?.startsWith('http') ? img.image : `${process.env.REACT_APP_AWS_URL}/${img.image}`;
                    
                    return (
                      <div 
                        key={idx} 
                        onClick={(e) => { e.stopPropagation(); setSelectedLibraryImage(img); }}
                        className={`tw-relative tw-shrink-0 tw-w-[106px] tw-h-[106px] tw-rounded-lg tw-overflow-hidden tw-cursor-pointer ${selectedLibraryImage === img ? "tw-border-2 tw-border-[#FF43A7]" : "tw-border tw-border-[#5A3F49]/30 tw-opacity-60 hover:tw-opacity-100"}`}
                      >
                        <img src={imgUrl} alt="poster option" className="tw-w-full tw-h-full tw-object-cover" />
                        {selectedLibraryImage === img && (
                          <div className="tw-absolute tw-top-2 tw-right-2 tw-w-5 tw-h-5 tw-bg-[#FF43A7] tw-rounded-full tw-flex tw-items-center tw-justify-center shadow-lg">
                            <FontAwesomeIcon icon={faCheck} className="tw-text-[#570033] tw-text-[10px]" />
                          </div>
                        )}
                      </div>
                    );
                  }) : (
                    <div className="tw-w-full tw-h-[106px] tw-flex tw-items-center tw-justify-center tw-bg-[#1F0439]/50 tw-rounded-lg tw-border tw-border-dashed tw-border-[#5A3F49]">
                      <span className="tw-text-xs tw-text-[#E2BDC9]">No existing posters</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* OPTION 2: Upload Local */}
          <div 
            onClick={() => setSelectedOption("local")}
            className={`tw-cursor-pointer tw-border-2 tw-rounded-xl tw-p-4 tw-transition-all ${selectedOption === "local" ? "tw-bg-[#FF43A7]/10 tw-border-[#FF43A7]" : "tw-bg-[#2C1246] tw-border-[#5A3F49]/50 hover:tw-border-[#FF43A7]/50"}`}
          >
            <div className="tw-flex tw-items-start tw-gap-4">
              <div className={`tw-w-5 tw-h-5 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-border-2 tw-mt-0.5 tw-shrink-0 ${selectedOption === "local" ? "tw-bg-[#FF43A7] tw-border-[#FF43A7]" : "tw-bg-[#1F0439] tw-border-[#5A3F49]"}`}>
                {selectedOption === "local" && <FontAwesomeIcon icon={faCheck} className="tw-text-[#570033] tw-text-[10px]" />}
              </div>
              <div>
                <h3 className={`tw-font-bold tw-text-sm tw-m-0 ${selectedOption === "local" ? "tw-text-[#FF43A7]" : "tw-text-[#F0DBFF]"}`}>Update new cover image</h3>
                <p className="tw-text-[11px] tw-text-[#E2BDC9] tw-uppercase tw-mt-1 tw-mb-0">Upload Local File</p>
              </div>
            </div>

            {selectedOption === "local" && (
              <div className="tw-mt-6 tw-w-full">
                {!localFile ? (
                   <div onClick={(e) => { e.stopPropagation(); fileInputRef.current.click(); }} className="tw-w-full tw-h-[173px] tw-bg-[#42295C]/40 tw-border-2 tw-border-dashed tw-border-[#FF00A0] tw-rounded-xl tw-flex tw-flex-col tw-items-center tw-justify-center hover:tw-bg-[#42295C]/60 tw-transition-colors">
                     <div className="tw-w-12 tw-h-12 tw-bg-[#FF43A7]/20 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-mb-4">
                       <FontAwesomeIcon icon={faCloudArrowUp} className="tw-text-[#FF43A7] tw-text-xl" />
                     </div>
                     <p className="tw-text-sm tw-text-[#E2BDC9] tw-text-center tw-px-8 tw-m-0">Drag and drop your cover image here, or <span className="tw-text-[#FF43A7] tw-font-bold">click to browse files</span></p>
                   </div>
                ) : (
                   <div className="tw-relative tw-w-full tw-h-[250px] tw-rounded-xl tw-overflow-hidden tw-border tw-border-[#FF43A7]">
                      <img src={localPreviewUrl} alt="Preview" className="tw-w-full tw-h-full tw-object-contain tw-bg-black" />
                      <button 
                        onClick={(e) => { e.stopPropagation(); setLocalFile(null); setLocalPreviewUrl(null); }} 
                        className="tw-absolute tw-top-2 tw-right-2 tw-w-8 tw-h-8 tw-bg-black/60 hover:tw-bg-[#FF43A7] tw-rounded-full tw-flex tw-items-center tw-justify-center tw-transition-colors tw-border-none tw-cursor-pointer"
                      >
                        <FontAwesomeIcon icon={faXmark} className="tw-text-white" />
                      </button>
                   </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="tw-px-8 tw-py-6 tw-flex tw-justify-center tw-gap-4 tw-relative tw-overflow-hidden">
          <div className="tw-absolute tw--bottom-10 tw--right-10 tw-w-40 tw-h-40 tw-bg-[#FF43A7]/10 tw-blur-[30px] tw-rounded-full tw-pointer-events-none"></div>
          
          <button 
            onClick={handleSave}
            disabled={(selectedOption === 'library' && !selectedLibraryImage) || (selectedOption === 'local' && !localFile)}
            className="tw-relative tw-z-10 tw-w-[184px] tw-py-3 tw-bg-[#FF43A7] tw-shadow-[0_0_15px_rgba(255,67,167,0.4)] hover:tw-shadow-[0_0_20px_rgba(255,67,167,0.7)] tw-rounded-lg tw-text-[#570033] tw-font-bold tw-text-xs tw-uppercase tw-tracking-widest disabled:tw-opacity-50 disabled:tw-cursor-not-allowed tw-border-none tw-cursor-pointer tw-transition-all"
          >
            Save
          </button>
          
          <button 
            onClick={handleClose} 
            className="tw-relative tw-z-10 tw-w-[186px] tw-py-3 tw-bg-transparent tw-border tw-border-[#5A3F49] hover:tw-bg-white/5 tw-rounded-lg tw-text-[#E2BDC9] tw-font-bold tw-text-xs tw-uppercase tw-tracking-widest tw-cursor-pointer tw-transition-colors"
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
}