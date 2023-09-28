import React from "react";
import dashboard from "../../images/dashBoard.png";
import TvImage from "../../images/TV.png";

const Landing5 = () => {
  return (
    <div className="tw-bg-midnight tw-pt-72 tw-pb-10 ">
      <div className="tw-p-20 tw-text-center tw-text-6xl tw-font-bold tw-text-white ">
        <div className=" "> One EPK.</div>
        <div className=" ">All Film Details.</div>
      </div>
      <div className="tw-flex tw-space-x-14 ">
        <div className="tw-w-7/12 tw-rounded-3xl tw-bg-gray-800 tw-p-6 ">
          <p className="tw-p-4 tw-text-4xl tw-font-bold tw-text-white">
            Film Details
          </p>
          <p className="tw-p-4 tw-text-2xl tw-text-white ">
            This section contains the main cast and crew you want to hire,
            production/release year and film length in minutes.
          </p>
          <div className="tw-relative tw-bg-no-repeat">
            <img
              className="tw-absolute tw-h-full tw-w-4/5"
              src={TvImage}
              alt="Left Im"
            />
            <img
              className="tw-ml-10 tw-h-2/5 tw-w-8/12 tw-pl-20 tw-pb-10 "
              src={dashboard}
              alt="/"
            />
          </div>
        </div>
        <div className="tw-w-5/12">
          <div className="tw-relative tw-h-full tw-w-4/5 tw-rounded-3xl tw-border tw-border-black tw-bg-white">
            <div className="tw-absolute tw-left-0 tw-top-5 tw-h-[94%] tw-w-11/12 tw-rounded-3xl tw-bg-midnight tw-text-white">
              <p className="tw-px-14 tw-py-64 tw-text-justify tw-text-3xl ">
                From the main Filmmaker EPK Dashboard, KinoKlik allows you to
                upload all your film details in one place.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing5;
