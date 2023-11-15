/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LeftSidebar from "../../components/AdminDashboard/LeftSidebar";
import Triangle from "../../images/icons/triangle.svg";
import Film from "../../images/icons/img_save.svg";
import Users from "../../images/icons/img_user.svg";
import StartWhiteIcon from "../../images/icons/star-file-white.svg";
import {userTranslation} from 'react-i18next';

export default function MainPage() {
  const { t } = userTranslation();
  const { user } = useSelector((user) => ({ ...user }));
  const [openTab, setOpenTab] = useState(1);
  const tabs = [
    {
      title: "Profile",
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
          <LeftSidebar selectedTab="Main Metrics" role={user.role} />
        </div>
        <div className="tw-ml-16 tw-mt-8 tw-h-5/6 tw-w-5/6 tw-max-w-5xl tw-justify-between tw-overflow-auto tw-rounded-lg  tw-bg-white tw-p-4">
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

          <div className="tw-sm:flex-col tw-sm:gap-10 tw-mt-[50px] tw-flex tw-w-full  tw-flex-row tw-items-center tw-justify-between">
            <div className="tw-sm:flex-1 tw-sm:w-full tw-flex tw-w-[44%] tw-flex-col tw-items-center tw-justify-center tw-rounded-[22px] tw-border-x-[3px] tw-border-[#cac4cf] tw-bg-white tw-shadow-[35px_35px_60px_-15px_rgba(0,0,0,0.3)]">
              <div className="tw-mb-[100px] tw-flex tw-w-full tw-flex-col tw-items-center tw-justify-center tw-gap-1.5">
                <div className="tw-flex tw-w-full tw-flex-col tw-items-center tw-justify-center tw-rounded-[20px] tw-bg-gradient-to-b tw-from-[#1E0039] tw-p-[7px]">
                  <p className=" tw-mb-[5px] tw-text-[15px] tw-font-bold tw-text-white">
                  {t("Users & Filmmakers")}
                  </p>
                </div>
                <div className="tw-md:w-full tw-flex tw-w-[72%] tw-flex-row tw-items-center tw-justify-between tw-gap-[39px]">
                  <div className="tw-mt-[20px] tw-flex tw-h-20 tw-w-20 tw-flex-col tw-items-center tw-justify-end tw-rounded-[50%] tw-bg-gray-900 tw-p-1.5">
                    <p className="tw-md:text-3xl tw-sm:text-[28px] tw-mt-[7px] tw-text-[32px] tw-text-white">
                      1.5K
                    </p>
                    <img
                      className="tw-h-[21px] tw-rounded-none"
                      src={Users}
                      alt="user_One"
                    />
                  </div>
                  <div className="tw-mt-[20px] tw-flex tw-h-20 tw-w-20 tw-flex-col tw-items-center tw-justify-end tw-rounded-[50%] tw-bg-gray-900 tw-p-1.5">
                    <p className="tw-md:text-3xl tw-sm:text-[28px] tw-mt-[7px] tw-text-[32px] tw-text-white">
                      850
                    </p>
                    <img
                      className="tw-h-[21px] tw-rounded-none"
                      src={Film}
                      alt="film"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="tw-sm:flex-1 tw-sm:w-full tw-flex tw-w-[44%] tw-flex-col tw-items-center tw-justify-center tw-rounded-[22px] tw-border-x-[3px] tw-border-[#cac4cf] tw-bg-white tw-shadow-[35px_35px_60px_-15px_rgba(0,0,0,0.3)]">
              <div className="tw-mb-[36px] tw-flex tw-w-full tw-flex-col tw-items-center tw-justify-center tw-gap-1.5">
                <div className="tw-flex tw-w-full tw-flex-col tw-items-center tw-justify-center tw-rounded-[20px] tw-bg-gradient-to-b tw-from-[#1E0039] tw-p-[7px]">
                  <p className=" tw-mb-[5px] tw-text-[15px] tw-font-bold tw-text-white">
                    EPKs
                  </p>
                </div>
                <div className="tw-md:w-full tw-flex tw-w-[72%] tw-flex-row tw-items-center tw-justify-center tw-gap-[39px]">
                  <div className="tw-md:w-full tw-mb-[53px] tw-mt-[20px] tw-flex tw-w-[26%] tw-flex-col tw-items-center tw-justify-center tw-gap-[9px] tw-rounded-[10px] tw-bg-[#1E0039] tw-p-0.5">
                    <p className="tw-md:text-3xl tw-sm:text-[28px] tw-mt-1 tw-text-[32px] tw-text-white">
                      1110
                    </p>
                    <img
                      className="tw-mb-1 tw-h-[24px]"
                      src={StartWhiteIcon}
                      alt="bookmark_One"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="flex md:flex-1 flex-col items-center justify-start w-[76%] md:w-full">
          <div className="bg-gray-900 h-0.5 w-full" />
         
          <div className="flex sm:flex-col flex-row sm:gap-10 items-center justify-between w-full mt-[50px]">
            <div className="bg-white-A700 flex sm:flex-1 flex-col items-center justify-start rounded-[22px] shadow-bs w-[44%] sm:w-full">
              <div className="flex flex-col gap-1.5 items-center justify-start mb-[53px] w-full">
                <div className="bg-gradient  flex flex-col items-center justify-start p-[7px] rounded-[20px] w-full">
                  <p className="font-bold mb-[5px] text-[15px] text-white-A700">
                    Users & Filmmakers
                  </p>
                </div>
                <div className="flex flex-row gap-[39px] items-center justify-between w-[72%] md:w-full">
                  <div className="bg-gray-900 flex h-20 md:h-[39px] justify-end p-[5px] relative rounded-[50%] w-20">
                    <p className="absolute inset-x-[0] mx-auto md:text-3xl sm:text-[28px] text-[32px] text-white-A700 top-[19%] w-max">
                      1.5k
                    </p>
                    <img
                      className="h-px mb-2.5 ml-auto mr-[27px] mt-auto w-px"
                      src="images/img_vector.svg"
                      alt="vector"
                    />
                    <img
                      className="absolute bottom-[6%] h-[21px] inset-x-[0] mx-auto"
                      src="images/img_user_white_a700.svg"
                      alt="user_One"
                    />
                  </div>
                  <div className="bg-gray-900 flex flex-col h-20 items-center justify-end p-1.5 rounded-[50%] w-20">
                    <p className="mt-[7px] md:text-3xl sm:text-[28px] text-[32px] text-white-A700">
                      850
                    </p>
                    <img
                      className="h-[21px]"
                      src="images/img_save.svg"
                      alt="save"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white-A700 flex sm:flex-1 flex-col gap-[9px] items-center justify-start rounded-[22px] shadow-bs w-[44%] sm:w-full">
              <div className="bg-gradient  flex flex-col items-center justify-start p-2 rounded-[20px] w-full">
                <p className="font-bold mb-1 text-[15px] text-white-A700">
                  EPKs
                </p>
              </div>
              <div className="bg-gray-900 flex flex-col gap-[9px] items-center justify-start mb-[53px] p-0.5 rounded-[10px] w-[26%] md:w-full">
                <p className="mt-1 md:text-3xl sm:text-[28px] text-[32px] text-white-A700">
                  1110
                </p>
                <img
                  className="h-[15px] mb-1"
                  src="images/img_bookmark.svg"
                  alt="bookmark_One"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-start w-full mt-[50px]">
            <div className="bg-gray-900 flex flex-col items-start justify-start p-1 rounded-[22px] w-full">
              <div className="flex flex-col items-start justify-start mb-2 ml-3.5 md:ml-[0] w-[89%] md:w-full">
                <div className="flex sm:flex-col flex-row sm:gap-5 items-start justify-start w-[68%] md:w-full">
                  <button
                    className="cursor-pointer flex items-center justify-center mb-[3px] min-w-[60px]"
                    rightIcon={
                      <div className="mb-px ml-px bg-gray-900">
                        <img src="images/img_polygon_6.svg" alt="Polygon 6" />
                      </div>
                    }
                  >
                    <div className="leading-[normal] text-[10px] text-left">
                      Monthy
                    </div>
                  </button>
                  <button
                    className="cursor-pointer flex items-center justify-center mb-[3px] min-w-[89px] sm:ml-[0] ml-[19px]"
                    rightIcon={
                      <div className="mb-px ml-[11px] bg-gray-900">
                        <img src="images/img_polygon_6.svg" alt="Polygon 7" />
                      </div>
                    }
                  >
                    <div className="leading-[normal] text-[10px] text-left">
                      Distributor
                    </div>
                  </button>
                  <p className="sm:ml-[0] ml-[111px] text-[15px] text-white-A700">
                    Users Counts
                  </p>
                </div>
                <div className="flex sm:flex-col flex-row gap-[25px] items-end justify-between md:ml-[0] ml-[5px] mt-[3px] w-[98%] md:w-full">
                  <div className="flex flex-col gap-[11px] items-start justify-start mb-0.5 sm:mt-0 mt-[21px]">
                    <p className="text-[6px] text-white-A700">50</p>
                    <p className="h-2 text-[6px] text-white-A700">40</p>
                    <p className="text-[6px] text-white-A700">30</p>
                    <p className="text-[6px] text-white-A700">20</p>
                    <p className="text-[6px] text-white-A700">10</p>
                  </div>
                  <img
                    className="h-[114px]"
                    src="images/img_group6.svg"
                    alt="groupSix"
                  />
                </div>
                <div className="flex sm:flex-col flex-row sm:gap-5 items-start justify-end ml-6 md:ml-[0] mt-1.5 w-[96%] md:w-full">
                  <p className="sm:mt-0 mt-[7px] text-[10px] text-white-A700">
                    Jan
                  </p>
                  <p className="mb-0.5 ml-24 sm:ml-[0] sm:mt-0 mt-[5px] text-[10px] text-white-A700">
                    Feb
                  </p>
                  <p className="sm:ml-[0] ml-[151px] sm:mt-0 my-[3px] text-[10px] text-white-A700">
                    Mar
                  </p>
                  <p className="mb-[7px] sm:ml-[0] ml-[113px] text-[10px] text-white-A700">
                    Apr
                  </p>
                  <p className="mb-[7px] sm:ml-[0] ml-[79px] text-[10px] text-white-A700">
                    May
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
