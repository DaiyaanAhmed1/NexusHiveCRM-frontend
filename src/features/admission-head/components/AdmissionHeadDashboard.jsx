import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiUsers, FiCalendar, FiDollarSign, FiFileText, FiCheckCircle, 
  FiAlertCircle, FiTrendingUp, FiTrendingDown, FiBarChart2, 
  FiPieChart, FiMap, FiFilter, FiDownload, FiBell, FiClock,
  FiUserCheck, FiUserX, FiPercent, FiTarget, FiGlobe, FiBook
} from 'react-icons/fi';

// Demo data for admission funnel
const admissionFunnel = [
  { label: "Total Inquiries", value: 5000, change: "+12%", trend: "up", icon: <FiUsers />, color: "blue" },
  { label: "Applications Started", value: 2500, change: "+8%", trend: "up", icon: <FiFileText />, color: "purple" },
  { label: "Applications Submitted", value: 1800, change: "+5%", trend: "up", icon: <FiCheckCircle />, color: "green" },
  { label: "Applications Approved", value: 1200, change: "+15%", trend: "up", icon: <FiUserCheck />, color: "emerald" },
  { label: "Offers Sent", value: 1000, change: "+10%", trend: "up", icon: <FiTarget />, color: "amber" },
  { label: "Admissions Confirmed", value: 800, change: "+20%", trend: "up", icon: <FiUserCheck />, color: "teal" },
  { label: "Enrolled Students", value: 750, change: "+18%", trend: "up", icon: <FiUsers />, color: "indigo" },
];

// Demo data for lead sources
const leadSources = [
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
const demographics = {
  regions: [
    { region: "North", percentage: 35 },
    { region: "South", percentage: 25 },
    { region: "East", percentage: 20 },
    { region: "West", percentage: 20 },
  ],
  gender: [
    { type: "Male", percentage: 55 },
    { type: "Female", percentage: 45 },
  ],
  ageGroups: [
    { range: "18-20", percentage: 45 },
    { range: "21-23", percentage: 35 },
    { range: "24+", percentage: 20 },
  ],
};

// Demo data for pending actions
const pendingActions = [
  { type: "Application Review", count: 45, priority: "high" },
  { type: "Campaign Approval", count: 3, priority: "medium" },
  { type: "Overbooking Alert", count: 2, priority: "high" },
  { type: "Policy Review", count: 1, priority: "low" },
];

// Demo data for alerts
const alerts = [
  { type: "Application Spike", message: "Unusual increase in applications from Telangana region", severity: "info" },
  { type: "Capacity Alert", message: "Law Department admissions nearing capacity", severity: "warning" },
  { type: "System Notice", message: "New admission policy update from Director", severity: "info" },
];

export default function AdmissionHeadDashboard() {
  const user = JSON.parse(localStorage.getItem('rbac_current_user'));
  const [expanded, setExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [timeRange, setTimeRange] = useState("current");

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      {/* Header with Filters */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-2 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50/60 to-purple-50/40 dark:from-gray-900 dark:to-gray-800 rounded-xl px-4 py-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admission Head Dashboard</h1>
          <p className="text-sm text-gray-600 dark:text-gray-300">Comprehensive admission analytics and insights</p>
        </div>
        <div className="flex gap-4">
          <select 
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm"
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
          >
            <option value="all">All Departments</option>
            <option value="engineering">Engineering</option>
            <option value="business">Business</option>
            <option value="arts">Arts</option>
          </select>
          <select 
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="current" className="text-gray-700 dark:text-gray-200">Current Cycle</option>
            <option value="last" className="text-gray-700 dark:text-gray-200">Last Cycle</option>
            <option value="yoy" className="text-gray-700 dark:text-gray-200">Year over Year</option>
          </select>
          <button className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700">
            <FiDownload className="text-gray-500" />
            Export
          </button>
        </div>
      </div>

      {/* Admission Funnel */}
      <section className="bg-white dark:bg-gray-800/80 rounded-xl shadow p-6">
                  <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <FiBarChart2 className="text-blue-500" />
              <h2 className="text-lg font-semibold">Admission Funnel Overview</h2>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">YoY Comparison</span>
          </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
          {admissionFunnel.map((stage, index) => (
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
        <section className="bg-white dark:bg-gray-800/80 rounded-xl shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <FiPieChart className="text-purple-500" />
              <h2 className="text-lg font-semibold">Lead Source Performance</h2>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">Last 30 Days</span>
          </div>
          <div className="space-y-4">
            {leadSources.map((source) => (
              <div key={source.source} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">{source.source}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {source.conversions}% Conversion Rate
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {source.applications} Applications
                  </p>
                  <p className={`text-sm ${source.trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                    {source.trend} vs Last Month
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Department Status */}
        <section className="bg-white dark:bg-gray-800/80 rounded-xl shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <FiTarget className="text-green-500" />
              <h2 className="text-lg font-semibold">Department-wise Status</h2>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">Current Cycle</span>
          </div>
          <div className="space-y-4">
            {departmentStatus.map((dept) => (
              <div key={dept.department} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900 dark:text-white">{dept.department}</h3>
                  <span className={`text-sm font-medium ${dept.fillRate >= 90 ? 'text-green-500' : 'text-yellow-500'}`}>
                    {dept.fillRate}% Fill Rate
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2 text-sm">
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Total Seats</p>
                    <p className="font-medium text-gray-900 dark:text-white">{dept.totalSeats}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Applications</p>
                    <p className="font-medium text-gray-900 dark:text-white">{dept.applications}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Filled</p>
                    <p className="font-medium text-gray-900 dark:text-white">{dept.filled}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Waitlisted</p>
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
        <section className="bg-white dark:bg-gray-800/80 rounded-xl shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <FiGlobe className="text-blue-500" />
              <h2 className="text-lg font-semibold">Demographics Snapshot</h2>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">Current Applicants</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Regional Distribution</h3>
              {demographics.regions.map((region) => (
                <div key={region.region} className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-300">{region.region}</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{region.percentage}%</span>
                </div>
              ))}
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Gender Ratio</h3>
              {demographics.gender.map((item) => (
                <div key={item.type} className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-300">{item.type}</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{item.percentage}%</span>
                </div>
              ))}
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Age Distribution</h3>
              {demographics.ageGroups.map((group) => (
                <div key={group.range} className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-300">{group.range}</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{group.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pending Actions & Alerts */}
        <section className="bg-white dark:bg-gray-800/80 rounded-xl shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <FiBell className="text-red-500" />
              <h2 className="text-lg font-semibold">Pending Actions & Alerts</h2>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">Requires Attention</span>
          </div>
          <div className="space-y-4">
            {pendingActions.map((action) => (
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
                      {action.count} items pending
                    </p>
                  </div>
                </div>
                <button className="text-sm text-blue-500 hover:text-blue-600">View Details</button>
              </div>
            ))}
            {alerts.map((alert, index) => (
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
      <section className="bg-gradient-to-r from-purple-50/60 to-blue-50/40 dark:from-gray-900 dark:to-gray-800 rounded-xl shadow p-6">
                  <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <FiBook className="text-purple-500" />
              <h2 className="text-lg font-semibold">AI-Powered Insights</h2>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">Updated Daily</span>
          </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg backdrop-blur-sm">
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">Enrollment Forecast</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Based on current trends, expected enrollment for next cycle: <span className="font-medium text-green-500">+15%</span>
            </p>
          </div>
          <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg backdrop-blur-sm">
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">Department Alert</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Design department applications may fall short by <span className="font-medium text-red-500">15%</span> this year
            </p>
          </div>
          <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg backdrop-blur-sm">
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">Resource Planning</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Hostel accommodation capacity nearing <span className="font-medium text-yellow-500">90%</span>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
} 