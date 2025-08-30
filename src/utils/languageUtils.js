import { isRTL } from './rtl.js';

export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
];

export const getLanguageByCode = (code) => {
  return SUPPORTED_LANGUAGES.find(lang => lang.code === code) || SUPPORTED_LANGUAGES[0];
};

export const getLanguageName = (code, currentLanguage = 'en') => {
  const language = getLanguageByCode(code);
  return currentLanguage === 'ar' ? language.nativeName : language.name;
};

export const saveLanguagePreference = (languageCode) => {
  try {
    localStorage.setItem('preferred-language', languageCode);
    document.documentElement.lang = languageCode;
    document.documentElement.dir = isRTL(languageCode) ? 'rtl' : 'ltr';
  } catch (error) {
    console.error('Failed to save language preference:', error);
  }
};

export const getLanguagePreference = () => {
  try {
    return localStorage.getItem('preferred-language') || 'en';
  } catch (error) {
    console.error('Failed to get language preference:', error);
    return 'en';
  }
};

export const detectUserLanguage = () => {
  const saved = getLanguagePreference();
  if (saved) return saved;
  
  try {
    const browserLang = navigator.language.split('-')[0];
    return SUPPORTED_LANGUAGES.find(lang => lang.code === browserLang) ? browserLang : 'en';
  } catch (error) {
    console.error('Failed to detect browser language:', error);
    return 'en';
  }
};

export const isLanguageSupported = (languageCode) => {
  return SUPPORTED_LANGUAGES.some(lang => lang.code === languageCode);
};

export const getDefaultLanguage = () => {
  return SUPPORTED_LANGUAGES[0].code;
};

export const formatLanguageDisplay = (languageCode, showFlag = true, showNativeName = true) => {
  const language = getLanguageByCode(languageCode);
  if (!language) return languageCode;
  
  let display = '';
  if (showFlag) display += `${language.flag} `;
  if (showNativeName) {
    display += language.nativeName;
  } else {
    display += language.name;
  }
  
  return display;
}; 