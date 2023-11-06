import React from "react";
import "./DropDown.css";

const CityDropdown = ({ selectedValue, onOptionSelect }) => {
  const cities = ["Montreal", "Toronto", "New York", "Other"];

  return (
    <div className="dropdown-content">
      {cities.map((option, index) => (
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

export default CityDropdown;
