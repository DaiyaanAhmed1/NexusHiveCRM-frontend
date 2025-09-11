import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { useLocalization } from "../../../hooks/useLocalization";
import { 
  FiTarget, 
  FiTrendingUp, 
  FiZap, 
  FiDollarSign, 
  FiBarChart2,
  FiBookOpen,
  FiShield,
  FiSettings,
  FiCalendar,
  FiUsers,
  FiClock,
  FiCheckCircle,
  FiStar,
  FiPieChart,
  FiPlus,
  FiEye,
  FiFileText,
  FiFolder,
  FiAlertTriangle,
  FiArrowRight,
  FiAward,
  FiLayers
} from 'react-icons/fi';

export default function MarketingHeadWorkspace() {
  const { t, ready, i18n } = useTranslation('marketing');
  const [languageVersion, setLanguageVersion] = useState(0);
  const { isRTLMode } = useLocalization();
  
  // Force re-render when language changes
  useEffect(() => {
    setLanguageVersion(prev => prev + 1);
  }, [i18n.language]);

  const user = JSON.parse(localStorage.getItem('rbac_current_user'));
  const [expanded, setExpanded] = useState(false);

  // Show loading state while translations are loading
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

  return (
    <div 
      key={`${i18n.language}-${languageVersion}`}
      className={`flex min-h-screen bg-[#F6F7FA] dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 ${isRTLMode ? 'rtl' : 'ltr'}`}
      data-tour="1"
      data-tour-title-en="Workspace Overview"
      data-tour-title-ar="نظرة عامة على مساحة العمل"
      data-tour-content-en="Quick access to training, compliance, assets, tasks, events, and analytics."
      data-tour-content-ar="وصول سريع إلى التدريب والامتثال والأصول والمهام والفعاليات والتحليلات."
      data-tour-position="bottom"
    >
      <main className="flex-1 p-4 md:p-6 flex flex-col gap-8 overflow-x-auto">
        <header
          className={`flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 ${isRTLMode ? 'flex-row-reverse' : ''}`}
        >
          <div className={`flex-1 min-w-0 ${isRTLMode ? 'text-right' : 'text-left'}`}>
            <h1 className="text-2xl font-bold !text-gray-900 dark:!text-white">
              {t('workspace.title')}
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              {t('workspace.subtitle')}
            </p>
          </div>
          
          {/* Quick Actions */}
          <div className={`flex-shrink-0 w-full lg:w-auto ${isRTLMode ? 'text-right' : 'text-left'}`}>
            <div className={`grid grid-cols-1 sm:grid-cols-3 gap-2 lg:flex lg:gap-3 ${isRTLMode ? 'lg:flex-row-reverse' : ''}`}>
              <button 
                className={`px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-colors whitespace-nowrap ${isRTLMode ? 'flex-row-reverse' : ''}`}
              >
                <FiPlus className="w-4 h-4 flex-shrink-0" /> 
                <span className="hidden sm:inline">New Campaign</span>
                <span className="sm:hidden">New</span>
              </button>
              
              <button 
                className={`px-3 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 transition-colors whitespace-nowrap ${isRTLMode ? 'flex-row-reverse' : ''}`}
              >
                <FiBarChart2 className="w-4 h-4 flex-shrink-0" /> 
                <span className="hidden sm:inline">View Analytics</span>
                <span className="sm:hidden">Analytics</span>
              </button>
              
              <button 
                className={`px-3 py-2 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center gap-2 transition-colors whitespace-nowrap ${isRTLMode ? 'flex-row-reverse' : ''}`}
              >
                <FiSettings className="w-4 h-4 flex-shrink-0" /> 
                <span className="hidden sm:inline">Settings</span>
                <span className="sm:hidden">Settings</span>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Training & Development */}
            <section
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
              data-tour="2"
              data-tour-title-en="Training & Knowledge"
              data-tour-title-ar="التدريب والمعرفة"
              data-tour-content-en="See team training status and access the knowledge base."
              data-tour-content-ar="اطّلع على حالة تدريب الفريق وادخل إلى قاعدة المعرفة."
              data-tour-position="bottom"
            >
              <div className={`flex items-center gap-3 mb-6 ${isRTLMode ? 'flex-row-reverse' : ''}`}>
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <FiBookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {t('workspace.sections.trainingDevelopment')}
                </h2>
              </div>
              
              <div className="space-y-4">
                {/* Marketing Training */}
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <FiAward className="w-4 h-4 text-blue-600" />
                    {t('workspace.trainingDevelopment.title')}
                  </h3>
                  <div className="space-y-2">
                    {[
                      { text: t('workspace.trainingDevelopment.digitalMarketingBootcamp'), status: 'inProgress' },
                      { text: t('workspace.trainingDevelopment.brandManagementWorkshop'), status: 'completed' },
                      { text: t('workspace.trainingDevelopment.contentStrategySeminar'), status: 'pending' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between py-2">
                        <span className="text-sm text-gray-700 dark:text-gray-300">{item.text}</span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          item.status === 'inProgress' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                          item.status === 'completed' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                          'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                        }`}>
                          {t(`workspace.assetCampaignManagement.status.${item.status}`)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Knowledge Base */}
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <FiFileText className="w-4 h-4 text-green-600" />
                    {t('workspace.trainingDevelopment.knowledgeBase.title')}
                  </h3>
                  <div className="space-y-2">
                    {[
                      t('workspace.trainingDevelopment.knowledgeBase.launchCampaign'),
                      t('workspace.trainingDevelopment.knowledgeBase.socialMediaBestPractices'),
                      t('workspace.trainingDevelopment.knowledgeBase.complianceChecklist')
                    ].map((item, index) => (
                      <a key={index} href="#" className="block py-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline flex items-center gap-2">
                        <FiArrowRight className="w-3 h-3" />
                        {item}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Compliance & Quality */}
            <section
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
              data-tour="3"
              data-tour-title-en="Compliance & Risk"
              data-tour-title-ar="الامتثال والمخاطر"
              data-tour-content-en="Run ad content reviews, brand checks, and privacy audits."
              data-tour-content-ar="أجرِ مراجعات محتوى الإعلانات وفحوصات العلامة التجارية وتدقيقات الخصوصية."
              data-tour-position="bottom"
            >
              <div className={`flex items-center gap-3 mb-6 ${isRTLMode ? 'flex-row-reverse' : ''}`}>
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <FiShield className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {t('workspace.sections.complianceQuality')}
                </h2>
              </div>
              
              <div className="space-y-4">
                {/* Campaign Compliance */}
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <FiCheckCircle className="w-4 h-4 text-green-600" />
                    {t('workspace.complianceQuality.campaignCompliance.title')}
                  </h3>
                  <div className="space-y-2">
                    {[
                      { text: t('workspace.complianceQuality.campaignCompliance.adContentReview'), action: t('workspace.complianceQuality.actions.review') },
                      { text: t('workspace.complianceQuality.campaignCompliance.brandGuidelineAdherence'), action: t('workspace.complianceQuality.actions.check') },
                      { text: t('workspace.complianceQuality.campaignCompliance.gdprPrivacyCompliance'), action: t('workspace.complianceQuality.actions.audit') }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between py-2">
                        <span className="text-sm text-gray-700 dark:text-gray-300">{item.text}</span>
                        <button className="px-3 py-1 bg-blue-600 text-white rounded text-xs font-medium hover:bg-blue-700 transition-colors">
                          {item.action}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Risk Management */}
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <FiAlertTriangle className="w-4 h-4 text-red-600" />
                    {t('workspace.complianceQuality.riskManagement.title')}
                  </h3>
                  <div className="space-y-2">
                    {[
                      { text: t('workspace.complianceQuality.riskManagement.negativeCampaignFeedback'), status: 'high' },
                      { text: t('workspace.complianceQuality.riskManagement.missedCampaignDeadlines'), status: 'medium' },
                      { text: t('workspace.complianceQuality.riskManagement.budgetOverrunAlert'), status: 'alert' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between py-2">
                        <span className="text-sm text-gray-700 dark:text-gray-300">{item.text}</span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          item.status === 'high' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                          item.status === 'medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                          'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
                        }`}>
                          {t(`workspace.complianceQuality.riskLevels.${item.status}`)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Asset & Campaign Management */}
            <section
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
              data-tour="4"
              data-tour-title-en="Assets, Tasks & Events"
              data-tour-title-ar="الأصول والمهام والفعاليات"
              data-tour-content-en="Access campaign assets, tasks, events, and performance analytics."
              data-tour-content-ar="وصول إلى أصول الحملات والمهام والفعاليات وتحليلات الأداء."
              data-tour-position="bottom"
            >
              <div className={`flex items-center gap-3 mb-6 ${isRTLMode ? 'flex-row-reverse' : ''}`}>
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <FiFolder className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {t('workspace.sections.assetCampaignManagement')}
                </h2>
              </div>
              
              <div className="grid grid-cols-1 gap-3">
                {[
                  { 
                    title: t('workspace.assetCampaignManagement.myCampaigns.title'), 
                    icon: FiTrendingUp, 
                    items: [
                      { text: t('workspace.assetCampaignManagement.myCampaigns.q2MarketingStrategy'), status: 'active' },
                      { text: t('workspace.assetCampaignManagement.myCampaigns.summerCampaign'), status: 'planning' },
                      { text: t('workspace.assetCampaignManagement.myCampaigns.brandAwarenessDrive'), status: 'completed' }
                    ]
                  },
                  { 
                    title: t('workspace.assetCampaignManagement.assetLibrary.title'), 
                    icon: FiFileText, 
                    items: [
                      { text: t('workspace.assetCampaignManagement.assetLibrary.summerCampaignAssets') },
                      { text: t('workspace.assetCampaignManagement.assetLibrary.brandGuidelines') },
                      { text: t('workspace.assetCampaignManagement.assetLibrary.socialMediaTemplates') }
                    ]
                  },
                  { 
                    title: t('workspace.assetCampaignManagement.taskBox.title'), 
                    icon: FiClock, 
                    items: [
                      { text: t('workspace.assetCampaignManagement.taskBox.submitCampaignReport') },
                      { text: t('workspace.assetCampaignManagement.taskBox.reviewAdCreatives') },
                      { text: t('workspace.assetCampaignManagement.taskBox.approveInfluencerContracts') }
                    ]
                  },
                  { 
                    title: t('workspace.assetCampaignManagement.events.title'), 
                    icon: FiCalendar, 
                    items: [
                      { text: t('workspace.assetCampaignManagement.events.annualMarketingSummit') },
                      { text: t('workspace.assetCampaignManagement.events.internalTrainingSchedule') }
                    ]
                  },
                  { 
                    title: t('workspace.assetCampaignManagement.analytics.title'), 
                    icon: FiBarChart2, 
                    items: [
                      { text: t('workspace.assetCampaignManagement.analytics.campaignPerformanceDashboard') },
                      { text: t('workspace.assetCampaignManagement.analytics.leadGenerationTrends') },
                      { text: t('workspace.assetCampaignManagement.analytics.roiAnalysis') }
                    ]
                  }
                ].map((section, index) => (
                  <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className={`flex items-center gap-2 mb-3 ${isRTLMode ? 'flex-row-reverse' : ''}`}>
                      <section.icon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      <h3 className="font-medium text-gray-900 dark:text-white text-sm">
                        {section.title}
                      </h3>
                    </div>
                    <div className="space-y-1">
                      {section.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-center justify-between py-1">
                          <span className="text-sm text-gray-600 dark:text-gray-400">{item.text}</span>
                          {item.status && (
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              item.status === 'active' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                              item.status === 'planning' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                              item.status === 'completed' ? 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300' :
                              'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                            }`}>
                              {t(`workspace.assetCampaignManagement.status.${item.status}`)}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}