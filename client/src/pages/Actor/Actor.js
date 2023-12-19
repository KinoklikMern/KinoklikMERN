import React, { useState, useEffect, useRef } from "react";
import "./Actor.css";
import worldIcon from "../../images/icons/noun-world-icon.svg";
import ActorPageHeader from "../../components/EpkView/EpkHeader/ActorPageHeader";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/Footer";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// import starIcon from "../../images/icons/Star FULL.svg";
// import refralIcon from "../../images/icons/referral sign.svg";
import http from "../../http-common";
import {
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
} from "@mui/icons-material";
import StarIcon from "@mui/icons-material/Star";
import AddIcon from "@mui/icons-material/Add";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
// import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { addToChat } from "../../api/epks";
import { useTranslation } from "react-i18next";
import { getMoviesByActors } from "../../api/epks";
import emptyBanner from "../../images/empty_banner.jpeg";
import { faMessage } from "@fortawesome/free-solid-svg-icons";

export default function Actor(props) {
  const { t } = useTranslation();
  const [epkInfo, setEpkInfo] = useState({});
  const { id } = useParams();
  const [kkFollower, setKKFollower] = useState([]);
  const [range, setRange] = useState(2);
  // const [isMoved, setIsMoved] = useState(false);
  // const [slideNumber, setSlideNumber] = useState(0);
  const [pics, setPics] = useState([]);
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
  const [epksList, setEpksList] = useState([]);
  const [showVideoErrorMsg, setShowVideoErrorMsg] = useState(false);

  const navigate = useNavigate();

  // fetching user
  const user = useSelector((state) => state.user);
  let userId;
  if (!user) {
    userId = "0";
  } else {
    userId = user.id;
  }

  const userIsFilmmaker = user && user.role === "Filmmaker";
  const isOwnActorPage = user && user.id === id;

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
    const biography = document.querySelector(".actor-biography");
    if (biography) {
      const contentLength = biography.textContent.length;
      console.log("Biography Character Length: " + contentLength);
      if (contentLength > 500) {
        biography.classList.add("scrollable");
      }
    }
  }, [epkInfo]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetching actor and users data
        const [actorResponse, usersResponse] = await Promise.all([
          http.get(`/users/getactor/${id}`),
          http.get("/users/getallusers"),
        ]);

        const actorData = actorResponse.data;
        setEpkInfo(actorData);

        // Check if bannerImg exists and is valid
        if (!actorData.bannerImg || actorData.bannerImg.startsWith("https")) {
          setShowVideoErrorMsg(true);
        }

        const images = actorData.picture.startsWith("https")
          ? []
          : [actorData.picture];

        // const imagesToPush = actorData.profiles.map((picture) => {
        //   if (picture !== null && undefined && "") {
        //     images.push(picture);
        //   }
        // });

        actorData.profiles.forEach((picture) => {
          if (picture) {
            images.push(picture);
          }
        });

        setPics(images);
        setAge(actorData.age);
        setLikes(actorData.likes.length);
        setKKFollower(actorData.kkFollowers.length);
        setRecommendations(actorData.recommendations);
        setAllUserList(usersResponse.data);

        // Fetch studio data
        const studioResponse = await http.get(
          `${process.env.REACT_APP_BACKEND_URL}/company/getCompanyByUser/${id}`
        );
        if (studioResponse.data) {
          setStudioData(studioResponse.data);
        }

        // Fetch movies by actor
        const movies = await getMoviesByActors(id);
        setEpksList(movies);
      } catch (error) {
        console.error("An error occurred while fetching data.", error);
      }
    };

    fetchData();
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
      const firstName = user.firstName.toLowerCase();
      const lastName = user.lastName.toLowerCase();
      return (
        // user.role === "Filmmaker" &&
        // (user.firstName + " " + (user.lastName || ""))
        //   .toLowerCase()
        //   .includes(searchWord)
        (user.role === "Filmmaker" &&
          Array.from({ length: searchWord.length }).every(
            (_, index) => firstName[index] === searchWord[index]
          )) ||
        Array.from({ length: searchWord.length }).every(
          (_, index) => lastName[index] === searchWord[index]
        )
      );
    });
    if (!searchWord.trim() || newFilter.length === 0) {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  // const handleClick = (direction) => {
  //   if (direction === "left" && indexPic > 0) {
  //     setPicIndex(indexPic - 1);
  //   } else if (direction === "right" && indexPic < pics.length - 1) {
  //     setPicIndex(indexPic + 1);
  //   }
  // };

  const handleClick = (direction) => {
    if (direction === "left") {
      // Move to the previous image
      setPicIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : pics.length - 1
      );
    } else if (direction === "right") {
      // Move to the next image
      setPicIndex((prevIndex) =>
        prevIndex < pics.length - 1 ? prevIndex + 1 : 0
      );
    }
  };

  // const playVideo = () => {
  //   const video = videoRef.current;
  //   if (isPlaying) {
  //     video.pause();
  //   } else {
  //     video.play();
  //   }
  //   setIsPlaying(!isPlaying);
  // };

  const playVideo = () => {
    const video = videoRef.current;
    if (video && video.src) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
      setIsPlaying(!isPlaying);
      setShowVideoErrorMsg(false);
    } else {
      setShowVideoErrorMsg(true);
    }
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
      {/*IMAGES + VIDEO */}
      {/* <div className="actor-container"> */}
      <div className="tw-w-9/10 tw-mx-[5%] tw-h-auto tw-max-w-full tw-rounded-[40px] tw-bg-white">
        <div className="tw-relative">
          {epkInfo.bannerImg ? (
            <div className="video-container">
              <video
                loop
                ref={videoRef}
                className="tw-z-[-1] tw-block  tw-w-full tw-bg-[#1e0039] tw-bg-cover "
                src={
                  epkInfo.bannerImg && !epkInfo.bannerImg.startsWith("https")
                    ? `${process.env.REACT_APP_AWS_URL}/${epkInfo.bannerImg}`
                    : null
                }
                poster={
                  epkInfo.thumbnail && !epkInfo.thumbnail.startsWith("https")
                    ? `${process.env.REACT_APP_AWS_URL}/${epkInfo.thumbnail}`
                    : null
                }
                controls
              ></video>
              <div
                className="tw-absolute tw-left-1/2 tw-top-1/2  tw-flex tw-items-center tw-justify-center"
                onClick={playVideo}
                style={{ display: showVideoErrorMsg ? "none" : "flex" }}
              >
                {isPlaying ? (
                  <PauseCircleOutlineIcon
                    className=""
                    style={{ color: "#1E0039", fontSize: "3rem" }}
                  />
                ) : (
                  <PlayCircleIcon
                    className=""
                    style={{ color: "#1E0039", fontSize: "3rem" }}
                  />
                )}
              </div>
            </div>
          ) : null}
          {showVideoErrorMsg && (
            <p className="md:tw-txsm:tw-text-[15px] xsm:tw-text-[5px] tw-absolute tw-left-1/2 tw-top-1/2 tw--translate-x-1/2 tw--translate-y-1/2 tw-transform tw-text-center tw-text-[10px] tw-text-white sm:tw-text-[10px] lg:tw-text-[20px]">
              Video source not available
            </p>
          )}
          {/* Image Container with Arrows */}
          {pics.length > 0 && (
            <div
              className="tw-absolute tw-left-[3%] tw-top-[10%] tw-z-10 tw-h-[80%] tw-w-[35%]"
              style={{
                backgroundImage: `url(${process.env.REACT_APP_AWS_URL}/${pics[indexPic]})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                opacity: isPlaying ? 0.4 : 1, // opacity change
              }}
            >
              <ArrowBackIosOutlined
                className="xs:tw-text-xl tw-absolute tw-left-0 tw-top-1/2 tw--translate-y-1/2 tw-cursor-pointer tw-text-3xl tw-text-white sm:tw-text-2xl"
                // className="arrow-actor-profile arrow-actor-profile1"
                onClick={() => handleClick("left")}
                style={
                  {
                    // color: "#1E0039",
                    // fontSize: "4rem",
                    // display: "inline",
                    // height: "4rem",
                  }
                }
              />
              <ArrowForwardIosOutlined
                className="xs:tw-text-xl tw-absolute tw-right-0 tw-top-1/2 tw--translate-y-1/2 tw-cursor-pointer tw-text-3xl tw-text-white sm:tw-text-2xl"
                // className="arrow-actor-profile arrow-actor-profile2"
                onClick={() => handleClick("right")}
                // style={{
                //   color: "#1E0039",
                //   fontSize: "4rem",
                //   display: "inline",
                //   height: "4rem",
                // }}
              />
            </div>
          )}

          {/* <div className="tw-absolute tw-top-1/2 tw-left-1/2 tw-transform tw--translate-x-1/2 tw--translate-y-1/2 ">
         
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
          </div> */}
        </div>

        <div className="tw-m-4  tw-grid tw-grid-cols-12 tw-items-center md:tw-justify-center">
          {/* First Row: Actor's Name, Gender, Role, Play Picture, Number of Play, Message */}

          {/*Actorès name*/}
          <p className="tw-text-md tw-col-span-4 tw-text-center tw-font-bold tw-text-black md:tw-col-span-2 lg:tw-col-span-1">
            {epkInfo.firstName} {epkInfo.lastName}
          </p>
          {/*Gender*/}
          <p className="tw-text-md md: tw-col-span-2 tw-text-center tw-font-bold tw-text-black md:tw-col-span-1">
            {displaySex(epkInfo.sex)}
          </p>

          {/*Role*/}
          <p className="tw-text-md tw-col-span-2 tw-text-center tw-font-bold  tw-text-black md:tw-col-span-1">
            {t("Actor")}
          </p>

          {/* Play Picture and Number of Play */}
          <div className="tw-col-span-2 tw-flex tw-flex-row tw-items-center md:tw-col-span-1">
            <img src="../Vector.png" alt="" className="tw-h-6 tw-w-9" />
            {/*Number of play*/}
            <p
              className=" follower-number actor-detail-item"
              style={{
                color: "black",
                // fontSize: "24px"
              }}
            >
              {epksList.length}
            </p>
          </div>

          {/*Message*/}
          {!isOwnActorPage && (
            <div className="tw-col-span-2 tw-bg-white tw-text-center tw-text-lg md:tw-col-span-1 md:tw-text-2xl">
              <button
                onClick={() => {
                  const chatUrl = userIsFilmmaker
                    ? `/dashboard/chat/${id}`
                    : `/userdashboard/chat/${id}`;
                  navigate(chatUrl);
                }}
                className="tw-bg-white"
              >
                <FontAwesomeIcon
                  icon={faMessage}
                  style={{
                    width: "37px",
                    height: "25px",
                  }}
                />
              </button>
            </div>
          )}

          {/*Follow button*/}

          <button
            className="tw-col-span-6 tw-flex tw-h-9 tw-max-w-[150px] tw-items-center tw-justify-center tw-rounded-full tw-border-none tw-bg-[#712cb0] tw-px-4 tw-text-[0.75rem] tw-font-bold tw-text-white  md:tw-col-span-1 "
            style={{ justifySelf: "end" }}
            onClick={addUserToFollowers}
          >
            <span className="tw-hidden md:tw-hidden lg:tw-inline">
              {t("Follow")}
            </span>
            <AddIcon className="actor-page-star" style={{ color: "white" }} />
          </button>

          {/*Number of followers*/}
          <p
            className="follower-number actor-detail-item"
            style={{ fontSize: "24px" }}
          >
            {kkFollower}
          </p>

          {/*Selected*/}

          <button
            className="tw-col-span-6 tw-flex tw-h-9 tw-max-w-[150px] tw-items-center tw-justify-center tw-rounded-full tw-border-none tw-bg-[#712cb0] tw-px-4 tw-text-[0.75rem] tw-font-bold tw-text-white tw-transition-all tw-duration-200 md:tw-col-span-1 "
            style={{ justifySelf: "end" }}
            onClick={addUserToLikes}
          >
            <span className="tw-hidden md:tw-hidden lg:tw-inline">
              {t("Star")}
            </span>
            <StarIcon
              className="actor-page-star"
              style={{ color: "white", 
              // marginLeft: "10px" 
            }}
            />
          </button>
          {/*Number of added to selected*/}
          <p
            className="follower-number actor-detail-item"
            style={{ fontSize: "24px" }}
          >
            {likes}
          </p>

          {/*Recommended*/}
          <button
            className="tw-col-span-6 tw-flex tw-h-9 tw-max-w-[150px] tw-items-center tw-justify-center tw-rounded-full tw-border-none tw-bg-[#712cb0] tw-px-4 tw-text-[0.75rem] tw-font-bold tw-text-white tw-transition-all tw-duration-200 md:tw-col-span-1 "
            style={{ justifySelf: "end" }}
            onClick={openModal}
            disabled={epkInfo._id === (user ? user.id : null)}
          >
            <span className="tw-hidden md:tw-hidden lg:tw-inline">
              {t("Recommend")}
            </span>{" "}
            <ConnectWithoutContactIcon
              className="actor-page-star"
              style={{ color: "white", 
              // marginLeft: "10px" 
            }}
            />
          </button>
          {/*Big div with modal window - do not touch*/}
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
                placeholder={t("Search name ...")}
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
                          maxWidth: "100%", // Set maximum width to 100%
                          height: "auto", // Allow height to adjust proportionally
                          borderRadius: "50%", // Make it a circle
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
                          style={{
                            marginRight: "30px",
                            marginBottom: "10px",
                          }}
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
          {/*Number of recommendations*/}
          <p
            className="follower-number actor-detail-item"
            style={{ fontSize: "24px" }}
          >
            {recommendations}
          </p>
          {/* Play Picture and Number of Play */}
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
              {/* Represented by */}
              <p className="tw-text-black-800 tw-lg:ml-5 tw-md:text-center tw-sm:text-center tw-ml-5 tw-px-12 tw-py-4 tw-text-3xl tw-text-xl tw-font-bold tw-font-bold tw-text-[#1E0039]">
                {t("Represented by:")}{" "}
                {studioData ? studioData.name || "N/A" : ""}
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
                display: "flex",
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
                  marginRight: "70px",
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
          {epksList && epksList.length > 0 && (
            <p className="bottom-actor-container-title">
              {t("Current films by actor")}{" "}
              <span style={{ fontWeight: "bolder" }}>
                {epkInfo.firstName} {epkInfo.lastName}
              </span>
            </p>
          )}
          {epksList && epksList.length > 0 && (
            <div className="movie-actor-play-container">
              {epksList.map((epk) => {
                return (
                  <a
                    key={epk._id}
                    href={
                      epk.title
                        ? `/epk/${epk.title.replace(/ /g, "-").trim()}`
                        : "/"
                    }
                  >
                    <div className="listItem">
                      <img
                        src={
                          epk.image_details
                            ? epk.banner_url.startsWith("https")
                              ? epk.image_details
                              : `${process.env.REACT_APP_AWS_URL}/${epk.image_details}`
                            : emptyBanner
                        }
                        alt={epk.title}
                      />
                      {/* <p>{epk.title}</p> */}
                    </div>
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
