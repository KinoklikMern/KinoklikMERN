import React, { useState, useEffect } from 'react';
import SocialMedia from '../../EpkView/EpkHeader/SocialMedia';
import { formatCompactNumber } from '../../../utils/numberFormatters';
import { fetchAndSumFollowers } from '../../../utils/followersHelper';

const PLATFORMS = [
  { key: 'facebook',  label: 'Facebook',  urlField: 'facebook_url',  followersField: 'facebook_followers' },
  { key: 'instagram', label: 'Instagram', urlField: 'instagram_url', followersField: 'instagram_followers' },
  { key: 'twitter',   label: 'Twitter/X', urlField: 'twitter_url',   followersField: 'twitter_followers' },
  { key: 'tiktok',    label: 'TikTok',    urlField: 'tiktok_url',    followersField: 'tiktok_followers' },
  { key: 'youtube',   label: 'YouTube',   urlField: 'youtube_url',   followersField: 'youtube_subs' },
  { key: 'linkedin',  label: 'LinkedIn',  urlField: 'linkedin_url',  followersField: 'linkedin_followers' },
];

export default function UserSocials({ userInfo, isEditMode, onChange }) {
  const [platformFollowers, setPlatformFollowers] = useState({});
  const [totalReachNum, setTotalReachNum] = useState(0);

  useEffect(() => {
    const userId = userInfo?._id;
    if (!userId) return;

    const getFollowers = async () => {
      const data = await fetchAndSumFollowers(userId);
      setPlatformFollowers(data.platforms);
      setTotalReachNum(formatCompactNumber(data.total));
    };

    getFollowers();
  }, [userInfo?._id]);

  const socialMediaData = [
    { platform: 'newsletter', followers: formatCompactNumber(platformFollowers.newsletter || 0) },
    ...PLATFORMS.map(p => ({
      platform: p.key,
      followers: formatCompactNumber(platformFollowers[p.key] || 0),
      url: userInfo?.[p.urlField]
    }))
  ];

  return (
    <section className="tw-w-full tw-px-6 md:tw-px-12 tw-py-10">
      <h2 className="tw-text-[#FF43A7] tw-text-[10px] tw-font-bold tw-uppercase tw-tracking-widest tw-mb-8">
        Social Media &amp; Reach
      </h2>

      {/* The Display View (Always visible) */}
      <div className={isEditMode ? "tw-mb-12" : "tw-mb-0"}>
        <SocialMedia socials={socialMediaData} totalReachNum={totalReachNum} />
      </div>

      {/* The Edit View (Conditional) */}
      {isEditMode && (
        <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-8 tw-animate-in tw-fade-in tw-duration-500">
          {PLATFORMS.map(({ key, label, urlField, followersField }) => (
            <div key={key} className="tw-group tw-flex tw-flex-col tw-gap-3">
              <label className="tw-text-[#FF43A7] tw-text-[9px] tw-font-bold tw-uppercase tw-tracking-widest tw-opacity-80 group-focus-within:tw-opacity-100 tw-transition-opacity">
                {label}
              </label>
              
              <div className="tw-flex tw-flex-col tw-gap-2">
                {/* Profile URL Input */}
                <input
                  type="url"
                  value={userInfo?.[urlField] || ''}
                  onChange={(e) => onChange(urlField, e.target.value)}
                  placeholder={`https://${key}.com/username`}
                  className="tw-w-full tw-bg-[#1E0039] tw-border tw-border-[#5A3F49] focus:tw-border-[#FF43A7] tw-rounded-lg tw-px-3 tw-py-2.5 tw-text-white tw-text-sm tw-outline-none tw-transition-all"
                />
                
                {/* Follower Count Input */}
                <div className="tw-flex tw-items-center tw-gap-2 tw-px-1">
                  <span className="tw-text-[#E2BDC9] tw-text-[10px] tw-uppercase">Followers:</span>
                  <input
                    type="number"
                    value={userInfo?.[followersField] || ''}
                    onChange={(e) => onChange(followersField, e.target.value)}
                    placeholder="0"
                    className="tw-flex-1 tw-bg-transparent tw-border-b tw-border-[#5A3F49]/50 focus:tw-border-[#FF43A7] tw-py-1 tw-text-[#E2BDC9] tw-text-xs tw-outline-none tw-transition-colors"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}