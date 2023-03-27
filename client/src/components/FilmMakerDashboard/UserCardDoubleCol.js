import React from "react";
import avatarDefault from "../../images/avatarDefault.jpeg";

export default function UserCard(props) {
  const {picture, role, firstName, lastName, email, website} = props.UserInfo;
  return (
    <div className="tw-py-2 sm:tw-py-4">
      <div className="tw-flex tw-items-center md:tw-gap-16 tw-border-b-2">
        <div className="tw-flex-shrink-0 tw-m-4">
          <img
            className="tw-h-32 tw-w-32 tw-rounded-lg"
            src={picture?picture:avatarDefault}
            alt="profile image"
          />
        </div>
        <div className="tw-min-w-0 tw-gap-32 tw-m-4 md:tw-flex">
          <div>
            <p className="tw-truncate tw-text-lg tw-font-medium tw-text-gray-900">
              {role}
            </p>
            <p className="tw-truncate tw-text-lg tw-font-medium tw-text-gray-900">
              {firstName} {lastName}
            </p>
          </div>
          <div>
            <p className="tw-truncate tw-text-base tw-text-gray-500">
              {email}
            </p>
            <p className="tw-truncate tw-text-base tw-text-gray-500">
              {website}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
