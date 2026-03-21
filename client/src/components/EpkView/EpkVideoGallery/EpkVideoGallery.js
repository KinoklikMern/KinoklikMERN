/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faPlay } from "@fortawesome/free-solid-svg-icons";

const CATEGORIES = [
  { key: "trailers", label: "Trailers" },
  { key: "behind", label: "Behind The Scene" },
  { key: "interviews", label: "Interviews" },
  { key: "premieres", label: "Premieres" },
];

export default function EpkTrailer({ epkInfo }) {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState("trailers");

  // Modal state
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Normalize backend data & handle old database backward compatibility
  const albums = useMemo(() => {
    const vg = epkInfo?.video_gallery || {};
    let fallbackTrailers = vg.trailers || [];

    // FAILSAFE: If no new video gallery exists, but old trailer_url exists, fake an array
    if (fallbackTrailers.length === 0 && epkInfo?.trailer_url) {
        fallbackTrailers = [{
            url: epkInfo.trailer_url,
            title: "Official Trailer",
            thumbnail: epkInfo.banner_url || (epkInfo.banners?.length > 0 ? epkInfo.banners[0].url : "")
        }];
    }

    return {
      trailers: fallbackTrailers,
      behind: vg.behind || [],
      interviews: vg.interviews || [],
      premieres: vg.premieres || [],
    };
  }, [epkInfo]);

  const videos = albums[activeCategory];
  const enableScroll = videos.length > 2;

  const openModal = (index) => {
    setSelectedIndex(index);
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  const prev = (e) => {
    if(e) e.stopPropagation();
    setSelectedIndex((i) => (i - 1 + videos.length) % videos.length);
  };

  const next = (e) => {
    if(e) e.stopPropagation();
    setSelectedIndex((i) => (i + 1) % videos.length);
  };

  // Keyboard support (ESC, arrows) + lock body scroll
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };

    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, videos.length]);

  // Close modal if category changes
  useEffect(() => {
    setIsOpen(false);
  }, [activeCategory]);

  const selected = videos && videos.length > 0 ? videos[selectedIndex] : null;

  return (
    <section className="tw-my-16 tw-block tw-w-full">
      {/* Title */}
      <h2 className="tw-mb-6 tw-text-center tw-text-xl tw-font-bold tw-text-white sm:tw-text-2xl tw-uppercase tracking-wide">
        VIDEO GALLERY
      </h2>

      <div className="tw-rounded-[15px] tw-bg-white tw-p-2 sm:tw-p-5 tw-max-w-[1400px] tw-mx-auto">
        <div className="tw-rounded-[15px] tw-bg-gradient-to-b tw-from-[#1E0039] tw-to-[#712CB0] tw-py-4 tw-px-4 md:tw-py-8 md:tw-px-8 ">
          
          {/* Category Tabs */}
          <ul
            className="tw-mx-auto tw-flex tw-justify-between tw-rounded-[10px] md:tw-rounded-[25px] tw-border-[2px]
              tw-border-[#1E0039] tw-bg-[#ECF0F1] tw-p-[1px] md:tw-p-[2px] sm:tw-w-3/4 sm:tw-mt-8"
          >
            {CATEGORIES.map((cat) => (
              <li
                key={cat.key}
                className="tw-w-1/4 tw-h-full"
              >
                <button
                  type="button"
                  onClick={() => setActiveCategory(cat.key)}
                  className={`tw-w-full tw-h-full tw-rounded-[8px] md:tw-rounded-[23px] sm:tw-text-xl tw-text-[8.5px] md:tw-font-bold tw-p-[6px] md:tw-py-2 tw-transition-colors ${
                    activeCategory === cat.key
                      ? "tw-bg-gradient-to-r tw-from-[#FF00A0] tw-to-[#1E0039] tw-text-white"
                      : "tw-text-[#1E0039] hover:tw-bg-gray-200"
                  }`}
                >
                  {t(`${cat.label}`)}
                </button>
              </li>
            ))}
          </ul>

          {/* Video Gallery Wrapper */}
          <div className="tw-overflow-visible tw-mt-10 md:tw-mt-16">
            {videos.length === 0 ? (
              <div className="tw-flex tw-h-[300px] tw-items-center tw-justify-center">
                <p className="tw-text-sm tw-text-white/70">
                  No videos available in this category yet.
                </p>
              </div>
            ) : (
              <div
                className={`
                  ${enableScroll ? "custom-scrollbar tw-overflow-y-auto tw-pr-2" : ""}
                  ${enableScroll ? "tw-h-[clamp(300px,60vh,800px)] tw-min-h-[300px]" : ""}
                `}
              >
                {/* GRID: 1 column on mobile, 2 columns on desktop to fit 16:9 ratios */}
                <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-8 md:tw-gap-12 md:tw-pt-4 tw-pt-2 tw-max-w-[1000px] tw-mx-auto">
                  {videos.map((vid, index) => (
                    <div key={index} className="tw-flex tw-flex-col tw-items-center">
                        <button
                        type="button"
                        onClick={() => openModal(index)}
                        className="tw-relative tw-w-full tw-aspect-video tw-overflow-hidden tw-rounded-[16px] md:tw-rounded-[24px] tw-shadow-[0_8px_30px_rgba(0,0,0,0.5)] tw-group tw-transition-transform hover:tw-scale-[1.03]"
                        >
                            {/* Video Thumbnail */}
                            <img
                                src={vid.thumbnail ? `${process.env.REACT_APP_AWS_URL}/${vid.thumbnail}` : 'https://via.placeholder.com/800x450/1E0039/FFFFFF?text=Video'}
                                alt={vid.title || "Video thumbnail"}
                                className="tw-h-full tw-w-full tw-object-cover"
                                loading="lazy"
                            />
                            
                            {/* Play Button Overlay */}
                            <div className="tw-absolute tw-inset-0 tw-bg-black/30 group-hover:tw-bg-black/10 tw-transition-colors tw-flex tw-items-center tw-justify-center">
                                <div className="tw-w-16 tw-h-16 md:tw-w-20 md:tw-h-20 tw-rounded-full tw-border-[3px] tw-border-white tw-flex tw-items-center tw-justify-center tw-bg-white/20 tw-backdrop-blur-sm group-hover:tw-scale-110 tw-transition-transform">
                                    <FontAwesomeIcon icon={faPlay} className="tw-text-white tw-text-2xl md:tw-text-3xl tw-ml-1.5" />
                                </div>
                            </div>
                        </button>
                        
                        {/* Video Title */}
                        <p className="tw-mt-4 tw-text-white tw-font-medium tw-text-sm md:tw-text-base tw-text-center">
                            {vid.title || "Untitled Video"}
                        </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- VIDEO PLAYER MODAL --- */}
      {isOpen && selected && (
        <div 
          className="tw-fixed tw-inset-0 tw-z-[100] tw-flex tw-items-center tw-justify-center tw-bg-black/95 tw-p-4" 
          onClick={closeModal}
        >
          <button 
            className="tw-absolute tw-top-4 tw-right-6 tw-text-white tw-text-5xl hover:tw-text-[#FF00A0] tw-transition-colors tw-z-[101]"
            onClick={closeModal}
            aria-label="Close modal"
          >
            &times;
          </button>

          {videos.length > 1 && (
            <button
              type="button"
              onClick={prev}
              className="tw-absolute tw-left-2 md:tw-left-8 tw-top-1/2 -tw-translate-y-1/2 tw-z-[101] tw-flex tw-items-center tw-justify-center tw-w-10 tw-h-10 md:tw-w-14 md:tw-h-14 tw-rounded-full tw-bg-white/10 tw-backdrop-blur-md tw-border tw-border-white/20 tw-text-white hover:tw-bg-white/30 hover:tw-text-[#FF00A0] tw-transition-all"
            >
              <FontAwesomeIcon icon={faChevronLeft} className="tw-text-lg md:tw-text-2xl" />
            </button>
          )}

          {/* HTML5 VIDEO PLAYER */}
          <div className="tw-w-[95vw] md:tw-w-[80vw] tw-max-w-[1200px] tw-aspect-video tw-bg-black tw-rounded-xl tw-overflow-hidden tw-shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <video 
                key={selected.url} 
                className="tw-w-full tw-h-full tw-outline-none" 
                controls 
                autoPlay 
                playsInline
                poster={selected.thumbnail ? `${process.env.REACT_APP_AWS_URL}/${selected.thumbnail}` : ''}
            >
                <source src={`${process.env.REACT_APP_AWS_URL}/${selected.url}`} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
          </div>

          {videos.length > 1 && (
            <button
              type="button"
              onClick={next}
              className="tw-absolute tw-right-2 md:tw-right-8 tw-top-1/2 -tw-translate-y-1/2 tw-z-[101] tw-flex tw-items-center tw-justify-center tw-w-10 tw-h-10 md:tw-w-14 md:tw-h-14 tw-rounded-full tw-bg-white/10 tw-backdrop-blur-md tw-border tw-border-white/20 tw-text-white hover:tw-bg-white/30 hover:tw-text-[#FF00A0] tw-transition-all"
            >
              <FontAwesomeIcon icon={faChevronRight} className="tw-text-lg md:tw-text-2xl" />
            </button>
          )}
        </div>
      )}
    </section>
  );
}