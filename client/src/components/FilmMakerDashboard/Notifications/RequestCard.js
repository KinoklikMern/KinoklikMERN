import React, { useState, useEffect } from "react";
import { getUserbyId } from "../../../api/epks";

export default function RequestCard(props) {
  const { user } = props.Request;
  const [userInfo, setUserInfo] = useState();
  // eslint-disable-next-line no-unused-vars
  const [picture, setPicture] = useState();
  useEffect(() => {
    getUserbyId(user).then((res) => {
      // console.info("res", res)
      setUserInfo(res);
      setPicture(
        userInfo?.picture ===
          "https://res.cloudinary.com/dmhcnhtng/image/upload/v1643844376/avatars/default_pic_jeaybr.png"
          ? "https://res.cloudinary.com/dmhcnhtng/image/upload/v1643844376/avatars/default_pic_jeaybr.png"
          : `${process.env.REACT_APP_AWS_URL}/${userInfo?.picture}`
      );
    });
  }, [user, userInfo?.picture]);

  return (
    <div className='tw-py-2 sm:tw-py-4'>
      <div className='tw-flex tw-justify-start md:tw-gap-16'>
        <div className='tw-relative tw-m-4 tw-flex-shrink-0'>
          <img
            className='tw-h-32 tw-w-32 tw-rounded-lg'
            src={
              userInfo &&
              (userInfo?.picture ===
              "https://res.cloudinary.com/dmhcnhtng/image/upload/v1643844376/avatars/default_pic_jeaybr.png"
                ? "https://res.cloudinary.com/dmhcnhtng/image/upload/v1643844376/avatars/default_pic_jeaybr.png"
                : `${process.env.REACT_APP_AWS_URL}/${userInfo?.picture}`)
            }
            alt='profile img'
          />
          <div className='tw-absolute tw-inset-x-0 tw-bottom-0 tw-flex tw-h-6 tw-justify-center tw-rounded-full tw-bg-gray-500 tw-bg-opacity-75'>
            <span className='tw-self-center tw-text-sm tw-text-white'>
              {userInfo?.role}
            </span>
          </div>
        </div>
        <div className='tw-m-4 tw-min-w-0 tw-items-center tw-gap-12 md:tw-flex md:tw-flex-row md:tw-overflow-x-auto'>
          <div className=''>
            <p className='tw-truncate tw-text-lg tw-font-medium tw-text-gray-900'>
              {userInfo?.firstName} {userInfo?.lastName}
            </p>
            <p className='tw-truncate tw-text-lg tw-font-normal tw-text-gray-900'>
              {userInfo?.email}
            </p>
          </div>
          <div className=''>
            <p className='tw-truncate tw-text-lg tw-font-normal tw-text-gray-900'>
              {userInfo?.phone}
            </p>
            <p className='tw-truncate tw-text-lg tw-font-normal tw-text-gray-900'>
              {userInfo?.website}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
