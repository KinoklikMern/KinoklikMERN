import React from "react";
import { useTranslation } from 'react-i18next';

export default function RequestButton({ status, handler }) {
  const { t } = useTranslation();

  let buttonTxt = "Request Access";
  let isDisabled = false;

  switch (status) {
    case "pending":
      buttonTxt = "Awaiting approval";
      isDisabled = true;
      break;
    case "refused":
      buttonTxt = "Request refused";
      isDisabled = true;
      break;
    case null:
    default:
      buttonTxt = "Request Access";
      isDisabled = false;
      break;
  }

  const baseClasses = "tw-px-6 tw-py-2 tw-rounded-md tw-font-medium tw-transition-all tw-duration-200";
  const lightVariant = "tw-bg-gray-100 tw-text-gray-800 hover:tw-bg-gray-200 active:tw-bg-gray-300";
  const disabledClasses = "tw-opacity-50 tw-cursor-not-allowed tw-bg-gray-200 tw-text-gray-500";
  const shadowClasses = "tw-shadow-[3px_3px_3px_#712CB0]";

  return (
    <div className="tw-flex tw-justify-center">
      <button
        type="button"
        disabled={isDisabled}
        onClick={() => handler("request")}
        className={`${baseClasses} ${shadowClasses} ${isDisabled ? disabledClasses : lightVariant}`}
      >
        {t(buttonTxt)}
      </button>
    </div>
  );
}