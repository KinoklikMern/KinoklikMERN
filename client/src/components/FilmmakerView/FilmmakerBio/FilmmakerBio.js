import React from 'react';

export default function FilmmakerBio({ filmmakerInfo, isEditMode, onChange, errors }) {
  const bioLength = filmmakerInfo?.aboutMe?.length || 0;

  return (
    <div className="tw-w-full tw-px-6 md:tw-px-12 tw-py-10 tw-border-t tw-border-[#5A3F49]/30">
      <h2 className="tw-text-[#FF43A7] tw-text-xs tw-font-bold tw-uppercase tw-tracking-widest tw-mb-6">
        Biography
      </h2>

      {isEditMode ? (
        <div>
          <textarea
            value={filmmakerInfo?.aboutMe || ''}
            onChange={(e) => onChange('aboutMe', e.target.value)}
            placeholder="Write about yourself — your background, approach to filmmaking, achievements, and what drives your creative vision..."
            className={`tw-w-full tw-min-h-[180px] tw-bg-[#280D41] tw-border ${errors?.aboutMe ? 'tw-border-red-500' : 'tw-border-[#5A3F49]'} focus:tw-border-[#FF43A7] tw-rounded-xl tw-px-5 tw-py-4 tw-text-white tw-text-base tw-leading-relaxed tw-outline-none tw-transition-colors tw-resize-y custom-scrollbar`}
          />
          <div className="tw-flex tw-justify-between tw-mt-1.5">
            <span>{errors?.aboutMe && <span className="tw-text-red-400 tw-text-xs">{errors.aboutMe}</span>}</span>
            <span className={`tw-text-xs ${bioLength > 2000 ? 'tw-text-red-400' : 'tw-text-[#5A3F49]'}`}>{bioLength}/2000</span>
          </div>
        </div>
      ) : filmmakerInfo?.aboutMe ? (
        <p className="tw-text-[#E2BDC9] tw-text-base tw-leading-relaxed tw-max-w-4xl tw-m-0">
          {filmmakerInfo.aboutMe}
        </p>
      ) : (
        <p className="tw-text-[#5A3F49] tw-text-base tw-italic tw-m-0">No biography added yet.</p>
      )}
    </div>
  );
}
