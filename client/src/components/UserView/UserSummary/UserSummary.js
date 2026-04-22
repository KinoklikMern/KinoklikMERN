/* eslint-disable no-unused-vars */
import React from "react";

export default function UserSummary({ data }) {
  const profileSummary = data?.summary;

  return (
    profileSummary && (
      <>
        <div className="tw-text-white tw-flex tw-justify-center tw-mt-12">
          <span className="tw-text-[2rem] tw-font-bold tw-tracking-tight"> 
            Summary
          </span>
        </div>
  
        <div className="tw-my-8 tw-rounded-2xl tw-bg-white tw-shadow-xl tw-overflow-hidden">
          <div className="tw-relative tw-flex tw-flex-col tw-items-center tw-py-12 tw-px-6 md:tw-px-12">
            <p className="tw-text-center tw-text-xl tw-leading-relaxed tw-font-medium tw-text-[#1E0039] tw-max-w-4xl">
              {profileSummary}
            </p>
          </div>
        </div>
      </>
    )
  );
}