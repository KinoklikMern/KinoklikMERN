/* eslint-disable no-unused-vars */
import React from 'react';
import { useTranslation } from 'react-i18next';
import CustomSelect from '../../EpkView/EpkDetail/CustomSelect';

import { AGE_OPTIONS } from '../../../constants/AgeOptions';
import { ETHNICITY_OPTIONS } from '../../../constants/EthnicityOptions';
import { GENDER_OPTIONS } from '../../../constants/GenderOptions';

const HAIR_COLORS = ["Black", "Brown", "Chestnut", "Blonde", "Auburn", "Red", "Grey", "Salt & Pepper", "White", "Bald"];
const EYE_COLORS = ["Black", "Brown", "Blue", "Hazel", "Green", "Grey", "Amber", "Violet"];
const BODY_BUILDS = ["Slim", "Medium", "Athletic", "Average", "Curvy", "Muscular", "Large"];
const REPRESENTATION_OPTIONS = [
  { value: true, label: "Yes" },
  { value: false, label: "No" }
];

const generateHeights = () => {
  const heights = [{ value: "< 4'10\"", label: "< 4'10\"" }];
  
  let totalInches = (4 * 12) + 10;
  const maxInches = (6 * 12) + 6;

  while (totalInches <= maxInches) {
    const ft = Math.floor(totalInches / 12);
    const inch = totalInches % 12;
    const label = `${ft}'${inch}"`;
    heights.push({ value: label, label: label });
    totalInches += 2;
  }

  heights.push({ value: "> 6'7\"", label: "> 6'7\"" });
  return heights;
};

const HEIGHT_OPTIONS = generateHeights();

export default function UserDetailsEdit({ data, onChange, errors, clearError }) {
  const { t } = useTranslation();

  const EditLabel = ({ title }) => (
    <p className="tw-text-[10px] tw-text-[#AA8894] tw-uppercase tw-tracking-widest tw-font-bold">
      {t(title)}
    </p>
  );

  // Helper for rendering the select columns
  const SelectField = ({ label, field, options, placeholder }) => (
    <div className="tw-flex tw-flex-col tw-gap-2">
      <EditLabel title={label} />
      <CustomSelect 
        value={data?.[field] || ''} 
        onChange={(val) => {
          onChange(field, val);
          if (errors?.[field]) clearError(field);
        }} 
        options={options}
        placeholder={t(placeholder)}
        error={errors?.[field]}
      />
    </div>
  );

  return (
    <div className="tw-grid tw-grid-cols-2 md:tw-grid-cols-4 tw-gap-y-8 tw-gap-x-6">
      
      <SelectField 
        label="Playing Gender" 
        field="gender" 
        options={GENDER_OPTIONS}
        placeholder="Select playing gender"
      />

      <SelectField 
        label="Age Range" 
        field="ageRange" 
        options={AGE_OPTIONS}
        placeholder="Select playing age"
      />

      <SelectField 
        label="Ethnicity" 
        field="ethnicity" 
        options={ETHNICITY_OPTIONS.map(e => ({ value: e, label: t(e) }))}
        placeholder="Select playing ethnicity"
      />

      <SelectField 
        label="Height" 
        field="height" 
        options={HEIGHT_OPTIONS}
        placeholder="Select Height"
      />

      <SelectField 
        label="Hair Color" 
        field="hairColor" 
        options={HAIR_COLORS.map(h => ({ value: h, label: t(h) }))}
        placeholder="Select Hair"
      />

      <SelectField 
        label="Eye Color" 
        field="eyesColor" 
        options={EYE_COLORS.map(e => ({ value: e, label: t(e) }))}
        placeholder="Select Eyes"
      />

      <SelectField 
        label="Body Build" 
        field="bodyBuild" 
        options={BODY_BUILDS.map(b => ({ value: b, label: t(b) }))}
        placeholder="Select Build"
      />

      <SelectField 
        label="Has Representation" 
        field="hasAgent" 
        options={REPRESENTATION_OPTIONS.map(opt => ({ 
            value: opt.value, 
            label: t(opt.label) 
        }))}
        placeholder="Select Status"
      />
    </div>
  );
}