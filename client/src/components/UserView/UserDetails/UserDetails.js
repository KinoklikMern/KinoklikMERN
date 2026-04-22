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
// --- GENERATE HEIGHTS (3'0" to 7'6") ---
const generateHeights = () => {
  const heights = [];
  for (let feet = 3; feet <= 7; feet++) {
    for (let inches = 0; inches <= 11; inches++) {
      if (feet === 7 && inches > 6) break;
      const label = `${feet}'${inches}"`;
      heights.push({ value: label, label: label });
    }
  }
  return heights;
};

const HEIGHT_OPTIONS = generateHeights();

export default function UserDetailsEdit({ data, onChange, errors, clearError }) {
  const { t } = useTranslation();

  // Field helper to reduce repetitive JSX
  const Label = ({ title, required }) => (
    <p className="tw-text-[10px] tw-text-[#AA8894] tw-uppercase tw-tracking-widest tw-font-bold">
      {t(title)} {required && <span className="tw-text-[#FF43A7]">*</span>}
    </p>
  );

  return (
    <div className="tw-grid tw-grid-cols-2 md:tw-grid-cols-4 tw-gap-y-8 tw-gap-x-6">
      
      {/* PLAYING GENDER */}
      <div className="tw-flex tw-flex-col tw-gap-2">
        <Label title="Playing Gender" />
        <CustomSelect 
          value={data?.gender || ''} 
          onChange={(val) => onChange('gender', val)} 
          options={GENDER_OPTIONS.map(g => ({ value: g, label: t(g) }))}
          placeholder={t('Select Gender')}
        />
      </div>

      {/* AGE RANGE */}
      <div className="tw-flex tw-flex-col tw-gap-2">
        <Label title="Age Range" />
        <CustomSelect 
          value={data?.ageRange || ''} 
          onChange={(val) => onChange('ageRange', val)} 
          options={AGE_OPTIONS}
          placeholder={t('Select Age')}
        />
      </div>

      {/* ETHNICITY */}
      <div className="tw-flex tw-flex-col tw-gap-2">
        <Label title="Ethnicity" />
        <CustomSelect 
          value={data?.ethnicity || ''} 
          onChange={(val) => onChange('ethnicity', val)} 
          options={ETHNICITY_OPTIONS.map(e => ({ value: e, label: t(e) }))}
          placeholder={t('Select Ethnicity')}
        />
      </div>

      {/* HEIGHT (Dropdown Version) */}
      <div className="tw-flex tw-flex-col tw-gap-2">
        <Label title="Height" />
        <CustomSelect 
          value={data?.height || ''} 
          onChange={(val) => onChange('height', val)} 
          options={HEIGHT_OPTIONS}
          placeholder={t('Select Height')}
        />
      </div>

      {/* HAIR COLOR */}
      <div className="tw-flex tw-flex-col tw-gap-2">
        <Label title="Hair Color" />
        <CustomSelect 
          value={data?.hairColor || ''} 
          onChange={(val) => onChange('hairColor', val)} 
          options={HAIR_COLORS.map(h => ({ value: h, label: t(h) }))}
          placeholder={t('Select Hair')}
        />
      </div>

      {/* EYE COLOR */}
      <div className="tw-flex tw-flex-col tw-gap-2">
        <Label title="Eye Color" />
        <CustomSelect 
          value={data?.eyesColor || ''} 
          onChange={(val) => onChange('eyesColor', val)} 
          options={EYE_COLORS.map(e => ({ value: e, label: t(e) }))}
          placeholder={t('Select Eyes')}
        />
      </div>

      {/* BODY BUILD */}
      <div className="tw-flex tw-flex-col tw-gap-2">
        <Label title="Body Build" />
        <CustomSelect 
          value={data?.bodyBuild || ''} 
          onChange={(val) => onChange('bodyBuild', val)} 
          options={BODY_BUILDS.map(b => ({ value: b, label: t(b) }))}
          placeholder={t('Select Build')}
        />
      </div>

    </div>
  );
}