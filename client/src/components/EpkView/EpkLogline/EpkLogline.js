import React from "react";
import RequestButton from "../miscellaneous/RequestButton";
export default function EpkLogline({ epkInfo, requestStatus, handler }) {
  const image_logline = `${process.env.REACT_APP_AWS_URL}/${epkInfo.image_logline}`;
  const isBlur =
    requestStatus !== "approved" && epkInfo.logLine_blur ? true : false;

  return (
    <div className="tw-bg-white tw-my-16">
      <div className="tw-relative tw-flex tw-flex-col tw-items-center tw-py-12">
        <p className="tw-px-12 tw-text-center tw-text-[2rem] tw-font-semibold tw-text-[#1E0039]">
          {epkInfo.logLine_long}
        </p>
        <div className="tw-relative">
          <div className="tw-absolute tw-top-[0] tw-left-[44%] tw-z-40 tw-my-3 tw-rounded-lg tw-border-[#712CB0] ">
            {requestStatus != "approved" && epkInfo.logLine_blur &&(
              <RequestButton status={requestStatus} handler={handler} />
            )}
          </div>
          <img
            src={image_logline}
            alt="logline"
            className={`tw-h-auto tw-w-full tw-shadow-[6px_6px_3px_#1E0039] ${
              isBlur && "tw-blur-lg"
            }`}
          />
        </div>
      </div>
    </div>
  );
}
