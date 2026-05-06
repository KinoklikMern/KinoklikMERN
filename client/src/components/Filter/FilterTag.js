import React, { useEffect, useRef, useState, useMemo, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import '../HomeBody/HomeBody.css';
import './DropDown.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
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

export default function FilterTag({ isActive }) {
  const { filterQuery, setFilterQuery } = useContext(FepkContext);
  const location = useLocation();
  const { t } = useTranslation();
  const containerRef = useRef(null);

  const getInitialValue = (category) => {
    if (!filterQuery || !Array.isArray(filterQuery)) return null;
    const match = filterQuery.find(f => f.startsWith(`${category}:`));
    return match ? match.split(': ')[1] : null;
  };

  const [selectedGender, setSelectedGender] = useState(() => getInitialValue('Gender'));
  const [selectedAgeRange, setSelectedAgeRange] = useState(() => getInitialValue('Age Range'));
  const [selectedEthnicity, setSelectedEthnicity] = useState(() => getInitialValue('Ethnicity'));
  const [selectedRepresentation, setSelectedRepresentation] = useState(() => getInitialValue('Representation'));
  const [selectedCity, setSelectedCity] = useState(() => getInitialValue('City'));
  const [selectedCountry, setSelectedCountry] = useState(() => getInitialValue('Country'));
  
  const [selectedDropdown, setSelectedDropdown] = useState(null);

  useEffect(() => {
    if (!Array.isArray(filterQuery)) return;

    const newValues = {
      Gender: null,
      'Age Range': null,
      Ethnicity: null,
      Representation: null,
      City: null,
      Country: null
    };

    filterQuery.forEach(filter => {
      const parts = filter.split(':');
      if (parts.length < 2) return;
      const name = parts[0].trim();
      const value = parts[1].trim();
      if (newValues.hasOwnProperty(name)) {
        newValues[name] = value;
      }
    });

    setSelectedGender(newValues.Gender);
    setSelectedAgeRange(newValues['Age Range']);
    setSelectedEthnicity(newValues.Ethnicity);
    setSelectedRepresentation(newValues.Representation);
    setSelectedCity(newValues.City);
    setSelectedCountry(newValues.Country);

  }, [filterQuery]);

  const handleDropdownSelection = (name, value) => {
    if (value === null) {
      setSelectedDropdown(prev => (prev === name ? null : name));
      return;
    }

    setFilterQuery((prev) => {
      let updatedQuery = prev.filter((item) => !item.startsWith(`${name}:`));
      if (value) updatedQuery.push(`${name}: ${value}`);
      return updatedQuery;
    });
    
    setSelectedDropdown(null);
  };

  const actorFilterTag = useMemo(() => [
    { name: 'Gender', isActive: false },
    { name: 'Age Range', isActive: false },
    { name: 'Ethnicity', isActive: false },
    { name: 'Representation', isActive: false },
    { name: 'City', isActive: false },
    { name: 'Country', isActive: false },
    { name: 'All Actors', isActive: true },
  ], []);

  const [filterTags, setFilterTags] = useState(
    location.pathname === '/actors' || isActive === 'actor' ? actorFilterTag : []
  );

  useEffect(() => {
    const isActorView = location.pathname === '/actors' || isActive === 'actor';
    setFilterTags(isActorView ? actorFilterTag : []);
  }, [actorFilterTag, location.pathname, isActive]);

  const clickHandler = (name, isCurrentlyActive) => {
    if (name === 'All Actors') {
      setSelectedGender(null);
      setSelectedAgeRange(null);
      setSelectedEthnicity(null);
      setSelectedRepresentation(null);
      setSelectedCity(null);
      setSelectedCountry(null);
      setFilterQuery([]);
    } else {
      setFilterQuery(prev => 
        isCurrentlyActive ? prev.filter(i => i !== name) : [...prev, name]
      );
    }
  };

  const FilterButton = ({ name, isActive, selectedValue }) => {
    const isDropdownActive = selectedDropdown === name;
    const isDropdownType = ['Gender', 'Age Range', 'Ethnicity', 'Representation', 'City', 'Country'].includes(name);

    const buttonRef = useRef(null);

    useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownActive && buttonRef.current && !buttonRef.current.contains(event.target)) {
        setSelectedDropdown(null);
      }
    };

    if (isDropdownActive) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownActive]);

  const displayLabel = useMemo(() => {
    if (!selectedValue) return name;

    if (name === 'Age Range') {
      const found = AGE_OPTIONS.find(opt => String(opt.value) === String(selectedValue));
      return found ? found.label : name;
    }

    if (name === 'Ethnicity') {
      const found = ETHNICITY_OPTIONS.find(opt => opt.value === selectedValue);
      return found ? t(found.label) : name;
    }

    return selectedValue;
  }, [name, selectedValue]);

    return (
      <div className="filter-button-container">
        {isDropdownType ? (
          <div className="tw-relative tw-inline-block" ref={buttonRef}>
            <button
              className={`filter-toggle tw-text-small tw-mb-1 tw-mr-5 tw-w-60 tw-rounded-full tw-border-2 tw-px-4 tw-py-2 tw-font-bold tw-uppercase lg:tw-w-auto tw-flex tw-flex-row tw-items-center tw-justify-center ${
                selectedValue ? 'tw-bg-white tw-text-[#1E0039]' : 'tw-bg-[#1E0039] tw-text-[#AAAAAA]'
              }`}
              onClick={() => handleDropdownSelection(name, null)}
            >
              {displayLabel}
              <div className="tw-ml-2 tw-flex tw-shrink-0 tw-items-center">
                {selectedValue && (
                  <span 
                    className="tw-mr-2 tw-flex tw-h-5 tw-w-5 tw-items-center tw-justify-center tw-rounded-full hover:tw-bg-red-100 hover:tw-text-red-600"
                    onClick={(e) => {
                      e.stopPropagation(); 
                      handleDropdownSelection(name, ""); 
                    }}
                  >
                     ✕
                  </span>
                )}
              <FontAwesomeIcon icon={isDropdownActive ? faSortUp : faSortDown} className="tw-ml-2" />
              </div>
            </button>

            {isDropdownActive && (
              <div className="dropdown-options">
                {name === 'Gender' && <GenderDropdown selectedValue={selectedGender} onOptionSelect={(v) => handleDropdownSelection(name, v)} />}
                {name === 'Age Range' && <AgeRangeDropdown selectedValue={selectedAgeRange} onOptionSelect={(v) => handleDropdownSelection(name, v)} />}
                {name === 'Ethnicity' && <EthnicityDropdown selectedValue={selectedEthnicity} onOptionSelect={(v) => handleDropdownSelection(name, v)} />}
                {name === 'Representation' && <RepresentationDropdown selectedValue={selectedRepresentation} onOptionSelect={(v) => handleDropdownSelection(name, v)} />}
                {name === 'City' && <CityDropdown selectedValue={selectedCity} onOptionSelect={(v) => handleDropdownSelection(name, v)} />}
                {name === 'Country' && <CountryDropdown selectedValue={selectedCountry} onOptionSelect={(v) => handleDropdownSelection(name, v)} />}
              </div>
            )}
          </div>
        ) : (
          <button
            className={`tw-text-small tw-mb-2 tw-mr-5 tw-w-60 tw-rounded-full tw-border-2 tw-px-4 tw-py-2 tw-font-bold tw-uppercase lg:tw-w-auto ${
              !isActive ? 'tw-bg-[#1E0039] tw-text-[#AAAAAA]' : 'tw-bg-white tw-text-[#1E0039]'
            }`}
            type="button"
            onClick={() => clickHandler(name, isActive)}
          >
            {name}
          </button>
        )}
      </div>
    );
  };

  return (
    <div ref={containerRef}>
      <div className="tw-relative tw-flex tw-flex-col tw-items-center tw-justify-around tw-bg-[#1e0039] lg:tw-flex-row">
        {filterTags.map((tag, index) => {
          const val = tag.name === 'Gender' ? selectedGender :
                      tag.name === 'Age Range' ? selectedAgeRange :
                      tag.name === 'Ethnicity' ? selectedEthnicity :
                      tag.name === 'Representation' ? selectedRepresentation :
                      tag.name === 'City' ? selectedCity :
                      tag.name === 'Country' ? selectedCountry : null;
          
          const isAllActorsActive = tag.name === 'All Actors' && !selectedGender && !selectedAgeRange && !selectedEthnicity && !selectedRepresentation && !selectedCity && !selectedCountry;

          return (
            <FilterButton
              key={index}
              name={tag.name}
              isActive={tag.name === 'All Actors' ? isAllActorsActive : tag.isActive}
              selectedValue={val}
            />
          );
        })}
      </div>
    </div>
  );
}