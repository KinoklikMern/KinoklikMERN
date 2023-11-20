/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import LeftSidebar from "../../components/AdminDashboard/LeftSidebar";
import TopToolBar from "../../components/AdminDashboard/TopToolBar";
import Users from "../../images/icons/people-3-v3-white.svg";
import DollarIcon from "../../images/icons/DollarIcon.svg";
import StartWhiteIcon from "../../images/icons/star-file-white.svg";
import { useTranslation } from "react-i18next";
import starWhite from "../../images/icons/StarFULL.svg";
import plusWhite from "../../images/icons/PlusWhite.svg";
import referralIcon from "../../images/icons/referral-sign-white.svg";
import http from "../../http-common";

export default function MainPage() {
  const { t } = useTranslation();
  const { user } = useSelector((user) => ({ ...user }));

  //Fetch data related
  const [userInfo, setUserInfo] = useState();
  const [epkInfo, setEpkInfo] = useState();

  const dropdownRef = useRef(null);

  //dropdown
  //const [isOpen, setIsOpen] = useState(false);
  //const options = ["Option 1", "Option 2", "Option 3", "Option 4"];
  // const handleToggle = () => {
  //   console.log("handleToggle");
  //   setIsOpen(!isOpen);
  // };
  // const handleSelect = (option) => {
  //   console.log(`Selected: ${option}`);
  //   setItem({ ...item, role: option });
  //   setIsOpen(false);
  // };

  useEffect(() => {
    document.addEventListener("mousedown", handleDocumentClick);
    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, []);

  useEffect(() => {
    Promise.all([http.get(`/fepks/`), http.get("/users/getallusers")])
      .then(([fepkResponse, usersResponse]) => {
        const usersData = usersResponse.data;
        const fepksData = fepkResponse.data;
        setUserInfo(usersData);
        setEpkInfo(fepksData);
      })
      .catch((error) => {
        console.error("An error occurred while fetching data.", error);
      });
  }, []);

  //Dropdown
  const handleDocumentClick = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      //setIsOpen(false);
    }
  };

  return (
    <div className="tw-flex tw-h-screen tw-flex-col tw-bg-white">
      <div className="tw-mb-8 tw-mt-24 tw-flex tw-justify-start tw-pl-24 tw-text-[#1E0039]">
        {/* <p className="tw-text-4xl">Admin Dashboard</p> */}
      </div>
      <div className="tw-mx-8 tw-flex tw-h-5/6 tw-flex-row">
        <div className="tw-ml-16 tw-mt-12 tw-h-[70vh]">
          <LeftSidebar selectedTab="Main Metrics" role={user.role} />
        </div>
        <div className="tw-ml-16 tw-mt-8 tw-h-5/6 tw-w-5/6 tw-min-w-min tw-justify-between tw-overflow-auto tw-rounded-lg  tw-bg-white tw-p-4">
          {/* line */}
          <div className="tw-h-0.5 tw-w-full tw-bg-[#1E0039]"></div>
          {/* box */}
          <TopToolBar selectedTab="Main Metrics" role={user.role} />

          <div className="tw-sm:flex-col tw-sm:gap-10 tw-mt-6 tw-flex   tw-w-full tw-flex-row tw-items-center tw-justify-between">
            <div className="tw-sm:flex-1 tw-sm:w-full tw-flex tw-h-[28vh] tw-w-full tw-items-center tw-justify-between tw-rounded-[22px] tw-border-[2px] tw-border-[#cac4cf] tw-bg-white tw-px-[50px] tw-py-[26px] tw-shadow-[35px_35px_60px_-15px_rgba(0,0,0,0.3)]">
              <div className="tw-md:w-full tw-mb-12 tw-mt-8 tw-flex tw-w-[20%] tw-min-w-[134px] tw-flex-col tw-items-center tw-justify-center tw-gap-[9px] tw-rounded-[18px] tw-bg-[#1E0039] tw-p-0.5">
                <img
                  className="tw-mb-1 tw-h-[40px] tw-pt-[2px]"
                  src={Users}
                  alt="bookmark_One"
                />
                <p className="tw-md:text-base tw-sm:text-[28px] tw-mt-1 tw-text-[18px] tw-text-white">
                  {t("Total Users")}
                </p>
                {userInfo === undefined ? (
                  t("Loading")
                ) : (
                  <p className="tw-md:text-3xl tw-sm:text-[28px] tw-mt-1 tw-text-[18px] tw-text-white">
                    {userInfo.length}
                  </p>
                )}
              </div>
              <div className="tw-md:w-full tw-mb-12 tw-mt-8 tw-flex tw-w-[20%] tw-min-w-[134px] tw-flex-col tw-items-center tw-justify-center tw-gap-[9px] tw-rounded-[18px] tw-bg-[#1E0039] tw-p-0.5">
                <img
                  className="tw-mb-1 tw-h-[46px]"
                  src={StartWhiteIcon}
                  alt="bookmark_One"
                />
                <p className="tw-md:text-xl tw-sm:text-[28px] tw-mt-1 tw-text-[18px] tw-text-white">
                  {t("Total EPKs")}
                </p>
                {epkInfo === undefined ? (
                  "Loading"
                ) : (
                  <p className="tw-md:text-3xl tw-sm:text-[28px] tw-mt-1 tw-text-[18px] tw-text-white">
                    {epkInfo.length}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="tw-md:flex-1 tw-md:w-full tw-mt-8 tw-flex tw-h-[28vh]  tw-w-full tw-flex-col tw-items-center tw-justify-start tw-rounded-[22px]  tw-bg-[#1E0039]">
            <div className="tw-my-[10px] tw-flex tw-w-full tw-items-center">
              {/* DropdownBtn  */}
              {/* <div
                ref={dropdownRef}
                className="tw-relative tw-my-1 tw-ml-10 tw-h-5 tw-w-48 tw-rounded-2xl  tw-border-none tw-text-center tw-shadow-lg"
              >
                <button
                  onClick={handleToggle}
                  type="button"
                  className="tw-hover:bg-indigo-700 tw-focus:outline-none tw-focus:ring tw-focus:ring-indigo-300 tw-focus:ring-opacity-50  tw-flex tw-h-5 tw-w-full tw-items-center tw-justify-center tw-rounded-2xl tw-bg-white tw-text-[#1E0039] "
                  id="options-menu"
                  aria-haspopup="listbox"
                >
                  {item.role}
                  <img
                    className=" tw-absolute tw-right-3 tw-ml-2.5 tw-h-3 tw-rounded-none tw-pl-4"
                    src={Triangle}
                    alt="polygonThree"
                  />
                </button>
                {isOpen && (
                  <ul className="tw-absolute tw-right-0 tw-origin-bottom-left   tw-rounded-md tw-bg-white tw-shadow-lg tw-ring-1 tw-ring-black tw-ring-opacity-5">
                    {options.map((option, index) => (
                      <li
                        key={index}
                        onClick={(e) => handleSelect(option)}
                        className="tw-block tw-w-full tw-px-4 tw-py-2 tw-text-sm tw-text-[#1E0039] hover:tw-bg-[#1E0039] hover:tw-text-white"
                        role="menuitem"
                      >
                        {option}
                      </li>
                    ))}
                  </ul>
                )}
              </div> */}

              <p className="tw-mt-[5px] tw-w-full   tw-text-center tw-font-bold tw-text-white">
                {t("ENGAGEMENT")}
              </p>
            </div>
            <div className="tw-sm:flex-1 tw-sm:w-full tw-flex tw-w-full tw-items-center tw-justify-between tw-rounded-[22px] tw-bg-[#1E0039] tw-px-[30px] ">
              <div className="tw-md:w-full tw-my-[40px] tw-flex tw-w-[40%] tw-flex-col tw-items-center tw-justify-center tw-gap-[9px] tw-rounded-[18px] tw-bg-white tw-p-0.5">
                <p className="tw-md:text-base tw-sm:text-[28px]  tw-mt-[20px] tw-text-[18px] tw-font-bold tw-text-[#1E0039]">
                  {t("ENGAGEMENT EPKs")}
                </p>
                <div className="tw-mb-[40px] tw-mt-[20px] tw-flex tw-w-full tw-items-center tw-justify-around">
                  <div className=" tw-w-[50px] tw-flex-col tw-items-center tw-justify-center tw-rounded-[18px] tw-bg-[#1E0039] ">
                    <img
                      className="tw-mt-1 tw-h-[20px] tw-scale-90 "
                      src={DollarIcon}
                      alt="Dollar icon"
                    />
                    {epkInfo === undefined ? (
                      0
                    ) : (
                      <p className="tw-md:text-base tw-sm:text-[12px]  tw-mb-1 tw-text-center tw-text-[14px] tw-text-white">
                        {epkInfo.reduce((sum, item) => {
                          return sum + item.wishes_to_buy.length;
                        }, 0)}
                      </p>
                    )}
                  </div>
                  <div className="tw-w-[50px] tw-items-center tw-justify-center tw-rounded-[18px] tw-bg-[#1E0039] ">
                    <img
                      className="tw-mt-1 tw-h-[20px] tw-scale-150 tw-fill-[#FFF] "
                      src={starWhite}
                      alt="Star icon"
                    />
                    {epkInfo === undefined ? (
                      0
                    ) : (
                      <p className="tw-md:text-base tw-sm:text-[12px]  tw-mb-1 tw-text-center tw-text-[14px] tw-text-white">
                        {epkInfo.reduce((sum, item) => {
                          return sum + item.likes.length;
                        }, 0)}
                      </p>
                    )}
                  </div>
                  <div className="tw-w-[50px] tw-items-center tw-justify-center tw-rounded-[18px] tw-bg-[#1E0039] ">
                    <img
                      className="tw-mt-1 tw-h-[20px] tw-scale-90 "
                      src={plusWhite}
                      alt="Plus icon"
                    />
                    {epkInfo === undefined ? (
                      0
                    ) : (
                      <p className="tw-md:text-base tw-sm:text-[12px]  tw-mb-1 tw-text-center tw-text-[14px] tw-text-white">
                        {epkInfo.reduce((sum, item) => {
                          return sum + item.favourites.length;
                        }, 0)}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="tw-md:w-full  tw-my-[10px] tw-flex tw-w-[40%] tw-flex-col tw-items-center tw-justify-center tw-gap-[9px] tw-rounded-[18px] tw-bg-white tw-p-0.5">
                <p className="tw-md:text-base tw-sm:text-[28px] tw-mt-[20px]  tw-text-[18px] tw-font-bold tw-text-[#1E0039]">
                  {t("ENGAGEMENT ACTORs")}
                </p>
                <div className="tw-mb-[40px] tw-mt-[20px] tw-flex tw-w-full tw-items-center tw-justify-around">
                  <div className="tw-w-[50px] tw-items-center tw-justify-center tw-rounded-[18px] tw-bg-[#1E0039] ">
                    <img
                      className="tw-mt-1 tw-h-[20px] tw-scale-150 tw-fill-[#FFF] "
                      src={starWhite}
                      alt="Star icon"
                    />
                    {userInfo === undefined ? (
                      0
                    ) : (
                      <p className="tw-md:text-base tw-sm:text-[12px]  tw-mb-1 tw-text-center tw-text-[14px] tw-text-white">
                        {userInfo
                          .filter((user) => user.role === "Actor")
                          .reduce((sum, item) => {
                            return sum + item.likes.length;
                          }, 0)}
                      </p>
                    )}
                  </div>

                  <div className="tw-w-[50px] tw-items-center tw-justify-center tw-rounded-[18px] tw-bg-[#1E0039] ">
                    <img
                      className="tw-mt-1 tw-h-[20px] tw-scale-90 "
                      src={plusWhite}
                      alt="Plus icon"
                    />
                    {userInfo === undefined ? (
                      0
                    ) : (
                      <p className="tw-md:text-base tw-sm:text-[12px]  tw-mb-1 tw-text-center tw-text-[14px] tw-text-white">
                        {userInfo
                          .filter((user) => user.role === "Actor")
                          .reduce((sum, item) => {
                            return sum + item.followers.length;
                          }, 0)}
                      </p>
                    )}
                  </div>
                  <div className=" tw-w-[50px] tw-flex-col tw-items-center tw-justify-center tw-rounded-[18px] tw-bg-[#1E0039] ">
                    <img
                      className="tw-mt-1 tw-h-[20px] tw-scale-105 "
                      src={referralIcon}
                      alt="referral Icon"
                    />

                    {userInfo === undefined ? (
                      0
                    ) : (
                      <p className="tw-md:text-base tw-sm:text-[12px]  tw-mb-1 tw-text-center tw-text-[14px] tw-text-white">
                        {userInfo
                          .filter((user) => user.role === "Actor")
                          .reduce((sum, item) => {
                            return sum + item.recommendations;
                          }, 0)}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
