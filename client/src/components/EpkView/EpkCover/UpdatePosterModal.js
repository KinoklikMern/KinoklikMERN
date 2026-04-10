import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCloudArrowUp, faXmark, faImages } from "@fortawesome/free-solid-svg-icons";

export default function UpdatePosterModal({ isOpen, onClose, epkInfo, onSave }) {
  const [selectedOption, setSelectedOption] = useState("library"); // 'library' or 'local'
  const [selectedLibraryImage, setSelectedLibraryImage] = useState(null);
  
  // Local File States
  const [localFile, setLocalFile] = useState(null);
  const [localPreviewUrl, setLocalPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  // Pull the current library from the EPK Info
  const libraryImages = epkInfo?.photo_albums?.posters || [];

  // Reset states when modal opens
  useEffect(() => {
    if (isOpen) {
      if (libraryImages.length > 0) {
        setSelectedOption("library");
      } else {
        setSelectedOption("local");
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
    if (selectedOption === 'library' && selectedLibraryImage) {
      onSave({ type: 'library', data: { image: selectedLibraryImage } });
    } else if (selectedOption === 'local' && localFile) {
      onSave({ type: 'local', file: localFile });
    }
  };

  return (
    <div className="tw-fixed tw-inset-0 tw-z-[9999] tw-flex tw-items-center tw-justify-center tw-bg-[#0a0014]/90 tw-backdrop-blur-sm tw-p-4">
      <div className="tw-w-full tw-max-w-3xl tw-bg-[#280D41] tw-border tw-border-[#5A3F49]/40 tw-rounded-2xl tw-shadow-[0_20px_50px_rgba(0,0,0,0.5)] tw-overflow-hidden tw-flex tw-flex-col">

        {/* Header */}
        <div className="tw-flex tw-justify-between tw-items-center tw-px-8 tw-py-6 tw-border-b tw-border-[#371E51]">
          <h2 className="tw-text-white tw-text-2xl tw-font-bold tw-m-0">Update Poster</h2>
          <button onClick={handleClose} className="tw-text-[#AA8894] hover:tw-text-[#FF43A7] tw-bg-transparent tw-border-none tw-cursor-pointer tw-transition-colors">
            <FontAwesomeIcon icon={faXmark} className="tw-text-2xl" />
          </button>
        </div>

        {/* Tabs */}
        <div className="tw-flex tw-border-b tw-border-[#371E51] tw-bg-[#190033]/50">
          <button
            onClick={() => setSelectedOption("library")}
            className={`tw-flex-1 tw-py-4 tw-font-bold tw-text-sm tw-uppercase tw-tracking-widest tw-transition-colors tw-border-none tw-cursor-pointer ${
              selectedOption === "library"
                ? "tw-bg-[#371E51]/50 tw-text-[#FF43A7] tw-border-b-2 tw-border-b-[#FF43A7]"
                : "tw-bg-transparent tw-text-[#AA8894] hover:tw-bg-[#371E51]/30 hover:tw-text-white"
            }`}
          >
            <FontAwesomeIcon icon={faImages} className="tw-mr-2" />
            Media Library
          </button>
          <button
            onClick={() => setSelectedOption("local")}
            className={`tw-flex-1 tw-py-4 tw-font-bold tw-text-sm tw-uppercase tw-tracking-widest tw-transition-colors tw-border-none tw-cursor-pointer ${
              selectedOption === "local"
                ? "tw-bg-[#371E51]/50 tw-text-[#FF43A7] tw-border-b-2 tw-border-b-[#FF43A7]"
                : "tw-bg-transparent tw-text-[#AA8894] hover:tw-bg-[#371E51]/30 hover:tw-text-white"
            }`}
          >
            <FontAwesomeIcon icon={faCloudArrowUp} className="tw-mr-2" />
            Upload Custom
          </button>
        </div>

        {/* Content Area */}
        <div className="tw-p-8 tw-flex-1 tw-overflow-y-auto tw-min-h-[400px] tw-max-h-[60vh] custom-scrollbar">

          {selectedOption === "library" && (
            <div className="tw-flex tw-flex-col tw-h-full">
              {libraryImages.length === 0 ? (
                <div className="tw-flex-1 tw-flex tw-flex-col tw-items-center tw-justify-center tw-text-[#AA8894] tw-gap-4 tw-py-12">
                  <div className="tw-w-20 tw-h-20 tw-bg-[#190033] tw-rounded-full tw-flex tw-items-center tw-justify-center">
                    <FontAwesomeIcon icon={faImages} className="tw-text-3xl tw-opacity-50" />
                  </div>
                  <p className="tw-text-center tw-m-0 tw-leading-relaxed">No posters found in your media library.<br/>Any custom posters you upload will be saved here automatically.</p>
                  <button
                    onClick={() => setSelectedOption("local")}
                    className="tw-mt-4 tw-text-[#FF43A7] tw-font-bold tw-uppercase tw-tracking-widest tw-text-xs tw-underline tw-bg-transparent tw-border-none tw-cursor-pointer"
                  >
                    Upload a new poster
                  </button>
                </div>
              ) : (
                <div className="tw-grid tw-grid-cols-2 sm:tw-grid-cols-3 md:tw-grid-cols-4 tw-gap-6">
                  {libraryImages.map((img, idx) => {
                    const imgUrl = img.image?.startsWith('http') ? img.image : `${process.env.REACT_APP_AWS_URL}/${img.image}`;
                    const isSelected = selectedLibraryImage === img.image;

                    return (
                      <div
                        key={idx}
                        onClick={() => setSelectedLibraryImage(img.image)}
                        className={`tw-relative tw-aspect-[2/3] tw-rounded-xl tw-overflow-hidden tw-cursor-pointer tw-border-2 tw-transition-all ${
                          isSelected ? 'tw-border-[#FF43A7] tw-shadow-[0_0_20px_rgba(255,67,167,0.4)] tw-scale-105' : 'tw-border-transparent hover:tw-border-[#FF43A7]/50'
                        }`}
                      >
                        <img src={imgUrl} alt={`Poster ${idx}`} className="tw-w-full tw-h-full tw-object-cover" />
                        {isSelected && (
                          <div className="tw-absolute tw-inset-0 tw-bg-[#FF43A7]/20 tw-flex tw-items-center tw-justify-center">
                            <div className="tw-bg-[#FF43A7] tw-text-white tw-w-10 tw-h-10 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-shadow-lg">
                              <FontAwesomeIcon icon={faCheck} className="tw-text-lg" />
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {selectedOption === "local" && (
            <div className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-h-full tw-py-4">
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleLocalFileSelect}
                className="tw-hidden"
              />

              {!localPreviewUrl ? (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="tw-w-full tw-max-w-xs md:tw-max-w-sm tw-aspect-[2/3] tw-bg-[#190033] tw-border-2 tw-border-dashed tw-border-[#5A3F49] hover:tw-border-[#FF43A7] tw-rounded-2xl tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-4 tw-cursor-pointer tw-transition-colors group"
                >
                  <div className="tw-w-16 tw-h-16 tw-bg-[#371E51] group-hover:tw-bg-[#FF43A7]/20 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-transition-colors">
                    <FontAwesomeIcon icon={faCloudArrowUp} className="tw-text-2xl tw-text-[#AA8894] group-hover:tw-text-[#FF43A7]" />
                  </div>
                  <div className="tw-text-center tw-px-4">
                    <p className="tw-text-white tw-font-bold tw-text-lg tw-m-0">Click to upload custom poster</p>
                    <p className="tw-text-[#AA8894] tw-text-xs tw-mt-2">JPEG or PNG up to 10MB<br/>(Recommended Ratio 2:3)</p>
                  </div>
                </div>
              ) : (
                <div className="tw-relative tw-w-full tw-max-w-xs md:tw-max-w-sm tw-aspect-[2/3] tw-rounded-2xl tw-overflow-hidden tw-border-2 tw-border-[#FF43A7] tw-shadow-[0_0_25px_rgba(255,67,167,0.3)]">
                  <img src={localPreviewUrl} alt="Preview" className="tw-w-full tw-h-full tw-object-cover" />
                  <button
                    onClick={(e) => { e.stopPropagation(); setLocalPreviewUrl(null); setLocalFile(null); }}
                    className="tw-absolute tw-top-4 tw-right-4 tw-w-10 tw-h-10 tw-bg-black/60 hover:tw-bg-red-500 tw-rounded-full tw-border-none tw-cursor-pointer tw-flex tw-items-center tw-justify-center tw-transition-colors"
                  >
                    <FontAwesomeIcon icon={faXmark} className="tw-text-white tw-text-lg" />
                  </button>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="tw-px-8 tw-py-6 tw-flex tw-justify-between tw-items-center tw-border-t tw-border-[#371E51] tw-bg-[#190033]/50">
          <button
            onClick={handleClose}
            className="tw-bg-transparent tw-border-none tw-text-[#E2BDC9] tw-text-sm tw-font-bold tw-uppercase tw-tracking-widest hover:tw-text-white tw-transition-colors tw-cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={(selectedOption === 'library' && !selectedLibraryImage) || (selectedOption === 'local' && !localFile)}
            className="tw-px-8 tw-py-3 tw-bg-[#FF43A7] hover:tw-bg-[#ff5cac] tw-text-[#570033] tw-font-bold tw-text-xs tw-uppercase tw-tracking-widest tw-rounded-lg tw-border-none tw-cursor-pointer tw-shadow-[0_0_15px_rgba(255,67,167,0.4)] tw-transition-all disabled:tw-opacity-50 disabled:tw-cursor-not-allowed"
          >
            Save Selection
          </button>
        </div>

      </div>
    </div>
  );
}