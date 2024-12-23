import React, { useState, useEffect } from "react";
import { getActorFollowersNumber } from "../../../api/epks";
import Audience from "../../../images/audienceIcon.svg";
import SocialMedia from "./SocialMedia";
import {
  faFacebookSquare,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
// import { useTranslation } from "react-i18next";

export default function EpkHeader({ epkInfo }) {
  //console.log("epk info:", epkInfo);
  // const { t } = useTranslation();

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
    const fetchAndSumActorFollowers = async () => {
      let totalFacebookFollowers =
        parseInt(epkInfo.film_maker.facebook_followers, 10) || 0;
      let totalInstagramFollowers =
        parseInt(epkInfo.film_maker.instagram_followers, 10) || 0;
      let totalTwitterFollowers =
        parseInt(epkInfo.film_maker.twitter_followers, 10) || 0;

      // Iterate through each actor in the actors array
      for (const actor of epkInfo.actors) {
        try {
          const res = await getActorFollowersNumber(actor._id);
          // Update total followers for each platform
          totalFacebookFollowers += parseInt(res.facebook, 10) || 0;
          totalInstagramFollowers += parseInt(res.instagram, 10) || 0;
          totalTwitterFollowers += parseInt(res.twitter, 10) || 0;
        } catch (error) {
          console.error(
            "Failed to fetch followers for actor",
            actor._id,
            error
          );
        }
      }

      // Update state once all actor followers are fetched
      setSocialMediaFollowerTotalNum(
        formatCompactNumber(
          totalFacebookFollowers +
            totalInstagramFollowers +
            totalTwitterFollowers
        )
      );

      setSocialMediasList(
        socialMediasList.map((media) => {
          let followersCount;
          if (media.name === "facebook") {
            followersCount = totalFacebookFollowers;
          } else if (media.name === "instagram") {
            followersCount = totalInstagramFollowers;
          } else if (media.name === "twitter") {
            followersCount = totalTwitterFollowers;
          }
          return {
            ...media,
            followers: formatCompactNumber(followersCount),
          };
        })
      );
    };

    if (epkInfo?.actors && epkInfo.actors.length > 0) {
      fetchAndSumActorFollowers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <div className="tw-w-full tw-flex tw-justify-evenly tw-items-center tw-gap-5 tw-py-4">

          {/* Audience Reach */}
          <div className="tw-flex tw-items-center ">
            <img src={Audience} alt="audience icon"
                 className="tw-h-6 tw-w-6 tw-filter tw-brightness-50 tw-contrast-200"/>
            <span className="tw-text-m tw-font-semibold tw-text-customGray">
          {socialMediafollowerTotalNum}
        </span>
          </div>

          {socialMediasList?.map((media, index) => (
              <SocialMedia
                  key={index}
                  icon={media.fontawesome_icon}
                  followerNum={media.followers}
                  name={media.name}
                  color={"#868585"}
              />
          ))}



      </div>
  );
}
