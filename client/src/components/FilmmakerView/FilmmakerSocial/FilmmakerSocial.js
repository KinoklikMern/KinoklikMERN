import { useState, useEffect } from 'react';
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

export default function FilmmakerSocial({ filmmakerInfo, isEditMode, onChange, errors }) {
  const [platformFollowers, setPlatformFollowers] = useState({});
  const [totalReachNum, setTotalReachNum] = useState(0);

  useEffect(() => {
    const filmakerId = filmmakerInfo?._id;
    if (!filmakerId) return;

    const getFollowers = async () => {
      const data = await fetchAndSumFollowers(filmakerId);
      setPlatformFollowers(data.platforms);
      setTotalReachNum(formatCompactNumber(data.total));
    };

    getFollowers();
  }, [filmmakerInfo?._id]);

  const socialMediaData = [
    { platform: 'newsletter', followers: formatCompactNumber(platformFollowers.newsletter || 0) },
    { platform: 'facebook',   followers: formatCompactNumber(platformFollowers.facebook   || 0), url: filmmakerInfo?.facebook_url },
    { platform: 'instagram',  followers: formatCompactNumber(platformFollowers.instagram  || 0), url: filmmakerInfo?.instagram_url },
    { platform: 'twitter',    followers: formatCompactNumber(platformFollowers.twitter    || 0), url: filmmakerInfo?.twitter_url },
    { platform: 'tiktok',     followers: formatCompactNumber(platformFollowers.tiktok     || 0), url: filmmakerInfo?.tiktok_url },
    { platform: 'youtube',    followers: formatCompactNumber(platformFollowers.youtube    || 0), url: filmmakerInfo?.youtube_url },
    { platform: 'linkedin',   followers: formatCompactNumber(platformFollowers.linkedin   || 0), url: filmmakerInfo?.linkedin_url },
  ];

  return (
    <div className="tw-w-full tw-px-6 md:tw-px-12 tw-py-10 tw-border-t tw-border-[#5A3F49]/30">
      <h2 className="tw-text-[#FF43A7] tw-text-xs tw-font-bold tw-uppercase tw-tracking-widest tw-mb-6">
        Social Media &amp; Reach
      </h2>

      <div className="tw-mb-8">
        <SocialMedia socials={socialMediaData} totalReachNum={totalReachNum} split />
      </div>

      {isEditMode && (
        <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-4 tw-mt-6">
          {PLATFORMS.map(({ key, label, urlField, followersField }) => (
            <div key={key} className="tw-flex tw-flex-col tw-gap-1.5">
              <label className="tw-text-[#FF43A7] tw-text-[10px] tw-font-bold tw-uppercase tw-tracking-widest">
                {label}
              </label>
              <input
                type="url"
                value={filmmakerInfo?.[urlField] || ''}
                onChange={(e) => onChange(urlField, e.target.value)}
                placeholder={`https://${key}.com/yourprofile`}
                className={`tw-bg-[#1E0039] tw-border ${errors?.[urlField] ? 'tw-border-red-500' : 'tw-border-[#5A3F49]'} focus:tw-border-[#FF43A7] tw-rounded-lg tw-px-3 tw-py-2.5 tw-text-white tw-text-sm tw-outline-none tw-transition-colors`}
              />
              {errors?.[urlField] && (
                <p className="tw-text-red-400 tw-text-xs tw-m-0 tw-mt-0.5">{errors[urlField]}</p>
              )}
              <input
                type="text"
                value={filmmakerInfo?.[followersField] || ''}
                onChange={(e) => onChange(followersField, e.target.value)}
                placeholder="Follower count (e.g. 12500)"
                className={`tw-bg-[#1E0039] tw-border ${errors?.[followersField] ? 'tw-border-red-500' : 'tw-border-[#5A3F49]'} focus:tw-border-[#FF43A7] tw-rounded-lg tw-px-3 tw-py-2 tw-text-[#E2BDC9] tw-text-xs tw-outline-none tw-transition-colors`}
              />
              {errors?.[followersField] && (
                <p className="tw-text-red-400 tw-text-xs tw-m-0 tw-mt-0.5">{errors[followersField]}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
