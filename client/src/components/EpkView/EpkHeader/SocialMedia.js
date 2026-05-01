import { useState, useRef, useEffect } from "react";
import SocialMediaIcon from "./SocialMediaIcon";
import { useTranslation } from 'react-i18next';

export default function SocialMedia({ socials, totalReachNum, viewCount, featured = false, split = false, coverLayout = false, className = "" }) {
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

  // ── Split layout: card left + icons right (desktop) / card → expand (mobile) ──
  if (split) {
    const desktopCard = (
      <div className="tw-flex tw-flex-col tw-items-center tw-gap-1 tw-px-8 tw-py-5 tw-rounded-2xl tw-bg-[#280D41] tw-border tw-border-[#FF43A7]/30 tw-shadow-[0_0_30px_rgba(255,67,167,0.15)]">
        <span className="tw-text-[#FF43A7] tw-text-[10px] tw-font-bold tw-uppercase tw-tracking-[0.2em]">
          {t('Total Audience Reach')}
        </span>
        <span className="tw-text-4xl md:tw-text-5xl tw-font-black tw-bg-gradient-to-r tw-from-[#FF43A7] tw-to-[#c026d3] tw-bg-clip-text tw-text-transparent tw-leading-tight">
          {totalReachNum}
        </span>
        <span className="tw-text-[#E2BDC9]/60 tw-text-xs tw-mt-0.5">across all platforms</span>
      </div>
    );

    const iconGrid = (extraClass = '') => (
      <div className={`tw-flex tw-flex-wrap tw-gap-x-5 md:tw-gap-x-7 tw-gap-y-4 tw-justify-center ${extraClass}`}>
        {socials.map((social, index) => (
          <SocialMediaIcon
            key={index}
            platform={social.platform}
            followerNum={social.followers}
            url={social.url}
            color={social.url ? "#E81A84" : "#868585"}
            textColor="white"
            containerClass="tw-flex tw-flex-col tw-items-center tw-justify-center tw-w-[50px] md:tw-w-[60px]"
            iconClass="tw-h-6 tw-w-6 md:tw-h-7 md:tw-w-7"
            textClass="tw-text-[10px] md:tw-text-xs tw-font-bold tw-mt-2"
          />
        ))}
        {!!viewCount && (
          <SocialMediaIcon
            platform="views"
            followerNum={viewCount}
            containerClass="tw-flex tw-flex-col tw-items-center tw-justify-center tw-w-[50px] md:tw-w-[60px]"
            iconClass="tw-h-6 tw-w-6 md:tw-h-7 md:tw-w-7"
            textClass="tw-text-[10px] md:tw-text-xs tw-font-bold tw-mt-2"
          />
        )}
      </div>
    );

    // Mobile: clickable card that expands the icon list — shared by all split variants
    const mobileSection = (
      <div className="tw-flex sm:tw-hidden tw-flex-col tw-items-center tw-gap-4 tw-w-full" ref={tooltipRef}>
        <div
          onClick={() => setIsTooltipOpen(!isTooltipOpen)}
          className="tw-flex tw-flex-col tw-items-center tw-gap-1 tw-px-8 tw-py-5 tw-rounded-2xl tw-bg-[#280D41] tw-border tw-border-[#FF43A7]/30 tw-shadow-[0_0_30px_rgba(255,67,167,0.15)] tw-cursor-pointer tw-transition-all tw-duration-200 hover:tw-border-[#FF43A7]/60 hover:tw-shadow-[0_0_40px_rgba(255,67,167,0.25)] tw-select-none"
        >
          <span className="tw-text-[#FF43A7] tw-text-[10px] tw-font-bold tw-uppercase tw-tracking-[0.2em]">
            {t('Total Audience Reach')}
          </span>
          <span className="tw-text-4xl tw-font-black tw-bg-gradient-to-r tw-from-[#FF43A7] tw-to-[#c026d3] tw-bg-clip-text tw-text-transparent tw-leading-tight">
            {totalReachNum}
          </span>
          <span className="tw-text-[#E2BDC9]/60 tw-text-xs tw-mt-0.5">
            across all platforms {isTooltipOpen ? '▴' : '▾'}
          </span>
        </div>

        {isTooltipOpen && (
          <div className="tw-w-full tw-rounded-xl tw-bg-[#30134A] tw-border tw-border-white/20 tw-shadow-xl tw-p-5">
            <div className="tw-grid tw-grid-cols-4 tw-gap-x-2 tw-gap-y-6 tw-justify-items-center">
              {socials.map((social, index) => (
                <SocialMediaIcon
                  key={index}
                  platform={social.platform}
                  followerNum={social.followers}
                  url={social.url}
                  color={social.url ? "#E81A84" : "#868585"}
                  textColor="white"
                  containerClass="tw-flex tw-flex-col tw-items-center tw-justify-center tw-w-[50px]"
                  iconClass="tw-h-6 tw-w-6"
                  textClass="tw-text-[10px] tw-font-bold tw-mt-2"
                />
              ))}
              {!!viewCount && (
                <SocialMediaIcon
                  platform="views"
                  followerNum={viewCount}
                  containerClass="tw-flex tw-flex-col tw-items-center tw-justify-center tw-w-[50px]"
                  iconClass="tw-h-6 tw-w-6"
                  textClass="tw-text-[10px] tw-font-bold tw-mt-2"
                />
              )}
            </div>
          </div>
        )}
      </div>
    );

    if (coverLayout) {
      return (
        <div className={`tw-w-full ${className}`}>
          {/* Desktop: aligned to EpkCover poster(343px) / banner(flex-1) columns */}
          <div className="tw-hidden sm:tw-flex tw-w-full tw-max-w-[1280px] tw-mx-auto tw-gap-8 tw-items-center tw-py-2">
            <div className="tw-w-[343px] tw-shrink-0 tw-flex tw-justify-center">
              {desktopCard}
            </div>
            <div className="tw-w-px tw-self-stretch tw-bg-[#5A3F49]/40" />
            <div className="tw-flex-1 tw-flex tw-items-center tw-justify-center">
              {iconGrid()}
            </div>
          </div>
          {mobileSection}
        </div>
      );
    }

    return (
      <div className={`tw-w-full ${className}`}>
        {/* Desktop: centered split row */}
        <div className="tw-hidden sm:tw-flex tw-items-center tw-justify-center tw-gap-6">
          {desktopCard}
          <div className="tw-w-px tw-self-stretch tw-bg-[#5A3F49]/40 tw-shrink-0" />
          {iconGrid()}
        </div>
        {mobileSection}
      </div>
    );
  }

  return (
    <div className={`tw-w-full tw-flex tw-flex-row tw-flex-wrap tw-justify-center tw-items-center tw-gap-x-10 md:tw-gap-x-40 tw-gap-y-4 ${className}`}>
      
      {/* TOTAL AUDIENCE REACH (Clickable Toggle) */}
      {featured ? (
        <div
          ref={tooltipRef}
          onClick={() => setIsTooltipOpen(!isTooltipOpen)}
          className="tw-relative tw-flex tw-flex-col tw-items-center tw-gap-1 tw-px-8 tw-py-5 tw-rounded-2xl tw-bg-[#280D41] tw-border tw-border-[#FF43A7]/30 tw-shadow-[0_0_30px_rgba(255,67,167,0.15)] tw-cursor-pointer tw-transition-all tw-duration-200 hover:tw-border-[#FF43A7]/60 hover:tw-shadow-[0_0_40px_rgba(255,67,167,0.25)] tw-select-none"
        >
          <span className="tw-text-[#FF43A7] tw-text-[10px] tw-font-bold tw-uppercase tw-tracking-[0.2em]">
            {t('Total Audience Reach')}
          </span>
          <span className="tw-text-4xl md:tw-text-5xl tw-font-black tw-bg-gradient-to-r tw-from-[#FF43A7] tw-to-[#c026d3] tw-bg-clip-text tw-text-transparent tw-leading-tight">
            {totalReachNum}
          </span>
          <span className="tw-text-[#E2BDC9]/60 tw-text-xs tw-mt-0.5">
            across all platforms {isTooltipOpen ? '▴' : '▾'}
          </span>

          {isTooltipOpen && (
            <div className="tw-absolute tw-top-[calc(100%+12px)] tw-left-1/2 tw--translate-x-1/2 tw-z-[9999] tw-w-[300px] sm:tw-w-[340px] md:tw-w-max tw-bg-[#30134A] tw-border tw-border-white/20 tw-shadow-2xl tw-rounded-xl tw-p-5 tw-animate-fade-in-up">
              <div className="tw-absolute tw--top-2 tw-left-1/2 tw--translate-x-1/2 tw-w-4 tw-h-4 tw-bg-[#30134A] tw-rotate-45 tw-border-t tw-border-l tw-border-white/20" />
              <div className="tw-grid tw-grid-cols-4 md:tw-flex md:tw-flex-row md:tw-flex-nowrap tw-gap-x-2 md:tw-gap-x-6 tw-gap-y-6 tw-justify-items-center tw-justify-center">
                {socials.map((social, index) => (
                  <SocialMediaIcon
                    key={index}
                    platform={social.platform}
                    followerNum={social.followers}
                    url={social.url}
                    color={social.url ? "#E81A84" : "#868585"}
                    textColor="white"
                    containerClass="tw-flex tw-flex-col tw-items-center tw-justify-center tw-w-[50px] md:tw-w-[60px]"
                    iconClass="tw-h-6 tw-w-6 md:tw-h-7 md:tw-w-7"
                    textClass="tw-text-[10px] md:tw-text-xs tw-font-bold tw-mt-2"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div
          ref={tooltipRef}
          className="tw-relative tw-flex tw-flex-row tw-items-center tw-justify-center tw-gap-2 tw-cursor-pointer"
          onClick={() => setIsTooltipOpen(!isTooltipOpen)}
        >
          <span className="tw-text-base md:tw-text-xl tw-font-bold tw-text-[#C4C4C4] tw-whitespace-nowrap hover:tw-text-white tw-transition-colors">
            {t('Total Audience Reach')}:
          </span>

          <SocialMediaIcon
            platform="audience"
            followerNum={totalReachNum}
            containerClass="tw-flex tw-flex-row tw-items-center tw-gap-1.5"
            iconClass="tw-h-6 tw-w-6 md:tw-h-8 md:tw-w-8"
            textClass="tw-text-base md:tw-text-xl tw-font-semibold"
          />

          {isTooltipOpen && (
            <div className="tw-absolute tw-top-[140%] tw-z-[9999] tw-w-[300px] sm:tw-w-[320px] md:tw-w-max tw-bg-[#30134A] tw-border tw-border-white/20 tw-shadow-2xl tw-rounded-xl tw-p-5 tw-animate-fade-in-up">
              <div className="tw-absolute tw--top-2 tw-left-1/2 tw--translate-x-1/2 tw-w-4 tw-h-4 tw-bg-[#30134A] tw-rotate-45 tw-border-t tw-border-l tw-border-white/20" />
              <div className="tw-grid tw-grid-cols-4 md:tw-flex md:tw-flex-row md:tw-flex-nowrap tw-gap-x-2 md:tw-gap-x-6 tw-gap-y-6 tw-justify-items-center tw-justify-center">
                {socials.map((social, index) => (
                  <SocialMediaIcon
                    key={index}
                    platform={social.platform}
                    followerNum={social.followers}
                    url={social.url}
                    color={social.url ? "#E81A84" : "#868585"}
                    textColor="white"
                    containerClass="tw-flex tw-flex-col tw-items-center tw-justify-center tw-w-[50px] md:tw-w-[60px]"
                    iconClass="tw-h-6 tw-w-6 md:tw-h-7 md:tw-w-7"
                    textClass="tw-text-[10px] md:tw-text-xs tw-font-bold tw-mt-2"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* VIEWS STAT */}
      {!featured && (
        <div className="tw-flex tw-flex-row tw-items-center tw-justify-center tw-gap-2">
          <SocialMediaIcon
            platform="views"
            followerNum={viewCount}
            containerClass="tw-flex tw-flex-row tw-items-center tw-gap-1.5"
            iconClass="tw-h-6 tw-w-6 md:tw-h-8 md:tw-w-8"
            textClass="tw-text-base md:tw-text-xl tw-font-semibold"
          />
        </div>
      )}

    </div>
  );
}