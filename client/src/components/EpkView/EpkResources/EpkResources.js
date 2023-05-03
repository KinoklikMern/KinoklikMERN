import React from "react";
import ResourceCard from "./ResourceCard";

export default function EpkResources({ epkInfo }) {
  return (
    epkInfo && (
      <div className="tw-my-3 tw-p-3 tw-bg-white">
        {epkInfo.resources.map((resource) => (
          <ResourceCard key={resource._id} resourceInfo={resource} />
        ))}
      </div>
    )
  );
}
