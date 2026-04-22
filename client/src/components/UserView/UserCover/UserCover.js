/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faVideo, faPlay, faImages, faPen, faXmark } from "@fortawesome/free-solid-svg-icons";
import emptyBanner from '../../../images/empty_banner.jpeg';

import UpdatePosterModal from "../../EpkView/EpkCover/UpdatePosterModal"; 
import UpdateBannerModal from "../../EpkView/EpkCover/UpdateBannerModal"; 

export default function UserCover({ data, scrollToPhotos, scrollToVideos, isEditMode, onChange, errors = {}, clearError }) {
  const [isPosterModalOpen, setIsPosterModalOpen] = useState(false);
  const [isBannerModalOpen, setIsBannerModalOpen] = useState(false);
  const [playingView, setPlayingView] = useState(null);
  
  const [expandedImage, setExpandedImage] = useState(null);
  const [isEditingSummary, setIsEditingSummary] = useState(false);
  const [tempSummary, setTempSummary] = useState(data?.summary || "");

  const [localHeadshot, setLocalHeadshot] = useState(null);
  const [localBanner, setLocalBanner] = useState(null);
  const [localReel, setLocalReel] = useState(null);

  useEffect(() => {
    setTempSummary(data?.summary || "");
  }, [data?.summary]);

  useEffect(() => {
    if (!isEditMode) {
      setLocalHeadshot(null);
      setLocalBanner(null);
      setLocalReel(null);
      setIsEditingSummary(false);
      setPlayingView(null);
    }
  }, [isEditMode]);

  const dbHeadshotUrl = !data?.image_details || data?.image_details === "" 
      ? "" 
      : data.image_details.startsWith("http") 
        ? data.image_details 
        : `${process.env.REACT_APP_AWS_URL}/${data.image_details}`;

  const bannersList = data?.banners?.length > 0 
    ? data.banners 
    : [{ _id: 'fallback', url: data?.banner_url || '', is_thumbnail: true }];
  
  const activeIndex = Math.max(0, bannersList.findIndex(b => b.is_thumbnail));
  const activeBannerRawUrl = bannersList[activeIndex]?.url;
  
  const dbBannerUrl = !activeBannerRawUrl 
    ? emptyBanner
    : activeBannerRawUrl.startsWith("http") 
      ? activeBannerRawUrl 
      : `${process.env.REACT_APP_AWS_URL}/${activeBannerRawUrl}`;

  const rawReelUrl = data?.reel_url || data?.reel;
  const dbReelSrc = rawReelUrl 
    ? (rawReelUrl.startsWith("http") ? rawReelUrl : `${process.env.REACT_APP_AWS_URL}/${rawReelUrl}`) 
    : "";

  const displayHeadshot = localHeadshot || dbHeadshotUrl || emptyBanner;
  const displayBanner = localBanner || dbBannerUrl;
  const displayReel = localReel || dbReelSrc;
  
  const hasReel = Boolean(displayReel);

  const handlePlayReel = (view) => (e) => {
    e.stopPropagation();
    if (!isEditMode) setPlayingView(view); 
  };

  const handleSummarySubmit = () => {
    setIsEditingSummary(false);
    if (tempSummary !== data?.summary) {
      onChange("summary", tempSummary);
    }
  };

  const handleSaveHeadshot = (res) => {
    setIsPosterModalOpen(false);
    if (res.type === "local") {
      setLocalHeadshot(URL.createObjectURL(res.file));
      onChange("new_headshot_file", res.file); 
    } else if (res.type === "library") {
      setLocalHeadshot(`${process.env.REACT_APP_AWS_URL}/${res.data.image}`);
      onChange("image_details", res.data.image); 
    }
  };

  const base64ToFile = async (base64String, fileName) => {
    const res = await fetch(base64String);
    const blob = await res.blob();
    return new File([blob], fileName, { type: 'image/jpeg' });
  };

  const handleSaveBanner = async (res) => {
    setIsBannerModalOpen(false);
    if (res.type === "image") {
      setLocalBanner(URL.createObjectURL(res.file));
      setLocalReel(null);
      onChange("new_banner_file", res.file);
      onChange("reel_url", ""); 
    } 
    else if (res.type === "video") {
      setLocalReel(URL.createObjectURL(res.file));
      
      if (res.customThumbnailFile) {
        setLocalBanner(URL.createObjectURL(res.customThumbnailFile));
      } else if (res.thumbnailData) {
        setLocalBanner(res.thumbnailData);
      }

      let thumbFile = res.customThumbnailFile;
      if (!thumbFile && res.thumbnailData) {
        thumbFile = await base64ToFile(res.thumbnailData, "reel_thumb.jpg");
      }
      
      onChange("new_reel_file", res.file);
      onChange("new_reel_thumbnail", thumbFile);
    }
  };

  return (
    <>
      <div className="tw-w-full tw-max-w-[1280px] tw-mx-auto tw-flex tw-flex-col tw-gap-[64px] tw-pb-10">
        
        {/* ================= DESKTOP GRID ================= */}
        <div className="tw-hidden md:tw-flex tw-w-full tw-h-[515px] xl:tw-h-[600px] tw-gap-8 tw-relative">
          
          {/* LEFT: HEADSHOT */}
          <div 
            className={`tw-relative tw-w-[343px] tw-h-full tw-shrink-0 tw-rounded-[10px] tw-overflow-hidden tw-bg-black group tw-cursor-pointer tw-transition-all ${
              errors.image_details ? 'tw-border-[3px] tw-border-red-500 tw-shadow-[0_0_20px_rgba(239,68,68,0.5)]' : 'tw-shadow-[0_20px_40px_rgba(0,0,0,0.6)]'
            }`}
            onClick={() => !isEditMode && setExpandedImage(displayHeadshot)}
          >
            <img src={displayHeadshot} alt="Headshot" className="tw-w-full tw-h-full tw-object-cover tw-object-center" />
            
            {errors.image_details && isEditMode && (
              <div className="tw-absolute tw-top-4 tw-left-4 tw-bg-red-500 tw-text-white tw-text-[10px] tw-font-bold tw-uppercase tw-tracking-widest tw-px-3 tw-py-1.5 tw-rounded-full tw-z-30 tw-shadow-lg tw-animate-pulse">
                Headshot Required
              </div>
            )}

            {!isEditMode && (
              <div className="tw-absolute tw-inset-0 tw-bg-black/0 hover:tw-bg-black/20 tw-transition-colors tw-flex tw-items-center tw-justify-center tw-opacity-0 hover:tw-opacity-100">
                <span className="tw-bg-[#1F0439]/80 tw-backdrop-blur-sm tw-text-white tw-px-4 tw-py-2 tw-rounded-full tw-font-bold tw-text-xs tw-uppercase tw-tracking-widest">View Full Headshot</span>
              </div>
            )}

            {isEditMode && (
              <div className="tw-absolute tw-inset-0 tw-bg-[#1F0439]/40 tw-backdrop-blur-[1px] tw-flex tw-flex-col tw-items-center tw-justify-center tw-z-10">
                <button 
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    if (clearError) clearError('image_details');
                    setIsPosterModalOpen(true); 
                  }} 
                  className="tw-bg-transparent tw-border-none tw-outline-none tw-p-0 tw-m-0 tw-flex tw-flex-col tw-items-center tw-justify-center tw-w-[100px] tw-gap-3 hover:tw-scale-105 tw-transition-transform tw-cursor-pointer"
                >
                  <div className="tw-w-[59px] tw-h-[56px] tw-bg-[#371E51]/80 tw-backdrop-blur-md tw-border tw-border-[#FFB0CF]/20 tw-rounded-full tw-flex tw-items-center tw-justify-center">
                    <FontAwesomeIcon icon={faCamera} className="tw-text-[#FFB0CF] tw-text-xl" />
                  </div>
                  <span className="tw-text-[#F0DBFF] tw-text-xs tw-font-bold tw-uppercase tw-tracking-widest tw-text-center">Update Headshot</span>
                </button>
              </div>
            )}
          </div>

          {/* RIGHT: REEL / BANNER */}
          <div className={`tw-relative tw-flex-1 tw-h-full tw-rounded-[10px] tw-overflow-hidden tw-bg-black group tw-transition-all ${
             errors.trailerOrBanner ? 'tw-border-[3px] tw-border-red-500 tw-shadow-[0_0_20px_rgba(239,68,68,0.5)]' : 'tw-shadow-[0_20px_40px_rgba(0,0,0,0.6)]'
          }`}>
            
            {errors.trailerOrBanner && isEditMode && (
              <div className="tw-absolute tw-top-4 tw-right-4 tw-bg-red-500 tw-text-white tw-text-[10px] tw-font-bold tw-uppercase tw-tracking-widest tw-px-3 tw-py-1.5 tw-rounded-full tw-z-30 tw-shadow-lg tw-animate-pulse">
                Banner/Reel Required
              </div>
            )}

            {playingView === 'desktop' ? (
              <video src={displayReel} controls autoPlay onEnded={() => setPlayingView(null)} className="tw-w-full tw-h-full tw-object-contain tw-bg-black" />
            ) : (
              <>
                {localReel && !localBanner ? (
                   <video src={displayReel} className="tw-w-full tw-h-full tw-object-cover tw-object-center tw-opacity-50" />
                ) : (
                   <img src={displayBanner} alt="Banner" className="tw-w-full tw-h-full tw-object-cover tw-object-center" />
                )}

                <div className="tw-absolute tw-inset-0 tw-bg-gradient-to-t tw-from-[#1E0039]/90 tw-via-black/40 tw-to-transparent tw-pointer-events-none"></div>
                
                {hasReel && !isEditMode && (
                  <div className="tw-absolute tw-inset-0 tw-flex tw-items-center tw-justify-center tw-cursor-pointer tw-z-10" onClick={handlePlayReel('desktop')}>
                    <div className="tw-flex tw-items-center tw-justify-center tw-w-20 tw-h-20 tw-rounded-full tw-border-[3px] tw-border-white tw-bg-black/40 hover:tw-bg-[#FF43A7]/80 tw-transition-colors">
                      <FontAwesomeIcon icon={faPlay} className="tw-text-white tw-text-3xl tw-ml-2" />
                    </div>
                  </div>
                )}

                {/* DESKTOP Summary */}
                <div className="tw-absolute tw-bottom-0 tw-left-0 tw-right-0 tw-flex tw-flex-col tw-p-10 tw-pb-12 tw-z-20">
                  {isEditingSummary? (
                    <div className="tw-flex tw-flex-col tw-gap-3 tw-w-full tw-max-w-4xl">
                      <textarea
                        value={tempSummary}
                        onChange={(e) => setTempSummary(e.target.value)}
                        autoFocus
                        className="tw-w-full tw-bg-[#1F0439]/90 tw-backdrop-blur-md tw-text-white tw-text-xl tw-p-4 tw-rounded-xl tw-border-2 tw-border-[#FF43A7] tw-outline-none tw-resize-none tw-shadow-xl"
                        rows="2"
                        placeholder="Your professional tagline or mission..."
                      />
                      <button onClick={handleSummarySubmit} className="tw-self-start tw-bg-[#FF43A7] tw-border-none tw-text-[#570033] tw-px-8 tw-py-2 tw-rounded-lg tw-font-bold tw-text-sm hover:tw-bg-[#ff5cac] tw-transition-colors tw-shadow-lg tw-cursor-pointer">
                        Save Summary
                      </button>
                    </div>
                  ) : (
                    <div className="tw-flex tw-items-start tw-gap-4 tw-max-w-4xl">
                      <p className="tw-text-xl tw-font-medium tw-leading-relaxed tw-text-white tw-drop-shadow-md">
                        {data?.summary || (isEditMode ? "Click to add your professional summary..." : "")}
                      </p>
                      {isEditMode && (
                        <button 
                          onClick={() => { setIsEditingSummary(true); }} 
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
                    <button 
                      onClick={(e) => { 
                        e.stopPropagation(); 
                        if(clearError) clearError('trailerOrBanner');
                        setIsBannerModalOpen(true); 
                      }} 
                      className="tw-bg-transparent tw-border-none tw-outline-none tw-p-0 tw-m-0 tw-flex tw-flex-col tw-items-center tw-justify-center tw-w-[200px] tw-gap-4 hover:tw-scale-105 tw-transition-transform tw-cursor-pointer"
                    >
                      <div className="tw-w-[72px] tw-h-[66px] tw-bg-[#371E51]/80 tw-backdrop-blur-md tw-border tw-border-[#FFB0CF]/20 tw-rounded-full tw-flex tw-items-center tw-justify-center">
                        <FontAwesomeIcon icon={faVideo} className="tw-text-[#FFB0CF] tw-text-2xl" />
                      </div>
                      <span className="tw-text-[#F0DBFF] tw-text-sm tw-font-bold tw-uppercase tw-tracking-widest tw-text-center">Update Reel / Banner</span>
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
                <video src={displayReel} controls autoPlay onEnded={() => setPlayingView(null)} className="tw-w-full tw-h-full tw-object-contain" />
              ) : (
                <>
                  {localReel && !localBanner ? (
                     <video src={displayReel} className="tw-w-full tw-h-full tw-object-cover tw-opacity-50" />
                  ) : (
                     <img src={displayBanner} alt="Banner" className="tw-w-full tw-h-full tw-object-cover" />
                  )}
                  
                  {hasReel && !isEditMode && (
                    <div className="tw-absolute tw-inset-0 tw-flex tw-items-center tw-justify-center tw-cursor-pointer tw-z-10" onClick={handlePlayReel('mobile')}>
                      <div className="tw-flex tw-items-center tw-justify-center tw-w-16 tw-h-16 tw-rounded-full tw-border-[3px] tw-border-white tw-bg-black/40 hover:tw-bg-[#FF43A7]/80 tw-transition-colors">
                        <FontAwesomeIcon icon={faPlay} className="tw-text-white tw-text-2xl tw-ml-1" />
                      </div>
                    </div>
                  )}

                  {isEditMode && (
                    <div className="tw-absolute tw-inset-0 tw-bg-black/50 tw-flex tw-items-center tw-justify-center tw-z-20">
                      <button 
                        onClick={(e) => { 
                          e.stopPropagation(); 
                          if(clearError) clearError('trailerOrBanner');
                          setIsBannerModalOpen(true); 
                        }} 
                        className="tw-bg-[#FF43A7] tw-border-none tw-text-[#570033] tw-px-6 tw-py-2 tw-rounded-full tw-font-bold tw-text-sm shadow-lg tw-cursor-pointer"
                      >
                        <FontAwesomeIcon icon={faVideo} className="tw-mr-2" />
                        Update Banner
                      </button>
                    </div>
                  )}
                </>
              )}
          </div>
          
          {/* MOBILE HEADSHOT & LINKS */}
          <div className="tw-flex tw-flex-row tw-w-full tw-gap-4 tw-items-stretch">
            <div 
              className={`tw-relative tw-w-1/2 tw-overflow-hidden tw-rounded-[10px] tw-bg-black tw-cursor-pointer tw-transition-all ${
                 errors.image_details ? 'tw-border-[3px] tw-border-red-500 tw-shadow-[0_0_15px_rgba(239,68,68,0.5)]' : 'tw-shadow-lg'
              }`}
              onClick={() => !isEditMode && setExpandedImage(displayHeadshot)}
            >
              <img src={displayHeadshot} alt="Headshot" className="tw-h-full tw-min-h-[220px] tw-w-full tw-object-cover tw-object-center" />
              
              {isEditMode && (
                <div className="tw-absolute tw-inset-0 tw-bg-black/50 tw-flex tw-items-center tw-justify-center tw-z-20">
                  <button 
                    onClick={(e) => { 
                      e.stopPropagation(); 
                      if(clearError) clearError('image_details');
                      setIsPosterModalOpen(true); 
                    }} 
                    className="tw-bg-[#FF43A7] tw-border-none tw-text-[#570033] tw-px-4 tw-py-2 tw-rounded-lg tw-font-bold tw-text-xs shadow-lg tw-cursor-pointer"
                  >
                    Edit Headshot
                  </button>
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
        </div>

      </div>

      {/* LIGHTBOX */}
      {expandedImage && (
        <div 
          className="tw-fixed tw-inset-0 tw-z-[9999] tw-bg-[#0a0014]/90 tw-backdrop-blur-md tw-flex tw-items-center tw-justify-center tw-p-4 tw-cursor-pointer"
          onClick={() => setExpandedImage(null)}
        >
          <img 
            src={expandedImage} 
            alt="Fullscreen" 
            className="tw-max-w-full tw-max-h-full tw-object-contain tw-rounded-lg" 
            onClick={(e) => e.stopPropagation()} 
          />
        </div>
      )}

      <UpdatePosterModal isOpen={isPosterModalOpen} onClose={() => setIsPosterModalOpen(false)} epkInfo={data} onSave={handleSaveHeadshot} />
      <UpdateBannerModal isOpen={isBannerModalOpen} onClose={() => setIsBannerModalOpen(false)} onSave={handleSaveBanner} />
    </>
  );
}