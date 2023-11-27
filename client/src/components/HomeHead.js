/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import { React, useState, useEffect } from "react";
import "../styles/Homehead.css";
// import { faBars, faComment } from "@fortawesome/free-solid-svg-icons";
//import { ShareIcon } from "../images/Share .svg";
// import DollarIcon from "../images/icons/DollarIcon.svg";
// import PlusIcon from "../images/icons/Plus.svg";
// import KIcon from "../images/icons/KickstarterIcon.svg";
import http from "../http-common";
import { useSelector } from "react-redux";
import DonationIcon from "../images/icons/Donation.svg";
import DonationBlackIcon from "../images/icons/Donation.svg";
import DollarIcon from "../images/icons/DollarIcon.svg";
import DollarBlackIcon from "../images/icons/DollarBlackIcon.svg";
import PlusIcon from "../images/icons/PlusWhite.svg";
import PlusBlackIcon from "../images/icons/PlusBlack.svg";
import StarIcon from "../images/icons/StarWhite.svg";
import StarBlackIcon from "../images/icons/StarBlack.svg";
//import KIcon from "../images/icons/K.svg";
import ShareIcon from "../images/icons/share.svg";
import ShareBlackIcon from "../images/icons/shareBlack.svg";
import SearchBar from "./HomeHead/SearchBar";

const HomeHead = (props) => {
  const [clickedStar, setClickedStar] = useState(false);
  const [clickedShare, setClickedShare] = useState(false);
  const [clickedDonation, setClickedDonation] = useState(false);
  const [clickedDollar, setClickedDollar] = useState(false);
  //const [clickedKIcon, setClickedKIcon] = useState(false);
  const [clickedPlus, setClickedPlus] = useState(false);
  const [clickedMovie, setClickedMovie] = useState(false);
  const [clickedVolumeUp, setClickedVolumeUp] = useState(false);
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
          .find(
            (actor) =>
              // actor.bannerImg &&
              // !actor.bannerImg.startsWith("https") &&
              actor.thumbnail &&
              !actor.thumbnail.startsWith("https") &&
              actor.picture &&
              !actor.picture.startsWith("https")
          );
        if (validActor) {
          setActor(validActor);
        }
      });
    } else {
      http.get(`fepks/`).then((response) => {
        // Find the most recent fepk with both banner_url and image_details
        const validFepk = response.data
          .slice()
          .find((fepk) => fepk.banner_url && fepk.image_details);
        if (validFepk) {
          setFepk(validFepk);
        }
      });
    }
  }, [props.role]);

  useEffect(() => {
    console.log("Actor:", actor);
  }, [actor]);

  const formattedTitle = fepk.title?.replace(/ /g, "_");

  return (
    <div
      className='tw-h-[100vh] tw-overflow-hidden tw-bg-cover tw-bg-center tw-bg-no-repeat'
      style={{
        backgroundImage:
          props.role && props.role === "actor"
            ? actor.thumbnail && !actor.thumbnail.startsWith("https")
              ? `url(${process.env.REACT_APP_AWS_URL}/${actor.thumbnail})`
              : null
            : fepk.banner_url &&
              !fepk.banner_url.startsWith("https") &&
              fepk.banner_url !== ""
            ? `url(${process.env.REACT_APP_AWS_URL}/${fepk.banner_url})`
            : null,
      }}
    >
      <div className='tw-mx-16 tw-mt-6 tw-flex tw-items-end tw-justify-end'>
        <SearchBar />
      </div>

      <section
        id='home'
        className='tw-h-full tw-bg-gradient-to-t tw-from-[#000]/50 tw-via-[#000]/40 tw-to-transparent tw-pt-0'
      >
        <div className='tw-flex tw-pt-24'>
          <div className='tw-flex tw-w-0 md:tw-w-2/4'>
            <a
              className='tw-mx-auto'
              href={
                props.role === "actor"
                  ? `actor/${actor._id}`
                  : `epk/${formattedTitle}`
              }
            >
              <img
                className='homeHead-poster tw-invisible tw-object-cover md:tw-visible'
                src={
                  props.role === "actor"
                    ? actor.picture && !actor.picture.startsWith("https")
                      ? `${process.env.REACT_APP_AWS_URL}/${actor.picture}`
                      : actor.picture
                    : fepk.image_details &&
                      !fepk.image_details.startsWith("https") &&
                      fepk.banner_url !== ""
                    ? `${process.env.REACT_APP_AWS_URL}/${fepk.image_details}`
                    : null
                }
                alt='/'
              />
            </a>
          </div>

          <div className='tw-mx-auto tw-my-auto tw-w-full md:tw-w-2/4'>
            <a
              href={
                props.role === "actor"
                  ? `actor/${actor._id}`
                  : `epk/${formattedTitle}`
              }
            >
              <h1 className='movieTitle tw-mx-auto tw-text-5xl tw-font-semibold lg:tw-text-6xl xl:tw-text-8xl'>
                {props.role === "actor"
                  ? actor.firstName + " " + actor.lastName
                  : fepk.title}
              </h1>
            </a>
          </div>
        </div>
        <p className='movieIntro tw-my-8 tw-px-2 tw-text-xl'>
          {fepk.logLine_short}
        </p>
        {/* <HomeMainFilm /> */}
      </section>
    </div>
  );
};

export default HomeHead;
