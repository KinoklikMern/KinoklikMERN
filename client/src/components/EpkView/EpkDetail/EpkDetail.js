import React from 'react';
import EpkDetailCastAndCrew from './EpkDetailCastAndCrew';
import EpkDetailProduction from './EpkDetailProduction';

export default function EpkDetail({ epkInfo, isEditMode, onChange, errors, clearError }) {
  return (
    <div className="tw-flex tw-flex-col tw-gap-16 tw-w-full tw-max-w-[1232px] tw-mx-auto tw-py-8">
      
      {/* SECTION 1: CAST & CREW */}
      <EpkDetailCastAndCrew 
        epkInfo={epkInfo} 
        isEditMode={isEditMode} 
        onChange={onChange}
      />

      {/* SECTION 2: PRODUCTION DETAILS */}
      <EpkDetailProduction 
        epkInfo={epkInfo} 
        isEditMode={isEditMode} 
        onChange={onChange} 
        errors={errors}
        clearError={clearError}
      />

    </div>
  );
}