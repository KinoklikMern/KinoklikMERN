import React from "react";
import RequestButton from "../miscellaneous/RequestButton";

export default function EpkUniqueness({ epkInfo, requestStatus, handler }) {
  const image_uniqueness =
    epkInfo.image_uniqueness &&
    `${process.env.REACT_APP_AWS_URL}/${epkInfo.image_uniqueness}`;

  // Only blur if uniqueness_blur is true
  const isBlur = epkInfo.uniqueness_blur;

  // Determine if RequestButton should be shown
  const showRequestButton =
    (requestStatus == null ||
      requestStatus === "pending" ||
      requestStatus === "refused") &&
    isBlur;

  const blurStyle = {
    filter: "blur(5px)",
  };

  return (
    epkInfo.title_uniqueness &&
    epkInfo.description_uniqueness &&
    image_uniqueness && (
      <div className="tw-h-content tw-text-[#1E0039]">
        <div className="tw-flex tw-w-full tw-justify-center">
          <span className="tw-my-3 tw-text-[2rem] tw-font-semibold tw-text-white">
            {"Uniqueness"}
          </span>
        </div>
        <div className="tw-relative tw-my-3 tw-flex tw-h-full tw-flex-col tw-gap-6 tw-bg-white tw-py-3">
          <div className="tw-flex tw-justify-center">
            <span className="tw-text-[2rem]">{epkInfo.title_uniqueness}</span>
          </div>
          <div className="tw-relative">
            {showRequestButton && requestStatus !== "approved" && (
              <div className="tw-border-1 tw-absolute tw-left-[45%] tw-top-[0] tw-z-40 tw-my-3 tw-rounded-lg tw-border-[#712CB0]">
                <RequestButton status={requestStatus} handler={handler} />
              </div>
            )}
            <div
              className={`tw-flex tw-h-full tw-flex-col tw-items-center tw-justify-between tw-px-6 tw-py-3 md:tw-flex-row ${
                isBlur && requestStatus !== "approved" ? "tw-blur" : ""
              }`}
            >
              {image_uniqueness && (
                <div className="tw-h-auto tw-w-full tw-min-w-[150px] tw-max-w-xs md:tw-w-2/3 lg:tw-w-1/2">
                  <img
                    src={image_uniqueness}
                    alt=""
                    style={{
                      width: "80%",
                      height: "auto",
                      ...(isBlur && requestStatus !== "approved"
                        ? blurStyle
                        : {}),
                    }}
                  />
                </div>
              )}
              <div className="tw-flex tw-w-full tw-flex-col tw-items-center md:tw-w-1/3">
                <p className="tw-text-center tw-text-[1.5rem]">
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
