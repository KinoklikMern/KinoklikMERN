import React from "react";
import EpkReport from "../EpkReport/EpkReport";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

export default function EpkCover({ epkInfo }) {
  const { t } = useTranslation();
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
      <div
          style={{
            backgroundImage: window.innerWidth >= 768 ? `url(${banner_url})` : "none", // Show banner only on desktop
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
          className="tw-flex tw-h-[700px] tw-flex-col tw-justify-between tw-rounded-lg tw-shadow-[inset_0_15px_10px_rgba(242,229,229,0.6)]"
      >
        <div className="tw-flex tw-h-5/6 tw-flex-col tw-justify-start  md:tw-flex-row md:tw-pb-0 ">
          <img
              src={image_detail}
              alt="Poster"
              className="tw-h-full tw-w-96 tw-object-cover"
          />
          <div className="tw-my-4 tw-flex tw-flex-col tw-items-center tw-justify-between tw-text-white md:tw-w-2/3">
            <p className="tw-rounded-xl tw-bg-black tw-bg-opacity-40 tw-px-5 tw-text-center tw-text-[1.5rem] md:tw-text-[3rem] lg:tw-text-[4rem]">
              {epkInfo.title}
            </p>
            <p className="tw-mt-4 tw-text-center md:tw-mt-0 md:tw-text-lg tw-bg-black tw-bg-opacity-40">
              {epkInfo.logLine_short}
            </p>
          </div>
        </div>

        <div className="tw-flex tw-justify-between tw-bg-black/50 tw-px-6 tw-py-1">
          {/*<div className="tw-flex tw-w-11/12 tw-items-center tw-justify-between tw-flex-wrap tw-gap-x-4">*/}
          {/*  <p className="tw-text-white md:tw-text-xl">*/}
          {/*    {t("Posted")}: <span>{formatedDate(epkInfo.createdAt)}</span>*/}
          {/*  </p>*/}
          {/*  <p className="tw-text-white md:tw-text-xl">{epkInfo.status}</p>*/}
          {/*  <p className="tw-text-white md:tw-text-xl">*/}
          {/*    {epkInfo.production_type}*/}
          {/*  </p>*/}
          {/*  <p className="tw-text-white md:tw-text-xl tw-capitalize ">*/}
          {/*    {epkInfo.genre}*/}
          {/*  </p>*/}
          {/*</div>*/}
          <div className="tw-flex tw-w-1/12 tw-cursor-pointer tw-justify-end">
            {user?.id !== epkInfo.film_maker._id ? (
                <EpkReport epkInfo={epkInfo} />
            ) : null}
          </div>
        </div>
      </div>
  );

}
