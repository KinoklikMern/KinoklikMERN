import React from "react";

export default function ResourceCard({ resourceInfo }) {
  const image_resource = `${process.env.REACT_APP_AWS_URL}/${resourceInfo.image}`;

  return (
    <div className='tw-m-6 tw-flex tw-flex-col tw-justify-around tw-rounded-3xl tw-bg-[#1e0039]/20 md:tw-flex-row'>
      <div className='tw-flex tw-w-full'>
        <img
          src={image_resource}
          style={{ width: "100%", height: "100%" }}
          alt=''
        />
      </div>
      <div className='tw-flex tw-w-full tw-flex-col tw-items-center tw-justify-center tw-text-[#1E0039]'>
        <p className='tw-p-4 tw-text-center tw-text-[1.5rem] tw-font-semibold md:tw-text-[3rem]'>
          {resourceInfo.title}
        </p>
        <p className='tw-p-4 md:tw-text-[1.5rem]'>{resourceInfo.time}</p>
        <p className='tw-p-4 tw-text-center md:tw-text-[1.5rem]'>
          {resourceInfo.description}
        </p>
      </div>
    </div>
  );
}
