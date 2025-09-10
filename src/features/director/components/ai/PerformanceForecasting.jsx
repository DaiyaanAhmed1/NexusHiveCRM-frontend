import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
// Look for these imports and update them:
import { useLocalization } from "/src/hooks/useLocalization";
import performanceForecastingService from '../../services/performanceForecastingService';
import aiService from '../../../../services/aiService';
import aiLanguageService from '../../../../services/aiLanguageService';
import enTranslations from "/src/features/ai-enhanced/locals/en.json";
import arTranslations from "/src/features/ai-enhanced/locals/ar.json";

const PerformanceForecasting = ({ universityData, onForecastComplete }) => {
  const { t } = useTranslation();
  const { isRTLMode } = useLocalization();
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [forecastType, setForecastType] = useState('revenue');
  const [timeHorizon, setTimeHorizon] = useState('1-year');
  const [filterBy, setFilterBy] = useState('all');
  const [sortBy, setSortBy] = useState('growthRate');
  const [hasForecasted, setHasForecasted] = useState(false);

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

  // Memoize the forecast function
  const handleForecast = useCallback(async () => {
    if (!universityData || hasForecasted) {
      return;
    }

    setLoading(true);
    setError(null);
    setHasForecasted(true);
    
    try {
      console.log('Starting performance forecast with data:', universityData);
      const result = await performanceForecastingService.generateForecast(
        universityData, 
        forecastType, 
        timeHorizon
      );
      console.log('Performance forecast result:', result);
      setForecast(result);
      
      // Save to history
      performanceForecastingService.saveToHistory(result);
      
      if (onForecastComplete) {
        onForecastComplete(result);
      }
    } catch (err) {
      console.error('Performance forecast error:', err);
      setError('Failed to generate forecast. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [universityData, forecastType, timeHorizon, onForecastComplete, hasForecasted]);

  // Only run forecast once when component mounts or data changes
  useEffect(() => {
    if (universityData && !hasForecasted) {
      handleForecast();
    }
  }, [universityData, handleForecast, hasForecasted]);

  const handleFilter = useCallback((criteria) => {
    setFilterBy(criteria);
  }, []);

  const handleSort = useCallback((criteria) => {
    setSortBy(criteria);
  }, []);

  const handleNewForecast = useCallback(() => {
    setHasForecasted(false);
    setForecast(null);
    setError(null);
  }, []);

  // Memoize filtered and sorted forecasts
  const filteredForecasts = useMemo(() => {
    if (!forecast || !forecast.forecasts) return [];
    
    let filtered = forecast.forecasts;
    
    // Apply filter
    if (filterBy !== 'all') {
      filtered = filtered.filter(f => f.category === filterBy);
    }
    
    // Apply sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'growthRate':
          return b.growthRate - a.growthRate;
        case 'currentValue':
          return b.currentValue - a.currentValue;
        case 'confidence':
          const confidenceOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
          return confidenceOrder[b.confidence] - confidenceOrder[a.confidence];
        case 'metric':
          return a.metric.localeCompare(b.metric);
        default:
          return b.growthRate - a.growthRate;
      }
    });
    
    return filtered;
  }, [forecast, filterBy, sortBy]);

  const getGrowthColor = useCallback((growthRate) => {
    if (growthRate > 10) return 'text-green-600 bg-green-100';
    if (growthRate > 0) return 'text-blue-600 bg-blue-100';
    if (growthRate > -5) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  }, []);

  const getConfidenceColor = useCallback((confidence) => {
    switch (confidence) {
      case 'High': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Low': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  }, []);

  const getCategoryIcon = useCallback((category) => {
    switch (category) {
      case 'revenue': return '💰';
      case 'enrollment': return '👥';
      case 'financial': return '📊';
      case 'academic': return '��';
      case 'operational': return '⚙️';
      default: return '📈';
    }
  }, []);

  const formatValue = useCallback((value, unit) => {
    if (unit === 'currency') {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(value);
    } else if (unit === 'percentage') {
      return `${value.toFixed(1)}%`;
    } else {
      return new Intl.NumberFormat('en-US').format(value);
    }
  }, []);

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-3 text-gray-600 dark:text-gray-300">
            {getTranslation('ai.performanceForecasting.generating', 'Generating performance forecast...')}
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
            onClick={handleNewForecast}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
          >
            {getTranslation('ai.performanceForecasting.retry', 'Retry Forecast')}
          </button>
        </div>
      </div>
    );
  }

  if (!forecast) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="text-center py-8">
          <div className="text-gray-400 text-lg mb-2">��</div>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {getTranslation('ai.performanceForecasting.noData', 'No university data available for performance forecasting.')}
          </p>
          <button
            onClick={handleNewForecast}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
          >
            {getTranslation('ai.performanceForecasting.startForecast', 'Start Forecast')}
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
            {getTranslation('ai.performanceForecasting.title', 'Performance Forecasting')}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            {getTranslation('ai.performanceForecasting.subtitle', 'AI-powered performance predictions and scenario analysis')}
          </p>
        </div>
        <button
          onClick={handleNewForecast}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
        >
          {getTranslation('ai.performanceForecasting.refresh', 'Refresh Forecast')}
        </button>
      </div>

      {/* Forecast Configuration */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {getTranslation('ai.performanceForecasting.forecastType', 'Forecast Type')}
          </label>
          <select
            value={forecastType}
            onChange={(e) => setForecastType(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="revenue">{getTranslation('ai.performanceForecasting.revenue', 'Revenue')}</option>
            <option value="enrollment">{getTranslation('ai.performanceForecasting.enrollment', 'Enrollment')}</option>
            <option value="financial">{getTranslation('ai.performanceForecasting.financial', 'Financial')}</option>
            <option value="academic">{getTranslation('ai.performanceForecasting.academic', 'Academic')}</option>
            <option value="operational">{getTranslation('ai.performanceForecasting.operational', 'Operational')}</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {getTranslation('ai.performanceForecasting.timeHorizon', 'Time Horizon')}
          </label>
          <select
            value={timeHorizon}
            onChange={(e) => setTimeHorizon(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="3-months">{getTranslation('ai.performanceForecasting.3months', '3 Months')}</option>
            <option value="6-months">{getTranslation('ai.performanceForecasting.6months', '6 Months')}</option>
            <option value="1-year">{getTranslation('ai.performanceForecasting.1year', '1 Year')}</option>
            <option value="2-years">{getTranslation('ai.performanceForecasting.2years', '2 Years')}</option>
            <option value="3-years">{getTranslation('ai.performanceForecasting.3years', '3 Years')}</option>
          </select>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {forecast.forecasts?.length || 0}
          </div>
          <div className="text-sm text-blue-800 dark:text-blue-200">
            {getTranslation('ai.performanceForecasting.totalMetrics', 'Total Metrics')}
          </div>
        </div>
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {forecast.baseline?.growthRate?.toFixed(1) || 0}%
          </div>
          <div className="text-sm text-green-800 dark:text-green-200">
            {getTranslation('ai.performanceForecasting.avgGrowth', 'Avg Growth')}
          </div>
        </div>
        <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {forecast.confidence}
          </div>
          <div className="text-sm text-purple-800 dark:text-purple-200">
            {getTranslation('ai.performanceForecasting.confidence', 'Confidence')}
          </div>
        </div>
        <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
          <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
            {timeHorizon}
          </div>
          <div className="text-sm text-orange-800 dark:text-orange-200">
            {getTranslation('ai.performanceForecasting.horizon', 'Horizon')}
          </div>
        </div>
      </div>

      {/* Summary */}
      {forecast.summary && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
          <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
            {getTranslation('ai.performanceForecasting.summary', 'Forecast Summary')}
          </h4>
          <p className="text-blue-800 dark:text-blue-200 text-sm">
            {forecast.summary}
          </p>
        </div>
      )}

      {/* Scenario Analysis */}
      {forecast.scenarios && (
        <div className="mb-6">
          <h4 className="font-medium text-gray-900 dark:text-white mb-3">
            {getTranslation('ai.performanceForecasting.scenarioAnalysis', 'Scenario Analysis')}
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(forecast.scenarios).map(([scenario, data]) => (
              <div key={scenario} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-medium text-gray-900 dark:text-white capitalize">
                    {getTranslation(`ai.performanceForecasting.${scenario}`, scenario)}
                  </h5>
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {data.probability}% {getTranslation('ai.performanceForecasting.probability', 'probability')}
                  </span>
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {formatValue(data.value, 'currency')}
                </div>
                <div className={`text-sm font-medium ${getGrowthColor(data.growthRate)} px-2 py-1 rounded-full inline-block`}>
                  {data.growthRate > 0 ? '+' : ''}{data.growthRate.toFixed(1)}%
                </div>
                <div className="mt-2">
                  <div className="text-xs text-gray-600 dark:text-gray-300 mb-1">
                    {getTranslation('ai.performanceForecasting.keyDrivers', 'Key Drivers')}:
                  </div>
                  <div className="text-xs text-gray-700 dark:text-gray-200">
                    {data.keyDrivers?.slice(0, 2).join(', ')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="flex flex-wrap gap-4 mb-6">
        {/* Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {getTranslation('ai.performanceForecasting.filterBy', 'Filter by')}
          </label>
          <select
            value={filterBy}
            onChange={(e) => handleFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="all">{getTranslation('ai.performanceForecasting.allCategories', 'All Categories')}</option>
            <option value="revenue">{getTranslation('ai.performanceForecasting.revenue', 'Revenue')}</option>
            <option value="enrollment">{getTranslation('ai.performanceForecasting.enrollment', 'Enrollment')}</option>
            <option value="financial">{getTranslation('ai.performanceForecasting.financial', 'Financial')}</option>
            <option value="academic">{getTranslation('ai.performanceForecasting.academic', 'Academic')}</option>
            <option value="operational">{getTranslation('ai.performanceForecasting.operational', 'Operational')}</option>
          </select>
        </div>

        {/* Sort */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {getTranslation('ai.performanceForecasting.sortBy', 'Sort by')}
          </label>
          <select
            value={sortBy}
            onChange={(e) => handleSort(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="growthRate">{getTranslation('ai.performanceForecasting.growthRate', 'Growth Rate')}</option>
            <option value="currentValue">{getTranslation('ai.performanceForecasting.currentValue', 'Current Value')}</option>
            <option value="confidence">{getTranslation('ai.performanceForecasting.confidence', 'Confidence')}</option>
            <option value="metric">{getTranslation('ai.performanceForecasting.metric', 'Metric')}</option>
          </select>
        </div>
      </div>

      {/* Forecasts List */}
      <div className="space-y-4">
        {filteredForecasts.map((forecastItem) => (
          <div
            key={forecastItem.id}
            className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-lg">{getCategoryIcon(forecastItem.category)}</span>
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {forecastItem.metric}
                  </h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getGrowthColor(forecastItem.growthRate)}`}>
                    {forecastItem.growthRate > 0 ? '+' : ''}{forecastItem.growthRate.toFixed(1)}%
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getConfidenceColor(forecastItem.confidence)}`}>
                    {forecastItem.confidence}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3">
                  <div>
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {getTranslation('ai.performanceForecasting.current', 'Current')}:
                    </span>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {formatValue(forecastItem.currentValue, forecastItem.unit)}
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {getTranslation('ai.performanceForecasting.bestCase', 'Best Case')}:
                    </span>
                    <div className="font-medium text-green-600 dark:text-green-400">
                      {formatValue(forecastItem.scenarios.bestCase, forecastItem.unit)}
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {getTranslation('ai.performanceForecasting.mostLikely', 'Most Likely')}:
                    </span>
                    <div className="font-medium text-blue-600 dark:text-blue-400">
                      {formatValue(forecastItem.scenarios.mostLikely, forecastItem.unit)}
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {getTranslation('ai.performanceForecasting.worstCase', 'Worst Case')}:
                    </span>
                    <div className="font-medium text-red-600 dark:text-red-400">
                      {formatValue(forecastItem.scenarios.worstCase, forecastItem.unit)}
                    </div>
                  </div>
                </div>

                {/* Key Drivers */}
                <div className="mb-3">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {getTranslation('ai.performanceForecasting.keyDrivers', 'Key Drivers')}:
                  </span>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {forecastItem.keyDrivers.map((driver, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-xs rounded-full">
                        {driver}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Recommendations */}
                <div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {getTranslation('ai.performanceForecasting.recommendations', 'Recommendations')}:
                  </span>
                  <ul className="mt-1 space-y-1">
                    {forecastItem.recommendations.slice(0, 2).map((rec, index) => (
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

      {/* Recommendations */}
      {forecast.recommendations && forecast.recommendations.length > 0 && (
        <div className="mt-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
          <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">
            {getTranslation('ai.performanceForecasting.recommendations', 'Recommendations')}
          </h4>
          <ul className="space-y-1">
            {forecast.recommendations.map((rec, index) => (
              <li key={index} className="text-green-800 dark:text-green-200 text-sm">
                • {rec}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Risk Factors */}
      {forecast.riskFactors && forecast.riskFactors.length > 0 && (
        <div className="mt-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <h4 className="font-medium text-red-900 dark:text-red-100 mb-2">
            {getTranslation('ai.performanceForecasting.riskFactors', 'Risk Factors')}
          </h4>
          <div className="space-y-2">
            {forecast.riskFactors.map((risk, index) => (
              <div key={index} className="text-sm">
                <div className="font-medium text-red-800 dark:text-red-200">
                  {risk.factor}
                </div>
                <div className="text-red-700 dark:text-red-300">
                  {getTranslation('ai.performanceForecasting.impact', 'Impact')}: {risk.impact} | 
                  {getTranslation('ai.performanceForecasting.probability', 'Probability')}: {risk.probability}
                </div>
                <div className="text-red-600 dark:text-red-400">
                  {getTranslation('ai.performanceForecasting.mitigation', 'Mitigation')}: {risk.mitigation}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PerformanceForecasting;