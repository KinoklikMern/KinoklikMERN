import React, { useMemo, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faXmark } from "@fortawesome/free-solid-svg-icons";
import ActionPlaceholder from "../../common/ActionPlaceholder";

const CATEGORIES = [
  { key: "posters", label: "Posters" },
  { key: "stills", label: "Stills" },
  { key: "behind", label: "Behind The Scene" },
  { key: "premieres", label: "Premieres" },
];

export default function EpkPhotoGallery({ epkInfo, isEditMode, onChange }) {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState("posters");
  const sliderRef = useRef(null);

  // Modal state
  const [expandedImage, setExpandedImage] = useState(null);

  const albums = useMemo(() => {
    const pa = epkInfo?.photo_albums || {};
    const posters = [...(pa.posters || [])];
    
    // Auto-inject the current Cover Poster if it's not explicitly in the library!
    if (epkInfo?.image_details && !posters.some(p => p.image === epkInfo.image_details)) {
        posters.unshift({ image: epkInfo.image_details, blur: false });
    }

    return {
      posters,
      stills: pa.stills || [],
      behind: pa.behind || [],
      premieres: pa.premieres || [],
    };
  }, [epkInfo]);

  const images = albums[activeCategory] || [];

  const handleScroll = (dir) => {
    if (sliderRef.current) {
      const scrollAmount = 256 + 32; // card width + gap
      sliderRef.current.scrollBy({ left: dir === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="tw-bg-[#1E0039] tw-w-full tw-py-12 md:tw-pt-20 md:tw-pb-8">
      <div className="tw-w-full tw-max-w-[1440px] tw-mx-auto tw-flex tw-flex-col tw-px-4 lg:tw-px-16 tw-gap-12">
        
        {/* Header (Shared for Media Library) */}
        <div className="tw-flex tw-flex-col tw-gap-4">
          <span className="tw-text-[#FF43A7] tw-text-xs tw-uppercase tw-tracking-[2.4px] tw-font-bold tw-font-['Space_Grotesk']">
            {t("Cinematic Assets")}
          </span>
          <h1 className="tw-text-white tw-text-5xl md:tw-text-[72px] tw-font-extrabold tw-tracking-[-3.6px] tw-font-['Plus_Jakarta_Sans'] tw-leading-none tw-m-0">
            {t("Media Library")}
          </h1>
        </div>

        {/* Photo Albums Container */}
        <div className="tw-bg-[#280D41] tw-border tw-border-[#5A3F49]/40 tw-rounded-[24px] tw-p-8 lg:tw-p-12 tw-flex tw-flex-col tw-gap-12">
          
          <div className="tw-flex tw-flex-col lg:tw-flex-row lg:tw-items-end tw-gap-6 lg:tw-justify-between">
            <h2 className="tw-text-white tw-text-3xl md:tw-text-4xl tw-font-bold tw-m-0">{t("Photo Albums")}</h2>
            
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
            {(images.length > 0 || isEditMode) && (
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
                    variant="photo" 
                    title={`Add ${CATEGORIES.find(c=>c.key===activeCategory).label}`}
                    onClick={() => alert(`Please use the Media Manager to upload files directly into the ${activeCategory} album.`)}
                  />
                </div>
              )}

              {images.map((item, idx) => (
                <div 
                  key={idx} 
                  onClick={() => setExpandedImage(`${process.env.REACT_APP_AWS_URL}/${item.image}`)}
                  className="tw-shrink-0 tw-snap-center tw-relative tw-w-[256px] tw-h-[384px] tw-bg-[#280D41] tw-rounded-xl tw-overflow-hidden tw-group tw-cursor-pointer"
                >
                  <img 
                    src={item.image?.startsWith('http') ? item.image : `${process.env.REACT_APP_AWS_URL}/${item.image}`} 
                    alt={`Album ${activeCategory}`} 
                    className="tw-w-full tw-h-full tw-object-cover tw-transition-transform tw-duration-500 group-hover:tw-scale-105"
                  />
                  <div className="tw-absolute tw-inset-0 tw-bg-gradient-to-t tw-from-[#1E0039]/90 tw-via-transparent tw-to-transparent tw-opacity-0 group-hover:tw-opacity-100 tw-transition-opacity tw-duration-300 tw-flex tw-flex-col tw-justify-end tw-p-6">
                    <span className="tw-text-[#FF43A7] tw-text-xs tw-font-bold tw-uppercase tw-tracking-widest tw-mb-1">{activeCategory}</span>
                    <h4 className="tw-text-white tw-font-bold tw-text-lg tw-m-0">View Image</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* FULLSCREEN OVERLAY */}
      {expandedImage && (
        <div className="tw-fixed tw-inset-0 tw-z-[9999] tw-bg-[#0a0014]/90 tw-backdrop-blur-md tw-flex tw-items-center tw-justify-center tw-p-4 tw-cursor-pointer" onClick={() => setExpandedImage(null)}>
          <button className="tw-absolute tw-top-6 tw-right-6 tw-w-12 tw-h-12 tw-bg-black/50 hover:tw-bg-[#FF43A7] tw-rounded-full tw-text-white tw-border-none tw-cursor-pointer tw-transition-colors tw-flex tw-items-center tw-justify-center tw-shadow-lg" onClick={(e) => { e.stopPropagation(); setExpandedImage(null); }}>
            <FontAwesomeIcon icon={faXmark} className="tw-text-2xl" />
          </button>
          <img src={expandedImage} alt="Fullscreen" className="tw-max-w-full tw-max-h-full tw-object-contain tw-rounded-lg tw-shadow-2xl" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </div>
  );
}