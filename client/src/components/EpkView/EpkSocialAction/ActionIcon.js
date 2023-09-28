/* eslint-disable jsx-a11y/alt-text */
import React from "react";

export default function ActionIcon({ name, icon, handlers, number }) {
  const { clickHandler, hoverHandler } = handlers;
  return (
    <div
      className=" tw-relative tw-inline-flex tw-h-16 tw-w-16 tw-justify-center tw-bg-[#712CB0] hover:tw-scale-110"
      style={{ borderRadius: "20px", cursor: "pointer" }}
      onClick={() => clickHandler(name)}
      // onMouseOver={name === "share" && (() => hoverHandler("onMouseOver"))}
      // onMouseOut={name === "share" && (() => hoverHandler("onMouseOut"))}
    >
      <img
        src={icon}
        style={{ height: "60%" }}
        className="tw-overflow-visible"
      />
      <span
        className={`tw-absolute tw--top-1 tw--right-3 tw-text-sm tw-font-bold tw-text-white`}
      >
        {number}
      </span>
    </div>
  );
}
