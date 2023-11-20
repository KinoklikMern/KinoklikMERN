/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useSelector } from "react-redux";
import LeftSidebar from "../../components/AdminDashboard/LeftSidebar";
import TopToolBar from "../../components/AdminDashboard/TopToolBar";

export default function AnalyticsPage() {
  const { user } = useSelector((user) => ({ ...user }));

  return (
    <div className="tw-flex tw-h-screen tw-flex-col tw-bg-white">
      <div className="tw-mb-8 tw-mt-24 tw-flex tw-justify-start tw-pl-24 tw-text-[#1E0039]">
        {/* <p className="tw-text-4xl">Admin Dashboard</p> */}
      </div>
      <div className="tw-mx-8 tw-flex tw-h-5/6 tw-flex-row">
        <div className="tw-ml-16 tw-mt-12 tw-h-[70vh]">
          <LeftSidebar selectedTab="Analytics" role={user.role} />
        </div>
        <div className="tw-ml-16 tw-mt-8 tw-h-5/6 tw-w-5/6 tw-min-w-min tw-overflow-auto tw-rounded-lg tw-bg-white tw-p-4">
          {/* line */}
          <div className="tw-h-0.5 tw-w-full tw-bg-[#1E0039]"></div>
          {/* box */}
          <TopToolBar selectedTab="Analytics" role={user.role} />
        </div>
      </div>
    </div>
  );
}
