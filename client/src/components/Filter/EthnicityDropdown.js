import React from "react";
import "./DropDown.css";

const EthnicityDropdown = ({ selectedValue, onOptionSelect }) => {
  const ethnicities = [
    "Asian",
    "African American",
    "Caucasion",
    "Hispanic",
    "Native",
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
