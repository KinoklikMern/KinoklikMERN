import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faXmark } from "@fortawesome/free-solid-svg-icons";

export default function CustomSelect({ value, onChange, options, placeholder, isError, required }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown if user clicks outside of it
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (selectedValue) => {
    onChange(selectedValue);
    setIsOpen(false);
  };

  const selectedLabel = options.find(opt => 
    (typeof opt === 'object' ? opt.value : opt) === value
  );
  
  const displayLabel = selectedLabel 
    ? (typeof selectedLabel === 'object' ? selectedLabel.label : selectedLabel) 
    : placeholder;

  return (
    <div className="tw-relative tw-w-full" ref={dropdownRef}>
      <select
        className="tw-absolute tw-top-1/2 tw-left-1/2 -tw-translate-x-1/2 -tw-translate-y-1/2 tw-w-[1px] tw-h-[1px] tw-opacity-0 tw-z-[-1]"
        value={value}
        onChange={(e) => handleSelect(e.target.value)} 
        required={required}
        onFocus={() => setIsOpen(true)} // Bonus: If a user tabs to it with their keyboard, it opens the menu!
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((opt, i) => (
           <option key={i} value={typeof opt === 'object' ? opt.value : opt}>
             {typeof opt === 'object' ? opt.label : opt}
           </option>
        ))}
      </select>

      {/* The main input-like button */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`tw-flex tw-w-full tw-items-center tw-justify-between tw-bg-[#190033] tw-border tw-rounded-lg tw-px-4 tw-py-3 tw-text-sm tw-cursor-pointer tw-transition-colors ${
          isError 
            ? "tw-border-red-500 tw-shadow-[0_0_10px_rgba(239,68,68,0.3)]" 
            : isOpen 
              ? "tw-border-[#FF43A7]" 
              : "tw-border-[#5A3F49]/40 hover:tw-border-[#FF43A7]/50"
        } ${value ? "tw-text-white" : "tw-text-white/50"}`}
      >
        <span className="tw-truncate">{displayLabel}</span>
        
        <div className="tw-flex tw-items-center tw-gap-3">
          {/* Clear button (Only shows if there is a value AND it's not a required field) */}
          {value && !required && (
            <FontAwesomeIcon 
              icon={faXmark} 
              className="tw-text-[#AA8894] hover:tw-text-red-500 tw-transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                onChange('');
              }}
              title="Clear selection"
            />
          )}
          <FontAwesomeIcon 
            icon={faChevronDown} 
            className={`tw-text-[#AA8894] tw-transition-transform tw-duration-200 ${isOpen ? "tw-rotate-180" : ""}`} 
          />
        </div>
      </div>

      {/* The Dropdown Menu */}
      {isOpen && (
        <div className="tw-absolute tw-z-50 tw-w-full tw-mt-2 tw-bg-[#280D41] tw-border tw-border-[#5A3F49]/40 tw-rounded-lg tw-shadow-[0_10px_25px_rgba(0,0,0,0.5)] tw-max-h-60 tw-overflow-y-auto custom-scrollbar tw-py-2">
          
          <div
            onClick={() => {
              if (!required) handleSelect('');
            }}
            className={`tw-px-4 tw-py-2 tw-text-sm tw-transition-colors tw-italic ${
              required 
                ? "tw-text-[#AA8894]/40 tw-cursor-not-allowed" 
                : "tw-text-[#AA8894] hover:tw-bg-[#FF43A7]/20 hover:tw-text-[#FFB0CF] tw-cursor-pointer"
            }`}
          >
            -- {placeholder} --
          </div>

          {options.map((option, index) => {
            const optValue = typeof option === 'object' ? option.value : option;
            const optLabel = typeof option === 'object' ? option.label : option;
            const isSelected = value === optValue;

            return (
              <div
                key={index}
                onClick={() => handleSelect(optValue)}
                className={`tw-px-4 tw-py-2 tw-text-sm tw-cursor-pointer tw-transition-colors ${
                  isSelected 
                    ? "tw-bg-[#FF43A7] tw-text-[#190033] tw-font-bold" 
                    : "tw-text-white hover:tw-bg-[#FF43A7]/20 hover:tw-text-[#FFB0CF]" 
                }`}
              >
                {optLabel}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}