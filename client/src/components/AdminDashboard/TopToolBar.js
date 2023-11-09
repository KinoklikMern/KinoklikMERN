import React, { useContext } from "react";

import Triangle from "../../images/icons/triangle.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function TopToolBar(props) {
  const SELECTED_TAB = props.selectedTab;

  const Role = props.role;

  //   console.log(sideBarList);

  const handleSearchClick = () => {
    alert("search clicked");
  };

  return (
    <>
      <header className="tw-mt-[5px] tw-flex tw-w-full tw-flex-col tw-justify-end tw-rounded-xl tw-bg-gray-300">
        <div
          className={`${
            SELECTED_TAB == "Main Metrics"
              ? "tw-justify-end"
              : "tw-justify-between"
          } tw-md:flex-col tw-md:gap-5 tw-h-[60px] tw-flex tw-w-full tw-flex-row tw-items-center  tw-pr-10`}
        >
          {SELECTED_TAB == "Main Metrics" ? null : (
            <div className=" tw-relative tw-ml-14 tw-flex">
              <input
                type="text"
                placeholder="Search name..."
                className="focus:tw-border-[#1E0039] tw-h-[20px] tw-w-56 tw-rounded-xl  tw-border tw-border-gray-300 tw-bg-gray-100  tw-text-xs"
              ></input>
              <div className="tw-h-[16px]  tw-absolute tw-bottom-1.5 tw-right-3 tw-text-gray-300">
                <FontAwesomeIcon
                  className="tw-cursor-pointer"
                  icon={faMagnifyingGlass}
                  size="sm"
                  onClick={handleSearchClick}
                />
              </div>
            </div>
          )}
          <div className="tw-flex ">
            <p className="tw-md:ml-[0] tw-md:mt-0 mt-0.5 tw-md:text-base  tw-pr-8  tw-text-gray-700">
              Monday, 1st March
            </p>
            <img
              className="tw-md:ml-[0] tw-h-[16px] tw-ml-2.5 tw-rounded-none"
              src={Triangle}
              alt="polygonThree"
            />
          </div>
        </div>

        {SELECTED_TAB == "Main Metrics" || SELECTED_TAB == "EPKs" ? null : (
          <div className="tw-md:flex-col tw-md:gap-5  tw-flex tw-w-full tw-flex-row tw-items-center tw-justify-between tw-pr-10">
            <div>
              <div className="tw-shadow-[3px_5px_10px_1px_rgba(30,0,57,0.8)] tw-mb-2 tw-ml-14 tw-flex tw-h-4 tw-justify-between tw-rounded-xl tw-bg-white tw-text-xs ">
                <button className="tw-rounded-lg tw-bg-white tw-px-2 hover:tw-bg-midnight hover:tw-text-white">
                  Filmmakers
                </button>
                <button className="tw-rounded-lg tw-bg-white tw-px-2 hover:tw-bg-midnight hover:tw-text-white">
                  Distributors
                </button>
                <button className="tw-rounded-lg tw-bg-white tw-px-2 hover:tw-bg-midnight hover:tw-text-white">
                  Film
                </button>
                <button className="tw-rounded-lg tw-bg-white tw-px-2 hover:tw-bg-midnight hover:tw-text-white">
                  Festivals
                </button>
                <button className="tw-rounded-lg tw-bg-white tw-px-2 hover:tw-bg-midnight hover:tw-text-white">
                  Sales
                </button>
                <button className="tw-rounded-lg tw-bg-white tw-px-2 hover:tw-bg-midnight hover:tw-text-white">
                  Agents
                </button>
                <button className="tw-rounded-lg tw-bg-white tw-px-2 hover:tw-bg-midnight hover:tw-text-white">
                  Investors
                </button>
                <button className="tw-rounded-lg tw-bg-white tw-px-2 hover:tw-bg-midnight hover:tw-text-white">
                  All Users
                </button>
              </div>
              <div className="tw-shadow-[3px_5px_10px_1px_rgba(30,0,57,0.8)] tw-mb-2 tw-ml-14 tw-flex tw-h-4 tw-justify-between tw-rounded-xl tw-bg-white tw-text-xs ">
                <button className="tw-rounded-lg tw-bg-white tw-px-2 hover:tw-bg-midnight hover:tw-text-white">
                  Actors
                </button>
                <button className="tw-rounded-lg tw-bg-white tw-px-2 hover:tw-bg-midnight hover:tw-text-white">
                  Editors
                </button>
                <button className="tw-rounded-lg tw-bg-white tw-px-2 hover:tw-bg-midnight hover:tw-text-white">
                  Writers
                </button>
                <button className="tw-rounded-lg tw-bg-white tw-px-2 hover:tw-bg-midnight hover:tw-text-white">
                  Cinematographers
                </button>
                <button className="tw-rounded-lg tw-bg-white tw-px-2 hover:tw-bg-midnight hover:tw-text-white">
                  Producers
                </button>
                <button className="tw-rounded-lg tw-bg-white tw-px-2 hover:tw-bg-midnight hover:tw-text-white">
                  Sound
                </button>
                <button className="tw-rounded-lg tw-bg-white tw-px-2 hover:tw-bg-midnight hover:tw-text-white">
                  Viewers
                </button>
              </div>
            </div>
            <div className="tw-flex tw-items-center">
              <p className="tw-mr-32">Total</p>
              <div className="tw-w-[30px] tw-h-[30px] tw-flex tw-items-center tw-justify-center tw-rounded-lg tw-bg-midnight tw-text-center tw-text-white">
                25
              </div>
            </div>
          </div>
        )}
        {SELECTED_TAB == "EPKs" ? (
          <div className="tw-md:flex-col tw-md:gap-5  tw-mb-2 tw-flex tw-w-full tw-flex-row tw-items-center tw-justify-between tw-pr-10">
            <div>
              <div className="tw-shadow-[3px_5px_10px_1px_rgba(30,0,57,0.8)] tw-mb-2 tw-ml-14 tw-flex tw-h-4 tw-justify-between tw-rounded-xl tw-bg-white tw-text-xs ">
                <button className="tw-rounded-lg tw-bg-white tw-px-2 hover:tw-bg-midnight hover:tw-text-white">
                  Pre-Production
                </button>
                <button className="tw-rounded-lg tw-bg-white tw-px-2 hover:tw-bg-midnight hover:tw-text-white">
                  Production
                </button>
                <button className="tw-rounded-lg tw-bg-white tw-px-2 hover:tw-bg-midnight hover:tw-text-white">
                  Post-Production
                </button>
                <button className="tw-rounded-lg tw-bg-white tw-px-2 hover:tw-bg-midnight hover:tw-text-white">
                  All EPKs
                </button>
              </div>
            </div>
            <div className="tw-flex tw-items-center">
              <p className="tw-mr-32">Total</p>
              <div className="tw-w-[30px] tw-h-[30px] tw-flex tw-items-center tw-justify-center tw-rounded-lg tw-bg-midnight tw-text-center tw-text-white">
                25
              </div>
            </div>
          </div>
        ) : null}
      </header>
    </>
  );
}
