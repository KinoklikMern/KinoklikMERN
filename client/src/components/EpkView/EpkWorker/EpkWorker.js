import React from "react";
import CastCard from "../EpkCast/CastCard";

export default function EpkWorker({epkInfo}) {
  const IMAGE_URL_PRIFIX = `${process.env.REACT_APP_AWS_URL}`;
  const castList = epkInfo.crew.filter((cast) =>
    cast.epkRole.includes("actor")
  );
  return (
    <div className="tw-bg-opacity-100">
      <div className="tw-text-white">
        {castList.map((cast, index) => (
          <CastCard
            key={index}
            image={`${IMAGE_URL_PRIFIX}/${cast.image}`}
            text={cast.biography}
          />
        ))}
      </div>
    </div>
  );
}
