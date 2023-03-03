import { React, useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import HomeMainFilm from "../components/HomeMainFilm";
import "../styles/Homehead.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faBars, faComment } from "@fortawesome/free-solid-svg-icons";
import LeftJoker from "../images/LeftJocker.png";

//import { ShareIcon } from "../images/Share .svg";

import UploadFilmIcon from "../images/icons/UploadFilmIcon.svg";
import VolumeIcon2 from "../images/icons/VolumeIcon2.svg";
import DollarIcon from "../images/icons/DollarIcon.svg";

import PlusIcon from "../images/icons/Plus.svg";
import KIcon from "../images/icons/KickstarterIcon.svg";
import http from "../http-common";

import {
  faShareNodes,
  // faBars,
  // faMagnifyingGlass,
  // faFilm,
  // faVolumeHigh,
  // faWindowRestore,
  faDollarSign,
  // faSave,
  // faShareAlt,
  // faPlusCircle,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

const HomeHead = () => {
  const [clicked, setClicked] = useState(false);
  const [clickedShare, setClickedShare] = useState(false);
  const [clickedDollar, setClickedDollar] = useState(false);
  const [clickedKIcon, setClickedKIcon] = useState(false);
  const [clickedPlus, setClickedPlus] = useState(false);
  const [clickedMovie, setClickedMovie] = useState(false);
  const [clickedVolumeUp, setClickedVolumeUp] = useState(false);

  function handleClick(e) {
    e.preventDefault();
    setClicked(true);
  }
  function handleClickShare() {
    setClickedShare(true);
  }
  function handleClickDollar() {
    setClickedDollar(true);
  }
  function handleClickKIcon() {
    setClickedKIcon(true);
  }
  function handleClickPlus() {
    setClickedPlus(true);
  }
  function handleClickMovie() {
    setClickedMovie(true);
  }
  function handleClickVolumeUp() {
    setClickedVolumeUp(true);
  }

  const [fepk, setFepk] = useState({});
  useEffect(() => {
      http.get(`fepks/`).then((response) => {
        let last = response.data.length - 1;
        setFepk(response.data[last]);
      });
    }, []);
  console.log(fepk);


  return (
    <div className=" tw-h-[100vh]  tw-overflow-hidden tw-bg-cover tw-bg-center tw-h-screen tw-bg-no-repeat" 
    style={{backgroundImage:`url(${process.env.REACT_APP_AWS_URL}/${fepk.banner_url})`}}>
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
            onClick={handleClick}
            style={{ opacity: clicked ? 1 : 0.5 }}
          />
          <img
            className="tw-h-9 tw-w-9 tw-rounded-none tw-opacity-50 hover:tw-h-11 hover:tw-w-11 hover:tw-opacity-100 "
            src={KIcon}
            alt="/"
            onClick={handleClickKIcon}
            style={{ opacity: clickedKIcon ? 1 : 0.5 }}
          />

          <FontAwesomeIcon
            className="tw-h-9 tw-w-9 tw-opacity-50 hover:tw-h-11 hover:tw-w-11 hover:tw-opacity-100"
            icon={faShareNodes}
            onClick={handleClickShare}
            style={{ opacity: clickedShare ? 1 : 0.5 }}
          />
        </div>
        <div className="menu-icon1">
          <img
            className="tw-h-10 tw-w-10 tw-rounded-none tw-opacity-50 hover:tw-h-12 hover:tw-w-12 hover:tw-opacity-100 "
            src={UploadFilmIcon}
            alt="/"
            onClick={handleClickMovie}
            style={{ opacity: clickedMovie ? 1 : 0.5 }}
          />
          {/*}  </Link> */}

          <img
            className="tw-h-9 tw-w-9 tw-rounded-none tw-opacity-50 hover:tw-h-11 hover:tw-w-11 hover:tw-opacity-100 "
            src={VolumeIcon2}
            alt="/"
            onClick={handleClickVolumeUp}
            style={{ opacity: clickedVolumeUp ? 1 : 0.5 }}
          />
        </div>
        <div className="tw-pt-24">
          <div className="tw-flex tw-h-[70vh] tw-pl-40">
            <div>
          
              <img className="tw-h-[70vh] " src={`${process.env.REACT_APP_AWS_URL}/${fepk.image_details}`} alt="/" />
            </div>

            <div>
              <h1 className="movieTitle tw-pl-48 tw-text-8xl tw-font-semibold">
                {fepk.title}
              </h1>
            </div>
          </div>

          <p className="movieIntro tw-my-8 tw-text-xl ">
            {fepk.logLine_short}
          </p>
        </div>
        <HomeMainFilm />
      </section>
    </div>
  );
};

export default HomeHead;
