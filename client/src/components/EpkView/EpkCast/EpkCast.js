import React from "react";
import CastCard from "./CastCard";

export default function EpkCast({ epkInfo }) {
  const IMAGE_URL_PRIFIX = `${process.env.REACT_APP_AWS_URL}`;
  const castList = epkInfo.crew.filter((cast) =>
    cast.epkRole.includes("actor")
  );
  return (
    <div className="tw-bg-white">
      <div className="tw-flex tw-justify-center">
        <p className="tw-text-[3rem]">Starring</p>
      </div>
      <div>
        {castList.map((cast, index)=>
          <CastCard key={index} image={`${IMAGE_URL_PRIFIX}/${cast.image}`} text={cast.biography}/>
        )}
      </div>
    </div>
  );
}
