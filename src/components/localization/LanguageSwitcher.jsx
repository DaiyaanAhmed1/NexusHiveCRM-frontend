import React, { useState } from 'react';
import { useLocalization } from '../../hooks/useLocalization.jsx';
import { useTranslation } from 'react-i18next';
import { SUPPORTED_LANGUAGES } from '../../utils/languageUtils';
import { FiGlobe, FiChevronDown } from 'react-icons/fi';

const LanguageSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentLanguage, changeLanguage, isRTLMode } = useLocalization();
  const { t } = useTranslation('common');
  
  const currentLang = SUPPORTED_LANGUAGES.find(lang => lang.code === currentLanguage);

  const handleLanguageChange = (languageCode) => {
    changeLanguage(languageCode);
    setIsOpen(false);
  };

  return (
    <div className="relative language-switcher">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${isRTLMode ? 'space-x-reverse space-x-2' : 'space-x-2'}`}
        aria-label={t('language.switcher')}
      >
        <FiGlobe className="w-4 h-4" />
        <span className="text-sm font-medium">{currentLang?.flag} {currentLang?.nativeName}</span>
        <FiChevronDown className={`w-4 h-4 transition-transform chevron-icon ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className={`absolute top-full mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 dropdown-menu ${isRTLMode ? 'left-0' : 'right-0'}`}>
          {SUPPORTED_LANGUAGES.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className={`w-full px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-${isRTLMode ? 'right' : 'left'} dropdown-item ${
                currentLanguage === language.code ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 active' : ''
              }`}
            >
              <div className={`flex items-center ${isRTLMode ? 'space-x-reverse space-x-3' : 'space-x-3'}`}>
                <span className="text-lg">{language.flag}</span>
                <div className={`${isRTLMode ? 'text-right' : 'text-left'}`}>
                  <div className="font-medium">{language.nativeName}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{language.name}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher; 