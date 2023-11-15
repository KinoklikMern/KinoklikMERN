import React, { useState } from "react";
import { useSelector } from "react-redux";
import Account from "../../components/FilmMakerDashboard/Setting/Account";
import Password from "../../components/FilmMakerDashboard/Setting/Password";
import Profile from "../../components/FilmMakerDashboard/Setting/Profile";
import Studio from "../../components/FilmMakerDashboard/Setting/Studio";
import Sidebar from "../../components/FilmMakerDashboard/Sidebar";
import {useTranslation} from 'react-i18next';

export default function SettingPage() {
  // eslint-disable-next-line no-unused-vars
  const { user } = useSelector((user) => ({ ...user }));
  const [openTab, setOpenTab] = useState(1);
  const { t } = useTranslation();
  const tabs = [
    {
      title: "Profile",
      count: 1,
    },
    {
      title: "Studio",
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
    <div className='tw-flex tw-h-screen tw-flex-col tw-bg-[#1E0039]'>
      <div className='tw-mb-8 tw-mt-24 tw-flex tw-justify-start tw-pl-24 tw-text-white'>
        <p className='tw-text-4xl'>{t("Filmmaker Dashboard")}</p>
      </div>
      <div className='tw-mx-8 tw-flex tw-h-5/6 tw-flex-row tw-overflow-auto'>
        <div className='tw-mt-12 tw-h-5/6 md:tw-ml-16'>
          <Sidebar selectedTab='Settings' />
        </div>
        <div className='tw-scrollbar-w-36 tw-mt-12 tw-h-5/6 tw-w-full tw-overflow-auto tw-rounded-lg tw-bg-white tw-p-4 md:tw-ml-16 md:tw-w-5/6'>
          <ul className='tw-flex tw-divide-x tw-divide-[#1E0039] tw-border-b tw-border-gray-200 tw-text-center tw-text-sm tw-font-medium tw-text-gray-500 tw-shadow-md tw-shadow-[#1E0039]/50'>
            {tabs.map((tab) => (
              <li key={tab.title}
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
                  href={tab.title}
                  className='tw-inline-block tw-w-full tw-p-4 hover:tw-bg-[#1E0039] hover:tw-text-white'
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
