import React, { useContext, useState } from "react";

import Triangle from "../../images/icons/triangle.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function TopToolBar({ selectedTab, setFilteredEPKs, epkInfo }) {
  const [productionFilter, setProductionFilter] = useState(3); //Select 'All EPKs' by default
  const [searchKeyWord, setSearchKeyWord] = useState("");

  const options = {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  };
  const dateFormatter = new Intl.DateTimeFormat("en-US", options);

  const formattedString = dateFormatter.format(new Date());

  const [currentDate, setCurrentDate] = useState(formattedString);

  const handleSearchClick = (e) => {
    setSearchKeyWord(e.target.value);

    setFilteredEPKs(
      getFilteredEPKs(productionFilter).filter((epk) =>
        epk.title.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  const handleBtnClick = (index) => {
    setProductionFilter(index);

    //Filter EPKs based on the selected filter
    setFilteredEPKs(getFilteredEPKs(index));
  };
  const getFilteredEPKs = (index) => {
    switch (index) {
      case 0:
        return epkInfo.filter((epk) => epk.status === "Preproduction");

      case 1:
        return epkInfo.filter((epk) => epk.status === "Production");

      case 2:
        return epkInfo.filter((epk) => epk.status === "Postproduction");

      default:
        return epkInfo;
    }
  };

  return (
    <>
      <header className="tw-mt-[5px] tw-flex tw-w-full tw-flex-col tw-justify-end tw-rounded-xl tw-bg-gray-300">
        <div
          className={`${
            selectedTab == "Main Metrics" || selectedTab == "Analytics"
              ? "tw-justify-end"
              : "tw-justify-between"
          } tw-md:flex-col tw-md:gap-5 tw-flex tw-h-[60px] tw-w-full tw-flex-row tw-items-center  tw-pr-10`}
        >
          {selectedTab == "Main Metrics" ||
          selectedTab == "Analytics" ? null : (
            <div className=" tw-relative tw-ml-14 tw-flex">
              <input
                type="text"
                placeholder="Search name..."
                className="tw-h-[20px] tw-w-56 tw-rounded-xl tw-border  tw-border-gray-300 tw-bg-gray-100 tw-text-xs  focus:tw-border-[#1E0039]"
                onChange={handleSearchClick}
              ></input>
              <div className="tw-absolute  tw-bottom-1.5 tw-right-3 tw-h-[16px] tw-text-gray-300">
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
              {currentDate.toString()}
            </p>
            {selectedTab == "Main Metrics" ||
            selectedTab == "Analytics" ? null : (
              <img
                className="tw-md:ml-[0] tw-ml-2.5 tw-h-[16px] tw-rounded-none"
                src={Triangle}
                alt="polygonThree"
              />
            )}
          </div>
        </div>

        {selectedTab == "Main Metrics" ||
        selectedTab == "EPKs" ||
        selectedTab == "Analytics" ? null : (
          <div className="tw-md:flex-col tw-md:gap-5  tw-flex tw-w-full tw-flex-row tw-items-center tw-justify-between tw-pr-10">
            <div>
              <div className="tw-mb-2 tw-ml-14 tw-flex tw-h-4 tw-justify-between tw-rounded-xl tw-bg-white tw-text-xs tw-shadow-[3px_5px_10px_1px_rgba(30,0,57,0.8)] ">
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
              <div className="tw-mb-2 tw-ml-14 tw-flex tw-h-4 tw-justify-between tw-rounded-xl tw-bg-white tw-text-xs tw-shadow-[3px_5px_10px_1px_rgba(30,0,57,0.8)] ">
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
              <div className="tw-flex tw-h-[30px] tw-w-[30px] tw-items-center tw-justify-center tw-rounded-lg tw-bg-midnight tw-text-center tw-text-white">
                25
              </div>
            </div>
          </div>
        )}
        {selectedTab == "EPKs" ? (
          <div className="tw-md:flex-col tw-md:gap-5  tw-mb-2 tw-flex tw-w-full tw-flex-row tw-items-center tw-justify-between tw-pr-10">
            <div>
              <div className="tw-mb-2 tw-ml-14 tw-flex tw-h-4 tw-justify-between tw-rounded-xl tw-bg-white tw-text-xs tw-shadow-[3px_5px_10px_1px_rgba(30,0,57,0.8)] ">
                <button
                  className={`${
                    productionFilter === 0
                      ? "tw-bg-midnight tw-text-white"
                      : "tw-bg-white tw-text-midnight"
                  } tw-rounded-lg  tw-px-2 hover:tw-bg-midnight hover:tw-text-white`}
                  onClick={() => handleBtnClick(0)}
                >
                  Pre-Production
                </button>
                <button
                  className={`${
                    productionFilter === 1
                      ? "tw-bg-midnight tw-text-white"
                      : "tw-bg-white tw-text-midnight"
                  } tw-rounded-lg  tw-px-2 hover:tw-bg-midnight hover:tw-text-white`}
                  onClick={() => handleBtnClick(1)}
                >
                  Production
                </button>
                <button
                  className={`${
                    productionFilter === 2
                      ? "tw-bg-midnight tw-text-white"
                      : "tw-bg-white tw-text-midnight"
                  } tw-rounded-lg  tw-px-2 hover:tw-bg-midnight hover:tw-text-white`}
                  onClick={() => handleBtnClick(2)}
                >
                  Post-Production
                </button>
                <button
                  className={`${
                    productionFilter === 3
                      ? "tw-bg-midnight tw-text-white"
                      : "tw-bg-white tw-text-midnight"
                  } tw-rounded-lg  tw-px-2 hover:tw-bg-midnight hover:tw-text-white`}
                  onClick={() => handleBtnClick(3)}
                >
                  All EPKs
                </button>
              </div>
            </div>
            <div className="tw-flex tw-items-center">
              <p className="tw-mr-32">Total</p>
              <div className="tw-flex tw-h-[30px] tw-w-[30px] tw-items-center tw-justify-center tw-rounded-lg tw-bg-midnight tw-text-center tw-text-white">
                25
              </div>
            </div>
          </div>
        ) : null}
      </header>
    </>
  );
}
