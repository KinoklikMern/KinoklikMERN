import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faChevronDown, faSpinner } from "@fortawesome/free-solid-svg-icons";
import KinoKlikIcon from "../../images/logo.png";

const SECTIONS = [
  { id: 'hero',        label: 'Hero & Photo' },
  { id: 'bio',         label: 'Biography' },
  { id: 'social',      label: 'Social Media' },
  { id: 'filmography', label: 'Filmography' },
  { id: 'contact',     label: 'Contact' },
];

export default function FilmmakerEditNavBar({ activeSection, onSectionClick, onDiscard, onSave, isSaving }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavClick = (id) => {
    onSectionClick(id);
    setIsDropdownOpen(false);
  };

  const currentLabel = SECTIONS.find(s => s.id === activeSection)?.label || SECTIONS[0].label;

  return (
    <div
      className="tw-fixed tw-top-0 tw-left-0 tw-right-0 tw-h-[103px] tw-bg-[#280D41] tw-shadow-[0_20px_40px_rgba(0,0,0,0.8)] tw-z-[1050] tw-flex tw-items-center tw-justify-between tw-px-4 lg:tw-px-[32px]"
      style={{ backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}
    >
      <div className="tw-w-[50px] lg:tw-w-[71px] tw-h-[50px] lg:tw-h-[71px] tw-shrink-0 tw-flex tw-items-center tw-justify-center">
        <img src={KinoKlikIcon} alt="KinoKlik" className="tw-w-full tw-h-full tw-object-contain tw-brightness-0 tw-invert" />
      </div>

      {/* Desktop nav */}
      <div className="tw-hidden xl:tw-flex tw-flex-row tw-items-center tw-h-[30px] tw-gap-[24px] 2xl:tw-gap-[32px]">
        {SECTIONS.map((section) => {
          const isActive = activeSection === section.id;
          return (
            <button
              key={section.id}
              onClick={() => handleNavClick(section.id)}
              className={`tw-bg-transparent tw-border-0 tw-outline-none tw-p-0 tw-m-0 tw-flex tw-items-center tw-justify-center tw-h-[30px] tw-pb-[4px] tw-cursor-pointer tw-transition-all tw-box-border
                ${isActive
                  ? 'tw-border-b-[2px] tw-border-solid tw-border-[#FF43A7]'
                  : 'tw-border-b-[2px] tw-border-solid tw-border-transparent hover:tw-border-[#FF43A7]/50'
                }`}
            >
              <span className={`tw-font-bold tw-text-[14px] 2xl:tw-text-[16px] tw-leading-[24px] tw-tracking-[-0.4px] tw-whitespace-nowrap tw-transition-colors
                ${isActive ? 'tw-text-[#FFB0CF]' : 'tw-text-[rgba(240,219,255,0.6)] hover:tw-text-white'}`}>
                {section.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Mobile dropdown */}
      <div className="tw-block xl:tw-hidden tw-relative" ref={dropdownRef}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="tw-flex tw-items-center tw-gap-2 tw-bg-black/30 tw-border tw-border-white/20 tw-rounded-full tw-px-4 tw-py-2 tw-text-[#FFB0CF] tw-font-bold tw-text-sm tw-cursor-pointer"
        >
          <span className="tw-max-w-[140px] tw-truncate">{currentLabel}</span>
          <FontAwesomeIcon icon={faChevronDown} className={`tw-transition-transform ${isDropdownOpen ? 'tw-rotate-180' : ''}`} />
        </button>

        {isDropdownOpen && (
          <div className="tw-absolute tw-top-full tw-mt-2 tw-left-1/2 tw--translate-x-1/2 tw-w-[220px] tw-bg-[#280D41] tw-border tw-border-[#FF43A7]/50 tw-rounded-xl tw-shadow-2xl tw-overflow-hidden tw-flex tw-flex-col">
            {SECTIONS.map((section) => (
              <button
                key={section.id}
                onClick={() => handleNavClick(section.id)}
                className={`tw-text-left tw-px-4 tw-py-3 tw-font-bold tw-text-sm tw-transition-colors tw-bg-transparent tw-border-none tw-cursor-pointer
                  ${activeSection === section.id
                    ? 'tw-bg-[#FF43A7]/20 tw-text-[#FFB0CF]'
                    : 'tw-text-[rgba(240,219,255,0.8)] hover:tw-bg-white/10 hover:tw-text-white'
                  }`}
              >
                {section.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="tw-flex tw-flex-row tw-items-center tw-gap-[8px] sm:tw-gap-[12px] tw-shrink-0">
        <button
          onClick={onDiscard}
          disabled={isSaving}
          className="tw-flex tw-items-center tw-justify-center tw-w-10 tw-h-10 md:tw-w-auto md:tw-px-4 md:tw-gap-2 tw-bg-[#4B4B4B] hover:tw-bg-[#5A5A5A] tw-text-white tw-rounded-lg tw-transition-colors tw-border-none tw-outline-none tw-cursor-pointer disabled:tw-opacity-50 disabled:tw-cursor-not-allowed tw-shrink-0"
        >
          <FontAwesomeIcon icon={faXmark} className="tw-text-lg" />
          <span className="tw-hidden md:tw-inline tw-text-sm tw-font-bold">Discard</span>
        </button>

        <button
          onClick={onSave}
          disabled={isSaving}
          className={`tw-flex tw-items-center tw-justify-center tw-gap-2 tw-px-5 md:tw-px-6 tw-h-10 tw-rounded-lg tw-font-bold tw-text-sm tw-tracking-widest tw-transition-all tw-border-none tw-outline-none tw-shrink-0 ${
            isSaving
              ? "tw-bg-[#5A3F49] tw-text-white/50 tw-cursor-not-allowed"
              : "tw-bg-[#FF43A7] tw-text-[#570033] hover:tw-bg-[#ff5cac] hover:tw-shadow-[0_0_15px_rgba(255,67,167,0.5)] tw-cursor-pointer"
          }`}
        >
          {isSaving ? (
            <>
              <FontAwesomeIcon icon={faSpinner} className="tw-animate-spin" />
              <span className="tw-hidden md:tw-inline">UPLOADING ASSETS...</span>
              <span className="md:tw-hidden">SAVING...</span>
            </>
          ) : (
            <>
              <span className="tw-hidden md:tw-inline">SAVE AND EXIT</span>
              <span className="md:tw-hidden">SAVE</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
