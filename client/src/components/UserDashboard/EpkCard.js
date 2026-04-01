import React from "react";
import { Link } from "react-router-dom";

export default function EpkCard(props) {
  const epkInfo = props.EpkInfo;
  const BANNER_IMG = `${process.env.REACT_APP_AWS_URL}/${epkInfo.banner_url}`;
  return (
    <div className="tw-flex tw-flex-row tw-items-center tw-justify-center">
      <div className="tw-m-1 tw-max-w-xs tw-flex-1 tw-rounded-lg tw-border tw-border-gray-200 tw-bg-white tw-shadow hover:tw-scale-105">
       <Link 
          to={epkInfo._id ? `/epk/${epkInfo._id}` : "/"}
          className="tw-block"
        >
          <div className="tw-w-full tw-h-40"> 
            <img
              className="tw-w-full tw-h-full tw-object-contain tw-rounded-t-lg"
              src={BANNER_IMG}
              alt={epkInfo.title || "Movie Poster"}
            />
          </div>
          <div className="tw-text-center tw-flex tw-flex-row tw-justify-between tw-p-2">
            <span className={"tw-w-1/4 tw-grow tw-text-xl  "}>
              {epkInfo.title}{" "}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}