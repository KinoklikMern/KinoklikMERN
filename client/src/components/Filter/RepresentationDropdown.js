import React from "react";
import { useTranslation } from 'react-i18next';
import "./DropDown.css";

const RepresentationDropdown = ({ selectedValue, onOptionSelect }) => {
  const { t } = useTranslation();

  const representations = ["Yes", "No"];

  return (
    <div className="dropdown-content">
      {representations.map((option, index) => (
        <button
          key={index}
          className={option === selectedValue ? "selected" : ""}
          onClick={() => onOptionSelect(option)}
        >
          {t(option)}
        </button>
      ))}
    </div>
  );
};

export default RepresentationDropdown;