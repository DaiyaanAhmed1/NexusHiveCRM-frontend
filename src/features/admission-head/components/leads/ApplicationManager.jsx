import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalization } from "../../../../hooks/useLocalization";
import { motion } from 'framer-motion';
import { 
  FiAlertCircle, FiCheckCircle, FiClock, FiFileText, 
  FiDollarSign, FiCalendar, FiUserCheck, FiUserX,
  FiDownload, FiUpload, FiFilter, FiSearch, FiEye, FiEdit2,
  FiChevronDown, FiChevronUp, FiZap, FiTarget, FiBarChart2
} from 'react-icons/fi';

const ApplicationManager = ({ leads }) => {
  const { t } = useTranslation(['admission']);
  const { isRTL } = useLocalization();
  const [activeStatus, setActiveStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedApplications, setSelectedApplications] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [showBulkActions, setShowBulkActions] = useState(false);

  // Application statuses with translations
  const applicationStatuses = [
    { id: 'all', label: t('leadsApplicants.applicationManager.statuses.allApplications'), icon: FiFileText, count: leads.filter(l => l.application).length },
    { id: 'pending_docs', label: t('leadsApplicants.applicationManager.statuses.pendingDocuments'), icon: FiAlertCircle, count: leads.filter(l => l.application && l.application.documents.length === 0).length },
    { id: 'pending_payment', label: t('leadsApplicants.applicationManager.statuses.pendingPayment'), icon: FiDollarSign, count: leads.filter(l => l.application && l.application.paymentStatus === 'Pending').length },
    { id: 'interview_scheduled', label: t('leadsApplicants.applicationManager.statuses.interviewScheduled'), icon: FiCalendar, count: leads.filter(l => l.application && l.application.interviewScheduled).length },
    { id: 'approved', label: t('leadsApplicants.applicationManager.statuses.approved'), icon: FiUserCheck, count: leads.filter(l => l.application && l.application.status === 'Approved').length },
    { id: 'rejected', label: t('leadsApplicants.applicationManager.statuses.rejected'), icon: FiUserX, count: leads.filter(l => l.application && l.application.status === 'Rejected').length },
  ];

  // Filter applications based on status and search
  const filteredApplications = leads.filter(lead => {
    if (!lead.application) return false;
    
    const matchesStatus = activeStatus === 'all' || 
      (activeStatus === 'pending_docs' && lead.application.documents.length === 0) ||
      (activeStatus === 'pending_payment' && lead.application.paymentStatus === 'Pending') ||
      (activeStatus === 'interview_scheduled' && lead.application.interviewScheduled) ||
      (activeStatus === 'approved' && lead.application.status === 'Approved') ||
      (activeStatus === 'rejected' && lead.application.status === 'Rejected');

    const matchesSearch = searchQuery === '' || 
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.application.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.program.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  const handleBulkAction = (action) => {
    console.log(`Bulk action: ${action}`, selectedApplications);
    setSelectedApplications([]);
    setShowBulkActions(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">{t('leadsApplicants.applicationManager.title')}</h2>
            <p className="text-blue-100">{t('leadsApplicants.applicationManager.subtitle')}</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-white/20 rounded-lg p-3">
              <FiBarChart2 className="w-6 h-6 text-white" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{filteredApplications.length}</div>
              <div className="text-blue-100 text-sm">Applications</div>
            </div>
          </div>
        </div>
      </div>

      {/* Status Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6">
          <div className="flex flex-wrap gap-2">
            {applicationStatuses.map(status => (
              <button
                key={status.id}
                onClick={() => setActiveStatus(status.id)}
                className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 ${
                  activeStatus === status.id
                    ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-700'
                    : 'bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600'
                }`}
              >
                <status.icon className="mr-2 w-4 h-4" />
                <span className="text-sm font-medium">{status.label}</span>
                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium ${
                  activeStatus === status.id
                    ? 'bg-indigo-200 dark:bg-indigo-800 text-indigo-800 dark:text-indigo-200'
                    : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                }`}>
                  {status.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Search and Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg leading-5 bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                placeholder={t('leadsApplicants.applicationManager.search.placeholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
            >
              <FiFilter className="mr-2 w-4 h-4" />
              {t('leadsApplicants.applicationManager.actions.filters')}
            </button>
            <button className="inline-flex items-center px-4 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors">
              <FiDownload className="mr-2 w-4 h-4" />
              {t('leadsApplicants.applicationManager.actions.export')}
            </button>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedApplications.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-200 dark:border-indigo-700"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FiTarget className="mr-2 w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <span className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
                  {selectedApplications.length} applications selected
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleBulkAction('approve')}
                  className="px-3 py-1 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleBulkAction('reject')}
                  className="px-3 py-1 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors"
                >
                  Reject
                </button>
                <button
                  onClick={() => handleBulkAction('export')}
                  className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
                >
                  Export
                </button>
                <button
                  onClick={() => setSelectedApplications([])}
                  className="px-3 py-1 bg-gray-600 text-white text-sm rounded-md hover:bg-gray-700 transition-colors"
                >
                  Clear
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Applications Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700/50">
              <tr>
                <th scope="col" className="px-6 py-4 text-left">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 dark:border-gray-600 text-indigo-600 focus:ring-indigo-500"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedApplications(filteredApplications.map(app => app.id));
                      } else {
                        setSelectedApplications([]);
                      }
                    }}
                  />
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Application ID
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Applicant
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Program
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Documents
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Payment
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Test Score
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Interview
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredApplications.map((lead) => (
                <motion.tr
                  key={lead.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 dark:border-gray-600 text-indigo-600 focus:ring-indigo-500"
                      checked={selectedApplications.includes(lead.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedApplications([...selectedApplications, lead.id]);
                        } else {
                          setSelectedApplications(selectedApplications.filter(id => id !== lead.id));
                        }
                      }}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    <div className="flex items-center">
                      <FiFileText className="mr-2 w-4 h-4 text-gray-400" />
                      {lead.application.id}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                          <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                            {lead.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{lead.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{lead.contact.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center">
                      <FiTarget className="mr-2 w-4 h-4 text-gray-400" />
                      {lead.program}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {lead.application.documents.length === 0 ? (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                          <FiAlertCircle className="mr-1 w-3 h-3" />
                          Pending
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                          <FiCheckCircle className="mr-1 w-3 h-3" />
                          Complete
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {lead.application.paymentStatus === 'Pending' ? (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                          <FiClock className="mr-1 w-3 h-3" />
                          Pending
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                          <FiCheckCircle className="mr-1 w-3 h-3" />
                          Paid
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center">
                      <FiBarChart2 className="mr-2 w-4 h-4 text-gray-400" />
                      {lead.application.testScore || 'Not Taken'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center">
                      <FiCalendar className="mr-2 w-4 h-4 text-gray-400" />
                      {lead.application.interviewScheduled ? (
                        <div>
                          <div>{new Date(lead.application.interviewScheduled).toLocaleDateString()}</div>
                          <div className="text-xs text-gray-400">{new Date(lead.application.interviewScheduled).toLocaleTimeString()}</div>
                        </div>
                      ) : (
                        'Not Scheduled'
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      lead.application.status === 'Approved'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : lead.application.status === 'Rejected'
                        ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    }`}>
                      {lead.application.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center space-x-2">
                      <button className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 p-1 rounded-md hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors">
                        <FiEye className="w-4 h-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300 p-1 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <FiEdit2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Alerts */}
      {activeStatus === 'pending_docs' && filteredApplications.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 rounded-r-lg"
        >
          <div className="flex">
            <div className="flex-shrink-0">
              <FiAlertCircle className="h-5 w-5 text-yellow-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700 dark:text-yellow-200">
                {filteredApplications.length} applications are pending document submission. Consider sending reminders.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Empty State */}
      {filteredApplications.length === 0 && (
        <div className="text-center py-12">
          <FiFileText className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No applications found</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {searchQuery ? 'Try adjusting your search criteria.' : 'No applications match the selected status.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default ApplicationManager;