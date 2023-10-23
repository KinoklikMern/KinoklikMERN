import React from "react";
import "./DropDown.css";

const CountryDropdown = ({ selectedValue, onOptionSelect }) => {
  const countries = ["Canada", "USA", "Other"];

  return (
    <div className="dropdown-content">
      {countries.map((option, index) => (
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

export default CountryDropdown;
