import React from "react";
import ResourceCard from "./ResourceCard";
import { useTranslation } from 'react-i18next';

export default function EpkResources({ epkInfo }) {
  const { t } = useTranslation();

  return (
    epkInfo.resources.length !== 0 && (
      <>
        <div className="tw-text-white tw-flex tw-justify-center tw-mt-4 tw-mb-4"> {/* Added top and bottom margin */}
          <span className="tw-text-[2rem] tw-font-semibold"> 
            {t('Resources Needed')} {/* Title */}
          </span>
        </div>


      <div className='tw-my-3 tw-rounded-lg tw-bg-white tw-p-3'>
        {epkInfo.resources.map((resource) => (
          <ResourceCard
            key={resource._id}
            resourceInfo={resource}
            fepkTitle={epkInfo.title}
          />
        ))}
      </div>
      </>
    )
  );
}
