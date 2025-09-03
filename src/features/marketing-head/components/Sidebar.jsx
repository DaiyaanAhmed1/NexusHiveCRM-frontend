import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLocalization } from "../../../hooks/useLocalization";
import SidebarLanguageSwitcher from "../../../components/localization/SidebarLanguageSwitcher";
import SmartTourButton from '../../../components/tours/SmartTourButton';

export default function Sidebar({ features, userLabel, expanded, setExpanded }) {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { isRTLMode } = useLocalization();
  // Read initial theme from localStorage or system preference
  const getInitialTheme = () => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme');
      if (stored) return stored === 'dark';
      // fallback to system preference
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  };
  const [darkTheme, setDarkTheme] = useState(getInitialTheme);

  // Apply theme on mount and when darkTheme changes
  useEffect(() => {
    if (darkTheme) {
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkTheme]);

  const handleLogout = () => {
    localStorage.removeItem("rbac_current_user");
    navigate("/login");
  };

  const handleThemeToggle = () => {
    setDarkTheme((prev) => !prev);
  };

  return (
    <aside
      className={`${darkTheme ? 'bg-gray-900' : 'bg-gradient-to-b from-[#4f3cc9] to-[#6c5dd3]'} text-white flex flex-col shadow-lg h-screen transition-all duration-300 ${expanded ? 'w-56' : 'w-12'}`}
      style={{ zIndex: 20 }}
    >
      {/* Fixed Logo at Top */}
      <div className="flex items-center justify-center py-6 px-2">
        <button
          onClick={() => navigate('/university-info')}
          className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
        >
          <img
            src="https://lms-frontend-resources.s3.ap-south-1.amazonaws.com/college1/collage1.png"
            alt={t('sidebar.mbscLogo')}
            className={`transition-all duration-300 ${expanded ? 'w-12 h-12' : 'w-10 h-10'}`}
          />
          {expanded && (
            <span className="ml-3 text-2xl font-bold tracking-wide text-white">{t('roles.marketingHead')}</span>
          )}
        </button>
      </div>

      {/* Scrollable Navigation */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden py-4 px-2 scrollbar-thin scrollbar-thumb-[#888] scrollbar-track-transparent">
        <div className="flex flex-col gap-2">
          {features.map((f) => {
            const isActive = location.pathname === f.route;
            return (
              <button
                key={f.label}
                onClick={() => navigate(f.route)}
                className={`group flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 text-lg font-medium text-left relative
                  ${isActive ? (darkTheme ? 'bg-gray-700 shadow-lg' : 'bg-white/20 shadow-lg') : ''}
                  ${expanded ? 'justify-start' : 'justify-center'}
                  ${!isActive ? (darkTheme ? 'hover:bg-gray-700' : 'hover:bg-white/10') : ''}
                `}
                title={!expanded ? t(f.label) : undefined}
              >
                <span className="text-2xl">{f.icon}</span>
                {expanded && <span className="whitespace-nowrap text-white">{t(f.label)}</span>}
                {/* Tooltip for collapsed */}
                {!expanded && (
                  <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 shadow-lg">
                    {t(f.label)}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Fixed Buttons at Bottom */}
      <div className={`flex flex-col items-center gap-2 p-4 border-t ${
        darkTheme ? 'border-gray-700' : 'border-white/20'
      }`}>
        {/* Sage AI Button */}
        <button
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-300 w-full ${
            expanded ? 'justify-start' : 'justify-center'
          } ${
            darkTheme ? 'hover:bg-gray-700' : 'hover:bg-white/30'
          }`}
          style={{ background: "linear-gradient(135deg, #3b82f6, #1d4ed8)" }}
          title="Sage AI"
        >
          <span className="text-2xl">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" className="w-5 h-5">
              <path d="M9.5 2C7.01 2 5 4.01 5 6.5S7.01 11 9.5 11 14 8.99 14 6.5 11.99 2 9.5 2zM9.5 9C8.12 9 7 7.88 7 6.5S8.12 4 9.5 4 12 5.12 12 6.5 10.88 9 9.5 9z" fill="currentColor"/>
              <path d="M19 15.5c0-2.49-2.01-4.5-4.5-4.5s-4.5 2.01-4.5 4.5S12.01 20 14.5 20s4.5-2.01 4.5-4.5zM14.5 18c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor"/>
              <path d="M9.5 13c-1.38 0-2.5 1.12-2.5 2.5S8.12 18 9.5 18s2.5-1.12 2.5-2.5S10.88 13 9.5 13z" fill="currentColor"/>
              <path d="M14.5 13c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5z" fill="currentColor"/>
            </svg>
          </span>
          {expanded && <span className="text-white whitespace-nowrap">Sage AI</span>}
        </button>
        
        {/* Language Switcher */}
        <SidebarLanguageSwitcher expanded={expanded} darkTheme={darkTheme} />
        
        {/* Theme Toggle Button */}
        <button
          onClick={handleThemeToggle}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-300 w-full text-white ${
            expanded ? 'justify-start' : 'justify-center'
          } ${
            darkTheme ? 'hover:bg-gray-700' : 'hover:bg-white/30'
          }`}
          style={{ background: "transparent" }}
          title={darkTheme ? t('sidebar.switchToLightMode') : t('sidebar.switchToDarkMode')}
        >
          <span className="text-2xl">
            {darkTheme ? (
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" className="w-5 h-5">
                <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-3.03 0-5.5-2.47-5.5-5.5 0-1.82.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z" fill="currentColor"/>
              </svg>
            ) : (
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" className="w-5 h-5">
                <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z" fill="currentColor"/>
              </svg>
            )}
          </span>
          {expanded && <span className="text-white whitespace-nowrap">{darkTheme ? t('sidebar.darkMode') : t('sidebar.lightMode')}</span>}
        </button>
        
        <SmartTourButton
          role="marketing-head"
          expanded={expanded}
          darkTheme={darkTheme}
        />
        
        <button
          onClick={handleLogout}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-300 w-full text-white ${
            expanded ? 'justify-start' : 'justify-center'
          } ${
            darkTheme ? 'hover:bg-gray-700' : 'hover:bg-white/30'
          }`}
          style={{ background: "transparent" }}
          title={t('sidebar.logout')}
        >
          <span className="text-2xl">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" className="w-5 h-5">
              <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" fill="currentColor"/>
            </svg>
          </span>
          {expanded && <span className="text-white whitespace-nowrap">{t('sidebar.logout')}</span>}
        </button>
        <button
          onClick={() => setExpanded((e) => !e)}
          className="bg-[#23232B] hover:bg-neutral-800 text-white rounded-full p-2 transition-colors"
          title={expanded ? t('sidebar.collapseSidebar') : t('sidebar.expandSidebar')}
        >
          {expanded ? (
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
              <path d={isRTLMode ? "M9 5l7 7-7 7" : "M15 19l-7-7 7-7"} stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
              <path d={isRTLMode ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </button>
      </div>

      <style>{`
        /* Custom scrollbar for browsers that don't support Tailwind's scrollbar utilities */
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
      `}</style>
    </aside>
  );
} 