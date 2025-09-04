import React, { useState, useEffect } from 'react';
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
  const { getTourStatus, startTour, handleTourComingSoon, isLoading } = useTour();
  const [isHovered, setIsHovered] = useState(false);
  const [pulseAnimation, setPulseAnimation] = useState(false);

  // Add subtle glowing animation for available tours
  useEffect(() => {
    const currentPage = getCurrentPage();
    const tourStatus = getTourStatus(role, currentPage);
    
    if (tourStatus.available && !isLoading) {
      const interval = setInterval(() => {
        setPulseAnimation(true);
        setTimeout(() => setPulseAnimation(false), 1500);
      }, 4000);
      
      return () => clearInterval(interval);
    }
  }, [role, location.pathname, isLoading]);

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
      if (segments.includes('workspace')) return 'workspace';
      if (segments.includes('lead-transfer')) return 'lead-transfer';
      if (segments.includes('courses')) return 'courses';
      if (segments.includes('training')) return 'training';
      if (segments.includes('compliance')) return 'compliance';
      if (segments.includes('support')) return 'support';
      return 'dashboard'; // Default for admission-head
    }
    
    return 'dashboard';
  };

  const currentPage = getCurrentPage();
  const tourStatus = getTourStatus(role, currentPage);

  // Handle button click
  const handleClick = () => {
    if (isLoading) return; // prevent multiple clicks while loading
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
    const baseTransitions = 'transition-all duration-300 transform hover:scale-105';
    const shadowEffects = tourStatus.available 
      ? 'shadow-lg hover:shadow-xl' 
      : 'shadow-md';

    if (tourStatus.available) {
      const bgGradient = 'bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500';
      const hoverEffect = 'hover:from-yellow-300 hover:via-yellow-400 hover:to-orange-400';
      const activeEffect = 'active:scale-95';
      const glowEffect = pulseAnimation ? 'shadow-lg shadow-yellow-400/15 ring-1 ring-yellow-400/10' : '';
      
      return `flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-300 w-full text-white ${
        expanded ? 'justify-start' : 'justify-center'
      } ${bgGradient} ${hoverEffect} ${shadowEffects} ${activeEffect} ${glowEffect}`;
    } else {
      const bgGradient = 'bg-gradient-to-r from-gray-500 via-gray-600 to-gray-700';
      const hoverEffect = darkTheme 
        ? 'hover:from-gray-400 hover:via-gray-500 hover:to-gray-600' 
        : 'hover:from-gray-400 hover:via-gray-500 hover:to-gray-600';
      
      return `flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-300 w-full text-white ${
        expanded ? 'justify-start' : 'justify-center'
      } ${bgGradient} ${hoverEffect} ${shadowEffects} opacity-80 hover:opacity-90`;
    }
  };

  // Get icon based on tour status with enhanced animations
  const getIcon = () => {
    if (isLoading) {
      return (
        <div className="relative">
          <svg width="20" height="20" viewBox="0 0 24 24" className="w-5 h-5 animate-spin">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" opacity="0.25" />
            <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="3" fill="none" />
          </svg>
        </div>
      );
    }
    
    if (tourStatus.available) {
      return (
        <div className={`relative ${isHovered ? 'animate-bounce' : ''}`}>
          {/* Glowing background effect */}
          <div className="absolute inset-0 bg-yellow-300 rounded-full blur-sm opacity-40 animate-pulse"></div>
          
          {/* Main star icon */}
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" className="w-5 h-5 relative z-10">
            <path 
              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" 
              fill="currentColor"
              className="drop-shadow-sm"
            />
          </svg>
          
          {/* Sparkle effects for expanded mode */}
          {expanded && tourStatus.available && (
            <>
              <div className="absolute -top-1 -right-1 w-1 h-1 bg-white rounded-full animate-ping"></div>
              <div className="absolute -bottom-1 -left-1 w-1 h-1 bg-white rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
            </>
          )}
        </div>
      );
    } else {
      return (
        <div className="relative">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" className="w-5 h-5 opacity-70">
            <path 
              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" 
              fill="currentColor"
            />
            <path 
              d="M8 8l8 8M16 8l-8 8" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round"
            />
          </svg>
        </div>
      );
    }
  };

  return (
    <div className="relative w-full flex items-center justify-center">
      {/* Enhanced tooltip for collapsed mode */}
      {!expanded && (
        <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-black text-white text-xs rounded-lg px-3 py-2 opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 z-50 shadow-xl whitespace-nowrap">
          <div className="flex items-center gap-2">
            {tourStatus.available && (
              <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
            )}
            {isLoading ? t('common.loading') : tourStatus.text}
          </div>
          {/* Tooltip arrow */}
          <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-black"></div>
        </div>
      )}
      
      <button
        onClick={handleClick}
        className={`${getButtonStyles()} group relative overflow-hidden`}
        title={tourStatus.text}
        disabled={isLoading}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Icon container with enhanced styling */}
        <span className={`text-2xl ${tourStatus.available ? 'text-white' : 'text-gray-200'} ${
          isHovered && tourStatus.available ? 'scale-110' : ''
        } transition-transform duration-200 flex-shrink-0`}>
          {getIcon()}
        </span>
        
        {/* Text container for expanded mode */}
        {expanded && (
          <span className={`whitespace-nowrap font-medium ${
            tourStatus.available ? 'text-white' : 'text-gray-200'
          } ${isHovered ? 'translate-x-1' : ''} transition-transform duration-200 flex-1 text-left min-w-0`}>
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="animate-pulse">{t('common.loading')}</span>
                <div className="flex space-x-1">
                  <div className="w-1 h-1 bg-white rounded-full animate-bounce"></div>
                  <div className="w-1 h-1 bg-white rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-1 h-1 bg-white rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </span>
            ) : (
              tourStatus.text
            )}
          </span>
        )}
        
        {/* Shine effect for available tours */}
        {tourStatus.available && !isLoading && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 -skew-x-12 transition-all duration-700 rounded-lg"></div>
        )}
        
        {/* Floating indicator for collapsed mode when tour is available */}
        {!expanded && tourStatus.available && !isLoading && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse shadow-lg border-2 border-white"></div>
        )}
      </button>
    </div>
  );
};

export default SmartTourButton; 