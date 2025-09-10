import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useLocalization } from "../../../hooks/useLocalization";
import { 
  FiSend, 
  FiUsers, 
  FiArchive, 
  FiInbox, 
  FiBarChart2, 
  FiShield, 
  FiZap, 
  FiLink,
  FiSearch,
  FiFilter,
  FiClock,
  FiCheckCircle,
  FiAlertCircle,
  FiMessageSquare,
  FiMail,
  FiDownload,
  FiEye,
  FiEdit3,
  FiPlus,
  FiChevronDown,
  FiChevronRight
} from "react-icons/fi";

export default function DirectorCommunicationHub() {
  const [selectedGroup, setSelectedGroup] = useState("all");
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedTimeframe, setSelectedTimeframe] = useState('week');
  const { t, ready, i18n } = useTranslation('director');
  const { isRTLMode } = useLocalization();

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
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
        <main className="flex-1 p-6 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">{t('communicationHub.loading')}</h1>
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
      attachmentKey: "attachments.reportGuidelines",
      priority: "high"
    },
    { 
      date: "2024-03-08", 
      roleKey: "groups.students", 
      topicKey: "archiveData.feeUpdate.topic", 
      subjectKey: "archiveData.feeUpdate.subject", 
      attachmentKey: "attachments.feeCircular",
      priority: "medium"
    },
    { 
      date: "2024-03-05", 
      roleKey: "groups.faculty", 
      topicKey: "archiveData.policy.topic", 
      subjectKey: "archiveData.policy.subject", 
      attachmentKey: "attachments.attendancePolicy",
      priority: "low"
    },
  ];

  const inboxDemo = [
    { 
      fromKey: "incomingData.researchCenter.from", 
      subjectKey: "incomingData.researchCenter.subject", 
      statusKey: "statuses.awaiting",
      priority: "high",
      time: "2h ago"
    },
    { 
      fromKey: "incomingData.labEquipment.from", 
      subjectKey: "incomingData.labEquipment.subject", 
      statusKey: "statuses.responded",
      priority: "medium",
      time: "1d ago"
    },
    { 
      fromKey: "incomingData.newElective.from", 
      subjectKey: "incomingData.newElective.subject", 
      statusKey: "statuses.awaiting",
      priority: "low",
      time: "3d ago"
    },
  ];

  const analytics = [
    { labelKey: "analytics.messagesSent", value: 128, icon: FiSend, color: "blue" },
    { labelKey: "analytics.opened", value: 112, icon: FiEye, color: "green" },
    { labelKey: "analytics.responded", value: 87, icon: FiCheckCircle, color: "purple" },
  ];

  const engagement = [
    { roleKey: "groups.deans", value: 90, color: "bg-blue-500" },
    { roleKey: "groups.hods", value: 80, color: "bg-green-500" },
    { roleKey: "groups.faculty", value: 70, color: "bg-yellow-500" },
    { roleKey: "groups.students", value: 60, color: "bg-red-500" },
  ];

  const integrations = [
    { 
      nameKey: "integrations.academicCalendar.name", 
      descKey: "integrations.academicCalendar.description",
      icon: FiClock,
      status: "connected"
    },
    { 
      nameKey: "integrations.approvalCenter.name", 
      descKey: "integrations.approvalCenter.description",
      icon: FiCheckCircle,
      status: "connected"
    },
    { 
      nameKey: "integrations.lmsErp.name", 
      descKey: "integrations.lmsErp.description",
      icon: FiLink,
      status: "pending"
    },
    { 
      nameKey: "integrations.smsGateway.name", 
      descKey: "integrations.smsGateway.description",
      icon: FiMessageSquare,
      status: "connected"
    },
  ];

  const aiReplies = ["thankYou", "willComply", "noted"];

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400';
      case 'medium': return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'low': return 'text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400';
      default: return 'text-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'awaiting': return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'responded': return 'text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400';
      default: return 'text-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  return (
    <div key={`${i18n.language}-${languageVersion}`} className="w-full">
      <main className="w-full space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
          data-tour="1"
          data-tour-title-en="Communication Hub Overview"
          data-tour-title-ar="نظرة عامة على مركز التواصل"
          data-tour-content-en="Send broadcasts, manage threads, browse archives, and track insights in one place."
          data-tour-content-ar="أرسل الإعلانات، وأدر المحادثات، وتصفح الأرشيف، وتابع التقارير في مكان واحد."
          data-tour-position="bottom"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <FiMessageSquare className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                {t('communicationHub.title')}
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                {t('communicationHub.subtitle')}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-sm text-gray-500 dark:text-gray-400">Active Conversations</div>
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">24</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {analytics.map((stat, index) => (
            <div key={stat.labelKey} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    {t(`communicationHub.${stat.labelKey}`)}
                  </div>
                </div>
                <div className={`p-3 rounded-xl bg-${stat.color}-50 dark:bg-${stat.color}-900/20`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Broadcast Messages */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
          data-tour="2"
          data-tour-title-en="Broadcast Messages"
          data-tour-title-ar="الرسائل العامة"
          data-tour-content-en="Compose announcements, pick audience groups, schedule, and send."
          data-tour-content-ar="صِغ الإعلانات، واختر مجموعات الجمهور، وجدول الإرسال ثم أرسل."
          data-tour-position="bottom"
        >
          <div className="flex items-center gap-3 mb-6">
            <FiSend className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {t('communicationHub.broadcastMessages')}
            </h2>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <input 
                className="px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                placeholder={t('communicationHub.placeholders.announcementSubject')} 
              />
              <select 
                value={selectedGroup} 
                onChange={e => setSelectedGroup(e.target.value)} 
                className="px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                {groups.map(g => (
                  <option key={g} value={g}>
                    {t(`communicationHub.groups.${g}`)}
                  </option>
                ))}
              </select>
              <input 
                type="datetime-local" 
                className="px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
              />
              <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2">
                <FiSend className="w-4 h-4" />
                {t('communicationHub.send')}
              </button>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
              <FiAlertCircle className="w-4 h-4" />
              {t('communicationHub.notifications.description')}
            </div>
          </div>
        </motion.section>

        {/* Stakeholder Communication */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
          data-tour="3"
          data-tour-title-en="Stakeholder Threads"
          data-tour-title-ar="محادثات أصحاب المصلحة"
          data-tour-content-en="Switch between groups to view and manage internal communication threads."
          data-tour-content-ar="بدّل بين المجموعات لعرض وإدارة محادثات التواصل الداخلي."
          data-tour-position="bottom"
        >
          <div className="flex items-center gap-3 mb-6">
            <FiUsers className="w-6 h-6 text-green-600 dark:text-green-400" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {t('communicationHub.internalStakeholderCommunication')}
            </h2>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {stakeholders.map(st => (
              <button 
                key={st} 
                onClick={() => setStakeTab(st)} 
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  stakeTab === st 
                    ? "bg-blue-600 text-white shadow-md" 
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                {t(`communicationHub.stakeholders.${st}`)}
              </button>
            ))}
          </div>
          
          <div className="space-y-3">
            <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              {t(`communicationHub.stakeholders.${stakeTab}`)} {t('communicationHub.thread')}
            </div>
            <div className="space-y-2">
              <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-900 dark:text-blue-200 rounded-xl p-4 text-sm border-l-4 border-blue-500">
                {t('communicationHub.messages.directorAnnualReports')}
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl p-4 text-sm">
                {t('communicationHub.messages.deanResponse')}
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl p-4 text-sm">
                {t('communicationHub.messages.hodTemplate')}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Message Archives */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
          data-tour="4"
          data-tour-title-en="Message Archives"
          data-tour-title-ar="أرشيف الرسائل"
          data-tour-content-en="Search past communications by topic and role, and access attachments."
          data-tour-content-ar="ابحث في الاتصالات السابقة حسب الموضوع والدور، واطلع على المرفقات."
          data-tour-position="bottom"
        >
          <div className="flex items-center gap-3 mb-6">
            <FiArchive className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {t('communicationHub.messageArchives')}
            </h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex flex-wrap gap-3">
              <div className="relative flex-1 min-w-64">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input 
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                  placeholder={t('communicationHub.placeholders.searchByTopic')} 
                />
              </div>
              <select className="px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                <option>{t('userManagement.allRoles')}</option>
                <option>{t('communicationHub.groups.deans')}</option>
                <option>{t('communicationHub.groups.hods')}</option>
                <option>{t('communicationHub.groups.faculty')}</option>
                <option>{t('communicationHub.groups.students')}</option>
              </select>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-600">
                    <th className="text-left py-3 px-2 font-semibold text-gray-700 dark:text-gray-300">{t('communicationHub.archiveHeaders.date')}</th>
                    <th className="text-left py-3 px-2 font-semibold text-gray-700 dark:text-gray-300">{t('communicationHub.archiveHeaders.role')}</th>
                    <th className="text-left py-3 px-2 font-semibold text-gray-700 dark:text-gray-300">{t('communicationHub.archiveHeaders.topic')}</th>
                    <th className="text-left py-3 px-2 font-semibold text-gray-700 dark:text-gray-300">{t('communicationHub.archiveHeaders.subject')}</th>
                    <th className="text-left py-3 px-2 font-semibold text-gray-700 dark:text-gray-300">{t('communicationHub.archiveHeaders.attachment')}</th>
                    <th className="text-left py-3 px-2 font-semibold text-gray-700 dark:text-gray-300">Priority</th>
                  </tr>
                </thead>
                <tbody>
                  {archiveDemo.map((msg, idx) => (
                    <tr key={idx} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400">{msg.date}</td>
                      <td className="py-3 px-2 text-gray-900 dark:text-white">{t(`communicationHub.${msg.roleKey}`)}</td>
                      <td className="py-3 px-2 text-gray-900 dark:text-white">{t(`communicationHub.${msg.topicKey}`)}</td>
                      <td className="py-3 px-2 text-gray-900 dark:text-white">{t(`communicationHub.${msg.subjectKey}`)}</td>
                      <td className="py-3 px-2">
                        {msg.attachmentKey && (
                          <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
                            <FiDownload className="w-3 h-3" />
                            {t(`communicationHub.${msg.attachmentKey}`)}
                          </a>
                        )}
                      </td>
                      <td className="py-3 px-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(msg.priority)}`}>
                          {msg.priority}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.section>

        {/* Incoming Communication */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
          data-tour="5"
          data-tour-title-en="Incoming Communication"
          data-tour-title-ar="الاتصالات الواردة"
          data-tour-content-en="Monitor inbound messages and statuses to prioritize responses."
          data-tour-content-ar="راقب الرسائل الواردة وحالاتها لتحديد أولويات الردود."
          data-tour-position="bottom"
        >
          <div className="flex items-center gap-3 mb-6">
            <FiInbox className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {t('communicationHub.incomingCommunication')}
            </h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-600">
                  <th className="text-left py-3 px-2 font-semibold text-gray-700 dark:text-gray-300">{t('communicationHub.incomingHeaders.from')}</th>
                  <th className="text-left py-3 px-2 font-semibold text-gray-700 dark:text-gray-300">{t('communicationHub.incomingHeaders.subject')}</th>
                  <th className="text-left py-3 px-2 font-semibold text-gray-700 dark:text-gray-300">{t('communicationHub.incomingHeaders.status')}</th>
                  <th className="text-left py-3 px-2 font-semibold text-gray-700 dark:text-gray-300">Priority</th>
                  <th className="text-left py-3 px-2 font-semibold text-gray-700 dark:text-gray-300">Time</th>
                </tr>
              </thead>
              <tbody>
                {inboxDemo.map((msg, idx) => (
                  <tr key={idx} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <td className="py-3 px-2 text-gray-900 dark:text-white">{t(`communicationHub.${msg.fromKey}`)}</td>
                    <td className="py-3 px-2 text-gray-900 dark:text-white">{t(`communicationHub.${msg.subjectKey}`)}</td>
                    <td className="py-3 px-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(msg.statusKey)}`}>
                        {t(`communicationHub.${msg.statusKey}`)}
                      </span>
                    </td>
                    <td className="py-3 px-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(msg.priority)}`}>
                        {msg.priority}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-gray-500 dark:text-gray-400">{msg.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.section>

        {/* Reports & Insights */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
          data-tour="6"
          data-tour-title-en="Reports & Insights"
          data-tour-title-ar="التقارير والرؤى"
          data-tour-content-en="High-level analytics: messages sent, opens, responses, sentiment, and engagement."
          data-tour-content-ar="تحليلات عامة: الرسائل المرسلة، الفتح، الردود، المشاعر، والتفاعل."
          data-tour-position="bottom"
        >
          <div className="flex items-center gap-3 mb-6">
            <FiBarChart2 className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {t('communicationHub.reportsInsights')}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {t('communicationHub.sentimentSummary')}
              </h3>
              <div className="space-y-3">
                <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full" style={{ width: `70%` }}></div>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  {t('communicationHub.sentimentBreakdown')}
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {t('communicationHub.engagementHeatmap')}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {engagement.map(e => (
                  <div key={e.roleKey} className="text-center">
                    <div className={`w-12 h-12 rounded-full ${e.color} flex items-center justify-center text-white font-bold text-lg mb-2 mx-auto`}>
                      {e.value}%
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      {t(`communicationHub.${e.roleKey}`)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* AI-Powered Assistant */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-700"
          data-tour="8"
          data-tour-title-en="AI-Powered Assistant"
          data-tour-title-ar="المساعد المدعوم بالذكاء الاصطناعي"
          data-tour-content-en="Draft emails, analyze tone, and insert quick reply suggestions."
          data-tour-content-ar="صغ رسائل البريد، حلّل النبرة، وأدرج اقتراحات رد سريعة."
          data-tour-position="bottom"
        >
          <div className="flex items-center gap-3 mb-6">
            <FiZap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {t('communicationHub.aiPoweredAssistant')}
            </h2>
          </div>
          
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-blue-200 dark:border-blue-700">
              <div className="flex items-center gap-2 mb-2">
                <FiEdit3 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="font-semibold text-sm text-gray-900 dark:text-white">
                  {t('communicationHub.aiAssistant.draftAssistant')}:
                </span>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-900 dark:text-blue-200 rounded-lg p-3 text-sm">
                {t('communicationHub.aiAssistant.draftSample')}
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-yellow-200 dark:border-yellow-700">
              <div className="flex items-center gap-2 mb-2">
                <FiBarChart2 className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                <span className="font-semibold text-sm text-gray-900 dark:text-white">
                  {t('communicationHub.aiAssistant.toneAnalyzer')}:
                </span>
              </div>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 text-yellow-900 dark:text-yellow-200 rounded-lg p-3 text-sm">
                {t('communicationHub.aiAssistant.toneSample')}
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
              <div className="flex items-center gap-2 mb-3">
                <FiMessageSquare className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                <span className="font-semibold text-sm text-gray-900 dark:text-white">
                  {t('communicationHub.aiAssistant.autoReplySuggestions')}:
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {aiReplies.map((r, i) => (
                  <span key={i} className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full px-3 py-1 text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors cursor-pointer">
                    {t(`communicationHub.aiAssistant.replies.${r}`)}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Integrations */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
          data-tour="9"
          data-tour-title-en="Integrations"
          data-tour-title-ar="التكاملات"
          data-tour-content-en="Key systems connected with the Communication Hub (calendar, approvals, LMS/ERP, SMS)."
          data-tour-content-ar="الأنظمة المتكاملة مع مركز التواصل (التقويم، الموافقات، LMS/ERP، الرسائل القصيرة)."
          data-tour-position="bottom"
        >
          <div className="flex items-center gap-3 mb-6">
            <FiLink className="w-6 h-6 text-green-600 dark:text-green-400" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {t('communicationHub.integration')}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {integrations.map(card => (
              <div key={card.nameKey} className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 border border-gray-200 dark:border-gray-600 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-2">
                  <card.icon className={`w-5 h-5 ${card.status === 'connected' ? 'text-green-600 dark:text-green-400' : 'text-yellow-600 dark:text-yellow-400'}`} />
                  <span className={`w-2 h-2 rounded-full ${card.status === 'connected' ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                </div>
                <div className="font-semibold text-sm text-gray-900 dark:text-white mb-1">
                  {t(`communicationHub.${card.nameKey}`)}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-300">
                  {t(`communicationHub.${card.descKey}`)}
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      </main>
    </div>
  );
}