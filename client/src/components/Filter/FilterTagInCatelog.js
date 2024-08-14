import React, { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import "../HomeBody/HomeBody.css";
import "../List/List.css";
import "./DropDown.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faCheck,
  faSortDown,
  faSortUp,
} from "@fortawesome/free-solid-svg-icons";
import { FepkContext } from "../../context/FepkContext.js";
import AgeRangeDropdown from "./AgeRangeDropdown.js";
import EthnicityDropdown from "./EthnicityDropdown.js";
import RepresentationDropdown from "./RepresentationDropdown.js";
import CityDropdown from "./CityDropdown.js";
import CountryDropdown from "./CountryDropdown.js";

// import StatusBtn from "../SwitchStatusBtn/Status";

export default function FilterTagInCatelog({ isActive }) {
  const [filterQueryActors, setFilterQueryActors] =
    React.useContext(FepkContext);
  // Yeming added

  // State to manage selected values for specific dropdowns
  const [selectedAgeRange, setSelectedAgeRange] = useState(null);
  const [selectedEthnicity, setSelectedEthnicity] = useState(null);
  const [selectedRepresentation, setSelectedRepresentation] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedDropdown, setSelectedDropdown] = useState(null);

  const handleDropdownSelection = (name, value) => {
    setFilterQueryActors((prevFilterQueryActors) => {
      let updatedQuery = [...prevFilterQueryActors];

      // Remove any existing entries for this dropdown
      updatedQuery = updatedQuery.filter(
        (item) => !item.startsWith(`${name}:`)
      );

      // Add the new entry if a value is selected
      if (value) {
        updatedQuery.push(`${name}: ${value}`);
      }

      // Check if "Male" or "Female" buttons are active
      const isGenderActive = updatedQuery.some(
        (item) => item === "Male" || item === "Female"
      );

      // Check if any of the dropdown values have been selected
      const anyDropdownValueSelected = [
        "Age Range",
        "Ethnicity",
        "Representation",
        "City",
        "Country",
      ].some((dropdownName) =>
        updatedQuery.some((item) => item.startsWith(`${dropdownName}:`))
      );

      // Update the "All Actors" button based on the selected dropdown values and gender
      const allActorsIsActive = !(isGenderActive || anyDropdownValueSelected);

      // Update selected value based on the dropdown
      switch (name) {
        case "Age Range":
          setSelectedAgeRange(value);
          break;
        case "Ethnicity":
          setSelectedEthnicity(value);
          break;
        case "Representation":
          setSelectedRepresentation(value);
          break;
        case "City":
          setSelectedCity(value);
          break;
        case "Country":
          setSelectedCountry(value);
          break;
        default:
          break;
      }

      // Update the state of the "All Actors" button
      setFilterTags((prevFilterTags) =>
        prevFilterTags.map((tag) =>
          tag.name === "All Actors"
            ? { ...tag, isActive: allActorsIsActive }
            : tag
        )
      );

      // Close the dropdown
      setSelectedDropdown((prev) => (prev === name ? null : name));

      // console.log("selectDropdown", selectedDropdown);
      return updatedQuery;
    });
  };

  const actorFilterTag = useMemo(
    () => [
      {
        name: "Male",
        isActive: false,
      },
      {
        name: "Female",
        isActive: false,
      },

      {
        name: "Age Range", // Age Range dropdown
        isActive: false,
      },
      {
        name: "Ethnicity", // Ethnicity dropdown
        isActive: false,
      },
      {
        name: "Representation", // Representation dropdown
        isActive: false,
      },
      {
        name: "City", // City dropdown
        isActive: false,
      },
      {
        name: "Country", // Country dropdown
        isActive: false,
      },
      {
        name: "All Actors",
        isActive: true,
      },
    ],
    []
  );

  //For catelog page
  const [filterTags, setFilterTags] = useState(actorFilterTag);
  useEffect(() => {
    setFilterTags(isActive === "actor" ? actorFilterTag : []);

    if (isActive === "actor") {
      // Reset the dropdown state values to their default (null) when All Actors is clicked
      setSelectedAgeRange(null);
      setSelectedEthnicity(null);
      setSelectedRepresentation(null);
      setSelectedCity(null);
      setSelectedCountry(null);
    }
  }, [actorFilterTag, isActive]);

  const clickHandler = (name, isActive) => {
    let newTags;
    let newQuery;

    if (name === "All Actors") {
      // Reset the dropdown state values to their default (null) when All Actors is clicked
      setSelectedAgeRange(null);
      setSelectedEthnicity(null);
      setSelectedRepresentation(null);
      setSelectedCity(null);
      setSelectedCountry(null);
      newTags = filterTags.map((tag) => ({
        ...tag,
        isActive: tag.name === name,
      }));
      newQuery = isActive ? [] : [];
    } else if (name === "Male" || name === "Female") {
      // Handle "Male" and "Female" options mutually exclusively
      newTags = filterTags.map((tag) =>
        tag.name === name
          ? { ...tag, isActive: true }
          : { ...tag, isActive: false }
      );
      newQuery = Array.isArray(filterQueryActors)
        ? [
            ...filterQueryActors.filter(
              (item) => item !== "Male" && item !== "Female"
            ),
            name,
          ]
        : [name];
    } else {
      newTags = filterTags.map((tag) =>
        tag.name === name ? { ...tag, isActive: !isActive } : tag
      );

      if (isActive) {
        newQuery = Array.isArray(filterQueryActors)
          ? filterQueryActors.filter((item) => item !== name)
          : [];
      } else {
        newQuery = Array.isArray(filterQueryActors)
          ? [...filterQueryActors, name]
          : [name];
      }

      // Update "All Actors" tag
      const allActorsIsActive =
        !newQuery.includes("Male") &&
        !newQuery.includes("Female") &&
        !selectedAgeRange &&
        !selectedEthnicity &&
        !selectedRepresentation &&
        !selectedCity &&
        !selectedCountry;

      newTags = newTags.map((tag) =>
        tag.name === "All Actors"
          ? { ...tag, isActive: allActorsIsActive }
          : tag
      );
    }

    setFilterTags(newTags);
    setFilterQueryActors(newQuery);
  };

  // button components
  const FilterButton = ({ name, isActive, clickHandler, selectedValue }) => {
    const isDropdownActive = selectedDropdown === name;
    // const isDropdownActive = selectedDropdown === selectedValue;

    return (
      <div className="filter-button-container">
        {name === "Age Range" ||
        name === "Ethnicity" ||
        name === "Representation" ||
        name === "City" ||
        name === "Country" ? (
          <div className="relative inline-block">
            <button
              className={`filter-toggle tw-text-small tw-mb-1 tw-mr-5 tw-w-60 tw-rounded-full tw-border-2 tw-px-4 tw-py-2 tw-font-bold tw-uppercase lg:tw-w-auto ${
                // isDropdownActive
                selectedValue
                  ? "tw-bg-white tw-text-[#1E0039]"
                  : "tw-bg-[#1E0039] tw-text-[#AAAAAA]"
              }`}
              // onClick={() => handleDropdownSelection(name, selectedValue)}
              onClick={() => handleDropdownSelection(name, null)}
            >
              {/* {name} */}
              {selectedValue || name}
              <FontAwesomeIcon
                icon={isDropdownActive ? faSortUp : faSortDown}
                className="tw-ml-2"
              />
            </button>

            {isDropdownActive && (
              <div className="dropdown-options absolute top-8 left-0 mt-2 py-2 bg-white rounded-lg shadow-lg">
                {name === "Age Range" && (
                  <AgeRangeDropdown
                    selectedValue={selectedAgeRange}
                    onOptionSelect={(value) =>
                      handleDropdownSelection(name, value)
                    }
                  />
                )}
                {name === "Ethnicity" && (
                  <EthnicityDropdown
                    selectedValue={selectedEthnicity}
                    onOptionSelect={(value) =>
                      handleDropdownSelection(name, value)
                    }
                  />
                )}
                {name === "Representation" && (
                  <RepresentationDropdown
                    selectedValue={selectedRepresentation}
                    onOptionSelect={(value) =>
                      handleDropdownSelection(name, value)
                    }
                  />
                )}
                {name === "City" && (
                  <CityDropdown
                    selectedValue={selectedCity}
                    onOptionSelect={(value) =>
                      handleDropdownSelection(name, value)
                    }
                  />
                )}
                {name === "Country" && (
                  <CountryDropdown
                    selectedValue={selectedCountry}
                    onOptionSelect={(value) =>
                      handleDropdownSelection(name, value)
                    }
                  />
                )}
              </div>
            )}
          </div>
        ) : (
          <button
            className={`tw-text-small tw-mb-2 tw-mr-5 tw-w-60 tw-rounded-full tw-border-2 tw-px-4 tw-py-2 tw-font-bold tw-uppercase lg:tw-w-auto ${
              !isActive
                ? "tw-bg-[#1E0039] tw-text-[#AAAAAA]"
                : "tw-bg-white tw-text-[#1E0039]"
            }`}
            type="button"
            onClick={() => clickHandler(name, isActive)}
          >
            {name}

            {!isActive ? (
              <FontAwesomeIcon
                className="tw-pl-5"
                icon={faPlus}
                style={{ color: "#aaaaaa" }}
              />
            ) : (
              <FontAwesomeIcon className="tw-pl-5" icon={faCheck} />
            )}
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="">
      {/* <div className='filter-tag-container'></div> */}
      <div className="tw-relative tw-flex tw-flex-col tw-items-center tw-justify-around tw-bg-[#1e0039] lg:tw-flex-row">
        {filterTags.map((tag, index) => (
          <FilterButton
            key={index}
            name={tag.name}
            clickHandler={clickHandler}
            isActive={tag.isActive}
            selectedValue={
              tag.name === "Age Range"
                ? selectedAgeRange
                : tag.name === "Ethnicity"
                ? selectedEthnicity
                : tag.name === "Representation"
                ? selectedRepresentation
                : tag.name === "City"
                ? selectedCity
                : tag.name === "Country"
                ? selectedCountry
                : null
            }
          />
        ))}
      </div>
    </div>
  );
}
