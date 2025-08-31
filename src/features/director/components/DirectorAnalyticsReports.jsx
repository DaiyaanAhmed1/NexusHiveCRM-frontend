import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar, Legend, AreaChart, Area,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  ComposedChart, Scatter
} from "recharts";
import { directorFeatures } from '../../../components/directorFeatures';

// Demo data for various charts
const departmentPerformance = [
  { dept: "Academics", KPI: 85, Budget: 500000, Revenue: 450000 },
  { dept: "HR", KPI: 78, Budget: 200000, Revenue: 180000 },
  { dept: "Finance", KPI: 90, Budget: 300000, Revenue: 280000 },
  { dept: "Admissions", KPI: 82, Budget: 250000, Revenue: 220000 },
  { dept: "IT", KPI: 75, Budget: 150000, Revenue: 130000 },
  { dept: "R&D", KPI: 88, Budget: 400000, Revenue: 380000 },
];

const monthlyTrends = [
  { month: "Jan", Revenue: 120000, Expenses: 100000, Profit: 20000 },
  { month: "Feb", Revenue: 130000, Expenses: 105000, Profit: 25000 },
  { month: "Mar", Revenue: 140000, Expenses: 110000, Profit: 30000 },
  { month: "Apr", Revenue: 135000, Expenses: 108000, Profit: 27000 },
  { month: "May", Revenue: 150000, Expenses: 115000, Profit: 35000 },
  { month: "Jun", Revenue: 155000, Expenses: 118000, Profit: 37000 },
];

const studentDemographics = {
  regions: [
    { name: "North", value: 35 },
    { name: "South", value: 25 },
    { name: "East", value: 20 },
    { name: "West", value: 20 },
  ],
  ageGroups: [
    { name: "18-20", value: 45 },
    { name: "21-25", value: 30 },
    { name: "26-30", value: 15 },
    { name: "31-35", value: 10 },
  ],
};

const staffAnalytics = [
  { year: "2019", Teaching: 400, NonTeaching: 200, Contract: 50 },
  { year: "2020", Teaching: 420, NonTeaching: 210, Contract: 60 },
  { year: "2021", Teaching: 430, NonTeaching: 220, Contract: 70 },
  { year: "2022", Teaching: 440, NonTeaching: 230, Contract: 80 },
  { year: "2023", Teaching: 450, NonTeaching: 240, Contract: 90 },
];

const admissionMetrics = {
  conversionFunnel: [
    { stage: "Inquiries", count: 5000, conversion: 100 },
    { stage: "Applications", count: 2500, conversion: 50 },
    { stage: "Interviews", count: 1500, conversion: 30 },
    { stage: "Offers", count: 1200, conversion: 24 },
    { stage: "Enrollments", count: 1000, conversion: 20 },
  ],
  programEnrollment: [
    { program: "Computer Science", enrolled: 250, capacity: 300, trend: "up" },
    { program: "Business Admin", enrolled: 180, capacity: 200, trend: "up" },
    { program: "Engineering", enrolled: 150, capacity: 200, trend: "down" },
    { program: "Arts", enrolled: 80, capacity: 100, trend: "stable" },
    { program: "Medicine", enrolled: 120, capacity: 150, trend: "up" },
  ],
  geographicDistribution: [
    { region: "North", students: 35, applications: 1200 },
    { region: "South", students: 25, applications: 900 },
    { region: "East", students: 20, applications: 800 },
    { region: "West", students: 20, applications: 700 },
  ],
  conversionRateByProgram: [
    { program: "Computer Science", rate: 40 },
    { program: "Business Admin", rate: 36 },
    { program: "Engineering", rate: 32 },
    { program: "Arts", rate: 28 },
    { program: "Medicine", rate: 44 },
  ],
  enrollmentTrend: [
    { month: "Jan", enrolled: 120 },
    { month: "Feb", enrolled: 140 },
    { month: "Mar", enrolled: 160 },
    { month: "Apr", enrolled: 180 },
    { month: "May", enrolled: 200 },
    { month: "Jun", enrolled: 220 },
  ],
  topSourceRegions: [
    { region: "North", students: 1200 },
    { region: "South", students: 900 },
    { region: "East", students: 800 },
    { region: "West", students: 700 },
  ],
};

const financialMetrics = {
  revenueByDepartment: [
    { department: "Computer Science", tuition: 5000000, grants: 1000000, other: 500000 },
    { department: "Business Admin", tuition: 4000000, grants: 800000, other: 400000 },
    { department: "Engineering", tuition: 4500000, grants: 900000, other: 450000 },
    { department: "Arts", tuition: 2000000, grants: 400000, other: 200000 },
    { department: "Medicine", tuition: 6000000, grants: 1200000, other: 600000 },
  ],
  costAnalysis: [
    { category: "Infrastructure", cost: 2000000, perStudent: 2000 },
    { category: "Faculty", cost: 3000000, perStudent: 3000 },
    { category: "Admin", cost: 1000000, perStudent: 1000 },
    { category: "Research", cost: 1500000, perStudent: 1500 },
    { category: "Student Services", cost: 500000, perStudent: 500 },
  ],
  budgetUtilization: [
    { department: "Computer Science", allocated: 7000000, used: 6500000 },
    { department: "Business Admin", allocated: 6000000, used: 5200000 },
    { department: "Engineering", allocated: 6500000, used: 5900000 },
    { department: "Arts", allocated: 3000000, used: 2600000 },
    { department: "Medicine", allocated: 8000000, used: 7200000 },
  ],
  yearOverYear: [
    { year: "2022", revenue: 20000000, cost: 15000000 },
    { year: "2023", revenue: 23000000, cost: 17000000 },
    { year: "2024", revenue: 25000000, cost: 18000000 },
  ],
};

const academicMetrics = {
  coursePerformance: [
    { course: "Data Science", passRate: 85, avgGPA: 3.5, enrollment: 120 },
    { course: "Business Law", passRate: 78, avgGPA: 3.2, enrollment: 90 },
    { course: "Engineering Math", passRate: 72, avgGPA: 3.0, enrollment: 150 },
    { course: "Literature", passRate: 88, avgGPA: 3.6, enrollment: 80 },
    { course: "Medicine", passRate: 92, avgGPA: 3.8, enrollment: 100 },
  ],
  facultyPerformance: [
    { faculty: "Dr. Smith", rating: 4.5, publications: 15, students: 120 },
    { faculty: "Dr. Johnson", rating: 4.3, publications: 12, students: 100 },
    { faculty: "Dr. Williams", rating: 4.7, publications: 18, students: 150 },
    { faculty: "Dr. Brown", rating: 4.2, publications: 10, students: 90 },
    { faculty: "Dr. Davis", rating: 4.4, publications: 14, students: 110 },
  ],
  avgGPAByDept: [
    { department: "CS", avgGPA: 3.5 },
    { department: "Business", avgGPA: 3.2 },
    { department: "Engineering", avgGPA: 3.0 },
    { department: "Arts", avgGPA: 3.6 },
    { department: "Medicine", avgGPA: 3.8 },
  ],
  passRateTrend: [
    { month: "Jan", passRate: 80 },
    { month: "Feb", passRate: 82 },
    { month: "Mar", passRate: 85 },
    { month: "Apr", passRate: 83 },
    { month: "May", passRate: 87 },
    { month: "Jun", passRate: 89 },
  ],
  enrollmentByCourse: [
    { course: "Data Science", enrolled: 120 },
    { course: "Business Law", enrolled: 90 },
    { course: "Engineering Math", enrolled: 150 },
    { course: "Literature", enrolled: 80 },
    { course: "Medicine", enrolled: 100 },
  ],
};

const studentEngagement = {
  eventParticipation: [
    { event: "Tech Fest", participants: 500, satisfaction: 4.5 },
    { event: "Cultural Day", participants: 800, satisfaction: 4.7 },
    { event: "Sports Meet", participants: 600, satisfaction: 4.3 },
    { event: "Career Fair", participants: 400, satisfaction: 4.6 },
    { event: "Alumni Meet", participants: 300, satisfaction: 4.4 },
  ],
  feedbackMetrics: [
    { facility: "Cafeteria", rating: 4.2, complaints: 15 },
    { facility: "Library", rating: 4.5, complaints: 8 },
    { facility: "Sports", rating: 4.3, complaints: 12 },
    { facility: "Transport", rating: 4.0, complaints: 20 },
    { facility: "Hostel", rating: 4.1, complaints: 18 },
  ],
  participationRateTrend: [
    { month: "Jan", rate: 60 },
    { month: "Feb", rate: 65 },
    { month: "Mar", rate: 70 },
    { month: "Apr", rate: 68 },
    { month: "May", rate: 75 },
    { month: "Jun", rate: 80 },
  ],
  topRatedFacilities: [
    { facility: "Library", rating: 4.5 },
    { facility: "Cafeteria", rating: 4.2 },
    { facility: "Sports", rating: 4.3 },
    { facility: "Hostel", rating: 4.1 },
    { facility: "Transport", rating: 4.0 },
  ],
  satisfactionTrend: [
    { month: "Jan", satisfaction: 4.2 },
    { month: "Feb", satisfaction: 4.3 },
    { month: "Mar", satisfaction: 4.4 },
    { month: "Apr", satisfaction: 4.3 },
    { month: "May", satisfaction: 4.5 },
    { month: "Jun", satisfaction: 4.6 },
  ],
};

const placementMetrics = {
  programPlacement: [
    { program: "Computer Science", placement: 95, avgSalary: 800000, companies: 25 },
    { program: "Business Admin", placement: 90, avgSalary: 700000, companies: 20 },
    { program: "Engineering", placement: 88, avgSalary: 750000, companies: 22 },
    { program: "Arts", placement: 85, avgSalary: 600000, companies: 15 },
    { program: "Medicine", placement: 98, avgSalary: 900000, companies: 30 },
  ],
  recruiterFeedback: [
    { company: "Tech Corp", satisfaction: 4.5, returnRate: 90, students: 50 },
    { company: "Finance Ltd", satisfaction: 4.3, returnRate: 85, students: 40 },
    { company: "Health Inc", satisfaction: 4.7, returnRate: 95, students: 45 },
    { company: "Edu Group", satisfaction: 4.4, returnRate: 88, students: 35 },
    { company: "Research Co", satisfaction: 4.6, returnRate: 92, students: 30 },
  ],
  placementRateByProgram: [
    { program: "Computer Science", rate: 95 },
    { program: "Business Admin", rate: 90 },
    { program: "Engineering", rate: 88 },
    { program: "Arts", rate: 85 },
    { program: "Medicine", rate: 98 },
  ],
  avgSalaryTrend: [
    { year: "2022", avgSalary: 700000 },
    { year: "2023", avgSalary: 800000 },
    { year: "2024", avgSalary: 900000 },
  ],
  topRecruitingCompanies: [
    { company: "Tech Corp", students: 50 },
    { company: "Finance Ltd", students: 40 },
    { company: "Health Inc", students: 45 },
    { company: "Edu Group", students: 35 },
    { company: "Research Co", students: 30 },
  ],
};

const complianceMetrics = {
  accreditationStatus: [
    { standard: "ETEC", score: 4.2, status: "Accredited", nextReview: "2024" },
    { standard: "MoE", score: 4.0, status: "Accredited", nextReview: "2024" },
    { standard: "SCFHS", score: 4.5, status: "Accredited", nextReview: "2025" },
    { standard: "TVTC", score: 4.3, status: "Accredited", nextReview: "2024" },
  ],
  auditStatus: [
    { area: "Academic", status: "Compliant", issues: 2, resolved: 2 },
    { area: "Financial", status: "Compliant", issues: 1, resolved: 1 },
    { area: "Administrative", status: "Compliant", issues: 3, resolved: 3 },
    { area: "Infrastructure", status: "Compliant", issues: 2, resolved: 2 },
  ],
  issueTrends: [
    { month: "Jan", issues: 5, resolved: 3 },
    { month: "Feb", issues: 4, resolved: 4 },
    { month: "Mar", issues: 6, resolved: 5 },
    { month: "Apr", issues: 3, resolved: 3 },
    { month: "May", issues: 2, resolved: 2 },
    { month: "Jun", issues: 1, resolved: 1 },
  ],
  upcomingReviews: [
    { department: "CS", review: 2024 },
    { department: "Business", review: 2024 },
    { department: "Engineering", review: 2025 },
    { department: "Arts", review: 2024 },
    { department: "Medicine", review: 2025 },
  ],
  resolvedVsUnresolved: [
    { department: "CS", resolved: 10, unresolved: 2 },
    { department: "Business", resolved: 8, unresolved: 1 },
    { department: "Engineering", resolved: 9, unresolved: 3 },
    { department: "Arts", resolved: 7, unresolved: 2 },
    { department: "Medicine", resolved: 12, unresolved: 0 },
  ],
  complianceScore: [
    { department: "CS", score: 95 },
    { department: "Business", score: 92 },
    { department: "Engineering", score: 90 },
    { department: "Arts", score: 88 },
    { department: "Medicine", score: 98 },
  ],
};

const COLORS = ["#6366f1", "#22c55e", "#f59e42", "#eab308", "#a3a3a3"];

export default function DirectorAnalyticsReports() {
  const { t, ready } = useTranslation('director');
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [timeRange, setTimeRange] = useState("6M");
  const [activeTab, setActiveTab] = useState("admissions");
  const user = JSON.parse(localStorage.getItem('rbac_current_user'));

  if (!ready) {
    return <div className="flex min-h-screen bg-[#F6F7FA] dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 items-center justify-center">
      <div className="text-lg text-gray-600 dark:text-gray-300">Loading...</div>
    </div>;
  }

  const renderAdmissionsSection = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Conversion Funnel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg"
        >
          <h3 className="text-sm font-semibold mb-2 text-gray-900 dark:text-white">{t('analyticsReports.sections.admissions.admissionFunnel')}</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={admissionMetrics.conversionFunnel} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="stage" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar dataKey="conversion" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Program-wise Enrollment */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg"
        >
          <h3 className="text-sm font-semibold mb-2 text-gray-900 dark:text-white">{t('analyticsReports.sections.admissions.programEnrollment')}</h3>
          <ResponsiveContainer width="100%" height={200}>
            <ComposedChart data={admissionMetrics.programEnrollment} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="program" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar dataKey="enrolled" fill="#6366f1" radius={[4, 4, 0, 0]} />
              <Line type="monotone" dataKey="capacity" stroke="#ef4444" strokeWidth={2} />
            </ComposedChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Geographic Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg"
        >
          <h3 className="text-sm font-semibold mb-2 text-gray-900 dark:text-white">{t('analyticsReports.sections.admissions.geographicDistribution')}</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={admissionMetrics.geographicDistribution}
                dataKey="students"
                nameKey="region"
                cx="50%"
                cy="50%"
                outerRadius={60}
                label
              >
                {admissionMetrics.geographicDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
      {/* Second Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {/* Application Conversion Rate by Program */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg"
        >
          <h3 className="text-sm font-semibold mb-2 text-gray-900 dark:text-white">{t('analyticsReports.sections.admissions.applicationConversionRate')}</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={admissionMetrics.conversionRateByProgram} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="program" tick={{ fontSize: 10 }} />
              <YAxis tickFormatter={(v) => `${v}%`} tick={{ fontSize: 10 }} />
              <Tooltip formatter={(v) => `${v}%`} />
              <Bar dataKey="rate" fill="#eab308" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
        {/* Enrollment Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg"
        >
          <h3 className="text-sm font-semibold mb-2 text-gray-900 dark:text-white">{t('analyticsReports.sections.admissions.enrollmentTrend')}</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={admissionMetrics.enrollmentTrend} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Line type="monotone" dataKey="enrolled" stroke="#6366f1" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
        {/* Top Source Regions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg"
        >
          <h3 className="text-sm font-semibold mb-2 text-gray-900 dark:text-white">{t('analyticsReports.sections.admissions.topSourceRegions')}</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={admissionMetrics.topSourceRegions} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="region" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar dataKey="students" fill="#22c55e" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </>
  );

  const renderFinancialSection = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Revenue by Department */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg"
        >
          <h3 className="text-sm font-semibold mb-2 text-gray-900 dark:text-white">{t('analyticsReports.sections.financial.revenueByDepartment')}</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={financialMetrics.revenueByDepartment} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="department" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar dataKey="tuition" fill="#6366f1" radius={[4, 4, 0, 0]} />
              <Bar dataKey="grants" fill="#22c55e" radius={[4, 4, 0, 0]} />
              <Bar dataKey="other" fill="#f59e42" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Cost Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg"
        >
          <h3 className="text-sm font-semibold mb-2 text-gray-900 dark:text-white">{t('analyticsReports.sections.financial.costAnalysis')}</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={financialMetrics.costAnalysis} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar dataKey="cost" fill="#6366f1" radius={[4, 4, 0, 0]} />
              <Bar dataKey="perStudent" fill="#22c55e" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Monthly Trends */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg"
        >
          <h3 className="text-sm font-semibold mb-2 text-gray-900 dark:text-white">{t('analyticsReports.sections.financial.monthlyTrends')}</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={monthlyTrends} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Line type="monotone" dataKey="Revenue" stroke="#6366f1" strokeWidth={2} />
              <Line type="monotone" dataKey="Expenses" stroke="#ef4444" strokeWidth={2} />
              <Line type="monotone" dataKey="Profit" stroke="#22c55e" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
      {/* Second Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {/* Profit Margin by Department */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg"
        >
          <h3 className="text-sm font-semibold mb-2 text-gray-900 dark:text-white">{t('analyticsReports.sections.financial.profitMarginByDepartment')}</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={financialMetrics.revenueByDepartment.map(dep => ({
              department: dep.department,
              profit: (dep.tuition || 0) + (dep.grants || 0) + (dep.other || 0)
            }))} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="department" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar dataKey="profit" fill="#22c55e" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
        {/* Budget Utilization by Department */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg"
        >
          <h3 className="text-sm font-semibold mb-2 text-gray-900 dark:text-white">{t('analyticsReports.sections.financial.budgetUtilizationByDepartment')}</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={financialMetrics.budgetUtilization} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="department" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar dataKey="allocated" fill="#6366f1" radius={[4, 4, 0, 0]} />
              <Bar dataKey="used" fill="#f59e42" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
        {/* Year-over-Year Growth */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg"
        >
          <h3 className="text-sm font-semibold mb-2 text-gray-900 dark:text-white">{t('analyticsReports.sections.financial.yearOverYearGrowth')}</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={financialMetrics.yearOverYear} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2} />
              <Line type="monotone" dataKey="cost" stroke="#ef4444" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </>
  );

  const renderAcademicSection = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Course Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg"
        >
          <h3 className="text-sm font-semibold mb-2 text-gray-900 dark:text-white">{t('analyticsReports.sections.academic.coursePerformance')}</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={academicMetrics.coursePerformance} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="course" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar dataKey="passRate" fill="#6366f1" radius={[4, 4, 0, 0]} />
              <Bar dataKey="avgGPA" fill="#22c55e" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
        {/* Faculty Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg"
        >
          <h3 className="text-sm font-semibold mb-2 text-gray-900 dark:text-white">{t('analyticsReports.sections.academic.facultyPerformance')}</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={academicMetrics.facultyPerformance} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="faculty" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar dataKey="rating" fill="#6366f1" radius={[4, 4, 0, 0]} />
              <Bar dataKey="publications" fill="#22c55e" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
        {/* Student Demographics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg"
        >
          <h3 className="text-sm font-semibold mb-2 text-gray-900 dark:text-white">{t('analyticsReports.sections.academic.studentDemographics')}</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={studentDemographics.regions}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={60}
                label
              >
                {studentDemographics.regions.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
      {/* Second Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {/* Average GPA by Department */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg"
        >
          <h3 className="text-sm font-semibold mb-2 text-gray-900 dark:text-white">{t('analyticsReports.sections.academic.averageGPAByDepartment')}</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={academicMetrics.avgGPAByDept} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="department" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar dataKey="avgGPA" fill="#eab308" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
        {/* Pass Rate Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg"
        >
          <h3 className="text-sm font-semibold mb-2 text-gray-900 dark:text-white">{t('analyticsReports.sections.academic.passRateTrend')}</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={academicMetrics.passRateTrend} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Line type="monotone" dataKey="passRate" stroke="#6366f1" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
        {/* Enrollment by Course */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg"
        >
          <h3 className="text-sm font-semibold mb-2 text-gray-900 dark:text-white">{t('analyticsReports.sections.academic.enrollmentByCourse')}</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={academicMetrics.enrollmentByCourse} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="course" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar dataKey="enrolled" fill="#22c55e" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </>
  );

  const renderStudentEngagementSection = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Event Participation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg"
        >
          <h3 className="text-sm font-semibold mb-2 text-gray-900 dark:text-white">{t('analyticsReports.sections.engagement.eventParticipation')}</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={studentEngagement.eventParticipation} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="event" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar dataKey="participants" fill="#6366f1" radius={[4, 4, 0, 0]} />
              <Bar dataKey="satisfaction" fill="#22c55e" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
        {/* Feedback Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg"
        >
          <h3 className="text-sm font-semibold mb-2 text-gray-900 dark:text-white">{t('analyticsReports.sections.engagement.feedbackMetrics')}</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={studentEngagement.feedbackMetrics} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="facility" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar dataKey="rating" fill="#6366f1" radius={[4, 4, 0, 0]} />
              <Bar dataKey="complaints" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
        {/* Staff Analytics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg"
        >
          <h3 className="text-sm font-semibold mb-2 text-gray-900 dark:text-white">{t('analyticsReports.sections.engagement.staffAnalytics')}</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={staffAnalytics} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Line type="monotone" dataKey="Teaching" stroke="#6366f1" strokeWidth={2} />
              <Line type="monotone" dataKey="NonTeaching" stroke="#22c55e" strokeWidth={2} />
              <Line type="monotone" dataKey="Contract" stroke="#f59e42" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
      {/* Second Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {/* Event Participation Rate Over Time */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg"
        >
          <h3 className="text-sm font-semibold mb-2 text-gray-900 dark:text-white">{t('analyticsReports.sections.engagement.eventParticipationRateOverTime')}</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={studentEngagement.participationRateTrend} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Line type="monotone" dataKey="rate" stroke="#6366f1" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
        {/* Top Rated Facilities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg"
        >
          <h3 className="text-sm font-semibold mb-2 text-gray-900 dark:text-white">{t('analyticsReports.sections.engagement.topRatedFacilities')}</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={studentEngagement.topRatedFacilities} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="facility" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar dataKey="rating" fill="#eab308" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
        {/* Student Satisfaction Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg"
        >
          <h3 className="text-sm font-semibold mb-2 text-gray-900 dark:text-white">{t('analyticsReports.sections.engagement.studentSatisfactionTrend')}</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={studentEngagement.satisfactionTrend} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Line type="monotone" dataKey="satisfaction" stroke="#22c55e" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </>
  );

  const renderPlacementSection = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Program Placement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg"
        >
          <h3 className="text-sm font-semibold mb-2 text-gray-900 dark:text-white">{t('analyticsReports.sections.placement.programPlacement')}</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={placementMetrics.programPlacement} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="program" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar dataKey="placement" fill="#6366f1" radius={[4, 4, 0, 0]} />
              <Bar dataKey="avgSalary" fill="#22c55e" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
        {/* Recruiter Feedback */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg"
        >
          <h3 className="text-sm font-semibold mb-2 text-gray-900 dark:text-white">{t('analyticsReports.sections.placement.recruiterFeedback')}</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={placementMetrics.recruiterFeedback} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="company" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar dataKey="satisfaction" fill="#6366f1" radius={[4, 4, 0, 0]} />
              <Bar dataKey="returnRate" fill="#22c55e" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
        {/* Department Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg"
        >
          <h3 className="text-sm font-semibold mb-2 text-gray-900 dark:text-white">{t('analyticsReports.sections.placement.departmentPerformance')}</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={departmentPerformance} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="dept" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar dataKey="KPI" fill="#6366f1" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Budget" fill="#22c55e" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Revenue" fill="#f59e42" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
      {/* Second Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {/* Placement Rate by Program */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg"
        >
          <h3 className="text-sm font-semibold mb-2 text-gray-900 dark:text-white">{t('analyticsReports.sections.placement.placementRateByProgram')}</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={placementMetrics.placementRateByProgram} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="program" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar dataKey="rate" fill="#eab308" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
        {/* Average Salary Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg"
        >
          <h3 className="text-sm font-semibold mb-2 text-gray-900 dark:text-white">{t('analyticsReports.sections.placement.averageSalaryTrend')}</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={placementMetrics.avgSalaryTrend} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Line type="monotone" dataKey="avgSalary" stroke="#6366f1" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
        {/* Top Recruiting Companies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg"
        >
          <h3 className="text-sm font-semibold mb-2 text-gray-900 dark:text-white">{t('analyticsReports.sections.placement.topRecruitingCompanies')}</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={placementMetrics.topRecruitingCompanies} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="company" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar dataKey="students" fill="#22c55e" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </>
  );

  const renderComplianceSection = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Accreditation Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg"
        >
          <h3 className="text-sm font-semibold mb-2 text-gray-900 dark:text-white">{t('analyticsReports.sections.compliance.accreditationStatus')}</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={complianceMetrics.accreditationStatus} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="standard" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar dataKey="score" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
        {/* Audit Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg"
        >
          <h3 className="text-sm font-semibold mb-2 text-gray-900 dark:text-white">{t('analyticsReports.sections.compliance.auditStatus')}</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={complianceMetrics.auditStatus} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="area" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar dataKey="issues" fill="#ef4444" radius={[4, 4, 0, 0]} />
              <Bar dataKey="resolved" fill="#22c55e" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
        {/* Compliance Issue Trends */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg"
        >
          <h3 className="text-sm font-semibold mb-2 text-gray-900 dark:text-white">{t('analyticsReports.sections.compliance.complianceIssueTrends')}</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={complianceMetrics.issueTrends} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Line type="monotone" dataKey="issues" stroke="#ef4444" strokeWidth={2} />
              <Line type="monotone" dataKey="resolved" stroke="#22c55e" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
      {/* Second Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {/* Upcoming Reviews */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg"
        >
          <h3 className="text-sm font-semibold mb-2 text-gray-900 dark:text-white">{t('analyticsReports.sections.compliance.upcomingReviews')}</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={complianceMetrics.upcomingReviews} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="department" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar dataKey="review" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
        {/* Resolved vs Unresolved Issues */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg"
        >
          <h3 className="text-sm font-semibold mb-2 text-gray-900 dark:text-white">{t('analyticsReports.sections.compliance.resolvedVsUnresolvedIssues')}</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={complianceMetrics.resolvedVsUnresolved} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="department" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar dataKey="resolved" fill="#22c55e" radius={[4, 4, 0, 0]} />
              <Bar dataKey="unresolved" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
        {/* Department Compliance Score */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg"
        >
          <h3 className="text-sm font-semibold mb-2 text-gray-900 dark:text-white">{t('analyticsReports.sections.compliance.departmentComplianceScore')}</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={complianceMetrics.complianceScore} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="department" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar dataKey="score" fill="#eab308" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen bg-[#F6F7FA] dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800">
      <main className="flex-1 p-4 md:p-6 flex flex-col gap-8 overflow-x-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('analyticsReports.title')}</h1>
            <p className="text-sm text-gray-600 dark:text-gray-300">{t('analyticsReports.subtitle')}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="px-3 py-1.5 text-sm rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="All">{t('analyticsReports.allDepartments')}</option>
              {admissionMetrics.programEnrollment.map((dept) => (
                <option key={dept.program} value={dept.program}>
                  {dept.program}
                </option>
              ))}
            </select>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-3 py-1.5 text-sm rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="1M">{t('analyticsReports.lastMonth')}</option>
              <option value="3M">{t('analyticsReports.last3Months')}</option>
              <option value="6M">{t('analyticsReports.last6Months')}</option>
              <option value="1Y">{t('analyticsReports.lastYear')}</option>
            </select>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2">
          {["admissions", "financial", "academic", "engagement", "placement", "compliance"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900"
              }`}
            >
              {t(`analyticsReports.tabs.${tab}`)}
            </button>
          ))}
        </div>

        {/* Content Sections */}
        {activeTab === "admissions" && renderAdmissionsSection()}
        {activeTab === "financial" && renderFinancialSection()}
        {activeTab === "academic" && renderAcademicSection()}
        {activeTab === "engagement" && renderStudentEngagementSection()}
        {activeTab === "placement" && renderPlacementSection()}
        {activeTab === "compliance" && renderComplianceSection()}
      </main>
    </div>
  );
} 