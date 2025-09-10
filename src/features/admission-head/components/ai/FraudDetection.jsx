import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalization } from '../../../../hooks/useLocalization';
import { FiShield, FiAlertTriangle, FiCheckCircle, FiXCircle, FiEye, FiEyeOff, FiRefreshCw, FiDownload, FiFilter } from 'react-icons/fi';

const FraudDetection = ({ paymentData, onAnalysisComplete }) => {
  const { t } = useTranslation();
  const { isRTLMode } = useLocalization();
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  const [showDetails, setShowDetails] = useState({});

  // Dummy fraud detection data
  const dummyFraudAnalysis = {
    summary: isRTLMode 
      ? "تم تحليل كشف الاحتيال بنجاح. تم فحص جميع المعاملات المالية وتحديد الأنماط المشبوهة."
      : "Fraud detection analysis completed successfully. All financial transactions have been scanned and suspicious patterns identified.",
    totalTransactions: 1247,
    suspiciousTransactions: 23,
    highRiskTransactions: 5,
    mediumRiskTransactions: 12,
    lowRiskTransactions: 6,
    fraudScore: 87,
    riskLevel: "Medium",
    lastScan: new Date().toISOString(),
    suspiciousPatterns: [
      {
        id: 1,
        type: isRTLMode ? "معاملات متعددة من نفس IP" : "Multiple transactions from same IP",
        count: 8,
        risk: "High",
        description: isRTLMode 
          ? "تم اكتشاف 8 معاملات من نفس عنوان IP خلال ساعة واحدة"
          : "8 transactions detected from same IP address within one hour",
        transactions: ["TXN123", "TXN124", "TXN125", "TXN126", "TXN127", "TXN128", "TXN129", "TXN130"]
      },
      {
        id: 2,
        type: isRTLMode ? "مبالغ غير عادية" : "Unusual amounts",
        count: 5,
        risk: "Medium",
        description: isRTLMode 
          ? "مبالغ دفع أعلى من المتوسط المعتاد"
          : "Payment amounts significantly higher than usual average",
        transactions: ["TXN131", "TXN132", "TXN133", "TXN134", "TXN135"]
      },
      {
        id: 3,
        type: isRTLMode ? "توقيت مشبوه" : "Suspicious timing",
        count: 10,
        risk: "Low",
        description: isRTLMode 
          ? "معاملات في أوقات غير عادية (منتصف الليل)"
          : "Transactions at unusual times (midnight hours)",
        transactions: ["TXN136", "TXN137", "TXN138", "TXN139", "TXN140", "TXN141", "TXN142", "TXN143", "TXN144", "TXN145"]
      }
    ],
    riskFactors: [
      {
        factor: isRTLMode ? "سرعة المعاملات" : "Transaction velocity",
        score: 75,
        status: "Warning",
        description: isRTLMode ? "عدد كبير من المعاملات في وقت قصير" : "High number of transactions in short time"
      },
      {
        factor: isRTLMode ? "أنماط الدفع" : "Payment patterns",
        score: 60,
        status: "Caution",
        description: isRTLMode ? "تغيير مفاجئ في أنماط الدفع" : "Sudden change in payment patterns"
      },
      {
        factor: isRTLMode ? "الموقع الجغرافي" : "Geographic location",
        score: 45,
        status: "Normal",
        description: isRTLMode ? "مواقع دفع متنوعة" : "Diverse payment locations"
      },
      {
        factor: isRTLMode ? "معلومات المتقدم" : "Applicant information",
        score: 80,
        status: "Warning",
        description: isRTLMode ? "عدم تطابق في معلومات المتقدم" : "Mismatch in applicant information"
      }
    ],
    recommendations: [
      isRTLMode ? "مراجعة المعاملات عالية المخاطر يدوياً" : "Manually review high-risk transactions",
      isRTLMode ? "تنفيذ تحقق إضافي للمعاملات المشبوهة" : "Implement additional verification for suspicious transactions",
      isRTLMode ? "مراقبة أنماط الدفع غير العادية" : "Monitor unusual payment patterns",
      isRTLMode ? "تحديث قواعد كشف الاحتيال" : "Update fraud detection rules"
    ],
    actionItems: [
      {
        item: isRTLMode ? "مراجعة معاملات TXN123-TXN130" : "Review transactions TXN123-TXN130",
        priority: "High",
        timeline: isRTLMode ? "فوري" : "Immediate",
        assigned: isRTLMode ? "فريق الأمان" : "Security Team"
      },
      {
        item: isRTLMode ? "التحقق من معلومات المتقدمين" : "Verify applicant information",
        priority: "Medium",
        timeline: isRTLMode ? "خلال 24 ساعة" : "Within 24 hours",
        assigned: isRTLMode ? "فريق القبول" : "Admissions Team"
      },
      {
        item: isRTLMode ? "تحديث قواعد الكشف" : "Update detection rules",
        priority: "Low",
        timeline: isRTLMode ? "خلال أسبوع" : "Within a week",
        assigned: isRTLMode ? "فريق التكنولوجيا" : "Technology Team"
      }
    ]
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
      console.log('Starting fraud detection analysis with data:', paymentData);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Fraud detection analysis result:', dummyFraudAnalysis);
      setAnalysis(dummyFraudAnalysis);
      
      if (onAnalysisComplete) {
        onAnalysisComplete(dummyFraudAnalysis);
      }
    } catch (err) {
      console.error('Fraud detection analysis error:', err);
      setError(isRTLMode ? 'فشل في تحليل كشف الاحتيال. يرجى المحاولة مرة أخرى.' : 'Failed to analyze fraud detection. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [paymentData, onAnalysisComplete, hasAnalyzed, isRTLMode]);

  // Only run analysis once when component mounts or data changes
  useEffect(() => {
    if (paymentData && !hasAnalyzed) {
      handleAnalyze();
    }
  }, [paymentData, handleAnalyze, hasAnalyzed]);

  const handleNewAnalysis = useCallback(() => {
    setHasAnalyzed(false);
    setAnalysis(null);
    setError(null);
  }, []);

  const getRiskColor = useCallback((risk) => {
    switch (risk) {
      case 'High': return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/20';
      case 'Medium': return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/20';
      case 'Low': return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20';
      default: return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/20';
    }
  }, []);

  const getStatusColor = useCallback((status) => {
    switch (status) {
      case 'Warning': return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/20';
      case 'Caution': return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/20';
      case 'Normal': return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20';
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

  const toggleDetails = (id) => {
    setShowDetails(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6" dir={isRTLMode ? 'rtl' : 'ltr'}>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
          <span className="ml-3 text-gray-600 dark:text-gray-300">
            {isRTLMode ? 'جاري تحليل كشف الاحتيال...' : 'Analyzing fraud detection...'}
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
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
          >
            {isRTLMode ? 'إعادة المحاولة' : 'Retry Analysis'}
          </button>
        </div>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6" dir={isRTLMode ? 'rtl' : 'ltr'}>
        <div className="text-center py-8">
          <div className="text-gray-400 text-lg mb-2">��️</div>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {isRTLMode ? 'لا توجد بيانات متاحة لتحليل كشف الاحتيال.' : 'No data available for fraud detection analysis.'}
          </p>
          <button
            onClick={handleNewAnalysis}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
          >
            {isRTLMode ? 'بدء التحليل' : 'Start Analysis'}
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
            {isRTLMode ? 'كشف الاحتيال في المدفوعات' : 'Payment Fraud Detection'}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            {isRTLMode ? 'تحليل ذكي لاكتشاف المعاملات المشبوهة والاحتيال' : 'Intelligent analysis to detect suspicious transactions and fraud'}
          </p>
        </div>
        <button
          onClick={handleNewAnalysis}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
        >
          {isRTLMode ? 'تحديث التحليل' : 'Refresh Analysis'}
        </button>
      </div>

      {/* Summary */}
      {analysis.summary && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
          <h4 className="font-medium text-red-900 dark:text-red-100 mb-2">
            {isRTLMode ? 'ملخص التحليل' : 'Analysis Summary'}
          </h4>
          <p className="text-red-800 dark:text-red-200 text-sm">
            {analysis.summary}
          </p>
        </div>
      )}

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {analysis.totalTransactions}
          </div>
          <div className="text-sm text-blue-800 dark:text-blue-200">
            {isRTLMode ? 'إجمالي المعاملات' : 'Total Transactions'}
          </div>
        </div>
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="text-2xl font-bold text-red-600 dark:text-red-400">
            {analysis.suspiciousTransactions}
          </div>
          <div className="text-sm text-red-800 dark:text-red-200">
            {isRTLMode ? 'معاملات مشبوهة' : 'Suspicious Transactions'}
          </div>
        </div>
        <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
          <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
            {analysis.fraudScore}/100
          </div>
          <div className="text-sm text-orange-800 dark:text-orange-200">
            {isRTLMode ? 'نقاط الاحتيال' : 'Fraud Score'}
          </div>
        </div>
        <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {analysis.riskLevel}
          </div>
          <div className="text-sm text-purple-800 dark:text-purple-200">
            {isRTLMode ? 'مستوى المخاطر' : 'Risk Level'}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
          {[
            { id: 'overview', name: isRTLMode ? 'نظرة عامة' : 'Overview' },
            { id: 'patterns', name: isRTLMode ? 'الأنماط المشبوهة' : 'Suspicious Patterns' },
            { id: 'riskfactors', name: isRTLMode ? 'عوامل المخاطر' : 'Risk Factors' },
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
            {/* Risk Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-red-900 dark:text-red-100">
                    {isRTLMode ? 'مخاطر عالية' : 'High Risk'}
                  </h4>
                  <FiAlertTriangle className="text-red-500" />
                </div>
                <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                  {analysis.highRiskTransactions}
                </div>
                <div className="text-sm text-red-800 dark:text-red-200">
                  {isRTLMode ? 'معاملة' : 'transactions'}
                </div>
              </div>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-yellow-900 dark:text-yellow-100">
                    {isRTLMode ? 'مخاطر متوسطة' : 'Medium Risk'}
                  </h4>
                  <FiAlertTriangle className="text-yellow-500" />
                </div>
                <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                  {analysis.mediumRiskTransactions}
                </div>
                <div className="text-sm text-yellow-800 dark:text-yellow-200">
                  {isRTLMode ? 'معاملة' : 'transactions'}
                </div>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-green-900 dark:text-green-100">
                    {isRTLMode ? 'مخاطر منخفضة' : 'Low Risk'}
                  </h4>
                  <FiCheckCircle className="text-green-500" />
                </div>
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {analysis.lowRiskTransactions}
                </div>
                <div className="text-sm text-green-800 dark:text-green-200">
                  {isRTLMode ? 'معاملة' : 'transactions'}
                </div>
              </div>
            </div>

            {/* Recommendations */}
            {analysis.recommendations && (
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">
                  {isRTLMode ? 'التوصيات' : 'Recommendations'}
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
        )}

        {/* Suspicious Patterns Tab */}
        {activeTab === 'patterns' && analysis.suspiciousPatterns && (
          <div className="space-y-4">
            {analysis.suspiciousPatterns.map((pattern) => (
              <div key={pattern.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {pattern.type}
                  </h4>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(pattern.risk)}`}>
                      {pattern.risk} {isRTLMode ? 'مخاطر' : 'Risk'}
                    </span>
                    <button
                      onClick={() => toggleDetails(pattern.id)}
                      className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                      {showDetails[pattern.id] ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                  {pattern.description}
                </p>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {isRTLMode ? 'عدد المعاملات:' : 'Transaction count:'} {pattern.count}
                </div>
                {showDetails[pattern.id] && (
                  <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                    <h5 className="font-medium text-gray-900 dark:text-white mb-2">
                      {isRTLMode ? 'معرفات المعاملات:' : 'Transaction IDs:'}
                    </h5>
                    <div className="flex flex-wrap gap-1">
                      {pattern.transactions.map((txn, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded text-xs">
                          {txn}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Risk Factors Tab */}
        {activeTab === 'riskfactors' && analysis.riskFactors && (
          <div className="space-y-4">
            {analysis.riskFactors.map((factor, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {factor.factor}
                  </h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(factor.status)}`}>
                    {factor.status}
                  </span>
                </div>
                <div className="flex items-center gap-4 mb-2">
                  <div className="flex-1">
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          factor.score >= 70 ? 'bg-red-500' : 
                          factor.score >= 40 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${factor.score}%` }}
                      ></div>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    {factor.score}/100
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {factor.description}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Actions Tab */}
        {activeTab === 'actions' && analysis.actionItems && (
          <div className="space-y-4">
            {analysis.actionItems.map((item, index) => (
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
                      {isRTLMode ? 'المسؤول:' : 'Assigned:'}
                    </span>
                    <span className="ml-2 font-medium text-gray-900 dark:text-white">
                      {item.assigned}
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

export default FraudDetection;