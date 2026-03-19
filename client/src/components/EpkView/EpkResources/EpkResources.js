import React, { useState, useRef } from "react";
import ResourceCard from "./ResourceCard";
import { useTranslation } from 'react-i18next';

export default function EpkResources({ epkInfo }) {
  const { t } = useTranslation();
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const scrollPosition = scrollRef.current.scrollLeft;
    const cardWidth = scrollRef.current.offsetWidth;
    const index = Math.round(scrollPosition / cardWidth);
    setActiveIndex(index);
  };

  if (!epkInfo.resources || epkInfo.resources.length === 0) return null;

  return (
    <section className="tw-w-full tw-my-16">
      <div className="tw-text-white tw-flex tw-justify-center tw-mb-8">
        <h2 className="tw-text-xl sm:tw-text-2xl tw-font-bold tw-uppercase tw-tracking-wide"> 
          {t('Resources Needed')}
        </h2>
      </div>

      <div className='tw-bg-white tw-rounded-[15px] tw-p-2 sm:tw-p-5 tw-max-w-[1400px] tw-mx-auto'>
        
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="tw-flex md:tw-flex-col tw-items-stretch tw-overflow-x-auto tw-snap-x tw-snap-mandatory tw-scroll-smooth tw-gap-4 md:tw-gap-8 tw-pb-4 [&::-webkit-scrollbar]:tw-hidden tw-scrollbar-width-none"
        >
          {epkInfo.resources.map((resource) => (
            <div key={resource._id} className="tw-w-full tw-h-auto tw-shrink-0 tw-snap-center">
              <ResourceCard
                resourceInfo={resource}
                fepkTitle={epkInfo.title}
              />
            </div>
          ))}
        </div>

        {epkInfo.resources.length > 1 && (
          <div className="tw-flex md:tw-hidden tw-justify-center tw-items-center tw-gap-2 tw-mt-2 tw-mb-4">
            {epkInfo.resources.map((_, i) => (
              <div 
                key={i} 
                className={`tw-h-1 tw-rounded-full tw-transition-all tw-duration-300 ${
                  activeIndex === i 
                    ? 'tw-w-12 tw-bg-gradient-to-r tw-from-[#FF00A0] tw-to-[#1E0039]' 
                    : 'tw-w-8 tw-bg-gray-300'
                }`} 
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}