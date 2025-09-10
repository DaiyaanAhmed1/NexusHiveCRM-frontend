import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalization } from '../../../../hooks/useLocalization';
import PerformanceForecasting from '../../shared/components/PerformanceForecasting';
import enTranslations from '../../locals/en.json';
import arTranslations from '../../locals/ar.json';

const DirectorPerformanceForecasting = () => {
  const { t } = useTranslation();
  const { isRTLMode } = useLocalization();
  const [showPerformanceForecasting, setShowPerformanceForecasting] = useState(false);
  const [performanceForecast, setPerformanceForecast] = useState(null);

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

  // Sample university data for performance forecasting
  const getSampleUniversityData = () => {
    return {
      enrollment: {
        current: 8500,
        target: 10000,
        growth: 5.2,
        retention: 87.3,
        newAdmissions: 1200,
        graduationRate: 78.5
      },
      financial: {
        budget: 45000000,
        revenue: 42000000,
        expenses: 41000000,
        reserves: 8500000,
        debt: 12000000,
        tuition: 25000,
        fees: 3500,
        grants: 8500000,
        donations: 3200000,
        researchFunding: 8500000
      },
      academic: {
        programs: 45,
        faculty: 320,
        studentFacultyRatio: 26.5,
        accreditation: 'AACSB',
        researchOutput: 125,
        publications: 89,
        patents: 12,
        awards: 23
      },
      operational: {
        staff: 450,
        facilities: 12,
        technologyAge: 3.2,
        maintenanceBacklog: 2500000,
        energyCosts: 1200000,
        efficiency: 78.5,
        satisfaction: 4.2
      },
      reputation: {
        ranking: 45,
        satisfaction: 4.2,
        employerRating: 4.1,
        socialMedia: {
          followers: 25000,
          engagement: 3.8
        },
        brandValue: 125000000
      },
      market: {
        competition: 'High',
        marketShare: 12.5,
        tuition: 25000,
        scholarships: 8500000,
        internationalStudents: 15.2,
        marketGrowth: 3.8,
        competitorCount: 8
      },
      performance: {
        lastYear: {
          revenue: 40000000,
          enrollment: 8200,
          satisfaction: 4.0,
          efficiency: 75.2
        },
        trends: {
          revenueGrowth: 5.0,
          enrollmentGrowth: 3.7,
          satisfactionTrend: 5.0,
          efficiencyTrend: 4.4
        }
      }
    };
  };

  const handleForecastComplete = useCallback((forecast) => {
    console.log('Performance forecast completed:', forecast);
    setPerformanceForecast(forecast);
  }, []);

  const togglePerformanceForecasting = useCallback(() => {
    setShowPerformanceForecasting(prev => !prev);
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {getTranslation('ai.performanceForecasting.title', 'Performance Forecasting')}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            {getTranslation('ai.performanceForecasting.directorSubtitle', 'AI-powered performance predictions for strategic planning')}
          </p>
        </div>
        <button
          onClick={togglePerformanceForecasting}
          className={`px-4 py-2 rounded-lg transition-colors ${
            showPerformanceForecasting
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          {showPerformanceForecasting
            ? getTranslation('ai.performanceForecasting.hide', 'Hide Forecasting')
            : getTranslation('ai.performanceForecasting.show', 'Show Forecasting')
          }
        </button>
      </div>

      {/* Quick Stats */}
      {performanceForecast && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {performanceForecast.forecasts?.length || 0}
            </div>
            <div className="text-sm text-blue-800 dark:text-blue-200">
              {getTranslation('ai.performanceForecasting.totalMetrics', 'Total Metrics')}
            </div>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {performanceForecast.baseline?.growthRate?.toFixed(1) || 0}%
            </div>
            <div className="text-sm text-green-800 dark:text-green-200">
              {getTranslation('ai.performanceForecasting.avgGrowth', 'Avg Growth')}
            </div>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {performanceForecast.confidence}
            </div>
            <div className="text-sm text-purple-800 dark:text-purple-200">
              {getTranslation('ai.performanceForecasting.confidence', 'Confidence')}
            </div>
          </div>
          <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              {performanceForecast.timeHorizon}
            </div>
            <div className="text-sm text-orange-800 dark:text-orange-200">
              {getTranslation('ai.performanceForecasting.horizon', 'Horizon')}
            </div>
          </div>
        </div>
      )}

      {/* Performance Forecasting Component */}
      {showPerformanceForecasting && (
        <div className="mt-6">
          <PerformanceForecasting
            universityData={getSampleUniversityData()}
            onForecastComplete={handleForecastComplete}
          />
        </div>
      )}

      {/* Quick Actions */}
      {!showPerformanceForecasting && (
        <div className="space-y-4">
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
              {getTranslation('ai.performanceForecasting.quickActions', 'Quick Actions')}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <button
                onClick={togglePerformanceForecasting}
                className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
              >
                <span className="text-blue-600 dark:text-blue-400 text-lg">📈</span>
                <div className="text-left">
                  <div className="font-medium text-blue-900 dark:text-blue-100">
                    {getTranslation('ai.performanceForecasting.runForecast', 'Run Performance Forecast')}
                  </div>
                  <div className="text-sm text-blue-700 dark:text-blue-200">
                    {getTranslation('ai.performanceForecasting.runForecastDesc', 'Generate AI-powered performance predictions')}
                  </div>
                </div>
              </button>
              
              <button
                onClick={() => {
                  // Future: View forecast history
                  console.log('View forecast history');
                }}
                className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
              >
                <span className="text-green-600 dark:text-green-400 text-lg">📊</span>
                <div className="text-left">
                  <div className="font-medium text-green-900 dark:text-green-100">
                    {getTranslation('ai.performanceForecasting.viewHistory', 'View Forecast History')}
                  </div>
                  <div className="text-sm text-green-700 dark:text-green-200">
                    {getTranslation('ai.performanceForecasting.viewHistoryDesc', 'Review past forecasts and trends')}
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Forecast Types Preview */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 dark:text-white mb-3">
              {getTranslation('ai.performanceForecasting.forecastTypes', 'Forecast Types')}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {[
                { type: 'revenue', icon: '💰', name: getTranslation('ai.performanceForecasting.revenue', 'Revenue') },
                { type: 'enrollment', icon: '👥', name: getTranslation('ai.performanceForecasting.enrollment', 'Enrollment') },
                { type: 'financial', icon: '📊', name: getTranslation('ai.performanceForecasting.financial', 'Financial') },
                { type: 'academic', icon: '🎓', name: getTranslation('ai.performanceForecasting.academic', 'Academic') },
                { type: 'operational', icon: '⚙️', name: getTranslation('ai.performanceForecasting.operational', 'Operational') }
              ].map(({ type, icon, name }) => (
                <div key={type} className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-600">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">{icon}</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {name}
                    </span>
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-300">
                    {getTranslation(`ai.performanceForecasting.${type}Desc`, `${type} forecasting`)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Time Horizons Preview */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 dark:text-white mb-3">
              {getTranslation('ai.performanceForecasting.timeHorizons', 'Time Horizons')}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {[
                { horizon: '3-months', name: getTranslation('ai.performanceForecasting.3months', '3 Months'), desc: getTranslation('ai.performanceForecasting.shortTerm', 'Short-term') },
                { horizon: '6-months', name: getTranslation('ai.performanceForecasting.6months', '6 Months'), desc: getTranslation('ai.performanceForecasting.mediumTerm', 'Medium-term') },
                { horizon: '1-year', name: getTranslation('ai.performanceForecasting.1year', '1 Year'), desc: getTranslation('ai.performanceForecasting.annual', 'Annual') },
                { horizon: '2-years', name: getTranslation('ai.performanceForecasting.2years', '2 Years'), desc: getTranslation('ai.performanceForecasting.biennial', 'Biennial') },
                { horizon: '3-years', name: getTranslation('ai.performanceForecasting.3years', '3 Years'), desc: getTranslation('ai.performanceForecasting.longTerm', 'Long-term') }
              ].map(({ horizon, name, desc }) => (
                <div key={horizon} className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-600">
                  <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                    {name}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-300">
                    {desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scenario Analysis Preview */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 dark:text-white mb-3">
              {getTranslation('ai.performanceForecasting.scenarioAnalysis', 'Scenario Analysis')}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                { scenario: 'bestCase', name: getTranslation('ai.performanceForecasting.bestCase', 'Best Case'), color: 'green', desc: getTranslation('ai.performanceForecasting.optimistic', 'Optimistic scenario') },
                { scenario: 'mostLikely', name: getTranslation('ai.performanceForecasting.mostLikely', 'Most Likely'), color: 'blue', desc: getTranslation('ai.performanceForecasting.realistic', 'Realistic scenario') },
                { scenario: 'worstCase', name: getTranslation('ai.performanceForecasting.worstCase', 'Worst Case'), color: 'red', desc: getTranslation('ai.performanceForecasting.pessimistic', 'Pessimistic scenario') }
              ].map(({ scenario, name, color, desc }) => (
                <div key={scenario} className={`bg-${color}-50 dark:bg-${color}-900/20 border border-${color}-200 dark:border-${color}-800 rounded-lg p-3`}>
                  <div className={`text-sm font-medium text-${color}-900 dark:text-${color}-100 mb-1`}>
                    {name}
                  </div>
                  <div className={`text-xs text-${color}-700 dark:text-${color}-200`}>
                    {desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DirectorPerformanceForecasting;