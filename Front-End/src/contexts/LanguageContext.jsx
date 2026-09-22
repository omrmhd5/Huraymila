import React, { createContext, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "./ThemeContext";

const LanguageContext = createContext(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const { language } = useTheme();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (i18n.language !== language) {
      void i18n.changeLanguage(language);
    }
  }, [language, i18n]);

  const bundle = i18n.getResourceBundle(language, "translation") || {};

  const value = {
    t,
    language,
    translations: bundle,
    standards: bundle.standards || [],
  };

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
};
