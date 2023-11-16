import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function SocialMedia({ icon, followerNum, name, color }) {
  // const textClass = ``;

  return (
    <div className='tw-flex tw-items-center tw-gap-3'>
      <FontAwesomeIcon
        className='tw-h-7 tw-w-7 md:tw-h-10 md:tw-w-10'
        icon={icon}
        style={{ color: color }}
      />
      <p style={{ color: color }} className='tw-text-xl md:tw-text-2xl'>
        {followerNum}
      </p>
    </div>
  );
}
