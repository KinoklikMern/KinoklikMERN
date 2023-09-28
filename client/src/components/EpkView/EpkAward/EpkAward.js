import React from "react";
import AwardCard from "./AwardCard";

export default function EpkAward({ epkInfo }) {
  return (
    epkInfo.reviews.length !== 0 && (
      <div className="tw-bg-white tw-text-[#1E0039]">
        <p className="tw-pt-6 tw-text-center tw-text-3xl tw-font-bold ">
          BUZZ
        </p>
        <div className="tw-grid tw-grid-cols-2">
          {epkInfo.reviews.map((award) => (
            <AwardCard key={award._id} awardInfo={award} />
          ))}
        </div>
      </div>
    )
  );
}
