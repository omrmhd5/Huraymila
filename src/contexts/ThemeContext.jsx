import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState(() => {
    const saved = localStorage.getItem('preferred-theme');
    return (saved === 'light' || saved === 'dark') ? saved : 'light';
  });

  const [language, setLanguageState] = useState(() => {
    const saved = localStorage.getItem('preferred-language');
    return (saved === 'ar' || saved === 'en') ? saved : 'ar';
  });

  const setTheme = (newTheme) => {
    setThemeState(newTheme);
    localStorage.setItem('preferred-theme', newTheme);
  };

  const setLanguage = (newLanguage) => {
    setLanguageState(newLanguage);
    localStorage.setItem('preferred-language', newLanguage);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  useEffect(() => {
    // Apply theme to document
    document.documentElement.classList.toggle('dark', theme === 'dark');
    
    // Apply RTL direction for Arabic
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language === 'ar' ? 'ar' : 'en';
    
    // Save preferences to localStorage
    localStorage.setItem('preferred-theme', theme);
    localStorage.setItem('preferred-language', language);
  }, [theme, language]);

  const value = {
    theme,
    language,
    setTheme,
    setLanguage,
    toggleTheme,
    toggleLanguage,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

