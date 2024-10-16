import React from "react";
import CastCard from "./CastCard";
import { useTranslation } from "react-i18next";

export default function EpkCast({ epkInfo }) {
  const { t } = useTranslation();

  const IMAGE_URL_PRIFIX = `${process.env.REACT_APP_AWS_URL}`;
  // const castList = epkInfo.crew.filter((cast) =>
  //   cast.epkRole.includes("actor")
  // );

  //for a new implementation of holding users
  const actorsList = epkInfo.actors.filter((actor) =>
    actor.role.includes("Actor")
  );

  console.log("Actor list", actorsList.length);

  return (
    <>
      {/* {castList.length !== 0 ? (
        <div className="tw-my-3 tw-bg-white tw-text-[#1E0039] ">
          <div className="tw-py-4">
            {castList.map((cast, index) => (
              <CastCard
                key={cast.crewId._id}
                index={index}
                image={`${IMAGE_URL_PRIFIX}/${cast.image}`}
                text={cast.biography}
                castName={cast.crewId.name}
                epkRole={cast.epkRole}
                actorUrl={`/actor/${cast.crewId._id}`}
              />
            ))}
          </div>
        </div>
      ) : null} */}

      {actorsList.length !== 0 ? (
        <>
          <div className="tw-my-3 tw-mb-8 tw-mt-12 tw-flex tw-justify-center tw-text-white">
            <span className="tw-text-[2rem] tw-font-semibold">
              {t("Starring")} {/* Title */}
            </span>
          </div>
          <div className="tw-my-3 tw-bg-white tw-text-[#1E0039]">
            <div className="tw-py-4">
              {actorsList.map((cast, index) => (
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
                  actorUrl={`/actor/${cast._id}`}
                />
              ))}
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
