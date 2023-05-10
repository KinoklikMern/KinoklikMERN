import React from "react";
import AwardCard from "./AwardCard";

export default function EpkAward({ epkInfo }) {
  return (
    epkInfo.reviews.length !== 0 && (
      <div className="tw-grid tw-grid-cols-2 tw-bg-white">
        {epkInfo.reviews.map((award) => (
          <AwardCard key={award._id} awardInfo={award} />
        ))}
      </div>
    )
  );
}
