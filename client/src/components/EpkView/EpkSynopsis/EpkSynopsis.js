import React from "react";
import SynopsisContent from "./SynopsisContent";

export default function EpkSynopsis({ epkInfo }) {
  const IMAGE_URL_PRIFIX = `${process.env.REACT_APP_AWS_URL}`;

  return (
    <div className="tw-bg-opacity-100">
      <div className="tw-text-white">
        <span>Short Synopsis</span>
        <SynopsisContent
          name="short"
          image={`${IMAGE_URL_PRIFIX}/${epkInfo.image_synopsis}`}
          text={epkInfo.text_short}
        />
      </div>
      <div className="tw-text-white">
        <span> Medium Synopsis </span>
        <SynopsisContent
          name="medium"
          image={`${IMAGE_URL_PRIFIX}/${epkInfo.image_synopsis}`}
          text={epkInfo.text_short}
        />
      </div>
      <div className="tw-text-white">
        <span> Long Synopsis </span>
        <SynopsisContent
          name="long"
          image={`${IMAGE_URL_PRIFIX}/${epkInfo.image_synopsis}`}
          text={epkInfo.text_short}
        />
      </div>
    </div>
  );
}
