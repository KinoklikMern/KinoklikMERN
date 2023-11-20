import React, { useState, useEffect, useRef } from "react";
import "./Actor.css";
// import List from "./ListActor";
import worldIcon from "../../images/icons/noun-world-icon.svg";
import EpkHeader from "../../components/EpkView/EpkHeader/EpkHeader";
import ActorPageHeader from "../../components/EpkView/EpkHeader/ActorPageHeader";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/Footer";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
// import starIcon from "../../images/icons/Star FULL.svg";
import refralIcon from "../../images/icons/referral sign.svg";
import http from "../../http-common";
import {
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
} from "@mui/icons-material";
import StarIcon from "@mui/icons-material/Star";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
// import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { addToChat } from "../../api/epks";
import { useTranslation } from "react-i18next";
import Axios from "axios";

export default function Actor(props) {
  const { t } = useTranslation();
  const [epkInfo, setEpkInfo] = useState({});
  const { id } = useParams();
  const [kkFollower, setKKFollower] = useState([]);
  const [range, setRange] = useState(2);
  // const [isMoved, setIsMoved] = useState(false);
  // const [slideNumber, setSlideNumber] = useState(0);
  const [pics, setpics] = useState([]);
  const [indexPic, setPicIndex] = useState(0);
  const [likes, setLikes] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [allUserList, setAllUserList] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [selectedFilmmakers, setSelectedFilmmakers] = useState([]);
  const videoRef = useRef();
  const [isModalVisible, setModalVisible] = useState(false);
  const [studioData, setStudioData] = useState(null);

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
    const fetchData = async () => {
      try {
        const [actorResponse, usersResponse] = await Promise.all([
          http.get(`/users/getactor/${id}`),
          http.get("/users/getallusers"),
        ]);
        const actorData = actorResponse.data;
        setEpkInfo(actorData);

        const images = [];
        if (!actorData.picture.startsWith("https")) {
          images.push(actorData.picture);
        }

        const imagesToPush = actorData.profiles.map((picture) => {
          if (picture !== null && undefined && "") {
            images.push(picture);
          }
        });

        setpics(images);

        setAge(actorData.age);
        setLikes(actorData.likes.length);
        setKKFollower(actorData.kkFollowers.length);
        setRecommendations(actorData.recommendations);
        setAllUserList(usersResponse.data);
      // Fetch studio data
      const response = await Axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/company/getCompanyByUser/${id}`
      );
      if (response.data) {
        setStudioData(response.data);
      }
    } catch (error) {
      console.error("An error occurred while fetching data.", error);
    }
  };

  fetchData();
}, [id, userId]);


  useEffect(() => {
    console.log(pics.length);
    console.log(pics);
  }, [pics]);

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
  // user is added to the list of recommendations
  const addUserToRecommendations = (count) => {
    http.post(`/users/recommend/${id}`, { count }).then((res) => {
      setRecommendations(res.data.recommendations);
    });
  };
  // user is recommended to filmmakers
  const recommendToFilmmaker = (filmmaker) => {
    setSelectedFilmmakers((prevSelected) => {
      console.log("Incoming filmmaker:", filmmaker);
      console.log("Previous Selection:", prevSelected);

      const isAlreadySelected = prevSelected.some(
        (selected) => selected._id === filmmaker._id
      );

      if (isAlreadySelected) {
        return prevSelected.filter(
          (selected) => selected._id !== filmmaker._id
        );
      } else {
        return [...prevSelected, filmmaker];
      }
    });
  };

  const sendRecommendations = () => {
    if (!user || !user.token) {
      return console.error("User or user token is not available");
    }
    if (selectedFilmmakers.length === 0) {
      return console.error("No filmmakers selected for recommendation");
    }

    const message1 = `Hey, check out this Actor: <a href="/actor/${epkInfo._id}">${epkInfo.firstName} ${epkInfo.lastName}</a>`;
    const message2 = `<a href="/actor/${epkInfo._id}"><img src="${process.env.REACT_APP_AWS_URL}/${pics[indexPic]}" alt="${epkInfo.firstName}" style="width: 60px; height: 70px;" /></a>`;

    Promise.all(
      selectedFilmmakers.map((filmmaker) => {
        return addToChat(message1, user, filmmaker._id).then((res) => {
          if (res && res.status === 200) {
            showModal();
            return addToChat(message2, user, filmmaker._id);
          } else {
            console.error("Unexpected response for message 1", res);
            throw new Error("Unexpected response for message 1");
          }
        });
      })
    )
      .then(() => {
        addUserToRecommendations(selectedFilmmakers.length);
        setSelectedFilmmakers([]);
        closeModal();
      })
      .catch((error) => {
        console.error("Error sending recommendations:", error);
      });
  };

  const handleSearch = (event) => {
    setSearchValue(event.target.value);
    const searchWord = event.target.value.toLowerCase();
    const newFilter = allUserList.filter((user) => {
      return (
        user.role === "Filmmaker" &&
        (user.firstName + " " + (user.lastName || ""))
          .toLowerCase()
          .includes(searchWord)
      );
    });
    if (!searchWord.trim() || newFilter.length === 0) {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const handleClick = (direction) => {
    if (direction === "left" && indexPic > 0) {
      setPicIndex(indexPic - 1);
    } else if (direction === "right" && indexPic < pics.length - 1) {
      setPicIndex(indexPic + 1);
    }
  };

  const playVideo = () => {
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
      default:
        return "N/A";
    }
  };

  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };
  const showModal = () => {
    setModalVisible(true);
    setTimeout(() => {
      setModalVisible(false);
    }, 2500);
  };

  return (
    <div className="tw-bg-[#1E0039]">
      <div className="actor-top-container">
        <Navbar className={props.className} title={props.title} />
      </div>
      <div className="actor-navbar">
        <ActorPageHeader epkInfo={epkInfo} role="actor" id={id} />
      </div>
      <div className="actor-container">
        <div>
          {epkInfo.bannerImg && (
            <video
              loop
              ref={videoRef}
              className="actor-image-container"
              src={
                epkInfo.bannerImg && !epkInfo.bannerImg.startsWith("https")
                  ? `${process.env.REACT_APP_AWS_URL}/${epkInfo.bannerImg}`
                  : null
              }
              // poster={thumbnailFromUploadActorPic || thumbnailFromLocalStorage}
              poster={
                epkInfo.thumbnail && !epkInfo.thumbnail.startsWith("https")
                  ? `${process.env.REACT_APP_AWS_URL}/${epkInfo.thumbnail}`
                  : null
              }
              controls
            ></video>
          )}

          {pics.length > 0 && (
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
          )}
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
          <p
            className="Actor-Role actor-detail-item"
            style={{
              fontSize: "30px",
              fontWeight: "bold",
              gridColumn: "1/3",
            }}
          >
            {epkInfo.firstName} {epkInfo.lastName}
          </p>
          <p
            className="Actor-Role actor-detail-item"
            style={{
              gridColumn: "3/4",
              fontSize: "30px",
              fontWeight: "bold",
            }}
          >
            {displaySex(epkInfo.sex)}
          </p>
          <p className="actor-detail-item Actor-Role">{t("Actor")}</p>
          <button
            className="btn-follow actor-detail-item"
            onClick={addUserToFollowers}
          >
            {t("Follow +")}
          </button>
          <p
            className="follower-number actor-detail-item"
            style={{ fontSize: "24px" }}
          >
            {kkFollower}
          </p>

          <button
            className="btn-star actor-detail-item"
            onClick={addUserToLikes}
          >
            <span style={{ display: "inline" }}>{t("Star")}</span>
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
          <button
            className="btn-Recommend actor-detail-item"
            onClick={openModal}
            disabled={epkInfo._id === user.id}
          >
            <span style={{ display: "inline" }}>{t("Recommend")}</span>{" "}
            <img
              src={refralIcon}
              className="actor-page-star"
              style={{ fill: "white", color: "white" }}
              alt=""
            />
          </button>
          <div className={`actor-modal ${modalIsOpen ? "is-open" : ""}`}>
            <div
              className="shared-style"
              style={{
                display: "flex",
                flexDirection: "column",
                position: "relative",
              }}
            >
              <div
                style={{
                  alignSelf: "flex-end",
                  cursor: "pointer",
                }}
                onClick={closeModal}
              >
                X
              </div>
              <h2>{t("Recommend Actor To Filmmaker")}:</h2>
              <input
                type="text"
                className="form-control shared-styles"
                value={searchValue}
                placeholder="Search name ..."
                onChange={handleSearch}
              />
              <div className="selected-filmmakers-display">
                {selectedFilmmakers.map((filmmaker, index) => (
                  <div key={index} className="selected-filmmaker-display">
                    <div style={{ display: "flex", alignItems: "center" }}>
                      {" "}
                      <img
                        src={filmmaker.picture}
                        alt={filmmaker.firstName}
                        style={{
                          display: "inline",
                          width: "30px",
                          height: "30px",
                          borderRadius: "25%",
                          marginRight: "10px",
                        }}
                      />
                      {filmmaker.firstName} {filmmaker.lastName || ""}
                    </div>
                    <button
                      style={{
                        background: "transparent",
                        marginright: "30px",
                      }}
                      onClick={() => recommendToFilmmaker(filmmaker)}
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
              {searchValue && (
                <div className={`results-div shared-styles`}>
                  {filteredData.length > 0 ? (
                    filteredData.map((filmmaker) => (
                      <div
                        key={filmmaker._id}
                        onClick={() => recommendToFilmmaker(filmmaker)}
                        className={
                          selectedFilmmakers.some(
                            (selected) => selected._id === filmmaker._id
                          )
                            ? "selected-filmmaker"
                            : ""
                        }
                        style={{
                          display: "flex",
                          alignItems: "center",
                          cursor: "pointer",
                        }}
                      >
                        <div
                          style={{ marginRight: "30px", marginBottom: "10px" }}
                        >
                          <img
                            src={filmmaker.picture}
                            alt={`${filmmaker.firstName} ${filmmaker.lastName}`}
                            style={{
                              width: "30px",
                              height: "30px",
                              borderRadius: "25%",
                            }}
                          />
                        </div>
                        <div>
                          {filmmaker.firstName} {filmmaker.lastName || ""}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div style={{ padding: "5px" }}>
                      {t("No filmmaker found.")}
                    </div>
                  )}
                </div>
              )}
              {selectedFilmmakers.length > 0 && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "20px",
                  }}
                >
                  <button className="btn-send" onClick={sendRecommendations}>
                    {t("Send")} <FontAwesomeIcon icon={faPaperPlane} />
                  </button>
                </div>
              )}
            </div>{" "}
          </div>
          <p
            className="follower-number-Recommend actor-detail-item"
            style={{ fontSize: "24px" }}
          >
            {recommendations}
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
        {isModalVisible && (
          <div
            style={{
              color: "#1e0039",
              ontWeight: "bold",
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {t("Recommendation sent successfully!")}
          </div>
        )}
         <div>
        {studioData && (
      <>
        <p
          className="text-purple-800 text-3xl font-bold ml-5"
          style={{
            //display: "inline",
            padding:"0px",
            marginLeft: "500px",
            color: "#1E0039",
            fontSize: "24px",
            fontWeight: "700",
          }}
        >
          {t("Representated by:")} {studioData ? studioData.name || 'N/A' : ''}
        </p>
      </>
    )}
        </div>
        <div className="actor-city-container">
          <div className="actor-city-detail">
            <img
              src={worldIcon}
              style={{ width: "55px", height: "45px", display: "inline" }}
              alt=""
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
                {t("Age-Range")}
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
                {t("Ethnicity")}{" "}
              </span>{" "}
              <span>{epkInfo.ethnicity}</span>
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
                {t("Hair Color")}{" "}
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
                {t("Eye Color")}{" "}
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
                {t("Body Build")}{" "}
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
                {t("Height")}{" "}
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
            {t("current films by actor")} {epkInfo.firstName} {epkInfo.lastName}
          </p>
          <div className="movie-actor-play-container">
            {/* TODO: getMoviesByActor */}
            <div>{/* <List /> */}</div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
