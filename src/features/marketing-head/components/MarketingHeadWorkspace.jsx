import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';

export default function MarketingHeadWorkspace() {
  const { t, ready, i18n } = useTranslation('marketing');
  const [languageVersion, setLanguageVersion] = useState(0);
  
  // Force re-render when language changes
  useEffect(() => {
    setLanguageVersion(prev => prev + 1);
  }, [i18n.language]);

  const user = JSON.parse(localStorage.getItem('rbac_current_user'));
  const [expanded, setExpanded] = useState(false);

  // Show loading state while translations are loading
  if (!ready) {
    return <div className="flex items_center justify_center min_h_screen">{t('support.messages.loading')}</div>;
  }

  return (
    <div
      key={`${i18n.language}-${languageVersion}`}
      className="flex-1 p-4 md:p-6 flex flex-col gap-8 overflow-x-auto"
      data-tour="1"
      data-tour-title-en="Workspace Overview"
      data-tour-title-ar="نظرة عامة على مساحة العمل"
      data-tour-content-en="Quick access to training, compliance, assets, tasks, events, and analytics."
      data-tour-content-ar="وصول سريع إلى التدريب والامتثال والأصول والمهام والفعاليات والتحليلات."
      data-tour-position="bottom"
    >
      <header>
        <h1 className="text-2xl font-bold !text-gray-900 dark:!text-white">{t('workspace.title')}</h1>
        <p className="text-gray-600 dark:text-gray-300">{t('workspace.subtitle')}</p>
      </header>

      {/* Training & Development */}
      <section
        data-tour="2"
        data-tour-title-en="Training & Knowledge"
        data-tour-title-ar="التدريب والمعرفة"
        data-tour-content-en="See team training status and access the knowledge base."
        data-tour-content-ar="اطّلع على حالة تدريب الفريق وادخل إلى قاعدة المعرفة."
        data-tour-position="bottom"
      >
        <h2 className="text-xl font-semibold !text-gray-900 dark:!text-white mb-4">{t('workspace.sections.trainingDevelopment')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Marketing Training Card */}
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow">
            <h3 className="font-bold text-lg text-blue-700 dark:text-blue-300 mb-2">{t('workspace.trainingDevelopment.title')}</h3>
            <ul className="space-y-2 text-gray-900 dark:text-gray-200">
              <li>{t('workspace.trainingDevelopment.digitalMarketingBootcamp')} <span className="ml-2 text-xs bg-green-700 text-white px-2 py-1 rounded">{t('workspace.assetCampaignManagement.status.inProgress')}</span></li>
              <li>{t('workspace.trainingDevelopment.brandManagementWorkshop')} <span className="ml-2 text-xs bg-blue-700 text-white px-2 py-1 rounded">{t('workspace.assetCampaignManagement.status.completed')}</span></li>
              <li>{t('workspace.trainingDevelopment.contentStrategySeminar')} <span className="ml-2 text-xs bg-yellow-700 text_white px-2 py-1 rounded">{t('workspace.assetCampaignManagement.status.pending')}</span></li>
            </ul>
          </div>
          {/* Knowledge Base Card */}
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow">
            <h3 className="font-bold text-lg text-blue-700 dark:text-blue-300 mb-2">{t('workspace.trainingDevelopment.knowledgeBase.title')}</h3>
            <ul className="space-y-2 text-gray-900 dark:text-gray-200">
              <li><a href="#" className="underline">{t('workspace.trainingDevelopment.knowledgeBase.launchCampaign')}</a></li>
              <li><a href="#" className="underline">{t('workspace.trainingDevelopment.knowledgeBase.socialMediaBestPractices')}</a></li>
              <li><a href="#" className="underline">{t('workspace.trainingDevelopment.knowledgeBase.complianceChecklist')}</a></li>
            </ul>
          </div>
        </div>
      </section>

      {/* Compliance & Quality */}
      <section
        data-tour="3"
        data-tour-title-en="Compliance & Risk"
        data-tour-title-ar="الامتثال والمخاطر"
        data-tour-content-en="Run ad content reviews, brand checks, and privacy audits."
        data-tour-content-ar="أجرِ مراجعات محتوى الإعلانات وفحوصات العلامة التجارية وتدقيقات الخصوصية."
        data-tour-position="bottom"
      >
        <h2 className="text-xl font-semibold !text-gray-900 dark:!text-white mb-4">{t('workspace.sections.complianceQuality')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Campaign Compliance Card */}
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow">
            <h3 className="font-bold text-lg text-green-700 dark:text-green-300 mb-2">{t('workspace.complianceQuality.campaignCompliance.title')}</h3>
            <ul className="space-y-2 text-gray-900 dark:text-gray-200">
              <li>{t('workspace.complianceQuality.campaignCompliance.adContentReview')} <button className="ml-2 text-xs bg-blue-700 text-white px-2 py-1 rounded">{t('workspace.complianceQuality.actions.review')}</button></li>
              <li>{t('workspace.complianceQuality.campaignCompliance.brandGuidelineAdherence')} <button className="ml-2 text-xs bg-blue-700 text-white px-2 py-1 rounded">{t('workspace.complianceQuality.actions.check')}</button></li>
              <li>{t('workspace.complianceQuality.campaignCompliance.gdprPrivacyCompliance')} <button className="ml-2 text-xs bg-blue-700 text-white px-2 py-1 rounded">{t('workspace.complianceQuality.actions.audit')}</button></li>
            </ul>
          </div>
          {/* Risk Management Card */}
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow">
            <h3 className="font-bold text-lg text-red-700 dark:text-red-300 mb-2">{t('workspace.complianceQuality.riskManagement.title')}</h3>
            <ul className="space-y-2 text-gray-900 dark:text-gray-200">
              <li>{t('workspace.complianceQuality.riskManagement.negativeCampaignFeedback')} <span className="ml-2 text-xs bg-red-700 text-white px-2 py-1 rounded">{t('workspace.complianceQuality.riskLevels.high')}</span></li>
              <li>{t('workspace.complianceQuality.riskManagement.missedCampaignDeadlines')} <span className="ml-2 text-xs bg-yellow-700 text-white px-2 py-1 rounded">{t('workspace.complianceQuality.riskLevels.medium')}</span></li>
              <li>{t('workspace.complianceQuality.riskManagement.budgetOverrunAlert')} <span className="ml-2 text-xs bg-orange-700 text-white px-2 py-1 rounded">{t('workspace.complianceQuality.riskLevels.alert')}</span></li>
            </ul>
          </div>
        </div>
      </section>

      {/* Asset & Campaign Management */}
      <section
        data-tour="4"
        data-tour-title-en="Assets, Tasks & Events"
        data-tour-title-ar="الأصول والمهام والفعاليات"
        data-tour-content-en="Access campaign assets, tasks, events, and performance analytics."
        data-tour-content-ar="وصول إلى أصول الحملات والمهام والفعاليات وتحليلات الأداء."
        data-tour-position="bottom"
      >
        <h2 className="text-xl font-semibold !text-gray-900 dark:!text-white mb-4">{t('workspace.sections.assetCampaignManagement')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid_cols_3 gap-6">
          {/* My Campaigns Card */}
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow">
            <h3 className="font-bold text-lg text-purple-700 dark:text-purple-300 mb-2">{t('workspace.assetCampaignManagement.myCampaigns.title')}</h3>
            <ul className="space-y-2 text-gray-900 dark:text-gray-200">
              <li>{t('workspace.assetCampaignManagement.myCampaigns.q2MarketingStrategy')} <span className="ml-2 text-xs bg-green-700 text-white px-2 py-1 rounded">{t('workspace.assetCampaignManagement.status.active')}</span></li>
              <li>{t('workspace.assetCampaignManagement.myCampaigns.summerCampaign')} <span className="ml-2 text-xs bg-blue-700 text-white px-2 py-1 rounded">{t('workspace.assetCampaignManagement.status.planning')}</span></li>
              <li>{t('workspace.assetCampaignManagement.myCampaigns.brandAwarenessDrive')} <span className="ml-2 text-xs bg-yellow-700 text-white px-2 py-1 rounded">{t('workspace.assetCampaignManagement.status.completed')}</span></li>
            </ul>
          </div>
          {/* Asset Library Card */}
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow">
            <h3 className="font-bold text-lg text-purple-700 dark:text-purple-300 mb-2">{t('workspace.assetCampaignManagement.assetLibrary.title')}</h3>
            <ul className="space-y-2 text-gray-900 dark:text-gray-200">
              <li>{t('workspace.assetCampaignManagement.assetLibrary.summerCampaignAssets')}</li>
              <li>{t('workspace.assetCampaignManagement.assetLibrary.brandGuidelines')}</li>
              <li>{t('workspace.assetCampaignManagement.assetLibrary.socialMediaTemplates')}</li>
            </ul>
          </div>
          {/* Task Box Card */}
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow">
            <h3 className="font-bold text-lg text-yellow-700 dark:text-yellow-300 mb-2">{t('workspace.assetCampaignManagement.taskBox.title')}</h3>
            <ul className="space-y-2 text-gray-900 dark:text-gray-200">
              <li>{t('workspace.assetCampaignManagement.taskBox.submitCampaignReport')}</li>
              <li>{t('workspace.assetCampaignManagement.taskBox.reviewAdCreatives')}</li>
              <li>{t('workspace.assetCampaignManagement.taskBox.approveInfluencerContracts')}</li>
            </ul>
          </div>
          {/* Events Card */}
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow">
            <h3 className="font-bold text-lg text-yellow-700 dark:text-yellow-300 mb-2">{t('workspace.assetCampaignManagement.events.title')}</h3>
            <ul className="space-y-2 text-gray-900 dark:text-gray-200">
              <li>{t('workspace.assetCampaignManagement.events.annualMarketingSummit')}</li>
              <li>{t('workspace.assetCampaignManagement.events.internalTrainingSchedule')}</li>
            </ul>
          </div>
          {/* Analytics Card */}
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow">
            <h3 className="font-bold text-lg text_green_700 dark:text_green_300 mb-2">{t('workspace.assetCampaignManagement.analytics.title')}</h3>
            <ul className="space-y-2 text-gray-900 dark:text-gray-200">
              <li>{t('workspace.assetCampaignManagement.analytics.campaignPerformanceDashboard')}</li>
              <li>{t('workspace.assetCampaignManagement.analytics.leadGenerationTrends')}</li>
              <li>{t('workspace.assetCampaignManagement.analytics.roiAnalysis')}</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
} 