import { React, useState } from "react";
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

  return (
    <div className="tw-h-[100vh]  tw-overflow-hidden tw-bg-JokerImage  tw-bg-cover tw-bg-no-repeat">
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
          {/*   <FontAwesomeIcon
          className="tw-opacity-80  tw-text-5xl tw-ml-2 tw-font-bold hover:tw-h-11 hover:tw-w-11 hover:tw-opacity-100"
          icon={faDollarSign}
          onClick={handleClickDollar}
            style={{ opacity: clickedDollar ? 1 : 0.5 }}
        />*/}

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
          {/* <FontAwesomeIcon
            className="tw-opacity-50 hover:tw-opacity-100"
            icon={faStar}
  /> */}
          {/* <img className="tw-h-10 tw-w-10 " src={ShareIcon} alt="/" /> */}
          <FontAwesomeIcon
            className="tw-h-9 tw-w-9 tw-opacity-50 hover:tw-h-11 hover:tw-w-11 hover:tw-opacity-100"
            icon={faShareNodes}
            onClick={handleClickShare}
            style={{ opacity: clickedShare ? 1 : 0.5 }}
          />
        </div>
        <div className="menu-icon1">
          {/* <div className="tw-flex tw-flex-row">
        <input type="text" placeholder="Search" className="tw-bg-gray-100 tw-border tw-border-gray-200 tw-rounded-md tw-py-2 tw-pl-10 tw-pr-4 tw-block tw-w-full tw-appearance-none tw-leading-normal focus:tw-outline-none focus:tw-bg-white focus:tw-border-gray-300"/>
        <div className="tw-absolute tw-inset-y-0 tw-left-0 tw-pl-4 tw-flex tw-items-center tw-cursor-pointer" onclick="openSearch()">
        <FontAwesomeIcon icon={faMagnifyingGlass} /> 
        </div>
      </div>*/}

          {/* <FontAwesomeIcon icon={faMagnifyingGlass} />
        <Link to="/filmMakerDashboard">
            <FontAwesomeIcon icon={faBars} />
          </Link>
          <FontAwesomeIcon icon={faWindowRestore} />
               <FontAwesomeIcon icon={faFilm} />
          <FontAwesomeIcon icon={faVolumeHigh} /> */}
          {/*  <Link to="/filmMakerDashboard">*/}
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
              <img className="tw-h-[70vh] " src={LeftJoker} alt="/" />
            </div>

            <div>
              <h1 className="movieTitle tw-pl-48 tw-text-8xl tw-font-semibold">
                JOKER
              </h1>
            </div>
          </div>

          <p className="movieIntro tw-my-8 tw-text-xl ">
            Dramatic film about a sad man who goes through shit in life. “Joker”
            centers around the iconic arch-nemesis and is an original,
            standalone story not seen before on the big screen.
          </p>
        </div>
        <HomeMainFilm />
      </section>
    </div>
  );
};

export default HomeHead;
