import React from 'react';
import { GENDER_OPTIONS } from '../../constants/GenderOptions'; 
import { useTranslation } from 'react-i18next';
import "./DropDown.css"

const GenderDropdown = ({ selectedValue, onOptionSelect }) => {
  const { t } = useTranslation();

  return (
    <div className="dropdown-content">
      {GENDER_OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          className={option.value === selectedValue ? "selected" : ""}
          onClick={() => onOptionSelect(option.value)} 
        >
          {t(option.value)}
        </button>
      ))}
    </div>
  );
};

export default GenderDropdown;