/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import SocialMedia from "../../EpkView/EpkHeader/SocialMedia";
import { formatCompactNumber } from "../../../utils/numberFormatters";
import { fetchAndSumFollowers } from "../../../utils/followersHelper";

export default function UserHeader({ data, setGlobalTotalReach }) {
  const [socialMediafollowerTotalNum, setSocialMediaFollowerTotalNum] = useState(0);
  const [platformFollowers, setPlatformFollowers] = useState({ 
    facebook: 0, instagram: 0, twitter: 0, tiktok: 0, linkedin: 0, youtube: 0, newsletter: 0 
  });

  useEffect(() => {
    const getFollowers = async () => {
      if (data?._id) {
        const followerData = await fetchAndSumFollowers([data._id]);
        setPlatformFollowers(followerData.platforms);
        setSocialMediaFollowerTotalNum(formatCompactNumber(followerData.total));
        
        if (setGlobalTotalReach) {
          setGlobalTotalReach(followerData.total); 
        }
      }
    };

    if (data) {
      getFollowers();
    }
  }, [data, setGlobalTotalReach]);

  const socialMediaData = [
    { platform: 'newsletter', followers: formatCompactNumber(platformFollowers.newsletter) },
    { platform: 'facebook', followers: formatCompactNumber(platformFollowers.facebook), url: data?.facebook_url || data?.facebook },
    { platform: 'instagram', followers: formatCompactNumber(platformFollowers.instagram), url: data?.instagram_url || data?.instagram },
    { platform: 'twitter', followers: formatCompactNumber(platformFollowers.twitter), url: data?.twitter_url || data?.twitter },
    { platform: 'tiktok', followers: formatCompactNumber(platformFollowers.tiktok), url: data?.tiktok_url || data?.tiktok },
    { platform: 'linkedin', followers: formatCompactNumber(platformFollowers.linkedin), url: data?.linkedin_url || data?.linkedin },
    { platform: 'youtube', followers: formatCompactNumber(platformFollowers.youtube), url: data?.youtube_url || data?.youtube }
  ];

  return (
    <div className="tw-flex tw-w-full tw-flex-col tw-items-center">
      
      <div className="tw-flex tw-w-full tw-items-center tw-justify-center tw-py-6 tw-min-h-[100px]">
          <div className="tw-flex tw-items-center tw-gap-4">
            <h1 className="tw-px-4 tw-text-center tw-text-3xl md:tw-text-5xl tw-font-bold tw-tracking-wide tw-text-[#C4C4C4] tw-drop-shadow-md">
              {data?.firstName || data?.lastName ? `${data.firstName} ${data.lastName}` : "Unnamed Professional"}
            </h1>
          </div>
      </div>

      {/* SOCIAL BAR */}
      <div className="tw-flex tw-w-full tw-items-center tw-justify-evenly tw-gap-5 tw-py-4">
        <SocialMedia 
          socials={socialMediaData} 
          totalReachNum={socialMediafollowerTotalNum}
          viewCount={data?.viewCount || 0}
        />
      </div>
    </div>
  );
}