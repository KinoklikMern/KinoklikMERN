import React from "react";
import avatarSample from "../../images/avatarDefault.jpeg";

export default function UserCard(props) {
  return (
    <div className="tw-py-2 sm:tw-py-4 ">
      <div className="tw-flex tw-items-center tw-space-x-4 tw-border-b-2">
        <div className="tw-flex-shrink-0">
          <img
            className="tw-h-32 tw-w-32 tw-rounded-lg"
            src={avatarSample}
            alt="Neil image"
          />
        </div>
        <div className="tw-min-w-0 tw-flex-1 tw-flex-col">
          
          <p className="tw-truncate tw-text-lg tw-font-medium tw-text-gray-900">
            Neil Sims
          </p>
          <p className="tw-truncate tw-text-base tw-text-gray-500">
            email@windster.com
          </p>
          <p className="tw-truncate tw-text-base tw-text-gray-500">
            www.test.com
          </p>
        </div>
      </div>
    </div>
  );
}
