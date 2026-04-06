import React, { useState } from "react";
import { useSelector } from "react-redux";
import Account from "../../components/Dashboard/Setting/Account";
import Password from "../../components/Dashboard/Setting/Password";
import Profile from "../../components/Dashboard/Setting/Profile";
import Studio from "../../components/Dashboard/Setting/Studio";
import Sidebar from "../../components/Dashboard/Sidebar";
import { useTranslation } from "react-i18next";

export default function SettingPage() {
  const user = useSelector((state) => state.user);
  const [openTab, setOpenTab] = useState(1);
  const { t } = useTranslation();
  const tabs = [
    {
      title: t("Profile"),
      count: 1,
    },
    {
      title: user.role === t("Actor") ? "Agent" : "Studio",
      count: 2,
    },
    {
      title: t("Password"),
      count: 3,
    },
    {
      title: t("Account"),
      count: 4,
    },
  ];
  return (
    <div className='tw-flex tw-h-screen tw-flex-col tw-bg-[#1E0039]'>
      <div className='tw-mb-8 tw-mt-24 tw-flex tw-justify-start tw-pl-24 tw-text-white'>
        <p className='tw-text-4xl'>{user.role + " " + t("Dashboard")}</p>
      </div>
      <div className='tw-mx-8 tw-flex tw-h-5/6 tw-flex-row tw-overflow-hidden'>
        <div className='tw-mt-12 tw-h-5/6 md:tw-ml-16'>
          <Sidebar selectedTab='Settings' role={user.role} />
        </div>
        <div className='tw-scrollbar-w-36 tw-mt-12 tw-h-5/6 tw-w-full tw-overflow-auto tw-rounded-lg tw-bg-white tw-p-4 md:tw-ml-16 md:tw-w-5/6'>
          <ul className='tw-flex tw-divide-x tw-divide-[#1E0039] tw-border-b tw-border-gray-200 tw-text-sm tw-font-medium tw-text-gray-500 tw-shadow-md tw-shadow-[#1E0039]/50'>
              {tabs.map((tab) => (
                <li
                  key={tab.title}
                  className={
                    "tw-w-1/4 tw-grow tw-shadow-md tw-shadow-[#1E0039]/50 " +
                    (openTab === tab.count
                      ? "tw-bg-[#1E0039] tw-text-white"
                      : "tw-bg-gray-100 tw-text-[#1E0039]")
                  }
                >
                  <button
                    type="button"
                    onClick={() => setOpenTab(tab.count)}
                    className='tw-flex tw-w-full tw-items-center tw-justify-center tw-p-2 tw-text-[1rem] hover:tw-bg-midnight hover:tw-text-white md:tw-p-4 md:tw-text-xl lg:tw-text-2xl tw-bg-transparent tw-border-none tw-cursor-pointer tw-transition-colors'
                  >
                    {tab.title}
                  </button>
                </li>
              ))}
            </ul>
          <div className='tw-h-5/6'>
            {openTab === 1 && <Profile />}
            {openTab === 2 && <Studio isActor={user.role === "Actor"} />}
            {openTab === 3 && <Password />}
            {openTab === 4 && <Account />}
          </div>
        </div>
      </div>
    </div>
  );
}