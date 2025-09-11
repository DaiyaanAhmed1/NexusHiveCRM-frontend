import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  FiPlus, 
  FiEdit, 
  FiTrash2, 
  FiSave, 
  FiDollarSign, 
  FiCheckCircle,
  FiX,
  FiBookOpen,
  FiTag,
  FiCreditCard
} from 'react-icons/fi';

const initialCourses = [
  {
    id: 1,
    name: 'B.Tech Computer Science',
    code: 'CS101',
    fee: 120000,
    scholarship: true,
    paymentPlan: 'Installments',
  },
  {
    id: 2,
    name: 'MBA Finance',
    code: 'MBA201',
    fee: 180000,
    scholarship: false,
    paymentPlan: 'Full Payment',
  },
  {
    id: 3,
    name: 'M.Sc Data Science',
    code: 'DS301',
    fee: 150000,
    scholarship: true,
    paymentPlan: 'Installments',
  },
];

const paymentPlans = ['Full Payment', 'Installments', 'Deferred'];

const FeeMapping = () => {
  const [courses, setCourses] = useState(initialCourses);
  const [editingId, setEditingId] = useState(null);
  const [newCourse, setNewCourse] = useState({
    name: '',
    code: '',
    fee: 0,
    scholarship: false,
    paymentPlan: 'Full Payment',
  });
  const { t } = useTranslation(['admission', 'common']);

  const handleFeeChange = (id, value) => {
    setCourses(courses.map(course =>
      course.id === id ? { ...course, fee: value } : course
    ));
  };

  const handleScholarshipToggle = (id) => {
    setCourses(courses.map(course =>
      course.id === id ? { ...course, scholarship: !course.scholarship } : course
    ));
  };

  const handlePaymentPlanChange = (id, value) => {
    setCourses(courses.map(course =>
      course.id === id ? { ...course, paymentPlan: value } : course
    ));
  };

  const handleAddCourse = () => {
    if (newCourse.name && newCourse.code) {
      setCourses([
        ...courses,
        {
          ...newCourse,
          id: Date.now(),
        },
      ]);
      setNewCourse({
        name: '',
        code: '',
        fee: 0,
        scholarship: false,
        paymentPlan: 'Full Payment',
      });
    }
  };

  const handleDeleteCourse = (id) => {
    setCourses(courses.filter(course => course.id !== id));
  };

  const handleEditCourse = (id) => {
    setEditingId(editingId === id ? null : id);
  };

  const totalFees = courses.reduce((sum, course) => sum + (course.fee || 0), 0);
  const scholarshipCount = courses.filter(course => course.scholarship).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
            <FiDollarSign className="w-6 h-6 mr-2 text-green-500" />
            {t('courseManagement.feeMapping.title')}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {t('courseManagement.feeMapping.subtitle')}
          </p>
        </div>
        <button
          onClick={handleAddCourse}
          className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <FiPlus className="w-4 h-4 mr-2" />
          Add Course
        </button>
      </div>

      {/* Add New Course Form */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <FiPlus className="w-5 h-5 mr-2 text-blue-500" />
          Add New Course
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Course Name
            </label>
            <input
              type="text"
              value={newCourse.name}
              onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter course name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Course Code
            </label>
            <input
              type="text"
              value={newCourse.code}
              onChange={(e) => setNewCourse({ ...newCourse, code: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., CS101"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('courseManagement.feeMapping.courseFee')}
            </label>
            <input
              type="number"
              value={newCourse.fee}
              onChange={(e) => setNewCourse({ ...newCourse, fee: Number(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('courseManagement.feeMapping.paymentPlan')}
            </label>
            <select
              value={newCourse.paymentPlan}
              onChange={(e) => setNewCourse({ ...newCourse, paymentPlan: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {paymentPlans.map(plan => (
                <option key={plan} value={plan}>{plan}</option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={newCourse.scholarship}
                onChange={(e) => setNewCourse({ ...newCourse, scholarship: e.target.checked })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded"
              />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                {t('courseManagement.feeMapping.scholarship')}
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Courses Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Course Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Course Code
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {t('courseManagement.feeMapping.courseFee')}
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {t('courseManagement.feeMapping.scholarship')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {t('courseManagement.feeMapping.paymentPlan')}
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {courses.map((course) => (
                <tr key={course.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingId === course.id ? (
                      <input
                        type="text"
                        value={course.name}
                        onChange={(e) => setCourses(courses.map(c => 
                          c.id === course.id ? { ...c, name: e.target.value } : c
                        ))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <div className="flex items-center">
                        <FiBookOpen className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{course.name}</span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingId === course.id ? (
                      <input
                        type="text"
                        value={course.code}
                        onChange={(e) => setCourses(courses.map(c => 
                          c.id === course.id ? { ...c, code: e.target.value } : c
                        ))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                        <FiTag className="w-3 h-3 mr-1" />
                        {course.code}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingId === course.id ? (
                      <input
                        type="number"
                        value={course.fee}
                        onChange={(e) => handleFeeChange(course.id, Number(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <div className="flex items-center">
                        <FiDollarSign className="w-4 h-4 text-green-500 mr-1" />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {course.fee.toLocaleString()}
                        </span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <input
                      type="checkbox"
                      checked={course.scholarship}
                      onChange={() => handleScholarshipToggle(course.id)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingId === course.id ? (
                      <select
                        value={course.paymentPlan}
                        onChange={(e) => handlePaymentPlanChange(course.id, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {paymentPlans.map(plan => (
                          <option key={plan} value={plan}>{plan}</option>
                        ))}
                      </select>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                        <FiCreditCard className="w-3 h-3 mr-1" />
                        {course.paymentPlan}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => handleEditCourse(course.id)}
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        {editingId === course.id ? (
                          <FiSave className="w-4 h-4" />
                        ) : (
                          <FiEdit className="w-4 h-4" />
                        )}
                      </button>
                      <button
                        onClick={() => handleDeleteCourse(course.id)}
                        className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <FiBookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Courses
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{courses.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <FiDollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Fees
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                ${totalFees.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
              <FiCheckCircle className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Scholarship Courses
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{scholarshipCount}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeeMapping;