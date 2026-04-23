/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faVideo, faPlay, faImages, faXmark } from "@fortawesome/free-solid-svg-icons";
import emptyBanner from '../../../images/empty_banner.jpeg';

import UpdateImageModal from "../../UpdateImageModal";
import UpdateBannerModal from "../../UpdateBannerModal"; 

export default function UserCover({ data, scrollToPhotos, scrollToVideos, isEditMode, onChange, errors = {}, clearError }) {
  const [isPosterModalOpen, setIsPosterModalOpen] = useState(false);
  const [isBannerModalOpen, setIsBannerModalOpen] = useState(false);
  const [playingView, setPlayingView] = useState(null);
  
  // --- FULLSCREEN IMAGE STATE ---
  const [expandedImage, setExpandedImage] = useState(null);

  // --- INSTANT LOCAL PREVIEW STATES ---
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

  // --- DATA NORMALIZATION (USER FIELDS) ---
  const mainHeadshot = data?.photo_albums?.headshots?.find(img => img.isMain)?.image;
  const rawHeadshot = data?.picture || mainHeadshot;
  const dbHeadshotUrl = !rawHeadshot ? "" : rawHeadshot.startsWith("http") ? rawHeadshot : `${AWS_URL}/${rawHeadshot}`;

  const mainReelObj = data?.video_albums?.media?.find(vid => vid.isMain);
  const dbReelSrc = !mainReelObj?.video ? "" : mainReelObj.video.startsWith("http") ? mainReelObj.video : `${AWS_URL}/${mainReelObj.video}`;
  
  // Banner uses the thumbnail of the Main Reel
  const dbBannerUrl = !mainReelObj?.image ? emptyBanner : mainReelObj.image.startsWith("http") ? mainReelObj.image : `${AWS_URL}/${mainReelObj.image}`;

  const displayHeadshot = localHeadshot || dbHeadshotUrl || emptyBanner;
  const displayBanner = localBanner || dbBannerUrl;
  const displayReel = localReel || dbReelSrc;
  const hasReel = Boolean(displayReel);

  // --- SMART MEDIA BACKUP LOGIC ---
  const handleSaveHeadshot = (res) => {
    setIsPosterModalOpen(false);

    // Backup current headshot to album if it's not already there
    const currentPath = data?.picture || mainHeadshot;
    if (currentPath && currentPath !== res.data?.image) {
      const currentAlbums = data?.photo_albums || { headshots: [] };
      const headshots = currentAlbums.headshots || [];
      if (!headshots.some(h => h.image === currentPath)) {
        onChange("photo_albums", {
          ...currentAlbums,
          headshots: [{ image: currentPath, isMain: false }, ...headshots]
        });
      }
    }

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

    // Backup old reel if it exists
    if (mainReelObj?.video) {
      const currentVideos = data?.video_albums || { media: [] };
      const media = currentVideos.media || [];
      if (!media.some(v => v.video === mainReelObj.video)) {
        onChange("video_albums", {
          ...currentVideos,
          media: [{ ...mainReelObj, isMain: false }, ...media]
        });
      }
    }

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
        <div className="tw-hidden md:tw-flex tw-w-full tw-h-[515px] xl:tw-h-[600px] tw-gap-8 tw-relative">
          
          {/* LEFT: HEADSHOT */}
          <div 
            className={`tw-relative tw-w-[343px] tw-h-full tw-shrink-0 tw-rounded-[10px] tw-overflow-hidden tw-bg-black group tw-cursor-pointer tw-transition-all ${
              errors.image_details ? 'tw-border-[3px] tw-border-red-500 tw-shadow-[0_0_20px_rgba(239,68,68,0.5)]' : 'tw-shadow-[0_20px_40px_rgba(0,0,0,0.6)]'
            }`}
            onClick={() => !isEditMode && setExpandedImage(displayHeadshot)}
          >
            <img src={displayHeadshot} alt="Headshot" className="tw-w-full tw-h-full tw-object-cover" />
            
            {errors.image_details && isEditMode && (
              <div className="tw-absolute tw-top-4 tw-left-4 tw-bg-red-500 tw-text-white tw-text-[10px] tw-font-bold tw-uppercase tw-tracking-widest tw-px-3 tw-py-1.5 tw-rounded-full tw-z-30 tw-animate-pulse">
                Headshot Required
              </div>
            )}

            {isEditMode && (
              <div className="tw-absolute tw-inset-0 tw-bg-[#1F0439]/40 tw-backdrop-blur-[1px] tw-flex tw-flex-col tw-items-center tw-justify-center">
                <button onClick={(e) => { e.stopPropagation(); if (clearError) clearError('image_details'); setIsPosterModalOpen(true); }} className="tw-bg-transparent tw-border-none tw-flex tw-flex-col tw-items-center tw-gap-3 hover:tw-scale-105 tw-transition-transform tw-cursor-pointer">
                  <div className="tw-w-[59px] tw-h-[56px] tw-bg-[#371E51]/80 tw-rounded-full tw-flex tw-items-center tw-justify-center">
                    <FontAwesomeIcon icon={faCamera} className="tw-text-[#FFB0CF] tw-text-xl" />
                  </div>
                  <span className="tw-text-[#F0DBFF] tw-text-xs tw-font-bold tw-uppercase tw-tracking-widest">Update Headshot</span>
                </button>
              </div>
            )}
          </div>

          {/* RIGHT: REEL / BANNER */}
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
                    <button onClick={(e) => { e.stopPropagation(); if (clearError) clearError('trailerOrBanner'); setIsBannerModalOpen(true); }} className="tw-bg-transparent tw-border-none tw-flex tw-flex-col tw-items-center tw-gap-4 hover:tw-scale-105 tw-transition-transform tw-cursor-pointer">
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
      </div>

      {/* LIGHTBOX */}
      {expandedImage && (
        <div className="tw-fixed tw-inset-0 tw-z-[9999] tw-bg-[#0a0014]/95 tw-backdrop-blur-md tw-flex tw-items-center tw-justify-center tw-p-4" onClick={() => setExpandedImage(null)}>
          <button className="tw-absolute tw-top-6 tw-right-6 tw-w-12 tw-h-12 tw-bg-black/50 tw-rounded-full tw-text-white tw-border-none tw-cursor-pointer tw-flex tw-items-center tw-justify-center">
            <FontAwesomeIcon icon={faXmark} className="tw-text-2xl" />
          </button>
          <img src={expandedImage} alt="Fullscreen" className="tw-max-w-full tw-max-h-full tw-object-contain tw-rounded-lg shadow-2xl" />
        </div>
      )}


      <UpdateImageModal 
        isOpen={isPosterModalOpen} 
        onClose={() => setIsPosterModalOpen(false)} 
        libraryImages={data?.photo_albums?.headshots || []}
        mode="user" // Explicitly set to user for "Update Headshot" labels
        onSave={handleSaveHeadshot} 
      />
      <UpdateBannerModal 
        isOpen={isBannerModalOpen} 
        onClose={() => setIsBannerModalOpen(false)} 
        libraryItems={data?.video_albums?.media || []} // Pass existing videos
        onSave={handleSaveBanner} 
      />
    </>
  );
}