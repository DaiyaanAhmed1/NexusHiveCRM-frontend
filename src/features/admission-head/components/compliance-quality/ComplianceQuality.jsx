import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalization } from "../../../../hooks/useLocalization";
import { Tab } from '@headlessui/react';
import {
  ClipboardDocumentCheckIcon,
  DocumentTextIcon,
  ClipboardDocumentListIcon,
  ChartBarIcon,
  DocumentMagnifyingGlassIcon,
  ChatBubbleLeftRightIcon,
  ExclamationTriangleIcon,
  BellAlertIcon,
  DocumentArrowDownIcon
} from "@heroicons/react/24/outline";

// Import child components
import RegulatoryDashboard from './RegulatoryDashboard';
import DocumentCompliance from './DocumentCompliance';
import AuditTrail from './AuditTrail';
import InternalQualityAssessment from './InternalQualityAssessment';
import PolicyCompliance from './PolicyCompliance';
import FeedbackImprovement from './FeedbackImprovement';
import RiskManagement from './RiskManagement';
import NonComplianceAlerts from './NonComplianceAlerts';
import ReportsSubmissions from "./ReportsSubmissions";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const ComplianceQuality = () => {
  const { t } = useTranslation(['admission', 'common']);
  const { isRTL } = useLocalization();
  
  const tabs = [
    {
      name: t('complianceQuality.tabs.regulatoryDashboard.name'),
      icon: ClipboardDocumentCheckIcon,
      component: RegulatoryDashboard,
      description: t('complianceQuality.tabs.regulatoryDashboard.description'),
      tour: { step: 4, titleEn: 'Regulatory Dashboard', titleAr: 'لوحة الجهات التنظيمية', contentEn: 'Compliance status and regulators overview.', contentAr: 'حالة الامتثال ونظرة عامة على الجهات التنظيمية.' }
    },
    {
      name: t('complianceQuality.tabs.documentCompliance.name'),
      icon: DocumentTextIcon,
      component: DocumentCompliance,
      description: t('complianceQuality.tabs.documentCompliance.description'),
      tour: { step: 5, titleEn: 'Document Compliance', titleAr: 'امتثال المستندات', contentEn: 'Required docs status and exceptions.', contentAr: 'حالة المستندات المطلوبة والاستثناءات.' }
    },
    {
      name: t('complianceQuality.tabs.auditTrail.name'),
      icon: ClipboardDocumentListIcon,
      component: AuditTrail,
      description: t('complianceQuality.tabs.auditTrail.description'),
      tour: { step: 6, titleEn: 'Audit Trail', titleAr: 'سجل التدقيق', contentEn: 'Action history and export.', contentAr: 'سجل الإجراءات والتصدير.' }
    },
    {
      name: t('complianceQuality.tabs.qualityAssessment.name'),
      icon: ChartBarIcon,
      component: InternalQualityAssessment,
      description: t('complianceQuality.tabs.qualityAssessment.description'),
      tour: { step: 7, titleEn: 'Quality Assessment', titleAr: 'تقييم الجودة', contentEn: 'Internal assessment metrics.', contentAr: 'مؤشرات التقييم الداخلي.' }
    },
    {
      name: t('complianceQuality.tabs.policyCompliance.name'),
      icon: DocumentMagnifyingGlassIcon,
      component: PolicyCompliance,
      description: t('complianceQuality.tabs.policyCompliance.description'),
      tour: { step: 8, titleEn: 'Policy Compliance', titleAr: 'امتثال السياسات', contentEn: 'Policy checks and exceptions.', contentAr: 'فحوصات السياسات والاستثناءات.' }
    },
    {
      name: t('complianceQuality.tabs.feedbackImprovement.name'),
      icon: ChatBubbleLeftRightIcon,
      component: FeedbackImprovement,
      description: t('complianceQuality.tabs.feedbackImprovement.description'),
      tour: { step: 9, titleEn: 'Feedback & Improvement', titleAr: 'التغذية والتحسين', contentEn: 'Collect feedback and improvements.', contentAr: 'جمع التغذية والتحسينات.' }
    },
    {
      name: t('complianceQuality.tabs.riskManagement.name'),
      icon: ExclamationTriangleIcon,
      component: RiskManagement,
      description: t('complianceQuality.tabs.riskManagement.description'),
      tour: { step: 10, titleEn: 'Risk Management', titleAr: 'إدارة المخاطر', contentEn: 'Risks, mitigation, and owners.', contentAr: 'المخاطر والتخفيف والملاك.' }
    },
    {
      name: t('complianceQuality.tabs.nonComplianceAlerts.name'),
      icon: BellAlertIcon,
      component: NonComplianceAlerts,
      description: t('complianceQuality.tabs.nonComplianceAlerts.description'),
      tour: { step: 11, titleEn: 'Non-Compliance Alerts', titleAr: 'تنبيهات عدم الامتثال', contentEn: 'Urgent alerts and follow-ups.', contentAr: 'تنبيهات عاجلة والمتابعات.' }
    },
    {
      name: t('complianceQuality.tabs.reportsSubmissions.name'),
      icon: DocumentArrowDownIcon,
      component: ReportsSubmissions,
      description: t('complianceQuality.tabs.reportsSubmissions.description'),
      tour: { step: 12, titleEn: 'Reports & Submissions', titleAr: 'التقارير والتسليمات', contentEn: 'Generate and submit compliance reports.', contentAr: 'إنشاء وتقديم تقارير الامتثال.' }
    }
  ];

  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900" 
         data-tour="1" 
         data-tour-title-en="Compliance & Quality Overview" 
         data-tour-title-ar="نظرة عامة على الامتثال والجودة" 
         data-tour-content-en="Header, tabs, regulatory, document compliance, audit, quality, policies, feedback, risks, alerts, and reports." 
         data-tour-content-ar="الرأس، علامات التبويب، الجهات التنظيمية، امتثال المستندات، التدقيق، الجودة، السياسات، التغذية، المخاطر، التنبيهات والتقارير.">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8" 
             data-tour="2" 
             data-tour-title-en="Header" 
             data-tour-title-ar="الرأس" 
             data-tour-content-en="Module title and description." 
             data-tour-content-ar="عنوان الوحدة والوصف.">
          <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-8 text-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <ClipboardDocumentCheckIcon className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold">
                {t('complianceQuality.title')}
              </h1>
            </div>
            <p className="text-green-100 text-lg">
              {t('complianceQuality.subtitle')}
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
                 data-tour-content-en="Navigate through compliance sections." 
                 data-tour-content-ar="التنقل بين أقسام الامتثال.">
              <Tab.List className="flex flex-wrap gap-2 p-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-gray-100 dark:scrollbar-track-gray-700">
                {tabs.map((tab) => (
                  <Tab
                    key={tab.name}
                    className={({ selected }) =>
                      classNames(
                        'flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 whitespace-nowrap flex-shrink-0',
                        selected
                          ? 'bg-green-600 text-white shadow-lg transform scale-105'
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
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                        <tab.icon className="w-5 h-5 text-green-600 dark:text-green-400" />
                      </div>
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {tab.name}
                      </h2>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">
                      {tab.description}
                    </p>
                  </div>
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

export default ComplianceQuality;