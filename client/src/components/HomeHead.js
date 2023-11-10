/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import { React, useState, useEffect } from "react";
import "../styles/Homehead.css";
import http from "../http-common";
import { useSelector } from "react-redux";
import SearchBar from "./HomeHead/SearchBar";

const HomeHead = (props) => {
  const [fepk, setFepk] = useState({});
  const [actor, setActor] = useState({});

  // fetching user
  const { user } = useSelector((user) => ({ ...user }));
  let userId;
  let userRole;
  if (!user) {
    userId = "0";
    userRole = "noUser";
  } else {
    userId = user.id;
    userRole = user.role;
  }

  //showing the latest added movie
  useEffect(() => {
    if (props.role === "actor") {
      http.get(`users/getactors/`).then((response) => {
        // Find the most recent actor with a bannerImg and picture
        const validActor = response.data
          .slice()
          .reverse()
          .find((actor) => actor.bannerImg && actor.thumbnail && actor.picture);
        if (validActor) {
          setActor(validActor);
        }
      });
    } else {
      http.get(`fepks/`).then((response) => {
        // Find the most recent fepk with both banner_url and image_details
        const validFepk = response.data
          .slice()
          .reverse()
          .find((fepk) => fepk.banner_url && fepk.image_details);
        if (validFepk) {
          setFepk(validFepk);
        }
      });
    }
  }, [props.role]);

  const formattedTitle = fepk.title?.replace(/ /g, "_");

  return (
    <div
      className="tw-h-[100vh] tw-overflow-hidden tw-bg-cover tw-bg-center tw-bg-no-repeat"
      style={{
        backgroundImage:
          props.role === "actor" && actor.thumbnail
            ? `url(${process.env.REACT_APP_AWS_URL}/${actor.thumbnail})`
            : props.role !== "actor" && fepk.banner_url
            ? `url(${process.env.REACT_APP_AWS_URL}/${fepk.banner_url})`
            : "none",
      }}
    >
      {/* 
    // <div className="tw-relative tw-h-[100vh] tw-overflow-hidden">
    //   {props.role && props.role === "actor" && actor.bannerImg && ( 
    //     <video
    //       loop
    //       autoPlay
    //       muted
    //       className="actor-video"
    //       style={{
    //         position: "absolute",
    //         top: "50%",
    //         left: "50%",
    //         width: "100%",
    //         height: "100%",
    //         objectFit: "cover",
    //         transform: "translate(-50%, -50%)",
    //         zIndex: "-1",
    //       }}
    //       src={`${process.env.REACT_APP_AWS_URL}/${actor.bannerImg}`}
    //     ></video>
    //   )}
    */}

      <div className="tw-mx-16 tw-mt-6 tw-flex tw-items-end tw-justify-end">
        <SearchBar />
      </div>

      <section
        id="home"
        className="tw-h-full tw-bg-gradient-to-t tw-from-[#000]/50 tw-via-[#000]/40 tw-to-transparent tw-pt-0"
      >
        <div className="tw-flex tw-pt-24">
          <div className="tw-flex tw-w-0 md:tw-w-2/4">
            <a
              className="tw-mx-auto"
              href={
                props.role === "actor"
                  ? `actor/${actor._id}`
                  : `epk/${formattedTitle}`
              }
            >
              <img
                className="homeHead-poster tw-invisible md:tw-visible"
                src={
                  props.role === "actor" && actor.picture
                    ? `${process.env.REACT_APP_AWS_URL}/${actor.picture}`
                    : props.role !== "actor" && fepk.image_details
                    ? `${process.env.REACT_APP_AWS_URL}/${fepk.image_details}`
                    : "defaultImageURL" // Fallback image URL
                }
                alt="/"
              />
            </a>
          </div>

          <div className="tw-flex tw-w-full md:tw-w-2/4">
            <a
              className="tw-my-auto"
              href={
                props.role === "actor"
                  ? `actor/${actor._id}`
                  : `epk/${formattedTitle}`
              }
            >
              <h1 className="movieTitle tw-mx-auto tw-text-8xl tw-font-semibold">
                {props.role === "actor"
                  ? actor.firstName + " " + actor.lastName
                  : fepk.title}
              </h1>
            </a>
          </div>
        </div>
        <p className="movieIntro tw-my-8 tw-px-2 tw-text-xl">
          {fepk.logLine_short}
        </p>
        {/* <HomeMainFilm /> */}
      </section>
    </div>
  );
};

export default HomeHead;
