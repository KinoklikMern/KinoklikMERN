import  { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function CastCard({
  image,
  bio,
  castName,
  epkRole,
  actorUrl,
  isDarkTheme = false
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();

  // --- FORMATTER FOR ROLES ---
  const formatChars = (chars) => {
    if (!chars) return "";
    let noSpecialChars = chars.replace(/[^a-zA-Z0-9]/g, " "); 
    let formatedChars = noSpecialChars
      .split(" ")
      .map((char) => {
        return char.charAt(0).toUpperCase() + char.substring(1);
      })
      .join(" ");

    return formatedChars;
  };

  // --- BRANDING PHRASE FALLBACK LOGIC ---
  const safeBio = bio || "";
  const brandingPhrase = safeBio.length > 100 ? safeBio.substring(0, 100) + "..." : safeBio;

  // --- THEME COLORS ---
  const innerBg = isDarkTheme ? "tw-bg-[#1E0039]" : "tw-bg-white";
  const textColor = isDarkTheme ? "tw-text-white" : "tw-text-[#1E0039]";
  const borderGradient = isDarkTheme 
    ? "tw-from-[#FF00A0] tw-to-white" 
    : "tw-from-[#FF00A0] tw-to-[#1E0039]";

  return (
    <>
      {/* OUTER WRAPPER: Gradient Border */}
      <div className={`tw-shrink-0 tw-w-[260px] md:tw-w-[280px] tw-p-[4px] tw-rounded-[43px] tw-bg-gradient-to-b ${borderGradient} tw-snap-center tw-shadow-lg`}>
        
        {/* INNER CARD */}
        <div className={`tw-flex tw-flex-col tw-items-center tw-h-full tw-w-full ${innerBg} tw-rounded-[38px] tw-p-5 md:tw-p-6`}>
          
          {/* Headshot */}
          <img
            src={image}
            alt={castName}
            onClick={() => setIsModalOpen(true)}
            className="tw-w-full tw-aspect-[3/4] tw-object-cover tw-rounded-[30px] tw-cursor-pointer tw-shadow-[0_4px_10px_rgba(0,0,0,0.3)] hover:tw-opacity-90 tw-transition-opacity"
          />

          {/* Name & Role */}
          <div className={`tw-mt-4 tw-text-center tw-w-full ${textColor}`}>
            <Link to={actorUrl} className="hover:tw-text-[#FF00A0] tw-transition-colors">
              <h3 className="tw-text-xl tw-font-bold">{castName}</h3>
            </Link>
            {/* Formatter applied here: */}
            <p className="tw-text-sm tw-font-medium tw-opacity-80 tw-mt-1">
               {t(epkRole?.toLowerCase()) || formatChars(epkRole)}
            </p>
          </div>

          {/* Branding Phrase / Short Bio */}
          <p className={`tw-mt-4 tw-text-center tw-text-sm tw-leading-relaxed ${textColor} tw-flex-grow`}>
            {brandingPhrase}
          </p>

          {/* Read More */}
          <Link to={actorUrl} className={`tw-mt-4 tw-text-sm tw-font-bold tw-underline tw-underline-offset-4 hover:tw-text-[#FF00A0] tw-transition-colors ${textColor}`}>
            {t("Read More")}
          </Link>
        </div>
      </div>

      {/* --- HEADSHOT MODAL --- */}
      {isModalOpen && (
        <div 
          className="tw-fixed tw-inset-0 tw-z-[100] tw-flex tw-items-center tw-justify-center tw-bg-black/90 tw-p-4" 
          onClick={() => setIsModalOpen(false)}
        >
          <button 
            className="tw-absolute tw-top-4 tw-right-6 tw-text-white tw-text-5xl hover:tw-text-[#FF00A0] tw-transition-colors tw-z-[101]"
            onClick={() => setIsModalOpen(false)}
            aria-label="Close modal"
          >
            &times;
          </button>
          <img 
            src={image} 
            alt={castName} 
            className="tw-w-[90vw] tw-h-auto tw-max-h-[85vh] md:tw-w-auto md:tw-h-[85vh] md:tw-max-w-[90vw] tw-object-contain tw-rounded-[16px] tw-shadow-2xl"
            onClick={(e) => e.stopPropagation()} 
          />
        </div>
      )}
    </>
  );
}