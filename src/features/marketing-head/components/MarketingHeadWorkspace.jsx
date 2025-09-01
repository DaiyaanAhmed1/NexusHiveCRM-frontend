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
    return <div className="flex items-center justify-center min-h-screen">{t('support.messages.loading')}</div>;
  }

  return (
    <div key={`${i18n.language}-${languageVersion}`} className="flex-1 p-4 md:p-6 flex flex-col gap-8 overflow-x-auto">
      <header>
        <h1 className="text-2xl font-bold !text-gray-900 dark:!text-white">{t('workspace.title')}</h1>
        <p className="text-gray-600 dark:text-gray-300">{t('workspace.subtitle')}</p>
      </header>

      {/* Training & Development */}
      <section>
        <h2 className="text-xl font-semibold !text-gray-900 dark:!text-white mb-4">{t('workspace.sections.trainingDevelopment')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Marketing Training Card */}
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow">
            <h3 className="font-bold text-lg text-blue-700 dark:text-blue-300 mb-2">{t('workspace.trainingDevelopment.title')}</h3>
            <ul className="space-y-2 text-gray-900 dark:text-gray-200">
              <li>{t('workspace.trainingDevelopment.digitalMarketingBootcamp')} <span className="ml-2 text-xs bg-green-700 text-white px-2 py-1 rounded">{t('workspace.assetCampaignManagement.status.inProgress')}</span></li>
              <li>{t('workspace.trainingDevelopment.brandManagementWorkshop')} <span className="ml-2 text-xs bg-blue-700 text-white px-2 py-1 rounded">{t('workspace.assetCampaignManagement.status.completed')}</span></li>
              <li>{t('workspace.trainingDevelopment.contentStrategySeminar')} <span className="ml-2 text-xs bg-yellow-700 text-white px-2 py-1 rounded">{t('workspace.assetCampaignManagement.status.pending')}</span></li>
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
      <section>
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
      <section>
        <h2 className="text-xl font-semibold !text-gray-900 dark:!text-white mb-4">{t('workspace.sections.assetCampaignManagement')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            <h3 className="font-bold text-lg text-green-700 dark:text-green-300 mb-2">{t('workspace.assetCampaignManagement.analytics.title')}</h3>
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