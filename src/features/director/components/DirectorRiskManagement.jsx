import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function DirectorRiskManagement() {
  const user = JSON.parse(localStorage.getItem('rbac_current_user'));
  const [expanded, setExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedRisk, setSelectedRisk] = useState(null);
  const [showRiskModal, setShowRiskModal] = useState(false);
  const { t, ready } = useTranslation('director');

  // Show loading state if i18n is not ready
  if (!ready) {
    return (
      <div className="flex flex-col gap-8">
        <div className="text-center">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Loading...</h1>
        </div>
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
      mitigationKey: 'mitigation.enhancedSecurity'
    },
    {
      id: 2,
      nameKey: 'riskTypes.studentEnrollmentDecline',
      categoryKey: 'categories.academic',
      severityKey: 'severity.high',
      probabilityKey: 'probability.low',
      statusKey: 'status.monitored',
      impactKey: 'impact.financial',
      mitigationKey: 'mitigation.marketingCampaign'
    },
    {
      id: 3,
      nameKey: 'riskTypes.regulatoryCompliance',
      categoryKey: 'categories.legal',
      severityKey: 'severity.medium',
      probabilityKey: 'probability.high',
      statusKey: 'status.active',
      impactKey: 'impact.operational',
      mitigationKey: 'mitigation.regularAudits'
    }
  ];

  // Demo data for risk metrics using translation keys
  const riskMetrics = [
    {
      id: 1,
      titleKey: 'metrics.activeRisks',
      value: '12',
      change: '+2',
      trend: 'up'
    },
    {
      id: 2,
      titleKey: 'metrics.highSeverity',
      value: '3',
      change: '-1',
      trend: 'down'
    },
    {
      id: 3,
      titleKey: 'metrics.mitigationRate',
      value: '75%',
      change: '+5%',
      trend: 'up'
    },
    {
      id: 4,
      titleKey: 'metrics.riskScore',
      value: '65',
      change: '-5',
      trend: 'down'
    }
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('riskManagement.title')}
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {t('riskManagement.subtitle')}
          </p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            {t('riskManagement.addRisk')}
          </button>
          <button className="px-4 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">
            {t('riskManagement.exportReport')}
          </button>
        </div>
      </div>

      {/* Risk Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {riskMetrics.map((metric) => (
          <motion.div
            key={metric.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: metric.id * 0.1 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm"
          >
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {t(`riskManagement.${metric.titleKey}`)}
            </h3>
            <div className="mt-2 flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{metric.value}</p>
              <span className={`ml-2 text-sm font-medium ${
                metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {metric.change}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Risks List */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">
            {t('riskManagement.activeRisks')}
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b dark:border-gray-700">
                  <th className="pb-3 font-medium">{t('riskManagement.tableHeaders.risk')}</th>
                  <th className="pb-3 font-medium">{t('riskManagement.tableHeaders.category')}</th>
                  <th className="pb-3 font-medium">{t('riskManagement.tableHeaders.severity')}</th>
                  <th className="pb-3 font-medium">{t('riskManagement.tableHeaders.probability')}</th>
                  <th className="pb-3 font-medium">{t('riskManagement.tableHeaders.status')}</th>
                  <th className="pb-3 font-medium">{t('riskManagement.tableHeaders.impact')}</th>
                  <th className="pb-3 font-medium">{t('riskManagement.tableHeaders.mitigation')}</th>
                  <th className="pb-3 font-medium">{t('riskManagement.tableHeaders.actions')}</th>
                </tr>
              </thead>
              <tbody>
                {risks.map((risk) => (
                  <tr key={risk.id} className="border-b dark:border-gray-700">
                    <td className="py-4">
                      <div>
                        <p className="font-medium">
                          {t(`riskManagement.${risk.nameKey}`)}
                        </p>
                      </div>
                    </td>
                    <td className="py-4">
                      {t(`riskManagement.${risk.categoryKey}`)}
                    </td>
                    <td className="py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        risk.severityKey === 'severity.high' ? 'bg-red-100 text-red-700' :
                        risk.severityKey === 'severity.medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {t(`riskManagement.${risk.severityKey}`)}
                      </span>
                    </td>
                    <td className="py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        risk.probabilityKey === 'probability.high' ? 'bg-red-100 text-red-700' :
                        risk.probabilityKey === 'probability.medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {t(`riskManagement.${risk.probabilityKey}`)}
                      </span>
                    </td>
                    <td className="py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        risk.statusKey === 'status.active' ? 'bg-red-100 text-red-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {t(`riskManagement.${risk.statusKey}`)}
                      </span>
                    </td>
                    <td className="py-4">
                      {t(`riskManagement.${risk.impactKey}`)}
                    </td>
                    <td className="py-4">
                      {t(`riskManagement.${risk.mitigationKey}`)}
                    </td>
                    <td className="py-4">
                      <button className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
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
    </div>
  );
} 