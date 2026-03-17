import React, { useRef, useState } from 'react';
import CastCard from '../EpkCast/CastCard';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

export default function EpkWorker({ epkInfo }) {
  const { t } = useTranslation();
  const sliderRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const IMAGE_URL_PREFIX = `${process.env.REACT_APP_AWS_URL}`;
  
  const crewList = epkInfo?.actors?.filter((actor) => !actor.role.includes('Actor')) || [];

  if (crewList.length === 0) return null;

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
    // OUTER SECTION: Dark Purple Background
    <div className="tw-py-16 tw-bg-[#1E0039] tw-w-full">
      
      {/* TITLE & DESCRIPTION */}
      <h2 className="tw-text-center tw-text-[2rem] tw-font-bold tw-text-white tw-mb-4">
        {t('Crew')}
      </h2>     
      {/* CAROUSEL AREA */}
      <div className="tw-relative tw-w-full tw-max-w-[1400px] tw-mx-auto">
        
        {/* DESKTOP ARROWS (Floating Glass Effect tuned for dark background) */}
        {crewList.length > 1 && (
          <>
            <button 
              onClick={scrollLeft}
              className="tw-hidden md:tw-flex tw-absolute tw-left-4 tw-top-1/2 tw--translate-y-1/2 tw-z-20 tw-items-center tw-justify-center tw-w-14 tw-h-14 tw-rounded-full tw-bg-white/10 tw-backdrop-blur-md tw-shadow-[0_4px_15px_rgba(0,0,0,0.3)] tw-border tw-border-white/20 tw-text-white hover:tw-bg-white/20 hover:tw-text-[#FF00A0] tw-transition-all"
            >
              <FontAwesomeIcon icon={faChevronLeft} className="tw-text-2xl" />
            </button>
            <button 
              onClick={scrollRight}
              className="tw-hidden md:tw-flex tw-absolute tw-right-4 tw-top-1/2 tw--translate-y-1/2 tw-z-20 tw-items-center tw-justify-center tw-w-14 tw-h-14 tw-rounded-full tw-bg-white/10 tw-backdrop-blur-md tw-shadow-[0_4px_15px_rgba(0,0,0,0.3)] tw-border tw-border-white/20 tw-text-white hover:tw-bg-white/20 hover:tw-text-[#FF00A0] tw-transition-all"
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
          {crewList.map((crew) => (
            <CastCard
              key={crew._id}
              image={
                crew.picture?.startsWith('https')
                  ? crew.picture
                  : `${IMAGE_URL_PREFIX}/${crew.picture}`
              }
              bio={crew.aboutMe}
              castName={`${crew.firstName} ${crew.lastName}`}
              epkRole={crew.role}
              actorUrl={`/filmmaker/${crew._id}`}
              isDarkTheme={true} 
            />
          ))}
        </div>

        {/* MOBILE PAGINATION DOTS */}
        {crewList.length > 1 && (
          <div className="tw-flex md:tw-hidden tw-justify-center tw-items-center tw-gap-3 tw-mt-4">
            {crewList.map((_, idx) => (
              <div
                key={idx}
                className={`tw-rounded-full tw-transition-all tw-duration-300 ${
                  activeIndex === idx
                    ? "tw-w-3.5 tw-h-3.5 tw-bg-gradient-to-b tw-from-[#1E0039] tw-to-[#FF00A0]"
                    : "tw-w-2 tw-h-2 tw-bg-white/40"
                }`}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}