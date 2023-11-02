import React, { useState } from 'react';

const LanguageToggle = ({ className }) => {
  const [isEnglish, setIsEnglish] = useState(true);

  const toggleLanguage = () => {
    setIsEnglish(!isEnglish);
    
  };
  return (
    <div className="tw-flex tw-w-20 tw-bg-purple-950 tw-text-white tw-mb-1">
      <button
        onClick={() => toggleLanguage('EN')}
        disabled={isEnglish}
        className={`tw-w-1/2 tw-flex tw-items-center tw-justify-center ${isEnglish ? 'tw-bg-white ' : 'tw-bg-purple-950'}`}
      >
        <span className={`${isEnglish ? 'tw-text-purple-950' : 'tw-text-white'}`}>EN</span>
      </button>
  
      <button
        onClick={() => toggleLanguage('FR')}
        disabled={!isEnglish}
        className={`tw-w-1/2 tw-flex tw-items-center tw-justify-center ${!isEnglish ? 'tw-bg-white ' : 'tw-bg-purple-950'}`}
      >
        <span className={`${!isEnglish ? 'tw-text-purple-950' : 'tw-text-white'}`}>FR</span>
      </button>
    </div>
  );
};



export default LanguageToggle;