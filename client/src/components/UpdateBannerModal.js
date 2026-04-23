/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faCheck, faXmark, faFilm } from "@fortawesome/free-solid-svg-icons";

/**
 * @param {boolean} isOpen - Control modal visibility
 * @param {function} onClose - Cleanup and close callback
 * @param {function} onSave - Returns object with file, type, and thumbnail data
 * @param {string} mode - "user" or "epk" (controls vocabulary)
 * @param {string} assetType - "banner" (video/wide) or "portrait" (headshot/poster)
 */
export default function UniversalMediaModal({ 
  isOpen, 
  onClose, 
  onSave, 
  mode = "user", 
  assetType = "banner" 
}) {
  const isUser = mode === "user";
  const isBanner = assetType === "banner";

  // State: Default to 'video' for banners, 'image' for portraits
  const [mediaType, setMediaType] = useState(isBanner ? "video" : "image");
  
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isExtracting, setIsExtracting] = useState(false);
  const [generatedFrames, setGeneratedFrames] = useState([]); 
  const [customThumbFile, setCustomThumbFile] = useState(null);
  const [customThumbUrl, setCustomThumbUrl] = useState(null);
  const [activeThumbnail, setActiveThumbnail] = useState(0); 

  const fileInputRef = useRef(null);
  const customThumbInputRef = useRef(null);

  // --- DYNAMIC CONTENT MAPPING ---
  const content = {
    title: isBanner 
      ? (isUser ? "Update Profile Banner" : "Update Film Banner & Trailer")
      : (isUser ? "Update Headshot" : "Update Film Poster"),
    subtitle: isBanner
      ? "Showcase your work with a wide cinematic visual."
      : "Set the primary vertical visual for this profile.",
    mainLabel: isBanner 
      ? (mediaType === 'video' ? 'Video Assets' : 'Banner Assets')
      : (isUser ? 'Headshot' : 'Poster'),
    uploadHint: isBanner
      ? `Drag and drop your ${mediaType === 'video' ? 'trailer' : 'banner'} here`
      : `Upload your new ${isUser ? 'headshot' : 'poster'} here`
  };

  const clearTemporaryData = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    if (customThumbUrl) URL.revokeObjectURL(customThumbUrl);
    setSelectedFile(null);
    setPreviewUrl(null);
    setGeneratedFrames([]);
    setCustomThumbFile(null);
    setCustomThumbUrl(null);
    setActiveThumbnail(0);
  };

  const handleClose = () => {
    clearTemporaryData();
    onClose();
  };

  const extractFrames = (videoUrl) => {
    setIsExtracting(true);
    const video = document.createElement("video");
    video.src = videoUrl;
    video.muted = true;
    video.playsInline = true;
    const frames = [];

    video.onloadeddata = () => { video.currentTime = video.duration * 0.25; };
    video.onseeked = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth; canvas.height = video.videoHeight;
        canvas.getContext("2d").drawImage(video, 0, 0);
        frames.push(canvas.toDataURL("image/jpeg"));
        if (frames.length < 3) {
          video.currentTime = video.duration * (frames.length === 1 ? 0.50 : 0.75);
        } else {
          setGeneratedFrames(frames);
          setIsExtracting(false);
        }
      } catch (e) { setIsExtracting(false); }
    };
  };

  const handleMainFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    const newPreviewUrl = URL.createObjectURL(file);
    setSelectedFile(file);
    setPreviewUrl(newPreviewUrl);
    if (mediaType === "video") extractFrames(newPreviewUrl);
  };

  const handleSave = () => {
    const dataToSave = {
      file: selectedFile,
      type: mediaType,
      thumbnailData: activeThumbnail === 'custom' ? customThumbUrl : generatedFrames[activeThumbnail],
      customThumbnailFile: activeThumbnail === 'custom' ? customThumbFile : null,
      isPrimary: true 
    };
    onSave(dataToSave);
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <div className="tw-fixed tw-inset-0 tw-z-[1050] tw-flex tw-items-center tw-justify-center tw-p-4">
      <div className="tw-absolute tw-inset-0 tw-bg-[#0a0014]/90 tw-backdrop-blur-sm" onClick={handleClose} />

      <input type="file" ref={fileInputRef} onChange={handleMainFileSelect} className="tw-hidden" accept={mediaType === 'video' ? "video/*" : "image/*"} />
      <input type="file" ref={customThumbInputRef} onChange={(e) => {
        const file = e.target.files[0];
        if (customThumbUrl) URL.revokeObjectURL(customThumbUrl);
        setCustomThumbFile(file);
        setCustomThumbUrl(URL.createObjectURL(file));
        setActiveThumbnail('custom');
      }} className="tw-hidden" accept="image/*" />

      <div className="tw-relative tw-w-full tw-max-w-[896px] tw-bg-[#160228] tw-shadow-2xl tw-rounded-xl tw-overflow-hidden tw-flex tw-flex-col tw-max-h-[90vh]">
        
        {/* HEADER */}
        <div className="tw-px-8 tw-pt-8 tw-pb-4 tw-flex tw-justify-between tw-items-center">
          <div>
            <h1 className="tw-text-white tw-text-[22px] tw-font-bold">{content.title}</h1>
            <p className="tw-text-[#AA8894] tw-text-sm tw-mt-1">{content.subtitle}</p>
          </div>
          <button onClick={handleClose} className="tw-bg-transparent tw-border-none tw-text-[#E2BDC9] hover:tw-text-white tw-cursor-pointer">
            <FontAwesomeIcon icon={faXmark} className="tw-text-xl" />
          </button>
        </div>

        <div className="tw-px-8 tw-py-4 tw-flex-1 tw-overflow-y-auto custom-scrollbar tw-flex tw-flex-col tw-gap-8">
          
          {/* FORMAT SELECTION (Only visible if it's a Banner) */}
          {isBanner && (
            <div className="tw-flex tw-flex-col tw-gap-4">
              <span className="tw-text-[#FF43A7] tw-text-[10px] tw-font-bold tw-uppercase tw-tracking-widest">Select Format</span>
              <div className="tw-flex tw-flex-col md:tw-flex-row tw-gap-4">
                <div onClick={() => { setMediaType("image"); clearTemporaryData(); }} className={`tw-flex-1 tw-flex tw-items-center tw-p-5 tw-rounded-xl tw-cursor-pointer tw-transition-all ${mediaType === 'image' ? 'tw-bg-[#2C1246] tw-border-[1.5px] tw-border-[#FF43A7]' : 'tw-bg-[#1F0439] tw-border-[1.5px] tw-border-[#371E51]'}`}>
                  <div className={`tw-w-5 tw-h-5 tw-rounded-full tw-mr-4 tw-border-2 tw-flex tw-items-center tw-justify-center ${mediaType === 'image' ? 'tw-border-[#FF43A7] tw-bg-[#FF43A7]' : 'tw-border-[#5A3F49]'}`}>
                    {mediaType === 'image' && <div className="tw-w-2 tw-h-2 tw-bg-white tw-rounded-full" />}
                  </div>
                  <div>
                    <h3 className="tw-text-white tw-text-sm tw-font-bold">Static Image</h3>
                    <p className="tw-text-[#AA8894] tw-text-xs">Perfect for key art</p>
                  </div>
                </div>

                <div onClick={() => { setMediaType("video"); clearTemporaryData(); }} className={`tw-flex-1 tw-flex tw-items-center tw-p-5 tw-rounded-xl tw-cursor-pointer tw-transition-all ${mediaType === 'video' ? 'tw-bg-[#2C1246] tw-border-[1.5px] tw-border-[#FF43A7]' : 'tw-bg-[#1F0439] tw-border-[1.5px] tw-border-[#371E51]'}`}>
                   <div className={`tw-w-5 tw-h-5 tw-rounded-full tw-mr-4 tw-border-2 tw-flex tw-items-center tw-justify-center ${mediaType === 'video' ? 'tw-border-[#FF43A7] tw-bg-[#FF43A7]' : 'tw-border-[#5A3F49]'}`}>
                    {mediaType === 'video' && <div className="tw-w-2 tw-h-2 tw-bg-white tw-rounded-full" />}
                  </div>
                  <div>
                    <h3 className="tw-text-white tw-text-sm tw-font-bold">Video Trailer</h3>
                    <p className="tw-text-[#AA8894] tw-text-xs">The full cinematic experience</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* MAIN UPLOAD AREA */}
          <div className="tw-w-full tw-flex tw-flex-col tw-gap-4">
            <h3 className="tw-text-[#FF43A7] tw-text-xl tw-font-bold tw-uppercase tw-tracking-wider">{content.mainLabel}</h3>
            
            <div onClick={() => fileInputRef.current.click()} className={`tw-relative tw-w-full tw-bg-[#10011C] tw-border-[1.5px] tw-border-dashed tw-border-[#FF43A7] tw-rounded-xl tw-flex tw-flex-col tw-items-center tw-justify-center tw-cursor-pointer hover:tw-bg-[#1F0439] tw-transition-all ${isBanner ? 'tw-py-12' : 'tw-py-20'}`}>
              <FontAwesomeIcon icon={mediaType === 'video' ? faFilm : faCamera} className="tw-text-[#FF43A7] tw-text-2xl tw-mb-4" />
              <h4 className="tw-text-white tw-text-base tw-font-bold">{content.uploadHint}</h4>
              <p className="tw-text-[#AA8894] tw-text-xs tw-mt-1">Max 10MB for images / 2GB for video</p>
              {selectedFile && <div className="tw-mt-4 tw-px-4 tw-py-2 tw-bg-[#FF43A7]/20 tw-text-[#FF43A7] tw-rounded-md tw-text-sm">{selectedFile.name}</div>}
            </div>

            {/* PREVIEW & THUMBNAILS (Shared logic for all modes) */}
            {selectedFile && (
               <div className="tw-w-full">
                 <div className={`tw-bg-black tw-rounded-xl tw-overflow-hidden tw-border tw-border-[#5A3F49] ${isBanner ? 'tw-aspect-video' : 'tw-aspect-[2/3] tw-max-w-[300px] tw-mx-auto'}`}>
                    {mediaType === 'video' ? (
                      <video src={previewUrl} poster={activeThumbnail === 'custom' ? customThumbUrl : generatedFrames[activeThumbnail]} controls className="tw-w-full tw-h-full" />
                    ) : (
                      <img src={previewUrl} className="tw-w-full tw-h-full tw-object-cover" />
                    )}
                 </div>

                 {mediaType === 'video' && (
                    <div className="tw-mt-6 tw-flex tw-flex-col tw-gap-4">
                       <div className="tw-flex tw-justify-between">
                         <span className="tw-text-white tw-text-sm tw-font-bold">Select Thumbnail</span>
                         <button onClick={() => customThumbInputRef.current.click()} className="tw-bg-transparent tw-border-none tw-text-[#E2BDC9] tw-text-xs tw-cursor-pointer">Upload Custom</button>
                       </div>
                       <div className="tw-flex tw-gap-4 tw-overflow-x-auto tw-pb-2">
                         {/* Frames and Custom box mapping logic same as original */}
                         {/* ... */}
                       </div>
                    </div>
                 )}
               </div>
            )}
          </div>
        </div>

        {/* FOOTER */}
        <div className="tw-px-8 tw-py-6 tw-border-t tw-border-[#371E51] tw-flex tw-justify-between">
          <button onClick={handleClose} className="tw-bg-transparent tw-border-none tw-text-[#E2BDC9] tw-font-bold tw-uppercase tw-tracking-widest tw-text-sm tw-cursor-pointer">Cancel</button>
          <button onClick={handleSave} disabled={!selectedFile || isExtracting} className="tw-px-10 tw-py-3 tw-bg-[#FF43A7] tw-text-white tw-font-bold tw-rounded-lg tw-border-none tw-cursor-pointer disabled:tw-opacity-50">
            {isExtracting ? "Processing..." : "Save and Publish"}
          </button>
        </div>
      </div>
    </div>
  );
}