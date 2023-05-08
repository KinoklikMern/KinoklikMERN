import React, { useState, useEffect } from "react";
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

export default function EpkSocialAction({ epkInfo , handler}) {
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

  useEffect(() => {
    try {
      http.get(`fepks/byTitle/${epkInfo.title}`).then((response) => {
        // console.log(response.data);
        setFepkInfo(response.data);
        // console.log(fepkInfo);
        setUsersWishesToBuy(response.data.wishes_to_buy.length);
        setUsersFavourites(response.data.favourites.length);
        setUsersLikes(response.data.likes.length);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  // console.log(epkInfo.title);

  // console.log(fepkInfo);
  // console.log(userId);
  // console.log(
  //   fepkInfo?.wishes_to_buy.filter((item) => item._id === userId).length
  // );
  // console.log(
  //   fepkInfo?.favourites.filter((item) => item._id === userId).length
  // );
  // console.log(fepkInfo?.likes.filter((item) => item._id === userId).length);
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

  // function addUserToSharings() {
  //   http.get(`fepks/sharing/${epkInfo._id}/${userId}`);
  //   setSharingClicked(true);
  // }
  const handlers = {
    clickHandler: (name) => {
      if(!user){
        handler();
      }
      else{switch (name) {
        case "wish_to_buy":
          http
            .get(`fepks/wishestobuy/${epkInfo._id}/${userId}`)
            .then((response) => {
              setFepkInfo(response.data);
              console.log(response.data);
              setUsersWishesToBuy(response.data.wishes_to_buy.length);
            })
            .catch((error) => {
              console.error(error);
            });
          break;
        case "favorites":
          http
            .get(`fepks/favourite/${epkInfo._id}/${userId}`)
            .then((response) => {
              setFepkInfo(response.data);
              console.log(response.data);
              setUsersFavourites(response.data.favourites.length);
            })
            .catch((error) => {
              console.error(error);
            });
          break;
        case "likes":
          http
            .get(`fepks/like/${epkInfo._id}/${userId}`)
            .then((response) => {
              setFepkInfo(response.data);
              console.log(response.data);
              setUsersLikes(response.data.likes.length);
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
      }}
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
            <div className="tw-absolute tw-right-0 tw--top-[65%] tw-pb-12 tw-text-white tw-flex">
              {/* <div
                className="tw-border-2"
                // style={{ float: "top", margin: "5px 5px 0 0" }}
                onClick={() => closeSharingMenu()}
              > */}
              <FacebookShareButton url={urlShare} className="hover:tw-scale-125">
                <FacebookIcon
                  size={30}
                  round={true}
                  style={{ marginRight: "5px" }}
                />
              </FacebookShareButton>
              <LinkedinShareButton url={urlShare} className="hover:tw-scale-125">
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

// <React.Fragment key={action.name}>
//   {sharingClicked && action.name === "share" ? (
//     <div
//       className="tw-border-2"
//       // style={{ float: "top", margin: "5px 5px 0 0" }}
//       onClick={() => closeSharingMenu()}
//     >
//       <FacebookShareButton url={urlShare}>
//         <FacebookIcon
//           size={30}
//           round={true}
//           style={{ marginRight: "5px" }}
//         />
//       </FacebookShareButton>
//       <LinkedinShareButton url={urlShare}>
//         <LinkedinIcon
//           size={30}
//           round={true}
//           style={{ marginRight: "5px" }}
//         />
//       </LinkedinShareButton>
//       <TwitterShareButton url={urlShare}>
//         <TwitterIcon
//           size={30}
//           round={true}
//           style={{ marginRight: "5px" }}
//         />
//       </TwitterShareButton>
//       <RedditShareButton url={urlShare}>
//         <RedditIcon
//           size={30}
//           round={true}
//           style={{ marginRight: "5px" }}
//         />
//       </RedditShareButton>
//       <EmailShareButton url={urlShare}>
//         <EmailIcon size={30} round={true} />
//       </EmailShareButton>
//     </div>
//   ) : null}
// </React.Fragment>