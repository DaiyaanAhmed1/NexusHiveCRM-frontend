import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalization } from '../../../../hooks/useLocalization';
import { FiTrendingUp, FiTrendingDown, FiDollarSign, FiCalendar, FiBarChart2, FiPieChart, FiRefreshCw, FiDownload, FiTarget, FiClock } from 'react-icons/fi';

const PaymentForecasting = ({ paymentData, onForecastComplete }) => {
  const { t } = useTranslation();
  const { isRTLMode } = useLocalization();
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');

  // Dummy payment forecasting data
  const dummyForecastData = {
    summary: isRTLMode 
      ? "تم إكمال توقع المدفوعات بنجاح. تم تحليل الأنماط التاريخية وتوقع الاتجاهات المستقبلية للمدفوعات."
      : "Payment forecasting completed successfully. Historical patterns have been analyzed and future payment trends predicted.",
    currentPeriod: {
      collected: 125000,
      pending: 45000,
      refunds: 5000,
      growth: 8.5
    },
    forecasts: {
      monthly: {
        nextMonth: 135000,
        growth: 8.0,
        confidence: 85,
        factors: [
          isRTLMode ? "زيادة في طلبات القبول" : "Increase in admission applications",
          isRTLMode ? "موسم الدفع القادم" : "Upcoming payment season",
          isRTLMode ? "تحسينات في النظام" : "System improvements"
        ]
      },
      quarterly: {
        nextQuarter: 420000,
        growth: 12.5,
        confidence: 78,
        factors: [
          isRTLMode ? "فصل دراسي جديد" : "New academic semester",
          isRTLMode ? "برامج جديدة" : "New programs",
          isRTLMode ? "شراكات استراتيجية" : "Strategic partnerships"
        ]
      },
      yearly: {
        nextYear: 1650000,
        growth: 15.2,
        confidence: 72,
        factors: [
          isRTLMode ? "توسع في الحرم الجامعي" : "Campus expansion",
          isRTLMode ? "زيادة الطاقة الاستيعابية" : "Increased capacity",
          isRTLMode ? "تحسينات في التسويق" : "Marketing improvements"
        ]
      }
    },
    scenarios: {
      optimistic: {
        monthly: 150000,
        quarterly: 480000,
        yearly: 1850000,
        probability: 25,
        description: isRTLMode ? "سيناريو متفائل - نمو قوي في الطلب" : "Optimistic scenario - strong demand growth"
      },
      realistic: {
        monthly: 135000,
        quarterly: 420000,
        yearly: 1650000,
        probability: 50,
        description: isRTLMode ? "سيناريو واقعي - نمو معتدل" : "Realistic scenario - moderate growth"
      },
      pessimistic: {
        monthly: 115000,
        quarterly: 360000,
        yearly: 1450000,
        probability: 25,
        description: isRTLMode ? "سيناريو متشائم - نمو بطيء" : "Pessimistic scenario - slow growth"
      }
    },
    trends: [
      {
        period: isRTLMode ? "الدفعات الشهرية" : "Monthly Payments",
        trend: "up",
        value: 8.5,
        description: isRTLMode ? "زيادة مطردة في المدفوعات الشهرية" : "Steady increase in monthly payments"
      },
      {
        period: isRTLMode ? "المدفوعات عبر الإنترنت" : "Online Payments",
        trend: "up",
        value: 15.2,
        description: isRTLMode ? "نمو سريع في المدفوعات الرقمية" : "Rapid growth in digital payments"
      },
      {
        period: isRTLMode ? "المدفوعات المتأخرة" : "Late Payments",
        trend: "down",
        value: -5.8,
        description: isRTLMode ? "انخفاض في المدفوعات المتأخرة" : "Decrease in late payments"
      },
      {
        period: isRTLMode ? "المبالغ المستردة" : "Refunds",
        trend: "stable",
        value: 2.1,
        description: isRTLMode ? "استقرار في المبالغ المستردة" : "Stable refund amounts"
      }
    ],
    recommendations: [
      isRTLMode ? "تحسين نظام المدفوعات عبر الإنترنت" : "Enhance online payment system",
      isRTLMode ? "إطلاق برامج دفع مرنة" : "Launch flexible payment programs",
      isRTLMode ? "تحسين تجربة المستخدم" : "Improve user experience",
      isRTLMode ? "تطوير استراتيجية تسويق رقمية" : "Develop digital marketing strategy"
    ],
    actionItems: [
      {
        item: isRTLMode ? "تحديث بوابة الدفع" : "Update payment gateway",
        priority: "High",
        timeline: isRTLMode ? "خلال شهر" : "Within a month",
        impact: isRTLMode ? "عالي" : "High"
      },
      {
        item: isRTLMode ? "إطلاق برنامج الدفع بالتقسيط" : "Launch installment payment program",
        priority: "Medium",
        timeline: isRTLMode ? "خلال 3 أشهر" : "Within 3 months",
        impact: isRTLMode ? "متوسط" : "Medium"
      },
      {
        item: isRTLMode ? "تحسين التذكيرات التلقائية" : "Improve automated reminders",
        priority: "Low",
        timeline: isRTLMode ? "خلال 6 أشهر" : "Within 6 months",
        impact: isRTLMode ? "منخفض" : "Low"
      }
    ],
    lastUpdated: new Date().toISOString()
  };

  // Memoize the analysis function
  const handleAnalyze = useCallback(async () => {
    if (!paymentData || hasAnalyzed) {
      return;
    }

    setLoading(true);
    setError(null);
    setHasAnalyzed(true);
    
    try {
      console.log('Starting payment forecasting analysis with data:', paymentData);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Payment forecasting analysis result:', dummyForecastData);
      setForecast(dummyForecastData);
      
      if (onForecastComplete) {
        onForecastComplete(dummyForecastData);
      }
    } catch (err) {
      console.error('Payment forecasting analysis error:', err);
      setError(isRTLMode ? 'فشل في توقع المدفوعات. يرجى المحاولة مرة أخرى.' : 'Failed to forecast payments. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [paymentData, onForecastComplete, hasAnalyzed, isRTLMode]);

  // Only run analysis once when component mounts or data changes
  useEffect(() => {
    if (paymentData && !hasAnalyzed) {
      handleAnalyze();
    }
  }, [paymentData, handleAnalyze, hasAnalyzed]);

  const handleNewAnalysis = useCallback(() => {
    setHasAnalyzed(false);
    setForecast(null);
    setError(null);
  }, []);

  const getTrendIcon = useCallback((trend) => {
    switch (trend) {
      case 'up': return <FiTrendingUp className="text-green-500" />;
      case 'down': return <FiTrendingDown className="text-red-500" />;
      case 'stable': return <FiBarChart2 className="text-blue-500" />;
      default: return <FiBarChart2 className="text-gray-500" />;
    }
  }, []);

  const getTrendColor = useCallback((trend) => {
    switch (trend) {
      case 'up': return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20';
      case 'down': return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/20';
      case 'stable': return 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/20';
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
    return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;
  }, []);

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6" dir={isRTLMode ? 'rtl' : 'ltr'}>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
          <span className="ml-3 text-gray-600 dark:text-gray-300">
            {isRTLMode ? 'جاري توقع المدفوعات...' : 'Forecasting payments...'}
          </span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6" dir={isRTLMode ? 'rtl' : 'ltr'}>
        <div className="text-center py-8">
          <div className="text-red-500 text-lg mb-2">⚠️</div>
          <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
          <button
            onClick={handleNewAnalysis}
            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
          >
            {isRTLMode ? 'إعادة المحاولة' : 'Retry Analysis'}
          </button>
        </div>
      </div>
    );
  }

  if (!forecast) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6" dir={isRTLMode ? 'rtl' : 'ltr'}>
        <div className="text-center py-8">
          <div className="text-gray-400 text-lg mb-2">��</div>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {isRTLMode ? 'لا توجد بيانات متاحة لتوقع المدفوعات.' : 'No data available for payment forecasting.'}
          </p>
          <button
            onClick={handleNewAnalysis}
            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
          >
            {isRTLMode ? 'بدء التوقع' : 'Start Forecasting'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6" dir={isRTLMode ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {isRTLMode ? 'توقع المدفوعات' : 'Payment Forecasting'}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            {isRTLMode ? 'تحليل ذكي للتنبؤ باتجاهات المدفوعات المستقبلية' : 'Intelligent analysis to predict future payment trends'}
          </p>
        </div>
        <button
          onClick={handleNewAnalysis}
          className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
        >
          {isRTLMode ? 'تحديث التوقع' : 'Refresh Forecast'}
        </button>
      </div>

      {/* Summary */}
      {forecast.summary && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-6">
          <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">
            {isRTLMode ? 'ملخص التوقع' : 'Forecast Summary'}
          </h4>
          <p className="text-green-800 dark:text-green-200 text-sm">
            {forecast.summary}
          </p>
        </div>
      )}

      {/* Current Period Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            ₹{forecast.currentPeriod.collected.toLocaleString()}
          </div>
          <div className="text-sm text-blue-800 dark:text-blue-200">
            {isRTLMode ? 'محصل هذا الشهر' : 'This Month Collected'}
          </div>
        </div>
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
            ₹{forecast.currentPeriod.pending.toLocaleString()}
          </div>
          <div className="text-sm text-yellow-800 dark:text-yellow-200">
            {isRTLMode ? 'معلق' : 'Pending'}
          </div>
        </div>
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="text-2xl font-bold text-red-600 dark:text-red-400">
            ₹{forecast.currentPeriod.refunds.toLocaleString()}
          </div>
          <div className="text-sm text-red-800 dark:text-red-200">
            {isRTLMode ? 'مسترد' : 'Refunds'}
          </div>
        </div>
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {formatPercentage(forecast.currentPeriod.growth)}
          </div>
          <div className="text-sm text-green-800 dark:text-green-200">
            {isRTLMode ? 'نمو' : 'Growth'}
          </div>
        </div>
      </div>

      {/* Period Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {isRTLMode ? 'فترة التوقع' : 'Forecast Period'}
        </label>
        <div className="flex space-x-2">
          {[
            { value: 'monthly', label: isRTLMode ? 'شهري' : 'Monthly' },
            { value: 'quarterly', label: isRTLMode ? 'ربعي' : 'Quarterly' },
            { value: 'yearly', label: isRTLMode ? 'سنوي' : 'Yearly' }
          ].map((period) => (
            <button
              key={period.value}
              onClick={() => setSelectedPeriod(period.value)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedPeriod === period.value
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {period.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
          {[
            { id: 'overview', name: isRTLMode ? 'نظرة عامة' : 'Overview' },
            { id: 'scenarios', name: isRTLMode ? 'السيناريوهات' : 'Scenarios' },
            { id: 'trends', name: isRTLMode ? 'الاتجاهات' : 'Trends' },
            { id: 'actions', name: isRTLMode ? 'الإجراءات' : 'Actions' }
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
            {/* Forecast for Selected Period */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <FiTarget className="text-green-500" />
                <h4 className="font-medium text-green-900 dark:text-green-100">
                  {isRTLMode ? `توقع ${selectedPeriod === 'monthly' ? 'الشهر القادم' : selectedPeriod === 'quarterly' ? 'الربع القادم' : 'العام القادم'}` : 
                   `Forecast for Next ${selectedPeriod === 'monthly' ? 'Month' : selectedPeriod === 'quarterly' ? 'Quarter' : 'Year'}`}
                </h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                    ₹{forecast.forecasts[selectedPeriod].nextMonth?.toLocaleString() || 
                      forecast.forecasts[selectedPeriod].nextQuarter?.toLocaleString() || 
                      forecast.forecasts[selectedPeriod].nextYear?.toLocaleString()}
                  </div>
                  <div className="text-sm text-green-800 dark:text-green-200">
                    {isRTLMode ? 'المبلغ المتوقع' : 'Expected Amount'}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                    {formatPercentage(forecast.forecasts[selectedPeriod].growth)}
                  </div>
                  <div className="text-sm text-blue-800 dark:text-blue-200">
                    {isRTLMode ? 'معدل النمو' : 'Growth Rate'}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                    {forecast.forecasts[selectedPeriod].confidence}%
                  </div>
                  <div className="text-sm text-purple-800 dark:text-purple-200">
                    {isRTLMode ? 'مستوى الثقة' : 'Confidence Level'}
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <h5 className="font-medium text-gray-900 dark:text-white mb-2">
                  {isRTLMode ? 'العوامل المؤثرة:' : 'Influencing Factors:'}
                </h5>
                <ul className="space-y-1">
                  {forecast.forecasts[selectedPeriod].factors.map((factor, index) => (
                    <li key={index} className="text-gray-600 dark:text-gray-300 text-sm flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      {factor}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Recommendations */}
            {forecast.recommendations && (
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                  {isRTLMode ? 'التوصيات' : 'Recommendations'}
                </h4>
                <ul className="space-y-1">
                  {forecast.recommendations.map((rec, index) => (
                    <li key={index} className="text-blue-800 dark:text-blue-200 text-sm">
                      • {rec}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Scenarios Tab */}
        {activeTab === 'scenarios' && (
          <div className="space-y-4">
            {Object.entries(forecast.scenarios).map(([scenario, data]) => (
              <div key={scenario} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900 dark:text-white capitalize">
                    {isRTLMode ? 
                      (scenario === 'optimistic' ? 'سيناريو متفائل' : 
                       scenario === 'realistic' ? 'سيناريو واقعي' : 'سيناريو متشائم') :
                      scenario
                    }
                  </h4>
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full text-xs font-medium">
                    {data.probability}% {isRTLMode ? 'احتمالية' : 'probability'}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                  {data.description}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900 dark:text-white">
                      ₹{data.monthly.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-300">
                      {isRTLMode ? 'شهري' : 'Monthly'}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900 dark:text-white">
                      ₹{data.quarterly.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-300">
                      {isRTLMode ? 'ربعي' : 'Quarterly'}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900 dark:text-white">
                      ₹{data.yearly.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-300">
                      {isRTLMode ? 'سنوي' : 'Yearly'}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Trends Tab */}
        {activeTab === 'trends' && (
          <div className="space-y-4">
            {forecast.trends.map((trend, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {trend.period}
                  </h4>
                  <div className="flex items-center gap-2">
                    {getTrendIcon(trend.trend)}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTrendColor(trend.trend)}`}>
                      {formatPercentage(trend.value)}
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {trend.description}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Actions Tab */}
        {activeTab === 'actions' && (
          <div className="space-y-4">
            {forecast.actionItems.map((item, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {item.item}
                  </h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(item.priority)}`}>
                    {item.priority} {isRTLMode ? 'أولوية' : 'Priority'}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600 dark:text-gray-300">
                      {isRTLMode ? 'الجدول الزمني:' : 'Timeline:'}
                    </span>
                    <span className="ml-2 font-medium text-gray-900 dark:text-white">
                      {item.timeline}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-300">
                      {isRTLMode ? 'التأثير:' : 'Impact:'}
                    </span>
                    <span className="ml-2 font-medium text-gray-900 dark:text-white">
                      {item.impact}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentForecasting;