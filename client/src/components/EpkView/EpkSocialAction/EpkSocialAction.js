import React, { useState, useEffect, useContext } from "react";
import ActionIcon from "./ActionIcon";
import DollarIcon from "../../../images/icons/DollarIcon.svg";
import DollarBlackIcon from "../../../images/icons/DollarBlackIcon.svg";
import PlusIcon from "../../../images/icons/PlusWhite.svg";
import PlusBlackIcon from "../../../images/icons/PlusBlack.svg";
import StarIcon from "../../../images/icons/StarWhite.svg";
import StarBlackIcon from "../../../images/icons/StarBlack.svg";
import KIcon from "../../../images/icons/K.svg";
import ShareIcon from "../../../images/icons/share.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import http from "../../../http-common";
import { useSelector } from "react-redux";
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
import { faShareNodes } from "@fortawesome/free-solid-svg-icons";

import { NotificationContext } from "../../../context/NotificationContext";
// import { FepkContext } from "../../../context/FepkContext";

export default function EpkSocialAction({ epkInfo, handler }) {
  //
  // const [fepkId, setFepkId, fepkMaker, setFepkMaker] = useContext(FepkContext);

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

  const [fepkInfo, setFepkInfo] = useState(epkInfo);
  const [usersWishesToBuy, setUsersWishesToBuy] = useState(
    epkInfo.wishes_to_buy.length
  );
  const [usersFavourites, setUsersFavourites] = useState(
    epkInfo.favourites.length
  );
  const [usersLikes, setUsersLikes] = useState(epkInfo.likes.length);
  // const [sharingClicked, setSharingClicked] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const urlShare = "https://www.google.com"; ///window.location.href
  // console.log(epkInfo);

  //Yeming added
  const { incrementNotification, filmmakerInfo, setFilmmakerInfo } =
    useContext(NotificationContext);

  useEffect(() => {
    try {
      http.get(`fepks/byTitle/${epkInfo.title}`).then((response) => {
        // console.log(response.data);
        setFepkInfo(response.data);
        // console.log(fepkInfo);
        setUsersWishesToBuy(response.data.wishes_to_buy.length);
        setUsersFavourites(response.data.favourites.length);
        setUsersLikes(response.data.likes.length);
        //
        // setFepkId(response.data._id);
        // setFepkMaker(response.data.film_maker._id);
        // console.log("fepk", response.data);
        // console.log("fepkId", fepkId);
        // console.log("fepkMaker", fepkMaker);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const actionList = [
    {
      name: "wish_to_buy",
      icon:
        fepkInfo?.wishes_to_buy.filter((item) => item._id === userId).length !==
        0
          ? DollarBlackIcon
          : DollarIcon,
      number: usersWishesToBuy,
      width: "",
    },
    {
      name: "favorites",
      icon:
        fepkInfo?.favourites.filter((item) => item._id === userId).length !== 0
          ? PlusBlackIcon
          : PlusIcon,
      number: usersFavourites,
    },
    {
      name: "likes",
      icon:
        fepkInfo?.likes.filter((item) => item._id === userId).length !== 0
          ? StarBlackIcon
          : StarIcon,
      number: usersLikes,
    },
    {
      name: "K",
      icon: KIcon,
    },
    {
      name: "share",
      icon: ShareIcon,
    },
  ];

  function closeSharingMenu() {
    // setSharingClicked(false);
    setShowShareOptions(false);
  }

  function openUrl(url) {
    window.open(url);
  }

  const handlers = {
    clickHandler: (name) => {
      // console.log("State before action:", {
      //   usersWishesToBuy,
      //   usersFavourites,
      //   usersLikes,
      // });

      if (!user) {
        handler();
      } else {
        let incrementValue = 0;

        switch (name) {
          case "wish_to_buy":
            // Determine if adding or removing from wishlist
            // const isAddingToWishlist =
            //   fepkInfo?.wishes_to_buy.filter((item) => item._id === userId)
            //     .length === 0;
            const isAddingToWishlist = fepkInfo?.wishes_to_buy.some(
              (item) => item._id === userId
            );
            incrementValue = isAddingToWishlist ? 0 : 1;

            http
              .get(`fepks/wishestobuy/${epkInfo._id}/${userId}`)
              .then((response) => {
                setFepkInfo(response.data);
                // console.log(response.data.wishes_to_buy.length);
                // Update filmmaker info in the NotificationContext
                const filmmakerInfo = response.data.film_maker._id;
                setFilmmakerInfo(filmmakerInfo);

                setUsersWishesToBuy(response.data.wishes_to_buy.length);
                incrementNotification(incrementValue);

                // console.log("State after wish_to_buy action:", {
                //   usersWishesToBuy,
                //   usersFavourites,
                //   usersLikes,
                // });
              })
              .catch((error) => {
                console.error(error);
              });
            break;
          case "favorites":
            // Determine if adding or removing from favouritelist
            // const isAddingToFavouritelist =
            //   fepkInfo?.favourites.filter((item) => item._id === userId)
            //     .length === 0;
            const isAddingToFavouritelist = fepkInfo?.favourites.some(
              (item) => item._id === userId
            );
            incrementValue = isAddingToFavouritelist ? 0 : 1;

            http
              .get(`fepks/favourite/${epkInfo._id}/${userId}`)
              .then((response) => {
                setFepkInfo(response.data);
                // console.log(response.data);
                // Update filmmaker info in the NotificationContext
                const filmmakerInfo = response.data.film_maker;
                setFilmmakerInfo(filmmakerInfo);
                setUsersFavourites(response.data.favourites.length);
                incrementNotification(incrementValue);
              })
              .catch((error) => {
                console.error(error);
              });
            break;
          case "likes":
            // Determine if adding or removing from favouritelist
            // const isAddingToLikelist =
            //   fepkInfo?.likes.filter((item) => item._id === userId).length ===
            //   0;
            const isAddingToLikelist = fepkInfo?.likes.some(
              (item) => item._id === userId
            );
            incrementValue = isAddingToLikelist ? 0 : 1;

            http
              .get(`fepks/like/${epkInfo._id}/${userId}`)
              .then((response) => {
                setFepkInfo(response.data);
                // console.log(response.data);
                // Update filmmaker info in the NotificationContext
                const filmmakerInfo = response.data.film_maker;
                setFilmmakerInfo(filmmakerInfo);
                setUsersLikes(response.data.likes.length);
                incrementNotification(incrementValue);
              })
              .catch((error) => {
                console.error(error);
              });
            break;
          case "K":
            openUrl(epkInfo.kickstarter_url);
            break;
          case "share":
            closeSharingMenu();
            break;
          default:
            break;
        }
      }
    },
    hoverHandler: (eventName) => {
      // console.log(eventName);
      switch (eventName) {
        case "onMouseOver":
          setShowShareOptions(true);
          break;
        case "onMouseOut":
          setShowShareOptions(false);
          break;
        default:
          break;
      }
      // switch (name) {
      //   case "share":
      //     // addUserToSharings();
      //     setShowShareOptions(true);
      //     break;
      //   default:
      //     break;
      // }
    },
  };

  return (
    <div className="tw-relative tw-flex tw-justify-between tw-bg-opacity-100 tw-px-6 tw-py-12">
      {/* Social media sharing Icons */}

      {actionList.map((action) => (
        <div
          className="tw-relative"
          onMouseOver={() => handlers.hoverHandler("onMouseOver")}
          onMouseOut={() => handlers.hoverHandler("onMouseOut")}
        >
          {action.name === "share" && showShareOptions && (
            <div className="tw-absolute tw-right-0 tw--top-[65%] tw-flex tw-pb-12 tw-text-white">
              {/* <div
                className="tw-border-2"
                // style={{ float: "top", margin: "5px 5px 0 0" }}
                onClick={() => closeSharingMenu()}
              > */}
              <FacebookShareButton
                url={urlShare}
                className="hover:tw-scale-125"
              >
                <FacebookIcon
                  size={30}
                  round={true}
                  style={{ marginRight: "5px" }}
                />
              </FacebookShareButton>
              <LinkedinShareButton
                url={urlShare}
                className="hover:tw-scale-125"
              >
                <LinkedinIcon
                  size={30}
                  round={true}
                  style={{ marginRight: "5px" }}
                />
              </LinkedinShareButton>
              <TwitterShareButton url={urlShare} className="hover:tw-scale-125">
                <TwitterIcon
                  size={30}
                  round={true}
                  style={{ marginRight: "5px" }}
                />
              </TwitterShareButton>
              <RedditShareButton url={urlShare} className="hover:tw-scale-125">
                <RedditIcon
                  size={30}
                  round={true}
                  style={{ marginRight: "5px" }}
                />
              </RedditShareButton>
              <EmailShareButton url={urlShare} className="hover:tw-scale-125">
                <EmailIcon size={30} round={true} />
              </EmailShareButton>
            </div>
            // </div>
          )}
          <ActionIcon
            key={action.name}
            name={action.name}
            icon={action.icon}
            number={action.number}
            handlers={handlers}
          />
        </div>
      ))}
    </div>
  );
}
