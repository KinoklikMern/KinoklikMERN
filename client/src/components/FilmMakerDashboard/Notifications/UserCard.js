/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faMessage } from "@fortawesome/free-solid-svg-icons";

export default function UserCard(props) {
  const { role, firstName, lastName, email, phone, website, id } =
    props.UserInfo;

  // console.log(props.UserInfo);
  const picture =
    props.UserInfo.picture ===
    "https://res.cloudinary.com/dmhcnhtng/image/upload/v1643844376/avatars/default_pic_jeaybr.png"
      ? "https://res.cloudinary.com/dmhcnhtng/image/upload/v1643844376/avatars/default_pic_jeaybr.png"
      : `${process.env.REACT_APP_AWS_URL}/${props.UserInfo.picture}`;

  return (
    <div className="tw-py-2 sm:tw-py-4">
      <div className="tw-flex tw-items-center tw-border-b-2 md:tw-gap-12">
        <div className="tw-relative tw-m-4 tw-flex-shrink-0">
          <Link to={`/actor/${props.UserInfo.id}`}>
            {/* <img
              className="tw-h-32 tw-w-32 tw-rounded-lg"
              src={picture}
              alt="profile image"
            /> */}
            <div
              className="tw-h-32 tw-w-32 tw-rounded-lg tw-bg-cover tw-bg-center tw-bg-no-repeat"
              style={{ backgroundImage: `url(${picture})` }}
            ></div>
          </Link>

          <div className="tw-absolute tw-inset-x-0 tw-bottom-0 tw-flex tw-h-6 tw-justify-center tw-rounded-full tw-bg-gray-500 tw-bg-opacity-75">
            <span className="tw-self-center tw-text-sm tw-text-white">
              {role}
            </span>
          </div>
        </div>
        <div className="tw-m-4 tw-min-w-0 tw-gap-32 md:tw-flex">
          <div>
            <Link to={`/actor/${id}`}>
              <p className="tw-truncate tw-text-lg tw-font-medium tw-text-gray-900">
                {firstName} {lastName}
              </p>
            </Link>
            <p className="tw-truncate tw-text-lg tw-font-normal tw-text-gray-900">
              {website}
            </p>
          </div>

          {/* <p className="tw-truncate tw-text-lg tw-font-normal tw-text-gray-900">
              {email}
            </p>
          </div>
          <div>
            <p className="tw-truncate tw-text-lg tw-font-normal tw-text-gray-900">
              {phone}
            </p>
            <p className="tw-truncate tw-text-lg tw-font-normal tw-text-gray-900">
              {website}
            </p>
          </div> */}

          {/* Add the message icon and handle its click */}
          <div
            onClick={props.onMessageIconClick}
            style={{
              cursor: "pointer",
              width: "32px",
              height: "32px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <FontAwesomeIcon
              icon={faMessage}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
