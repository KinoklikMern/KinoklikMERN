import React from "react";
import "./DropDown.css";

const RepresentationDropdown = ({ selectedValue, onOptionSelect }) => {
  const representations = ["Yes", "No"];

  return (
    <div className="dropdown-content">
      {representations.map((option, index) => (
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

export default RepresentationDropdown;
