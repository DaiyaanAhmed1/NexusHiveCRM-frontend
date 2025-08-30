import { useContext, createContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { isRTL, getTextDirection } from '../utils/rtl';
import { saveLanguagePreference, getLanguagePreference, detectUserLanguage } from '../utils/languageUtils';

const LocalizationContext = createContext();

export const LocalizationProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(getLanguagePreference);
  const [isRTLMode, setIsRTLMode] = useState(isRTL(currentLanguage));
  const { i18n } = useTranslation();

  useEffect(() => {
    const savedLang = getLanguagePreference();
    if (savedLang !== currentLanguage) {
      changeLanguage(savedLang);
    }
  }, []);

  const changeLanguage = async (languageCode) => {
    try {
      await i18n.changeLanguage(languageCode);
      setCurrentLanguage(languageCode);
      setIsRTLMode(isRTL(languageCode));
      saveLanguagePreference(languageCode);
      
      // Update document attributes
      document.documentElement.lang = languageCode;
      document.documentElement.dir = getTextDirection(languageCode);
      
      // Add/remove RTL CSS class
      if (isRTL(languageCode)) {
        document.body.classList.add('rtl');
      } else {
        document.body.classList.remove('rtl');
      }
    } catch (error) {
      console.error('Failed to change language:', error);
    }
  };

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === 'en' ? 'ar' : 'en';
    changeLanguage(newLanguage);
  };

  const value = {
    currentLanguage,
    isRTLMode,
    changeLanguage,
    toggleLanguage,
    textDirection: getTextDirection(currentLanguage),
  };

  return (
    <LocalizationContext.Provider value={value}>
      {children}
    </LocalizationContext.Provider>
  );
};

export const useLocalization = () => {
  const context = useContext(LocalizationContext);
  if (!context) {
    throw new Error('useLocalization must be used within a LocalizationProvider');
  }
  return context;
}; 