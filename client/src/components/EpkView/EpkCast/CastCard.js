import React from "react";

export default function CastCard({ image, text }) {
  return (
    <div className="tw-flex tw-justify-between tw-text-inherit">
      <div>
        <img src={image} />
      </div>
      <div className="tw-flex tw-justify-center">
        <p>{text}</p>
      </div>
    </div>
  );
}
