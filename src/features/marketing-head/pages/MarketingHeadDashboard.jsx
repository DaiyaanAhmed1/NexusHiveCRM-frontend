import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar, Legend
} from "recharts";
import { useTranslation } from 'react-i18next';
import { useLocalization } from '/src/hooks/useLocalization.jsx';
import { FiTarget, FiSearch, FiTrendingUp, FiZap } from 'react-icons/fi';
import MarketingAISearch from '../components/ai/MarketingAISearch';
import MarketingLeadBehaviorAnalysis from '../components/ai/MarketingLeadBehaviorAnalysis';

// Demo data for KPI cards
const getKPIs = (t) => [
  { label: t('kpis.totalQualifiedLeads'), value: 1240, icon: "🎯", color: "bg-blue-100 text-blue-700" },
  { label: t('kpis.conversionRate'), value: "32%", icon: "📈", color: "bg-green-100 text-green-700" },
  { label: t('kpis.activeCampaigns'), value: 8, icon: "📢", color: "bg-purple-100 text-purple-700" },
  { label: t('kpis.teamMembers'), value: 15, icon: "👥", color: "bg-yellow-100 text-yellow-700" },
  { label: t('kpis.roi'), value: "285%", icon: "💰", color: "bg-pink-100 text-pink-700" },
];

// Demo data for charts
const getLeadTrend = (t) => [
  { month: t('months.jan'), [t('charts.leads')]: 200, [t('charts.conversions')]: 60 },
  { month: t('months.feb'), [t('charts.leads')]: 250, [t('charts.conversions')]: 75 },
  { month: t('months.mar'), [t('charts.leads')]: 300, [t('charts.conversions')]: 90 },
  { month: t('months.apr'), [t('charts.leads')]: 350, [t('charts.conversions')]: 105 },
  { month: t('months.may'), [t('charts.leads')]: 400, [t('charts.conversions')]: 120 },
  { month: t('months.jun'), [t('charts.leads')]: 420, [t('charts.conversions')]: 130 },
];

const getCampaignPerformance = (t) => [
  { name: t('charts.socialMedia'), value: 35 },
  { name: t('charts.email'), value: 25 },
  { name: t('charts.events'), value: 20 },
  { name: t('charts.directOutreach'), value: 15 },
  { name: t('charts.other'), value: 5 },
];

const COLORS = ["#6366f1", "#22c55e", "#f59e42", "#eab308", "#a3a3a3"];

export default function MarketingHeadDashboard() {
  const { t, ready, i18n } = useTranslation('dashboard');
  const { isRTLMode } = useLocalization();
  const [languageVersion, setLanguageVersion] = useState(0);
  
  useEffect(() => {
    setLanguageVersion(prev => prev + 1);
  }, [i18n.language]);

  if (!ready) {
    return <div className="flex items-center justify-center min-h-screen">{t('loading')}</div>;
  }

  const user = JSON.parse(localStorage.getItem('rbac_current_user'));
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  
  // AI Features State
  const [showAISearch, setShowAISearch] = useState(false);
  const [showAIInsights, setShowAIInsights] = useState(false);
  const [showLeadBehaviorAnalysis, setShowLeadBehaviorAnalysis] = useState(false);
  const [aiSearchResults, setAiSearchResults] = useState([]);
  const [aiInsights, setAiInsights] = useState(null);
  const [behaviorAnalysis, setBehaviorAnalysis] = useState(null);
  
  // Refs for auto-scroll functionality
  const aiSearchRef = useRef(null);
  const aiInsightsRef = useRef(null);
  const leadBehaviorRef = useRef(null);

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
  const handleShowAISearch = () => {
    setShowAISearch(!showAISearch);
    if (!showAISearch) {
      setTimeout(() => scrollToAISection(aiSearchRef), 100);
    }
  };

  const handleShowAIInsights = () => {
    setShowAIInsights(!showAIInsights);
    if (!showAIInsights) {
      setTimeout(() => scrollToAISection(aiInsightsRef), 100);
    }
  };

  const handleShowLeadBehaviorAnalysis = () => {
    setShowLeadBehaviorAnalysis(!showLeadBehaviorAnalysis);
    if (!showLeadBehaviorAnalysis) {
      setTimeout(() => scrollToAISection(leadBehaviorRef), 100);
    }
  };

  const handleCardClick = (content) => {
    setModalContent(content);
    setShowModal(true);
  };

  const Modal = ({ content, onClose }) => {
    if (!content) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
        <div className="absolute inset-0" onClick={onClose} />
        <div className="relative z-10 bg-white dark:bg-gray-800 rounded-xl p-6 max-w-2xl w-full mx-4">
          <button
            onClick={onClose}
            className="absolute top-2 right-4 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-3xl font-bold"
            aria-label={t('modal.close')}
          >
            &times;
          </button>
          {content}
        </div>
      </div>
    );
  };

  return (
    <div key={`${i18n.language}-${languageVersion}`} className={`flex flex-col gap-8 ${isRTLMode ? 'rtl' : 'ltr'}`}>
      {/* Header Section */}
      <div
        className={`flex flex-col md:flex-row justify-between items-start md:items-center gap-4 ${isRTLMode ? 'flex-row-reverse' : ''}`}
        data-tour="1"
        data-tour-title-en="Marketing Dashboard Overview"
        data-tour-title-ar="نظرة عامة على لوحة تحكم التسويق"
        data-tour-content-en="Launch campaigns, export reports, and view a quick summary."
        data-tour-content-ar="ابدأ الحملات، صدّر التقارير، واعرض ملخصاً سريعاً."
        data-tour-position="bottom"
      >
        <div className={isRTLMode ? 'text-right' : 'text-left'}>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('title')}</h1>
          <p className="text-sm text-gray-600 dark:text-gray-300">{t('welcome')}</p> 
        </div>
        
        <div className={`flex gap-3 ${isRTLMode ? 'flex-row-reverse' : ''}`}>
          {/* AI Features Buttons */}
          <button 
            className={`px-4 py-2 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center gap-2 ${isRTLMode ? 'flex-row-reverse' : ''}`}
            onClick={handleShowAISearch}
          >
            <FiSearch /> 
            {isRTLMode ? 'البحث بالذكاء الاصطناعي' : 'AI Search'}
          </button>
          
          <button 
            className={`px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 ${isRTLMode ? 'flex-row-reverse' : ''}`}
            onClick={handleShowAIInsights}
          >
            <FiZap /> 
            {isRTLMode ? 'رؤى الذكاء الاصطناعي' : 'AI Insights'}
          </button>
          
          <button 
            className={`px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 ${isRTLMode ? 'flex-row-reverse' : ''}`}
            onClick={handleShowLeadBehaviorAnalysis}
          >
            <FiTrendingUp /> 
            {isRTLMode ? 'تحليل سلوك العملاء' : 'Lead Analysis'}
          </button>
          
          {/* Original Buttons */}
          <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            {t('newCampaignLaunch')}
          </button>
          <button className="px-4 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">
            {t('exportReport')}
          </button>
        </div>
      </div>

      {/* AI Search Section */}
      {showAISearch && (
        <section 
          ref={aiSearchRef}
          className="bg-white dark:bg-gray-800 rounded-xl shadow p-6"
          dir={isRTLMode ? 'rtl' : 'ltr'}
        >
          <div className={`flex items-center gap-2 mb-4 ${isRTLMode ? 'flex-row-reverse' : ''}`}>
            <FiSearch className="text-purple-500" />
            <h2 className="text-lg font-semibold">
              {isRTLMode ? 'البحث بالذكاء الاصطناعي' : 'AI Search'}
            </h2>
          </div>
          <MarketingAISearch 
            onSearchResults={(results) => {
              setAiSearchResults(results);
              console.log('AI Search results:', results);
            }}
            onSelectForAIReply={(lead) => {
              console.log('Selected lead for AI reply:', lead);
            }}
          />
        </section>
      )}

      {/* AI Insights Section */}
      {showAIInsights && (
        <section 
          ref={aiInsightsRef}
          className="bg-white dark:bg-gray-800 rounded-xl shadow p-6"
          dir={isRTLMode ? 'rtl' : 'ltr'}
        >
          <div className={`flex items-center gap-2 mb-4 ${isRTLMode ? 'flex-row-reverse' : ''}`}>
            <FiZap className="text-green-500" />
            <h2 className="text-lg font-semibold">
              {isRTLMode ? 'رؤى الذكاء الاصطناعي' : 'AI Insights & Recommendations'}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg">
              <h3 className="font-semibold mb-2">{isRTLMode ? 'توصيات الأداء' : 'Performance Recommendations'}</h3>
              <p className="text-sm text-green-700 dark:text-green-300">
                {isRTLMode ? 
                  'حملة وسائل التواصل الاجتماعي تحقق أفضل أداء. اقترح زيادة الميزانية بنسبة 15%.' : 
                  'Social media campaign performing best. Recommend increasing budget by 15%.'
                }
              </p>
            </div>
            <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
              <h3 className="font-semibold mb-2">{isRTLMode ? 'تحذيرات مبكرة' : 'Early Warnings'}</h3>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                {isRTLMode ? 
                  'معدل التحويل في انخفاض. اقترح مراجعة استراتيجية التسويق.' : 
                  'Conversion rate declining. Suggest reviewing marketing strategy.'
                }
              </p>
            </div>
            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg">
              <h3 className="font-semibold mb-2">{isRTLMode ? 'فرص جديدة' : 'New Opportunities'}</h3>
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                {isRTLMode ? 
                  'سوق جديد مفتوح في المنطقة الشرقية. اقترح حملة مستهدفة.' : 
                  'New market opening in Eastern Region. Suggest targeted campaign.'
                }
              </p>
            </div>
            <div className="p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
              <h3 className="font-semibold mb-2">{isRTLMode ? 'تحسينات الفريق' : 'Team Improvements'}</h3>
              <p className="text-sm text-purple-700 dark:text-purple-300">
                {isRTLMode ? 
                  'فريق التسويق يحتاج تدريب إضافي على أدوات الذكاء الاصطناعي.' : 
                  'Marketing team needs additional training on AI tools.'
                }
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Lead Behavior Analysis Section */}
      {showLeadBehaviorAnalysis && (
        <section 
          ref={leadBehaviorRef}
          className="bg-white dark:bg-gray-800 rounded-xl shadow p-6"
          dir={isRTLMode ? 'rtl' : 'ltr'}
        >
          <div className={`flex items-center gap-2 mb-4 ${isRTLMode ? 'flex-row-reverse' : ''}`}>
            <FiTrendingUp className="text-blue-500" />
            <h2 className="text-lg font-semibold">
              {isRTLMode ? 'تحليل سلوك العملاء المحتملين' : 'Lead Behavior Analysis'}
            </h2>
          </div>
          <MarketingLeadBehaviorAnalysis 
            leads={[]} // Pass actual leads data here
            onAnalysisComplete={(analysis) => {
              setBehaviorAnalysis(analysis);
              console.log('Lead behavior analysis completed:', analysis);
            }}
          />
        </section>
      )}

      {/* KPI Cards */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4"
        data-tour="2"
        data-tour-title-en="KPI Summary"
        data-tour-title-ar="ملخص مؤشرات الأداء"
        data-tour-content-en="Track qualified leads, conversion rate, active campaigns, team size, and ROI."
        data-tour-content-ar="تتبع العملاء المحتملين المؤهلين، معدل التحويل، الحملات النشطة، حجم الفريق، والعائد على الاستثمار."
        data-tour-position="bottom"
      >
        {getKPIs(t).map((kpi, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`${kpi.color} p-4 rounded-xl shadow-sm`}
          >
            <div className="flex items-center justify-between">
              <span className="text-2xl">{kpi.icon}</span>
              <span className="text-2xl font-bold">{kpi.value}</span>
            </div>
            <p className="text-sm mt-2">{kpi.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        data-tour="3"
        data-tour-title-en="Analytics Charts"
        data-tour-title-ar="مخططات التحليلات"
        data-tour-content-en="Analyze lead trends and marketing channel performance."
        data-tour-content-ar="حلّل اتجاهات العملاء وأداء قنوات التسويق."
        data-tour-position="bottom"
      >
        {/* Lead Trend Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">{t('charts.leadGenerationActionable')}</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={getLeadTrend(t)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey={t('charts.leads')} stroke="#6366f1" />
                <Line type="monotone" dataKey={t('charts.conversions')} stroke="#22c55e" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Campaign Performance Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">{t('charts.marketingChannelPerformance')}</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={getCampaignPerformance(t)}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {getCampaignPerformance(t).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity and Tasks */}
      <div
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        data-tour="4"
        data-tour-title-en="Activity & Follow-ups"
        data-tour-title-ar="النشاط والمتابعات"
        data-tour-content-en="Keep track of team activity and upcoming follow-ups."
        data-tour-content-ar="تابع نشاط الفريق والمتابعات القادمة."
        data-tour-position="bottom"
      >
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">{t('activityLog.title')}</h2>
          <div className="space-y-4">
            {[
              { action: t('activityLog.newLeadAdded'), time: t('activityLog.twoHoursAgo'), user: t('users.saraKhalid') },
              { action: t('activityLog.marketingInitiativeDeployed'), time: t('activityLog.fiveHoursAgo'), user: t('users.janeSmith') },
              { action: t('activityLog.performanceReportCreated'), time: t('activityLog.oneDayAgo'), user: t('users.mikeJohnson') },
            ].map((activity, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.time} {t('activityLog.byUser', { user: activity.user })}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">{t('upcomingFollowUps.title')}</h2>
          <div className="space-y-4">
            {[
              { task: t('upcomingFollowUps.evaluateMidYearMarketing'), due: t('upcomingFollowUps.june15') },
              { task: t('upcomingFollowUps.teamPerformanceReview'), due: t('upcomingFollowUps.june16') },
              { task: t('upcomingFollowUps.budgetPlanningMeeting'), due: t('upcomingFollowUps.june17') },
            ].map((task, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <input type="checkbox" className="rounded text-blue-600" />
                  <span className="text-sm">{task.task}</span>
                </div>
                <span className="text-xs text-gray-500">{task.due}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showModal && <Modal content={modalContent} onClose={() => setShowModal(false)} />}
    </div>
  );
}