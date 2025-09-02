import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Tab } from '@headlessui/react';
import { 
  BookOpenIcon, 
  PlusCircleIcon, 
  EyeIcon, 
  UserGroupIcon, 
  LinkIcon, 
  CurrencyDollarIcon, 
  DocumentTextIcon, 
  ChartBarIcon, 
  ArrowPathIcon, 
  MegaphoneIcon 
} from '@heroicons/react/24/outline';

// Import child components (we'll create these next)
import CourseCatalog from './CourseCatalog';
import CourseForm from './CourseForm';
import VisibilitySettings from './VisibilitySettings';
import SeatMonitoring from './SeatMonitoring';
import LinkedApplications from './LinkedApplications';
import FeeMapping from './FeeMapping';
import DocumentRequirements from './DocumentRequirements';
import AcademicMetrics from './AcademicMetrics';
import BulkActions from './BulkActions';
import MarketingReadiness from './MarketingReadiness';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const CourseManagement = () => {
  const { t } = useTranslation(['admission', 'common']);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const tabs = [
    { name: t('courseManagement.tabs.courseCatalog'), icon: BookOpenIcon, component: CourseCatalog },
    { name: t('courseManagement.tabs.addEditCourses'), icon: PlusCircleIcon, component: CourseForm },
    { name: t('courseManagement.tabs.visibilitySettings'), icon: EyeIcon, component: VisibilitySettings },
    { name: t('courseManagement.tabs.seatMonitoring'), icon: UserGroupIcon, component: SeatMonitoring },
    { name: t('courseManagement.tabs.linkedApplications'), icon: LinkIcon, component: LinkedApplications },
    { name: t('courseManagement.tabs.feeMapping'), icon: CurrencyDollarIcon, component: FeeMapping },
    { name: t('courseManagement.tabs.documentRequirements'), icon: DocumentTextIcon, component: DocumentRequirements },
    { name: t('courseManagement.tabs.academicMetrics'), icon: ChartBarIcon, component: AcademicMetrics },
    { name: t('courseManagement.tabs.bulkActions'), icon: ArrowPathIcon, component: BulkActions },
    { name: t('courseManagement.tabs.marketingReadiness'), icon: MegaphoneIcon, component: MarketingReadiness },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t('courseManagement.title')}
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {t('courseManagement.subtitle')}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
            <Tab.List className="flex space-x-1 border-b border-gray-200 dark:border-gray-700 p-4">
              {tabs.map((tab) => (
                <Tab
                  key={tab.name}
                  className={({ selected }) =>
                    classNames(
                      'flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200',
                      selected
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                        : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'
                    )
                  }
                >
                  <tab.icon className="h-5 w-5" />
                  <span>{tab.name}</span>
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="p-4">
              {tabs.map((tab) => (
                <Tab.Panel
                  key={tab.name}
                  className="focus:outline-none"
                >
                  <tab.component />
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </div>
  );
};

export default CourseManagement; 