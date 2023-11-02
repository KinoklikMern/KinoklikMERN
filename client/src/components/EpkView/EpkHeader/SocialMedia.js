import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function SocialMedia({ icon, followerNum, name, color }) {
  // const textClass = ``;

  return (
    <div className="tw-flex tw-gap-3 tw-align-bottom">
      <FontAwesomeIcon
        icon={icon}
        style={{ color: color, width: "40px", height: "40px" }}
      />
      <p style={{ color: color }} className=" tw-self-end tw-text-2xl">
        {followerNum}
      </p>
    </div>
  );
}
