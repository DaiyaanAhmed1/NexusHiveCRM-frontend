import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { BarChart, LineChart, PieChart } from '../../../components/ui/charts';
import { FiBell, FiSearch, FiDownload, FiCalendar, FiExternalLink, FiInfo } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

// Demo/mock data for all sections
const funnelData = [
  { stage: 'Inquiries', value: 1200 },
  { stage: 'Leads', value: 800 },
  { stage: 'Applications', value: 400 },
  { stage: 'Enrollments', value: 180 },
];
const dropOffRates = [33, 50, 55];
const campaignChannels = [
  { name: 'Google', cpl: 25, cpa: 120, roi: 3.2, conversions: 80 },
  { name: 'Facebook', cpl: 30, cpa: 140, roi: 2.8, conversions: 60 },
  { name: 'Instagram', cpl: 28, cpa: 135, roi: 2.9, conversions: 50 },
  { name: 'Events', cpl: 40, cpa: 180, roi: 2.2, conversions: 30 },
];
const geoData = [
  { region: 'Riyadh', leads: 200, conversions: 50 },
  { region: 'Jeddah', leads: 180, conversions: 40 },
  { region: 'Dammam', leads: 150, conversions: 35 },
  { region: 'Mecca', leads: 120, conversions: 30 },
];
const demographicData = [
  { group: '18-22', value: 300 },
  { group: '23-27', value: 400 },
  { group: '28-32', value: 150 },
];
const genderData = [
  { group: 'Male', value: 420 },
  { group: 'Female', value: 430 },
  { group: 'Other', value: 20 },
];
const predictiveEnrollment = [
  { month: 'Apr', predicted: 150 },
  { month: 'May', predicted: 180 },
  { month: 'Jun', predicted: 210 },
  { month: 'Jul', predicted: 250 },
];
const brandEngagement = [
  { channel: 'Instagram', followers: 12000, engagement: 4.2 },
  { channel: 'Facebook', followers: 9000, engagement: 3.8 },
  { channel: 'LinkedIn', followers: 5000, engagement: 2.5 },
];
const websiteTraffic = [
  { month: 'Apr', sessions: 8000, bounce: 45, duration: 2.3 },
  { month: 'May', sessions: 9000, bounce: 42, duration: 2.5 },
  { month: 'Jun', sessions: 9500, bounce: 40, duration: 2.7 },
];
const budgetData = [
  { channel: 'Digital', budget: 50000, spent: 42000 },
  { channel: 'Print', budget: 20000, spent: 15000 },
  { channel: 'Events', budget: 30000, spent: 22000 },
];
const eventCalendar = [
  { event: 'Open House', date: '2024-07-10', status: 'Upcoming', expected: 120 },
  { event: 'Webinar', date: '2024-07-15', status: 'Upcoming', expected: 80 },
  { event: 'Fair', date: '2024-06-20', status: 'Completed', turnout: 100 },
];
const departmentInsights = [
  { dept: 'Engineering', inquiries: 300, conversions: 80 },
  { dept: 'Business', inquiries: 250, conversions: 60 },
  { dept: 'Arts', inquiries: 180, conversions: 40 },
];
const notifications = [
  { typeKey: 'dashboard.notifications.newLead', messageKey: 'dashboard.notifications.messages.newLeads', priority: 'info' },
  { typeKey: 'dashboard.notifications.hotLead', messageKey: 'dashboard.notifications.messages.hotLeads', priority: 'warning' },
  { typeKey: 'dashboard.notifications.overdue', messageKey: 'dashboard.notifications.messages.overdueLeads', priority: 'danger' },
];

const kpis = [
  { labelKey: 'dashboard.kpis.totalLeads', value: 2345, icon: '🎯', color: 'bg-blue-100 text-blue-700', trend: '+12.5%' },
  { labelKey: 'dashboard.kpis.conversionRate', value: '23.4%', icon: '📈', color: 'bg-green-100 text-green-700', trend: '+2.1%' },
  { labelKey: 'dashboard.kpis.campaignROI', value: '4.2x', icon: '💰', color: 'bg-purple-100 text-purple-700', trend: '+0.3x' },
  { labelKey: 'dashboard.kpis.activeCampaigns', value: 12, icon: '📢', color: 'bg-pink-100 text-pink-700', trend: '3 ending soon' },
  { labelKey: 'dashboard.kpis.followers', value: '26.5K', icon: '👥', color: 'bg-yellow-100 text-yellow-700', trend: '+1.2K' },
];
const recentActivity = [
  { actionKey: 'dashboard.activity.newLeadAdded', time: '2 hours ago', user: 'Abdullah Al-Rashid' },
  { actionKey: 'dashboard.activity.campaignLaunched', time: '5 hours ago', user: 'Noura Al-Zahra' },
  { actionKey: 'dashboard.activity.reportGenerated', time: '1 day ago', user: 'Khalid Al-Sayed' },
  { actionKey: 'dashboard.activity.budgetRequestApproved', time: '2 days ago', user: 'Aisha Al-Hassan' },
];
const user = { displayName: 'Omar Al-Mutairi', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', role: 'Marketing Head' };

export default function Dashboard() {
  const { t, ready, i18n } = useTranslation(['dashboard', 'common']);
  const [search, setSearch] = useState('');
  const [dateRange, setDateRange] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // Initialize dateRange when i18n is ready
  useEffect(() => {
    if (ready) {
      setDateRange(t('dashboard.dateRange'));
    }
  }, [ready, t]);

  // Force re-render when language changes
  const [languageVersion, setLanguageVersion] = useState(0);
  
  useEffect(() => {
    const handleLanguageChange = () => {
      console.log('MarketingHead Dashboard - Language changed to:', i18n.language);
      setLanguageVersion(prev => prev + 1);
      setDateRange(t('dashboard.dateRange'));
    };
    
    i18n.on('languageChanged', handleLanguageChange);
    
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n, t]);

  // Show loading state if i18n is not ready
  if (!ready) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">{t('loading')}</h1>
        </div>
      </div>
    );
  }

  return (
    <div key={`${i18n.language}-${languageVersion}`} className="space-y-10 animate-fade-in">
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50/60 to-purple-50/40 dark:from-gray-900 dark:to-gray-800 rounded-xl px-4 py-6 relative">
        <div className="flex items-center gap-4">
          <img src={user.avatar} alt="avatar" className="w-14 h-14 rounded-full border-2 border-blue-400 shadow" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('dashboard.user.welcome')} {user.displayName}</h1>
            <p className="text-sm text-gray-600 dark:text-gray-300">{t('dashboard.user.role')}: {user.role}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 items-center">
          <div className="relative">
            <input
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder={t('dashboard.searchPlaceholder')}
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
          <select
            className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
            value={dateRange}
            onChange={e => setDateRange(e.target.value)}
          >
            <option>{t('dashboard.dateRanges.last7Days')}</option>
            <option>{t('dashboard.dateRanges.last30Days')}</option>
            <option>{t('dashboard.dateRanges.last90Days')}</option>
            <option>{t('dashboard.dateRanges.custom')}</option>
          </select>
          <button
            className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-700 transition relative"
            onClick={() => setShowCalendar(v => !v)}
            title={t('dashboard.calendar')}
          >
            <FiCalendar size={20} />
          </button>
          <button className="p-2 rounded-full bg-yellow-100 hover:bg-yellow-200 text-yellow-700 transition relative" title="Notifications" onClick={() => setShowNotifications(v => !v)}>
            <FiBell size={20} />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5">3</span>
          </button>
          <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition" title={t('dashboard.buttons.exportDashboard')}>
            <FiDownload size={20} />
          </button>
        </div>
        {/* Notifications Dropdown (Demo) */}
        {showNotifications && (
          <div className="absolute right-8 top-20 z-50 bg-white dark:bg-gray-900 rounded-xl shadow-lg p-4 border border-gray-200 dark:border-gray-700 w-72 animate-fade-in">
            <div className="font-semibold mb-2">{t('dashboard.notifications')}</div>
            <ul className="space-y-2">
              {notifications.map((n, i) => (
                <li key={i} className={`flex items-center gap-2 px-2 py-1 rounded ${n.priority === 'info' ? 'bg-blue-50' : n.priority === 'warning' ? 'bg-yellow-50' : 'bg-red-50'}`}> 
                  <span className={`w-2 h-2 rounded-full ${n.priority === 'info' ? 'bg-blue-500' : n.priority === 'warning' ? 'bg-yellow-500' : 'bg-red-500'}`}></span>
                  <span className="text-xs text-gray-700 dark:text-gray-300">{t(n.messageKey)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {/* Mini Calendar Widget */}
      {showCalendar && (
        <div className="absolute z-50 mt-2 bg-white dark:bg-gray-900 rounded-xl shadow-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="font-semibold mb-2">{t('dashboard.calendar')} (Demo)</div>
          <div className="grid grid-cols-7 gap-1 text-center text-xs">
            {[...Array(30)].map((_, i) => (
              <div key={i} className="py-1 px-2 rounded hover:bg-blue-100 cursor-pointer">{i + 1}</div>
            ))}
          </div>
        </div>
      )}
      {/* Animated KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {kpis.map((kpi, idx) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`${kpi.color} p-4 rounded-xl shadow hover:shadow-lg transition cursor-pointer group relative overflow-hidden`}
            title={kpi.label}
          >
            <div className="flex items-center justify-between">
              <span className="text-2xl">{kpi.icon}</span>
              <span className="text-2xl font-bold group-hover:scale-110 transition-transform duration-200">{kpi.value}</span>
            </div>
            <p className="text-sm mt-2">{t(kpi.labelKey)}</p>
            <span className="absolute bottom-2 right-2 text-xs text-green-600 font-semibold animate-fade-in">{kpi.trend}</span>
            <span className="absolute top-2 right-2 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" title={t('dashboard.buttons.viewDetails')}><FiExternalLink /></span>
          </motion.div>
        ))}
      </div>
      {/* Recent Activity Feed */}
      <div className="bg-gradient-to-r from-blue-50/60 to-purple-50/40 dark:from-gray-900 dark:to-gray-800 rounded-xl p-6 shadow flex flex-col md:flex-row gap-6 items-start md:items-center justify-between border border-gray-100 dark:border-gray-800">
        <div className="flex-1">
          <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-200 flex items-center gap-2">{t('dashboard.sections.recentActivity')} <FiInfo title='Latest actions by your team' className='text-blue-400' /></h3>
          <ul className="space-y-1 text-sm">
            {recentActivity.map((a, i) => (
              <li key={i} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <span className="w-2 h-2 rounded-full bg-blue-500 inline-block"></span>
                <span className="font-medium">{t(a.actionKey)}</span>
                <span className="text-xs text-gray-400">{a.time} by {a.user}</span>
              </li>
            ))}
          </ul>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2 mt-4 md:mt-0" title="Download Activity Log">
          <FiDownload /> Export Log
        </button>
      </div>
      {/* Section Divider */}
      <div className="border-t border-dashed border-gray-300 dark:border-gray-700 my-6" />
      {/* 1. Lead Funnel Overview */}
      <section>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-bold flex items-center gap-2">📊 {t('dashboard.sections.leadFunnel')} <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded animate-pulse">AI Forecast</span></h2>
          <button className="flex items-center gap-1 px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded transition text-xs" title={t('dashboard.buttons.exportFunnelData')}><FiDownload /> {t('dashboard.buttons.export')}</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-4 hover:shadow-lg transition group cursor-pointer relative">
            <CardTitle className="mb-2 flex items-center gap-2">{t('dashboard.sections.leadFunnel')} <FiInfo title='Lead journey stages' className='text-blue-400' /></CardTitle>
            <BarChart data={funnelData.map(d => ({ ...d, name: d.stage }))} categories={['value']} />
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              {dropOffRates.map((rate, idx) => (
                <span key={idx}>Drop-off: {rate}%</span>
              ))}
            </div>
            <span className="absolute top-2 right-2 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" title={t('dashboard.buttons.drillDown')}><FiExternalLink /></span>
          </Card>
          <Card className="p-4 hover:shadow-lg transition group cursor-pointer relative">
            <CardTitle className="mb-2 flex items-center gap-2">{t('dashboard.sections.predictiveAnalytics')} <FiInfo title='AI-powered forecast' className='text-blue-400' /></CardTitle>
            <LineChart data={predictiveEnrollment.map((d, i) => ({ ...d, name: d.month }))} categories={['predicted']} />
            <div className="mt-2 text-xs text-blue-600 animate-bounce">AI: Next month forecast is 250 enrollments</div>
            <span className="absolute top-2 right-2 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" title={t('dashboard.buttons.drillDown')}><FiExternalLink /></span>
          </Card>
        </div>
      </section>

      {/* 2. Campaign Performance Tracker */}
      <section>
        <h2 className="text-xl font-bold mb-2 flex items-center gap-2">📈 Campaign Performance Tracker <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded animate-pulse">AI Optimization</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-4">
            <CardTitle className="mb-2">Channel Performance</CardTitle>
            <BarChart data={campaignChannels} categories={['roi', 'conversions']} />
            <div className="mt-2 text-xs text-green-600 animate-bounce">AI: Google is most cost-effective for Engineering programs</div>
          </Card>
          <Card className="p-4">
            <CardTitle className="mb-2">CPL & CPA</CardTitle>
            <BarChart data={campaignChannels} categories={['cpl', 'cpa']} />
            <div className="mt-2 text-xs text-green-600 animate-bounce">AI: Reduce spend on Events, increase on Google</div>
          </Card>
        </div>
      </section>

      {/* 3. Demographic & Geographic Heatmap */}
      <section>
        <h2 className="text-xl font-bold mb-2 flex items-center gap-2">🌍 Demographic & Geographic Heatmap <span className="ml-2 text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded animate-pulse">AI Region Insights</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-4">
            <CardTitle className="mb-2">Location-wise Conversions</CardTitle>
            <BarChart data={geoData} categories={['leads', 'conversions']} />
            <div className="mt-2 text-xs text-pink-600 animate-bounce">AI: Dammam is an untapped region with high potential</div>
          </Card>
          <Card className="p-4">
            <CardTitle className="mb-2">Demographics</CardTitle>
            <PieChart data={demographicData} />
            <div className="mt-2 text-xs text-pink-600 animate-bounce">AI: 23-27 age group most likely to convert</div>
          </Card>
        </div>
      </section>

      {/* 4. Predictive Enrollment Insights */}
      <section>
        <h2 className="text-xl font-bold mb-2 flex items-center gap-2">🧠 Predictive Enrollment Insights <span className="ml-2 text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded animate-pulse">AI Forecast</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-4">
            <CardTitle className="mb-2">Predicted Applications</CardTitle>
            <LineChart data={predictiveEnrollment} categories={['predicted']} />
            <div className="mt-2 text-xs text-purple-600 animate-bounce">AI: Business dept. interest rising</div>
          </Card>
          <Card className="p-4">
            <CardTitle className="mb-2">Revenue Forecast</CardTitle>
            <BarChart data={departmentInsights} categories={['conversions']} />
            <div className="mt-2 text-xs text-purple-600 animate-bounce">AI: Engineering will contribute 45% of revenue</div>
          </Card>
        </div>
      </section>

      {/* 5. Brand Engagement Analytics */}
      <section>
        <h2 className="text-xl font-bold mb-2 flex items-center gap-2">📣 Brand Engagement Analytics <span className="ml-2 text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded animate-pulse">AI Sentiment</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-4">
            <CardTitle className="mb-2">Social Media</CardTitle>
            <BarChart data={brandEngagement} categories={['followers', 'engagement']} />
            <div className="mt-2 text-xs text-yellow-600 animate-bounce">AI: Sentiment positive, trending keywords: "placements", "campus life"</div>
          </Card>
          <Card className="p-4">
            <CardTitle className="mb-2">Website Traffic</CardTitle>
            <LineChart data={websiteTraffic} categories={['sessions', 'bounce', 'duration']} />
            <div className="mt-2 text-xs text-yellow-600 animate-bounce">AI: Blog posts on scholarships drive most traffic</div>
          </Card>
        </div>
      </section>

      {/* 6. Budget Utilization Summary */}
      <section>
        <h2 className="text-xl font-bold mb-2 flex items-center gap-2">🧾 Budget Utilization Summary <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded animate-pulse">AI Budgeting</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-4">
            <CardTitle className="mb-2">Budget vs Spent</CardTitle>
            <BarChart data={budgetData} categories={['budget', 'spent']} />
            <div className="mt-2 text-xs text-blue-600 animate-bounce">AI: Suggest reallocating 10% from Print to Digital</div>
          </Card>
          <Card className="p-4">
            <CardTitle className="mb-2">Expense by Channel</CardTitle>
            <PieChart data={budgetData.map(b => ({ group: b.channel, value: b.spent }))} />
            <div className="mt-2 text-xs text-blue-600 animate-bounce">AI: Digital channel yields highest ROI</div>
          </Card>
        </div>
      </section>

      {/* 7. Event Calendar & Performance */}
      <section>
        <h2 className="text-xl font-bold mb-2 flex items-center gap-2">🗓️ Event Calendar & Performance <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded animate-pulse">AI Event Insights</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-4">
            <CardTitle className="mb-2">Upcoming Events</CardTitle>
            <ul className="space-y-2">
              {eventCalendar.filter(e => e.status === 'Upcoming').map((e, i) => (
                <li key={i} className="flex justify-between items-center">
                  <span>{e.event} ({e.date})</span>
                  <span className="text-xs text-gray-500">Expected: {e.expected}</span>
                </li>
              ))}
            </ul>
            <div className="mt-2 text-xs text-green-600 animate-bounce">AI: Open House expected to yield 30 enrollments</div>
          </Card>
          <Card className="p-4">
            <CardTitle className="mb-2">Past Event Performance</CardTitle>
            <BarChart data={eventCalendar.filter(e => e.status === 'Completed')} categories={['turnout']} />
            <div className="mt-2 text-xs text-green-600 animate-bounce">AI: Fairs have highest lead-to-conversion rate</div>
          </Card>
        </div>
      </section>

      {/* 8. Department-wise Marketing Insights */}
      <section>
        <h2 className="text-xl font-bold mb-2 flex items-center gap-2">🏫 Department-wise Marketing Insights <span className="ml-2 text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded animate-pulse">AI Course Trends</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-4">
            <CardTitle className="mb-2">Inquiry & Conversion Rates</CardTitle>
            <BarChart data={departmentInsights} categories={['inquiries', 'conversions']} />
            <div className="mt-2 text-xs text-purple-600 animate-bounce">AI: Engineering trending, Arts underperforming</div>
          </Card>
          <Card className="p-4">
            <CardTitle className="mb-2">Resource Allocation</CardTitle>
            <PieChart data={departmentInsights.map(d => ({ group: d.dept, value: d.inquiries }))} />
            <div className="mt-2 text-xs text-purple-600 animate-bounce">AI: Allocate more budget to Business programs</div>
          </Card>
        </div>
      </section>

      {/* 9. Action Center (Quick Actions) */}
      <section>
        <h2 className="text-xl font-bold mb-2 flex items-center gap-2">🛠️ Action Center (Quick Actions)</h2>
        <div className="flex flex-wrap gap-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Create New Campaign</button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">Assign Leads</button>
          <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition">Send Bulk Email/SMS</button>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">Schedule Event</button>
          <button className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition">Request Budget</button>
        </div>
      </section>

      {/* 10. Lead Status Notifications */}
      <section>
        <h2 className="text-xl font-bold mb-2 flex items-center gap-2">📬 Lead Status Notifications</h2>
        <div className="flex flex-wrap gap-4">
          {notifications.map((n, i) => (
            <div key={i} className={`px-4 py-2 rounded-lg shadow text-white ${n.priority === 'info' ? 'bg-blue-500' : n.priority === 'warning' ? 'bg-yellow-500' : 'bg-red-500'} animate-fade-in`}>{n.message}</div>
          ))}
        </div>
      </section>
    </div>
  );
} 