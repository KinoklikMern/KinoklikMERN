import React from "react";
import SignupCss from "./signup.module.css";
import filmmakerIcon from "../../../images/icons/filmmakerIcon.svg";
import actorIcon from "../../../images/icons/actorIcon.svg";
import producerIcon from "../../../images/icons/producerIcon.svg";
import viewerIcon from "../../../images/icons/viewerIcon.svg";
import writerIcon from "../../../images/icons/writerIcon.svg";
import soundIcon from "../../../images/icons/soundIcon.svg";
import cinematographerIcon from "../../../images/icons/cinematographerIcon.svg";
import salesAgentIcon from "../../../images/icons/salesAgentIcon.svg";
import festivalIcon from "../../../images/icons/festivalIcon.svg";
import investorIcon from "../../../images/icons/investorIcon.svg";
import editorIcon from "../../../images/icons/editorIcon.svg";
import distributorIcon from "../../../images/icons/distributorIcon.svg";
import {useTranslation} from 'react-i18next';
//import i18n from 'i18next'; 


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
    label: "Sales_Agent",
    value: "Sales Agent",
    image: salesAgentIcon,
  },
  {
    label: "Film_Festival",
    value: "Film Festival",
    image: festivalIcon,
  },
  {
    label: "Investor",
    value: "Investor",
    image: investorIcon,
  },
  {
    label: "Viewer",
    value: "Viewer",
    image: viewerIcon,
  },
  {
    label: "Producer",
    value: "Producer",
    image: producerIcon,
  },
  {
    label: "Editor",
    value: "Editor",
    image: editorIcon,
  },
  {
    label: "Writer",
    value: "Writer",
    image: writerIcon,
  },
  {
    label: "Sound",
    value: "Sound",
    image: soundIcon,
  },
  {
    label: "Cinematographer",
    value: "Cinematographer",
    image: cinematographerIcon,
  },
  {
    label: "Distributor",
    value: "Distributor",
    image: distributorIcon,
  },
];

function RoleChoise({ role, setRole }) {
  const { t } = useTranslation();
  //const translatedOptionsMain = optionsMain.map(option => ({
   // ...option,
   // label: t(option.labelKey),
//  }));
  console.log(role);

   // Helper function to get the role name based on the option value
const getRoleName = (value) => {
  switch (value) {
    case "Filmmaker": return "Film Director";
    case "Actor": return "Actor";
    case "Sales Agent": return "Sales Agent";
    case "Film Festival": return "Film Festival";
    case "Viewer": return "Viewer";
    case "Investor": return "Investor";
    case "Producer": return "Producer";
    case "Editor": return "Editor";
    case "Writer": return "Writer";
    case "Sound": return "Sound";
    case "Cinematographer": return "Cinematographer";
    case "Distributor": return "Distributor";
    default: return "";
  }
};

return (
  <>
    <div className="tw-mx-auto tw-max-w-screen-lg tw-px-4 md:tw-px-6 lg:tw-px-2">
      <div className="tw-grid tw-grid-cols-2 tw-gap-2 md:tw-grid-cols-4 lg:tw-grid-cols-6">
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
                onClick={(e) =>
                  setRole({
                    label: t(option.label),
                    value: option.value,
                    image: option.image,
                  })
                }
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
