import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { directorFeatures } from '../../../components/directorFeatures';

export default function DirectorSettings() {
  const user = JSON.parse(localStorage.getItem('rbac_current_user'));
  const { t } = useTranslation('director');
  
  // Settings categories using translation keys
  const settingsCategories = [
    {
      nameKey: "categories.institutional",
      name: "institutional",
      options: [
        { labelKey: "institutionalSettings.name", valueKey: "institutionalSettings.nameValue" },
        { labelKey: "institutionalSettings.type", valueKey: "institutionalSettings.typeValue" },
        { labelKey: "institutionalSettings.accreditation", valueKey: "institutionalSettings.accreditationValue" },
        { labelKey: "institutionalSettings.academicYear", valueKey: "institutionalSettings.academicYearValue" },
      ],
    },
    {
      nameKey: "categories.academic",
      name: "academic",
      options: [
        { labelKey: "academicConfiguration.semesterSystem", valueKey: "academicConfiguration.semesterSystemValue" },
        { labelKey: "academicConfiguration.creditTransfer", valueKey: "academicConfiguration.creditTransferValue" },
        { labelKey: "academicConfiguration.attendancePolicy", valueKey: "academicConfiguration.attendancePolicyValue" },
      ],
    },
    {
      nameKey: "categories.access",
      name: "access",
      options: [
        { labelKey: "accessPermissions.director", valueKey: "accessPermissions.directorValue" },
        { labelKey: "accessPermissions.dean", valueKey: "accessPermissions.deanValue" },
        { labelKey: "accessPermissions.hod", valueKey: "accessPermissions.hodValue" },
        { labelKey: "accessPermissions.faculty", valueKey: "accessPermissions.facultyValue" },
      ],
    },
    {
      nameKey: "categories.notifications",
      name: "notifications",
      options: [
        { labelKey: "notifications.pushNotifications", valueKey: "notifications.pushNotificationsValue" },
        { labelKey: "notifications.emailAlerts", valueKey: "notifications.emailAlertsValue" },
        { labelKey: "notifications.smsAlerts", valueKey: "notifications.smsAlertsValue" },
      ],
    },
    {
      nameKey: "categories.dataPrivacy",
      name: "dataPrivacy",
      options: [
        { labelKey: "dataPrivacy.dataRetention", valueKey: "dataPrivacy.dataRetentionValue" },
        { labelKey: "dataPrivacy.encryption", valueKey: "dataPrivacy.encryptionValue" },
        { labelKey: "dataPrivacy.twoFactorAuth", valueKey: "dataPrivacy.twoFactorAuthValue" },
      ],
    },
  ];

  const [activeCategory, setActiveCategory] = useState(settingsCategories[0].name);

  return (
    <div className="flex min-h-screen bg-[#F6F7FA] dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800">
      <main className="flex-1 p-4 md:p-6 flex flex-col gap-8 overflow-x-auto">
        <div
          data-tour="1"
          data-tour-title-en="Settings Overview"
          data-tour-title-ar="نظرة عامة على الإعدادات"
          data-tour-content-en="Manage institutional, academic, access, notifications, and data privacy settings."
          data-tour-content-ar="أدر إعدادات المؤسسة والأكاديمية والوصول والإشعارات وخصوصية البيانات."
          data-tour-position="bottom"
        >
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            {t('settings.title')}
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            {t('settings.subtitle')}
          </p>
        </div>

        {/* Settings Categories */}
        <section className="mb-4"
          data-tour="2"
          data-tour-title-en="Categories"
          data-tour-title-ar="الفئات"
          data-tour-content-en="Switch between settings categories using these tabs."
          data-tour-content-ar="بدّل بين فئات الإعدادات باستخدام هذه الألسنة."
          data-tour-position="bottom"
        >
          <div className="flex flex-wrap gap-2 mb-2">
            {settingsCategories.map(cat => (
              <button 
                key={cat.name} 
                onClick={() => setActiveCategory(cat.name)} 
                className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                  activeCategory === cat.name 
                    ? "bg-blue-600 text-white" 
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
                }`}
              >
                {t(`settings.${cat.nameKey}`)}
              </button>
            ))}
          </div>
        </section>

        {/* Settings Options */}
        <section
          data-tour="3"
          data-tour-title-en="Options"
          data-tour-title-ar="الخيارات"
          data-tour-content-en="Review and adjust settings values within the selected category."
          data-tour-content-ar="راجع وعدّل قيم الإعدادات ضمن الفئة المحددة."
          data-tour-position="bottom"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow mb-4">
            {settingsCategories.find(cat => cat.name === activeCategory).options.map((opt, idx) => (
              <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                <span className="text-sm text-gray-900 dark:text-white font-medium">
                  {t(`settings.${opt.labelKey}`)}
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {t(`settings.${opt.valueKey}`)}
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
} 