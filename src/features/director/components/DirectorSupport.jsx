import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useLocalization } from "../../../hooks/useLocalization";
import { directorFeatures } from '../../../components/directorFeatures';
import { 
  FiHelpCircle, 
  FiMessageCircle, 
  FiMail, 
  FiPhone, 
  FiMessageSquare, 
  FiBookOpen, 
  FiShield, 
  FiCheckCircle, 
  FiChevronDown, 
  FiChevronUp, 
  FiSearch, 
  FiFilter, 
  FiDownload, 
  FiExternalLink, 
  FiClock, 
  FiUser, 
  FiSettings, 
  FiTarget, 
  FiZap,
  FiAlertCircle,
  FiInfo,
  FiFileText,
  FiVideo,
  FiHeadphones
} from "react-icons/fi";

export default function DirectorSupport() {
  const user = JSON.parse(localStorage.getItem('rbac_current_user'));
  const [expanded, setExpanded] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { t, ready } = useTranslation('director');
  const { isRTLMode } = useLocalization();

  // Show loading state if i18n is not ready
  if (!ready) {
    return (
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
        <main className="flex-1 p-6 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Loading...</h1>
          </div>
        </main>
      </div>
    );
  }

  // FAQ data using translation keys
  const faqs = [
    { 
      questionKey: "faqItems.passwordReset.question", 
      answerKey: "faqItems.passwordReset.answer",
      category: "account",
      priority: "high",
      icon: FiUser
    },
    { 
      questionKey: "faqItems.itSupport.question", 
      answerKey: "faqItems.itSupport.answer",
      category: "technical",
      priority: "medium",
      icon: FiSettings
    },
    { 
      questionKey: "faqItems.complianceReports.question", 
      answerKey: "faqItems.complianceReports.answer",
      category: "compliance",
      priority: "high",
      icon: FiShield
    },
    { 
      questionKey: "faqItems.dataExport.question", 
      answerKey: "faqItems.dataExport.answer",
      category: "data",
      priority: "medium",
      icon: FiDownload
    },
    { 
      questionKey: "faqItems.userPermissions.question", 
      answerKey: "faqItems.userPermissions.answer",
      category: "account",
      priority: "low",
      icon: FiUser
    },
  ];

  // Help topics using translation keys
  const helpTopics = [
    { 
      titleKey: "topics.userManagement.title", 
      descKey: "topics.userManagement.description",
      icon: FiUser,
      color: "blue",
      articles: 12
    },
    { 
      titleKey: "topics.dataSecurity.title", 
      descKey: "topics.dataSecurity.description",
      icon: FiShield,
      color: "green",
      articles: 8
    },
    { 
      titleKey: "topics.compliance.title", 
      descKey: "topics.compliance.description",
      icon: FiCheckCircle,
      color: "purple",
      articles: 15
    },
    { 
      titleKey: "topics.systemSettings.title", 
      descKey: "topics.systemSettings.description",
      icon: FiSettings,
      color: "orange",
      articles: 6
    },
  ];


  const supportChannels = [
    {
      type: "email",
      icon: FiMail,
      titleKey: "contact.email", // ← Removed "support." prefix
      value: "support@univ.edu",
      responseTime: "2-4 hours",
      color: "blue"
    },
    {
      type: "phone",
      icon: FiPhone,
      titleKey: "contact.phone", // ← Removed "support." prefix
      value: "+1 (555) 123-4567",
      responseTime: "Immediate",
      color: "green"
    },
    {
      type: "liveChat",
      icon: FiMessageSquare,
      titleKey: "contact.liveChat", // ← Removed "support." prefix
      value: "Coming Soon",
      responseTime: "Real-time",
      color: "purple",
      disabled: true
    },
  ];

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400';
      case 'medium': return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'low': return 'text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400';
      default: return 'text-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const getCategoryColor = (color) => {
    switch(color) {
      case 'blue': return 'text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400';
      case 'green': return 'text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400';
      case 'purple': return 'text-purple-600 bg-purple-50 dark:bg-purple-900/20 dark:text-purple-400';
      case 'orange': return 'text-orange-600 bg-orange-50 dark:bg-orange-900/20 dark:text-orange-400';
      default: return 'text-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = searchQuery === "" || 
      t(`support.${faq.questionKey}`).toLowerCase().includes(searchQuery.toLowerCase()) ||
      t(`support.${faq.answerKey}`).toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-full">
      <main className="w-full space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
          data-tour="1"
          data-tour-title-en="Help & Support Overview"
          data-tour-title-ar="نظرة عامة على المساعدة والدعم"
          data-tour-content-en="Browse help topics, check FAQs, and find contact details."
          data-tour-content-ar="تصفح مواضيع المساعدة، واطلع على الأسئلة الشائعة، واعثر على تفاصيل الاتصال."
          data-tour-position="bottom"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <FiHelpCircle className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                {t('support.title')}
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                {t('support.subtitle')}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm text-gray-500 dark:text-gray-400">Help Articles</div>
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">41</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500 dark:text-gray-400">FAQs</div>
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">5</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Search and Filters */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
        >
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative flex-1 min-w-64">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input 
                value={searchQuery} 
                onChange={e => setSearchQuery(e.target.value)} 
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                placeholder={t('support.searchPlaceholder')} 
              />
            </div>
            <select 
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="all">{t('support.allCategories')}</option>
              <option value="account">{t('support.categories.account')}</option>
              <option value="technical">{t('support.categories.technical')}</option>
              <option value="compliance">{t('support.categories.compliance')}</option>
              <option value="data">{t('support.categories.data')}</option>
            </select>
            <button className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors flex items-center gap-2">
              <FiDownload className="w-4 h-4" />
              {t('support.downloadGuide')}
            </button>
          </div>
        </motion.section>

        {/* Help Topics */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
          data-tour="2"
          data-tour-title-en="Help Topics"
          data-tour-title-ar="مواضيع المساعدة"
          data-tour-content-en="Quick guides on user management, data security, and compliance."
          data-tour-content-ar="أدلة سريعة حول إدارة المستخدمين، أمن البيانات، والامتثال."
          data-tour-position="bottom"
        >
          <div className="flex items-center gap-3 mb-6">
            <FiBookOpen className="w-6 h-6 text-green-600 dark:text-green-400" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {t('support.helpTopics')}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {helpTopics.map((topic, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 border border-gray-200 dark:border-gray-600 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-3 rounded-xl ${getCategoryColor(topic.color)}`}>
                    <topic.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {t(`support.${topic.titleKey}`)}
                    </h3>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {topic.articles} articles
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  {t(`support.${topic.descKey}`)}
                </p>
                <button className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium flex items-center gap-1">
                  {t('support.viewArticles')}
                  <FiExternalLink className="w-3 h-3" />
                </button>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* FAQs */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
          data-tour="3"
          data-tour-title-en="FAQs"
          data-tour-title-ar="الأسئلة الشائعة"
          data-tour-content-en="Toggle common questions to find quick answers."
          data-tour-content-ar="قم بفتح الأسئلة الشائعة للحصول على إجابات سريعة."
          data-tour-position="bottom"
        >
          <div className="flex items-center gap-3 mb-6">
            <FiMessageCircle className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {t('support.faqs')} ({filteredFaqs.length})
            </h2>
          </div>
          
          <div className="space-y-4">
            {filteredFaqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 overflow-hidden"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full text-left p-6 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className={`p-2 rounded-lg ${getCategoryColor('blue')}`}>
                        <faq.icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white text-left">
                          {t(`support.${faq.questionKey}`)}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(faq.priority)}`}>
                            {faq.priority} priority
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {faq.category}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="ml-4">
                      {activeFaq === i ? (
                        <FiChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <FiChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </div>
                </button>
                {activeFaq === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-6 pb-6"
                  >
                    <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                        {t(`support.${faq.answerKey}`)}
                      </p>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Contact Support */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
          data-tour="4"
          data-tour-title-en="Contact Support"
          data-tour-title-ar="الاتصال بالدعم"
          data-tour-content-en="Reach support via email, phone, or live chat (coming soon)."
          data-tour-content-ar="تواصل مع الدعم عبر البريد الإلكتروني أو الهاتف أو الدردشة المباشرة (قريباً)."
          data-tour-position="bottom"
        >
          <div className="flex items-center gap-3 mb-6">
            <FiHeadphones className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {t('support.contactSupport')}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {supportChannels.map((channel, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`bg-gray-50 dark:bg-gray-700 rounded-xl p-6 border border-gray-200 dark:border-gray-600 hover:shadow-md transition-shadow ${
                  channel.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                }`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className={`p-3 rounded-xl ${getCategoryColor(channel.color)}`}>
                    <channel.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {t(`support.${channel.titleKey}`)}
                    </h3>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Response: {channel.responseTime}
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  {channel.disabled ? (
                    <span className="text-gray-500 dark:text-gray-400">{channel.value}</span>
                  ) : (
                    <a 
                      href={channel.type === 'email' ? `mailto:${channel.value}` : 
                            channel.type === 'phone' ? `tel:${channel.value}` : '#'}
                      className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:underline"
                    >
                      {channel.value}
                    </a>
                  )}
                </div>
                {!channel.disabled && (
                  <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors text-sm">
                    {t('support.contactNow')}
                  </button>
                )}
              </motion.div>
            ))}
          </div>
        </motion.section>
      </main>
    </div>
  );
}