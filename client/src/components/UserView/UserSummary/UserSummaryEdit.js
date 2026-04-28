/* UserSummaryEdit.js */
import React from 'react';

export default function UserSummaryEdit({ data, onChange, errors = {}, clearError }) {
  
  const handleChange = (field, value) => {
    onChange(field, value);
    if (errors[field] && clearError) {
      clearError(field);
    }
  };

  return (
    <div className="tw-flex tw-flex-col tw-gap-6 tw-w-full">
      {/* NAME INPUTS */}
      <div className="tw-flex tw-flex-col sm:tw-flex-row tw-gap-3">
        <div className="tw-flex-1">
          <input
            type="text"
            value={data?.firstName || ''}
            onChange={(e) => handleChange('firstName', e.target.value)}
            placeholder="First name"
            className={`tw-w-full tw-bg-[#280D41] tw-border tw-rounded-lg tw-px-4 tw-py-2 tw-text-white tw-font-bold tw-text-xl tw-outline-none tw-transition-colors ${
              errors.firstName ? 'tw-border-red-500' : 'tw-border-[#5A3F49] focus:tw-border-[#FF43A7]'
            }`}
          />
          {errors.firstName && <p className="tw-text-red-500 tw-text-[10px] tw-mt-1 tw-uppercase tw-font-bold">Required</p>}
        </div>

        <div className="tw-flex-1">
          <input
            type="text"
            value={data?.lastName || ''}
            onChange={(e) => handleChange('lastName', e.target.value)}
            placeholder="Last name"
            className={`tw-w-full tw-bg-[#280D41] tw-border tw-rounded-lg tw-px-4 tw-py-2 tw-text-white tw-font-bold tw-text-xl tw-outline-none tw-transition-colors ${
              errors.lastName ? 'tw-border-red-500' : 'tw-border-[#5A3F49] focus:tw-border-[#FF43A7]'
            }`}
          />
          {errors.lastName && <p className="tw-text-red-500 tw-text-[10px] tw-mt-1 tw-uppercase tw-font-bold">Required</p>}
        </div>
      </div>

      {/* SUMMARY TEXTAREA */}
      <div className="tw-w-full">
        <textarea
          value={data?.summary || ""}
          onChange={(e) => handleChange("summary", e.target.value)}
          maxLength={150}
          placeholder="Professional tagline or summary..."
          className={`tw-w-full tw-bg-transparent tw-border-l-2 tw-pl-6 tw-py-1 tw-text-[#E2BDC9] tw-text-xl md:tw-text-2xl tw-italic tw-outline-none tw-resize-none ${
            errors.summary ? 'tw-border-red-500' : 'tw-border-[#FF43A7]/30 focus:tw-border-[#FF43A7]'
          }`}
          rows={2}
        />
        <div className="tw-flex tw-justify-between tw-mt-1">
          {errors.summary ? (
            <p className="tw-text-red-500 tw-text-[10px] tw-uppercase tw-font-bold">Invalid Summary</p>
          ) : <span />}
          <span className="tw-text-[10px] tw-text-[#5A3F49] tw-uppercase">
            {data?.summary?.length || 0} / 150
          </span>
        </div>
      </div>
    </div>
  );
}