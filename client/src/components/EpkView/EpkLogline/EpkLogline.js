import React from "react";

export default function EpkLogline({ epkInfo }) {
  const image_logline = `${process.env.REACT_APP_AWS_URL}/${epkInfo.image_logline}`;

  return (
    <div className="tw-bg-white">
      <div className="tw-flex tw-flex-col tw-py-12 tw-items-center">
        <p className="tw-text-[2rem] tw-font-semibold tw-text-[#1E0039] tw-text-center tw-px-12">
          {epkInfo.logLine_long}
        </p>
        <img src={image_logline} alt="logline" className="tw-h-auto tw-w-1/2 tw-shadow-[6px_6px_3px_#1E0039]" />
      </div>
    </div>
  );
}
