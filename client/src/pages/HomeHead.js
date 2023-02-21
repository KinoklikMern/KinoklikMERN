import React from "react";
import { Link, NavLink } from "react-router-dom";
import HomeMainFilm from "../components/HomeMainFilm";
import "../styles/Homehead.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faBars, faComment } from "@fortawesome/free-solid-svg-icons";
import LeftJoker from "../images/LeftJocker.png";
import {
  faMovie,
  faSackDollar,
  faBookBookmark,
  faBookmark,
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
function openSearch() {
  document.querySelector('input[type="text"]').classList.toggle('hidden');
}

const HomeHead = () => {
  return (
    <div className="tw-h-[110vh]  tw-bg-JokerImage tw-bg-cover  tw-bg-no-repeat">
      <section id="home" className="tw-pt-0">
        <div className="menu-icon">
          <Link to="/bookmark">
            <FontAwesomeIcon icon={faDollarSign} />
          </Link>
          <FontAwesomeIcon icon={faPlusCircle} />
          <FontAwesomeIcon icon={faStar} />

          <FontAwesomeIcon icon={faShareNodes} />
        </div>
        <div className="menu-icon1">
         {/* <div className="tw-flex tw-flex-row">
        <input type="text" placeholder="Search" className="tw-bg-gray-100 tw-border tw-border-gray-200 tw-rounded-md tw-py-2 tw-pl-10 tw-pr-4 tw-block tw-w-full tw-appearance-none tw-leading-normal focus:tw-outline-none focus:tw-bg-white focus:tw-border-gray-300"/>
        <div className="tw-absolute tw-inset-y-0 tw-left-0 tw-pl-4 tw-flex tw-items-center tw-cursor-pointer" onclick="openSearch()">
        <FontAwesomeIcon icon={faMagnifyingGlass} /> 
        </div>
      </div>*/}
      
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          {/* <Link to="/filmMakerDashboard">
            <FontAwesomeIcon icon={faBars} />
          </Link>
          <FontAwesomeIcon icon={faWindowRestore} /> */}

          <FontAwesomeIcon icon={faFilm} />
          <FontAwesomeIcon icon={faVolumeHigh} />
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
            Dramatic film about a sad who goes through shit in life. "Joker"
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
