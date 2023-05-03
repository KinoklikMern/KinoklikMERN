import React from "react";

export default function CastCard({ index, image, text, castName, epkRole }) {
  const isReverse = index % 2 == 0;
  const cardShadowStyle = epkRole.includes("actor")?"tw-shadow-[6px_6px_3px_#1E0039]":"tw-shadow-[6px_6px_3px_#ffffff]"
  return (
    <div
      className={`tw-my-16 tw-flex tw-justify-between tw-gap-36 tw-text-inherit ${
        !isReverse && " tw-flex-row-reverse"
      }`}
    >
      <div className="tw-w-1/3 tw-flex tw-flex-col tw-items-center">
        <img src={image} style={{ width: "50%", height: "auto" }} className={cardShadowStyle}/>
        <p className="tw-text-[2rem] tw-font-semibold">{castName}</p>
      </div>
      <div className="tw-mx-12 tw-flex tw-w-1/3 tw-justify-center tw-self-center">
        <p className="tw-text-center tw-text-2xl">{text}</p>
      </div>
    </div>
  );
}
