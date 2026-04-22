/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import SocialMedia from "../../EpkView/EpkHeader/SocialMedia";
import { formatCompactNumber } from "../../../utils/numberFormatters";
import { fetchAndSumFollowers } from "../../../utils/followersHelper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

export default function UserHeader({ data, setGlobalTotalReach, isEditMode, onChange }) {
  const [socialMediafollowerTotalNum, setSocialMediaFollowerTotalNum] = useState(0);
  const [platformFollowers, setPlatformFollowers] = useState({ 
    facebook: 0, instagram: 0, twitter: 0, tiktok: 0, linkedin: 0, youtube: 0, newsletter: 0 
  });
  
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempNames, setTempNames] = useState({ 
    firstName: "", 
    lastName: "" 
  });

  // Keep tempNames in sync with incoming data
  useEffect(() => {
    setTempNames({ 
      firstName: data?.firstName || "", 
      lastName: data?.lastName || "" 
    });
  }, [data?.firstName, data?.lastName]);

  // Fetch follower counts when ID changes
  useEffect(() => {
    let isMounted = true;

    const getFollowers = async () => {
      if (data?._id) {
        try {
          const result = await fetchAndSumFollowers([data._id]);
          if (isMounted) {
            setPlatformFollowers(result.platforms);
            const totalCompact = formatCompactNumber(result.total);
            setSocialMediaFollowerTotalNum(totalCompact);
            if (setGlobalTotalReach) setGlobalTotalReach(result.total);
          }
        } catch (err) {
          console.error("Error fetching followers:", err);
        }
      }
    };

    getFollowers();
    return () => { isMounted = false; };
  }, [data?._id, setGlobalTotalReach]);

  const handleNameSubmit = () => {
    setIsEditingName(false);
    if (tempNames.firstName.trim() !== "" || tempNames.lastName.trim() !== "") {
      onChange("firstName", tempNames.firstName);
      onChange("lastName", tempNames.lastName);
    } else {
      setTempNames({ firstName: data?.firstName || "", lastName: data?.lastName || "" });
    }
  };

  // Map socials using data directly for the URLs to ensure they update instantly on change
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
      
      {/* NAME SECTION */}
      <div className="tw-flex tw-w-full tw-items-center tw-justify-center tw-py-6 tw-min-h-[100px]">
        {isEditingName ? (
          <div className="tw-flex tw-flex-col sm:tw-flex-row tw-items-center tw-gap-3 tw-w-full tw-max-w-3xl tw-px-4">
            <input
              type="text"
              value={tempNames.firstName}
              onChange={(e) => setTempNames(prev => ({...prev, firstName: e.target.value}))}
              className="tw-flex-1 tw-w-full tw-bg-[#1F0439] tw-text-white tw-text-center tw-text-3xl md:tw-text-5xl tw-font-bold tw-py-3 tw-px-4 tw-rounded-xl tw-border-2 tw-border-[#FF43A7] tw-outline-none"
              placeholder="First Name"
            />
            <input
              type="text"
              value={tempNames.lastName}
              onChange={(e) => setTempNames(prev => ({...prev, lastName: e.target.value}))}
              onKeyDown={(e) => e.key === 'Enter' && handleNameSubmit()}
              className="tw-flex-1 tw-w-full tw-bg-[#1F0439] tw-text-white tw-text-center tw-text-3xl md:tw-text-5xl tw-font-bold tw-py-3 tw-px-4 tw-rounded-xl tw-border-2 tw-border-[#FF43A7] tw-outline-none"
              placeholder="Last Name"
            />
            <button 
              onClick={handleNameSubmit} 
              className="tw-bg-[#FF43A7] tw-border-none tw-text-[#570033] tw-px-8 tw-py-3 tw-rounded-lg tw-font-bold tw-cursor-pointer"
            >
              Save
            </button>
          </div>
        ) : (
          <div className="tw-flex tw-items-center tw-gap-4">
            <h1 className="tw-px-4 tw-text-center tw-text-3xl md:tw-text-5xl tw-font-bold tw-tracking-wide tw-text-white tw-drop-shadow-md">
              {data?.firstName || data?.lastName ? `${data.firstName} ${data.lastName}` : "Unnamed Professional"}
            </h1>
            {isEditMode && (
              <button 
                onClick={() => setIsEditingName(true)} 
                className="tw-bg-[#FF43A7] tw-border-none tw-w-10 tw-h-10 tw-rounded-lg tw-flex tw-items-center tw-justify-center tw-cursor-pointer hover:tw-scale-105 tw-transition-transform"
              >
                <FontAwesomeIcon icon={faPen} className="tw-text-[#570033]" />
              </button>
            )}
          </div>
        )}
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