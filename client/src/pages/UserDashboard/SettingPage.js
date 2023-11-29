/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Account from "../../components/FilmMakerDashboard/Setting/Account";
import Password from "../../components/FilmMakerDashboard/Setting/Password";
import Profile from "../../components/FilmMakerDashboard/Setting/Profile";
import Studio from "../../components/FilmMakerDashboard/Setting/Studio";
import Sidebar from "../../components/UserDashboard/Sidebar";
import { useTranslation } from "react-i18next";

export default function SettingPage() {
  const { t } = useTranslation();
  const user = useSelector((state) => state.user);
  const [openTab, setOpenTab] = useState(1);
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
    <div className='tw-flex tw-h-screen tw-flex-col tw-overflow-hidden tw-bg-[#1E0039]'>
      <div className='tw-mt-24 tw-flex tw-justify-start tw-pl-24 tw-text-white md:tw-mb-8'>
        <p className='tw-text-4xl'>
          {" "}
          {user.role} {t("Dashboard")}
        </p>
      </div>
      <div className='tw-flex tw-h-5/6 tw-flex-row tw-p-4 md:tw-mx-8 md:tw-p-0'>
        <div className='tw-mt-12 tw-h-5/6 md:tw-ml-16'>
          <Sidebar selectedTab='Settings' role={user.role} />
        </div>
        <div className='tw-scrollbar-w-36 tw-mt-12 tw-h-5/6 tw-w-full tw-overflow-auto tw-rounded-lg tw-bg-white tw-p-4 md:tw-ml-16 md:tw-w-5/6'>
          <ul className='tw-flex tw-divide-x tw-divide-[#1E0039] tw-border-b tw-border-gray-200 tw-text-center tw-text-sm tw-font-medium tw-text-gray-500 tw-shadow-md tw-shadow-[#1E0039]/50'>
            {tabs.map((tab, index) => (
              <li
                key={index}
                className={
                  "tw-w-1/4 tw-grow tw-text-2xl tw-shadow-md tw-shadow-[#1E0039]/50 " +
                  (openTab === tab.count
                    ? "tw-bg-[#1E0039] tw-text-white"
                    : "tw-bg-gray-100 tw-text-[#1E0039]")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(tab.count);
                }}
              >
                <a
                  href='#'
                  className='tw-inline-block tw-w-full tw-p-2 tw-text-[1rem] hover:tw-bg-midnight hover:tw-text-white md:tw-p-4 md:tw-text-xl lg:tw-text-2xl'
                >
                  {tab.title}
                </a>
              </li>
            ))}
          </ul>
          <div className='tw-h-5/6'>
            {openTab === 1 && <Profile />}
            {openTab === 2 && <Studio />}
            {openTab === 3 && <Password />}
            {openTab === 4 && <Account />}
          </div>
        </div>
      </div>
    </div>
  );
}
