import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { directorFeatures } from './directorFeatures';

export default function DirectorWorkspace() {
  const user = JSON.parse(localStorage.getItem('rbac_current_user'));
  const [expanded, setExpanded] = useState(false);
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

  return (
    <div className="flex min-h-screen bg-[#F6F7FA] dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800">
      <main className="flex-1 p-4 md:p-6 flex flex-col gap-8 overflow-x-auto">
        <header>
          <h1 className="text-2xl font-bold !text-gray-900 dark:!text-white">
            {t('workspace.title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            {t('workspace.subtitle')}
          </p>
        </header>

        {/* Training & Development */}
        <section>
          <h2 className="text-xl font-semibold !text-gray-900 dark:!text-white mb-4">
            🎓 {t('workspace.sections.trainingDevelopment')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Team Training Card */}
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow">
              <h3 className="font-bold text-lg text-blue-700 dark:text-blue-300 mb-2">
                {t('workspace.trainingDevelopment.teamTraining.title')}
              </h3>
              <ul className="space-y-2 text-gray-900 dark:text-gray-200">
                <li>
                  {t('workspace.trainingDevelopment.teamTraining.items.leadershipDevelopment')} 
                  <span className="ml-2 text-xs bg-green-700 text-white px-2 py-1 rounded">
                    {t('workspace.status.inProgress')}
                  </span>
                </li>
                <li>
                  {t('workspace.trainingDevelopment.teamTraining.items.onboardingTraining')} 
                  <span className="ml-2 text-xs bg-blue-700 text-white px-2 py-1 rounded">
                    {t('workspace.status.completed')}
                  </span>
                </li>
                <li>
                  {t('workspace.trainingDevelopment.teamTraining.items.digitalTeachingTools')} 
                  <span className="ml-2 text-xs bg-yellow-700 text-white px-2 py-1 rounded">
                    {t('workspace.status.pending')}
                  </span>
                </li>
              </ul>
            </div>
            {/* Knowledge Management Card */}
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow">
              <h3 className="font-bold text-lg text-blue-700 dark:text-blue-300 mb-2">
                {t('workspace.trainingDevelopment.knowledgeManagement.title')}
              </h3>
              <ul className="space-y-2 text-gray-900 dark:text-gray-200">
                <li>
                  <a href="#" className="underline">
                    {t('workspace.trainingDevelopment.knowledgeManagement.items.publishResearch')}
                  </a>
                </li>
                <li>
                  <a href="#" className="underline">
                    {t('workspace.trainingDevelopment.knowledgeManagement.items.internationalStudents')}
                  </a>
                </li>
                <li>
                  <a href="#" className="underline">
                    {t('workspace.trainingDevelopment.knowledgeManagement.items.departmentSops')}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Compliance & Quality */}
        <section>
          <h2 className="text-xl font-semibold !text-gray-900 dark:!text-white mb-4">
            ✅ {t('workspace.sections.complianceQuality')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Quality Assurance Card */}
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow">
              <h3 className="font-bold text-lg text-green-700 dark:text-green-300 mb-2">
                {t('workspace.complianceQuality.qualityAssurance.title')}
              </h3>
              <ul className="space-y-2 text-gray-900 dark:text-gray-200">
                <li>
                  {t('workspace.complianceQuality.qualityAssurance.items.semesterAssessment')} 
                  <button className="ml-2 text-xs bg-blue-700 text-white px-2 py-1 rounded">
                    {t('workspace.buttons.start')}
                  </button>
                </li>
                <li>
                  {t('workspace.complianceQuality.qualityAssurance.items.courseContentAnalysis')} 
                  <button className="ml-2 text-xs bg-blue-700 text-white px-2 py-1 rounded">
                    {t('workspace.buttons.view')}
                  </button>
                </li>
                <li>
                  {t('workspace.complianceQuality.qualityAssurance.items.complianceUploads')} 
                  <button className="ml-2 text-xs bg-blue-700 text-white px-2 py-1 rounded">
                    {t('workspace.buttons.upload')}
                  </button>
                </li>
              </ul>
            </div>
            {/* Risk Management Card */}
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow">
              <h3 className="font-bold text-lg text-red-700 dark:text-red-300 mb-2">
                {t('workspace.complianceQuality.riskManagement.title')}
              </h3>
              <ul className="space-y-2 text-gray-900 dark:text-gray-200">
                <li>
                  {t('workspace.complianceQuality.riskManagement.items.delayedExamResults')} 
                  <span className="ml-2 text-xs bg-red-700 text-white px-2 py-1 rounded">
                    {t('workspace.status.high')}
                  </span>
                </li>
                <li>
                  {t('workspace.complianceQuality.riskManagement.items.placementTargets')} 
                  <span className="ml-2 text-xs bg-yellow-700 text-white px-2 py-1 rounded">
                    {t('workspace.status.medium')}
                  </span>
                </li>
                <li>
                  {t('workspace.complianceQuality.riskManagement.items.dropoutTrend')} 
                  <span className="ml-2 text-xs bg-orange-700 text-white px-2 py-1 rounded">
                    {t('workspace.status.alert')}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Account Management */}
        <section>
          <h2 className="text-xl font-semibold !text-gray-900 dark:!text-white mb-4">
            🧾 {t('workspace.sections.accountManagement')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* My Profile Card */}
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow">
              <h3 className="font-bold text-lg text-purple-700 dark:text-purple-300 mb-2">
                {t('workspace.accountManagement.myProfile.title')}
              </h3>
              <p className="text-gray-900 dark:text-gray-200">
                {t('workspace.accountManagement.myProfile.description')}
              </p>
            </div>
            {/* My HR Board Card */}
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow">
              <h3 className="font-bold text-lg text-purple-700 dark:text-purple-300 mb-2">
                {t('workspace.accountManagement.myHrBoard.title')}
              </h3>
              <ul className="space-y-2 text-gray-900 dark:text-gray-200">
                <li>
                  {t('workspace.accountManagement.myHrBoard.items.salarySlip')} 
                  <button className="ml-2 text-xs bg-blue-700 text-white px-2 py-1 rounded">
                    {t('workspace.buttons.download')}
                  </button>
                </li>
                <li>{t('workspace.accountManagement.myHrBoard.items.leaveBalance')}</li>
                <li>{t('workspace.accountManagement.myHrBoard.items.performanceReview')}</li>
              </ul>
            </div>
            {/* My Referral Card */}
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow">
              <h3 className="font-bold text-lg text-purple-700 dark:text-purple-300 mb-2">
                {t('workspace.accountManagement.myReferral.title')}
              </h3>
              <ul className="space-y-2 text-gray-900 dark:text-gray-200">
                <li>{t('workspace.accountManagement.myReferral.items.submitReferral')}</li>
                <li>{t('workspace.accountManagement.myReferral.items.trackReferral')}</li>
              </ul>
            </div>
            {/* Task Box Card */}
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow">
              <h3 className="font-bold text-lg text-yellow-700 dark:text-yellow-300 mb-2">
                {t('workspace.accountManagement.taskBox.title')}
              </h3>
              <ul className="space-y-2 text-gray-900 dark:text-gray-200">
                <li>{t('workspace.accountManagement.taskBox.items.budgetProposal')}</li>
                <li>{t('workspace.accountManagement.taskBox.items.internalAudit')}</li>
                <li>{t('workspace.accountManagement.taskBox.items.researchApplications')}</li>
              </ul>
            </div>
            {/* Events Card */}
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow">
              <h3 className="font-bold text-lg text-yellow-700 dark:text-yellow-300 mb-2">
                {t('workspace.accountManagement.events.title')}
              </h3>
              <ul className="space-y-2 text-gray-900 dark:text-gray-200">
                <li>{t('workspace.accountManagement.events.items.techSymposium')}</li>
                <li>{t('workspace.accountManagement.events.items.fdpSchedule')}</li>
              </ul>
            </div>
            {/* Attendance Card */}
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow">
              <h3 className="font-bold text-lg text-yellow-700 dark:text-yellow-300 mb-2">
                {t('workspace.accountManagement.attendance.title')}
              </h3>
              <ul className="space-y-2 text-gray-900 dark:text-gray-200">
                <li>{t('workspace.accountManagement.attendance.items.summary')}</li>
                <li>{t('workspace.accountManagement.attendance.items.correction')}</li>
              </ul>
            </div>
            {/* Recruitment Card */}
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow">
              <h3 className="font-bold text-lg text-green-700 dark:text-green-300 mb-2">
                {t('workspace.accountManagement.recruitment.title')}
              </h3>
              <ul className="space-y-2 text-gray-900 dark:text-gray-200">
                <li>{t('workspace.accountManagement.recruitment.items.deanOpening')}</li>
                <li>{t('workspace.accountManagement.recruitment.items.roleUpgrade')}</li>
              </ul>
            </div>
            {/* Geo-Fencing Card */}
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow">
              <h3 className="font-bold text-lg text-green-700 dark:text-green-300 mb-2">
                {t('workspace.accountManagement.geoFencing.title')}
              </h3>
              <ul className="space-y-2 text-gray-900 dark:text-gray-200">
                <li>{t('workspace.accountManagement.geoFencing.items.checkedIn')}</li>
                <li>{t('workspace.accountManagement.geoFencing.items.outOfZoneAlert')}</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
} 