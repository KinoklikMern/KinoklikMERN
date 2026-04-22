import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp, faXmark } from "@fortawesome/free-solid-svg-icons";

export default function UpdateProfilePhotoModal({ isOpen, onClose, onSave }) {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleFileSelect = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(selected);
    setPreviewUrl(URL.createObjectURL(selected));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleClose = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(null);
    setPreviewUrl(null);
    onClose();
  };

  const handleSave = () => {
    if (!file) return;
    onSave(file);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(null);
    setPreviewUrl(null);
  };

  return (
    <div className="tw-fixed tw-inset-0 tw-z-[1050] tw-flex tw-items-center tw-justify-center tw-p-4">
      <div className="tw-absolute tw-inset-0 tw-bg-[#190033]/80 tw-backdrop-blur-sm" onClick={handleClose} />

      <input type="file" ref={fileInputRef} onChange={handleFileSelect} accept="image/png,image/jpeg,image/webp" className="tw-hidden" />

      <div className="tw-relative tw-w-full tw-max-w-[448px] tw-bg-[#280D41] tw-border tw-border-[#FFB0CF]/10 tw-shadow-[0_20px_40px_rgba(0,0,0,0.4)] tw-rounded-xl tw-overflow-hidden">

        {/* Header */}
        <div className="tw-p-8 tw-pb-4 tw-flex tw-justify-between tw-items-start">
          <div>
            <p className="tw-text-[#FF43A7] tw-text-[10px] tw-font-bold tw-uppercase tw-tracking-widest tw-mb-2">Visual Assets</p>
            <h2 className="tw-text-[#F0DBFF] tw-text-2xl tw-font-bold tw-mb-2">Update Profile Photo</h2>
            <p className="tw-text-[#E2BDC9] tw-text-sm tw-m-0">Upload a new profile photo.</p>
          </div>
          <button onClick={handleClose} className="tw-bg-transparent tw-border-none tw-outline-none tw-text-[#E2BDC9] hover:tw-text-white tw-cursor-pointer tw-p-0">
            <FontAwesomeIcon icon={faXmark} className="tw-text-xl" />
          </button>
        </div>

        {/* Body */}
        <div className="tw-px-8 tw-py-4 tw-flex tw-flex-col tw-gap-4">
          {!file ? (
            <div
              onClick={() => fileInputRef.current.click()}
              className="tw-w-full tw-h-[173px] tw-bg-[#42295C]/40 tw-border-2 tw-border-dashed tw-border-[#FF00A0] tw-rounded-xl tw-flex tw-flex-col tw-items-center tw-justify-center hover:tw-bg-[#42295C]/60 tw-transition-colors tw-cursor-pointer"
            >
              <div className="tw-w-12 tw-h-12 tw-bg-[#FF43A7]/20 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-mb-4">
                <FontAwesomeIcon icon={faCloudArrowUp} className="tw-text-[#FF43A7] tw-text-xl" />
              </div>
              <p className="tw-text-sm tw-text-[#E2BDC9] tw-text-center tw-px-8 tw-m-0">
                Drag and drop your photo here, or <span className="tw-text-[#FF43A7] tw-font-bold">click to browse files</span>
              </p>
            </div>
          ) : (
            <div className="tw-relative tw-w-full tw-h-[250px] tw-rounded-xl tw-overflow-hidden tw-border tw-border-[#FF43A7]">
              <img src={previewUrl} alt="Preview" className="tw-w-full tw-h-full tw-object-contain tw-bg-black" />
              <button
                onClick={() => { if (previewUrl) URL.revokeObjectURL(previewUrl); setFile(null); setPreviewUrl(null); }}
                className="tw-absolute tw-top-2 tw-right-2 tw-w-8 tw-h-8 tw-bg-black/60 hover:tw-bg-[#FF43A7] tw-rounded-full tw-flex tw-items-center tw-justify-center tw-transition-colors tw-border-none tw-cursor-pointer"
              >
                <FontAwesomeIcon icon={faXmark} className="tw-text-white" />
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="tw-px-8 tw-py-6 tw-flex tw-justify-center tw-gap-4 tw-relative tw-overflow-hidden">
          <div className="tw-absolute tw--bottom-10 tw--right-10 tw-w-40 tw-h-40 tw-bg-[#FF43A7]/10 tw-blur-[30px] tw-rounded-full tw-pointer-events-none" />
          <button
            onClick={handleSave}
            disabled={!file}
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
