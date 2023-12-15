import React from "react";
import { useTranslation } from 'react-i18next';

export default function NotificationTextInfo() {
  const { t } = useTranslation();
    return (
        <div className="tw-flex tw-flex-col tw-justify-start tw-items-start ">
          <p className="tw-text-sm tw-font-bold tw-text-[#1E0039] tw-text-center">
          {t("Find all the users film industry professionals who favourite and follow your film, and those who requests access to your protected EPKs.")}
          </p>
        </div>
      );
    }