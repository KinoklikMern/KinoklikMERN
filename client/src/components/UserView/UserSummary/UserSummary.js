import React from 'react';
import { useTranslation } from 'react-i18next';
import UserSummaryEdit from './UserSummaryEdit';
import UserSocialAction from '../UserSocialAction/UserSocialAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

export default function UserSummary({ data, isEditMode, onChange, openRecommendModal }) {
  const { t } = useTranslation();
  const location = data?.city && data?.country ? `${data.city}, ${data.country}` : data?.city || data?.country || '';

  return (
    <div className="tw-bg-[#1E0039] tw-w-full tw-pt-10 tw-pb-8">
      {/* 1280px Container - Aligned with Hero */}
      <div className="tw-w-full tw-max-w-[1280px] tw-mx-auto tw-px-4 md:tw-px-0">
        
        {/* CATEGORY LABEL: Purple, Far Left Edge */}
        <h2 className="tw-text-[#FF43A7] tw-text-[10px] tw-font-bold tw-uppercase tw-tracking-widest tw-mb-6">
          {t('Summary')}
        </h2>

        {/* INDENTED CONTENT: Pushed right by 10 units */}
        <div className="tw-pl-0 md:tw-pl-10">
          {isEditMode ? (
            <UserSummaryEdit data={data} onChange={onChange} />
          ) : (
            <div className="tw-flex tw-flex-col tw-gap-6">
              {/* Top Section: Name and Socials */}
              <div className="tw-flex tw-flex-col md:tw-flex-row tw-w-full tw-justify-between tw-items-center md:tw-items-end">
                <div className="tw-flex tw-flex-col tw-items-center md:tw-items-start">
                  <h1 className="tw-text-white tw-text-3xl md:tw-text-4xl tw-font-bold tw-m-0">
                    {data?.firstName} {data?.lastName}
                  </h1>

                  <div className="tw-flex tw-flex-wrap tw-items-center tw-justify-center md:tw-justify-start tw-gap-3 tw-mt-2">
                    <span className="tw-text-[#FF43A7] tw-text-xs tw-font-bold tw-uppercase tw-tracking-widest tw-bg-[#FF43A7]/10 tw-px-3 tw-py-1 tw-rounded-full">
                      {data?.role || 'Cinephile'}
                    </span>
                    {location && (
                      <span className="tw-flex tw-items-center tw-gap-1.5 tw-text-[#E2BDC9] tw-text-sm">
                        <FontAwesomeIcon icon={faMapMarkerAlt} className="tw-text-[#FF43A7] tw-text-xs" />
                        {location}
                      </span>
                    )}
                  </div>
                </div>

                <div className="tw-mt-6 md:tw-mt-0">
                  <UserSocialAction data={data} openRecommendModal={openRecommendModal} />
                </div>
              </div>

              {/* Bottom Section: Bio Quote */}
              {data?.summary && (
                <p className="tw-text-[#E2BDC9] tw-text-2xl md:tw-text-3xl tw-italic tw-m-0 tw-leading-relaxed tw-opacity-90 tw-max-w-4xl">
                  {`"${data.summary}"`}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}