import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

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

  const handleAddFeeRule = () => {
    setCourses([
      ...courses,
      {
        id: Date.now(),
        name: '',
        code: '',
        fee: 0,
        scholarship: false,
        paymentPlan: 'Full Payment',
      },
    ]);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Fee Mapping</h2>
        <button
          onClick={handleAddFeeRule}
          className="bg-primary text-white px-4 py-2 rounded-lg shadow hover:bg-primary-dark"
        >
          + Add Fee Rule
        </button>
      </div>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Course Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Code</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fee ($)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Scholarship</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payment Plan</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {courses.map((course, idx) => (
              <tr key={course.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="text"
                    value={course.name}
                    onChange={e => setCourses(courses.map((c, i) => i === idx ? { ...c, name: e.target.value } : c))}
                    className="border rounded px-2 py-1 w-48"
                    placeholder="Course Name"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="text"
                    value={course.code}
                    onChange={e => setCourses(courses.map((c, i) => i === idx ? { ...c, code: e.target.value } : c))}
                    className="border rounded px-2 py-1 w-24"
                    placeholder="Code"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="number"
                    value={course.fee}
                    onChange={e => handleFeeChange(course.id, Number(e.target.value))}
                    className="border rounded px-2 py-1 w-32"
                    placeholder="Fee in $"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <input
                    type="checkbox"
                    checked={course.scholarship}
                    onChange={() => handleScholarshipToggle(course.id)}
                    className="h-5 w-5 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={course.paymentPlan}
                    onChange={e => handlePaymentPlanChange(course.id, e.target.value)}
                    className="border rounded px-2 py-1"
                  >
                    {paymentPlans.map(plan => (
                      <option key={plan} value={plan}>{plan}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end">
        <div className="bg-gray-100 rounded-lg px-6 py-4 text-right">
          <div className="font-semibold text-gray-700">Total Courses: {courses.length}</div>
          <div className="text-gray-500 text-sm">Total Mapped Fees: ${courses.reduce((sum, c) => sum + (c.fee || 0), 0).toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
};

export default FeeMapping; 