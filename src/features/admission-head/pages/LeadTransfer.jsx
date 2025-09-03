import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900" data-tour="1" data-tour-title-en="Lead Transfer Overview" data-tour-title-ar="نظرة عامة على نقل العملاء" data-tour-content-en="Header, tabs, overview, bulk transfer, conflicts, history, and KPIs." data-tour-content-ar="الرأس، علامات التبويب، النظرة العامة، النقل الجماعي، التعارضات، السجل ومؤشرات الأداء.">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm" data-tour="2" data-tour-title-en="Header" data-tour-title-ar="الرأس" data-tour-content-en="Module title and summary." data-tour-content-ar="عنوان الوحدة والملخص.">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            {t('leadTransfer.title')}
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {t('leadTransfer.subtitle')}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700" data-tour="3" data-tour-title-en="Tabs" data-tour-title-ar="علامات التبويب" data-tour-content-en="Switch between overview, bulk transfer, history, conflicts, and KPIs." data-tour-content-ar="التبديل بين النظرة العامة، النقل الجماعي، السجل، التعارضات ومؤشرات الأداء.">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm
                  ${activeTab === tab.id
                    ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
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
        <div className="mt-6">
          {activeTab === 'overview' && (
            <div data-tour="4" data-tour-title-en="Overview" data-tour-title-ar="نظرة عامة" data-tour-content-en="Filter and select leads for transfer." data-tour-content-ar="ترشيح واختيار العملاء للنقل.">
              <LeadOverviewPanel filters={filters} setFilters={setFilters} />
            </div>
          )}
          {activeTab === 'bulk-transfer' && (
            <div data-tour="5" data-tour-title-en="Bulk Transfer" data-tour-title-ar="نقل جماعي" data-tour-content-en="Transfer multiple leads and assign counselors." data-tour-content-ar="نقل عدة عملاء وتعيين المستشارين.">
              <BulkTransferPanel selectedLeads={selectedLeads} setSelectedLeads={setSelectedLeads} />
            </div>
          )}
          {activeTab === 'history' && (
            <div data-tour="6" data-tour-title-en="Transfer History" data-tour-title-ar="سجل النقل" data-tour-content-en="Review past transfers and statuses." data-tour-content-ar="مراجعة التحويلات السابقة والحالات.">
              <TransferHistory />
            </div>
          )}
          {activeTab === 'conflicts' && (
            <div data-tour="7" data-tour-title-en="Conflict Resolution" data-tour-title-ar="حل التعارض" data-tour-content-en="Resolve ownership and workload conflicts." data-tour-content-ar="حل تعارضات الملكية وعبء العمل.">
              <ConflictResolutionPanel />
            </div>
          )}
          {activeTab === 'kpi' && (
            <div data-tour="8" data-tour-title-en="KPIs Dashboard" data-tour-title-ar="لوحة مؤشرات الأداء" data-tour-content-en="Analyze transfer metrics and workload." data-tour-content-ar="تحليل مقاييس النقل وعبء العمل.">
              <KPIDashboard />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeadTransfer; 