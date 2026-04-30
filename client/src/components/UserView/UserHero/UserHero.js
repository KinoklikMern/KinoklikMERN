/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faVideo, faPlay, faImages, faXmark, 
  faChevronLeft, faChevronRight  } from "@fortawesome/free-solid-svg-icons";
import emptyBanner from '../../../images/empty_banner.jpeg';

import UpdateImageModal from "../../UpdateImageModal";
import UpdateBannerModal from "../../UpdateBannerModal"; 

export default function UserCover({ data, scrollToPhotos, scrollToVideos, isEditMode, onChange, errors = {}, clearError }) {
  const [isPosterModalOpen, setIsPosterModalOpen] = useState(false);
  const [isBannerModalOpen, setIsBannerModalOpen] = useState(false);
  const [playingView, setPlayingView] = useState(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const headshots = data?.photo_albums?.headshots || [];
  const hasMultiple = headshots.length > 1;

  const [localHeadshot, setLocalHeadshot] = useState(null);
  const [localBanner, setLocalBanner] = useState(null);
  const [localReel, setLocalReel] = useState(null);

  const AWS_URL = process.env.REACT_APP_AWS_URL;

  useEffect(() => {
    if (!isEditMode) {
      setLocalHeadshot(null);
      setLocalBanner(null);
      setLocalReel(null);
      setPlayingView(null);
    }
  }, [isEditMode]);

  const nextImage = (e) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % headshots.length);
  };
  
  const prevImage = (e) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + headshots.length) % headshots.length);
  };
  
  const handleTouchStart = (e) => setTouchStart(e.targetTouches[0].clientX);
  const handleTouchEnd = (e) => {
    const touchEnd = e.changedTouches[0].clientX;
    if (touchStart - touchEnd > 50) nextImage();
    if (touchEnd - touchStart > 50) prevImage();
  };
  
  const getImageUrl = (imgObj) => {
    if (!imgObj) return emptyBanner;
    const path = typeof imgObj === 'string' ? imgObj : imgObj.image;
    return path.startsWith("http") ? path : `${AWS_URL}/${path}`;
  };

  const mainHeadshot = data?.photo_albums?.headshots?.find(img => img.isMain)?.image;
  const rawHeadshot = data?.picture || mainHeadshot;
  const dbHeadshotUrl = !rawHeadshot ? "" : rawHeadshot.startsWith("http") ? rawHeadshot : `${AWS_URL}/${rawHeadshot}`;

  const mainReelObj = data?.video_gallery?.reels?.find(vid => vid.isMain);
  const dbReelSrc = !mainReelObj?.url ? "" : mainReelObj.url.startsWith("http") ? mainReelObj.url : `${AWS_URL}/${mainReelObj.url}`;
  const dbBannerUrl = !mainReelObj?.thumbnail ? emptyBanner : mainReelObj.thumbnail.startsWith("http") ? mainReelObj.thumbnail : `${AWS_URL}/${mainReelObj.thumbnail}`;
  const displayHeadshot = localHeadshot || getImageUrl(headshots[currentIndex]);
  const displayBanner = localBanner || dbBannerUrl;
  const displayReel = localReel || dbReelSrc;
  const hasReel = Boolean(displayReel);

  const handleSaveHeadshot = (res) => {
    setIsPosterModalOpen(false);
    if (res.type === "local") {
      setLocalHeadshot(URL.createObjectURL(res.file));
      onChange("new_headshot_file", res.file); 
    } else {
      setLocalHeadshot(`${AWS_URL}/${res.data.image}`);
      onChange("picture", res.data.image); 
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
    } else if (res.type === "video") {
      setLocalReel(URL.createObjectURL(res.file));
      let thumbFile = res.customThumbnailFile;
      if (!thumbFile && res.thumbnailData) {
        thumbFile = await base64ToFile(res.thumbnailData, "reel_thumb.jpg");
      }
      if (thumbFile) setLocalBanner(URL.createObjectURL(thumbFile));
      onChange("new_reel_file", res.file);
      onChange("new_reel_thumbnail", thumbFile);
    }
  };

  return (
    <>
      <div className="tw-w-full tw-max-w-[1280px] tw-mx-auto tw-pb-10">
        
        {/* ================= DESKTOP VIEW ================= */}
        <div className="tw-hidden md:tw-flex tw-w-full tw-h-[515px] xl:tw-h-[600px] tw-gap-8 tw-relative">
          
          <div 
            className={`tw-relative tw-w-[343px] tw-h-full tw-shrink-0 tw-rounded-[10px] tw-overflow-hidden tw-bg-black group tw-cursor-pointer ${
              errors.image_details ? 'tw-border-[3px] tw-border-red-500' : 'tw-shadow-[0_20px_40px_rgba(0,0,0,0.6)]'
            }`}
            onClick={() => !isEditMode && setIsExpanded(true)}
          >
            <img src={displayHeadshot} alt="Headshot" className="tw-w-full tw-h-full tw-object-cover" />
            
            {hasMultiple && !isEditMode && (
              <>
                <button 
                  onClick={prevImage} 
                  className="tw-absolute tw-left-2 tw-top-1/2 -tw-translate-y-1/2 tw-bg-black/60 hover:tw-bg-black/90 tw-backdrop-blur-sm tw-text-white tw-w-9 tw-h-9 tw-rounded-full tw-opacity-20 group-hover:tw-opacity-100 tw-transition-all tw-shadow-md tw-flex tw-items-center tw-justify-center"
                >
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <button 
                  onClick={nextImage} 
                  className="tw-absolute tw-right-2 tw-top-1/2 -tw-translate-y-1/2 tw-bg-black/60 hover:tw-bg-black/90 tw-backdrop-blur-sm tw-text-white tw-w-9 tw-h-9 tw-rounded-full tw-opacity-20 group-hover:tw-opacity-100 tw-transition-all tw-shadow-md tw-flex tw-items-center tw-justify-center"
                >
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>
              </>
            )}

            {isEditMode && (
              <div className="tw-absolute tw-inset-0 tw-bg-[#1F0439]/40 tw-backdrop-blur-[1px] tw-flex tw-flex-col tw-items-center tw-justify-center">
                <button onClick={(e) => { e.stopPropagation(); setIsPosterModalOpen(true); }} className="tw-bg-transparent tw-border-none tw-flex tw-flex-col tw-items-center tw-gap-3 hover:tw-scale-105 tw-transition-transform tw-cursor-pointer">
                  <div className="tw-w-[59px] tw-h-[56px] tw-bg-[#371E51]/80 tw-rounded-full tw-flex tw-items-center tw-justify-center">
                    <FontAwesomeIcon icon={faCamera} className="tw-text-[#FFB0CF] tw-text-xl" />
                  </div>
                  <span className="tw-text-[#F0DBFF] tw-text-xs tw-font-bold tw-uppercase tw-tracking-widest">Update Headshot</span>
                </button>
              </div>
            )}
          </div>

          <div className={`tw-relative tw-flex-1 tw-h-full tw-rounded-[10px] tw-overflow-hidden tw-bg-black ${
             errors.trailerOrBanner ? 'tw-border-[3px] tw-border-red-500' : 'tw-shadow-[0_20px_40px_rgba(0,0,0,0.6)]'
          }`}>
            {playingView === 'desktop' ? (
              <video src={displayReel} controls autoPlay onEnded={() => setPlayingView(null)} className="tw-w-full tw-h-full tw-object-contain" />
            ) : (
              <>
                <img src={displayBanner} alt="Banner" className="tw-w-full tw-h-full tw-object-cover" />
                <div className="tw-absolute tw-inset-0 tw-bg-gradient-to-t tw-from-[#1E0039]/60 tw-to-transparent" />
                {hasReel && !isEditMode && (
                  <div className="tw-absolute tw-inset-0 tw-flex tw-items-center tw-justify-center tw-cursor-pointer" onClick={() => setPlayingView('desktop')}>
                    <div className="tw-w-20 tw-h-20 tw-rounded-full tw-border-[3px] tw-border-white tw-bg-black/40 hover:tw-bg-[#FF43A7]/80 tw-transition-colors tw-flex tw-items-center tw-justify-center">
                      <FontAwesomeIcon icon={faPlay} className="tw-text-white tw-text-3xl tw-ml-2" />
                    </div>
                  </div>
                )}
                {isEditMode && (
                  <div className="tw-absolute tw-inset-0 tw-bg-[#1F0439]/40 tw-backdrop-blur-[1px] tw-flex tw-items-center tw-justify-center">
                    <button onClick={(e) => { e.stopPropagation(); setIsBannerModalOpen(true); }} className="tw-bg-transparent tw-border-none tw-flex tw-flex-col tw-items-center tw-gap-4 hover:tw-scale-105 tw-transition-transform tw-cursor-pointer">
                      <div className="tw-w-[72px] tw-h-[66px] tw-bg-[#371E51]/80 tw-rounded-full tw-flex tw-items-center tw-justify-center">
                        <FontAwesomeIcon icon={faVideo} className="tw-text-[#FFB0CF] tw-text-2xl" />
                      </div>
                      <span className="tw-text-[#F0DBFF] tw-text-sm tw-font-bold tw-uppercase tw-tracking-widest">Update Reel / Banner</span>
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* ================= MOBILE VIEW (MATCHING EPK) ================= */}
        <div className="tw-flex md:tw-hidden tw-flex-col tw-gap-4">
          
          <div className="tw-relative tw-w-full tw-h-[250px] tw-rounded-[10px] tw-overflow-hidden tw-bg-black tw-shadow-lg">
            {playingView === 'mobile' ? (
              <video src={displayReel} controls autoPlay onEnded={() => setPlayingView(null)} className="tw-w-full tw-h-full tw-object-contain" />
            ) : (
              <>
                <img src={displayBanner} alt="Mobile Banner" className="tw-w-full tw-h-full tw-object-cover" />
                {hasReel && !isEditMode && (
                  <div className="tw-absolute tw-inset-0 tw-flex tw-items-center tw-justify-center" onClick={() => setPlayingView('mobile')}>
                    <div className="tw-w-16 tw-h-16 tw-rounded-full tw-border-[3px] tw-border-white tw-bg-black/40 tw-flex tw-items-center tw-justify-center">
                      <FontAwesomeIcon icon={faPlay} className="tw-text-white tw-text-2xl tw-ml-1" />
                    </div>
                  </div>
                )}
                {isEditMode && (
                  <div className="tw-absolute tw-inset-0 tw-bg-black/50 tw-flex tw-items-center tw-justify-center">
                    <button onClick={() => setIsBannerModalOpen(true)} className="tw-bg-[#FF43A7] tw-border-none tw-text-[#570033] tw-px-6 tw-py-2 tw-rounded-full tw-font-bold tw-text-sm">
                      <FontAwesomeIcon icon={faVideo} className="tw-mr-2" /> Update Reel
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          <div className="tw-flex tw-flex-row tw-w-full tw-gap-4 tw-items-stretch">
            <div 
              className="tw-relative tw-w-1/2 tw-min-h-[220px] tw-rounded-[10px] tw-overflow-hidden tw-bg-black tw-shadow-lg"
              onClick={() => !isEditMode && setIsExpanded(true)}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <img src={displayHeadshot} alt="Mobile Headshot" className="tw-w-full tw-h-full tw-object-cover" />
              {isEditMode && (
                <div className="tw-absolute tw-inset-0 tw-bg-black/50 tw-flex tw-items-center tw-justify-center">
                  <button onClick={(e) => { e.stopPropagation(); setIsPosterModalOpen(true); }} className="tw-bg-[#FF43A7] tw-border-none tw-text-[#570033] tw-px-4 tw-py-2 tw-rounded-lg tw-font-bold tw-text-xs">
                    Edit Photo
                  </button>
                </div>
              )}
            </div>

            <div className="tw-w-1/2 tw-flex tw-flex-col tw-justify-center tw-gap-4">
              <button onClick={scrollToVideos} className="tw-flex tw-items-center tw-justify-center tw-gap-3 tw-w-full tw-py-4 tw-rounded-[8px] tw-bg-transparent tw-border-[1.5px] tw-border-[#FF43A7] tw-text-white tw-font-bold">
                <FontAwesomeIcon icon={faPlay} /> Videos
              </button>
              <button onClick={scrollToPhotos} className="tw-flex tw-items-center tw-justify-center tw-gap-3 tw-w-full tw-py-4 tw-rounded-[8px] tw-bg-transparent tw-border-[1.5px] tw-border-[#FF43A7] tw-text-white tw-font-bold">
                <FontAwesomeIcon icon={faImages} /> Pictures
              </button>
            </div>
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="tw-fixed tw-inset-0 tw-z-[9999] tw-bg-[#0a0014]/95 tw-backdrop-blur-md tw-flex tw-items-center tw-justify-center tw-p-4" 
             onClick={() => setIsExpanded(false)}
             onTouchStart={handleTouchStart}
             onTouchEnd={handleTouchEnd}
        >
          <button className="tw-absolute tw-top-6 tw-right-6 tw-w-12 tw-h-12 tw-bg-black/50 tw-rounded-full tw-text-white tw-border-none tw-cursor-pointer tw-z-50" onClick={() => setIsExpanded(false)}>
            <FontAwesomeIcon icon={faXmark} className="tw-text-2xl" />
          </button>
          
          {hasMultiple && (
            <>
              <button onClick={prevImage} className="tw-absolute tw-left-4 tw-z-50 tw-text-white/70 hover:tw-text-white tw-text-4xl">
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
              <button onClick={nextImage} className="tw-absolute tw-right-4 tw-z-50 tw-text-white/70 hover:tw-text-white tw-text-4xl">
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </>
          )}

          <img src={displayHeadshot} alt="Fullscreen" className="tw-max-w-full tw-max-h-full tw-object-contain tw-rounded-lg shadow-2xl" />
        </div>
      )}

      <UpdateImageModal isOpen={isPosterModalOpen} onClose={() => setIsPosterModalOpen(false)} libraryImages={data?.photo_albums?.headshots || []} mode="user" onSave={handleSaveHeadshot} />
      <UpdateBannerModal isOpen={isBannerModalOpen} onClose={() => setIsBannerModalOpen(false)} libraryItems={data?.video_gallery?.reels || []} onSave={handleSaveBanner} />
    </>
  );
}