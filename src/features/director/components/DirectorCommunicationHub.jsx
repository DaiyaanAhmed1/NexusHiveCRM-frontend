import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function DirectorCommunicationHub() {
  const [selectedGroup, setSelectedGroup] = useState("all");
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedTimeframe, setSelectedTimeframe] = useState('week');
  const { t, ready, i18n } = useTranslation('director');

  // Force re-render when language changes
  const [languageVersion, setLanguageVersion] = useState(0);
  
  useEffect(() => {
    const handleLanguageChange = () => {
      console.log('Language changed to:', i18n.language);
      setLanguageVersion(prev => prev + 1);
    };
    
    i18n.on('languageChanged', handleLanguageChange);
    
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n]);

  // Show loading state if i18n is not ready
  if (!ready) {
    return (
      <div className="flex min-h-screen bg-[#F6F7FA] dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800">
        <main className="flex-1 p-4 md:p-6 flex flex-col gap-8 overflow-x-auto">
          <div className="text-center">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">{t('communicationHub.loading')}</h1>
          </div>
        </main>
      </div>
    );
  }

  // Demo data using translation keys
  const groups = ["all", "deans", "hods", "faculty", "students", "parents", "adminUnits"];
  const stakeholders = ["deansHods", "faculty", "students", "parents", "adminUnits"];
  const [stakeTab, setStakeTab] = useState(stakeholders[0]);

  const archiveDemo = [
    { 
      date: "2024-03-10", 
      roleKey: "groups.deans", 
      topicKey: "archiveData.annualReport.topic", 
      subjectKey: "archiveData.annualReport.subject", 
      attachmentKey: "attachments.reportGuidelines" 
    },
    { 
      date: "2024-03-08", 
      roleKey: "groups.students", 
      topicKey: "archiveData.feeUpdate.topic", 
      subjectKey: "archiveData.feeUpdate.subject", 
      attachmentKey: "attachments.feeCircular" 
    },
    { 
      date: "2024-03-05", 
      roleKey: "groups.faculty", 
      topicKey: "archiveData.policy.topic", 
      subjectKey: "archiveData.policy.subject", 
      attachmentKey: "attachments.attendancePolicy" 
    },
  ];

  const inboxDemo = [
    { 
      fromKey: "incomingData.researchCenter.from", 
      subjectKey: "incomingData.researchCenter.subject", 
      statusKey: "statuses.awaiting" 
    },
    { 
      fromKey: "incomingData.labEquipment.from", 
      subjectKey: "incomingData.labEquipment.subject", 
      statusKey: "statuses.responded" 
    },
    { 
      fromKey: "incomingData.newElective.from", 
      subjectKey: "incomingData.newElective.subject", 
      statusKey: "statuses.awaiting" 
    },
  ];

  const analytics = [
    { labelKey: "analytics.messagesSent", value: 128 },
    { labelKey: "analytics.opened", value: 112 },
    { labelKey: "analytics.responded", value: 87 },
  ];

  const engagement = [
    { roleKey: "groups.deans", value: 90 },
    { roleKey: "groups.hods", value: 80 },
    { roleKey: "groups.faculty", value: 70 },
    { roleKey: "groups.students", value: 60 },
  ];

  const integrations = [
    { 
      nameKey: "integrations.academicCalendar.name", 
      descKey: "integrations.academicCalendar.description" 
    },
    { 
      nameKey: "integrations.approvalCenter.name", 
      descKey: "integrations.approvalCenter.description" 
    },
    { 
      nameKey: "integrations.lmsErp.name", 
      descKey: "integrations.lmsErp.description" 
    },
    { 
      nameKey: "integrations.smsGateway.name", 
      descKey: "integrations.smsGateway.description" 
    },
  ];

  const aiReplies = ["thankYou", "willComply", "noted"];

  return (
    <div key={`${i18n.language}-${languageVersion}`} className="w-full">
      <main className="w-full flex flex-col gap-8">
        {/* Header */}
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            {t('communicationHub.title')}
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            {t('communicationHub.subtitle')}
          </p>
        </div>

        {/* 1. Broadcast Messages */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
            {t('communicationHub.broadcastMessages')}
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow mb-4 flex flex-col gap-4">
            <div className="flex flex-col md:flex-row gap-4">
              <input 
                className="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white" 
                placeholder={t('communicationHub.placeholders.announcementSubject')} 
              />
              <select 
                value={selectedGroup} 
                onChange={e => setSelectedGroup(e.target.value)} 
                className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                {groups.map(g => (
                  <option key={g} value={g}>
                    {t(`communicationHub.groups.${g}`)}
                  </option>
                ))}
              </select>
              <input 
                type="datetime-local" 
                className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white" 
              />
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                {t('communicationHub.send')}
              </button>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {t('communicationHub.notifications.description')}
            </div>
          </div>
        </section>

        {/* 2. Internal Stakeholder Communication */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
            {t('communicationHub.internalStakeholderCommunication')}
          </h2>
          <div className="flex gap-2 mb-2">
            {stakeholders.map(st => (
              <button 
                key={st} 
                onClick={() => setStakeTab(st)} 
                className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                  stakeTab === st 
                    ? "bg-blue-600 text-white" 
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
                }`}
              >
                {t(`communicationHub.stakeholders.${st}`)}
              </button>
            ))}
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow flex flex-col gap-2">
            <div className="text-xs font-semibold mb-1">
              {t(`communicationHub.stakeholders.${stakeTab}`)} {t('communicationHub.thread')}
            </div>
            <div className="flex flex-col gap-1">
              <div className="bg-blue-50 dark:bg-blue-900 text-blue-900 dark:text-blue-200 rounded-lg p-2 text-xs">
                {t('communicationHub.messages.directorAnnualReports')}
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg p-2 text-xs">
                {t('communicationHub.messages.deanResponse')}
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg p-2 text-xs">
                {t('communicationHub.messages.hodTemplate')}
              </div>
            </div>
          </div>
        </section>

        {/* 3. Message Archives */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
            {t('communicationHub.messageArchives')}
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow mb-4">
            <div className="flex flex-wrap gap-2 mb-2">
              <input 
                className="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white" 
                placeholder={t('communicationHub.placeholders.searchByTopic')} 
              />
              <select className="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                <option>{t('userManagement.allRoles')}</option>
                <option>{t('communicationHub.groups.deans')}</option>
                <option>{t('communicationHub.groups.hods')}</option>
                <option>{t('communicationHub.groups.faculty')}</option>
                <option>{t('communicationHub.groups.students')}</option>
              </select>
            </div>
            <table className="w-full text-xs">
              <thead>
                <tr className="text-left">
                  <th>{t('communicationHub.archiveHeaders.date')}</th>
                  <th>{t('communicationHub.archiveHeaders.role')}</th>
                  <th>{t('communicationHub.archiveHeaders.topic')}</th>
                  <th>{t('communicationHub.archiveHeaders.subject')}</th>
                  <th>{t('communicationHub.archiveHeaders.attachment')}</th>
                </tr>
              </thead>
              <tbody>
                {archiveDemo.map((msg, idx) => (
                  <tr key={idx} className="border-b border-gray-100 dark:border-gray-700">
                    <td>{msg.date}</td>
                    <td>{t(`communicationHub.${msg.roleKey}`)}</td>
                    <td>{t(`communicationHub.${msg.topicKey}`)}</td>
                    <td>{t(`communicationHub.${msg.subjectKey}`)}</td>
                    <td>
                      {msg.attachmentKey && (
                        <a href="#" className="text-blue-600 underline">
                          {t(`communicationHub.${msg.attachmentKey}`)}
                        </a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 4. Incoming Communication */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
            {t('communicationHub.incomingCommunication')}
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow mb-4">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-left">
                  <th>{t('communicationHub.incomingHeaders.from')}</th>
                  <th>{t('communicationHub.incomingHeaders.subject')}</th>
                  <th>{t('communicationHub.incomingHeaders.status')}</th>
                </tr>
              </thead>
              <tbody>
                {inboxDemo.map((msg, idx) => (
                  <tr key={idx} className="border-b border-gray-100 dark:border-gray-700">
                    <td>{t(`communicationHub.${msg.fromKey}`)}</td>
                    <td>{t(`communicationHub.${msg.subjectKey}`)}</td>
                    <td>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        msg.statusKey === "statuses.awaiting" 
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300" 
                          : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                      }`}>
                        {t(`communicationHub.${msg.statusKey}`)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 5. Reports & Insights */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
            {t('communicationHub.reportsInsights')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {analytics.map(a => (
              <div key={a.labelKey} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow flex flex-col items-center">
                <div className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-1">{a.value}</div>
                <div className="text-xs text-gray-600 dark:text-gray-300">
                  {t(`communicationHub.${a.labelKey}`)}
                </div>
              </div>
            ))}
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow mb-4 flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <h3 className="font-semibold mb-2 text-xs">
                {t('communicationHub.sentimentSummary')}
              </h3>
              <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded-full">
                <div className="h-4 rounded-full bg-green-500" style={{ width: `70%` }}></div>
              </div>
              <div className="text-xs mt-1">
                {t('communicationHub.sentimentBreakdown')}
              </div>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-2 text-xs">
                {t('communicationHub.engagementHeatmap')}
              </h3>
              <div className="flex gap-2">
                {engagement.map(e => (
                  <div key={e.roleKey} className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-700 dark:text-blue-200 font-bold">
                      {e.value}%
                    </div>
                    <div className="text-xs mt-1">
                      {t(`communicationHub.${e.roleKey}`)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 6. Secure Messaging */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
            {t('communicationHub.secureMessaging')}
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow flex items-center gap-4">
            <span className="inline-flex items-center px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-full text-xs">
              <span className="mr-1">🔒</span>
              {t('communicationHub.secureMessage.confidential')}
            </span>
            <span className="text-xs">
              {t('communicationHub.secureMessage.visibleTo')}
            </span>
            <span className="text-xs text-green-600">
              {t('communicationHub.secureMessage.readReceipt')}
            </span>
          </div>
        </section>

        {/* 7. AI-Powered Assistant */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
            {t('communicationHub.aiPoweredAssistant')}
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow flex flex-col gap-2">
            <div>
              <span className="font-semibold text-xs">
                {t('communicationHub.aiAssistant.draftAssistant')}:
              </span>
              <div className="bg-blue-50 dark:bg-blue-900 text-blue-900 dark:text-blue-200 rounded-lg p-2 text-xs mt-1">
                {t('communicationHub.aiAssistant.draftSample')}
              </div>
            </div>
            <div>
              <span className="font-semibold text-xs">
                {t('communicationHub.aiAssistant.toneAnalyzer')}:
              </span>
              <div className="bg-yellow-50 dark:bg-yellow-900 text-yellow-900 dark:text-yellow-200 rounded-lg p-2 text-xs mt-1">
                {t('communicationHub.aiAssistant.toneSample')}
              </div>
            </div>
            <div>
              <span className="font-semibold text-xs">
                {t('communicationHub.aiAssistant.autoReplySuggestions')}:
              </span>
              <div className="flex gap-2 mt-1">
                {aiReplies.map((r, i) => (
                  <span key={i} className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full px-3 py-1 text-xs">
                    {t(`communicationHub.aiAssistant.replies.${r}`)}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 8. Integration */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
            {t('communicationHub.integration')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {integrations.map(card => (
              <div key={card.nameKey} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow flex flex-col gap-1">
                <div className="font-semibold text-xs mb-1">
                  {t(`communicationHub.${card.nameKey}`)}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-300">
                  {t(`communicationHub.${card.descKey}`)}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
} 