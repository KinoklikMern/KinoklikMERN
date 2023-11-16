import i18n from "i18next";
import { initReactI18next } from "react-i18next";
 
import enTranslation from "./locales/en/translation.json";
import frTranslation from "./locales/fr/translation.json";
 
const resources = {
  en: {
    translation: enTranslation,
  },
  fr: {
    translation: frTranslation,
  },
};
 
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // You can set the default language to 'en' for English
    fallbackLng: "en", // Fallback language is also English in case of missing translations
    interpolation: {
      escapeValue: false, // Not needed for React as it escapes by default
    },
  });
 
// Read the previously selected language from localStorage
const savedLanguage = localStorage.getItem('selectedLanguage');
 
// Change the language if a saved one is found and is 'en' or 'fr'
if (savedLanguage && ['en', 'fr'].includes(savedLanguage)) {
  i18n.changeLanguage(savedLanguage);
}
 
export default i18n