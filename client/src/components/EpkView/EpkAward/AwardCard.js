import React from "react";

export default function AwardCard({ awardInfo }) {
  const logo_award = awardInfo.award_logo
    ? `${process.env.REACT_APP_AWS_URL}/${awardInfo.award_logo}`
    : null;
  const safeText = awardInfo.text || "";
  const displayDescription = safeText.length > 100 
    ? safeText.substring(0, 100) + "..." 
    : safeText;

  const CardInner = (
    <div className="tw-w-[280px] md:tw-w-[340px] tw-h-full tw-p-[4px] tw-rounded-[24px] tw-bg-gradient-to-b tw-from-[#FF00A0] tw-to-[#1E0039] tw-shadow-lg hover:tw-scale-[1.02] tw-transition-transform tw-cursor-pointer">
      
      {/* INNER CARD */}
      <div className="tw-flex tw-flex-col tw-items-center tw-h-full tw-w-full tw-bg-white tw-rounded-[20px] tw-p-6 md:tw-p-8">
        
        {/* Magazine Name */}
        <h3 className="tw-text-[#1E0039] tw-text-xl md:tw-text-2xl tw-font-bold tw-text-center tw-mb-6">
          {awardInfo.magazine}
        </h3>

        {/* Award/Magazine Logo */}
        {logo_award && (
          <div className="tw-w-full tw-h-[80px] md:tw-h-[100px] tw-flex tw-items-center tw-justify-center tw-mb-6">
            <img
              src={logo_award}
              alt={`${awardInfo.magazine} logo`}
              className="tw-max-w-full tw-max-h-full tw-object-contain"
              loading="lazy"
            />
          </div>
        )}

        {/* Review Text (Safely Truncated) */}
        <p className="tw-text-[#1E0039] tw-text-center tw-text-base md:tw-text-lg tw-flex-grow tw-flex tw-items-center tw-justify-center tw-italic">
          "{displayDescription}"
        </p>

      </div>
    </div>
  );
  if (awardInfo.reviews_url) {
    const validUrl = awardInfo.reviews_url.startsWith('http') 
      ? awardInfo.reviews_url 
      : `https://${awardInfo.reviews_url}`;

    return (
      <a 
        href={validUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className="tw-no-underline tw-block tw-h-full tw-snap-center"
      >
        {CardInner}
      </a>
    );
  }
  return (
    <div className="tw-h-full tw-snap-center">
      {CardInner}
    </div>
  );
}