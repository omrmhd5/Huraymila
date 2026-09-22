import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ar from "./locales/ar.json";
import en from "./locales/en.json";

const STORAGE_KEY = "preferred-language";

export function normalizeLanguage(lng) {
  return String(lng || "").toLowerCase().startsWith("en") ? "en" : "ar";
}

export function getStoredLanguage() {
  if (typeof window === "undefined") return "ar";
  return normalizeLanguage(localStorage.getItem(STORAGE_KEY) || "ar");
}

export function applyDocumentLanguage(lng) {
  const lang = normalizeLanguage(lng);
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
}

i18n.use(initReactI18next).init({
  resources: {
    ar: { translation: ar },
    en: { translation: en },
  },
  lng: getStoredLanguage(),
  fallbackLng: "ar",
  returnObjects: true,
  interpolation: { escapeValue: false },
});

if (typeof document !== "undefined") {
  applyDocumentLanguage(i18n.resolvedLanguage || i18n.language);
}

i18n.on("languageChanged", (lng) => {
  const lang = normalizeLanguage(lng);
  localStorage.setItem(STORAGE_KEY, lang);
  applyDocumentLanguage(lang);
});

export default i18n;
