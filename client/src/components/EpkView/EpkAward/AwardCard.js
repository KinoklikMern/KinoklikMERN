import React from "react";
import emptyBanner from "../../../images/empty_banner.jpeg";

export default function AwardCard({ awardInfo }) {
  const logo_award = awardInfo.award_logo
    ? `${process.env.REACT_APP_AWS_URL}/${awardInfo.award_logo}`
    : emptyBanner;
    return (
      <div className="tw-m-4 tw-flex tw-flex-col tw-items-center tw-gap-4">
        <div className="tw-flex tw-w-2/3 tw-flex-col tw-items-center tw-h-[specific-height]"> {/* Adjust specific-height as needed */}
          <p className="tw-text-center tw-text-xl tw-max-w-full tw-break-words">{awardInfo.text}</p>
          <p className="tw-text-center tw-text-xl tw-font-semibold">
            {awardInfo.magazine}
          </p>
        </div>
        <div className="tw-flex tw-justify-center tw-items-end tw-w-full">
          <img src={logo_award} alt="" className="tw-h-[specific-logo-height]" /> {/* Adjust specific-logo-height as needed */}
        </div>
      </div>
    );
  }