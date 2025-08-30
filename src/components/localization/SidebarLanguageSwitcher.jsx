import React from 'react';
import { useLocalization } from '../../hooks/useLocalization';

const SidebarLanguageSwitcher = ({ expanded, darkTheme }) => {
  const { currentLanguage, toggleLanguage } = useLocalization();

  return (
    <button
      onClick={toggleLanguage}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-300 w-full text-white ${
        expanded ? 'justify-start' : 'justify-center'
      } ${
        darkTheme ? 'hover:bg-gray-700' : 'hover:bg-white/30'
      }`}
      style={{ background: "transparent" }}
      title={currentLanguage === 'en' ? 'Switch to Arabic' : 'Switch to English'}
    >
      <span className="text-2xl">
        <span className="font-bold text-lg">
          {currentLanguage === 'en' ? 'EN' : 'AR'}
        </span>
      </span>
      {expanded && (
        <span className="text-white whitespace-nowrap">
          {currentLanguage === 'en' ? 'Switch to Arabic' : 'Switch to English'}
        </span>
      )}
    </button>
  );
};

export default SidebarLanguageSwitcher; 