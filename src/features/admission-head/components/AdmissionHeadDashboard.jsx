import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  FiUsers, FiCalendar, FiDollarSign, FiFileText, FiCheckCircle, 
  FiAlertCircle, FiTrendingUp, FiTrendingDown, FiBarChart2, 
  FiPieChart, FiMap, FiFilter, FiDownload, FiBell, FiClock,
  FiUserCheck, FiUserX, FiPercent, FiTarget, FiGlobe, FiBook
} from 'react-icons/fi';

// Demo data for admission funnel
const getAdmissionFunnel = (t) => [
  { label: t('dashboard.admissionFunnel.stages.totalInquiries'), value: 5000, change: "+12%", trend: "up", icon: <FiUsers />, color: "blue" },
  { label: t('dashboard.admissionFunnel.stages.applicationsStarted'), value: 2500, change: "+8%", trend: "up", icon: <FiFileText />, color: "purple" },
  { label: t('dashboard.admissionFunnel.stages.applicationsSubmitted'), value: 1800, change: "+5%", trend: "up", icon: <FiCheckCircle />, color: "green" },
  { label: t('dashboard.admissionFunnel.stages.applicationsApproved'), value: 1200, change: "+15%", trend: "up", icon: <FiUserCheck />, color: "emerald" },
  { label: t('dashboard.admissionFunnel.stages.offersSent'), value: 1000, change: "+10%", trend: "up", icon: <FiTarget />, color: "amber" },
  { label: t('dashboard.admissionFunnel.stages.admissionsConfirmed'), value: 800, change: "+20%", trend: "up", icon: <FiUserCheck />, color: "teal" },
  { label: t('dashboard.admissionFunnel.stages.enrolledStudents'), value: 750, change: "+18%", trend: "up", icon: <FiUsers />, color: "indigo" },
];

// Demo data for lead sources
const getLeadSources = (t) => [
  { source: "Google Ads", conversions: 35, clicks: 1000, applications: 350, trend: "+15%" },
  { source: "Facebook", conversions: 28, clicks: 800, applications: 224, trend: "+8%" },
  { source: "Education Fairs", conversions: 42, clicks: 500, applications: 210, trend: "+25%" },
  { source: "Referrals", conversions: 45, clicks: 400, applications: 180, trend: "+12%" },
];

// Demo data for department status
const departmentStatus = [
  { 
    department: "Engineering", 
    totalSeats: 500, 
    applications: 1200, 
    filled: 450, 
    waitlisted: 50, 
    dropouts: 20,
    fillRate: 90
  },
  { 
    department: "Business", 
    totalSeats: 300, 
    applications: 800, 
    filled: 280, 
    waitlisted: 30, 
    dropouts: 15,
    fillRate: 93
  },
  { 
    department: "Arts", 
    totalSeats: 200, 
    applications: 600, 
    filled: 180, 
    waitlisted: 20, 
    dropouts: 10,
    fillRate: 90
  },
];

// Demo data for demographics
const getDemographics = (t) => ({
  regions: [
    { region: t('dashboard.demographics.regions.north'), percentage: 35 },
    { region: t('dashboard.demographics.regions.south'), percentage: 25 },
    { region: t('dashboard.demographics.regions.east'), percentage: 20 },
    { region: t('dashboard.demographics.regions.west'), percentage: 20 },
  ],
  gender: [
    { type: t('dashboard.demographics.gender.male'), percentage: 55 },
    { type: t('dashboard.demographics.gender.female'), percentage: 45 },
  ],
  ageGroups: [
    { range: t('dashboard.demographics.ageGroups.age18to20'), percentage: 45 },
    { range: t('dashboard.demographics.ageGroups.age21to23'), percentage: 35 },
    { range: t('dashboard.demographics.ageGroups.age24plus'), percentage: 20 },
  ],
});

// Demo data for pending actions
const getPendingActions = (t) => [
  { type: "Application Review", count: 45, priority: "high" },
  { type: "Campaign Approval", count: 3, priority: "medium" },
  { type: "Overbooking Alert", count: 2, priority: "high" },
  { type: "Policy Review", count: 1, priority: "low" },
];

// Demo data for alerts
const getAlerts = (t) => [
  { type: t('dashboard.alerts.applicationSpike'), message: "Unusual increase in applications from Telangana region", severity: "info" },
  { type: t('dashboard.alerts.capacityAlert'), message: "Law Department admissions nearing capacity", severity: "warning" },
  { type: t('dashboard.alerts.systemNotice'), message: "New admission policy update from Director", severity: "info" },
];

export default function AdmissionHeadDashboard() {
  const { t, i18n, ready } = useTranslation(['admission', 'common']);
  const user = JSON.parse(localStorage.getItem('rbac_current_user'));
  const [expanded, setExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [timeRange, setTimeRange] = useState("current");
  const [languageVersion, setLanguageVersion] = useState(0);

  useEffect(() => {
    const handleLanguageChange = () => {
      setLanguageVersion(prev => prev + 1);
    };

    i18n.on('languageChanged', handleLanguageChange);
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n]);

  if (!ready) {
    return <div className="flex items-center justify-center h-64">{t('common.loading')}</div>;
  }

  return (
    <div key={`${i18n.language}-${languageVersion}`} className="flex flex-col gap-6 animate-fade-in bg-transparent dark:bg-transparent" data-tour="1" data-tour-title-en="Dashboard Overview" data-tour-title-ar="نظرة عامة على لوحة التحكم" data-tour-content-en="Filters, KPIs, and quick actions for admissions." data-tour-content-ar="مرشحات ومؤشرات وإجراءات سريعة للقبول.">
      {/* Header with Filters */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-2 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50/60 to-purple-50/40 dark:from-gray-900 dark:to-gray-800 rounded-xl px-4 py-6" data-tour="2" data-tour-title-en="Header & Filters" data-tour-title-ar="الرأس والمرشحات" data-tour-content-en="Change department, time range, or export data." data-tour-content-ar="غيّر القسم، النطاق الزمني، أو صدّر البيانات.">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('dashboard.title')}</h1>
          <p className="text-sm text-gray-600 dark:text-gray-300">{t('dashboard.subtitle')}</p>
        </div>
        <div className="flex gap-4">
          <select 
            className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-gray-100"
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
          >
            <option value="all">{t('dashboard.filters.allDepartments')}</option>
            <option value="engineering">{t('dashboard.filters.engineering')}</option>
            <option value="business">{t('dashboard.filters.business')}</option>
            <option value="arts">{t('dashboard.filters.arts')}</option>
          </select>
          <select 
            className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-gray-100"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="current" className="text-gray-700 dark:text-gray-200">{t('dashboard.filters.currentCycle')}</option>
            <option value="last" className="text-gray-700 dark:text-gray-200">{t('dashboard.filters.lastCycle')}</option>
            <option value="yoy" className="text-gray-700 dark:text-gray-200">{t('dashboard.filters.yearOverYear')}</option>
          </select>
          <button className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100">
            <FiDownload className="text-gray-500 dark:text-gray-400" />
            {t('dashboard.filters.export')}
          </button>
        </div>
      </div>

      {/* Admission Funnel */}
      <section className="bg-gray-50 dark:bg-gray-800/80 dark:!bg-gray-800/80 rounded-xl shadow p-6" data-tour="3" data-tour-title-en="Admission Funnel" data-tour-title-ar="قمع القبول" data-tour-content-en="Track progress from inquiries to enrollments." data-tour-content-ar="تابع التقدم من الاستفسارات إلى التسجيل.">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <FiBarChart2 className="text-blue-500" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{t('dashboard.admissionFunnel.title')}</h2>
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400">{t('dashboard.admissionFunnel.comparison')}</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
          {getAdmissionFunnel(t).map((stage, index) => (
            <motion.div
              key={stage.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`p-2 rounded-lg bg-${stage.color}-100 dark:bg-${stage.color}-900/20`}>
                  {stage.icon}
                </div>
                <span className={`text-sm font-medium ${stage.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                  {stage.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{stage.value.toLocaleString()}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{stage.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Lead Sources and Department Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lead Sources */}
        <section className="bg-gray-50 dark:bg-gray-800/80 dark:!bg-gray-800/80 rounded-xl shadow p-6" data-tour="4" data-tour-title-en="Lead Sources" data-tour-title-ar="مصادر العملاء" data-tour-content-en="Top-performing channels and conversion trends." data-tour-content-ar="أفضل القنوات واتجاهات التحويل.">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <FiPieChart className="text-purple-500" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{t('dashboard.leadSources.title')}</h2>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">{t('dashboard.leadSources.period')}</span>
          </div>
          <div className="space-y-4">
            {getLeadSources(t).map((source) => (
              <div key={source.source} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">{source.source}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {source.conversions}% {t('dashboard.leadSources.conversionRate')}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {source.applications} {t('dashboard.leadSources.applications')}
                  </p>
                  <p className={`text-sm ${source.trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                    {source.trend} {t('dashboard.leadSources.vsLastMonth')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Department Status */}
        <section className="bg-gray-50 dark:bg-gray-800/80 dark:!bg-gray-800/80 rounded-xl shadow p-6" data-tour="5" data-tour-title-en="Department Status" data-tour-title-ar="حالة الأقسام" data-tour-content-en="Capacity, applications, fill rate, and waitlist by department." data-tour-content-ar="الطاقة الاستيعابية والطلبات ومعدل الملء وقوائم الانتظار حسب القسم.">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <FiTarget className="text-green-500" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{t('dashboard.departmentStatus.title')}</h2>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">{t('dashboard.departmentStatus.currentCycle')}</span>
          </div>
          <div className="space-y-4">
            {departmentStatus.map((dept) => (
              <div key={dept.department} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900 dark:text-white">{dept.department}</h3>
                  <span className={`text-sm font-medium ${dept.fillRate >= 90 ? 'text-green-500' : 'text-yellow-500'}`}>
                    {dept.fillRate}% {t('dashboard.departmentStatus.fillRate')}
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2 text-sm">
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">{t('dashboard.departmentStatus.totalSeats')}</p>
                    <p className="font-medium text-gray-900 dark:text-white">{dept.totalSeats}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">{t('dashboard.departmentStatus.applications')}</p>
                    <p className="font-medium text-gray-900 dark:text-white">{dept.applications}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">{t('dashboard.departmentStatus.filled')}</p>
                    <p className="font-medium text-gray-900 dark:text-white">{dept.filled}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">{t('dashboard.departmentStatus.waitlisted')}</p>
                    <p className="font-medium text-gray-900 dark:text-white">{dept.waitlisted}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Demographics and Pending Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Demographics */}
        <section className="bg-gray-50 dark:bg-gray-800/80 dark:!bg-gray-800/80 rounded-xl shadow p-6" data-tour="6" data-tour-title-en="Demographics" data-tour-title-ar="التركيبة السكانية" data-tour-content-en="Regional, gender, and age distributions." data-tour-content-ar="التوزيع الإقليمي والجنس والعمر.">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <FiGlobe className="text-blue-500" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{t('dashboard.demographics.title')}</h2>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">{t('dashboard.demographics.currentApplicants')}</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">{t('dashboard.demographics.regionalDistribution')}</h3>
              {getDemographics(t).regions.map((region) => (
                <div key={region.region} className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-300">{region.region}</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{region.percentage}%</span>
                </div>
              ))}
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">{t('dashboard.demographics.genderRatio')}</h3>
              {getDemographics(t).gender.map((item) => (
                <div key={item.type} className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-300">{item.type}</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{item.percentage}%</span>
                </div>
              ))}
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">{t('dashboard.demographics.ageDistribution')}</h3>
              {getDemographics(t).ageGroups.map((group) => (
                <div key={group.range} className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-300">{group.range}</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{group.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pending Actions & Alerts */}
        <section className="bg-gray-50 dark:bg-gray-800/80 dark:!bg-gray-800/80 rounded-xl shadow p-6" data-tour="7" data-tour-title-en="Pending Actions & Alerts" data-tour-title-ar="الإجراءات المعلقة والتنبيهات" data-tour-content-en="Items requiring attention and system alerts." data-tour-content-ar="عناصر تتطلب الانتباه وتنبيهات النظام.">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <FiBell className="text-red-500" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{t('dashboard.pendingActions.title')}</h2>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">{t('dashboard.pendingActions.requiresAttention')}</span>
          </div>
          <div className="space-y-4">
            {getPendingActions(t).map((action) => (
              <div key={action.type} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    action.priority === 'high' ? 'bg-red-100 text-red-500' :
                    action.priority === 'medium' ? 'bg-yellow-100 text-yellow-500' :
                    'bg-blue-100 text-blue-500'
                  }`}>
                    <FiAlertCircle />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{action.type}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {action.count} {t('dashboard.pendingActions.itemsPending')}
                    </p>
                  </div>
                </div>
                <button className="text-sm text-blue-500 hover:text-blue-600">{t('dashboard.pendingActions.viewDetails')}</button>
              </div>
            ))}
            {getAlerts(t).map((alert, index) => (
              <div key={index} className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div className={`p-2 rounded-lg ${
                  alert.severity === 'warning' ? 'bg-yellow-100 text-yellow-500' :
                  'bg-blue-100 text-blue-500'
                }`}>
                  <FiBell />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">{alert.type}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{alert.message}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* AI Insights Panel */}
      <section className="bg-gradient-to-r from-purple-50/60 to-blue-50/40 dark:from-gray-900 dark:to-gray-800 rounded-xl shadow p-6" data-tour="8" data-tour-title-en="AI Insights" data-tour-title-ar="رؤى الذكاء الاصطناعي" data-tour-content-en="Forecasts, alerts, and planning recommendations." data-tour-content-ar="توقعات وتنبيهات وتوصيات التخطيط.">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <FiBook className="text-purple-500" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{t('dashboard.aiInsights.title')}</h2>
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400">{t('dashboard.aiInsights.updatedDaily')}</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50/50 dark:bg-gray-800/50 rounded-lg backdrop-blur-sm">
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">{t('dashboard.aiInsights.enrollmentForecast')}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {t('dashboard.aiInsights.forecastText')} <span className="font-medium text-green-500">+15%</span>
            </p>
          </div>
          <div className="p-4 bg-gray-50/50 dark:bg-gray-800/50 rounded-lg backdrop-blur-sm">
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">{t('dashboard.aiInsights.departmentAlert')}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {t('dashboard.aiInsights.alertText')} <span className="font-medium text-red-500">15%</span> this year
            </p>
          </div>
          <div className="p-4 bg-gray-50/50 dark:bg-gray-800/50 rounded-lg backdrop-blur-sm">
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">{t('dashboard.aiInsights.resourcePlanning')}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {t('dashboard.aiInsights.planningText')} <span className="font-medium text-yellow-500">90%</span>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
} 