/* eslint-disable no-unused-vars */
import React from 'react';
import { useTranslation } from 'react-i18next';
import UserDetailsEdit from "./UserDetailsEdit"; 
import { AGE_OPTIONS } from '../../../constants/AgeOptions';
import { ETHNICITY_OPTIONS } from '../../../constants/EthnicityOptions';

export default function UserDetails({ data, isEditMode, onChange, errors, clearError }) {
  const { t } = useTranslation();

  // Helper to keep the grid items consistent
  const DetailItem = ({ label, value }) => (
    <div className="tw-flex tw-flex-col tw-gap-2">
      <p className="tw-text-[10px] tw-text-[#AA8894] tw-uppercase tw-tracking-widest tw-font-bold">
        {t(label)}
      </p>
      <p className="tw-font-medium tw-text-base tw-text-white">
        {value || '-'}
      </p>
    </div>
  );

  // Helper to find the display label for read-only mode
  const getLabelFromOptions = (options, value) => {
    const match = options.find(opt => opt.value === value);
    return match ? match.label : value;
  };

  return (
    <section className="tw-w-full tw-bg-transparent tw-py-12">
      {/* 1280px and px-0 to match Hero edge */}
      <div className="tw-w-full tw-max-w-[1280px] tw-mx-auto tw-px-4 md:tw-px-0">
        
        {/* SECTION LABEL: Purple, aligned to far left edge */}
        <h2 className="tw-text-[#FF43A7] tw-text-[10px] tw-font-bold tw-uppercase tw-tracking-widest tw-mb-8">
          {t('Actor Details')}
        </h2>

        {/* GRID CONTENT: Indented by 10 units to match Name/Role indentation */}
        <div className="tw-pl-0 md:tw-pl-10">
          {isEditMode ? (
            <UserDetailsEdit data={data} onChange={onChange} errors={errors} clearError={clearError} />
          ) : (
            <div className="tw-grid tw-grid-cols-2 md:tw-grid-cols-4 tw-gap-y-10 tw-gap-x-8">
              <DetailItem label="Playing Gender" value={data?.gender} />
              <DetailItem label="Playing Age Range" value={getLabelFromOptions(AGE_OPTIONS, data?.ageRange)} />
              <DetailItem label="Ethnicity" value={getLabelFromOptions(ETHNICITY_OPTIONS, data?.ethnicity)} />
              <DetailItem label="Height" value={data?.height} />
              <DetailItem label="Hair Color" value={data?.hairColor} />
              <DetailItem label="Eye Color" value={data?.eyesColor} />
              <DetailItem label="Body Build" value={data?.bodyBuild} />
              <DetailItem 
                label="Has Representation" 
                value={data?.hasAgent === true ? t('Yes') : data?.hasAgent === false ? t('No') : '-'} 
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}