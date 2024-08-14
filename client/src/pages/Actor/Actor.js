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
  // eslint-disable-next-line no-unused-vars
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
    if (userId === "0") {
      alert(t("Please log in first!"));
      return;
    }
    http.post(`/users/follow/${id}/${userId}`).then((res) => {
      setKKFollower(res.data.kkFollowers.length);
    });
  }
  // user is added to the list of star(likes)
  function addUserToLikes() {
    if (userId === "0") {
      alert(t("Please log in first!"));
      return;
    }
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

    console.log("User Role:", user.role); // Add this
    console.log("Selected Filmmakers:", selectedFilmmakers); // Add this

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

  const playVideo = () => {
    const video = videoRef.current;
    if (video && video.src) {
      if (video.paused) {
        video
          .play()
          .then(() => {
            setIsPlaying(true);
            setShowVideoErrorMsg(false);
          })
          .catch((error) => {
            console.error("Error playing video:", error);
            setShowVideoErrorMsg(true);
          });
      } else {
        video.pause();
        setIsPlaying(false);
      }
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
    if (userId === "0") {
      alert(t("Please log in first!"));
      return;
    }

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
      <div className="tw-w-9/10 tw-mx-[5%] tw-mb-[5%] tw-h-auto tw-max-w-full tw-rounded-[40px] tw-bg-white">
        {/* Original Layout for Larger Screens */}
        <div className="tw-relative tw-hidden md:tw-block">
          {epkInfo.bannerImg ? (
            <div className="video-container">
              <video
                loop
                ref={videoRef}
                className="tw-z-[-1] tw-block tw-w-full tw-bg-[#1e0039] tw-bg-cover"
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
                className="tw-absolute tw-left-1/2 tw-top-1/2 tw-flex tw-items-center tw-justify-center"
                style={{ display: showVideoErrorMsg ? "none" : "flex" }}
              >
                {isPlaying ? (
                  <PauseCircleOutlineIcon
                    className="tw-cursor-pointer"
                    style={{ color: "#1E0039", fontSize: "3rem" }}
                    onClick={playVideo}
                  />
                ) : (
                  <PlayCircleIcon
                    className="tw-cursor-pointer"
                    style={{ color: "#1E0039", fontSize: "3rem" }}
                    onClick={playVideo}
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
          {pics.length > 0 && (
            <div
              className="tw-absolute tw-left-0 tw-top-[10%] tw-z-10 tw-h-[80%] tw-w-full md:tw-left-[3%] md:tw-w-[35%]"
              style={{
                backgroundImage: `url(${process.env.REACT_APP_AWS_URL}/${pics[indexPic]})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                opacity: isPlaying ? "0.4" : "1",
              }}
            >
              <ArrowBackIosOutlined
                className="xs:tw-text-xl tw-absolute tw-left-0 tw-top-1/2 tw--translate-y-1/2 tw-cursor-pointer tw-text-3xl tw-text-white sm:tw-text-2xl"
                onClick={() => handleClick("left")}
              />
              <ArrowForwardIosOutlined
                className="xs:tw-text-xl tw-absolute tw-right-0 tw-top-1/2 tw--translate-y-1/2 tw-cursor-pointer tw-text-3xl tw-text-white sm:tw-text-2xl"
                onClick={() => handleClick("right")}
              />
            </div>
          )}
        </div>

        {/* Actor's Image for Small Screens */}
        {pics.length > 0 && (
          <div
            className="tw-relative tw-block tw-h-[500px] tw-w-full tw-bg-[#1e0039] tw-bg-cover md:tw-hidden"
            style={{
              backgroundImage: `url(${process.env.REACT_APP_AWS_URL}/${pics[indexPic]})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              opacity: isPlaying ? 0.4 : 1,
            }}
          >
            <ArrowBackIosOutlined
              className="xs:tw-text-xl tw-absolute tw-left-0 tw-top-1/2 tw--translate-y-1/2 tw-cursor-pointer tw-text-3xl tw-text-white sm:tw-text-2xl"
              onClick={() => handleClick("left")}
            />
            <ArrowForwardIosOutlined
              className="xs:tw-text-xl tw-absolute tw-right-0 tw-top-1/2 tw--translate-y-1/2 tw-cursor-pointer tw-text-3xl tw-text-white sm:tw-text-2xl"
              onClick={() => handleClick("right")}
            />
          </div>
        )}

        {/* Reordered Content for Small Screens */}
        <div className="tw-grid tw-grid-cols-1 tw-gap-4 tw-p-4 md:tw-hidden">
          <div className="tw-flex tw-items-center tw-justify-around">
            <div className="tw-flex tw-items-center tw-gap-4">
              <p className="tw-text-md tw-text-center tw-font-bold tw-text-black">
                {t("Actor")}
              </p>
              <p className="tw-text-md tw-text-center tw-font-bold tw-text-black">
                {displaySex(epkInfo.sex)}
              </p>
            </div>
            <p className="tw-text-center tw-text-xl tw-font-bold tw-text-black">
              {epkInfo.firstName} {epkInfo.lastName}
            </p>
            <p className="tw-text-md tw-text-center tw-font-bold tw-text-black">
              {epkInfo.city}
            </p>
          </div>

          <div className="tw-flex tw-w-full tw-flex-col tw-items-center tw-justify-center">
            <div className="tw-flex tw-w-full tw-flex-row tw-flex-wrap tw-items-center tw-justify-center">
              <div className="tw-m-1 tw-flex tw-w-auto tw-flex-col md:tw-m-2">
                <button
                  className="tw-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-full tw-bg-[#712cb0] tw-px-3 tw-py-2 tw-text-[0.7rem] tw-font-bold tw-text-white md:tw-px-4 md:tw-text-[0.85rem]"
                  onClick={addUserToFollowers}
                >
                  {t("Follow")}
                  <AddIcon
                    className="tw-ml-1 tw-h-4 tw-w-4 md:tw-ml-2 md:tw-h-5 md:tw-w-5"
                    style={{ color: "white" }}
                  />
                </button>
                <p className="follower-number actor-detail-item tw-my-1 tw-text-center tw-text-base tw-font-bold tw-text-black md:tw-text-xl">
                  {kkFollower}
                </p>
              </div>

              <div className="tw-m-1 tw-flex tw-w-auto tw-flex-col md:tw-m-2">
                <button
                  className="tw-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-full tw-bg-[#712cb0] tw-px-3 tw-py-2 tw-text-[0.7rem] tw-font-bold tw-text-white md:tw-px-4 md:tw-text-[0.85rem]"
                  onClick={addUserToLikes}
                >
                  {t("Star")}
                  <StarIcon
                    className="tw-ml-1 tw-h-4 tw-w-4 md:tw-ml-2 md:tw-h-5 md:tw-w-5"
                    style={{ color: "white" }}
                  />
                </button>
                <p className="follower-number actor-detail-item tw-my-1 tw-text-center tw-text-base tw-font-bold tw-text-black md:tw-text-xl">
                  {likes}
                </p>
              </div>

              <div className="tw-m-1 tw-flex tw-w-auto tw-flex-col md:tw-m-2">
                <button
                  className="tw-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-full tw-bg-[#712cb0] tw-px-3 tw-py-2 tw-text-[0.7rem] tw-font-bold tw-text-white md:tw-px-4 md:tw-text-[0.85rem]"
                  onClick={openModal}
                  disabled={epkInfo._id === (user ? user.id : null)}
                >
                  {t("Recommend")}
                  <ConnectWithoutContactIcon
                    className="tw-ml-1 tw-h-4 tw-w-4 md:tw-ml-2 md:tw-h-5 md:tw-w-5"
                    style={{ color: "white" }}
                  />
                </button>
                <p className="follower-number actor-detail-item tw-my-1 tw-text-center tw-text-base tw-font-bold tw-text-black md:tw-text-xl">
                  {recommendations}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Original Layout for Larger Screens */}
        <div className="tw-m-4 tw-hidden tw-grid-cols-12 tw-items-center md:tw-grid md:tw-justify-center">
          <p className="tw-col-span-4 tw-text-center tw-text-xl tw-font-bold tw-text-black md:tw-col-span-2">
            {epkInfo.firstName} {epkInfo.lastName}
          </p>
          <p className="tw-text-md md: tw-col-span-2 tw-text-center tw-font-bold tw-text-black md:tw-col-span-1">
            {displaySex(epkInfo.sex)}
          </p>
          <p className="tw-text-md tw-col-span-2 tw-text-center tw-font-bold tw-text-black md:tw-col-span-1">
            {t("Actor")}
          </p>
          <div className="tw-col-span-2 tw-flex tw-flex-row tw-items-center md:tw-col-span-1">
            <img src="../Vector.png" alt="" className="tw-h-6 tw-w-9" />
            <p
              className="follower-number actor-detail-item tw-my-0"
              style={{ color: "black" }}
            >
              {epksList.length}
            </p>
          </div>
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
          <button
            className="tw-col-span-6 tw-flex tw-h-9 tw-max-w-[150px] tw-items-center tw-justify-center tw-rounded-full tw-border-none tw-bg-[#712cb0] tw-px-4 tw-text-[0.75rem] tw-font-bold tw-text-white md:tw-col-span-1"
            style={{ justifySelf: "end" }}
            onClick={addUserToFollowers}
          >
            <span className="tw-hidden md:tw-hidden lg:tw-inline">
              {t("Follow")}
            </span>
            <AddIcon className="actor-page-star" style={{ color: "white" }} />
          </button>
          <p
            className="follower-number actor-detail-item tw-my-0"
            style={{ fontSize: "24px" }}
          >
            {kkFollower}
          </p>
          <button
            className="tw-col-span-6 tw-flex tw-h-9 tw-max-w-[150px] tw-items-center tw-justify-center tw-rounded-full tw-border-none tw-bg-[#712cb0] tw-px-4 tw-text-[0.75rem] tw-font-bold tw-text-white tw-transition-all tw-duration-200 md:tw-col-span-1"
            style={{ justifySelf: "end" }}
            onClick={addUserToLikes}
          >
            <span className="tw-hidden md:tw-hidden lg:tw-inline">
              {t("Star")}
            </span>
            <StarIcon className="actor-page-star" style={{ color: "white" }} />
          </button>
          <p
            className="follower-number actor-detail-item tw-my-0"
            style={{ fontSize: "24px" }}
          >
            {likes}
          </p>
          <button
            className="tw-col-span-6 tw-flex tw-h-9 tw-max-w-[150px] tw-items-center tw-justify-center tw-rounded-full tw-border-none tw-bg-[#712cb0] tw-px-4 tw-text-[0.75rem] tw-font-bold tw-text-white tw-transition-all tw-duration-200 md:tw-col-span-1"
            style={{ justifySelf: "end" }}
            onClick={openModal}
            disabled={epkInfo._id === (user ? user.id : null)}
          >
            <span className="tw-hidden md:tw-hidden lg:tw-inline">
              {t("Recommend")}
            </span>
            <ConnectWithoutContactIcon
              className="actor-page-star"
              style={{ color: "white" }}
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
                placeholder={t("Search name ...")}
                onChange={handleSearch}
              />
              <div className="selected-filmmakers-display">
                {selectedFilmmakers.map((filmmaker, index) => (
                  <div key={index} className="selected-filmmaker-display">
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <img
                        src={filmmaker.picture}
                        alt={filmmaker.firstName}
                        style={{
                          display: "inline",
                          maxWidth: "100%",
                          height: "auto",
                          borderRadius: "50%",
                          marginRight: "10px",
                        }}
                      />
                      {filmmaker.firstName} {filmmaker.lastName || ""}
                    </div>
                    <button
                      style={{
                        background: "transparent",
                        marginRight: "30px",
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
            </div>
          </div>
          <p
            className="follower-number actor-detail-item tw-my-0"
            style={{ fontSize: "24px" }}
          >
            {recommendations}
          </p>
        </div>

        {/* Biography Section */}
        <div className="tw-m-4 tw-rounded-lg tw-bg-white tw-p-4">
          <p>{epkInfo.aboutMe}</p>
        </div>

        {/* Represented By Section */}
        {studioData && (
          <div className="tw-m-4 tw-flex tw-items-center tw-justify-center tw-rounded-lg tw-bg-white md:tw-justify-start md:tw-p-4">
            <div className="tw-flex tw-gap-3 md:tw-w-1/2">
              <p className="tw-text-black-800 tw-lg:ml-5 tw-md:text-center tw-sm:text-center tw-text-xl tw-text-[#1E0039]">
                {t("Represented by:")}{" "}
              </p>
              <p className="tw-text-black-800 tw-lg:ml-5 tw-md:text-center tw-sm:text-center tw-text-xl tw-font-bold tw-text-[#1E0039]">
                {studioData ? studioData.name || "N/A" : ""}
              </p>
            </div>
            <div className="tw-hidden md:tw-block">
              <img
                src={worldIcon}
                style={{ width: "55px", height: "45px", display: "inline" }}
                alt="globe icon"
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
          </div>
        )}

        {/* Video Section for Small Screens */}
        <div className="tw-relative tw-block md:tw-hidden">
          {epkInfo.bannerImg ? (
            <div className="video-container">
              <video
                loop
                ref={videoRef}
                className="tw-z-[-1] tw-mb-3 tw-block tw-w-full tw-rounded-none"
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
                className="tw-absolute tw-left-1/2 tw-top-1/2 tw-flex tw-items-center tw-justify-center"
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
        </div>

        {/* Age-Range, Ethnicity, etc. Section */}
        <div className="tw-m-9 tw-hidden tw-grid-cols-2 tw-gap-4 md:tw-grid">
          <p className="tw-font-bold tw-text-black">
            {t("Age-Range")}: {age_range[range][0]} - {age_range[range][1]}
          </p>
          <p className="tw-font-bold tw-text-black">
            {t("Ethnicity")}: {epkInfo.ethnicity}
          </p>
          <p className="tw-font-bold tw-text-black">
            {t("Hair Color")}: {epkInfo.hairColor}
          </p>
          <p className="tw-font-bold tw-text-black">
            {t("Eye Color")}: {epkInfo.eyesColor}
          </p>
          <p className="tw-font-bold tw-text-black">
            {t("Body Build")}: {epkInfo.bodyBuild}
          </p>
          <p className="tw-font-bold tw-text-black">
            {t("Height")}: {epkInfo.height}
          </p>
        </div>

        {/* Current Films by Actor Section */}
        {epksList && epksList.length > 0 && (
          <div className="tw-h-[36rem] tw-overflow-x-auto tw-rounded-lg tw-bg-gray-100 tw-p-4 tw-text-center">
            <p className="tw-py-4 tw-font-semibold">
              {t("Current films by actor")}{" "}
              <span style={{ fontWeight: "bolder" }}>
                {epkInfo.firstName} {epkInfo.lastName}
              </span>
            </p>
            <div className="tw-flex tw-flex-col tw-gap-4 md:tw-flex-row">
              {epksList.map((epk) => (
                <a
                  key={epk._id}
                  href={`/epk/${epk._id}`}
                  className="tw-block md:tw-inline-block"
                >
                  <div className="listItem tw-py-4 md:tw-py-0">
                    <img
                      src={
                        epk.image_details
                          ? epk.banner_url.startsWith("https")
                            ? epk.image_details
                            : `${process.env.REACT_APP_AWS_URL}/${epk.image_details}`
                          : emptyBanner
                      }
                      alt={epk.title}
                      className="tw-h-[200px] tw-w-full tw-object-cover md:tw-h-full md:tw-min-w-[300px]"
                    />
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
