import { React, useState, useEffect } from "react";
import "../styles/Homehead.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UploadFilmIcon from "../images/icons/UploadFilmIcon.svg";
import VolumeIcon2 from "../images/icons/VolumeIcon2.svg";
import DollarIcon from "../images/icons/DollarIcon.svg";

import PlusIcon from "../images/icons/Plus.svg";
//import KIcon from "../images/icons/KickstarterIcon.svg";
import http from "../http-common";
import { useSelector } from "react-redux";

import { faShareNodes, faStar } from "@fortawesome/free-solid-svg-icons";

const HomeHead = () => {
  const [clickedStar, setClickedStar] = useState(false);
  const [clickedShare, setClickedShare] = useState(false);
  const [clickedDollar, setClickedDollar] = useState(false);
  //const [clickedKIcon, setClickedKIcon] = useState(false);
  const [clickedPlus, setClickedPlus] = useState(false);
  const [clickedMovie, setClickedMovie] = useState(false);
  const [clickedVolumeUp, setClickedVolumeUp] = useState(false);
  const [fepk, setFepk] = useState({});

  // fetching user
  const user = useSelector((state) => state.user);
  let userId;
  let userRole;
  if (!user) {
    userId = "0";
    userRole = "noUser";
  } else {
    userId = user.id;
    userRole = user.role;
  }

  // user is added to the list of $
  function handleClickDollar() {
    setClickedDollar(true);
    http.get(`fepks/wishestobuy/${fepk._id}/${userId}`);
  }

  // user is added to the list of +
  function handleClickPlus() {
    setClickedPlus(true);
    http.get(`fepks/favourite/${fepk._id}/${userId}`);
  }

  // user is added to the list of star(likes)
  function handleStarClick() {
    setClickedStar(true);
    http.get(`fepks/like/${fepk._id}/${userId}`);
  }

  // //user click K icon
  // function handleClickKIcon() {
  //   setClickedKIcon(true);
  //   window.open(fepk.kickstarter_url);
  // }

  // user is added to the list of sharings
  function handleClickShare() {
    setClickedShare(true);
    http.get(`fepks/sharing/${fepk._id}/${userId}`);
  }

  function handleClickMovie() {
    setClickedMovie(true);
  }
  function handleClickVolumeUp() {
    setClickedVolumeUp(true);
  }

  //showing the latest added movie
  useEffect(() => {
    http.get(`fepks/`).then((response) => {
      let last = response.data.length - 1;
      setFepk(response.data[last]);
      // console.log(fepk);
    });
  }, []);
  //console.log(fepk);

  return (
    <div
      className="tw-h-[100vh] tw-overflow-hidden tw-bg-cover tw-bg-center tw-bg-no-repeat"
      style={{
        backgroundImage: `url(${process.env.REACT_APP_AWS_URL}/${fepk.banner_url})`,
      }}
    >
      <section id="home" className="tw-pt-0">
        <div className="menu-icon tw-pt-12">
          {/* <Link to="/">   must be linked to /bookmark    */}
          <img
            className="tw-h-10 tw-w-10 tw-rounded-none tw-opacity-50 hover:tw-h-12 hover:tw-w-12 hover:tw-opacity-100 "
            src={DollarIcon}
            alt="/"
            onClick={handleClickDollar}
            style={{ opacity: clickedDollar ? 1 : 0.5 }}
          />
          {/*  </Link> */}
          <img
            className="tw-h-10 tw-w-10 tw-rounded-none tw-opacity-50 hover:tw-h-12 hover:tw-w-12 hover:tw-opacity-100 "
            src={PlusIcon}
            alt="/"
            onClick={handleClickPlus}
            style={{ opacity: clickedPlus ? 1 : 0.5 }}
          />

          <FontAwesomeIcon
            className="tw-opacity-50 hover:tw-h-11 hover:tw-w-11 hover:tw-opacity-100"
            icon={faStar}
            onClick={handleStarClick}
            style={{ opacity: clickedStar ? 1 : 0.5 }}
          />
          {/* <img
            className="tw-h-9 tw-w-9 tw-rounded-none tw-opacity-50 hover:tw-h-11 hover:tw-w-11 hover:tw-opacity-100 "
            src={KIcon}
            alt="/"
            onClick={handleClickKIcon}
            style={{ opacity: clickedKIcon ? 1 : 0.5 }}
          /> */}

          <FontAwesomeIcon
            className="tw-h-9 tw-w-9 tw-opacity-50 hover:tw-h-11 hover:tw-w-11 hover:tw-opacity-100"
            icon={faShareNodes}
            onClick={handleClickShare}
            style={{ opacity: clickedShare ? 1 : 0.5 }}
          />
        </div>
        <div className="menu-icon1">
          {userRole === "Filmmaker" ? (
            <>
              <a href={`/uploadFepk`}>
                <img
                  className="tw-h-10 tw-w-10 tw-rounded-none tw-opacity-50 hover:tw-h-12 hover:tw-w-12 hover:tw-opacity-100 "
                  src={UploadFilmIcon}
                  alt="/"
                  onClick={handleClickMovie}
                  style={{ opacity: clickedMovie ? 1 : 0.5 }}
                />
              </a>
              <img
                className="tw-h-9 tw-w-9 tw-rounded-none tw-opacity-50 hover:tw-h-11 hover:tw-w-11 hover:tw-opacity-100 "
                src={VolumeIcon2}
                alt="/"
                onClick={handleClickVolumeUp}
                style={{ opacity: clickedVolumeUp ? 1 : 0.5 }}
              />
            </>
          ) : (
            <img
              className="tw-h-9 tw-w-9 tw-rounded-none tw-opacity-50 hover:tw-h-11 hover:tw-w-11 hover:tw-opacity-100 "
              src={VolumeIcon2}
              alt="/"
              onClick={handleClickVolumeUp}
              style={{ opacity: clickedVolumeUp ? 1 : 0.5 }}
            />
          )}
          {/*}  </Link> */}

          {/* <img
            className="tw-h-9 tw-w-9 tw-rounded-none tw-opacity-50 hover:tw-h-11 hover:tw-w-11 hover:tw-opacity-100 "
            src={VolumeIcon2}
            alt="/"
            onClick={handleClickVolumeUp}
            style={{ opacity: clickedVolumeUp ? 1 : 0.5 }}
          /> */}
        </div>
        <div className="tw-pt-24">
          <div className="tw-flex tw-h-[70vh] tw-pl-40">
            <div>
              <a href={`epk/${fepk.title.replace(/ /g, "-").trim()}`}>
                <img
                  className="tw-h-[70vh] "
                  src={`${process.env.REACT_APP_AWS_URL}/${fepk.image_details}`}
                  alt="/"
                />
              </a>
            </div>

            <div>
              <h1 className="movieTitle tw-pl-48 tw-text-8xl tw-font-semibold">
                {fepk.title}
              </h1>
            </div>
          </div>

          <p className="movieIntro tw-my-8 tw-text-xl ">{fepk.logLine_short}</p>
        </div>
        {/* <HomeMainFilm /> */}
      </section>
    </div>
  );
};

export default HomeHead;
