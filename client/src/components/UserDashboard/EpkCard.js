import React from "react";
import "./UserDashboard.css";

export default function EpkCard(props) {
  const epkInfo = props.EpkInfo;
  const BANNER_IMG = `${process.env.REACT_APP_AWS_URL}/${epkInfo.banner_url}`;
  return (
    <div className="tw-flex tw-flex-row tw-items-center tw-justify-center">
      <div className="tw-m-1 tw-max-w-xs tw-flex-1 tw-rounded-lg tw-border tw-border-gray-200 tw-bg-white tw-shadow hover:tw-scale-105">
        {/* <div className="tw-m-1 tw-w-40  tw-flex-1 tw-rounded-lg tw-border tw-border-gray-200 tw-bg-white tw-shadow hover:tw-scale-105"> */}
        <a
          href={
            epkInfo.title
              ? `/epk/${epkInfo.title.replace(/ /g, "-").trim()}`
              : "/"
          }
        >
          <div className="tw-border-b tw-border-gray-200">
            <img
              className="tw-w-full tw-rounded-b-none tw-rounded-t-lg tw-object-cover"
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
