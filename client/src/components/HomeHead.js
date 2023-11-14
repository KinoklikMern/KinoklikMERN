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
  // Donation
  function handleClickDonation() {
    setClickedDonation(true);
    http.get(`fepks/wishestodonate/${fepk._id}/${userId}`).then((response) => {
      setFepk(response.data);
    });
  }

  // user is added to the list of $
  function handleClickDollar() {
    setClickedDollar(true);
    http.get(`fepks/wishestobuy/${fepk._id}/${userId}`).then((response) => {
      setFepk(response.data);
    });
  }

  // user is added to the list of +
  function handleClickPlus() {
    setClickedPlus(true);
    http.get(`fepks/favourite/${fepk._id}/${userId}`).then((response) => {
      setFepk(response.data);
    });
  }

  // user is added to the list of star(likes)
  function handleStarClick() {
    setClickedStar(true);
    http.get(`fepks/like/${fepk._id}/${userId}`).then((response) => {
      setFepk(response.data);
    });
  }

  //user click K icon
  // function handleClickKIcon() {
  //   setClickedKIcon(true);
  //   window.open(fepk.kickstarter_url);
  // }

  // user is added to the list of sharings
  function handleClickShare() {
    setClickedShare(true);
    http.get(`fepks/sharing/${fepk._id}/${userId}`).then((response) => {
      setFepk(response.data);
    });
  }

  function handleClickMovie() {
    setClickedMovie(true);
  }
  function handleClickVolumeUp() {
    setClickedVolumeUp(true);
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
          props.role && props.role === "actor"
            ? `url(${process.env.REACT_APP_AWS_URL}/${actor.thumbnail})`
            : `url(${process.env.REACT_APP_AWS_URL}/${fepk.banner_url})`,
      }}
    >
      <div className="tw-mx-16 tw-mt-6 tw-flex tw-items-end tw-justify-end">
        <SearchBar />
      </div>

      <section
        id="home"
        className="tw-h-full tw-bg-gradient-to-t tw-from-[#000]/50 tw-via-[#000]/40 tw-to-transparent tw-pt-0"
      >
        <div className="menu-icon tw-pt-12">
          {/* Donation  */}
          <div
            className=" tw-relative tw-inline-flex tw-h-16 tw-w-16 tw-justify-center hover:tw-scale-110"
            style={{ borderRadius: "20px", cursor: "pointer" }}
          >
            <img
              className="tw-h-10 tw-w-10 tw-rounded-none tw-opacity-50 hover:tw-h-12 hover:tw-w-12 hover:tw-opacity-100"
              src={
                fepk?.donaton?.filter((item) => item._id === userId).length !==
                0
                  ? DonationIcon
                  : DonationBlackIcon
              }
              alt="/"
              onClick={handleClickDonation}
            />
          </div>
          {/* <Link to="/">   must be linked to /bookmark    */}
          <div
            className=" tw-relative tw-inline-flex tw-h-16 tw-w-16 tw-justify-center hover:tw-scale-110"
            style={{ borderRadius: "20px", cursor: "pointer" }}
          >
            <img
              className="tw-h-10 tw-w-10 tw-rounded-none tw-opacity-50 hover:tw-h-12 hover:tw-w-12 hover:tw-opacity-100 "
              src={
                fepk?.wishes_to_buy?.filter((item) => item._id === userId)
                  .length !== 0
                  ? DollarBlackIcon
                  : DollarIcon
              }
              alt="/"
              onClick={handleClickDollar}
              //   style={{ opacity: clickedDollar ? 1 : 0.5 }}
            />
          </div>
          {/*  </Link> */}
          <div
            className=" tw-relative tw-inline-flex tw-h-16 tw-w-16 tw-justify-center hover:tw-scale-110"
            style={{ borderRadius: "20px", cursor: "pointer" }}
          >
            <img
              className="tw-h-10 tw-w-10 tw-rounded-none tw-opacity-50 hover:tw-h-12 hover:tw-w-12 hover:tw-opacity-100 "
              src={
                fepk?.favourites?.filter((item) => item._id === userId)
                  .length !== 0
                  ? PlusBlackIcon
                  : PlusIcon
              }
              alt="/"
              onClick={handleClickPlus}
              //   style={{ opacity: clickedPlus ? 1 : 0.5 }}
            />
          </div>
          <div
            className=" tw-relative tw-inline-flex tw-h-16 tw-w-16 tw-justify-center hover:tw-scale-110"
            style={{ borderRadius: "20px", cursor: "pointer" }}
          >
            <img
              className="tw-h-10 tw-w-10 tw-rounded-none tw-opacity-50 hover:tw-h-12 hover:tw-w-12 hover:tw-opacity-100 "
              src={
                fepk?.likes?.filter((item) => item._id === userId).length !== 0
                  ? StarBlackIcon
                  : StarIcon
              }
              onClick={handleStarClick}
              alt="/"
              //   style={{ opacity: clickedStar ? 1 : 0.5 }}
            />
          </div>
          {/* <div
            className=" tw-relative tw-inline-flex tw-h-16 tw-w-16 tw-justify-center hover:tw-scale-110"
            style={{ borderRadius: "20px", cursor: "pointer" }}
          >
            <img
              className="tw-h-10 tw-w-10 tw-rounded-none tw-opacity-50 hover:tw-h-12 hover:tw-w-12 hover:tw-opacity-100 "
              src={KIcon}
              alt="/"
              onClick={handleClickKIcon}
              //   style={{ opacity: clickedKIcon ? 1 : 0.5 }}
            />
          </div> */}
          <div
            className=" tw-relative tw-inline-flex tw-h-16 tw-w-16 tw-justify-center  hover:tw-scale-110"
            style={{ borderRadius: "20px", cursor: "pointer" }}
          >
            <img
              className="tw-h-10 tw-w-10 tw-rounded-none tw-opacity-50 hover:tw-h-12 hover:tw-w-12 hover:tw-opacity-100 "
              src={
                fepk?.sharings?.filter((item) => item._id === userId).length !==
                0
                  ? ShareBlackIcon
                  : ShareIcon
              }
              onClick={handleClickShare}
              //   style={{ opacity: clickedShare ? 1 : 0.5 }}
            />
          </div>
        </div>
        {/* <div className="menu-icon1">
          {userRole === "Filmmaker" ? (
            <>
              <a href={`/uploadFepk`}>
                <img
                  className="tw-h-10 tw-w-10 tw-rounded-none tw-opacity-50 hover:tw-h-12 hover:tw-w-12 hover:tw-opacity-100 "
                  src={UploadFilmIcon}
                  alt="/"
                  onClick={handleClickMovie}
                  // style={{ opacity: clickedMovie ? 1 : 0.5 }}
                />
              </a>
              <img
                className="tw-h-9 tw-w-9 tw-rounded-none tw-opacity-50 hover:tw-h-11 hover:tw-w-11 hover:tw-opacity-100 "
                src={VolumeIcon2}
                alt="/"
                onClick={handleClickVolumeUp}
                style={{ cursor: "pointer" }}
                // style={{ opacity: clickedVolumeUp ? 1 : 0.5 }}
              />
            </>
          ) : (
            <img
              className="tw-h-9 tw-w-9 tw-rounded-none tw-opacity-50 hover:tw-h-11 hover:tw-w-11 hover:tw-opacity-100 "
              src={VolumeIcon2}
              alt="/"
              onClick={handleClickVolumeUp}
              // style={{ opacity: clickedVolumeUp ? 1 : 0.5 }}
            />
          )}

          <img
            className="tw-h-9 tw-w-9 tw-rounded-none tw-opacity-50 hover:tw-h-11 hover:tw-w-11 hover:tw-opacity-100 "
            src={VolumeIcon2}
            alt="/"
            onClick={handleClickVolumeUp}
            style={{ opacity: clickedVolumeUp ? 1 : 0.5 }}
          />
        </div> */}
        <div className="tw-pt-24">
          <div className="tw-flex">
            <div className="tw-flex md:tw-w-2/4">
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
                    props.role === "actor"
                      ? `${process.env.REACT_APP_AWS_URL}/${actor.picture}`
                      : `${process.env.REACT_APP_AWS_URL}/${fepk.image_details}`
                  }
                  alt="/"
                />
              </a>
            </div>

            <div className="tw-flex tw-w-full md:tw-w-2/4">
              <h1 className="movieTitle tw-mx-auto tw-my-auto tw-text-8xl tw-font-semibold">
                {props.role === "actor"
                  ? actor.firstName + " " + actor.lastName
                  : fepk.title}
              </h1>
            </div>
          </div>
          <p className="movieIntro tw-my-8 tw-text-xl">{fepk.logLine_short}</p>
        </div>
        {/* <HomeMainFilm /> */}
      </section>
    </div>
  );
};

export default HomeHead;
