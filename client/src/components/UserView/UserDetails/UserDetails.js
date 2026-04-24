/* eslint-disable no-unused-vars */
import React from 'react';
import { useTranslation } from 'react-i18next';
import UserDetailsEdit from "./UserDetailsEdit"; 
import { AGE_OPTIONS } from '../../../constants/AgeOptions';
import { ETHNICITY_OPTIONS } from '../../../constants/EthnicityOptions';

export default function UserDetails({ data, isEditMode, onChange, errors, clearError }) {
  const { t } = useTranslation();

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

  const getDisplayValue = (options, dbValue) => {
    if (dbValue === undefined || dbValue === null || dbValue === '') {
      return '-';
    }
    const searchVal = String(dbValue);
    const match = options.find(opt => String(opt.value) === searchVal);

    if (match) {
      return t(match.label);
    }

    return String(dbValue);
  };

  return (
    <section className="tw-w-full tw-bg-transparent tw-py-12">
      <div className="tw-w-full tw-max-w-[1280px] tw-mx-auto tw-px-4 md:tw-px-0">
        
        <h2 className="tw-text-[#FF43A7] tw-text-[10px] tw-font-bold tw-uppercase tw-tracking-widest tw-mb-8">
          {t('Actor Details')}
        </h2>

        <div className="tw-pl-0 md:tw-pl-10">
          {isEditMode ? (
            <UserDetailsEdit data={data} onChange={onChange} errors={errors} clearError={clearError} />
          ) : (
            <div className="tw-grid tw-grid-cols-2 md:tw-grid-cols-4 tw-gap-y-10 tw-gap-x-8">
              <DetailItem label="Playing Gender" value={t(data?.gender)} />
              <DetailItem label="Playing Age Range" value={getDisplayValue(AGE_OPTIONS, data?.age)} />
              <DetailItem label="Ethnicity" value={getDisplayValue(ETHNICITY_OPTIONS, data?.ethnicity)} />              
              <DetailItem label="Height" value={data?.height} />
              <DetailItem label="Hair Color" value={t(data?.hairColor)} />
              <DetailItem label="Eye Color" value={t(data?.eyesColor)} />
              <DetailItem label="Body Build" value={t(data?.bodyBuild)} />              
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