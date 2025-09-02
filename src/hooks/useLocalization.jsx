import { useContext, createContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { isRTL, getTextDirection, forceRTLScrollbar, cleanupRTLStyling, debugRTLState } from '../utils/rtl';
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
      
      const newRTLMode = isRTL(languageCode);
      setIsRTLMode(newRTLMode);
      saveLanguagePreference(languageCode);
      
      console.log('Language changed to:', languageCode, 'RTL mode:', newRTLMode);
      
      // Update document attributes safely
      if (typeof document !== 'undefined') {
        document.documentElement.lang = languageCode;
        document.documentElement.dir = getTextDirection(languageCode);
        
        // First, clean up any existing RTL/LTR classes to ensure clean state
        console.log('Cleaning up existing RTL/LTR classes...');
        cleanupRTLStyling();
        
        // Use specific class names to avoid conflicts
        if (newRTLMode) {
          document.body.classList.add('rtl-layout');
          // Only apply RTL scrollbar when needed
          forceRTLScrollbar();
          console.log('RTL layout and scrollbar applied');
        } else {
          document.body.classList.add('ltr-layout');
          console.log('LTR layout applied - all RTL styling cleaned up');
        }
        
        // Debug: Check final state
        console.log('Final RTL state after language change:');
        debugRTLState();
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