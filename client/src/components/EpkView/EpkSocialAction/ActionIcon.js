/* eslint-disable no-unused-vars */
import React from "react";

export default function ActionIcon({ name, icon, handlers, number }) {
  const { clickHandler, hoverHandler } = handlers;
  return (
    <div
      className=" tw-relative tw-inline-flex tw-h-16 tw-w-16 tw-justify-center tw-bg-[#712CB0] hover:tw-scale-110"
      style={{ borderRadius: "20px", cursor: "pointer" }}
      onClick={() => clickHandler(name)}
    >
      <img
        src={icon}
        alt=""
        style={{ height: "60%" }}
        className="tw-overflow-visible"
      />
      <span
        className={`tw-absolute tw--right-3 tw--top-1 tw-text-sm tw-font-bold tw-text-white`}
      >
        {number}
      </span>
    </div>
  );
}
