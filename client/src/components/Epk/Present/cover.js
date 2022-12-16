import React, { useState, useEffect, Fragment } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import http from "../../../http-common";
import style from "./cover.css";
import image1 from "../../../images/movies/imageSouthpaw.jpeg";
import saveIcon from "../../../images/Save.ico";
import kikSatr from "../../../images/Kickstarter-icon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDollarSign,
  faSave,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

function EpkCover() {
  let { id } = useParams();
  const [epkCoverData, setEpkCoverData] = useState({
    title: "SOUTHPAW",
    logLine: "They told him revenge was not the answer. They were severely wrong.",
    genre: "Drama",
    minutes: "",
    banner_url: "https://postimg.cc/FkfWC4N0",
    trailer_url: "",
  });

  const divStyles = {
    container: {
      backgroundImage:
        "url( 'https://kinomovie.s3.amazonaws.com/f50bdadce1b7dfd47202491a2a4d6d61.jpg' )",
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      width: "100vw",
      height: "100vh",
    },
  };

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
    <div >
      <div >

        <img
          // src="https://kinomovie.s3.amazonaws.com/f50bdadce1b7dfd47202491a2a4d6d61.jpg"
          src={image1}
          alt="hey"
          style={{ position: 'relative'}}
        />
        {/* <img
          src="https://m.media-amazon.com/images/I/A1bQ6XxJhkL._AC_SY679_.jpg"
          alt="hey"
          style={{width: "250px", position: 'relative', left: "-850px"}}
        /> */}

        <div className="centered"  >
          <h1>{epkCoverData.title}</h1>
        </div>
        <div className="bottomCenter">
          <h5>{epkCoverData.logLine}</h5>
        </div>
        <div className="bottomLeft">
          <h4>{epkCoverData.genre}</h4>
        </div>
      </div>

      <div className="navbarEpk" >
        <ul className="">
          <li className="">
            <a className="" href="#">
              <FontAwesomeIcon icon={faDollarSign} />
            </a>
          </li>
          <li className="">
            <a className="" href="#">
              <FontAwesomeIcon icon={faStar} />
            </a>
          </li>
          <li className="">
            <a className="" href="#">
              <img className="icon" src={saveIcon} alt="save" />
            </a>
          </li>
          <li className="">
            <a className="" href="#">
              <img className="icon" src={kikSatr} alt="save" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default EpkCover;