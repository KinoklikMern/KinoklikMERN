/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Account from "../../components/FilmMakerDashboard/Setting/Account";
import Password from "../../components/FilmMakerDashboard/Setting/Password";
import Profile from "../../components/FilmMakerDashboard/Setting/Profile";
import Studio from "../../components/FilmMakerDashboard/Setting/Studio";
import LeftSidebar from "../../components/AdminDashboard/LeftSidebar";
import Triangle from "../../images/icons/triangle.svg";
export default function UsersPage() {
  const { user } = useSelector((user) => ({ ...user }));
  const [openTab, setOpenTab] = useState(1);
  const tabs = [
    {
      title: "Users",
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
  return (
    <div className="tw-flex tw-h-screen tw-flex-col tw-bg-white">
      <div className="tw-mt-24 tw-mb-8 tw-flex tw-justify-start tw-pl-24 tw-text-[#1E0039]">
        {/* <p className="tw-text-4xl">Admin Dashboard</p> */}
      </div>
      <div className="tw-mx-8 tw-flex tw-h-5/6 tw-flex-row">
        <div className="tw-ml-16 tw-mt-12 tw-h-5/6">
          <LeftSidebar selectedTab="Users" role={user.role} />
        </div>
        <div className="tw-ml-16 tw-mt-8 tw-h-5/6 tw-w-5/6 tw-max-w-5xl tw-overflow-auto tw-rounded-lg tw-bg-white tw-p-4">
          {/* line */}
          <div className="tw-h-0.5 tw-w-full tw-bg-[#1E0039]"></div>
          {/* box */}
          <header className="tw-mt-[5px] tw-flex tw-w-full tw-flex-col tw-justify-end tw-rounded-[10px] tw-bg-gray-300">
            <div className="tw-md:flex-col tw-md:gap-5 tw-flex tw-h-[80px] tw-w-full tw-flex-row tw-items-center  tw-justify-end tw-pr-10">
              <div className="tw-md:w-full tw-relative tw-h-[17px] tw-w-[34%]"></div>
              <p className="tw-md:ml-[0] tw-md:mt-0 mt-0.5 tw-md:text-[22px] tw-ml-[266px] tw-pr-8  tw-text-gray-700">
                Monday, 1st March
              </p>
              <img
                className="tw-md:ml-[0] tw-ml-2.5 tw-h-[20px] tw-rounded-none"
                src={Triangle}
                alt="polygonThree"
              />
            </div>
          </header>
        </div>
      </div>
    </div>
  );
}
