import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalization } from "/src/hooks/useLocalization";
import strategicInsightsService from '../../services/strategicInsightsService';

const DirectorStrategicInsights = ({ onInsightsGenerated }) => {
  const { t } = useTranslation();
  const { isRTLMode } = useLocalization();
  const [insights, setInsights] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState('quarterly');
  const [selectedFocus, setSelectedFocus] = useState('overall');

  // Generate insights when component mounts or parameters change
  useEffect(() => {
    handleGenerateInsights();
  }, [selectedPeriod, selectedFocus]);

  // Handle insights generation
  const handleGenerateInsights = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await strategicInsightsService.generateInsights({
        period: selectedPeriod,
        focus: selectedFocus,
        context: {
          university: 'NexusHive University',
          location: 'Saudi Arabia',
          type: 'Higher Education'
        }
      });
      
      setInsights(result);
      
      if (onInsightsGenerated) {
        onInsightsGenerated(result);
      }
    } catch (err) {
      setError(err.message);
      console.error('Error generating insights:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Get focus options with localization
  const focusOptions = [
    { value: 'overall', label: isRTLMode ? 'الأداء الشامل' : 'Overall Performance', description: isRTLMode ? 'تحليل شامل لأداء الجامعة' : 'Comprehensive university performance analysis' },
    { value: 'academic', label: isRTLMode ? 'التميز الأكاديمي' : 'Academic Excellence', description: isRTLMode ? 'البرامج الأكاديمية ومقاييس نجاح الطلاب' : 'Academic programs and student success metrics' },
    { value: 'financial', label: isRTLMode ? 'الصحة المالية' : 'Financial Health', description: isRTLMode ? 'الإيرادات والتكاليف والاستدامة المالية' : 'Revenue, costs, and financial sustainability' },
    { value: 'enrollment', label: isRTLMode ? 'اتجاهات التسجيل' : 'Enrollment Trends', description: isRTLMode ? 'تحليل تجنيد الطلاب والاحتفاظ بهم' : 'Student recruitment and retention analysis' },
    { value: 'reputation', label: isRTLMode ? 'السمعة والعلامة التجارية' : 'Reputation & Brand', description: isRTLMode ? 'الموقع في السوق وقوة العلامة التجارية' : 'Market position and brand strength' },
    { value: 'operations', label: isRTLMode ? 'الكفاءة التشغيلية' : 'Operational Efficiency', description: isRTLMode ? 'تحسين العمليات واستخدام الموارد' : 'Process optimization and resource utilization' }
  ];

  // Get period options with localization
  const periodOptions = [
    { value: 'monthly', label: isRTLMode ? 'شهري' : 'Monthly' },
    { value: 'quarterly', label: isRTLMode ? 'ربعي' : 'Quarterly' },
    { value: 'yearly', label: isRTLMode ? 'سنوي' : 'Yearly' }
  ];

  // Get insight type color
  const getInsightTypeColor = (type) => {
    const colors = {
      'opportunity': 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
      'risk': 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
      'trend': 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
      'recommendation': 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400',
      'alert': 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400',
      'academic': 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
      'financial': 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
      'operational': 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400',
      'general': 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-400'
    };
    return colors[type] || 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-400';
  };

  // Get priority color - Fixed to handle undefined values
  const getPriorityColor = (priority) => {
    if (!priority) return 'text-gray-600 dark:text-gray-400';
    
    switch (priority.toLowerCase()) {
      case 'high':
        return 'text-red-600 dark:text-red-400';
      case 'medium':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'low':
        return 'text-green-600 dark:text-green-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  // Get impact color
  const getImpactColor = (impact) => {
    if (!impact) return 'text-gray-600 dark:text-gray-400';
    
    switch (impact.toLowerCase()) {
      case 'high':
        return 'text-red-600 dark:text-red-400';
      case 'medium':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'low':
        return 'text-green-600 dark:text-green-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700" dir={isRTLMode ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className={`flex items-center justify-between ${isRTLMode ? 'flex-row-reverse' : ''}`}>
          <div className={isRTLMode ? 'text-right' : 'text-left'}>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {isRTLMode ? 'الرؤى الاستراتيجية والتخطيط الذكي' : 'Strategic Insights & Intelligent Planning'}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
              {isRTLMode 
                ? 'ذكاء الأعمال والتحليل الاستراتيجي مدعوم بالذكاء الاصطناعي' 
                : 'AI-powered business intelligence and strategic analysis'
              }
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={handleGenerateInsights}
              disabled={isLoading}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white rounded-lg transition-colors text-sm"
            >
              {isLoading 
                ? (isRTLMode ? 'جاري التحليل...' : 'Analyzing...') 
                : (isRTLMode ? 'تحديث الرؤى' : 'Refresh Insights')
              }
            </button>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Period Selection */}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
              {isRTLMode ? 'فترة التحليل' : 'Analysis Period'}
            </label>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              {periodOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Focus Selection */}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
              {isRTLMode ? 'تركيز التحليل' : 'Analysis Focus'}
            </label>
            <select
              value={selectedFocus}
              onChange={(e) => setSelectedFocus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              {focusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Insights Content */}
      <div className="p-6">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {isRTLMode ? 'الذكاء الاصطناعي يحلل البيانات الاستراتيجية...' : 'AI is analyzing strategic data...'}
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                {isRTLMode 
                  ? `توليد رؤى لـ ${focusOptions.find(f => f.value === selectedFocus)?.label}` 
                  : `Generating insights for ${focusOptions.find(f => f.value === selectedFocus)?.label}`
                }
              </p>
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {isRTLMode ? 'فشل التحليل' : 'Analysis Failed'}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              {error}
            </p>
            <button
              onClick={handleGenerateInsights}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
              {isRTLMode ? 'حاول مرة أخرى' : 'Try Again'}
            </button>
          </div>
        ) : insights ? (
          <div className="space-y-6">
            {/* Executive Summary */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                {isRTLMode ? 'الملخص التنفيذي' : 'Executive Summary'}
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                {insights.executiveSummary}
              </p>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {insights.keyMetrics?.map((metric, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                      {metric.metric || metric.name || (isRTLMode ? 'مقياس غير معروف' : 'Unknown Metric')}
                    </h4>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      metric.trend === 'improving' || metric.trend === 'up' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
                      metric.trend === 'declining' || metric.trend === 'down' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400' :
                      'bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-400'
                    }`}>
                      {metric.trend === 'improving' || metric.trend === 'up' ? '↗' : 
                       metric.trend === 'declining' || metric.trend === 'down' ? '↘' : '→'}
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {metric.value || 'N/A'}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {isRTLMode ? 'الهدف: ' : 'Target: '}{metric.target || 'N/A'}
                  </div>
                </div>
              ))}
            </div>

            {/* Strategic Insights */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {isRTLMode ? 'الرؤى الاستراتيجية' : 'Strategic Insights'}
              </h3>
              {insights.insights?.map((insight, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getInsightTypeColor(insight.category || insight.type)}`}>
                        {insight.category || insight.type || (isRTLMode ? 'عام' : 'General')}
                      </span>
                      <span className={`text-sm font-medium ${getImpactColor(insight.impact)}`}>
                        {insight.impact || 'Medium'} {isRTLMode ? 'تأثير' : 'Impact'}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {insight.urgency || (isRTLMode ? 'قصير المدى' : 'Short-term')}
                    </div>
                  </div>
                  
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {insight.title || (isRTLMode ? 'رؤية استراتيجية' : 'Strategic Insight')}
                  </h4>
                  
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    {insight.description || (isRTLMode ? 'لا يوجد وصف متاح' : 'No description available')}
                  </p>
                  
                  {insight.recommendations && (
                    <div className="mt-3">
                      <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                        {isRTLMode ? 'التوصيات:' : 'Recommendations:'}
                      </h5>
                      <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
                        {insight.recommendations.map((rec, recIndex) => (
                          <li key={recIndex}>{rec}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Risk Assessment */}
            {insights.risks && insights.risks.length > 0 && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  {isRTLMode ? 'تقييم المخاطر' : 'Risk Assessment'}
                </h3>
                <div className="space-y-3">
                  {insights.risks.map((risk, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {risk.risk || risk.title || (isRTLMode ? 'مخاطر غير معروفة' : 'Unknown Risk')}
                        </h4>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          {risk.description || risk.mitigation || (isRTLMode ? 'لا يوجد وصف متاح' : 'No description available')}
                        </p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
                          <span>{isRTLMode ? 'الاحتمالية: ' : 'Probability: '}{risk.probability || 'Medium'}</span>
                          <span>{isRTLMode ? 'التأثير: ' : 'Impact: '}{risk.impact || 'Medium'}</span>
                          <span>{isRTLMode ? 'التخفيف: ' : 'Mitigation: '}{risk.mitigation || (isRTLMode ? 'مراجعة ومعالجة' : 'Review and address')}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Opportunities */}
            {insights.opportunities && insights.opportunities.length > 0 && (
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  {isRTLMode ? 'فرص النمو' : 'Growth Opportunities'}
                </h3>
                <div className="space-y-3">
                  {insights.opportunities.map((opportunity, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {opportunity.opportunity || opportunity.title || (isRTLMode ? 'فرصة غير معروفة' : 'Unknown Opportunity')}
                        </h4>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          {opportunity.description || (isRTLMode ? 'لا يوجد وصف متاح' : 'No description available')}
                        </p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
                          <span>{isRTLMode ? 'الإمكانات: ' : 'Potential: '}{opportunity.potential || 'Medium'}</span>
                          <span>{isRTLMode ? 'الجهد: ' : 'Effort: '}{opportunity.effort || 'Medium'}</span>
                          <span>{isRTLMode ? 'الجدول الزمني: ' : 'Timeline: '}{opportunity.timeline || (isRTLMode ? 'قصير المدى' : 'Short-term')}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recommendations */}
            {insights.recommendations && insights.recommendations.length > 0 && (
              <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  {isRTLMode ? 'التوصيات الاستراتيجية' : 'Strategic Recommendations'}
                </h3>
                <div className="space-y-3">
                  {insights.recommendations.map((recommendation, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {recommendation.recommendation || recommendation.title || (isRTLMode ? 'توصية استراتيجية' : 'Strategic Recommendation')}
                        </h4>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          {recommendation.description || (isRTLMode ? 'لا يوجد وصف متاح' : 'No description available')}
                        </p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
                          <span>{isRTLMode ? 'الأولوية: ' : 'Priority: '}{recommendation.priority || 'Medium'}</span>
                          <span>{isRTLMode ? 'الجدول الزمني: ' : 'Timeline: '}{recommendation.timeline || (isRTLMode ? 'قصير المدى' : 'Short-term')}</span>
                          <span>{isRTLMode ? 'الموارد: ' : 'Resources: '}{recommendation.resources || (isRTLMode ? 'موارد قياسية' : 'Standard resources')}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {isRTLMode ? 'جاهز للتحليل' : 'Ready to Analyze'}
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {isRTLMode 
                ? 'اختر معاملات التحليل واضغط على "تحديث الرؤى"' 
                : 'Select analysis parameters and click "Refresh Insights"'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DirectorStrategicInsights;