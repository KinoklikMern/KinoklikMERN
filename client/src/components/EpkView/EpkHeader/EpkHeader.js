import React, { useState, useEffect } from "react";
import SocialMedia from "./SocialMedia";
import { formatCompactNumber } from "../../../utils/numberFormatters";
import { fetchAndSumFollowers } from "../../../utils/followersHelper";

export default function EpkHeader({ epkInfo,setGlobalTotalReach }) {
  const [socialMediafollowerTotalNum, setSocialMediaFollowerTotalNum] = useState(0);
  const [platformFollowers, setPlatformFollowers] = useState({ facebook: 0, instagram: 0, twitter: 0, tiktok: 0, linkedin: 0, youtube: 0, newsletter: 0 });

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
        if (setGlobalTotalReach) {
          setGlobalTotalReach(data.total); // Update the global total reach in the parent component
        }
      }
    };

    if (epkInfo) {
      getFollowers();
    }
  }, [epkInfo, setGlobalTotalReach]);

  const socialMediaData = [
    { platform: 'newsletter', followers: formatCompactNumber(platformFollowers.newsletter) },
    { platform: 'facebook', followers: formatCompactNumber(platformFollowers.facebook), url: epkInfo?.film_maker?.facebook_url || epkInfo?.film_maker?.facebook },
    { platform: 'instagram', followers: formatCompactNumber(platformFollowers.instagram), url: epkInfo?.film_maker?.instagram_url || epkInfo?.film_maker?.instagram },
    { platform: 'twitter', followers: formatCompactNumber(platformFollowers.twitter), url: epkInfo?.film_maker?.twitter_url || epkInfo?.film_maker?.twitter },
    { platform: 'tiktok', followers: formatCompactNumber(platformFollowers.tiktok), url: epkInfo?.film_maker?.tiktok_url || epkInfo?.film_maker?.tiktok },
    { platform: 'linkedin', followers: formatCompactNumber(platformFollowers.linkedin || platformFollowers.linkedIn), url: epkInfo?.film_maker?.linkedin_url || epkInfo?.film_maker?.linkedin },
    { platform: 'youtube', followers: formatCompactNumber(platformFollowers.youtube), url: epkInfo?.film_maker?.youtube_url || epkInfo?.film_maker?.youtube }
  ];

  return (
    <div className="tw-flex tw-w-full tw-flex-col tw-items-center">
      
      {/* 1. TITLE (Centered at the very top) */}
      {epkInfo?.title && (
        <div className="tw-flex tw-w-full tw-items-center tw-justify-center tw-py-6">
          <h1 className="tw-px-4 tw-text-center tw-text-3xl md:tw-text-5xl tw-font-bold tw-tracking-wide tw-text-[#C4C4C4] tw-drop-shadow-md">
            {epkInfo.title}
          </h1>
        </div>
      )}

      {/* 2. SOCIAL MEDIA BAR (Stacked directly underneath the title) */}
      <div className="tw-flex tw-w-full tw-items-center tw-justify-evenly tw-gap-5 tw-py-4">
        <SocialMedia 
          socials={socialMediaData} 
          totalReachNum={socialMediafollowerTotalNum}
          viewCount={epkInfo?.viewCount || 0}
        />
      </div>
      
    </div>
  );
}