import React from "react";
import RequestButton from "../miscellaneous/RequestButton";

export default function EpkUniqueness({ epkInfo, requestStatus, handler }) {
  const image_uniqueness =
    epkInfo.image_uniqueness &&
    `${process.env.REACT_APP_AWS_URL}/${epkInfo.image_uniqueness}`;
  const isBlur =
    requestStatus == null ||
    requestStatus == "pending" ||
    requestStatus == "refused"
      ? true
      : false;
  return (
    epkInfo.title_uniqueness &&
    epkInfo.description_uniqueness &&
    image_uniqueness && (
      <div className="tw-h-content tw-text-[#1E0039]">
        <div className="tw-relative tw-my-3 tw-flex tw-h-full tw-flex-col tw-gap-12 tw-bg-white tw-py-3">
          <div className="tw-flex tw-justify-center tw-text-center">
            <span className="tw-text-[3rem]">{epkInfo.title_uniqueness}</span>
          </div>
          <div className="tw-relative">
            <div className="tw-border-1 tw-absolute tw-z-40 tw-top-[0] tw-left-[45%] tw-my-3 tw-rounded-lg tw-border-[#712CB0] ">
              {requestStatus != "approved" && (
                <RequestButton status={requestStatus} handler={handler} />
              )}
            </div>
            <div
              className={`tw-flex tw-h-full tw-items-center tw-justify-between tw-py-3 tw-px-6 ${
                isBlur && "tw-blur"
              }
          `}
            >
              {image_uniqueness && (
                <div className="tw-w-1/3">
                  <img
                    src={image_uniqueness}
                    style={{ width: "80%", height: "auto" }}
                  />
                </div>
              )}
              <div className="tw-w-1/3">
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
