import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDollarSign,
  faStar,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

export default function NotificationEpkCard(props) {
  const epkInfo = props.epkInfo;
  const BANNER_IMG = `${process.env.REACT_APP_AWS_URL}/${epkInfo.banner_url}`;
  const imageSize =
    props.imgIsSelected === true
      ? "tw-h-40 tw-w-60"
      : "tw-h-24 tw-w-40 tw-brightness-50";
  const iconSize =
    props.imgIsSelected === true
      ? "tw--top-1 tw--right-1 tw-h-5 tw-w-5 "
      : "tw--top-2 tw--right-2 tw-h-4 tw-w-4 ";

  // console.log(props.onStarClick);
  // console.log(props.onDollarClick);
  // console.log(props.onPlusClick);

  const handleStarClick = () => {
    if (props.onStarClick) {
      props.onStarClick(epkInfo.likes);
    }
  };

  const handleDollarClick = () => {
    if (props.onDollarClick) {
      props.onDollarClick(epkInfo.wishes_to_buy);
    }
  };

  const handlePlusClick = () => {
    if (props.onPlusClick) {
      props.onPlusClick(epkInfo.favourites);
    }
  };

  return (
    <>
      <div className="tw-m-12 tw-flex tw-flex-row">
        <img className={`tw-rounded-lg ${imageSize}`} src={BANNER_IMG} alt="" />
        <div className="tw-flex tw-flex-col tw-justify-between tw-p-3">
          {/* <div
            className="tw-relative tw-inline-flex tw-justify-center" */}
          <div
            className="tw-relative tw-inline-flex"
            onClick={handleStarClick}
            style={{ cursor: "pointer" }}
          >
            <FontAwesomeIcon
              icon={faStar}
              style={{
                color: "#1E0039",
                marginRight: props.imgIsSelected ? "0.5rem" : "0.25rem",
              }}
              size={props.imgIsSelected === true ? "2xl" : "sm"}
            />
            <span
              className={`tw-absolute ${iconSize} tw-inline-flex tw-items-center tw-justify-center tw-rounded-full tw-text-xs tw-font-bold tw-text-red-500`}
            >
              {epkInfo.likes == null ? "0" : epkInfo.likes.length}
            </span>
          </div>

          {/* <div className="tw-relative tw-inline-flex">
            <FontAwesomeIcon
              icon={faDollarSign}
              style={{ color: "#1E0039" }}
              size={props.imgIsSelected === true ? "2xl" : "sm"}
            />
            <span
              className={`tw-absolute ${iconSize} tw-inline-flex tw-items-center tw-justify-center tw-rounded-full tw-text-xs tw-font-bold tw-text-red-500`}
            >
              {epkInfo.wishes_to_donate == null
                ? "0"
                : epkInfo.wishes_to_donate.length}
            </span>
          </div> */}

          <div
            // className="tw-relative tw-inline-flex"
            className="tw-relative tw-inline-flex tw-justify-center"
            onClick={handleDollarClick}
            style={{ cursor: "pointer" }}
          >
            <FontAwesomeIcon
              icon={faDollarSign}
              style={{
                color: "#1E0039",
              }}
              size={props.imgIsSelected === true ? "2xl" : "sm"}
            />
            <span
              className={`tw-absolute ${iconSize} tw-inline-flex tw-items-center tw-justify-center tw-rounded-full tw-text-xs tw-font-bold tw-text-red-500`}
            >
              {epkInfo.wishes_to_buy == null
                ? "0"
                : epkInfo.wishes_to_buy.length}
            </span>
          </div>
          <div
            // className="tw-relative tw-inline-flex"
            className="tw-relative tw-inline-flex tw-justify-center"
            onClick={handlePlusClick}
            style={{ cursor: "pointer" }}
          >
            <FontAwesomeIcon
              icon={faPlus}
              style={{
                color: "#1E0039",
              }}
              size={props.imgIsSelected === true ? "2xl" : "sm"}
            />
            <span
              className={`tw-absolute ${iconSize} tw-inline-flex tw-items-center tw-justify-center tw-rounded-full tw-text-xs tw-font-bold tw-text-red-500`}
            >
              {epkInfo.favourites == null ? "0" : epkInfo.favourites.length}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
