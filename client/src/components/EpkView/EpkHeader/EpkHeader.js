import React, { useState, useEffect } from "react";
import { getFepkFollowersNumber } from "../../../api/epks";
import Audience from "../../../images/audienceIcon.svg";
import SocialMedia from "./SocialMedia";
import {
  faFacebookSquare,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

export default function EpkHeader({ epkInfo }) {
  const [socialMediafollowerTotalNum, setSocialMediaFollowerTotalNum] =
    useState(0);
  const [socialMediasList, setSocialMediasList] = useState([
    {
      name: "facebook",
      fontawesome_icon: faFacebookSquare,
      followers: 0,
      color: "#285FB2",
    },
    {
      name: "instagram",
      fontawesome_icon: faInstagram,
      followers: 0,
      color: "#E938C2",
    },
    {
      name: "twitter",
      fontawesome_icon: faTwitter,
      followers: 0,
      color: "#4FBAF7",
    },
  ]);

  useEffect(() => {
    let totalFollowers = 0;
    if (epkInfo) {
      getFepkFollowersNumber(epkInfo?._id).then((res) => {
        totalFollowers = formatCompactNumber(
          res.facebook + res.instagram + res.twitter
        );
        setSocialMediaFollowerTotalNum(totalFollowers);
        const newMediaList = socialMediasList.map((media) => {
          if (media.name == "facebook") {
            return { ...media, followers: formatCompactNumber(res.facebook) };
          }
          if (media.name == "instagram") {
            return { ...media, followers: formatCompactNumber(res.instagram) };
          }
          if (media.name == "twitter") {
            return { ...media, followers: formatCompactNumber(res.twitter) };
          }
          return media;
        });
        setSocialMediasList(newMediaList);
      });
    }
  }, [epkInfo]);

  function formatCompactNumber(number) {
    if (number < 1000) {
      return number;
    } else if (number >= 1000 && number < 1_000_000) {
      return (number / 1000).toFixed(2).replace(/\.0$/, "") + "K";
    } else if (number >= 1_000_000 && number < 1_000_000_000) {
      return (number / 1_000_000).toFixed(2).replace(/\.0$/, "") + "M";
    } else if (number >= 1_000_000_000 && number < 1_000_000_000_000) {
      return (number / 1_000_000_000).toFixed(2).replace(/\.0$/, "") + "B";
    } else if (number >= 1_000_000_000_000 && number < 1_000_000_000_000_000) {
      return (number / 1_000_000_000_000).toFixed(2).replace(/\.0$/, "") + "T";
    }
  }
  return (
    <div className="tw-flex tw-my-6 tw-gap-36">
      <div className="tw-flex tw-gap-6">
        <span className="tw-text-3xl tw-font-semibold tw-text-white">
          Total Audience Reach
        </span>
        <img
          src={Audience}
          style={{ width: "40px", height: "40px" }}
          alt="audience icon"
        />
        <span className="tw-text-3xl tw-font-semibold tw-text-white">
          {socialMediafollowerTotalNum}
        </span>
      </div>
      <div className="tw-flex tw-gap-10">
        {socialMediasList?.map((media, index) => (
          <SocialMedia
            key={index}
            icon={media.fontawesome_icon}
            followerNum={media.followers}
            name={media.name}
            color={media.color}
          />
        ))}
      </div>
    </div>
  );
}
