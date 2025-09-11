import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLocalization } from "../../../hooks/useLocalization";
import SidebarLanguageSwitcher from "../../../components/localization/SidebarLanguageSwitcher";
import SmartTourButton from "../../../components/tours/SmartTourButton";
import SageAIButton from "../../../components/ui/SageAIButton";
import ThemeToggleButton from "../../../components/ui/ThemeToggleButton";

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
      dir={isRTLMode ? 'rtl' : 'ltr'}
    >
      {/* Fixed Logo at Top */}
      <div className="flex items-center justify-center py-6 px-2">
        <button
          onClick={() => navigate('/university-info')}
          className={`flex items-center hover:opacity-80 transition-opacity ${isRTLMode ? 'space-x-reverse space-x-3' : 'space-x-3'}`}
        >
          <img
            src="https://lms-frontend-resources.s3.ap-south-1.amazonaws.com/marlnlogopng.png"
            alt={t('sidebar.mbscLogo')}
            className={`transition-all duration-300 ${expanded ? 'w-12 h-12' : 'w-10 h-10'}`}
          />
          {expanded && (
            <span className={`text-2xl font-bold tracking-wide text-white ${isRTLMode ? 'mr-3' : 'ml-3'}`}>{userLabel}</span>
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
                className={`group flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 text-lg font-medium relative
                  ${isActive ? (darkTheme ? 'bg-gray-700 shadow-lg' : 'bg-white/20 shadow-lg') : ''}
                  ${expanded ? 'justify-start' : 'justify-center'}
                  ${!isActive ? (darkTheme ? 'hover:bg-gray-700' : 'hover:bg-white/10') : ''}
                  ${isRTLMode ? 'text-right' : 'text-left'}
                `}
                title={!expanded ? t(f.label) : undefined}
              >
                <span className="text-2xl">{f.icon}</span>
                {expanded && <span className="whitespace-nowrap text-white">{t(f.label)}</span>}
                {/* Tooltip for collapsed */}
                {!expanded && (
                  <span className={`absolute top-1/2 -translate-y-1/2 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 shadow-lg ${
                    isRTLMode ? 'right-full mr-2' : 'left-full ml-2'
                  }`}>
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
        {/* Enhanced Sage AI Button */}
        <SageAIButton expanded={expanded} darkTheme={darkTheme} isRTLMode={isRTLMode} role="director" />
        
        {/* Language Switcher */}
        <SidebarLanguageSwitcher expanded={expanded} darkTheme={darkTheme} />
        
        {/* Theme Toggle Button */}
        <ThemeToggleButton
          expanded={expanded}
          darkTheme={darkTheme}
          isRTLMode={isRTLMode}
          onToggle={handleThemeToggle}
        />
        
        {/* Smart Tour Button */}
        <SmartTourButton
          role="director"
          expanded={expanded}
          darkTheme={darkTheme}
          onTourStart={(role, page) => console.log(`Tour started for ${role}/${page}`)}
        />
        
        <button
          onClick={handleLogout}
          className={`flex items-center rounded-lg font-semibold transition-all duration-300 w-full text-white ${
            expanded ? (isRTLMode ? 'justify-end gap-2 px-4 py-2' : 'justify-start gap-2 px-4 py-2') : 'justify-center px-4 py-2'
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