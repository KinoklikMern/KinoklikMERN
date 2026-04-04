import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCog, faSearch, faTrash} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingSpin from "../Dashboard/LoadingSpin";
import {useTranslation} from "react-i18next";

export const EPKSideMenu = ({epk, filmmakerId}) => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const [showTransferFields, setShowTransferFields] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedFilmmaker, setSelectedFilmmaker] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isTransferred, setIsTransferred] = useState(false);
    const [isMenuVisible, setIsMenuVisible] = useState(false);

    // Delete modal state
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [deleteConfirmText, setDeleteConfirmText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    const selectFilmmaker = (filmmaker) => {
        setSelectedFilmmaker(filmmaker);
        setSearchTerm("");
    };

    const handleMenuClick = () => {
        setShowTransferFields(!showTransferFields);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        console.log(`Transfer to: ${searchTerm}`);
    };

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
            toast.error("EPK has already been transferred and cannot be transferred again.");
            return;
        }

        const url = `${process.env.REACT_APP_BACKEND_URL}/fepks/${epk._id}/transfer`;
        const data = {newFilmmakerId: selectedFilmmaker._id};

        setLoading(true);
        axios
            .put(url, data)
            .then((response) => {
                console.log("Transfer successful:", response.data);
                toast.success(`EPK successfully transferred to ${selectedFilmmaker.firstName} ${selectedFilmmaker.lastName}!`);
                localStorage.setItem(`transferred_${epk._id}`, filmmakerId);
                setIsTransferred(true);
            })
            .catch((error) => {
                console.error("Error transferring EPK:", error);
                toast.error("Failed to transfer EPK.");
            })
            .finally(() => {
                setLoading(false);
                setIsModalVisible(false);
            });
    };

    const handleDeleteEPK = () => {
        if (deleteConfirmText !== "Delete") return;

        const url = `${process.env.REACT_APP_BACKEND_URL}/fepks/delete/${epk._id}`;

        setIsDeleting(true);
        axios
            .delete(url)
            .then((response) => {
                console.log("EPK deleted:", response.data);
                toast.success("EPK successfully deleted.");
                setIsDeleteModalVisible(false);
                navigate("/dashboard/epks");
            })
            .catch((error) => {
                console.error("Error deleting EPK:", error);
                toast.error("Failed to delete EPK.");
            })
            .finally(() => {
                setIsDeleting(false);
                setDeleteConfirmText("");
            });
    };

    useEffect(() => {
        if (searchTerm.length > 2) {
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
            setSearchResults([]);
        }
    }, [searchTerm]);

    useEffect(() => {
        const currentUserId = filmmakerId;
        const transferredFrom = localStorage.getItem(`transferred_${epk._id}`);
        setIsTransferred(transferredFrom === currentUserId);
    }, [epk._id, filmmakerId]);

    const renderSelectedFilmmaker = () =>
        selectedFilmmaker && (
            <>
                <div
                    className="tw-mb-2 tw-flex tw-items-center tw-justify-between tw-rounded tw-bg-white tw-p-2 tw-shadow-lg">
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
                        <div
                            className="tw-font-semibold">{`${selectedFilmmaker.firstName} ${selectedFilmmaker.lastName}`}</div>
                        <div className="tw-text-sm tw-text-gray-500">
                            {selectedFilmmaker.role}
                        </div>
                    </div>
                </div>
                <div className="tw-mt-2 tw-flex tw-justify-end">
                    <button
                        onClick={() => setIsModalVisible(true)}
                        disabled={isTransferred}
                        className={`tw-w-full tw-rounded tw-bg-purple-500 tw-px-3 tw-py-1 tw-text-white tw-shadow-lg ${
                            isTransferred ? "tw-cursor-not-allowed tw-opacity-50" : ""
                        }`}
                    >
                        {t("Transfer Now")}
                    </button>
                </div>
            </>
        );

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
        <div className="tw-fixed tw-bottom-4 tw-left-4 tw-z-50">
            <FontAwesomeIcon
                icon={faCog}
                className="tw-h-8 tw-w-8 tw-cursor-pointer tw-text-gray-600 hover:tw-text-purple-600"
                onClick={toggleSidebar}
            />

            {isMenuVisible && (
                <div
                    className="tw-fixed tw-bottom-0 tw-left-0 tw-z-40 tw-w-60 tw-h-screen tw-bg-[#1C0039] tw-p-4 tw-shadow-lg tw-text-white">
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

                            {loading && <LoadingSpin/>}

                            {renderSelectedFilmmaker()}
                            {!selectedFilmmaker && renderSearchResults()}
                        </form>
                    )}

                    {/* Delete EPK Button — pinned to bottom */}
                    <div className="tw-absolute tw-bottom-6 tw-left-4 tw-right-4">
                        <button
                            onClick={() => {
                                setDeleteConfirmText("");
                                setIsDeleteModalVisible(true);
                            }}
                            className="tw-w-full tw-rounded tw-bg-red-600 tw-px-2 tw-py-1 tw-text-white hover:tw-bg-red-700 tw-flex tw-items-center tw-justify-center tw-gap-2"
                        >
                            <FontAwesomeIcon icon={faTrash} className="tw-h-4 tw-w-4"/>
                            {t("Delete EPK")}
                        </button>
                    </div>
                </div>
            )}

            {/* Transfer overlay */}
            {isModalVisible && (
                <div className="tw-absolute tw-inset-0 tw-z-40 tw-bg-black tw-opacity-50"></div>
            )}

            {/* Transfer Modal */}
            {isModalVisible && (
                <div
                    className="tw-absolute tw-left-0 tw-top-0 tw-z-50 tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center tw-px-4">
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
                                disabled={isTransferred}
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

            {/* Delete overlay */}
            {isDeleteModalVisible && (
                <div className="tw-fixed tw-inset-0 tw-z-40 tw-bg-black tw-opacity-50"></div>
            )}

            {/* Delete Confirmation Modal */}
            {isDeleteModalVisible && (
                <div className="tw-fixed tw-inset-0 tw-z-50 tw-flex tw-items-center tw-justify-center tw-px-4">
                    <div className="tw-mx-auto tw-w-full tw-max-w-xs tw-rounded-lg tw-bg-white tw-p-6 tw-shadow-xl">
                        <div className="tw-flex tw-flex-col">
                            <div className="tw-mb-3 tw-flex tw-items-center tw-gap-2">
                                <FontAwesomeIcon icon={faTrash} className="tw-h-5 tw-w-5 tw-text-red-600"/>
                                <h2 className="tw-text-lg tw-font-bold tw-text-gray-800">{t("Delete EPK")}</h2>
                            </div>
                            <p className="tw-mb-4 tw-text-sm tw-text-gray-500">
                                {t("This action is permanent and cannot be undone. Please type")}{" "}
                                <span className="tw-font-bold tw-text-red-600">Delete</span>{" "}
                                {t("to confirm.")}
                            </p>
                            <input
                                type="text"
                                placeholder='Type "Delete" to confirm'
                                value={deleteConfirmText}
                                onChange={(e) => setDeleteConfirmText(e.target.value)}
                                className="tw-mb-4 tw-w-full tw-rounded tw-border tw-border-gray-300 tw-px-3 tw-py-2 tw-text-sm tw-text-gray-700 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-red-400"
                            />
                            <button
                                disabled={deleteConfirmText !== "Delete" || isDeleting}
                                onClick={handleDeleteEPK}
                                className={`tw-w-full tw-rounded tw-bg-red-600 tw-px-4 tw-py-2 tw-text-sm tw-font-bold tw-text-white tw-shadow-lg hover:tw-bg-red-700 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-red-500 focus:tw-ring-offset-2 ${
                                    deleteConfirmText !== "Delete" || isDeleting
                                        ? "tw-cursor-not-allowed tw-opacity-50"
                                        : ""
                                }`}
                            >
                                {isDeleting ? t("Deleting...") : t("Delete EPK")}
                            </button>
                            <button
                                className="tw-mt-3 tw-w-full tw-rounded tw-bg-gray-300 tw-px-4 tw-py-2 tw-text-sm tw-font-bold tw-text-gray-700 tw-shadow-lg hover:tw-bg-gray-400 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-gray-500 focus:tw-ring-offset-2"
                                onClick={() => {
                                    setIsDeleteModalVisible(false);
                                    setDeleteConfirmText("");
                                }}
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