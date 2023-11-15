/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import http from "../http-common";
import axios from "axios";
import { useParams } from "react-router-dom";
import style from "./EpkView.module.css";
import People from "../images/People.png";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcons from "@mui/icons-material/Facebook";
import TwitterIcons from "@mui/icons-material/Twitter";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import io from "socket.io-client";
import { ChatState } from "../context/ChatProvider";
import {
  faDollarSign,
  faPlus,
  faStar,
  faEnvelope,
  faEllipsisVertical,
  faFlag,
  faCircleInfo,
  faInfoCircle,
  faShareNodes,
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
import { FepkContext } from "../context/FepkContext";
import StillsCarousel from "../components/Epk/Present/StillsCarousel";
// import { NotificationContext } from "../context/NotificationContext";

let socket;

function EpkView() {
  const [fepkId, setFepkId, fepkMaker, setFepkMaker] =
    React.useContext(FepkContext);
  // fetching user
  let { title } = useParams();
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
  const [usersWishesToDonate, setUsersWishesToDonate] = useState(0);
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
  const [requests, setRequests] = useState([]);

  // const { incrementNotification } = useContext(NotificationContext);

  const [report, setReport] = useState({
    userId: userId,
    reason: "Spam",
    comment: "",
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

  const handleDollarIconClick = () => {
    if (userId === "0") {
      login();
    } else {
      console.log("clicked the dollar sign");
      addUserToWishesToBuy();
      // incrementNotification();
    }
  };

  const handlePlusIconClick = () => {
    if (userId === "0") {
      login();
    } else {
      addUserToFavourites();
      // incrementNotification();
    }
  };

  const handleStarIconClick = () => {
    if (userId === "0") {
      login();
    } else {
      addUserToLikes();
      // incrementNotification();
    }
  };

  useEffect(() => {
    try {
      http.get(`fepks/byTitle/${title}`).then((response) => {
        setFepkData(response.data);
        setCrewList(response.data.crew);
        setUsersWishesToDonate(response.data.wishes_to_donate?.length || 0);
        setUsersWishesToBuy(response.data.wishes_to_buy.length); // Check if it's defined
        setUsersFavourites(response.data.favourites.length); // Check if it's defined
        setUsersLikes(response.data.likes.length); // Check if it's defined
        setMediumSynopsis(response.data.mediumSynopsis);
        setLongSynopsis(response.data.longSynopsis);
        setUniqueness(response.data.uniqueness);
        setStills(response.data.stillsApproval);
        setStillsImages(response.data.stills);
        setResources(response.data.resources);
        setTrailer(response.data.trailer);
        setReviews(response.data.reviews);
        setRequests(response.data.requests);
        setFepkId(response.data._id);
        setFepkMaker(response.data.film_maker);
        console.log(fepkId);
        console.log(fepkMaker);

        // Move this inside the first http.get's 'then' block
        http.get(`/fepks/followers/${response.data._id}`).then((res) => {
          setFollowers(res.data);
        });
      });
    } catch (error) {
      console.log(error);
    }
  }, [fepkId, fepkMaker, setFepkId, setFepkMaker, title]);

  stillsImages.forEach((still) => {
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

  // user is added to request list
  function addToRequests(message) {
    console.info("comment", message);
    http
      .post(`fepks/postRequests`, {
        fepkId: fepkData._id,
        user: userId,
        comment: message,
        // status: "pending",
        // createdAt: new Date(),
      })
      .then((response) => {
        setRequests(response.data.requests);
        alert("Add request successfully!");
      });
  }
  // user is added to the list of donate
  function addUserToWishesToDonate() {
    http
      .get(`fepks/wishestodonate/${fepkData._id}/${userId}`)
      .then((response) => {
        setUsersWishesToDonate(response.data.wishes_to_buy.length);
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
    // setClickStar(!clickStar);
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

  const [isClickInfoIcon4, setIsClickInfoIcon4] = useState(false);
  const clickInfoIcon4 = () => {
    setIsClickInfoIcon4(!isClickInfoIcon4);
  };
  const [isClickReport, setIsClickReport] = useState(false);
  const clickReport = () => {
    http.put(`/fepks/report/${fepkData._id}`, report).then((res) => {
      if (res.data.error) {
        alert(res.data.error);
      }
      console.log("report sent");
    });
    console.log(report);
    setIsClickReport(true);
  };

  const [chosen1, setChosen1] = useState(false);
  const [chosen2, setChosen2] = useState(false);
  const [chosen3, setChosen3] = useState(false);
  const [chosen4, setChosen4] = useState(false);

  const handleInputChange = (event) => {
    let comment = event.target.value;
    setReport({ ...report, comment: comment });
    setChosen4(!chosen4);
    setChosen1(false);
    setChosen2(false);
    setChosen3(false);
  };
  function chooseReason(reason) {
    setReport({ ...report, reason: reason });
    setChosen1(!chosen1);
    setChosen2(false);
    setChosen3(false);
    setChosen4(false);
  }
  function chooseReason1(reason) {
    setReport({ ...report, reason: reason });
    setChosen2(!chosen2);
    setChosen1(false);
    setChosen3(false);
    setChosen4(false);
  }
  function chooseReason2(reason) {
    setReport({ ...report, reason: reason });
    setChosen3(!chosen3);
    setChosen1(false);
    setChosen2(false);
    setChosen4(false);
  }
  function kFormatter(num) {
    return Math.abs(num) > 999
      ? parseFloat(Math.sign(num) * (Math.abs(num) / 1000)).toFixed(2) + "k"
      : Math.sign(num) * Math.abs(num);
  }
  function mFormatter(num) {
    return Math.abs(num) > 999999
      ? parseFloat(Math.sign(num) * (Math.abs(num) / 1000000)).toFixed(2) + "M"
      : kFormatter(num);
  }

  const [clickStar, setClickStar] = useState(false);
  // const starClick = () => {
  //   setClickStar(!clickStar);
  // };

  // request button
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const RequestButton = (props) => {
    let ButtonTxt;
    let IsDisabled = false;
    switch (props.status) {
      case null:
        ButtonTxt = "Request Access";
        IsDisabled = false;
        break;

      case "pending":
        ButtonTxt = "Awaiting approval";
        IsDisabled = true;
        break;

      case "refused":
        ButtonTxt = "Request refused";
        IsDisabled = true;
        break;

      default:
        ButtonTxt = "Request Access";
        IsDisabled = false;
        break;
    }
    return (
      <>
        <div className="d-flex justify-content-center">
          <Button variant="light" onClick={handleShow} disabled={IsDisabled}>
            {ButtonTxt}
          </Button>
        </div>
      </>
    );
  };

  const RequestModal = (props) => {
    const [requestMsg, setRequestMsg] = useState("");
    const handleChange = (e) => {
      setRequestMsg(e.target.value);
    };
    const handleSubmit = () => {
      console.info("!!!", requestMsg);
      addToRequests(requestMsg);
      addToChat(requestMsg);
    };

    console.log("fepk", fepkData);
    //create a new chat after submit a request

    const addToChat = async (message) => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/chat`,
          {
            userId: fepkData.film_maker._id,
            chatName: `${user.firstName} ${user.lastName}`,
          },
          config
        );
        //save request message to chat message
        if (data) {
          try {
            const result = await axios.post(
              `${process.env.REACT_APP_BACKEND_URL}/message`,
              {
                chatId: data._id,
                content: message,
              },
              config
            );
            socket.emit("new message", result.data);
          } catch (error) {}
        }
      } catch (error) {
        console.log(`message: ${error.message}`);
      }
    };

    const [socketConnected, setSocketConnected] = useState(false);
    const { notification, setNotification } = ChatState();
    useEffect(() => {
      socket = io(process.env.REACT_APP_BACKEND_URL);
      socket.emit("setup", user);
      socket.on("connection", () => setSocketConnected(true));
    }, []);

    useEffect(() => {
      // console.log("selectchat", selectedChatCompare);
      socket.on("message recieved", (newMessageRecieved) => {
        // notification
        if (!notification.includes(newMessageRecieved)) {
          setNotification([newMessageRecieved, ...notification]);
        }
      });
    });

    return (
      <>
        <Modal show={props.open} onHide={props.show} centered>
          <Modal.Header>
            <Modal.Title>{t("Send Your Request")}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="my-3"
                controlId="exampleForm.ControlTextarea1"
                value={requestMsg}
                onChange={handleChange}
              >
                <Form.Control
                  as="textarea"
                  rows={4}
                  placeholder="Type your message..."
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={props.close}>
            {t("Close")}
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              {t("Send")}
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };

  return (
    <div>
      <div
        className={
          fepkData.status_pause === false
            ? style.wholeContainer
            : style.content1
        }
      >
        {/* socialMedia icon */}
        <div className={style.socialMedia}>
          <div>
            <p className={style.cornerText}>{t("Total Audience Reach")}</p>
          </div>
          <div className={style.iconAmount}>
            {" "}
            <img
              className={style.peopleIcon}
              src={People}
              alt="audience icon"
            />
            <p className={style.totalNumber}>
              {mFormatter(
                followers.facebook + followers.instagram + followers.twitter
              )}
            </p>
          </div>

          <div>
            <h2 style={{ color: "pink" }}>
              {" "}
              <InstagramIcon style={{ color: "pink", fontSize: 60 }} />{" "}
              {mFormatter(followers.facebook)}
            </h2>
          </div>
          <div>
            <h2 style={{ color: "blue" }}>
              <FacebookIcons style={{ color: "blue", fontSize: 60 }} />{" "}
              {mFormatter(followers.instagram)}
            </h2>
          </div>
          <div>
            <h2 style={{ color: "lightblue" }}>
              <TwitterIcons style={{ color: "lightblue", fontSize: 60 }} />{" "}
              {mFormatter(followers.twitter)}
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
                color="white"
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
                &nbsp; {t("Report")}
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
                    {t("Why are you reporting this EPK?")}
                    </p>
                    <form className={style.form1}>
                      <div className={style.inputContainer}>
                        <input
                          className={
                            chosen1 === true ? style.selected : style.form1Input
                          }
                          type="text"
                          value="Spam"
                          onhover="tw-color-red-500"
                          onClick={() => chooseReason("Spam")}
                          readOnly
                        ></input>
                        <FontAwesomeIcon
                          className={
                            chosen1 === true
                              ? style.infoIconSelect
                              : style.infoIcon
                          }
                          icon={faInfoCircle}
                          onClick={() => clickInfoIcon1()}
                        />
                        {isClickInfoIcon1 === true ? (
                          <div className={style.reportMessage}>
                            {t("This can be unwanted and unauthorized use of content")}
                            {t(" from another website on third-party websites in")}
                            {t(" connection with other content, negatively affecting")}
                            {t(" your experience and reputation on our platform.")}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className={style.inputContainer}>
                        <input
                          className={
                            chosen2 === true ? style.selected : style.form1Input
                          }
                          type="text"
                          value="Nudity or Sexual Content"
                          onClick={() =>
                            chooseReason1("Nudity or Sexual Content")
                          }
                          readOnly
                        ></input>
                        <FontAwesomeIcon
                          className={
                            chosen2 === true
                              ? style.infoIconSelect
                              : style.infoIcon
                          }
                          icon={faCircleInfo}
                          onClick={() => clickInfoIcon2()}
                        />
                        {isClickInfoIcon2 === true ? (
                          <div className={style.reportMessage}>
                            {t("This can be any content that appears to be")}
                            {t(" pronographic, sexual exploitation or solicitation")}
                            {t(" and/or content that shows sexual intercourse,")}
                            {t(" genitals and close-ups of fully-nude buttocks.")}
                            {t(" Nudity in photos of paintings and sculptures are")}
                            {t("permitted.")}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className={style.inputContainer}>
                        <input
                          className={
                            chosen3 === true ? style.selected : style.form1Input
                          }
                          type="text"
                          value="Copyrighted Intellectual Property Violation"
                          onClick={() =>
                            chooseReason2(t(
                              "Copyrighted Intellectual Property Violation"
                            ))
                          }
                          readOnly
                        ></input>
                        <FontAwesomeIcon
                          className={
                            chosen3 === true
                              ? style.infoIconSelect
                              : style.infoIcon
                          }
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
                        <label for="Other">{t("Other:")} </label>
                        <input
                          className={
                            chosen4 === true ? style.selected : style.comment
                          }
                          type="text"
                          name="comment"
                          onChange={handleInputChange}
                          placeholder="type here"
                        ></input>
                        <FontAwesomeIcon
                          className={
                            chosen4 === true
                              ? style.infoIconSelect
                              : style.infoIcon
                          }
                          icon={faCircleInfo}
                          onClick={() => clickInfoIcon4()}
                        />
                        {isClickInfoIcon4 === true ? (
                          <div className={style.reportMessage}>
                            {t("Other: any other reason you may want to report this")}
                           {t(" EPK.")}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>

                      <button
                        onClick={() => clickReport()}
                        className={style.submitReport}
                      >
                       {t("Report!")}
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
            <a href="#action">
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
                  onClick={() => addUserToWishesToDonate()}
                />
              )}
            </a>
            <span>{usersWishesToDonate}</span>
          </div>

          <div>
            <a href="#action" onClick={handleDollarIconClick}>
              <FontAwesomeIcon icon={faDollarSign} size="lg" />
            </a>

            <span>{usersWishesToBuy}</span>
          </div>
          <div>
            <a href="#action" onClick={handlePlusIconClick}>
              <FontAwesomeIcon
                icon={faPlus}
                size="lg"
                color={userId !== "0" ? "fa-duotone" : undefined}
              />
            </a>

            <span>{usersFavourites}</span>
          </div>
          <div>
            <a href="#action" onClick={handleStarIconClick}>
              <FontAwesomeIcon icon={faStar} size="lg" />
            </a>
            <span>{usersLikes}</span>
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
            <a href="#action">
              <FontAwesomeIcon
                icon={faShareNodes}
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
                    <p>{t("Directed by:")} {crewObj.crewId.name}</p>
                  )}
                  {crewObj.epkRole === "producer" && (
                    <p>{t("Produced by:")} {crewObj.crewId.name}</p>
                  )}
                  {crewObj.epkRole === "writer" && (
                    <p>{t("Writer:")} {crewObj.crewId.name}</p>
                  )}
                  {crewObj.epkRole === "cinematographer" && (
                    <p>{t("Cinematographer:")} {crewObj.crewId.name}</p>
                  )}
                  {crewObj.epkRole === "editor" && (
                    <p>{t("Editor:")} {crewObj.crewId.name}</p>
                  )}
                </>
              );
            })}
            <p>{t("Studio:")} {fepkData.productionCo}</p>

            <p>{t("Distributed by:")} {fepkData.distributionCo}</p>
          </div>

          <div className={style.leftDetail}>
            <p>{t("Starring:")}</p>
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
            {t("Production Year:")} {fepkData.productionYear}
            </p>

            <p className={style.bottom}>
              {t("Duration:")} {fepkData.durationMin} {t("Minutes")}
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
            <h2 className={style.type}>{t("Short Synopsis")}</h2>
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
        {userId === "0" && fepkData?.text_medium_blur === true ? (
          <div className={style.synopsis}>
            <div>
              <h2 className={style.type}>{t("Medium Synopsis")}</h2>
            </div>
            <div className={style.position}>
              <button
                onClick={() => {
                  login();
                  clickState1();
                }}
                type="button"
                data-toggle="modal"
                className={isClick1 === true ? style.none : style.btnSy}
              >
                {" "}
                Request Access{" "}
              </button>

              <div
                className="modal fade"
                tabindex="-1"
                role="dialog"
                aria-labelledby="accessModal"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLongTitle">
                        Request Access to Medium Synopsis
                      </h5>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <form>
                        <input
                          className="form-control"
                          defaultValue={mediumSynopsis.comment}
                          name="requestComment"
                        />
                      </form>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-dismiss="modal"
                      >
                        Close
                      </button>
                      <button type="button" className="btn btn-primary">
                        Save changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
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
          fepkData?.film_maker?._id !== userId &&
          fepkData.text_medium_blur === true &&
          (requests.length === 0 ||
            requests.filter((e) => e.user === userId).length === 0) && (
            <div className={style.synopsis}>
              <div>
                <h2 className={style.type}>Medium Synopsis</h2>
                <RequestButton />
                {show ? (
                  <RequestModal close={handleClose} open={handleShow} />
                ) : null}
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
        {/* {mediumSynopsis.map((medium) => { */}
        {fepkData?.film_maker?._id !== userId &&
          fepkData?.text_medium_blur === true &&
          requests.map((r) => {
            return (
              <>
                {/* {medium.user._id === userId && medium.status === "pending" && ( */}
                {r.user === userId && r.status === "pending" && (
                  <div className={style.synopsis}>
                    <div>
                      <h2 className={style.type}>Medium Synopsis</h2>
                      <RequestButton status={r.status} />
                      {show ? (
                        <RequestModal close={handleClose} open={handleShow} />
                      ) : null}
                    </div>
                    {/* <div className={style.position}>
                    <button className={style.btnSy}> Awaiting approval </button>
                  </div> */}
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
        {/* {mediumSynopsis.map((medium) => { */}
        {fepkData?.film_maker?._id === userId ||
        fepkData?.text_medium_blur === false ? (
          <>
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
          </>
        ) : (
          requests.map((r) => {
            return (
              <>
                {/* {medium.user._id === userId && medium.status === "approved" && ( */}
                {r.user === userId && r.status === "approved" && (
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
          })
        )}
        {/* the case when user logged in and got refused */}
        {/* {mediumSynopsis.map((medium) => { */}
        {fepkData?.film_maker?._id !== userId &&
          fepkData?.text_medium_blur === true &&
          requests.map((r) => {
            return (
              <>
                {/* {medium.user._id === userId && medium.status === "refused" && ( */}
                {r.user._id === userId && r.status === "refused" && (
                  <div className={style.synopsis}>
                    <div>
                      <h2 className={style.type}>Medium Synopsis</h2>
                      <RequestButton status={r.status} />
                    </div>
                    {/* <div className={style.position}>
                    <button className={style.btnSy}> Refused </button>
                  </div> */}
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
        {userId === "0" && fepkData?.text_long_blur === true ? (
          <div className={style.synopsis}>
            <div>
              <h2 className={style.type}>{t("Long Synopsis")}</h2>
            </div>
            <div className={style.position}>
              <button
                type="button"
                data-toggle="modal"
                onClick={() => {
                  login();
                  clickState2();
                }}
                className={isClick2 === true ? style.none : style.btnSy}
              >
                {" "}
                Request Access{" "}
              </button>

              <div
                className="modal fade"
                tabindex="-1"
                role="dialog"
                aria-labelledby="accessModal"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLongTitle">
                        Request Access to Long Synopsis
                      </h5>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <form>
                        <input
                          className="form-control"
                          defaultValue={longSynopsis.comment}
                          name="requestComment"
                        />
                      </form>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-dismiss="modal"
                      >
                        Close
                      </button>
                      <button type="button" className="btn btn-primary">
                        Save changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
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
          // (longSynopsis.length === 0 ||
          //   longSynopsis.filter((e) => e.user._id === userId).length === 0) && (
          fepkData?.film_maker?._id !== userId &&
          fepkData?.text_long_blur === true &&
          (requests.length === 0 ||
            requests.filter((e) => e.user === userId).length === 0) && (
            <div className={style.synopsis}>
              <div>
                <h2 className={style.type}>Long Synopsis</h2>
              </div>
              <RequestButton />
              {show ? (
                <RequestModal close={handleClose} open={handleShow} />
              ) : null}
              {/* <div className={style.position}>
                <button
                  onClick={() => {
                    // addtoLongSynopsis();
                    addToRequests();
                    clickState2();
                  }}
                  className={isClick2 === true ? style.none : style.btnSy}
                >
                  {" "}
                  Request Access{" "}
                </button>
              </div> */}

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
        {/* {longSynopsis.map((long) => { */}
        {fepkData?.film_maker?._id !== userId &&
          fepkData?.text_long_blur === true &&
          requests.map((r) => {
            return (
              <>
                {r.user === userId && r.status === "pending" && (
                  <div className={style.synopsis}>
                    <div>
                      <h2 className={style.type}>Long Synopsis</h2>
                      <RequestButton status={r.status} />
                      {show ? (
                        <RequestModal close={handleClose} open={handleShow} />
                      ) : null}
                    </div>
                    {/* <div className={style.position}>
                    <button className={style.btnSy}> Awaiting approval </button>
                  </div> */}
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
        {fepkData?.film_maker?._id === userId ||
        fepkData?.text_long_blur === false ? (
          <>
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
          </>
        ) : (
          requests.map((long) => {
            return (
              <>
                {long.user === userId && long.status === "approved" && (
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
          })
        )}
        {/* the case when user logged in and got refused */}
        {fepkData?.film_maker?._id !== userId &&
          fepkData?.text_long_blur === true &&
          requests.map((r) => {
            return (
              <>
                {r.user === userId && r.status === "refused" && (
                  <div className={style.synopsis}>
                    <div>
                      <h2 className={style.type}>Long Synopsis</h2>
                    </div>
                    <RequestButton status={r.status} />
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
        {userId === "0" && fepkData?.uniqueness_blur === true ? (
          <div className={style.unique}>
            <p className={style.titleUnique}>{fepkData.title_uniqueness}</p>
            <div className={style.position1}>
              <button
                onClick={() => {
                  login();
                  clickState3();
                }}
                type="button"
                data-toggle="modal"
                className={isClick3 === true ? style.none : style.btnUni}
              >
                {" "}
                Request Access{" "}
              </button>

              <div
                className="modal fade"
                tabindex="-1"
                role="dialog"
                aria-labelledby="accessModal"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLongTitle">
                        Request Access to Uniqueness
                      </h5>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <form>
                        <input
                          className="form-control"
                          defaultValue={uniqueness.comment}
                          name="requestComment"
                        />
                      </form>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-dismiss="modal"
                      >
                        Close
                      </button>
                      <button type="button" className="btn btn-primary">
                        Save changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
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
          fepkData?.film_maker?._id !== userId &&
          fepkData?.uniqueness_blur === true &&
          (requests.length === 0 ||
            requests.filter((u) => u.user === userId).length === 0) && (
            <div className={style.unique}>
              <p className={style.titleUnique}>{fepkData.title_uniqueness}</p>
              <RequestButton />
              {show ? (
                <RequestModal close={handleClose} open={handleShow} />
              ) : null}
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
        {fepkData?.film_maker?._id !== userId &&
          fepkData?.uniqueness_blur === true &&
          requests.map((r) => {
            return (
              <>
                {r.user === userId && r.status === "pending" && (
                  <div className={style.unique}>
                    <p className={style.titleUnique}>
                      {fepkData.title_uniqueness}
                    </p>
                    <RequestButton status={r.status} />
                    {show ? (
                      <RequestModal close={handleClose} open={handleShow} />
                    ) : null}
                    {/* <div className={style.position1}>
                    <button className={style.btnUni}>
                      {" "}
                      Awaiting approval{" "}
                    </button>
                  </div> */}
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
        {fepkData?.film_maker?._id === userId ||
        fepkData?.uniequess_blur === false ? (
          <>
            <div className={style.unique}>
              <p className={style.titleUnique}>{fepkData.title_uniqueness}</p>

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
          </>
        ) : (
          requests.map((unique) => {
            return (
              <>
                {unique.user === userId && unique.status === "approved" && (
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
          })
        )}
        {/* the case when user logged in and got refused */}
        {fepkData?.film_maker?._id !== userId &&
          fepkData?.uniequess_blur === true &&
          requests.map((r) => {
            return (
              <>
                {r.user === userId && r.status === "refused" && (
                  <div className={style.unique}>
                    <p className={style.titleUnique}>
                      {fepkData.title_uniqueness}
                    </p>
                    <RequestButton status={r.status} />
                    <div className={style.uniqueContainer}>
                      <div className={style.content1}>
                        <img
                          src={`https://kinomovie.s3.amazonaws.com/${fepkData.image_uniqueness}`}
                          alt="uniqueness"
                          className={style.imgUnique}
                        />{" "}
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
                            style={{ color: "#1e0039", fontSize: 40 }}
                            onClick={() => openUrl(crewObj.instagram_url)}
                          />
                          <FacebookIcons
                            style={{ color: "#1e0039", fontSize: 40 }}
                            onClick={() => openUrl(crewObj.facebook_url)}
                          />
                          <TwitterIcons
                            style={{ color: "#1e0039", fontSize: 40 }}
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
                            style={{ color: "#1e0039", fontSize: 40 }}
                            onClick={() => openUrl(crewObj.instagram_url)}
                          />
                          <FacebookIcons
                            style={{ color: "#1e0039", fontSize: 40 }}
                            onClick={() => openUrl(crewObj.facebook_url)}
                          />
                          <TwitterIcons
                            style={{ color: "#1e0039", fontSize: 40 }}
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
                          style={{ color: "white", fontSize: 40 }}
                          onClick={() => openUrl(crewObj.instagram_url)}
                        />
                        <FacebookIcons
                          style={{ color: "white", fontSize: 40 }}
                          onClick={() => openUrl(crewObj.facebook_url)}
                        />
                        <TwitterIcons
                          style={{ color: "white", fontSize: 40 }}
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
                          style={{ color: "white", fontSize: 40 }}
                          onClick={() => openUrl(crewObj.instagram_url)}
                        />
                        <FacebookIcons
                          style={{ color: "white", fontSize: 40 }}
                          onClick={() => openUrl(crewObj.facebook_url)}
                        />
                        <TwitterIcons
                          style={{ color: "white", fontSize: 40 }}
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
                          style={{ color: "white", fontSize: 40 }}
                          onClick={() => openUrl(crewObj.instagram_url)}
                        />
                        <FacebookIcons
                          style={{ color: "white", fontSize: 40 }}
                          onClick={() => openUrl(crewObj.facebook_url)}
                        />
                        <TwitterIcons
                          style={{ color: "white", fontSize: 40 }}
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
                          style={{ color: "white", fontSize: 40 }}
                          onClick={() => openUrl(crewObj.instagram_url)}
                        />
                        <FacebookIcons
                          style={{ color: "white", fontSize: 40 }}
                          onClick={() => openUrl(crewObj.facebook_url)}
                        />
                        <TwitterIcons
                          style={{ color: "white", fontSize: 40 }}
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
                          style={{ color: "white", fontSize: 40 }}
                          onClick={() => openUrl(crewObj.instagram_url)}
                        />
                        <FacebookIcons
                          style={{ color: "white", fontSize: 40 }}
                          onClick={() => openUrl(crewObj.facebook_url)}
                        />
                        <TwitterIcons
                          style={{ color: "white", fontSize: 40 }}
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
                          style={{ color: "white", fontSize: 40 }}
                          onClick={() => openUrl(crewObj.instagram_url)}
                        />
                        <FacebookIcons
                          style={{ color: "white", fontSize: 40 }}
                          onClick={() => openUrl(crewObj.facebook_url)}
                        />
                        <TwitterIcons
                          style={{ color: "white", fontSize: 40 }}
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
        <StillsCarousel title={{ title }} />
        {/* the case when user not logged in and if logged in not requested yet*/}
        {/* {userId === "0" ? (
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
          fepkData?.film_maker?._id !== userId &&
          (requests.length === 0 ||
            requests.filter((r) => r.user === userId).length === 0) && (
            <div className={style.stills}>
              <RequestButton />
              {show ? (
                <RequestModal close={handleClose} open={handleShow} />
              ) : null}
             
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
        )} */}
        {/* the case when user logged in and requested the approval */}
        {/* {fepkData?.film_maker?._id !== userId &&
          requests.map((r) => {
            return (
              <>
                {r.user === userId && r.status === "pending" && (
                  <div className={style.stills}>
                    <RequestButton status={r.status} />
                    {show ? (
                      <RequestModal close={handleClose} open={handleShow} />
                    ) : null}

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
          })} */}
        {/* the case when user logged in and got the approval */}
        {/* {fepkData?.film_maker?._id == userId ? (
          <>
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
          </>
        ) : (
          requests.map((r) => {
            return (
              <>
                {r.user === userId && r.status === "approved" && (
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
          })
        )} */}
        {/* the case when user logged in and got refused */}
        {/* {fepkData?.film_maker?._id !== userId &&
          requests.map((r) => {
            return (
              <>
                {r.user === userId && r.status === "refused" && (
                  <div className={style.stills}>
                    <RequestButton status={r.status} />
                  
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
          })} */}
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
                      sx={{ color: "white", fontSize: 40 }}
                      onClick={() => openUrl(resource.instagram_url)}
                    />
                    <FacebookIcons
                      sx={{ color: "white", fontSize: 40 }}
                      onClick={() => openUrl(resource.facebook_url)}
                    />
                    <TwitterIcons
                      sx={{ color: "white", fontSize: 40 }}
                      onClick={() => openUrl(resource.twitter_url)}
                    />
                    <FontAwesomeIcon icon={faEnvelope} color="white" />
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
      </div>
    </div>
  );
}

export default EpkView;
