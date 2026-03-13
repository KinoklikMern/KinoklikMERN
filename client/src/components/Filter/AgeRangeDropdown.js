import React from "react";
import { AGE_OPTIONS } from "../../constants/AgeOptions"; 
import "./DropDown.css";

const AgeRangeDropdown = ({ selectedValue, onOptionSelect }) => {

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