import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import trialService from '../../services/trialService';

const TrialCounter = ({ roleColor = 'blue' }) => {
  const { t } = useTranslation();
  const [trialStatus, setTrialStatus] = useState(trialService.getTrialStatus());

  useEffect(() => {
    const updateStatus = () => {
      setTrialStatus(trialService.getTrialStatus());
    };

    window.addEventListener('trialUpdated', updateStatus);
    updateStatus();

    return () => {
      window.removeEventListener('trialUpdated', updateStatus);
    };
  }, []);

  const getColorClasses = (color) => {
    const colors = {
      blue: 'from-blue-500 to-blue-600',
      orange: 'from-orange-500 to-orange-600',
      green: 'from-green-500 to-green-600',
      purple: 'from-purple-500 to-purple-600'
    };
    return colors[color] || colors.blue;
  };

  const getStatusColor = () => {
    if (trialStatus.isExpired) return 'text-red-600 dark:text-red-400';
    if (trialStatus.remaining <= 3) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-green-600 dark:text-green-400';
  };

  const getProgressColor = () => {
    if (trialStatus.isExpired) return 'bg-red-500';
    if (trialStatus.remaining <= 3) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const handleResetTrial = () => {
    if (window.confirm('Reset trial counter? This will restore all 20 questions.')) {
      trialService.resetTrialForSession();
      window.dispatchEvent(new CustomEvent('trialUpdated'));
    }
  };

  // Check if we're in development mode
  const isDevelopment = import.meta.env.DEV || import.meta.env.MODE === 'development';

  return (
    <div className="flex items-center gap-3 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
      <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${getColorClasses(roleColor)} flex items-center justify-center`}>
        <svg width="16" height="16" fill="white" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            Free Trial
          </span>
          <span className={`text-sm font-semibold ${getStatusColor()}`}>
            {trialStatus.remaining} / {trialStatus.maxQuestions}
          </span>
        </div>
        
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${getProgressColor()}`}
            style={{ width: `${trialService.getTrialProgress()}%` }}
          ></div>
        </div>
        
        <div className="mt-1">
          {trialStatus.isExpired ? (
            <span className="text-xs text-red-600 dark:text-red-400 font-medium">
              Trial expired - Please upgrade
            </span>
          ) : trialStatus.remaining <= 3 ? (
            <span className="text-xs text-yellow-600 dark:text-yellow-400 font-medium">
              {trialStatus.remaining} questions remaining
            </span>
          ) : (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {trialStatus.questionsUsed} questions used
            </span>
          )}
        </div>
      </div>

      {/* Development Reset Button */}
      {isDevelopment && (
        <button
          onClick={handleResetTrial}
          className="p-1.5 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-all duration-200"
          title="Reset Trial Counter (Dev Only)"
        >
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
          </svg>
        </button>
      )}

      {trialStatus.isExpired && (
        <button className="px-3 py-1 bg-gradient-to-r from-purple-500 to-purple-600 text-white text-xs font-medium rounded-md hover:from-purple-600 hover:to-purple-700 transition-all duration-200">
          Upgrade
        </button>
      )}
    </div>
  );
};

export default TrialCounter;