import React from "react";

export default function AwardCard({ awardInfo }) {
  const logo_award = `${process.env.REACT_APP_AWS_URL}/${awardInfo.award_logo}`;
  return (
    <div className="tw-m-4 tw-flex tw-flex-col tw-items-center tw-gap-4">
      <div className="tw-flex tw-flex-col tw-items-center tw-w-2/3">
        <p className="tw-text-xl tw-text-center">{awardInfo.text}</p>
        <p className="tw-text-xl tw-text-center tw-font-semibold">{awardInfo.magazine}</p>
      </div>
      <img src={logo_award} />
    </div>
  );
}
