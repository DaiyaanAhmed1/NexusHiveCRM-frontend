import React, { useState, useEffect } from 'react';
import { useLocalization } from '../../hooks/useLocalization';

const SidebarLanguageSwitcher = ({ expanded, darkTheme }) => {
  const { currentLanguage, toggleLanguage } = useLocalization();
  const [isHovered, setIsHovered] = useState(false);
  const [glowAnimation, setGlowAnimation] = useState(false);

  // Glow animation every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setGlowAnimation(true);
      setTimeout(() => setGlowAnimation(false), 1500);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <button
      onClick={toggleLanguage}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-300 w-full text-white group relative overflow-hidden ${
        expanded ? 'justify-start' : 'justify-center'
      } ${
        darkTheme ? 'hover:bg-gray-700' : 'hover:bg-white/30'
      } ${glowAnimation ? 'shadow-lg shadow-green-400/10 ring-1 ring-green-400/5' : ''}`}
      style={{ background: "transparent" }}
      title={currentLanguage === 'en' ? 'Switch to Arabic' : 'Switch to English'}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Enhanced tooltip for collapsed mode */}
      {!expanded && (
        <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-black text-white text-xs rounded-lg px-3 py-2 opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 z-50 shadow-xl whitespace-nowrap">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full"></span>
            {currentLanguage === 'en' ? 'Switch to Arabic' : 'Switch to English'}
          </div>
          {/* Tooltip arrow */}
          <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-black"></div>
        </div>
      )}

      {/* Icon container with language animations */}
      <span className={`text-2xl transition-transform duration-200 flex-shrink-0 ${
        isHovered ? 'scale-110' : ''
      }`}>
        <div className="relative">
          {/* Glowing background effect */}
          <div className={`absolute inset-0 bg-green-300 rounded-sm blur-sm opacity-0 transition-opacity duration-500 ${
            glowAnimation ? 'opacity-10' : ''
          }`}></div>
          
          {/* Main language text */}
          <span className={`font-bold text-lg relative z-10 transition-all duration-300 ${
            isHovered ? 'text-green-200' : 'text-white'
          }`}>
            {currentLanguage === 'en' ? 'EN' : 'AR'}
          </span>
          
          {/* Language switch indicator */}
          {/* Removed blinking indicator */}
        </div>
      </span>
      
      {/* Text container for expanded mode */}
      {expanded && (
        <span className={`text-white whitespace-nowrap transition-transform duration-200 ${
          isHovered ? 'translate-x-1' : ''
        }`}>
          {currentLanguage === 'en' ? 'Switch to Arabic' : 'Switch to English'}
        </span>
      )}

      {/* Shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-10 -skew-x-12 transition-all duration-700 rounded-lg"></div>
    </button>
  );
};

export default SidebarLanguageSwitcher; 