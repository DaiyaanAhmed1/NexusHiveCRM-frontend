import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalization } from "../../../../hooks/useLocalization";
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
  const { isRTL } = useLocalization();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const tabs = [
    { name: t('courseManagement.tabs.courseCatalog'), icon: BookOpenIcon, component: CourseCatalog, tour: { step: 4, titleEn: 'Course Catalog', titleAr: 'فهرس الدورات', contentEn: 'Browse and manage courses.', contentAr: 'تصفح وأدر الدورات.' } },
    { name: t('courseManagement.tabs.addEditCourses'), icon: PlusCircleIcon, component: CourseForm, tour: { step: 5, titleEn: 'Add/Edit Courses', titleAr: 'إضافة/تعديل الدورات', contentEn: 'Create and edit course details.', contentAr: 'إنشاء وتعديل تفاصيل الدورة.' } },
    { name: t('courseManagement.tabs.visibilitySettings'), icon: EyeIcon, component: VisibilitySettings, tour: { step: 6, titleEn: 'Visibility Settings', titleAr: 'إعدادات الرؤية', contentEn: 'Control who can see courses.', contentAr: 'تحكم بمن يمكنه رؤية الدورات.' } },
    { name: t('courseManagement.tabs.seatMonitoring'), icon: UserGroupIcon, component: SeatMonitoring, tour: { step: 7, titleEn: 'Seat Monitoring', titleAr: 'مراقبة المقاعد', contentEn: 'Track availability and waitlists.', contentAr: 'تتبع التوافر وقوائم الانتظار.' } },
    { name: t('courseManagement.tabs.linkedApplications'), icon: LinkIcon, component: LinkedApplications, tour: { step: 8, titleEn: 'Linked Applications', titleAr: 'طلبات مرتبطة', contentEn: 'View applications linked to courses.', contentAr: 'عرض الطلبات المرتبطة بالدورات.' } },
    { name: t('courseManagement.tabs.feeMapping'), icon: CurrencyDollarIcon, component: FeeMapping, tour: { step: 9, titleEn: 'Fee Mapping', titleAr: 'تعيين الرسوم', contentEn: 'Map fees and discounts.', contentAr: 'تعيين الرسوم والخصومات.' } },
    { name: t('courseManagement.tabs.documentRequirements'), icon: DocumentTextIcon, component: DocumentRequirements, tour: { step: 10, titleEn: 'Document Requirements', titleAr: 'متطلبات الوثائق', contentEn: 'Set required documents per course.', contentAr: 'تحديد المستندات المطلوبة لكل دورة.' } },
    { name: t('courseManagement.tabs.academicMetrics'), icon: ChartBarIcon, component: AcademicMetrics, tour: { step: 11, titleEn: 'Academic Metrics', titleAr: 'المؤشرات الأكاديمية', contentEn: 'Analyze performance KPIs.', contentAr: 'تحليل مؤشرات الأداء.' } },
    { name: t('courseManagement.tabs.bulkActions'), icon: ArrowPathIcon, component: BulkActions, tour: { step: 12, titleEn: 'Bulk Actions', titleAr: 'إجراءات جماعية', contentEn: 'Apply actions across courses.', contentAr: 'تطبيق الإجراءات عبر الدورات.' } },
    { name: t('courseManagement.tabs.marketingReadiness'), icon: MegaphoneIcon, component: MarketingReadiness, tour: { step: 13, titleEn: 'Marketing Readiness', titleAr: 'جاهزية التسويق', contentEn: 'Checklist for go-live readiness.', contentAr: 'قائمة جاهزية للإطلاق.' } },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900" 
         data-tour="1" 
         data-tour-title-en="Course Management Overview" 
         data-tour-title-ar="نظرة عامة على إدارة الدورات" 
         data-tour-content-en="Header, tabs, catalog, forms, visibility, seats, applications, fees, docs, metrics, bulk actions, and readiness." 
         data-tour-content-ar="الرأس، علامات التبويب، الفهرس، النماذج، الرؤية، المقاعد، الطلبات، الرسوم، الوثائق، المؤشرات، الإجراءات والجاهزية.">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8" 
             data-tour="2" 
             data-tour-title-en="Header" 
             data-tour-title-ar="الرأس" 
             data-tour-content-en="Module title and description." 
             data-tour-content-ar="عنوان الوحدة والوصف.">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <BookOpenIcon className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold">
                {t('courseManagement.title')}
              </h1>
            </div>
            <p className="text-blue-100 text-lg">
              {t('courseManagement.subtitle')}
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
            {/* Tab Navigation */}
            <div className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50" 
                 data-tour="3" 
                 data-tour-title-en="Tabs" 
                 data-tour-title-ar="علامات التبويب" 
                 data-tour-content-en="Navigate through course management sections." 
                 data-tour-content-ar="التنقل بين أقسام إدارة الدورات.">
              <Tab.List className="flex space-x-1 p-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-gray-100 dark:scrollbar-track-gray-700">
                {tabs.map((tab) => (
                  <Tab
                    key={tab.name}
                    className={({ selected }) =>
                      classNames(
                        'flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 whitespace-nowrap flex-shrink-0',
                        selected
                          ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-white'
                      )
                    }
                  >
                    <tab.icon className="h-5 w-5" />
                    <span>{tab.name}</span>
                  </Tab>
                ))}
              </Tab.List>
            </div>
            
            {/* Tab Content */}
            <Tab.Panels className="p-6">
              {tabs.map((tab) => (
                <Tab.Panel
                  key={tab.name}
                  className="focus:outline-none"
                  data-tour={tab.tour.step}
                  data-tour-title-en={tab.tour.titleEn}
                  data-tour-title-ar={tab.tour.titleAr}
                  data-tour-content-en={tab.tour.contentEn}
                  data-tour-content-ar={tab.tour.contentAr}
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