/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Account from "../../components/FilmMakerDashboard/Setting/Account";
import Password from "../../components/FilmMakerDashboard/Setting/Password";
import Profile from "../../components/FilmMakerDashboard/Setting/Profile";
import Studio from "../../components/FilmMakerDashboard/Setting/Studio";
import LeftSidebar from "../../components/AdminDashboard/LeftSidebar";
import TopToolBar from "../../components/AdminDashboard/TopToolBar";
import Triangle from "../../images/icons/triangle.svg";
import StartWhiteIcon from "../../images/icons/star-file-white.svg";
export default function EPKsPage() {
  const { user } = useSelector((user) => ({ ...user }));
  const [openTab, setOpenTab] = useState(1);
  const tabs = [
    {
      title: "EPKs",
      count: 1,
    },
    {
      title: user.role === "Actor" ? "Agent" : "Studio",
      count: 2,
    },
    {
      title: "Password",
      count: 3,
    },
    {
      title: "Account",
      count: 4,
    },
  ];
  const imgs = [
    {
      url: "http://s3.us-east-1.amazonaws.com/kinomovie/f9c17daf535ab107c552d49191701818.png",
    },
    {
      url: "http://s3.us-east-1.amazonaws.com/kinomovie/3ab6f8ea5ee3dd35a9be9f81632be1b4.jpg",
    },
    {
      url: "http://s3.us-east-1.amazonaws.com/kinomovie/0448521dfc96c129e1729e2c5a3b2fdd.png",
    },
    {
      url: "http://s3.us-east-1.amazonaws.com/kinomovie/8a4c8ecf8141675ccc4069280413c475.jpg",
    },
    {
      url: "http://s3.us-east-1.amazonaws.com/kinomovie/575f1eda2e3be1c812d7dc1332650451.jpg",
    },
  ];

  return (
    <div className="tw-flex tw-h-screen tw-flex-col tw-bg-white">
      <div className="tw-mb-8 tw-mt-24 tw-flex tw-justify-start tw-pl-24 tw-text-[#1E0039]">
        {/* <p className="tw-text-4xl">Admin Dashboard</p> */}
      </div>
      <div className="tw-mx-8 tw-flex tw-h-5/6 tw-flex-row">
        <div className="tw-ml-16 tw-mt-12 tw-h-5/6">
          <LeftSidebar selectedTab="EPKs" role={user.role} />
        </div>
        <div className="tw-ml-16 tw-mt-8 tw-h-5/6 tw-w-5/6 tw-max-w-5xl  tw-rounded-lg tw-bg-white tw-p-4">
          {/* line */}
          <div className="tw-h-0.5 tw-w-full tw-bg-[#1E0039]"></div>
          {/* box */}
          <TopToolBar selectedTab="EPKs" role={user.role} />

          <div className="tw-border-[#cac4cf] tw-shadow-[20px_20px_30px_-15px_rgba(30,0,57,0.3)]  tw-mt-10  tw-max-w-5xl tw-rounded-lg tw-border-2 tw-bg-white tw-p-4">
            <div className=" tw-flex tw-w-full tw-flex-col tw-items-center tw-justify-center ">
              <p className="tw-text-center tw-font-bold">EPKs</p>
              <div className="tw-mb-12 tw-mt-4 tw-flex tw-h-32 tw-w-32 tw-flex-col  tw-place-items-center tw-justify-center tw-rounded-lg  tw-bg-[#1E0039] tw-p-0.5">
                <p className="tw-sm:text-base tw-mt-8 tw-text-3xl tw-font-light tw-text-white">
                  1815
                </p>
                <img
                  className="tw-h-[24px] tw-mb-5"
                  src={StartWhiteIcon}
                  alt="Start Icon"
                />
              </div>
              <div className="tw-w-full tw-justify-center tw-rounded-xl tw-bg-gray-300 tw-px-2 tw-py-8">
                <div className="tw-bg-[#9b94ab] tw-flex tw-w-full tw-justify-start tw-gap-4 tw-overflow-y-auto tw-rounded-lg tw-py-2">
                  {imgs.map((img, index) => (
                    <img
                      src={img.url}
                      className="  tw-m-2 tw-rounded-none"
                      alt="movie cover"
                    ></img>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
