import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalization } from '../../../../hooks/useLocalization';
import leadBehaviorService from "../../services/leadBehaviorService.js";
import enTranslations from "../../../../locales/en/admission.json";
import arTranslations from "../../../../locales/ar/admission.json";

const LeadBehaviorAnalysis = ({ leads, onAnalysisComplete }) => {
  const { t } = useTranslation();
  const { isRTLMode } = useLocalization();
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filterBy, setFilterBy] = useState('all');
  const [sortBy, setSortBy] = useState('behaviorScore');
  const [hasAnalyzed, setHasAnalyzed] = useState(false);

  // Get translations based on current language
  const getTranslations = () => {
    return isRTLMode ? arTranslations : enTranslations;
  };

  // Helper function to get translation with fallback
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

  // Memoize the analysis function
  const handleAnalyze = useCallback(async () => {
    if (!leads || leads.length === 0 || hasAnalyzed) {
      return;
    }

    setLoading(true);
    setError(null);
    setHasAnalyzed(true);
    
    try {
      console.log('Starting behavior analysis with leads:', leads);
      const result = await leadBehaviorService.analyzeBehavior(leads);
      console.log('Behavior analysis result:', result);
      setAnalysis(result);
      if (onAnalysisComplete) {
        onAnalysisComplete(result);
      }
    } catch (err) {
      console.error('Behavior analysis error:', err);
      setError('Failed to analyze lead behavior. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [leads, onAnalysisComplete, hasAnalyzed]);

  // Only run analysis once when component mounts or leads change
  useEffect(() => {
    if (leads && leads.length > 0 && !hasAnalyzed) {
      handleAnalyze();
    }
  }, [leads, handleAnalyze, hasAnalyzed]);

  const handleFilter = useCallback((criteria) => {
    setFilterBy(criteria);
  }, []);

  const handleSort = useCallback((criteria) => {
    setSortBy(criteria);
  }, []);

  // Memoize filtered and sorted leads
  const filteredLeads = useMemo(() => {
    if (!analysis || !analysis.leadBehaviors) return [];
    
    let filtered = analysis.leadBehaviors;
    
    // Apply filter
    if (filterBy !== 'all') {
      filtered = filtered.filter(lead => 
        lead.engagementLevel.toLowerCase() === filterBy.toLowerCase()
      );
    }
    
    // Apply sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'behaviorScore':
          return b.behaviorScore - a.behaviorScore;
        case 'conversionProbability':
          return b.conversionProbability - a.conversionProbability;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return b.behaviorScore - a.behaviorScore;
      }
    });
    
    return filtered;
  }, [analysis, filterBy, sortBy]);

  const getEngagementColor = useCallback((level) => {
    switch (level) {
      case 'Very High': return 'text-green-600 bg-green-100';
      case 'High': return 'text-blue-600 bg-blue-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Low': return 'text-orange-600 bg-orange-100';
      case 'Very Low': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  }, []);

  const getScoreColor = useCallback((score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-blue-600';
    if (score >= 40) return 'text-yellow-600';
    if (score >= 20) return 'text-orange-600';
    return 'text-red-600';
  }, []);

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

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="text-center py-8">
          <div className="text-red-500 text-lg mb-2">⚠️</div>
          <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
          <button
            onClick={() => {
              setHasAnalyzed(false);
              setError(null);
              handleAnalyze();
            }}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
          >
            {getTranslation('ai.behaviorAnalysis.retry', 'Retry Analysis')}
          </button>
        </div>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="text-center py-8">
          <div className="text-gray-400 text-lg mb-2">��</div>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {getTranslation('ai.behaviorAnalysis.noData', 'No lead data available for analysis.')}
          </p>
          <button
            onClick={() => {
              setHasAnalyzed(false);
              handleAnalyze();
            }}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
          >
            {getTranslation('ai.behaviorAnalysis.startAnalysis', 'Start Analysis')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {getTranslation('ai.behaviorAnalysis.title', 'Lead Behavior Analysis')}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            {getTranslation('ai.behaviorAnalysis.subtitle', 'AI-powered behavior insights and engagement tracking')}
          </p>
        </div>
        <button
          onClick={() => {
            setHasAnalyzed(false);
            setAnalysis(null);
            handleAnalyze();
          }}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
        >
          {getTranslation('ai.behaviorAnalysis.refresh', 'Refresh Analysis')}
        </button>
      </div>

      {/* Summary */}
      {analysis.summary && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
          <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
            {getTranslation('ai.behaviorAnalysis.summary', 'Analysis Summary')}
          </h4>
          <p className="text-blue-800 dark:text-blue-200 text-sm">
            {analysis.summary}
          </p>
        </div>
      )}

      {/* Controls */}
      <div className="flex flex-wrap gap-4 mb-6">
        {/* Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {getTranslation('ai.behaviorAnalysis.filterBy', 'Filter by')}
          </label>
          <select
            value={filterBy}
            onChange={(e) => handleFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="all">{getTranslation('ai.behaviorAnalysis.allLeads', 'All Leads')}</option>
            <option value="very high">{getTranslation('ai.behaviorAnalysis.veryHigh', 'Very High')}</option>
            <option value="high">{getTranslation('ai.behaviorAnalysis.high', 'High')}</option>
            <option value="medium">{getTranslation('ai.behaviorAnalysis.medium', 'Medium')}</option>
            <option value="low">{getTranslation('ai.behaviorAnalysis.low', 'Low')}</option>
            <option value="very low">{getTranslation('ai.behaviorAnalysis.veryLow', 'Very Low')}</option>
          </select>
        </div>

        {/* Sort */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {getTranslation('ai.behaviorAnalysis.sortBy', 'Sort by')}
          </label>
          <select
            value={sortBy}
            onChange={(e) => handleSort(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="behaviorScore">{getTranslation('ai.behaviorAnalysis.behaviorScore', 'Behavior Score')}</option>
            <option value="conversionProbability">{getTranslation('ai.behaviorAnalysis.conversionProbability', 'Conversion Probability')}</option>
            <option value="name">{getTranslation('ai.behaviorAnalysis.name', 'Name')}</option>
          </select>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4">
        {filteredLeads.map((lead) => (
          <div
            key={lead.leadId}
            className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {lead.name}
                  </h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEngagementColor(lead.engagementLevel)}`}>
                    {lead.engagementLevel}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                  <div>
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {getTranslation('ai.behaviorAnalysis.behaviorScore', 'Behavior Score')}:
                    </span>
                    <span className={`ml-2 font-semibold ${getScoreColor(lead.behaviorScore)}`}>
                      {lead.behaviorScore}/100
                    </span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {getTranslation('ai.behaviorAnalysis.conversionProbability', 'Conversion Probability')}:
                    </span>
                    <span className={`ml-2 font-semibold ${getScoreColor(lead.conversionProbability)}`}>
                      {lead.conversionProbability}%
                    </span>
                  </div>
                </div>

                {/* Key Behaviors */}
                <div className="mb-3">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {getTranslation('ai.behaviorAnalysis.keyBehaviors', 'Key Behaviors')}:
                  </span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {lead.keyBehaviors.map((behavior, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded"
                      >
                        {behavior}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Recommendations */}
                <div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {getTranslation('ai.behaviorAnalysis.recommendations', 'Recommendations')}:
                  </span>
                  <ul className="mt-1 space-y-1">
                    {lead.recommendations.map((rec, index) => (
                      <li key={index} className="text-sm text-gray-600 dark:text-gray-300">
                        • {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Insights */}
      {analysis.insights && analysis.insights.length > 0 && (
        <div className="mt-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
          <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">
            {getTranslation('ai.behaviorAnalysis.insights', 'Behavioral Insights')}
          </h4>
          <ul className="space-y-1">
            {analysis.insights.map((insight, index) => (
              <li key={index} className="text-green-800 dark:text-green-200 text-sm">
                • {insight}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Recommendations */}
      {analysis.recommendations && analysis.recommendations.length > 0 && (
        <div className="mt-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
          <h4 className="font-medium text-purple-900 dark:text-purple-100 mb-2">
            {getTranslation('ai.behaviorAnalysis.recommendations', 'Recommendations')}
          </h4>
          <ul className="space-y-1">
            {analysis.recommendations.map((rec, index) => (
              <li key={index} className="text-purple-800 dark:text-purple-200 text-sm">
                • {rec}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LeadBehaviorAnalysis;