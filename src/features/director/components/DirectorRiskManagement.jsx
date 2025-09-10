import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useLocalization } from "../../../hooks/useLocalization";
import DirectorRiskAssessment from './ai/DirectorRiskAssessment';
import { 
  FiShield, 
  FiAlertTriangle, 
  FiTrendingUp, 
  FiTrendingDown,
  FiPlus,
  FiDownload,
  FiEye,
  FiTarget,
  FiZap,
  FiDollarSign,
  FiBarChart2,
  FiUsers,
  FiAward,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiMinus
} from 'react-icons/fi';

export default function DirectorRiskManagement() {
  const user = JSON.parse(localStorage.getItem('rbac_current_user'));
  const [expanded, setExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedRisk, setSelectedRisk] = useState(null);
  const [showRiskModal, setShowRiskModal] = useState(false);
  const { t, ready } = useTranslation('director');
  const { isRTLMode } = useLocalization();

  // AI Features State
  const [showRiskAssessment, setShowRiskAssessment] = useState(false);
  const [riskAssessment, setRiskAssessment] = useState(null);

  // Refs for auto-scroll functionality
  const riskAssessmentRef = useRef(null);

  // Auto-scroll to AI sections
  const scrollToAISection = (sectionRef) => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  };

  // Handle AI button clicks with auto-scroll
  const handleShowRiskAssessment = () => {
    setShowRiskAssessment(!showRiskAssessment);
    if (!showRiskAssessment) {
      setTimeout(() => scrollToAISection(riskAssessmentRef), 100);
    }
  };

  // Show loading state if i18n is not ready
  if (!ready) {
    return (
      <div className="flex min-h-screen bg-[#F6F7FA] dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 items-center justify-center">
        <div className="text-lg text-gray-600 dark:text-gray-300">Loading...</div>
      </div>
    );
  }

  // Demo data for risks using translation keys
  const risks = [
    {
      id: 1,
      nameKey: 'riskTypes.dataSecurityBreach',
      categoryKey: 'categories.it',
      severityKey: 'severity.high',
      probabilityKey: 'probability.medium',
      statusKey: 'status.active',
      impactKey: 'impact.critical',
      mitigationKey: 'mitigation.enhancedSecurity',
      trend: 'up',
      priority: 'high'
    },
    {
      id: 2,
      nameKey: 'riskTypes.studentEnrollmentDecline',
      categoryKey: 'categories.academic',
      severityKey: 'severity.high',
      probabilityKey: 'probability.low',
      statusKey: 'status.monitored',
      impactKey: 'impact.financial',
      mitigationKey: 'mitigation.marketingCampaign',
      trend: 'down',
      priority: 'medium'
    },
    {
      id: 3,
      nameKey: 'riskTypes.regulatoryCompliance',
      categoryKey: 'categories.legal',
      severityKey: 'severity.medium',
      probabilityKey: 'probability.high',
      statusKey: 'status.active',
      impactKey: 'impact.operational',
      mitigationKey: 'mitigation.regularAudits',
      trend: 'stable',
      priority: 'high'
    }
  ];

  // Demo data for risk metrics using translation keys
  const riskMetrics = [
    {
      id: 1,
      titleKey: 'metrics.activeRisks',
      value: '12',
      change: '+2',
      trend: 'up',
      icon: FiAlertTriangle,
      color: 'red'
    },
    {
      id: 2,
      titleKey: 'metrics.highSeverity',
      value: '3',
      change: '-1',
      trend: 'down',
      icon: FiShield,
      color: 'green'
    },
    {
      id: 3,
      titleKey: 'metrics.mitigationRate',
      value: '75%',
      change: '+5%',
      trend: 'up',
      icon: FiCheckCircle,
      color: 'blue'
    },
    {
      id: 4,
      titleKey: 'metrics.riskScore',
      value: '65',
      change: '-5',
      trend: 'down',
      icon: FiBarChart2,
      color: 'purple'
    }
  ];

  // Helper functions
  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return <FiTrendingUp className="w-4 h-4 text-red-500" />;
      case 'down': return <FiTrendingDown className="w-4 h-4 text-green-500" />;
      default: return <FiMinus className="w-4 h-4 text-gray-500" />;
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'severity.high': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'severity.medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'severity.low': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getProbabilityColor = (probability) => {
    switch (probability) {
      case 'probability.high': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'probability.medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'probability.low': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'status.active': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'status.monitored': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'status.resolved': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getMetricColor = (color) => {
    switch (color) {
      case 'red': return 'text-red-600 dark:text-red-400';
      case 'green': return 'text-green-600 dark:text-green-400';
      case 'blue': return 'text-blue-600 dark:text-blue-400';
      case 'purple': return 'text-purple-600 dark:text-purple-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <div className={`flex min-h-screen bg-[#F6F7FA] dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 ${isRTLMode ? 'rtl' : 'ltr'}`}>
      <main className="flex-1 p-4 md:p-6 flex flex-col gap-8 overflow-x-auto">
        {/* Header Section */}
        <div className={`flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 ${isRTLMode ? 'flex-row-reverse' : ''}`}>
          <div className={`flex-1 min-w-0 ${isRTLMode ? 'text-right' : 'text-left'}`}>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {t('riskManagement.title')}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              {t('riskManagement.subtitle')}
            </p>
          </div>
          
          <div className={`flex flex-col sm:flex-row gap-4 ${isRTLMode ? 'flex-row-reverse' : ''}`}>
            {/* AI Features Button */}
            <div className={`flex-shrink-0 ${isRTLMode ? 'text-right' : 'text-left'}`}>
              <button 
                className={`px-6 py-3 text-sm bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-xl hover:from-orange-700 hover:to-orange-800 flex items-center gap-3 transition-all duration-200 shadow-lg hover:shadow-xl whitespace-nowrap ${isRTLMode ? 'flex-row-reverse' : ''}`}
                onClick={handleShowRiskAssessment}
              >
                <FiShield className="w-5 h-5 flex-shrink-0" /> 
                <span className="hidden sm:inline font-medium">
                  {isRTLMode ? 'تقييم المخاطر بالذكاء الاصطناعي' : 'AI Risk Assessment'}
                </span>
                <span className="sm:hidden font-medium">
                  {isRTLMode ? 'تقييم المخاطر' : 'Risk Assessment'}
                </span>
              </button>
            </div>

            {/* Action Buttons */}
            <div className={`flex flex-wrap gap-3 ${isRTLMode ? 'flex-row-reverse' : ''}`}>
              <button className="px-4 py-2.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg">
                <FiPlus className="w-4 h-4" />
                {t('riskManagement.addRisk')}
              </button>
              <button className="px-4 py-2.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center gap-2 transition-all duration-200">
                <FiDownload className="w-4 h-4" />
                {t('riskManagement.exportReport')}
              </button>
            </div>
          </div>
        </div>

        {/* AI Risk Assessment Section */}
        {showRiskAssessment && (
          <section 
            ref={riskAssessmentRef}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700"
            dir={isRTLMode ? 'rtl' : 'ltr'}
          >
            <div className={`flex items-center gap-3 mb-6 ${isRTLMode ? 'flex-row-reverse' : ''}`}>
              <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                <FiShield className="text-orange-600 dark:text-orange-400 w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {isRTLMode ? 'تقييم المخاطر بالذكاء الاصطناعي' : 'AI-Powered Risk Assessment'}
              </h2>
            </div>
            <div className="mb-6">
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                {isRTLMode 
                  ? 'تحليل متقدم للمخاطر باستخدام الذكاء الاصطناعي لتحديد التهديدات المحتملة واقتراح استراتيجيات التخفيف' 
                  : 'Advanced AI-powered risk analysis to identify potential threats and suggest mitigation strategies'
                }
              </p>
            </div>
            <DirectorRiskAssessment 
              onAssessmentComplete={(assessment) => {
                setRiskAssessment(assessment);
                console.log('Risk assessment completed:', assessment);
              }}
            />
          </section>
        )}

        {/* Risk Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {riskMetrics.map((metric) => (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: metric.id * 0.1 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
            >
              <div className={`flex items-center justify-between mb-4 ${isRTLMode ? 'flex-row-reverse' : ''}`}>
                <div className={`p-2 rounded-lg ${isRTLMode ? 'ml-3' : 'mr-3'}`} style={{ backgroundColor: `${metric.color === 'red' ? '#fef2f2' : metric.color === 'green' ? '#f0fdf4' : metric.color === 'blue' ? '#eff6ff' : '#faf5ff'}` }}>
                  <metric.icon className={`w-5 h-5 ${getMetricColor(metric.color)}`} />
                </div>
                {getTrendIcon(metric.trend)}
              </div>
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                {t(`riskManagement.${metric.titleKey}`)}
              </h3>
              <div className="flex items-baseline justify-between">
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{metric.value}</p>
                <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                  metric.trend === 'up' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' : 
                  metric.trend === 'down' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
                  'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                }`}>
                  {metric.change}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Risks List */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700">
          <div className="p-6">
            <div className={`flex items-center gap-3 mb-6 ${isRTLMode ? 'flex-row-reverse' : ''}`}>
              <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                <FiAlertTriangle className="text-red-600 dark:text-red-400 w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {t('riskManagement.activeRisks')}
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b border-gray-200 dark:border-gray-700">
                    <th className="pb-4 font-semibold text-gray-900 dark:text-white">{t('riskManagement.tableHeaders.risk')}</th>
                    <th className="pb-4 font-semibold text-gray-900 dark:text-white">{t('riskManagement.tableHeaders.category')}</th>
                    <th className="pb-4 font-semibold text-gray-900 dark:text-white">{t('riskManagement.tableHeaders.severity')}</th>
                    <th className="pb-4 font-semibold text-gray-900 dark:text-white">{t('riskManagement.tableHeaders.probability')}</th>
                    <th className="pb-4 font-semibold text-gray-900 dark:text-white">{t('riskManagement.tableHeaders.status')}</th>
                    <th className="pb-4 font-semibold text-gray-900 dark:text-white">{t('riskManagement.tableHeaders.impact')}</th>
                    <th className="pb-4 font-semibold text-gray-900 dark:text-white">{t('riskManagement.tableHeaders.mitigation')}</th>
                    <th className="pb-4 font-semibold text-gray-900 dark:text-white">{t('riskManagement.tableHeaders.actions')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {risks.map((risk) => (
                    <tr key={risk.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <div className={`p-1 rounded-full ${getPriorityColor(risk.priority)}`}>
                            <div className="w-2 h-2 rounded-full bg-current"></div>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">
                              {t(`riskManagement.${risk.nameKey}`)}
                            </p>
                            <div className="flex items-center gap-1 mt-1">
                              {getTrendIcon(risk.trend)}
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {risk.trend === 'up' ? 'Increasing' : risk.trend === 'down' ? 'Decreasing' : 'Stable'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 text-gray-600 dark:text-gray-400">
                        {t(`riskManagement.${risk.categoryKey}`)}
                      </td>
                      <td className="py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getSeverityColor(risk.severityKey)}`}>
                          {t(`riskManagement.${risk.severityKey}`)}
                        </span>
                      </td>
                      <td className="py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getProbabilityColor(risk.probabilityKey)}`}>
                          {t(`riskManagement.${risk.probabilityKey}`)}
                        </span>
                      </td>
                      <td className="py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(risk.statusKey)}`}>
                          {t(`riskManagement.${risk.statusKey}`)}
                        </span>
                      </td>
                      <td className="py-4 text-gray-600 dark:text-gray-400">
                        {t(`riskManagement.${risk.impactKey}`)}
                      </td>
                      <td className="py-4 text-gray-600 dark:text-gray-400">
                        {t(`riskManagement.${risk.mitigationKey}`)}
                      </td>
                      <td className="py-4">
                        <button className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-1 transition-colors">
                          <FiEye className="w-4 h-4" />
                          {t('riskManagement.viewDetails')}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}