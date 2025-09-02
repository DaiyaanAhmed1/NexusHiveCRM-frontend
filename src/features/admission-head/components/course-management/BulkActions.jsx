import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const initialCourses = [
  { id: 1, name: 'B.Tech Computer Science', status: 'Active' },
  { id: 2, name: 'MBA Finance', status: 'Draft' },
  { id: 3, name: 'M.Sc Data Science', status: 'Active' },
];

const bulkActions = ['Archive', 'Publish', 'Assign Counselor', 'Update Fees'];

const BulkActions = () => {
  const { t } = useTranslation(['admission', 'common']);
  const [courses, setCourses] = useState(initialCourses);
  const [selected, setSelected] = useState([]);
  const [action, setAction] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSelect = (id) => {
    setSelected(selected.includes(id) ? selected.filter(s => s !== id) : [...selected, id]);
  };

  const handleSelectAll = () => {
    if (selected.length === courses.length) setSelected([]);
    else setSelected(courses.map(c => c.id));
  };

  const handleBulkAction = () => {
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    // For demo, just clear selection and action
    setSelected([]);
    setAction('');
    setShowConfirm(false);
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('courseManagement.bulkActions.title')}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{t('courseManagement.bulkActions.subtitle')}</p>
      </div>
      
      <div className="flex gap-4 items-center">
        <select
          value={action}
          onChange={e => setAction(e.target.value)}
          className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-blue-500 dark:focus:border-blue-600"
        >
          <option value="">Select Bulk Action</option>
          {bulkActions.map(a => (
            <option key={a} value={a}>{a}</option>
          ))}
        </select>
        <button
          onClick={handleBulkAction}
          disabled={!action || selected.length === 0}
          className={`px-4 py-2 rounded-lg text-white font-medium transition-colors duration-200 ${
            !action || selected.length === 0 
              ? 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800'
          }`}
        >
          Apply
        </button>
      </div>
      
      <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3">
                <input
                  type="checkbox"
                  checked={selected.length === courses.length}
                  onChange={handleSelectAll}
                  className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded focus:ring-2 dark:ring-offset-gray-800"
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Course Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {courses.map(course => (
              <tr key={course.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={selected.includes(course.id)}
                    onChange={() => handleSelect(course.id)}
                    className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded focus:ring-2 dark:ring-offset-gray-800"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{course.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    course.status === 'Active' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                  }`}>
                    {course.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-30 dark:bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 w-full max-w-md border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Confirm Bulk Action</h3>
            <p className="mb-6 text-gray-600 dark:text-gray-300">
              Are you sure you want to <span className="font-semibold text-blue-600 dark:text-blue-400">{action}</span> for <span className="font-semibold text-gray-900 dark:text-white">{selected.length}</span> selected course(s)?
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleConfirm}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white rounded-lg font-medium transition-colors duration-200"
              >
                Confirm
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg font-medium transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BulkActions; 