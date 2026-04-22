/* eslint-disable no-unused-vars */
import React from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import UserSocialAction from "../UserSocialAction/UserSocialAction";

export default function UserSummary({ data, isEditMode, onChange, openRecommendModal }) {
  const user = useSelector((state) => state.user);
  const userId = user?.id || '0';
  const isOwnPage = String(userId) === String(data?._id);
  
  const location = [data?.city, data?.province, data?.country]
    .filter(Boolean)
    .join(', ');

  return (
   <div className="tw-flex tw-flex-col md:tw-flex-row tw-w-full tw-justify-between tw-items-center md:tw-items-end tw-gap-8 md:tw-gap-0">
      
      <div className="tw-w-full tw-max-w-[1440px] tw-mx-auto tw-flex tw-flex-col tw-px-4 lg:tw-px-16 tw-gap-4">
        <h2 className="tw-text-[#FF43A7] tw-text-[10px] tw-font-bold tw-uppercase tw-tracking-widest tw-mb-0">
          Summary
        </h2>

        {/* TOP ROW: Name/Location and Social Actions */}
        <div className="tw-flex tw-flex-col md:tw-flex-row tw-justify-between tw-items-start md:tw-items-end tw-gap-6">
          
          <div className="tw-flex tw-flex-col tw-gap-2">
            {isEditMode ? (
              <div className="tw-flex tw-flex-col sm:tw-flex-row tw-gap-3 tw-mb-1">
                <input
                  type="text"
                  value={data?.firstName || ''}
                  onChange={(e) => onChange('firstName', e.target.value)}
                  placeholder="First name"
                  className="tw-bg-[#280D41] tw-border tw-border-[#5A3F49] focus:tw-border-[#FF43A7] tw-rounded-lg tw-px-3 tw-py-2 tw-text-white tw-font-bold tw-text-xl tw-outline-none"
                />
                <input
                  type="text"
                  value={data?.lastName || ''}
                  onChange={(e) => onChange('lastName', e.target.value)}
                  placeholder="Last name"
                  className="tw-bg-[#280D41] tw-border tw-border-[#5A3F49] focus:tw-border-[#FF43A7] tw-rounded-lg tw-px-3 tw-py-2 tw-text-white tw-font-bold tw-text-xl tw-outline-none"
                />
              </div>
            ) : (
              <h1 className="tw-text-white tw-text-3xl md:tw-text-4xl tw-font-bold tw-m-0">
                {data?.firstName} {data?.lastName}
              </h1>
            )}

            <div className="tw-flex tw-flex-wrap tw-items-center tw-gap-3">
              <span className="tw-text-[#FF43A7] tw-text-xs tw-font-bold tw-uppercase tw-tracking-widest tw-bg-[#FF43A7]/10 tw-px-3 tw-py-1 tw-rounded-full">
                {data?.role || 'Cinephile'}
              </span>

              {isEditMode ? (
                <div className="tw-flex tw-gap-2">
                  <input
                    type="text"
                    value={data?.city || ''}
                    onChange={(e) => onChange('city', e.target.value)}
                    placeholder="City"
                    className="tw-bg-[#280D41] tw-border tw-border-[#5A3F49] focus:tw-border-[#FF43A7] tw-rounded-lg tw-px-2 tw-py-1 tw-text-[#E2BDC9] tw-text-sm tw-outline-none tw-w-28"
                  />
                  <input
                    type="text"
                    value={data?.country || ''}
                    onChange={(e) => onChange('country', e.target.value)}
                    placeholder="Country"
                    className="tw-bg-[#280D41] tw-border tw-border-[#5A3F49] focus:tw-border-[#FF43A7] tw-rounded-lg tw-px-2 tw-py-1 tw-text-[#E2BDC9] tw-text-sm tw-outline-none tw-w-28"
                  />
                </div>
              ) : location ? (
                <span className="tw-flex tw-items-center tw-gap-1.5 tw-text-[#E2BDC9] tw-text-sm">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="tw-text-[#FF43A7] tw-text-xs" />
                  {location}
                </span>
              ) : null}
            </div>
          </div>

          {/* Social Icons Wrapper */}
          {!isEditMode && (
              <div className="tw-w-full md:tw-w-auto tw-flex tw-justify-center md:tw-justify-end">
                <div className="tw-flex tw-items-center tw-justify-center tw-gap-6">
                  <UserSocialAction 
                    data={data} 
                    isEditMode={isEditMode} 
                    openRecommendModal={openRecommendModal} 
                  />
                </div>
              </div>
            )}
        </div>

        {/* BOTTOM ROW: The Summary Text */}
        {(isEditMode || data?.summary) && (
          <div className="tw-mt-4">
            {isEditMode ? (
              <textarea
                value={data?.summary || ""}
                onChange={(e) => onChange("summary", e.target.value)}
                maxLength={150}
                placeholder="Professional tagline or summary..."
                className="tw-w-full tw-bg-transparent tw-border-l-2 tw-border-[#FF43A7]/30 focus:tw-border-[#FF43A7] tw-pl-6 tw-py-1 tw-text-[#E2BDC9] tw-text-xl md:tw-text-2xl tw-italic tw-outline-none tw-resize-none"
                rows={2}
              />
            ) : (
              <p className="tw-text-[#E2BDC9] tw-text-2xl md:tw-text-3xl tw-italic tw-m-0 tw-leading-relaxed tw-opacity-90 tw-max-w-4xl">
                {`"${data.summary}"`}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}