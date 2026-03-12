import React, { useState, useRef, useEffect } from 'react';
import { GENDER_OPTIONS } from '../../constants/GenderOptions'; 
import { useTranslation } from 'react-i18next';
import "./DropDown.css"

const GenderDropdown = ({ selectedValue, onOptionSelect, onReset }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="tw-flex tw-gap-2" ref={dropdownRef}>
      {/* "All" button is now part of the component group */}
      <button
        onClick={onReset}
        className={`${selectedValue === "All" ? "tw-bg-[#6627a7] tw-text-white" : "tw-bg-white tw-text-[#1E0039]"} tw-rounded-lg tw-px-3 tw-text-[10px] tw-font-bold tw-h-7`}
      >
        {t("All")}
      </button>

      {/* Trigger Button */}
      <button 
        className="tw-bg-[#1E0039] tw-text-white tw-px-4 tw-rounded-lg tw-text-[10px] tw-font-bold tw-h-7"
        onClick={() => setIsOpen(!isOpen)}
      >
        {t("Gender")}
      </button>
      
      {isOpen && (
        <div className="dropdown-content">
          {GENDER_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              className={selectedValue === opt.value ? 'selected dropdown-option' : 'dropdown-option'}
              onClick={() => { onOptionSelect(opt.value); setIsOpen(false); }}
            >
              {t(opt.label)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default GenderDropdown;