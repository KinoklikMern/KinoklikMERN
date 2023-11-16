import React from "react";
import RequestButton from "../miscellaneous/RequestButton";
export default function EpkLogline({ epkInfo, requestStatus, handler }) {
  const image_logline = `${process.env.REACT_APP_AWS_URL}/${epkInfo.image_logline}`;
  const isBlur =
    requestStatus !== "approved" && epkInfo.logLine_blur ? true : false;

  return (
    epkInfo.image_logline && (
      <div className='tw-my-16 tw-rounded-lg tw-bg-white'>
        <div className='tw-relative tw-flex tw-flex-col tw-items-center tw-pt-12'>
          <p className='tw-px-12 tw-text-center tw-text-[2rem] tw-font-semibold tw-text-[#1E0039]'>
            {epkInfo.logLine_long}
          </p>
          <div className='tw-p-3'>
            <div className='tw-absolute tw-left-[44%] tw-top-[0] tw-z-40 tw-my-3 tw-border-[#712CB0] '>
              {requestStatus !== "approved" && epkInfo.logLine_blur && (
                <RequestButton status={requestStatus} handler={handler} />
              )}
            </div>
            <img
              src={image_logline}
              alt='logline'
              className={`tw-h-auto tw-w-full tw-shadow-[6px_6px_3px_#1E0039] ${
                isBlur && "tw-blur-lg"
              }`}
            />
          </div>
        </div>
      </div>
    )
  );
}
