import React from "react";
import SynopsisContent from "./SynopsisContent";
import { useTranslation } from 'react-i18next';

export default function EpkSynopsis({ epkInfo, requestStatus, handler }) {
  const IMAGE_URL_PRIFIX = `${process.env.REACT_APP_AWS_URL}`;
  const { t } = useTranslation();

  return (
    <div className="tw-flex tw-flex-col tw-items-center tw-gap-12 tw-bg-opacity-100 tw-text-center">
      {epkInfo.text_short && (
        <div className="tw-w-full tw-p-3 tw-text-white">
          <span className="tw-my-3 tw-text-[2rem] tw-font-semibold">
            {t('Short Synopsis')}
          </span>
          <SynopsisContent
            name="short"
            image={
              epkInfo.image_synopsis
                ? `${IMAGE_URL_PRIFIX}/${epkInfo.image_synopsis}`
                : ""
            }
            text={epkInfo.text_short}
          />
        </div>
      )}
      {console.log(epkInfo.image_synopsis_medium)}
      {epkInfo.text_medium && (
        <div className="tw-w-full tw-p-3 tw-text-white">
          <span className="tw-text-[2rem] tw-font-semibold">
            {" "}
            {t("Medium Synopsis")}{" "}
          </span>
          <SynopsisContent
            name="medium"
            image={
              epkInfo.image_synopsis_medium
                ? `${IMAGE_URL_PRIFIX}/${epkInfo.image_synopsis_medium}`
                : ""
            }
            text={epkInfo.text_medium}
            status={requestStatus}
            handler={handler}
          />
        </div>
      )}
      {epkInfo.text_long && (
        <div className="tw-w-full tw-p-3 tw-text-white">
          <span className="tw-text-[2rem] tw-font-semibold">
            {" "}
            {t('Long Synopsis')}{" "}
          </span>
          <SynopsisContent
            name="long"
            image={
              epkInfo.image_synopsis_long
                ? `${IMAGE_URL_PRIFIX}/${epkInfo.image_synopsis_long}`
                : ""
            }
            text={epkInfo.text_long}
            status={requestStatus}
            handler={handler}
          />
        </div>
      )}
    </div>
  );
}
