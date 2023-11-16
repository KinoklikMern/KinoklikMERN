import React from "react";
import ResourceCard from "./ResourceCard";
import { useTranslation } from 'react-i18next';

export default function EpkResources({ epkInfo }) {
  const { t } = useTranslation();

  return (
    epkInfo.resources.length !== 0 && (
      <div className='tw-my-3 tw-rounded-lg tw-bg-white tw-p-3'>
        <p className='tw-text-center tw-text-3xl tw-font-bold tw-text-[#1E0039]'>
          {t('RESOURCES NEEDED')}
        </p>
        {epkInfo.resources.map((resource) => (
          <ResourceCard key={resource._id} resourceInfo={resource} />
        ))}
      </div>
    )
  );
}
