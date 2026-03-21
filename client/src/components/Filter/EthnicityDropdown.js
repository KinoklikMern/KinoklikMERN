import React from "react";
import { useTranslation } from 'react-i18next';
import "./DropDown.css";
import { ETHNICITY_OPTIONS } from '../../constants/EthnicityOptions';

const EthnicityDropdown = ({ selectedValue, onOptionSelect }) => {
  const { t } = useTranslation();
  
  return (
    <div className="dropdown-content">
      {ETHNICITY_OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          className={option.value === selectedValue ? "selected" : ""}
          onClick={() => onOptionSelect(option.value, option.value)} 
        >
          {t(`ethnicities.${option.value}`)}
        </button>
      ))}
    </div>
  );
};

export default EthnicityDropdown;