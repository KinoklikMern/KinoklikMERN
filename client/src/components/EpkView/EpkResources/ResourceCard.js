import React from "react";

export default function ResourceCard({ resourceInfo }) {
  const image_resource = `${process.env.REACT_APP_AWS_URL}/${resourceInfo.image}`;
  return (
    <div className="tw-m-6 tw-flex tw-justify-around tw-rounded-3xl tw-bg-[#1e0039]/20 tw-p-6">
      <div className="tw-flex tw-w-1/3 tw-justify-center tw-py-12">
        <img
          src={image_resource}
          style={{ width: "80%", height: "auto" }}
          alt=""
        />
      </div>
      <div className="tw-flex tw-w-2/5 tw-flex-col tw-items-center tw-justify-center tw-text-[#1E0039]">
        <p className="tw-p-4 tw-text-[3rem] tw-font-semibold ">
          {resourceInfo.title}
        </p>
        <p className="tw-p-4 tw-text-[1.5rem]">{resourceInfo.time}</p>
        <p className="tw-p-4 tw-text-center tw-text-[1.5rem]">
          {resourceInfo.description}
        </p>
      </div>
    </div>
  );
}
