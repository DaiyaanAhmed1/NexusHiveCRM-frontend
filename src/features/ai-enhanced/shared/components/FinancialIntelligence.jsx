import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalization } from '../../../../hooks/useLocalization';
import financialIntelligenceService from '../services/financialIntelligenceService';
import enTranslations from '../../locals/en.json';
import arTranslations from '../../locals/ar.json';

const FinancialIntelligence = ({ universityData, onAnalysisComplete }) => {
  const { t } = useTranslation();
  const { isRTLMode } = useLocalization();
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [analysisType, setAnalysisType] = useState('health');
  const [timePeriod, setTimePeriod] = useState('yearly');
  const [activeTab, setActiveTab] = useState('overview');
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
    if (!universityData || hasAnalyzed) {
      return;
    }

    setLoading(true);
    setError(null);
    setHasAnalyzed(true);
    
    try {
      console.log('Starting financial intelligence analysis with data:', universityData);
      const result = await financialIntelligenceService.analyzeFinancials(
        universityData, 
        analysisType, 
        timePeriod
      );
      console.log('Financial intelligence analysis result:', result);
      setAnalysis(result);
      
      // Save to history
      financialIntelligenceService.saveToHistory(result);
      
      if (onAnalysisComplete) {
        onAnalysisComplete(result);
      }
    } catch (err) {
      console.error('Financial intelligence analysis error:', err);
      setError('Failed to analyze financials. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [universityData, analysisType, timePeriod, onAnalysisComplete, hasAnalyzed]);

  // Only run analysis once when component mounts or data changes
  useEffect(() => {
    if (universityData && !hasAnalyzed) {
      handleAnalyze();
    }
  }, [universityData, handleAnalyze, hasAnalyzed]);

  const handleNewAnalysis = useCallback(() => {
    setHasAnalyzed(false);
    setAnalysis(null);
    setError(null);
  }, []);

  const getHealthColor = useCallback((score) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-blue-600 bg-blue-100';
    if (score >= 40) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  }, []);

  const getRatingColor = useCallback((rating) => {
    switch (rating) {
      case 'Excellent': return 'text-green-600 bg-green-100';
      case 'Good': return 'text-blue-600 bg-blue-100';
      case 'Fair': return 'text-yellow-600 bg-yellow-100';
      case 'Poor': return 'text-orange-600 bg-orange-100';
      case 'Critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  }, []);

  const getTrendColor = useCallback((trend) => {
    switch (trend) {
      case 'Improving': return 'text-green-600 bg-green-100';
      case 'Stable': return 'text-blue-600 bg-blue-100';
      case 'Declining': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  }, []);

  const getPriorityColor = useCallback((priority) => {
    switch (priority) {
      case 'High': return 'text-red-600 bg-red-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  }, []);

  const formatCurrency = useCallback((value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  }, []);

  const formatPercentage = useCallback((value) => {
    return `${value.toFixed(1)}%`;
  }, []);

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-3 text-gray-600 dark:text-gray-300">
            {getTranslation('ai.financialIntelligence.analyzing', 'Analyzing financial data...')}
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
            onClick={handleNewAnalysis}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
          >
            {getTranslation('ai.financialIntelligence.retry', 'Retry Analysis')}
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
            {getTranslation('ai.financialIntelligence.noData', 'No financial data available for analysis.')}
          </p>
          <button
            onClick={handleNewAnalysis}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
          >
            {getTranslation('ai.financialIntelligence.startAnalysis', 'Start Analysis')}
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
            {getTranslation('ai.financialIntelligence.title', 'Financial Intelligence')}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            {getTranslation('ai.financialIntelligence.subtitle', 'AI-powered financial analysis and optimization insights')}
          </p>
        </div>
        <button
          onClick={handleNewAnalysis}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
        >
          {getTranslation('ai.financialIntelligence.refresh', 'Refresh Analysis')}
        </button>
      </div>

      {/* Analysis Configuration */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {getTranslation('ai.financialIntelligence.analysisType', 'Analysis Type')}
          </label>
          <select
            value={analysisType}
            onChange={(e) => setAnalysisType(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="health">{getTranslation('ai.financialIntelligence.health', 'Financial Health')}</option>
            <option value="optimization">{getTranslation('ai.financialIntelligence.optimization', 'Budget Optimization')}</option>
            <option value="forecasting">{getTranslation('ai.financialIntelligence.forecasting', 'Financial Forecasting')}</option>
            <option value="benchmarking">{getTranslation('ai.financialIntelligence.benchmarking', 'Benchmarking')}</option>
            <option value="risk">{getTranslation('ai.financialIntelligence.risk', 'Financial Risk')}</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {getTranslation('ai.financialIntelligence.timePeriod', 'Time Period')}
          </label>
          <select
            value={timePeriod}
            onChange={(e) => setTimePeriod(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="monthly">{getTranslation('ai.financialIntelligence.monthly', 'Monthly')}</option>
            <option value="quarterly">{getTranslation('ai.financialIntelligence.quarterly', 'Quarterly')}</option>
            <option value="yearly">{getTranslation('ai.financialIntelligence.yearly', 'Yearly')}</option>
            <option value="5-year">{getTranslation('ai.financialIntelligence.5year', '5-Year')}</option>
          </select>
        </div>
      </div>

      {/* Financial Health Overview */}
      {analysis.financialHealth && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {analysis.financialHealth.score}/100
            </div>
            <div className="text-sm text-blue-800 dark:text-blue-200">
              {getTranslation('ai.financialIntelligence.healthScore', 'Health Score')}
            </div>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {analysis.financialHealth.rating}
            </div>
            <div className="text-sm text-green-800 dark:text-green-200">
              {getTranslation('ai.financialIntelligence.rating', 'Rating')}
            </div>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {analysis.financialHealth.trend}
            </div>
            <div className="text-sm text-purple-800 dark:text-purple-200">
              {getTranslation('ai.financialIntelligence.trend', 'Trend')}
            </div>
          </div>
          <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              {timePeriod}
            </div>
            <div className="text-sm text-orange-800 dark:text-orange-200">
              {getTranslation('ai.financialIntelligence.period', 'Period')}
            </div>
          </div>
        </div>
      )}

      {/* Summary */}
      {analysis.summary && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
          <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
            {getTranslation('ai.financialIntelligence.summary', 'Analysis Summary')}
          </h4>
          <p className="text-blue-800 dark:text-blue-200 text-sm">
            {analysis.summary}
          </p>
        </div>
      )}

      {/* Tabs */}
      <div className="mb-6">
        <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
          {[
            { id: 'overview', name: getTranslation('ai.financialIntelligence.overview', 'Overview') },
            { id: 'revenue', name: getTranslation('ai.financialIntelligence.revenue', 'Revenue') },
            { id: 'expenses', name: getTranslation('ai.financialIntelligence.expenses', 'Expenses') },
            { id: 'cashflow', name: getTranslation('ai.financialIntelligence.cashflow', 'Cash Flow') },
            { id: 'optimization', name: getTranslation('ai.financialIntelligence.optimization', 'Optimization') },
            { id: 'forecasting', name: getTranslation('ai.financialIntelligence.forecasting', 'Forecasting') }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Financial Health Details */}
            {analysis.financialHealth && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                  <h4 className="font-medium text-green-900 dark:text-green-100 mb-3">
                    {getTranslation('ai.financialIntelligence.keyStrengths', 'Key Strengths')}
                  </h4>
                  <ul className="space-y-2">
                    {analysis.financialHealth.keyStrengths?.map((strength, index) => (
                      <li key={index} className="text-green-800 dark:text-green-200 text-sm flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        {strength}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                  <h4 className="font-medium text-red-900 dark:text-red-100 mb-3">
                    {getTranslation('ai.financialIntelligence.keyConcerns', 'Key Concerns')}
                  </h4>
                  <ul className="space-y-2">
                    {analysis.financialHealth.keyConcerns?.map((concern, index) => (
                      <li key={index} className="text-red-800 dark:text-red-200 text-sm flex items-center">
                        <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                        {concern}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* KPIs */}
            {analysis.kpis && analysis.kpis.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                  {getTranslation('ai.financialIntelligence.kpis', 'Key Performance Indicators')}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {analysis.kpis.map((kpi, index) => (
                    <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium text-gray-900 dark:text-white text-sm">
                          {kpi.name}
                        </h5>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          kpi.trend === 'Up' ? 'text-green-600 bg-green-100' :
                          kpi.trend === 'Down' ? 'text-red-600 bg-red-100' :
                          'text-gray-600 bg-gray-100'
                        }`}>
                          {kpi.trend}
                        </span>
                      </div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                        {kpi.current}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        {getTranslation('ai.financialIntelligence.target', 'Target')}: {kpi.target}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Revenue Tab */}
        {activeTab === 'revenue' && analysis.revenueAnalysis && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {formatCurrency(analysis.revenueAnalysis.totalRevenue)}
                </div>
                <div className="text-sm text-blue-800 dark:text-blue-200">
                  {getTranslation('ai.financialIntelligence.totalRevenue', 'Total Revenue')}
                </div>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {formatPercentage(analysis.revenueAnalysis.growthRate)}
                </div>
                <div className="text-sm text-green-800 dark:text-green-200">
                  {getTranslation('ai.financialIntelligence.growthRate', 'Growth Rate')}
                </div>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {analysis.revenueAnalysis.diversification}
                </div>
                <div className="text-sm text-purple-800 dark:text-purple-200">
                  {getTranslation('ai.financialIntelligence.diversification', 'Diversification')}
                </div>
              </div>
            </div>

            {/* Revenue Sources */}
            {analysis.revenueAnalysis.primarySources && (
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                  {getTranslation('ai.financialIntelligence.revenueSources', 'Revenue Sources')}
                </h4>
                <div className="space-y-3">
                  {analysis.revenueAnalysis.primarySources.map((source, index) => (
                    <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium text-gray-900 dark:text-white">
                          {source.source}
                        </h5>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          source.trend === 'Growing' ? 'text-green-600 bg-green-100' :
                          source.trend === 'Stable' ? 'text-blue-600 bg-blue-100' :
                          'text-red-600 bg-red-100'
                        }`}>
                          {source.trend}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-lg font-bold text-gray-900 dark:text-white">
                            {formatCurrency(source.amount)}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-300">
                            {getTranslation('ai.financialIntelligence.amount', 'Amount')}
                          </div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-gray-900 dark:text-white">
                            {formatPercentage(source.percentage)}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-300">
                            {getTranslation('ai.financialIntelligence.percentage', 'Percentage')}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Revenue Recommendations */}
            {analysis.revenueAnalysis.recommendations && (
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">
                  {getTranslation('ai.financialIntelligence.recommendations', 'Recommendations')}
                </h4>
                <ul className="space-y-1">
                  {analysis.revenueAnalysis.recommendations.map((rec, index) => (
                    <li key={index} className="text-green-800 dark:text-green-200 text-sm">
                      • {rec}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Expenses Tab */}
        {activeTab === 'expenses' && analysis.expenseAnalysis && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                  {formatCurrency(analysis.expenseAnalysis.totalExpenses)}
                </div>
                <div className="text-sm text-red-800 dark:text-red-200">
                  {getTranslation('ai.financialIntelligence.totalExpenses', 'Total Expenses')}
                </div>
              </div>
              <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                  {formatPercentage(analysis.expenseAnalysis.growthRate)}
                </div>
                <div className="text-sm text-orange-800 dark:text-orange-200">
                  {getTranslation('ai.financialIntelligence.expenseGrowth', 'Expense Growth')}
                </div>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {analysis.expenseAnalysis.efficiency}
                </div>
                <div className="text-sm text-blue-800 dark:text-blue-200">
                  {getTranslation('ai.financialIntelligence.efficiency', 'Efficiency')}
                </div>
              </div>
            </div>

            {/* Expense Categories */}
            {analysis.expenseAnalysis.categories && (
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                  {getTranslation('ai.financialIntelligence.expenseCategories', 'Expense Categories')}
                </h4>
                <div className="space-y-3">
                  {analysis.expenseAnalysis.categories.map((category, index) => (
                    <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium text-gray-900 dark:text-white">
                          {category.category}
                        </h5>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          category.optimization === 'High' ? 'text-red-600 bg-red-100' :
                          category.optimization === 'Medium' ? 'text-yellow-600 bg-yellow-100' :
                          'text-green-600 bg-green-100'
                        }`}>
                          {category.optimization} {getTranslation('ai.financialIntelligence.optimization', 'Optimization')}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-lg font-bold text-gray-900 dark:text-white">
                            {formatCurrency(category.amount)}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-300">
                            {getTranslation('ai.financialIntelligence.amount', 'Amount')}
                          </div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-gray-900 dark:text-white">
                            {formatPercentage(category.percentage)}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-300">
                            {getTranslation('ai.financialIntelligence.percentage', 'Percentage')}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Cash Flow Tab */}
        {activeTab === 'cashflow' && analysis.cashFlowAnalysis && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {formatCurrency(analysis.cashFlowAnalysis.operatingCashFlow)}
                </div>
                <div className="text-sm text-green-800 dark:text-green-200">
                  {getTranslation('ai.financialIntelligence.operatingCashFlow', 'Operating Cash Flow')}
                </div>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {formatCurrency(analysis.cashFlowAnalysis.investingCashFlow)}
                </div>
                <div className="text-sm text-blue-800 dark:text-blue-200">
                  {getTranslation('ai.financialIntelligence.investingCashFlow', 'Investing Cash Flow')}
                </div>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {formatCurrency(analysis.cashFlowAnalysis.financingCashFlow)}
                </div>
                <div className="text-sm text-purple-800 dark:text-purple-200">
                  {getTranslation('ai.financialIntelligence.financingCashFlow', 'Financing Cash Flow')}
                </div>
              </div>
              <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                  {formatCurrency(analysis.cashFlowAnalysis.freeCashFlow)}
                </div>
                <div className="text-sm text-orange-800 dark:text-orange-200">
                  {getTranslation('ai.financialIntelligence.freeCashFlow', 'Free Cash Flow')}
                </div>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                {getTranslation('ai.financialIntelligence.liquidity', 'Liquidity Assessment')}
              </h4>
              <p className="text-blue-800 dark:text-blue-200 text-sm">
                {getTranslation('ai.financialIntelligence.liquidityStatus', 'Liquidity Status')}: <strong>{analysis.cashFlowAnalysis.liquidity}</strong>
              </p>
            </div>
          </div>
        )}

        {/* Optimization Tab */}
        {activeTab === 'optimization' && analysis.budgetOptimization && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {formatCurrency(analysis.budgetOptimization.potentialSavings)}
                </div>
                <div className="text-sm text-green-800 dark:text-green-200">
                  {getTranslation('ai.financialIntelligence.potentialSavings', 'Potential Savings')}
                </div>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {formatCurrency(analysis.budgetOptimization.revenueEnhancement)}
                </div>
                <div className="text-sm text-blue-800 dark:text-blue-200">
                  {getTranslation('ai.financialIntelligence.revenueEnhancement', 'Revenue Enhancement')}
                </div>
              </div>
            </div>

            {/* Optimization Areas */}
            {analysis.budgetOptimization.optimizationAreas && (
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                  {getTranslation('ai.financialIntelligence.optimizationAreas', 'Optimization Areas')}
                </h4>
                <div className="space-y-3">
                  {analysis.budgetOptimization.optimizationAreas.map((area, index) => (
                    <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium text-gray-900 dark:text-white">
                          {area.area}
                        </h5>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(area.priority)}`}>
                          {area.priority} {getTranslation('ai.financialIntelligence.priority', 'Priority')}
                        </span>
                      </div>
                      <div className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                        {formatCurrency(area.potential)}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        {getTranslation('ai.financialIntelligence.potential', 'Potential')}
                      </div>
                      {area.actions && (
                        <div className="mt-2">
                          <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            {getTranslation('ai.financialIntelligence.actions', 'Actions')}:
                          </div>
                          <ul className="space-y-1">
                            {area.actions.map((action, actionIndex) => (
                              <li key={actionIndex} className="text-sm text-gray-600 dark:text-gray-300">
                                • {action}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Forecasting Tab */}
        {activeTab === 'forecasting' && analysis.forecasting && (
          <div className="space-y-6">
            {/* Projections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <h4 className="font-medium text-green-900 dark:text-green-100 mb-3">
                  {getTranslation('ai.financialIntelligence.revenueProjection', 'Revenue Projection')}
                </h4>
                <div className="space-y-2">
                  <div>
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {formatCurrency(analysis.forecasting.revenueProjection.nextYear)}
                    </div>
                    <div className="text-sm text-green-800 dark:text-green-200">
                      {getTranslation('ai.financialIntelligence.nextYear', 'Next Year')}
                    </div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-green-600 dark:text-green-400">
                      {formatPercentage(analysis.forecasting.revenueProjection.growthRate)}
                    </div>
                    <div className="text-sm text-green-800 dark:text-green-200">
                      {getTranslation('ai.financialIntelligence.growthRate', 'Growth Rate')}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <h4 className="font-medium text-red-900 dark:text-red-100 mb-3">
                  {getTranslation('ai.financialIntelligence.expenseProjection', 'Expense Projection')}
                </h4>
                <div className="space-y-2">
                  <div>
                    <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                      {formatCurrency(analysis.forecasting.expenseProjection.nextYear)}
                    </div>
                    <div className="text-sm text-red-800 dark:text-red-200">
                      {getTranslation('ai.financialIntelligence.nextYear', 'Next Year')}
                    </div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-red-600 dark:text-red-400">
                      {formatPercentage(analysis.forecasting.expenseProjection.growthRate)}
                    </div>
                    <div className="text-sm text-red-800 dark:text-red-200">
                      {getTranslation('ai.financialIntelligence.growthRate', 'Growth Rate')}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Scenarios */}
            {analysis.forecasting.scenarios && (
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                  {getTranslation('ai.financialIntelligence.scenarios', 'Financial Scenarios')}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Object.entries(analysis.forecasting.scenarios).map(([scenario, data]) => (
                    <div key={scenario} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <h5 className="font-medium text-gray-900 dark:text-white mb-3 capitalize">
                        {getTranslation(`ai.financialIntelligence.${scenario}`, scenario)}
                      </h5>
                      <div className="space-y-2">
                        <div>
                          <div className="text-sm text-gray-600 dark:text-gray-300">
                            {getTranslation('ai.financialIntelligence.revenue', 'Revenue')}
                          </div>
                          <div className="font-bold text-gray-900 dark:text-white">
                            {formatCurrency(data.revenue)}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600 dark:text-gray-300">
                            {getTranslation('ai.financialIntelligence.expenses', 'Expenses')}
                          </div>
                          <div className="font-bold text-gray-900 dark:text-white">
                            {formatCurrency(data.expenses)}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600 dark:text-gray-300">
                            {getTranslation('ai.financialIntelligence.profit', 'Profit')}
                          </div>
                          <div className={`font-bold ${data.profit >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                            {formatCurrency(data.profit)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Action Items */}
      {analysis.actionItems && analysis.actionItems.length > 0 && (
        <div className="mt-6 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
          <h4 className="font-medium text-purple-900 dark:text-purple-100 mb-2">
            {getTranslation('ai.financialIntelligence.actionItems', 'Action Items')}
          </h4>
          <div className="space-y-2">
            {analysis.actionItems.map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(item.priority)}`}>
                  {item.priority}
                </span>
                <div className="flex-1">
                  <div className="text-sm text-purple-800 dark:text-purple-200">
                    {item.item}
                  </div>
                  <div className="text-xs text-purple-600 dark:text-purple-300">
                    {getTranslation('ai.financialIntelligence.timeline', 'Timeline')}: {item.timeline} | 
                    {getTranslation('ai.financialIntelligence.impact', 'Impact')}: {item.impact}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommendations */}
      {analysis.recommendations && analysis.recommendations.length > 0 && (
        <div className="mt-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
          <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">
            {getTranslation('ai.financialIntelligence.recommendations', 'Recommendations')}
          </h4>
          <ul className="space-y-1">
            {analysis.recommendations.map((rec, index) => (
              <li key={index} className="text-green-800 dark:text-green-200 text-sm">
                • {rec}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FinancialIntelligence;