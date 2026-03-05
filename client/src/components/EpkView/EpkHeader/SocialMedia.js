import React from "react";
import SocialMediaIcon from "./SocialMediaIcon";
import { useTranslation } from 'react-i18next';

export default function SocialMedia({ socials, totalReachNum, className = "" }) {
  const { t } = useTranslation();

  if (!socials || socials.length === 0) return null;

  const iconsToRender = socials; 

  return (
    <div className={`tw-w-full ${className}`}>
      {/* MOBILE VIEW: Left Panel (30%) + Right Grid (70%) */}
      <div className="tw-flex tw-w-full tw-items-center tw-justify-between md:tw-hidden">
        
        <div className="tw-w-[30%] tw-flex tw-flex-col tw-items-center tw-justify-center tw-text-center tw-border-r tw-border-white/10 tw-pr-2 tw-py-2">
          <span className="tw-text-xs sm:tw-text-sm tw-font-bold tw-text-[#C4C4C4] tw-mb-2 tw-leading-tight">
            {t('Audience Reach')}
          </span>
          <SocialMediaIcon platform="audience" followerNum={totalReachNum} />
        </div>

        <div className="tw-w-[70%] tw-grid tw-grid-cols-3 tw-gap-y-4 tw-gap-x-1 tw-justify-items-center tw-pl-2">
          {iconsToRender.map((social, index) => (
            <SocialMediaIcon 
              key={`mob-${index}`} 
              platform={social.platform}
              followerNum={social.followers} 
              url={social.url}
            />
          ))}
        </div>

      </div>

      
      {/* DESKTOP VIEW: Clean Inline Flexbox Row    */}
      <div className="tw-hidden md:tw-flex md:tw-flex-row md:tw-items-center md:tw-justify-between md:tw-w-full md:tw-gap-6">
        
        <div className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-2">
          <span className="tw-text-base lg:tw-text-xl tw-font-bold tw-text-[#C4C4C4] tw-whitespace-nowrap">
            {t('Audience Reach')}
          </span>
          <SocialMediaIcon platform="audience" followerNum={totalReachNum} />
        </div>

        <div className="tw-flex tw-flex-row tw-items-center tw-justify-around tw-flex-grow tw-gap-2 lg:tw-gap-8">
          {iconsToRender.map((social, index) => (
            <SocialMediaIcon 
              key={`desk-${index}`} 
              platform={social.platform}
              followerNum={social.followers} 
              url={social.url}
            />
          ))}
        </div>

      </div>
    </div>
  );
}