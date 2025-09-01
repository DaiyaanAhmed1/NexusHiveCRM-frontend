import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiInfo, FiExternalLink, FiUserCheck, FiUsers, FiSettings, FiClipboard, FiBarChart2, FiBookOpen, FiMessageCircle, FiAlertCircle, FiCalendar, FiTarget } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

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
  { metric: "Lead Generation", target: 1000, achieved: 850 },
  { metric: "Conversion Rate", target: 35, achieved: 32 },
  { metric: "Campaign ROI", target: 300, achieved: 285 },
  { metric: "Social Engagement", target: 5000, achieved: 4800 },
];

export default function MarketingHeadTeamManagement() {
  const { t, ready, i18n } = useTranslation('marketing');
  const [languageVersion, setLanguageVersion] = useState(0);
  
  useEffect(() => {
    setLanguageVersion(prev => prev + 1);
  }, [i18n.language]);

  if (!ready) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
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
    <div key={`${i18n.language}-${languageVersion}`} className="flex flex-col gap-10 animate-fade-in">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-2 border-b border-gray-200 dark:border-gray-700">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">{t('team.title')} <FiUsers className="text-blue-500" /></h1>
          <p className="text-sm text-gray-600 dark:text-gray-300">{t('team.subtitle')}</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">{t('team.addTeamMember')}</button>
          <button className="px-4 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">{t('team.exportReport')}</button>
        </div>
      </div>

      {/* 1. Team Structure & Hierarchy */}
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <div className="flex items-center gap-2 mb-2"><FiUsers className="text-blue-500" /><h2 className="text-lg font-semibold">{t('team.sections.teamStructure.title')}</h2><span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded animate-pulse">{t('team.sections.teamStructure.aiSuggestion')}</span></div>
        {/* Demo: Grouped by role, hierarchy tree, assign supervisors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium mb-1">{t('team.sections.teamStructure.byRole')}</h3>
            <ul className="space-y-1 text-sm">
              <li>Campaign Managers: Abdullah Al-Rashid</li>
              <li>Digital Marketers: Khalid Al-Sayed</li>
              <li>Content Strategists: Noura Al-Zahra</li>
              <li>Admission Counselors: (none)</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-1">{t('team.sections.teamStructure.reportingHierarchy')}</h3>
            <ul className="space-y-1 text-sm">
              <li>Abdullah Al-Rashid (Supervisor) → Khalid Al-Sayed, Noura Al-Zahra</li>
            </ul>
            <div className="mt-2 text-xs text-blue-600 animate-bounce">{t('team.sections.teamStructure.aiWorkloadSuggestion')}</div>
          </div>
        </div>
      </section>

      {/* 2. Role-based Access & Permissions */}
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <div className="flex items-center gap-2 mb-2"><FiSettings className="text-purple-500" /><h2 className="text-lg font-semibold">{t('team.sections.roleAccess.title')}</h2></div>
        {/* Demo: Table of roles and permissions */}
        <table className="w-full text-sm mt-2">
          <thead>
            <tr className="text-left border-b dark:border-gray-700">
              <th>{t('team.sections.roleAccess.member')}</th><th>{t('team.sections.roleAccess.role')}</th><th>{t('team.sections.roleAccess.permissions')}</th><th>{t('team.sections.roleAccess.actions')}</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Abdullah Al-Rashid</td><td>Campaign Manager</td><td>All</td><td><button className="text-blue-600">{t('team.sections.roleAccess.edit')}</button></td></tr>
            <tr><td>Noura Al-Zahra</td><td>Content Strategist</td><td>Content, Campaigns</td><td><button className="text-blue-600">{t('team.sections.roleAccess.edit')}</button></td></tr>
            <tr><td>Khalid Al-Sayed</td><td>Digital Marketer</td><td>Campaigns</td><td><button className="text-blue-600">{t('team.sections.roleAccess.edit')}</button></td></tr>
          </tbody>
        </table>
        <div className="mt-2 text-xs text-purple-600">{t('team.sections.roleAccess.aiPermissionSuggestion')}</div>
      </section>

      {/* 3. Task Assignment & Tracking */}
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <div className="flex items-center gap-2 mb-2"><FiClipboard className="text-green-500" /><h2 className="text-lg font-semibold">{t('team.sections.taskAssignment.title')}</h2><span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded animate-pulse">{t('team.sections.taskAssignment.aiSmartAssignment')}</span></div>
        {/* Demo: Task list, status, progress, AI suggestions */}
        <table className="w-full text-sm mt-2">
          <thead><tr><th>{t('team.sections.taskAssignment.task')}</th><th>{t('team.sections.taskAssignment.assignedTo')}</th><th>{t('team.sections.taskAssignment.status')}</th><th>{t('team.sections.taskAssignment.progress')}</th><th>{t('team.sections.taskAssignment.deadline')}</th><th>{t('team.sections.roleAccess.actions')}</th></tr></thead>
          <tbody>
            <tr><td>Launch Q2 Campaign</td><td>Abdullah Al-Rashid</td><td>{t('team.status.inProgress')}</td><td>70%</td><td>2024-07-10</td><td><button className="text-blue-600">{t('team.sections.roleAccess.edit')}</button></td></tr>
            <tr><td>Write Blog Series</td><td>Noura Al-Zahra</td><td>{t('team.status.pending')}</td><td>0%</td><td>2024-07-12</td><td><button className="text-blue-600">{t('team.sections.roleAccess.edit')}</button></td></tr>
            <tr><td>Social Media Audit</td><td>Khalid Al-Sayed</td><td>{t('team.status.completed')}</td><td>100%</td><td>2024-06-30</td><td><button className="text-blue-600">{t('team.sections.roleAccess.edit')}</button></td></tr>
          </tbody>
        </table>
        <div className="mt-2 text-xs text-green-600 animate-bounce">{t('team.sections.taskAssignment.aiAssignmentSuggestion')}</div>
      </section>

      {/* 4. Performance Dashboard */}
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <div className="flex items-center gap-2 mb-2"><FiBarChart2 className="text-pink-500" /><h2 className="text-lg font-semibold">{t('team.sections.performanceDashboard.title')}</h2><span className="ml-2 text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded animate-pulse">{t('team.sections.performanceDashboard.aiLeaderboard')}</span></div>
        {/* Demo: KPIs, comparison, leaderboard, appraisal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium mb-1">{t('team.sections.performanceDashboard.kpis')}</h3>
            <ul className="space-y-1 text-sm">
              <li>Leads Handled: Abdullah Al-Rashid (120), Noura Al-Zahra (90), Khalid Al-Sayed (80)</li>
              <li>Conversions: Abdullah Al-Rashid (30), Noura Al-Zahra (25), Khalid Al-Sayed (20)</li>
              <li>Campaign ROI: Abdullah Al-Rashid (3.2x), Noura Al-Zahra (2.8x), Khalid Al-Sayed (2.5x)</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-1">{t('team.sections.performanceDashboard.leaderboard')}</h3>
            <ol className="list-decimal ml-4 text-sm">
              <li>Abdullah Al-Rashid ({t('team.sections.performanceDashboard.score')}: 92)</li>
              <li>Noura Al-Zahra ({t('team.sections.performanceDashboard.score')}: 88)</li>
              <li>Khalid Al-Sayed ({t('team.sections.performanceDashboard.score')}: 85)</li>
            </ol>
            <div className="mt-2 text-xs text-pink-600 animate-bounce">{t('team.sections.performanceDashboard.aiBurnoutPrediction')}</div>
          </div>
        </div>
      </section>

      {/* 5. Training & Development Tracker */}
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <div className="flex items-center gap-2 mb-2"><FiBookOpen className="text-yellow-500" /><h2 className="text-lg font-semibold">{t('team.sections.trainingDevelopment.title')}</h2><span className="ml-2 text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded animate-pulse">{t('team.sections.trainingDevelopment.aiRecommendations')}</span></div>
        {/* Demo: Training attendance, badges, feedback */}
        <ul className="space-y-1 text-sm">
          <li>Abdullah Al-Rashid: Attended "Digital Marketing Bootcamp" <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded">{t('team.sections.trainingDevelopment.certified')}</span></li>
          <li>Noura Al-Zahra: Attended "Content Strategy Seminar" <span className="ml-2 text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">{t('team.sections.trainingDevelopment.inProgress')}</span></li>
          <li>Khalid Al-Sayed: Not attended recent training</li>
        </ul>
        <div className="mt-2 text-xs text-yellow-600 animate-bounce">{t('team.sections.trainingDevelopment.aiTrainingRecommendation')}</div>
      </section>

      {/* 6. Communication Center */}
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <div className="flex items-center gap-2 mb-2"><FiMessageCircle className="text-blue-400" /><h2 className="text-lg font-semibold">{t('team.sections.communicationCenter.title')}</h2><span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded animate-pulse">{t('team.sections.communicationCenter.aiSummary')}</span></div>
        {/* Demo: Announcements, reminders, briefs */}
        <ul className="space-y-1 text-sm">
          <li>{t('team.sections.communicationCenter.announcement')}: "Q2 Campaign Launch on July 10"</li>
          <li>{t('team.sections.communicationCenter.reminder')}: "Submit weekly report by Friday"</li>
          <li>{t('team.sections.communicationCenter.brief')}: "SOP for Event Coordination uploaded"</li>
        </ul>
        <div className="mt-2 text-xs text-blue-600 animate-bounce">{t('team.sections.communicationCenter.aiTopUpdates')}</div>
      </section>

      {/* 7. Issue Escalation Panel */}
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <div className="flex items-center gap-2 mb-2"><FiAlertCircle className="text-red-500" /><h2 className="text-lg font-semibold">{t('team.sections.issueEscalation.title')}</h2><span className="ml-2 text-xs bg-red-100 text-red-700 px-2 py-1 rounded animate-pulse">{t('team.sections.issueEscalation.aiPrioritization')}</span></div>
        {/* Demo: Issue list, status, escalation */}
        <ul className="space-y-1 text-sm">
          <li>Khalid Al-Sayed: "Cannot access campaign analytics" <span className="ml-2 text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">{t('team.sections.issueEscalation.pending')}</span></li>
          <li>Noura Al-Zahra: "Need approval for blog series" <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded">{t('team.sections.issueEscalation.resolved')}</span></li>
        </ul>
        <div className="mt-2 text-xs text-red-600 animate-bounce">{t('team.sections.issueEscalation.aiUrgentIssue')}</div>
      </section>

      {/* 8. Attendance & Availability */}
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <div className="flex items-center gap-2 mb-2"><FiCalendar className="text-green-500" /><h2 className="text-lg font-semibold">{t('team.sections.attendanceAvailability.title')}</h2><span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded animate-pulse">{t('team.sections.attendanceAvailability.aiForecast')}</span></div>
        {/* Demo: Check-ins, leaves, roster */}
        <ul className="space-y-1 text-sm">
          <li>Abdullah Al-Rashid: {t('team.sections.attendanceAvailability.present')}</li>
          <li>Noura Al-Zahra: {t('team.sections.attendanceAvailability.onLeave')} (July 8-10)</li>
          <li>Khalid Al-Sayed: {t('team.sections.attendanceAvailability.present')}</li>
        </ul>
        <div className="mt-2 text-xs text-green-600 animate-bounce">{t('team.sections.attendanceAvailability.aiResourceGap')}</div>
      </section>

      {/* 9. Goal Planning & Reviews */}
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <div className="flex items-center gap-2 mb-2"><FiTarget className="text-purple-500" /><h2 className="text-lg font-semibold">{t('team.sections.goalPlanning.title')}</h2><span className="ml-2 text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded animate-pulse">{t('team.sections.goalPlanning.aiGoalSetting')}</span></div>
        {/* Demo: Goals, reviews, feedback */}
        <ul className="space-y-1 text-sm">
          <li>Abdullah Al-Rashid: {t('team.sections.goalPlanning.julyGoal')} - 40 conversions</li>
          <li>Noura Al-Zahra: {t('team.sections.goalPlanning.julyGoal')} - 10 blog posts</li>
          <li>Khalid Al-Sayed: {t('team.sections.goalPlanning.julyGoal')} - 20 social campaigns</li>
        </ul>
        <div className="mt-2 text-xs text-purple-600 animate-bounce">{t('team.sections.goalPlanning.aiGoalSuggestion')}</div>
      </section>

      {showModal && <Modal member={selectedMember} onClose={() => setShowModal(false)} />}
    </div>
  );
} 