/* UserSummaryEdit.js */
import React from 'react';

export default function UserSummaryEdit({ data, onChange }) {
  return (
    <div className="tw-flex tw-flex-col tw-gap-6 tw-w-full">
      {/* NAME INPUTS */}
      <div className="tw-flex tw-flex-col sm:tw-flex-row tw-gap-3">
        <input
          type="text"
          value={data?.firstName || ''}
          onChange={(e) => onChange('firstName', e.target.value)}
          placeholder="First name"
          className="tw-bg-[#280D41] tw-border tw-border-[#5A3F49] focus:tw-border-[#FF43A7] tw-rounded-lg tw-px-4 tw-py-2 tw-text-white tw-font-bold tw-text-xl tw-outline-none tw-transition-colors tw-flex-1"
        />
        <input
          type="text"
          value={data?.lastName || ''}
          onChange={(e) => onChange('lastName', e.target.value)}
          placeholder="Last name"
          className="tw-bg-[#280D41] tw-border tw-border-[#5A3F49] focus:tw-border-[#FF43A7] tw-rounded-lg tw-px-4 tw-py-2 tw-text-white tw-font-bold tw-text-xl tw-outline-none tw-transition-colors tw-flex-1"
        />
      </div>

      {/* SUMMARY TEXTAREA */}
      <div className="tw-w-full">
        <textarea
          value={data?.summary || ""}
          onChange={(e) => onChange("summary", e.target.value)}
          maxLength={150}
          placeholder="Professional tagline or summary..."
          className="tw-w-full tw-bg-transparent tw-border-l-2 tw-border-[#FF43A7]/30 focus:tw-border-[#FF43A7] tw-pl-6 tw-py-1 tw-text-[#E2BDC9] tw-text-xl md:tw-text-2xl tw-italic tw-outline-none tw-resize-none"
          rows={2}
        />
      </div>
    </div>
  );
}