import React from "react";
import AwardCard from "./AwardCard";
import { useTranslation } from 'react-i18next';

export default function EpkAward({ epkInfo }) {
  const { t } = useTranslation();

  return (
    epkInfo.reviews.length !== 0 && (
      <>
        <div className="tw-text-white tw-flex tw-justify-center tw-mt-4 tw-mb-4"> {/* Added top and bottom margin */}
          <span className="tw-text-[2rem] tw-font-semibold"> 
            {t('Buzz')} {/* Title */}
          </span>
        </div>

        <div className="tw-bg-white tw-text-[#1E0039]">
          <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2">
            {epkInfo.reviews.map((award) => (
              <AwardCard key={award._id} awardInfo={award} />
            ))}
          </div>
        </div>
      </>
    )
  );
}