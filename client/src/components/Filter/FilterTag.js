import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import '../HomeBody/HomeBody.css';
import '../List/List.css';
import './DropDown.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faCheck,
  faSortDown,
  faSortUp,
} from '@fortawesome/free-solid-svg-icons';
import { FepkContext } from '../../context/FepkContext.js';
import GenderDropdown from './GenderDropdown.js';
import AgeRangeDropdown from './AgeRangeDropdown';
import EthnicityDropdown from './EthnicityDropdown';
import RepresentationDropdown from './RepresentationDropdown';
import CityDropdown from './CityDropdown';
import CountryDropdown from './CountryDropdown';
import { AGE_OPTIONS } from '../../constants/AgeOptions.js';
import { ETHNICITY_OPTIONS } from '../../constants/EthnicityOptions.js';
import { useTranslation } from 'react-i18next';

// import StatusBtn from "../SwitchStatusBtn/Status";

export default function FilterTag({ role }) {
  const [filterQuery, setFilterQuery] = React.useContext(FepkContext);
  const location = useLocation();
  // Yeming added

  // State to manage selected values for specific dropdowns
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedAgeRange, setSelectedAgeRange] = useState(null);
  const [selectedEthnicity, setSelectedEthnicity] = useState(null);
  const [selectedRepresentation, setSelectedRepresentation] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedDropdown, setSelectedDropdown] = useState(null);

  const { t } = useTranslation();

  const containerRef = useRef(null);
  useEffect(() => {
  const handleClickOutside = (event) => {
    if (selectedDropdown && containerRef.current && !containerRef.current.contains(event.target)) {
      setSelectedDropdown(null);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, [selectedDropdown]);

  const handleDropdownSelection = (name, value) => {
    setFilterQuery((prevFilterQuery) => {
      let updatedQuery = [...prevFilterQuery];

      // Remove any existing entries for this dropdown
      updatedQuery = updatedQuery.filter(
        (item) => !item.startsWith(`${name}:`)
      );

      // Add the new entry if a value is selected
      if (value) {
        updatedQuery.push(`${name}: ${value}`);
      }

      // Check if any of the dropdown values have been selected
      const anyDropdownValueSelected = [
        'Gender',
        'Age Range',
        'Ethnicity',
        'Representation',
        'City',
        'Country',
      ].some((dropdownName) =>
        updatedQuery.some((item) => item.startsWith(`${dropdownName}:`))
      );

      // Update the "All Actors" button based on the selected dropdown values and gender
      const allActorsIsActive = !anyDropdownValueSelected;

      // Update selected value based on the dropdown
      switch (name) {
        case 'Gender':
          setSelectedGender(value);
          break;
        case 'Age Range':
          setSelectedAgeRange(value);
          break;
        case 'Ethnicity':
          setSelectedEthnicity(value);
          break;
        case 'Representation':
          setSelectedRepresentation(value);
          break;
        case 'City':
          setSelectedCity(value);
          break;
        case 'Country':
          setSelectedCountry(value);
          break;
        default:
          break;
      }

      // Update the state of the "All Actors" button
      setFilterTags((prevFilterTags) =>
        prevFilterTags.map((tag) =>
          tag.name === 'All Actors'
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
      { name: 'Gender', isActive: false },
      { name: 'Age Range', isActive: false },
      { name: 'Ethnicity', isActive: false },
      { name: 'Representation', isActive: false },
      { name: 'City', isActive: false },
      { name: 'Country', isActive: false },
      { name: 'All Actors', isActive: true },
    ],
    []
  );

  //Make sure the filter tags are reset when the user switches between EPKs and Actors 2024-6-13
  const [filterTags, setFilterTags] = useState(
    // role === "actor" ? actorFilterTag : []
    location.pathname === '/actors' ? actorFilterTag : []
  );
  useEffect(() => {
    setFilterTags(location.pathname === '/actors' ? actorFilterTag : []);
  }, [actorFilterTag, location.pathname]);
  //

  const clickHandler = (name, isActive) => {
    let newTags;
    let newQuery;

    if (name === 'All Actors') {
      // Reset the dropdown state values to their default (null) when All Actors is clicked
      setSelectedGender(null);
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
    } else {
      newTags = filterTags.map((tag) =>
        tag.name === name ? { ...tag, isActive: !isActive } : tag
      );

      if (isActive) {
        newQuery = Array.isArray(filterQuery)
          ? filterQuery.filter((item) => item !== name)
          : [];
      } else {
        newQuery = Array.isArray(filterQuery) ? [...filterQuery, name] : [name];
      }

      // Update "All Actors" tag
      const allActorsIsActive =
        !selectedGender &&
        !selectedAgeRange &&
        !selectedEthnicity &&
        !selectedRepresentation &&
        !selectedCity &&
        !selectedCountry;

      newTags = newTags.map((tag) =>
        tag.name === 'All Actors'
          ? { ...tag, isActive: allActorsIsActive }
          : tag
      );
    }

    setFilterTags(newTags);
    setFilterQuery(newQuery);
  };

  // button components
  const FilterButton = ({ name, isActive, clickHandler, selectedValue }) => {
    const isDropdownActive = selectedDropdown === name;
    // const isDropdownActive = selectedDropdown === selectedValue;
    const buttonRef = useRef(null);

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (isDropdownActive && buttonRef.current && !buttonRef.current.contains(event.target)) {
          setSelectedDropdown(null);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isDropdownActive]);

    return (
      <div className="filter-button-container">
        {name === 'Gender' ||
        name === 'Age Range' ||
        name === 'Ethnicity' ||
        name === 'Representation' ||
        name === 'City' ||
        name === 'Country' ? (
          <div className="relative inline-block">
            <button
              className={`filter-toggle tw-text-small tw-mb-1 tw-mr-5 tw-w-60 tw-rounded-full tw-border-2 tw-px-4 tw-py-2 tw-font-bold tw-uppercase lg:tw-w-auto ${
                // isDropdownActive
                selectedValue
                  ? 'tw-bg-white tw-text-[#1E0039]'
                  : 'tw-bg-[#1E0039] tw-text-[#AAAAAA]'
              }`}
              // onClick={() => handleDropdownSelection(name, selectedValue)}
              onClick={() => handleDropdownSelection(name, null)}
            >
              {/* {name} */}
              {
                name === 'Age Range' 
                  ? (AGE_OPTIONS.find(opt => opt.value === selectedValue)?.label || name)
                : name === 'Ethnicity' 
                  ? (t(ETHNICITY_OPTIONS.find(opt => opt.value === selectedValue)?.label) || name)
                : (selectedValue || name)
              }
              <FontAwesomeIcon
                icon={isDropdownActive ? faSortUp : faSortDown}
                className="tw-ml-2"
              />
            </button>

            {isDropdownActive && (
              <div className="dropdown-options">
                {name === 'Gender' && (
                  <GenderDropdown
                    selectedValue={selectedGender}
                    onOptionSelect={(value) => 
                      handleDropdownSelection(name, value)}
                  />
                )}
                {name === 'Age Range' && (
                  <AgeRangeDropdown
                    selectedValue={selectedAgeRange}
                    onOptionSelect={(value) =>
                      handleDropdownSelection(name, value)
                    }
                  />
                )}
                {name === 'Ethnicity' && (
                  <EthnicityDropdown
                    selectedValue={selectedEthnicity}
                    onOptionSelect={(value) =>
                      handleDropdownSelection(name, value)
                    }
                  />
                )}
                {name === 'Representation' && (
                  <RepresentationDropdown
                    selectedValue={selectedRepresentation}
                    onOptionSelect={(value) =>
                      handleDropdownSelection(name, value)
                    }
                  />
                )}
                {name === 'City' && (
                  <CityDropdown
                    selectedValue={selectedCity}
                    onOptionSelect={(value) =>
                      handleDropdownSelection(name, value)
                    }
                  />
                )}
                {name === 'Country' && (
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
                ? 'tw-bg-[#1E0039] tw-text-[#AAAAAA]'
                : 'tw-bg-white tw-text-[#1E0039]'
            }`}
            type="button"
            onClick={() => clickHandler(name, isActive)}
          >
            {name}

            {!isActive ? (
              <FontAwesomeIcon
                className="tw-pl-5"
                icon={faPlus}
                style={{ color: '#aaaaaa' }}
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
    <div ref={containerRef} className="">
      {/* <div className='filter-tag-container'></div> */}
      <div className="tw-relative tw-flex tw-flex-col tw-items-center tw-justify-around tw-bg-[#1e0039] lg:tw-flex-row">
        {filterTags.map((tag, index) => (
          <FilterButton
            key={index}
            name={tag.name}
            clickHandler={clickHandler}
            isActive={tag.isActive}
            selectedValue={
              tag.name === 'Gender' ? selectedGender :
              tag.name === 'Age Range' ? selectedAgeRange :
              tag.name === 'Ethnicity' ? selectedEthnicity :
              tag.name === 'Representation' ? selectedRepresentation :
              tag.name === 'City' ? selectedCity :
              tag.name === 'Country' ? selectedCountry : null
            }
          />
        ))}
      </div>
    </div>
  );
}