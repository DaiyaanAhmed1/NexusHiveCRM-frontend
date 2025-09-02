import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from "@heroicons/react/24/outline";

const LinkedApplications = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    department: 'all',
    college: 'all',
    programType: 'all',
    status: 'all',
    admissionCycle: 'all'
  });

  // Mock data for applications
  const applications = [
    {
      id: 'APP001',
      studentName: 'Abdullah Al-Rashid',
      course: 'B.Tech Computer Science',
      department: 'Computer Science',
      college: 'Engineering',
      programType: 'Undergraduate',
      status: 'Under Review',
      admissionCycle: '2024-2025',
      appliedDate: '2024-02-15'
    },
    {
      id: 'APP002',
      studentName: 'Mohammed Al-Saud',
      course: 'MBA Finance',
      department: 'Business',
      college: 'Management',
      programType: 'Postgraduate',
      status: 'Accepted',
      admissionCycle: '2024-2025',
      appliedDate: '2024-02-10'
    },
    {
      id: 'APP003',
      studentName: 'Sarah Johnson',
      course: 'M.Sc Data Science',
      department: 'Computer Science',
      college: 'Science',
      programType: 'Postgraduate',
      status: 'Pending',
      admissionCycle: '2024-2025',
      appliedDate: '2024-02-20'
    }
  ];

  // Mock data for filter options
  const filterOptions = {
    departments: ['Computer Science', 'Business', 'Science', 'Engineering'],
    colleges: ['Engineering', 'Management', 'Science', 'Arts'],
    programTypes: ['Undergraduate', 'Postgraduate', 'PhD'],
    statuses: ['Under Review', 'Accepted', 'Pending', 'Rejected'],
    admissionCycles: ['2024-2025', '2023-2024']
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         app.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         app.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilters = 
      (filters.department === 'all' || app.department === filters.department) &&
      (filters.college === 'all' || app.college === filters.college) &&
      (filters.programType === 'all' || app.programType === filters.programType) &&
      (filters.status === 'all' || app.status === filters.status) &&
      (filters.admissionCycle === 'all' || app.admissionCycle === filters.admissionCycle);

    return matchesSearch && matchesFilters;
  });

  return (
    <div className="space-y-6">
      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search applications..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
          />
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 dark:text-gray-500 absolute left-3 top-2.5" />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 dark:bg-gray-700 dark:text-white"
        >
          <FunnelIcon className="w-5 h-5" />
          Filters
          {showFilters ? (
            <ChevronUpIcon className="w-5 h-5" />
          ) : (
            <ChevronDownIcon className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <select
            value={filters.department}
            onChange={(e) => handleFilterChange('department', e.target.value)}
            className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-600 dark:text-white"
          >
            <option value="all">All Departments</option>
            {filterOptions.departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>

          <select
            value={filters.college}
            onChange={(e) => handleFilterChange('college', e.target.value)}
            className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-600 dark:text-white"
          >
            <option value="all">All Colleges</option>
            {filterOptions.colleges.map(college => (
              <option key={college} value={college}>{college}</option>
            ))}
          </select>

          <select
            value={filters.programType}
            onChange={(e) => handleFilterChange('programType', e.target.value)}
            className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-600 dark:text-white"
          >
            <option value="all">All Program Types</option>
            {filterOptions.programTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>

          <select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-600 dark:text-white"
          >
            <option value="all">All Statuses</option>
            {filterOptions.statuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>

          <select
            value={filters.admissionCycle}
            onChange={(e) => handleFilterChange('admissionCycle', e.target.value)}
            className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-600 dark:text-white"
          >
            <option value="all">All Admission Cycles</option>
            {filterOptions.admissionCycles.map(cycle => (
              <option key={cycle} value={cycle}>{cycle}</option>
            ))}
          </select>
        </div>
      )}

      {/* Applications Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Application ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Student Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Course</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Department</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">College</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Program Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Applied Date</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {filteredApplications.map((app) => (
              <tr key={app.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary dark:text-primary-light">{app.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{app.studentName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{app.course}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{app.department}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{app.college}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{app.programType}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${app.status === 'Accepted' ? 'bg-green-100 text-green-800' : 
                      app.status === 'Rejected' ? 'bg-red-100 text-red-800' : 
                      app.status === 'Under Review' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-gray-100 text-gray-800'}`}>
                    {app.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{app.appliedDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LinkedApplications; 