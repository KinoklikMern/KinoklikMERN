import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

export default function EpkSynopsis({ epkInfo, requestStatus, handler, isEditMode, onChange }) {
  const { t } = useTranslation();

  // --- READ-ONLY ACCORDION STATE ---
  const [openSections, setOpenSections] = useState({
    short: true, 
    medium: false,
    long: false,
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // --- EDIT MODE LOCAL STATES ---
  const [shortText, setShortText] = useState(epkInfo?.text_short || "");
  const [mediumText, setMediumText] = useState(epkInfo?.text_medium || "");
  const [longText, setLongText] = useState(epkInfo?.text_long || "");

  // Keep local state in sync if the master draft is discarded/updated elsewhere
  useEffect(() => {
    setShortText(epkInfo?.text_short || "");
    setMediumText(epkInfo?.text_medium || "");
    setLongText(epkInfo?.text_long || "");
  }, [epkInfo?.text_short, epkInfo?.text_medium, epkInfo?.text_long]);

  if (!epkInfo) return null;

  // Custom Chevron for Read-Only Accordion
  const WideChevron = ({ isOpen, className = "" }) => (
    <svg viewBox="0 0 102 49" fill="none" xmlns="http://www.w3.org/2000/svg" className={`tw-transition-transform tw-duration-300 ${isOpen ? "tw-rotate-180" : "tw-rotate-0"} ${className}`}>
      <path d="M4 4L51 43L98 4" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  const synopsisSections = [
    { id: "short", title: t("Short Synopsis"), content: epkInfo?.text_short, isLocked: false },
    { id: "medium", title: t("Medium Synopsis"), content: epkInfo?.text_medium, isLocked: epkInfo?.text_medium_blur && requestStatus !== "approved" },
    { id: "long", title: t("Long Synopsis"), content: epkInfo?.text_long, isLocked: epkInfo?.text_long_blur && requestStatus !== "approved" },
  ];

  return (
    <div className="tw-relative tw-w-full tw-max-w-[1232px] tw-mx-auto tw-flex tw-flex-col tw-py-8 tw-mb-8 tw-isolation-isolate">
      
      {/* Ambient Background Effects (Edit Mode Only) */}
      {isEditMode && (
        <>
          <div className="tw-absolute tw-w-[512px] tw-h-[642px] -tw-left-16 -tw-bottom-40 tw-bg-[#651CA4]/10 tw-blur-[50px] tw-rounded-full tw-z-[-1]"></div>
          <div className="tw-absolute tw-w-[640px] tw-h-[763px] -tw-right-24 -tw-top-24 tw-bg-[#FF43A7]/10 tw-blur-[30px] tw-rounded-full tw-z-[-1]"></div>
        </>
      )}

      {/* ================= HEADER (Shared) ================= */}
      <div className="tw-flex tw-flex-col tw-mb-8 md:tw-mb-10 tw-px-4 md:tw-px-0">
        <span className="tw-text-[#FF43A7] tw-text-[10px] tw-font-bold tw-uppercase tw-tracking-widest tw-mb-1">
          Our story
        </span>
        <h2 className="tw-text-white tw-text-3xl md:tw-text-4xl tw-font-bold tw-tracking-tight tw-mb-2">
          {isEditMode ? "Edit Synopsis" : "Synopsis"}
        </h2>
        {isEditMode && (
          <p className="tw-text-[#DDB7FF] tw-text-sm md:tw-text-base tw-leading-relaxed tw-max-w-[672px] tw-mt-2 tw-mb-0">
            Craft the narrative arc for your project. Changes require saving to be locked into your draft. 
            Use the Public toggle to restrict access to approved members only.
          </p>
        )}
      </div>

      {/* ================= BODY CONTENT ================= */}
      {!isEditMode ? (
        
        /* ---------------- VIEW MODE (READ ONLY ACCORDIONS) ---------------- */
        <div className="tw-flex tw-w-full tw-flex-col tw-gap-4 tw-px-4 md:tw-px-0">
          {synopsisSections.map((section) => {
            if (!section.content) return null;
            const isOpen = openSections[section.id];

            return (
              <div key={section.id} className="tw-w-full tw-overflow-hidden tw-rounded-[10px] tw-bg-white tw-shadow-[0_10px_30px_rgba(0,0,0,0.2)]">
                <div
                  className="tw-relative tw-flex tw-w-full tw-min-h-[80px] md:tw-min-h-[146px] md:tw-justify-end tw-cursor-pointer tw-transition-colors hover:tw-bg-gray-50"
                  onClick={() => !section.isLocked && toggleSection(section.id)}
                >
                  <div className="tw-flex tw-flex-1 md:tw-flex-none tw-items-center tw-justify-center tw-pl-4 md:tw-pl-0 md:tw-absolute md:tw-inset-0 md:tw-pointer-events-none">
                    <h3 className="tw-text-lg md:tw-text-2xl tw-font-bold tw-text-[#1E0039] tw-text-center">{section.title}</h3>
                  </div>

                  <div className="tw-relative tw-flex tw-w-[140px] md:tw-w-[22.6%] tw-shrink-0 tw-items-center tw-justify-center tw-pr-2 md:tw-pr-0">
                    {section.isLocked ? (
                      <>
                        <WideChevron isOpen={false} className="tw-absolute tw-w-10 md:tw-w-[102px] tw-text-[#E81A84] tw-opacity-20 tw-pointer-events-none" />
                        <button 
                          onClick={(e) => { e.stopPropagation(); handler('request'); }}
                          className="tw-z-10 tw-w-full md:tw-w-[85%] tw-max-w-[300px] tw-rounded-[10px] tw-border-2 tw-border-[#E81A84] tw-bg-white tw-py-2 md:tw-py-4 tw-text-xs md:tw-text-sm tw-font-bold tw-text-[#1E0039] tw-transition-colors hover:tw-bg-pink-50"
                        >
                          {t("Request Access")}
                        </button>
                      </>
                    ) : (
                      <WideChevron isOpen={isOpen} className="tw-w-10 md:tw-w-[102px] tw-text-[#E81A84]" />
                    )}
                  </div>
                </div>

                {isOpen && !section.isLocked && (
                  <div className="tw-border-t tw-border-gray-200 tw-px-6 tw-py-8 md:tw-px-24 md:tw-py-16">
                    <p className="tw-text-center tw-text-base md:tw-text-xl tw-font-medium tw-leading-relaxed tw-text-[#1E0039] tw-whitespace-pre-wrap">
                      {section.content}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      ) : (

        /* ---------------- EDIT MODE (DASHBOARD CARDS) ---------------- */
        <div className="tw-flex tw-flex-col tw-gap-8 tw-px-4 md:tw-px-0">
          
          {/* ================= CARD 1: SHORT SYNOPSIS ================= */}
          <div className="tw-bg-[#280D41] tw-rounded-2xl tw-p-6 md:tw-p-8 tw-flex tw-flex-col tw-gap-6 tw-shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
            <div className="tw-flex tw-justify-between tw-items-center">
              <div className="tw-flex tw-items-center tw-gap-3">
                <h2 className="tw-text-white tw-text-xl md:tw-text-2xl tw-font-bold tw-tracking-tight tw-m-0">Short Synopsis</h2>
                <div className="tw-w-3.5 tw-h-3.5 tw-text-[#FF43A7]"><FontAwesomeIcon icon={faPen} /></div>
              </div>
            </div>
            
            {/* Dashed Text Area */}
            <div className="tw-relative tw-w-full tw-bg-white tw-border-2 tw-border-dashed tw-border-[#FF43A7] tw-rounded-xl tw-p-6 tw-pb-10">
              <textarea
                value={shortText}
                onChange={(e) => setShortText(e.target.value)}
                placeholder="A brief logline or short summary of the core conflict..."
                className="tw-w-full tw-bg-transparent tw-text-[#1F0439] tw-text-base tw-outline-none tw-resize-y tw-min-h-[80px]"
              />
              <span className="tw-absolute tw-bottom-3 tw-right-4 tw-text-[10px] tw-font-['Space_Grotesk'] tw-uppercase tw-tracking-widest tw-text-[#1F0439]/50">
                01 / SHORT SYNOPSIS
              </span>
            </div>

            {/* Local Save/Discard Actions */}
            {shortText !== (epkInfo?.text_short || "") && (
              <div className="tw-flex tw-justify-end tw-gap-4 tw-mt-2 tw-animate-fade-in">
                <button 
                  onClick={() => setShortText(epkInfo?.text_short || "")} 
                  className="tw-text-[#AA8894] hover:tw-text-white tw-bg-transparent tw-border-none tw-font-bold tw-text-sm tw-transition-colors tw-cursor-pointer"
                >
                  Discard
                </button>
                <button 
                  onClick={() => onChange('text_short', shortText)} 
                  className="tw-bg-[#FF43A7] tw-border-none tw-text-[#570033] tw-px-6 tw-py-2 tw-rounded-lg tw-font-bold tw-text-sm hover:tw-bg-[#ff5cac] tw-shadow-[0_0_15px_rgba(255,67,167,0.4)] tw-transition-all tw-cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            )}
          </div>

          {/* ================= CARD 2: MEDIUM SYNOPSIS ================= */}
          <div className="tw-bg-[#280D41] tw-rounded-2xl tw-p-6 md:tw-p-8 tw-flex tw-flex-col tw-gap-6 tw-shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
            <div className="tw-flex tw-justify-between tw-items-center">
              <div className="tw-flex tw-items-center tw-gap-3">
                <h2 className="tw-text-white tw-text-xl md:tw-text-2xl tw-font-bold tw-tracking-tight tw-m-0">Medium Synopsis</h2>
                <div className="tw-w-3.5 tw-h-3.5 tw-text-[#FF43A7]"><FontAwesomeIcon icon={faPen} /></div>
              </div>
              
              {/* PUBLIC TOGGLE CHECKBOX */}
              <div className="tw-flex tw-items-center tw-gap-2 tw-cursor-pointer" onClick={() => onChange('text_medium_blur', !epkInfo?.text_medium_blur)}>
                <span className="tw-text-[10px] tw-font-['Space_Grotesk'] tw-uppercase tw-tracking-widest tw-text-[#DDB7FF]">Public</span>
                <input 
                  type="checkbox" 
                  checked={!epkInfo?.text_medium_blur} // Checked = Public (Not Blurred)
                  readOnly
                  className="tw-w-4 tw-h-4 tw-bg-[#2C1246] tw-border tw-border-[#AA8894] tw-rounded tw-cursor-pointer tw-accent-[#FF43A7]"
                />
              </div>
            </div>
            
            {/* Dashed Text Area */}
            <div className="tw-relative tw-w-full tw-bg-white tw-border-2 tw-border-dashed tw-border-[#FF43A7] tw-rounded-xl tw-p-6 tw-pb-10">
              <textarea
                value={mediumText}
                onChange={(e) => setMediumText(e.target.value)}
                placeholder="Expand on the narrative, introducing key characters and plot points..."
                className="tw-w-full tw-bg-transparent tw-text-[#1F0439] tw-text-base tw-outline-none tw-resize-y tw-min-h-[160px]"
              />
              <span className="tw-absolute tw-bottom-3 tw-right-4 tw-text-[10px] tw-font-['Space_Grotesk'] tw-uppercase tw-tracking-widest tw-text-[#1F0439]/50">
                02 / MEDIUM SYNOPSIS
              </span>
            </div>

            {/* Local Save/Discard Actions */}
            {mediumText !== (epkInfo?.text_medium || "") && (
              <div className="tw-flex tw-justify-end tw-gap-4 tw-mt-2 tw-animate-fade-in">
                <button 
                  onClick={() => setMediumText(epkInfo?.text_medium || "")} 
                  className="tw-text-[#AA8894] hover:tw-text-white tw-bg-transparent tw-border-none tw-font-bold tw-text-sm tw-transition-colors tw-cursor-pointer"
                >
                  Discard
                </button>
                <button 
                  onClick={() => onChange('text_medium', mediumText)} 
                  className="tw-bg-[#FF43A7] tw-border-none tw-text-[#570033] tw-px-6 tw-py-2 tw-rounded-lg tw-font-bold tw-text-sm hover:tw-bg-[#ff5cac] tw-shadow-[0_0_15px_rgba(255,67,167,0.4)] tw-transition-all tw-cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            )}
          </div>

          {/* ================= CARD 3: LONG SYNOPSIS ================= */}
          <div className="tw-bg-[#280D41] tw-rounded-2xl tw-p-6 md:tw-p-8 tw-flex tw-flex-col tw-gap-6 tw-shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
            <div className="tw-flex tw-justify-between tw-items-center">
              <div className="tw-flex tw-items-center tw-gap-3">
                <h2 className="tw-text-white tw-text-xl md:tw-text-2xl tw-font-bold tw-tracking-tight tw-m-0">Long Synopsis</h2>
                <div className="tw-w-3.5 tw-h-3.5 tw-text-[#FF43A7]"><FontAwesomeIcon icon={faPen} /></div>
              </div>
              
              {/* PUBLIC TOGGLE CHECKBOX */}
              <div className="tw-flex tw-items-center tw-gap-2 tw-cursor-pointer" onClick={() => onChange('text_long_blur', !epkInfo?.text_long_blur)}>
                <span className="tw-text-[10px] tw-font-['Space_Grotesk'] tw-uppercase tw-tracking-widest tw-text-[#DDB7FF]">Public</span>
                <input 
                  type="checkbox" 
                  checked={!epkInfo?.text_long_blur} // Checked = Public (Not Blurred)
                  readOnly
                  className="tw-w-4 tw-h-4 tw-bg-[#2C1246] tw-border tw-border-[#AA8894] tw-rounded tw-cursor-pointer tw-accent-[#FF43A7]"
                />
              </div>
            </div>
            
            {/* Dashed Text Area */}
            <div className="tw-relative tw-w-full tw-bg-white tw-border-2 tw-border-dashed tw-border-[#FF43A7] tw-rounded-xl tw-p-6 tw-pb-10">
              <textarea
                value={longText}
                onChange={(e) => setLongText(e.target.value)}
                placeholder="The complete story breakdown, including the climax and resolution..."
                className="tw-w-full tw-bg-transparent tw-text-[#1F0439] tw-text-base tw-outline-none tw-resize-y tw-min-h-[300px]"
              />
              <span className="tw-absolute tw-bottom-3 tw-right-4 tw-text-[10px] tw-font-['Space_Grotesk'] tw-uppercase tw-tracking-widest tw-text-[#1F0439]/50">
                03 / LONG SYNOPSIS
              </span>
            </div>

            {/* Local Save/Discard Actions */}
            {longText !== (epkInfo?.text_long || "") && (
              <div className="tw-flex tw-justify-end tw-gap-4 tw-mt-2 tw-animate-fade-in">
                <button 
                  onClick={() => setLongText(epkInfo?.text_long || "")} 
                  className="tw-text-[#AA8894] hover:tw-text-white tw-bg-transparent tw-border-none tw-font-bold tw-text-sm tw-transition-colors tw-cursor-pointer"
                >
                  Discard
                </button>
                <button 
                  onClick={() => onChange('text_long', longText)} 
                  className="tw-bg-[#FF43A7] tw-border-none tw-text-[#570033] tw-px-6 tw-py-2 tw-rounded-lg tw-font-bold tw-text-sm hover:tw-bg-[#ff5cac] tw-shadow-[0_0_15px_rgba(255,67,167,0.4)] tw-transition-all tw-cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            )}
          </div>

        </div>
      )}
    </div>
  );
}