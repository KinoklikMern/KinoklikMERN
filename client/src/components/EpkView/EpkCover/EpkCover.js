import React from "react";
import EpkReport from "../EpkReport/EpkReport";
import { useSelector } from "react-redux";
// import { useTranslation } from "react-i18next";

export default function EpkCover({ epkInfo }) {
  // const { t } = useTranslation();
  // const URL = "";
  const banner_url = `${process.env.REACT_APP_AWS_URL}/${epkInfo.banner_url}`;
  const image_detail =
    epkInfo.image_details === "" || epkInfo.image_details.startsWith("https")
      ? ""
      : `${process.env.REACT_APP_AWS_URL}/${epkInfo.image_details}`;

  const user = useSelector((state) => state.user);

  // const formatedDate = (timestamp) => {
  //   return new Date(timestamp).toLocaleString("en-US", {
  //     month: "short",
  //     day: "2-digit",
  //     year: "numeric",
  //   });
  // };

  return (
    <div className="tw-flex tw-w-full tw-flex-col tw-gap-4 md:tw-flex-row md:tw-gap-6 tw-mb-10">
      
      {/* LEFT: POSTER (28% width on desktop) */}
      <div className="tw-w-full md:tw-w-[28%] tw-shrink-0 tw-overflow-hidden tw-rounded-[10px] tw-shadow-lg">
        <img
          src={image_detail}
          alt="Poster"
          className="tw-h-[500px] md:tw-h-[600px] xl:tw-h-[600px] tw-w-full tw-object-cover tw-object-center"
        />
      </div>

      {/* RIGHT: BANNER (Fills remaining 72% space) */}
      <div className="tw-relative tw-flex-1 tw-overflow-hidden tw-rounded-[10px] tw-shadow-lg tw-w-full">
        <img
          src={banner_url}
          alt="Banner"
          className="tw-h-[300px] md:tw-h-[600px] xl:tw-h-[600px] tw-w-full tw-object-cover tw-object-center"
        />

        {/* DARK GRADIENT OVERLAY (Fades from dark purple/black at the bottom to transparent) */}
        <div className="tw-absolute tw-inset-0 tw-bg-gradient-to-t tw-from-[#1E0039]/90 tw-via-black/40 tw-to-transparent tw-pointer-events-none"></div>

        {/* LOGLINE ONLY (Anchored to the bottom) */}
        <div className="tw-absolute tw-bottom-0 tw-left-0 tw-right-0 tw-flex tw-flex-col tw-p-6 md:tw-p-10">
          <p className="tw-max-w-4xl tw-text-base md:tw-text-xl tw-font-medium tw-leading-relaxed tw-text-white tw-drop-shadow-md">
            {epkInfo.logLine_short}
          </p>
        </div>

        {/* REPORT BUTTON (Anchored to the top right, hidden from the EPK creator) */}
        {user?.id !== epkInfo.film_maker._id && (
          <div className="tw-absolute tw-right-4 tw-top-4 tw-z-10">
            <EpkReport epkInfo={epkInfo} />
          </div>
        )}
      </div>
    </div>
  );

}
