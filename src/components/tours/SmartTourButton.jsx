import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTour } from './TourContext';
import { useLocation } from 'react-router-dom';

const SmartTourButton = ({ 
  role, 
  expanded, 
  darkTheme, 
  onTourStart 
}) => {
  const { t } = useTranslation();
  const location = useLocation();
  const { getTourStatus, startTour, handleTourComingSoon } = useTour();

  // Extract current page from location
  const getCurrentPage = () => {
    const path = location.pathname;
    const segments = path.split('/');
    
    // Handle different route patterns
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
      return 'dashboard'; // Default for director
    }
    
    if (segments.includes('marketing-head')) {
      if (segments.includes('analytics')) return 'analytics';
      if (segments.includes('campaigns')) return 'campaigns';
      if (segments.includes('leads')) return 'leads';
      if (segments.includes('resources')) return 'resources';
      if (segments.includes('communication')) return 'communication';
      if (segments.includes('training')) return 'training';
      if (segments.includes('content')) return 'content';
      if (segments.includes('social')) return 'social';
      if (segments.includes('events')) return 'events';
      if (segments.includes('budget')) return 'budget';
      if (segments.includes('team')) return 'team';
      if (segments.includes('settings')) return 'settings';
      if (segments.includes('workspace')) return 'workspace';
      if (segments.includes('support')) return 'support';
      return 'dashboard'; // Default for marketing-head
    }
    
    if (segments.includes('admission-head')) {
      if (segments.includes('leads')) return 'leads';
      if (segments.includes('applications')) return 'applications';
      if (segments.includes('schedule')) return 'schedule';
      if (segments.includes('communication')) return 'communication';
      if (segments.includes('payments')) return 'payments';
      if (segments.includes('documents')) return 'documents';
      if (segments.includes('search')) return 'search';
      if (segments.includes('tools')) return 'tools';
      if (segments.includes('lead-transfer')) return 'lead-transfer';
      if (segments.includes('courses')) return 'courses';
      if (segments.includes('training')) return 'training';
      if (segments.includes('compliance')) return 'compliance';
      return 'dashboard'; // Default for admission-head
    }
    
    return 'dashboard';
  };

  const currentPage = getCurrentPage();
  const tourStatus = getTourStatus(role, currentPage);

  // Handle button click
  const handleClick = () => {
    console.log('Tour button clicked!', { role, currentPage, tourStatus });
    
    if (tourStatus.available) {
      // Start tour
      console.log('Starting tour for:', role, currentPage);
      const success = startTour(role, currentPage);
      console.log('Tour start result:', success);
      if (success && onTourStart) {
        onTourStart(role, currentPage);
      }
    } else {
      // Show coming soon message
      console.log('Tour coming soon for:', role, currentPage);
      handleTourComingSoon();
    }
  };

  // Get button styling based on tour status
  const getButtonStyles = () => {
    const baseStyles = `flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-300 w-full text-white ${
      expanded ? 'justify-start' : 'justify-center'
    }`;

    if (tourStatus.available) {
      return `${baseStyles} ${
        darkTheme ? 'hover:bg-gray-700' : 'hover:bg-white/30'
      }`;
    } else {
      return `${baseStyles} opacity-70 ${
        darkTheme ? 'hover:bg-gray-700' : 'hover:bg-white/30'
      }`;
    }
  };

  // Get icon based on tour status
  const getIcon = () => {
    if (tourStatus.available) {
      return (
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" className="w-5 h-5">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor"/>
        </svg>
      );
    } else {
      return (
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" className="w-5 h-5">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" fill="currentColor"/>
        </svg>
      );
    }
  };

  return (
    <button
      onClick={handleClick}
      className={getButtonStyles()}
      style={{ background: "transparent" }}
      title={tourStatus.text}
    >
      <span className={`text-2xl ${tourStatus.available ? 'text-yellow-400' : 'text-gray-400'}`}>
        {getIcon()}
      </span>
      {expanded && (
        <span className="whitespace-nowrap text-white">
          {tourStatus.text}
        </span>
      )}
    </button>
  );
};

export default SmartTourButton; 