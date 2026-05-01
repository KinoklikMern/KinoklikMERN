import  { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import SocialMedia from "./SocialMedia";
import { formatCompactNumber } from "../../../utils/numberFormatters";
import { fetchAndSumFollowers } from "../../../utils/followersHelper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

export default function EpkHeader({ epkInfo,setGlobalTotalReach,isEditMode,onChange }) {
  const { t } = useTranslation();
  const [socialMediafollowerTotalNum, setSocialMediaFollowerTotalNum] = useState(0);
  const [platformFollowers, setPlatformFollowers] = useState({ facebook: 0, instagram: 0, twitter: 0, tiktok: 0, linkedin: 0, youtube: 0, newsletter: 0 });
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [tempTitle, setTempTitle] = useState(epkInfo?.title || "");

  useEffect(() => {
    setTempTitle(epkInfo?.title || "");
  }, [epkInfo?.title]);

  useEffect(() => {
    const getFollowers = async () => {
      const idsToFetch = [];
      if (epkInfo?.film_maker?._id) {
        idsToFetch.push(epkInfo.film_maker._id);
      }
      if (epkInfo?.actors && epkInfo.actors.length > 0) {
        epkInfo.actors.forEach(actor => {
          if (actor._id) idsToFetch.push(actor._id);
        });
      }

      if (idsToFetch.length > 0) {
        const data = await fetchAndSumFollowers(idsToFetch);
        setPlatformFollowers(data.platforms);
        setSocialMediaFollowerTotalNum(formatCompactNumber(data.total));
        if (setGlobalTotalReach) {
          setGlobalTotalReach(data.total); 
        }
      }
    };

    if (epkInfo) {
      getFollowers();
    }
  }, [epkInfo, setGlobalTotalReach]);

  const handleTitleSubmit = () => {
    setIsEditingTitle(false);
    if (tempTitle.trim() !== "" && tempTitle !== epkInfo?.title) {
      onChange("title", tempTitle);
    } else {
      setTempTitle(epkInfo?.title || "");
    }
  };

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
      <div className="tw-flex tw-w-full tw-items-center tw-justify-center tw-py-6 tw-min-h-[100px]">
        {isEditingTitle ? (
          <div className="tw-flex tw-flex-col sm:tw-flex-row tw-items-center tw-gap-3 tw-w-full tw-max-w-3xl tw-px-4">
            <input
              type="text"
              value={tempTitle}
              onChange={(e) => setTempTitle(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleTitleSubmit(); }}
              autoFocus
              className="tw-flex-1 tw-w-full tw-bg-[#1F0439] tw-text-white tw-text-center tw-text-3xl md:tw-text-5xl tw-font-bold tw-tracking-wide tw-py-3 tw-px-4 tw-rounded-xl tw-border-2 tw-border-[#FF43A7] tw-outline-none tw-shadow-lg"
              placeholder={t("Enter EPK Title")}
            />
            <button 
              onClick={handleTitleSubmit} 
              className="tw-bg-[#FF43A7] tw-border-none tw-text-[#570033] tw-px-8 tw-py-3 tw-rounded-lg tw-font-bold tw-text-sm hover:tw-bg-[#ff5cac] tw-transition-colors tw-shadow-lg tw-cursor-pointer tw-shrink-0"
            >
              {t("Save Title")}
            </button>
          </div>
        ) : (
          <div className="tw-flex tw-items-center tw-gap-4">
            <h1 className="tw-px-4 tw-text-center tw-text-3xl md:tw-text-5xl tw-font-bold tw-tracking-wide tw-text-[#C4C4C4] tw-drop-shadow-md">
              {epkInfo?.title || t("Untitled EPK")}
            </h1>
            {isEditMode && (
              <button 
                onClick={() => setIsEditingTitle(true)} 
                className="tw-bg-[#FF43A7] tw-border-none tw-w-10 tw-h-10 tw-rounded-lg tw-flex tw-items-center tw-justify-center tw-shrink-0 hover:tw-scale-105 tw-transition-transform tw-shadow-md tw-cursor-pointer"
              >
                <FontAwesomeIcon icon={faPen} className="tw-text-[#570033] tw-text-base" />
              </button>
            )}
          </div>
        )}
      </div>

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