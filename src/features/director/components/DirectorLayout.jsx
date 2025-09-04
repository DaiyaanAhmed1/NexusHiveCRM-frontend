import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { directorFeatures } from "./directorFeatures";
import { Outlet, useLocation } from "react-router-dom";
import { useLocalization } from "../../../hooks/useLocalization";
import { useTranslation } from "react-i18next";
import TourOverlay from "../../../components/tours/TourOverlay";
import { TourProvider } from "../../../components/tours/TourContext";
import { useTour } from "../../../components/tours/TourContext";

function AutoStartTour({ role }) {
  const location = useLocation();
  const { startTour, getTourStatus, isActive } = useTour();
  const user = JSON.parse(localStorage.getItem('rbac_current_user'));

  const getCurrentPage = (pathname) => {
    const segments = pathname.split('/');
    if (segments.includes('director')) {
      if (segments.includes('analytics')) return 'analytics';
      if (segments.includes('departments')) return 'departments';
      if (segments.includes('approvals')) return 'approvals';
      if (segments.includes('strategic-planning')) return 'strategic-planning';
      if (segments.includes('communication')) return 'communication';
      if (segments.includes('audit')) return 'audit';
      if (segments.includes('calendar')) return 'calendar';
      if (segments.includes('users')) return 'users';
      if (segments.includes('settings')) return 'settings';
      if (segments.includes('workspace')) return 'workspace';
      if (segments.includes('support')) return 'support';
      return 'dashboard';
    }
    return 'dashboard';
  };

  React.useEffect(() => {
    const page = getCurrentPage(location.pathname);
    const userKey = (user?.id || user?.email || user?.username || user?.displayName || 'guest') + '';
    const seenKey = `tour_seen_${userKey}_${role}_${page}`;
    const status = getTourStatus(role, page);
    if (!isActive && status.available && !localStorage.getItem(seenKey)) {
      const timer = setTimeout(() => {
        const started = startTour(role, page);
        if (started) {
          try { localStorage.setItem(seenKey, 'true'); } catch {}
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [location.pathname, role, isActive]);

  return null;
}

export default function DirectorLayout() {
  const user = JSON.parse(localStorage.getItem('rbac_current_user'));
  const [expanded, setExpanded] = useState(false);
  const { isRTLMode } = useLocalization();
  const { t } = useTranslation();

  return (
    <TourProvider>
      <div className="bg-[#F6F7FA] dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 min-h-screen" dir={isRTLMode ? 'rtl' : 'ltr'}>
        {/* Fixed Sidebar */}
        <div className={`${expanded ? "w-56" : "w-12"} flex-shrink-0 transition-all duration-300 fixed top-0 h-screen z-30 ${
          isRTLMode ? 'right-0' : 'left-0'
        }`}>
          <Sidebar
            features={directorFeatures}
            userLabel={user?.displayName || t('roles.director')}
            expanded={expanded}
            setExpanded={setExpanded}
          />
        </div>
        {/* Main content with dynamic margin */}
        <main className={`flex-1 p-6 space-y-8 overflow-y-auto transition-all duration-300 ${
          expanded 
            ? (isRTLMode ? 'mr-56' : 'ml-56') 
            : (isRTLMode ? 'mr-12' : 'ml-12')
        }`}>
          <AutoStartTour role="director" />
          <Outlet />
        </main>
        
        {/* Tour Overlay */}
        <TourOverlay />
        
        {/* Tour-specific styles */}
        <style>{`
          @keyframes pulse {
            0%, 100% {
              opacity: 1;
            }
            50% {
              opacity: 0.5;
            }
          }
          
          @keyframes tourPulse {
            0%, 100% {
              outline-color: #3b82f6;
              box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
            }
            50% {
              outline-color: #60a5fa;
              box-shadow: 0 0 30px rgba(59, 130, 246, 0.7);
            }
          }
        `}</style>
      </div>
    </TourProvider>
  );
} 