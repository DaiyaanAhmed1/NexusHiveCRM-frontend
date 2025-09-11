import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLocalization } from '../hooks/useLocalization';
import { 
  FiUsers, FiBarChart2, FiShield, FiZap, FiGlobe, FiTrendingUp,
  FiCheckCircle, FiStar, FiAward, FiTarget, FiSettings, FiMessageSquare,
  FiCalendar, FiFileText, FiDollarSign, FiHeadphones, FiMail, FiPhone,
  FiArrowRight, FiPlay, FiDownload, FiEye, FiCpu, FiDatabase
} from 'react-icons/fi';

export default function UniversityInfo() {
  const navigate = useNavigate();
  const { t, i18n, ready } = useTranslation('university');
  const { isRTLMode } = useLocalization();
  const [activeTab, setActiveTab] = useState('overview');
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [languageVersion, setLanguageVersion] = useState(0);

  useEffect(() => {
    const handleLanguageChange = () => {
      setLanguageVersion(prev => prev + 1);
    };

    i18n.on('languageChanged', handleLanguageChange);
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n]);

  const handleBack = () => {
    navigate(-1);
  };

  // Show loading state while translations are loading
  if (!ready) {
    return (
      <div className="min-h-screen bg-[#F6F7FA] dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  const stats = [
    {
      label: t('marlnCrm.stats.activeUsers'),
      value: "10,000+",
      icon: FiUsers,
      color: "from-blue-500 to-blue-600"
    },
    {
      label: t('marlnCrm.stats.dataProcessed'),
      value: "1M+ Records",
      icon: FiDatabase,
      color: "from-green-500 to-green-600"
    },
    {
      label: t('marlnCrm.stats.successRate'),
      value: "99.9%",
      icon: FiTrendingUp,
      color: "from-purple-500 to-purple-600"
    },
    {
      label: t('marlnCrm.stats.responseTime'),
      value: "< 2s",
      icon: FiZap,
      color: "from-orange-500 to-orange-600"
    },
    {
      label: t('marlnCrm.stats.uptime'),
      value: "99.99%",
      icon: FiShield,
      color: "from-red-500 to-red-600"
    },
    {
      label: t('marlnCrm.stats.clientSatisfaction'),
      value: "4.9/5",
      icon: FiStar,
      color: "from-yellow-500 to-yellow-600"
    }
  ];

  const features = [
    {
      title: t('marlnCrm.features.studentManagement.title'),
      description: t('marlnCrm.features.studentManagement.description'),
      icon: FiUsers,
      benefits: t('marlnCrm.features.studentManagement.benefits', { returnObjects: true }),
      color: "blue"
    },
    {
      title: t('marlnCrm.features.academicAnalytics.title'),
      description: t('marlnCrm.features.academicAnalytics.description'),
      icon: FiBarChart2,
      benefits: t('marlnCrm.features.academicAnalytics.benefits', { returnObjects: true }),
      color: "green"
    },
    {
      title: t('marlnCrm.features.financialManagement.title'),
      description: t('marlnCrm.features.financialManagement.description'),
      icon: FiDollarSign,
      benefits: t('marlnCrm.features.financialManagement.benefits', { returnObjects: true }),
      color: "purple"
    },
    {
      title: t('marlnCrm.features.communicationHub.title'),
      description: t('marlnCrm.features.communicationHub.description'),
      icon: FiMessageSquare,
      benefits: t('marlnCrm.features.communicationHub.benefits', { returnObjects: true }),
      color: "orange"
    },
    {
      title: t('marlnCrm.features.documentManagement.title'),
      description: t('marlnCrm.features.documentManagement.description'),
      icon: FiFileText,
      benefits: t('marlnCrm.features.documentManagement.benefits', { returnObjects: true }),
      color: "indigo"
    },
    {
      title: t('marlnCrm.features.aiInsights.title'),
      description: t('marlnCrm.features.aiInsights.description'),
      icon: FiCpu,
      benefits: t('marlnCrm.features.aiInsights.benefits', { returnObjects: true }),
      color: "pink"
    }
  ];

  const testimonials = [
    {
      name: t('marlnCrm.testimonials.client1.name'),
      role: t('marlnCrm.testimonials.client1.role'),
      company: t('marlnCrm.testimonials.client1.company'),
      content: t('marlnCrm.testimonials.client1.content'),
      rating: 5,
      avatar: "👩‍💼"
    },
    {
      name: t('marlnCrm.testimonials.client2.name'),
      role: t('marlnCrm.testimonials.client2.role'),
      company: t('marlnCrm.testimonials.client2.company'),
      content: t('marlnCrm.testimonials.client2.content'),
      rating: 5,
      avatar: "👨‍💻"
    },
    {
      name: t('marlnCrm.testimonials.client3.name'),
      role: t('marlnCrm.testimonials.client3.role'),
      company: t('marlnCrm.testimonials.client3.company'),
      content: t('marlnCrm.testimonials.client3.content'),
      rating: 5,
      avatar: "👩‍🎓"
    }
  ];

  const tabs = ['overview', 'features', 'testimonials', 'pricing', 'contact'];

  return (
    <div key={`${i18n.language}-${languageVersion}`} className={`min-h-screen bg-[#F6F7FA] dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 ${isRTLMode ? 'rtl' : 'ltr'}`} dir={isRTLMode ? 'rtl' : 'ltr'}>
      {/* Header with Hero Section */}
      <div className="relative bg-white dark:bg-gray-800 shadow-lg overflow-hidden">
        {/* Hero Background */}
        <div className="relative h-96 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900"></div>
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white max-w-4xl mx-auto px-4">
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-5xl md:text-7xl font-bold mb-6"
              >
                {t('marlnCrm.title')}
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl md:text-2xl mb-8 text-blue-100"
              >
                {t('marlnCrm.subtitle')}
              </motion.p>
            </div>
          </div>
        </div>
        
        {/* Header Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className={`flex items-center justify-between ${isRTLMode ? 'flex-row-reverse' : ''}`}>
            <div className={`flex items-center space-x-4 ${isRTLMode ? 'space-x-reverse' : ''}`}>
              <button
                onClick={handleBack}
                className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
              >
                <svg className={`w-6 h-6 ${isRTLMode ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className={`flex items-center space-x-4 ${isRTLMode ? 'space-x-reverse' : ''}`}>
                <img
                  src="https://lms-frontend-resources.s3.ap-south-1.amazonaws.com/marlnlogopng.png"
                  alt="Marln Corp Logo"
                  className="w-16 h-16"
                />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {t('marlnCrm.trustedBy')}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t('marlnCrm.aiPowered')}</p>
                </div>
              </div>
            </div>
            <div className={`${isRTLMode ? 'text-left' : 'text-right'}`}>
              <p className="text-sm text-gray-600 dark:text-gray-400">🌍 {t('marlnCrm.globalPresence')}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">🏆 {t('marlnCrm.industryLeader')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs - Completely separate with solid background */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className={`flex ${isRTLMode ? 'space-x-reverse space-x-1' : 'space-x-1'} bg-white dark:bg-gray-800 rounded-lg p-1 shadow-lg`}>
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {t(`marlnCrm.tabs.${tab}`)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content with Background Image - Completely separate section */}
      <div className="relative min-h-screen bg-white dark:bg-gray-800 overflow-hidden">
        {/* Background Image with Blur Effect - Only in this section */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://lms-frontend-resources.s3.ap-south-1.amazonaws.com/NexusHiveCRM/Image-2.png)',
            filter: 'blur(8px)',
            transform: 'scale(1.02)'
          }}
        ></div>
        
        {/* Overlay for better content readability */}
        <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm"></div>
        
        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'overview' && (
              <div className="space-y-12 pt-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group"
                    >
                      <div className={`flex items-center space-x-4 ${isRTLMode ? 'space-x-reverse' : ''}`}>
                        <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color} text-white group-hover:scale-110 transition-transform`}>
                          <stat.icon className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                          <p className="text-gray-600 dark:text-gray-300">{stat.label}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* About Section */}
                <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-8 shadow-lg">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">{t('marlnCrm.overview.title')}</h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                        {t('marlnCrm.overview.description1')}
                      </p>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                        {t('marlnCrm.overview.description2')}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">AI-Powered</span>
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Cloud-Based</span>
                        <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">Secure</span>
                        <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">Scalable</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className={`flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700 ${isRTLMode ? 'flex-row-reverse' : ''}`}>
                        <span className="font-medium text-gray-700 dark:text-gray-300">{t('marlnCrm.overview.platformType')}</span>
                        <span className={`text-gray-900 dark:text-white ${isRTLMode ? 'text-right' : 'text-left'}`}>{t('marlnCrm.overview.platformTypeValue')}</span>
                      </div>
                      <div className={`flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700 ${isRTLMode ? 'flex-row-reverse' : ''}`}>
                        <span className="font-medium text-gray-700 dark:text-gray-300">{t('marlnCrm.overview.deployment')}</span>
                        <span className={`text-gray-900 dark:text-white ${isRTLMode ? 'text-right' : 'text-left'}`}>{t('marlnCrm.overview.deploymentValue')}</span>
                      </div>
                      <div className={`flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700 ${isRTLMode ? 'flex-row-reverse' : ''}`}>
                        <span className="font-medium text-gray-700 dark:text-gray-300">{t('marlnCrm.overview.security')}</span>
                        <span className={`text-gray-900 dark:text-white ${isRTLMode ? 'text-right' : 'text-left'}`}>{t('marlnCrm.overview.securityValue')}</span>
                      </div>
                      <div className={`flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700 ${isRTLMode ? 'flex-row-reverse' : ''}`}>
                        <span className="font-medium text-gray-700 dark:text-gray-300">{t('marlnCrm.overview.support')}</span>
                        <span className={`text-gray-900 dark:text-white ${isRTLMode ? 'text-right' : 'text-left'}`}>{t('marlnCrm.overview.supportValue')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'features' && (
              <div className="space-y-8 pt-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">{t('marlnCrm.features.title')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {features.map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer ${
                        hoveredFeature === index ? 'ring-2 ring-blue-500' : ''
                      }`}
                      onMouseEnter={() => setHoveredFeature(index)}
                      onMouseLeave={() => setHoveredFeature(null)}
                    >
                      <div className={`w-12 h-12 rounded-lg bg-${feature.color}-100 dark:bg-${feature.color}-900/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <feature.icon className={`w-6 h-6 text-${feature.color}-600 dark:text-${feature.color}-400`} />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">{feature.description}</p>
                      <ul className="space-y-2">
                        {feature.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                            <FiCheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'testimonials' && (
              <div className="space-y-8 pt-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">{t('marlnCrm.testimonials.title')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {testimonials.map((testimonial, index) => (
                    <motion.div
                      key={testimonial.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                    >
                      <div className="flex items-center mb-4">
                        <div className="text-4xl mr-4">{testimonial.avatar}</div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{testimonial.role}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.company}</p>
                        </div>
                      </div>
                      <div className="flex mb-3">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <FiStar key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 italic">"{testimonial.content}"</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

{activeTab === 'pricing' && (
              <div className="space-y-8 pt-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">{t('marlnCrm.pricing.title')}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                  <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-6 lg:p-8 shadow-lg">
                    <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('marlnCrm.pricing.starter.name')}</h3>
                    <div className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6">{t('marlnCrm.pricing.starter.price')}<span className="text-base lg:text-lg text-gray-500">{t('marlnCrm.pricing.starter.period')}</span></div>
                    <ul className="space-y-2 lg:space-y-3 mb-6 lg:mb-8">
                      {t('marlnCrm.pricing.starter.features', { returnObjects: true }).map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm lg:text-base text-gray-600 dark:text-gray-300">
                          <FiCheckCircle className="w-4 h-4 lg:w-5 lg:h-5 text-green-500 mr-2 lg:mr-3 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <button className="w-full bg-gray-900 text-white py-2.5 lg:py-3 rounded-lg hover:bg-gray-800 transition-colors text-sm lg:text-base">
                      {t('marlnCrm.pricing.starter.button')}
                    </button>
                  </div>
                  <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-6 lg:p-8 shadow-lg ring-2 ring-blue-500 relative">
                    <div className="absolute -top-3 lg:-top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-blue-500 text-white px-3 lg:px-4 py-1 rounded-full text-xs lg:text-sm font-semibold">{t('marlnCrm.pricing.professional.badge')}</span>
                    </div>
                    <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('marlnCrm.pricing.professional.name')}</h3>
                    <div className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6">{t('marlnCrm.pricing.professional.price')}<span className="text-base lg:text-lg text-gray-500">{t('marlnCrm.pricing.professional.period')}</span></div>
                    <ul className="space-y-2 lg:space-y-3 mb-6 lg:mb-8">
                      {t('marlnCrm.pricing.professional.features', { returnObjects: true }).map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm lg:text-base text-gray-600 dark:text-gray-300">
                          <FiCheckCircle className="w-4 h-4 lg:w-5 lg:h-5 text-green-500 mr-2 lg:mr-3 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <button className="w-full bg-blue-600 text-white py-2.5 lg:py-3 rounded-lg hover:bg-blue-700 transition-colors text-sm lg:text-base">
                      {t('marlnCrm.pricing.professional.button')}
                    </button>
                  </div>
                  <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-6 lg:p-8 shadow-lg sm:col-span-2 lg:col-span-1">
                    <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('marlnCrm.pricing.enterprise.name')}</h3>
                    <div className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6">{t('marlnCrm.pricing.enterprise.price')}</div>
                    <ul className="space-y-2 lg:space-y-3 mb-6 lg:mb-8">
                      {t('marlnCrm.pricing.enterprise.features', { returnObjects: true }).map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm lg:text-base text-gray-600 dark:text-gray-300">
                          <FiCheckCircle className="w-4 h-4 lg:w-5 lg:h-5 text-green-500 mr-2 lg:mr-3 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <button className="w-full bg-gray-900 text-white py-2.5 lg:py-3 rounded-lg hover:bg-gray-800 transition-colors text-sm lg:text-base">
                      {t('marlnCrm.pricing.enterprise.button')}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'contact' && (
              <div className="space-y-8 pt-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">{t('marlnCrm.contact.title')}</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-8 shadow-lg">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">{t('marlnCrm.contact.contactInfo')}</h3>
                    <div className="space-y-4">
                      <div className={`flex items-center space-x-4 ${isRTLMode ? 'space-x-reverse' : ''}`}>
                        <span className="text-2xl">📧</span>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{t('marlnCrm.contact.email')}</p>
                          <a href="mailto:info@marlncorp.com" className="text-blue-600 hover:underline">
                            info@marlncorp.com
                          </a>
                        </div>
                      </div>
                      <div className={`flex items-center space-x-4 ${isRTLMode ? 'space-x-reverse' : ''}`}>
                        <span className="text-2xl">📞</span>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{t('marlnCrm.contact.phone')}</p>
                          <a href="tel:+1234567890" className="text-blue-600 hover:underline">
                            +1 (234) 567-8900
                          </a>
                        </div>
                      </div>
                      <div className={`flex items-center space-x-4 ${isRTLMode ? 'space-x-reverse' : ''}`}>
                        <span className="text-2xl">🌐</span>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{t('marlnCrm.contact.website')}</p>
                          <a href="https://marlncorp.com" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                            www.marlncorp.com
                          </a>
                        </div>
                      </div>
                      <div className={`flex items-center space-x-4 ${isRTLMode ? 'space-x-reverse' : ''}`}>
                        <span className="text-2xl">📍</span>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{t('marlnCrm.contact.address')}</p>
                          <p className="text-gray-600 dark:text-gray-300">123 Business District, Tech City, TC 12345</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-8 shadow-lg">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">{t('marlnCrm.contact.requestDemo')}</h3>
                    <form className="space-y-4">
                      <div>
                        <input
                          type="text"
                          placeholder={t('marlnCrm.contact.form.name')}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <input
                          type="email"
                          placeholder={t('marlnCrm.contact.form.email')}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder={t('marlnCrm.contact.form.institution')}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <textarea
                          placeholder={t('marlnCrm.contact.form.message')}
                          rows={4}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        ></textarea>
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                      >
                        <FiMail className="w-5 h-5" />
                        {t('marlnCrm.contact.form.submit')}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}