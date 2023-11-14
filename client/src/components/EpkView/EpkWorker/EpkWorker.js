import React from "react";
import CastCard from "../EpkCast/CastCard";

export default function EpkWorker({ epkInfo }) {
  const IMAGE_URL_PRIFIX = `${process.env.REACT_APP_AWS_URL}`;
  const workerList = epkInfo.crew.filter(
    (cast) =>
      cast.epkRole.includes("director") ||
      cast.epkRole.includes("producer") ||
      cast.epkRole.includes("cinematographer")
  );

  //for a new implementation of holding users
  const crewList = epkInfo.actors.filter(
    (actor) => !actor.role.includes("Actor")
  );

  console.log("crew list", crewList);

  return workerList.length !== 0 ? (
    <div className="tw-bg-opacity-100">
      <div className="tw-text-white">
        {workerList.map((cast, index) => (
          <CastCard
            key={cast.crewId._id}
            index={index}
            image={`${IMAGE_URL_PRIFIX}/${cast.image}`}
            text={cast.biography}
            castName={cast.crewId.name}
            epkRole={cast.epkRole}
          />
        ))}
      </div>
    </div>
  ) : (
    <div className="tw-bg-opacity-100">
      <div className="tw-text-white">
        {crewList.map((cast, index) => (
          <CastCard
            key={cast._id}
            index={index}
            image={
              cast.picture.startsWith("https")
                ? `${cast.picture}`
                : `${IMAGE_URL_PRIFIX}/${cast.picture}`
            }
            text={cast.aboutMe}
            castName={cast.firstName + " " + cast.lastName}
            epkRole={cast.role}
          />
        ))}
      </div>
    </div>
  );
}
