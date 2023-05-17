import React, { useState } from "react";
import MessageIcon from "../../../images/icons/message.svg";
import demo from "../../../images/avatarDefault.jpeg";

export default function EpkDetail({ epkInfo, handler }) {
  const image_detail = `${process.env.REACT_APP_AWS_URL}/${epkInfo.image_details}`;
  const filmmaker_image = `${process.env.REACT_APP_AWS_URL}/${epkInfo.film_maker.picture}`;
  const filmmaker_name = `${epkInfo.film_maker.firstName} ${epkInfo.film_maker.lastName}`;

  const CrewAvatar = ({ crewInfo }) => {
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
      <div className="tw-text-[#1E0039]">
        <img
          className="tw-h-20 tw-w-20 tw-rounded-full"
          src={`${process.env.REACT_APP_AWS_URL}/${crewInfo.image}`}
          alt="avatar img"
        />
        <div className="tw-text-center">
          <h3 className="tw-text-lg tw-leading-7 tw-tracking-tight">
            {formatChars(crewInfo.crewId.name)}
          </h3>
          <p className="tw-text-sm tw-leading-6">
            {formatChars(crewInfo.epkRole)}
          </p>
        </div>
      </div>
    );
  };
  return (
    <div className="tw-flex tw-justify-between tw-gap-6 tw-bg-white tw-pt-3 tw-pb-6 tw-pl-8 tw-pr-3 tw-text-[#1E0039]">
      <div className="tw-m-6">
        <img
          src={image_detail}
          style={{ width: "310px", height: "420px" }}
          className="tw-my-4 tw-h-full tw-shadow-[6px_6px_3px_#1E0039]"
        />
      </div>
      <div className="tw-my-8 tw-grid tw-grid-cols-3 tw-gap-3">
        {epkInfo.crew.map((crewInfo) => (
          <CrewAvatar crewInfo={crewInfo} />
        ))}
      </div>
      <div className="tw-my-8 tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-6 tw-text-center tw-text-xl ">
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
        <div className="tw-flex tw-flex-col ">
          <div className="tw-relative tw-self-end">
            <span className="tw-flex tw-justify-center tw-text-[#1E0039]">
              Created By
            </span>
            <img
              className="tw-max-w-20 tw-max-h-20 tw-rounded-lg"
              src={filmmaker_image}
              alt="profile image"
            />
            <div className="tw-absolute tw-inset-x-0 tw-bottom-0 tw-flex tw-h-4 tw-justify-center tw-rounded-full tw-bg-gray-500 tw-bg-opacity-75">
              <span className="tw-self-center tw-text-xs tw-text-white tw-overflow-hidden">
                {filmmaker_name} 
              </span>
            </div>
          </div>
          <div className="tw--m-[40px] tw-flex tw-justify-center tw-self-end">
            <img
              src={MessageIcon}
              style={{ width: "45%" }}
              onClick={() => handler("message")}
              className="tw-cursor-pointer hover:tw-scale-110"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
