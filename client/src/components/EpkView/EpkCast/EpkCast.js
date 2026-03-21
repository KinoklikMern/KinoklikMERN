import React, { useRef, useState } from 'react';
import CastCard from './CastCard';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

export default function EpkCast({ epkInfo }) {
  const { t } = useTranslation();
  const sliderRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const IMAGE_URL_PREFIX = `${process.env.REACT_APP_AWS_URL}`;
  const actorsList = epkInfo?.actors?.filter((actor) => actor.role.includes('Actor')) || [];

  if (actorsList.length === 0) return null;

  const handleScroll = () => {
    if (!sliderRef.current) return;
    const scrollPosition = sliderRef.current.scrollLeft;
    const cardWidth = sliderRef.current.children[0]?.offsetWidth || 280;
    const gap = 32; 
    const index = Math.round(scrollPosition / (cardWidth + gap));
    setActiveIndex(index);
  };

  const scrollLeft = () => {
    if (sliderRef.current) {
      const cardWidth = sliderRef.current.children[0]?.offsetWidth || 280;
      sliderRef.current.scrollBy({ left: -(cardWidth + 32), behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      const cardWidth = sliderRef.current.children[0]?.offsetWidth || 280;
      sliderRef.current.scrollBy({ left: (cardWidth + 32), behavior: 'smooth' });
    }
  };

  return (
    // 1. OUTER SECTION: Dark Purple Background
    <div className="tw-py-16 tw-bg-[#1E0039] tw-w-full">
      
      {/* 2. TITLE & DESCRIPTION: White text on Purple background */}
      <h2 className="tw-text-center tw-text-[2rem] tw-font-bold tw-text-white tw-mb-4">
        {t('Starring')}
      </h2>
      

      {/* 3. CAROUSEL AREA: Distinct White Band */}
      <div className="tw-bg-white tw-w-full tw-py-12">
        <div className="tw-relative tw-w-full tw-max-w-[1400px] tw-mx-auto">
          
          {/* DESKTOP ARROWS (Floating Glass Effect tuned for white background) */}
          {actorsList.length > 1 && (
            <>
              <button 
                onClick={scrollLeft}
                className="tw-hidden md:tw-flex tw-absolute tw-left-4 tw-top-1/2 tw--translate-y-1/2 tw-z-20 tw-items-center tw-justify-center tw-w-14 tw-h-14 tw-rounded-full tw-bg-white/30 tw-backdrop-blur-md tw-shadow-[0_4px_15px_rgba(0,0,0,0.1)] tw-border tw-border-gray-300 tw-text-[#1E0039] hover:tw-bg-white/80 hover:tw-text-[#FF00A0] tw-transition-all"
              >
                <FontAwesomeIcon icon={faChevronLeft} className="tw-text-2xl" />
              </button>
              <button 
                onClick={scrollRight}
                className="tw-hidden md:tw-flex tw-absolute tw-right-4 tw-top-1/2 tw--translate-y-1/2 tw-z-20 tw-items-center tw-justify-center tw-w-14 tw-h-14 tw-rounded-full tw-bg-white/30 tw-backdrop-blur-md tw-shadow-[0_4px_15px_rgba(0,0,0,0.1)] tw-border tw-border-gray-300 tw-text-[#1E0039] hover:tw-bg-white/80 hover:tw-text-[#FF00A0] tw-transition-all"
              >
                <FontAwesomeIcon icon={faChevronRight} className="tw-text-2xl" />
              </button>
            </>
          )}

          {/* SLIDER CONTAINER */}
          <div 
            ref={sliderRef}
            onScroll={handleScroll}
            className="tw-flex tw-gap-8 tw-overflow-x-auto tw-snap-x tw-snap-mandatory tw-py-8 max-md:tw-px-[calc(50%-130px)] md:tw-px-12 [&::-webkit-scrollbar]:tw-hidden"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {actorsList.map((cast) => (
              <CastCard
                key={cast._id}
                image={
                  cast.picture?.startsWith('https')
                    ? cast.picture
                    : `${IMAGE_URL_PREFIX}/${cast.picture}`
                }
                bio={cast.aboutMe}
                castName={`${cast.firstName} ${cast.lastName}`}
                epkRole={cast.role}
                actorUrl={`/actor/${cast._id}`}
                isDarkTheme={false} 
              />
            ))}
          </div>

          {/* MOBILE PAGINATION DOTS */}
          {actorsList.length > 1 && (
            <div className="tw-flex md:tw-hidden tw-justify-center tw-items-center tw-gap-3 tw-mt-4">
              {actorsList.map((_, idx) => (
                <div
                  key={idx}
                  className={`tw-h-3 tw-w-3 tw-rounded-full tw-transition-all ${
                    activeIndex === idx
                      ? "tw-bg-gradient-to-b tw-from-[#1E0039] tw-to-[#FF00A0] tw-scale-125"
                      : "tw-bg-gray-300"
                  }`}
                />
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}