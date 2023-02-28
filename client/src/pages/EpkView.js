import React, { useState, useEffect, Fragment } from "react";
import { useSelector } from "react-redux";
import http from "../http-common";
import Navbar from "../components/navbar/Navbar";
import { useParams, Link } from "react-router-dom";
import style from "./EpkView.module.css";
import kikSatr from "../images/Kickstarter-icon.png";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcons from "@mui/icons-material/Facebook";
import TwitterIcons from "@mui/icons-material/Twitter";
import Footer from "../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDollarSign,
  faSave,
  faShareAlt,
  faPlusCircle,
  faStar,
  faSearch,
  faEnvelope,
  faEllipsisVertical,
  faPeopleLine,
  faFlag,
  faCircleInfo,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  RedditShareButton,
  RedditIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share";
import Login from "../components/Auth/Registration/loginFromViewPage";
import Axios from "axios";

function EpkView() {
  let { title } = useParams();

  // fetching user
  const { user } = useSelector((user) => ({ ...user }));
  let userId;
  let userRole;
  if (!user) {
    userId = "0";
    userRole = "noUser";
  } else {
    userId = user.id;
    userRole = user.role;
  }

  const [fepkData, setFepkData] = useState({});
  const [crewList, setCrewList] = useState([]);
  const [usersWishesToBuy, setUsersWishesToBuy] = useState(0);
  const [usersFavourites, setUsersFavourites] = useState(0);
  const [usersLikes, setUsersLikes] = useState(0);
  const [mediumSynopsis, setMediumSynopsis] = useState([]);
  const [longSynopsis, setLongSynopsis] = useState([]);
  const [uniqueness, setUniqueness] = useState([]);
  const [stills, setStills] = useState([]);
  const [stillsImages, setStillsImages] = useState([]);
  let stillsImg = [];
  const [resources, setResources] = useState([]);
  const [trailer, setTrailer] = useState([]);
  const [followers, setFollowers] = useState({});
  const [reviews, setReviews] = useState([]);
  const [report, setReport] = useState({
    userId: userId,
    reason: "Spam",
    comment: ""
  });
  const [sharingClicked, setSharingClicked] = useState(false);
  const urlShare = "https://www.google.com"; ///window.location.href

  let mediumFakeText =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit," +
    "sed do eiusmod tempor incididunt ut labore et dolore magna" +
    "aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco" +
    "laboris nisi ut aliquip ex ea commodo consequat.";

  let longFakeText =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit," +
    "sed do eiusmod tempor incididunt ut labore et dolore magna" +
    "aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco" +
    "laboris nisi ut aliquip ex ea commodo consequat." +
    "sed do eiusmod tempor incididunt ut labore et dolore magna" +
    "aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco" +
    "laboris nisi ut aliquip ex ea commodo consequat.";

  let count = 0;

  useEffect(() => {
    http.get(`fepks/byTitle/${title}`).then((response) => {
      setFepkData(response.data);
      setCrewList(response.data.crew);
      setUsersWishesToBuy(response.data.wishes_to_buy.length);
      setUsersFavourites(response.data.favourites.length);
      setUsersLikes(response.data.likes.length);
      setMediumSynopsis(response.data.mediumSynopsis);
      setLongSynopsis(response.data.longSynopsis);
      setUniqueness(response.data.uniqueness);
      setStills(response.data.stillsApproval);
      setStillsImages(response.data.stills);
      setResources(response.data.resources);
      setTrailer(response.data.trailer);
      setReviews(response.data.reviews);
      http.get(`/fepks/followers/${response.data._id}`).then((res) => {
        setFollowers(res.data);
      });
    });
  }, []);

  stillsImages.map((still) => {
    stillsImg.push(still.image);
  });

  // user is added to request list for medium Synopsis
  function addtoMediumSynopsis() {
    http
      .get(`fepks/mediumSynopsis/${fepkData._id}/${userId}`)
      .then((response) => {
        setMediumSynopsis(response.data.mediumSynopsis);
      });
  }

  // user is added to request list for long Synopsis
  function addtoLongSynopsis() {
    http
      .get(`fepks/longSynopsis/${fepkData._id}/${userId}`)
      .then((response) => {
        setLongSynopsis(response.data.longSynopsis);
      });
  }

  // user is added to request list for uniqueness
  function addtoUniqueness() {
    http.get(`fepks/uniqueness/${fepkData._id}/${userId}`).then((response) => {
      setUniqueness(response.data.uniqueness);
    });
  }

  // user is added to request list for Stills
  function addtoStills() {
    http.get(`fepks/stills/${fepkData._id}/${userId}`).then((response) => {
      setStills(response.data.stillsApproval);
    });
  }

  // user is added to the list of $
  function addUserToWishesToBuy() {
    http.get(`fepks/wishestobuy/${fepkData._id}/${userId}`).then((response) => {
      setUsersWishesToBuy(response.data.wishes_to_buy.length);
    });
  }

  // user is added to the list of +
  function addUserToFavourites() {
    http.get(`fepks/favourite/${fepkData._id}/${userId}`).then((response) => {
      setUsersFavourites(response.data.favourites.length);
    });
  }

  // user is added to the list of star(likes)
  function addUserToLikes() {
    http.get(`fepks/like/${fepkData._id}/${userId}`).then((response) => {
      setUsersLikes(response.data.likes.length);
    });
  }

  // user is added to the list of sharings
  function addUserToSharings() {
    http.get(`fepks/sharing/${fepkData._id}/${userId}`);
    setSharingClicked(true);
  }

  function closeSharingMenu() {
    setSharingClicked(false);
  }

  function openUrl(url) {
    window.open(url);
  }

  function login() {
    document.getElementById("login").click();
  }

  const createdTime = fepkData.createdAt;
  const formatedDate = new Date(createdTime).toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
  const [isClick1, setIsClick1] = useState(false);
  const clickState1 = () => {
    setIsClick1(true);
  };
  const [isClick2, setIsClick2] = useState(false);
  const clickState2 = () => {
    setIsClick2(true);
  };

  const [isClick3, setIsClick3] = useState(false);
  const clickState3 = () => {
    setIsClick3(true);
  };
  const [isClick4, setIsClick4] = useState(false);
  const clickState4 = () => {
    setIsClick4(true);
  };
  const [isClickDot, setIsClickDot] = useState(false);
  const clickStateDot = () => {
    setIsClickDot(!isClickDot);
  };

  const [isShow, setIsShow] = useState(false);

  function makeReport() {
    setIsShow(true);
  }

  const [isClose, setIsClose] = useState(false);
  const clickClose = () => {
    setIsClose(!isClose);
    window.location.reload();
  };

  const [isClickInfoIcon1, setIsClickInfoIcon1] = useState(false);
  const clickInfoIcon1 = () => {
    setIsClickInfoIcon1(!isClickInfoIcon1);
  };
  const [isClickInfoIcon2, setIsClickInfoIcon2] = useState(false);
  const clickInfoIcon2 = () => {
    setIsClickInfoIcon2(!isClickInfoIcon2);
  };

  const [isClickInfoIcon3, setIsClickInfoIcon3] = useState(false);
  const clickInfoIcon3 = () => {
    setIsClickInfoIcon3(!isClickInfoIcon3);
  };
  const [isClickReport, setIsClickReport] = useState(false);
  const clickReport = () => {
    http.put(`/fepks/report/${fepkData._id}`, report).then((res) => {
      if(res.data.error){
        alert(res.data.error);
      }
      console.log("report sent");
    });
    console.log(report);
    setIsClickReport(true);
  };
  const handleInputChange = (event) => {
    let comment = event.target.value;
    setReport({ ...report, comment: comment });
  
  };
  function chooseReason(reason){
    setReport({ ...report, reason: reason });
  };

  return (
    <div>
      <Navbar />
      <div
        className={
          fepkData.status_pause === false
            ? style.wholeContainer
            : style.content1
        }
      >
        <div className={style.socialMedia}>
          <div>
            <p className={style.cornerText}>Total Audience Reach</p>
          </div>
          <div>
            {" "}
            <FontAwesomeIcon icon={faPeopleLine} />
          </div>
          <div className={style.totalNumber}>
            <p>
              {followers.facebook + followers.instagram + followers.twitter}
            </p>
          </div>
          <div>
            <h2 style={{ color: "pink" }}>
              {" "}
              <InstagramIcon style={{ color: "pink", fontSize: 40 }} />{" "}
              {followers.facebook}
            </h2>
          </div>
          <div>
            <h2 style={{ color: "blue" }}>
              <FacebookIcons style={{ color: "blue", fontSize: 40 }} />{" "}
              {followers.instagram}
            </h2>
          </div>
          <div>
            <h2 style={{ color: "lightblue" }}>
              <TwitterIcons style={{ color: "lightblue", fontSize: 40 }} />{" "}
              {followers.twitter}
            </h2>
          </div>
        </div>
        {/* hero section */}
        <div
          className={style.hero}
          style={{
            backgroundImage: `url(https://kinomovie.s3.amazonaws.com/${fepkData.banner_url})`,
          }}
        >
          {/* poster section */}
          <div className={style.posterContainer}>
            <div>
              <img
                src={`https://kinomovie.s3.amazonaws.com/${fepkData.image_details}`}
                alt="poster"
                className={style.imgPoster}
              ></img>
            </div>
            <div className={style.description}>
              <p className={style.centered}>{fepkData.title}</p>
            </div>
          </div>
          {/* corner section */}
          <div className={style.flexContainer}>
            <div className={style.textLeft}>
              <p className={style.pre}>{fepkData.status}</p>
              <p className={style.genre}>{fepkData.genre}</p>
              <p className={style.date}>Posted:&nbsp;{formatedDate}</p>
            </div>
            <div>
              {" "}
              <p className={style.logline}>{fepkData.logLine_short}</p>
            </div>
          </div>

          {/* report section */}

          {isClickDot === false || isClose === true ? (
            <div className={style.dotSection}>
              <FontAwesomeIcon
                onClick={() => clickStateDot()}
                icon={faEllipsisVertical}
              />
            </div>
          ) : user === null ? (
            <div className={style.reportSection}>
              <button className={style.reportBtn} onClick={() => login()}>
                <FontAwesomeIcon icon={faFlag} />
                &nbsp; Report
              </button>
            </div>
          ) : (
            <div className={style.reportSection}>
              <button
                className={style.reportBtn}
                onClick={() => {
                  makeReport();
                  setIsClickDot(false);
                }}
              >
                <FontAwesomeIcon icon={faFlag} />
                &nbsp; Report
              </button>
              <div />

              <div
                className={
                  isShow === true || isClose === false
                    ? style.reportForm
                    : style.hidden
                }
              >
                <span onClick={() => clickClose()} className={style.closeBtn}>
                  &times;
                </span>

                {isClickReport === false ? (
                  <>
                    <p className={style.reportTitle}>
                      Why are you reporting this EPK?
                    </p>
                    <form className={style.form1}>
                      <div className={style.inputContainer}>
                        <input type="text" value="Spam" onClick={() => chooseReason("Spam")} readOnly></input>
                        <FontAwesomeIcon
                          className={style.infoIcon}
                          icon={faInfoCircle}
                          onClick={() => clickInfoIcon1()}
                        />
                        {isClickInfoIcon1 === true ? (
                          <div className={style.reportMessage}>
                            This can be unwanted and unauthorized use of content
                            from another website on third-party websites in
                            connection with other content, negatively affecting
                            your experience and reputation on our platform.
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className={style.inputContainer}>
                        <input
                          type="text"
                          value="Nudity or Sexual Content"
                          onClick={() => chooseReason("Nudity or Sexual Content")}
                          readOnly
                        ></input>
                        <FontAwesomeIcon
                          className={style.infoIcon}
                          icon={faCircleInfo}
                          onClick={() => clickInfoIcon2()}
                        />
                        {isClickInfoIcon2 === true ? (
                          <div className={style.reportMessage}>
                            This can be any content that appears to be
                            pronographic, sexual exploitation or solicitation
                            and/or content that shows sexual intercourse,
                            genitals and close-ups of fully-nude buttocks.
                            Nudity in photos of paintings and sculptures are
                            permitted.
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className={style.inputContainer}>
                        <input
                          type="text"
                          value="Copyrighted Intellectual Property Violation"
                          onClick={() => chooseReason("Copyrighted Intellectual Property Violation")}
                          readOnly
                        ></input>
                        <FontAwesomeIcon
                          className={style.infoIcon}
                          icon={faCircleInfo}
                          onClick={() => clickInfoIcon3()}
                        />
                        {isClickInfoIcon3 === true ? (
                          <div className={style.reportMessage}>
                            This can be unwanted, unauthorized or unethical use
                            of content from another website, negatively
                            affecting your experience and the reputation on our
                            platform.
                          </div>
                        ) : (
                          ""
                        )}
                      </div>

                      <div className={style.inputContainer}>
                        <label for="Other">Other: </label>
                        <input
                          className={style.comment}
                          type="text"
                          name = "comment"
                          onChange={handleInputChange}
                          placeholder="type here"
                        ></input>
                        <FontAwesomeIcon
                          className={style.infoIcon}
                          icon={faCircleInfo}
                        />
                      </div>

                      <button
                        onClick={() => clickReport()}
                        className={style.submitReport}
                      >
                        Report!
                      </button>
                    </form>
                  </>
                ) : (
                  <p className={style.reportP}>
                    Thank you for reporting this film EPK. We are currently
                    inverstigation and have notified the filmmaker accordingly.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
        {/* icon-bar section */}
        <div className={style.iconContainer}>
          <div>
            <a href="#">
              {userId === "0" ? (
                <FontAwesomeIcon
                  icon={faDollarSign}
                  size="lg"
                  onClick={() => login()}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faDollarSign}
                  size="lg"
                  onClick={() => addUserToWishesToBuy()}
                />
              )}
            </a>
            <span>{usersWishesToBuy}</span>
          </div>
          <div>
            <a href="#">
              {userId === "0" ? (
                <FontAwesomeIcon
                  icon={faPlusCircle}
                  size="lg"
                  onClick={() => login()}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faPlusCircle}
                  size="lg"
                  onClick={() => addUserToFavourites()}
                />
              )}
              {/* <img className="icon" src={plusIcon} alt="save" /> */}
            </a>
            <span>{usersFavourites}</span>
          </div>
          <div>
            <a href="#">
              {userId === "0" ? (
                <FontAwesomeIcon
                  icon={faStar}
                  size="lg"
                  onClick={() => login()}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faStar}
                  size="lg"
                  onClick={() => addUserToLikes()}
                />
              )}
            </a>
            <span>{usersLikes}</span>
          </div>

          <div>
            <a href="#">
              <img
                className={style.icon}
                src={kikSatr}
                alt="save"
                onClick={() => openUrl(fepkData.kickstarter_url)}
              />
            </a>
          </div>
          <div>
            {/* Social media sharing Icons */}
            {sharingClicked === true && (
              <div
                style={{ float: "left", margin: "5px 5px 0 0" }}
                onClick={() => closeSharingMenu()}
              >
                <FacebookShareButton url={urlShare}>
                  <FacebookIcon
                    size={30}
                    round={true}
                    style={{ marginRight: "5px" }}
                  />
                </FacebookShareButton>
                <LinkedinShareButton url={urlShare}>
                  <LinkedinIcon
                    size={30}
                    round={true}
                    style={{ marginRight: "5px" }}
                  />
                </LinkedinShareButton>
                <TwitterShareButton url={urlShare}>
                  <TwitterIcon
                    size={30}
                    round={true}
                    style={{ marginRight: "5px" }}
                  />
                </TwitterShareButton>
                <RedditShareButton url={urlShare}>
                  <RedditIcon
                    size={30}
                    round={true}
                    style={{ marginRight: "5px" }}
                  />
                </RedditShareButton>
                <EmailShareButton url={urlShare}>
                  <EmailIcon size={30} round={true} />
                </EmailShareButton>
              </div>
            )}
            <a href="#">
              <FontAwesomeIcon
                icon={faShareAlt}
                size="lg"
                onMouseOver={() => addUserToSharings()}
                onClick={() => closeSharingMenu()}
              />
            </a>
          </div>
        </div>
        <Login />
        {/* details section */}
        <div className={style.detailContainer}>
          <div>
            <img
              src={`https://kinomovie.s3.amazonaws.com/${fepkData.image_details}`}
              alt="poster"
              className={style.imgDetail}
            />
          </div>
          <div className={style.middle}>
            {crewList.map((crewObj) => {
              return (
                <>
                  {crewObj.epkRole === "director" && (
                    <p>Directed by: {crewObj.crewId.name}</p>
                  )}
                  {crewObj.epkRole === "producer" && (
                    <p>Produced by: {crewObj.crewId.name}</p>
                  )}
                  {crewObj.epkRole === "writer" && (
                    <p>Writer: {crewObj.crewId.name}</p>
                  )}
                  {crewObj.epkRole === "cinematographer" && (
                    <p>Cinematographer: {crewObj.crewId.name}</p>
                  )}
                  {crewObj.epkRole === "editor" && (
                    <p>Editor: {crewObj.crewId.name}</p>
                  )}
                </>
              );
            })}
            <p>Studio: {fepkData.productionCo}</p>

            <p>Distributed by: {fepkData.distributionCo}</p>
          </div>

          <div className={style.leftDetail}>
            <p>Starring:</p>
            {crewList.map((crewObj) => {
              return (
                <>
                  {crewObj.epkRole === "lead_actor" && (
                    <p>{crewObj.crewId.name}</p>
                  )}
                  {crewObj.epkRole === "supporting_actor" && (
                    <p>{crewObj.crewId.name}</p>
                  )}
                </>
              );
            })}

            <p className={style.bottom}>
              Production Year: {fepkData.productionYear}
            </p>

            <p className={style.bottom}>
              Duration: {fepkData.durationMin} Minutes
            </p>
          </div>
        </div>
        {/* logline section */}
        <div className={style.loglineContainer}>
          <div>
            <p>{fepkData.logLine_long}</p>
          </div>
          <div>
            <img
              src={`https://kinomovie.s3.amazonaws.com/${fepkData.image_logline}`}
              alt="logline"
              className={style.imgLogline}
            ></img>
          </div>
        </div>
        {/* synopsis section */}
        <div className={style.synopsis}>
          <div>
            <h2 className={style.type}>Short Synopsis</h2>
          </div>

          <div className={style.content}>
            <img
              src={`https://kinomovie.s3.amazonaws.com/${fepkData.image_synopsis}`}
              alt="hey"
              className={style.imgSynopsis}
            />
            <h3 className={style.text}>{fepkData.text_short}</h3>
          </div>
        </div>
        {/* MEDIUM SYNOPSIS */}
        {/* the case when user not logged in and if logged in not requested yet*/}
        {userId === "0" ? (
          <div className={style.synopsis}>
            <div>
              <h2 className={style.type}>Medium Synopsis</h2>
            </div>
            <div className={style.position}>
              <button
                onClick={() => {
                  login();
                  clickState1();
                }}
                className={isClick1 === true ? style.none : style.btnSy}
              >
                {" "}
                Request Access{" "}
              </button>
            </div>
            <div className={style.content1}>
              <img
                src={`https://kinomovie.s3.amazonaws.com/${fepkData.image_synopsis}`}
                alt="hey"
                className={style.imgSynopsis}
              />
              <h3 className={style.text}>{mediumFakeText}</h3>
            </div>
          </div>
        ) : (
          (mediumSynopsis.length === 0 ||
            mediumSynopsis.filter((e) => e.user._id === userId).length ===
              0) && (
            <div className={style.synopsis}>
              <div>
                <h2 className={style.type}>Medium Synopsis</h2>
              </div>
              <div className={style.position}>
                <button
                  onClick={() => {
                    addtoMediumSynopsis();
                    clickState1();
                  }}
                  className={isClick1 === true ? style.none : style.btnSy}
                >
                  {" "}
                  Request Access{" "}
                </button>
              </div>

              <div className={style.content1}>
                <img
                  src={`https://kinomovie.s3.amazonaws.com/${fepkData.image_synopsis}`}
                  alt="hey"
                  className={style.imgSynopsis}
                />
                <h3 className={style.text}>{mediumFakeText}</h3>
              </div>
            </div>
          )
        )}
        {/* the case when user logged in and requested the approval */}
        {mediumSynopsis.map((medium) => {
          return (
            <>
              {medium.user._id === userId && medium.status === "pending" && (
                <div className={style.synopsis}>
                  <div>
                    <h2 className={style.type}>Medium Synopsis</h2>
                  </div>
                  <div className={style.position}>
                    <button className={style.btnSy}> Awaiting approval </button>
                  </div>
                  <div className={style.content1}>
                    <img
                      src={`https://kinomovie.s3.amazonaws.com/${fepkData.image_synopsis}`}
                      alt="hey"
                      className={style.imgSynopsis}
                    />
                    <h3 className={style.text}>{mediumFakeText}</h3>
                  </div>
                </div>
              )}
            </>
          );
        })}
        {/* the case when user logged in and got the approval */}
        {mediumSynopsis.map((medium) => {
          return (
            <>
              {medium.user._id === userId && medium.status === "approved" && (
                <div className={style.synopsis}>
                  <div>
                    <h2 className={style.type}>Medium Synopsis</h2>
                  </div>
                  <div>
                    <img
                      src={`https://kinomovie.s3.amazonaws.com/${fepkData.image_synopsis}`}
                      alt="hey"
                      className={style.imgSynopsis}
                    />
                    <h3 className={style.text}>{fepkData.text_medium}</h3>
                  </div>
                </div>
              )}
            </>
          );
        })}
        {/* the case when user logged in and got refused */}
        {mediumSynopsis.map((medium) => {
          return (
            <>
              {medium.user._id === userId && medium.status === "refused" && (
                <div className={style.synopsis}>
                  <div>
                    <h2 className={style.type}>Medium Synopsis</h2>
                  </div>
                  <div className={style.position}>
                    <button className={style.btnSy}> Refused </button>
                  </div>
                  <div className={style.content1}>
                    <img
                      src={`https://kinomovie.s3.amazonaws.com/${fepkData.image_synopsis}`}
                      alt="hey"
                      className={style.imgSynopsis}
                    />
                    <h3 className={style.text}>{mediumFakeText}</h3>
                  </div>
                </div>
              )}
            </>
          );
        })}
        {/* LONG SYNOPSIS */}
        {/* the case when user not logged in and if logged in not requested yet*/}
        {userId === "0" ? (
          <div className={style.synopsis}>
            <div>
              <h2 className={style.type}>Long Synopsis</h2>
            </div>
            <div className={style.position}>
              <button
                onClick={() => {
                  login();
                  clickState2();
                }}
                className={isClick2 === true ? style.none : style.btnSy}
              >
                {" "}
                Request Access{" "}
              </button>
            </div>
            <div className={style.content1}>
              <img
                src={`https://kinomovie.s3.amazonaws.com/${fepkData.image_synopsis}`}
                alt="hey"
                className={style.imgSynopsis}
              />
              <h3 className={style.text}>{longFakeText}</h3>
            </div>
          </div>
        ) : (
          (longSynopsis.length === 0 ||
            longSynopsis.filter((e) => e.user._id === userId).length === 0) && (
            <div className={style.synopsis}>
              <div>
                <h2 className={style.type}>Long Synopsis</h2>
              </div>
              <div className={style.position}>
                <button
                  onClick={() => {
                    addtoLongSynopsis();
                    clickState2();
                  }}
                  className={isClick2 === true ? style.none : style.btnSy}
                >
                  {" "}
                  Request Access{" "}
                </button>
              </div>

              <div className={style.content1}>
                <img
                  src={`https://kinomovie.s3.amazonaws.com/${fepkData.image_synopsis}`}
                  alt="hey"
                  className={style.imgSynopsis}
                />
                <h3 className={style.text}>{longFakeText}</h3>
              </div>
            </div>
          )
        )}
        {/* the case when user logged in and requested the approval */}
        {longSynopsis.map((long) => {
          return (
            <>
              {long.user._id === userId && long.status === "pending" && (
                <div className={style.synopsis}>
                  <div>
                    <h2 className={style.type}>Long Synopsis</h2>
                  </div>
                  <div className={style.position}>
                    <button className={style.btnSy}> Awaiting approval </button>
                  </div>
                  <div className={style.content1}>
                    <img
                      src={`https://kinomovie.s3.amazonaws.com/${fepkData.image_synopsis}`}
                      alt="hey"
                      className={style.imgSynopsis}
                    />
                    <h3 className={style.text}>{longFakeText}</h3>
                  </div>
                </div>
              )}
            </>
          );
        })}
        {/* the case when user logged in and got the approval */}
        {longSynopsis.map((long) => {
          return (
            <>
              {long.user._id === userId && long.status === "approved" && (
                <div className={style.synopsis}>
                  <div>
                    <h2 className={style.type}>Long Synopsis</h2>
                  </div>
                  <div>
                    <img
                      src={`https://kinomovie.s3.amazonaws.com/${fepkData.image_synopsis}`}
                      alt="hey"
                      className={style.imgSynopsis}
                    />
                    <h3 className={style.text}>{fepkData.text_long}</h3>
                  </div>
                </div>
              )}
            </>
          );
        })}
        {/* the case when user logged in and got refused */}
        {longSynopsis.map((long) => {
          return (
            <>
              {long.user._id === userId && long.status === "refused" && (
                <div className={style.synopsis}>
                  <div>
                    <h2 className={style.type}>Long Synopsis</h2>
                  </div>
                  <div className={style.position}>
                    <button className={style.btnUni}> Refused </button>
                  </div>
                  <div className={style.content1}>
                    <img
                      src={`https://kinomovie.s3.amazonaws.com/${fepkData.image_synopsis}`}
                      alt="hey"
                      className={style.imgSynopsis}
                    />
                    <h3 className={style.text}>{longFakeText}</h3>
                  </div>
                </div>
              )}
            </>
          );
        })}
        {/* UNIQUENESS section */}
        {/* the case when user not logged in and if logged in not requested yet*/}
        {userId === "0" ? (
          <div className={style.unique}>
            <p className={style.titleUnique}>{fepkData.title_uniqueness}</p>
            <div className={style.position1}>
              <button
                onClick={() => {
                  login();
                  clickState3();
                }}
                className={isClick3 === true ? style.none : style.btnUni}
              >
                {" "}
                Request Access{" "}
              </button>
            </div>
            <div className={style.uniqueContainer}>
              <div className={style.content1}>
                <img
                  src={`https://kinomovie.s3.amazonaws.com/${fepkData.image_uniqueness}`}
                  alt="uniqueness"
                  className={style.imgUnique}
                />
              </div>
              <div className={style.content1}>
                <p className={style.textUnique}>{mediumFakeText}</p>
              </div>
            </div>
          </div>
        ) : (
          (uniqueness.length === 0 ||
            uniqueness.filter((u) => u.user._id === userId).length === 0) && (
            <div className={style.unique}>
              <p className={style.titleUnique}>{fepkData.title_uniqueness}</p>

              <div className={style.position1}>
                <button
                  onClick={() => {
                    addtoUniqueness();
                    clickState3();
                  }}
                  className={isClick3 === true ? style.none : style.btnUni}
                >
                  {" "}
                  Request Access{" "}
                </button>
              </div>
              <div className={style.uniqueContainer}>
                <div className={style.content1}>
                  <img
                    src={`https://kinomovie.s3.amazonaws.com/${fepkData.image_uniqueness}`}
                    alt="uniqueness"
                    className={style.imgUnique}
                  />
                </div>
                <div className={style.content1}>
                  <p className={style.textUnique}>{mediumFakeText}</p>
                </div>
              </div>
            </div>
          )
        )}
        {/* the case when user logged in and requested the approval */}
        {uniqueness.map((unique) => {
          return (
            <>
              {unique.user._id === userId && unique.status === "pending" && (
                <div className={style.unique}>
                  <p className={style.titleUnique}>
                    {fepkData.title_uniqueness}
                  </p>
                  <div className={style.position1}>
                    <button className={style.btnUni}>
                      {" "}
                      Awaiting approval{" "}
                    </button>
                  </div>
                  <div className={style.uniqueContainer}>
                    <div className={style.content1}>
                      <img
                        src={`https://kinomovie.s3.amazonaws.com/${fepkData.image_uniqueness}`}
                        alt="uniqueness"
                        className={style.imgUnique}
                      />
                    </div>
                    <div className={style.content1}>
                      <p className={style.textUnique}>{mediumFakeText}</p>
                    </div>
                  </div>
                </div>
              )}
            </>
          );
        })}
        {/* the case when user logged in and got the approval */}
        {uniqueness.map((unique) => {
          return (
            <>
              {unique.user._id === userId && unique.status === "approved" && (
                <div className={style.unique}>
                  <p className={style.titleUnique}>
                    {fepkData.title_uniqueness}
                  </p>

                  <div className={style.uniqueContainer}>
                    <div>
                      <img
                        src={`https://kinomovie.s3.amazonaws.com/${fepkData.image_uniqueness}`}
                        alt="uniqueness"
                        className={style.imgUnique}
                      />
                    </div>
                    <div>
                      <p className={style.textUnique}>
                        {fepkData.description_uniqueness}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </>
          );
        })}
        {/* the case when user logged in and got refused */}/
        {/* Starring / Cast section */}
        <div className={style.starring}>
          <p className={style.starTitle}>Starring</p>
          {crewList.map((crewObj) => {
            return (
              <>
                {(crewObj.epkRole === "lead_actor" ||
                  crewObj.epkRole === "supporting_actor") &&
                  ++count % 2 !== 0 && (
                    <div className={style.starcontainer}>
                      <div className={style.imgleft}>
                        <img
                          src={`https://kinomovie.s3.amazonaws.com/${crewObj.image}`}
                          alt="starring"
                          className={style.starimg}
                        />
                        <br />
                        <h1>{crewObj.crewId.name}</h1>
                        <p className={style.mediaIcon}>
                          <InstagramIcon
                            style={{ color: "red", fontSize: 40 }}
                            onClick={() => openUrl(crewObj.instagram_url)}
                          />
                          <FacebookIcons
                            style={{ color: "blue", fontSize: 40 }}
                            onClick={() => openUrl(crewObj.facebook_url)}
                          />
                          <TwitterIcons
                            style={{ color: "lightblue", fontSize: 40 }}
                            onClick={() => openUrl(crewObj.twitter_url)}
                          />
                        </p>
                      </div>
                      <div className={style.contentRight}>
                        <p className={style.biography}>{crewObj.biography}</p>
                      </div>
                    </div>
                  )}

                {(crewObj.epkRole === "lead_actor" ||
                  crewObj.epkRole === "supporting_actor") &&
                  count % 2 === 0 && (
                    <div className={style.starcontainer}>
                      <div className={style.contentRight}>
                        <p className={style.biography}>{crewObj.biography}</p>
                      </div>
                      <div className={style.imgleft}>
                        <img
                          src={`https://kinomovie.s3.amazonaws.com/${crewObj.image}`}
                          alt="starring"
                          className={style.starimg}
                        />
                        <br />
                        <h1>{crewObj.crewId.name}</h1>
                        <p className={style.mediaIcon}>
                          <InstagramIcon
                            style={{ color: "red", fontSize: 40 }}
                            onClick={() => openUrl(crewObj.instagram_url)}
                          />
                          <FacebookIcons
                            style={{ color: "blue", fontSize: 40 }}
                            onClick={() => openUrl(crewObj.facebook_url)}
                          />
                          <TwitterIcons
                            style={{ color: "lightblue", fontSize: 40 }}
                            onClick={() => openUrl(crewObj.twitter_url)}
                          />
                        </p>
                      </div>
                    </div>
                  )}
              </>
            );
          })}
        </div>
        {/* Directors Section */}
        <div>
          {crewList.map((crewObj) => {
            return (
              <>
                {crewObj.epkRole === "director" && ++count % 2 !== 0 && (
                  <div className={style.directorcontainer}>
                    <div className={style.left}>
                      <img
                        src={`https://kinomovie.s3.amazonaws.com/${crewObj.image}`}
                        alt="director"
                        className={style.producerimg}
                      ></img>
                      <br />
                      <h1>{crewObj.crewId.name}</h1>
                      <p className={style.mediaIcon}>
                        <InstagramIcon
                          style={{ color: "red", fontSize: 40 }}
                          onClick={() => openUrl(crewObj.instagram_url)}
                        />
                        <FacebookIcons
                          style={{ color: "blue", fontSize: 40 }}
                          onClick={() => openUrl(crewObj.facebook_url)}
                        />
                        <TwitterIcons
                          style={{ color: "lightblue", fontSize: 40 }}
                          onClick={() => openUrl(crewObj.twitter_url)}
                        />
                      </p>
                    </div>
                    <div className={style.right}>
                      <h3>Director</h3>
                      <br />
                      <p>{crewObj.biography}</p>
                    </div>
                  </div>
                )}

                {crewObj.epkRole === "director" && count % 2 === 0 && (
                  <div className={style.directorcontainer}>
                    <div className={style.right}>
                      <h3>Director</h3>
                      <br />
                      <p>{crewObj.biography}</p>
                    </div>
                    <div className={style.left}>
                      <img
                        src={`https://kinomovie.s3.amazonaws.com/${crewObj.image}`}
                        alt="starring"
                        className={style.producerimg}
                      ></img>
                      <br />
                      <h1>{crewObj.crewId.name}</h1>
                      <p className={style.mediaIcon}>
                        <InstagramIcon
                          style={{ color: "red", fontSize: 40 }}
                          onClick={() => openUrl(crewObj.instagram_url)}
                        />
                        <FacebookIcons
                          style={{ color: "blue", fontSize: 40 }}
                          onClick={() => openUrl(crewObj.facebook_url)}
                        />
                        <TwitterIcons
                          style={{ color: "lightblue", fontSize: 40 }}
                          onClick={() => openUrl(crewObj.twitter_url)}
                        />
                      </p>
                    </div>
                  </div>
                )}
              </>
            );
          })}
        </div>
        {/* Producer Section */}
        <div>
          {crewList.map((crewObj) => {
            return (
              <>
                {crewObj.epkRole === "producer" && ++count % 2 !== 0 && (
                  <div className={style.directorcontainer}>
                    <div className={style.left}>
                      <img
                        src={`https://kinomovie.s3.amazonaws.com/${crewObj.image}`}
                        alt="director"
                        className={style.producerimg}
                      ></img>
                      <br />
                      <h1>{crewObj.crewId.name}</h1>
                      <p className={style.mediaIcon}>
                        <InstagramIcon
                          style={{ color: "red", fontSize: 40 }}
                          onClick={() => openUrl(crewObj.instagram_url)}
                        />
                        <FacebookIcons
                          style={{ color: "blue", fontSize: 40 }}
                          onClick={() => openUrl(crewObj.facebook_url)}
                        />
                        <TwitterIcons
                          style={{ color: "lightblue", fontSize: 40 }}
                          onClick={() => openUrl(crewObj.twitter_url)}
                        />
                      </p>
                    </div>
                    <div className={style.right}>
                      <h3>Producer</h3>
                      <br />
                      <p>{crewObj.biography}</p>
                    </div>
                  </div>
                )}

                {crewObj.epkRole === "producer" && count % 2 === 0 && (
                  <div className={style.directorcontainer}>
                    <div className={style.right}>
                      <h3>Producer</h3>
                      <br />
                      <p>{crewObj.biography}</p>
                    </div>
                    <div className={style.left}>
                      <img
                        src={`https://kinomovie.s3.amazonaws.com/${crewObj.image}`}
                        alt="starring"
                        className={style.producerimg}
                      ></img>
                      <br />
                      <h1>{crewObj.crewId.name}</h1>
                      <p className={style.mediaIcon}>
                        <InstagramIcon
                          style={{ color: "red", fontSize: 40 }}
                          onClick={() => openUrl(crewObj.instagram_url)}
                        />
                        <FacebookIcons
                          style={{ color: "blue", fontSize: 40 }}
                          onClick={() => openUrl(crewObj.facebook_url)}
                        />
                        <TwitterIcons
                          style={{ color: "lightblue", fontSize: 40 }}
                          onClick={() => openUrl(crewObj.twitter_url)}
                        />
                      </p>
                    </div>
                  </div>
                )}
              </>
            );
          })}
        </div>
        {/* Cinematographer Section */}
        <div>
          {crewList.map((crewObj) => {
            return (
              <>
                {crewObj.epkRole === "cinematographer" && ++count % 2 !== 0 && (
                  <div className={style.directorcontainer}>
                    <div className={style.left}>
                      <img
                        src={`https://kinomovie.s3.amazonaws.com/${crewObj.image}`}
                        alt="cinematographer"
                        className={style.producerimg}
                      ></img>
                      <br />
                      <h1>{crewObj.crewId.name}</h1>
                      <p className={style.mediaIcon}>
                        <InstagramIcon
                          style={{ color: "red", fontSize: 40 }}
                          onClick={() => openUrl(crewObj.instagram_url)}
                        />
                        <FacebookIcons
                          style={{ color: "blue", fontSize: 40 }}
                          onClick={() => openUrl(crewObj.facebook_url)}
                        />
                        <TwitterIcons
                          style={{ color: "lightblue", fontSize: 40 }}
                          onClick={() => openUrl(crewObj.twitter_url)}
                        />
                      </p>
                    </div>
                    <div className={style.right}>
                      <h3>Cinematographer</h3>
                      <br />
                      <p>{crewObj.biography}</p>
                    </div>
                  </div>
                )}

                {crewObj.epkRole === "cinematographer" && count % 2 === 0 && (
                  <div className={style.directorcontainer}>
                    <div className={style.right}>
                      <h3>Cinematographer</h3>
                      <br />
                      <p>{crewObj.biography}</p>
                    </div>
                    <div className={style.left}>
                      <img
                        src={`https://kinomovie.s3.amazonaws.com/${crewObj.image}`}
                        alt="starring"
                        className={style.producerimg}
                      ></img>
                      <h1>{crewObj.crewId.name}</h1>
                      <p className={style.mediaIcon}>
                        <InstagramIcon
                          style={{ color: "red", fontSize: 40 }}
                          onClick={() => openUrl(crewObj.instagram_url)}
                        />
                        <FacebookIcons
                          style={{ color: "blue", fontSize: 40 }}
                          onClick={() => openUrl(crewObj.facebook_url)}
                        />
                        <TwitterIcons
                          style={{ color: "lightblue", fontSize: 40 }}
                          onClick={() => openUrl(crewObj.twitter_url)}
                        />
                      </p>
                    </div>
                  </div>
                )}
              </>
            );
          })}
        </div>
        {/* stills section */}
        {/* the case when user not logged in and if logged in not requested yet*/}
        {userId === "0" ? (
          <div className={style.stills}>
            <div className={style.position1}>
              <button
                onClick={() => {
                  login();
                  clickState4();
                }}
                className={isClick4 === true ? style.none : style.btnStills}
              >
                {" "}
                Request Access{" "}
              </button>
            </div>
            <div className={style.stillsContainer}>
              <div className={style.content1}>
                <img
                  src={`https://kinomovie.s3.amazonaws.com/${stillsImg[0]}`}
                  alt="resource pics"
                  className={style.imgStillsLeft}
                />
              </div>
              <div className={style.content1}>
                <img
                  src={`https://kinomovie.s3.amazonaws.com/${stillsImg[1]}`}
                  alt="resource pics"
                  className={style.imgStillsRight}
                />
              </div>
            </div>
            <div className={style.stillsContainer}>
              <div className={style.content1}>
                <img
                  src={`https://kinomovie.s3.amazonaws.com/${stillsImg[2]}`}
                  alt="resource pics"
                  className={style.imgStillsRight}
                />
              </div>
              <div className={style.content1}>
                <img
                  src={`https://kinomovie.s3.amazonaws.com/${stillsImg[3]}`}
                  alt="resource pics"
                  className={style.imgStillsLeft}
                />
              </div>
            </div>
          </div>
        ) : (
          (stills.length === 0 ||
            stills.filter((s) => s.user._id === userId).length === 0) && (
            <div className={style.stills}>
              <div className={style.position1}>
                <button
                  onClick={() => {
                    addtoStills();
                    clickState4();
                  }}
                  className={isClick4 === true ? style.none : style.btnStills}
                >
                  {" "}
                  Request Access{" "}
                </button>
              </div>
              <div className={style.stillsContainer}>
                <div className={style.content1}>
                  <img
                    src={`https://kinomovie.s3.amazonaws.com/${stillsImg[0]}`}
                    alt="resource pics"
                    className={style.imgStillsLeft}
                  />
                </div>
                <div className={style.content1}>
                  <img
                    src={`https://kinomovie.s3.amazonaws.com/${stillsImg[1]}`}
                    alt="resource pics"
                    className={style.imgStillsRight}
                  />
                </div>
              </div>
              <div className={style.stillsContainer}>
                <div className={style.content1}>
                  <img
                    src={`https://kinomovie.s3.amazonaws.com/${stillsImg[2]}`}
                    alt="resource pics"
                    className={style.imgStillsRight}
                  />
                </div>
                <div className={style.content1}>
                  <img
                    src={`https://kinomovie.s3.amazonaws.com/${stillsImg[3]}`}
                    alt="resource pics"
                    className={style.imgStillsLeft}
                  />
                </div>
              </div>
            </div>
          )
        )}
        {/* the case when user logged in and requested the approval */}
        {stills.map((still) => {
          return (
            <>
              {still.user._id === userId && still.status === "pending" && (
                <div className={style.stills}>
                  <div className={style.position1}>
                    <button className={style.btnStills}>
                      {" "}
                      Awaiting approval{" "}
                    </button>
                  </div>
                  <div className={style.stillsContainer}>
                    <div className={style.content1}>
                      <img
                        src={`https://kinomovie.s3.amazonaws.com/${stillsImg[0]}`}
                        alt="resource pics"
                        className={style.imgStillsLeft}
                      />
                    </div>
                    <div className={style.content1}>
                      <img
                        src={`https://kinomovie.s3.amazonaws.com/${stillsImg[1]}`}
                        alt="resource pics"
                        className={style.imgStillsRight}
                      />
                    </div>
                  </div>
                  <div className={style.stillsContainer}>
                    <div className={style.content1}>
                      <img
                        src={`https://kinomovie.s3.amazonaws.com/${stillsImg[2]}`}
                        alt="resource pics"
                        className={style.imgStillsRight}
                      />
                    </div>
                    <div className={style.content1}>
                      <img
                        src={`https://kinomovie.s3.amazonaws.com/${stillsImg[3]}`}
                        alt="resource pics"
                        className={style.imgStillsLeft}
                      />
                    </div>
                  </div>
                </div>
              )}
            </>
          );
        })}
        {/* the case when user logged in and got the approval */}
        {stills.map((still) => {
          return (
            <>
              {still.user._id === userId && still.status === "approved" && (
                <div className={style.stills}>
                  <div className={style.stillsContainer}>
                    <div>
                      <img
                        src={`https://kinomovie.s3.amazonaws.com/${stillsImg[0]}`}
                        alt="resource pics"
                        className={style.imgStillsLeft}
                      />
                    </div>
                    <div>
                      <img
                        src={`https://kinomovie.s3.amazonaws.com/${stillsImg[1]}`}
                        alt="resource pics"
                        className={style.imgStillsRight}
                      />
                    </div>
                  </div>
                  <div className={style.stillsContainer}>
                    <div>
                      <img
                        src={`https://kinomovie.s3.amazonaws.com/${stillsImg[2]}`}
                        alt="resource pics"
                        className={style.imgStillsRight}
                      />
                    </div>
                    <div>
                      <img
                        src={`https://kinomovie.s3.amazonaws.com/${stillsImg[3]}`}
                        alt="resource pics"
                        className={style.imgStillsLeft}
                      />
                    </div>
                  </div>
                </div>
              )}
            </>
          );
        })}
        {/* the case when user logged in and got refused */}
        {stills.map((still) => {
          return (
            <>
              {still.user._id === userId && still.status === "refused" && (
                <div className={style.stills}>
                  <div className={style.position1}>
                    <button className={style.btnStills}> Refused </button>
                  </div>
                  <div className={style.stillsContainer}>
                    <div className={style.content1}>
                      <img
                        src={`https://kinomovie.s3.amazonaws.com/${stillsImg[0]}`}
                        alt="resource pics"
                        className={style.imgStillsLeft}
                      />
                    </div>
                    <div className={style.content1}>
                      <img
                        src={`https://kinomovie.s3.amazonaws.com/${stillsImg[1]}`}
                        alt="resource pics"
                        className={style.imgStillsRight}
                      />
                    </div>
                  </div>
                  <div className={style.stillsContainer}>
                    <div className={style.content1}>
                      <img
                        src={`https://kinomovie.s3.amazonaws.com/${stillsImg[2]}`}
                        alt="resource pics"
                        className={style.imgStillsRight}
                      />
                    </div>
                    <div className={style.content1}>
                      <img
                        src={`https://kinomovie.s3.amazonaws.com/${stillsImg[3]}`}
                        alt="resource pics"
                        className={style.imgStillsLeft}
                      />
                    </div>
                  </div>
                </div>
              )}
            </>
          );
        })}
        {/* resources section */}
        <div className={style.resource}>
          {resources.map((resource) => {
            return (
              <div className={style.resourcesCard}>
                <div>
                  <img
                    src={`https://kinomovie.s3.amazonaws.com/${resource.image}`}
                    alt="resource pics"
                    className={style.imgResource}
                  />
                </div>

                <div className={style.textResource}>
                  <h1>{resource.title}</h1>
                  <br />
                  <h2>{resource.time}</h2>
                  <br />
                  <h3> {resource.description} </h3>
                  <br />
                  <h4>
                    <InstagramIcon
                      sx={{ color: "red", fontSize: 40 }}
                      onClick={() => openUrl(resource.instagram_url)}
                    />
                    <FacebookIcons
                      style={{ color: "blue", fontSize: 40 }}
                      onClick={() => openUrl(resource.facebook_url)}
                    />
                    <TwitterIcons
                      style={{ color: "lightblue", fontSize: 40 }}
                      onClick={() => openUrl(resource.twitter_url)}
                    />
                    <FontAwesomeIcon icon={faEnvelope} color="transparents" />
                  </h4>
                </div>
              </div>
            );
          })}
        </div>
        {/* trailer section */}
        <div className={style.synopsis}>
          <video
            src={`https://kinomovie.s3.amazonaws.com/${fepkData.trailer}`}
            controls
          ></video>
        </div>
        {/* Praise/Awards */}
        <div className={style.awardContainer}>
          {reviews.map((award) => {
            return (
              <div className={style.award}>
                <p>{award.text}</p>
                <br />
                <p>{award.magazine}</p>
              </div>
            );
          })}
        </div>
        {/* award section */}
        <div className={style.awardContainer}>
          {reviews.map((award) => {
            return (
              <div>
                <img
                  src={`https://kinomovie.s3.amazonaws.com/${award.award_logo}`}
                  alt="award pics"
                  className={style.imgAward}
                />
              </div>
            );
          })}
        </div>
        <br />
        <br />
        <Footer />
      </div>
    </div>
  );
}

export default EpkView;
