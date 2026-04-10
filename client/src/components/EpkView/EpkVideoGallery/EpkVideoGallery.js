import React, { useMemo, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faPlay, faXmark } from "@fortawesome/free-solid-svg-icons";
import ActionPlaceholder from "../../common/ActionPlaceholder";

const CATEGORIES = [
  { key: "trailers", label: "Trailers" },
  { key: "behind", label: "Behind The Scene" },
  { key: "interviews", label: "Interviews" },
  { key: "premieres", label: "Premieres" },
];

export default function EpkVideoGallery({ epkInfo, isEditMode, onChange }) {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState("trailers");
  const sliderRef = useRef(null);

  const [playingVideo, setPlayingVideo] = useState(null);

  const albums = useMemo(() => {
    const vg = epkInfo?.video_gallery || {};
    const trailers = [...(vg.trailers || [])];
    
    // Auto-inject legacy trailers if not present in the new gallery array
    if (epkInfo?.trailer_url && !trailers.some(t => t.url === epkInfo.trailer_url)) {
        trailers.unshift({ url: epkInfo.trailer_url, title: "Official Trailer", thumbnail: epkInfo?.banner_url || '', blur: false });
    }
    if (epkInfo?.trailer && !trailers.some(t => t.url === epkInfo.trailer)) {
        trailers.unshift({ url: epkInfo.trailer, title: "Legacy Trailer", thumbnail: '', blur: false });
    }

    return {
      trailers,
      behind: vg.behind || [],
      interviews: vg.interviews || [],
      premieres: vg.premieres || [],
    };
  }, [epkInfo]);

  const videos = albums[activeCategory] || [];

  const handleScroll = (dir) => {
    if (sliderRef.current) {
      const scrollAmount = 420 + 32; // card width + gap
      sliderRef.current.scrollBy({ left: dir === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="tw-bg-[#1E0039] tw-w-full tw-pb-12 md:tw-pb-20">
      <div className="tw-w-full tw-max-w-[1440px] tw-mx-auto tw-flex tw-flex-col tw-px-4 lg:tw-px-16 tw-gap-12">
        
        {/* Video Gallery Container */}
        <div className="tw-bg-[#280D41] tw-border tw-border-[#5A3F49]/40 tw-rounded-[24px] tw-p-8 lg:tw-p-12 tw-flex tw-flex-col tw-gap-12">
          
          <div className="tw-flex tw-flex-col lg:tw-flex-row lg:tw-items-end tw-gap-6 lg:tw-justify-between">
            <h2 className="tw-text-white tw-text-3xl md:tw-text-4xl tw-font-bold tw-m-0">{t("Video Gallery")}</h2>
            
            <div className="tw-flex tw-flex-wrap tw-gap-3">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`tw-px-6 tw-py-2 tw-rounded-full tw-font-['Space_Grotesk'] tw-text-sm tw-font-bold tw-transition-all tw-border-none tw-cursor-pointer ${
                    activeCategory === cat.key
                      ? "tw-bg-[#FF43A7] tw-text-[#570033] tw-shadow-[0_0_15px_rgba(255,67,167,0.4)]"
                      : "tw-bg-[#371E51] tw-text-[#F0DBFF] hover:tw-bg-[#5A3F49]"
                  }`}
                >
                  {t(cat.label)}
                </button>
              ))}
            </div>
          </div>

          <div className="tw-relative tw-w-full">
            {(videos.length > 0 || isEditMode) && (
              <>
                <button onClick={() => handleScroll('left')} className="tw-hidden md:tw-flex tw-absolute tw--left-6 tw-top-1/2 tw--translate-y-1/2 tw-z-20 tw-items-center tw-justify-center tw-w-12 tw-h-12 tw-rounded-full tw-bg-[#1E0039]/80 tw-border tw-border-[#FF00A0]/30 tw-text-[#FF00A0] hover:tw-shadow-[0_0_15px_rgba(255,0,160,0.3)] tw-transition-all tw-cursor-pointer">
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <button onClick={() => handleScroll('right')} className="tw-hidden md:tw-flex tw-absolute tw--right-6 tw-top-1/2 tw--translate-y-1/2 tw-z-20 tw-items-center tw-justify-center tw-w-12 tw-h-12 tw-rounded-full tw-bg-[#1E0039]/80 tw-border tw-border-[#FF00A0]/30 tw-text-[#FF00A0] hover:tw-shadow-[0_0_15px_rgba(255,0,160,0.3)] tw-transition-all tw-cursor-pointer">
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>
              </>
            )}

            <div 
              ref={sliderRef}
              className="tw-flex tw-items-stretch tw-gap-6 tw-overflow-x-auto tw-snap-x tw-snap-mandatory tw-pb-4 [&::-webkit-scrollbar]:tw-hidden"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {isEditMode && (
                <div className="tw-shrink-0 tw-snap-center">
                  <ActionPlaceholder 
                    variant="video" 
                    title={`Add ${CATEGORIES.find(c=>c.key===activeCategory).label}`}
                    onClick={() => alert(`Please use the Media Manager to upload video files directly into the ${activeCategory} album.`)}
                  />
                </div>
              )}

              {videos.map((item, idx) => (
                <div 
                  key={idx} 
                  onClick={() => setPlayingVideo(item)}
                  className="tw-shrink-0 tw-snap-center tw-relative tw-w-[320px] md:tw-w-[420px] tw-h-[240px] tw-bg-[#190033] tw-rounded-xl tw-overflow-hidden tw-group tw-cursor-pointer"
                >
                  {/* Thumbnail or Video Background */}
                  <div className="tw-absolute tw-inset-0">
                    {item.thumbnail ? (
                      <img src={item.thumbnail?.startsWith('http') ? item.thumbnail : `${process.env.REACT_APP_AWS_URL}/${item.thumbnail}`} alt="Thumb" className="tw-w-full tw-h-full tw-object-cover tw-opacity-60 group-hover:tw-scale-105 tw-transition-transform tw-duration-500" />
                    ) : (
                      <video src={item.url?.startsWith('http') ? item.url : `${process.env.REACT_APP_AWS_URL}/${item.url}`} className="tw-w-full tw-h-full tw-object-cover tw-opacity-50" />
                    )}
                  </div>
                  
                  {/* Play Button Overlay */}
                  <div className="tw-absolute tw-inset-0 tw-flex tw-items-center tw-justify-center tw-bg-black/20 group-hover:tw-bg-transparent tw-transition-colors">
                     <div className="tw-w-16 tw-h-16 tw-rounded-full tw-border-2 tw-border-white/50 tw-flex tw-items-center tw-justify-center tw-backdrop-blur-sm group-hover:tw-border-white tw-transition-colors">
                        <FontAwesomeIcon icon={faPlay} className="tw-text-white tw-text-xl tw-ml-1" />
                     </div>
                  </div>

                  {/* Bottom Title Bar */}
                  <div className="tw-absolute tw-bottom-0 tw-left-0 tw-right-0 tw-h-[76px] tw-bg-gradient-to-t tw-from-[#1E0039] tw-to-transparent tw-p-6 tw-flex tw-items-center tw-gap-3">
                    <span className="tw-bg-[#FF43A7] tw-text-[#570033] tw-text-[10px] tw-font-bold tw-uppercase tw-px-2 tw-py-0.5 tw-rounded">{activeCategory}</span>
                    <span className="tw-text-white tw-font-bold tw-text-lg tw-truncate">{item.title || "Video Clip"}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* FULLSCREEN VIDEO PLAYER */}
      {playingVideo && (
        <div className="tw-fixed tw-inset-0 tw-z-[9999] tw-bg-[#0a0014]/90 tw-backdrop-blur-md tw-flex tw-items-center tw-justify-center tw-p-4 tw-cursor-pointer" onClick={() => setPlayingVideo(null)}>
          <button className="tw-absolute tw-top-6 tw-right-6 tw-w-12 tw-h-12 tw-bg-black/50 hover:tw-bg-[#FF43A7] tw-rounded-full tw-text-white tw-border-none tw-cursor-pointer tw-transition-colors tw-flex tw-items-center tw-justify-center tw-shadow-lg" onClick={(e) => { e.stopPropagation(); setPlayingVideo(null); }}>
            <FontAwesomeIcon icon={faXmark} className="tw-text-2xl" />
          </button>
          <div className="tw-w-[95vw] md:tw-w-[80vw] tw-max-w-[1200px] tw-aspect-video tw-bg-black tw-rounded-xl tw-overflow-hidden tw-shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <video 
                src={playingVideo.url?.startsWith('http') ? playingVideo.url : `${process.env.REACT_APP_AWS_URL}/${playingVideo.url}`} 
                className="tw-w-full tw-h-full tw-outline-none" 
                controls autoPlay playsInline
            />
          </div>
        </div>
      )}
    </div>
  );
}