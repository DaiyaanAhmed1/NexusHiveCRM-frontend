import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLocalization } from '../hooks/useLocalization';

export default function UniversityInfo() {
  const navigate = useNavigate();
  const { t } = useTranslation('university');
  const { isRTLMode } = useLocalization();
  const [activeTab, setActiveTab] = useState('overview');

  const handleBack = () => {
    navigate(-1);
  };

  const stats = [
    {
      label: t('university.stats.totalStudents.label'),
      value: t('university.stats.totalStudents.value'),
      icon: "👨‍🎓"
    },
    {
      label: t('university.stats.facultyMembers.label'),
      value: t('university.stats.facultyMembers.value'),
      icon: "👩‍🏫"
    },
    {
      label: t('university.stats.programsOffered.label'),
      value: t('university.stats.programsOffered.value'),
      icon: "📚"
    },
    {
      label: t('university.stats.researchCenters.label'),
      value: t('university.stats.researchCenters.value'),
      icon: "🔬"
    },
    {
      label: t('university.stats.internationalPartners.label'),
      value: t('university.stats.internationalPartners.value'),
      icon: "🌍"
    },
    {
      label: t('university.stats.employmentRate.label'),
      value: t('university.stats.employmentRate.value'),
      icon: "💼"
    }
  ];

  const colleges = t('university.colleges.list', { returnObjects: true });
  const achievements = t('university.achievements.list', { returnObjects: true });
  const leadership = t('university.leadership.members', { returnObjects: true });

  const leadershipImages = ["👨‍💼", "👩‍💼", "👨‍🔬", "👩‍🎓"];

  const tabs = ['overview', 'colleges', 'achievements', 'leadership', 'contact'];

  return (
    <div className={`min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 ${isRTLMode ? 'rtl' : 'ltr'}`} dir={isRTLMode ? 'rtl' : 'ltr'}>
      {/* Header with Banner */}
      <div className="relative bg-white dark:bg-gray-800 shadow-lg overflow-hidden">
        {/* Banner Images */}
        <div className="relative h-64 overflow-hidden">
          <img
            src="https://lms-frontend-resources.s3.ap-south-1.amazonaws.com/college1/camp1.png"
            alt={t('university.campusAlt')}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/70 to-emerald-800/70"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">{t('university.name')}</h1>
              <p className="text-xl md:text-2xl italic">{t('university.motto')}</p>
            </div>
          </div>
        </div>
        
        {/* Header Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className={`flex items-center justify-between ${isRTLMode ? 'flex-row-reverse' : ''}`}>
            <div className={`flex items-center space-x-4 ${isRTLMode ? 'space-x-reverse' : ''}`}>
              <button
                onClick={handleBack}
                className="p-2 rounded-lg bg-green-100 dark:bg-green-900 hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
              >
                <svg className={`w-6 h-6 ${isRTLMode ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className={`flex items-center space-x-4 ${isRTLMode ? 'space-x-reverse' : ''}`}>
                <img
                  src="https://lms-frontend-resources.s3.ap-south-1.amazonaws.com/college1/collage1.png"
                  alt={t('university.logoAlt')}
                  className="w-16 h-16"
                />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Established {t('university.established')}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t('university.accreditation')}</p>
                </div>
              </div>
            </div>
            <div className={`${isRTLMode ? 'text-left' : 'text-right'}`}>
              <p className="text-sm text-gray-600 dark:text-gray-400">📍 {t('university.location')}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">🏛️ {t('university.vision2030')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Second Banner */}
      <div className="relative h-48 overflow-hidden">
        <img
          src="https://lms-frontend-resources.s3.ap-south-1.amazonaws.com/college1/camp2.png"
          alt={t('university.campusViewAlt')}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-green-900/60 to-transparent"></div>
        <div className={`absolute bottom-4 ${isRTLMode ? 'right-4' : 'left-4'} text-white`}>
          <p className="text-lg font-semibold">{t('university.bannerText.excellence')}</p>
          <p className="text-sm">{t('university.bannerText.shaping')}</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className={`flex ${isRTLMode ? 'space-x-reverse space-x-1' : 'space-x-1'} bg-white dark:bg-gray-800 rounded-lg p-1 shadow-lg`}>
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab
                  ? 'bg-green-600 text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {t(`university.navigation.${tab}`)}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow ${isRTLMode ? 'border-r-4 border-green-500' : 'border-l-4 border-green-500'}`}
                  >
                    <div className={`flex items-center space-x-4 ${isRTLMode ? 'space-x-reverse' : ''}`}>
                      <span className="text-4xl">{stat.icon}</span>
                      <div>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                        <p className="text-gray-600 dark:text-gray-300">{stat.label}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* About Section */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t('university.about.title')}</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                      {t('university.about.description1')}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                      {t('university.about.description2')}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {t('university.about.description3')}
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div className={`flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700 ${isRTLMode ? 'flex-row-reverse' : ''}`}>
                      <span className="font-medium text-gray-700 dark:text-gray-300">{t('university.about.details.type')}</span>
                      <span className={`text-gray-900 dark:text-white ${isRTLMode ? 'text-right' : 'text-left'}`}>{t('university.type')}</span>
                    </div>
                    <div className={`flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700 ${isRTLMode ? 'flex-row-reverse' : ''}`}>
                      <span className="font-medium text-gray-700 dark:text-gray-300">{t('university.about.details.location')}</span>
                      <span className={`text-gray-900 dark:text-white ${isRTLMode ? 'text-right' : 'text-left'}`}>{t('university.location')}</span>
                    </div>
                    <div className={`flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700 ${isRTLMode ? 'flex-row-reverse' : ''}`}>
                      <span className="font-medium text-gray-700 dark:text-gray-300">{t('university.about.details.accreditation')}</span>
                      <span className={`text-gray-900 dark:text-white ${isRTLMode ? 'text-right' : 'text-left'}`}>{t('university.accreditation')}</span>
                    </div>
                    <div className={`flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700 ${isRTLMode ? 'flex-row-reverse' : ''}`}>
                      <span className="font-medium text-gray-700 dark:text-gray-300">{t('university.about.details.website')}</span>
                      <a href={`https://${t('university.website')}`} className={`text-green-600 hover:underline ${isRTLMode ? 'text-right' : 'text-left'}`} target="_blank" rel="noopener noreferrer">
                        {t('university.website')}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'colleges' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t('university.colleges.title')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {colleges.map((college, index) => (
                  <motion.div
                    key={college.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow ${isRTLMode ? 'border-r-4 border-green-500' : 'border-l-4 border-green-500'}`}
                  >
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{college.name}</h3>
                    <div className="space-y-3">
                      <div className={`flex justify-between items-center ${isRTLMode ? 'flex-row-reverse' : ''}`}>
                        <span className="text-gray-600 dark:text-gray-300">{t('university.colleges.programsLabel')}</span>
                        <span className="font-semibold text-gray-900 dark:text-white">{college.programs}</span>
                      </div>
                      <div className={`flex justify-between items-center ${isRTLMode ? 'flex-row-reverse' : ''}`}>
                        <span className="text-gray-600 dark:text-gray-300">{t('university.colleges.studentsLabel')}</span>
                        <span className="font-semibold text-gray-900 dark:text-white">{college.students.toLocaleString()}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'achievements' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t('university.achievements.title')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement}
                    initial={{ opacity: 0, x: index % 2 === 0 ? (isRTLMode ? 20 : -20) : (isRTLMode ? -20 : 20) }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow ${isRTLMode ? 'border-r-4 border-green-500' : 'border-l-4 border-green-500'}`}
                  >
                    <div className={`flex items-center space-x-4 ${isRTLMode ? 'space-x-reverse' : ''}`}>
                      <span className="text-3xl">🏆</span>
                      <p className="text-gray-700 dark:text-gray-300 font-medium">{achievement}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'leadership' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t('university.leadership.title')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {leadership.map((leader, index) => (
                  <motion.div
                    key={leader.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow text-center"
                  >
                    <div className="text-6xl mb-4">{leadershipImages[index]}</div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{leader.name}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{leader.position}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t('university.contact.title')}</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">{t('university.contact.getInTouch')}</h3>
                  <div className="space-y-4">
                    <div className={`flex items-center space-x-4 ${isRTLMode ? 'space-x-reverse' : ''}`}>
                      <span className="text-2xl">📧</span>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{t('university.contact.labels.email')}</p>
                        <a href={`mailto:${t('university.email')}`} className="text-green-600 hover:underline">
                          {t('university.email')}
                        </a>
                      </div>
                    </div>
                    <div className={`flex items-center space-x-4 ${isRTLMode ? 'space-x-reverse' : ''}`}>
                      <span className="text-2xl">📞</span>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{t('university.contact.labels.phone')}</p>
                        <a href={`tel:${t('university.phone')}`} className="text-green-600 hover:underline">
                          {t('university.phone')}
                        </a>
                      </div>
                    </div>
                    <div className={`flex items-center space-x-4 ${isRTLMode ? 'space-x-reverse' : ''}`}>
                      <span className="text-2xl">🌐</span>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{t('university.contact.labels.website')}</p>
                        <a href={`https://${t('university.website')}`} className="text-green-600 hover:underline" target="_blank" rel="noopener noreferrer">
                          {t('university.website')}
                        </a>
                      </div>
                    </div>
                    <div className={`flex items-center space-x-4 ${isRTLMode ? 'space-x-reverse' : ''}`}>
                      <span className="text-2xl">📍</span>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{t('university.contact.labels.address')}</p>
                        <p className="text-gray-600 dark:text-gray-300">{t('university.location')}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">{t('university.contact.officeHours.title')}</h3>
                  <div className="space-y-3">
                    <div className={`flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700 ${isRTLMode ? 'flex-row-reverse' : ''}`}>
                      <span className="text-gray-600 dark:text-gray-300">{t('university.contact.officeHours.schedule.sundayThursday')}</span>
                      <span className="font-medium text-gray-900 dark:text-white">{t('university.contact.officeHours.times.sundayThursday')}</span>
                    </div>
                    <div className={`flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700 ${isRTLMode ? 'flex-row-reverse' : ''}`}>
                      <span className="text-gray-600 dark:text-gray-300">{t('university.contact.officeHours.schedule.friday')}</span>
                      <span className="font-medium text-gray-900 dark:text-white">{t('university.contact.officeHours.times.friday')}</span>
                    </div>
                    <div className={`flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700 ${isRTLMode ? 'flex-row-reverse' : ''}`}>
                      <span className="text-gray-600 dark:text-gray-300">{t('university.contact.officeHours.schedule.saturday')}</span>
                      <span className="font-medium text-gray-900 dark:text-white">{t('university.contact.officeHours.times.saturday')}</span>
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <p className="text-sm text-green-800 dark:text-green-200">
                      <strong>{t('university.contact.officeHours.note')}</strong> {t('university.contact.officeHours.emergencyNote')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
} 