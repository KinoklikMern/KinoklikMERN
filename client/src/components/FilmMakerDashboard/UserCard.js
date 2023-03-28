import React from "react";
import avatarDefault from "../../images/avatarDefault.jpeg";

export default function UserCard(props) {
  const { picture, role, firstName, lastName, email,phone, website } = props.UserInfo;
  return (
    <div className="tw-py-2 sm:tw-py-4">
      <div className="tw-flex tw-items-center tw-border-b-2 md:tw-gap-12">
        <div className="tw-relative tw-m-4 tw-flex-shrink-0">
          <img
            className="tw-h-32 tw-w-32 tw-rounded-lg"
            src={picture ? picture : avatarDefault}
            alt="profile image"
          />
          <div className="tw-absolute tw-inset-x-0 tw-bottom-0 tw-flex tw-h-6 tw-justify-center tw-rounded-full tw-bg-gray-500 tw-bg-opacity-75">
            <span className="tw-self-center tw-text-sm tw-text-white">
              {role}
            </span>
          </div>
        </div>
        <div className="tw-m-4 tw-min-w-0 tw-gap-32 md:tw-flex">
          <div>
            <p className="tw-truncate tw-text-lg tw-font-medium tw-text-gray-900">
              {firstName} {lastName}
            </p>
            <p className="tw-truncate tw-text-lg tw-font-normal tw-text-gray-900">
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
          </div>
        </div>
      </div>
    </div>
  );
}
