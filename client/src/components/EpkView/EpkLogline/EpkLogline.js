import React from "react";

export default function EpkLogline({ epkInfo }) {
  const image_logline = `${process.env.REACT_APP_AWS_URL}/${epkInfo.image_logline}`;

  return (
    <div className="tw-bg-white">
      <div className="tw-flex tw-flex-col tw-py-12 tw-items-center">
        <p className="tw-text-[2rem] tw-font-semibold tw-text-[#1E0039]">
          {epkInfo.logLine_long}
        </p>
        <img src={image_logline} alt="logline" className="tw-h-auto tw-w-1/2" />
      </div>
    </div>
  );
}
