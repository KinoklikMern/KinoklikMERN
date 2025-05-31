import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function SocialMedia({ icon, followerNum, name, color }) {
  // const textClass = ``;

  return (
    <div className='tw-flex tw-items-center tw-gap-1'>
      <FontAwesomeIcon
        className='tw-h-5 tw-w-5 md:tw-h-10 md:tw-w-10'
        icon={icon}
        style={{ color: color }}
      />
      <p style={{ color: color }} className='tw-text-m md:tw-text-l'>
        {followerNum}
      </p>
    </div>
  );
}
