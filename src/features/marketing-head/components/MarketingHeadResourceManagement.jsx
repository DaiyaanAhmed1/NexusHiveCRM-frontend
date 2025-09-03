import React, { useState, useEffect } from "react";
import { FiUsers, FiCalendar, FiDollarSign, FiTool, FiArchive, FiBriefcase, FiBarChart2, FiCheckCircle, FiAlertCircle, FiTrendingUp, FiTrendingDown, FiClock, FiZap, FiSearch, FiPlus, FiEdit2, FiTrash2, FiMoreVertical, FiChevronRight, FiFileText, FiMail, FiStar } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

// Demo data for each module
const teamMembers = [
  { id: 1, name: "Saudi Arabia", role: "Field Marketer", assigned: "Campus Fair", geo: "Riyadh", workload: 90 },
  { id: 2, name: "Saudi Arabia", role: "Digital Marketer", assigned: "Social Media Campaign", geo: "Remote", workload: 60 },
  { id: 3, name: "Saudi Arabia", role: "Designer", assigned: "Brochure Design", geo: "Jeddah", workload: 40 },
  { id: 4, name: "Saudi Arabia", role: "Content Creator", assigned: "Blog Series", geo: "Remote", workload: 30 },
  { id: 5, name: "Saudi Arabia", role: "Intern", assigned: "Data Entry", geo: "Dammam", workload: 20 },
];

const campaignPlanner = [
  { id: 1, campaign: "MBA Admissions", start: "2025-06-15", end: "2025-07-15", status: "On Track", tasks: 12, completed: 8 },
  { id: 2, campaign: "Engineering Outreach", start: "2025-06-20", end: "2025-07-30", status: "Delayed", tasks: 10, completed: 5 },
];

const budgetData = [
  { id: 1, campaign: "MBA Admissions", planned: 50000, spent: 32000, roi: "Pending" },
  { id: 2, campaign: "Engineering Outreach", planned: 40000, spent: 41000, roi: "Low" },
  { id: 3, campaign: "Social Media", planned: 20000, spent: 15000, roi: "High" },
];

const tools = [
  { id: 1, name: "Mailchimp", type: "Email Tool", users: 5, renewal: "2025-07-01", usage: 80, yearlySubscription: "$1,200" },
  { id: 2, name: "HubSpot", type: "CRM Plugin", users: 8, renewal: "2025-08-15", usage: 60, yearlySubscription: "$2,400" },
  { id: 3, name: "Canva", type: "Design Tool", users: 3, renewal: "2025-06-20", usage: 30, yearlySubscription: "$600" },
];

const assets = [
  { id: 1, name: "MBA Brochure.pdf", type: "Brochure", version: "v2.1", downloads: 120, lastUsed: "2025-06-10" },
  { id: 2, name: "Logo.png", type: "Logo", version: "v1.0", downloads: 200, lastUsed: "2025-06-09" },
  { id: 3, name: "Campus Tour.mp4", type: "Video", version: "v1.3", downloads: 80, lastUsed: "2025-06-08" },
];

const vendors = [
  { id: 1, name: "Saudi Arabia", type: "Ad Agency", rating: 4.5, contracts: 3, lastInvoice: "2025-06-07" },
  { id: 2, name: "Saudi Arabia", type: "Printer", rating: 4.0, contracts: 2, lastInvoice: "2025-06-06" },
  { id: 3, name: "Saudi Arabia", type: "Event Vendor", rating: 4.8, contracts: 5, lastInvoice: "2025-06-05" },
];

const utilization = {
  team: [90, 60, 40, 30, 20],
  budget: 0.68, // 68% consumed
  asset: [120, 200, 80],
  tool: [80, 60, 30],
  campaign: [12, 10, 8],
};

const approvals = [
  { id: 1, type: "Budget", item: "MBA Admissions", status: "Pending", approver: "Saudi Arabia" },
  { id: 2, type: "Content", item: "Campus Tour Video", status: "Approved", approver: "Saudi Arabia" },
  { id: 3, type: "Vendor Payment", item: "Saudi Arabia", status: "Pending", approver: "Saudi Arabia" },
];

// Academic compliance demo data (example Saudi Arabian names)
const academicCompliances = [
  { id: 1, name: "Faisal Al Saud", compliance: "Accreditation Renewal", status: "Completed", date: "2024-04-10" },
  { id: 2, name: "Aisha Al Rashid", compliance: "Curriculum Update", status: "Pending", date: "2024-04-15" },
  { id: 3, name: "Omar Al Zahrani", compliance: "Faculty Training", status: "In Progress", date: "2024-04-12" },
];

export default function MarketingHeadResourceManagement() {
  const { t, ready, i18n } = useTranslation('marketing');
  const [languageVersion, setLanguageVersion] = useState(0);
  
  useEffect(() => {
    setLanguageVersion(prev => prev + 1);
  }, [i18n.language]);

  // Debug logging
  console.log('Marketing Resources - Language:', i18n.language);
  console.log('Marketing Resources - Ready:', ready);
  console.log('Marketing Resources - Title translation:', t('resources.title'));

  if (!ready) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  const user = JSON.parse(localStorage.getItem('rbac_current_user'));
  const [expanded, setExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // State for modals, filters, etc. can be added as needed
  return (
    <div key={`${i18n.language}-${languageVersion}`} className="flex flex-col gap-10 animate-fade-in" data-tour="1" data-tour-title-en="Resources Overview" data-tour-title-ar="نظرة عامة على الموارد" data-tour-content-en="Team, events, budgets, tools, assets, and vendors." data-tour-content-ar="الفريق والفعاليات والميزانيات والأدوات والأصول والموردون." data-tour-position="bottom">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-2 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50/60 to-purple-50/40 dark:from-gray-900 dark:to-gray-800 rounded-xl px-4 py-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">{t('resources.title')} <FiBriefcase className="text-blue-500" /></h1>
          <p className="text-sm text-gray-600 dark:text-gray-300">{t('resources.subtitle')}</p>
        </div>
      </div>

      {/* 1. Team Allocation */}
      <section className="bg-white dark:bg-gray-800/80 rounded-xl shadow p-6" data-tour="2" data-tour-title-en="Team Allocation" data-tour-title-ar="توزيع الفريق" data-tour-content-en="Monitor workloads and AI under/over-utilization." data-tour-content-ar="راقب الأحمال وتنبيهات الاستغلال الزائد/المنخفض بالذكاء الاصطناعي.">
        <div className="flex items-center gap-2 mb-4">
          <FiUsers className="text-blue-500" />
          <h2 className="text-lg font-semibold">{t('resources.sections.teamAllocation')}</h2>
          <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded animate-pulse">{t('resources.aiFeatures.aiForecasting')}</span>
          <span className="ml-2 text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded animate-pulse">{t('resources.aiFeatures.underutilizationAlerts')}</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b dark:border-gray-700">
                <th className="pb-3 font-medium">{t('resources.teamAllocation.name')}</th>
                <th className="pb-3 font-medium">{t('resources.teamAllocation.role')}</th>
                <th className="pb-3 font-medium">{t('resources.teamAllocation.assigned')}</th>
                <th className="pb-3 font-medium">{t('resources.teamAllocation.geo')}</th>
                <th className="pb-3 font-medium">{t('resources.teamAllocation.workload')}</th>
                <th className="pb-3 font-medium">{t('resources.teamAllocation.aiAlert')}</th>
              </tr>
            </thead>
            <tbody>
              {teamMembers.map((m) => (
                <tr key={m.id} className="border-b dark:border-gray-700">
                  <td className="py-3 font-medium">{m.name}</td>
                  <td className="py-3">{m.role}</td>
                  <td className="py-3">{m.assigned}</td>
                  <td className="py-3">{m.geo}</td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className={`h-2 rounded-full ${m.workload > 80 ? 'bg-red-500' : m.workload > 60 ? 'bg-yellow-500' : 'bg-green-500'}`} style={{ width: `${m.workload}%` }}></div>
                      </div>
                      <span className="text-xs">{m.workload}%</span>
                    </div>
                  </td>
                  <td className="py-3">
                    {m.workload < 30 && <span className="text-xs text-yellow-700 bg-yellow-100 px-2 py-1 rounded">{t('resources.teamAllocation.idle')}</span>}
                    {m.workload > 80 && <span className="text-xs text-red-700 bg-red-100 px-2 py-1 rounded">{t('resources.teamAllocation.overbooked')}</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 2. Event Monitoring */}
      <section className="bg-white dark:bg-gray-800/80 rounded-xl shadow p-6">
        <div className="flex items-center gap-2 mb-4">
          <FiCalendar className="text-purple-500" />
          <h2 className="text-lg font-semibold">{t('resources.sections.eventMonitoring')}</h2>
          <span className="ml-2 text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded animate-pulse">{t('resources.aiFeatures.aiDelayRisk')}</span>
          <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded animate-pulse">{t('resources.aiFeatures.timeOptimization')}</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b dark:border-gray-700">
                <th className="pb-3 font-medium">{t('resources.eventMonitoring.campaign')}</th>
                <th className="pb-3 font-medium">{t('resources.eventMonitoring.start')}</th>
                <th className="pb-3 font-medium">{t('resources.eventMonitoring.end')}</th>
                <th className="pb-3 font-medium">{t('resources.eventMonitoring.status')}</th>
                <th className="pb-3 font-medium">{t('resources.eventMonitoring.tasks')}</th>
                <th className="pb-3 font-medium">{t('resources.eventMonitoring.completed')}</th>
                <th className="pb-3 font-medium">{t('resources.eventMonitoring.aiAlert')}</th>
              </tr>
            </thead>
            <tbody>
              {campaignPlanner.map((c) => (
                <tr key={c.id} className="border-b dark:border-gray-700">
                  <td className="py-3 font-medium">{c.campaign}</td>
                  <td className="py-3">{c.start}</td>
                  <td className="py-3">{c.end}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${c.status === 'Delayed' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>{c.status}</span>
                  </td>
                  <td className="py-3">{c.tasks}</td>
                  <td className="py-3">{c.completed}</td>
                  <td className="py-3">
                    {c.status === 'Delayed' && <span className="text-xs text-red-700 bg-red-100 px-2 py-1 rounded">{t('resources.eventMonitoring.delayRisk')}</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. Budget & Cost Allocation */}
      <section className="bg-white dark:bg-gray-800/80 rounded-xl shadow p-6" data-tour="3" data-tour-title-en="Budget & Costs" data-tour-title-ar="الميزانية والتكاليف" data-tour-content-en="Planned vs spent with ROI and alerts." data-tour-content-ar="المخطط مقابل المنفق مع العائد والتنبيهات.">
        <div className="flex items-center gap-2 mb-4">
          <FiDollarSign className="text-green-500" />
          <h2 className="text-lg font-semibold">{t('resources.sections.budgetCostAllocation')}</h2>
          <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded animate-pulse">{t('resources.aiFeatures.aiRoiPredictor')}</span>
          <span className="ml-2 text-xs bg-red-100 text-red-700 px-2 py-1 rounded animate-pulse">{t('resources.aiFeatures.budgetDriftAlert')}</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b dark:border-gray-700">
                <th className="pb-3 font-medium">{t('resources.budgetCostAllocation.campaign')}</th>
                <th className="pb-3 font-medium">{t('resources.budgetCostAllocation.planned')}</th>
                <th className="pb-3 font-medium">{t('resources.budgetCostAllocation.spent')}</th>
                <th className="pb-3 font-medium">{t('resources.budgetCostAllocation.roi')}</th>
                <th className="pb-3 font-medium">{t('resources.budgetCostAllocation.aiAlert')}</th>
              </tr>
            </thead>
            <tbody>
              {budgetData.map((b) => (
                <tr key={b.id} className="border-b dark:border-gray-700">
                  <td className="py-3 font-medium">{b.campaign}</td>
                  <td className="py-3">$ {b.planned.toLocaleString()}</td>
                  <td className="py-3">$ {b.spent.toLocaleString()}</td>
                  <td className="py-3">{b.roi}</td>
                  <td className="py-3">
                    {b.spent > b.planned && <span className="text-xs text-red-700 bg-red-100 px-2 py-1 rounded">{t('resources.budgetCostAllocation.overBudget')}</span>}
                    {b.roi === 'High' && <span className="text-xs text-green-700 bg-green-100 px-2 py-1 rounded">{t('resources.budgetCostAllocation.highRoi')}</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. Tool & Software Management */}
      <section className="bg-white dark:bg-gray-800/80 rounded-xl shadow p-6" data-tour="4" data-tour-title-en="Tools & Software" data-tour-title-ar="الأدوات والبرمجيات" data-tour-content-en="Subscriptions, renewals, usage insights." data-tour-content-ar="الاشتراكات والتجديدات ورؤى الاستخدام.">
        <div className="flex items-center gap-2 mb-4">
          <FiTool className="text-pink-500" />
          <h2 className="text-lg font-semibold">{t('resources.sections.toolSoftwareManagement')}</h2>
          <span className="ml-2 text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded animate-pulse">{t('resources.aiFeatures.aiUsageInsights')}</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b dark:border-gray-700">
                <th className="pb-3 font-medium">{t('resources.toolSoftwareManagement.tool')}</th>
                <th className="pb-3 font-medium">{t('resources.toolSoftwareManagement.type')}</th>
                <th className="pb-3 font-medium">{t('resources.toolSoftwareManagement.users')}</th>
                <th className="pb-3 font-medium">{t('resources.toolSoftwareManagement.renewal')}</th>
                <th className="pb-3 font-medium">{t('resources.toolSoftwareManagement.yearlySubscription')}</th>
                <th className="pb-3 font-medium">{t('resources.toolSoftwareManagement.usage')}</th>
                <th className="pb-3 font-medium">{t('resources.toolSoftwareManagement.aiAlert')}</th>
              </tr>
            </thead>
            <tbody>
              {tools.map((tool) => (
                <tr key={tool.id} className="border-b dark:border-gray-700">
                  <td className="py-3 font-medium">{tool.name}</td>
                  <td className="py-3">{tool.type}</td>
                  <td className="py-3">{tool.users}</td>
                  <td className="py-3">{tool.renewal}</td>
                  <td className="py-3">{tool.yearlySubscription}</td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className={`h-2 rounded-full ${tool.usage < 40 ? 'bg-yellow-500' : 'bg-green-500'}`} style={{ width: `${tool.usage}%` }}></div>
                      </div>
                      <span className="text-xs">{tool.usage}%</span>
                    </div>
                  </td>
                  <td className="py-3">
                    {tool.usage < 40 && <span className="text-xs text-yellow-700 bg-yellow-100 px-2 py-1 rounded">{t('resources.toolSoftwareManagement.underused')}</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 5. Asset & Content Repository */}
      <section className="bg-white dark:bg-gray-800/80 rounded-xl shadow p-6" data-tour="5" data-tour-title-en="Asset Repository" data-tour-title-ar="مستودع الأصول" data-tour-content-en="Manage assets, versions, and usage." data-tour-content-ar="أدر الأصول والإصدارات والاستخدام.">
        <div className="flex items-center gap-2 mb-4">
          <FiArchive className="text-blue-400" />
          <h2 className="text-lg font-semibold">{t('resources.sections.assetContentRepository')}</h2>
          <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded animate-pulse">{t('resources.aiFeatures.aiContentScoring')}</span>
          <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded animate-pulse">{t('resources.aiFeatures.smartSuggestions')}</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b dark:border-gray-700">
                <th className="pb-3 font-medium">{t('resources.assetContentRepository.asset')}</th>
                <th className="pb-3 font-medium">{t('resources.assetContentRepository.type')}</th>
                <th className="pb-3 font-medium">{t('resources.assetContentRepository.version')}</th>
                <th className="pb-3 font-medium">{t('resources.assetContentRepository.downloads')}</th>
                <th className="pb-3 font-medium">{t('resources.assetContentRepository.lastUsed')}</th>
                <th className="pb-3 font-medium">{t('resources.assetContentRepository.aiTag')}</th>
              </tr>
            </thead>
            <tbody>
              {assets.map((a) => (
                <tr key={a.id} className="border-b dark:border-gray-700">
                  <td className="py-3 font-medium">{a.name}</td>
                  <td className="py-3">{a.type}</td>
                  <td className="py-3">{a.version}</td>
                  <td className="py-3">{a.downloads}</td>
                  <td className="py-3">{a.lastUsed}</td>
                  <td className="py-3">
                    {a.downloads > 100 && <span className="text-xs text-green-700 bg-green-100 px-2 py-1 rounded">{t('resources.assetContentRepository.topPerformer')}</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 6. Vendor & Partner Management */}
      <section className="bg-white dark:bg-gray-800/80 rounded-xl shadow p-6">
        <div className="flex items-center gap-2 mb-4">
          <FiBriefcase className="text-yellow-500" />
          <h2 className="text-lg font-semibold">{t('resources.sections.vendorPartnerManagement')}</h2>
          <span className="ml-2 text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded animate-pulse">{t('resources.aiFeatures.aiVendorAnalytics')}</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b dark:border-gray-700">
                <th className="pb-3 font-medium">{t('resources.vendorPartnerManagement.vendor')}</th>
                <th className="pb-3 font-medium">{t('resources.vendorPartnerManagement.type')}</th>
                <th className="pb-3 font-medium">{t('resources.vendorPartnerManagement.rating')}</th>
                <th className="pb-3 font-medium">{t('resources.vendorPartnerManagement.contracts')}</th>
                <th className="pb-3 font-medium">{t('resources.vendorPartnerManagement.lastInvoice')}</th>
                <th className="pb-3 font-medium">{t('resources.vendorPartnerManagement.aiTag')}</th>
              </tr>
            </thead>
            <tbody>
              {vendors.map((v) => (
                <tr key={v.id} className="border-b dark:border-gray-700">
                  <td className="py-3 font-medium">{v.name}</td>
                  <td className="py-3">{v.type}</td>
                  <td className="py-3">{v.rating} <FiStar className="inline text-yellow-400" /></td>
                  <td className="py-3">{v.contracts}</td>
                  <td className="py-3">{v.lastInvoice}</td>
                  <td className="py-3">
                    {v.rating > 4.5 && <span className="text-xs text-green-700 bg-green-100 px-2 py-1 rounded">{t('resources.vendorPartnerManagement.topVendor')}</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 7. Resource Utilization Dashboard */}
      <section className="bg-white dark:bg-gray-800/80 rounded-xl shadow p-6">
        <div className="flex items-center gap-2 mb-4">
          <FiBarChart2 className="text-blue-500" />
          <h2 className="text-lg font-semibold">{t('resources.sections.resourceUtilizationDashboard')}</h2>
          <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded animate-pulse">{t('resources.aiFeatures.aiWeeklyReport')}</span>
          <span className="ml-2 text-xs bg-red-100 text-red-700 px-2 py-1 rounded animate-pulse">{t('resources.aiFeatures.anomalyDetection')}</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h3 className="font-medium mb-2">{t('resources.resourceUtilizationDashboard.teamUsageHeatmap')}</h3>
            <div className="flex gap-2">
              {utilization.team.map((val, idx) => (
                <div key={idx} className={`w-8 h-8 rounded-full flex items-center justify-center ${val > 80 ? 'bg-red-500' : val > 60 ? 'bg-yellow-500' : 'bg-green-500'} text-white`}>{val}%</div>
              ))}
            </div>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h3 className="font-medium mb-2">{t('resources.resourceUtilizationDashboard.budgetConsumption')}</h3>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
              <div className="h-4 rounded-full bg-blue-500" style={{ width: `${utilization.budget * 100}%` }}></div>
            </div>
            <div className="text-xs mt-2">{Math.round(utilization.budget * 100)}% {t('resources.resourceUtilizationDashboard.used')}</div>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h3 className="font-medium mb-2">{t('resources.resourceUtilizationDashboard.assetDownloadFrequency')}</h3>
            <div className="flex gap-2">
              {utilization.asset.map((val, idx) => (
                <div key={idx} className="w-8 h-8 rounded-full bg-blue-400 text-white flex items-center justify-center">{val}</div>
              ))}
            </div>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h3 className="font-medium mb-2">{t('resources.resourceUtilizationDashboard.toolCostVsUsage')}</h3>
            <div className="flex gap-2">
              {utilization.tool.map((val, idx) => (
                <div key={idx} className={`w-8 h-8 rounded-full flex items-center justify-center ${val < 40 ? 'bg-yellow-500' : 'bg-green-500'} text-white`}>{val}%</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. Approval Workflow */}
      <section className="bg-white dark:bg-gray-800/80 rounded-xl shadow p-6">
        <div className="flex items-center gap-2 mb-4">
          <FiCheckCircle className="text-green-500" />
          <h2 className="text-lg font-semibold">{t('resources.sections.approvalWorkflow')}</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b dark:border-gray-700">
                <th className="pb-3 font-medium">{t('resources.approvalWorkflow.type')}</th>
                <th className="pb-3 font-medium">{t('resources.approvalWorkflow.item')}</th>
                <th className="pb-3 font-medium">{t('resources.approvalWorkflow.status')}</th>
                <th className="pb-3 font-medium">{t('resources.approvalWorkflow.approver')}</th>
              </tr>
            </thead>
            <tbody>
              {approvals.map((a) => (
                <tr key={a.id} className="border-b dark:border-gray-700">
                  <td className="py-3 font-medium">{a.type}</td>
                  <td className="py-3">{a.item}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${a.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>{a.status}</span>
                  </td>
                  <td className="py-3">{a.approver}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Academic Compliance Section */}
      <section className="bg-white dark:bg-gray-800/80 rounded-xl shadow p-6">
        <div className="flex items-center gap-2 mb-4">
          <FiFileText className="text-green-500" />
          <h2 className="text-lg font-semibold">{t('resources.sections.academicCompliance')}</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b dark:border-gray-700">
                <th className="pb-3 font-medium">{t('resources.academicCompliance.name')}</th>
                <th className="pb-3 font-medium">{t('resources.academicCompliance.compliance')}</th>
                <th className="pb-3 font-medium">{t('resources.academicCompliance.status')}</th>
                <th className="pb-3 font-medium">{t('resources.academicCompliance.date')}</th>
              </tr>
            </thead>
            <tbody>
              {academicCompliances.map((item) => (
                <tr key={item.id} className="border-b dark:border-gray-700">
                  <td className="py-3 font-medium">{item.name}</td>
                  <td className="py-3">{item.compliance}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${item.status === 'Completed' ? 'bg-green-100 text-green-700' : item.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'}`}>{item.status}</span>
                  </td>
                  <td className="py-3">{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* AI Features Summary */}
      <section className="bg-white dark:bg-gray-800/80 rounded-xl shadow p-6">
        <div className="flex items-center gap-2 mb-4">
          <FiZap className="text-yellow-500 animate-pulse" />
          <h2 className="text-lg font-semibold">{t('resources.sections.aiFeatures')}</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b dark:border-gray-700">
                <th className="pb-3 font-medium">{t('resources.aiFeaturesList.aiFeature')}</th>
                <th className="pb-3 font-medium">{t('resources.aiFeaturesList.description')}</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b dark:border-gray-700">
                <td className="py-3">{t('resources.aiFeaturesList.forecastResourceDemand')}</td>
                <td className="py-3">{t('resources.aiFeaturesList.forecastResourceDemandDesc')}</td>
              </tr>
              <tr className="border-b dark:border-gray-700">
                <td className="py-3">{t('resources.aiFeaturesList.budgetDriftDetection')}</td>
                <td className="py-3">{t('resources.aiFeaturesList.budgetDriftDetectionDesc')}</td>
              </tr>
              <tr className="border-b dark:border-gray-700">
                <td className="py-3">{t('resources.aiFeaturesList.smartContentSuggestions')}</td>
                <td className="py-3">{t('resources.aiFeaturesList.smartContentSuggestionsDesc')}</td>
              </tr>
              <tr className="border-b dark:border-gray-700">
                <td className="py-3">{t('resources.aiFeaturesList.underOverutilizationAlerts')}</td>
                <td className="py-3">{t('resources.aiFeaturesList.underOverutilizationAlertsDesc')}</td>
              </tr>
              <tr className="border-b dark:border-gray-700">
                <td className="py-3">{t('resources.aiFeaturesList.roiPredictor')}</td>
                <td className="py-3">{t('resources.aiFeaturesList.roiPredictorDesc')}</td>
              </tr>
              <tr className="border-b dark:border-gray-700">
                <td className="py-3">{t('resources.aiFeaturesList.toolOptimizationSuggestions')}</td>
                <td className="py-3">{t('resources.aiFeaturesList.toolOptimizationSuggestionsDesc')}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
} 