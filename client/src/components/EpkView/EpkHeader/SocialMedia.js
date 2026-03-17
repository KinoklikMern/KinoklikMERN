import React, { useState, useRef, useEffect } from "react";
import SocialMediaIcon from "./SocialMediaIcon";
import { useTranslation } from 'react-i18next';

export default function SocialMedia({ socials, totalReachNum, viewCount, className = "" }) {
  const { t } = useTranslation();
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const tooltipRef = useRef(null);

  // Click-outside listener to close the tooltip
  useEffect(() => {
    function handleClickOutside(event) {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
        setIsTooltipOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!socials || socials.length === 0) return null;

  return (
    <div className={`tw-w-full tw-flex tw-flex-row tw-flex-wrap tw-justify-center tw-items-center tw-gap-x-10 md:tw-gap-x-40 tw-gap-y-4 ${className}`}>
      
      {/* TOTAL AUDIENCE REACH (Clickable Toggle) */}
      <div 
        ref={tooltipRef}
        className="tw-relative tw-flex tw-flex-row tw-items-center tw-justify-center tw-gap-2 tw-cursor-pointer"
        onClick={() => setIsTooltipOpen(!isTooltipOpen)}
      >
        {/* BIGGER TEXT */}
        <span className="tw-text-base md:tw-text-xl tw-font-bold tw-text-[#C4C4C4] tw-whitespace-nowrap hover:tw-text-white tw-transition-colors">
          {t('Total Audience Reach')}:
        </span>
        
        {/* BIGGER ICON & NUMBER */}
        <SocialMediaIcon 
          platform="audience" 
          followerNum={totalReachNum} 
          containerClass="tw-flex tw-flex-row tw-items-center tw-gap-1.5"
          iconClass="tw-h-6 tw-w-6 md:tw-h-8 md:tw-w-8"
          textClass="tw-text-base md:tw-text-xl tw-font-semibold"
        />

        {/* THE TOOLTIP POPOVER */}
        {isTooltipOpen && (
          <div className="tw-absolute tw-top-[140%] tw-z-[9999] tw-flex tw-flex-wrap tw-justify-center tw-gap-x-4 tw-gap-y-6 tw-w-[300px] md:tw-w-[400px] tw-bg-[#30134A] tw-border tw-border-white/20 tw-shadow-2xl tw-rounded-xl tw-p-5 tw-animate-fade-in-up">
            
            <div className="tw-absolute tw--top-2 tw-left-1/2 tw--translate-x-1/2 tw-w-4 tw-h-4 tw-bg-[#30134A] tw-rotate-45 tw-border-t tw-border-l tw-border-white/20"></div>

            {socials.map((social, index) => (
              <SocialMediaIcon 
                key={index} 
                platform={social.platform}
                followerNum={social.followers} 
                url={social.url}
                color={social.url ? "#E81A84" : "#868585"} 
                textColor="white" 
                containerClass="tw-flex tw-flex-col tw-items-center tw-justify-center tw-w-[60px]"
                iconClass="tw-h-7 tw-w-7"
                textClass="tw-text-xs tw-font-bold tw-mt-2"
              />
            ))}
          </div>
        )}
      </div>

      {/* VIEWS STAT */}
      <div className="tw-flex tw-flex-row tw-items-center tw-justify-center tw-gap-2">
        <SocialMediaIcon 
          platform="views" 
          followerNum={viewCount} 
          containerClass="tw-flex tw-flex-row tw-items-center tw-gap-1.5"
          iconClass="tw-h-6 tw-w-6 md:tw-h-8 md:tw-w-8"
          textClass="tw-text-base md:tw-text-xl tw-font-semibold"
        />
      </div>

    </div>
  );
}