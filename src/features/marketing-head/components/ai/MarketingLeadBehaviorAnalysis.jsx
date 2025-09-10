import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalization } from '../../../../hooks/useLocalization';
import LeadBehaviorAnalysis from './LeadBehaviorAnalysis';
import leadBehaviorService from '../../services/leadBehaviorService';
import enTranslations from '../../../ai-enhanced/locals/en.json';
import arTranslations from '../../../ai-enhanced/locals/ar.json';

const MarketingLeadBehaviorAnalysis = ({ onAnalysisComplete }) => {
  const { t } = useTranslation();
  const { isRTLMode } = useLocalization();
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);

  // Get translations based on current language
  const getTranslations = () => {
    return isRTLMode ? arTranslations : enTranslations;
  };

  // Helper function to get translation
  const getTranslation = (key, fallback) => {
    const translations = getTranslations();
    const keys = key.split('.');
    let value = translations;
    
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) break;
    }
    
    return value || fallback;
  };

  // Sample leads data with behavior
  const sampleLeads = [
    {
      id: 1,
      name: 'Ahmed Al-Rashid',
      email: 'ahmed.rashid@email.com',
      location: 'Riyadh',
      interest: 'Engineering',
      engagement: 'High',
      lastContact: '2024-01-15',
      behavior: {
        emailOpens: 8,
        websiteVisits: 5,
        contentDownloads: 3,
        socialEngagement: 4,
        formSubmissions: 2,
        eventAttendance: 1
      }
    },
    {
      id: 2,
      name: 'Fatima Al-Zahra',
      email: 'fatima.zahra@email.com',
      location: 'Jeddah',
      interest: 'Business',
      engagement: 'Medium',
      lastContact: '2024-01-10',
      behavior: {
        emailOpens: 5,
        websiteVisits: 3,
        contentDownloads: 2,
        socialEngagement: 2,
        formSubmissions: 1,
        eventAttendance: 0
      }
    },
    {
      id: 3,
      name: 'Omar Al-Mansouri',
      email: 'omar.mansouri@email.com',
      location: 'Dammam',
      interest: 'Computer Science',
      engagement: 'High',
      lastContact: '2024-01-12',
      behavior: {
        emailOpens: 7,
        websiteVisits: 6,
        contentDownloads: 4,
        socialEngagement: 5,
        formSubmissions: 3,
        eventAttendance: 2
      }
    },
    {
      id: 4,
      name: 'Layla Al-Hassan',
      email: 'layla.hassan@email.com',
      location: 'Riyadh',
      interest: 'Medicine',
      engagement: 'Low',
      lastContact: '2024-01-05',
      behavior: {
        emailOpens: 2,
        websiteVisits: 1,
        contentDownloads: 1,
        socialEngagement: 1,
        formSubmissions: 0,
        eventAttendance: 0
      }
    },
    {
      id: 5,
      name: 'Khalid Al-Rashid',
      email: 'khalid.rashid@email.com',
      location: 'Jeddah',
      interest: 'Architecture',
      engagement: 'Medium',
      lastContact: '2024-01-08',
      behavior: {
        emailOpens: 4,
        websiteVisits: 3,
        contentDownloads: 2,
        socialEngagement: 3,
        formSubmissions: 1,
        eventAttendance: 1
      }
    }
  ];

  // Memoize the analysis completion handler
  const handleAnalysisComplete = useCallback((result) => {
    console.log('MarketingLeadBehaviorAnalysis - Analysis completed:', result);
    setAnalysis(result);
    setHasAnalyzed(true);
    if (onAnalysisComplete) {
      onAnalysisComplete(result);
    }
  }, [onAnalysisComplete]);

  // Handle start analysis
  const handleStartAnalysis = useCallback(() => {
    setShowAnalysis(true);
    setLoading(true);
    
    // Simulate a small delay to show loading state
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  // Handle hide analysis
  const handleHideAnalysis = useCallback(() => {
    setShowAnalysis(false);
    setAnalysis(null);
    setHasAnalyzed(false);
  }, []);

  if (!showAnalysis) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="text-center">
          <div className="text-4xl mb-4">📊</div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {getTranslation('ai.behaviorAnalysis.title', 'Lead Behavior Analysis')}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {getTranslation('ai.behaviorAnalysis.description', 'Analyze lead behavior patterns and engagement levels to optimize your marketing strategy.')}
          </p>
          <button
            onClick={handleStartAnalysis}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
          >
            {getTranslation('ai.behaviorAnalysis.startAnalysis', 'Start Analysis')}
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-3 text-gray-600 dark:text-gray-300">
            {getTranslation('ai.behaviorAnalysis.analyzing', 'Analyzing behavior patterns...')}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {getTranslation('ai.behaviorAnalysis.title', 'Lead Behavior Analysis')}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            {getTranslation('ai.behaviorAnalysis.description', 'AI-powered behavior insights and engagement tracking')}
          </p>
        </div>
        <button
          onClick={handleHideAnalysis}
          className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors"
        >
          {getTranslation('ai.behaviorAnalysis.hide', 'Hide Analysis')}
        </button>
      </div>

      <LeadBehaviorAnalysis
        leads={sampleLeads}
        onAnalysisComplete={handleAnalysisComplete}
      />
    </div>
  );
};

export default MarketingLeadBehaviorAnalysis;