/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Account from "../../components/FilmMakerDashboard/Setting/Account";
import Password from "../../components/FilmMakerDashboard/Setting/Password";
import Profile from "../../components/FilmMakerDashboard/Setting/Profile";
import Studio from "../../components/FilmMakerDashboard/Setting/Studio";
import LeftSidebar from "../../components/AdminDashboard/LeftSidebar";
import Triangle from "../../images/icons/triangle.svg";
import TopToolBar from "../../components/AdminDashboard/TopToolBar";

export default function AnalyticsPage() {
  const { user } = useSelector((user) => ({ ...user }));
  const [openTab, setOpenTab] = useState(1);
  const tabs = [
    {
      title: "Analytics",
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
      <div className="tw-mb-8 tw-mt-24 tw-flex tw-justify-start tw-pl-24 tw-text-[#1E0039]">
        {/* <p className="tw-text-4xl">Admin Dashboard</p> */}
      </div>
      <div className="tw-mx-8 tw-flex tw-h-5/6 tw-flex-row">
        <div className="tw-ml-16 tw-mt-12 tw-h-5/6">
          <LeftSidebar selectedTab="Analytics" role={user.role} />
        </div>
        <div className="tw-ml-16 tw-mt-8 tw-h-5/6 tw-w-5/6 tw-max-w-5xl tw-overflow-auto tw-rounded-lg tw-bg-white tw-p-4">
          {/* line */}
          <div className="tw-h-0.5 tw-w-full tw-bg-[#1E0039]"></div>
          {/* box */}
          <TopToolBar selectedTab="Analytics" role={user.role} />
        </div>
      </div>
    </div>
  );
}
