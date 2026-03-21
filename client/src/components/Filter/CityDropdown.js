import React from "react";
import "./DropDown.css";

const CityDropdown = ({ selectedValue, onOptionSelect }) => {
  const cities = ["Montreal", "Toronto", "Vancouver", "Calgary", "Ottawa", "New York", "Los Angeles", "Chicago", "Atlanta", "Austin", "Miami", "San Francisco", "Other"];

  return (
    <div className="dropdown-content">
      {cities.map((option, index) => (
        <button
          key={index}
          className={option === selectedValue ? "selected" : ""}
          onClick={() => onOptionSelect(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default CityDropdown;