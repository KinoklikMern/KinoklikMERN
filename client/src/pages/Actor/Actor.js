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

export default function Actor(props) {
  const [epkInfo, setEpkInfo] = useState({});
  const { id } = useParams();
  const [follower, setFollower] = useState([]);
  const [range, setRange] = useState(2);
  const [isMoved, setIsMoved] = useState(false);
  const [slideNumber, setSlideNumber] = useState(0);
  const [pics, setpics] = useState([]);
  const [indexPic, setPicIndex] = useState(0);
  const [likes, setLikes] = useState([]);
  const [recommend, setRecommend] = useState([]);
  const [canPlay, setCanPlay] = useState(true);

  let images = [];

  const listRef = useRef();
  const videoRef = useRef();

  // const age_range = [
  //   [20, 24],
  //   [25, 29],
  //   [30, 34],
  //   [35, 39],
  //   [40, 44],
  //   [45, 49],
  // ];

  const age_range = [
    [3, 5],
    [6, 9],
    [10, 12],
    [13, 15],
    [16, 20],
    [21, 25],
    [26, 29],
    [30, 34],
    [35, 44],
    [45, 55],
    [56, 66],
    [67, 77],
    [78, 89],
  ];

  // function setAge(age) {
  //   if (age >= 20 && age <= 24) setRange(0);
  //   else if (age >= 25 && age <= 29) setRange(1);
  //   else if (age >= 30 && age <= 34) setRange(2);
  //   else if (age >= 35 && age <= 39) setRange(3);
  //   else if (age >= 40 && age <= 44) setRange(4);
  //   else if (age >= 45 && age <= 49) setRange(5);
  // }

  function setAge(age) {
    for (let i = 0; i < age_range.length; i++) {
      if (age >= age_range[i][0] && age <= age_range[i][1]) {
        setRange(i);
        break;
      }
    }
  }

  useEffect(() => {
    http
      .get(`/users/getactor/${id}`)
      .then((res) => {
        setEpkInfo(res.data);

        // console.log("Received age from database:", res.data.sex);

        images.push(res.data.picture);
        images.push(...res.data.profiles);

        setpics(images);

        setAge(res.data.age);
        setLikes(res.data.likes);
        setFollower(res.data.followers);
        setRecommend(res.data.comunicate);
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          console.error("Actor not found. Check the ID or the API endpoint.");
        } else {
          console.error(
            "An error occurred while fetching actor data:",
            error.message
          );
        }
      });

    const playVideoAfterDelay = setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play();
      }
    }, 5000);

    return () => clearTimeout(playVideoAfterDelay);
  }, [id]);

  const handleClick = (direction) => {
    if (direction === "left" && indexPic > 0) {
      setPicIndex(indexPic - 1);
    } else if (direction === "right" && indexPic < pics.length - 1) {
      setPicIndex(indexPic + 1);
    }
  };

  const playVideo = () => {
    if (canPlay === true) {
      setCanPlay(false);
      videoRef.current.pause();
    } else {
      setCanPlay(true);
      videoRef.current.play();
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
            <PlayCircleIcon
              className="actor-play-icon"
              style={{
                color: "#1E0039",
                fontSize: "4rem",
                display: "inline",
              }}
              onClick={playVideo}
            />
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
            {epkInfo.sex && epkInfo.sex === "Male" ? "M" : "F"}
          </p>
          <p className="actor-detail-item Actor-Role">Actor</p>
          <button className="btn-follow actor-detail-item">Follow +</button>
          <p
            className="follower-number actor-detail-item"
            style={{ fontSize: "24px" }}
          >
            {follower.length || "0"}
          </p>
          <button className="btn-star actor-detail-item">
            <span style={{ display: "inline" }}>Star</span>{" "}
            <StarIcon
              className="actor-page-star"
              style={{
                color: "white",
                marginLeft: "10px",
              }}
            />{" "}
            {/*<img src={starIcon} className='actor-page-star' style={{fill: "white", color: "white"}}/>*/}
          </button>
          <p
            className="follower-number actor-detail-item"
            style={{ fontSize: "24px" }}
          >
            {likes.length || "22"}
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
              0
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
                  marginRight: "30px",
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
                  marginRight: "30px",
                }}
              >
                Ethnicity{" "}
              </span>{" "}
              <span>{epkInfo.ethnicity || "Caucasian"}</span>
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
