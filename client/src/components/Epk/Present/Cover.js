import React, { useState, useEffect, Fragment } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import http from "../../../http-common";
import style from "./Cover.module.css";
import headerimage from "../../../images/movies/imageSouthpaw.jpeg";
import logo from "../../../images/logo.png";
import avatar from "../../../images/avatar1.jpeg";
import poster from "../../../images/poster.jpg";
import kikSatr from "../../../images/Kickstarter-icon.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDollarSign,
  faSave,
  faShareAlt,
  faPlusCircle,
  faStar,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

function EpkCover() {
  let { id } = useParams();
  const [epkCoverData, setEpkCoverData] = useState({
    title: "SOUTHPAW",
    logLine:
      "They told him revenge was not the answer. They were severely wrong.",
    genre: "Drama",
    minutes: "",
    createdAt: "December 8th, 2002",
    banner_url: "https://postimg.cc/FkfWC4N0",
    trailer_url: "",
  });

  // const[isLogin, setIsLogin]=useState(false);

  // const checkisLoginHndler=()=>{

  //   setIsLogin(true);
  // }

  //   useEffect(() => {
  //     console.log(id);
  //     http
  //       .post(id)
  //       .then((res) => {
  //         console.log(id);
  //         console.log(res.data);
  //         setEpkCoverData(res.data);
  //       })
  //       .catch((e) => {
  //         console.log(e);
  //       });
  //   }, [id]);

  return (
    <div className={style.container}>
      <div className={style.hero}>
        {/* navbar section */}
        {/* 
      <div className={style.navContainer}>
      <div >
        <img 
        className={style.logo}
        src={logo}
        alt='logo'/>
      </div>
      <div className={style.searchBar}>
        <input type="text" className={style.searchTerm}/>
         <FontAwesomeIcon icon={faSearch} size ="2x"   className={style.searchButton}/> 
         
</div>
      <div>
        <img 
        className={style.avatar}
        src={avatar}
        alt='logo'/>
      </div>
      </div> */}

        {/* posterContainer */}

        <div className={style.posterContainer}>
          <div>
            <img src={poster} alt="poster" className={style.img}></img>
          </div>
          <div className={style.description}>
            <p className={style.centered}>{epkCoverData.title}</p>
            <p className={style.logline}>{epkCoverData.logLine}</p>
          </div>
        </div>

        {/* corner section */}
        <div className={style.bottomeLine}>
          <div className={style.flexContainer}>
            <p className={style.el1}>Preproduction</p>
            <p className={style.el2}>{epkCoverData.genre}</p>
            <p className={style.el3}>Posted:{epkCoverData.createdAt}</p>
          </div>
          <div class={style.dropdownContainer}>
            <div class={style.threedots}></div>
          </div>
          <div class={style.dropdown}>
            <a className={style.dotAnkor} href="#">
              <div>report</div>
            </a>
          </div>
        </div>
      </div>

      {/* icon-bar section */}

      <div className={style.iconContainer}>
        <div>
          <a href="#">
            <FontAwesomeIcon icon={faDollarSign} size="lg" />
          </a>
        </div>
        <div>
          <a href="#">
            <FontAwesomeIcon icon={faPlusCircle} size="lg" />
            {/* <img className="icon" src={plusIcon} alt="save" /> */}
          </a>
        </div>
        <div>
          <a href="#">
            <FontAwesomeIcon icon={faStar} size="lg" />
          </a>
        </div>
        <div>
          <a href="#">
            <FontAwesomeIcon icon={faSave} size="lg" />
            {/* <img className={style.icon} src={saveIcon} alt="save" /> */}
          </a>
        </div>

        <div>
          <a href="#">
            <img className={style.icon} src={kikSatr} alt="save" />
          </a>
        </div>
        <div>
          <a href="#">
            <FontAwesomeIcon icon={faShareAlt} size="lg" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default EpkCover;
