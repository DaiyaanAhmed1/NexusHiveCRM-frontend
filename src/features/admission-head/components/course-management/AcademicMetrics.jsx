import React from 'react';
import { useTranslation } from 'react-i18next';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const metrics = [
  { label: 'Avg. Grade', value: 'B+', icon: '🎓', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' },
  { label: 'Pass Rate', value: '92%', icon: '✅', color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' },
  { label: 'Dropout Rate', value: '4%', icon: '📉', color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' },
  { label: 'Placement Rate', value: '78%', icon: '💼', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' },
];

const courseData = {
  labels: ['B.Tech CS', 'MBA Finance', 'M.Sc Data Science'],
  datasets: [
    {
      label: 'Pass Rate (%)',
      data: [95, 90, 91],
      backgroundColor: '#4f46e5',
    },
    {
      label: 'Dropout Rate (%)',
      data: [3, 5, 4],
      backgroundColor: '#f87171',
    },
    {
      label: 'Placement Rate (%)',
      data: [80, 75, 78],
      backgroundColor: '#fbbf24',
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: { 
      position: 'top',
      labels: {
        color: document.documentElement.classList.contains('dark') ? '#f3f4f6' : '#374151'
      }
    },
    title: { 
      display: true, 
      text: 'Academic Metrics by Course',
      color: document.documentElement.classList.contains('dark') ? '#f3f4f6' : '#374151'
    },
  },
  scales: {
    x: {
      ticks: {
        color: document.documentElement.classList.contains('dark') ? '#f3f4f6' : '#374151'
      },
      grid: {
        color: document.documentElement.classList.contains('dark') ? '#374151' : '#e5e7eb'
      }
    },
    y: {
      ticks: {
        color: document.documentElement.classList.contains('dark') ? '#f3f4f6' : '#374151'
      },
      grid: {
        color: document.documentElement.classList.contains('dark') ? '#374151' : '#e5e7eb'
      }
    }
  }
};

const AcademicMetrics = () => {
  const { t } = useTranslation(['admission', 'common']);

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('courseManagement.academicMetrics.title')}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{t('courseManagement.academicMetrics.subtitle')}</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {metrics.map((m, idx) => (
          <div key={idx} className={`rounded-lg p-6 flex flex-col items-center shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-xl ${m.color}`}>
            <span className="text-3xl mb-2">{m.icon}</span>
            <div className="text-lg font-semibold">{m.value}</div>
            <div className="text-gray-600 dark:text-gray-300 text-sm text-center">{m.label}</div>
          </div>
        ))}
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        <Bar data={courseData} options={options} />
      </div>
    </div>
  );
};

export default AcademicMetrics; 