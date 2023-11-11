import React, { useState, useEffect } from "react";
import { getActorFollowersNumber } from "../../../api/epks";
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
    const fetchAndSumActorFollowers = async () => {
      let totalFacebookFollowers = 0;
      let totalInstagramFollowers = 0;
      let totalTwitterFollowers = 0;

      const actorPromises = epkInfo.actors.map(async (actor) => {
        try {
          const res = await getActorFollowersNumber(actor._id);
          totalFacebookFollowers += parseInt(res.facebook, 10);
          totalInstagramFollowers += parseInt(res.instagram, 10);
          totalTwitterFollowers += parseInt(res.twitter, 10);
        } catch (error) {
          console.error(
            "Failed to fetch followers for actor",
            actor._id,
            error
          );
        }
      });

      await Promise.all(actorPromises);

      // Once all promises are resolved, update the state
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
    <div className='tw-container tw-mx-auto tw-my-16 tw-flex tw-flex-col tw-justify-between md:tw-flex-row'>
      <div className='tw-flex tw-flex-col tw-text-center md:tw-w-1/3 md:tw-flex-row md:tw-gap-6'>
        <span className='tw-text-3xl tw-font-semibold tw-text-white'>
          Total Audience Reach
        </span>
        <img
          src={Audience}
          style={{ width: "40px", height: "40px" }}
          alt='audience icon'
        />
        <span className='tw-text-3xl tw-font-semibold tw-text-white'>
          {socialMediafollowerTotalNum}
        </span>
      </div>
      <div className='tw-mx-auto tw-mt-4 tw-flex tw-justify-between tw-gap-5 md:tw-mx-0 md:tw-mt-0 md:tw-w-1/2 md:tw-gap-10'>
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
