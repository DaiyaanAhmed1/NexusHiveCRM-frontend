import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalization } from "../../../../hooks/useLocalization";
import { FiTrendingUp, FiTrendingDown, FiClock, FiUsers, FiBarChart, FiTarget } from 'react-icons/fi';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const KPIDashboard = () => {
  const { t } = useTranslation(['admission']);
  const { isRTL } = useLocalization();
  const [timeRange, setTimeRange] = useState('month');

  // Mock data - replace with actual API call
  const kpiData = {
    transfersThisMonth: 25,
    convertedAfterTransfer: 12,
    avgResponseTime: '3 hrs',
    conversionRate: 48,
    trend: 'up'
  };

  const transferTrendData = [
    { month: 'Jan', transfers: 15, conversions: 7 },
    { month: 'Feb', transfers: 20, conversions: 10 },
    { month: 'Mar', transfers: 25, conversions: 12 },
    { month: 'Apr', transfers: 18, conversions: 9 },
    { month: 'May', transfers: 22, conversions: 11 },
    { month: 'Jun', transfers: 25, conversions: 12 }
  ];

  const counselorPerformance = [
    { name: 'Noura Al-Zahra', conversionRate: 45, avgResponseTime: '4.1 hrs' },
    { name: 'Khalid Al-Sayed', conversionRate: 52, avgResponseTime: '3.5 hrs' },
    { name: 'Aisha Al-Hassan', conversionRate: 65, avgResponseTime: '2.5 hrs' },
    { name: 'Omar Al-Mutairi', conversionRate: 58, avgResponseTime: '3.2 hrs' },
    { name: 'Fatima Al-Rashid', conversionRate: 45, avgResponseTime: '4.1 hrs' },
    { name: 'Yousef Al-Harbi', conversionRate: 62, avgResponseTime: '2.8 hrs' },
    { name: 'Maha Al-Shehri', conversionRate: 52, avgResponseTime: '3.5 hrs' },
    { name: 'Sami Al-Shammari', conversionRate: 48, avgResponseTime: '3.9 hrs' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Transfer KPI Dashboard</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Monitor lead transfer performance and metrics</p>
        </div>
        <div className="flex items-center gap-2">
          <FiBarChart className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          <span className="text-sm text-gray-500 dark:text-gray-400">Last updated: 2 hours ago</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Transfers This Month */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                <FiUsers className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Transfers This Month
              </h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {kpiData.transfersThisMonth}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                +12% from last month
              </p>
            </div>
          </div>
        </div>

        {/* Converted After Transfer */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                <FiTrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Converted After Transfer
              </h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {kpiData.convertedAfterTransfer}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {kpiData.conversionRate}% conversion rate
              </p>
            </div>
          </div>
        </div>

        {/* Average Response Time */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
                <FiClock className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Avg Response Time
              </h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {kpiData.avgResponseTime}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                -15% improvement
              </p>
            </div>
          </div>
        </div>

        {/* Conversion Rate */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                kpiData.trend === 'up' 
                  ? 'bg-green-100 dark:bg-green-900/20' 
                  : 'bg-red-100 dark:bg-red-900/20'
              }`}>
                {kpiData.trend === 'up' ? (
                  <FiTrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
                ) : (
                  <FiTrendingDown className="h-6 w-6 text-red-600 dark:text-red-400" />
                )}
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Conversion Rate
              </h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {kpiData.conversionRate}%
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {kpiData.trend === 'up' ? '+5%' : '-2%'} from last month
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Transfer Trend Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Transfer Trends
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
              Monthly transfer and conversion data
            </p>
          </div>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          >
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="quarter">Last Quarter</option>
            <option value="year">Last Year</option>
          </select>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={transferTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
              <XAxis 
                dataKey="month" 
                stroke="#6B7280"
                fontSize={12}
              />
              <YAxis 
                stroke="#6B7280"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }}
              />
              <Legend />
              <Bar dataKey="transfers" fill="#3B82F6" name="Transfers" radius={[4, 4, 0, 0]} />
              <Bar dataKey="conversions" fill="#10B981" name="Conversions" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Counselor Performance */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <FiTarget className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Counselor Performance After Transfers
            </h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            Performance metrics for counselors after receiving transferred leads
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Counselor
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Conversion Rate
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Avg Response Time
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Performance
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {counselorPerformance.map((counselor, index) => (
                <tr key={counselor.name} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                          <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                            {counselor.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {counselor.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Rank #{index + 1}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-900 dark:text-white mr-2">
                        {counselor.conversionRate}%
                      </span>
                      {counselor.conversionRate > 50 ? (
                        <FiTrendingUp className="h-4 w-4 text-green-500" />
                      ) : (
                        <FiTrendingDown className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {counselor.avgResponseTime}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      counselor.conversionRate >= 60 
                        ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300'
                        : counselor.conversionRate >= 50
                        ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300'
                        : 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300'
                    }`}>
                      {counselor.conversionRate >= 60 ? 'Excellent' : 
                       counselor.conversionRate >= 50 ? 'Good' : 'Needs Improvement'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default KPIDashboard;