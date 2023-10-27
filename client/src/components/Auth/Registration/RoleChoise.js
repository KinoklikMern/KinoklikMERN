import React, { useState, setState } from "react";
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

export const optionsMain = [
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
];

export const optionsSecondary = [
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
    image: distributorIcon
  },
];

function RoleChoise({ role, setRole }) {
  console.log(role);
  return (
    <>
      <div className={SignupCss.roles}>
        <div className={SignupCss.form_title}>I am:</div>
        <div className={SignupCss.rolesMain}>
          {optionsMain.map((option) => (
            <div
              key={option.value}
              className={`${SignupCss.roleImgMain} ${
                role.value === option.value ? SignupCss.selected : ""
              }`}
            >
              <button
                value={option.value}
                onClick={(e) =>
                  setRole({
                    label: option.label,
                    value: option.value,
                    image: option.image,
                  })
                }
              >
                <img src={option.image} alt={`${option.value} Icon`}></img>
                <div className={SignupCss.mainText}>{option.label}</div>
              </button>
            </div>
          ))}
        </div>
        <div className={SignupCss.rolesSecondary}>
          {optionsSecondary
            // That complex is because I want to wrap every 4 lines with div of line
            .reduce((acc, option, index) => {
              const groupIndex = Math.floor(index / 5);
              if (!acc[groupIndex]) {
                acc[groupIndex] = [];
              }
              acc[groupIndex].push(
                <div
                  key={option.value}
                  className={`${SignupCss.roleImgSecondary} ${
                    role.value === option.value ? SignupCss.selectedSecondary : ""
                  }`}
                >
                  <button
                    value={option.value}
                    onClick={(e) =>
                      setRole({
                        label: option.label,
                        value: option.value,
                        image: option.image,
                      })
                    }
                  >
                    <img src={option.image} alt={`${option.value} Icon`}></img>
                    <div className={SignupCss.secondaryText}>
                      {option.label}
                    </div>
                  </button>
                </div>
              );
              return acc;
            }, [])
            .map((group, index) => (
              <div key={index} className={SignupCss.line}>
                {group}
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default RoleChoise;
