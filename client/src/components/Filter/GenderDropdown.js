import React from 'react';
import { GENDER_OPTIONS } from '../../constants/GenderOptions'; 
import { useTranslation } from 'react-i18next';
import "./DropDown.css"

const GenderDropdown = ({ selectedValue, onOptionSelect }) => {
  const { t } = useTranslation();

  return (
    <div className="dropdown-content">
      {GENDER_OPTIONS.map((opt) => (
        <button
          key={opt.value}
          className={
            selectedValue === opt.value ? 'selected' : ''
          }
          onClick={() => onOptionSelect(opt.value)}
        >
          {t(opt.label)}
        </button>
      ))}
    </div>
  );
};

export default GenderDropdown;