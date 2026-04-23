/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCloudArrowUp, faXmark } from "@fortawesome/free-solid-svg-icons";

export default function UpdateImageModal({ isOpen, onClose, libraryImages = [], onSave, mode = "epk" }) {
  const [selectedOption, setSelectedOption] = useState("library");
  const [selectedLibraryImage, setSelectedLibraryImage] = useState(null);
  const [localFile, setLocalFile] = useState(null);
  const [localPreviewUrl, setLocalPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  const isUser = mode === "user";

  useEffect(() => {
    if (isOpen) {
      setSelectedOption(libraryImages?.length > 0 ? "library" : "local");
    }
  }, [isOpen, libraryImages?.length]);

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
      <div className="tw-absolute tw-inset-0 tw-bg-[#190033]/80 tw-backdrop-blur-sm" onClick={handleClose} />
      <input type="file" ref={fileInputRef} onChange={handleLocalFileSelect} accept="image/*" className="tw-hidden" />

      <div className="tw-relative tw-w-full tw-max-w-[448px] tw-bg-[#280D41] tw-border tw-border-[#FFB0CF]/10 tw-shadow-2xl tw-rounded-xl tw-overflow-hidden">
        <div className="tw-p-8 tw-pb-4">
          <p className="tw-text-[#FF43A7] tw-text-[10px] tw-font-bold tw-uppercase tw-tracking-widest tw-mb-2">Visual Assets</p>
          <h2 className="tw-text-[#F0DBFF] tw-text-2xl tw-font-bold tw-mb-2">
            {isUser ? "Update Headshot" : "Update Film Cover"}
          </h2>
          <p className="tw-text-[#E2BDC9] tw-text-sm tw-m-0">
            {isUser ? "Choose a primary profile photo." : "Refresh your project's visual identity."}
          </p>
        </div>

        <div className="tw-px-8 tw-py-4 tw-flex tw-flex-col tw-gap-4">
          {/* Library Option */}
          <div onClick={() => setSelectedOption("library")} className={`tw-cursor-pointer tw-border-2 tw-rounded-xl tw-p-4 ${selectedOption === "library" ? "tw-bg-[#FF43A7]/10 tw-border-[#FF43A7]" : "tw-bg-[#2C1246] tw-border-[#5A3F49]/50"}`}>
            <div className="tw-flex tw-items-start tw-gap-4">
              <div className={`tw-w-5 tw-h-5 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-border-2 ${selectedOption === "library" ? "tw-bg-[#FF43A7] tw-border-[#FF43A7]" : "tw-border-[#5A3F49]"}`}>
                {selectedOption === "library" && <FontAwesomeIcon icon={faCheck} className="tw-text-[#570033] tw-text-[10px]" />}
              </div>
              <h3 className={`tw-font-bold tw-text-sm ${selectedOption === "library" ? "tw-text-[#FF43A7]" : "tw-text-[#F0DBFF]"}`}>
                {isUser ? "Choose from existing headshots" : "Choose from existing covers"}
              </h3>
            </div>

            {selectedOption === "library" && (
              <div className="tw-mt-6 tw-flex tw-gap-3 tw-overflow-x-auto custom-scrollbar tw-pb-2">
                {libraryImages?.length > 0 ? libraryImages.map((img, idx) => (
                  <div key={idx} onClick={(e) => { e.stopPropagation(); setSelectedLibraryImage(img); }} className={`tw-relative tw-shrink-0 tw-w-[106px] tw-h-[106px] tw-rounded-lg tw-overflow-hidden ${selectedLibraryImage === img ? "tw-border-2 tw-border-[#FF43A7]" : "tw-opacity-60"}`}>
                    <img src={img.image?.startsWith('http') ? img.image : `${process.env.REACT_APP_AWS_URL}/${img.image}`} alt="option" className="tw-w-full tw-h-full tw-object-cover" />
                  </div>
                )) : <span className="tw-text-xs tw-text-[#E2BDC9]">Library is empty</span>}
              </div>
            )}
          </div>

          {/* Local Upload */}
          <div onClick={() => setSelectedOption("local")} className={`tw-cursor-pointer tw-border-2 tw-rounded-xl tw-p-4 ${selectedOption === "local" ? "tw-bg-[#FF43A7]/10 tw-border-[#FF43A7]" : "tw-bg-[#2C1246] tw-border-[#5A3F49]/50"}`}>
             <h3 className={`tw-font-bold tw-text-sm ${selectedOption === "local" ? "tw-text-[#FF43A7]" : "tw-text-[#F0DBFF]"}`}>Upload New File</h3>
             {selectedOption === "local" && (
                <div className="tw-mt-4">
                  {!localFile ? (
                    <div onClick={(e) => { e.stopPropagation(); fileInputRef.current.click(); }} className="tw-w-full tw-h-[120px] tw-border-2 tw-border-dashed tw-border-[#FF00A0] tw-rounded-xl tw-flex tw-flex-col tw-items-center tw-justify-center">
                      <FontAwesomeIcon icon={faCloudArrowUp} className="tw-text-[#FF43A7] tw-mb-2" />
                      <span className="tw-text-xs tw-text-[#E2BDC9]">Click to browse</span>
                    </div>
                  ) : (
                    <img src={localPreviewUrl} className="tw-w-full tw-h-[120px] tw-object-contain tw-bg-black tw-rounded-lg" />
                  )}
                </div>
             )}
          </div>
        </div>

        <div className="tw-px-8 tw-py-6 tw-flex tw-justify-center tw-gap-4">
          <button onClick={handleSave} disabled={!selectedLibraryImage && !localFile} className="tw-w-1/2 tw-py-3 tw-bg-[#FF43A7] tw-text-[#570033] tw-font-bold tw-rounded-lg tw-border-none tw-cursor-pointer disabled:tw-opacity-50">Save</button>
          <button onClick={handleClose} className="tw-w-1/2 tw-py-3 tw-bg-transparent tw-border tw-border-[#5A3F49] tw-text-[#E2BDC9] tw-font-bold tw-rounded-lg tw-cursor-pointer">Cancel</button>
        </div>
      </div>
    </div>
  );
}