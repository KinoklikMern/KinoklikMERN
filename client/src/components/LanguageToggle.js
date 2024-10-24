import React from "react";
import { useTranslation } from "react-i18next";

const LanguageToggle = () => {
  const { i18n } = useTranslation();
  const isEnglish = i18n.language.includes("en");
  const isFrench = i18n.language.startsWith("fr");

  const toggleLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("selectedLanguage", lang); // Save the selected language
  };

  return (
    <div className='tw-ml-auto tw-mr-auto tw-flex tw-w-20 tw-rounded-lg tw-bg-purple-950 tw-text-center md:tw-mr-4'>
      <button
        onClick={() => toggleLanguage("en")}
        disabled={isEnglish}
        className={`tw-flex tw-w-1/2 tw-items-center tw-justify-center ${
          isEnglish
            ? "tw-rounded-lg tw-bg-white"
            : "tw-rounded-none tw-bg-purple-950"
        }`}
      >
        <span
          className={`${isEnglish ? "tw-text-purple-950" : "tw-text-white"}`}
        >
          EN
        </span>
      </button>

      <button
        onClick={() => toggleLanguage("fr")}
        disabled={isFrench}
        className={`tw-flex tw-w-1/2 tw-items-center tw-justify-center ${
          !isEnglish
            ? "tw-rounded-lg tw-bg-white"
            : "tw-rounded-none tw-bg-purple-950"
        }`}
      >
        <span
          className={`${!isEnglish ? "tw-text-purple-950" : "tw-text-white"}`}
        >
          FR
        </span>
      </button>
    </div>
  );
};

export default LanguageToggle;
