import React from "react";
import ResourceCard from "./ResourceCard";

export default function EpkResources({ epkInfo }) {
  return (
    epkInfo.resources.length !== 0 && (
      <div className="tw-my-3 tw-bg-white tw-p-3 ">
        {epkInfo.resources.map((resource) => (
          <ResourceCard key={resource._id} resourceInfo={resource} />
        ))}
      </div>
    )
  );
}
