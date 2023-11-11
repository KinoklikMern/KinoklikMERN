import React from "react";
import EpkReport from "../EpkReport/EpkReport";
import { useSelector } from "react-redux";

export default function EpkCover({ epkInfo }) {
  // const URL = "";
  const banner_url = `${process.env.REACT_APP_AWS_URL}/${epkInfo.banner_url}`;
  const image_detail =
    epkInfo.image_details === "" || epkInfo.image_details.startsWith("https")
      ? ""
      : `${process.env.REACT_APP_AWS_URL}/${epkInfo.image_details}`;

  const { user } = useSelector((user) => ({ ...user }));

  const formatedDate = (timestamp) => {
    return new Date(timestamp).toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };
  return (
    <div
      style={{
        backgroundImage: `url(${banner_url})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className='tw-flex tw-h-[700px] tw-flex-col tw-justify-between tw-rounded-lg tw-shadow-[inset_0_15px_10px_rgba(242,229,229,0.6)]'
    >
      <div className='tw-mx-16 tw-flex tw-h-5/6 tw-flex-col tw-justify-start tw-py-6 md:tw-flex-row '>
        <img
          src={image_detail}
          alt=''
          className='tw-my-4 tw-h-full tw-shadow-[6px_6px_3px_#1E0039]'
        />
        <div className='tw-my-4 tw-flex tw-flex-col tw-items-center tw-justify-between tw-text-white md:tw-w-2/3'>
          <p className='tw-rounded-xl tw-bg-black tw-bg-opacity-40 tw-px-5 tw-text-center md:tw-text-[5rem]'>
            {epkInfo.title}
          </p>
          <p className='tw-mt-4 tw-text-center md:tw-mt-0 md:tw-text-lg'>
            {epkInfo.logLine_short}
          </p>
        </div>
      </div>

      <div className='tw-flex tw-justify-between tw-bg-white/10 tw-px-6'>
        <div className='tw-flex tw-items-center tw-justify-between md:tw-w-1/2'>
          <p className='tw-text-white md:tw-text-xl'>
            Posted: <span>{formatedDate(epkInfo.createdAt)}</span>
          </p>
          <p className='tw-text-white md:tw-text-xl'>{epkInfo.status}</p>
          <p className='tw-text-white md:tw-text-xl'>
            {epkInfo.production_type}
          </p>
          <p className='tw-text-white md:tw-text-xl'>{epkInfo.genre}</p>
        </div>
        <div className='tw-flex tw-w-1/6 tw-cursor-pointer tw-justify-end'>
          {user?.id !== epkInfo.film_maker._id ? (
            <EpkReport epkInfo={epkInfo} />
          ) : null}
        </div>
      </div>
    </div>
  );
}
