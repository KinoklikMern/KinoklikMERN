import React from "react";
import { useTranslation } from "react-i18next";

export default function EpkSynopsis({ epkInfo, requestStatus, handler }) {
  const IMAGE_URL_PRIFIX = `${process.env.REACT_APP_AWS_URL}`;
  const { t } = useTranslation();

  const blurStyle = {
    filter: "blur(5px)",
  };

  return (
    <div className="tw-flex tw-flex-col tw-items-center tw-gap-6 tw-bg-opacity-100 tw-text-center">
      {epkInfo.text_short && (
        <>
          <span className="tw-my-3 tw-text-[2rem] tw-font-semibold tw-text-white">
            {t("Short Synopsis")}
          </span>
          <div className="tw-flex tw-w-full tw-flex-col tw-items-center tw-bg-white tw-p-3 lg:tw-flex-row">
            {epkInfo.image_synopsis && (
              <div className="tw-flex tw-max-h-[500px] tw-w-full tw-items-center tw-justify-center lg:tw-w-3/5">
                <img
                  src={`${IMAGE_URL_PRIFIX}/${epkInfo.image_synopsis}`}
                  alt="Short Synopsis"
                  className="tw-h-auto tw-max-w-full tw-object-contain tw-object-center"
                  style={{ maxHeight: "500px" }}
                />
              </div>
            )}
            <div
              className={`tw-w-full tw-px-12 tw-font-semibold tw-text-black ${
                epkInfo.image_synopsis ? "lg:tw-w-2/5" : "tw-w-full"
              }`}
            >
              {epkInfo.text_short}
            </div>
          </div>
        </>
      )}

      {epkInfo.text_medium && (
        <>
          <span className="tw-my-3 tw-text-[2rem] tw-font-semibold tw-text-white">
            {t("Medium Synopsis")}
          </span>
          <div className="tw-flex tw-w-full tw-flex-col-reverse tw-items-center tw-bg-white tw-p-3 lg:tw-flex-row">
            <div
              className={`tw-w-full tw-px-12 tw-font-semibold tw-text-black ${
                epkInfo.image_synopsis_medium ? "lg:tw-w-2/5" : "tw-w-full"
              }`}
              style={
                requestStatus !== "approved" && epkInfo.text_medium_blur
                  ? blurStyle
                  : {}
              }
            >
              {epkInfo.text_medium}
            </div>
            {epkInfo.image_synopsis_medium && (
              <div
                className="tw-flex tw-max-h-[500px] tw-w-full tw-items-center tw-justify-center lg:tw-w-3/5"
                style={
                  requestStatus !== "approved" && epkInfo.text_medium_blur
                    ? blurStyle
                    : {}
                }
              >
                <img
                  src={`${IMAGE_URL_PRIFIX}/${epkInfo.image_synopsis_medium}`}
                  alt="Medium Synopsis"
                  className="tw-h-auto tw-max-w-full tw-object-contain tw-object-center"
                  style={
                    requestStatus !== "approved"
                      ? blurStyle
                      : { maxHeight: "500px" }
                  }
                />
              </div>
            )}
          </div>
        </>
      )}

      {epkInfo.text_long && (
        <>
          <span className="tw-my-3 tw-text-[2rem] tw-font-semibold tw-text-white">
            {t("Long Synopsis")}
          </span>
          <div className="tw-flex tw-w-full tw-flex-col tw-items-center tw-bg-white tw-p-3 lg:tw-flex-row">
            {epkInfo.image_synopsis_long && (
              <div
                className="tw-flex tw-max-h-[500px] tw-w-full tw-items-center tw-justify-center lg:tw-w-3/5"
                style={
                  requestStatus !== "approved" && epkInfo.text_medium_blur
                    ? blurStyle
                    : {}
                }
              >
                <img
                  src={`${IMAGE_URL_PRIFIX}/${epkInfo.image_synopsis_long}`}
                  alt="Long Synopsis"
                  className="tw-h-auto tw-max-w-full tw-object-contain tw-object-center"
                  style={
                    requestStatus !== "approved"
                      ? blurStyle
                      : { maxHeight: "500px" }
                  }
                />
              </div>
            )}
            <div
              className={`tw-w-full tw-px-12 tw-font-semibold tw-text-black ${
                epkInfo.image_synopsis_long ? "lg:tw-w-2/5" : "tw-w-full"
              }`}
              style={
                requestStatus !== "approved" && epkInfo.text_long_blur
                  ? blurStyle
                  : {}
              }
            >
              {epkInfo.text_long}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
