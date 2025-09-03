import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { directorFeatures } from '../../../components/directorFeatures';

export default function DirectorAuditCompliance() {
  const user = JSON.parse(localStorage.getItem('rbac_current_user'));
  const [logFilter, setLogFilter] = useState("");
  const { t, ready } = useTranslation('director');

  // Show loading state if i18n is not ready
  if (!ready) {
    return (
      <div className="flex min-h-screen bg-[#F6F7FA] dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800">
        <main className="flex-1 p-4 md:p-6 flex flex-col gap-8 overflow-x-auto">
          <div className="text-center">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Loading...</h1>
          </div>
        </main>
      </div>
    );
  }

  // Demo data using translation keys
  const auditLogs = [
    { 
      id: 1, 
      date: "2024-03-10", 
      actionKey: "auditActions.userLogin", 
      userKey: "auditUsers.deanScience", 
      statusKey: "auditStatuses.success", 
      detailsKey: "auditDetails.ipAddress" 
    },
    { 
      id: 2, 
      date: "2024-03-09", 
      actionKey: "auditActions.dataExport", 
      userKey: "auditUsers.hodEEE", 
      statusKey: "auditStatuses.success", 
      detailsKey: "auditDetails.exportedStudentList" 
    },
    { 
      id: 3, 
      date: "2024-03-08", 
      actionKey: "auditActions.policyUpdate", 
      userKey: "auditUsers.director", 
      statusKey: "auditStatuses.failed", 
      detailsKey: "auditDetails.insufficientPermissions" 
    },
  ];

  const complianceStatus = [
    { areaKey: "complianceAreas.ncaaa", statusKey: "complianceStatuses.compliant", lastAudit: "2023-12-01" },
    { areaKey: "complianceAreas.etec", statusKey: "complianceStatuses.pending", lastAudit: "2022-11-15" },
    { areaKey: "complianceAreas.moe", statusKey: "complianceStatuses.compliant", lastAudit: "2023-01-20" },
    { areaKey: "complianceAreas.scfhs", statusKey: "complianceStatuses.compliant", lastAudit: "2022-09-10" },
  ];

  const riskAnalytics = [
    { riskKey: "riskTypes.dataBreach", levelKey: "riskLevels.low", mitigationKey: "mitigationStrategies.twoFactorAuth" },
    { riskKey: "riskTypes.nonCompliance", levelKey: "riskLevels.medium", mitigationKey: "mitigationStrategies.quarterlyAudits" },
    { riskKey: "riskTypes.policyViolation", levelKey: "riskLevels.high", mitigationKey: "mitigationStrategies.trainingMonitoring" },
  ];

  return (
    <div className="flex min-h-screen bg-[#F6F7FA] dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800">
      <main className="flex-1 p-4 md:p-6 flex flex-col gap-8 overflow-x-auto">
        <div
          data-tour="1"
          data-tour-title-en="Audit & Compliance Overview"
          data-tour-title-ar="نظرة عامة على التدقيق والامتثال"
          data-tour-content-en="Track compliance status, review audit logs, and monitor risks."
          data-tour-content-ar="تتبع حالة الامتثال، وراجع سجلات التدقيق، وراقب المخاطر."
          data-tour-position="bottom"
        >
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            {t('auditCompliance.title')}
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            {t('auditCompliance.subtitle')}
          </p>
        </div>

        {/* Compliance Status */}
        <section
          data-tour="2"
          data-tour-title-en="Compliance Status"
          data-tour-title-ar="حالة الامتثال"
          data-tour-content-en="Snapshot of accreditation and regulatory compliance across areas."
          data-tour-content-ar="لمحة عن الاعتماد والامتثال التنظيمي عبر المجالات."
          data-tour-position="bottom"
        >
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
            {t('auditCompliance.complianceStatus')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {complianceStatus.map((c, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow flex flex-col gap-1">
                <div className="font-semibold text-xs mb-1">
                  {t(`auditCompliance.${c.areaKey}`)}
                </div>
                <div className={`text-xs font-bold ${
                  c.statusKey === "complianceStatuses.compliant" 
                    ? "text-green-600" 
                    : "text-yellow-600"
                }`}>
                  {t(`auditCompliance.${c.statusKey}`)}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-300">
                  {t('auditCompliance.lastAudit')}: {c.lastAudit}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Audit Logs */}
        <section
          data-tour="3"
          data-tour-title-en="Audit Logs"
          data-tour-title-ar="سجلات التدقيق"
          data-tour-content-en="Filter and inspect user actions, statuses, and details."
          data-tour-content-ar="قم بتصفية وفحص إجراءات المستخدم والحالات والتفاصيل."
          data-tour-position="bottom"
        >
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
            {t('auditCompliance.auditLogs')}
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow mb-4">
            <input 
              value={logFilter} 
              onChange={e => setLogFilter(e.target.value)} 
              className="px-3 py-1.5 mb-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white" 
              placeholder={t('auditCompliance.filterPlaceholder')} 
            />
            <table className="w-full text-xs">
              <thead>
                <tr className="text-left">
                  <th>{t('auditCompliance.auditLogHeaders.date')}</th>
                  <th>{t('auditCompliance.auditLogHeaders.action')}</th>
                  <th>{t('auditCompliance.auditLogHeaders.user')}</th>
                  <th>{t('auditCompliance.auditLogHeaders.status')}</th>
                  <th>{t('auditCompliance.auditLogHeaders.details')}</th>
                </tr>
              </thead>
              <tbody>
                {auditLogs.filter(l => 
                  t(`auditCompliance.${l.userKey}`).toLowerCase().includes(logFilter.toLowerCase()) || 
                  t(`auditCompliance.${l.actionKey}`).toLowerCase().includes(logFilter.toLowerCase())
                ).map((log, idx) => (
                  <tr key={idx} className="border-b border-gray-100 dark:border-gray-700">
                    <td>{log.date}</td>
                    <td>{t(`auditCompliance.${log.actionKey}`)}</td>
                    <td>{t(`auditCompliance.${log.userKey}`)}</td>
                    <td>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        log.statusKey === "auditStatuses.success" 
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" 
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                      }`}>
                        {t(`auditCompliance.${log.statusKey}`)}
                      </span>
                    </td>
                    <td>{t(`auditCompliance.${log.detailsKey}`)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Risk Analytics */}
        <section
          data-tour="4"
          data-tour-title-en="Risk Analytics"
          data-tour-title-ar="تحليلات المخاطر"
          data-tour-content-en="Review risk levels and recommended mitigation strategies."
          data-tour-content-ar="راجع مستويات المخاطر واستراتيجيات التخفيف الموصى بها."
          data-tour-position="bottom"
        >
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
            {t('auditCompliance.riskAnalytics')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {riskAnalytics.map((r, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow flex flex-col gap-1">
                <div className="font-semibold text-xs mb-1">
                  {t(`auditCompliance.${r.riskKey}`)}
                </div>
                <div className={`text-xs font-bold ${
                  r.levelKey === "riskLevels.high" ? "text-red-600" : 
                  r.levelKey === "riskLevels.medium" ? "text-yellow-600" : 
                  "text-green-600"
                }`}>
                  {t(`auditCompliance.${r.levelKey}`)}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-300">
                  {t('auditCompliance.mitigation')}: {t(`auditCompliance.${r.mitigationKey}`)}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
} 