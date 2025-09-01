import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  FiAlertCircle, FiCheckCircle, FiClock, FiFileText, 
  FiDollarSign, FiCalendar, FiUserCheck, FiUserX,
  FiDownload, FiUpload, FiFilter, FiSearch
} from 'react-icons/fi';

const ApplicationManager = ({ leads }) => {
  const { t } = useTranslation(['admission']);
  const [activeStatus, setActiveStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedApplications, setSelectedApplications] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  // Application statuses with translations
  const applicationStatuses = [
    { id: 'all', label: t('leadsApplicants.applicationManager.statuses.allApplications'), icon: FiFileText },
    { id: 'pending_docs', label: t('leadsApplicants.applicationManager.statuses.pendingDocuments'), icon: FiAlertCircle },
    { id: 'pending_payment', label: t('leadsApplicants.applicationManager.statuses.pendingPayment'), icon: FiDollarSign },
    { id: 'interview_scheduled', label: t('leadsApplicants.applicationManager.statuses.interviewScheduled'), icon: FiCalendar },
    { id: 'approved', label: t('leadsApplicants.applicationManager.statuses.approved'), icon: FiUserCheck },
    { id: 'rejected', label: t('leadsApplicants.applicationManager.statuses.rejected'), icon: FiUserX },
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

  return (
    <div className="space-y-10 p-6 md:p-10 text-base">
      {/* Status Tabs */}
      <div className="flex space-x-4 overflow-x-auto pb-2">
        {applicationStatuses.map(status => (
          <button
            key={status.id}
            onClick={() => setActiveStatus(status.id)}
            className={`flex items-center px-4 py-2 rounded-lg whitespace-nowrap ${
              activeStatus === status.id
                ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            <status.icon className="mr-2" />
            {status.label}
          </button>
        ))}
      </div>

      {/* Search and Actions */}
      <div className="flex flex-col sm:flex-row gap-6">
        <div className="flex-1">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder={t('leadsApplicants.applicationManager.search.placeholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <FiFilter className="mr-2" />
            {t('leadsApplicants.applicationManager.actions.filters')}
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
            <FiDownload className="mr-2" />
            {t('leadsApplicants.applicationManager.actions.export')}
          </button>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700/50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
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
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Application ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Applicant
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Program
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Documents
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Payment
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Test Score
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Interview
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
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
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
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
                    {lead.application.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{lead.name}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{lead.contact.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {lead.program}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {lead.application.documents.length === 0 ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                          <FiAlertCircle className="mr-1" />
                          Pending
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                          <FiCheckCircle className="mr-1" />
                          Complete
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {lead.application.paymentStatus === 'Pending' ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                          <FiClock className="mr-1" />
                          Pending
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                          <FiCheckCircle className="mr-1" />
                          Paid
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {lead.application.testScore || 'Not Taken'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {lead.application.interviewScheduled ? (
                      <div>
                        <div>{new Date(lead.application.interviewScheduled).toLocaleDateString()}</div>
                        <div className="text-xs text-gray-400">{new Date(lead.application.interviewScheduled).toLocaleTimeString()}</div>
                      </div>
                    ) : (
                      'Not Scheduled'
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
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
                      <button className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300">
                        View
                      </button>
                      <button className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300">
                        Edit
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
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4">
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
        </div>
      )}
    </div>
  );
};

export default ApplicationManager; 