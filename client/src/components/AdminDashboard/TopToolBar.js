import React, { useRef, useEffect, useState } from "react";

import Triangle from "../../images/icons/triangle.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from 'react-i18next';

export default function TopToolBar({ selectedTab, setFilteredData, dataInfo }) {
  const { t } = useTranslation();
  const [roleFilter, setRoleFilter] = useState(5); //Select 'All Users' by default
  const [productionFilter, setProductionFilter] = useState(3); //Select 'All EPKs' by default
  //const [searchKeyWord, setSearchKeyWord] = useState("");
  const [sum, setSum] = useState(0);
  const inputRef = useRef(null);

  const currentDate = () => {
    const options = {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    };
    const dateFormatter = new Intl.DateTimeFormat("en-US", options);
    const formattedString = dateFormatter.format(new Date());
    return formattedString;
  };
  const handleSearchClick = () => {
    //Search users based on the selected filter
  };

  const handleKeywordChanged = (e) => {
    if (selectedTab === "Users") {
      //Search users based on the selected filter
      const filterRes = getFilteredUsers(roleFilter).filter(
        (user) =>
          user.firstName.toLowerCase().includes(e.target.value.toLowerCase()) ||
          user.lastName.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setSum(filterRes.length);
      setFilteredData(filterRes);
    } else {
      //Search EPKs based on the selected filter
      setFilteredData(
        getFilteredEPKs(productionFilter).filter((epk) =>
          epk.title.toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
    }
  };

  const handleRoleClick = (index) => {
    setRoleFilter(index);

    //Filter Users based on the selected filter
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    const filterRes = getFilteredUsers(index);
    setSum(filterRes.length);
    setFilteredData(filterRes);
  };
  const getFilteredUsers = (index) => {
    switch (index) {
      case 0:
        return dataInfo.filter(
          (user) => user.role === "Filmmaker" || user.role === "FILM_MAKER"
        );
      case 1:
        return dataInfo.filter((user) => user.role === "Distributor");
      case 2:
        return dataInfo.filter((user) => user.role === "Film Festival");
      case 3:
        return dataInfo.filter(
          (user) => user.role === "Sales Agent" || user.role === "Sales_Agent"
        );
      case 4:
        return dataInfo.filter((user) => user.role === "Investor");
      case 5:
        return dataInfo;
      case 6:
        return dataInfo.filter((user) => user.role === "Actor");
      case 7:
        return dataInfo.filter((user) => user.role === "Editor");
      case 8:
        return dataInfo.filter((user) => user.role === "Writer");
      case 9:
        return dataInfo.filter((user) => user.role === "Cinematographer"); //tbd
      case 10:
        return dataInfo.filter((user) => user.role === "Producer"); //
      case 11:
        return dataInfo.filter((user) => user.role === "Sound"); //
      case 12:
        return dataInfo.filter((user) => user.role === "Viewer");
      case 13:
        return dataInfo.filter((user) => user.role === "Admin");
      case 14:
        return dataInfo.filter((user) => user.role === "Director");
      default:
        return dataInfo;
    }
  };

  const handleBtnClick = (index) => {
    setProductionFilter(index);

    //Filter EPKs based on the selected filter
    setFilteredData(getFilteredEPKs(index));
  };
  const getFilteredEPKs = (index) => {
    switch (index) {
      case 0:
        return dataInfo.filter((epk) => epk.status === "Preproduction");

      case 1:
        return dataInfo.filter((epk) => epk.status === "Production");

      case 2:
        return dataInfo.filter((epk) => epk.status === "Postproduction");

      default:
        return dataInfo;
    }
  };

  // eslint-disable-next-line
  useEffect(() => {
    if (dataInfo !== undefined && roleFilter === 5) {
      setSum(dataInfo.length);
    }
  }, [dataInfo, roleFilter]);
  return (
    <>
      <header className="tw-mt-[5px] tw-flex tw-w-full tw-flex-col tw-justify-end tw-rounded-xl tw-bg-gray-300">
        <div
          className={`${
            selectedTab === "Main Metrics" || selectedTab === "Analytics"
              ? "tw-justify-end"
              : "tw-justify-between"
          } tw-md:flex-col tw-md:gap-5 tw-flex tw-h-[60px] tw-w-full tw-flex-row tw-items-center  tw-pr-10`}
        >
          {selectedTab === "Main Metrics" ||
          selectedTab === "Analytics" ? null : (
            <div className=" tw-relative tw-ml-6 tw-flex">
              <input
                type="text"
                placeholder="Search name..."
                className="tw-h-[20px] tw-w-56 tw-rounded-xl tw-border  tw-border-gray-300 tw-bg-gray-100 tw-text-xs  focus:tw-border-[#1E0039]"
                onChange={handleKeywordChanged}
                ref={inputRef}
              />
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
              {currentDate()}
            </p>
            {selectedTab === "Main Metrics" ||
            selectedTab === "Analytics" ? null : (
              <img
                className="tw-md:ml-[0] tw-ml-2.5 tw-h-[16px] tw-rounded-none"
                src={Triangle}
                alt="polygonThree"
              />
            )}
          </div>
        </div>

        {selectedTab === "Users" ? (
          <div className="tw-md:flex-col tw-md:gap-5  tw-flex tw-w-full tw-flex-row tw-items-center tw-justify-between tw-pr-10">
            <div>
              <div className="tw-mb-2 tw-ml-6 tw-flex tw-h-4 tw-justify-between tw-rounded-xl tw-bg-white tw-text-xs tw-shadow-[3px_5px_10px_1px_rgba(30,0,57,0.8)] ">
                <button
                  className={`${
                    roleFilter === 0
                      ? "tw-bg-midnight tw-text-white"
                      : "tw-bg-white tw-text-midnight"
                  } tw-rounded-lg  tw-px-2 hover:tw-bg-midnight hover:tw-text-white`}
                  onClick={() => handleRoleClick(0)}
                >
                  {t("Filmmakers")}
                </button>
                <button
                  className={`${
                    roleFilter === 1
                      ? "tw-bg-midnight tw-text-white"
                      : "tw-bg-white tw-text-midnight"
                  } tw-rounded-lg  tw-px-2 hover:tw-bg-midnight hover:tw-text-white`}
                  onClick={() => handleRoleClick(1)}
                >
                  {t("Distributors")}
                </button>
                <button
                  className={`${
                    roleFilter === 2
                      ? "tw-bg-midnight tw-text-white"
                      : "tw-bg-white tw-text-midnight"
                  } tw-rounded-lg  tw-px-2 hover:tw-bg-midnight hover:tw-text-white`}
                  onClick={() => handleRoleClick(2)}
                >
                  {t("Film Festivals")}
                </button>

                <button
                  className={`${
                    roleFilter === 3
                      ? "tw-bg-midnight tw-text-white"
                      : "tw-bg-white tw-text-midnight"
                  } tw-rounded-lg  tw-px-2 hover:tw-bg-midnight hover:tw-text-white`}
                  onClick={() => handleRoleClick(3)}
                >
                  {t("Sales Agents")}
                </button>

                <button
                  className={`${
                    roleFilter === 4
                      ? "tw-bg-midnight tw-text-white"
                      : "tw-bg-white tw-text-midnight"
                  } tw-rounded-lg  tw-px-2 hover:tw-bg-midnight hover:tw-text-white`}
                  onClick={() => handleRoleClick(4)}
                >
                  {t("Investors")}
                </button>
                <button
                  className={`${
                    roleFilter === 13
                      ? "tw-bg-midnight tw-text-white"
                      : "tw-bg-white tw-text-midnight"
                  } tw-rounded-lg  tw-px-2 hover:tw-bg-midnight hover:tw-text-white`}
                  onClick={() => handleRoleClick(13)}
                >
                  {t("Admins")}
                </button>
                <button
                  className={`${
                    roleFilter === 5
                      ? "tw-bg-midnight tw-text-white"
                      : "tw-bg-white tw-text-midnight"
                  } tw-rounded-lg  tw-px-2 hover:tw-bg-midnight hover:tw-text-white`}
                  onClick={() => handleRoleClick(5)}
                >
                  {t("All Users")}
                </button>
              </div>
              <div className="tw-mb-2 tw-ml-6 tw-flex tw-h-4 tw-justify-between tw-rounded-xl tw-bg-white tw-text-xs tw-shadow-[3px_5px_10px_1px_rgba(30,0,57,0.8)] ">
                <button
                  className={`${
                    roleFilter === 14
                      ? "tw-bg-midnight tw-text-white"
                      : "tw-bg-white tw-text-midnight"
                  } tw-rounded-lg  tw-px-2 hover:tw-bg-midnight hover:tw-text-white`}
                  onClick={() => handleRoleClick(14)}
                >
                 {t("Directors")}
                </button>
                <button
                  className={`${
                    roleFilter === 6
                      ? "tw-bg-midnight tw-text-white"
                      : "tw-bg-white tw-text-midnight"
                  } tw-rounded-lg  tw-px-2 hover:tw-bg-midnight hover:tw-text-white`}
                  onClick={() => handleRoleClick(6)}
                >
                  {t("Actors")}
                </button>
                <button
                  className={`${
                    roleFilter === 7
                      ? "tw-bg-midnight tw-text-white"
                      : "tw-bg-white tw-text-midnight"
                  } tw-rounded-lg  tw-px-2 hover:tw-bg-midnight hover:tw-text-white`}
                  onClick={() => handleRoleClick(7)}
                >
                  {t("Editors")}
                </button>
                <button
                  className={`${
                    roleFilter === 8
                      ? "tw-bg-midnight tw-text-white"
                      : "tw-bg-white tw-text-midnight"
                  } tw-rounded-lg  tw-px-2 hover:tw-bg-midnight hover:tw-text-white`}
                  onClick={() => handleRoleClick(8)}
                >
                  {t("Writers")}
                </button>
                <button
                  className={`${
                    roleFilter === 9
                      ? "tw-bg-midnight tw-text-white"
                      : "tw-bg-white tw-text-midnight"
                  } tw-rounded-lg  tw-px-2 hover:tw-bg-midnight hover:tw-text-white`}
                  onClick={() => handleRoleClick(9)}
                >
                  {t("Cinematographers")}
                </button>
                <button
                  className={`${
                    roleFilter === 10
                      ? "tw-bg-midnight tw-text-white"
                      : "tw-bg-white tw-text-midnight"
                  } tw-rounded-lg  tw-px-2 hover:tw-bg-midnight hover:tw-text-white`}
                  onClick={() => handleRoleClick(10)}
                >
                  {t("Producers")}
                </button>
                <button
                  className={`${
                    roleFilter === 11
                      ? "tw-bg-midnight tw-text-white"
                      : "tw-bg-white tw-text-midnight"
                  } tw-rounded-lg  tw-px-2 hover:tw-bg-midnight hover:tw-text-white`}
                  onClick={() => handleRoleClick(11)}
                >
                  {t("Sounds")}
                </button>
                <button
                  className={`${
                    roleFilter === 12
                      ? "tw-bg-midnight tw-text-white"
                      : "tw-bg-white tw-text-midnight"
                  } tw-rounded-lg  tw-px-2 hover:tw-bg-midnight hover:tw-text-white`}
                  onClick={() => handleRoleClick(12)}
                >
                  {t("Viewers")}
                </button>
              </div>
            </div>
            <div className="tw-flex tw-items-center">
              <p className="tw-mr-32">Total</p>
              <div className="tw-flex tw-h-[30px] tw-w-[30px] tw-items-center tw-justify-center tw-rounded-lg tw-bg-midnight tw-text-center tw-text-white">
                {sum}
              </div>
            </div>
          </div>
        ) : null}
        {selectedTab === "EPKs" ? (
          <div className="tw-md:flex-col tw-md:gap-5  tw-mb-2 tw-flex tw-w-full tw-flex-row tw-items-center tw-justify-between tw-pr-10">
            <div>
              <div className="tw-mb-2 tw-ml-6 tw-flex tw-h-4 tw-justify-between tw-rounded-xl tw-bg-white tw-text-xs tw-shadow-[3px_5px_10px_1px_rgba(30,0,57,0.8)] ">
                <button
                  className={`${
                    productionFilter === 0
                      ? "tw-bg-midnight tw-text-white"
                      : "tw-bg-white tw-text-midnight"
                  } tw-rounded-lg  tw-px-2 hover:tw-bg-midnight hover:tw-text-white`}
                  onClick={() => handleBtnClick(0)}
                >
                  {t("Pre-Production")}
                </button>
                <button
                  className={`${
                    productionFilter === 1
                      ? "tw-bg-midnight tw-text-white"
                      : "tw-bg-white tw-text-midnight"
                  } tw-rounded-lg  tw-px-2 hover:tw-bg-midnight hover:tw-text-white`}
                  onClick={() => handleBtnClick(1)}
                >
                  {t("Production")}
                </button>
                <button
                  className={`${
                    productionFilter === 2
                      ? "tw-bg-midnight tw-text-white"
                      : "tw-bg-white tw-text-midnight"
                  } tw-rounded-lg  tw-px-2 hover:tw-bg-midnight hover:tw-text-white`}
                  onClick={() => handleBtnClick(2)}
                >
                  {t("Post-Production")}
                </button>
                <button
                  className={`${
                    productionFilter === 3
                      ? "tw-bg-midnight tw-text-white"
                      : "tw-bg-white tw-text-midnight"
                  } tw-rounded-lg  tw-px-2 hover:tw-bg-midnight hover:tw-text-white`}
                  onClick={() => handleBtnClick(3)}
                >
                  {t("All EPKs")}
                </button>
              </div>
            </div>
            <div className="tw-flex tw-items-center">
              <p className="tw-mr-32">Total</p>
              <div className="tw-flex tw-h-[30px] tw-w-[30px] tw-items-center tw-justify-center tw-rounded-lg tw-bg-midnight tw-text-center tw-text-white">
                {dataInfo === undefined ? 0 : dataInfo.length}
              </div>
            </div>
          </div>
        ) : null}
      </header>
    </>
  );
}
