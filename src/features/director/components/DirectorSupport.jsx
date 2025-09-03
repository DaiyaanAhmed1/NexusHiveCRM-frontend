import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { directorFeatures } from './directorFeatures';

export default function DirectorSupport() {
  const user = JSON.parse(localStorage.getItem('rbac_current_user'));
  const [expanded, setExpanded] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const { t, ready } = useTranslation('director');

  // Show loading state if i18n is not ready
  if (!ready) {
    return (
      <div className="flex min-h-screen bg-[#F6F7FA] dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800">
        <main className="flex-1 p-4 md:p-6 flex flex-col gap-8 overflow-x-auto">
          <div className="text-center">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Loading...</h1>
          </div>
        </main>
      </div>
    );
  }

  // FAQ data using translation keys
  const faqs = [
    { questionKey: "faqItems.passwordReset.question", answerKey: "faqItems.passwordReset.answer" },
    { questionKey: "faqItems.itSupport.question", answerKey: "faqItems.itSupport.answer" },
    { questionKey: "faqItems.complianceReports.question", answerKey: "faqItems.complianceReports.answer" },
  ];

  // Help topics using translation keys
  const helpTopics = [
    { titleKey: "topics.userManagement.title", descKey: "topics.userManagement.description" },
    { titleKey: "topics.dataSecurity.title", descKey: "topics.dataSecurity.description" },
    { titleKey: "topics.compliance.title", descKey: "topics.compliance.description" },
  ];

  return (
    <div className="flex min-h-screen bg-[#F6F7FA] dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800">
      <main className="flex-1 p-4 md:p-6 flex flex-col gap-8 overflow-x-auto">
        <div
          data-tour="1"
          data-tour-title-en="Help & Support Overview"
          data-tour-title-ar="نظرة عامة على المساعدة والدعم"
          data-tour-content-en="Browse help topics, check FAQs, and find contact details."
          data-tour-content-ar="تصفح مواضيع المساعدة، واطلع على الأسئلة الشائعة، واعثر على تفاصيل الاتصال."
          data-tour-position="bottom"
        >
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            {t('support.title')}
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            {t('support.subtitle')}
          </p>
        </div>

        {/* Help Topics */}
        <section className="mb-4"
          data-tour="2"
          data-tour-title-en="Help Topics"
          data-tour-title-ar="مواضيع المساعدة"
          data-tour-content-en="Quick guides on user management, data security, and compliance."
          data-tour-content-ar="أدلة سريعة حول إدارة المستخدمين، أمن البيانات، والامتثال."
          data-tour-position="bottom"
        >
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
            {t('support.helpTopics')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {helpTopics.map((topic, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow flex flex-col gap-1"
              >
                <div className="font-semibold text-xs mb-1">
                  {t(`support.${topic.titleKey}`)}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-300">
                  {t(`support.${topic.descKey}`)}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FAQs */}
        <section
          data-tour="3"
          data-tour-title-en="FAQs"
          data-tour-title-ar="الأسئلة الشائعة"
          data-tour-content-en="Toggle common questions to find quick answers."
          data-tour-content-ar="قم بفتح الأسئلة الشائعة للحصول على إجابات سريعة."
          data-tour-position="bottom"
        >
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
            {t('support.faqs')}
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow mb-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="mb-2"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full text-left font-semibold text-gray-900 dark:text-white py-2"
                >
                  {t(`support.${faq.questionKey}`)}
                </button>
                {activeFaq === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="text-sm text-gray-600 dark:text-gray-300 px-2 pb-2"
                  >
                    {t(`support.${faq.answerKey}`)}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact Support */}
        <section
          data-tour="4"
          data-tour-title-en="Contact Support"
          data-tour-title-ar="الاتصال بالدعم"
          data-tour-content-en="Reach support via email, phone, or live chat (coming soon)."
          data-tour-content-ar="تواصل مع الدعم عبر البريد الإلكتروني أو الهاتف أو الدردشة المباشرة (قريباً)."
          data-tour-position="bottom"
        >
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
            {t('support.contactSupport')}
          </h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow flex flex-col gap-2"
          >
            <div className="text-xs text-gray-600 dark:text-gray-300">
              {t('support.contact.email')}: <a href="mailto:support@univ.edu" className="text-blue-600 underline">support@univ.edu</a>
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-300">
              {t('support.contact.phone')}: <a href="tel:1234" className="text-blue-600 underline">1234</a>
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-300">
              {t('support.contact.liveChat')}: <span className="text-blue-600">{t('support.comingSoon')}</span>
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
} 