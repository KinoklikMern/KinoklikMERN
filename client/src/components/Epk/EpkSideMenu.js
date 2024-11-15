import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faSearch } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useSnackbar } from "notistack";
import LoadingSpin from "../FilmMakerDashboard/LoadingSpin";
import { useTranslation } from "react-i18next";

export const EPKSideMenu = ({ epk, filmmakerId }) => {
  const { t } = useTranslation();
  const [showTransferFields, setShowTransferFields] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedFilmmaker, setSelectedFilmmaker] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [isTransferred, setIsTransferred] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const handleMenuClick = () => setShowTransferFields(!showTransferFields);
  const toggleSidebar = () => setIsMenuVisible(!isMenuVisible);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(`Transfer to: ${searchTerm}`);
  };

  return (
      <div className="tw-fixed tw-bottom-4 tw-left-4 tw-z-50">
        <FontAwesomeIcon
            icon={faCog}
            className="tw-h-8 tw-w-8 tw-cursor-pointer tw-text-gray-600 hover:tw-text-purple-600"
            onClick={toggleSidebar}
        />

        {isMenuVisible && (
            <div className="tw-fixed tw-bottom-0 tw-left-0 tw-z-40 tw-w-60 tw-h-screen tw-bg-[#1C0039] tw-p-4 tw-shadow-lg tw-text-white">
              <div className="tw-flex tw-justify-between tw-items-center tw-mb-4">
                <h1 className="tw-text-xl">{t("EPK Settings")}</h1>
                <FontAwesomeIcon
                    icon={faCog}
                    className="tw-h-6 tw-w-6 tw-cursor-pointer"
                    onClick={toggleSidebar}
                />
              </div>

              <button
                  onClick={handleMenuClick}
                  className="tw-w-full tw-rounded tw-bg-white tw-px-2 tw-py-1 tw-text-[#1C0039]"
              >
                {t("Transfer Ownership")}
              </button>

              {showTransferFields && (
                  <form onSubmit={handleSearch} className="tw-mt-4">
                    <div className="tw-relative tw-mb-2">
                      <input
                          type="text"
                          placeholder="Transfer to..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="tw-w-full tw-rounded tw-bg-white tw-py-1 tw-pl-2 tw-pr-10 tw-text-gray-700"
                      />
                      <FontAwesomeIcon
                          icon={faSearch}
                          className="tw-absolute tw-right-3 tw-top-1/2 tw-transform tw--translate-y-1/2 tw-text-gray-400"
                      />
                    </div>

                    {loading && <LoadingSpin />}

                    {/* Render selected filmmaker and search results */}
                  </form>
              )}
            </div>
        )}
      </div>
  );
};

export default EPKSideMenu;
