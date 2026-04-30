/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

export default function UserBio({ data, isEditMode, onChange }) {
  const { t } = useTranslation();
  
  const [bioText, setBioText] = useState(data?.aboutMe || "");

  useEffect(() => {
    setBioText(data?.aboutMe || "");
  }, [data?.aboutMe]);

  return (
    <section className="tw-w-full tw-bg-transparent tw-py-12 tw-border-[#5A3F49]/30">
      <div className="tw-w-full tw-max-w-[1280px] tw-mx-auto tw-px-4 md:tw-px-0">
        
        <h2 className="tw-text-[#FF43A7] tw-text-[10px] tw-font-bold tw-uppercase tw-tracking-widest tw-mb-8">
          {t('Biography')}
        </h2>

        <div className="tw-pl-0 md:tw-pl-10">
          {!isEditMode ? (
            /* ---------------- READ ONLY ---------------- */
            data?.aboutMe ? (
              <p className="tw-text-[#E2BDC9] tw-text-base md:tw-text-lg tw-leading-relaxed tw-m-0 tw-whitespace-pre-wrap">
                {data.aboutMe}
              </p>
            ) : (
              <p className="tw-text-[#5A3F49] tw-text-base tw-italic tw-m-0">
                {t('No biography added yet.')}
              </p>
            )
          ) : (
            /* ---- EDIT MODE: Dashboard Card Logic ---- */
            <div className="tw-bg-[#280D41] tw-rounded-2xl tw-p-6 md:tw-p-8 tw-flex tw-flex-col tw-gap-6 tw-shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
              <div className="tw-flex tw-items-center tw-gap-3">
                <h2 className="tw-text-white tw-text-xl md:tw-text-2xl tw-font-bold tw-tracking-tight tw-m-0">
                  {t('Edit Biography')}
                </h2>
                <div className="tw-w-3.5 tw-h-3.5 tw-text-[#FF43A7]"><FontAwesomeIcon icon={faPen} /></div>
              </div>
              
              <div className="tw-relative tw-w-full">
                <textarea
                  value={bioText}
                  onChange={(e) => setBioText(e.target.value)}
                  placeholder={t("Write about yourself — your background, training, and what drives your craft...")}
                  className="tw-w-full tw-min-h-[220px] tw-bg-[#1F0439] tw-border tw-border-[#5A3F49] focus:tw-border-[#FF43A7] tw-rounded-xl tw-px-5 tw-py-4 tw-text-white tw-text-base tw-leading-relaxed tw-outline-none tw-transition-colors tw-resize-y custom-scrollbar"
                />
              </div>

              {/* ACTION BUTTONS: Only show when local text differs from saved data */}
              {bioText !== (data?.aboutMe || "") && (
                <div className="tw-flex tw-justify-end tw-gap-4 tw-mt-2 tw-animate-fade-in">
                  <button 
                    onClick={() => setBioText(data?.aboutMe || "")} 
                    className="tw-text-[#AA8894] hover:tw-text-white tw-bg-transparent tw-border-none tw-font-bold tw-text-sm tw-transition-colors tw-cursor-pointer"
                  >
                    {t('Discard')}
                  </button>
                  <button 
                    onClick={() => onChange('aboutMe', bioText)} 
                    className="tw-bg-[#FF43A7] tw-border-none tw-text-[#570033] tw-px-6 tw-py-2 tw-rounded-lg tw-font-bold tw-text-sm hover:tw-bg-[#ff5cac] tw-shadow-[0_0_15px_rgba(255,67,167,0.4)] tw-transition-all tw-cursor-pointer"
                  >
                    {t('Save Changes')}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}