import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useLocalization } from "../../../hooks/useLocalization";
import { directorFeatures } from '../../../components/directorFeatures';
import { 
  FiSettings, 
  FiHome, // Changed from FiBuilding to FiHome
  FiBookOpen, 
  FiShield, 
  FiBell, 
  FiLock, 
  FiEdit3, 
  FiSave, 
  FiRefreshCw, 
  FiCheck, 
  FiX, 
  FiInfo, 
  FiAlertCircle, 
  FiEye, 
  FiEyeOff, 
  FiDownload, 
  FiUpload, 
  FiTrash2, 
  FiPlus, 
  FiMinus,
  FiChevronRight,
  FiChevronDown,
  FiTarget,
  FiZap
} from "react-icons/fi";


export default function DirectorSettings() {
  const user = JSON.parse(localStorage.getItem('rbac_current_user'));
  const [activeCategory, setActiveCategory] = useState("institutional");
  const [expandedSections, setExpandedSections] = useState({});
  const [editingField, setEditingField] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);
  const { t } = useTranslation('director');
  const { isRTLMode } = useLocalization();
  
  // Settings categories using translation keys
  const settingsCategories = [
    {
      nameKey: "categories.institutional",
      name: "institutional",
      icon: FiHome, // Changed from FiBuilding to FiHome
      color: "blue",
      description: "Institutional information and basic configuration",
      options: [
        { 
          labelKey: "institutionalSettings.name", 
          valueKey: "institutionalSettings.nameValue",
          type: "text",
          editable: true,
          required: true
        },
        { 
          labelKey: "institutionalSettings.type", 
          valueKey: "institutionalSettings.typeValue",
          type: "select",
          editable: true,
          options: ["University", "College", "Institute", "Academy"]
        },
        { 
          labelKey: "institutionalSettings.accreditation", 
          valueKey: "institutionalSettings.accreditationValue",
          type: "text",
          editable: true
        },
        { 
          labelKey: "institutionalSettings.academicYear", 
          valueKey: "institutionalSettings.academicYearValue",
          type: "date",
          editable: true
        },
      ],
    },
    {
      nameKey: "categories.academic",
      name: "academic",
      icon: FiBookOpen,
      color: "green",
      description: "Academic policies and academic year configuration",
      options: [
        { 
          labelKey: "academicConfiguration.semesterSystem", 
          valueKey: "academicConfiguration.semesterSystemValue",
          type: "select",
          editable: true,
          options: ["Semester", "Trimester", "Quarter", "Annual"]
        },
        { 
          labelKey: "academicConfiguration.creditTransfer", 
          valueKey: "academicConfiguration.creditTransferValue",
          type: "toggle",
          editable: true
        },
        { 
          labelKey: "academicConfiguration.attendancePolicy", 
          valueKey: "academicConfiguration.attendancePolicyValue",
          type: "percentage",
          editable: true
        },
      ],
    },
    {
      nameKey: "categories.access",
      name: "access",
      icon: FiShield,
      color: "purple",
      description: "User access permissions and role management",
      options: [
        { 
          labelKey: "accessPermissions.director", 
          valueKey: "accessPermissions.directorValue",
          type: "permissions",
          editable: true
        },
        { 
          labelKey: "accessPermissions.dean", 
          valueKey: "accessPermissions.deanValue",
          type: "permissions",
          editable: true
        },
        { 
          labelKey: "accessPermissions.hod", 
          valueKey: "accessPermissions.hodValue",
          type: "permissions",
          editable: true
        },
        { 
          labelKey: "accessPermissions.faculty", 
          valueKey: "accessPermissions.facultyValue",
          type: "permissions",
          editable: true
        },
      ],
    },
    {
      nameKey: "categories.notifications",
      name: "notifications",
      icon: FiBell,
      color: "orange",
      description: "Notification preferences and alert settings",
      options: [
        { 
          labelKey: "notifications.pushNotifications", 
          valueKey: "notifications.pushNotificationsValue",
          type: "toggle",
          editable: true
        },
        { 
          labelKey: "notifications.emailAlerts", 
          valueKey: "notifications.emailAlertsValue",
          type: "toggle",
          editable: true
        },
        { 
          labelKey: "notifications.smsAlerts", 
          valueKey: "notifications.smsAlertsValue",
          type: "toggle",
          editable: true
        },
      ],
    },
    {
      nameKey: "categories.dataPrivacy",
      name: "dataPrivacy",
      icon: FiLock,
      color: "red",
      description: "Data protection and security settings",
      options: [
        { 
          labelKey: "dataPrivacy.dataRetention", 
          valueKey: "dataPrivacy.dataRetentionValue",
          type: "select",
          editable: true,
          options: ["1 Year", "3 Years", "5 Years", "10 Years", "Permanent"]
        },
        { 
          labelKey: "dataPrivacy.encryption", 
          valueKey: "dataPrivacy.encryptionValue",
          type: "toggle",
          editable: true
        },
        { 
          labelKey: "dataPrivacy.twoFactorAuth", 
          valueKey: "dataPrivacy.twoFactorAuthValue",
          type: "toggle",
          editable: true
        },
      ],
    },
  ];

  const getCategoryIcon = (category) => {
    const IconComponent = category.icon;
    return <IconComponent className="w-5 h-5" />;
  };

  const getCategoryColor = (color) => {
    switch(color) {
      case 'blue': return 'text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400';
      case 'green': return 'text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400';
      case 'purple': return 'text-purple-600 bg-purple-50 dark:bg-purple-900/20 dark:text-purple-400';
      case 'orange': return 'text-orange-600 bg-orange-50 dark:bg-orange-900/20 dark:text-orange-400';
      case 'red': return 'text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400';
      default: return 'text-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const toggleSection = (sectionName) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionName]: !prev[sectionName]
    }));
  };

  const handleEdit = (fieldKey) => {
    setEditingField(fieldKey);
    setHasChanges(true);
  };

  const handleSave = () => {
    setEditingField(null);
    setHasChanges(false);
    // Here you would typically save the changes to your backend
  };

  const handleCancel = () => {
    setEditingField(null);
    setHasChanges(false);
  };

  const renderFieldValue = (option) => {
    if (editingField === option.labelKey) {
      switch(option.type) {
        case 'text':
          return (
            <input 
              type="text" 
              defaultValue={t(`settings.${option.valueKey}`)}
              className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          );
        case 'select':
          return (
            <select 
              defaultValue={t(`settings.${option.valueKey}`)}
              className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {option.options?.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          );
        case 'toggle':
          return (
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked={t(`settings.${option.valueKey}`) === 'Enabled'} />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          );
        case 'percentage':
          return (
            <input 
              type="number" 
              min="0" 
              max="100" 
              defaultValue={t(`settings.${option.valueKey}`).replace('%', '')}
              className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent w-20"
            />
          );
        case 'date':
          return (
            <input 
              type="date" 
              defaultValue={t(`settings.${option.valueKey}`)}
              className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          );
        case 'permissions':
          return (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-300">Full Access</span>
              <button className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                <FiEdit3 className="w-4 h-4" />
              </button>
            </div>
          );
        default:
          return <span className="text-sm text-gray-600 dark:text-gray-300">{t(`settings.${option.valueKey}`)}</span>;
      }
    } else {
      switch(option.type) {
        case 'toggle':
          return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              t(`settings.${option.valueKey}`) === 'Enabled' 
                ? 'text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400' 
                : 'text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400'
            }`}>
              {t(`settings.${option.valueKey}`)}
            </span>
          );
        case 'permissions':
          return (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-300">Full Access</span>
              <button 
                onClick={() => handleEdit(option.labelKey)}
                className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <FiEdit3 className="w-4 h-4" />
              </button>
            </div>
          );
        default:
          return <span className="text-sm text-gray-600 dark:text-gray-300">{t(`settings.${option.valueKey}`)}</span>;
      }
    }
  };

  const currentCategory = settingsCategories.find(cat => cat.name === activeCategory);

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
          data-tour-title-en="Settings Overview"
          data-tour-title-ar="نظرة عامة على الإعدادات"
          data-tour-content-en="Manage institutional, academic, access, notifications, and data privacy settings."
          data-tour-content-ar="أدر إعدادات المؤسسة والأكاديمية والوصول والإشعارات وخصوصية البيانات."
          data-tour-position="bottom"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <FiSettings className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                {t('settings.title')}
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                {t('settings.subtitle')}
              </p>
            </div>
            <div className="flex items-center gap-3">
              {hasChanges && (
                <div className="flex items-center gap-2">
                  <button 
                    onClick={handleSave}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium transition-colors flex items-center gap-2"
                  >
                    <FiSave className="w-4 h-4" />
                    Save Changes
                  </button>
                  <button 
                    onClick={handleCancel}
                    className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-xl font-medium transition-colors flex items-center gap-2"
                  >
                    <FiX className="w-4 h-4" />
                    Cancel
                  </button>
                </div>
              )}
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors flex items-center gap-2">
                <FiDownload className="w-4 h-4" />
                Export Settings
              </button>
            </div>
          </div>
        </motion.div>

        {/* Settings Categories */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
          data-tour="2"
          data-tour-title-en="Categories"
          data-tour-title-ar="الفئات"
          data-tour-content-en="Switch between settings categories using these tabs."
          data-tour-content-ar="بدّل بين فئات الإعدادات باستخدام هذه الألسنة."
          data-tour-position="bottom"
        >
          <div className="flex items-center gap-3 mb-6">
            <FiTarget className="w-6 h-6 text-green-600 dark:text-green-400" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Settings Categories
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {settingsCategories.map(cat => (
              <button 
                key={cat.name} 
                onClick={() => setActiveCategory(cat.name)} 
                className={`p-4 rounded-xl border-2 transition-all ${
                  activeCategory === cat.name 
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" 
                    : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
                }`}
              >
                <div className="flex flex-col items-center text-center">
                  <div className={`p-3 rounded-xl mb-3 ${getCategoryColor(cat.color)}`}>
                    {getCategoryIcon(cat)}
                  </div>
                  <h3 className="font-semibold text-sm text-gray-900 dark:text-white mb-1">
                    {t(`settings.${cat.nameKey}`)}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {cat.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </motion.section>

        {/* Settings Options */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
          data-tour="3"
          data-tour-title-en="Options"
          data-tour-title-ar="الخيارات"
          data-tour-content-en="Review and adjust settings values within the selected category."
          data-tour-content-ar="راجع وعدّل قيم الإعدادات ضمن الفئة المحددة."
          data-tour-position="bottom"
        >
          <div className="flex items-center gap-3 mb-6">
            {getCategoryIcon(currentCategory)}
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {t(`settings.${currentCategory.nameKey}`)}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {currentCategory.description}
              </p>
            </div>
          </div>
          
          <div className="space-y-4">
            {currentCategory.options.map((opt, idx) => (
              <div key={idx} className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {t(`settings.${opt.labelKey}`)}
                      </h3>
                      {opt.required && (
                        <span className="text-red-500 text-sm">*</span>
                      )}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                      {opt.type === 'toggle' ? 'Enable or disable this feature' : 
                       opt.type === 'permissions' ? 'Manage user access permissions' :
                       opt.type === 'percentage' ? 'Set percentage value (0-100)' :
                       'Configure this setting'}
                    </div>
                    <div className="flex items-center gap-4">
                      {renderFieldValue(opt)}
                      {!editingField && opt.editable && (
                        <button 
                          onClick={() => handleEdit(opt.labelKey)}
                          className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                          <FiEdit3 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      </main>
    </div>
  );
}