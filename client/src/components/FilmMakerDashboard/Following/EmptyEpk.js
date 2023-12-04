import React from "react";
//import NewEpkBtn from "./NewEpkBtn";
import { useTranslation } from 'react-i18next';

export default function EmptyEpk() {
  const { t } = useTranslation();

  return (
    <div>
      <div className="tw-my-16 tw-mb-36 tw-flex tw-justify-center">
        {/* <NewEpkBtn /> */}
      </div>
      <div className="tw-flex tw-justify-center">
        <div className="tw-text-2xl tw-font-light tw-text-[#1E0039]">
          <span className="tw-block">{t("You don't have any EPK following.")}</span>
          <span className="tw-block">
            {/* Start promoting your film right away! */}
          </span>
        </div>
      </div>
    </div>
  );
}
