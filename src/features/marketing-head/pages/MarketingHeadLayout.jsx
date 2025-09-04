import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { marketingHeadFeatures } from '../../../components/marketingHeadFeatures';
import { TourProvider, TourOverlay } from '../../../components/tours';
import { useTour } from '../../../components/tours/TourContext';

function AutoStartTour({ role }) {
  const location = useLocation();
  const { startTour, getTourStatus, isActive } = useTour();
  const user = JSON.parse(localStorage.getItem('rbac_current_user'));

  const getCurrentPage = (pathname) => {
    const segments = pathname.split('/');
    if (segments.includes('marketing-head')) {
      if (segments.includes('analytics')) return 'analytics';
      if (segments.includes('campaigns')) return 'campaigns';
      if (segments.includes('leads')) return 'leads';
      if (segments.includes('resources')) return 'resources';
      if (segments.includes('communication')) return 'communication';
      if (segments.includes('training')) return 'training';
      if (segments.includes('team')) return 'team';
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

export default function MarketingHeadLayout() {
  const [expanded, setExpanded] = useState(false);
  const user = JSON.parse(localStorage.getItem('rbac_current_user'));
  
  return (
    <TourProvider>
      <div className="flex h-screen bg-[#F6F7FA] dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800">
        <Sidebar 
          features={marketingHeadFeatures} 
          userLabel={user?.displayName || user?.role || "Marketing Head"} 
          expanded={expanded}
          setExpanded={setExpanded}
        />
        <main className="flex-1 overflow-y-auto">
          <div className="p-6 md:p-8 lg:p-10 flex flex-col gap-6">
            <AutoStartTour role="marketing-head" />
            <Outlet />
          </div>
        </main>
        <TourOverlay />
      </div>
    </TourProvider>
  );
} 