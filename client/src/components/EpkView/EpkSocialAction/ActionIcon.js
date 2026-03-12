/* eslint-disable no-unused-vars */
import React from "react";
import { formatCompactNumber } from "../../../utils/numberFormatters";

export default function ActionIcon({ name, icon, handlers, number, title, isActive }) {
  const { clickHandler, hoverHandler } = handlers || {};
  
  const isView = name === 'views';

  const bgClass = isView 
    ? "tw-bg-transparent" 
    : isActive 
      ? "tw-bg-[#1E0039] tw-border-[1.5px] tw-border-[#E81A84]" 
      : "tw-bg-[#D9D9D9]/30 tw-border-[1.5px] tw-border-[#E81A84]";

  const hoverClass = isView ? "" : "hover:tw-scale-105 tw-cursor-pointer";
  const iconFilter = isView ? "tw-brightness-0 tw-invert" : "";

  return (
    <div className="tw-flex tw-flex-col tw-items-center tw-gap-1 md:tw-gap-2 tw-shrink-0">
      <div
        className={`tw-flex tw-h-12 tw-w-12 sm:tw-h-14 sm:tw-w-14 md:tw-h-20 md:tw-w-20 tw-items-center tw-justify-center tw-rounded-full tw-transition-transform ${bgClass} ${hoverClass}`}
        onClick={() => clickHandler && clickHandler(name)}
        title={title}
      >
        <img
          src={icon}
          alt={title}
          className={`tw-h-6 tw-w-6 sm:tw-h-7 sm:tw-w-7 md:tw-h-10 md:tw-w-10 tw-object-contain tw-overflow-visible ${iconFilter}`}
        />
      </div>
      <span className="tw-text-xs md:tw-text-sm tw-font-bold tw-text-white">
        {formatCompactNumber(number)}
      </span>
    </div>
  );
}