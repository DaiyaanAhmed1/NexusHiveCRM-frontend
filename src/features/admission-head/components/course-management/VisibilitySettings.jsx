import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Switch } from '@headlessui/react';
import {
  EyeIcon,
  EyeSlashIcon,
  CalendarIcon,
  UserGroupIcon,
  MegaphoneIcon
} from '@heroicons/react/24/outline';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const VisibilitySettings = () => {
  const [selectedCycle, setSelectedCycle] = useState('2024-2025');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const { t } = useTranslation();

  // Mock data for courses
  const courses = [
    {
      id: 1,
      name: 'B.Tech in AI & ML',
      code: 'BTECH-AIML',
      department: 'Computer Science',
      isVisible: true,
      visibleToCounselors: true,
      visibleOnWebsite: true,
      visibleInCampaigns: true,
      admissionCycles: ['2024-2025', '2025-2026'],
    },
    {
      id: 2,
      name: 'MBA in HR',
      code: 'MBA-HR',
      department: 'Human Resources',
      isVisible: true,
      visibleToCounselors: true,
      visibleOnWebsite: false,
      visibleInCampaigns: true,
      admissionCycles: ['2024-2025'],
    },
    {
      id: 3,
      name: 'BSc Aviation',
      code: 'BSC-AVI',
      department: 'Aviation',
      isVisible: false,
      visibleToCounselors: false,
      visibleOnWebsite: false,
      visibleInCampaigns: false,
      admissionCycles: ['2025-2026'],
    },
  ];

  // Mock data for departments
  const departments = [
    'All Departments',
    'Computer Science',
    'Human Resources',
    'Aviation',
    'Mechanical',
    'Electrical',
  ];

  // Mock data for admission cycles
  const admissionCycles = [
    '2024-2025',
    '2025-2026',
    '2026-2027',
  ];

  const handleVisibilityChange = (courseId, field) => {
    // Handle visibility toggle
    console.log(`Toggling ${field} for course ${courseId}`);
  };

  const filteredCourses = courses.filter(course =>
    (selectedDepartment === 'all' || course.department === selectedDepartment) &&
    course.admissionCycles.includes(selectedCycle)
  );

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Admission Cycle</label>
            <select
              value={selectedCycle}
              onChange={(e) => setSelectedCycle(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              {admissionCycles.map(cycle => (
                <option key={cycle} value={cycle}>{cycle}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Department</label>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              {departments.map(dept => (
                <option key={dept} value={dept === 'All Departments' ? 'all' : dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Course Visibility List */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Course</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Overall Visibility</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Counselors</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Website</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Campaigns</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredCourses.map((course) => (
                <tr key={course.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{course.name}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{course.code}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Switch
                      checked={course.isVisible}
                      onChange={() => handleVisibilityChange(course.id, 'isVisible')}
                      className={classNames(
                        course.isVisible ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600',
                        'relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                      )}
                    >
                      <span className="sr-only">Toggle visibility</span>
                      <span
                        className={classNames(
                          course.isVisible ? 'translate-x-6' : 'translate-x-1',
                          'inline-block h-4 w-4 transform rounded-full bg-white transition-transform'
                        )}
                      />
                    </Switch>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Switch
                      checked={course.visibleToCounselors}
                      onChange={() => handleVisibilityChange(course.id, 'visibleToCounselors')}
                      className={classNames(
                        course.visibleToCounselors ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600',
                        'relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                      )}
                    >
                      <span className="sr-only">Toggle counselor visibility</span>
                      <span
                        className={classNames(
                          course.visibleToCounselors ? 'translate-x-6' : 'translate-x-1',
                          'inline-block h-4 w-4 transform rounded-full bg-white transition-transform'
                        )}
                      />
                    </Switch>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Switch
                      checked={course.visibleOnWebsite}
                      onChange={() => handleVisibilityChange(course.id, 'visibleOnWebsite')}
                      className={classNames(
                        course.visibleOnWebsite ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600',
                        'relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                      )}
                    >
                      <span className="sr-only">Toggle website visibility</span>
                      <span
                        className={classNames(
                          course.visibleOnWebsite ? 'translate-x-6' : 'translate-x-1',
                          'inline-block h-4 w-4 transform rounded-full bg-white transition-transform'
                        )}
                      />
                    </Switch>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Switch
                      checked={course.visibleInCampaigns}
                      onChange={() => handleVisibilityChange(course.id, 'visibleInCampaigns')}
                      className={classNames(
                        course.visibleInCampaigns ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600',
                        'relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                      )}
                    >
                      <span className="sr-only">Toggle campaign visibility</span>
                      <span
                        className={classNames(
                          course.visibleInCampaigns ? 'translate-x-6' : 'translate-x-1',
                          'inline-block h-4 w-4 transform rounded-full bg-white transition-transform'
                        )}
                      />
                    </Switch>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bulk Actions */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Bulk Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            type="button"
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <EyeIcon className="h-5 w-5 mr-2" />
            Make All Visible
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            <EyeSlashIcon className="h-5 w-5 mr-2" />
            Hide All
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <CalendarIcon className="h-5 w-5 mr-2" />
            Update Admission Cycles
          </button>
        </div>
      </div>
    </div>
  );
};

export default VisibilitySettings; 