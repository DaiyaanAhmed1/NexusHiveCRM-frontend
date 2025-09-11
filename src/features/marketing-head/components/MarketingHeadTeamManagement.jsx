import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  FiInfo, 
  FiExternalLink, 
  FiUserCheck, 
  FiUsers, 
  FiSettings, 
  FiClipboard, 
  FiBarChart2, 
  FiBookOpen, 
  FiMessageCircle, 
  FiAlertCircle, 
  FiCalendar, 
  FiTarget,
  FiPlus,
  FiDownload,
  FiEdit,
  FiEye,
  FiTrendingUp,
  FiAward,
  FiShield,
  FiClock,
  FiCheckCircle,
  FiStar,
  FiFileText
} from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import { useLocalization } from "../../../hooks/useLocalization";
// Demo data for team members
const teamMembers = [
  {
    id: 1,
    name: "Abdullah Al-Rashid",
    role: "Campaign Manager",
    email: "abdullah.alrashid@mbsc.edu.sa",
    phone: "+1 234 567 890",
    performance: 92,
    status: "Active",
    avatar: "👨‍💼",
    skills: ["Digital Marketing", "Content Strategy", "Social Media"],
    projects: ["Q2 Campaign", "Brand Refresh"],
  },
  {
    id: 2,
    name: "Noura Al-Zahra",
    role: "Content Strategist",
    email: "noura.alzahra@mbsc.edu.sa",
    phone: "+1 234 567 891",
    performance: 88,
    status: "Active",
    avatar: "👩‍💼",
    skills: ["Content Creation", "SEO", "Copywriting"],
    projects: ["Blog Series", "Email Campaign"],
  },
  {
    id: 3,
    name: "Khalid Al-Sayed",
    role: "Digital Marketer",
    email: "khalid.alsayed@mbsc.edu.sa",
    phone: "+1 234 567 892",
    performance: 85,
    status: "On Leave",
    avatar: "👨‍💼",
    skills: ["Social Media", "Community Management", "Analytics"],
    projects: ["Social Campaign", "Influencer Outreach"],
  },
];

// Demo data for performance metrics
const performanceMetrics = [
  { metric: "Lead Generation", target: 1000, achieved: 850, icon: FiTrendingUp, color: "blue" },
  { metric: "Conversion Rate", target: 35, achieved: 32, icon: FiTarget, color: "green" },
  { metric: "Campaign ROI", target: 300, achieved: 285, icon: FiBarChart2, color: "purple" },
  { metric: "Social Engagement", target: 5000, achieved: 4800, icon: FiUsers, color: "yellow" },
];

export default function MarketingHeadTeamManagement() {
  const { t, ready, i18n } = useTranslation('marketing');
  const [languageVersion, setLanguageVersion] = useState(0);
  const { isRTLMode } = useLocalization();
  
  useEffect(() => {
    setLanguageVersion(prev => prev + 1);
  }, [i18n.language]);

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

  const user = JSON.parse(localStorage.getItem('rbac_current_user'));
  const [selectedMember, setSelectedMember] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const handleMemberClick = (member) => {
    setSelectedMember(member);
    setShowModal(true);
  };

  const StatusBadge = ({ status, children }) => {
    const statusStyles = {
      active: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
      onLeave: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
      pending: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
      completed: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
      inProgress: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
      resolved: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
      certified: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[status] || statusStyles.pending}`}>
        {children}
      </span>
    );
  };

  const MetricCard = ({ title, value, target, achieved, icon: Icon, color = "blue" }) => {
    const colorClasses = {
      blue: "text-blue-600 dark:text-blue-400",
      green: "text-green-600 dark:text-green-400",
      purple: "text-purple-600 dark:text-purple-400",
      yellow: "text-yellow-600 dark:text-yellow-400",
      red: "text-red-600 dark:text-red-400"
    };

    const percentage = Math.round((achieved / target) * 100);

    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-2 rounded-lg bg-${color}-50 dark:bg-${color}-900/20`}>
            <Icon className={`h-5 w-5 ${colorClasses[color]}`} />
          </div>
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{percentage}%</span>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{achieved}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Target: {target}</p>
        </div>
      </div>
    );
  };

  const Modal = ({ member, onClose }) => {
    if (!member) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
        <div className="absolute inset-0" onClick={onClose} />
        <div className="relative z-10 bg-white dark:bg-gray-800 rounded-xl p-6 max-w-2xl w-full mx-4">
          <button
            onClick={onClose}
            className="absolute top-2 right-4 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-3xl font-bold"
            aria-label="Close"
          >
            &times;
          </button>
          <div className="mb-6">
            <div className="flex items-center gap-4">
              <span className="text-4xl">{member.avatar}</span>
              <div>
                <h2 className="text-xl font-bold">{member.name}</h2>
                <p className="text-gray-600 dark:text-gray-300">{member.role}</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">{t('team.modal.contactInformation')}</h3>
              <p className="text-sm">{member.email}</p>
              <p className="text-sm">{member.phone}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">{t('team.modal.skills')}</h3>
              <div className="flex flex-wrap gap-2">
                {member.skills.map((skill, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">{t('team.modal.currentProjects')}</h3>
              <div className="space-y-2">
                {member.projects.map((project, index) => (
                  <div key={index} className="p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    {project}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div 
      key={`${i18n.language}-${languageVersion}`}
      className={`flex min-h-screen bg-[#F6F7FA] dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 ${isRTLMode ? 'rtl' : 'ltr'}`}
    >
      <main className="flex-1 p-4 md:p-6 flex flex-col gap-8 overflow-x-auto">
        {/* Header Section */}
        <header
          className={`flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 ${isRTLMode ? 'flex-row-reverse' : ''}`}
          data-tour="1"
          data-tour-title-en="Team Management Overview"
          data-tour-title-ar="نظرة عامة على إدارة الفريق"
          data-tour-content-en="Add members, export reports, and manage team operations."
          data-tour-content-ar="أضف الأعضاء، صدّر التقارير، وأدر عمليات الفريق."
          data-tour-position="bottom"
        >
          <div className={`flex-1 min-w-0 ${isRTLMode ? 'text-right' : 'text-left'}`}>
            <h1 className="text-2xl font-bold !text-gray-900 dark:!text-white flex items-center gap-2">
              {t('team.title')} <FiUsers className="text-blue-500" />
            </h1>
            <p className="text-gray-600 dark:text-gray-300">{t('team.subtitle')}</p>
          </div>
          
          {/* Quick Actions */}
          <div className={`flex-shrink-0 w-full lg:w-auto ${isRTLMode ? 'text-right' : 'text-left'}`}>
            <div className={`grid grid-cols-1 sm:grid-cols-2 gap-2 lg:flex lg:gap-3 ${isRTLMode ? 'lg:flex-row-reverse' : ''}`}>
              <button 
                className={`px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-colors whitespace-nowrap ${isRTLMode ? 'flex-row-reverse' : ''}`}
              >
                <FiPlus className="w-4 h-4 flex-shrink-0" /> 
                <span className="hidden sm:inline">{t('team.addTeamMember')}</span>
                <span className="sm:hidden">Add</span>
              </button>
              
              <button 
                className={`px-3 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 transition-colors whitespace-nowrap ${isRTLMode ? 'flex-row-reverse' : ''}`}
              >
                <FiDownload className="w-4 h-4 flex-shrink-0" /> 
                <span className="hidden sm:inline">{t('team.exportReport')}</span>
                <span className="sm:hidden">Export</span>
              </button>
            </div>
          </div>
        </header>

        {/* Performance Metrics Overview */}
        <div className="mb-8">
  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
    {t('team.sections.teamStructure.performanceOverview')}
  </h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {performanceMetrics.map((metric, index) => (
      <MetricCard
        key={index}
        title={metric.metric}
        value={metric.achieved}
        target={metric.target}
        achieved={metric.achieved}
        icon={metric.icon}
        color={metric.color}
      />
    ))}
  </div>
</div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Team Structure & Hierarchy */}
            <section
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
              data-tour="2"
              data-tour-title-en="Team Structure & Hierarchy"
              data-tour-title-ar="هيكل الفريق والتسلسل الهرمي"
              data-tour-content-en="View roles and reporting lines with AI workload suggestions."
              data-tour-content-ar="اعرض الأدوار وخطوط التقارير مع اقتراحات عبء العمل بالذكاء الاصطناعي."
              data-tour-position="bottom"
            >
              <div className={`flex items-center gap-3 mb-6 ${isRTLMode ? 'flex-row-reverse' : ''}`}>
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <FiUsers className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {t('team.sections.teamStructure.title')}
                </h2>
                <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded animate-pulse">
                  {t('team.sections.teamStructure.aiSuggestion')}
                </span>
              </div>
              
              <div className="space-y-4">
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-3">
                    {t('team.sections.teamStructure.byRole')}
                  </h3>
                  <div className="space-y-2">
                    {[
                      { role: "Campaign Managers", member: "Abdullah Al-Rashid", count: 1 },
                      { role: "Digital Marketers", member: "Khalid Al-Sayed", count: 1 },
                      { role: "Content Strategists", member: "Noura Al-Zahra", count: 1 },
                      { role: "Admission Counselors", member: "(none)", count: 0 }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between py-2">
                        <span className="text-sm text-gray-700 dark:text-gray-300">{item.role}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600 dark:text-gray-400">{item.member}</span>
                          <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded">
                            {item.count}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-3">
                    {t('team.sections.teamStructure.reportingHierarchy')}
                  </h3>
                  <div className="space-y-2">
                    <div className="text-sm text-gray-700 dark:text-gray-300">
                      Abdullah Al-Rashid (Supervisor) → Khalid Al-Sayed, Noura Al-Zahra
                    </div>
                    <div className="text-xs text-blue-600 animate-bounce">
                      {t('team.sections.teamStructure.aiWorkloadSuggestion')}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Role-based Access & Permissions */}
            <section
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
              data-tour="3"
              data-tour-title-en="Role-based Access & Permissions"
              data-tour-title-ar="الوصول المستند إلى الدور والأذونات"
              data-tour-content-en="Review roles, permissions, and edit access."
              data-tour-content-ar="راجع الأدوار والأذونات وعدّل الوصول."
              data-tour-position="bottom"
            >
              <div className={`flex items-center gap-3 mb-6 ${isRTLMode ? 'flex-row-reverse' : ''}`}>
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <FiSettings className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {t('team.sections.roleAccess.title')}
                </h2>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left border-b dark:border-gray-700">
                      <th className="pb-2 font-medium text-gray-900 dark:text-white">{t('team.sections.roleAccess.member')}</th>
                      <th className="pb-2 font-medium text-gray-900 dark:text-white">{t('team.sections.roleAccess.role')}</th>
                      <th className="pb-2 font-medium text-gray-900 dark:text-white">{t('team.sections.roleAccess.permissions')}</th>
                      <th className="pb-2 font-medium text-gray-900 dark:text-white">{t('team.sections.roleAccess.actions')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {[
                      { name: "Abdullah Al-Rashid", role: "Campaign Manager", permissions: "All" },
                      { name: "Noura Al-Zahra", role: "Content Strategist", permissions: "Content, Campaigns" },
                      { name: "Khalid Al-Sayed", role: "Digital Marketer", permissions: "Campaigns" }
                    ].map((member, index) => (
                      <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                        <td className="py-3 text-gray-700 dark:text-gray-300">{member.name}</td>
                        <td className="py-3 text-gray-700 dark:text-gray-300">{member.role}</td>
                        <td className="py-3 text-gray-700 dark:text-gray-300">{member.permissions}</td>
                        <td className="py-3">
                          <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-1">
                            <FiEdit className="w-3 h-3" />
                            {t('team.sections.roleAccess.edit')}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="mt-2 text-xs text-purple-600">
                  {t('team.sections.roleAccess.aiPermissionSuggestion')}
                </div>
              </div>
            </section>

            {/* Training & Development Tracker */}
            <section
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
              data-tour="6"
              data-tour-title-en="Training & Development Tracker"
              data-tour-title-ar="متابعة التدريب والتطوير"
              data-tour-content-en="Training attendance, certifications, and AI recommendations."
              data-tour-content-ar="حضور التدريب والشهادات وتوصيات الذكاء الاصطناعي."
              data-tour-position="bottom"
            >
              <div className={`flex items-center gap-3 mb-6 ${isRTLMode ? 'flex-row-reverse' : ''}`}>
                <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                  <FiBookOpen className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {t('team.sections.trainingDevelopment.title')}
                </h2>
                <span className="ml-2 text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded animate-pulse">
                  {t('team.sections.trainingDevelopment.aiRecommendations')}
                </span>
              </div>
              
              <div className="space-y-3">
                {[
                  { name: "Abdullah Al-Rashid", training: "Digital Marketing Bootcamp", status: "certified" },
                  { name: "Noura Al-Zahra", training: "Content Strategy Seminar", status: "inProgress" },
                  { name: "Khalid Al-Sayed", training: "Not attended recent training", status: "pending" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">{item.name}: {item.training}</span>
                    </div>
                    <StatusBadge status={item.status}>
                      {t(`team.sections.trainingDevelopment.${item.status}`)}
                    </StatusBadge>
                  </div>
                ))}
                <div className="text-xs text-yellow-600 animate-bounce">
                  {t('team.sections.trainingDevelopment.aiTrainingRecommendation')}
                </div>
              </div>
            </section>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Task Assignment & Tracking */}
            <section
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
              data-tour="4"
              data-tour-title-en="Task Assignment & Tracking"
              data-tour-title-ar="تعيين المهام وتتبعها"
              data-tour-content-en="Assign tasks, track progress, and view AI suggestions."
              data-tour-content-ar="قم بتعيين المهام وتتبع التقدم واعرض اقتراحات الذكاء الاصطناعي."
              data-tour-position="bottom"
            >
              <div className={`flex items-center gap-3 mb-6 ${isRTLMode ? 'flex-row-reverse' : ''}`}>
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <FiClipboard className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {t('team.sections.taskAssignment.title')}
                </h2>
                <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded animate-pulse">
                  {t('team.sections.taskAssignment.aiSmartAssignment')}
                </span>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left border-b dark:border-gray-700">
                      <th className="pb-2 font-medium text-gray-900 dark:text-white">{t('team.sections.taskAssignment.task')}</th>
                      <th className="pb-2 font-medium text-gray-900 dark:text-white">{t('team.sections.taskAssignment.assignedTo')}</th>
                      <th className="pb-2 font-medium text-gray-900 dark:text-white">{t('team.sections.taskAssignment.status')}</th>
                      <th className="pb-2 font-medium text-gray-900 dark:text-white">{t('team.sections.taskAssignment.progress')}</th>
                      <th className="pb-2 font-medium text-gray-900 dark:text-white">{t('team.sections.taskAssignment.deadline')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {[
                      { task: "Launch Q2 Campaign", assigned: "Abdullah Al-Rashid", status: "inProgress", progress: "70%", deadline: "2024-07-10" },
                      { task: "Write Blog Series", assigned: "Noura Al-Zahra", status: "pending", progress: "0%", deadline: "2024-07-12" },
                      { task: "Social Media Audit", assigned: "Khalid Al-Sayed", status: "completed", progress: "100%", deadline: "2024-06-30" }
                    ].map((task, index) => (
                      <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                        <td className="py-3 text-gray-700 dark:text-gray-300">{task.task}</td>
                        <td className="py-3 text-gray-700 dark:text-gray-300">{task.assigned}</td>
                        <td className="py-3">
                          <StatusBadge status={task.status}>
                            {t(`team.status.${task.status}`)}
                          </StatusBadge>
                        </td>
                        <td className="py-3 text-gray-700 dark:text-gray-300">{task.progress}</td>
                        <td className="py-3 text-gray-700 dark:text-gray-300">{task.deadline}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="mt-2 text-xs text-green-600 animate-bounce">
                  {t('team.sections.taskAssignment.aiAssignmentSuggestion')}
                </div>
              </div>
            </section>

            {/* Performance Dashboard */}
            <section
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
              data-tour="5"
              data-tour-title-en="Performance Dashboard"
              data-tour-title-ar="لوحة الأداء"
              data-tour-content-en="KPIs, leaderboard, and burnout predictions."
              data-tour-content-ar="مؤشرات الأداء، لوحة الصدارة، وتنبؤات الإرهاق."
              data-tour-position="bottom"
            >
              <div className={`flex items-center gap-3 mb-6 ${isRTLMode ? 'flex-row-reverse' : ''}`}>
                <div className="p-2 bg-pink-100 dark:bg-pink-900/30 rounded-lg">
                  <FiBarChart2 className="w-5 h-5 text-pink-600 dark:text-pink-400" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {t('team.sections.performanceDashboard.title')}
                </h2>
                <span className="ml-2 text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded animate-pulse">
                  {t('team.sections.performanceDashboard.aiLeaderboard')}
                </span>
              </div>
              
              <div className="space-y-4">
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-3">
                    {t('team.sections.performanceDashboard.kpis')}
                  </h3>
                  <div className="space-y-2">
                    {[
                      { metric: "Leads Handled", data: "Abdullah Al-Rashid (120), Noura Al-Zahra (90), Khalid Al-Sayed (80)" },
                      { metric: "Conversions", data: "Abdullah Al-Rashid (30), Noura Al-Zahra (25), Khalid Al-Sayed (20)" },
                      { metric: "Campaign ROI", data: "Abdullah Al-Rashid (3.2x), Noura Al-Zahra (2.8x), Khalid Al-Sayed (2.5x)" }
                    ].map((item, index) => (
                      <div key={index} className="text-sm text-gray-700 dark:text-gray-300">
                        <span className="font-medium">{item.metric}:</span> {item.data}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-3">
                    {t('team.sections.performanceDashboard.leaderboard')}
                  </h3>
                  <div className="space-y-2">
                    {[
                      { name: "Abdullah Al-Rashid", score: 92, rank: 1 },
                      { name: "Noura Al-Zahra", score: 88, rank: 2 },
                      { name: "Khalid Al-Sayed", score: 85, rank: 3 }
                    ].map((member, index) => (
                      <div key={index} className="flex items-center justify-between py-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">#{member.rank}</span>
                          <span className="text-sm text-gray-700 dark:text-gray-300">{member.name}</span>
                        </div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {t('team.sections.performanceDashboard.score')}: {member.score}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 text-xs text-pink-600 animate-bounce">
                    {t('team.sections.performanceDashboard.aiBurnoutPrediction')}
                  </div>
                </div>
              </div>
            </section>

            {/* Communication Center */}
            <section
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
              data-tour="7"
              data-tour-title-en="Communication Center"
              data-tour-title-ar="مركز الاتصال"
              data-tour-content-en="Announcements, reminders, and SOP briefs."
              data-tour-content-ar="الإعلانات والتذكيرات والموجزات."
              data-tour-position="bottom"
            >
              <div className={`flex items-center gap-3 mb-6 ${isRTLMode ? 'flex-row-reverse' : ''}`}>
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <FiMessageCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {t('team.sections.communicationCenter.title')}
                </h2>
                <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded animate-pulse">
                  {t('team.sections.communicationCenter.aiSummary')}
                </span>
              </div>
              
              <div className="space-y-3">
                {[
                  { type: "announcement", message: "Q2 Campaign Launch on July 10", icon: FiInfo },
                  { type: "reminder", message: "Submit weekly report by Friday", icon: FiClock },
                  { type: "brief", message: "SOP for Event Coordination uploaded", icon: FiFileText }
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <item.icon className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-xs font-medium text-blue-600 dark:text-blue-400 uppercase">
                        {t(`team.sections.communicationCenter.${item.type}`)}
                      </span>
                      <p className="text-sm text-gray-700 dark:text-gray-300">{item.message}</p>
                    </div>
                  </div>
                ))}
                <div className="text-xs text-blue-600 animate-bounce">
                  {t('team.sections.communicationCenter.aiTopUpdates')}
                </div>
              </div>
            </section>
          </div>
        </div>

        {showModal && <Modal member={selectedMember} onClose={() => setShowModal(false)} />}
      </main>
    </div>
  );
}