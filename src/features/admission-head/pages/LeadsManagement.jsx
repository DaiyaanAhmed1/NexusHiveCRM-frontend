import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiFilter, FiSearch, FiDownload, FiUpload, FiUsers, FiMessageSquare, 
  FiBarChart2, FiSettings, FiAlertCircle, FiZap, FiClock, FiTrendingUp,
  FiTrendingDown, FiUserCheck, FiUserX, FiPercent, FiTarget, FiGlobe,
  FiBook, FiMail, FiPhone, FiCalendar, FiDollarSign, FiFileText, FiCheckCircle, FiX
} from 'react-icons/fi';

// Demo data - Replace with actual API calls
const demoLeads = [
  {
    id: 1,
    name: "John Smith",
    program: "Computer Science",
    source: "Website",
    status: "Inquiry",
    assignedTo: "Sarah Johnson",
    conversionScore: "High",
    lastContact: "2024-03-15",
    documents: ["ID Proof", "Academic Records"],
    tags: ["Scholarship", "International"],
    contact: {
      email: "john.smith@email.com",
      phone: "+1 234-567-8900",
      country: "USA"
    },
    timeline: [
      { type: "Inquiry", date: "2024-03-15", notes: "Initial inquiry via website" },
      { type: "Contacted", date: "2024-03-16", notes: "Sent program brochure" }
    ],
    engagement: {
      score: 85,
      lastActivity: "2024-03-16",
      interactions: 3,
      predictedConversion: "High"
    },
    application: {
      id: "APP-001",
      status: "Not Started",
      documents: [],
      paymentStatus: "Pending",
      testScore: null,
      interviewScheduled: null
    }
  },
  {
    id: 2,
    name: "Jane Doe",
    program: "Business Administration",
    source: "Referral",
    status: "Contacted",
    assignedTo: "Michael Chen",
    conversionScore: "Medium",
    lastContact: "2024-03-14",
    documents: ["ID Proof"],
    tags: ["International"],
    contact: {
      email: "jane.doe@email.com",
      phone: "+1 234-567-8901",
      country: "Canada"
    },
    timeline: [
      { type: "Inquiry", date: "2024-03-10", notes: "Referred by alumni" },
      { type: "Contacted", date: "2024-03-14", notes: "Called for more info" }
    ],
    engagement: {
      score: 70,
      lastActivity: "2024-03-14",
      interactions: 2,
      predictedConversion: "Medium"
    },
    application: {
      id: "APP-002",
      status: "Not Started",
      documents: [],
      paymentStatus: "Pending",
      testScore: null,
      interviewScheduled: null
    }
  },
  {
    id: 3,
    name: "Carlos Martinez",
    program: "Engineering",
    source: "Education Fair",
    status: "Qualified",
    assignedTo: "Sarah Johnson",
    conversionScore: "Low",
    lastContact: "2024-03-12",
    documents: ["ID Proof", "Academic Records", "Test Scores"],
    tags: ["Transfer"],
    contact: {
      email: "carlos.martinez@email.com",
      phone: "+1 234-567-8902",
      country: "Spain"
    },
    timeline: [
      { type: "Inquiry", date: "2024-03-08", notes: "Met at education fair" },
      { type: "Contacted", date: "2024-03-12", notes: "Follow-up call" }
    ],
    engagement: {
      score: 45,
      lastActivity: "2024-03-12",
      interactions: 1,
      predictedConversion: "Low"
    },
    application: {
      id: "APP-003",
      status: "In Progress",
      documents: ["ID Proof", "Academic Records"],
      paymentStatus: "Partial",
      testScore: 85,
      interviewScheduled: "2024-03-20"
    }
  }
];

export default function LeadsManagement() {
  const { t, i18n, ready } = useTranslation(['admission', 'common']);
  const [selectedLead, setSelectedLead] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState('pipeline');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLeads, setSelectedLeads] = useState([]);
  const [showAIInsights, setShowAIInsights] = useState(false);
  const [showCommunicationModal, setShowCommunicationModal] = useState(false);
  const [showBulkActions, setShowBulkActions] = useState(false);
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

  // Tabs with translations
  const tabs = [
    { id: 'pipeline', label: t('leads.tabs.pipeline'), icon: FiBarChart2 },
    { id: 'applications', label: t('leads.tabs.applications'), icon: FiFileText },
    { id: 'team', label: t('leads.tabs.workload'), icon: FiUsers },
    { id: 'sources', label: t('leads.tabs.performance'), icon: FiTrendingUp },
    { id: 'insights', label: t('leads.tabs.insights'), icon: FiZap }
  ];

  // Filter leads based on search query
  const filteredLeads = demoLeads.filter(lead =>
    lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.program.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.contact.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div key={`${i18n.language}-${languageVersion}`} className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header Section */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('leads.title')}</h1>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {t('leads.subtitle')}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowAIInsights(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700"
              >
                <FiZap className="mr-2" />
                {t('leads.actions.aiInsights')}
              </button>
              <button
                onClick={() => setShowBulkActions(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                <FiUpload className="mr-2" />
                {t('leads.actions.bulkActions')}
              </button>
              <button
                onClick={() => setShowCommunicationModal(true)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <FiMessageSquare className="mr-2" />
                {t('leads.actions.communication')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full px-4 sm:px-8 lg:px-16 py-10">
        {/* Search and Filters */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <FiSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder={t('leads.search.placeholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <FiFilter className="mr-2" />
              {t('leads.tabs.filters')}
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-10 border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-1 py-4 text-sm font-medium border-b-2 ${
                  activeTab === tab.id
                    ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                <tab.icon className="mr-2" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content Area */}
        <div className="text-base">
          <AnimatePresence mode="wait">
            {activeTab === 'pipeline' && (
              <motion.div
                key="pipeline"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{t('leads.tabs.pipeline')}</h2>
                
                {/* Lead Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredLeads.map(lead => (
                    <div
                      key={lead.id}
                      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer"
                      onClick={() => setSelectedLead(lead)}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-200 to-indigo-400 dark:from-indigo-900 dark:to-indigo-700 flex items-center justify-center text-indigo-700 dark:text-indigo-200 text-lg font-bold">
                          {lead.name.charAt(0)}
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          lead.conversionScore === 'High' ? 'bg-green-100 text-green-800' :
                          lead.conversionScore === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {lead.conversionScore}
                        </span>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{lead.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{lead.program}</p>
                      
                      <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center">
                          <FiMail className="mr-2" />
                          <span className="truncate">{lead.contact.email}</span>
                        </div>
                        <div className="flex items-center">
                          <FiPhone className="mr-2" />
                          <span>{lead.contact.phone}</span>
                        </div>
                        <div className="flex items-center">
                          <FiUserCheck className="mr-2" />
                          <span>{lead.assignedTo}</span>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500 dark:text-gray-400">{t('leads.status.inquiry')}</span>
                          <span className="text-gray-900 dark:text-white font-medium">{lead.status}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'applications' && (
              <motion.div
                key="applications"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{t('leads.tabs.applications')}</h2>
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                  <p className="text-gray-600 dark:text-gray-300">{t('leads.tabs.applications')} content will be implemented here.</p>
                </div>
              </motion.div>
            )}

            {activeTab === 'team' && (
              <motion.div
                key="team"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{t('leads.tabs.workload')}</h2>
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                  <p className="text-gray-600 dark:text-gray-300">{t('leads.tabs.workload')} content will be implemented here.</p>
                </div>
              </motion.div>
            )}

            {activeTab === 'sources' && (
              <motion.div
                key="sources"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{t('leads.tabs.performance')}</h2>
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                  <p className="text-gray-600 dark:text-gray-300">{t('leads.tabs.performance')} content will be implemented here.</p>
                </div>
              </motion.div>
            )}

            {activeTab === 'insights' && (
              <motion.div
                key="insights"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{t('leads.tabs.insights')}</h2>
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                  <p className="text-gray-600 dark:text-gray-300">{t('leads.tabs.insights')} content will be implemented here.</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Lead Profile Modal */}
          <AnimatePresence>
            {selectedLead && (
              <motion.div
                key="lead-profile-modal"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
              >
                <div className="absolute inset-0" onClick={() => setSelectedLead(null)} />
                <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full mx-4 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedLead.name}</h2>
                    <button
                      onClick={() => setSelectedLead(null)}
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      <FiX className="w-6 h-6" />
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{t('leads.tabs.profile')}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{selectedLead.program}</p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Contact</h3>
                      <p className="text-gray-600 dark:text-gray-300">{selectedLead.contact.email}</p>
                      <p className="text-gray-600 dark:text-gray-300">{selectedLead.contact.phone}</p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Status</h3>
                      <p className="text-gray-600 dark:text-gray-300">{selectedLead.status}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Modals */}
        <AnimatePresence>
          {showAIInsights && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 overflow-y-auto"
            >
              <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                  <div className="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
                </div>
                <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full mx-4 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('leads.actions.aiInsights')}</h2>
                    <button
                      onClick={() => setShowAIInsights(false)}
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      <FiX className="w-6 h-6" />
                    </button>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">{t('leads.actions.aiInsights')} content will be implemented here.</p>
                </div>
              </div>
            </motion.div>
          )}

          {showCommunicationModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 overflow-y-auto"
            >
              <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                  <div className="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
                </div>
                <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full mx-4 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('leads.actions.communication')}</h2>
                    <button
                      onClick={() => setShowCommunicationModal(false)}
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      <FiX className="w-6 h-6" />
                    </button>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">{t('leads.actions.communication')} content will be implemented here.</p>
                </div>
              </div>
            </motion.div>
          )}

          {showBulkActions && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 overflow-y-auto"
            >
              <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                  <div className="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
                </div>
                <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full mx-4 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('leads.actions.bulkActions')}</h2>
                    <button
                      onClick={() => setShowBulkActions(false)}
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      <FiX className="w-6 h-6" />
                    </button>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">{t('leads.actions.bulkActions')} content will be implemented here.</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
} 