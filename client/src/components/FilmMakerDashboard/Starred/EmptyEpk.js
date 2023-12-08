import React from "react";
//import NewEpkBtn from "./NewEpkBtn";
import { useTranslation } from "react-i18next";

export default function EmptyEpk(props) {
  const { t } = useTranslation();
  const { flag = 0 } = props; //For actor, flag = 1, //For epk, flag = 2 , //For original, flag = 0

  return (
    <div>
      <div className="tw-my-16 tw-mb-36 tw-flex tw-justify-center">
        {/* <NewEpkBtn /> */}
      </div>
      <div className="tw-flex tw-justify-center">
        <div className="tw-text-2xl tw-font-light tw-text-[#1E0039]">
          <span className="tw-block">
            {flag === 0
              ? t("You don't have any EPK starred.")
              : flag === 1
              ? t("You don't have any actor selected.")
              : t("You don't have any EPK selected.")}
          </span>
          <span className="tw-block">
            {/* Start promoting your film right away! */}
          </span>
        </div>
      </div>
    </div>
  );
}
