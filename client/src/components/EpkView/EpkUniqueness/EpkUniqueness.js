import React from "react";
import RequestButton from "../miscellaneous/RequestButton";

export default function EpkUniqueness({ epkInfo, requestStatus, handler }) {
  const image_uniqueness = `${process.env.REACT_APP_AWS_URL}/${epkInfo.image_uniqueness}`;
  const isBlur =
    requestStatus == null ||
    requestStatus == "pending" ||
    requestStatus == "refused"
      ? true
      : false;
  return (
    <div className="tw-relative tw-h-[600px]">
      <div className="tw-border-1 tw-absolute tw-top-[15%] tw-left-[45%] tw-my-3 tw-rounded-lg tw-border-[#712CB0] ">
        {requestStatus != "approved" && (
          <RequestButton status={requestStatus} handler={handler} />
        )}
      </div>
      <div className="tw-my-3 tw-bg-white tw-py-3 tw-h-full tw-flex tw-flex-col tw-gap-12">
        <div className="tw-flex tw-justify-center">
          <span className="tw-text-[3rem]">{epkInfo.title_uniqueness}</span>
        </div>
        <div
          className={`tw-flex tw-items-center tw-justify-between tw-h-full tw-py-3 tw-px-6 ${
            isBlur && "tw-blur"
          }`}
        >
          <div className="tw-w-1/3">
            <img
              src={image_uniqueness}
              style={{ width: "80%", height: "auto" }}
            />
          </div>
          <div className="tw-w-1/3">
            <p className="tw-text-[1.5rem]">{epkInfo.description_uniqueness}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
