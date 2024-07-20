import React, { useState, useEffect } from 'react';
import { getActorFollowersNumber } from '../../../api/epks';
import Audience from '../../../images/audienceIcon.svg';
import SocialMedia from './SocialMedia';
import {
  faFacebookSquare,
  faInstagram,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { useTranslation } from 'react-i18next';

export default function ActorPageHeader({ epkInfo, id }) {
  const [socialMediafollowerTotalNum, setSocialMediaFollowerTotalNum] =
    useState(0);
  const { t } = useTranslation();

  const [socialMediasList, setSocialMediasList] = useState([
    {
      name: 'facebook',
      fontawesome_icon: faFacebookSquare,
      followers: 0,
      color: '#285FB2',
    },
    {
      name: 'instagram',
      fontawesome_icon: faInstagram,
      followers: 0,
      color: '#E938C2',
    },
    {
      name: 'twitter',
      fontawesome_icon: faTwitter,
      followers: 0,
      color: '#4FBAF7',
    },
  ]);

  useEffect(() => {
    const fetchAndSumActorFollowers = async () => {
      try {
        const followers = await getActorFollowersNumber(id);

        const facebookFollowers = parseInt(followers.facebook) || 0;
        const instagramFollowers = parseInt(followers.instagram) || 0;
        const twitterFollowers = parseInt(followers.twitter) || 0;

        const totalFollowers =
          facebookFollowers + instagramFollowers + twitterFollowers;

        const updatedSocialMediasList = socialMediasList.map((media) => {
          let followerCount = 0;
          if (media.name === 'facebook') {
            followerCount = facebookFollowers || 0;
          } else if (media.name === 'instagram') {
            followerCount = instagramFollowers || 0;
          } else if (media.name === 'twitter') {
            followerCount = twitterFollowers || 0;
          }
          return { ...media, followers: formatCompactNumber(followerCount) };
        });

        setSocialMediasList(updatedSocialMediasList);

        setSocialMediaFollowerTotalNum(formatCompactNumber(totalFollowers));
      } catch (error) {
        console.error('Error fetching followers', error);
      }
    };

    if (id) {
      fetchAndSumActorFollowers();
    } else {
      console.log('ID is not defined');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [epkInfo]);

  function formatCompactNumber(number) {
    if (number < 1000) {
      return number;
    } else if (number >= 1000 && number < 1_000_000) {
      return (number / 1000).toFixed(2).replace(/\.0$/, '') + 'K';
    } else if (number >= 1_000_000 && number < 1_000_000_000) {
      return (number / 1_000_000).toFixed(2).replace(/\.0$/, '') + 'M';
    } else if (number >= 1_000_000_000 && number < 1_000_000_000_000) {
      return (number / 1_000_000_000).toFixed(2).replace(/\.0$/, '') + 'B';
    } else if (number >= 1_000_000_000_000 && number < 1_000_000_000_000_000) {
      return (number / 1_000_000_000_000).toFixed(2).replace(/\.0$/, '') + 'T';
    }
  }
  return (
    <div className="tw-container tw-mx-auto tw-my-16 tw-flex tw-flex-col tw-justify-between md:tw-flex-row">
      <div className="tw-flex tw-flex-col tw-items-center tw-text-center md:tw-w-1/3 md:tw-flex-row md:tw-gap-6">
        <span className="tw-text-3xl tw-font-semibold tw-text-white md:tw-text-xl lg:tw-text-3xl">
          {t('Total Audience Reach')}
        </span>
        <img src={Audience} alt="audience icon" className="tw-h-10 tw-w-10" />
        <span className="tw-text-3xl tw-font-semibold tw-text-white md:tw-text-xl lg:tw-text-3xl">
          {socialMediafollowerTotalNum}
        </span>
      </div>
      <div className="tw-mx-auto tw-mt-4 tw-flex tw-justify-between tw-gap-5 md:tw-mx-0 md:tw-mt-0 md:tw-w-1/2 md:tw-gap-10">
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
