import React, { useRef, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from 'react-i18next';

export default function TopToolBar({ selectedTab, setFilteredData, dataInfo }) {
  const { t } = useTranslation();
  const [roleFilter, setRoleFilter] = useState(5);
  const [productionFilter, setProductionFilter] = useState(3);
  const [sum, setSum] = useState(0);
  const inputRef = useRef(null);

  const currentDate = () => {
    const options = { weekday: "short", month: "short", day: "numeric", year: "numeric" };
    return new Intl.DateTimeFormat("en-US", options).format(new Date());
  };

  const handleKeywordChanged = (e) => {
    if (selectedTab === "Users") {
      const filterRes = getFilteredUsers(roleFilter).filter(
        (user) =>
          user.firstName.toLowerCase().includes(e.target.value.toLowerCase()) ||
          user.lastName.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setSum(filterRes.length);
      setFilteredData(filterRes);
    } else {
      setFilteredData(
        getFilteredEPKs(productionFilter).filter((epk) =>
          epk.title.toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
    }
  };

  const handleRoleClick = (index) => {
    setRoleFilter(index);
    if (inputRef.current) inputRef.current.value = "";
    const filterRes = getFilteredUsers(index);
    setSum(filterRes.length);
    setFilteredData(filterRes);
  };

  const getFilteredUsers = (index) => {
    switch (index) {
      case 0:  return dataInfo.filter((u) => u.role === "Filmmaker" || u.role === "FILM_MAKER");
      case 1:  return dataInfo.filter((u) => u.role === "Distributor");
      case 2:  return dataInfo.filter((u) => u.role === "Film Festival");
      case 3:  return dataInfo.filter((u) => u.role === "Sales Agent" || u.role === "Sales_Agent");
      case 4:  return dataInfo.filter((u) => u.role === "Investor");
      case 5:  return dataInfo;
      case 6:  return dataInfo.filter((u) => u.role === "Actor");
      case 7:  return dataInfo.filter((u) => u.role === "Editor");
      case 8:  return dataInfo.filter((u) => u.role === "Writer");
      case 9:  return dataInfo.filter((u) => u.role === "Cinematographer");
      case 10: return dataInfo.filter((u) => u.role === "Producer");
      case 11: return dataInfo.filter((u) => u.role === "Sound");
      case 12: return dataInfo.filter((u) => u.role === "Viewer");
      case 13: return dataInfo.filter((u) => u.role === "Admin");
      case 14: return dataInfo.filter((u) => u.role === "Director");
      default: return dataInfo;
    }
  };

  const handleBtnClick = (index) => {
    setProductionFilter(index);
    setFilteredData(getFilteredEPKs(index));
  };

  const getFilteredEPKs = (index) => {
    switch (index) {
      case 0:  return dataInfo.filter((epk) => epk.status === "Preproduction");
      case 1:  return dataInfo.filter((epk) => epk.status === "Production");
      case 2:  return dataInfo.filter((epk) => epk.status === "Postproduction");
      default: return dataInfo;
    }
  };

  // eslint-disable-next-line
  useEffect(() => {
    if (dataInfo !== undefined && roleFilter === 5) {
      setSum(dataInfo.length);
    }
  }, [dataInfo, roleFilter]);

  const roleOptions = [
    { label: t("All Users"),       value: 5  },
    { label: t("Filmmakers"),      value: 0  },
    { label: t("Distributors"),    value: 1  },
    { label: t("Film Festivals"),  value: 2  },
    { label: t("Sales Agents"),    value: 3  },
    { label: t("Investors"),       value: 4  },
    { label: t("Admins"),          value: 13 },
    { label: t("Directors"),       value: 14 },
    { label: t("Actors"),          value: 6  },
    { label: t("Editors"),         value: 7  },
    { label: t("Writers"),         value: 8  },
    { label: t("Cinematographers"),value: 9  },
    { label: t("Producers"),       value: 10 },
    { label: t("Sound"),           value: 11 },
    { label: t("Viewers"),         value: 12 },
  ];

  const epkStatusOptions = [
    { label: t("All EPKs"),        value: 3 },
    { label: t("Pre-Production"),  value: 0 },
    { label: t("Production"),      value: 1 },
    { label: t("Post-Production"), value: 2 },
  ];

  const showFilters = selectedTab !== "Main Metrics" && selectedTab !== "Analytics";
  const total = selectedTab === "Users"
    ? sum
    : dataInfo === undefined ? 0 : dataInfo.length;

  return (
    <header className="tw-flex tw-items-start sm:tw-items-center tw-justify-between tw-w-full tw-px-4 tw-py-3 tw-mb-4 tw-bg-[#280D41] tw-rounded-xl tw-border tw-border-white/10">

      {/* Left: search + filter */}
      <div className="tw-flex tw-items-center tw-gap-2 tw-min-w-0 tw-flex-wrap">
        {showFilters && (
          <div className="tw-relative">
            <input
              type="text"
              placeholder={t("Search name...")}
              className="tw-h-9 tw-w-48 tw-rounded-lg tw-border tw-border-white/20 tw-bg-[#190033] tw-pl-3 tw-pr-8 tw-text-sm tw-text-white focus:tw-border-[#712CB0] tw-outline-none placeholder:tw-text-white/40"
              onChange={handleKeywordChanged}
              ref={inputRef}
            />
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="tw-pointer-events-none tw-absolute tw-right-3 tw-top-2.5 tw-text-xs tw-text-white/40"
            />
          </div>
        )}

        {selectedTab === "Users" && (
          <div className="tw-relative">
            <select
              value={roleFilter}
              onChange={(e) => handleRoleClick(Number(e.target.value))}
              className="tw-h-9 tw-max-w-[148px] tw-appearance-none tw-rounded-lg tw-border tw-border-white/20 tw-bg-[#190033] tw-pl-3 tw-pr-8 tw-text-sm tw-text-white focus:tw-border-[#712CB0] tw-outline-none tw-cursor-pointer"
            >
              {roleOptions.map(({ label, value }) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
            <FontAwesomeIcon
              icon={faChevronDown}
              className="tw-pointer-events-none tw-absolute tw-right-3 tw-top-2.5 tw-text-xs tw-text-white/60"
            />
          </div>
        )}

        {selectedTab === "EPKs" && (
          <div className="tw-flex tw-gap-2">
            {epkStatusOptions.map(({ label, value }) => (
              <button
                key={value}
                onClick={() => handleBtnClick(value)}
                className={`tw-px-3 tw-py-1.5 tw-rounded-lg tw-text-xs tw-font-medium tw-transition-all tw-border-none tw-cursor-pointer ${
                  productionFilter === value
                    ? "tw-bg-[#712CB0] tw-text-white"
                    : "tw-bg-white/10 tw-text-white/70 hover:tw-bg-white/20 hover:tw-text-white"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Right: total + date */}
      <div className="tw-flex tw-items-center tw-gap-4">
        {showFilters && (
          <div className="tw-flex tw-items-center tw-gap-2">
            <span className="tw-text-sm tw-text-white/50">{t("Total")}</span>
            <span className="tw-flex tw-h-7 tw-min-w-[28px] tw-items-center tw-justify-center tw-rounded-lg tw-bg-[#712CB0] tw-px-2 tw-text-xs tw-font-bold tw-text-white">
              {total}
            </span>
          </div>
        )}
        <p className="tw-hidden sm:tw-block tw-text-sm tw-text-white/50">{currentDate()}</p>
      </div>
    </header>
  );
}
