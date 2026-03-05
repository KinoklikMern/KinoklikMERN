import React, { useState, useEffect } from "react";
import SocialMedia from "./SocialMedia";
import { formatCompactNumber } from "../../../utils/numberformatters";
import { fetchAndSumFollowers } from "../../../utils/followersHelper";

export default function EpkHeader({ epkInfo }) {
  const [socialMediafollowerTotalNum, setSocialMediaFollowerTotalNum] = useState(0);
  const [platformFollowers, setPlatformFollowers] = useState({ facebook: 0, instagram: 0, twitter: 0, tiktok: 0, linkedin: 0, youtube: 0 });

  useEffect(() => {
    const getFollowers = async () => {
      // 1. Gather Filmmaker ID + All Actor IDs
      const idsToFetch = [];
      if (epkInfo?.film_maker?._id) {
        idsToFetch.push(epkInfo.film_maker._id);
      }
      if (epkInfo?.actors && epkInfo.actors.length > 0) {
        epkInfo.actors.forEach(actor => {
          if (actor._id) idsToFetch.push(actor._id);
        });
      }

      // 2. Fetch them all at once using the Helper!
      if (idsToFetch.length > 0) {
        const data = await fetchAndSumFollowers(idsToFetch);
        setPlatformFollowers(data.platforms);
        setSocialMediaFollowerTotalNum(formatCompactNumber(data.total));
      }
    };

    if (epkInfo) {
      getFollowers();
    }
  }, [epkInfo]);

  const socialMediaData = [
    { platform: 'facebook', followers: formatCompactNumber(platformFollowers.facebook), url: epkInfo?.film_maker?.facebook_url || epkInfo?.film_maker?.facebook },
    { platform: 'instagram', followers: formatCompactNumber(platformFollowers.instagram), url: epkInfo?.film_maker?.instagram_url || epkInfo?.film_maker?.instagram },
    { platform: 'twitter', followers: formatCompactNumber(platformFollowers.twitter), url: epkInfo?.film_maker?.twitter_url || epkInfo?.film_maker?.twitter },
    { platform: 'tiktok', followers: formatCompactNumber(platformFollowers.tiktok), url: epkInfo?.film_maker?.tiktok_url || epkInfo?.film_maker?.tiktok },
    { platform: 'linkedin', followers: formatCompactNumber(platformFollowers.linkedin || platformFollowers.linkedIn), url: epkInfo?.film_maker?.linkedin_url || epkInfo?.film_maker?.linkedin },
    { platform: 'youtube', followers: formatCompactNumber(platformFollowers.youtube), url: epkInfo?.film_maker?.youtube_url || epkInfo?.film_maker?.youtube }
  ];

  return (
    <div className="tw-w-full tw-flex tw-justify-evenly tw-items-center tw-gap-5 tw-py-4">
      <SocialMedia 
        socials={socialMediaData} 
        totalReachNum={socialMediafollowerTotalNum}
      />
    </div>
  );
}