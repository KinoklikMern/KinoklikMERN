import React from "react";
import EpkReport from "../EpkReport/EpkReport";

export default function EpkCover({ epkInfo }) {
  const URL = "";
  const banner_url = `${process.env.REACT_APP_AWS_URL}/${epkInfo.banner_url}`;
  const image_detail = `${process.env.REACT_APP_AWS_URL}/${epkInfo.image_details}`;

  const formatedDate = (timestamp) => {
    return new Date(timestamp).toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };
  return (
    <div
      style={{
        backgroundImage: `url(${banner_url})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className="tw-flex tw-h-[700px] tw-flex-col tw-justify-between tw-rounded-lg tw-shadow-[inset_0_15px_10px_rgba(242,229,229,0.6)]"
    >
      <div className="tw-mx-16 tw-flex tw-h-5/6 tw-justify-start tw-py-6 ">
        <img
          src={image_detail}
          className="tw-my-4 tw-h-full tw-shadow-[6px_6px_3px_#1E0039]"
        />
        <div className="tw-my-4 tw-flex tw-w-2/3 tw-flex-col tw-items-center tw-justify-between tw-text-white">
          <p className="tw-text-[5rem]">{epkInfo.title}</p>
          <p className="tw-text-lg ">{epkInfo.logLine_short}</p>
        </div>
      </div>

      <div className="tw-flex tw-justify-between tw-bg-white/10 tw-px-6">
        <div className="tw-flex tw-w-1/3 tw-justify-between">
          <p className="tw-text-xl tw-text-white">
            Posted: <span>{formatedDate(epkInfo.createdAt)}</span>
          </p>
          <p className="tw-text-xl tw-text-white">{epkInfo.status}</p>
          <p className="tw-text-xl tw-text-white">{epkInfo.genre}</p>
        </div>
        <div className="tw-flex tw-w-1/6 tw-justify-end">
          <EpkReport epkInfo={epkInfo} />
        </div>
      </div>
    </div>
  );
}
