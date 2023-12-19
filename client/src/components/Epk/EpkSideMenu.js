import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useSnackbar } from "notistack";
import LoadingSpin from "../FilmMakerDashboard/LoadingSpin";
import { useTranslation } from "react-i18next";

export const EPKSideMenu = ({ epk, filmmakerId }) => {
  const { t } = useTranslation();
  // const navigate = useNavigate();
  // const [isExpanded, setIsExpanded] = useState(false);
  const [showTransferFields, setShowTransferFields] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedFilmmaker, setSelectedFilmmaker] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [isTransferred, setIsTransferred] = useState(false); // track transfer status
  const [isMenuVisible, setIsMenuVisible] = useState(false); // State to manage the visibility of the side menu

  const selectFilmmaker = (filmmaker) => {
    setSelectedFilmmaker(filmmaker);
    setSearchTerm(""); // Clear the search term when a filmmaker is selected
  };

  const handleMenuClick = () => {
    setShowTransferFields(!showTransferFields);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(`Transfer to: ${searchTerm}`);
  };

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const handleTransferConfirmation = () => {
    console.log("Transfer to:", selectedFilmmaker);

    if (!selectedFilmmaker || !epk._id) {
      console.error("No filmmaker selected or EPK ID missing.");
      return;
    }

    if (isTransferred) {
      enqueueSnackbar(
        "EPK has already been transferred and cannot be transferred again.",
        { variant: "error" }
      );
      return;
    }

    const url = `${process.env.REACT_APP_BACKEND_URL}/fepks/${epk._id}/transfer`;
    const data = { newFilmmakerId: selectedFilmmaker._id };

    setLoading(true);
    axios
      .put(url, data)
      .then((response) => {
        console.log("Transfer successful:", response.data);
        enqueueSnackbar(
          `EPK successfully transferred to ${selectedFilmmaker.firstName} ${selectedFilmmaker.lastName}!`,
          { variant: "success" }
        );
        // setIsTransferred(true); // Set the transferred status to true after a successful transfer
        localStorage.setItem(`transferred_${epk._id}`, filmmakerId); // Store the transferred state in localStorage
        setIsTransferred(true);
      })
      .catch((error) => {
        console.error("Error transferring EPK:", error);
        enqueueSnackbar("Failed to transfer EPK.", { variant: "error" });
      })
      .finally(() => {
        setLoading(false);
        setIsModalVisible(false);
      });
  };

  useEffect(() => {
    if (searchTerm.length > 2) {
      // Delay the search to avoid too many requests
      const timeoutId = setTimeout(() => {
        setLoading(true);
        axios
          .get(
            `${
              process.env.REACT_APP_BACKEND_URL
            }/filmmaker/searchFilmmakers?name=${encodeURIComponent(searchTerm)}`
          )
          .then((response) => {
            setSearchResults(response.data);
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching filmmakers:", error);
            setLoading(false);
          });
      }, 500);

      return () => clearTimeout(timeoutId);
    } else {
      setSearchResults([]); // Clear results if search term is cleared or too short
    }
  }, [searchTerm]);

  useEffect(() => {
    // Check the localStorage to see if the EPK has been transferred already
    const currentUserId = filmmakerId;
    const transferredFrom = localStorage.getItem(`transferred_${epk._id}`);
    setIsTransferred(transferredFrom === currentUserId);
  }, [epk._id, filmmakerId]);

  // Function to render the selected filmmaker
  const renderSelectedFilmmaker = () =>
    selectedFilmmaker && (
      <>
        <div className="tw-mb-2 tw-flex tw-items-center tw-justify-between tw-rounded tw-bg-white tw-p-2 tw-shadow-lg">
          <img
            src={
              selectedFilmmaker.picture.startsWith("http")
                ? selectedFilmmaker.picture
                : `${process.env.REACT_APP_AWS_URL}/${selectedFilmmaker.picture}`
            }
            alt={`${selectedFilmmaker.firstName} ${selectedFilmmaker.lastName}`}
            className="tw-mr-3 tw-h-10 tw-w-10 tw-rounded-full tw-border tw-border-gray-300"
          />
          <div className="tw-flex-grow">
            <div className="tw-font-semibold">{`${selectedFilmmaker.firstName} ${selectedFilmmaker.lastName}`}</div>
            <div className="tw-text-sm tw-text-gray-500">
              {selectedFilmmaker.role}
            </div>
          </div>
        </div>
        <div className="tw-mt-2 tw-flex tw-justify-end">
          <button
            onClick={() => setIsModalVisible(true)}
            disabled={isTransferred} // Disable the button if the EPK has already been transferred
            className={`tw-w-full tw-rounded tw-bg-purple-500 tw-px-3 tw-py-1 tw-text-white tw-shadow-lg ${
              isTransferred ? "tw-cursor-not-allowed tw-opacity-50" : ""
            }`}
          >
            {t("Transfer Now")}
          </button>
        </div>
      </>
    );

  // Function to render search results
  const renderSearchResults = () => (
    <div className="tw-max-h-[500px] tw-overflow-auto">
      {searchResults.map((filmmaker, index) => (
        <div
          key={index}
          className="tw-mb-2 tw-flex tw-cursor-pointer tw-items-center tw-justify-between tw-rounded tw-bg-white tw-p-2 tw-shadow-lg"
          onClick={() => selectFilmmaker(filmmaker)}
        >
          <img
            src={
              filmmaker.picture.startsWith("http")
                ? filmmaker.picture
                : `${process.env.REACT_APP_AWS_URL}/${filmmaker.picture}`
            }
            alt={`${filmmaker.firstName} ${filmmaker.lastName}`}
            className="tw-mr-3 tw-h-10 tw-w-10 tw-rounded-full tw-border tw-border-gray-300"
          />
          <div className="tw-flex-grow">
            <div className="tw-font-semibold">{`${filmmaker.firstName} ${filmmaker.lastName}`}</div>
            <div className="tw-text-sm tw-text-gray-500">{filmmaker.role}</div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    // <div
    //   className={`tw-fixed tw-inset-y-0 tw-left-0 ${
    //     isMenuVisible ? "tw-z-50" : "tw-z-30"
    //   } tw-flex tw-h-screen ${
    //     isMenuVisible ? "tw-w-60 tw-bg-[#1C0039] tw-duration-300" : "tw-w-14"
    //   }`}
    // >
    <div
      className={`${
        isMenuVisible
          ? "tw-fixed tw-inset-y-0 tw-left-0 tw-z-50"
          : "tw-static tw-z-20"
      } tw-transition-width tw-duration-300 ${
        isMenuVisible ? "tw-w-60 tw-bg-[#1C0039]" : "tw-w-14"
      } tw-h-screen`}
    >
      {/* Hamburger and vertical lines container */}
      <div className="tw-relative tw-left-2 tw-flex tw-h-full tw-flex-col tw-items-center tw-justify-center">
        {!isMenuVisible && (
          <>
            <div className="tw-absolute tw-left-1/2 tw--mt-80 tw-h-60 tw-w-0.5 tw--translate-x-1/2 tw-bg-purple-600"></div>
            <div className="tw-absolute tw-left-1/2 tw-mt-80 tw-h-60 tw-w-0.5 tw--translate-x-1/2 tw-bg-purple-600"></div>

            {/* Hamburger icon */}
            <FontAwesomeIcon
              icon={faBars}
              className="tw-h-6 tw-w-6 tw-cursor-pointer tw-text-purple-600"
              onClick={toggleSidebar}
            />
          </>
        )}
        {/* Hamburger icon */}
        {/* <FontAwesomeIcon
          icon={faBars}
          className={`tw-h-6 tw-w-6 tw-cursor-pointer ${
            isMenuVisible ? "tw-text-[#1C0039]" : "tw-text-purple-600"
          }`}
          onClick={toggleSidebar}
        /> */}
      </div>

      {/* Content that appears when the sidebar is expanded */}
      {isMenuVisible && (
        <div className="tw-absolute tw-left-0 tw-top-0 tw-flex tw-w-60 tw-flex-col tw-p-4">
          {/* Separate div for EPK Settings title with a specific height */}
          <div className="tw-mb-20 tw-flex tw-h-16 tw-items-center tw-justify-center">
            <h1 className="tw-text-cente tw-text-xl tw-text-white">
              {t("EPK Settings")}
            </h1>
          </div>
          {/* Flex container for buttons */}
          <div className="tw-left-0 tw-flex tw-items-center tw-pr-4">
            <FontAwesomeIcon
              icon={faBars}
              className="tw-h-6 tw-w-6 tw-cursor-pointer tw-pl-0 tw-text-white"
              onClick={toggleSidebar}
            />
            <button
              onClick={handleMenuClick}
              className="tw-ml-4 tw-rounded tw-bg-white tw-px-2 tw-py-1 tw-text-[#1C0039]"
            >
              {t("Transfer Ownership")}
            </button>
          </div>
          {showTransferFields && (
            <form onSubmit={handleSearch} className="tw-mt-12 tw-w-full">
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
                  className="tw-pointer-events-none tw-absolute tw-inset-y-0 tw-right-3 tw-my-auto tw-h-4 tw-w-4 tw-text-gray-400"
                />
              </div>

              {loading && <LoadingSpin />}

              {renderSelectedFilmmaker()}
              {!selectedFilmmaker && renderSearchResults()}
            </form>
          )}
        </div>
      )}

      {/* Overlay for the side menu */}
      {isModalVisible && (
        // <div className="tw-absolute tw-inset-0 tw-bg-black tw-opacity-50"></div>
        <div className="tw-absolute tw-inset-0 tw-z-40 tw-bg-black tw-opacity-50"></div>
      )}

      {/* Modal Content */}
      {isModalVisible && (
        // <div className="tw-absolute tw-inset-0 tw-flex tw-items-center tw-justify-center tw-px-4">
        <div className="tw-absolute tw-left-0 tw-top-0 tw-z-50 tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center tw-px-4">
          <div className="tw-mx-auto tw-w-full tw-max-w-xs tw-rounded-lg tw-bg-white tw-p-6 tw-shadow-xl">
            <div className="tw-flex tw-flex-col">
              <p className="tw-mb-4 tw-text-sm tw-text-gray-500">
                {t(
                  "Please take note: If you transfer ownership of this EPK to"
                )}
                {t(
                  " another Filmmaker or Producer account, it cannot be undone. The"
                )}
                {t(
                  " new EPK Owner will have ownership of this EPK and it cannot be"
                )}
                {t(" reversed from your Dashboard.")}
              </p>
              <button
                disabled={isTransferred} // Disable the button if the EPK has already been transferred
                className={`tw-w-full tw-rounded tw-bg-purple-600 tw-px-4 tw-py-2 tw-text-sm tw-font-bold tw-text-white tw-shadow-lg hover:tw-bg-purple-700 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-purple-500 focus:tw-ring-offset-2 ${
                  isTransferred ? "tw-cursor-not-allowed tw-opacity-50" : ""
                }`}
                onClick={handleTransferConfirmation}
              >
                {t("Transfer Now")}
              </button>
              <button
                className="tw-mt-3 tw-w-full tw-rounded tw-bg-gray-300 tw-px-4 tw-py-2 tw-text-sm tw-font-bold tw-text-gray-700 tw-shadow-lg hover:tw-bg-gray-400 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-gray-500 focus:tw-ring-offset-2"
                onClick={() => setIsModalVisible(false)}
              >
                {t("Cancel")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EPKSideMenu;
