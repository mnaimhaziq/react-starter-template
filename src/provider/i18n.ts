import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Example translations
const resources = {
  en: {
    translation: {
      welcome: "Welcome to the app",
      hello: "Hello, {{name}}!",
    },
  },
  ms: {
    translation: {
      welcome: "Selamat datang ke aplikasi",
      hello: "Hai, {{name}}!",
    },
  },
};

i18n
  .use(LanguageDetector) // auto-detect browser language
  .use(initReactI18next) // bind react-i18next
  .init({
    resources,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // react already escapes
    },
  });

export default i18n;
