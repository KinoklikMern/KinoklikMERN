import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateLeft } from "@fortawesome/free-solid-svg-icons";

export default function ArchivedEpkCard({ EpkInfo, onRestore }) {
  const { t } = useTranslation();
  const [restoring, setRestoring] = useState(false);

  const handleRestore = () => {
    setRestoring(true);
    const url = `${process.env.REACT_APP_BACKEND_URL}/fepks/restore/${EpkInfo._id}`;

    axios
      .put(url)
      .then(() => {
        toast.success(t("EPK successfully restored."));
        onRestore(EpkInfo._id);
      })
      .catch((err) => {
        console.error("Error restoring EPK:", err);
        toast.error(t("Failed to restore EPK."));
      })
      .finally(() => {
        setRestoring(false);
      });
  };

  return (
    <div className="tw-relative tw-flex tw-flex-col tw-rounded-lg tw-border tw-border-dashed tw-border-gray-300 tw-bg-gray-50 tw-p-4 tw-opacity-70 tw-transition-opacity hover:tw-opacity-100">
      {/* Deleted badge */}
      <span className="tw-absolute tw-right-2 tw-top-2 tw-rounded tw-bg-red-100 tw-px-2 tw-py-0.5 tw-text-xs tw-font-semibold tw-text-red-500">
        {t("Deleted")}
      </span>

      {/* EPK thumbnail / placeholder */}
      <div className="tw-mb-3 tw-h-24 tw-w-full tw-overflow-hidden tw-rounded tw-bg-gray-200">
        {EpkInfo.coverImage ? (
          <img
            src={EpkInfo.coverImage}
            alt={EpkInfo.title}
            className="tw-h-full tw-w-full tw-object-cover tw-grayscale"
          />
        ) : (
          <div className="tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center tw-text-gray-400 tw-text-xs">
            {t("No Image")}
          </div>
        )}
      </div>

      {/* Title */}
      <p className="tw-mb-1 tw-truncate tw-text-sm tw-font-semibold tw-text-gray-600">
        {EpkInfo.title || t("Untitled EPK")}
      </p>

      {/* Restore button */}
      <button
        onClick={handleRestore}
        disabled={restoring}
        className={`tw-mt-auto tw-flex tw-w-full tw-items-center tw-justify-center tw-gap-2 tw-rounded tw-bg-[#1E0039] tw-px-3 tw-py-2 tw-text-xs tw-font-semibold tw-text-white tw-transition-opacity hover:tw-opacity-80 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-[#1E0039] focus:tw-ring-offset-2 ${
          restoring ? "tw-cursor-not-allowed tw-opacity-50" : ""
        }`}
      >
        <FontAwesomeIcon icon={faRotateLeft} />
        {restoring ? t("Restoring...") : t("Restore")}
      </button>
    </div>
  );
}