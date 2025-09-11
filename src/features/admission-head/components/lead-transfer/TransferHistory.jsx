import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalization } from "../../../../hooks/useLocalization";
import { FiDownload, FiFilter, FiSearch, FiCalendar, FiUser, FiArrowRight } from 'react-icons/fi';
import DateRangePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const TransferHistory = () => {
  const { t } = useTranslation(['admission']);
  const { isRTL } = useLocalization();
  
  const [filters, setFilters] = useState({
    dateRange: { start: null, end: null },
    fromCounselor: 'all',
    toCounselor: 'all',
    searchQuery: ''
  });

  // Mock data - replace with actual API call
  const transferHistory = [
    {
      id: 1,
      leadName: "Abdullah Al-Rashid",
      applicationId: "APP001",
      fromCounselor: "Noura Al-Zahra",
      toCounselor: "Khalid Al-Sayed",
      date: "2024-03-15",
      time: "14:30",
      reason: "Better match for technical course counseling",
      initiatedBy: "Admission Head",
      status: "Completed"
    },
    {
      id: 2,
      leadName: "Mohammed Al-Saud",
      applicationId: "APP002",
      fromCounselor: "Khalid Al-Sayed",
      toCounselor: "Aisha Al-Hassan",
      date: "2024-03-14",
      time: "11:15",
      reason: "Regional expertise required",
      initiatedBy: "Admission Head",
      status: "Completed"
    },
    {
      id: 3,
      leadName: "Layla Al-Mansour",
      applicationId: "APP003",
      fromCounselor: "Aisha Al-Hassan",
      toCounselor: "Omar Al-Mutairi",
      date: "2024-03-16",
      time: "09:45",
      reason: "Language preference match",
      initiatedBy: "Admission Head",
      status: "Completed"
    },
    {
      id: 4,
      leadName: "Fatima Al-Rashid",
      applicationId: "APP004",
      fromCounselor: "Omar Al-Mutairi",
      toCounselor: "Noura Al-Zahra",
      date: "2024-03-13",
      time: "16:20",
      reason: "Cultural background match",
      initiatedBy: "Admission Head",
      status: "Completed"
    },
    {
      id: 5,
      leadName: "Yousef Al-Harbi",
      applicationId: "APP005",
      fromCounselor: "Noura Al-Zahra",
      toCounselor: "Khalid Al-Sayed",
      date: "2024-03-15",
      time: "13:10",
      reason: "Workload balancing",
      initiatedBy: "Admission Head",
      status: "Completed"
    }
  ];

  const counselors = [
    'Noura Al-Zahra',
    'Khalid Al-Sayed',
    'Aisha Al-Hassan',
    'Omar Al-Mutairi',
    'Fatima Al-Rashid',
    'Yousef Al-Harbi'
  ];

  const handleExport = () => {
    // Implement export logic
    console.log('Exporting transfer history...');
  };

  const filteredHistory = transferHistory.filter(transfer => {
    const matchesSearch = !filters.searchQuery || 
      transfer.leadName.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      transfer.applicationId.toLowerCase().includes(filters.searchQuery.toLowerCase());
    
    const matchesFromCounselor = filters.fromCounselor === 'all' || 
      transfer.fromCounselor === filters.fromCounselor;
    
    const matchesToCounselor = filters.toCounselor === 'all' || 
      transfer.toCounselor === filters.toCounselor;
    
    const matchesDateRange = !filters.dateRange.start || !filters.dateRange.end ||
      (new Date(transfer.date) >= filters.dateRange.start && 
       new Date(transfer.date) <= filters.dateRange.end);
    
    return matchesSearch && matchesFromCounselor && matchesToCounselor && matchesDateRange;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Transfer History</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">View and manage lead transfer records</p>
        </div>
        <button
          onClick={handleExport}
          className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          <FiDownload className="mr-2 w-4 h-4" />
          Export
        </button>
      </div>

      {/* Filters Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-2 mb-4">
          <FiFilter className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Filters</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Date Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Date Range
            </label>
            <div className="relative">
              <DateRangePicker
                selected={filters.dateRange.start}
                onChange={(dates) => setFilters({
                  ...filters,
                  dateRange: { start: dates[0], end: dates[1] }
                })}
                startDate={filters.dateRange.start}
                endDate={filters.dateRange.end}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholderText="Select date range"
                selectsRange
              />
              <FiCalendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
            </div>
          </div>

          {/* From Counselor */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              From Counselor
            </label>
            <select
              value={filters.fromCounselor}
              onChange={(e) => setFilters({ ...filters, fromCounselor: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All Counselors</option>
              {counselors.map(counselor => (
                <option key={counselor} value={counselor}>{counselor}</option>
              ))}
            </select>
          </div>

          {/* To Counselor */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              To Counselor
            </label>
            <select
              value={filters.toCounselor}
              onChange={(e) => setFilters({ ...filters, toCounselor: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All Counselors</option>
              {counselors.map(counselor => (
                <option key={counselor} value={counselor}>{counselor}</option>
              ))}
            </select>
          </div>

          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Search
            </label>
            <div className="relative">
              <input
                type="text"
                value={filters.searchQuery}
                onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
                placeholder="Search by name or ID..."
                className="w-full px-3 py-2 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Transfer History Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Transfer Records ({filteredHistory.length})
          </h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Lead Details
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Transfer Details
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Date & Time
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Reason
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredHistory.map((transfer) => (
                <tr key={transfer.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                          <FiUser className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{transfer.leadName}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{transfer.applicationId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900 dark:text-white">
                      <span className="font-medium">{transfer.fromCounselor}</span>
                      <FiArrowRight className="mx-2 h-4 w-4 text-gray-400" />
                      <span className="font-medium">{transfer.toCounselor}</span>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      By: {transfer.initiatedBy}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">{transfer.date}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{transfer.time}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 max-w-xs">
                    <div className="truncate" title={transfer.reason}>
                      {transfer.reason}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      transfer.status === 'Completed' 
                        ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300' 
                        : 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300'
                    }`}>
                      {transfer.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredHistory.length === 0 && (
          <div className="text-center py-12">
            <FiUser className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No transfers found</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Try adjusting your filters to see more results.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransferHistory;