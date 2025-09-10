import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useLocalization } from "../../../hooks/useLocalization";
import { directorFeatures } from '../../../components/directorFeatures';
import DirectorStrategicInsights from './ai/DirectorStrategicInsights';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  FiDollarSign, 
  FiTarget, 
  FiZap, 
  FiBarChart2,
  FiTrendingUp,
  FiUsers,
  FiShield,
  FiAward,
  FiCheckCircle,
  FiClock,
  FiBookOpen,
  FiTrendingDown,
  FiAlertTriangle,
  FiStar,
  FiCalendar,
  FiArrowUp,
  FiArrowDown,
  FiMinus
} from 'react-icons/fi';

// Demo data for filters - will be generated dynamically with translations
const years = ["2024", "2025", "2026", "2027", "2028"];

// Demo data for KPIs - will be generated dynamically with translations

// Demo data for progress bars - will be generated dynamically with translations

// Demo data for Gantt chart (strategic roadmap) - will be generated dynamically with translations

// Enhanced Academic Planning Tools data - will be generated dynamically with translations

// Enhanced SWOT - will be generated dynamically with translations

// Enhanced Trend Analysis - will be generated dynamically with translations

export default function DirectorStrategicPlanning() {
  const { t, ready } = useTranslation('director');
  const { isRTLMode } = useLocalization();
  const user = JSON.parse(localStorage.getItem('rbac_current_user'));
  const [selectedDept, setSelectedDept] = useState("All Departments");
  const [selectedYear, setSelectedYear] = useState("2024");

  // AI Features State
  const [showStrategicInsights, setShowStrategicInsights] = useState(false);
  const [strategicInsights, setStrategicInsights] = useState(null);

  // Refs for auto-scroll functionality
  const strategicRef = useRef(null);

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
  const handleShowStrategicInsights = () => {
    setShowStrategicInsights(!showStrategicInsights);
    if (!showStrategicInsights) {
      setTimeout(() => scrollToAISection(strategicRef), 100);
    }
  };

  if (!ready) {
    return <div className="flex min-h-screen bg-[#F6F7FA] dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 items-center justify-center">
      <div className="text-lg text-gray-600 dark:text-gray-300">Loading...</div>
    </div>;
  }

  // Generate translated data
  const departments = [t('strategicPlanning.filters.allDepartments'), t('strategicPlanning.filters.departments.computerScience'), t('strategicPlanning.filters.departments.eee'), t('strategicPlanning.filters.departments.mechanical'), t('strategicPlanning.filters.departments.business'), t('strategicPlanning.filters.departments.biotech')];
  
  const kpis = [
    { label: t('strategicPlanning.kpis.studentFacultyRatio'), value: 18, target: 15, unit: ":1", trend: "up", icon: FiUsers },
    { label: t('strategicPlanning.kpis.publicationsFaculty'), value: 2.8, target: 3.5, trend: "down", icon: FiBookOpen },
    { label: t('strategicPlanning.kpis.retentionRate'), value: 92, target: 95, unit: "%", trend: "up", icon: FiCheckCircle },
    { label: t('strategicPlanning.kpis.placementRate'), value: 81, target: 90, unit: "%", trend: "down", icon: FiAward },
  ];

  const goals = [
    { label: t('strategicPlanning.strategicGoals.researchOutput'), progress: 70, icon: FiBookOpen, color: "blue" },
    { label: t('strategicPlanning.strategicGoals.accreditationStatus'), progress: 85, icon: FiAward, color: "green" },
    { label: t('strategicPlanning.strategicGoals.placements'), progress: 81, icon: FiUsers, color: "purple" },
    { label: t('strategicPlanning.strategicGoals.facultyHiring'), progress: 60, icon: FiUsers, color: "orange" },
  ];

  const roadmap = [
    { name: t('strategicPlanning.roadmap.ncaaaPrep'), start: "2024", end: "2025", status: "in-progress", priority: "high" },
    { name: t('strategicPlanning.roadmap.newBscAiProgram'), start: "2025", end: "2026", status: "planned", priority: "medium" },
    { name: t('strategicPlanning.roadmap.campusExpansion'), start: "2026", end: "2028", status: "planned", priority: "low" },
    { name: t('strategicPlanning.roadmap.greenCampusInitiative'), start: "2024", end: "2027", status: "in-progress", priority: "medium" },
  ];

  const curriculumMatrix = [
    { course: t('strategicPlanning.programs.bscAi'), status: t('strategicPlanning.curriculumStatus.proposal'), lead: t('strategicPlanning.faculty.drChen'), start: "2024-06", end: "2025-05", priority: "high" },
    { course: t('strategicPlanning.programs.mbaFintech'), status: t('strategicPlanning.curriculumStatus.review'), lead: t('strategicPlanning.faculty.drRao'), start: "2023-09", end: "2024-08", priority: "medium" },
    { course: t('strategicPlanning.programs.btechEee'), status: t('strategicPlanning.curriculumStatus.ongoing'), lead: t('strategicPlanning.faculty.drSingh'), start: "2022-07", end: "2025-06", priority: "low" },
    { course: t('strategicPlanning.programs.mscDataSci'), status: t('strategicPlanning.curriculumStatus.proposal'), lead: t('strategicPlanning.faculty.drPatel'), start: "2024-01", end: "2025-12", priority: "high" },
    { course: t('strategicPlanning.programs.bbaMarketing'), status: t('strategicPlanning.curriculumStatus.accredited'), lead: t('strategicPlanning.faculty.drMehra'), start: "2021-08", end: "2024-07", priority: "low" },
  ];

  const programEvaluation = [
    { program: t('strategicPlanning.programs.bscCs'), next: "2025", last: "2020", status: "upcoming" },
    { program: t('strategicPlanning.programs.mba'), next: "2026", last: "2021", status: "upcoming" },
    { program: t('strategicPlanning.programs.btechEee'), next: "2027", last: "2022", status: "upcoming" },
    { program: t('strategicPlanning.programs.mscDataSci'), next: "2028", last: "New", status: "new" },
    { program: t('strategicPlanning.programs.bbaMarketing'), next: "2024", last: "2019", status: "urgent" },
  ];

  const swot = {
    [t('strategicPlanning.swot.strengths')]: [
      t('strategicPlanning.swot.items.strongFacultyBase'),
      t('strategicPlanning.swot.items.modernLabs'),
      t('strategicPlanning.swot.items.highResearchOutput'),
      t('strategicPlanning.swot.items.internationalPartnerships')
    ],
    [t('strategicPlanning.swot.weaknesses')]: [
      t('strategicPlanning.swot.items.limitedHostelCapacity'),
      t('strategicPlanning.swot.items.outdatedLibraryResources'),
      t('strategicPlanning.swot.items.lowAlumniEngagement')
    ],
    [t('strategicPlanning.swot.opportunities')]: [
      t('strategicPlanning.swot.items.aiMlProgramDemand'),
      t('strategicPlanning.swot.items.industryTieUps'),
      t('strategicPlanning.swot.items.governmentGrants'),
      t('strategicPlanning.swot.items.onlineCourseExpansion')
    ],
    [t('strategicPlanning.swot.threats')]: [
      t('strategicPlanning.swot.items.risingCompetition'),
      t('strategicPlanning.swot.items.changingRegulations'),
      t('strategicPlanning.swot.items.decliningEnrollment'),
      t('strategicPlanning.swot.items.economicDownturn')
    ],
  };

  const trends = [
    { label: t('strategicPlanning.trends.enrollment'), values: [1200, 1300, 1400, 1550, 1700], years: ["2020","2021","2022","2023","2024"], color: "#3b82f6" },
    { label: t('strategicPlanning.trends.placements'), values: [800, 900, 950, 1100, 1200], years: ["2020","2021","2022","2023","2024"], color: "#10b981" },
    { label: t('strategicPlanning.trends.researchFunding'), values: [200, 250, 300, 350, 400], years: ["2020","2021","2022","2023","2024"], color: "#f59e0b" },
    { label: t('strategicPlanning.trends.facultyPublications'), values: [50, 60, 70, 85, 90], years: ["2020","2021","2022","2023","2024"], color: "#8b5cf6" },
    { label: t('strategicPlanning.trends.internationalCollaborations'), values: [2, 3, 4, 6, 8], years: ["2020","2021","2022","2023","2024"], color: "#ef4444" },
  ];

  // Helper functions
  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return <FiArrowUp className="w-4 h-4 text-green-500" />;
      case 'down': return <FiArrowDown className="w-4 h-4 text-red-500" />;
      default: return <FiMinus className="w-4 h-4 text-gray-500" />;
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return "bg-green-500";
    if (progress >= 60) return "bg-blue-500";
    if (progress >= 40) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      case 'medium': return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
      case 'low': return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'urgent': return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      case 'upcoming': return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case 'new': return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  return (
    <div className={`flex min-h-screen bg-[#F6F7FA] dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 ${isRTLMode ? 'rtl' : 'ltr'}`}>
      <main className="flex-1 p-4 md:p-6 flex flex-col gap-8 overflow-x-auto">
        {/* Header Section */}
        <div className={`flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 ${isRTLMode ? 'flex-row-reverse' : ''}`}>
          <div className={`flex-1 min-w-0 ${isRTLMode ? 'text-right' : 'text-left'}`}>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{t('strategicPlanning.title')}</h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg">{t('strategicPlanning.subtitle')}</p>
          </div>
          
          <div className={`flex flex-col sm:flex-row gap-4 ${isRTLMode ? 'flex-row-reverse' : ''}`}>
            {/* AI Features Button */}
            <div className={`flex-shrink-0 ${isRTLMode ? 'text-right' : 'text-left'}`}>
              <button 
                className={`px-6 py-3 text-sm bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 flex items-center gap-3 transition-all duration-200 shadow-lg hover:shadow-xl whitespace-nowrap ${isRTLMode ? 'flex-row-reverse' : ''}`}
                onClick={handleShowStrategicInsights}
              >
                <FiTarget className="w-5 h-5 flex-shrink-0" /> 
                <span className="hidden sm:inline font-medium">
                  {isRTLMode ? 'الرؤى الاستراتيجية' : 'Strategic Insights'}
                </span>
                <span className="sm:hidden font-medium">
                  {isRTLMode ? 'استراتيجي' : 'Strategic'}
                </span>
              </button>
            </div>

            {/* Filter Controls */}
            <div className={`flex flex-wrap gap-3 ${isRTLMode ? 'flex-row-reverse' : ''}`}>
              <select 
                value={selectedDept} 
                onChange={e => setSelectedDept(e.target.value)} 
                className="px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              >
                {departments.map(d => <option key={d}>{d}</option>)}
              </select>
              <select 
                value={selectedYear} 
                onChange={e => setSelectedYear(e.target.value)} 
                className="px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              >
                {years.map(y => <option key={y}>{y}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* AI Strategic Insights Section */}
        {showStrategicInsights && (
          <section 
            ref={strategicRef}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700"
            dir={isRTLMode ? 'rtl' : 'ltr'}
          >
            <div className={`flex items-center gap-3 mb-6 ${isRTLMode ? 'flex-row-reverse' : ''}`}>
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <FiTarget className="text-blue-600 dark:text-blue-400 w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {isRTLMode ? 'الرؤى الاستراتيجية والتخطيط الذكي' : 'Strategic Insights & Intelligent Planning'}
              </h2>
            </div>
            <div className="mb-6">
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                {isRTLMode 
                  ? 'رؤى استراتيجية مدعومة بالذكاء الاصطناعي لتحسين الأداء والتخطيط المستقبلي' 
                  : 'AI-powered strategic insights for enhanced performance and future planning'
                }
              </p>
            </div>
            <DirectorStrategicInsights 
              onInsightsGenerated={(insights) => {
                setStrategicInsights(insights);
                console.log('Strategic insights generated:', insights);
              }}
            />
          </section>
        )}

        {/* 1. Key Performance Indicators */}
        <section
          data-tour="2"
          data-tour-title-en="Key Performance Indicators"
          data-tour-title-ar="مؤشرات الأداء الرئيسية"
          data-tour-content-en="Track KPIs versus targets to ensure alignment with strategic goals."
          data-tour-content-ar="تتبع مؤشرات الأداء مقابل الأهداف لضمان التوافق مع الأهداف الإستراتيجية."
          data-tour-position="bottom"
        >
          <div className={`flex items-center gap-3 mb-6 ${isRTLMode ? 'flex-row-reverse' : ''}`}>
            <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
              <FiBarChart2 className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('strategicPlanning.sections.keyPerformanceIndicators')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {kpis.map((kpi, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
              >
                <div className={`flex items-center justify-between mb-4 ${isRTLMode ? 'flex-row-reverse' : ''}`}>
                  <div className={`p-2 rounded-lg ${isRTLMode ? 'ml-3' : 'mr-3'}`} style={{ backgroundColor: `${kpi.icon === FiUsers ? '#dbeafe' : kpi.icon === FiBookOpen ? '#fef3c7' : kpi.icon === FiCheckCircle ? '#d1fae5' : '#e0e7ff'}` }}>
                    <kpi.icon className={`w-5 h-5 ${isRTLMode ? 'ml-0' : 'mr-0'}`} style={{ color: `${kpi.icon === FiUsers ? '#3b82f6' : kpi.icon === FiBookOpen ? '#f59e0b' : kpi.icon === FiCheckCircle ? '#10b981' : '#8b5cf6'}` }} />
                  </div>
                  {getTrendIcon(kpi.trend)}
                </div>
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">{kpi.label}</h3>
                <div className="flex items-baseline justify-between">
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {kpi.value}{kpi.unit || ""}
                  </p>
                  <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                    kpi.value >= kpi.target ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                  }`}>
                    {t('strategicPlanning.kpis.target')}: {kpi.target}{kpi.unit || ""}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 2. Strategic Goals & Roadmap */}
        <section
          data-tour="3"
          data-tour-title-en="Strategic Goals & Roadmap"
          data-tour-title-ar="الأهداف الإستراتيجية وخارطة الطريق"
          data-tour-content-en="Monitor goal progress and view the multi-year strategic roadmap."
          data-tour-content-ar="راقب تقدم الأهداف واعرض خارطة الطريق الإستراتيجية لعدة سنوات."
          data-tour-position="bottom"
        >
          <div className={`flex items-center gap-3 mb-6 ${isRTLMode ? 'flex-row-reverse' : ''}`}>
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <FiTarget className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('strategicPlanning.sections.strategicGoalsRoadmap')}</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <FiTrendingUp className="w-5 h-5 text-blue-500" />
                {t('strategicPlanning.strategicGoals.goalProgressTracker')}
              </h3>
              <div className="space-y-6">
                {goals.map((goal, index) => (
                  <div key={index} className="space-y-3">
                    <div className={`flex items-center justify-between ${isRTLMode ? 'flex-row-reverse' : ''}`}>
                      <div className={`flex items-center gap-3 ${isRTLMode ? 'flex-row-reverse' : ''}`}>
                        <div className={`p-2 rounded-lg ${
                          goal.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/30' :
                          goal.color === 'green' ? 'bg-green-100 dark:bg-green-900/30' :
                          goal.color === 'purple' ? 'bg-purple-100 dark:bg-purple-900/30' :
                          'bg-orange-100 dark:bg-orange-900/30'
                        }`}>
                          <goal.icon className={`w-4 h-4 ${
                            goal.color === 'blue' ? 'text-blue-600 dark:text-blue-400' :
                            goal.color === 'green' ? 'text-green-600 dark:text-green-400' :
                            goal.color === 'purple' ? 'text-purple-600 dark:text-purple-400' :
                            'text-orange-600 dark:text-orange-400'
                          }`} />
                        </div>
                        <span className="font-medium text-gray-900 dark:text-white">{goal.label}</span>
                      </div>
                      <span className="text-sm font-bold text-gray-600 dark:text-gray-400">{goal.progress}%</span>
                    </div>
                    <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          goal.color === 'blue' ? 'bg-blue-500' :
                          goal.color === 'green' ? 'bg-green-500' :
                          goal.color === 'purple' ? 'bg-purple-500' :
                          'bg-orange-500'
                        }`} 
                        style={{ width: `${goal.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <FiCalendar className="w-5 h-5 text-green-500" />
                {t('strategicPlanning.strategicGoals.strategicRoadmapTimeline')}
              </h3>
              <div className="space-y-4">
                {roadmap.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className={`flex items-center justify-between ${isRTLMode ? 'flex-row-reverse' : ''}`}>
                      <span className="font-medium text-gray-900 dark:text-white text-sm">{item.name}</span>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(item.priority)}`}>
                        {item.priority}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full relative overflow-hidden">
                        <div 
                          className={`h-2 rounded-full absolute ${
                            item.status === 'in-progress' ? 'bg-blue-500' : 'bg-gray-400'
                          }`} 
                          style={{ 
                            left: `${(parseInt(item.start)-2024)*25}%`, 
                            width: `${(parseInt(item.end)-parseInt(item.start)+1)*25}%` 
                          }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                        {item.start} - {item.end}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 3. Academic Planning Tools */}
        <section
          data-tour="4"
          data-tour-title-en="Academic Planning Tools"
          data-tour-title-ar="أدوات التخطيط الأكاديمي"
          data-tour-content-en="Curriculum development matrix and program evaluation cycles."
          data-tour-content-ar="مصفوفة تطوير المناهج ودورات تقييم البرامج."
          data-tour-position="bottom"
        >
          <div className={`flex items-center gap-3 mb-6 ${isRTLMode ? 'flex-row-reverse' : ''}`}>
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <FiBookOpen className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('strategicPlanning.sections.academicPlanningTools')}</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <FiBookOpen className="w-5 h-5 text-purple-500" />
                {t('strategicPlanning.academicPlanning.curriculumDevelopmentMatrix')}
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left border-b border-gray-200 dark:border-gray-700">
                      <th className="pb-3 font-semibold text-gray-900 dark:text-white">{t('strategicPlanning.academicPlanning.course')}</th>
                      <th className="pb-3 font-semibold text-gray-900 dark:text-white">{t('strategicPlanning.academicPlanning.status')}</th>
                      <th className="pb-3 font-semibold text-gray-900 dark:text-white">{t('strategicPlanning.academicPlanning.lead')}</th>
                      <th className="pb-3 font-semibold text-gray-900 dark:text-white">{t('strategicPlanning.academicPlanning.startDate')}</th>
                      <th className="pb-3 font-semibold text-gray-900 dark:text-white">{t('strategicPlanning.academicPlanning.endDate')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {curriculumMatrix.map((row, i) => (
                      <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                        <td className="py-3 font-medium text-gray-900 dark:text-white">{row.course}</td>
                        <td className="py-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(row.priority)}`}>
                            {row.status}
                          </span>
                        </td>
                        <td className="py-3 text-gray-600 dark:text-gray-400">{row.lead}</td>
                        <td className="py-3 text-gray-600 dark:text-gray-400">{row.start}</td>
                        <td className="py-3 text-gray-600 dark:text-gray-400">{row.end}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <FiClock className="w-5 h-5 text-orange-500" />
                {t('strategicPlanning.academicPlanning.programEvaluationCycle')}
              </h3>
              <div className="space-y-4">
                {programEvaluation.map((prog, i) => (
                  <div key={i} className={`flex items-center justify-between p-4 rounded-lg border ${
                    prog.status === 'urgent' ? 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20' :
                    prog.status === 'upcoming' ? 'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20' :
                    prog.status === 'new' ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20' :
                    'border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-700/50'
                  }`}>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">{prog.program}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {t('strategicPlanning.academicPlanning.reviewIn')} {prog.next} ({t('strategicPlanning.academicPlanning.last')}: {prog.last})
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(prog.status)}`}>
                      {prog.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 4. SWOT Analysis */}
        <section
          data-tour="5"
          data-tour-title-en="SWOT Analysis"
          data-tour-title-ar="تحليل سوات"
          data-tour-content-en="Strengths, Weaknesses, Opportunities, and Threats overview."
          data-tour-content-ar="نظرة عامة على نقاط القوة والضعف والفرص والتهديدات."
          data-tour-position="bottom"
        >
          <div className={`flex items-center gap-3 mb-6 ${isRTLMode ? 'flex-row-reverse' : ''}`}>
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
              <FiShield className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('strategicPlanning.sections.swotAnalysis')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(swot).map(([category, items], index) => (
              <div key={category} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                  {index === 0 && <FiStar className="w-5 h-5 text-green-500" />}
                  {index === 1 && <FiAlertTriangle className="w-5 h-5 text-red-500" />}
                  {index === 2 && <FiTrendingUp className="w-5 h-5 text-blue-500" />}
                  {index === 3 && <FiShield className="w-5 h-5 text-orange-500" />}
                  {category}
                </h3>
                <ul className="space-y-3">
                  {items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <span className="mt-1 text-gray-400">•</span>
                      <span className="text-gray-700 dark:text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Trend Analysis */}
        <section
          data-tour="6"
          data-tour-title-en="Trend Analysis"
          data-tour-title-ar="تحليل الاتجاهات"
          data-tour-content-en="Analyze trends across enrollment, placements, research funding, and more."
          data-tour-content-ar="حلل الاتجاهات عبر التسجيلات، التوظيف، تمويل البحث، والمزيد."
          data-tour-position="bottom"
        >
          <div className={`flex items-center gap-3 mb-6 ${isRTLMode ? 'flex-row-reverse' : ''}`}>
            <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
              <FiTrendingUp className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('strategicPlanning.sections.trendAnalysis')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trends.map((trend, i) => {
              const data = trend.values.map((value, idx) => ({
                year: trend.years[idx],
                value,
              }));
              return (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                  <h3 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">{trend.label}</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                      <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }} 
                      />
                      <Bar dataKey="value" fill={trend.color} radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}