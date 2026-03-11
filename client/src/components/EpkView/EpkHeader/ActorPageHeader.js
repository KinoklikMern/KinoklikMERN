import React, { useState, useEffect } from 'react';
import SocialMedia from './SocialMedia'; 
import { formatCompactNumber } from '../../../utils/numberformatters'; 
import { fetchAndSumFollowers } from '../../../utils/followersHelper';

export default function ActorPageHeader({ epkInfo, id }) {
  const [socialMediafollowerTotalNum, setSocialMediaFollowerTotalNum] = useState(0);
  const [platformFollowers, setPlatformFollowers] = useState({ facebook: 0, instagram: 0, twitter: 0, tiktok: 0 ,linkedin: 0, youtube: 0, newsletter: 0});

  useEffect(() => {
    const getFollowers = async () => {
      if (!id) return;
      const data = await fetchAndSumFollowers(id);
      setPlatformFollowers(data.platforms);
      setSocialMediaFollowerTotalNum(formatCompactNumber(data.total));
    };
    getFollowers();
  }, [id]);
  const socialMediaData = [
    { platform: 'newsletter', followers: formatCompactNumber(platformFollowers.newsletter) },
    { platform: 'facebook', followers: formatCompactNumber(platformFollowers.facebook), url: epkInfo?.facebook_url || epkInfo?.facebook },
    { platform: 'instagram', followers: formatCompactNumber(platformFollowers.instagram), url: epkInfo?.instagram_url || epkInfo?.instagram },
    { platform: 'twitter', followers: formatCompactNumber(platformFollowers.twitter), url: epkInfo?.twitter_url || epkInfo?.twitter },
    { platform: 'tiktok', followers: formatCompactNumber(platformFollowers.tiktok), url: epkInfo?.tiktok_url || epkInfo?.tiktok },
    { platform: 'linkedin', followers: formatCompactNumber(platformFollowers.linkedIn || platformFollowers.linkedin), url: epkInfo?.linkedin_url || epkInfo?.linkedin },
    { platform: 'youtube', followers: formatCompactNumber(platformFollowers.youtube), url: epkInfo?.youtube_url || epkInfo?.youtube }
  ];
  //console.log("Database JSON (epkInfo):", epkInfo);

  return (
    <div className="tw-container tw-mx-auto tw-my-16 tw-w-full">
      <SocialMedia 
        socials={socialMediaData} 
        totalReachNum={socialMediafollowerTotalNum}
      />
    </div>
  );
}