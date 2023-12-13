import React from "react";
import RequestButton from "../miscellaneous/RequestButton";

export default function EpkUniqueness({ epkInfo, requestStatus, handler }) {
  const image_uniqueness =
    epkInfo.image_uniqueness &&
    `${process.env.REACT_APP_AWS_URL}/${epkInfo.image_uniqueness}`;
  const isBlur =
    requestStatus == null ||
    requestStatus === "pending" ||
    requestStatus === "refused"
      ? true
      : false;
  return (
    epkInfo.title_uniqueness &&
    epkInfo.description_uniqueness &&
    image_uniqueness && (
      <div className="tw-h-content tw-text-[#1E0039] ">
        <div className="tw-w-full tw-flex tw-justify-center"> {/* Full width container with flex and justify-center */}
          <span className="tw-my-3 tw-text-[2rem] tw-font-semibold tw-text-white"> 
            {('Uniqueness')} {/* Title */}
          </span>
        </div>
        <div className="tw-relative tw-my-3 tw-flex tw-h-full tw-flex-col tw-gap-6 tw-bg-white tw-py-3">
          <div className="tw-flex tw-justify-center">
            <span className="tw-text-[2rem]">{epkInfo.title_uniqueness}</span>
          </div>
          <div className="tw-relative">
            <div className="tw-border-1 tw-absolute tw-left-[45%] tw-top-[0] tw-z-40 tw-my-3 tw-rounded-lg tw-border-[#712CB0] ">
              {requestStatus !== "approved" && (
                <RequestButton status={requestStatus} handler={handler} />
              )}
            </div>
            <div
               className={`tw-flex tw-flex-col md:tw-flex-row tw-h-full tw-items-center tw-justify-between tw-px-6 tw-py-3 ${
                isBlur && "tw-blur"
              }
          `}
            >
              {image_uniqueness && (
                <div className="tw-w-full md:tw-w-2/3 lg:tw-w-1/2 tw-max-w-xs tw-min-w-[150px] tw-h-auto">
                  <img
                    src={image_uniqueness}
                    alt=""
                    style={{ width: "80%", height: "auto" }}
                  />
                </div>
              )}
              <div className="tw-w-full md:tw-w-1/3 tw-flex tw-flex-col tw-items-center">
                <p className="tw-text-[1.5rem] tw-text-center">
                  {epkInfo.description_uniqueness}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
