import React from "react";
import { useTranslation } from 'react-i18next';
import { AGE_OPTIONS } from "../../constants/AgeOptions"; 
import "./DropDown.css";

const AgeRangeDropdown = ({ selectedValue, onOptionSelect }) => {
  const { t } = useTranslation();

  return (
    <div className="dropdown-content">
      {AGE_OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          className={option.value === selectedValue ? "selected" : ""}
          onClick={() => onOptionSelect(option.label, option.value)}
        >
          {(option.label)}
        </button>
      ))}
    </div>
  );
};

export default AgeRangeDropdown;