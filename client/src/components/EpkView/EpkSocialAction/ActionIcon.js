/* eslint-disable no-unused-vars */
import React from "react";
import { formatCompactNumber } from "../../../utils/numberFormatters";

export default function ActionIcon({ name, icon, handlers, number, title, isActive }) {
  const { clickHandler, hoverHandler } = handlers || {};

  const bgClass = isActive 
      ? "tw-bg-[#1E0039] tw-border-[1.5px] tw-border-[#E81A84]" 
      : "tw-bg-[#D9D9D9]/30 tw-border-[1.5px] tw-border-[#E81A84]";

  const hoverClass = "hover:tw-scale-105 tw-cursor-pointer";

  return (
    <div className="tw-flex tw-flex-col tw-items-center tw-gap-1.5 md:tw-gap-3 tw-shrink-0">
      <div
        className={`tw-flex tw-h-11 tw-w-11 min-[375px]:tw-h-12 min-[375px]:tw-w-12 sm:tw-h-16 sm:tw-w-16 md:tw-h-24 md:tw-w-24 tw-items-center tw-justify-center tw-rounded-full tw-transition-transform ${bgClass} ${hoverClass}`}
        onClick={() => clickHandler && clickHandler(name)}
        title={title}
      >
        <img
          src={icon}
          alt={title}
          className={`tw-h-5 tw-w-5 min-[375px]:tw-h-6 min-[375px]:tw-w-6 sm:tw-h-8 sm:tw-w-8 md:tw-h-12 md:tw-w-12 tw-object-contain tw-overflow-visible`}
        />
      </div>
      <span className="tw-text-[10px] min-[375px]:tw-text-xs md:tw-text-base tw-font-bold tw-text-white">
        {formatCompactNumber(number)}
      </span>
    </div>
  );
}