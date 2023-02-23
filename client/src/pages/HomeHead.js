import React from "react";
import { Link, NavLink } from "react-router-dom";
import HomeMainFilm from "../components/HomeMainFilm";
import "../styles/Homehead.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faBars, faComment } from "@fortawesome/free-solid-svg-icons";
import LeftJoker from "../images/LeftJocker.png";

//import { ShareIcon } from "../images/Share .svg";
import ShareIcon from "../images/icons/ShareIcon.png";
import UploadFilmIcon from "../images/icons/UploadFilmIcon.svg";
import VolumeIcon from "../images/icons/VolumeIcon.svg";
import VolumeIcon2 from "../images/icons/VolumeIcon2.svg";
import DollarIcon from "../images/icons/DollarIcon.svg";
import StarEmptyIcon from "../images/icons/StarEmptyIcon.svg";
import PlusIcon from "../images/icons/Plus.svg";
import KIcon from "../images/icons/KickstarterIcon.svg";

import {
  faShareNodes,
  faBars,
  faMagnifyingGlass,
  faFilm,
  faVolumeHigh,
  faWindowRestore,
  faDollarSign,
  faSave,
  faShareAlt,
  faPlusCircle,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

const HomeHead = () => {
  return (
    <div className="tw-h-[110vh]  tw-bg-JokerImage tw-bg-cover  tw-bg-no-repeat">
      <section id="home" className="tw-pt-0">
        <div className="menu-icon">
          <Link to="/bookmark">
            <img
              className="tw-h-10 tw-w-10 tw-rounded-none tw-opacity-50 hover:tw-h-12 hover:tw-w-12 hover:tw-opacity-100 "
              src={DollarIcon}
              alt="/"
            />
          </Link>
          <img
            className="tw-h-10 tw-w-10 tw-rounded-none tw-opacity-50 hover:tw-h-12 hover:tw-w-12 hover:tw-opacity-100 "
            src={PlusIcon}
            alt="/"
          />
          <img
            className="tw-h-10 tw-w-10 tw-rounded-none tw-opacity-50 hover:tw-h-12 hover:tw-w-12 hover:tw-opacity-100 "
            src={StarEmptyIcon}
            alt="/"
          />
          <img
          className="tw-h-9 tw-w-9 tw-rounded-none tw-opacity-50 hover:tw-h-11 hover:tw-w-11 hover:tw-opacity-100 "
          src={KIcon}
          alt="/"
        />
           {/* <FontAwesomeIcon
            className="tw-opacity-50 hover:tw-opacity-100"
            icon={faStar}
  /> */}
          {/* <img className="tw-h-10 tw-w-10 " src={ShareIcon} alt="/" /> */}
          <FontAwesomeIcon
            className="tw-h-9 tw-w-9 hover:tw-h-11 hover:tw-w-11 tw-opacity-50 hover:tw-opacity-100"
            icon={faShareNodes}
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
        
          <img
            className="tw-h-10 tw-w-10 tw-rounded-none tw-opacity-50 hover:tw-h-12 hover:tw-w-12 hover:tw-opacity-100 "
            src={UploadFilmIcon}
            alt="/"
          />

          <img
            className="tw-h-10 tw-w-10 tw-rounded-none tw-opacity-50 hover:tw-h-12 hover:tw-w-12 hover:tw-opacity-100 "
            src={VolumeIcon}
            alt="/"
          />
          <img
            className="tw-h-10 tw-w-10 tw-rounded-none tw-opacity-50 hover:tw-h-12 hover:tw-w-12 hover:tw-opacity-100 "
            src={VolumeIcon2}
            alt="/"
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

          <p className="movieIntro tw-text-xl ">
            Dramatic film about a sad man who goes through shit in life. “Joker”
            centers around the iconic arch-nemesis and is an original,
            standalone story not seen before on the big screen
          </p>
        </div>
        <HomeMainFilm />
      </section>
    </div>
  );
};

export default HomeHead;
