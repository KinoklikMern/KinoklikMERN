/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from "react";
import ActionIcon from "./ActionIcon";
import DonationIcon from "../../../images/icons/Donation.svg";
import DonationBlackIcon from "../../../images/icons/DonationBlack.svg";
import DollarIcon from "../../../images/icons/DollarIcon.svg";
import DollarBlackIcon from "../../../images/icons/DollarBlackIcon.svg";
import PlusIcon from "../../../images/icons/PlusWhite.svg";
import PlusBlackIcon from "../../../images/icons/PlusBlack.svg";
import StarIcon from "../../../images/icons/StarWhite.svg";
import StarBlackIcon from "../../../images/icons/StarBlack.svg";
//import KIcon from "../../../images/icons/K.svg";
import ShareIcon from "../../../images/icons/share.svg";
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
import SocialShareModal from "./SocialShareModal";
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

  const [usersWishesToDonate, setUsersWishesToDonate] = useState(
    epkInfo.wishes_to_donate?.length || 0
  );

  const hasDonateLinks = epkInfo.DonatePayPal_url || epkInfo.DonateStripe_url;

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
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  //Yeming added
  const { incrementNotification, filmmakerInfo, setFilmmakerInfo } =
    useContext(NotificationContext);

  useEffect(() => {
    try {
      http.get(`fepks/byTitle/${epkInfo.title}`).then((response) => {
        // console.log(response.data);
        setFepkInfo(response.data);
        // console.log(fepkInfo);
        setUsersWishesToDonate(response.data.wishes_to_donate?.length || 0);
        //setUsersWishesToDonate(response.data.wishes_to_donate.length);
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
  }, [epkInfo.title]);

  const actionList = [
    {
      name: "wish_to_donate",
      icon: hasDonateLinks
        ? fepkInfo?.wishes_to_donate?.filter((item) => item._id === userId)
            .length !== 0
          ? DonationBlackIcon
          : DonationIcon
        : null, // Set to null if there are no donation links
      number: hasDonateLinks ? usersWishesToDonate : 0, // Set to 0 if there are no donation links
      width: "",
    },
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
    // {
    //   name: "K",
    //   icon: KIcon,
    // },
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
          case "wish_to_donate":
            handler("wish_to_donate"); // Use the handler function to open the donation modal

            // Make an HTTP GET request using the Axios library (you can import Axios if it's not already imported)
            // Replace 'axios.get' with your actual HTTP request method

            http
              .get(`fepks/wishestodonate/${epkInfo._id}/${userId}`)
              .then((response) => {
                setFepkInfo(response.data);
                console.log(response.data);
                setUsersWishesToDonate(response.data.wishes_to_donate.length);
              })
              .catch((error) => {
                console.error(error);
              });
            break;

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
          // case "K":
          //   openUrl(epkInfo.kickstarter_url);
          //   break;
          case "share":
            // closeSharingMenu();
            setIsShareModalOpen(true);
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
    },
  };

  const closeShareModal = () => {
    setIsShareModalOpen(false);
  };


  return (
    <div className="tw-relative tw-flex tw-justify-between tw-bg-opacity-100 tw-px-6 tw-py-12">
      {/* Social media sharing Icons */}
      {actionList.map(
        (action) =>
          action.icon !== null && (
            <div
              className="tw-relative"
              onMouseOver={() => handlers.hoverHandler("onMouseOver")}
              onMouseOut={() => handlers.hoverHandler("onMouseOut")}
            >
              {/* Social media sharing modal */}
              <SocialShareModal
                isOpen={isShareModalOpen}
                urlShare={urlShare}
                closeModal={closeShareModal}
              />
              {action.name === "share" && showShareOptions && (
                <div className="tw-absolute tw--top-[65%] tw-right-0 tw-flex tw-pb-12 tw-text-white">
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
                  <TwitterShareButton
                    url={urlShare}
                    className="hover:tw-scale-125"
                  >
                    <TwitterIcon
                      size={30}
                      round={true}
                      style={{ marginRight: "5px" }}
                    />
                  </TwitterShareButton>
                  <RedditShareButton
                    url={urlShare}
                    className="hover:tw-scale-125"
                  >
                    <RedditIcon
                      size={30}
                      round={true}
                      style={{ marginRight: "5px" }}
                    />
                  </RedditShareButton>
                  <EmailShareButton
                    url={urlShare}
                    className="hover:tw-scale-125"
                  >
                    <EmailIcon size={30} round={true} />
                  </EmailShareButton>
                </div>
              )}
              <ActionIcon
                key={action.name}
                name={action.name}
                icon={action.icon}
                number={action.number}
                handlers={handlers}
              />
            </div>
          )
      )}
    </div>
  );
}
