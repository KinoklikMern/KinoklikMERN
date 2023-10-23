import React from "react";
import "./DropDown.css";

const AgeRangeDropdown = ({ selectedValue, onOptionSelect }) => {
  // const ageRanges = ["Select Age", "0-18", "19-30", "31-50", "51-100"];
  const ageRanges = ["0-18", "19-30", "31-50", "51-100"];

  return (
    <div className="dropdown-content">
      {ageRanges.map((option, index) => (
        <div
          key={index}
          className={`dropdown-option ${
            option === selectedValue ? "selected" : ""
          }`}
          onClick={() =>
            // onOptionSelect(option === "Select Age" ? null : option)
            onOptionSelect(option)
          }
        >
          {option}
        </div>
      ))}
    </div>
  );
};

export default AgeRangeDropdown;
