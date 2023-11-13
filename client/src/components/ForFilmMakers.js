import React from 'react'
import {useTranslation} from 'react-i18next';

const ForFilmMakers = () => {
  const { t } = useTranslation();
  return (
    <div className='tw-flex tw-h-screen tw-justify-center tw-items-center' >
    <p className="tw-text-4xl">{t('For Film Makers')}</p>
    </div>
  )
}

export default ForFilmMakers