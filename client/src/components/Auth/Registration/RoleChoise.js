import React from "react";
import SignupCss from "./signup.module.css";
import filmmakerIcon from "../../../images/icons/filmmakerIcon.svg";
import actorIcon from "../../../images/icons/actorIcon.svg";
import editorIcon from "../../../images/icons/editorIcon.svg";
import { useTranslation } from "react-i18next";
// import i18n from 'i18next';

export const options = [
  {
    label: "An amazing and talented visionary filmmaker",
    value: "Filmmaker",
    image: filmmakerIcon,
  },
  {
    label: "A talented and passionate actor (and future star)",
    value: "Actor",
    image: actorIcon,
  },
  {
    label: "Industry Professional Description",
    value: "Industry Professional",
    image: editorIcon,
  },
];

function RoleChoise({ role, setRole, onNext }) {
  const { t } = useTranslation();

  const handleRoleSelect = (option) => {
    setRole({
      label: t(option.label),
      value: option.value,
      image: option.image,
    });
    onNext();
  };
  console.log(role);

  // Helper function to get the role name based on the option value
  const getRoleName = (value) => {
    switch (value) {
      case "Filmmaker":
        return t("Filmmaker");
      case "Actor":
        return t("Actor");
      case "Sales Agent":
        return t("Sales Agent");
      case "Film Festival":
        return t("Film Festival");
      case "Viewer":
        return t("Viewer");
      case "Investor":
        return t("Investor");
      case "Producer":
        return t("Producer");
      case "Editor":
        return t("Editor");
      case "Writer":
        return t("Writer");
      case "Sound":
        return t("Sound");
      case "Cinematographer":
        return t("Cinematographer");
      case "Distributor":
        return t("Distributor");
      case "Industry Professional":
        return t("Industry Professional");
      default:
        return "";
    }
  };

  return (
    <>
      <div className="tw-mx-auto tw-max-w-screen-lg tw-px-4 md:tw-px-6 lg:tw-px-2">
        <div className="tw-my-20 tw-grid tw-grid-cols-2 tw-gap-2 md:tw-grid-cols-4 lg:tw-grid-cols-3">
          {options.map((option) => (
            <div
              key={option.value}
              className="tw-mb-4 tw-flex tw-flex-col tw-items-center"
            >
              {" "}
              {/* Centered flex column */}
              <div
                className={`${SignupCss.roleImgMain} ${
                  role.value === option.value ? SignupCss.selected : ""
                } tw-mb-2`}
              >
                {" "}
                {/* Add margin bottom */}
                <button
                  value={option.value}
                  onClick={() => handleRoleSelect(option)}
                  className="tw-flex tw-flex-col tw-items-center tw-justify-center" // Align items center
                >
                  <img
                    src={option.image}
                    alt={`${option.value} Icon`}
                    className="tw-mb-2"
                  />{" "}
                  {/* Add margin bottom */}
                  <div className={SignupCss.mainText}>{t(option.label)}</div>
                </button>
              </div>
              <div className="tw-mt-2 tw-text-center tw-font-bold tw-text-violet-800">
                {getRoleName(option.value)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default RoleChoise;
