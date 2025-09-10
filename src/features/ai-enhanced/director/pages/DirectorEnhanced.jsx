import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalization } from '../../../../hooks/useLocalization';
import DirectorStrategicInsights from '../components/DirectorStrategicInsights';
import DirectorRiskAssessment from '../components/DirectorRiskAssessment';
import DirectorPerformanceForecasting from '../components/DirectorPerformanceForecasting';
import DirectorFinancialIntelligence from '../components/DirectorFinancialIntelligence';
import DirectorOperationalExcellence from '../components/DirectorOperationalExcellence';
import enTranslations from '../../locals/en.json';
import arTranslations from '../../locals/ar.json';

const DirectorEnhanced = () => {
  const { t } = useTranslation();
  const { isRTLMode } = useLocalization();
  
  const [showAIFeatures, setShowAIFeatures] = useState(false);
  const [strategicInsights, setStrategicInsights] = useState(null);
  const [riskAssessment, setRiskAssessment] = useState(null);
  const [performanceForecast, setPerformanceForecast] = useState(null);
  const [financialAnalysis, setFinancialAnalysis] = useState(null);
  const [operationalAnalysis, setOperationalAnalysis] = useState(null);
  const [activeFeature, setActiveFeature] = useState('strategic-insights'); // 'strategic-insights', 'risk-assessment', 'performance-forecasting', 'financial-intelligence', or 'operational-excellence'

  // Handle strategic insights generation
  const handleInsightsGenerated = (insights) => {
    setStrategicInsights(insights);
    console.log('Strategic insights generated:', insights);
  };

  // Handle risk assessment completion
  const handleRiskAssessmentComplete = (assessment) => {
    setRiskAssessment(assessment);
    console.log('Risk assessment completed:', assessment);
  };

  // Handle performance forecast completion
  const handlePerformanceForecastComplete = (forecast) => {
    setPerformanceForecast(forecast);
    console.log('Performance forecast completed:', forecast);
  };

  // Handle financial intelligence analysis completion
  const handleFinancialAnalysisComplete = (analysis) => {
    setFinancialAnalysis(analysis);
    console.log('Financial intelligence analysis completed:', analysis);
  };

  // Handle operational excellence analysis completion
  const handleOperationalAnalysisComplete = (analysis) => {
    setOperationalAnalysis(analysis);
    console.log('Operational excellence analysis completed:', analysis);
  };

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

  return (
    <div className="director-dashboard-enhanced min-h-screen bg-gray-50 dark:bg-gray-900" dir={isRTLMode ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {getTranslation('director.dashboard.title', 'Director Dashboard')}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              {getTranslation('director.dashboard.subtitle', 'AI-Enhanced Strategic Management')}
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAIFeatures(!showAIFeatures)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                showAIFeatures 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <circle cx="6" cy="6" r="2" />
                    <circle cx="18" cy="6" r="2" />
                    <circle cx="6" cy="18" r="2" />
                    <circle cx="18" cy="18" r="2" />
                    <rect x="10" y="10" width="4" height="4" />
                  </svg>
                </div>
                {getTranslation('director.dashboard.aiFeatures', 'AI Features')}
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* AI Features Toggle */}
        {showAIFeatures && (
          <div className="mb-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
              <div className="flex items-center gap-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {getTranslation('director.dashboard.selectFeature', 'Select AI Feature')}
                </h3>
                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => setActiveFeature('strategic-insights')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      activeFeature === 'strategic-insights'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {getTranslation('director.dashboard.strategicInsights', 'Strategic Insights')}
                  </button>
                  <button
                    onClick={() => setActiveFeature('risk-assessment')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      activeFeature === 'risk-assessment'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {getTranslation('director.dashboard.riskAssessment', 'Risk Assessment')}
                  </button>
                  <button
                    onClick={() => setActiveFeature('performance-forecasting')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      activeFeature === 'performance-forecasting'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {getTranslation('director.dashboard.performanceForecasting', 'Performance Forecasting')}
                  </button>
                  <button
                    onClick={() => setActiveFeature('financial-intelligence')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      activeFeature === 'financial-intelligence'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {getTranslation('director.dashboard.financialIntelligence', 'Financial Intelligence')}
                  </button>
                  <button
                    onClick={() => setActiveFeature('operational-excellence')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      activeFeature === 'operational-excellence'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {getTranslation('director.dashboard.operationalExcellence', 'Operational Excellence')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Strategic Insights Section */}
        {showAIFeatures && activeFeature === 'strategic-insights' && (
          <div className="mb-8">
            <DirectorStrategicInsights onInsightsGenerated={handleInsightsGenerated} />
          </div>
        )}

        {/* Risk Assessment Section */}
        {showAIFeatures && activeFeature === 'risk-assessment' && (
          <div className="mb-8">
            <DirectorRiskAssessment onAssessmentComplete={handleRiskAssessmentComplete} />
          </div>
        )}

        {/* Performance Forecasting Section */}
        {showAIFeatures && activeFeature === 'performance-forecasting' && (
          <div className="mb-8">
            <DirectorPerformanceForecasting onForecastComplete={handlePerformanceForecastComplete} />
          </div>
        )}

        {/* Financial Intelligence Section */}
        {showAIFeatures && activeFeature === 'financial-intelligence' && (
          <div className="mb-8">
            <DirectorFinancialIntelligence onAnalysisComplete={handleFinancialAnalysisComplete} />
          </div>
        )}

        {/* Operational Excellence Section */}
        {showAIFeatures && activeFeature === 'operational-excellence' && (
          <div className="mb-8">
            <DirectorOperationalExcellence onAnalysisComplete={handleOperationalAnalysisComplete} />
          </div>
        )}

        {/* Quick Actions */}
        <div className="mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {getTranslation('director.dashboard.quickActions', 'Quick Actions')}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <button className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-gray-900 dark:text-white">
                      {getTranslation('director.dashboard.strategicPlanning', 'Strategic Planning')}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {getTranslation('director.dashboard.longTermPlanning', 'Long-term planning')}
                    </div>
                  </div>
                </div>
              </button>
              
              <button className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-gray-900 dark:text-white">
                      {getTranslation('director.dashboard.performanceReview', 'Performance Review')}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {getTranslation('director.dashboard.analyzePerformance', 'Analyze performance')}
                    </div>
                  </div>
                </div>
              </button>
              
              {showAIFeatures && (
                <>
                  <button 
                    onClick={() => setActiveFeature('strategic-insights')}
                    className={`p-4 border rounded-lg transition-colors ${
                      activeFeature === 'strategic-insights'
                        ? 'bg-purple-100 dark:bg-purple-900/30 border-purple-300 dark:border-purple-700'
                        : 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-900/30'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <circle cx="6" cy="6" r="2" />
                          <circle cx="18" cy="6" r="2" />
                          <circle cx="6" cy="18" r="2" />
                          <circle cx="18" cy="18" r="2" />
                          <rect x="10" y="10" width="4" height="4" />
                        </svg>
                      </div>
                      <div className="text-left">
                        <div className="font-medium text-gray-900 dark:text-white">
                          {getTranslation('director.dashboard.aiStrategicInsights', 'AI Strategic Insights')}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {getTranslation('director.dashboard.businessIntelligence', 'Business intelligence')}
                        </div>
                      </div>
                    </div>
                  </button>
                  
                  <button 
                    onClick={() => setActiveFeature('risk-assessment')}
                    className={`p-4 border rounded-lg transition-colors ${
                      activeFeature === 'risk-assessment'
                        ? 'bg-orange-100 dark:bg-orange-900/30 border-orange-300 dark:border-orange-700'
                        : 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800 hover:bg-orange-100 dark:hover:bg-orange-900/30'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                      </div>
                      <div className="text-left">
                        <div className="font-medium text-gray-900 dark:text-white">
                          {getTranslation('director.dashboard.riskAssessment', 'Risk Assessment')}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {getTranslation('director.dashboard.aiRiskAnalysis', 'AI risk analysis')}
                        </div>
                      </div>
                    </div>
                  </button>
                  
                  <button 
                    onClick={() => setActiveFeature('performance-forecasting')}
                    className={`p-4 border rounded-lg transition-colors ${
                      activeFeature === 'performance-forecasting'
                        ? 'bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700'
                        : 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 hover:bg-green-100 dark:hover:bg-green-900/30'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                      </div>
                      <div className="text-left">
                        <div className="font-medium text-gray-900 dark:text-white">
                          {getTranslation('director.dashboard.performanceForecasting', 'Performance Forecasting')}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {getTranslation('director.dashboard.aiPerformancePredictions', 'AI performance predictions')}
                        </div>
                      </div>
                    </div>
                  </button>
                  
                  <button 
                    onClick={() => setActiveFeature('financial-intelligence')}
                    className={`p-4 border rounded-lg transition-colors ${
                      activeFeature === 'financial-intelligence'
                        ? 'bg-blue-100 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700'
                        : 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/30'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                      </div>
                      <div className="text-left">
                        <div className="font-medium text-gray-900 dark:text-white">
                          {getTranslation('director.dashboard.financialIntelligence', 'Financial Intelligence')}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {getTranslation('director.dashboard.aiFinancialAnalysis', 'AI financial analysis')}
                        </div>
                      </div>
                    </div>
                  </button>
                  
                  <button 
                    onClick={() => setActiveFeature('operational-excellence')}
                    className={`p-4 border rounded-lg transition-colors ${
                      activeFeature === 'operational-excellence'
                        ? 'bg-indigo-100 dark:bg-indigo-900/30 border-indigo-300 dark:border-indigo-700'
                        : 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/30'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div className="text-left">
                        <div className="font-medium text-gray-900 dark:text-white">
                          {getTranslation('director.dashboard.operationalExcellence', 'Operational Excellence')}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {getTranslation('director.dashboard.aiOperationalAnalysis', 'AI operational analysis')}
                        </div>
                      </div>
                    </div>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Insights Summary */}
        {strategicInsights && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {getTranslation('director.dashboard.latestStrategicAnalysis', 'Latest Strategic Analysis')}
            </h2>
            <div className="text-gray-600 dark:text-gray-300">
              <p><strong>{getTranslation('director.dashboard.focus', 'Focus')}:</strong> {strategicInsights.focus}</p>
              <p><strong>{getTranslation('director.dashboard.period', 'Period')}:</strong> {strategicInsights.period}</p>
              <p><strong>{getTranslation('director.dashboard.insights', 'Insights')}:</strong> {strategicInsights.insights?.length || 0} {getTranslation('director.dashboard.strategicInsightsGenerated', 'strategic insights generated')}</p>
              <p><strong>{getTranslation('director.dashboard.risks', 'Risks')}:</strong> {strategicInsights.risks?.length || 0} {getTranslation('director.dashboard.risksIdentified', 'risks identified')}</p>
              <p><strong>{getTranslation('director.dashboard.opportunities', 'Opportunities')}:</strong> {strategicInsights.opportunities?.length || 0} {getTranslation('director.dashboard.opportunitiesIdentified', 'opportunities identified')}</p>
            </div>
          </div>
        )}

        {/* Risk Assessment Summary */}
        {riskAssessment && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {getTranslation('director.dashboard.latestRiskAssessment', 'Latest Risk Assessment')}
            </h2>
            <div className="text-gray-600 dark:text-gray-300">
              <p><strong>{getTranslation('director.dashboard.totalRisks', 'Total Risks')}:</strong> {riskAssessment.totalRisks}</p>
              <p><strong>{getTranslation('director.dashboard.criticalRisks', 'Critical Risks')}:</strong> {riskAssessment.criticalRisks}</p>
              <p><strong>{getTranslation('director.dashboard.highRisks', 'High Risks')}:</strong> {riskAssessment.highRisks}</p>
              <p><strong>{getTranslation('director.dashboard.dataSource', 'Data Source')}:</strong> {riskAssessment.dataSource}</p>
              <p><strong>{getTranslation('director.dashboard.lastUpdated', 'Last Updated')}:</strong> {new Date(riskAssessment.lastUpdated).toLocaleDateString()}</p>
            </div>
          </div>
        )}

        {/* Performance Forecast Summary */}
        {performanceForecast && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {getTranslation('director.dashboard.latestPerformanceForecast', 'Latest Performance Forecast')}
            </h2>
            <div className="text-gray-600 dark:text-gray-300">
              <p><strong>{getTranslation('director.dashboard.forecastType', 'Forecast Type')}:</strong> {performanceForecast.forecastType}</p>
              <p><strong>{getTranslation('director.dashboard.timeHorizon', 'Time Horizon')}:</strong> {performanceForecast.timeHorizon}</p>
              <p><strong>{getTranslation('director.dashboard.totalMetrics', 'Total Metrics')}:</strong> {performanceForecast.forecasts?.length || 0}</p>
              <p><strong>{getTranslation('director.dashboard.avgGrowth', 'Average Growth')}:</strong> {performanceForecast.baseline?.growthRate?.toFixed(1) || 0}%</p>
              <p><strong>{getTranslation('director.dashboard.confidence', 'Confidence')}:</strong> {performanceForecast.confidence}</p>
              <p><strong>{getTranslation('director.dashboard.dataSource', 'Data Source')}:</strong> {performanceForecast.dataSource}</p>
              <p><strong>{getTranslation('director.dashboard.lastUpdated', 'Last Updated')}:</strong> {new Date(performanceForecast.lastUpdated).toLocaleDateString()}</p>
            </div>
          </div>
        )}

        {/* Financial Analysis Summary */}
        {financialAnalysis && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {getTranslation('director.dashboard.latestFinancialAnalysis', 'Latest Financial Analysis')}
            </h2>
            <div className="text-gray-600 dark:text-gray-300">
              <p><strong>{getTranslation('director.dashboard.analysisType', 'Analysis Type')}:</strong> {financialAnalysis.analysisType}</p>
              <p><strong>{getTranslation('director.dashboard.timePeriod', 'Time Period')}:</strong> {financialAnalysis.timePeriod}</p>
              <p><strong>{getTranslation('director.dashboard.healthScore', 'Health Score')}:</strong> {financialAnalysis.financialHealth?.score || 0}/100</p>
              <p><strong>{getTranslation('director.dashboard.rating', 'Rating')}:</strong> {financialAnalysis.financialHealth?.rating || 'N/A'}</p>
              <p><strong>{getTranslation('director.dashboard.trend', 'Trend')}:</strong> {financialAnalysis.financialHealth?.trend || 'N/A'}</p>
              <p><strong>{getTranslation('director.dashboard.dataSource', 'Data Source')}:</strong> {financialAnalysis.dataSource}</p>
              <p><strong>{getTranslation('director.dashboard.lastUpdated', 'Last Updated')}:</strong> {new Date(financialAnalysis.lastUpdated).toLocaleDateString()}</p>
            </div>
          </div>
        )}

        {/* Operational Analysis Summary */}
        {operationalAnalysis && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {getTranslation('director.dashboard.latestOperationalAnalysis', 'Latest Operational Analysis')}
            </h2>
            <div className="text-gray-600 dark:text-gray-300">
              <p><strong>{getTranslation('director.dashboard.analysisType', 'Analysis Type')}:</strong> {operationalAnalysis.analysisType}</p>
              <p><strong>{getTranslation('director.dashboard.timePeriod', 'Time Period')}:</strong> {operationalAnalysis.timePeriod}</p>
              <p><strong>{getTranslation('director.dashboard.operationalHealthScore', 'Operational Health Score')}:</strong> {operationalAnalysis.operationalHealth?.score || 0}/100</p>
              <p><strong>{getTranslation('director.dashboard.rating', 'Rating')}:</strong> {operationalAnalysis.operationalHealth?.rating || 'N/A'}</p>
              <p><strong>{getTranslation('director.dashboard.trend', 'Trend')}:</strong> {operationalAnalysis.operationalHealth?.trend || 'N/A'}</p>
              <p><strong>{getTranslation('director.dashboard.processEfficiency', 'Process Efficiency')}:</strong> {operationalAnalysis.processEfficiency?.overallEfficiency || 0}%</p>
              <p><strong>{getTranslation('director.dashboard.automationPotential', 'Automation Potential')}:</strong> {operationalAnalysis.automationOpportunities?.automationPotential || 0}%</p>
              <p><strong>{getTranslation('director.dashboard.dataSource', 'Data Source')}:</strong> {operationalAnalysis.dataSource}</p>
              <p><strong>{getTranslation('director.dashboard.lastUpdated', 'Last Updated')}:</strong> {new Date(operationalAnalysis.lastUpdated).toLocaleDateString()}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DirectorEnhanced;