import React, { useState, useRef } from "react";
import AwardCard from "./AwardCard";
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";

export default function EpkAward({ epkInfo }) {
  const { t } = useTranslation();
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // If there are no reviews, don't render the section
  if (!epkInfo?.reviews || epkInfo.reviews.length === 0) return null;

  // Track scroll position to update the mobile dot indicators
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const scrollPosition = scrollRef.current.scrollLeft;
    // Calculate index based on the first card's width
    const cardWidth = scrollRef.current.children[0]?.offsetWidth || 300; 
    const index = Math.round(scrollPosition / cardWidth);
    setActiveIndex(index);
  };

  // Desktop navigation arrows
  const scrollByAmount = (direction) => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.children[0]?.offsetWidth + 32; // Width + Gap
      scrollRef.current.scrollBy({ left: direction * cardWidth, behavior: 'smooth' });
    }
  };

  return (
    <section className="tw-w-full tw-my-16 tw-relative">
      {/* Title */}
      <div className="tw-text-white tw-flex tw-justify-center tw-mb-8">
        <h2 className="tw-text-xl sm:tw-text-2xl tw-font-bold tw-text-white tw-uppercase tw-tracking-wide">
          {t("The Buzz")}
        </h2>
      </div>

      {/* Main White Container */}
      <div className="tw-bg-white tw-rounded-[15px] tw-p-4 sm:tw-p-8 tw-max-w-[1400px] tw-mx-auto tw-relative tw-shadow-xl">
        
        {/* Desktop Left Arrow (Only shows if there are enough reviews to scroll) */}
        {epkInfo.reviews.length > 3 && (
          <button 
            onClick={() => scrollByAmount(-1)}
            className="tw-hidden md:tw-flex tw-absolute tw-left-2 tw-top-1/2 -tw-translate-y-1/2 tw-z-10 tw-items-center tw-justify-center tw-w-10 tw-h-10 tw-text-[#1E0039] hover:tw-text-[#FF00A0] tw-transition-colors"
          >
            <FontAwesomeIcon icon={faChevronLeft} size="2x" />
          </button>
        )}

        {/* Scrollable Container */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="tw-flex tw-flex-nowrap tw-overflow-x-auto tw-snap-x tw-snap-mandatory tw-scroll-smooth tw-gap-6 md:tw-gap-8 tw-px-2 tw-py-4 [&::-webkit-scrollbar]:tw-hidden tw-scrollbar-width-none"
        >
          {epkInfo.reviews.map((award, index) => (
            <div key={award._id || index} className="tw-shrink-0 tw-snap-center tw-h-full">
              <AwardCard awardInfo={award} />
            </div>
          ))}
        </div>

        {/* Desktop Right Arrow */}
        {epkInfo.reviews.length > 3 && (
          <button 
            onClick={() => scrollByAmount(1)}
            className="tw-hidden md:tw-flex tw-absolute tw-right-2 tw-top-1/2 -tw-translate-y-1/2 tw-z-10 tw-items-center tw-justify-center tw-w-10 tw-h-10 tw-text-[#1E0039] hover:tw-text-[#FF00A0] tw-transition-colors"
          >
            <FontAwesomeIcon icon={faChevronRight} size="2x" />
          </button>
        )}

        {/* Mobile Dot Indicators */}
        {epkInfo.reviews.length > 1 && (
          <div className="tw-flex md:tw-hidden tw-justify-center tw-items-center tw-gap-3 tw-mt-6">
            {epkInfo.reviews.map((_, i) => (
              <div
                key={i}
                className={`tw-rounded-full tw-transition-all tw-duration-300 ${
                  activeIndex === i
                    ? "tw-w-4 tw-h-4 tw-bg-gradient-to-tr tw-from-[#FF00A0] tw-to-[#1E0039]" // Active Dot
                    : "tw-w-2.5 tw-h-2.5 tw-bg-gray-400" // Inactive Dot
                }`}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}