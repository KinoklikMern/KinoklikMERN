/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import http from '../../../http-common';

import ActionIcon from '../../EpkView/EpkSocialAction/ActionIcon';
import PlusBlackIcon from '../../../images/icons/PlusBlack.svg';
import StarBlackIcon from '../../../images/icons/StarBlack.svg';
import RecommendIcon from '../../../images/icons/recommend-icon.svg';
import MessageIcon from '../../../images/icons/messages.svg'; 

export default function UserSocialAction({ data, isEditMode, openRecommendModal }) {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const userId = user?.id || '0';
  const [profileData, setProfileData] = useState(data);

  useEffect(() => {
    setProfileData(data);
  }, [data]);

  const isOwnPage = String(userId) === String(data?._id);

  const handleAction = (type) => {
    if (isEditMode) return;

    // Block interactions with your own profile EXCEPT for recommending
    if (isOwnPage && type !== 'recommend') return;

    if (userId === '0') {
      alert("Please log in to interact.");
      return;
    }

    switch (type) {
      case 'likes':
        http.post(`/users/like/${data._id}/${userId}`).then((res) => {
          setProfileData(prev => ({ ...prev, likes: res.data.likes }));
        });
        break;
      case 'follow':
        http.post(`/users/follow/${data._id}/${userId}`).then((res) => {
          setProfileData(prev => ({ ...prev, kkFollowers: res.data.kkFollowers }));
        });
        break;
      case 'message':
        const chatUrl = user?.role === 'Filmmaker'
          ? `/dashboard/chat/${data._id}`
          : `/userdashboard/chat/${data._id}`;
        navigate(chatUrl);
        break;
      case 'recommend':
        openRecommendModal(); // Now allowed for everyone
        break;
      default:
        break;
    }
  };

  const actionList = [
    {
      name: 'likes',
      icon: StarBlackIcon,
      number: profileData?.likes?.length || 0,
      hover: isOwnPage ? 'Your Likes' : 'Like Profile',
      isDisabled: isOwnPage
    },
    {
      name: 'follow',
      icon: PlusBlackIcon,
      number: profileData?.kkFollowers?.length || 0,
      hover: isOwnPage ? 'Your Followers' : 'Follow Actor',
      isDisabled: isOwnPage
    },
    {
      name: 'recommend',
      icon: RecommendIcon,
      number: profileData?.recommendations?.length || 0,
      hover: 'Recommend to Filmmakers',
      isDisabled: false
    },
    {
      name: 'message',
      icon: MessageIcon,
      number: "\u00A0",
      hover: 'Send Message',
      hide: isOwnPage // Keep message option hidden from self
    },
  ];

  return (
    <div className="tw-flex tw-flex-row tw-items-center tw-gap-6">
      {actionList.map((action, index) => (
        !action.hide && (
          <div 
            key={index} 
            className={`tw-flex tw-flex-col tw-items-center ${
              action.isDisabled ? "tw-opacity-50 tw-cursor-default" : "tw-cursor-pointer"
            }`}
          >
            <ActionIcon
              name={action.name}
              icon={action.icon}
              number={action.number}
              handlers={{ clickHandler: () => handleAction(action.name) }}
              title={action.hover}
              isActive={false} 
            />
          </div>
        )
      ))}
    </div>
  );
}