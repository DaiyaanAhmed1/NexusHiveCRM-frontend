import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const initialCourses = [
  {
    id: 1,
    name: 'B.Tech Computer Science',
    checklist: {
      brochure: true,
      website: true,
      campaign: false,
    },
  },
  {
    id: 2,
    name: 'MBA Finance',
    checklist: {
      brochure: false,
      website: true,
      campaign: true,
    },
  },
  {
    id: 3,
    name: 'M.Sc Data Science',
    checklist: {
      brochure: true,
      website: false,
      campaign: false,
    },
  },
];

const MarketingReadiness = () => {
  const { t } = useTranslation(['admission', 'common']);
  const [courses, setCourses] = useState(initialCourses);

  const handleToggle = (id, key) => {
    setCourses(courses.map(course =>
      course.id === id
        ? { ...course, checklist: { ...course.checklist, [key]: !course.checklist[key] } }
        : course
    ));
  };

  const getScore = (checklist) => {
    const total = Object.keys(checklist).length;
    const done = Object.values(checklist).filter(Boolean).length;
    return Math.round((done / total) * 100);
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('courseManagement.marketingReadiness.title')}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{t('courseManagement.marketingReadiness.subtitle')}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <div key={course.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6 flex flex-col gap-4 transition-all duration-200 hover:shadow-xl">
            <div className="flex justify-between items-center">
              <div className="font-semibold text-lg text-gray-900 dark:text-white">{course.name}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {t('courseManagement.marketingReadiness.readiness')}: 
                <span className="font-bold text-blue-600 dark:text-blue-400 ml-1">{getScore(course.checklist)}%</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={course.checklist.brochure} 
                  onChange={() => handleToggle(course.id, 'brochure')}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <span className="text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                  {t('courseManagement.marketingReadiness.brochureReady')}
                </span>
              </label>
              
              <label className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={course.checklist.website} 
                  onChange={() => handleToggle(course.id, 'website')}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <span className="text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                  {t('courseManagement.marketingReadiness.websiteUpdated')}
                </span>
              </label>
              
              <label className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={course.checklist.campaign} 
                  onChange={() => handleToggle(course.id, 'campaign')}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <span className="text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                  {t('courseManagement.marketingReadiness.campaignLaunched')}
                </span>
              </label>
            </div>
            
            <div className="mt-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
              {getScore(course.checklist) === 100 ? (
                <span className="text-green-600 dark:text-green-400 font-semibold flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {t('courseManagement.marketingReadiness.readyForMarketing')}
                </span>
              ) : (
                <span className="text-yellow-600 dark:text-yellow-400 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {t('courseManagement.marketingReadiness.needsAttention')}: {Object.entries(course.checklist).filter(([k, v]) => !v).map(([k]) => k.charAt(0).toUpperCase() + k.slice(1)).join(', ')}
                </span>
              )}
            </div>
            
            <button
              className={`mt-4 px-4 py-2 rounded-lg font-semibold text-white transition-all duration-200 ${
                getScore(course.checklist) === 100 
                  ? 'bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700' 
                  : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
              disabled={getScore(course.checklist) === 100}
            >
              {getScore(course.checklist) === 100 
                ? t('courseManagement.marketingReadiness.ready') 
                : t('courseManagement.marketingReadiness.markAsReady')
              }
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketingReadiness; 