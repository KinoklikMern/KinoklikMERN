import React from "react";
import "./UserDashboard.css";

export default function EpkCard(props) {
  const epkInfo = props.EpkInfo;
  const BANNER_IMG = `${process.env.REACT_APP_AWS_URL}/${epkInfo.banner_url}`;
  return (
    <div className="tw-flex tw-flex-row">
      <div className="tw-m-1 tw-max-w-xs tw-flex-1 tw-rounded-lg tw-border tw-border-gray-200 tw-bg-white tw-shadow hover:tw-scale-105">
        {/* <div className="tw-m-1 tw-w-40  tw-flex-1 tw-rounded-lg tw-border tw-border-gray-200 tw-bg-white tw-shadow hover:tw-scale-105"> */}
        <a href={`/epk/${epkInfo.title}`}>
          <div className="image-container tw-rounded-lg tw-border tw-border-gray-200">
            <img
              className="tw-max-h-40 tw-w-full tw-rounded-b-none tw-rounded-t-lg tw-p-2"
              src={BANNER_IMG}
              alt=""
            />
          </div>
          <div className="text-center tw-flex tw-flex-row tw-justify-between ">
            <span className={"tw-w-1/4 tw-grow tw-text-xl  "}>
              {epkInfo.title}{" "}
            </span>
          </div>
        </a>
      </div>
    </div>
  );
}
