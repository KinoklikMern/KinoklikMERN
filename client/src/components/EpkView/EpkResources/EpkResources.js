import React from "react";
import ResourceCard from "./ResourceCard";

export default function EpkResources({ epkInfo }) {
  return (
    epkInfo.resources.length !== 0 && (
      <div className='tw-my-3 tw-rounded-lg tw-bg-white tw-p-3'>
        <p className='tw-text-center tw-text-3xl tw-font-bold tw-text-[#1E0039]'>
          RESOURCES NEEDED
        </p>
        {epkInfo.resources.map((resource) => (
          <ResourceCard key={resource._id} resourceInfo={resource} />
        ))}
      </div>
    )
  );
}
