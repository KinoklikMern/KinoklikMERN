import React from "react";
import AwardCard from "./AwardCard";

export default function EpkAward({ epkInfo }) {
  return (
    epkInfo && (
      <div className="tw-bg-white tw-grid tw-grid-cols-2">
        {epkInfo.reviews.map((award) => (
          <AwardCard key={award._id} awardInfo={award} />
        ))}
      </div>
    )
  );
}
