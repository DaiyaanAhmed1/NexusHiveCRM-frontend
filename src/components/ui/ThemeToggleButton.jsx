import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const ThemeToggleButton = ({ expanded, darkTheme, onToggle, isRTLMode = false }) => {
  const { t } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);
  const [glowAnimation, setGlowAnimation] = useState(false);

  // Glow animation every 7 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setGlowAnimation(true);
      setTimeout(() => setGlowAnimation(false), 1500);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <button
      onClick={onToggle}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-300 w-full text-white group relative overflow-hidden ${
        expanded ? (isRTLMode ? 'justify-end' : 'justify-start') : 'justify-center'
      } ${
        darkTheme ? 'hover:bg-gray-700' : 'hover:bg-white/30'
      } ${glowAnimation ? (darkTheme ? 'shadow-lg shadow-orange-400/15 ring-1 ring-orange-400/10' : 'shadow-lg shadow-blue-400/15 ring-1 ring-blue-400/10') : ''}`}
      style={{ background: "transparent" }}
      title={darkTheme ? t('sidebar.switchToLightMode') : t('sidebar.switchToDarkMode')}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Enhanced tooltip for collapsed mode */}
      {!expanded && (
        <div className={`absolute ${isRTLMode ? 'right-full mr-2' : 'left-full ml-2'} top-1/2 -translate-y-1/2 bg-black text-white text-xs rounded-lg px-3 py-2 opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 z-50 shadow-xl whitespace-nowrap`}>
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${darkTheme ? 'bg-orange-400' : 'bg-blue-400'}`}></span>
            {darkTheme ? t('sidebar.switchToLightMode') : t('sidebar.switchToDarkMode')}
          </div>
          {/* Tooltip arrow */}
          <div className={`absolute ${isRTLMode ? 'left-full' : 'right-full'} top-1/2 -translate-y-1/2 border-4 border-transparent ${isRTLMode ? 'border-l-black' : 'border-r-black'}`}></div>
        </div>
      )}

      {/* Icon container with theme animations */}
      <span className={`text-2xl transition-all duration-500 flex-shrink-0 ${
        isHovered ? 'scale-110 rotate-180' : ''
      } ${expanded && isRTLMode ? 'order-2' : ''}`}>
        <div className="relative">
          {/* Glowing background effect */}
          <div className={`absolute inset-0 rounded-full blur-sm opacity-0 transition-opacity duration-500 ${
            glowAnimation ? (darkTheme ? 'bg-orange-300 opacity-20' : 'bg-blue-300 opacity-20') : ''
          }`}></div>
          
          {/* Main theme icon */}
          <div className="relative z-10">
            {darkTheme ? (
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" className={`w-5 h-5 transition-all duration-300 ${
                isHovered ? 'text-orange-200' : 'text-white'
              }`}>
                <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-3.03 0-5.5-2.47-5.5-5.5 0-1.82.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z" fill="currentColor"/>
              </svg>
            ) : (
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" className={`w-5 h-5 transition-all duration-300 ${
                isHovered ? 'text-yellow-200' : 'text-white'
              }`}>
                <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z" fill="currentColor"/>
              </svg>
            )}
          </div>
          
          {/* Theme change indicator */}
          {/* Removed blinking indicator */}
        </div>
      </span>
      
      {/* Text container for expanded mode */}
      {expanded && (
        <span className={`text-white whitespace-nowrap transition-transform duration-200 flex-1 ${
          isHovered ? (isRTLMode ? 'translate-x-1' : 'translate-x-1') : ''
        } ${isRTLMode ? 'text-right order-1' : 'text-left'}`}>
          {darkTheme ? t('sidebar.darkMode') : t('sidebar.lightMode')}
        </span>
      )}

      {/* Shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-10 -skew-x-12 transition-all duration-700 rounded-lg"></div>
      
      {/* Theme transition indicator for collapsed mode */}
      {/* Removed blinking indicator */}
    </button>
  );
};

export default ThemeToggleButton; 