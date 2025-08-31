import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, Legend, AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import { directorFeatures } from './directorFeatures';
import DirectorAnalyticsReports from '../features/director/components/DirectorAnalyticsReports';
import DirectorDepartments from '../features/director/components/DirectorDepartments';
import DirectorApprovalCenter from '../features/director/components/DirectorApprovalCenter';
import DirectorStrategicPlanning from '../features/director/components/DirectorStrategicPlanning';
import DirectorAuditCompliance from '../features/director/components/DirectorAuditCompliance';
import DirectorMeetingsCalendar from '../features/director/components/DirectorMeetingsCalendar';
import DirectorUserManagement from '../features/director/components/DirectorUserManagement';
import DirectorCommunicationHub from '../features/director/components/DirectorCommunicationHub';

const features = [
  { label: "Dashboard", icon: "📊", route: "/rbac/director", description: "University Performance Overview, KPI Summary, Alerts & Notices" },
  { label: "Analytics & Reports", icon: "📈", route: "/rbac/director/analytics", description: "Department-wise Reports, Statistics, Finance, Trends, HR Insights" },
  { label: "Departments", icon: "🏢", route: "/rbac/director/departments", description: "Academic Affairs, HR, Finance, Admissions, IT, R&D" },
  { label: "Approval Center", icon: "✅", route: "/rbac/director/approvals", description: "Budget, Policy, Recruitment, Procurement Approvals" },
  { label: "Strategic Planning", icon: "🗺️", route: "/rbac/director/strategic-planning", description: "Annual Plans, Accreditation, Risk Management" },
  { label: "Communication", icon: "📢", route: "/rbac/director/communication", description: "Notices, Circulars, External Comms" },
  { label: "Audit & Compliance", icon: "🕵️", route: "/rbac/director/audit", description: "Audit Reports, Accreditation, Legal Docs" },
  { label: "Meetings & Calendar", icon: "🗓️", route: "/rbac/director/calendar", description: "Scheduler, Minutes, Events" },
  { label: "User Management", icon: "👥", route: "/rbac/director/users", description: "Roles, Permissions, Admin Controls" },
  { label: "Settings", icon: "⚙️", route: "/rbac/director/settings", description: "Profile, Branding, Notifications" },
  { label: "Help & Support", icon: "🆘", route: "/rbac/director/support", description: "Technical Support, Handbook" },
  { label: "Communication Hub", icon: "💬", route: "/rbac/director/comm-hub", description: "Internal Communication Hub" },
  { label: "Training & Development", icon: "🎓", route: "/rbac/director/training", description: "Team Training, Knowledge Mgmt" },
  { label: "Compliance & Quality", icon: "🏅", route: "/rbac/director/compliance", description: "Quality Assurance, Risk Mgmt" },
  { label: "Account Management", icon: "👤", route: "/rbac/director/account", description: "Profile, HR Board, Tasks, Events, Attendance, Recruitment, HelpDesk, Geo-fencing" },
  { label: "Support Tickets", icon: "🎫", route: "/rbac/director/tickets", description: "My Tickets, Raise a Ticket" },
  { label: "Help / Documentation", icon: "📖", route: "/rbac/director/help", description: "Help, Documentation" },
];

// Demo data for KPI cards - will be generated dynamically with translations

// Demo data for charts
const admissionsTrend = [
  { month: "Jan", Applications: 200, Admitted: 120 },
  { month: "Feb", Applications: 250, Admitted: 140 },
  { month: "Mar", Applications: 300, Admitted: 180 },
  { month: "Apr", Applications: 350, Admitted: 200 },
  { month: "May", Applications: 400, Admitted: 220 },
  { month: "Jun", Applications: 420, Admitted: 240 },
];
const financeData = [
  { name: "Academics", value: 40 },
  { name: "HR", value: 20 },
  { name: "Infra", value: 15 },
  { name: "R&D", value: 10 },
  { name: "Other", value: 15 },
];
const COLORS = ["#6366f1", "#22c55e", "#f59e42", "#eab308", "#a3a3a3"];
const deptPerformance = [
  { dept: "Academics", KPI: 85 },
  { dept: "HR", KPI: 78 },
  { dept: "Finance", KPI: 90 },
  { dept: "Admissions", KPI: 82 },
  { dept: "IT", KPI: 75 },
  { dept: "R&D", KPI: 88 },
];

// Slim, colorful summary cards data - will be generated dynamically with translations

// Academic Insights demo data
const academicTrends = [
  { year: '2019', Enrolled: 11000, Graduated: 9500 },
  { year: '2020', Enrolled: 11500, Graduated: 9800 },
  { year: '2021', Enrolled: 12000, Graduated: 10200 },
  { year: '2022', Enrolled: 12200, Graduated: 11000 },
  { year: '2023', Enrolled: 12400, Graduated: 11500 },
];
const deptLeaderboard = [
  { dept: 'Engineering', GPA: 8.7 },
  { dept: 'Science', GPA: 8.5 },
  { dept: 'Business', GPA: 8.3 },
  { dept: 'Arts', GPA: 8.1 },
  { dept: 'Law', GPA: 7.9 },
];
// Financial Overview demo data
const monthlyFees = [
  { month: 'Jan', Fees: 120000 },
  { month: 'Feb', Fees: 130000 },
  { month: 'Mar', Fees: 140000 },
  { month: 'Apr', Fees: 135000 },
  { month: 'May', Fees: 150000 },
  { month: 'Jun', Fees: 155000 },
];
const budgetUsage = [
  { dept: 'Engineering', budget: 500000, used: 420000 },
  { dept: 'Science', budget: 300000, used: 250000 },
  { dept: 'Business', budget: 200000, used: 180000 },
  { dept: 'Arts', budget: 150000, used: 120000 },
];
// HR & Staff Analytics demo data
const staffTypes = [
  { year: '2019', Teaching: 400, NonTeaching: 200, Contract: 50 },
  { year: '2020', Teaching: 420, NonTeaching: 210, Contract: 60 },
  { year: '2021', Teaching: 430, NonTeaching: 220, Contract: 70 },
  { year: '2022', Teaching: 440, NonTeaching: 230, Contract: 80 },
  { year: '2023', Teaching: 450, NonTeaching: 240, Contract: 90 },
];
const attritionTrend = [
  { year: '2019', Attrition: 4.2 },
  { year: '2020', Attrition: 4.5 },
  { year: '2021', Attrition: 4.1 },
  { year: '2022', Attrition: 3.8 },
  { year: '2023', Attrition: 3.5 },
];
// Alerts & Notifications demo data - will be generated dynamically with translations

// Predictive Admission Forecast demo data
const forecastData = [
  { month: 'Jan', Actual: 200, Forecast: 210 },
  { month: 'Feb', Actual: 250, Forecast: 260 },
  { month: 'Mar', Actual: 300, Forecast: 320 },
  { month: 'Apr', Actual: 350, Forecast: 370 },
  { month: 'May', Actual: 400, Forecast: 420 },
  { month: 'Jun', Actual: 420, Forecast: 440 },
  { month: 'Jul', Actual: null, Forecast: 470 },
  { month: 'Aug', Actual: null, Forecast: 500 },
];

// Dropout Risk Forecast demo data
const dropoutForecast = [
  { semester: '2022-Fall', Actual: 3.8, Forecast: 3.8 },
  { semester: '2023-Spring', Actual: 3.5, Forecast: 3.5 },
  { semester: '2023-Fall', Actual: null, Forecast: 3.3 },
  { semester: '2024-Spring', Actual: null, Forecast: 3.1 },
  { semester: '2024-Fall', Actual: null, Forecast: 3.0 },
];
// Financial Surplus/Deficit Forecast demo data
const surplusForecast = [
  { month: 'Mar', Actual: 12000, Forecast: 12000 },
  { month: 'Apr', Actual: 15000, Forecast: 15000 },
  { month: 'May', Actual: null, Forecast: 18000 },
  { month: 'Jun', Actual: null, Forecast: 17000 },
  { month: 'Jul', Actual: null, Forecast: 16500 },
  { month: 'Aug', Actual: null, Forecast: 16000 },
];

// Add new chart modal cases
const leadConversionData = [
  { month: 'Jan', Rate: 24 },
  { month: 'Feb', Rate: 25 },
  { month: 'Mar', Rate: 26 },
  { month: 'Apr', Rate: 27 },
  { month: 'May', Rate: 28 },
  { month: 'Jun', Rate: 29 },
];

const applicationFeeData = [
  { month: 'Jan', Revenue: 100000, Waivers: 10000 },
  { month: 'Feb', Revenue: 105000, Waivers: 10500 },
  { month: 'Mar', Revenue: 110000, Waivers: 11000 },
  { month: 'Apr', Revenue: 115000, Waivers: 11500 },
  { month: 'May', Revenue: 120000, Waivers: 12000 },
  { month: 'Jun', Revenue: 125000, Waivers: 12500 },
];

const deptRevenueData = [
  { dept: 'Academics', Revenue: 500000, Projected: 550000 },
  { dept: 'HR', Revenue: 200000, Projected: 220000 },
  { dept: 'Finance', Revenue: 150000, Projected: 165000 },
  { dept: 'Admissions', Revenue: 300000, Projected: 330000 },
  { dept: 'IT', Revenue: 100000, Projected: 110000 },
  { dept: 'R&D', Revenue: 100000, Projected: 115000 },
];

const subjectProfitData = [
  { subject: 'Computer Science', Profit: 100000 },
  { subject: 'Business', Profit: 75000 },
  { subject: 'Engineering', Profit: 120000 },
  { subject: 'Arts', Profit: 50000 },
];

const studentDemographicsData = {
  regions: [
    { name: 'North', value: 35 },
    { name: 'South', value: 25 },
    { name: 'East', value: 20 },
    { name: 'West', value: 20 },
  ],
  ageGroups: [
    { name: '18-20', value: 45 },
    { name: '21-25', value: 30 },
    { name: '26-30', value: 15 },
    { name: '31-35', value: 10 },
  ],
};

export default function DirectorDashboard() {
  const { t, ready } = useTranslation('director');
  const user = JSON.parse(localStorage.getItem('rbac_current_user'));
  const [modalCard, setModalCard] = useState(null);
  const [modalChart, setModalChart] = useState(null);

  if (!ready) {
    return <div className="flex min-h-screen bg-[#F6F7FA] dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 items-center justify-center">
      <div className="text-lg text-gray-600 dark:text-gray-300">Loading...</div>
    </div>;
  }

  // Generate translated features array
  const features = [
    { label: t('dashboard.features.dashboard'), icon: "📊", route: "/rbac/director", description: t('dashboard.featureDescriptions.dashboard') },
    { label: t('dashboard.features.analyticsReports'), icon: "📈", route: "/rbac/director/analytics", description: t('dashboard.featureDescriptions.analyticsReports') },
    { label: t('dashboard.features.departments'), icon: "🏢", route: "/rbac/director/departments", description: t('dashboard.featureDescriptions.departments') },
    { label: t('dashboard.features.approvalCenter'), icon: "✅", route: "/rbac/director/approvals", description: t('dashboard.featureDescriptions.approvalCenter') },
    { label: t('dashboard.features.strategicPlanning'), icon: "🗺️", route: "/rbac/director/strategic-planning", description: t('dashboard.featureDescriptions.strategicPlanning') },
    { label: t('dashboard.features.communication'), icon: "📢", route: "/rbac/director/communication", description: t('dashboard.featureDescriptions.communication') },
    { label: t('dashboard.features.auditCompliance'), icon: "🕵️", route: "/rbac/director/audit", description: t('dashboard.featureDescriptions.auditCompliance') },
    { label: t('dashboard.features.meetingsCalendar'), icon: "🗓️", route: "/rbac/director/calendar", description: t('dashboard.featureDescriptions.meetingsCalendar') },
    { label: t('dashboard.features.userManagement'), icon: "👥", route: "/rbac/director/users", description: t('dashboard.featureDescriptions.userManagement') },
    { label: t('dashboard.features.settings'), icon: "⚙️", route: "/rbac/director/settings", description: t('dashboard.featureDescriptions.settings') },
    { label: t('dashboard.features.helpSupport'), icon: "🆘", route: "/rbac/director/support", description: t('dashboard.featureDescriptions.helpSupport') },
    { label: t('dashboard.features.communicationHub'), icon: "💬", route: "/rbac/director/comm-hub", description: t('dashboard.featureDescriptions.communicationHub') },
    { label: t('dashboard.features.trainingDevelopment'), icon: "🎓", route: "/rbac/director/training", description: t('dashboard.featureDescriptions.trainingDevelopment') },
    { label: t('dashboard.features.complianceQuality'), icon: "🏅", route: "/rbac/director/compliance", description: t('dashboard.featureDescriptions.complianceQuality') },
    { label: t('dashboard.features.accountManagement'), icon: "👤", route: "/rbac/director/account", description: t('dashboard.featureDescriptions.accountManagement') },
    { label: t('dashboard.features.supportTickets'), icon: "🎫", route: "/rbac/director/tickets", description: t('dashboard.featureDescriptions.supportTickets') },
    { label: t('dashboard.features.helpDocumentation'), icon: "📖", route: "/rbac/director/help", description: t('dashboard.featureDescriptions.helpDocumentation') },
  ];

  // Generate translated KPI cards
  const kpis = [
    { label: t('dashboard.kpis.admissions'), value: 1240, icon: "🎓", color: "bg-blue-100 text-blue-700" },
    { label: t('dashboard.kpis.finance'), value: 98500, icon: "💰", color: "bg-green-100 text-green-700" },
    { label: t('dashboard.kpis.hr'), value: 210, icon: "👥", color: "bg-purple-100 text-purple-700" },
    { label: t('dashboard.kpis.academics'), value: 8.2, icon: "📚", color: "bg-yellow-100 text-yellow-700" },
    { label: t('dashboard.kpis.attendance'), value: 92, icon: "📅", color: "bg-pink-100 text-pink-700" },
  ];

  // Generate translated summary cards
  const summaryCards = [
    {
      label: t('dashboard.summaryCards.totalStudents'),
      value: 12400,
      icon: "👨‍🎓",
      color: "from-blue-400 to-blue-600",
      trend: "+2.5%",
      trendColor: "text-green-500",
      sub: t('dashboard.summaryCards.changeFromLastMonth'),
      spark: [11000, 11200, 11500, 12000, 12200, 12400],
      sparkColor: { light: "#3b82f6", dark: "#fff" }
    },
    {
      label: t('dashboard.summaryCards.totalFacultyStaff'),
      value: 890,
      icon: "👩‍🏫",
      color: "from-purple-400 to-purple-600",
      trend: "+1.2%",
      trendColor: "text-green-500",
      sub: `${t('dashboard.summaryCards.vacancy')}: 12`,
      spark: [850, 860, 870, 880, 885, 890],
      sparkColor: { light: "#a78bfa", dark: "#fff" }
    },
    {
      label: t('dashboard.summaryCards.collegesDepartments'),
      value: 18,
      icon: "🏫",
      color: "from-pink-400 to-pink-600",
      trend: "+1",
      trendColor: "text-green-500",
      sub: t('dashboard.summaryCards.newThisYear'),
      spark: [15, 15, 16, 16, 17, 18],
      sparkColor: { light: "#ec4899", dark: "#fff" }
    },
    {
      label: t('dashboard.summaryCards.coursesOffered'),
      value: 320,
      icon: "📚",
      color: "from-yellow-400 to-yellow-600",
      trend: "+8",
      trendColor: "text-green-500",
      sub: t('dashboard.summaryCards.addedThisYear'),
      spark: [290, 295, 300, 310, 315, 320],
      sparkColor: { light: "#facc15", dark: "#fff" }
    },
    {
      label: t('dashboard.summaryCards.vehiclesRunning'),
      value: 42,
      icon: "🚌",
      color: "from-green-400 to-green-600",
      trend: "-1",
      trendColor: "text-red-500",
      sub: t('dashboard.summaryCards.routesActive'),
      spark: [40, 41, 43, 44, 43, 42],
      sparkColor: { light: "#22c55e", dark: "#fff" }
    },
    {
      label: t('dashboard.summaryCards.upcomingEvents'),
      value: 7,
      icon: "📅",
      color: "from-orange-400 to-orange-600",
      trend: "",
      trendColor: "",
      sub: t('dashboard.summaryCards.next7Days'),
      spark: [3, 4, 5, 6, 7, 7],
      sparkColor: { light: "#fb923c", dark: "#fff" }
    },
  ];

  // Generate translated alerts
  const alerts = [
    { icon: '🚨', text: t('dashboard.alerts.pendingBudgetApprovals'), color: 'text-red-500' },
    { icon: '⚠️', text: t('dashboard.alerts.complianceAlert'), color: 'text-yellow-500' },
    { icon: '⏳', text: t('dashboard.alerts.upcomingExamDeadline'), color: 'text-blue-500' },
    { icon: '💬', text: t('dashboard.alerts.newFeedbackStudents'), color: 'text-green-500' },
  ];

  // Modal content generator
  const renderModalContent = (card) => {
    if (!card) return null;
    // Example extra details for each card type
    let extraDetails = null;
    let insight = null;
    if (card.label.includes('Student')) {
      extraDetails = (
        <table className="w-full text-sm mb-2">
          <tbody>
            <tr><td className="font-medium">Undergraduates</td><td className="text-right">8,200</td></tr>
            <tr><td className="font-medium">Postgraduates</td><td className="text-right">3,100</td></tr>
            <tr><td className="font-medium">International</td><td className="text-right">1,100</td></tr>
          </tbody>
        </table>
      );
      insight = <div className="text-xs text-blue-600 dark:text-blue-300 mb-2">Steady growth in student population, with a 2.5% increase this month. International student ratio is 8.9%.</div>;
    } else if (card.label.includes('Faculty') || card.label.includes('Staff')) {
      extraDetails = (
        <table className="w-full text-sm mb-2">
          <tbody>
            <tr><td className="font-medium">Teaching</td><td className="text-right">650</td></tr>
            <tr><td className="font-medium">Non-Teaching</td><td className="text-right">200</td></tr>
            <tr><td className="font-medium">Contractual</td><td className="text-right">40</td></tr>
          </tbody>
        </table>
      );
      insight = <div className="text-xs text-purple-600 dark:text-purple-300 mb-2">Vacancy rate is low. Recruitment drive ongoing for 12 open positions.</div>;
    } else if (card.label.includes('Colleges')) {
      extraDetails = (
        <ul className="text-sm mb-2 list-disc ml-5">
          <li>New: School of Data Science</li>
          <li>Largest: Engineering (3,200 students)</li>
          <li>Smallest: Law (400 students)</li>
        </ul>
      );
      insight = <div className="text-xs text-pink-600 dark:text-pink-300 mb-2">1 new department added this year. Most growth in STEM fields.</div>;
    } else if (card.label.includes('Courses')) {
      extraDetails = (
        <ul className="text-sm mb-2 list-disc ml-5">
          <li>UG Courses: 180</li>
          <li>PG Courses: 110</li>
          <li>PhD/Research: 30</li>
        </ul>
      );
      insight = <div className="text-xs text-yellow-600 dark:text-yellow-300 mb-2">8 new courses launched this year, mostly in AI, Data Science, and Business Analytics.</div>;
    } else if (card.label.includes('Vehicles')) {
      extraDetails = (
        <table className="w-full text-sm mb-2">
          <tbody>
            <tr><td className="font-medium">Buses</td><td className="text-right">30</td></tr>
            <tr><td className="font-medium">Vans</td><td className="text-right">8</td></tr>
            <tr><td className="font-medium">Ambulances</td><td className="text-right">4</td></tr>
          </tbody>
        </table>
      );
      insight = <div className="text-xs text-green-600 dark:text-green-300 mb-2">1 vehicle out of service. All routes running on time.</div>;
    } else if (card.label.includes('Event')) {
      extraDetails = (
        <ul className="text-sm mb-2 list-disc ml-5">
          <li>Convocation: 2 days left</li>
          <li>Sports Meet: 5 days left</li>
          <li>Faculty Workshop: 6 days left</li>
        </ul>
      );
      insight = <div className="text-xs text-orange-600 dark:text-orange-300 mb-2">Busy week ahead! 7 major events scheduled in the next 7 days.</div>;
    }
    return (
      <div className="p-6">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{card.icon}</span>
          <span className="text-lg font-bold uppercase tracking-wide">{card.label}</span>
        </div>
        <div className="text-2xl font-bold mb-2">
          {card.label.includes('Finance') ? `$${card.value.toLocaleString()}` : card.value}
        </div>
        <div className="mb-2 text-sm text-gray-400 dark:text-gray-300">{card.sub}</div>
        {/* Modal sparkline */}
        <div className="w-full h-20 mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={card.spark.map((v, idx) => ({ idx, v }))} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id={`modal-spark-gradient`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={card.sparkColor.light} stopOpacity={0.5} />
                  <stop offset="100%" stopColor={card.sparkColor.light} stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="v"
                stroke={card.sparkColor.light}
                fill={`url(#modal-spark-gradient)`}
                strokeWidth={3.2}
                dot={{ r: 4, stroke: card.sparkColor.light, strokeWidth: 2, fill: '#fff' }}
                className="block dark:hidden"
              />
              <Area
                type="monotone"
                dataKey="v"
                stroke={card.sparkColor.dark}
                fill="none"
                strokeWidth={3.2}
                dot={{ r: 4, stroke: card.sparkColor.dark, strokeWidth: 2, fill: '#222' }}
                className="hidden dark:block"
                style={{ filter: 'drop-shadow(0 0 4px #fff8)' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        {insight}
        {extraDetails}
        <div className="text-sm text-gray-700 dark:text-gray-200">
          <ul className="list-disc ml-5">
            <li>Trend: <span className={card.trendColor}>{card.trend || 'Stable'}</span></li>
            <li>Last 6 periods: {card.spark.map((v, i) => <span key={i} className="inline-block mx-1">{card.label.includes('Finance') ? `$${v}` : v}</span>)}</li>
          </ul>
        </div>
      </div>
    );
  };

  // Modal component
  const Modal = ({ card, onClose }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl max-w-md w-full relative animate-fadeInUp">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-2xl font-bold"
          aria-label="Close"
        >
          &times;
        </button>
        {renderModalContent(card)}
      </div>
    </div>
  );

  // Add extra details for KPI cards
  const renderKpiModalContent = (kpi) => {
    if (!kpi) return null;
    let extraDetails = null;
    let insight = null;
    if (kpi.label.includes('Admissions')) {
      extraDetails = (
        <ul className="text-sm mb-2 list-disc ml-5">
          <li>Applications this month: 1,500</li>
          <li>Acceptance rate: 82%</li>
          <li>Top program: B.Tech CSE</li>
        </ul>
      );
      insight = <div className="text-xs text-blue-600 dark:text-blue-300 mb-2">Admissions are up 5% compared to last month. Most applications from Riyadh and Jeddah.</div>;
    } else if (kpi.label.includes('Finance')) {
      extraDetails = (
        <ul className="text-sm mb-2 list-disc ml-5">
          <li>Fee Collection (YTD): $600,000</li>
          <li>Outstanding Fees: $12,000</li>
          <li>Scholarships Granted: $45,000</li>
        </ul>
      );
      insight = <div className="text-xs text-green-600 dark:text-green-300 mb-2">Finance is healthy. Outstanding fees are at a record low. Scholarship disbursal up 10%.</div>;
    } else if (kpi.label.includes('HR')) {
      extraDetails = (
        <ul className="text-sm mb-2 list-disc ml-5">
          <li>Teaching Staff: 650</li>
          <li>Non-Teaching: 200</li>
          <li>Open Positions: 12</li>
        </ul>
      );
      insight = <div className="text-xs text-purple-600 dark:text-purple-300 mb-2">Staff attrition is at 3.5%. Recruitment drive for new faculty ongoing.</div>;
    } else if (kpi.label.includes('Academics')) {
      extraDetails = (
        <ul className="text-sm mb-2 list-disc ml-5">
          <li>Avg GPA (UG): 8.2</li>
          <li>Avg GPA (PG): 8.5</li>
          <li>Top Department: Engineering (8.7)</li>
        </ul>
      );
      insight = <div className="text-xs text-yellow-600 dark:text-yellow-300 mb-2">Academic performance is stable. Engineering leads in GPA.</div>;
    } else if (kpi.label.includes('Attendance')) {
      extraDetails = (
        <ul className="text-sm mb-2 list-disc ml-5">
          <li>Student Attendance: 92%</li>
          <li>Staff Attendance: 95%</li>
          <li>Lowest: Law Dept (88%)</li>
        </ul>
      );
      insight = <div className="text-xs text-pink-600 dark:text-pink-300 mb-2">Attendance is above target. Law department needs improvement.</div>;
    }
    return (
      <div className="p-6">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{kpi.icon}</span>
          <span className="text-lg font-bold uppercase tracking-wide">{kpi.label}</span>
        </div>
        <div className="text-2xl font-bold mb-2">
          {kpi.label.includes('Finance') ? `$${kpi.value.toLocaleString()}` : kpi.value}
        </div>
        <div className="mb-2 text-sm text-gray-400 dark:text-gray-300">{kpi.label}</div>
        {insight}
        {extraDetails}
      </div>
    );
  };

  // Modal for KPI cards
  const KpiModal = ({ kpi, onClose }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl max-w-md w-full relative animate-fadeInUp">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-2xl font-bold"
          aria-label="Close"
        >
          &times;
        </button>
        {renderKpiModalContent(kpi)}
      </div>
    </div>
  );

  // Modal for large chart view
  const ChartModal = ({ chartId, onClose }) => {
    let content = null;
    if (!chartId) return null;
    if (chartId === 'admission') {
      content = (
        <div className="w-[90vw] max-w-3xl h-[60vh] bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6">
          <h3 className="text-lg font-bold mb-2 text-blue-700 dark:text-blue-300">Predictive Admission Forecast</h3>
          <ResponsiveContainer width="100%" height="90%">
            <LineChart data={forecastData} margin={{ top: 20, right: 40, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Actual" stroke="#6366f1" strokeWidth={3} dot={{ r: 6 }} activeDot={{ r: 10 }} />
              <Line type="monotone" dataKey="Forecast" stroke="#22c55e" strokeDasharray="5 5" strokeWidth={3} dot={{ r: 6 }} activeDot={{ r: 10 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      );
    } else if (chartId === 'dropout') {
      content = (
        <div className="w-[90vw] max-w-3xl h-[60vh] bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6">
          <h3 className="text-lg font-bold mb-2 text-pink-700 dark:text-pink-300">Dropout Risk Forecast</h3>
          <ResponsiveContainer width="100%" height="90%">
            <LineChart data={dropoutForecast} margin={{ top: 20, right: 40, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="semester" />
              <YAxis domain={[2.5, 5]} tickFormatter={v => `${v}%`} />
              <Tooltip formatter={v => `${v}%`} />
              <Legend />
              <Line type="monotone" dataKey="Actual" stroke="#ef4444" strokeWidth={3} dot={{ r: 6 }} activeDot={{ r: 10 }} />
              <Line type="monotone" dataKey="Forecast" stroke="#f472b6" strokeDasharray="5 5" strokeWidth={3} dot={{ r: 6 }} activeDot={{ r: 10 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      );
    } else if (chartId === 'surplus') {
      content = (
        <div className="w-[90vw] max-w-3xl h-[60vh] bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6">
          <h3 className="text-lg font-bold mb-2 text-green-700 dark:text-green-300">Financial Surplus/Deficit Forecast</h3>
          <ResponsiveContainer width="100%" height="90%">
            <BarChart data={surplusForecast} margin={{ top: 20, right: 40, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={v => `$${v.toLocaleString()}`} />
              <Tooltip formatter={v => `$${v.toLocaleString()}`} />
              <Bar dataKey="Actual" fill="#22c55e" radius={[8, 8, 0, 0]} />
              <Bar dataKey="Forecast" fill="#6366f1" radius={[8, 8, 0, 0]} fillOpacity={0.7} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      );
    } else if (chartId === 'placement') {
      content = (
        <div className="w-[90vw] max-w-3xl h-[60vh] bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6">
          <h3 className="text-lg font-bold mb-2 text-indigo-700 dark:text-indigo-300">Placement Success Forecast</h3>
          <ResponsiveContainer width="100%" height="90%">
            <BarChart data={[
              { year: '2021', Actual: 88, Forecast: 88 },
              { year: '2022', Actual: 90, Forecast: 90 },
              { year: '2023', Actual: 91, Forecast: 91 },
              { year: '2024', Actual: null, Forecast: 92 },
            ]} margin={{ top: 20, right: 40, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis domain={[80, 100]} tickFormatter={v => `${v}%`} />
              <Tooltip formatter={v => `${v}%`} />
              <Bar dataKey="Actual" fill="#6366f1" radius={[8, 8, 0, 0]} />
              <Bar dataKey="Forecast" fill="#22c55e" radius={[8, 8, 0, 0]} fillOpacity={0.7} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      );
    } else if (chartId === 'sentiment') {
      content = (
        <div className="w-[90vw] max-w-2xl h-[60vh] bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 flex flex-col items-center justify-center">
          <h3 className="text-lg font-bold mb-2 text-yellow-700 dark:text-yellow-300">Student Sentiment Analysis</h3>
          <ResponsiveContainer width="60%" height="80%">
            <PieChart>
              <Pie data={[
                { name: 'Positive', value: 78 },
                { name: 'Neutral', value: 15 },
                { name: 'Negative', value: 7 },
              ]} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                <Cell fill="#22c55e" />
                <Cell fill="#facc15" />
                <Cell fill="#ef4444" />
              </Pie>
              <Tooltip formatter={v => `${v}%`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      );
    } else if (chartId === 'benchmark') {
      content = (
        <div className="w-[90vw] max-w-2xl h-[60vh] bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 flex flex-col items-center justify-center">
          <h3 className="text-lg font-bold mb-2 text-orange-700 dark:text-orange-300">Competitor Benchmarking</h3>
          <ResponsiveContainer width="80%" height="80%">
            <RadarChart cx="50%" cy="50%" outerRadius={120} data={[
              { kpi: 'Research', You: 90, Peer: 80 },
              { kpi: 'Placements', You: 85, Peer: 88 },
              { kpi: 'Int. Admissions', You: 70, Peer: 80 },
              { kpi: 'Faculty', You: 88, Peer: 85 },
              { kpi: 'Infra', You: 80, Peer: 78 },
            ]}>
              <PolarGrid />
              <PolarAngleAxis dataKey="kpi" />
              <PolarRadiusAxis angle={30} domain={[60, 100]} />
              <Radar name="You" dataKey="You" stroke="#6366f1" fill="#6366f1" fillOpacity={0.5} />
              <Radar name="Peer" dataKey="Peer" stroke="#f59e42" fill="#f59e42" fillOpacity={0.3} />
              <Legend />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      );
    } else if (chartId === 'leadConversion') {
      content = (
        <div className="w-[90vw] max-w-3xl h-[60vh] bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-4 gap-4 items-stretch min-h-[260px] border border-gray-100 dark:border-gray-800">
          <div className="flex-1 min-w-[140px] flex items-center justify-center cursor-pointer group" onClick={() => setModalChart('leadConversion')} title={t('dashboard.aiLabels.clickToEnlarge')}>
            <ResponsiveContainer width="100%" height={140}>
              <LineChart data={leadConversionData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="Rate" stroke="#6366f1" strokeWidth={2.5} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
            <span className="hidden group-hover:block absolute text-xs text-blue-500 bg-white dark:bg-gray-900 px-2 py-1 rounded shadow top-2 left-2">{t('dashboard.aiLabels.clickToEnlarge')}</span>
          </div>
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-blue-700 dark:text-blue-300">{t('dashboard.aiWidgets.leadConversion')}</span>
                <span className="px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900 text-xs text-blue-700 dark:text-blue-200 font-semibold">{t('dashboard.aiLabels.ai')}</span>
              </div>
              <div className="text-sm text-gray-700 dark:text-gray-200 mb-1">
                <span className="font-bold text-green-600 dark:text-green-400">1,320</span> {t('dashboard.aiLabels.nextSemesterIntake')} <span className="text-xs">(+8%)</span>.<br />
                {t('dashboard.aiLabels.highestGrowth')}: <span className="font-semibold">Engineering, Business</span>.
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{t('dashboard.aiLabels.confidence')}: <span className="font-bold text-green-500">92%</span> | {t('dashboard.aiLabels.model')}: v2.1</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{t('dashboard.aiLabels.keyDrivers')}: <span className="font-medium">Marketing Spend, Placement Rate, Fee Waivers</span></div>
              <div className="text-xs text-blue-600 dark:text-blue-300 mb-1">{t('dashboard.aiLabels.whatIf')}: +10% marketing budget → +3% admissions</div>
            </div>
            <div className="flex items-center justify-between text-xs text-gray-400 dark:text-gray-500 mt-2">
              <span>{t('dashboard.aiLabels.lastUpdated')}: 2h ago</span>
              <span className="italic">{t('dashboard.aiLabels.poweredByNexusAI')}</span>
            </div>
          </div>
        </div>
      );
    } else if (chartId === 'applicationFee') {
      content = (
        <div className="w-[90vw] max-w-3xl h-[60vh] bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-4 gap-4 items-stretch min-h-[260px] border border-gray-100 dark:border-gray-800">
          <div className="flex-1 min-w-[140px] flex items-center justify-center cursor-pointer group" onClick={() => setModalChart('applicationFee')} title={t('dashboard.aiLabels.clickToEnlarge')}>
            <ResponsiveContainer width="100%" height={140}>
              <BarChart data={applicationFeeData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={v => `$${v.toLocaleString()}`} />
                <Tooltip formatter={v => `$${v.toLocaleString()}`} />
                <Bar dataKey="Revenue" fill="#22c55e" radius={[8, 8, 0, 0]} />
                <Bar dataKey="Waivers" fill="#ef4444" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <span className="hidden group-hover:block absolute text-xs text-green-500 bg-white dark:bg-gray-900 px-2 py-1 rounded shadow top-2 left-2">{t('dashboard.aiLabels.clickToEnlarge')}</span>
          </div>
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-green-700 dark:text-green-300">{t('dashboard.aiWidgets.applicationFeeRevenue')}</span>
                <span className="px-2 py-0.5 rounded bg-green-100 dark:bg-green-900 text-xs text-green-700 dark:text-green-200 font-semibold">{t('dashboard.aiLabels.ai')}</span>
              </div>
              <div className="text-sm text-gray-700 dark:text-gray-200 mb-1">
                Expected revenue: <span className="font-bold text-blue-600 dark:text-blue-400">$180,000</span> (+5%).<br />
                Waivers impact: <span className="font-semibold">10% of revenue</span>.
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{t('dashboard.aiLabels.confidence')}: <span className="font-bold text-green-500">89%</span> | {t('dashboard.aiLabels.model')}: v2.1</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{t('dashboard.aiLabels.keyDrivers')}: <span className="font-medium">Applications, Fee Structure, Waivers</span></div>
              <div className="text-xs text-green-600 dark:text-green-300 mb-1">{t('dashboard.aiLabels.whatIf')}: +15% fee waivers → -$25k revenue</div>
            </div>
            <div className="flex items-center justify-between text-xs text-gray-400 dark:text-gray-500 mt-2">
              <span>{t('dashboard.aiLabels.lastUpdated')}: 2h ago</span>
              <span className="italic">{t('dashboard.aiLabels.poweredByNexusAI')}</span>
            </div>
          </div>
        </div>
      );
    } else if (chartId === 'deptRevenue') {
      content = (
        <div className="w-[90vw] max-w-3xl h-[60vh] bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-4 gap-4 items-stretch min-h-[260px] border border-gray-100 dark:border-gray-800">
          <div className="flex-1 min-w-[140px] flex items-center justify-center cursor-pointer group" onClick={() => setModalChart('deptRevenue')} title={t('dashboard.aiLabels.clickToEnlarge')}>
            <ResponsiveContainer width="100%" height={140}>
              <BarChart data={deptRevenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="dept" />
                <YAxis tickFormatter={v => `$${v.toLocaleString()}`} />
                <Tooltip formatter={v => `$${v.toLocaleString()}`} />
                <Bar dataKey="Revenue" fill="#6366f1" radius={[8, 8, 0, 0]} />
                <Bar dataKey="Projected" fill="#22c55e" radius={[8, 8, 0, 0]} fillOpacity={0.7} />
              </BarChart>
            </ResponsiveContainer>
            <span className="hidden group-hover:block absolute text-xs text-indigo-500 bg-white dark:bg-gray-900 px-2 py-1 rounded shadow top-2 left-2">{t('dashboard.aiLabels.clickToEnlarge')}</span>
          </div>
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-indigo-700 dark:text-indigo-300">{t('dashboard.aiWidgets.departmentRevenue')}</span>
                <span className="px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-900 text-xs text-indigo-700 dark:text-indigo-200 font-semibold">{t('dashboard.aiLabels.ai')}</span>
              </div>
              <div className="text-sm text-gray-700 dark:text-gray-200 mb-1">
                Total projected: <span className="font-bold text-green-600 dark:text-green-400">$17.05M</span> (+10%).<br />
                Underperforming: <span className="font-semibold">Law, Arts</span>.
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{t('dashboard.aiLabels.confidence')}: <span className="font-bold text-green-500">92%</span> | {t('dashboard.aiLabels.model')}: v2.1</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{t('dashboard.aiLabels.keyDrivers')}: <span className="font-medium">Enrollment, Tuition, Grants</span></div>
              <div className="text-xs text-indigo-600 dark:text-indigo-300 mb-1">{t('dashboard.aiLabels.whatIf')}: +20% scholarships → -$1.2M revenue</div>
            </div>
            <div className="flex items-center justify-between text-xs text-gray-400 dark:text-gray-500 mt-2">
              <span>{t('dashboard.aiLabels.lastUpdated')}: 3h ago</span>
              <span className="italic">{t('dashboard.aiLabels.poweredByNexusAI')}</span>
            </div>
          </div>
        </div>
      );
    } else if (chartId === 'subjectProfit') {
      content = (
        <div className="w-[90vw] max-w-3xl h-[60vh] bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-4 gap-4 items-stretch min-h-[260px] border border-gray-100 dark:border-gray-800">
          <div className="flex-1 min-w-[140px] flex items-center justify-center cursor-pointer group" onClick={() => setModalChart('subjectProfit')} title={t('dashboard.aiLabels.clickToEnlarge')}>
            <ResponsiveContainer width="100%" height={140}>
              <BarChart data={subjectProfitData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="subject" />
                <YAxis tickFormatter={v => `$${v.toLocaleString()}`} />
                <Tooltip formatter={v => `$${v.toLocaleString()}`} />
                <Bar dataKey="Profit" fill="#22c55e" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <span className="hidden group-hover:block absolute text-xs text-green-500 bg-white dark:bg-gray-900 px-2 py-1 rounded shadow top-2 left-2">{t('dashboard.aiLabels.clickToEnlarge')}</span>
          </div>
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-green-700 dark:text-green-300">{t('dashboard.aiWidgets.subjectProfitability')}</span>
                <span className="px-2 py-0.5 rounded bg-green-100 dark:bg-green-900 text-xs text-green-700 dark:text-green-200 font-semibold">{t('dashboard.aiLabels.ai')}</span>
              </div>
              <div className="text-sm text-gray-700 dark:text-gray-200 mb-1">
                Visualizes profit margins for each subject.<br />
                Instantly spot most/least profitable subjects.
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{t('dashboard.aiLabels.confidence')}: <span className="font-bold text-green-500">94%</span> | {t('dashboard.aiLabels.model')}: v2.1</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{t('dashboard.aiLabels.keyDrivers')}: <span className="font-medium">Enrollment, Tuition, Operating Costs</span></div>
            </div>
                            <div className="flex items-center justify-between text-xs text-gray-400 dark:text-gray-500 mt-2">
                  <span>{t('dashboard.aiLabels.interactiveBarChart')}</span>
                  <span className="italic">{t('dashboard.aiLabels.poweredByNexusAI')}</span>
                </div>
          </div>
        </div>
      );
    } else if (chartId === 'demographics') {
      content = (
        <div className="w-[90vw] max-w-3xl h-[60vh] bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-4 gap-4 items-stretch min-h-[260px] border border-gray-100 dark:border-gray-800">
          <div className="flex-1 min-w-[140px] flex items-center justify-center cursor-pointer group" onClick={() => setModalChart('demographics')} title={t('dashboard.aiLabels.clickToEnlarge')}>
            <ResponsiveContainer width="100%" height={140}>
              <PieChart>
                <Pie data={studentDemographicsData.regions} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={40} label>
                  <Cell fill="#6366f1" />
                  <Cell fill="#22c55e" />
                  <Cell fill="#f59e42" />
                  <Cell fill="#ef4444" />
                </Pie>
                <Tooltip formatter={v => `${v}%`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-blue-700 dark:text-blue-300">{t('dashboard.aiWidgets.studentDemographics')}</span>
                <span className="px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900 text-xs text-blue-700 dark:text-blue-200 font-semibold">{t('dashboard.aiLabels.ai')}</span>
              </div>
              <div className="text-sm text-gray-700 dark:text-gray-200 mb-1">
                Top region: <span className="font-bold text-green-600 dark:text-green-400">North (35%)</span>.<br />
                Age group: <span className="font-semibold">18-20 (45%)</span>.
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{t('dashboard.aiLabels.confidence')}: <span className="font-bold text-green-500">96%</span> | {t('dashboard.aiLabels.model')}: v2.1</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{t('dashboard.aiLabels.keyDrivers')}: <span className="font-medium">Region, Age, Gender, Education</span></div>
              <div className="text-xs text-blue-600 dark:text-blue-300 mb-1">{t('dashboard.aiLabels.whatIf')}: Target East region → +15% applications</div>
            </div>
            <div className="flex items-center justify-between text-xs text-gray-400 dark:text-gray-500 mt-2">
              <span>{t('dashboard.aiLabels.lastUpdated')}: 1h ago</span>
              <span className="italic">{t('dashboard.aiLabels.poweredByNexusAI')}</span>
            </div>
          </div>
        </div>
      );
    } else if (chartId === 'deptRevenueRadar') {
      content = (
        <div className="w-[90vw] max-w-3xl h-[60vh] bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-4 gap-4 items-stretch min-h-[260px] border border-gray-100 dark:border-gray-800">
          <div className="flex-1 min-w-[140px] flex items-center justify-center cursor-pointer group" onClick={() => setModalChart('deptRevenueRadar')} title={t('dashboard.aiLabels.clickToEnlarge')}>
            <ResponsiveContainer width="100%" height={140}>
              <RadarChart cx="50%" cy="50%" outerRadius={50} data={deptRevenueData.map(d => ({ dept: d.dept, Revenue: d.Revenue, Projected: d.Projected }))}>
                <PolarGrid />
                <PolarAngleAxis dataKey="dept" />
                <PolarRadiusAxis angle={30} />
                <Radar name="Current" dataKey="Revenue" stroke="#6366f1" fill="#6366f1" fillOpacity={0.5} />
                <Radar name="Projected" dataKey="Projected" stroke="#22c55e" fill="#22c55e" fillOpacity={0.3} />
                <Legend />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-indigo-700 dark:text-indigo-300">{t('dashboard.aiWidgets.departmentRevenueRadar')}</span>
                <span className="px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-900 text-xs text-indigo-700 dark:text-indigo-200 font-semibold">{t('dashboard.aiLabels.ai')}</span>
              </div>
              <div className="text-sm text-gray-700 dark:text-gray-200 mb-1">
                Visualizes current vs projected revenue for each department.<br />
                Instantly spot outliers and growth areas.
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{t('dashboard.aiLabels.confidence')}: <span className="font-bold text-green-500">92%</span> | {t('dashboard.aiLabels.model')}: v2.1</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{t('dashboard.aiLabels.keyDrivers')}: <span className="font-medium">Enrollment, Tuition, Grants</span></div>
            </div>
            <div className="flex items-center justify-between text-xs text-gray-400 dark:text-gray-500 mt-2">
              <span>{t('dashboard.aiLabels.interactiveRadar')}</span>
              <span className="italic">{t('dashboard.aiLabels.poweredByNexusAI')}</span>
            </div>
          </div>
        </div>
      );
    } else if (chartId === 'subjectProfitRadar') {
      content = (
        <div className="w-[90vw] max-w-3xl h-[60vh] bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-4 gap-4 items-stretch min-h-[260px] border border-gray-100 dark:border-gray-800">
          <div className="flex-1 min-w-[140px] flex items-center justify-center cursor-pointer group" onClick={() => setModalChart('subjectProfitRadar')} title={t('dashboard.aiLabels.clickToEnlarge')}>
            <ResponsiveContainer width="100%" height={140}>
              <RadarChart cx="50%" cy="50%" outerRadius={50} data={subjectProfitData.map(s => ({ subject: s.subject, Profit: s.Profit }))}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={30} />
                <Radar name="Profit" dataKey="Profit" stroke="#22c55e" fill="#22c55e" fillOpacity={0.5} />
                <Legend />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-green-700 dark:text-green-300">{t('dashboard.aiWidgets.subjectProfitabilityRadar')}</span>
                <span className="px-2 py-0.5 rounded bg-green-100 dark:bg-green-900 text-xs text-green-700 dark:text-green-200 font-semibold">{t('dashboard.aiLabels.ai')}</span>
              </div>
              <div className="text-sm text-gray-700 dark:text-gray-200 mb-1">
                Visualizes profit margins for each subject.<br />
                Instantly spot most/least profitable subjects.
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{t('dashboard.aiLabels.confidence')}: <span className="font-bold text-green-500">94%</span> | {t('dashboard.aiLabels.model')}: v2.1</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{t('dashboard.aiLabels.keyDrivers')}: <span className="font-medium">Enrollment, Tuition, Operating Costs</span></div>
            </div>
            <div className="flex items-center justify-between text-xs text-gray-400 dark:text-gray-500 mt-2">
              <span>{t('dashboard.aiLabels.interactiveRadar')}</span>
              <span className="italic">{t('dashboard.aiLabels.poweredByNexusAI')}</span>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
        <div className="absolute inset-0" onClick={onClose} />
        <div className="relative z-10">
          <button
            onClick={onClose}
            className="absolute top-2 right-4 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-3xl font-bold"
            aria-label="Close"
            style={{ zIndex: 20 }}
          >
            &times;
          </button>
          {content}
        </div>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-[#F6F7FA] dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800">
      <main className="flex-1 p-6 md:p-10 flex flex-col gap-8 overflow-x-auto">
        {/* Slim, Colorful Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {summaryCards.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className={`flex flex-col justify-between rounded-xl shadow-lg px-4 py-3 bg-gradient-to-br ${card.color} text-white min-h-[80px] relative overflow-hidden cursor-pointer hover:scale-[1.03] active:scale-95 transition-transform`}
              style={{ boxShadow: '0 4px 16px 0 rgba(60,60,100,0.10)' }}
              onClick={() => setModalCard(card)}
            >
              <div className="flex items-center gap-2">
                <span className="text-2xl drop-shadow">{card.icon}</span>
                <span className="text-xs font-semibold uppercase tracking-wide opacity-80 whitespace-nowrap">{card.label}</span>
              </div>
              <div className="flex items-end justify-between mt-2">
                <span className="text-2xl md:text-3xl font-bold">
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 + i * 0.08 }}
                  >
                    {card.value}
                  </motion.span>
                </span>
                {card.trend && (
                  <span className={`ml-2 text-xs font-bold ${card.trendColor}`}>{card.trend}</span>
                )}
              </div>
              {/* Mini sparkline */}
              <div className="absolute bottom-2 right-2 w-16 h-6 opacity-90 pointer-events-none">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={card.spark.map((v, idx) => ({ idx, v }))} margin={{ top: 6, right: 0, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id={`spark-gradient-${i}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={card.sparkColor.light} stopOpacity={0.5} />
                        <stop offset="100%" stopColor={card.sparkColor.light} stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <Area
                      type="monotone"
                      dataKey="v"
                      stroke={card.sparkColor.light}
                      fill={`url(#spark-gradient-${i})`}
                      strokeWidth={3.2}
                      dot={false}
                      className="block dark:hidden"
                    />
                    <Area
                      type="monotone"
                      dataKey="v"
                      stroke={card.sparkColor.dark}
                      fill="none"
                      strokeWidth={3.2}
                      dot={false}
                      className="hidden dark:block"
                      style={{ filter: 'drop-shadow(0 0 4px #fff8)' }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <span className="text-xs opacity-80 mt-1 whitespace-nowrap z-10">{card.sub}</span>
            </motion.div>
          ))}
        </div>

        {/* Animated KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {kpis.map((kpi, i) => (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-2xl shadow-lg p-6 flex flex-col items-center ${kpi.color} bg-opacity-80 backdrop-blur-md cursor-pointer hover:scale-[1.03] active:scale-95 transition-transform`}
              onClick={() => setModalCard({ ...kpi, isKpi: true })}
            >
              <span className="text-3xl mb-2">{kpi.icon}</span>
              <span className="text-2xl font-bold">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                >
                  {kpi.label.includes('Finance') ? `$${kpi.value.toLocaleString()}` : kpi.value}
                </motion.span>
              </span>
              <span className="text-sm font-medium mt-1 opacity-80">{kpi.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Animated Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Admissions Trend */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6"
          >
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">{t('dashboard.charts.admissionsTrend')}</h3>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={admissionsTrend} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Applications" stroke="#6366f1" strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="Admitted" stroke="#22c55e" strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Finance Overview */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6"
          >
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">{t('dashboard.charts.financeOverview')}</h3>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={financeData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} fill="#8884d8" label>
                  {financeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Department Performance Bar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6"
        >
          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">{t('dashboard.charts.departmentPerformance')}</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={deptPerformance} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="dept" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="KPI" fill="#6366f1" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Academic Insights Section */}
        <section className="mt-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">🧪</span>
            <h2 className="text-lg font-bold tracking-wide">{t('dashboard.sections.academicInsights')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Multi-year Enrollment/Graduation Chart */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 col-span-2">
              <h3 className="text-base font-semibold mb-2 text-gray-900 dark:text-gray-100">{t('dashboard.charts.enrollmentGraduation')}</h3>
              <ResponsiveContainer width="100%" height={180}>
                <LineChart data={academicTrends} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="Enrolled" stroke="#6366f1" strokeWidth={2} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="Graduated" stroke="#22c55e" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            {/* Department Leaderboard */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 flex flex-col">
              <h3 className="text-base font-semibold mb-2 text-gray-900 dark:text-gray-100">{t('dashboard.charts.topPerformingDepartments')}</h3>
              <ul className="flex-1 flex flex-col gap-2 mt-2">
                {deptLeaderboard.map((d, idx) => (
                  <li key={d.dept} className="flex items-center gap-2">
                    <span className="text-lg font-bold text-blue-500">#{idx + 1}</span>
                    <span className="flex-1 font-medium">{d.dept}</span>
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">{d.GPA}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Financial Overview Section */}
        <section className="mt-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">💸</span>
            <h2 className="text-lg font-bold tracking-wide">{t('dashboard.sections.financialOverview')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Monthly Fee Collection Bar Chart */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 col-span-2">
              <h3 className="text-base font-semibold mb-2 text-gray-900 dark:text-gray-100">{t('dashboard.charts.monthlyFeeCollection')}</h3>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={monthlyFees} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={v => `$${v.toLocaleString()}`} />
                  <Tooltip formatter={v => `$${v.toLocaleString()}`} />
                  <Bar dataKey="Fees" fill="#22c55e" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            {/* Budget vs Usage Progress Bars */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 flex flex-col">
              <h3 className="text-base font-semibold mb-2 text-gray-900 dark:text-gray-100">{t('dashboard.charts.budgetAllocationUsage')}</h3>
              <ul className="flex-1 flex flex-col gap-3 mt-2">
                {budgetUsage.map((b) => (
                  <li key={b.dept} className="flex flex-col gap-1">
                    <div className="flex justify-between text-xs font-medium">
                      <span>{b.dept}</span>
                      <span className="text-gray-500 dark:text-gray-300">${b.used.toLocaleString()} / ${b.budget.toLocaleString()}</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className="h-2 bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all"
                        style={{ width: `${(b.used / b.budget) * 100}%` }}
                      ></div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* HR & Staff Analytics Section */}
        <section className="mt-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">🧑‍💼</span>
            <h2 className="text-lg font-bold tracking-wide">{t('dashboard.sections.hrStaffAnalytics')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Staff Types Stacked Bar */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 col-span-2">
              <h3 className="text-base font-semibold mb-2 text-gray-900 dark:text-gray-100">{t('dashboard.charts.staffStrengthByType')}</h3>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={staffTypes} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Teaching" stackId="a" fill="#6366f1" />
                  <Bar dataKey="NonTeaching" stackId="a" fill="#a3a3a3" />
                  <Bar dataKey="Contract" stackId="a" fill="#f59e42" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            {/* Attrition Trend Line */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 flex flex-col">
              <h3 className="text-base font-semibold mb-2 text-gray-900 dark:text-gray-100">{t('dashboard.charts.attritionRateTrend')}</h3>
              <ResponsiveContainer width="100%" height={180}>
                <LineChart data={attritionTrend} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="Attrition" stroke="#ef4444" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        {/* Alerts & Notifications Widget */}
        <section className="mt-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">🔔</span>
            <h2 className="text-lg font-bold tracking-wide">{t('dashboard.sections.alertsNotifications')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-r from-blue-100 to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-6 flex flex-col gap-3 animate-pulse">
              {alerts.map((alert, idx) => (
                <div key={idx} className={`flex items-center gap-3 font-medium ${alert.color}`}>
                  <span className="text-xl">{alert.icon}</span>
                  <span>{alert.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AI Widgets: Modern Side-by-Side Layout */}
        <section className="mt-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">🤖</span>
            <h2 className="text-lg font-bold tracking-wide flex items-center gap-2">
              {t('dashboard.sections.aiPoweredForecasts')}
              <span className="ml-2 px-2 py-0.5 rounded bg-gradient-to-r from-blue-500 to-purple-500 text-xs text-white font-semibold uppercase">{t('dashboard.aiLabels.ai')}</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Predictive Admission Forecast */}
            <div className="flex flex-col md:flex-row bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-4 gap-4 items-stretch min-h-[260px] border border-gray-100 dark:border-gray-800">
              <div className="flex-1 min-w-[140px] flex items-center justify-center cursor-pointer group" onClick={() => setModalChart('admission')} title={t('dashboard.aiLabels.clickToEnlarge')}>
                <ResponsiveContainer width="100%" height={140}>
                  <LineChart data={forecastData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="Actual" stroke="#6366f1" strokeWidth={2.5} dot={{ r: 4 }} />
                    <Line type="monotone" dataKey="Forecast" stroke="#22c55e" strokeDasharray="5 5" strokeWidth={2.5} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
                <span className="hidden group-hover:block absolute text-xs text-blue-500 bg-white dark:bg-gray-900 px-2 py-1 rounded shadow top-2 left-2">{t('dashboard.aiLabels.clickToEnlarge')}</span>
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-blue-700 dark:text-blue-300">{t('dashboard.aiWidgets.predictiveAdmission')}</span>
                    <span className="px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900 text-xs text-blue-700 dark:text-blue-200 font-semibold">{t('dashboard.aiLabels.ai')}</span>
                  </div>
                  <div className="text-sm text-gray-700 dark:text-gray-200 mb-1">
                    <span className="font-bold text-green-600 dark:text-green-400">1,320</span> {t('dashboard.aiLabels.nextSemesterIntake')} <span className="text-xs">(+8%)</span>.<br />
                    {t('dashboard.aiLabels.highestGrowth')}: <span className="font-semibold">Engineering, Business</span>.
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{t('dashboard.aiLabels.confidence')}: <span className="font-bold text-green-500">92%</span> | {t('dashboard.aiLabels.model')}: v2.1</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{t('dashboard.aiLabels.keyDrivers')}: <span className="font-medium">Marketing Spend, Placement Rate, Fee Waivers</span></div>
                  <div className="text-xs text-blue-600 dark:text-blue-300 mb-1">{t('dashboard.aiLabels.whatIf')}: +10% marketing budget → +3% admissions</div>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-400 dark:text-gray-500 mt-2">
                  <span>{t('dashboard.aiLabels.lastUpdated')}: 2h ago</span>
                  <span className="italic">{t('dashboard.aiLabels.poweredByNexusAI')}</span>
                </div>
              </div>
            </div>
            {/* Dropout Risk Forecast */}
            <div className="flex flex-col md:flex-row bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-4 gap-4 items-stretch min-h-[260px] border border-gray-100 dark:border-gray-800">
              <div className="flex-1 min-w-[140px] flex items-center justify-center cursor-pointer group" onClick={() => setModalChart('dropout')} title={t('dashboard.aiLabels.clickToEnlarge')}>
                <ResponsiveContainer width="100%" height={140}>
                  <LineChart data={dropoutForecast} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="semester" />
                    <YAxis domain={[2.5, 5]} tickFormatter={v => `${v}%`} />
                    <Tooltip formatter={v => `${v}%`} />
                    <Line type="monotone" dataKey="Actual" stroke="#ef4444" strokeWidth={2.5} dot={{ r: 4 }} />
                    <Line type="monotone" dataKey="Forecast" stroke="#f472b6" strokeDasharray="5 5" strokeWidth={2.5} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
                <span className="hidden group-hover:block absolute text-xs text-pink-500 bg-white dark:bg-gray-900 px-2 py-1 rounded shadow top-2 left-2">{t('dashboard.aiLabels.clickToEnlarge')}</span>
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-pink-700 dark:text-pink-300">{t('dashboard.aiWidgets.dropoutRisk')}</span>
                    <span className="px-2 py-0.5 rounded bg-pink-100 dark:bg-pink-900 text-xs text-pink-700 dark:text-pink-200 font-semibold">{t('dashboard.aiLabels.ai')}</span>
                  </div>
                  <div className="text-sm text-gray-700 dark:text-gray-200 mb-1">
                    Dropout rate expected to decrease to <span className="font-bold text-red-600 dark:text-red-400">3.1%</span> next semester.<br />
                    Highest risk: <span className="font-semibold">Law Dept</span>.
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{t('dashboard.aiLabels.confidence')}: <span className="font-bold text-green-500">88%</span> | {t('dashboard.aiLabels.model')}: v2.1</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{t('dashboard.aiLabels.keyDrivers')}: <span className="font-medium">Attendance, Academic Stress, Financial Aid</span></div>
                  <div className="text-xs text-pink-600 dark:text-pink-300 mb-1">{t('dashboard.aiLabels.whatIf')}: -5% attendance → +0.7% dropout risk</div>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-400 dark:text-gray-500 mt-2">
                  <span>{t('dashboard.aiLabels.lastUpdated')}: 2h ago</span>
                  <span className="italic">{t('dashboard.aiLabels.poweredByNexusAI')}</span>
                </div>
              </div>
            </div>
            {/* Financial Surplus/Deficit Forecast */}
            <div className="flex flex-col md:flex-row bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-4 gap-4 items-stretch min-h-[260px] border border-gray-100 dark:border-gray-800">
              <div className="flex-1 min-w-[140px] flex items-center justify-center cursor-pointer group" onClick={() => setModalChart('surplus')} title={t('dashboard.aiLabels.clickToEnlarge')}>
                <ResponsiveContainer width="100%" height={140}>
                  <BarChart data={surplusForecast} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={v => `$${v.toLocaleString()}`} />
                    <Tooltip formatter={v => `$${v.toLocaleString()}`} />
                    <Bar dataKey="Actual" fill="#22c55e" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="Forecast" fill="#6366f1" radius={[8, 8, 0, 0]} fillOpacity={0.7} />
                  </BarChart>
                </ResponsiveContainer>
                <span className="hidden group-hover:block absolute text-xs text-green-500 bg-white dark:bg-gray-900 px-2 py-1 rounded shadow top-2 left-2">{t('dashboard.aiLabels.clickToEnlarge')}</span>
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-green-700 dark:text-green-300">{t('dashboard.aiWidgets.financialSurplusDeficit')}</span>
                    <span className="px-2 py-0.5 rounded bg-green-100 dark:bg-green-900 text-xs text-green-700 dark:text-green-200 font-semibold">{t('dashboard.aiLabels.ai')}</span>
                  </div>
                  <div className="text-sm text-gray-700 dark:text-gray-200 mb-1">
                    Surplus expected to peak in <span className="font-bold text-blue-600 dark:text-blue-400">May</span>, then stabilize.<br />
                    Monitor <span className="font-semibold">IT, R&D</span> spending.
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{t('dashboard.aiLabels.confidence')}: <span className="font-bold text-green-500">90%</span> | {t('dashboard.aiLabels.model')}: v2.1</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{t('dashboard.aiLabels.keyDrivers')}: <span className="font-medium">Fee Collection, Grants, Infra Spend</span></div>
                  <div className="text-xs text-green-600 dark:text-green-300 mb-1">{t('dashboard.aiLabels.whatIf')}: +$10k infra spend → -$7k surplus</div>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-400 dark:text-gray-500 mt-2">
                  <span>{t('dashboard.aiLabels.lastUpdated')}: 2h ago</span>
                  <span className="italic">{t('dashboard.aiLabels.poweredByNexusAI')}</span>
                </div>
              </div>
            </div>
          </div>
          {/* Additional AI Widgets Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {/* Lead Conversion Forecast */}
            <div className="flex flex-col md:flex-row bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-4 gap-4 items-stretch min-h-[260px] border border-gray-100 dark:border-gray-800">
              <div className="flex-1 min-w-[140px] flex items-center justify-center cursor-pointer group" onClick={() => setModalChart('leadConversion')} title={t('dashboard.aiLabels.clickToEnlarge')}>
                <ResponsiveContainer width="100%" height={140}>
                  <LineChart data={leadConversionData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="Rate" stroke="#6366f1" strokeWidth={2.5} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
                <span className="hidden group-hover:block absolute text-xs text-blue-500 bg-white dark:bg-gray-900 px-2 py-1 rounded shadow top-2 left-2">{t('dashboard.aiLabels.clickToEnlarge')}</span>
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-blue-700 dark:text-blue-300">{t('dashboard.aiWidgets.leadConversion')}</span>
                    <span className="px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900 text-xs text-blue-700 dark:text-blue-200 font-semibold">{t('dashboard.aiLabels.ai')}</span>
                  </div>
                  <div className="text-sm text-gray-700 dark:text-gray-200 mb-1">
                    Conversion rate expected to reach <span className="font-bold text-green-600 dark:text-green-400">26%</span> (+2%).<br />
                    {t('dashboard.aiLabels.highestGrowth')}: <span className="font-semibold">Engineering, Business</span>.
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{t('dashboard.aiLabels.confidence')}: <span className="font-bold text-green-500">91%</span> | {t('dashboard.aiLabels.model')}: v2.1</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{t('dashboard.aiLabels.keyDrivers')}: <span className="font-medium">Follow-up Response, Lead Quality, Marketing</span></div>
                  <div className="text-xs text-blue-600 dark:text-blue-300 mb-1">{t('dashboard.aiLabels.whatIf')}: +10% follow-up budget → +1.5% conversion rate</div>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-400 dark:text-gray-500 mt-2">
                  <span>{t('dashboard.aiLabels.lastUpdated')}: 1h ago</span>
                  <span className="italic">{t('dashboard.aiLabels.poweredByNexusAI')}</span>
                </div>
              </div>
            </div>
            {/* Application Fee Revenue Forecast */}
            <div className="flex flex-col md:flex-row bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-4 gap-4 items-stretch min-h-[260px] border border-gray-100 dark:border-gray-800">
              <div className="flex-1 min-w-[140px] flex items-center justify-center cursor-pointer group" onClick={() => setModalChart('applicationFee')} title={t('dashboard.aiLabels.clickToEnlarge')}>
                <ResponsiveContainer width="100%" height={140}>
                  <BarChart data={applicationFeeData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={v => `$${v.toLocaleString()}`} />
                    <Tooltip formatter={v => `$${v.toLocaleString()}`} />
                    <Bar dataKey="Revenue" fill="#22c55e" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="Waivers" fill="#ef4444" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
                <span className="hidden group-hover:block absolute text-xs text-green-500 bg-white dark:bg-gray-900 px-2 py-1 rounded shadow top-2 left-2">{t('dashboard.aiLabels.clickToEnlarge')}</span>
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-green-700 dark:text-green-300">{t('dashboard.aiWidgets.applicationFeeRevenue')}</span>
                    <span className="px-2 py-0.5 rounded bg-green-100 dark:bg-green-900 text-xs text-green-700 dark:text-green-200 font-semibold">{t('dashboard.aiLabels.ai')}</span>
                  </div>
                  <div className="text-sm text-gray-700 dark:text-gray-200 mb-1">
                    Expected revenue: <span className="font-bold text-blue-600 dark:text-blue-400">$180,000</span> (+5%).<br />
                    Waivers impact: <span className="font-semibold">10% of revenue</span>.
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{t('dashboard.aiLabels.confidence')}: <span className="font-bold text-green-500">89%</span> | {t('dashboard.aiLabels.model')}: v2.1</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{t('dashboard.aiLabels.keyDrivers')}: <span className="font-medium">Applications, Fee Structure, Waivers</span></div>
                  <div className="text-xs text-green-600 dark:text-green-300 mb-1">{t('dashboard.aiLabels.whatIf')}: +15% fee waivers → -$25k revenue</div>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-400 dark:text-gray-500 mt-2">
                  <span>{t('dashboard.aiLabels.lastUpdated')}: 2h ago</span>
                  <span className="italic">{t('dashboard.aiLabels.poweredByNexusAI')}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Additional AI Widgets Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {/* Department Revenue Breakdown */}
          <div className="flex flex-col md:flex-row bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-4 gap-4 items-stretch min-h-[260px] border border-gray-100 dark:border-gray-800">
            <div className="flex-1 min-w-[140px] flex items-center justify-center cursor-pointer group" onClick={() => setModalChart('deptRevenue')} title={t('dashboard.aiLabels.clickToEnlarge')}>
              <ResponsiveContainer width="100%" height={140}>
                <BarChart data={deptRevenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="dept" />
                  <YAxis tickFormatter={v => `$${v.toLocaleString()}`} />
                  <Tooltip formatter={v => `$${v.toLocaleString()}`} />
                  <Bar dataKey="Revenue" fill="#6366f1" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="Projected" fill="#22c55e" radius={[8, 8, 0, 0]} fillOpacity={0.7} />
                </BarChart>
              </ResponsiveContainer>
              <span className="hidden group-hover:block absolute text-xs text-indigo-500 bg-white dark:bg-gray-900 px-2 py-1 rounded shadow top-2 left-2">{t('dashboard.aiLabels.clickToEnlarge')}</span>
            </div>
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-indigo-700 dark:text-indigo-300">{t('dashboard.aiWidgets.departmentRevenue')}</span>
                  <span className="px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-900 text-xs text-indigo-700 dark:text-indigo-200 font-semibold">{t('dashboard.aiLabels.ai')}</span>
                </div>
                <div className="text-sm text-gray-700 dark:text-gray-200 mb-1">
                  Total projected: <span className="font-bold text-green-600 dark:text-green-400">$17.05M</span> (+10%).<br />
                  Underperforming: <span className="font-semibold">Law, Arts</span>.
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{t('dashboard.aiLabels.confidence')}: <span className="font-bold text-green-500">92%</span> | {t('dashboard.aiLabels.model')}: v2.1</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{t('dashboard.aiLabels.keyDrivers')}: <span className="font-medium">Enrollment, Tuition, Grants</span></div>
                <div className="text-xs text-indigo-600 dark:text-indigo-300 mb-1">{t('dashboard.aiLabels.whatIf')}: +20% scholarships → -$1.2M revenue</div>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-400 dark:text-gray-500 mt-2">
                <span>{t('dashboard.aiLabels.lastUpdated')}: 3h ago</span>
                <span className="italic">{t('dashboard.aiLabels.poweredByNexusAI')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* --- New Section: AI-Powered Revenue & Conversion Analytics --- */}
        <section className="mt-12">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">📈</span>
            <h2 className="text-lg font-bold tracking-wide flex items-center gap-2">
              {t('dashboard.sections.aiPoweredRevenue')}
              <span className="ml-2 px-2 py-0.5 rounded bg-gradient-to-r from-green-500 to-blue-500 text-xs text-white font-semibold uppercase">{t('dashboard.aiLabels.ai')}</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Lead Conversion Forecast */}
            <div className="flex flex-col bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-4 gap-4 min-h-[260px] border border-gray-100 dark:border-gray-800">
              <div className="flex-1 flex items-center justify-center cursor-pointer group" onClick={() => setModalChart('leadConversion')} title={t('dashboard.aiLabels.clickToEnlarge')}>
                <ResponsiveContainer width="100%" height={120}>
                  <LineChart data={leadConversionData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="Rate" stroke="#6366f1" strokeWidth={2.5} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-blue-700 dark:text-blue-300">{t('dashboard.aiWidgets.leadConversion')}</span>
                    <span className="px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900 text-xs text-blue-700 dark:text-blue-200 font-semibold">{t('dashboard.aiLabels.ai')}</span>
                  </div>
                  <div className="text-sm text-gray-700 dark:text-gray-200 mb-1">
                    Conversion rate expected to reach <span className="font-bold text-green-600 dark:text-green-400">26%</span> (+2%).<br />
                    {t('dashboard.aiLabels.highestGrowth')}: <span className="font-semibold">Engineering, Business</span>.
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{t('dashboard.aiLabels.confidence')}: <span className="font-bold text-green-500">91%</span> | {t('dashboard.aiLabels.model')}: v2.1</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{t('dashboard.aiLabels.keyDrivers')}: <span className="font-medium">Follow-up Response, Lead Quality, Marketing</span></div>
                  <div className="text-xs text-blue-600 dark:text-blue-300 mb-1">{t('dashboard.aiLabels.whatIf')}: +10% follow-up budget → +1.5% conversion rate</div>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-400 dark:text-gray-500 mt-2">
                  <span>{t('dashboard.aiLabels.lastUpdated')}: 1h ago</span>
                  <span className="italic">{t('dashboard.aiLabels.poweredByNexusAI')}</span>
                </div>
              </div>
            </div>

            {/* Application Fee Revenue Forecast */}
            <div className="flex flex-col bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-4 gap-4 min-h-[260px] border border-gray-100 dark:border-gray-800">
              <div className="flex-1 flex items-center justify-center cursor-pointer group" onClick={() => setModalChart('applicationFee')} title={t('dashboard.aiLabels.clickToEnlarge')}>
                <ResponsiveContainer width="100%" height={120}>
                  <BarChart data={applicationFeeData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={v => `$${v.toLocaleString()}`} />
                    <Tooltip formatter={v => `$${v.toLocaleString()}`} />
                    <Bar dataKey="Revenue" fill="#22c55e" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="Waivers" fill="#ef4444" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-green-700 dark:text-green-300">{t('dashboard.aiWidgets.applicationFeeRevenue')}</span>
                    <span className="px-2 py-0.5 rounded bg-green-100 dark:bg-green-900 text-xs text-green-700 dark:text-green-200 font-semibold">{t('dashboard.aiLabels.ai')}</span>
                  </div>
                  <div className="text-sm text-gray-700 dark:text-gray-200 mb-1">
                    Expected revenue: <span className="font-bold text-blue-600 dark:text-blue-400">$180,000</span> (+5%).<br />
                    Waivers impact: <span className="font-semibold">10% of revenue</span>.
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{t('dashboard.aiLabels.confidence')}: <span className="font-bold text-green-500">89%</span> | {t('dashboard.aiLabels.model')}: v2.1</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{t('dashboard.aiLabels.keyDrivers')}: <span className="font-medium">Applications, Fee Structure, Waivers</span></div>
                  <div className="text-xs text-green-600 dark:text-green-300 mb-1">{t('dashboard.aiLabels.whatIf')}: +15% fee waivers → -$25k revenue</div>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-400 dark:text-gray-500 mt-2">
                  <span>{t('dashboard.aiLabels.lastUpdated')}: 2h ago</span>
                  <span className="italic">{t('dashboard.aiLabels.poweredByNexusAI')}</span>
                </div>
              </div>
            </div>

            {/* Department Revenue Radar Chart */}
            <div className="flex flex-col bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-4 gap-4 min-h-[260px] border border-gray-100 dark:border-gray-800">
              <div className="flex-1 flex items-center justify-center cursor-pointer group" onClick={() => setModalChart('deptRevenueRadar')} title={t('dashboard.aiLabels.clickToEnlarge')}>
                <ResponsiveContainer width="100%" height={120}>
                  <RadarChart cx="50%" cy="50%" outerRadius={50} data={deptRevenueData.map(d => ({ dept: d.dept, Revenue: d.Revenue, Projected: d.Projected }))}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="dept" />
                    <PolarRadiusAxis angle={30} />
                    <Radar name="Current" dataKey="Revenue" stroke="#6366f1" fill="#6366f1" fillOpacity={0.5} />
                    <Radar name="Projected" dataKey="Projected" stroke="#22c55e" fill="#22c55e" fillOpacity={0.3} />
                    <Legend />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-indigo-700 dark:text-indigo-300">{t('dashboard.aiWidgets.departmentRevenueRadar')}</span>
                    <span className="px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-900 text-xs text-indigo-700 dark:text-indigo-200 font-semibold">{t('dashboard.aiLabels.ai')}</span>
                  </div>
                  <div className="text-sm text-gray-700 dark:text-gray-200 mb-1">
                    Visualizes current vs projected revenue for each department.<br />
                    Instantly spot outliers and growth areas.
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{t('dashboard.aiLabels.confidence')}: <span className="font-bold text-green-500">92%</span> | {t('dashboard.aiLabels.model')}: v2.1</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{t('dashboard.aiLabels.keyDrivers')}: <span className="font-medium">Enrollment, Tuition, Grants</span></div>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-400 dark:text-gray-500 mt-2">
                  <span>{t('dashboard.aiLabels.interactiveRadar')}</span>
                  <span className="italic">{t('dashboard.aiLabels.poweredByNexusAI')}</span>
                </div>
              </div>
            </div>

            {/* Subject Profitability Radar Chart */}
            <div className="flex flex-col bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-4 gap-4 min-h-[260px] border border-gray-100 dark:border-gray-800">
              <div className="flex-1 flex items-center justify-center cursor-pointer group" onClick={() => setModalChart('subjectProfitRadar')} title={t('dashboard.aiLabels.clickToEnlarge')}>
                <ResponsiveContainer width="100%" height={120}>
                  <RadarChart cx="50%" cy="50%" outerRadius={50} data={subjectProfitData.map(s => ({ subject: s.subject, Profit: s.Profit }))}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={30} />
                    <Radar name="Profit" dataKey="Profit" stroke="#22c55e" fill="#22c55e" fillOpacity={0.5} />
                    <Legend />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-green-700 dark:text-green-300">{t('dashboard.aiWidgets.subjectProfitabilityRadar')}</span>
                    <span className="px-2 py-0.5 rounded bg-green-100 dark:bg-green-900 text-xs text-green-700 dark:text-green-200 font-semibold">{t('dashboard.aiLabels.ai')}</span>
                  </div>
                  <div className="text-sm text-gray-700 dark:text-gray-200 mb-1">
                    Visualizes profit margins for each subject.<br />
                    Instantly spot most/least profitable subjects.
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{t('dashboard.aiLabels.confidence')}: <span className="font-bold text-green-500">94%</span> | {t('dashboard.aiLabels.model')}: v2.1</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{t('dashboard.aiLabels.keyDrivers')}: <span className="font-medium">Enrollment, Tuition, Operating Costs</span></div>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-400 dark:text-gray-500 mt-2">
                  <span>{t('dashboard.aiLabels.interactiveRadar')}</span>
                  <span className="italic">{t('dashboard.aiLabels.poweredByNexusAI')}</span>
                </div>
              </div>
            </div>

            {/* Department Revenue Bar Chart */}
            <div className="flex flex-col bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-4 gap-4 min-h-[260px] border border-gray-100 dark:border-gray-800">
              <div className="flex-1 flex items-center justify-center cursor-pointer group" onClick={() => setModalChart('deptRevenue')} title={t('dashboard.aiLabels.clickToEnlarge')}>
                <ResponsiveContainer width="100%" height={120}>
                  <BarChart data={deptRevenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="dept" />
                    <YAxis tickFormatter={v => `$${v.toLocaleString()}`} />
                    <Tooltip formatter={v => `$${v.toLocaleString()}`} />
                    <Bar dataKey="Revenue" fill="#6366f1" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="Projected" fill="#22c55e" radius={[8, 8, 0, 0]} fillOpacity={0.7} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-indigo-700 dark:text-indigo-300">{t('dashboard.aiWidgets.departmentRevenue')}</span>
                    <span className="px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-900 text-xs text-indigo-700 dark:text-indigo-200 font-semibold">{t('dashboard.aiLabels.ai')}</span>
                  </div>
                  <div className="text-sm text-gray-700 dark:text-gray-200 mb-1">
                    Total projected: <span className="font-bold text-green-600 dark:text-green-400">$17.05M</span> (+10%).<br />
                    Underperforming: <span className="font-semibold">Law, Arts</span>.
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{t('dashboard.aiLabels.confidence')}: <span className="font-bold text-green-500">92%</span> | {t('dashboard.aiLabels.model')}: v2.1</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{t('dashboard.aiLabels.keyDrivers')}: <span className="font-medium">Enrollment, Tuition, Grants</span></div>
                  <div className="text-xs text-indigo-600 dark:text-indigo-300 mb-1">{t('dashboard.aiLabels.whatIf')}: +20% scholarships → -$1.2M revenue</div>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-400 dark:text-gray-500 mt-2">
                  <span>{t('dashboard.aiLabels.lastUpdated')}: 3h ago</span>
                  <span className="italic">{t('dashboard.aiLabels.poweredByNexusAI')}</span>
                </div>
              </div>
            </div>

            {/* Student Demographics Analytics */}
            <div className="flex flex-col bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-4 gap-4 min-h-[260px] border border-gray-100 dark:border-gray-800">
              <div className="flex-1 flex items-center justify-center cursor-pointer group" onClick={() => setModalChart('demographics')} title={t('dashboard.aiLabels.clickToEnlarge')}>
                <ResponsiveContainer width="100%" height={120}>
                  <PieChart>
                    <Pie data={studentDemographicsData.regions} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={40} label>
                      <Cell fill="#6366f1" />
                      <Cell fill="#22c55e" />
                      <Cell fill="#f59e42" />
                      <Cell fill="#ef4444" />
                    </Pie>
                    <Tooltip formatter={v => `${v}%`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-blue-700 dark:text-blue-300">{t('dashboard.aiWidgets.studentDemographics')}</span>
                    <span className="px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900 text-xs text-blue-700 dark:text-blue-200 font-semibold">{t('dashboard.aiLabels.ai')}</span>
                  </div>
                  <div className="text-sm text-gray-700 dark:text-gray-200 mb-1">
                    Top region: <span className="font-bold text-green-600 dark:text-green-400">North (35%)</span>.<br />
                    Age group: <span className="font-semibold">18-20 (45%)</span>.
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{t('dashboard.aiLabels.confidence')}: <span className="font-bold text-green-500">96%</span> | {t('dashboard.aiLabels.model')}: v2.1</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{t('dashboard.aiLabels.keyDrivers')}: <span className="font-medium">Region, Age, Gender, Education</span></div>
                  <div className="text-xs text-blue-600 dark:text-blue-300 mb-1">{t('dashboard.aiLabels.whatIf')}: Target East region → +15% applications</div>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-400 dark:text-gray-500 mt-2">
                  <span>{t('dashboard.aiLabels.lastUpdated')}: 1h ago</span>
                  <span className="italic">{t('dashboard.aiLabels.poweredByNexusAI')}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* Modal for card details */}
      {modalCard && !modalCard.isKpi && <Modal card={modalCard} onClose={() => setModalCard(null)} />}
      {modalCard && modalCard.isKpi && <KpiModal kpi={modalCard} onClose={() => setModalCard(null)} />}
      {/* Modal for large chart view */}
      {modalChart && <ChartModal chartId={modalChart} onClose={() => setModalChart(null)} />}
    </div>
  );
} 