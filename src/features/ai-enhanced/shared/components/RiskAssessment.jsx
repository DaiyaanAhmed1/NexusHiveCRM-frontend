import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalization } from '../../../../hooks/useLocalization';
import riskAssessmentService from '../services/riskAssessmentService';
import enTranslations from '../../locals/en.json';
import arTranslations from '../../locals/ar.json';

const RiskAssessment = ({ universityData, onAssessmentComplete }) => {
  const { t } = useTranslation();
  const { isRTLMode } = useLocalization();
  const [assessment, setAssessment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filterBy, setFilterBy] = useState('all');
  const [sortBy, setSortBy] = useState('riskScore');
  const [hasAssessed, setHasAssessed] = useState(false);

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

  // Memoize the assessment function
  const handleAssess = useCallback(async () => {
    if (!universityData || hasAssessed) {
      return;
    }

    setLoading(true);
    setError(null);
    setHasAssessed(true);
    
    try {
      console.log('Starting risk assessment with data:', universityData);
      const result = await riskAssessmentService.assessRisks(universityData);
      console.log('Risk assessment result:', result);
      setAssessment(result);
      
      // Save to history
      riskAssessmentService.saveToHistory(result);
      
      if (onAssessmentComplete) {
        onAssessmentComplete(result);
      }
    } catch (err) {
      console.error('Risk assessment error:', err);
      setError('Failed to assess risks. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [universityData, onAssessmentComplete, hasAssessed]);

  // Only run assessment once when component mounts or data changes
  useEffect(() => {
    if (universityData && !hasAssessed) {
      handleAssess();
    }
  }, [universityData, handleAssess, hasAssessed]);

  const handleFilter = useCallback((criteria) => {
    setFilterBy(criteria);
  }, []);

  const handleSort = useCallback((criteria) => {
    setSortBy(criteria);
  }, []);

  // Memoize filtered and sorted risks
  const filteredRisks = useMemo(() => {
    if (!assessment || !assessment.risks) return [];
    
    let filtered = assessment.risks;
    
    // Apply filter
    if (filterBy !== 'all') {
      filtered = filtered.filter(risk => risk.category === filterBy);
    }
    
    // Apply sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'riskScore':
          return b.riskScore - a.riskScore;
        case 'probability':
          const probOrder = { 'Critical': 4, 'High': 3, 'Medium': 2, 'Low': 1 };
          return probOrder[b.probability] - probOrder[a.probability];
        case 'impact':
          const impactOrder = { 'Severe': 4, 'Significant': 3, 'Moderate': 2, 'Minimal': 1 };
          return impactOrder[b.impact] - impactOrder[a.impact];
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return b.riskScore - a.riskScore;
      }
    });
    
    return filtered;
  }, [assessment, filterBy, sortBy]);

  const getRiskColor = useCallback((score) => {
    if (score >= 80) return 'text-red-600 bg-red-100';
    if (score >= 60) return 'text-orange-600 bg-orange-100';
    if (score >= 40) return 'text-yellow-600 bg-yellow-100';
    return 'text-green-600 bg-green-100';
  }, []);

  const getProbabilityColor = useCallback((probability) => {
    switch (probability) {
      case 'Critical': return 'text-red-600 bg-red-100';
      case 'High': return 'text-orange-600 bg-orange-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  }, []);

  const getImpactColor = useCallback((impact) => {
    switch (impact) {
      case 'Severe': return 'text-red-600 bg-red-100';
      case 'Significant': return 'text-orange-600 bg-orange-100';
      case 'Moderate': return 'text-yellow-600 bg-yellow-100';
      case 'Minimal': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  }, []);

  const getCategoryIcon = useCallback((category) => {
    switch (category) {
      case 'financial': return '��';
      case 'operational': return '⚙️';
      case 'strategic': return '🎯';
      case 'compliance': return '📋';
      case 'reputation': return '🏛️';
      default: return '⚠️';
    }
  }, []);

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-3 text-gray-600 dark:text-gray-300">
            {getTranslation('ai.riskAssessment.analyzing', 'Analyzing risks...')}
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
              setHasAssessed(false);
              setError(null);
              handleAssess();
            }}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
          >
            {getTranslation('ai.riskAssessment.retry', 'Retry Assessment')}
          </button>
        </div>
      </div>
    );
  }

  if (!assessment) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="text-center py-8">
          <div className="text-gray-400 text-lg mb-2">��</div>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {getTranslation('ai.riskAssessment.noData', 'No university data available for risk assessment.')}
          </p>
          <button
            onClick={() => {
              setHasAssessed(false);
              handleAssess();
            }}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
          >
            {getTranslation('ai.riskAssessment.startAssessment', 'Start Assessment')}
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
            {getTranslation('ai.riskAssessment.title', 'Risk Assessment')}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            {getTranslation('ai.riskAssessment.subtitle', 'AI-powered risk analysis and mitigation strategies')}
          </p>
        </div>
        <button
          onClick={() => {
            setHasAssessed(false);
            setAssessment(null);
            handleAssess();
          }}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
        >
          {getTranslation('ai.riskAssessment.refresh', 'Refresh Assessment')}
        </button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {assessment.totalRisks}
          </div>
          <div className="text-sm text-blue-800 dark:text-blue-200">
            {getTranslation('ai.riskAssessment.totalRisks', 'Total Risks')}
          </div>
        </div>
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="text-2xl font-bold text-red-600 dark:text-red-400">
            {assessment.criticalRisks}
          </div>
          <div className="text-sm text-red-800 dark:text-red-200">
            {getTranslation('ai.riskAssessment.criticalRisks', 'Critical Risks')}
          </div>
        </div>
        <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
          <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
            {assessment.highRisks}
          </div>
          <div className="text-sm text-orange-800 dark:text-orange-200">
            {getTranslation('ai.riskAssessment.highRisks', 'High Risks')}
          </div>
        </div>
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {assessment.risks.filter(r => r.riskScore < 40).length}
          </div>
          <div className="text-sm text-green-800 dark:text-green-200">
            {getTranslation('ai.riskAssessment.lowRisks', 'Low Risks')}
          </div>
        </div>
      </div>

      {/* Summary */}
      {assessment.summary && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
          <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
            {getTranslation('ai.riskAssessment.summary', 'Assessment Summary')}
          </h4>
          <p className="text-blue-800 dark:text-blue-200 text-sm">
            {assessment.summary}
          </p>
        </div>
      )}

      {/* Controls */}
      <div className="flex flex-wrap gap-4 mb-6">
        {/* Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {getTranslation('ai.riskAssessment.filterBy', 'Filter by')}
          </label>
          <select
            value={filterBy}
            onChange={(e) => handleFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="all">{getTranslation('ai.riskAssessment.allCategories', 'All Categories')}</option>
            <option value="financial">{getTranslation('ai.riskAssessment.financial', 'Financial')}</option>
            <option value="operational">{getTranslation('ai.riskAssessment.operational', 'Operational')}</option>
            <option value="strategic">{getTranslation('ai.riskAssessment.strategic', 'Strategic')}</option>
            <option value="compliance">{getTranslation('ai.riskAssessment.compliance', 'Compliance')}</option>
            <option value="reputation">{getTranslation('ai.riskAssessment.reputation', 'Reputation')}</option>
          </select>
        </div>

        {/* Sort */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {getTranslation('ai.riskAssessment.sortBy', 'Sort by')}
          </label>
          <select
            value={sortBy}
            onChange={(e) => handleSort(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="riskScore">{getTranslation('ai.riskAssessment.riskScore', 'Risk Score')}</option>
            <option value="probability">{getTranslation('ai.riskAssessment.probability', 'Probability')}</option>
            <option value="impact">{getTranslation('ai.riskAssessment.impact', 'Impact')}</option>
            <option value="name">{getTranslation('ai.riskAssessment.name', 'Name')}</option>
          </select>
        </div>
      </div>

      {/* Risk Categories Overview */}
      {assessment.riskCategories && (
        <div className="mb-6">
          <h4 className="font-medium text-gray-900 dark:text-white mb-3">
            {getTranslation('ai.riskAssessment.riskCategories', 'Risk Categories')}
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {Object.entries(assessment.riskCategories).map(([category, data]) => (
              <div key={category} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">{getCategoryIcon(category)}</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white capitalize">
                    {getTranslation(`ai.riskAssessment.${category}`, category)}
                  </span>
                </div>
                <div className="text-lg font-bold text-gray-900 dark:text-white">
                  {data.count}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-300">
                  {data.highestRisk}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Risks List */}
      <div className="space-y-4">
        {filteredRisks.map((risk) => (
          <div
            key={risk.id}
            className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-lg">{getCategoryIcon(risk.category)}</span>
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {risk.name}
                  </h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(risk.riskScore)}`}>
                    {risk.riskScore}/100
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  {risk.description}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                  <div>
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {getTranslation('ai.riskAssessment.probability', 'Probability')}:
                    </span>
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getProbabilityColor(risk.probability)}`}>
                      {risk.probability}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {getTranslation('ai.riskAssessment.impact', 'Impact')}:
                    </span>
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(risk.impact)}`}>
                      {risk.impact}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {getTranslation('ai.riskAssessment.timeline', 'Timeline')}:
                    </span>
                    <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
                      {risk.timeline}
                    </span>
                  </div>
                </div>

                {/* Mitigation Strategies */}
                <div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {getTranslation('ai.riskAssessment.mitigationStrategies', 'Mitigation Strategies')}:
                  </span>
                  <ul className="mt-1 space-y-1">
                    {risk.mitigationStrategies.map((strategy, index) => (
                      <li key={index} className="text-sm text-gray-600 dark:text-gray-300">
                        • {strategy}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recommendations */}
      {assessment.recommendations && assessment.recommendations.length > 0 && (
        <div className="mt-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
          <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">
            {getTranslation('ai.riskAssessment.recommendations', 'Recommendations')}
          </h4>
          <ul className="space-y-1">
            {assessment.recommendations.map((rec, index) => (
              <li key={index} className="text-green-800 dark:text-green-200 text-sm">
                • {rec}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Risk Trends */}
      {assessment.riskTrends && (
        <div className="mt-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
          <h4 className="font-medium text-purple-900 dark:text-purple-100 mb-2">
            {getTranslation('ai.riskAssessment.riskTrends', 'Risk Trends')}
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <div className="text-sm font-medium text-red-600 dark:text-red-400 mb-1">
                {getTranslation('ai.riskAssessment.increasing', 'Increasing')}
              </div>
              <div className="text-sm text-red-800 dark:text-red-200">
                {assessment.riskTrends.increasing.join(', ') || 'None'}
              </div>
            </div>
            <div>
              <div className="text-sm font-medium text-yellow-600 dark:text-yellow-400 mb-1">
                {getTranslation('ai.riskAssessment.stable', 'Stable')}
              </div>
              <div className="text-sm text-yellow-800 dark:text-yellow-200">
                {assessment.riskTrends.stable.join(', ') || 'None'}
              </div>
            </div>
            <div>
              <div className="text-sm font-medium text-green-600 dark:text-green-400 mb-1">
                {getTranslation('ai.riskAssessment.decreasing', 'Decreasing')}
              </div>
              <div className="text-sm text-green-800 dark:text-green-200">
                {assessment.riskTrends.decreasing.join(', ') || 'None'}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RiskAssessment;