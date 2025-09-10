import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalization } from '../../../../hooks/useLocalization';
import { FiTrendingUp, FiTrendingDown, FiDollarSign, FiBarChart2, FiPieChart, FiTarget, FiAlertCircle, FiCheckCircle, FiClock, FiRefreshCw, FiDownload, FiEye, FiZap, FiShield, FiActivity } from 'react-icons/fi';
import financialIntelligenceService from '../../services/financialIntelligenceService';

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
      setError(isRTLMode ? 'فشل في تحليل البيانات المالية. يرجى المحاولة مرة أخرى.' : 'Failed to analyze financials. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [universityData, analysisType, timePeriod, onAnalysisComplete, hasAnalyzed, isRTLMode]);

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
    if (score >= 80) return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20';
    if (score >= 60) return 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/20';
    if (score >= 40) return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/20';
    return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/20';
  }, []);

  const getRatingColor = useCallback((rating) => {
    switch (rating) {
      case 'Excellent': return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20';
      case 'Good': return 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/20';
      case 'Fair': return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/20';
      case 'Poor': return 'text-orange-600 bg-orange-100 dark:text-orange-400 dark:bg-orange-900/20';
      case 'Critical': return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/20';
      default: return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/20';
    }
  }, []);

  const getTrendColor = useCallback((trend) => {
    switch (trend) {
      case 'Improving': return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20';
      case 'Stable': return 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/20';
      case 'Declining': return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/20';
      default: return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/20';
    }
  }, []);

  const getPriorityColor = useCallback((priority) => {
    switch (priority) {
      case 'High': return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/20';
      case 'Medium': return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/20';
      case 'Low': return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20';
      default: return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/20';
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
            {isRTLMode ? 'جاري تحليل البيانات المالية...' : 'Analyzing financial data...'}
          </span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-center py-8">
          <FiAlertCircle className="text-red-500 w-8 h-8 mr-3" />
          <span className="text-red-600 dark:text-red-400">{error}</span>
        </div>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="text-center py-8">
          <FiDollarSign className="text-gray-400 w-12 h-12 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400">
            {isRTLMode ? 'لا توجد بيانات مالية للتحليل' : 'No financial data available for analysis'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 ${isRTLMode ? 'rtl' : 'ltr'}`} dir={isRTLMode ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {isRTLMode ? 'تحليل الذكاء المالي' : 'Financial Intelligence Analysis'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {isRTLMode ? 'تحليل شامل للوضع المالي والتنبؤات' : 'Comprehensive financial analysis and predictions'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <FiZap className="text-blue-600 w-5 h-5" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {isRTLMode ? 'مدعوم بالذكاء الاصطناعي' : 'AI Powered'}
            </span>
          </div>
        </div>
      </div>

      {/* Analysis Controls */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {isRTLMode ? 'نوع التحليل' : 'Analysis Type'}
            </label>
            <select
              value={analysisType}
              onChange={(e) => setAnalysisType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="health">{isRTLMode ? 'الصحة المالية' : 'Financial Health'}</option>
              <option value="optimization">{isRTLMode ? 'التحسين' : 'Optimization'}</option>
              <option value="forecasting">{isRTLMode ? 'التنبؤ' : 'Forecasting'}</option>
              <option value="benchmarking">{isRTLMode ? 'المقارنة المرجعية' : 'Benchmarking'}</option>
              <option value="risk">{isRTLMode ? 'إدارة المخاطر' : 'Risk Management'}</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {isRTLMode ? 'الفترة الزمنية' : 'Time Period'}
            </label>
            <select
              value={timePeriod}
              onChange={(e) => setTimePeriod(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="monthly">{isRTLMode ? 'شهري' : 'Monthly'}</option>
              <option value="quarterly">{isRTLMode ? 'ربعي' : 'Quarterly'}</option>
              <option value="yearly">{isRTLMode ? 'سنوي' : 'Yearly'}</option>
              <option value="5-year">{isRTLMode ? '5 سنوات' : '5-Year'}</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={handleNewAnalysis}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              <FiRefreshCw className="w-4 h-4" />
              {isRTLMode ? 'تحليل جديد' : 'New Analysis'}
            </button>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <div className="flex overflow-x-auto">
          {[
            { id: 'overview', label: isRTLMode ? 'نظرة عامة' : 'Overview', icon: FiEye },
            { id: 'revenue', label: isRTLMode ? 'الإيرادات' : 'Revenue', icon: FiTrendingUp },
            { id: 'expenses', label: isRTLMode ? 'المصروفات' : 'Expenses', icon: FiTrendingDown },
            { id: 'cashflow', label: isRTLMode ? 'التدفق النقدي' : 'Cash Flow', icon: FiDollarSign },
            { id: 'recommendations', label: isRTLMode ? 'التوصيات' : 'Recommendations', icon: FiTarget }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Financial Health Score */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {isRTLMode ? 'نقاط الصحة المالية' : 'Financial Health Score'}
                </h4>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getHealthColor(analysis.financialHealth?.score || 0)}`}>
                  {analysis.financialHealth?.score || 0}/100
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {analysis.financialHealth?.rating || 'N/A'}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {isRTLMode ? 'التقييم' : 'Rating'}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {analysis.financialHealth?.trend || 'N/A'}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {isRTLMode ? 'الاتجاه' : 'Trend'}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {formatCurrency(analysis.revenueAnalysis?.totalRevenue || 0)}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {isRTLMode ? 'إجمالي الإيرادات' : 'Total Revenue'}
                  </div>
                </div>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 dark:bg-green-900/20 rounded-full p-2">
                    <FiTrendingUp className="text-green-600 w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gray-900 dark:text-white">
                      {formatPercentage(analysis.revenueAnalysis?.growthRate || 0)}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {isRTLMode ? 'نمو الإيرادات' : 'Revenue Growth'}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 dark:bg-blue-900/20 rounded-full p-2">
                    <FiBarChart2 className="text-blue-600 w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gray-900 dark:text-white">
                      {formatPercentage(analysis.profitabilityAnalysis?.operatingMargin || 0)}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {isRTLMode ? 'هامش التشغيل' : 'Operating Margin'}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                <div className="flex items-center gap-3">
                  <div className="bg-purple-100 dark:bg-purple-900/20 rounded-full p-2">
                    <FiPieChart className="text-purple-600 w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gray-900 dark:text-white">
                      {formatPercentage(analysis.profitabilityAnalysis?.roi || 0)}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {isRTLMode ? 'عائد الاستثمار' : 'ROI'}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                <div className="flex items-center gap-3">
                  <div className="bg-yellow-100 dark:bg-yellow-900/20 rounded-full p-2">
                    <FiShield className="text-yellow-600 w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gray-900 dark:text-white">
                      {analysis.cashFlowAnalysis?.liquidity || 'N/A'}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {isRTLMode ? 'السيولة' : 'Liquidity'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h5 className="font-semibold text-gray-900 dark:text-white mb-2">
                {isRTLMode ? 'ملخص التحليل' : 'Analysis Summary'}
              </h5>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                {analysis.summary || (isRTLMode ? 'تحليل شامل للوضع المالي مع توصيات للتحسين' : 'Comprehensive financial analysis with improvement recommendations')}
              </p>
            </div>
          </div>
        )}

        {/* Revenue Tab */}
        {activeTab === 'revenue' && (
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
              {isRTLMode ? 'تحليل الإيرادات' : 'Revenue Analysis'}
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                <h5 className="font-medium text-gray-900 dark:text-white mb-3">
                  {isRTLMode ? 'مصادر الإيرادات الرئيسية' : 'Primary Revenue Sources'}
                </h5>
                <div className="space-y-3">
                  {analysis.revenueAnalysis?.primarySources?.map((source, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">{source.source}</span>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {formatCurrency(source.amount)}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-500">
                          {formatPercentage(source.percentage)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                <h5 className="font-medium text-gray-900 dark:text-white mb-3">
                  {isRTLMode ? 'توصيات زيادة الإيرادات' : 'Revenue Enhancement Recommendations'}
                </h5>
                <div className="space-y-2">
                  {analysis.revenueAnalysis?.recommendations?.map((rec, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <FiCheckCircle className="text-green-500 w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{rec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Expenses Tab */}
        {activeTab === 'expenses' && (
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
              {isRTLMode ? 'تحليل المصروفات' : 'Expense Analysis'}
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                <h5 className="font-medium text-gray-900 dark:text-white mb-3">
                  {isRTLMode ? 'فئات المصروفات' : 'Expense Categories'}
                </h5>
                <div className="space-y-3">
                  {analysis.expenseAnalysis?.categories?.map((category, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">{category.category}</span>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {formatCurrency(category.amount)}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-500">
                          {formatPercentage(category.percentage)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                <h5 className="font-medium text-gray-900 dark:text-white mb-3">
                  {isRTLMode ? 'توصيات توفير التكاليف' : 'Cost Saving Recommendations'}
                </h5>
                <div className="space-y-2">
                  {analysis.expenseAnalysis?.recommendations?.map((rec, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <FiTarget className="text-blue-500 w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{rec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Cash Flow Tab */}
        {activeTab === 'cashflow' && (
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
              {isRTLMode ? 'تحليل التدفق النقدي' : 'Cash Flow Analysis'}
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600 text-center">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {formatCurrency(analysis.cashFlowAnalysis?.operatingCashFlow || 0)}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {isRTLMode ? 'التدفق النقدي التشغيلي' : 'Operating Cash Flow'}
                </div>
              </div>

              <div className="bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600 text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {formatCurrency(analysis.cashFlowAnalysis?.freeCashFlow || 0)}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {isRTLMode ? 'التدفق النقدي الحر' : 'Free Cash Flow'}
                </div>
              </div>

              <div className="bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600 text-center">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {analysis.cashFlowAnalysis?.liquidity || 'N/A'}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {isRTLMode ? 'مستوى السيولة' : 'Liquidity Level'}
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
              <h5 className="font-medium text-gray-900 dark:text-white mb-3">
                {isRTLMode ? 'توصيات إدارة التدفق النقدي' : 'Cash Flow Management Recommendations'}
              </h5>
              <div className="space-y-2">
                {analysis.cashFlowAnalysis?.recommendations?.map((rec, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <FiActivity className="text-green-500 w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{rec}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Recommendations Tab */}
        {activeTab === 'recommendations' && (
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
              {isRTLMode ? 'التوصيات والإجراءات' : 'Recommendations & Actions'}
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                <h5 className="font-medium text-gray-900 dark:text-white mb-3">
                  {isRTLMode ? 'التوصيات العامة' : 'General Recommendations'}
                </h5>
                <div className="space-y-2">
                  {analysis.recommendations?.map((rec, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <FiTarget className="text-blue-500 w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{rec}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                <h5 className="font-medium text-gray-900 dark:text-white mb-3">
                  {isRTLMode ? 'إجراءات التحسين' : 'Optimization Actions'}
                </h5>
                <div className="space-y-3">
                  {analysis.budgetOptimization?.optimizationAreas?.map((area, index) => (
                    <div key={index} className="border-l-4 border-blue-500 pl-3">
                      <div className="font-medium text-gray-900 dark:text-white text-sm">
                        {area.area}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        {isRTLMode ? 'إمكانية التوفير' : 'Savings Potential'}: {formatCurrency(area.potential)}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        {isRTLMode ? 'الأولوية' : 'Priority'}: {area.priority}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FinancialIntelligence;