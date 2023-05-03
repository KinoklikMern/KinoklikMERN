import React from "react";
import SynopsisContent from "./SynopsisContent";

export default function EpkSynopsis({
  epkInfo,
  requestStatus,
  user,
  handleShow,
}) {
  const IMAGE_URL_PRIFIX = `${process.env.REACT_APP_AWS_URL}`;

  return (
    <div className="tw-flex tw-flex-col tw-items-center tw-gap-12 tw-bg-opacity-100 tw-text-center">
      <div className="tw-w-full tw-p-3 tw-text-white">
        <span className="tw-my-3 tw-text-[2rem] tw-font-semibold">
          Short Synopsis
        </span>
        <SynopsisContent
          name="short"
          image={`${IMAGE_URL_PRIFIX}/${epkInfo.image_synopsis}`}
          text={epkInfo.text_short}
        />
      </div>
      <div className="tw-w-full tw-p-3 tw-text-white">
        <span className="tw-text-[2rem] tw-font-semibold">
          {" "}
          Medium Synopsis{" "}
        </span>
        <SynopsisContent
          name="medium"
          image={`${IMAGE_URL_PRIFIX}/${epkInfo.image_synopsis}`}
          text={epkInfo.text_medium}
          status={requestStatus}
          handleShow={handleShow}
        />
      </div>
      <div className="tw-w-full tw-p-3 tw-text-white">
        <span className="tw-text-[2rem] tw-font-semibold"> Long Synopsis </span>
        <SynopsisContent
          name="long"
          image={`${IMAGE_URL_PRIFIX}/${epkInfo.image_synopsis}`}
          text={epkInfo.text_long}
          status={requestStatus}
          handleShow={handleShow}
        />
      </div>
    </div>
  );
}
