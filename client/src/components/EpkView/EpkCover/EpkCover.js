import React, { useState } from "react";
import { useSelector } from "react-redux";
import { setBannerThumbnail } from "../../../api/epks"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faStar, faPlay, faImages } from "@fortawesome/free-solid-svg-icons";
// import { useTranslation } from "react-i18next";

export default function EpkCover({ epkInfo,scrollToPhotos, scrollToVideos }) {
  // const { t } = useTranslation();
  // const URL = "";
  const image_detail =
    epkInfo.image_details === "" || epkInfo.image_details.startsWith("https")
      ? ""
      : `${process.env.REACT_APP_AWS_URL}/${epkInfo.image_details}`;

  const user = useSelector((state) => state.user);

  // const formatedDate = (timestamp) => {
  //   return new Date(timestamp).toLocaleString("en-US", {
  //     month: "short",
  //     day: "2-digit",
  //     year: "numeric",
  //   });
  // };
  const bannersList = epkInfo?.banners?.length > 0 
    ? epkInfo.banners 
    : [{ 
        _id: 'fallback', 
        url: epkInfo?.banner_url || '', 
        is_thumbnail: true 
      }];
  const initialIndex = bannersList.findIndex(b => b.is_thumbnail);
  const [activeIndex, setActiveIndex] = useState(initialIndex >= 0 ? initialIndex : 0);
  const [isUpdating, setIsUpdating] = useState(false);

  const [playingView, setPlayingView] = useState(null);

  const nextBanner = () => setActiveIndex((prev) => (prev + 1) % bannersList.length);
  const prevBanner = () => setActiveIndex((prev) => (prev - 1 + bannersList.length) % bannersList.length);

  const handleSetThumbnail = async (e) => {
    e.stopPropagation();
    if (!bannersList[activeIndex]?._id) return; 
    setIsUpdating(true);
    await setBannerThumbnail(epkInfo._id, bannersList[activeIndex]._id);
    window.location.reload(); 
  };

  const isOwner = user?.id === epkInfo.film_maker?._id;
  
  const activeBannerRawUrl = bannersList[activeIndex]?.url;
  const currentBannerUrl = !activeBannerRawUrl 
    ? ""
    : activeBannerRawUrl.startsWith("http") 
      ? activeBannerRawUrl 
      : `${process.env.REACT_APP_AWS_URL}/${activeBannerRawUrl}`;

  const rawTrailerUrl = epkInfo?.trailer_url || epkInfo?.trailer;
  const trailerSrc = rawTrailerUrl 
    ? (rawTrailerUrl.startsWith("http") ? rawTrailerUrl : `${process.env.REACT_APP_AWS_URL}/${rawTrailerUrl}`) 
    : "";

  const hasTrailer = Boolean(trailerSrc);
  const isTrailerCover = hasTrailer && bannersList[activeIndex]?.is_thumbnail;

  const handlePlayTrailer = (view) => (e) => {
    e.stopPropagation();
    setPlayingView(view); 
  };

 return (
    <>
      {/* ----------------- DESKTOP VIEW ----------------- */}
      <div className="tw-hidden md:tw-flex tw-w-full tw-flex-row tw-gap-6 tw-mb-10">
        <div className="tw-w-[28%] tw-shrink-0 tw-overflow-hidden tw-rounded-[10px] tw-shadow-lg">
          <img
            src={image_detail}
            alt="Poster"
            className="tw-h-[500px] xl:tw-h-[600px] tw-w-full tw-object-cover tw-object-center"
          />
        </div>

        <div className="tw-relative tw-flex-1 tw-overflow-hidden tw-rounded-[10px] tw-shadow-lg tw-group tw-bg-black">
          
          {playingView === 'desktop' ? (
            /* --- INLINE VIDEO PLAYER (DESKTOP ONLY) --- */
            <video
              src={trailerSrc}
              controls
              autoPlay
              onEnded={() => setPlayingView(null)} 
              className="tw-h-[500px] xl:tw-h-[600px] tw-w-full tw-object-contain tw-object-center tw-bg-black"
            />
          ) : (
            /* --- IMAGE GALLERY VIEW --- */
            <>
              <img
                src={currentBannerUrl}
                alt="Banner"
                className="tw-h-[500px] xl:tw-h-[600px] tw-w-full tw-object-cover tw-object-center tw-transition-all tw-duration-500"
                onError={(e) => { e.target.src = "https://kinomovie.s3.amazonaws.com/empty_banner.jpeg"; }}
              />
              <div className="tw-absolute tw-inset-0 tw-bg-gradient-to-t tw-from-[#1E0039]/90 tw-via-black/40 tw-to-transparent tw-pointer-events-none"></div>

              {/* PLAY BUTTON OVERLAY */}
              {isTrailerCover && (
                <div 
                  className="tw-absolute tw-inset-0 tw-flex tw-items-center tw-justify-center tw-cursor-pointer tw-z-20 hover:tw-scale-110 tw-transition-transform tw-duration-300"
                  onClick={handlePlayTrailer('desktop')}
                >
                  <div className="tw-flex tw-items-center tw-justify-center tw-w-24 tw-h-24 tw-rounded-full tw-border-4 tw-border-white tw-bg-black/40 hover:tw-bg-[#E81A84]/80 tw-transition-colors">
                    <FontAwesomeIcon icon={faPlay} className="tw-text-white tw-text-4xl tw-ml-2" />
                  </div>
                </div>
              )}
            </>
          )}

          {/* DESKTOP NAVIGATION ARROWS */}
          {playingView !== 'desktop' && bannersList.length > 1 && (
            <>
              <button 
                onClick={(e) => { e.stopPropagation(); prevBanner(); }} 
                className="tw-absolute tw-left-4 tw-top-1/2 tw--translate-y-1/2 tw-bg-black/50 hover:tw-bg-[#E81A84] tw-text-white tw-w-8 tw-h-8 tw-rounded-full tw-transition-colors tw-z-30 tw-flex tw-justify-center tw-items-center tw-shadow-md"
              >
                <FontAwesomeIcon icon={faChevronLeft} className="tw-text-sm" />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); nextBanner(); }} 
                className="tw-absolute tw-right-4 tw-top-1/2 tw--translate-y-1/2 tw-bg-black/50 hover:tw-bg-[#E81A84] tw-text-white tw-w-8 tw-h-8 tw-rounded-full tw-transition-colors tw-z-30 tw-flex tw-justify-center tw-items-center tw-shadow-md"
              >
                <FontAwesomeIcon icon={faChevronRight} className="tw-text-sm" />
              </button>
            </>
          )}

          {/* SET THUMBNAIL BUTTON */}
          {playingView !== 'desktop' && isOwner && bannersList.length > 1 && !bannersList[activeIndex].is_thumbnail && (
            <button 
              onClick={handleSetThumbnail}
              disabled={isUpdating}
              className="tw-absolute tw-top-4 tw-left-4 tw-bg-[#1E0039]/80 hover:tw-bg-[#E81A84] tw-border tw-border-[#E81A84] tw-text-white tw-px-4 tw-py-2 tw-rounded-md tw-font-bold tw-text-sm tw-shadow-lg tw-transition-colors tw-z-30"
            >
              <FontAwesomeIcon icon={faStar} className="tw-mr-2" />
              {isUpdating ? "Setting..." : "Set as Thumbnail"}
            </button>
          )}

          {/* LOGLINE */}
          {playingView !== 'desktop' && (
            <div className="tw-absolute tw-bottom-0 tw-left-0 tw-right-0 tw-flex tw-flex-col tw-p-10 tw-pb-12 tw-z-10">
              <p className="tw-max-w-4xl tw-text-xl tw-font-medium tw-leading-relaxed tw-text-white tw-drop-shadow-md">
                {epkInfo?.logLine_short}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ----------------- MOBILE VIEW ----------------- */}
      <div className="tw-flex md:tw-hidden tw-w-full tw-flex-col tw-gap-4 tw-mb-8">
        
        <div className="tw-relative tw-w-full tw-h-[250px] tw-rounded-[10px] tw-overflow-hidden tw-shadow-lg tw-bg-black">
          
          {playingView === 'mobile' ? (
            /* --- INLINE VIDEO PLAYER (MOBILE ONLY) --- */
            <video
              src={trailerSrc}
              controls
              autoPlay
              onEnded={() => setPlayingView(null)} 
              className="tw-h-full tw-w-full tw-object-contain tw-object-center"
            />
          ) : (
            /* --- IMAGE GALLERY VIEW --- */
            <>
              <img
                src={currentBannerUrl}
                alt="Mobile Banner"
                className="tw-h-full tw-w-full tw-object-cover tw-object-center tw-transition-all tw-duration-500"
                onError={(e) => { e.target.src = "https://kinomovie.s3.amazonaws.com/empty_banner.jpeg"; }}
              />
              <div className="tw-absolute tw-inset-0 tw-bg-gradient-to-t tw-from-black/60 tw-via-transparent tw-to-transparent tw-pointer-events-none"></div>
              
              {/* MOBILE PLAY BUTTON OVERLAY */}
              {isTrailerCover && (
                <div 
                  className="tw-absolute tw-inset-0 tw-flex tw-items-center tw-justify-center tw-cursor-pointer tw-z-20"
                  onClick={handlePlayTrailer('mobile')}
                >
                  <div className="tw-flex tw-items-center tw-justify-center tw-w-16 tw-h-16 tw-rounded-full tw-border-4 tw-border-white tw-bg-black/40 hover:tw-bg-[#E81A84]/80 tw-transition-colors">
                    <FontAwesomeIcon icon={faPlay} className="tw-text-white tw-text-2xl tw-ml-1" />
                  </div>
                </div>
              )}
            </>
          )}

          {/* MOBILE NAVIGATION ARROWS */}
          {playingView !== 'mobile' && bannersList.length > 1 && (
            <>
              <button 
                onClick={(e) => { e.stopPropagation(); prevBanner(); }} 
                className="tw-absolute tw-left-2 tw-top-1/2 tw--translate-y-1/2 tw-bg-black/40 hover:tw-bg-[#E81A84] tw-text-white tw-w-7 tw-h-7 tw-rounded-full tw-z-30 tw-flex tw-justify-center tw-items-center tw-shadow-md"
              >
                <FontAwesomeIcon icon={faChevronLeft} className="tw-text-xs" />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); nextBanner(); }} 
                className="tw-absolute tw-right-2 tw-top-1/2 tw--translate-y-1/2 tw-bg-black/40 hover:tw-bg-[#E81A84] tw-text-white tw-w-7 tw-h-7 tw-rounded-full tw-z-30 tw-flex tw-justify-center tw-items-center tw-shadow-md"
              >
                <FontAwesomeIcon icon={faChevronRight} className="tw-text-xs" />
              </button>
            </>
          )}
        </div>

        <div className="tw-flex tw-flex-row tw-w-full tw-gap-4 tw-items-stretch">
          <div className="tw-w-1/2 tw-overflow-hidden tw-rounded-[10px] tw-shadow-lg">
            <img
              src={image_detail}
              alt="Poster"
              className="tw-h-full tw-min-h-[220px] tw-w-full tw-object-cover tw-object-center"
            />
          </div>

          <div className="tw-w-1/2 tw-flex tw-flex-col tw-justify-center tw-gap-4">
            <button 
              onClick={scrollToVideos}
              className="tw-flex tw-flex-row tw-items-center tw-justify-center tw-gap-3 tw-w-full tw-py-4 tw-rounded-[8px] tw-bg-transparent tw-border tw-border-[#E81A84] hover:tw-bg-[#E81A84]/10 tw-transition-colors tw-shadow-md"
            >
              <FontAwesomeIcon icon={faPlay} className="tw-text-white tw-text-lg" />
              <span className="tw-text-white tw-font-bold tw-text-base">Videos</span>
            </button>
            <button 
              onClick={scrollToPhotos}
              className="tw-flex tw-flex-row tw-items-center tw-justify-center tw-gap-3 tw-w-full tw-py-4 tw-rounded-[8px] tw-bg-transparent tw-border tw-border-[#E81A84] hover:tw-bg-[#E81A84]/10 tw-transition-colors tw-shadow-md"
            >
              <FontAwesomeIcon icon={faImages} className="tw-text-white tw-text-lg" />
              <span className="tw-text-white tw-font-bold tw-text-base">Pictures</span>
            </button>
          </div>
        </div>

        <div className="tw-w-full tw-mt-2">
          <p className="tw-text-base tw-font-medium tw-leading-relaxed tw-text-white tw-text-justify tw-opacity-90">
            {epkInfo?.logLine_short}
          </p>
        </div>
      </div>
    </>
  );
}