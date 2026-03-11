import React, { useState } from "react";
import { useTranslation } from "react-i18next";

export default function EpkSynopsis({ epkInfo, requestStatus, handler }) {
  const { t } = useTranslation();

  const [openSections, setOpenSections] = useState({
    short: true, 
    medium: false,
    long: false,
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const synopsisSections = [
    {
      id: "short",
      title: t("Short Synopsis"),
      content: epkInfo?.text_short,
      isLocked: false, 
    },
    {
      id: "medium",
      title: t("Medium Synopsis"),
      content: epkInfo?.text_medium,
      isLocked: epkInfo?.text_medium_blur && requestStatus !== "approved",
    },
    {
      id: "long",
      title: t("Long Synopsis"),
      content: epkInfo?.text_long,
      isLocked: epkInfo?.text_long_blur && requestStatus !== "approved",
    },
  ];

  if (!epkInfo) return null;

  // Custom SVG specifically built for the 102x49 Figma dimensions
  const WideChevron = ({ isOpen, className = "" }) => (
    <svg
      viewBox="0 0 102 49"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`tw-transition-transform tw-duration-300 ${isOpen ? "tw-rotate-180" : "tw-rotate-0"} ${className}`}
    >
      <path
        d="M4 4L51 43L98 4"
        stroke="currentColor"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <div className="tw-flex tw-w-full tw-flex-col tw-gap-4 tw-px-4 md:tw-px-0 tw-mb-8">
      {synopsisSections.map((section) => {
        if (!section.content) return null;

        const isOpen = openSections[section.id];

        return (
          <div 
            key={section.id} 
            className="tw-w-full tw-overflow-hidden tw-rounded-[10px] tw-bg-white tw-shadow-md"
          >
            {/* HEADER 
                Mobile: Standard flex row
                Desktop: Parent uses justify-end to keep button on the right while title goes absolute 
            */}
            <div
              className="tw-relative tw-flex tw-w-full tw-min-h-[80px] md:tw-min-h-[146px] md:tw-justify-end tw-cursor-pointer tw-transition-colors hover:tw-bg-gray-50"
              onClick={() => !section.isLocked && toggleSection(section.id)}
            >
              
              {/* TITLE 
                  Mobile: flex-1 (centers in remaining space)
                  Desktop: absolute inset-0 (dead center of the entire bar) 
              */}
              <div className="tw-flex tw-flex-1 md:tw-flex-none tw-items-center tw-justify-center tw-pl-4 md:tw-pl-0 md:tw-absolute md:tw-inset-0 md:tw-pointer-events-none">
                <h3 className="tw-text-lg md:tw-text-2xl tw-font-bold tw-text-[#1E0039] tw-text-center">
                  {section.title}
                </h3>
              </div>

              {/* RIGHT SIDE CONTAINER 
                  Mobile: Fixed width 140px, shrinks to fit
                  Desktop: 22.6% of the bar, sitting cleanly on the right
              */}
              <div className="tw-relative tw-flex tw-w-[140px] md:tw-w-[22.6%] tw-shrink-0 tw-items-center tw-justify-center tw-pr-2 md:tw-pr-0">
                
                {section.isLocked ? (
                  <>
                    {/* Faint chevron perfectly centered behind the button */}
                    <WideChevron 
                      isOpen={false} 
                      className="tw-absolute tw-w-10 md:tw-w-[102px] tw-text-[#E81A84] tw-opacity-20 tw-pointer-events-none" 
                    />
                    
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handler('request');
                      }}
                      className="tw-z-10 tw-w-full md:tw-w-[85%] tw-max-w-[300px] tw-rounded-[10px] tw-border-2 tw-border-[#E81A84] tw-bg-white tw-py-2 md:tw-py-4 tw-text-xs md:tw-text-sm tw-font-bold tw-text-[#1E0039] tw-transition-colors hover:tw-bg-pink-50"
                    >
                      {t("Request Access")}
                    </button>
                  </>
                ) : (
                  /* Unlocked active chevron */
                  <WideChevron 
                    isOpen={isOpen} 
                    className="tw-w-10 md:tw-w-[102px] tw-text-[#E81A84]" 
                  />
                )}
              </div>
            </div>

            {/* CONTENT */}
            {isOpen && !section.isLocked && (
              <div className="tw-border-t tw-border-gray-200 tw-px-6 tw-py-8 md:tw-px-24 md:tw-py-16">
                <p className="tw-text-center tw-text-base md:tw-text-xl tw-font-medium tw-leading-relaxed tw-text-[#1E0039]">
                  {section.content}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}