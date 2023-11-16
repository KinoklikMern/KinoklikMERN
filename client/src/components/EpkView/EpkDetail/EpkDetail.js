import React from "react";
import MessageIcon from "../../../images/icons/message.svg";
import emptyPoster from "../../../images/empty_banner.jpeg";

export default function EpkDetail({ epkInfo, handler }) {
  const image_detail =
    epkInfo.image_details === "" || epkInfo.image_details.startsWith("https")
      ? emptyPoster
      : `${process.env.REACT_APP_AWS_URL}/${epkInfo.image_details}`;

  const filmmaker_image = epkInfo.film_maker.picture.startsWith("https")
    ? epkInfo.film_maker.picture
    : `${process.env.REACT_APP_AWS_URL}/${epkInfo.film_maker.picture}`;
  const filmmaker_name = `${epkInfo.film_maker.firstName} ${epkInfo.film_maker.lastName}`;

  //That piece of code is added just to be able to use both "crew" and "actor" (basically new version of crew but held in 1 collection of users)
  const normalizeAvatarCrewData = (person) => {
    console.log("Person:", person);
    let imageUrl;
    if (person.picture) {
      imageUrl = person.picture.startsWith("https")
        ? person.picture
        : `${process.env.REACT_APP_AWS_URL}/${person.picture}`;
    } else if (person.image) {
      imageUrl = person.image.startsWith("https")
        ? person.image
        : `${process.env.REACT_APP_AWS_URL}/${person.image}`;
    }
    let id = person._id || person.id;

    // Assuming 'person' can be either a 'crew' object or an 'actor' object
    return {
      image: imageUrl,
      name: `${person.firstName} ${person.lastName}` || person.crewId.name,
      role: person.epkRole || person.role,
      id: id,
    };
  };

  const CrewAvatar = ({ crewInfo }) => {
    console.log("Crew Info:", crewInfo);
    const actorUrl =
      crewInfo.role === "Actor" && crewInfo.id ? `/actor/${crewInfo.id}` : "#";
    const formatChars = (chars) => {
      let noSpecialChars = chars.replace(/[^a-zA-Z0-9]/g, " "); // remove special characters
      // capitalize the first character.
      let formatedChars = noSpecialChars
        .split(" ")
        .map((char) => {
          return char[0].toUpperCase() + char.substring(1);
        })
        .join(" ");

      return formatedChars;
    };

    return (
      <a href={actorUrl} className="tw-no-underline">
        <div className="tw-text-[#1E0039]">
          <img
            className="tw-h-20 tw-w-20 tw-rounded-full"
            src={crewInfo.image}
            alt="avatar img"
          />
          <div className="tw-text-center">
            <h3 className="tw-text-lg tw-leading-7 tw-tracking-tight">
              {crewInfo.name}
            </h3>
            <p className="tw-text-sm tw-leading-6">
              {formatChars(crewInfo.role)}
            </p>
          </div>
          {/* added for actors */}
          {/* <img
          className="tw-h-20 tw-w-20 tw-rounded-full"
          src={
            crewInfo.picture.startsWith("https")
              ? crewInfo.picture
              : `${process.env.REACT_APP_AWS_URL}/${crewInfo.picture}`
          }
          alt="avatar img"
        />
        <div className="tw-text-center">
          <h3 className="tw-text-lg tw-leading-7 tw-tracking-tight">
            {crewInfo.firstName + " " + crewInfo.lastName}
          </h3>
          <p className="tw-text-sm tw-leading-6">
            {formatChars(crewInfo.role)}
          </p>
        </div> */}
          {/* added for actors */}
        </div>
      </a>
    );
  };
  return (
    <div className="tw-grid tw-grid-cols-4 tw-gap-6 tw-rounded-lg tw-bg-white tw-px-2 tw-text-[#1E0039] md:tw-pl-8">
      <div className="md:tw-m-6">
        <img
          src={image_detail}
          alt=""
          style={{ width: "310px", height: "420px" }}
          className="hidden md:block tw-invisible tw-my-4 tw-object-cover tw-shadow-[6px_6px_3px_#1E0039] md:tw-visible md:tw-h-full"
        />
      </div>
      <div className="tw-my-8 tw-grid tw-grid-cols-3 tw-gap-3">
        {epkInfo.crew.length > 0
          ? epkInfo.crew.map((person, index) => (
              <CrewAvatar
                crewInfo={normalizeAvatarCrewData(person)}
                key={`crew-${index}`}
              />
            ))
          : epkInfo.actors.map((person, index) => (
              <CrewAvatar
                crewInfo={normalizeAvatarCrewData(person)}
                key={`actor-${index}`}
              />
            ))}
      </div>
      <div className="tw-my-8 tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-6 tw-text-center tw-text-xl">
        <div>
          <p className="tw-font-light">Produced Year</p>
          <p>{epkInfo.productionYear}</p>
        </div>
        <div>
          <p className="tw-font-light">Duration</p>
          <p>{epkInfo.durationMin} Minutes</p>
        </div>
        <div>
          <p className="tw-font-light">Studio</p>
          <p>{epkInfo.productionCo}</p>
        </div>
        <div>
          <p className="tw-font-light">Distributed by</p>
          <p>{epkInfo.distributionCo}</p>
        </div>
      </div>
      <div>
        <div className="tw-mt-8 tw-flex tw-flex-col tw-gap-3">
          <div className="tw-relative tw-mx-auto">
            <span className="tw-flex tw-justify-center tw-text-[#1E0039]">
              Created By
            </span>
            <img
              className="tw-h-4/4 tw-w-4/4 tw-rounded-lg"
              src={filmmaker_image}
              alt="profile img"
            />
            <div className="tw-absolute tw-inset-x-0 tw-bottom-0 tw-mx-auto tw-flex tw-h-4 tw-justify-center tw-rounded-full tw-bg-gray-500 tw-bg-opacity-75">
              <span className="tw-self-center tw-overflow-hidden tw-text-xs tw-text-white">
                {filmmaker_name}
              </span>
            </div>
          </div>
          <div className="tw-flex">
            <img
              src={MessageIcon}
              alt=""
              onClick={() => handler("message")}
              className="tw-max-w-20 tw-max-h-20 tw-cursor-pointer tw-p-3 hover:tw-scale-110"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
