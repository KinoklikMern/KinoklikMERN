import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Country, State, City } from 'country-state-city';

const LocationSelects = ({
  userProfileData,
  handleProfileChange,
  validationErrors,
}) => {
  const { t } = useTranslation();

  const ukNations = ["England", "Scotland", "Wales", "Northern Ireland"];
  const isUkNation = ukNations.includes(userProfileData.country);
  const countryCode = isUkNation ? "GB" : Country.getAllCountries().find(c => c.name === userProfileData.country)?.isoCode;

  const selectedStateObj = countryCode 
  ? State.getStatesOfCountry(countryCode).find(s => {
      const searchName = userProfileData.province === "Rest of England" ? "England" : userProfileData.province;
      return s.name === searchName;
    }) 
  : null;

  const stateCode = selectedStateObj?.isoCode;

  const popularCountries = ["US", "CA", "GB", "AU", "DE", "FR", "IE", "CN", "JP", 
    "MX", "ES", "IT", "KR", "NZ", "NG", "HK"
  ];
  
  const londonBoroughs = [
    "Barking and Dagenham", "Barnet", "Bexley", "Brent", "Bromley", "Camden", "Croydon", 
    "Ealing", "Enfield", "Greenwich", "Hackney", "Hammersmith and Fulham", "Haringey", 
    "Harrow", "Havering", "Hillingdon", "Hounslow", "Islington", "Kensington and Chelsea", 
    "Kingston upon Thames", "Lambeth", "Lewisham", "Merton", "Newham", "Redbridge", 
    "Richmond upon Thames", "Southwark", "Sutton", "Tower Hamlets", "Waltham Forest", 
    "Wandsworth", "Westminster"
  ];
  const isGreaterLondon = userProfileData.province === "Greater London";
  const canSelectCity = isGreaterLondon || (stateCode && countryCode);

  const allCountries = Country.getAllCountries().filter(c => c.isoCode !== "GB");
  const priorityCountries = allCountries.filter(c => popularCountries.includes(c.isoCode));
  const otherCountries = allCountries.filter(c => !popularCountries.includes(c.isoCode));

  const getFilteredStates = (countryCode, selectedCountryName) => {
    const states = State.getStatesOfCountry(countryCode);
  
    if (countryCode === "US") {
      const excluded = [
      "AS", "GU", "MP", "PR", "VI", "UM",
      "UM-67", "UM-71", "UM-76", "UM-79", "UM-81", "UM-84", "UM-86", "UM-89", "UM-95"
      ];

      return states.filter(s => !excluded.includes(s.isoCode));
    }

    if (ukNations.includes(selectedCountryName)) {
      if (selectedCountryName === "England") {
        return [
          { name: "Rest of England", isoCode: "GB-ENG" },
          { name: "Greater London", isoCode: "LND" }
        ];
      }
      return states.filter(s => s.name === selectedCountryName);
    }
      
      return states;
  };

  const getProvinceLabel = (countryCode) => {
    switch (countryCode) {
      case "US": return t("State");
      case "CA": return t("Province");
      case "AU": return t("State");
      default: return t("Region");
    }
  };

  useEffect(() => {
    if (isUkNation && userProfileData.country !== "England") {
      const filtered = getFilteredStates(countryCode, userProfileData.country);
      
      if (filtered.length === 1 && userProfileData.province !== filtered[0].name) {
        handleProfileChange({
          target: { name: 'province', value: filtered[0].name }
        });
      }
    }
  }, [userProfileData.country]);

  return (
    <>
      <select
        name="country"
        value={userProfileData.country || ""}
        onChange={handleProfileChange}
        className="tw-my-2 tw-h-10 tw-w-full tw-rounded-lg tw-border-2 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] placeholder:tw-text-slate-400 lg:tw-w-3/4"
      >
      <option value="">{t('Select Country')}</option>
      
      <optgroup label="Major Industry Hubs">
        {priorityCountries.map(c => (
          <option key={c.isoCode} value={c.name}>{t(c.name)}</option>
        ))}
        {ukNations.map(name => (
          <option key={name} value={name}>{t(name)}</option>
        ))}
      </optgroup>

      <optgroup label="All Countries">
        {otherCountries.map(c => (
          <option key={c.isoCode} value={c.name}>{t(c.name)}</option>
        ))}
      </optgroup>
      </select>

      <select
        name="province"
        value={userProfileData.province || ""} 
        onChange={handleProfileChange}
        disabled={!countryCode}
        className="tw-my-2 tw-h-10 tw-w-full tw-rounded-lg tw-border-2 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] placeholder:tw-text-slate-400 lg:tw-w-3/4"
      >
        <option 
          value="">{t('Select')} {getProvinceLabel(countryCode)}
        </option>

        {countryCode && getFilteredStates(countryCode, userProfileData.country).map(s => (
          <option key={s.isoCode} value={s.name}>
            {t(s.name)}
          </option>
        ))}
      </select>

      <select
        name="city"
        value={userProfileData.city || ""}
        onChange={handleProfileChange}
        disabled={!canSelectCity} 
        className="tw-my-2 tw-h-10 tw-w-full tw-rounded-lg tw-border-2 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] placeholder:tw-text-slate-400 lg:tw-w-3/4"
      >
        <option 
          value="">{t('Select City')}
        </option>

        {isGreaterLondon ? (
          londonBoroughs.map(borough => (
            <option key={borough} value={borough}>{t(borough)}</option>
          ))
        ) : (
          countryCode && stateCode && City.getCitiesOfState(countryCode, stateCode).map(city => (
            <option key={city.name} value={city.name}>{t(city.name)}</option>
          ))
        )}
      </select>
    </>
  );
};

export default LocationSelects;