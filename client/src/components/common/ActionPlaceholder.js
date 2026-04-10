import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faUserPlus, faCamera, faVideo } from "@fortawesome/free-solid-svg-icons";

export default function ActionPlaceholder({ 
  onClick, 
  title, 
  subtitle, 
  /* Options: 'press', 'resource', 'photo', 'video', 'crewCard', 'castCard', 'detailCircle', 'banner', 'poster' */
  variant = "press", 
  className = "" 
}) {

  const variants = {
    press: {
      wrapper: "tw-h-full",
      container: "tw-w-[280px] md:tw-w-[320px] tw-h-full tw-min-h-[380px] md:tw-min-h-[440px] tw-bg-[#190033]/5 tw-border-2 tw-border-dashed tw-border-[#FF43A7]/40 tw-rounded-[24px] hover:tw-bg-[#FF43A7]/5",
      iconWrapper: "tw-w-[64px] md:tw-w-[80px] tw-h-[64px] md:tw-h-[80px] tw-bg-[#FF43A7]/10 tw-rounded-full tw-transition-transform group-hover:tw-scale-110",
      iconSize: "tw-text-[18px] md:tw-text-[21px] tw-text-[#FF43A7]",
      iconType: faPlus,
      titleStyle: "tw-font-['Space_Grotesk'] tw-font-bold tw-text-[14px] md:tw-text-[16px] tw-text-[#1F0439] tw-tracking-[-0.8px] tw-uppercase tw-mt-6",
      subtitleStyle: null
    },
    resource: {
      wrapper: "tw-h-full",
      container: "tw-w-full md:tw-w-[1104px] tw-h-full tw-min-h-[200px] md:tw-min-h-[300px] tw-bg-[#280D41] tw-border-2 tw-border-dashed tw-border-[#FF43A7] tw-rounded-[24px] md:tw-rounded-[49px] hover:tw-bg-[#371E51]/50",
      iconWrapper: "tw-w-[64px] md:tw-w-[80px] tw-h-[64px] md:tw-h-[80px] tw-bg-[#FF43A7]/20 tw-shadow-[0_0_20px_rgba(255,67,167,0.2)] tw-rounded-full tw-transition-transform group-hover:tw-scale-110",
      iconSize: "tw-text-[24px] md:tw-text-[28px] tw-text-[#FF43A7]",
      iconType: faPlus,
      titleStyle: "tw-font-['Liberation_Serif'] tw-font-bold tw-text-[16px] md:tw-text-[20px] tw-text-[#FFB0CF] tw-tracking-[2px] md:tw-tracking-[4px] tw-uppercase tw-mt-6 tw-text-center tw-px-4",
      subtitleStyle: null
    },
    photo: {
      wrapper: "tw-h-full",
      container: "tw-w-full md:tw-w-[256px] tw-h-full tw-aspect-[3/4] md:tw-aspect-auto md:tw-min-h-[384px] tw-bg-[#FF43A7]/5 tw-border-2 tw-border-dashed tw-border-[#FF43A7]/40 tw-rounded-[12px] hover:tw-bg-[#FF43A7]/10",
      iconWrapper: "tw-w-[32px] md:tw-w-[48px] tw-h-[32px] md:tw-h-[48px] tw-bg-[#FF43A7] tw-rounded-full tw-transition-transform group-hover:tw-scale-110",
      iconSize: "tw-text-[12px] md:tw-text-[15px] tw-text-[#570033]",
      iconType: faPlus,
      titleStyle: "tw-font-['Space_Grotesk'] tw-font-bold tw-text-[10px] md:tw-text-[12px] tw-text-[#FF43A7] tw-tracking-[1px] md:tw-tracking-[1.2px] tw-uppercase tw-mt-3 md:tw-mt-4",
      subtitleStyle: null
    },
    video: {
      wrapper: "tw-h-full",
      container: "tw-w-full md:tw-w-[420px] tw-h-full tw-aspect-video md:tw-aspect-auto md:tw-min-h-[240px] tw-bg-[#FF43A7]/5 tw-border-2 tw-border-dashed tw-border-[#FF43A7]/40 tw-rounded-[16px] md:tw-rounded-[12px] hover:tw-bg-[#FF43A7]/10",
      iconWrapper: "tw-w-[40px] md:tw-w-[48px] tw-h-[40px] md:tw-h-[48px] tw-bg-[#FF43A7] tw-rounded-full tw-transition-transform group-hover:tw-scale-110",
      iconSize: "tw-text-[14px] md:tw-text-[15px] tw-text-[#570033]",
      iconType: faPlus,
      titleStyle: "tw-font-['Space_Grotesk'] tw-font-bold tw-text-[12px] tw-text-[#FF43A7] tw-tracking-[1.2px] tw-uppercase tw-mt-4",
      subtitleStyle: null
    },
    crewCard: {
      wrapper: "tw-p-[4px]", // The exact padding used in CastCard
      container: "tw-w-full tw-h-full tw-min-h-[400px] tw-bg-transparent tw-border-2 tw-border-dashed tw-border-[#FFB0CF]/40 tw-rounded-[38px] hover:tw-bg-white/5",
      iconWrapper: "tw-w-[56px] md:tw-w-[64px] tw-h-[56px] md:tw-h-[64px] tw-bg-[#FFB0CF]/10 tw-rounded-full tw-transition-transform group-hover:tw-scale-110",
      iconSize: "tw-text-[20px] md:tw-text-[24px] tw-text-[#FFB0CF]",
      iconType: faUserPlus,
      titleStyle: "tw-font-['Plus_Jakarta_Sans'] tw-font-bold tw-text-[16px] md:tw-text-[18px] tw-text-white tw-tracking-[1.8px] tw-uppercase tw-mt-6",
      subtitleStyle: "tw-font-['Space_Grotesk'] tw-font-normal tw-text-[10px] tw-text-[#E2BDC9] tw-tracking-[1px] tw-uppercase tw-mt-2"
    },
    castCard: {
      wrapper: "tw-p-[4px]", // The exact padding used in CastCard
      container: "tw-w-full tw-h-full tw-min-h-[400px] tw-bg-transparent tw-border-2 tw-border-dashed tw-border-[#FF43A7] tw-rounded-[38px] hover:tw-bg-[#FF43A7]/5", 
      iconWrapper: "tw-w-[56px] md:tw-w-[64px] tw-h-[56px] md:tw-h-[64px] tw-bg-[#FF43A7]/10 tw-rounded-full tw-transition-transform group-hover:tw-scale-110",
      iconSize: "tw-text-[24px] md:tw-text-[30px] tw-text-[#FF43A7]",
      iconType: faPlus,
      titleStyle: "tw-font-['Plus_Jakarta_Sans'] tw-font-bold tw-text-[16px] md:tw-text-[18px] tw-text-[#1F0439] tw-tracking-[1.8px] tw-uppercase tw-mt-6",
      subtitleStyle: "tw-font-['Space_Grotesk'] tw-font-normal tw-text-[10px] tw-text-[#1F0439]/50 tw-tracking-[1px] tw-uppercase tw-mt-2"
    },
    detailCircle: {
      wrapper: "tw-flex tw-flex-col tw-items-center",
      container: "tw-w-16 md:tw-w-20 tw-h-16 md:tw-h-20 tw-bg-transparent tw-border-2 tw-border-dashed tw-border-[#FF43A7] tw-rounded-full hover:tw-bg-[#FF43A7]/10",
      iconWrapper: "tw-flex tw-items-center tw-justify-center tw-transition-transform group-hover:tw-scale-110",
      iconSize: "tw-text-xl md:tw-text-2xl tw-text-[#FF43A7]",
      iconType: faPlus,
      titleStyle: "tw-text-center tw-max-w-[90px] md:tw-max-w-[100px] tw-text-[10px] md:tw-text-xs tw-mt-2 tw-font-bold tw-uppercase tw-tracking-wider tw-text-[#FFB0CF]",
      subtitleStyle: null
    },
    banner: {
      wrapper: "tw-h-full",
      container: "tw-w-full tw-h-full tw-min-h-[250px] tw-bg-[#F8F9FA] tw-border-2 tw-border-dashed tw-border-[#5A3F49] tw-rounded-[10px] hover:tw-bg-[#5A3F49]/10",
      iconWrapper: "tw-w-[64px] md:tw-w-[80px] tw-h-[64px] md:tw-h-[80px] tw-bg-[#2C1246] tw-rounded-full tw-transition-transform group-hover:tw-scale-110",
      iconSize: "tw-text-[24px] md:tw-text-[32px] tw-text-[#FF43A7]",
      iconType: faVideo,
      titleStyle: "tw-font-['Space_Grotesk'] tw-font-bold tw-text-[16px] md:tw-text-[20px] tw-text-[#1F0439] tw-mt-[16px] tw-uppercase",
      subtitleStyle: null
    },
    poster: {
      wrapper: "tw-h-full",
      container: "tw-w-full tw-h-full tw-min-h-[220px] tw-bg-[#F8F9FA] tw-border-2 tw-border-dashed tw-border-[#5A3F49] tw-rounded-[10px] hover:tw-bg-[#5A3F49]/10",
      iconWrapper: "tw-w-[56px] md:tw-w-[64px] tw-h-[56px] md:tw-h-[64px] tw-bg-[#2C1246] tw-rounded-full tw-transition-transform group-hover:tw-scale-110",
      iconSize: "tw-text-[20px] md:tw-text-[27px] tw-text-[#FF43A7]",
      iconType: faCamera,
      titleStyle: "tw-font-['Space_Grotesk'] tw-font-bold tw-text-[14px] md:tw-text-[18px] tw-text-[#1F0439] tw-mt-[16px] tw-uppercase tw-text-center",
      subtitleStyle: null
    }
  };

  const v = variants[variant] || variants.press;

  return (
    // FIX: The wrapper is now a standard block element, ensuring height passes perfectly down to the button
    <div className={`${className} ${v.wrapper}`}>
      <button
        onClick={onClick}
        className={`
          tw-flex tw-flex-col tw-items-center tw-justify-center
          tw-cursor-pointer tw-group tw-transition-colors tw-outline-none
          ${v.container}
        `}
      >
        <div className={`tw-flex tw-items-center tw-justify-center ${v.iconWrapper}`}>
          <FontAwesomeIcon icon={v.iconType} className={v.iconSize} />
        </div>
        
        {variant !== 'detailCircle' && title && (
          <span className={v.titleStyle}>
            {title}
          </span>
        )}
        
        {variant !== 'detailCircle' && subtitle && (
          <span className={v.subtitleStyle}>
            {subtitle}
          </span>
        )}
      </button>

      {variant === 'detailCircle' && title && (
        <span className={v.titleStyle}>
          {title}
        </span>
      )}
    </div>
  );
}