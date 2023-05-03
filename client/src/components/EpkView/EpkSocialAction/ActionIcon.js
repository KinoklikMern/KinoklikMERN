import React from "react";

export default function ActionIcon({ name, icon, handler, number }) {
  return (
    <div className="tw-relative tw-inline-flex tw-h-16 tw-w-16 tw-justify-center tw-rounded-full tw-bg-[#712CB0] hover:tw-scale-110">
      <img
        src={icon}
        style={{ height: "60%" }}
        className="tw-overflow-visible"
      />
      <span
        className={`tw-absolute tw-top-1 tw--right-2 tw-text-sm tw-font-bold tw-text-white`}
      >
        {number}
      </span>
    </div>
  );
}
