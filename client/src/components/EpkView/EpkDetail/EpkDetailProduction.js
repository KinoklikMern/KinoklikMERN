import React from 'react';
import { useTranslation } from 'react-i18next';
import EpkProductionDetailsEdit from "./EpkProductionDetailsEdit"; 


export default function EpkDetailProduction({ epkInfo, isEditMode, onChange }) {
  const { t } = useTranslation();

  return (
    <div className="tw-w-full tw-flex tw-flex-col tw-gap-6 tw-px-2 md:tw-px-0">
      <h2 className="tw-text-[#FF43A7] tw-text-[10px] tw-font-bold tw-uppercase tw-tracking-widest">Technical Specs</h2>
      <h1 className="tw-text-white tw-text-3xl md:tw-text-4xl tw-font-bold tw-tracking-tight tw-mb-2">Production Details</h1>
      
      {isEditMode ? (
        // --- EDIT MODE: Render the Form Component ---
        <EpkProductionDetailsEdit epkInfo={epkInfo} onChange={onChange} />
      ) : (
        // --- READ-ONLY MODE: Render the Text Grid ---
        <div className="tw-grid tw-grid-cols-2 md:tw-grid-cols-4 tw-gap-y-8 tw-gap-x-6">
          <div className="tw-flex tw-flex-col tw-gap-2">
            <p className="tw-text-[10px] tw-text-[#AA8894] tw-uppercase tw-tracking-widest tw-font-bold">{t('Production Year')}</p>
            <p className="tw-font-medium tw-text-base tw-text-white">{epkInfo?.productionYear || '-'}</p>
          </div>
          <div className="tw-flex tw-flex-col tw-gap-2">
            <p className="tw-text-[10px] tw-text-[#AA8894] tw-uppercase tw-tracking-widest tw-font-bold">{t('Studio')}</p>
            <p className="tw-font-medium tw-text-base tw-text-white">{epkInfo?.productionCo || '-'}</p>
          </div>
          <div className="tw-flex tw-flex-col tw-gap-2">
            <p className="tw-text-[10px] tw-text-[#AA8894] tw-uppercase tw-tracking-widest tw-font-bold">{t('Language')}</p>
            <p className="tw-font-medium tw-text-base tw-text-white">{epkInfo?.language || '-'}</p>
          </div>
          <div className="tw-flex tw-flex-col tw-gap-2">
            <p className="tw-text-[10px] tw-text-[#AA8894] tw-uppercase tw-tracking-widest tw-font-bold">{t('Budget (USD)')}</p>
            <p className="tw-font-medium tw-text-base tw-text-white">{epkInfo?.budget || '-'}</p>
          </div>
          <div className="tw-flex tw-flex-col tw-gap-2">
            <p className="tw-text-[10px] tw-text-[#AA8894] tw-uppercase tw-tracking-widest tw-font-bold">{t('Duration')}</p>
            <p className="tw-font-medium tw-text-base tw-text-white">{epkInfo?.durationMin ? `${epkInfo.durationMin} min` : '-'}</p>
          </div>
          <div className="tw-flex tw-flex-col tw-gap-2">
            <p className="tw-text-[10px] tw-text-[#AA8894] tw-uppercase tw-tracking-widest tw-font-bold">{t('Production Type')}</p>
            <p className="tw-font-medium tw-text-base tw-text-white">{epkInfo?.production_type || '-'}</p>
          </div>
          <div className="tw-flex tw-flex-col tw-gap-2">
            <p className="tw-text-[10px] tw-text-[#AA8894] tw-uppercase tw-tracking-widest tw-font-bold">{t('Genre')}</p>
            <p className="tw-font-medium tw-text-base tw-text-white tw-capitalize">{epkInfo?.genre || '-'}</p>
          </div>
          <div className="tw-flex tw-flex-col tw-gap-2">
            <p className="tw-text-[10px] tw-text-[#AA8894] tw-uppercase tw-tracking-widest tw-font-bold">{t('Status')}</p>
            <p className="tw-font-medium tw-text-base tw-text-white">{epkInfo?.status || '-'}</p>
          </div>
          
        </div>
      )}
    </div>
  );
}