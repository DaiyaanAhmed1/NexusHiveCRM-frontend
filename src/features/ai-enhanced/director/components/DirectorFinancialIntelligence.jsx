import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalization } from '../../../../hooks/useLocalization';
import FinancialIntelligence from '../../shared/components/FinancialIntelligence';
import enTranslations from '../../locals/en.json';
import arTranslations from '../../locals/ar.json';

const DirectorFinancialIntelligence = () => {
  const { t } = useTranslation();
  const { isRTLMode } = useLocalization();
  const [showFinancialIntelligence, setShowFinancialIntelligence] = useState(false);
  const [financialAnalysis, setFinancialAnalysis] = useState(null);

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

  // Sample university financial data for analysis
  const getSampleUniversityData = () => {
    return {
      financial: {
        budget: 45000000,
        revenue: 42000000,
        expenses: 41000000,
        reserves: 8500000,
        debt: 12000000,
        assets: {
          current: 15000000,
          fixed: 35000000,
          total: 50000000
        },
        liabilities: {
          current: 8000000,
          longTerm: 12000000,
          total: 20000000
        },
        equity: 30000000,
        netIncome: 1000000
      },
      revenue: {
        tuition: 32000000,
        fees: 3500000,
        grants: 8500000,
        donations: 3200000,
        research: 8500000,
        other: 1500000,
        total: 42000000
      },
      expenses: {
        personnel: 28000000,
        facilities: 8500000,
        technology: 2500000,
        supplies: 1200000,
        utilities: 1800000,
        maintenance: 1500000,
        other: 2000000,
        total: 41000000
      },
      cashFlow: {
        operating: 8500000,
        investing: -3200000,
        financing: 1200000,
        free: 6500000
      },
      performance: {
        operatingMargin: 2.4,
        netMargin: 1.8,
        roi: 8.5,
        roe: 12.3,
        currentRatio: 1.88,
        debtToEquity: 0.67
      },
      trends: {
        revenueGrowth: 5.2,
        expenseGrowth: 4.8,
        enrollmentGrowth: 3.7,
        tuitionGrowth: 4.5
      },
      benchmarks: {
        industryAverage: {
          operatingMargin: 3.2,
          netMargin: 2.1,
          roi: 9.8,
          roe: 14.2
        },
        peerInstitutions: {
          operatingMargin: 2.8,
          netMargin: 1.9,
          roi: 8.9,
          roe: 13.1
        }
      }
    };
  };

  const handleAnalysisComplete = useCallback((analysis) => {
    console.log('Financial intelligence analysis completed:', analysis);
    setFinancialAnalysis(analysis);
  }, []);

  const toggleFinancialIntelligence = useCallback(() => {
    setShowFinancialIntelligence(prev => !prev);
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {getTranslation('ai.financialIntelligence.title', 'Financial Intelligence')}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            {getTranslation('ai.financialIntelligence.directorSubtitle', 'AI-powered financial analysis for strategic financial management')}
          </p>
        </div>
        <button
          onClick={toggleFinancialIntelligence}
          className={`px-4 py-2 rounded-lg transition-colors ${
            showFinancialIntelligence
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          {showFinancialIntelligence
            ? getTranslation('ai.financialIntelligence.hide', 'Hide Analysis')
            : getTranslation('ai.financialIntelligence.show', 'Show Analysis')
          }
        </button>
      </div>

      {/* Quick Stats */}
      {financialAnalysis && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {financialAnalysis.financialHealth?.score || 0}/100
            </div>
            <div className="text-sm text-blue-800 dark:text-blue-200">
              {getTranslation('ai.financialIntelligence.healthScore', 'Health Score')}
            </div>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {financialAnalysis.financialHealth?.rating || 'N/A'}
            </div>
            <div className="text-sm text-green-800 dark:text-green-200">
              {getTranslation('ai.financialIntelligence.rating', 'Rating')}
            </div>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {financialAnalysis.financialHealth?.trend || 'N/A'}
            </div>
            <div className="text-sm text-purple-800 dark:text-purple-200">
              {getTranslation('ai.financialIntelligence.trend', 'Trend')}
            </div>
          </div>
          <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              {financialAnalysis.analysisType || 'N/A'}
            </div>
            <div className="text-sm text-orange-800 dark:text-orange-200">
              {getTranslation('ai.financialIntelligence.analysisType', 'Analysis Type')}
            </div>
          </div>
        </div>
      )}

      {/* Financial Intelligence Component */}
      {showFinancialIntelligence && (
        <div className="mt-6">
          <FinancialIntelligence
            universityData={getSampleUniversityData()}
            onAnalysisComplete={handleAnalysisComplete}
          />
        </div>
      )}

      {/* Quick Actions */}
      {!showFinancialIntelligence && (
        <div className="space-y-4">
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
              {getTranslation('ai.financialIntelligence.quickActions', 'Quick Actions')}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <button
                onClick={toggleFinancialIntelligence}
                className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
              >
                <span className="text-blue-600 dark:text-blue-400 text-lg">💰</span>
                <div className="text-left">
                  <div className="font-medium text-blue-900 dark:text-blue-100">
                    {getTranslation('ai.financialIntelligence.runAnalysis', 'Run Financial Analysis')}
                  </div>
                  <div className="text-sm text-blue-700 dark:text-blue-200">
                    {getTranslation('ai.financialIntelligence.runAnalysisDesc', 'Generate AI-powered financial insights')}
                  </div>
                </div>
              </button>
              
              <button
                onClick={() => {
                  // Future: View financial history
                  console.log('View financial history');
                }}
                className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
              >
                <span className="text-green-600 dark:text-green-400 text-lg">📊</span>
                <div className="text-left">
                  <div className="font-medium text-green-900 dark:text-green-100">
                    {getTranslation('ai.financialIntelligence.viewHistory', 'View Financial History')}
                  </div>
                  <div className="text-sm text-green-700 dark:text-green-200">
                    {getTranslation('ai.financialIntelligence.viewHistoryDesc', 'Review past financial analyses')}
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Analysis Types Preview */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 dark:text-white mb-3">
              {getTranslation('ai.financialIntelligence.analysisTypes', 'Analysis Types')}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {[
                { type: 'health', icon: '❤️', name: getTranslation('ai.financialIntelligence.health', 'Financial Health') },
                { type: 'optimization', icon: '⚡', name: getTranslation('ai.financialIntelligence.optimization', 'Budget Optimization') },
                { type: 'forecasting', icon: '🔮', name: getTranslation('ai.financialIntelligence.forecasting', 'Financial Forecasting') },
                { type: 'benchmarking', icon: '📊', name: getTranslation('ai.financialIntelligence.benchmarking', 'Benchmarking') },
                { type: 'risk', icon: '⚠️', name: getTranslation('ai.financialIntelligence.risk', 'Financial Risk') }
              ].map(({ type, icon, name }) => (
                <div key={type} className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-600">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">{icon}</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {name}
                    </span>
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-300">
                    {getTranslation(`ai.financialIntelligence.${type}Desc`, `${type} analysis`)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Financial Metrics Preview */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 dark:text-white mb-3">
              {getTranslation('ai.financialIntelligence.financialMetrics', 'Key Financial Metrics')}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              {[
                { metric: 'Operating Margin', value: '2.4%', trend: 'Up', color: 'green' },
                { metric: 'Net Margin', value: '1.8%', trend: 'Up', color: 'blue' },
                { metric: 'ROI', value: '8.5%', trend: 'Up', color: 'purple' },
                { metric: 'ROE', value: '12.3%', trend: 'Up', color: 'orange' }
              ].map(({ metric, value, trend, color }) => (
                <div key={metric} className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-600">
                  <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                    {metric}
                  </div>
                  <div className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                    {value}
                  </div>
                  <div className={`text-xs ${color === 'green' ? 'text-green-600' : color === 'blue' ? 'text-blue-600' : color === 'purple' ? 'text-purple-600' : 'text-orange-600'}`}>
                    {trend} {getTranslation('ai.financialIntelligence.trend', 'trend')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Time Periods Preview */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 dark:text-white mb-3">
              {getTranslation('ai.financialIntelligence.timePeriods', 'Analysis Time Periods')}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              {[
                { period: 'monthly', name: getTranslation('ai.financialIntelligence.monthly', 'Monthly'), desc: getTranslation('ai.financialIntelligence.shortTerm', 'Short-term') },
                { period: 'quarterly', name: getTranslation('ai.financialIntelligence.quarterly', 'Quarterly'), desc: getTranslation('ai.financialIntelligence.mediumTerm', 'Medium-term') },
                { period: 'yearly', name: getTranslation('ai.financialIntelligence.yearly', 'Yearly'), desc: getTranslation('ai.financialIntelligence.annual', 'Annual') },
                { period: '5-year', name: getTranslation('ai.financialIntelligence.5year', '5-Year'), desc: getTranslation('ai.financialIntelligence.longTerm', 'Long-term') }
              ].map(({ period, name, desc }) => (
                <div key={period} className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-600">
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

          {/* Financial Health Indicators */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 dark:text-white mb-3">
              {getTranslation('ai.financialIntelligence.healthIndicators', 'Financial Health Indicators')}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                { indicator: 'Liquidity', status: 'Strong', color: 'green', desc: getTranslation('ai.financialIntelligence.strongLiquidity', 'Strong cash position') },
                { indicator: 'Solvency', status: 'Good', color: 'blue', desc: getTranslation('ai.financialIntelligence.goodSolvency', 'Healthy debt levels') },
                { indicator: 'Efficiency', status: 'Fair', color: 'yellow', desc: getTranslation('ai.financialIntelligence.fairEfficiency', 'Room for improvement') }
              ].map(({ indicator, status, color, desc }) => (
                <div key={indicator} className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-600">
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {indicator}
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      color === 'green' ? 'text-green-600 bg-green-100' :
                      color === 'blue' ? 'text-blue-600 bg-blue-100' :
                      'text-yellow-600 bg-yellow-100'
                    }`}>
                      {status}
                    </span>
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-300">
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

export default DirectorFinancialIntelligence;