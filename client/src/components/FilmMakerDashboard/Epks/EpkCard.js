import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDollarSign,
  faStar,
  faShareNodes,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import emptyBanner from "../../../images/empty_banner.jpeg";
// import { login } from "../../../api/user";

export default function EpkCard(props) {
  const epkInfo = props.EpkInfo;
  const BANNER_IMG =
    epkInfo.banner_url === ""
      ? emptyBanner
      : `${process.env.REACT_APP_AWS_URL}/${epkInfo.banner_url}`;

  return (
    <div className="tw-flex tw-flex-row">
      <div className="tw-m-4 tw-max-w-xs tw-flex-1 tw-rounded-lg tw-border tw-border-gray-200 tw-bg-white tw-shadow hover:tw-scale-105">
        <a href={epkInfo.title ? `/editFepk/${epkInfo._id}` : "/"}>
          <img
            className="tw-w-full tw-rounded-b-none tw-rounded-t-lg tw-object-cover"
            src={BANNER_IMG}
            alt=""
          />
          <div className="tw-flex tw-flex-row tw-justify-between tw-p-5">
            <div className="tw-relative tw-inline-flex">
              <FontAwesomeIcon
                icon={faDollarSign}
                style={{ color: "#1E0039" }}
                size="2xl"
              />
              <span className="tw-absolute tw--right-3 tw--top-3 tw-inline-flex tw-h-5 tw-w-5 tw-items-center tw-justify-center tw-rounded-full tw-border-white tw-bg-red-500 tw-text-xs tw-font-bold tw-text-white">
                {epkInfo.wishes_to_donate == null
                  ? "0"
                  : epkInfo.wishes_to_donate.length}
              </span>
            </div>
            <div className="tw-relative tw-inline-flex">
              <FontAwesomeIcon
                icon={faDollarSign}
                style={{ color: "#1E0039" }}
                size="2xl"
              />
              <span className="tw-absolute tw--right-3 tw--top-3 tw-inline-flex tw-h-5 tw-w-5 tw-items-center tw-justify-center tw-rounded-full tw-border-white tw-bg-red-500 tw-text-xs tw-font-bold tw-text-white">
                {epkInfo.wishes_to_buy == null
                  ? "0"
                  : epkInfo.wishes_to_buy.length}
              </span>
            </div>
            <div className="tw-relative tw-inline-flex">
              <FontAwesomeIcon
                icon={faStar}
                style={{ color: "#1E0039" }}
                size="2xl"
              />
              <span className="tw-absolute tw--right-3 tw--top-3 tw-inline-flex tw-h-5 tw-w-5 tw-items-center tw-justify-center tw-rounded-full tw-border-white tw-bg-red-500 tw-text-xs tw-font-bold tw-text-white">
                {epkInfo.likes == null ? "0" : epkInfo.likes.length}
              </span>
            </div>
            <div className="tw-relative tw-inline-flex">
              <FontAwesomeIcon
                icon={faPlus}
                style={{ color: "#1E0039" }}
                size="2xl"
              />
              <span className="tw-absolute tw--right-3 tw--top-3 tw-inline-flex tw-h-5 tw-w-5 tw-items-center tw-justify-center tw-rounded-full tw-border-white tw-bg-red-500 tw-text-xs tw-font-bold tw-text-white">
                {epkInfo.favourites == null ? "0" : epkInfo.favourites.length}
              </span>
            </div>
            <div className="tw-relative tw-inline-flex">
              <FontAwesomeIcon
                icon={faShareNodes}
                style={{ color: "#1E0039" }}
                size="2xl"
              />
              <span className="tw-absolute tw--right-3 tw--top-3 tw-inline-flex tw-h-5 tw-w-5 tw-items-center tw-justify-center tw-rounded-full tw-border-white tw-bg-red-500 tw-text-xs tw-font-bold tw-text-white">
                {epkInfo.sharings == null ? "0" : epkInfo.sharings.length}
              </span>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}
