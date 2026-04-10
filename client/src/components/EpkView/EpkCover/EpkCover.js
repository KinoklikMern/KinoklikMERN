import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faVideo, faPlay, faImages, faPen, faXmark } from "@fortawesome/free-solid-svg-icons";
import emptyBanner from '../../../images/empty_banner.jpeg';

import UpdatePosterModal from "./UpdatePosterModal";
import UpdateBannerModal from "./UpdateBannerModal";

export default function EpkCover({ epkInfo, scrollToPhotos, scrollToVideos, isEditMode, onChange, errors = {} }) {
  const [isPosterModalOpen, setIsPosterModalOpen] = useState(false);
  const [isBannerModalOpen, setIsBannerModalOpen] = useState(false);
  const [playingView, setPlayingView] = useState(null);
  
  // --- FULLSCREEN IMAGE STATE ---
  const [expandedImage, setExpandedImage] = useState(null);

  // --- LOGLINE EDITING STATE ---
  const [isEditingLogline, setIsEditingLogline] = useState(false);
  const [tempLogline, setTempLogline] = useState(epkInfo?.logLine_short || "");

  // --- INSTANT LOCAL PREVIEW STATES ---
  const [localPoster, setLocalPoster] = useState(null);
  const [localBanner, setLocalBanner] = useState(null);
  const [localTrailer, setLocalTrailer] = useState(null);

  useEffect(() => {
    setTempLogline(epkInfo?.logLine_short || "");
  }, [epkInfo?.logLine_short]);

  useEffect(() => {
    if (isEditMode) {
      setPlayingView(null);
    } else {
      setLocalPoster(null);
      setLocalBanner(null);
      setLocalTrailer(null);
      setIsEditingLogline(false);
      setPlayingView(null);
    }
  }, [isEditMode]);

  // --- DATA NORMALIZATION ---
  const dbPosterUrl = epkInfo?.image_details === "" || epkInfo?.image_details?.startsWith("https")
      ? ""
      : `${process.env.REACT_APP_AWS_URL}/${epkInfo?.image_details}`;

  const bannersList = epkInfo?.banners?.length > 0 
    ? epkInfo.banners 
    : [{ _id: 'fallback', url: epkInfo?.banner_url || '', is_thumbnail: true }];
  
  const activeIndex = Math.max(0, bannersList.findIndex(b => b.is_thumbnail));
  const activeBannerRawUrl = bannersList[activeIndex]?.url;
  
  const dbBannerUrl = !activeBannerRawUrl 
    ? emptyBanner
    : activeBannerRawUrl.startsWith("http") 
      ? activeBannerRawUrl 
      : `${process.env.REACT_APP_AWS_URL}/${activeBannerRawUrl}`;

  const rawTrailerUrl = epkInfo?.trailer_url || epkInfo?.trailer;
  const dbTrailerSrc = rawTrailerUrl 
    ? (rawTrailerUrl.startsWith("http") ? rawTrailerUrl : `${process.env.REACT_APP_AWS_URL}/${rawTrailerUrl}`) 
    : "";

  const displayPoster = localPoster || dbPosterUrl || emptyBanner;
  const displayBanner = localBanner || dbBannerUrl;
  const displayTrailer = localTrailer || dbTrailerSrc;
  
  const hasTrailer = Boolean(displayTrailer);

  const handlePlayTrailer = (view) => (e) => {
    e.stopPropagation();
    if (!isEditMode) setPlayingView(view); 
  };

  const handleLoglineSubmit = () => {
    setIsEditingLogline(false);
    if (tempLogline !== epkInfo?.logLine_short) {
      onChange("logLine_short", tempLogline);
    }
  };

  //SMART MEDIA BACKUP LOGIC
  const handleSavePoster = (data) => {
    setIsPosterModalOpen(false);

    // BACKUP OLD POSTER TO LIBRARY
    if (epkInfo.image_details && epkInfo.image_details !== data?.data?.image) {
      const currentAlbums = epkInfo.photo_albums || { posters: [], stills: [], behind: [], premieres: [] };
      const posters = currentAlbums.posters || [];
      if (!posters.some(p => p.image === epkInfo.image_details)) {
        onChange("photo_albums", {
          ...currentAlbums,
          posters: [{ image: epkInfo.image_details, blur: false }, ...posters]
        });
      }
    }

    // SET NEW POSTER
    if (data.type === "local") {
      setLocalPoster(URL.createObjectURL(data.file));
      onChange("new_poster_file", data.file); 
    } else if (data.type === "library") {
      setLocalPoster(`${process.env.REACT_APP_AWS_URL}/${data.data.image}`);
      onChange("image_details", data.data.image); 
    }
  };

  const base64ToFile = async (base64String, fileName) => {
    const res = await fetch(base64String);
    const blob = await res.blob();
    return new File([blob], fileName, { type: 'image/jpeg' });
  };

  const handleSaveBanner = async (data) => {
    setIsBannerModalOpen(false);

    // BACKUP OLD TRAILER TO LIBRARY (if it exists)
    if (epkInfo.trailer_url) {
      const currentVideo = epkInfo.video_gallery || { trailers: [], behind: [], interviews: [], premieres: [] };
      const trailers = currentVideo.trailers || [];
      if (!trailers.some(t => t.url === epkInfo.trailer_url)) {
        onChange("video_gallery", {
          ...currentVideo,
          trailers: [{ url: epkInfo.trailer_url, thumbnail: epkInfo.banner_url || '', title: 'Legacy Trailer', blur: false }, ...trailers]
        });
      }
    }

    // 2. APPLY NEW SELECTION
    if (data.type === "image") {
      setLocalBanner(URL.createObjectURL(data.file));
      setLocalTrailer(null);
      onChange("new_banner_file", data.file);
      onChange("trailer_url", ""); // Clear trailer so static image shows
    } 
    else if (data.type === "video") {
      setLocalTrailer(URL.createObjectURL(data.file));
      
      if (data.customThumbnailFile) {
        setLocalBanner(URL.createObjectURL(data.customThumbnailFile));
      } else if (data.thumbnailData) {
        setLocalBanner(data.thumbnailData); // Renders Base64 thumbnail immediately
      }

      let thumbFile = data.customThumbnailFile;
      if (!thumbFile && data.thumbnailData) {
        thumbFile = await base64ToFile(data.thumbnailData, "trailer_thumb.jpg");
      }
      
      onChange("new_trailer_file", data.file);
      onChange("new_trailer_thumbnail", thumbFile);
    }
  };

  return (
    <>
      <div className="tw-w-full tw-max-w-[1280px] tw-mx-auto tw-flex tw-flex-col tw-gap-[64px] tw-pb-10">
        
        {/* ================= DESKTOP GRID ================= */}
        <div className="tw-hidden md:tw-flex tw-w-full tw-h-[515px] xl:tw-h-[600px] tw-gap-8 tw-relative">
          
          {/* LEFT: MOVIE POSTER  */}
          <div 
            className={`tw-relative tw-w-[343px] tw-h-full tw-shrink-0 tw-rounded-[10px] tw-overflow-hidden tw-bg-black group tw-cursor-pointer tw-transition-all ${
              errors.image_details ? 'tw-border-[3px] tw-border-red-500 tw-shadow-[0_0_20px_rgba(239,68,68,0.5)]' : 'tw-shadow-[0_20px_40px_rgba(0,0,0,0.6)]'
            }`}
            onClick={() => !isEditMode && setExpandedImage(displayPoster)}
          >
            <img src={displayPoster} alt="Poster" className="tw-w-full tw-h-full tw-object-cover tw-object-center" />
            
            {!isEditMode && (
              <div className="tw-absolute tw-inset-0 tw-bg-black/0 hover:tw-bg-black/20 tw-transition-colors tw-flex tw-items-center tw-justify-center tw-opacity-0 hover:tw-opacity-100">
                <span className="tw-bg-[#1F0439]/80 tw-backdrop-blur-sm tw-text-white tw-px-4 tw-py-2 tw-rounded-full tw-font-bold tw-text-xs tw-uppercase tw-tracking-widest">View Full Poster</span>
              </div>
            )}

            {isEditMode && (
              <div className="tw-absolute tw-inset-0 tw-bg-[#1F0439]/40 tw-backdrop-blur-[1px] tw-flex tw-flex-col tw-items-center tw-justify-center tw-z-10">
                <button 
                  onClick={(e) => { e.stopPropagation(); setIsPosterModalOpen(true); }} 
                  className="tw-bg-transparent tw-border-none tw-outline-none tw-p-0 tw-m-0 tw-flex tw-flex-col tw-items-center tw-justify-center tw-w-[100px] tw-gap-3 hover:tw-scale-105 tw-transition-transform tw-cursor-pointer"
                >
                  <div className="tw-w-[59px] tw-h-[56px] tw-bg-[#371E51]/80 tw-backdrop-blur-md tw-border tw-border-[#FFB0CF]/20 tw-rounded-full tw-flex tw-items-center tw-justify-center">
                    <FontAwesomeIcon icon={faCamera} className="tw-text-[#FFB0CF] tw-text-xl" />
                  </div>
                  <span className="tw-text-[#F0DBFF] tw-text-xs tw-font-bold tw-uppercase tw-tracking-widest tw-text-center">Update Poster</span>
                </button>
              </div>
            )}
          </div>

          {/* RIGHT: TRAILER / BANNER  */}
          <div className={`tw-relative tw-flex-1 tw-h-full tw-rounded-[10px] tw-overflow-hidden tw-bg-black group tw-transition-all ${
             errors.trailerOrBanner ? 'tw-border-[3px] tw-border-red-500 tw-shadow-[0_0_20px_rgba(239,68,68,0.5)]' : 'tw-shadow-[0_20px_40px_rgba(0,0,0,0.6)]'
          }`}>
            {playingView === 'desktop' ? (
              <video src={displayTrailer} controls autoPlay onEnded={() => setPlayingView(null)} className="tw-w-full tw-h-full tw-object-contain tw-bg-black" />
            ) : (
              <>
                {localTrailer && !localBanner ? (
                   <video src={displayTrailer} className="tw-w-full tw-h-full tw-object-cover tw-object-center tw-opacity-50" />
                ) : (
                   <img src={displayBanner} alt="Banner" className="tw-w-full tw-h-full tw-object-cover tw-object-center" />
                )}

                <div className="tw-absolute tw-inset-0 tw-bg-gradient-to-t tw-from-[#1E0039]/90 tw-via-black/40 tw-to-transparent tw-pointer-events-none"></div>
                
                {hasTrailer && !isEditMode && (
                  <div className="tw-absolute tw-inset-0 tw-flex tw-items-center tw-justify-center tw-cursor-pointer tw-z-10" onClick={handlePlayTrailer('desktop')}>
                    <div className="tw-flex tw-items-center tw-justify-center tw-w-20 tw-h-20 tw-rounded-full tw-border-[3px] tw-border-white tw-bg-black/40 hover:tw-bg-[#FF43A7]/80 tw-transition-colors">
                      <FontAwesomeIcon icon={faPlay} className="tw-text-white tw-text-3xl tw-ml-2" />
                    </div>
                  </div>
                )}

                {/* DESKTOP LOGLINE & EDIT OVERLAY */}
                <div className="tw-absolute tw-bottom-0 tw-left-0 tw-right-0 tw-flex tw-flex-col tw-p-10 tw-pb-12 tw-z-20">
                  {isEditingLogline ? (
                    <div className="tw-flex tw-flex-col tw-gap-3 tw-w-full tw-max-w-4xl">
                      <textarea
                        value={tempLogline}
                        onChange={(e) => setTempLogline(e.target.value)}
                        autoFocus
                        className="tw-w-full tw-bg-[#1F0439]/90 tw-backdrop-blur-md tw-text-white tw-text-xl tw-p-4 tw-rounded-xl tw-border-2 tw-border-[#FF43A7] tw-outline-none tw-resize-none tw-shadow-xl"
                        rows="3"
                        placeholder="Write a compelling short logline (Required)..."
                      />
                      <button onClick={handleLoglineSubmit} className="tw-self-start tw-bg-[#FF43A7] tw-border-none tw-text-[#570033] tw-px-8 tw-py-2 tw-rounded-lg tw-font-bold tw-text-sm hover:tw-bg-[#ff5cac] tw-transition-colors tw-shadow-lg tw-cursor-pointer">
                        Save Logline
                      </button>
                    </div>
                  ) : (
                    <div className={`tw-flex tw-items-start tw-gap-4 tw-max-w-4xl tw-transition-colors tw-rounded-xl ${
                      errors.logLine_short ? 'tw-p-3 -tw-ml-3 tw-border-2 tw-border-dashed tw-border-red-500 tw-bg-red-500/10' : ''
                    }`}>
                      <p className="tw-text-xl tw-font-medium tw-leading-relaxed tw-text-white tw-drop-shadow-md">
                        {epkInfo?.logLine_short || (isEditMode ? "No logline provided. A short logline is required." : "")}
                      </p>
                      {isEditMode && (
                        <button 
                          onClick={() => setIsEditingLogline(true)} 
                          className="tw-bg-[#FF43A7] tw-border-none tw-w-8 tw-h-8 tw-rounded-lg tw-flex tw-items-center tw-justify-center tw-shrink-0 hover:tw-scale-105 tw-transition-transform tw-shadow-md tw-cursor-pointer"
                        >
                          <FontAwesomeIcon icon={faPen} className="tw-text-[#570033] tw-text-sm" />
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {isEditMode && (
                  <div className="tw-absolute tw-inset-0 tw-bg-[#1F0439]/40 tw-backdrop-blur-[1px] tw-flex tw-flex-col tw-items-center tw-justify-center tw-z-10">
                    <button onClick={(e) => { e.stopPropagation(); setIsBannerModalOpen(true); }} className="tw-bg-transparent tw-border-none tw-outline-none tw-p-0 tw-m-0 tw-flex tw-flex-col tw-items-center tw-justify-center tw-w-[200px] tw-gap-4 hover:tw-scale-105 tw-transition-transform tw-cursor-pointer">
                      <div className="tw-w-[72px] tw-h-[66px] tw-bg-[#371E51]/80 tw-backdrop-blur-md tw-border tw-border-[#FFB0CF]/20 tw-rounded-full tw-flex tw-items-center tw-justify-center">
                        <FontAwesomeIcon icon={faVideo} className="tw-text-[#FFB0CF] tw-text-2xl" />
                      </div>
                      <span className="tw-text-[#F0DBFF] tw-text-sm tw-font-bold tw-uppercase tw-tracking-widest tw-text-center">Update Trailer Banner</span>
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* ================= MOBILE GRID ================= */}
        <div className="tw-flex md:tw-hidden tw-flex-col tw-gap-4 tw-mb-8">
          
          {/* MOBILE BANNER */}
          <div className={`tw-relative tw-w-full tw-h-[250px] tw-rounded-[10px] tw-overflow-hidden tw-bg-black tw-transition-all ${
             errors.trailerOrBanner ? 'tw-border-[3px] tw-border-red-500 tw-shadow-[0_0_15px_rgba(239,68,68,0.5)]' : 'tw-shadow-lg'
          }`}>
              {playingView === 'mobile' ? (
                <video src={displayTrailer} controls autoPlay onEnded={() => setPlayingView(null)} className="tw-w-full tw-h-full tw-object-contain" />
              ) : (
                <>
                  {localTrailer && !localBanner ? (
                     <video src={displayTrailer} className="tw-w-full tw-h-full tw-object-cover tw-opacity-50" />
                  ) : (
                     <img src={displayBanner} alt="Mobile Banner" className="tw-w-full tw-h-full tw-object-cover" />
                  )}
                  
                  {hasTrailer && !isEditMode && (
                    <div className="tw-absolute tw-inset-0 tw-flex tw-items-center tw-justify-center tw-cursor-pointer tw-z-10" onClick={handlePlayTrailer('mobile')}>
                      <div className="tw-flex tw-items-center tw-justify-center tw-w-16 tw-h-16 tw-rounded-full tw-border-[3px] tw-border-white tw-bg-black/40 hover:tw-bg-[#FF43A7]/80 tw-transition-colors">
                        <FontAwesomeIcon icon={faPlay} className="tw-text-white tw-text-2xl tw-ml-1" />
                      </div>
                    </div>
                  )}

                  {isEditMode && (
                    <div className="tw-absolute tw-inset-0 tw-bg-black/50 tw-flex tw-items-center tw-justify-center tw-z-20">
                      <button onClick={(e) => { e.stopPropagation(); setIsBannerModalOpen(true); }} className="tw-bg-[#FF43A7] tw-border-none tw-text-[#570033] tw-px-6 tw-py-2 tw-rounded-full tw-font-bold tw-text-sm shadow-lg tw-cursor-pointer">
                        <FontAwesomeIcon icon={faVideo} className="tw-mr-2" />
                        Update Banner
                      </button>
                    </div>
                  )}
                </>
              )}
          </div>
          
          {/* MOBILE POSTER & QUICK LINKS */}
          <div className="tw-flex tw-flex-row tw-w-full tw-gap-4 tw-items-stretch">
            {/* POSTER HALF */}
            <div 
              className={`tw-relative tw-w-1/2 tw-overflow-hidden tw-rounded-[10px] tw-bg-black tw-cursor-pointer tw-transition-all ${
                 errors.image_details ? 'tw-border-[3px] tw-border-red-500 tw-shadow-[0_0_15px_rgba(239,68,68,0.5)]' : 'tw-shadow-lg'
              }`}
              onClick={() => !isEditMode && setExpandedImage(displayPoster)}
            >
              <img src={displayPoster} alt="Mobile Poster" className="tw-h-full tw-min-h-[220px] tw-w-full tw-object-cover tw-object-center" />
              {isEditMode && (
                <div className="tw-absolute tw-inset-0 tw-bg-black/50 tw-flex tw-items-center tw-justify-center tw-z-20">
                  <button onClick={(e) => { e.stopPropagation(); setIsPosterModalOpen(true); }} className="tw-bg-[#FF43A7] tw-border-none tw-text-[#570033] tw-px-4 tw-py-2 tw-rounded-lg tw-font-bold tw-text-xs shadow-lg tw-cursor-pointer">Edit Poster</button>
                </div>
             )}
            </div>

            <div className="tw-w-1/2 tw-flex tw-flex-col tw-justify-center tw-gap-4">
              <button onClick={scrollToVideos} className="tw-flex tw-flex-row tw-items-center tw-justify-center tw-gap-3 tw-w-full tw-py-4 tw-rounded-[8px] tw-bg-transparent tw-border-[1.5px] tw-border-[#FF43A7] hover:tw-bg-[#FF43A7]/10 tw-transition-colors tw-shadow-md tw-cursor-pointer">
                <FontAwesomeIcon icon={faPlay} className="tw-text-white tw-text-lg" />
                <span className="tw-text-white tw-font-bold tw-text-base">Videos</span>
              </button>
              <button onClick={scrollToPhotos} className="tw-flex tw-flex-row tw-items-center tw-justify-center tw-gap-3 tw-w-full tw-py-4 tw-rounded-[8px] tw-bg-transparent tw-border-[1.5px] tw-border-[#FF43A7] hover:tw-bg-[#FF43A7]/10 tw-transition-colors tw-shadow-md tw-cursor-pointer">
                <FontAwesomeIcon icon={faImages} className="tw-text-white tw-text-lg" />
                <span className="tw-text-white tw-font-bold tw-text-base">Pictures</span>
              </button>
            </div>
          </div>

          {/* MOBILE LOGLINE */}
          <div className="tw-w-full tw-mt-2">
             {isEditingLogline ? (
                <div className="tw-flex tw-flex-col tw-gap-3">
                  <textarea
                    value={tempLogline}
                    onChange={(e) => setTempLogline(e.target.value)}
                    autoFocus
                    className="tw-w-full tw-bg-[#1F0439] tw-text-white tw-text-base tw-p-3 tw-rounded-xl tw-border-2 tw-border-[#FF43A7] tw-outline-none tw-resize-none tw-shadow-lg"
                    rows="4"
                    placeholder="Write a compelling short logline (Required)..."
                  />
                  <button onClick={handleLoglineSubmit} className="tw-w-full tw-bg-[#FF43A7] tw-border-none tw-text-[#570033] tw-px-6 tw-py-3 tw-rounded-lg tw-font-bold tw-text-sm hover:tw-bg-[#ff5cac] tw-transition-colors tw-shadow-lg tw-cursor-pointer">
                    Save Logline
                  </button>
                </div>
              ) : (
                <div className={`tw-flex tw-items-start tw-justify-between tw-gap-4 tw-transition-colors tw-rounded-xl ${
                   errors.logLine_short ? 'tw-p-3 tw-border-2 tw-border-dashed tw-border-red-500 tw-bg-red-500/10' : ''
                }`}>
                  <p className="tw-text-base tw-font-medium tw-leading-relaxed tw-text-white tw-text-justify tw-opacity-90">
                    {epkInfo?.logLine_short || (isEditMode ? "No logline provided. A short logline is required." : "")}
                  </p>
                  {isEditMode && (
                    <button 
                      onClick={() => setIsEditingLogline(true)} 
                      className="tw-bg-[#FF43A7] tw-border-none tw-w-8 tw-h-8 tw-rounded-lg tw-flex tw-items-center tw-justify-center tw-shrink-0 hover:tw-scale-105 tw-transition-transform tw-shadow-md tw-cursor-pointer"
                    >
                      <FontAwesomeIcon icon={faPen} className="tw-text-[#570033] tw-text-sm" />
                    </button>
                  )}
                </div>
              )}
          </div>
        </div>

      </div>

      {/* FULLSCREEN POSTER LIGHTBOX */}
      {expandedImage && (
        <div 
          className="tw-fixed tw-inset-0 tw-z-[9999] tw-bg-[#0a0014]/90 tw-backdrop-blur-md tw-flex tw-items-center tw-justify-center tw-p-4 tw-cursor-pointer"
          onClick={() => setExpandedImage(null)}
        >
          <button 
            className="tw-absolute tw-top-6 tw-right-6 tw-w-12 tw-h-12 tw-bg-black/50 hover:tw-bg-[#FF43A7] tw-rounded-full tw-text-white tw-border-none tw-outline-none tw-cursor-pointer tw-transition-colors tw-flex tw-items-center tw-justify-center tw-shadow-lg"
            onClick={(e) => { e.stopPropagation(); setExpandedImage(null); }}
          >
            <FontAwesomeIcon icon={faXmark} className="tw-text-2xl" />
          </button>
          <img 
            src={expandedImage} 
            alt="Fullscreen Cover" 
            className="tw-max-w-full tw-max-h-full tw-object-contain tw-rounded-lg tw-shadow-[0_0_50px_rgba(0,0,0,0.8)]" 
            onClick={(e) => e.stopPropagation()} 
          />
        </div>
      )}

      <UpdatePosterModal isOpen={isPosterModalOpen} onClose={() => setIsPosterModalOpen(false)} epkInfo={epkInfo} onSave={handleSavePoster} />
      <UpdateBannerModal isOpen={isBannerModalOpen} onClose={() => setIsBannerModalOpen(false)} onSave={handleSaveBanner} />
    </>
  );
}