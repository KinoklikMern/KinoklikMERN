/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import ActionIcon from './ActionIcon';
import DonationIcon from '../../../images/icons/Donation.svg';
import DonationBlackIcon from '../../../images/icons/DonationBlack.svg';
import DollarIcon from '../../../images/icons/DollarIcon.svg';
import DollarBlackIcon from '../../../images/icons/DollarBlackIcon.svg';
import PlusIcon from '../../../images/icons/PlusWhite.svg';
import PlusBlackIcon from '../../../images/icons/PlusBlack.svg';
import StarIcon from '../../../images/icons/StarWhite.svg';
import StarBlackIcon from '../../../images/icons/StarBlack.svg';
import ShareIcon from '../../../images/icons/share.svg';
import http from '../../../http-common';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faXmark, faCheck } from "@fortawesome/free-solid-svg-icons";

import SocialShareModal from './SocialShareModal';
import { NotificationContext } from '../../../context/NotificationContext';

export default function EpkSocialAction({ epkInfo, handler, isEditMode, onChange }) {
  const user = useSelector((state) => state.user);
  
  let userId;
  let userRole;

  if (!user) {
    userId = '0';
    userRole = 'noUser';
  } else {
    userId = user.id;
    userRole = user.role;
  }
  
  const [fepkInfo, setFepkInfo] = useState(epkInfo);
  
  const currentDonateLink = epkInfo?.DonatePayPal_url || epkInfo?.DonateStripe_url || "";
  const hasDonateLinks = Boolean(currentDonateLink);

  const [usersWishesToDonate, setUsersWishesToDonate] = useState(epkInfo.wishes_to_donate?.length || 0);
  const [usersWishesToBuy, setUsersWishesToBuy] = useState(epkInfo.wishes_to_buy?.length || 0);
  const [usersFavourites, setUsersFavourites] = useState(epkInfo.favourites?.length || 0);
  const [usersLikes, setUsersLikes] = useState(epkInfo.likes?.length || 0);
  const [usersSharings, setUsersSharings] = useState(epkInfo.sharings?.length || 0); 

  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);
  const [tempDonateLink, setTempDonateLink] = useState(currentDonateLink);

  const currentUrl = window.location.href.startsWith('http')
    ? window.location.href
    : `https://${window.location.href}`;
  const urlShare = `I’ve created my new film ${epkInfo.title} #EPK using #KinoKlik free software. Check it out at ${currentUrl} and let me know! #ElectronicPressKit #FilmEPK #NewFilmInProgress`;

  const { incrementNotification, setUserInfo } = useContext(NotificationContext);

  useEffect(() => {
    setTempDonateLink(currentDonateLink);
  }, [currentDonateLink]);

  useEffect(() => {
    try {
      if (!isEditMode && epkInfo._id) {
        http.get(`fepks/${epkInfo._id}`).then((response) => {
          setFepkInfo(response.data);
          setUsersWishesToDonate(response.data.wishes_to_donate?.length || 0);
          setUsersWishesToBuy(response.data.wishes_to_buy?.length || 0);
          setUsersFavourites(response.data.favourites?.length || 0);
          setUsersLikes(response.data.likes?.length || 0);
          setUsersSharings(response.data.sharings?.length || 0); 
        });
      }
    } catch (error) {
      console.log(error);
    }
  }, [epkInfo._id, isEditMode]);

  const checkActive = (arr) => arr?.some((item) => item === userId || item?._id === userId);

  const actionList = [
    {
      name: 'wish_to_donate',
      icon: (hasDonateLinks || isEditMode)
        ? (checkActive(fepkInfo?.wishes_to_donate) && !isEditMode)
          ? DonationBlackIcon
          : DonationIcon
        : null, 
      number: hasDonateLinks ? usersWishesToDonate : 0, 
      hover: isEditMode ? 'Add Donation Link' : 'Donate',
      isActive: checkActive(fepkInfo?.wishes_to_donate),
    },
    {
      name: 'wish_to_buy',
      icon: checkActive(fepkInfo?.wishes_to_buy) ? DollarBlackIcon : DollarIcon,
      number: usersWishesToBuy,
      hover: 'Buy',
      isActive: checkActive(fepkInfo?.wishes_to_buy),
    },
    {
      name: 'favorites',
      icon: checkActive(fepkInfo?.favourites) ? PlusBlackIcon : PlusIcon,
      number: usersFavourites,
      hover: 'Add To Favorites',
      isActive: checkActive(fepkInfo?.favourites),
    },
    {
      name: 'likes',
      icon: checkActive(fepkInfo?.likes) ? StarBlackIcon : StarIcon,
      number: usersLikes,
      hover: 'Like',
      isActive: checkActive(fepkInfo?.likes),
    },
    {
      name: 'share',
      icon: ShareIcon,
      number: usersSharings, 
      hover: 'Share',
      isActive: checkActive(fepkInfo?.sharings), 
    },
  ];

  const handlers = {
    clickHandler: (name) => {
      if (isEditMode) {
        if (name === 'wish_to_donate') {
          setIsDonateModalOpen(true);
        }
        return; 
      }

      if (name === 'share') {
        setIsShareModalOpen(prev => !prev);
        if (user && userId !== '0') {
          http.get(`fepks/sharing/${epkInfo._id}/${userId}`)
            .then((response) => {
              setFepkInfo(response.data);
              setUsersSharings(response.data.sharings?.length || 0);
            })
            .catch((error) => console.error(error));
        }
      } else if (!user) {
        handler(); 
      } else {
        let incrementValue = 0;
        switch (name) {
          case 'wish_to_donate':
            handler('wish_to_donate'); 
            http.get(`fepks/wishestodonate/${epkInfo._id}/${userId}`)
              .then((response) => {
                setFepkInfo(response.data);
                setUsersWishesToDonate(response.data.wishes_to_donate.length);
              })
              .catch((error) => console.error(error));
            break;

          case 'wish_to_buy':
            incrementValue = checkActive(fepkInfo?.wishes_to_buy) ? 0 : 1;
            http.get(`fepks/wishestobuy/${epkInfo._id}/${userId}`)
              .then((response) => {
                setFepkInfo(response.data);
                setUserInfo(response.data.film_maker);
                setUsersWishesToBuy(response.data.wishes_to_buy.length);
                incrementNotification(incrementValue);
              })
              .catch((error) => console.error(error));
            break;

          case 'favorites':
            incrementValue = checkActive(fepkInfo?.favourites) ? 0 : 1;
            http.get(`fepks/favourite/${epkInfo._id}/${userId}`)
              .then((response) => {
                setFepkInfo(response.data);
                setUserInfo(response.data.film_maker);
                setUsersFavourites(response.data.favourites.length);
                incrementNotification(incrementValue);
              })
              .catch((error) => console.error(error));
            break;

          case 'likes':
            incrementValue = checkActive(fepkInfo?.likes) ? 0 : 1;
            http.get(`fepks/like/${epkInfo._id}/${userId}`)
              .then((response) => {
                setFepkInfo(response.data);
                setUserInfo(response.data.film_maker);
                setUsersLikes(response.data.likes.length);
                incrementNotification(incrementValue);
              })
              .catch((error) => console.error(error));
            break;
            
          default:
            break;
        }
      }
    }
  };

  const handleSaveDonateLink = () => {
    onChange("DonatePayPal_url", tempDonateLink);
    setIsDonateModalOpen(false);
  };

  return (
    <div className="tw-relative tw-flex tw-w-full tw-items-center tw-justify-center tw-bg-opacity-100 tw-py-6 md:tw-py-[48px]">
      
      {/* FIX: Set px-0 and justify-between for mobile to evenly space out the icons across the full width */}
      <div className="tw-flex tw-flex-row tw-items-center tw-justify-between sm:tw-justify-center tw-w-full tw-max-w-[1216px] tw-px-0 sm:tw-px-4 md:tw-px-8 tw-gap-1 min-[375px]:tw-gap-2 sm:tw-gap-6 md:tw-gap-[48px]">
        
        {actionList.map((action, index) => {
          if (action.icon === null) return null;

          const isInactiveInEditMode = isEditMode && action.name !== 'wish_to_donate';

          return (
            <div
              key={index}
              className={`tw-relative tw-flex tw-justify-center tw-transition-all ${
                isInactiveInEditMode ? 'tw-opacity-40 tw-grayscale tw-pointer-events-none' : ''
              }`}
            >
              {action.name === 'share' && !isEditMode && (
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
          );
        })}
      </div>

      {isDonateModalOpen && (
        <div className="tw-fixed tw-inset-0 tw-z-[9999] tw-flex tw-items-center tw-justify-center tw-bg-[#190033]/85 tw-backdrop-blur-md tw-p-4">
          
          <div className="tw-relative tw-w-full tw-max-w-[480px] tw-bg-[#1F0439] tw-border tw-border-[#FFB0CF]/10 tw-shadow-[0_0_25px_rgba(255,67,167,0.25)] tw-rounded-xl tw-p-8 tw-flex tw-flex-col tw-gap-6 tw-overflow-hidden">
            
            {/* Abstract Background Orbs */}
            <div className="tw-absolute tw-w-[384px] tw-h-[384px] tw-rounded-full tw-bg-[#FF43A7]/10 tw-blur-[60px] -tw-left-24 -tw-top-24 tw-pointer-events-none" />
            <div className="tw-absolute tw-w-[384px] tw-h-[384px] tw-rounded-full tw-bg-[#651CA4]/10 tw-blur-[60px] -tw-right-24 -tw-bottom-24 tw-pointer-events-none" />

            <div className="tw-relative tw-z-10 tw-flex tw-flex-col tw-gap-6">
              
              <h2 className="tw-text-[#F0DBFF] tw-text-[20px] tw-leading-[25px] tw-font-bold tw-m-0 tw-tracking-tight">
                Please input your donation link
              </h2>

              <div className="tw-relative tw-w-full">
                <div className="tw-absolute tw-left-4 tw-top-1/2 -tw-translate-y-1/2">
                  <FontAwesomeIcon icon={faLink} className="tw-text-[#AA8894]" />
                </div>
                <input
                  type="url"
                  value={tempDonateLink}
                  onChange={(e) => setTempDonateLink(e.target.value)}
                  placeholder="Enter URL (e.g., PayPal, Stripe)..."
                  className="tw-w-full tw-bg-[#280D41] tw-border-2 tw-border-dashed tw-border-[#FF43A7]/40 tw-rounded-lg tw-py-[16px] tw-pl-[48px] tw-pr-4 tw-text-[16px] tw-text-white tw-outline-none placeholder:tw-text-[#F0DBFF]/30 tw-transition-colors focus:tw-border-[#FF43A7]"
                />
              </div>

              <div className="tw-flex tw-justify-end tw-items-center tw-gap-4 tw-mt-2">
                <button 
                  onClick={() => {
                    setTempDonateLink(currentDonateLink); 
                    setIsDonateModalOpen(false);
                  }} 
                  className="tw-flex tw-items-center tw-gap-2 tw-px-6 tw-h-[44px] tw-bg-transparent tw-border tw-border-[#AA8894]/30 tw-rounded-lg tw-text-[#F0DBFF] tw-text-[12px] tw-font-bold tw-tracking-[1.2px] tw-uppercase hover:tw-bg-white/5 tw-transition-colors tw-cursor-pointer"
                >
                  <FontAwesomeIcon icon={faXmark} /> Cancel
                </button>
                <button 
                  onClick={handleSaveDonateLink} 
                  className="tw-flex tw-items-center tw-gap-2 tw-px-8 tw-h-[44px] tw-bg-[#FF43A7] tw-border-none tw-rounded-lg tw-text-[#570033] tw-text-[12px] tw-font-extrabold tw-tracking-[1.2px] tw-uppercase hover:tw-bg-[#ff5cac] tw-transition-colors tw-shadow-[0_0_15px_rgba(255,67,167,0.4)] tw-cursor-pointer"
                >
                  <FontAwesomeIcon icon={faCheck} /> Save
                </button>
              </div>

            </div>
          </div>

        </div>
      )}

    </div>
  );
}