/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import ActionIcon from '../../EpkView/EpkSocialAction/ActionIcon';
import PlusIcon from '../../../images/icons/PlusWhite.svg';
import PlusBlackIcon from '../../../images/icons/PlusBlack.svg';
import StarIcon from '../../../images/icons/StarWhite.svg';
import StarBlackIcon from '../../../images/icons/StarBlack.svg';
import ShareIcon from '../../../images/icons/share.svg';
import http from '../../../http-common';
import { useSelector } from 'react-redux';

import SocialShareModal from '../../EpkView/EpkSocialAction/SocialShareModal';
import { NotificationContext } from '../../../context/NotificationContext';

export default function UserSocialAction({ data, isEditMode }) {
  const user = useSelector((state) => state.user);
  const userId = user?.id || '0';
  
  const [profileData, setProfileData] = useState(data);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const currentUrl = window.location.href;
  const urlShare = `Check out ${data?.firstName || 'this'}'s professional portfolio on KinoKlik! ${currentUrl}`;

  const { incrementNotification } = useContext(NotificationContext);

  useEffect(() => {
    setProfileData(data);
  }, [data]);

  const checkActive = (arr) => arr?.some((item) => item === userId || item?._id === userId);

  const actionList = [
    {
      name: 'favourites',
      icon: checkActive(profileData?.favourites) ? PlusBlackIcon : PlusIcon,
      number: profileData?.favourites?.length || 0,
      hover: 'Add To Roster',
      isActive: checkActive(profileData?.favourites),
    },
    {
      name: 'likes',
      icon: checkActive(profileData?.likes) ? StarBlackIcon : StarIcon,
      number: profileData?.likes?.length || 0,
      hover: 'Like Profile',
      isActive: checkActive(profileData?.likes),
    },
    {
      name: 'share',
      icon: ShareIcon,
      number: profileData?.sharings?.length || 0, 
      hover: 'Share',
      isActive: checkActive(profileData?.sharings), 
    },
  ];

  const handlers = {
    clickHandler: (name) => {
      // 1. If we are in Edit Mode, we don't want the icons to perform actions
      if (isEditMode) return;

      // 2. Handle Sharing (Available to guests and logged-in users)
      if (name === 'share') {
        setIsShareModalOpen(true);
        if (userId !== '0') {
          http.get(`users/sharing/${data._id}/${userId}`)
            .then(res => setProfileData(res.data))
            .catch(err => console.error(err));
        }
        return;
      }

      // 3. Handle Protected Actions (Like/Favorite)
      if (userId === '0') {
        alert("Please log in to interact with this profile.");
        return;
      }

      const isCurrentlyActive = checkActive(profileData?.[name]);
      
      // Points to 'users/likes/...' or 'users/favourites/...'
      http.get(`users/${name}/${data._id}/${userId}`)
        .then((response) => {
          setProfileData(response.data);
          // Only notify if we are adding (not removing)
          if (!isCurrentlyActive) {
            incrementNotification(1);
          }
        })
        .catch((error) => console.error(error));
    }
  };

  return (
    <div className="tw-relative tw-flex tw-w-full tw-items-center tw-justify-center tw-py-6 md:tw-py-[48px]">
      <div className="tw-flex tw-flex-row tw-items-center tw-justify-center tw-w-full tw-max-w-[1216px] tw-px-4 tw-gap-8 md:tw-gap-[64px]">
        
        {actionList.map((action, index) => (
          <div key={index} className="tw-relative tw-flex tw-justify-center">
            {action.name === 'share' && (
              <SocialShareModal
                isOpen={isShareModalOpen}
                urlShare={urlShare}
                closeModal={() => setIsShareModalOpen(false)}
              />
            )}
            <ActionIcon
              name={action.name}
              icon={action.icon}
              number={action.number}
              handlers={handlers}
              title={action.hover}
              isActive={isEditMode ? false : action.isActive} 
            />
          </div>
        ))}
      </div>
    </div>
  );
}