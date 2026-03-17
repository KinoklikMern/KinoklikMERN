import React from "react";
import { Country } from 'country-state-city';

const popularCountries = ["US", "CA", "GB"];

const CountryDropdown = ({ selectedValue, onOptionSelect }) => {
  const countries = Country.getAllCountries().filter(c => 
    popularCountries.includes(c.isoCode)
  );

  return (
    <div className="dropdown-content">
      {countries.map((country) => (
        <button
          key={country.isoCode}
          className={country.name === selectedValue ? "selected" : ""}
          onClick={() => onOptionSelect(country.name)}
        >
          {country.name}
        </button>
      ))}
    </div>
  );
};
export default CountryDropdown;