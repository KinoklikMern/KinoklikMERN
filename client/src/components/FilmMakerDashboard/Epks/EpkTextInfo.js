import React from "react";
import { useTranslation } from 'react-i18next';


export default function EpkTextInfo() {
  const { t } = useTranslation();
    return (
        <div className="tw-flex tw-flex-col tw-justify-start tw-items-start ">
          <p className="tw-text-sm tw-font-bold tw-text-[#1E0039] tw-text-center">
            {t("Find all your film EPKs that you’ve created here.")}
          </p>
        </div>
      );
    }