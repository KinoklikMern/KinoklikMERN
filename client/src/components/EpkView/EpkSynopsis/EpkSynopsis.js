import React from "react";
import SynopsisContent from "./SynopsisContent";

export default function EpkSynopsis({ epkInfo }) {
  const IMAGE_URL_PRIFIX = `${process.env.REACT_APP_AWS_URL}`;
  const status = null; // FIX IT

  return (
    <div className="tw-bg-opacity-100 tw-flex tw-flex-col tw-gap-12 tw-items-center tw-text-center">
      <div className="tw-text-white tw-p-3 tw-w-full">
        <span className="tw-text-[2rem] tw-font-semibold tw-my-3">Short Synopsis</span>
        <SynopsisContent
          name="short"
          image={`${IMAGE_URL_PRIFIX}/${epkInfo.image_synopsis}`}
          text={epkInfo.text_short}
        />
      </div>
      <div className="tw-text-white tw-p-3 tw-w-full">
        <span className="tw-text-[2rem] tw-font-semibold"> Medium Synopsis </span>
        <SynopsisContent
          name="medium"
          image={`${IMAGE_URL_PRIFIX}/${epkInfo.image_synopsis}`}
          text={epkInfo.text_medium}
          status={status}
        />
      </div>
      <div className="tw-text-white tw-p-3 tw-w-full">
        <span className="tw-text-[2rem] tw-font-semibold"> Long Synopsis </span>
        <SynopsisContent
          name="long"
          image={`${IMAGE_URL_PRIFIX}/${epkInfo.image_synopsis}`}
          text={epkInfo.text_long}
          status={status}
        />
      </div>
    </div>
  );
}
