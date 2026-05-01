import  { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faCheck, faXmark, faFilm } from "@fortawesome/free-solid-svg-icons";

export default function UpdateBannerModal({ isOpen, onClose, onSave }) {
  const { t } = useTranslation();
  const [mediaType, setMediaType] = useState("image"); // 'image' or 'video'
  
  // Local File States
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  
  // Thumbnail States
  const [isExtracting, setIsExtracting] = useState(false);
  const [generatedFrames, setGeneratedFrames] = useState([]); 
  const [customThumbFile, setCustomThumbFile] = useState(null);
  const [customThumbUrl, setCustomThumbUrl] = useState(null);
  const [activeThumbnail, setActiveThumbnail] = useState(0); 

  const fileInputRef = useRef(null);
  const customThumbInputRef = useRef(null);

  // --- CLEANUP LOGIC ---
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

  // --- VIDEO FRAME EXTRACTION ---
  const extractFrames = (videoUrl) => {
    setIsExtracting(true);
    const video = document.createElement("video");
    video.src = videoUrl;
    video.muted = true;
    video.playsInline = true;

    const frames = [];

    // Failsafe: If extraction crashes, stop the spinner
    video.onerror = () => {
      console.error("Error loading video for frame extraction.");
      setIsExtracting(false);
    };    
    video.onloadeddata = () => {
      video.currentTime = video.duration * 0.25;
    };

    video.onseeked = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext("2d").drawImage(video, 0, 0);
        frames.push(canvas.toDataURL("image/jpeg"));

        if (frames.length === 1) {
          video.currentTime = video.duration * 0.50; // Grab middle frame
        } else if (frames.length === 2) {
          video.currentTime = video.duration * 0.75; // Grab late frame
        } else {
          setGeneratedFrames(frames);
          setIsExtracting(false);
        }
      } catch (error) {
        console.error("Frame extraction failed (likely CORS or Codec issue):", error);
        setIsExtracting(false);
      }
    };
  };

  // --- HANDLERS ---
  const handleMainFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Clean up old preview if they are swapping a new file in
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    
    const newPreviewUrl = URL.createObjectURL(file);
    setSelectedFile(file);
    setPreviewUrl(newPreviewUrl);
    
    if (mediaType === "video") {
      extractFrames(newPreviewUrl);
    }

    // Reset input value so they can select the exact same file again if they cancel
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleCustomThumbSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (customThumbUrl) URL.revokeObjectURL(customThumbUrl);

    setCustomThumbFile(file);
    setCustomThumbUrl(URL.createObjectURL(file));
    setActiveThumbnail('custom'); 
    
    if (customThumbInputRef.current) customThumbInputRef.current.value = "";
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
    clearTemporaryData();
  };

  if (!isOpen) return null;

  return (
    <div className="tw-fixed tw-inset-0 tw-z-[1050] tw-flex tw-items-center tw-justify-center tw-p-4">
      {/* Darkened Backdrop */}
      <div className="tw-absolute tw-inset-0 tw-bg-[#0a0014]/90 tw-backdrop-blur-sm" />

      {/* Hidden Inputs */}
      <input type="file" ref={fileInputRef} onChange={handleMainFileSelect} className="tw-hidden" accept={mediaType === 'video' ? "video/mp4,video/webm,video/quicktime" : "image/png,image/jpeg,image/webp"} />
      <input type="file" ref={customThumbInputRef} onChange={handleCustomThumbSelect} className="tw-hidden" accept="image/png,image/jpeg,image/webp" />

      {/* Modal Container */}
      <div className="tw-relative tw-w-full tw-max-w-[896px] tw-bg-[#160228] tw-shadow-[0_20px_50px_rgba(0,0,0,0.8)] tw-rounded-xl tw-overflow-hidden tw-flex tw-flex-col tw-max-h-[90vh]">
        
        {/* Header */}
        <div className="tw-px-8 tw-pt-8 tw-pb-4 tw-flex tw-justify-between tw-items-center tw-shrink-0">
          <h1 className="tw-text-white tw-text-[22px] tw-font-bold tw-tracking-tight">{t("Update Banner or Trailer")}</h1>
          
          <button 
            onClick={handleClose} 
            className="tw-bg-transparent tw-border-none tw-outline-none tw-shadow-none tw-p-0 tw-m-0 tw-text-[#E2BDC9] hover:tw-text-white tw-transition-colors tw-cursor-pointer"
          >
            <FontAwesomeIcon icon={faXmark} className="tw-text-xl" />
          </button>
        </div>

        {/* Body Content */}
        <div className="tw-px-8 tw-py-4 tw-flex-1 tw-overflow-y-auto custom-scrollbar tw-flex tw-flex-col tw-gap-8">
          
          {/* --- FORMAT SELECTION --- */}
          <div className="tw-flex tw-flex-col tw-gap-4">
            <span className="tw-text-[#FF43A7] tw-text-[10px] tw-font-bold tw-uppercase tw-tracking-widest">{t("Select Format")}</span>
            <div className="tw-flex tw-flex-col md:tw-flex-row tw-gap-4">
              
              {/* Image Card */}
              <div 
                onClick={() => setMediaType("image")}
                className={`tw-flex-1 tw-flex tw-items-center tw-p-5 tw-rounded-xl tw-cursor-pointer tw-transition-all ${
                  mediaType === 'image' ? 'tw-bg-[#2C1246] tw-border-[1.5px] tw-border-[#FF43A7]' : 'tw-bg-[#1F0439] tw-border-[1.5px] tw-border-[#371E51] hover:tw-border-[#FF43A7]/50'
                }`}
              >
                <div className="tw-mr-4 tw-flex-shrink-0">
                  <div className={`tw-w-5 tw-h-5 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-border-2 ${mediaType === 'image' ? 'tw-border-[#FF43A7] tw-bg-[#FF43A7]' : 'tw-border-[#5A3F49] tw-bg-transparent'}`}>
                    {mediaType === 'image' && <div className="tw-w-2 tw-h-2 tw-bg-white tw-rounded-full" />}
                  </div>
                </div>
                <div>
                  <h3 className="tw-text-white tw-text-sm tw-font-bold">{t("Upload Static Banner Image")}</h3>
                  <p className="tw-text-[#AA8894] tw-text-xs tw-mt-0.5">{t("Recommended for film posters or key art")}</p>
                </div>
              </div>

              {/* Video Card */}
              <div 
                onClick={() => setMediaType("video")}
                className={`tw-flex-1 tw-flex tw-items-center tw-p-5 tw-rounded-xl tw-cursor-pointer tw-transition-all ${
                  mediaType === 'video' ? 'tw-bg-[#2C1246] tw-border-[1.5px] tw-border-[#FF43A7]' : 'tw-bg-[#1F0439] tw-border-[1.5px] tw-border-[#371E51] hover:tw-border-[#FF43A7]/50'
                }`}
              >
                <div className="tw-mr-4 tw-flex-shrink-0">
                  <div className={`tw-w-5 tw-h-5 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-border-2 ${mediaType === 'video' ? 'tw-border-[#FF43A7] tw-bg-[#FF43A7]' : 'tw-border-[#5A3F49] tw-bg-transparent'}`}>
                    {mediaType === 'video' && <div className="tw-w-2 tw-h-2 tw-bg-white tw-rounded-full" />}
                  </div>
                </div>
                <div>
                  <h3 className="tw-text-white tw-text-sm tw-font-bold">{t("Upload Cinematic Video Trailer")}</h3>
                  <p className="tw-text-[#AA8894] tw-text-xs tw-mt-0.5">{t("Full cinematic experience for viewers")}</p>
                </div>
              </div>
            </div>
          </div>

          {/* --- MAIN ASSETS AREA --- */}
          <div className="tw-w-full tw-flex tw-flex-col tw-gap-4">
            
            <div className="tw-flex tw-justify-between tw-items-end">
              <h3 className="tw-text-[#FF43A7] tw-text-2xl tw-font-bold tw-uppercase tw-tracking-wider">
                {mediaType === 'video' ? t('Video Assets') : t('Banner Assets')}
              </h3>
              
              {mediaType === 'video' && (
                <div className="tw-flex tw-flex-col tw-gap-1.5">
                  <span className="tw-text-[#AA8894] tw-text-[10px] tw-uppercase tw-tracking-widest tw-font-semibold">{t("Save To")}</span>
                  <select className="tw-bg-[#2C1246] tw-text-white tw-border tw-border-[#371E51] tw-rounded-md tw-px-4 tw-py-2 tw-text-sm tw-outline-none tw-w-[140px] tw-appearance-none">
                    <option>{t("Trailer")}</option>
                  </select>
                </div>
              )}
            </div>

            <div 
              onClick={() => fileInputRef.current.click()} 
              className={`tw-relative tw-w-full tw-bg-[#10011C] tw-border-[1.5px] tw-border-dashed tw-border-[#FF43A7] tw-rounded-xl tw-flex tw-flex-col tw-items-center tw-justify-center tw-cursor-pointer hover:tw-bg-[#1F0439] tw-transition-colors ${mediaType === 'video' ? 'tw-py-12' : 'tw-py-24'}`}
            >
              <div className="tw-w-[50px] tw-h-[50px] tw-bg-[#371E51] tw-rounded-full tw-flex tw-items-center tw-justify-center tw-mb-4">
                <FontAwesomeIcon icon={mediaType === 'video' ? faFilm : faCamera} className="tw-text-[#FF43A7] tw-text-xl" />
              </div>
              <h4 className="tw-text-white tw-text-base tw-font-bold tw-mb-1">
                {t("Drag and drop your")} {mediaType === 'video' ? t('trailer') : t('banner image')} {t("here")}
              </h4>
              <p className="tw-text-[#AA8894] tw-text-xs tw-mb-6">
                {t("Supports")} {mediaType === 'video' ? 'MP4, MOV, or ProRes (Max 2GB)' : 'JPG, PNG, or WEBP (Max 10MB)'}
              </p>
              
              {selectedFile ? (
                 <div className="tw-px-6 tw-py-2 tw-border tw-border-[#FF43A7] tw-bg-[#FF43A7]/10 tw-rounded-md tw-text-[#FF43A7] tw-text-sm tw-font-bold">
                    {t("Selected:")} {selectedFile.name}
                 </div>
              ) : (
                <div className="tw-px-6 tw-py-2 tw-border tw-border-[#5A3F49] tw-rounded-md tw-text-[#E2BDC9] tw-text-sm tw-pointer-events-none">
                  {t("Browse Files")}
                </div>
              )}
            </div>

            {/* --- PREVIEW AND THUMBNAILS --- */}
            {selectedFile && (
               <div className="tw-w-full tw-mt-4">
                 <div className="tw-flex tw-justify-between tw-items-end tw-mb-4">
                   <h3 className="tw-text-[#FF43A7] tw-text-xl tw-font-bold tw-uppercase tw-tracking-wider">{t("Preview")}</h3>
                   <button 
                     onClick={(e) => { 
                       e.stopPropagation(); 
                       if (previewUrl) URL.revokeObjectURL(previewUrl);
                       setSelectedFile(null); 
                       setPreviewUrl(null); 
                       setGeneratedFrames([]); 
                     }} 
                     className="tw-bg-transparent tw-border-none tw-outline-none tw-shadow-none tw-p-0 tw-m-0 tw-text-[#E2BDC9] hover:tw-text-white tw-text-sm tw-underline tw-underline-offset-4 tw-cursor-pointer"
                   >
                     {t("Remove File")}
                   </button>
                 </div>
                 
                 <div className="tw-aspect-video tw-bg-black tw-rounded-xl tw-overflow-hidden tw-border tw-border-[#5A3F49] tw-mb-6">
                    {mediaType === 'video' ? (
                      <video 
                        src={previewUrl} 
                        poster={activeThumbnail === 'custom' ? customThumbUrl : generatedFrames[activeThumbnail]} 
                        controls 
                        className="tw-w-full tw-h-full" 
                      />
                    ) : (
                      <img src={previewUrl} alt="Preview" className="tw-w-full tw-h-full tw-object-cover" />
                    )}
                 </div>

                 {mediaType === 'video' && (
                   <div className="tw-flex tw-flex-col tw-gap-5 tw-mt-4">
                      
                      <div className="tw-flex tw-justify-between tw-items-end">
                        <h4 className="tw-text-white tw-text-sm tw-font-bold">{t("Select Thumbnail")}</h4>
                        <button 
                          onClick={() => customThumbInputRef.current.click()} 
                          className="tw-bg-transparent tw-border-none tw-outline-none tw-shadow-none tw-p-0 tw-m-0 tw-text-[#E2BDC9] hover:tw-text-white tw-text-xs tw-flex tw-items-center tw-gap-2 tw-cursor-pointer"
                        >
                            <FontAwesomeIcon icon={faCamera} /> {t("Upload Custom")}
                        </button>
                      </div>

                      <div className="tw-flex tw-gap-4 tw-overflow-x-auto custom-scrollbar tw-pb-2">
                        
                        {/* Generated Frames */}
                        {[0, 1, 2].map((index) => {
                          const frame = generatedFrames[index];
                          return (
                            <div 
                              key={index}
                              onClick={() => frame && setActiveThumbnail(index)}
                              className={`tw-relative tw-shrink-0 tw-w-[170px] tw-h-[110px] tw-rounded-lg tw-overflow-hidden tw-transition-all tw-box-border ${
                                !frame ? "tw-bg-[#1F0439] tw-border tw-border-[#371E51] tw-cursor-default" :
                                activeThumbnail === index ? "tw-border-[1.5px] tw-border-[#FF43A7] tw-cursor-pointer" : "tw-border tw-border-[#5A3F49]/50 tw-opacity-60 hover:tw-opacity-100 tw-cursor-pointer"
                              }`}
                            >
                              {frame ? (
                                <>
                                  <img src={frame} alt={`Frame ${index}`} className="tw-w-full tw-h-full tw-object-cover" />
                                  {activeThumbnail === index && (
                                    <div className="tw-absolute tw-inset-0 tw-bg-black/20 tw-flex tw-items-center tw-justify-center">
                                      <div className="tw-w-6 tw-h-6 tw-bg-[#FF43A7] tw-rounded-full tw-flex tw-items-center tw-justify-center">
                                        <FontAwesomeIcon icon={faCheck} className="tw-text-white tw-text-[10px]" />
                                      </div>
                                    </div>
                                  )}
                                </>
                              ) : (
                                <div className="tw-w-full tw-h-full tw-flex tw-items-center tw-justify-center">
                                   {isExtracting ? <span className="tw-w-5 tw-h-5 tw-border-2 tw-border-[#FF43A7] tw-border-t-transparent tw-rounded-full tw-animate-spin"></span> : null}
                                </div>
                              )}
                            </div>
                          );
                        })}

                        {/* Upload Custom Box */}
                        <div 
                          onClick={() => customThumbUrl ? setActiveThumbnail('custom') : customThumbInputRef.current.click()}
                          className={`tw-relative tw-shrink-0 tw-w-[170px] tw-h-[110px] tw-rounded-lg tw-flex tw-flex-col tw-items-center tw-justify-center tw-cursor-pointer tw-transition-all tw-box-border ${
                            activeThumbnail === 'custom' ? "tw-border-[1.5px] tw-border-[#FF43A7] tw-bg-[#FF43A7]/5" : "tw-border tw-border-dashed tw-border-[#5A3F49] tw-bg-[#1F0439] hover:tw-border-[#DDB7FF]"
                          }`}
                        >
                          {customThumbUrl ? (
                            <>
                              <img src={customThumbUrl} alt="Custom thumb" className="tw-w-full tw-h-full tw-object-cover tw-rounded-md" />
                              <div className="tw-absolute tw-inset-0 tw-bg-black/20 tw-flex tw-items-center tw-justify-center tw-rounded-md">
                                {activeThumbnail === 'custom' && (
                                  <div className="tw-w-6 tw-h-6 tw-bg-[#FF43A7] tw-rounded-full tw-flex tw-items-center tw-justify-center shadow-lg">
                                    <FontAwesomeIcon icon={faCheck} className="tw-text-white tw-text-[10px]" />
                                  </div>
                                )}
                              </div>
                              <button 
                                onClick={(e) => { e.stopPropagation(); if(customThumbUrl) URL.revokeObjectURL(customThumbUrl); setCustomThumbFile(null); setCustomThumbUrl(null); setActiveThumbnail(0); }}
                                className="tw-absolute tw-top-2 tw-right-2 tw-w-6 tw-h-6 tw-bg-black/60 hover:tw-bg-[#FF43A7] tw-border-none tw-outline-none tw-shadow-none tw-p-0 tw-m-0 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-transition-colors tw-cursor-pointer"
                              >
                                <FontAwesomeIcon icon={faXmark} className="tw-text-white tw-text-[10px]" />
                              </button>
                            </>
                          ) : (
                            <>
                              <FontAwesomeIcon icon={faCamera} className="tw-text-[#E2BDC9] tw-text-lg tw-mb-2" />
                              <span className="tw-text-[#E2BDC9] tw-text-[10px] tw-uppercase tw-tracking-widest tw-font-bold">{t("Upload Custom")}</span>
                            </>
                          )}
                        </div>
                      </div>
                   </div>
                 )}
               </div>
            )}
          </div>

        </div>

        {/* --- FOOTER --- */}
        <div className="tw-px-8 tw-py-6 tw-flex tw-justify-between tw-items-center tw-shrink-0 tw-border-t tw-border-[#371E51]">
          <button 
            onClick={handleClose} 
            className="tw-bg-transparent tw-border-none tw-outline-none tw-shadow-none tw-p-0 tw-m-0 tw-text-[#E2BDC9] tw-text-sm tw-font-bold tw-uppercase tw-tracking-widest hover:tw-text-white tw-transition-colors tw-cursor-pointer"
          >
            {t("Cancel")}
          </button>

          <button 
            onClick={handleSave} 
            disabled={!selectedFile || isExtracting}
            className="tw-px-8 tw-py-3 tw-bg-[#FF43A7] tw-border-none tw-rounded-lg tw-text-white tw-font-bold tw-uppercase tw-text-xs tw-tracking-widest disabled:tw-opacity-50 disabled:tw-cursor-not-allowed hover:tw-bg-[#ff5cac] tw-transition-colors tw-shadow-[0_0_15px_rgba(255,67,167,0.4)] disabled:tw-shadow-none"
          >
            {isExtracting ? t("Processing...") : t("Save and Publish")}
          </button>
        </div>
      </div>
    </div>
  );
}