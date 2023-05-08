import React from "react";

export default function EpkDetail({ epkInfo }) {
  const image_detail = `${process.env.REACT_APP_AWS_URL}/${epkInfo.image_details}`;
  const directorList = epkInfo.crew.filter((c) => c.epkRole === "director");
  const producerList = epkInfo.crew.filter((c) => c.epkRole === "producer");
  const cinematographerList = epkInfo.crew.filter(
    (c) => c.epkRole === "cinematographer"
  );
  const writerList = epkInfo.crew.filter((c) => c.epkRole === "writer");
  const editorList = epkInfo.crew.filter((c) => c.epkRole === "editor");
  const starList = epkInfo.crew.filter((c) => c.epkRole.includes("actor"));
  const filmmaker_image = `${process.env.REACT_APP_AWS_URL}/${epkInfo.film_maker.picture}`;
  const filmmaker_name = `${epkInfo.film_maker.firstName} ${epkInfo.film_maker.lastName}`;

  return (
    <div className="tw-flex tw-flex-col tw-bg-white">
      <div className="tw-relative tw-flex tw-flex-col tw-self-end tw-m-4">
        <span className="tw-text-[#1E0039] tw-flex tw-justify-center">Created By</span>
        <img
          className="tw-h-24 tw-w-24 tw-rounded-lg"
          src={filmmaker_image}
          alt="profile image"
        />
        <div className="tw-absolute tw-inset-x-0 tw-bottom-0 tw-flex tw-h-4 tw-justify-center tw-rounded-full tw-bg-gray-500 tw-bg-opacity-75">
          <span className="tw-self-center tw-text-sm tw-text-white">
            {filmmaker_name}
          </span>
        </div>
      </div>
      <div className="tw-flex tw-justify-around tw-py-6">
        <div>
          <img
            src={image_detail} style={{width:"310px", height:"420px"}}
            className="tw-my-4 tw-h-full tw-shadow-[6px_6px_3px_#1E0039]"
          />
        </div>
        <div className="tw-flex tw-flex-col tw-justify-around tw-text-[1.5rem]">
          {directorList.map((director) => (
            <p key={director.crewId._id}>
              Directed by: <span>{director.crewId.name}</span>
            </p>
          ))}
          {producerList.map((producer) => (
            <p key={producer.crewId._id}>
              Produced by: <span>{producer.crewId.name}</span>
            </p>
          ))}
          {cinematographerList.map((cinematographer) => (
            <p key={cinematographer.crewId._id}>
              Cinematographer: <span>{cinematographer.crewId.name}</span>
            </p>
          ))}
          {writerList.map((writer) => (
            <p key={writer.crewId._id}>
              Writer: <span>{writer.crewId.name}</span>
            </p>
          ))}
          {editorList.map((editor) => (
            <p key={editor.crewId._id}>
              Editor: <span>{editor.crewId.name}</span>
            </p>
          ))}
          <p>
            Studio: <span>{epkInfo.productionCo}</span>
          </p>
          <p>
            Distributed by: : <span>{epkInfo.distributionCo}</span>
          </p>
        </div>
        <div className="tw-flex tw-flex-col tw-justify-around tw-text-[1.5rem] ">
          {starList.map((star) => (
            <p key={star.crewId._id}>Starring: {star.crewId.name}</p>
          ))}
          <p>
            Produced Year: <span>{epkInfo.productionYear}</span>
          </p>
          <p>
            Duration: <span>{epkInfo.durationMin} Minutes</span>
          </p>
        </div>
      </div>
    </div>
  );
}