/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import LeftSidebar from "../../components/AdminDashboard/LeftSidebar";
import TopToolBar from "../../components/AdminDashboard/TopToolBar";
import Users from "../../images/icons/people-3-v3-white.svg";
import DollarIcon from "../../images/icons/DollarIcon.svg";
import StartWhiteIcon from "../../images/icons/star-file-white.svg";
import starWhite from "../../images/icons/StarFULL.svg";
import plusWhite from "../../images/icons/PlusWhite.svg";
import referralIcon from "../../images/icons/referral-sign-white.svg";
import Triangle from "../../images/icons/triangle.svg";

export default function MainPage() {
  const { user } = useSelector((user) => ({ ...user }));
  const [openTab, setOpenTab] = useState(1);

  const dropdownRef = useRef(null);
  const [item, setItem] = useState({
    name: "Vera Carpenter",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80",
    role: "Distributor",
    phone: "647-818-1281",
    email: "123@gmail.com",
  });

  //dropdown
  const [isOpen, setIsOpen] = useState(false);
  const options = ["Option 1", "Option 2", "Option 3", "Option 4"];

  const handleToggle = () => {
    console.log("handleToggle");
    setIsOpen(!isOpen);
  };

  const handleSelect = (option) => {
    console.log(`Selected: ${option}`);
    setItem({ ...item, role: option });
    setIsOpen(false);
  };

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

  useEffect(() => {
    document.addEventListener("mousedown", handleDocumentClick);
    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, []);
  const handleDocumentClick = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };
  return (
    <div className="tw-flex tw-h-screen tw-flex-col tw-bg-white">
      <div className="tw-mb-8 tw-mt-24 tw-flex tw-justify-start tw-pl-24 tw-text-[#1E0039]">
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
          <TopToolBar selectedTab="Main Metrics" role={user.role} />

          <div className="tw-sm:flex-col tw-sm:gap-10 tw-mt-6 tw-flex tw-w-full  tw-flex-row tw-items-center tw-justify-between">
            <div className="tw-sm:flex-1 tw-sm:w-full tw-rounded-[22px] tw-border-[2px] tw-border-[#cac4cf] tw-px-[50px] tw-py-[26px] tw-shadow-[35px_35px_60px_-15px_rgba(0,0,0,0.3)] tw-flex tw-w-full tw-items-center tw-justify-between tw-bg-white">
              <div className="tw-md:w-full tw-w-[20%] tw-min-w-[134px] tw-gap-[9px] tw-rounded-[18px] tw-mb-12 tw-mt-8 tw-flex tw-flex-col tw-items-center tw-justify-center tw-bg-[#1E0039] tw-p-0.5">
                <img
                  className="tw-h-[40px] tw-pt-[2px] tw-mb-1"
                  src={Users}
                  alt="bookmark_One"
                />
                <p className="tw-md:text-base tw-sm:text-[28px] tw-text-[18px] tw-mt-1 tw-text-white">
                  Total Users
                </p>
                <p className="tw-md:text-3xl tw-sm:text-[28px] tw-text-[18px] tw-mt-1 tw-text-white">
                  1646
                </p>
              </div>
              <div className="tw-md:w-full tw-w-[20%] tw-min-w-[134px] tw-gap-[9px] tw-rounded-[18px] tw-mb-12 tw-mt-8 tw-flex tw-flex-col tw-items-center tw-justify-center tw-bg-[#1E0039] tw-p-0.5">
                <img
                  className="tw-h-[46px] tw-mb-1"
                  src={StartWhiteIcon}
                  alt="bookmark_One"
                />
                <p className="tw-md:text-xl tw-sm:text-[28px] tw-text-[18px] tw-mt-1 tw-text-white">
                  Total EPKs
                </p>
                <p className="tw-md:text-3xl tw-sm:text-[28px] tw-text-[18px] tw-mt-1 tw-text-white">
                  840
                </p>
              </div>
            </div>
          </div>

          <div className="tw-md:flex-1 tw-md:w-full tw-rounded-[22px] tw-mt-8 tw-flex  tw-w-full tw-flex-col  tw-items-center tw-justify-start  tw-bg-[#1E0039]">
            <div className="tw-my-[10px] tw-flex tw-w-full tw-items-center">
              {/* DropdownBtn  */}
              <div
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
                    className=" tw-absolute tw-right-5 tw-ml-2.5 tw-h-3 tw-rounded-none tw-pl-4"
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
                        className="hover:tw-bg-[#1E0039] tw-block tw-w-full tw-px-4 tw-py-2 tw-text-sm tw-text-[#1E0039] hover:tw-text-white"
                        role="menuitem"
                      >
                        {option}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <p className="tw-mt-[5px] tw-w-full  tw-pl-44 tw-font-bold tw-text-white">
                ENGAGEMENT
              </p>
            </div>
            <div className="tw-sm:flex-1 tw-sm:w-full tw-rounded-[22px] tw-px-[30px] tw-flex tw-w-full tw-items-center tw-justify-between tw-bg-[#1E0039] ">
              <div className="tw-md:w-full tw-my-[40px] tw-w-[40%] tw-gap-[9px] tw-rounded-[18px] tw-flex tw-flex-col tw-items-center tw-justify-center tw-bg-white tw-p-0.5">
                <p className="tw-md:text-base tw-sm:text-[28px]  tw-mt-[20px] tw-text-[18px] tw-font-bold tw-text-[#1E0039]">
                  ENGAGEMENT EPKs
                </p>
                <div className="tw-mt-[20px] tw-mb-[40px] tw-flex tw-w-full tw-items-center tw-justify-around">
                  <div className=" tw-w-[50px] tw-rounded-[18px] tw-flex-col tw-items-center tw-justify-center tw-bg-[#1E0039] ">
                    <img
                      className="tw-mt-1 tw-h-[20px] tw-scale-90 "
                      src={DollarIcon}
                      alt="Dollar icon"
                    />
                    <p className="tw-md:text-base tw-sm:text-[12px]  tw-text-[14px] tw-mb-1 tw-text-center tw-text-white">
                      400
                    </p>
                  </div>
                  <div className="tw-w-[50px] tw-rounded-[18px] tw-items-center tw-justify-center tw-bg-[#1E0039] ">
                    <img
                      className="tw-fill-[#FFF] tw-mt-1 tw-h-[20px] tw-scale-150 "
                      src={starWhite}
                      alt="Star icon"
                    />
                    <p className="tw-md:text-base tw-sm:text-[12px]  tw-text-[14px] tw-mb-1 tw-text-center tw-text-white">
                      440
                    </p>
                  </div>
                  <div className="tw-w-[50px] tw-rounded-[18px] tw-items-center tw-justify-center tw-bg-[#1E0039] ">
                    <img
                      className="tw-mt-1 tw-h-[20px] tw-scale-90 "
                      src={plusWhite}
                      alt="Plus icon"
                    />
                    <p className="tw-md:text-base tw-sm:text-[12px]  tw-text-[14px] tw-mb-1 tw-text-center tw-text-white">
                      380
                    </p>
                  </div>
                </div>
              </div>
              <div className="tw-md:w-full  tw-my-[10px] tw-w-[40%] tw-gap-[9px] tw-rounded-[18px] tw-flex tw-flex-col tw-items-center tw-justify-center tw-bg-white tw-p-0.5">
                <p className="tw-md:text-base tw-sm:text-[28px] tw-mt-[20px]  tw-text-[18px] tw-font-bold tw-text-[#1E0039]">
                  ENGAGEMENT ACTORs
                </p>
                <div className="tw-mt-[20px] tw-mb-[40px] tw-flex tw-w-full tw-items-center tw-justify-around">
                  <div className="tw-w-[50px] tw-rounded-[18px] tw-items-center tw-justify-center tw-bg-[#1E0039] ">
                    <img
                      className="tw-fill-[#FFF] tw-mt-1 tw-h-[20px] tw-scale-150 "
                      src={starWhite}
                      alt="Star icon"
                    />
                    <p className="tw-md:text-base tw-sm:text-[12px]  tw-text-[14px] tw-mb-1 tw-text-center tw-text-white">
                      440
                    </p>
                  </div>

                  <div className="tw-w-[50px] tw-rounded-[18px] tw-items-center tw-justify-center tw-bg-[#1E0039] ">
                    <img
                      className="tw-mt-1 tw-h-[20px] tw-scale-90 "
                      src={plusWhite}
                      alt="Plus icon"
                    />
                    <p className="tw-md:text-base tw-sm:text-[12px]  tw-text-[14px] tw-mb-1 tw-text-center tw-text-white">
                      390
                    </p>
                  </div>
                  <div className=" tw-w-[50px] tw-rounded-[18px] tw-flex-col tw-items-center tw-justify-center tw-bg-[#1E0039] ">
                    <img
                      className="tw-mt-1 tw-h-[20px] tw-scale-105 "
                      src={referralIcon}
                      alt="referral Icon"
                    />

                    <p className="tw-md:text-base tw-sm:text-[12px]  tw-text-[14px] tw-mb-1 tw-text-center tw-text-white">
                      390
                    </p>
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
