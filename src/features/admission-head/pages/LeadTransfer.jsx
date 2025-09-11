import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useLocalization } from "../../../hooks/useLocalization";
import { 
  FiUsers, 
  FiFilter, 
  FiClock, 
  FiAlertCircle,
  FiCheckCircle,
  FiDownload,
  FiCalendar,
  FiBarChart2
} from 'react-icons/fi';

// Components will be imported here
import LeadOverviewPanel from '../components/lead-transfer/LeadOverviewPanel';
import BulkTransferPanel from '../components/lead-transfer/BulkTransferPanel';
import TransferHistory from '../components/lead-transfer/TransferHistory';
import ConflictResolutionPanel from '../components/lead-transfer/ConflictResolutionPanel';
import KPIDashboard from '../components/lead-transfer/KPIDashboard';

const LeadTransfer = () => {
  const { t } = useTranslation(['admission', 'common']);
  const { isRTL } = useLocalization();
  const [selectedLeads, setSelectedLeads] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [filters, setFilters] = useState({
    dateRange: { start: null, end: null },
    leadStage: 'all',
    assignedCounselor: 'all',
    source: 'all'
  });

  const tabs = [
    { id: 'overview', label: t('leadTransfer.tabs.overview'), icon: <FiUsers /> },
    { id: 'bulk-transfer', label: t('leadTransfer.tabs.bulkTransfer'), icon: <FiFilter /> },
    { id: 'history', label: t('leadTransfer.tabs.history'), icon: <FiClock /> },
    { id: 'conflicts', label: t('leadTransfer.tabs.conflicts'), icon: <FiAlertCircle /> },
    { id: 'kpi', label: t('leadTransfer.tabs.kpi'), icon: <FiBarChart2 /> }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900" 
         data-tour="1" 
         data-tour-title-en="Lead Transfer Overview" 
         data-tour-title-ar="نظرة عامة على نقل العملاء" 
         data-tour-content-en="Header, tabs, overview, bulk transfer, conflicts, history, and KPIs." 
         data-tour-content-ar="الرأس، علامات التبويب، النظرة العامة، النقل الجماعي، التعارضات، السجل ومؤشرات الأداء.">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8" 
             data-tour="2" 
             data-tour-title-en="Header" 
             data-tour-title-ar="الرأس" 
             data-tour-content-en="Module title and summary." 
             data-tour-content-ar="عنوان الوحدة والملخص.">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-8 text-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <FiUsers className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold">
                {t('leadTransfer.title')}
              </h1>
            </div>
            <p className="text-purple-100 text-lg">
              {t('leadTransfer.subtitle')}
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Tabs */}
          <div className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50" 
               data-tour="3" 
               data-tour-title-en="Tabs" 
               data-tour-title-ar="علامات التبويب" 
               data-tour-content-en="Switch between overview, bulk transfer, history, conflicts, and KPIs." 
               data-tour-content-ar="التبديل بين النظرة العامة، النقل الجماعي، السجل، التعارضات ومؤشرات الأداء.">
            <nav className="flex flex-wrap gap-2 p-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-gray-100 dark:scrollbar-track-gray-700">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 whitespace-nowrap flex-shrink-0
                    ${activeTab === tab.id
                      ? 'bg-purple-600 text-white shadow-lg transform scale-105'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-white'
                    }
                  `}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'overview' && (
              <div data-tour="4" 
                   data-tour-title-en="Overview" 
                   data-tour-title-ar="نظرة عامة" 
                   data-tour-content-en="Filter and select leads for transfer." 
                   data-tour-content-ar="ترشيح واختيار العملاء للنقل.">
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                      <FiUsers className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {t('leadTransfer.tabs.overview')}
                    </h2>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    {t('leadTransfer.overviewDescription')}
                  </p>
                </div>
                <LeadOverviewPanel filters={filters} setFilters={setFilters} />
              </div>
            )}
            
            {activeTab === 'bulk-transfer' && (
              <div data-tour="5" 
                   data-tour-title-en="Bulk Transfer" 
                   data-tour-title-ar="نقل جماعي" 
                   data-tour-content-en="Transfer multiple leads and assign counselors." 
                   data-tour-content-ar="نقل عدة عملاء وتعيين المستشارين.">
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                      <FiFilter className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {t('leadTransfer.tabs.bulkTransfer')}
                    </h2>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    {t('leadTransfer.bulkTransferDescription')}
                  </p>
                </div>
                <BulkTransferPanel selectedLeads={selectedLeads} setSelectedLeads={setSelectedLeads} />
              </div>
            )}
            
            {activeTab === 'history' && (
              <div data-tour="6" 
                   data-tour-title-en="Transfer History" 
                   data-tour-title-ar="سجل النقل" 
                   data-tour-content-en="Review past transfers and statuses." 
                   data-tour-content-ar="مراجعة التحويلات السابقة والحالات.">
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                      <FiClock className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {t('leadTransfer.tabs.history')}
                    </h2>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    {t('leadTransfer.historyDescription')}
                  </p>
                </div>
                <TransferHistory />
              </div>
            )}
            
            {activeTab === 'conflicts' && (
              <div data-tour="7" 
                   data-tour-title-en="Conflict Resolution" 
                   data-tour-title-ar="حل التعارض" 
                   data-tour-content-en="Resolve ownership and workload conflicts." 
                   data-tour-content-ar="حل تعارضات الملكية وعبء العمل.">
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                      <FiAlertCircle className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {t('leadTransfer.tabs.conflicts')}
                    </h2>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    {t('leadTransfer.conflictsDescription')}
                  </p>
                </div>
                <ConflictResolutionPanel />
              </div>
            )}
            
            {activeTab === 'kpi' && (
              <div data-tour="8" 
                   data-tour-title-en="KPIs Dashboard" 
                   data-tour-title-ar="لوحة مؤشرات الأداء" 
                   data-tour-content-en="Analyze transfer metrics and workload." 
                   data-tour-content-ar="تحليل مقاييس النقل وعبء العمل.">
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                      <FiBarChart2 className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {t('leadTransfer.tabs.kpi')}
                    </h2>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    {t('leadTransfer.kpiDescription')}
                  </p>
                </div>
                <KPIDashboard />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadTransfer;