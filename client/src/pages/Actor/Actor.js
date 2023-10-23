import React, { useState, useEffect, useRef } from "react";
import "./Actor.css";
import List from "./ListActor";
import worldIcon from "../../images/icons/noun-world-icon.svg";
import EpkHeader from "../../components/EpkView/EpkHeader/EpkHeader";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/Footer";
import { useParams } from "react-router-dom";
import { getActorById } from "../../api/epks";
import { useSelector } from "react-redux";
import starIcon from "../../images/icons/Star FULL.svg";
import refralIcon from "../../images/icons/referral sign.svg";
import http from "../../http-common";
import {
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
} from "@mui/icons-material";
import StarIcon from "@mui/icons-material/Star";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import { useLocation } from "react-router-dom";

export default function Actor(props) {
  const [epkInfo, setEpkInfo] = useState({});
  const { id } = useParams();
  const [kkFollower, setKKFollower] = useState([]);
  const [range, setRange] = useState(2);
  const [isMoved, setIsMoved] = useState(false);
  const [slideNumber, setSlideNumber] = useState(0);
  const [pics, setpics] = useState([]);
  const [indexPic, setPicIndex] = useState(0);
  const [likes, setLikes] = useState([]);
  const [recommend, setRecommend] = useState([]);
  const [canPlay, setCanPlay] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  let images = [];

  const listRef = useRef();
  const videoRef = useRef();

  // fetching user
  const { user } = useSelector((user) => ({ ...user }));
  let userId;
  if (!user) {
    userId = "0";
  } else {
    userId = user.id;
  }

  const age_range = [
    [20, 24],
    [25, 29],
    [30, 34],
    [35, 39],
    [40, 44],
    [45, 49],
  ];

  function setAge(age) {
    if (age >= 20 && age <= 24) setRange(0);
    else if (age >= 25 && age <= 29) setRange(1);
    else if (age >= 30 && age <= 34) setRange(2);
    else if (age >= 35 && age <= 39) setRange(3);
    else if (age >= 40 && age <= 44) setRange(4);
    else if (age >= 45 && age <= 49) setRange(5);
  }

  useEffect(() => {
    http.get(`/users/getactor/${id}`).then((res) => {
      setEpkInfo(res.data);

      images.push(res.data.picture);
      images.push(...res.data.profiles);

      setpics(images);

      setAge(res.data.age);
      setLikes(res.data.likes.length);
      setKKFollower(res.data.kkFollowers.length);
      setRecommend(res.data.comunicate);
    });

    // const playVideoAfterDelay = setTimeout(() => {
    //   if (videoRef.current) {
    //     videoRef.current.play();
    //   }
    // }, 5000);

    // return () => clearTimeout(playVideoAfterDelay);
  }, [id]);

  // user is added to the list of +(followers)
  function addUserToFollowers() {
    http.post(`/users/follow/${id}/${userId}`).then((res) => {
      setKKFollower(res.data.kkFollowers.length);
    });
  }
  // user is added to the list of star(likes)
  function addUserToLikes() {
    http.post(`/users/like/${id}/${userId}`).then((res) => {
      setLikes(res.data.likes.length);
    });
  }

  const handleClick = (direction) => {
    if (direction === "left" && indexPic > 0) {
      setPicIndex(indexPic - 1);
    } else if (direction === "right" && indexPic < pics.length - 1) {
      setPicIndex(indexPic + 1);
    }
  };

  const playVideo = () => {
    // if (canPlay === true) {
    //   setCanPlay(false);
    //   videoRef.current.pause();
    // } else {
    //   setCanPlay(true);
    //   videoRef.current.play();
    // }

    // ----- CHIHYIN -----
    const video = videoRef.current;
    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };
  const displaySex = (sex) => {
    switch (sex) {
      case "Male":
        return "M";
      case "Female":
        return "F";
      case "Transgender":
        return "Trans";
      case "Non-binary":
        return "NB";
      case "other":
        return "O";
      case "notToSay":
        return "-";
      default:
        return "";
    }
  };

  return (
    <div className="tw-bg-[#1E0039]">
      <div className="actor-top-container">
        <Navbar className={props.className} title={props.title} />
      </div>
      <div className="actor-navbar">
        <EpkHeader epkInfo={epkInfo} role="actor" id={id} />
      </div>
      <div className="actor-container">
        <div>
          <video
            loop
            ref={videoRef}
            className="actor-image-container"
            src={`${process.env.REACT_APP_AWS_URL}/${epkInfo.bannerImg}`}
            // poster={thumbnailFromUploadActorPic || thumbnailFromLocalStorage}
            poster={`${process.env.REACT_APP_AWS_URL}/${epkInfo.thumbnail}`}
            controls
          ></video>
          <div
            className="actor-profile"
            style={{
              backgroundImage: `url(${process.env.REACT_APP_AWS_URL}/${pics[indexPic]})`,
            }}
          >
            <ArrowBackIosOutlined
              className="arrow-actor-profile arrow-actor-profile1"
              onClick={() => handleClick("left")}
              style={{
                color: "#1E0039",
                fontSize: "4rem",
                display: "inline",
              }}
            />
            <ArrowForwardIosOutlined
              className="arrow-actor-profile arrow-actor-profile2"
              onClick={() => handleClick("right")}
              style={{
                color: "#1E0039",
                fontSize: "4rem",
                display: "inline",
              }}
            />
          </div>
          <div>
            {isPlaying ? (
              <PauseCircleOutlineIcon
                className="actor-play-icon"
                style={{
                  color: "#1E0039",
                  fontSize: "4rem",
                  display: "inline",
                }}
                onClick={playVideo}
              />
            ) : (
              <PlayCircleIcon
                className="actor-play-icon"
                style={{
                  color: "#1E0039",
                  fontSize: "4rem",
                  display: "inline",
                }}
                onClick={playVideo}
              />
            )}
          </div>
        </div>

        <div className="actor-middle-container">
          <p className="actor-name actor-detail-item">
            {epkInfo.firstName} {epkInfo.lastName}
          </p>
          <p
            className="actor-name actor-detail-item"
            style={{
              gridColumn: "3/4",
            }}
          >
            {/* {epkInfo.sex && epkInfo.sex === "Male" ? "M" : "F"} */}
            {/* ----- CHIHYIN ----- */}
            {displaySex(epkInfo.sex)}
          </p>
          <p className="actor-detail-item Actor-Role">Actor</p>
          <button
            className="btn-follow actor-detail-item"
            onClick={addUserToFollowers}
          >
            Follow +
          </button>
          <p
            className="follower-number actor-detail-item"
            style={{ fontSize: "24px" }}
          >
            {/* {kkFollower.length || "0"} */}
            {kkFollower}
          </p>
          {/* <button className="btn-star actor-detail-item">
            <span style={{ display: "inline" }}>Star</span>{" "}
            <StarIcon
              className="actor-page-star"
              onClick={addUserToLikes}
              style={{
                color: "white",
                marginLeft: "10px",
              }}
            />{" "}
          </button> */}
          <button
            className="btn-star actor-detail-item"
            onClick={addUserToLikes}
          >
            <span style={{ display: "inline" }}>Star</span>
            <StarIcon
              className="actor-page-star"
              style={{ color: "white", marginLeft: "10px" }}
            />
          </button>
          <p
            className="follower-number actor-detail-item"
            style={{ fontSize: "24px" }}
          >
            {likes}
          </p>
          <button className="btn-Recommend actor-detail-item">
            <span style={{ display: "inline" }}>Recommend</span>{" "}
            <img
              src={refralIcon}
              className="actor-page-star"
              style={{ fill: "white", color: "white" }}
            />
          </button>
          <p
            className="follower-number-Recommend actor-detail-item"
            style={{ fontSize: "24px" }}
          >
            {recommend.length || "0"}
          </p>
          <div className="actor-detail-item actor-icon-movie-container">
            <img
              src="../Vector.png"
              alt=""
              style={{ width: "37px", height: "25px" }}
            />
            <p className="movie-number" style={{ fontSize: "24px" }}>
              1
            </p>
          </div>
        </div>
        <div className="actor-city-container">
          <div className="actor-city-detail">
            <img
              src={worldIcon}
              style={{ width: "55px", height: "45px", display: "inline" }}
            />
            <p
              style={{
                display: "inline",
                marginLeft: "10px",
                color: "#1E0039",
                fontSize: "24px",
                fontWeight: "700",
              }}
            >
              {epkInfo.city || "Montreal"}{" "}
            </p>
          </div>
          <div className="actor-city-ethnicity">
            <p
              className="actor-age-show"
              style={{
                display: "block",
                marginLeft: "30px",
                color: "#1E0039",
                fontSize: "16px",
              }}
            >
              <span
                style={{
                  fontWeight: "700",
                  marginRight: "60px",
                }}
              >
                Age-Range
              </span>
              <span>
                {age_range[range][0]} - {age_range[range][1]}
              </span>
            </p>
            <p
              style={{
                display: "block",
                marginLeft: "30px",
                color: "#1E0039",
                fontSize: "16px",
              }}
            >
              <span
                style={{
                  fontWeight: "700",
                  marginRight: "75px",
                }}
              >
                Ethnicity{" "}
              </span>{" "}
              <span>{epkInfo.ethnicity || "Caucasian"}</span>
            </p>
            <p
              style={{
                display: "block",
                marginLeft: "30px",
                color: "#1E0039",
                fontSize: "16px",
              }}
            >
              <span
                style={{
                  fontWeight: "700",
                  marginRight: "65px",
                }}
              >
                Hair Color{" "}
              </span>{" "}
              <span>{epkInfo.hairColor}</span>
            </p>
            <p
              style={{
                display: "block",
                marginLeft: "30px",
                color: "#1E0039",
                fontSize: "16px",
              }}
            >
              <span
                style={{
                  fontWeight: "700",
                  marginRight: "60px",
                }}
              >
                Eyes Color{" "}
              </span>{" "}
              <span>{epkInfo.eyesColor}</span>
            </p>
            <p
              style={{
                display: "block",
                marginLeft: "30px",
                color: "#1E0039",
                fontSize: "16px",
              }}
            >
              <span
                style={{
                  fontWeight: "700",
                  marginRight: "60px",
                }}
              >
                Body Build{" "}
              </span>{" "}
              <span>{epkInfo.bodyBuild}</span>
            </p>
            <p
              style={{
                display: "block",
                marginLeft: "30px",
                color: "#1E0039",
                fontSize: "16px",
              }}
            >
              <span
                style={{
                  fontWeight: "700",
                  marginRight: "90px",
                }}
              >
                Height{" "}
              </span>{" "}
              <span>{epkInfo.height}</span>
            </p>
          </div>
          <div className="actor-biography">
            <p>{epkInfo.aboutMe}</p>
          </div>
        </div>
        <div className="bottom-container">
          <p className="bottom-actor-container-title">
            current films by actor {epkInfo.firstName} {epkInfo.lastName}
          </p>
          <div className="movie-actor-play-container">
            <div>
              <List />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
