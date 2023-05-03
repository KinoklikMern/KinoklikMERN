import React from "react";

export default function ResourceCard({ resourceInfo }) {
  const image_resource = `${process.env.REACT_APP_AWS_URL}/${resourceInfo.image}`;
  return (
    <div className="tw-m-6 tw-flex tw-justify-between tw-bg-[#1e0039]/20 tw-rounded-3xl">
      <div className="tw-w-1/3 tw-flex tw-justify-center tw-py-12">
        <img src={image_resource} style={{ width: "80%", height: "auto" }}  />
      </div>
      <div className="tw-w-2/3 tw-flex tw-flex-col tw-justify-center tw-items-center">
        <p className="tw-text-[3rem] tw-font-semibold tw-p-6">{resourceInfo.title}</p>
        <p className="tw-text-[2rem] tw-p-6">{resourceInfo.time}</p>
        <p className="tw-text-[2rem] tw-p-6 tw-text-center">{resourceInfo.description}</p>
      </div>
    </div>
  );
}
