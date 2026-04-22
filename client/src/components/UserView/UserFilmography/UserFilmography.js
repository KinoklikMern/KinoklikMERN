/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";

export default function UserBio({ data, isEditMode, onChange }) {
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const [tempBio, setTempBio] = useState(data?.summary || "");

  useEffect(() => {
    setTempBio(data?.summary || "");
  }, [data?.summary]);

  const handleSave = () => {
    if (tempBio.trim().length === 0) {
      alert("Bio cannot be empty.");
      return;
    }
    onChange("summary", tempBio);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempBio(data?.summary || "");
    setIsEditing(false);
  };

  return (
    <div className="tw-w-full tw-flex tw-flex-col tw-items-center tw-mt-12">
      <div className="tw-flex tw-items-center tw-gap-4 tw-mb-6">
        <h2 className="tw-text-white tw-text-[2rem] tw-font-bold tw-tracking-tight tw-m-0">
          {t("Summary")}
        </h2>
        {isEditMode && !isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="tw-bg-[#FF43A7] tw-w-8 tw-h-8 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-border-none tw-cursor-pointer hover:tw-scale-110 tw-transition-transform"
          >
            <FontAwesomeIcon icon={faPenToSquare} className="tw-text-[#570033] tw-text-sm" />
          </button>
        )}
      </div>

      <div className="tw-w-full tw-max-w-4xl tw-bg-white tw-rounded-2xl tw-shadow-xl tw-p-8 md:tw-p-12 tw-relative">
        {isEditing ? (
          <div className="tw-flex tw-flex-col tw-gap-4">
            <textarea
              value={tempBio}
              onChange={(e) => setTempBio(e.target.value)}
              className="tw-w-full tw-min-h-[150px] tw-p-4 tw-rounded-xl tw-border-2 tw-border-[#FF43A7] tw-text-[#1E0039] tw-text-lg tw-font-medium tw-outline-none tw-resize-none"
              placeholder={t("Write your professional summary here...")}
              maxLength={500} 
            />
            
            <div className="tw-flex tw-justify-between tw-items-center">
              <span className="tw-text-xs tw-font-bold tw-text-[#AA8894] tw-uppercase">
                {tempBio.length} / 500 {t("characters")}
              </span>
              <div className="tw-flex tw-gap-3">
                <button
                  onClick={handleCancel}
                  className="tw-px-4 tw-py-2 tw-rounded-lg tw-bg-gray-200 tw-text-gray-700 tw-font-bold tw-border-none tw-cursor-pointer hover:tw-bg-gray-300"
                >
                  <FontAwesomeIcon icon={faXmark} className="tw-mr-2" />
                  {t("Cancel")}
                </button>
                <button
                  onClick={handleSave}
                  className="tw-px-6 tw-py-2 tw-rounded-lg tw-bg-[#FF43A7] tw-text-[#570033] tw-font-bold tw-border-none tw-cursor-pointer hover:tw-bg-[#ff5cac]"
                >
                  <FontAwesomeIcon icon={faCheck} className="tw-mr-2" />
                  {t("Save")}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <p className="tw-text-center tw-text-xl tw-leading-relaxed tw-font-medium tw-text-[#1E0039] tw-m-0">
            {data?.summary || t("No summary provided yet.")}
          </p>
        )}
      </div>
    </div>
  );
}