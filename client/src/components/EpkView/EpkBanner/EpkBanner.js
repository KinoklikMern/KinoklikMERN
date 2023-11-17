import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Banner = () => {
  const { t } = useTranslation();

    return (
      <div className='tw-bg-white tw-flex tw-items-center tw-justify-center tw-border-2 tw-border-gray-400 tw-w-[100%] tw-p-4 tw-mx-auto  tw-mt-10 tw-mb-10'>
        <p className='tw-pt-2 tw-text-center  tw-font-bold tw-text-[#1E0039]'>
          {t('Present your film like a PRO, for FREE with KinoKlik EPK!')}
        </p>
        <Link to="/uploadFepk" className='tw-ml-8'>
        <button className='tw-bg-[#4b015e] tw-text-white tw-uppercase tw-font-bold tw-py-2 tw-px-8 tw-rounded tw-ml-8'>
          {t('CREATE EPK')}
        </button>
        </Link>
      </div>
    );
  };

  export default Banner;

  