import React from "react";
import "./UserDashboard.css";

export default function EpkCard(props) {
  const epkInfo = props.EpkInfo;
  const BANNER_IMG = `${process.env.REACT_APP_AWS_URL}/${epkInfo.banner_url}`;
  return (
    <div className="tw-flex tw-flex-row">
      <div className="image-container tw-m-4 tw-max-w-xs tw-flex-1 tw-rounded-lg tw-border tw-border-gray-200 tw-bg-white tw-shadow hover:tw-scale-105">
        <a href={`/epkview/${epkInfo.title}`}>
          <img
            className="tw-max-h-40 tw-w-full tw-rounded-b-none tw-rounded-t-lg"
            src={BANNER_IMG}
            alt=""
          />
          <div className="text-center tw-flex tw-flex-row tw-justify-between tw-p-5">
            <span className={"tw-w-1/4 tw-grow tw-text-2xl  "}>
              {epkInfo.title}{" "}
            </span>
          </div>
        </a>
      </div>
    </div>
  );
}
