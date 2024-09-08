import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import locationData from './Profile.json';

const LocationSelects = ({
  userProfileData,
  handleProfileChange,
  validationErrors,
}) => {
  const { t } = useTranslation();
  const [countries, setCountries] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    setCountries(locationData.countries.map((country) => country.name));
  }, []);

  useEffect(() => {
    if (userProfileData.country) {
      const selectedCountry = locationData.countries.find(
        (c) => c.name === userProfileData.country
      );
      if (selectedCountry) {
        setProvinces(selectedCountry.provinces || selectedCountry.states || []);
        setCities([]);
      }
    } else {
      setProvinces([]);
      setCities([]);
    }
  }, [userProfileData.country]);

  useEffect(() => {
    if (userProfileData.province) {
      const selectedCountry = locationData.countries.find(
        (c) => c.name === userProfileData.country
      );
      if (selectedCountry) {
        const selectedProvince = (
          selectedCountry.provinces ||
          selectedCountry.states ||
          []
        ).find((p) => p.name === userProfileData.province);
        if (selectedProvince) {
          setCities(selectedProvince.cities || []);
        }
      }
    } else {
      setCities([]);
    }
  }, [userProfileData.country, userProfileData.province]);

  return (
    <>
      <select
        name="country"
        value={userProfileData.country}
        onChange={handleProfileChange}
        className="tw-my-2 tw-h-10 tw-w-full tw-rounded-lg tw-border-2 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] placeholder:tw-text-slate-400 lg:tw-w-3/4"
      >
        <option value="">{t('Select Country')}</option>
        {countries.map((country) => (
          <option key={country} value={country}>
            {t(country)}
          </option>
        ))}
        <option value="Other">{t('Other')}</option>
      </select>

      <select
        name="province"
        value={userProfileData.province}
        onChange={handleProfileChange}
        className="tw-my-2 tw-h-10 tw-w-full tw-rounded-lg tw-border-2 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] placeholder:tw-text-slate-400 lg:tw-w-3/4"
      >
        <option value="">{t('Select Province')}</option>
        {provinces.map((province) => (
          <option key={province.name} value={province.name}>
            {t(province.name)}
          </option>
        ))}
        <option value="Other">{t('Other')}</option>
      </select>
      {validationErrors.province && (
        <div className="tw-text-red-500">{validationErrors.province}</div>
      )}

      <select
        name="city"
        value={userProfileData.city}
        onChange={handleProfileChange}
        className="tw-my-2 tw-h-10 tw-w-full tw-rounded-lg tw-border-2 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] placeholder:tw-text-slate-400 lg:tw-w-3/4"
      >
        <option value="">{t('Select City')}</option>
        {cities.map((city) => (
          <option key={city} value={city}>
            {t(city)}
          </option>
        ))}
        <option value="Other">{t('Other')}</option>
      </select>
    </>
  );
};

export default LocationSelects;
