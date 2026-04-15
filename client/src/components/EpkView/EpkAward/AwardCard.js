import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

export default function AwardCard({ awardInfo, isEditMode, onEditClick }) {
  const logo_award = awardInfo.award_logo
    ? (awardInfo.award_logo.startsWith('http') || awardInfo.award_logo.startsWith('blob:') ? awardInfo.award_logo : `${process.env.REACT_APP_AWS_URL}/${awardInfo.award_logo}`)
    : null;
    
  const safeText = awardInfo.text || "";
  const displayDescription = safeText.length > 100 
    ? safeText.substring(0, 100) + "..." 
    : safeText;

  // FIX: Placed the Edit Button directly inside CardInner so they scale together. Removed unnecessary Wrapper.
  const CardInner = (
    <div className="tw-relative tw-w-[280px] md:tw-w-[340px] tw-h-[380px] md:tw-h-[440px] tw-p-[4px] tw-rounded-[24px] tw-bg-gradient-to-b tw-from-[#FF00A0] tw-to-[#1E0039] tw-shadow-lg hover:tw-scale-[1.02] hover:tw-z-10 tw-transition-all tw-cursor-pointer">
      <div className="tw-flex tw-flex-col tw-items-center tw-h-full tw-w-full tw-bg-white tw-rounded-[20px] tw-p-6 md:tw-p-8 tw-justify-between">
        
        {/* Magazine Name */}
        <h3 className="tw-text-[#1E0039] tw-text-xl md:tw-text-2xl tw-font-bold tw-text-center tw-mb-6 tw-m-0">
          {awardInfo.magazine}
        </h3>

        {/* Award/Magazine Logo */}
        {logo_award ? (
          <div className="tw-w-full tw-h-[80px] md:tw-h-[100px] tw-flex tw-items-center tw-justify-center tw-mb-6">
            <img
              src={logo_award}
              alt={`${awardInfo.magazine} logo`}
              className="tw-max-w-full tw-max-h-full tw-object-contain"
              loading="lazy"
            />
          </div>
        ) : (
          <div className="tw-w-full tw-h-[80px] md:tw-h-[100px] tw-flex tw-items-center tw-justify-center tw-mb-6 tw-bg-gray-100 tw-rounded-lg">
            <span className="tw-text-gray-400 tw-text-xs tw-font-bold tw-uppercase">No Logo</span>
          </div>
        )}

        {/* Review Text (Safely Truncated) */}
        <p className="tw-text-[#1E0039] tw-text-center tw-text-base md:tw-text-lg tw-flex-grow tw-flex tw-items-center tw-justify-center tw-italic tw-m-0">
          "{displayDescription}"
        </p>

      </div>

      {/* Edit Button Overlay (Now safely inside the scaling container) */}
      {isEditMode && (
        <button 
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); onEditClick(); }}
          className="tw-absolute tw-top-4 tw-right-4 tw-w-10 tw-h-10 tw-bg-[#FFB0CF] hover:tw-bg-[#FF43A7] tw-text-[#490080] hover:tw-text-white tw-rounded-full tw-flex tw-items-center tw-justify-center tw-shadow-[0_4px_15px_rgba(255,176,207,0.5)] tw-transition-all tw-cursor-pointer tw-border-none tw-z-20"
        >
          <FontAwesomeIcon icon={faPenToSquare} className="tw-text-sm" />
        </button>
      )}

    </div>
  );

  // Handle external linking if not editing
  if (awardInfo.reviews_url && !isEditMode) {
    const validUrl = awardInfo.reviews_url.startsWith('http') 
      ? awardInfo.reviews_url 
      : `https://${awardInfo.reviews_url}`;

    return (
      <a 
        href={validUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className="tw-no-underline tw-block"
      >
        {CardInner}
      </a>
    );
  }

  return CardInner;
}