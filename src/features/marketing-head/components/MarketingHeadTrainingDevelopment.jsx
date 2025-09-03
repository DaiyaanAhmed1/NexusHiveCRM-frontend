import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiBarChart2, FiUsers, FiBookOpen, FiCalendar, FiCheckCircle, FiZap, FiFileText, FiUser, FiSearch, FiDownload, FiPlus, FiEdit2, FiTrendingUp, FiTrendingDown, FiAward, FiClipboard, FiMessageCircle, FiStar, FiAlertCircle, FiSettings } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

// Demo data for training programs
const trainingPrograms = [
  {
    id: 1,
    name: "Digital Marketing Fundamentals",
    type: "Online Course",
    status: "Active",
    participants: 25,
    completion: 80,
    instructor: "Abdullah Al-Rashid",
    startDate: "2024-04-01",
    endDate: "応24-05-31",
    modules: [
      "Introduction to Digital Marketing",
      "Social Media Marketing",
      "Content Marketing",
      "Email Marketing",
      "Analytics & Reporting",
    ],
    thumbnail: "https://lms-frontend-resources.s3.ap-south-1.amazonaws.com/CoursesThumnails/course1.jpeg"
  },
  {
    id: 2,
    name: "Advanced Lead Generation",
    type: "Workshop",
    status: "Upcoming",
    participants: 15,
    completion: 0,
    instructor: "Noura Al-Zahra",
    startDate: "2024-05-15",
    endDate: "2024-05-16",
    modules: [
      "Lead Scoring",
      "CRM Management",
      "Lead Nurturing",
      "Conversion Optimization",
    ],
    thumbnail: "https://lms-frontend-resources.s3.ap-south-1.amazonaws.com/CoursesThumnails/course2.jpeg"
  },
  {
    id: 3,
    name: "Campaign Management",
    type: "Certification",
    status: "Completed",
    participants: 20,
    completion: 100,
    instructor: "Khalid Al-Sayed",
    startDate: "2024-01-01",
    endDate: "2024-03-31",
    modules: [
      "Campaign Planning",
      "Budget Management",
      "Channel Strategy",
      "Performance Analysis",
    ],
    thumbnail: "https://lms-frontend-resources.s3.ap-south-1.amazonaws.com/CoursesThumnails/course3.jpeg"
  },
];

// Demo data for team progress
const teamProgress = [
  { name: "Abdullah Al-Rashid", completed: 8, inProgress: 2, upcoming: 1 },
  { name: "Noura Al-Zahra", completed: 6, inProgress: 3, upcoming: 2 },
  { name: "Khalid Al-Sayed", completed: 7, inProgress: 2, upcoming: 1 },
];

// Demo data for each module
const trainingSessions = [
  { id: 1, title: "Google Ads Basics", date: "2024-04-20", status: "Upcoming", attendees: 8 },
  { id: 2, title: "CRM Lead Nurturing", date: "2024-04-10", status: "Completed", attendees: 10 },
  { id: 3, title: "Meta Ads Certification", date: "2024-04-15", status: "Pending", attendees: 5 },
];

const teamTrainingStatus = [
  { id: 1, name: "USA", completed: 5, pending: 2, certified: true, skillGap: "Analytics" },
  { id: 2, name: "USA", completed: 3, pending: 4, certified: false, skillGap: "Copywriting" },
];

const courseLibrary = [
  { id: 1, title: "Google Ads Basics", type: "Internal", link: "#", completed: 8 },
  { id: 2, title: "HubSpot Certification", type: "External", link: "#", completed: 5 },
  { id: 3, title: "CRM Lead Nurturing", type: "Internal", link: "#", completed: 10 },
];

const skillProfiles = [
  { id: 1, name: "USA", skills: ["Google Ads", "CRM"], completed: 5, pending: 2, goals: "Improve Analytics", feedback: "Great team player", skillScore: 82, promotionReady: true },
  { id: 2, name: "USA", skills: ["Copywriting", "Meta Ads"], completed: 3, pending: 4, goals: "Master Meta Ads", feedback: "Needs to improve deadlines", skillScore: 68, promotionReady: false },
];

const trainingRequests = [
  { id: 1, name: "USA", request: "Meta Ads Webinar", type: "External", status: "Pending", cost: 200 },
  { id: 2, name: "USA", request: "HubSpot Certification", type: "External", status: "Approved", cost: 150 },
];

const knowledgeDocs = [
  { id: 1, title: "How to Launch a Campaign", type: "SOP", tags: ["Campaign", "SOP"] },
  { id: 2, title: "Marketing Calendar Template", type: "Toolkit", tags: ["Template", "Calendar"] },
  { id: 3, title: "Failed Lead Campaign Insights", type: "Report", tags: ["Report", "Leads"] },
];

const mentorshipPairs = [
  { id: 1, mentor: "USA", mentee: "USA", topic: "Google Ads", status: "Active" },
  { id: 2, mentor: "USA", mentee: "USA", topic: "CRM", status: "Completed" },
];

const trainingReports = [
  { id: 1, week: "2024-W15", completed: 8, participation: 90, skillImprovement: 12, feedback: 4.5 },
  { id: 2, week: "2024-W14", completed: 6, participation: 80, skillImprovement: 8, feedback: 4.2 },
];

export default function MarketingHeadTrainingDevelopment() {
  const { t, ready, i18n } = useTranslation('marketing');
  const [languageVersion, setLanguageVersion] = useState(0);
  
  useEffect(() => {
    setLanguageVersion(prev => prev + 1);
  }, [i18n.language]);

  // Show loading state while translations are loading
  if (!ready) {
    return <div className="flex items-center justify-center min-h-screen">{t('support.messages.loading')}</div>;
  }

  // Debug: Log translation keys to console
  console.log('Marketing Training - Language:', i18n.language);
  console.log('Marketing Training - Ready:', ready);
  console.log('Marketing Training - Title translation:', t('training.title'));

  const user = JSON.parse(localStorage.getItem('rbac_current_user'));
  const [expanded, setExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState("All");

  const handleProgramClick = (program) => {
    setSelectedProgram(program);
    setShowModal(true);
  };

  const Modal = ({ program, onClose }) => {
    if (!program) return null;
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
            <h2 className="text-xl font-bold mb-2">{program.name}</h2>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              program.status === "Active" ? "bg-green-100 text-green-700" :
              program.status === "Upcoming" ? "bg-yellow-100 text-yellow-700" :
              "bg-gray-100 text-gray-700"
            }`}>
              {t(`training.status.${program.status.toLowerCase()}`)}
            </span>
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">{t('training.modal.programDetails')}</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">{t('training.modal.type')}</p>
                  <p className="font-medium">{program.type}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">{t('training.modal.duration')}</p>
                  <p className="font-medium">{program.startDate} - {program.endDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">{t('training.modal.instructor')}</p>
                  <p className="font-medium">{program.instructor}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">{t('training.modal.participants')}</p>
                  <p className="font-medium">{program.participants}</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">{t('training.modal.courseModules')}</h3>
              <div className="space-y-2">
                {program.modules.map((module, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <span className="text-sm font-medium">{index + 1}.</span>
                    <span className="text-sm">{module}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">{t('training.modal.progress')}</h3>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${program.completion}%` }}
                />
              </div>
              <p className="text-sm text-gray-500 mt-1">{program.completion}% {t('training.modal.complete')}</p>
            </div>
          </div>
          <div className="mt-6 flex gap-3">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              {t('training.modal.updateProgram')}
            </button>
            <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">
              {t('training.modal.viewParticipants')}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-10 animate-fade-in"
         data-tour="1"
         data-tour-title-en="Training & Development Overview"
         data-tour-title-ar="نظرة عامة على التدريب والتطوير"
         data-tour-content-en="Dashboard, calendar, courses, skills, requests, and insights."
         data-tour-content-ar="لوحة التحكم، التقويم، الدورات، المهارات، الطلبات والرؤى."
         data-tour-position="bottom">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-2 border-b border-gray-200 dark:border-gray-700">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">{t('training.title')} <FiBookOpen className="text-blue-500" /></h1>
          <p className="text-sm text-gray-600 dark:text-gray-300">{t('training.subtitle')}</p>
        </div>
      </div>

      {/* NexusHiveAI Promotion */}
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <FiZap className="text-yellow-500 animate-pulse" />
          <h2 className="text-lg font-semibold">{t('training.nexusHiveAI.title')}</h2>
        </div>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          {t('training.nexusHiveAI.description')}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {trainingPrograms.map((program, idx) => (
            <div key={program.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <img src={program.thumbnail} alt={program.name} className="w-full h-40 object-cover rounded-lg mb-2" />
              <h3 className="font-medium mb-1">{program.name}</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {idx === 0 && 'Learn advanced strategies for digital marketing success.'}
                {idx === 1 && 'Master data-driven decision-making in marketing.'}
                {idx === 2 && 'Develop leadership skills for marketing teams.'}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 1. Training Dashboard */}
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow p-6"
               data-tour="2"
               data-tour-title-en="Training Dashboard"
               data-tour-title-ar="لوحة تدريبية"
               data-tour-content-en="Upcoming sessions, certification status, and team insights."
               data-tour-content-ar="الجلسات القادمة، حالة الشهادات ورؤى الفريق.">
        <div className="flex items-center gap-2 mb-4">
          <FiBarChart2 className="text-blue-500" />
          <h2 className="text-lg font-semibold">{t('training.sections.trainingDashboard')}</h2>
          <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded animate-pulse">{t('training.aiFeatures.skillGapPrediction')}</span>
          <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded animate-pulse">{t('training.aiFeatures.trainingROIEstimator')}</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h3 className="font-medium mb-2">{t('training.dashboard.upcomingSessions')}</h3>
            <ul className="space-y-2">
              {trainingSessions.filter(s => s.status === 'Upcoming').map(s => (
                <li key={s.id}>{s.title} - {s.date}</li>
              ))}
            </ul>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h3 className="font-medium mb-2">{t('training.dashboard.certificationStatus')}</h3>
            <ul className="space-y-2">
              {teamTrainingStatus.map(t => (
                <li key={t.id}>{t.name}: {t.certified ? <span className="text-green-600">Certified</span> : <span className="text-yellow-600">Pending</span>}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="overflow-x-auto mb-4">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b dark:border-gray-700">
                <th className="pb-3 font-medium">{t('training.dashboard.teamMember')}</th>
                <th className="pb-3 font-medium">{t('training.dashboard.completed')}</th>
                <th className="pb-3 font-medium">{t('training.dashboard.pending')}</th>
                <th className="pb-3 font-medium">{t('training.dashboard.skillGap')}</th>
              </tr>
            </thead>
            <tbody>
              {teamTrainingStatus.map(t => (
                <tr key={t.id} className="border-b dark:border-gray-700">
                  <td className="py-3 font-medium">{t.name}</td>
                  <td className="py-3">{t.completed}</td>
                  <td className="py-3">{t.pending}</td>
                  <td className="py-3">{t.skillGap}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex-1">
            <div className="font-medium mb-1">{t('training.dashboard.skillGapPrediction')}</div>
            <div className="text-sm text-blue-700 dark:text-blue-300">USA needs Analytics upskilling based on recent campaign performance.</div>
          </div>
          <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg flex-1">
            <div className="font-medium mb-1">{t('training.dashboard.trainingROIEstimator')}</div>
            <div className="text-sm text-green-700 dark:text-green-300">Campaign ROI improved by 15% after Google Ads training.</div>
          </div>
        </div>
      </section>

      {/* 2. Training Calendar */}
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow p-6"
               data-tour="3"
               data-tour-title-en="Training Calendar"
               data-tour-title-ar="تقويم التدريب"
               data-tour-content-en="Plan sessions with smart rescheduling and reminders."
               data-tour-content-ar="خطط الجلسات مع إعادة الجدولة الذكية والتنبيهات.">
        <div className="flex items-center gap-2 mb-4">
          <FiCalendar className="text-purple-500" />
          <h2 className="text-lg font-semibold">{t('training.sections.trainingCalendar')}</h2>
          <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded animate-pulse">{t('training.aiFeatures.smartRescheduling')}</span>
          <span className="ml-2 text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded animate-pulse">{t('training.aiFeatures.remindersNudges')}</span>
        </div>
        <div className="h-56 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex flex-col items-center justify-start text-blue-700 dark:text-blue-300 font-bold mb-4 p-4">
          <div className="text-lg font-semibold mb-2 text-center">{t('training.calendar.april2025')}</div>
          <div className="grid grid-cols-7 gap-1 text-xs text-center w-full mb-2">
            <div className="font-bold">Sun</div>
            <div className="font-bold">Mon</div>
            <div className="font-bold">Tue</div>
            <div className="font-bold">Wed</div>
            <div className="font-bold">Thu</div>
            <div className="font-bold">Fri</div>
            <div className="font-bold">Sat</div>
            {/* April 2025 starts on Tuesday, so 2 empty cells for Sunday and Monday */}
            <div></div>
            <div></div>
            {/* Days 1-30 */}
            {Array.from({ length: 30 }, (_, i) => {
              const day = i + 1;
              const today = new Date();
              const isToday = today.getFullYear() === 2025 && today.getMonth() === 3 && today.getDate() === day;
              return (
                <div
                  key={day}
                  className={`rounded-full w-7 h-7 flex items-center justify-center mx-auto ${isToday ? 'bg-blue-600 text-white font-bold shadow' : 'hover:bg-blue-200'} transition`}
                >
                  {day}
                </div>
              );
            })}
          </div>
          <div className="flex justify-center gap-4 mt-2 text-xs w-full">
            <span className="inline-flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-blue-600 inline-block"></span> {t('training.calendar.today')}</span>
            <span className="inline-flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-green-400 inline-block"></span> {t('training.calendar.upcoming')}</span>
            <span className="inline-flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-yellow-400 inline-block"></span> {t('training.calendar.pending')}</span>
            <span className="inline-flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-gray-400 inline-block"></span> {t('training.calendar.completed')}</span>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4 mt-4">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex-1">
            <div className="font-medium mb-1">{t('training.calendar.smartRescheduling')}</div>
            <div className="text-sm text-blue-700 dark:text-blue-300">Suggested: Move "Meta Ads Certification" to avoid campaign overlap.</div>
          </div>
          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg flex-1">
            <div className="font-medium mb-1">{t('training.calendar.remindersNudges')}</div>
            <div className="text-sm text-yellow-700 dark:text-yellow-300">USA has overdue learning: "CRM Lead Nurturing".</div>
          </div>
        </div>
      </section>

      {/* 3. Course Library / LMS Integration */}
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow p-6"
               data-tour="4"
               data-tour-title-en="Course Library"
               data-tour-title-ar="مكتبة الدورات"
               data-tour-content-en="Internal/external courses and adaptive learning paths."
               data-tour-content-ar="دورات داخلية/خارجية ومسارات تعلم تكيفية.">
        <div className="flex items-center gap-2 mb-4">
          <FiBookOpen className="text-green-500" />
          <h2 className="text-lg font-semibold">{t('training.sections.courseLibrary')}</h2>
          <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded animate-pulse">{t('training.aiFeatures.adaptiveLearningPath')}</span>
          <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded animate-pulse">{t('training.aiFeatures.autoGeneratedTests')}</span>
        </div>
        <div className="overflow-x-auto mb-4">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b dark:border-gray-700">
                <th className="pb-3 font-medium">{t('training.courseLibrary.course')}</th>
                <th className="pb-3 font-medium">{t('training.courseLibrary.type')}</th>
                <th className="pb-3 font-medium">{t('training.courseLibrary.completed')}</th>
                <th className="pb-3 font-medium">{t('training.courseLibrary.link')}</th>
              </tr>
            </thead>
            <tbody>
              {courseLibrary.map(c => (
                <tr key={c.id} className="border-b dark:border-gray-700">
                  <td className="py-3 font-medium">{c.title}</td>
                  <td className="py-3">{c.type}</td>
                  <td className="py-3">{c.completed}</td>
                  <td className="py-3"><a href={c.link} className="text-blue-600 underline">{t('training.courseLibrary.view')}</a></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg flex-1">
            <div className="font-medium mb-1">{t('training.courseLibrary.adaptiveLearningPath')}</div>
            <div className="text-sm text-green-700 dark:text-green-300">USA recommended to take "Analytics for Marketers" next.</div>
          </div>
          <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex-1">
            <div className="font-medium mb-1">{t('training.courseLibrary.autoGeneratedTest')}</div>
            <div className="text-sm text-blue-700 dark:text-blue-300">Quiz created from "Google Ads Basics" PDF.</div>
          </div>
        </div>
      </section>

      {/* 4. Team Member Skill Profiles */}
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow p-6"
               data-tour="5"
               data-tour-title-en="Skill Profiles"
               data-tour-title-ar="ملفات المهارات"
               data-tour-content-en="Skill scores, goals, feedback, and readiness."
               data-tour-content-ar="درجات المهارات والأهداف والتغذية الراجعة والجاهزية.">
        <div className="flex items-center gap-2 mb-4">
          <FiUser className="text-blue-400" />
          <h2 className="text-lg font-semibold">{t('training.sections.skillProfiles')}</h2>
          <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded animate-pulse">{t('training.aiFeatures.skillScoreIndex')}</span>
          <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded animate-pulse">{t('training.aiFeatures.promotionReadiness')}</span>
        </div>
        <div className="overflow-x-auto mb-4">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b dark:border-gray-700">
                <th className="pb-3 font-medium">{t('training.skillProfiles.name')}</th>
                <th className="pb-3 font-medium">{t('training.skillProfiles.skills')}</th>
                <th className="pb-3 font-medium">{t('training.skillProfiles.completed')}</th>
                <th className="pb-3 font-medium">{t('training.skillProfiles.pending')}</th>
                <th className="pb-3 font-medium">{t('training.skillProfiles.goals')}</th>
                <th className="pb-3 font-medium">{t('training.skillProfiles.feedback')}</th>
                <th className="pb-3 font-medium">{t('training.skillProfiles.skillScore')}</th>
                <th className="pb-3 font-medium">{t('training.skillProfiles.promotionReady')}</th>
              </tr>
            </thead>
            <tbody>
              {skillProfiles.map(p => (
                <tr key={p.id} className="border-b dark:border-gray-700">
                  <td className="py-3 font-medium">{p.name}</td>
                  <td className="py-3">{p.skills.join(", ")}</td>
                  <td className="py-3">{p.completed}</td>
                  <td className="py-3">{p.pending}</td>
                  <td className="py-3">{p.goals}</td>
                  <td className="py-3">{p.feedback}</td>
                  <td className="py-3">{p.skillScore}</td>
                  <td className="py-3">{p.promotionReady ? <span className="text-green-600">{t('training.skillProfiles.yes')}</span> : <span className="text-yellow-600">{t('training.skillProfiles.no')}</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex-1">
            <div className="font-medium mb-1">{t('training.skillProfiles.skillScoreIndex')}</div>
            <div className="text-sm text-blue-700 dark:text-blue-300">USA skill score updated after campaign assessment.</div>
          </div>
          <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg flex-1">
            <div className="font-medium mb-1">{t('training.skillProfiles.promotionReadiness')}</div>
            <div className="text-sm text-green-700 dark:text-green-300">USA flagged as ready for new role.</div>
          </div>
        </div>
      </section>

      {/* 5. Training Requests & Approvals */}
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow p-6"
               data-tour="6"
               data-tour-title-en="Training Requests"
               data-tour-title-ar="طلبات التدريب"
               data-tour-content-en="Requests, approvals, and cost impact analyzer."
               data-tour-content-ar="طلبات وموافقات التدريب ومحلل تأثير التكلفة.">
        <div className="flex items-center gap-2 mb-4">
          <FiClipboard className="text-purple-500" />
          <h2 className="text-lg font-semibold">{t('training.sections.trainingRequests')}</h2>
          <span className="ml-2 text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded animate-pulse">{t('training.aiFeatures.costImpactAnalyzer')}</span>
        </div>
        <div className="overflow-x-auto mb-4">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b dark:border-gray-700">
                <th className="pb-3 font-medium">{t('training.trainingRequests.name')}</th>
                <th className="pb-3 font-medium">{t('training.trainingRequests.request')}</th>
                <th className="pb-3 font-medium">{t('training.trainingRequests.type')}</th>
                <th className="pb-3 font-medium">{t('training.trainingRequests.status')}</th>
                <th className="pb-3 font-medium">{t('training.trainingRequests.cost')}</th>
              </tr>
            </thead>
            <tbody>
              {trainingRequests.map(r => (
                <tr key={r.id} className="border-b dark:border-gray-700">
                  <td className="py-3 font-medium">{r.name}</td>
                  <td className="py-3">{r.request}</td>
                  <td className="py-3">{r.type}</td>
                  <td className="py-3">{r.status}</td>
                  <td className="py-3">${r.cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg">
          <div className="font-medium mb-1">{t('training.trainingRequests.costImpactAnalyzer')}</div>
          <div className="text-sm text-yellow-700 dark:text-yellow-300">Meta Ads Webinar expected to improve campaign ROI by 10%.</div>
        </div>
      </section>

      {/* 6. Knowledge Management */}
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <div className="flex items-center gap-2 mb-4">
          <FiFileText className="text-blue-400" />
          <h2 className="text-lg font-semibold">{t('training.sections.knowledgeManagement')}</h2>
          <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded animate-pulse">{t('training.aiFeatures.aiPoweredSearch')}</span>
          <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded animate-pulse">{t('training.aiFeatures.autoTagging')}</span>
        </div>
        <div className="overflow-x-auto mb-4">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b dark:border-gray-700">
                <th className="pb-3 font-medium">{t('training.knowledgeManagement.title')}</th>
                <th className="pb-3 font-medium">{t('training.knowledgeManagement.type')}</th>
                <th className="pb-3 font-medium">{t('training.knowledgeManagement.tags')}</th>
              </tr>
            </thead>
            <tbody>
              {knowledgeDocs.map(d => (
                <tr key={d.id} className="border-b dark:border-gray-700">
                  <td className="py-3 font-medium">{d.title}</td>
                  <td className="py-3">{d.type}</td>
                  <td className="py-3">{d.tags.join(", ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex-1">
            <div className="font-medium mb-1">{t('training.knowledgeManagement.aiPoweredSearch')}</div>
            <div className="text-sm text-blue-700 dark:text-blue-300">"Show me all SOPs for campaign launch"</div>
          </div>
          <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg flex-1">
            <div className="font-medium mb-1">{t('training.knowledgeManagement.autoTagging')}</div>
            <div className="text-sm text-green-700 dark:text-green-300">"Failed Lead Campaign Insights" auto-tagged as Report, Leads.</div>
          </div>
        </div>
      </section>

      {/* 7. Peer Learning & Mentorship */}
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <div className="flex items-center gap-2 mb-4">
          <FiUsers className="text-pink-500" />
          <h2 className="text-lg font-semibold">{t('training.sections.peerLearning')}</h2>
          <span className="ml-2 text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded animate-pulse">{t('training.aiFeatures.mentorshipMatchmaking')}</span>
        </div>
        <div className="overflow-x-auto mb-4">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b dark:border-gray-700">
                <th className="pb-3 font-medium">{t('training.peerLearning.mentor')}</th>
                <th className="pb-3 font-medium">{t('training.peerLearning.mentee')}</th>
                <th className="pb-3 font-medium">{t('training.peerLearning.topic')}</th>
                <th className="pb-3 font-medium">{t('training.peerLearning.status')}</th>
              </tr>
            </thead>
            <tbody>
              {mentorshipPairs.map(p => (
                <tr key={p.id} className="border-b dark:border-gray-700">
                  <td className="py-3 font-medium">{p.mentor}</td>
                  <td className="py-3">{p.mentee}</td>
                  <td className="py-3">{p.topic}</td>
                  <td className="py-3">{p.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg">
          <div className="font-medium mb-1">{t('training.peerLearning.mentorshipMatchmaking')}</div>
          <div className="text-sm text-yellow-700 dark:text-yellow-300">USA paired with USA for Google Ads mentoring.</div>
        </div>
      </section>

      {/* 8. Reports & Insights */}
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow p-6"
               data-tour="7"
               data-tour-title-en="Reports & Insights"
               data-tour-title-ar="التقارير والرؤى"
               data-tour-content-en="Weekly reports, engagement analyzer, and heatmaps."
               data-tour-content-ar="تقارير أسبوعية، محلل المشاركة وخرائط الحرارة.">
        <div className="flex items-center gap-2 mb-4">
          <FiBarChart2 className="text-blue-500" />
          <h2 className="text-lg font-semibold">{t('training.sections.reportsInsights')}</h2>
          <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded animate-pulse">{t('training.aiFeatures.engagementAnalyzer')}</span>
          <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded animate-pulse">{t('training.aiFeatures.teamHeatmaps')}</span>
        </div>
        <div className="overflow-x-auto mb-4">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b dark:border-gray-700">
                <th className="pb-3 font-medium">{t('training.reportsInsights.week')}</th>
                <th className="pb-3 font-medium">{t('training.reportsInsights.completed')}</th>
                <th className="pb-3 font-medium">{t('training.reportsInsights.participation')}</th>
                <th className="pb-3 font-medium">{t('training.reportsInsights.skillImprovement')}</th>
                <th className="pb-3 font-medium">{t('training.reportsInsights.feedback')}</th>
              </tr>
            </thead>
            <tbody>
              {trainingReports.map(r => (
                <tr key={r.id} className="border-b dark:border-gray-700">
                  <td className="py-3 font-medium">{r.week}</td>
                  <td className="py-3">{r.completed}</td>
                  <td className="py-3">{r.participation}%</td>
                  <td className="py-3">{r.skillImprovement}</td>
                  <td className="py-3">{r.feedback}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex-1">
            <div className="font-medium mb-1">{t('training.reportsInsights.engagementAnalyzer')}</div>
            <div className="text-sm text-blue-700 dark:text-blue-300">"Meta Ads Certification" flagged for low completion.</div>
          </div>
          <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg flex-1">
            <div className="font-medium mb-1">{t('training.reportsInsights.teamHeatmaps')}</div>
            <div className="text-sm text-green-700 dark:text-green-300">Analytics skill gap highest in team.</div>
          </div>
        </div>
      </section>

      {/* 9. AI-Powered Training Assistant */}
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <div className="flex items-center gap-2 mb-4">
          <FiZap className="text-yellow-500 animate-pulse" />
          <h2 className="text-lg font-semibold">{t('training.sections.aiAssistant')}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h3 className="font-medium mb-2">{t('training.aiAssistant.recommendedCourses')}</h3>
            <div className="text-sm text-gray-700 dark:text-gray-300">
              <ul className="list-disc pl-6">
                <li>{t('training.aiAssistant.advancedDigitalMarketing')}</li>
                <li>{t('training.aiAssistant.dataDrivenDecision')}</li>
                <li>{t('training.aiAssistant.leadershipMarketing')}</li>
                <li>{t('training.aiAssistant.customerRelationship')}</li>
              </ul>
            </div>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h3 className="font-medium mb-2">{t('training.aiAssistant.learningPathSuggestions')}</h3>
            <div className="text-sm text-gray-700 dark:text-gray-300">
              <ul className="list-disc pl-6">
                <li>Start with "{t('training.aiAssistant.marketingFundamentals')}"</li>
                <li>Progress to "{t('training.aiAssistant.advancedAnalytics')}"</li>
                <li>Complete "{t('training.aiAssistant.strategicPlanning')}"</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 10. NexusHiveAI Recommended Courses */}
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 mt-6">
        <div className="flex items-center gap-2 mb-4">
          <FiZap className="text-yellow-500 animate-pulse" />
          <h2 className="text-lg font-semibold">{t('training.nexusHiveAI.recommendedCourses')}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {trainingPrograms.map((program, idx) => (
            <div key={program.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <img src={program.thumbnail} alt={program.name} className="w-full h-40 object-cover rounded-lg mb-2" />
              <h3 className="font-medium mb-1">{program.name}</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {idx === 0 && 'Learn advanced strategies for digital marketing success.'}
                {idx === 1 && 'Master data-driven decision-making in marketing.'}
                {idx === 2 && 'Develop leadership skills for marketing teams.'}
              </p>
            </div>
          ))}
        </div>
      </section>

      {showModal && <Modal program={selectedProgram} onClose={() => setShowModal(false)} />}
    </div>
  );
} 