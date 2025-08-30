import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { localStorageService } from "../services/localStorageService";
import { LocalizationProvider } from "../hooks/useLocalization.jsx";
import { useRTL } from "../hooks/useRTL";
import LanguageSwitcher from "./localization/LanguageSwitcher";
import RTLWrapper from "./localization/RTLWrapper";
import "../utils/i18n"; // Initialize i18n

// Map team/role to dashboard route
const dashboardRoute = (user) => {
  if (user.role === "Super Admin") return "/rbac";
  if (user.team === "Marketing Team" && user.role === "Head") return "/rbac/marketing-head";
  if (user.team === "Marketing Team" && user.role === "Manager") return "/rbac/marketing-manager";
  if (user.team === "Admission Team" && user.role === "Head") return "/rbac/admission-head";
  if (user.team === "Admission Team" && user.role === "SPOC") return "/rbac/admission-spoc";
  if (user.team === "HR & PayRoll Team" && user.role === "CFO/Head") return "/rbac/hr-head";
  if (user.team === "HR & PayRoll Team" && user.role === "Manager") return "/rbac/hr-manager";
  if (user.team === "Director and Deans" && user.role === "Director") return "/rbac/director";
  if (user.team === "Director and Deans" && user.role === "Dean") return "/rbac/dean";
  if (user.team === "Admin Team" && user.role === "Head") return "/rbac/admin-head";
  if (user.team === "IT & Support Team" && user.role === "Head") return "/rbac/it-head";
  if (user.team === "HoD" && user.role === "HoD") return "/rbac/hod";
  if (user.team === "Teacher/Professor" && user.role === "Senior Professor") return "/rbac/senior-professor";
  if (user.team === "Students" && user.role === "Students") return "/rbac/student";
  if (user.team === "Parents" && user.role === "Parents") return "/rbac/parent";
  if (user.team === "Exam Team" && user.role === "Head") return "/rbac/exam-head";
  if (user.team === "Library Team" && user.role === "Head") return "/rbac/library-head";
  if (user.team === "Transport Team" && user.role === "Head") return "/rbac/transport-head";
  // Add more as you build more dashboards
  // Default fallback
  return "/unauthorized";
};

function LoginPageContent() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [darkTheme, setDarkTheme] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation(['auth', 'common']);
  const { isRTL, flexDirection, textAlign } = useRTL();

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const getInitialTheme = () => {
      const stored = localStorage.getItem('theme');
      if (stored) return stored === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    };
    
    const initialTheme = getInitialTheme();
    setDarkTheme(initialTheme);
    
    if (initialTheme) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, []);

  const handleThemeToggle = () => {
    const newTheme = !darkTheme;
    setDarkTheme(newTheme);
    
    if (newTheme) {
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      // Simulate loading delay for better UX
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const users = localStorageService.getUsers();
      const user = users.find(
        (u) => u.username === username && u.password === password
      );
      if (user) {
        localStorage.setItem("rbac_current_user", JSON.stringify(user));
        navigate(dashboardRoute(user));
      } else {
        setError(t('auth.login.invalidCredentials'));
      }
    } catch (err) {
      setError(t('auth.login.invalidCredentials'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <RTLWrapper className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#4f3cc9] via-[#6c5dd3] to-[#90caf9] relative">
      {/* Language Switcher and Theme Toggle - Positioned absolutely in top-right */}
      <div className={`absolute top-6 ${isRTL ? 'left-6' : 'right-6'} z-10 flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}>
        {/* Theme Toggle Button */}
        <button
          onClick={handleThemeToggle}
          className={`
            relative inline-flex items-center justify-center w-12 h-12 
            bg-white/20 backdrop-blur-sm rounded-full 
            border border-white/30 shadow-lg
            hover:bg-white/30 hover:scale-105 
            transition-all duration-300 ease-in-out
            group
            ${isRTL ? 'ml-2' : 'mr-2'}
          `}
          title={darkTheme ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          aria-label={darkTheme ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {/* Sun Icon */}
          <svg
            className={`w-5 h-5 text-yellow-400 transition-all duration-300 ${
              darkTheme ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-0'
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
              clipRule="evenodd"
            />
          </svg>
          
          {/* Moon Icon */}
          <svg
            className={`w-5 h-5 text-blue-300 transition-all duration-300 absolute ${
              darkTheme ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>

          {/* Hover effect ring */}
          <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-white/40 transition-all duration-300"></div>
        </button>
        
        <LanguageSwitcher />
      </div>
      
      <div className={`flex w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl bg-white/10 backdrop-blur-lg border border-white/20 ${isRTL ? 'flex-row-reverse' : ''}`}>
        {/* Left Side - Logo & Tagline */}
        <div className={`hidden md:flex flex-col items-center justify-center w-1/2 bg-white/10 p-10 ${isRTL ? 'rounded-r-3xl' : 'rounded-l-3xl'}`}>
          <img
            src="https://lms-frontend-resources.s3.ap-south-1.amazonaws.com/NexusHiveCRM/NexusHive-Logo.png"
            alt="NexusHiveCRM Logo"
            className="w-28 h-28 mb-6"
          />
          <h2 className={`text-3xl font-bold text-white mb-4 drop-shadow-lg text-center`}>
            {t('auth.branding.title')}
          </h2>
          <p className={`text-white/80 text-center text-lg font-medium drop-shadow`}>
            {t('auth.branding.tagline')}
          </p>
        </div>
        {/* Right Side - Login Form */}
        <div className={`flex-1 flex flex-col justify-center items-center p-8 md:p-16 bg-white/20 ${isRTL ? 'rounded-l-3xl' : 'rounded-r-3xl'}`}>
          <div className="w-full max-w-sm">
                          <h2 className={`text-2xl font-bold text-center ${darkTheme ? 'text-white' : 'text-[#23232B]'} mb-8`}>
                {t('auth.login.title')}
              </h2>
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className={`block text-sm font-medium ${darkTheme ? 'text-white' : 'text-white/80'} mb-1 text-${textAlign('left')}`}>
                  {t('auth.login.username')}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    className={`w-full px-4 py-3 rounded-xl ${darkTheme ? 'bg-slate-700/80 text-white placeholder:text-slate-300/60' : 'bg-white/60 text-[#23232B] placeholder:text-[#23232B]/60'} focus:outline-none focus:ring-2 focus:ring-[#4f3cc9] font-medium shadow text-${textAlign('left')}`}
                    placeholder={t('auth.login.usernamePlaceholder')}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoFocus
                    disabled={isLoading}
                  />
                  <span className={`absolute ${isRTL ? 'left-4' : 'right-4'} top-1/2 -translate-y-1/2 text-[#4f3cc9]`}>
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="#4f3cc9"/></svg>
                  </span>
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium ${darkTheme ? 'text-white' : 'text-white/80'} mb-1 text-${textAlign('left')}`}>
                  {t('auth.login.password')}
                </label>
                <div className="relative">
                  <input
                    type="password"
                    className={`w-full px-4 py-3 rounded-xl ${darkTheme ? 'bg-slate-700/80 text-white placeholder:text-slate-300/60' : 'bg-white/60 text-[#23232B] placeholder:text-[#23232B]/60'} focus:outline-none focus:ring-2 focus:ring-[#4f3cc9] font-medium shadow text-${textAlign('left')}`}
                    placeholder={t('auth.login.passwordPlaceholder')}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                  />
                  <span className={`absolute ${isRTL ? 'left-4' : 'right-4'} top-1/2 -translate-y-1/2 text-[#4f3cc9]`}>
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M12 17a2 2 0 100-4 2 2 0 000 4zm6-7V8a6 6 0 10-12 0v2a2 2 0 00-2 2v6a2 2 0 002 2h12a2 2 0 002-2v-6a2 2 0 00-2-2zm-8-2a4 4 0 118 0v2H6V8zm10 10H4v-6h16v6z" fill="#4f3cc9"/></svg>
                  </span>
                </div>
                <div className={`flex ${isRTL ? 'justify-start' : 'justify-end'} mt-1`}>
                  <button type="button" className={`text-xs ${darkTheme ? 'text-white' : 'text-[#4f3cc9]'} hover:underline`}>
                    {t('auth.login.forgotPassword')}
                  </button>
                </div>
              </div>
              {error && (
                <div className={`text-sm text-center p-3 rounded-lg ${darkTheme ? 'text-red-400 bg-red-900/20' : 'text-red-500 bg-red-50'}`}>
                  {error}
                </div>
              )}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 rounded-xl bg-[#23232B] text-white font-semibold text-lg shadow hover:bg-[#4f3cc9] transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed ${flexDirection('row')}`}
              >
                {isLoading ? t('auth.login.loading') : t('auth.login.signInButton')}
                {!isLoading && (
                  <svg 
                    width="18" 
                    height="18" 
                    fill="none" 
                    viewBox="0 0 24 24"
                    className={isRTL ? 'rotate-180' : ''}
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </RTLWrapper>
  );
}

// Main export with LocalizationProvider wrapper
export default function LoginPage() {
  return (
    <LocalizationProvider>
      <LoginPageContent />
    </LocalizationProvider>
  );
} 