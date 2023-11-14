import React from "react";
import {useTranslation} from 'react-i18next';

const ForIndustryProf = () => {
  const { t } = useTranslation();
  return (
    <div className='tw-flex tw-h-screen tw-justify-center tw-items-center' >
      <p className="tw-text-4xl">{t('For Industry Professionals')}</p>

    </div>
  );
};

export default ForIndustryProf;
