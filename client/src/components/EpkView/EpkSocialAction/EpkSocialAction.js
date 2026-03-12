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
import EyeIcon from '../../../images/icons/eye.svg';
import ShareIcon from '../../../images/icons/share.svg';
import http from '../../../http-common';
import { useSelector } from 'react-redux';

// We removed all the react-share imports from here because they are safely inside the Modal now!
import SocialShareModal from './SocialShareModal';
import { NotificationContext } from '../../../context/NotificationContext';

export default function EpkSocialAction({ epkInfo, handler }) {
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
  const hasDonateLinks = epkInfo.DonatePayPal_url || epkInfo.DonateStripe_url;

  const [usersWishesToDonate, setUsersWishesToDonate] = useState(epkInfo.wishes_to_donate?.length || 0);
  const [usersWishesToBuy, setUsersWishesToBuy] = useState(epkInfo.wishes_to_buy?.length || 0);
  const [usersFavourites, setUsersFavourites] = useState(epkInfo.favourites?.length || 0);
  const [usersLikes, setUsersLikes] = useState(epkInfo.likes?.length || 0);
  const [usersSharings, setUsersSharings] = useState(epkInfo.sharings?.length || 0); 

  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const currentUrl = window.location.href.startsWith('http')
    ? window.location.href
    : `https://${window.location.href}`;
  const urlShare = `I’ve created my new film ${epkInfo.title} #EPK using #KinoKlik free software. Check it out at ${currentUrl} and let me know! #ElectronicPressKit #FilmEPK #NewFilmInProgress`;

  const { incrementNotification, setUserInfo } = useContext(NotificationContext);

  useEffect(() => {
    try {
      http.get(`fepks/${epkInfo._id}`).then((response) => {
        setFepkInfo(response.data);
        setUsersWishesToDonate(response.data.wishes_to_donate?.length || 0);
        setUsersWishesToBuy(response.data.wishes_to_buy?.length || 0);
        setUsersFavourites(response.data.favourites?.length || 0);
        setUsersLikes(response.data.likes?.length || 0);
        setUsersSharings(response.data.sharings?.length || 0); 
      });
    } catch (error) {
      console.log(error);
    }
  }, [epkInfo._id]);

  const checkActive = (arr) => arr?.some((item) => item === userId || item?._id === userId);

  const actionList = [
    {
      name: 'views',
      icon: EyeIcon,
      number: epkInfo.viewCount || 0,
      hover: 'Views',
      isActive: false, 
    },
    {
      name: 'wish_to_donate',
      icon: hasDonateLinks
        ? checkActive(fepkInfo?.wishes_to_donate)
          ? DonationBlackIcon
          : DonationIcon
        : null, 
      number: hasDonateLinks ? usersWishesToDonate : 0, 
      hover: 'Donate',
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
      } else if (name === 'views') {
        return; 
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

  const closeShareModal = () => setIsShareModalOpen(false);

  return (
    <div className="tw-relative tw-flex tw-w-full tw-items-center tw-justify-center tw-bg-opacity-100 tw-py-8 md:tw-py-12">
      <div className="tw-flex tw-w-full tw-max-w-5xl tw-items-center tw-justify-center md:tw-justify-evenly tw-flex-wrap tw-gap-3 sm:tw-gap-4 md:tw-gap-6 tw-px-2 md:tw-px-6">
        
        {actionList.map(
          (action, index) =>
            action.icon !== null && (
              <div
                key={index}
                className="tw-relative tw-shrink-0 tw-flex tw-justify-center"
              >
                {/* Clean, simple click-to-open Modal */}
                {action.name === 'share' && (
                  <SocialShareModal
                    isOpen={isShareModalOpen}
                    urlShare={urlShare}
                    closeModal={closeShareModal}
                  />
                )}
                
                <ActionIcon
                  key={action.name}
                  name={action.name}
                  icon={action.icon}
                  number={action.number}
                  handlers={handlers}
                  title={`${action.hover}`}
                  isActive={action.isActive} 
                />
              </div>
            )
        )}
      </div>
    </div>
  );
}