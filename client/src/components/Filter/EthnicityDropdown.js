import React from "react";
import "./DropDown.css";
import {useTranslation} from 'react-i18next';

const EthnicityDropdown = ({ selectedValue, onOptionSelect }) => {
  const { t } = useTranslation();
  const ethnicities = [
    t("Asian"),
    t("African American"),
    t("Caucasian"),
    t("Hispanic"),
    t("Native"),
  ];

  return (
    <div className="dropdown-content">
      {ethnicities.map((option, index) => (
        <div
          key={index}
          className={option === selectedValue ? "selected" : ""}
          onClick={() => onOptionSelect(option)}
        >
          {option}
        </div>
      ))}
    </div>
  );
};

export default EthnicityDropdown;
