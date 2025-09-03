import React from "react";
import { useTranslation } from "react-i18next";

const AdmissionHeadWorkspace = () => {
  const { t } = useTranslation(['admission', 'common']);
  
  return (
    <div className="min-h-screen bg-[#F6F7FA] dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800" data-tour="1" data-tour-title-en="Workspace Overview" data-tour-title-ar="نظرة عامة على مساحة العمل" data-tour-content-en="Quick access to training, compliance, HR, tasks, events, attendance, recruitment, and geo-fencing." data-tour-content-ar="وصول سريع إلى التدريب والامتثال والموارد البشرية والمهام والفعاليات والحضور والتوظيف وتحديد الموقع.">
      <main className="flex-1 p-4 md:p-6 flex flex-col gap-8 overflow-x-auto">
        <header data-tour="2" data-tour-title-en="Header" data-tour-title-ar="الرأس" data-tour-content-en="Title and subtitle for your workspace." data-tour-content-ar="العنوان والوصف لمساحة العمل.">
          <h1 className="text-2xl font-bold !text-gray-900 dark:!text-white">{t('workspace.title')}</h1>
          <p className="text-gray-600 dark:text-gray-300">{t('workspace.subtitle')}</p>
        </header>

        {/* Training & Development */}
        <section data-tour="3" data-tour-title-en="Training & Knowledge" data-tour-title-ar="التدريب والمعرفة" data-tour-content-en="Team training status and knowledge base links." data-tour-content-ar="حالة تدريب الفريق وروابط قاعدة المعرفة.">
          <h2 className="text-xl font-semibold !text-gray-900 dark:!text-white mb-4">🎓 {t('workspace.trainingDevelopment.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Team Training Card */}
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow">
              <h3 className="font-bold text-lg text-blue-700 dark:text-blue-300 mb-2">{t('workspace.trainingDevelopment.teamTraining.title')}</h3>
              <ul className="space-y-2 text-gray-900 dark:text-gray-200">
                <li>{t('workspace.trainingDevelopment.teamTraining.admissionProcess')} <span className="ml-2 text-xs bg-green-700 text-white px-2 py-1 rounded">{t('workspace.status.inProgress')}</span></li>
                <li>{t('workspace.trainingDevelopment.teamTraining.complianceTraining')} <span className="ml-2 text-xs bg-blue-700 text-white px-2 py-1 rounded">{t('workspace.status.completed')}</span></li>
                <li>{t('workspace.trainingDevelopment.teamTraining.digitalTools')} <span className="ml-2 text-xs bg-yellow-700 text-white px-2 py-1 rounded">{t('workspace.status.pending')}</span></li>
              </ul>
            </div>
            {/* Knowledge Management Card */}
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow">
              <h3 className="font-bold text-lg text-blue-700 dark:text-blue-300 mb-2">{t('workspace.trainingDevelopment.knowledgeManagement.title')}</h3>
              <ul className="space-y-2 text-gray-900 dark:text-gray-200">
                <li><a href="#" className="underline">{t('workspace.trainingDevelopment.knowledgeManagement.admissionGuidelines')}</a></li>
                <li><a href="#" className="underline">{t('workspace.trainingDevelopment.knowledgeManagement.complianceProcedures')}</a></li>
                <li><a href="#" className="underline">{t('workspace.trainingDevelopment.knowledgeManagement.departmentSOPs')}</a></li>
              </ul>
            </div>
          </div>
        </section>

        {/* Compliance & Quality */}
        <section data-tour="4" data-tour-title-en="Compliance & Risk" data-tour-title-ar="الامتثال والمخاطر" data-tour-content-en="Quality assurance activities and risk signals with actions." data-tour-content-ar="أنشطة ضمان الجودة وإشارات المخاطر مع الإجراءات.">
          <h2 className="text-xl font-semibold !text-gray-900 dark:!text-white mb-4">✅ {t('workspace.complianceQuality.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Quality Assurance Card */}
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow">
              <h3 className="font-bold text-lg text-green-700 dark:text-green-300 mb-2">{t('workspace.complianceQuality.qualityAssurance.title')}</h3>
              <ul className="space-y-2 text-gray-900 dark:text-gray-200">
                <li>{t('workspace.complianceQuality.qualityAssurance.admissionQualitySelfAssessment')} <button className="ml-2 text-xs bg-blue-700 text-white px-2 py-1 rounded">{t('workspace.complianceQuality.qualityAssurance.start')}</button></li>
                <li>{t('workspace.complianceQuality.qualityAssurance.complianceCoverageAnalysis')} <button className="ml-2 text-xs bg-blue-700 text-white px-2 py-1 rounded">{t('workspace.complianceQuality.qualityAssurance.view')}</button></li>
                <li>{t('workspace.complianceQuality.qualityAssurance.complianceUploads')} <button className="ml-2 text-xs bg-blue-700 text-white px-2 py-1 rounded">{t('workspace.complianceQuality.qualityAssurance.upload')}</button></li>
              </ul>
            </div>
            {/* Risk Management Card */}
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow">
              <h3 className="font-bold text-lg text-red-700 dark:text-red-300 mb-2">{t('workspace.complianceQuality.riskManagement.title')}</h3>
              <ul className="space-y-2 text-gray-900 dark:text-gray-200">
                <li>{t('workspace.complianceQuality.riskManagement.delayedAdmissionProcess')} <span className="ml-2 text-xs bg-red-700 text-white px-2 py-1 rounded">{t('workspace.complianceQuality.riskManagement.high')}</span></li>
                <li>{t('workspace.complianceQuality.riskManagement.underperformanceInCompliance')} <span className="ml-2 text-xs bg-yellow-700 text-white px-2 py-1 rounded">{t('workspace.complianceQuality.riskManagement.medium')}</span></li>
                <li>{t('workspace.complianceQuality.riskManagement.increasedDropoutTrend')} <span className="ml-2 text-xs bg-orange-700 text-white px-2 py-1 rounded">{t('workspace.complianceQuality.riskManagement.alert')}</span></li>
              </ul>
            </div>
          </div>
        </section>

        {/* Workplace */}
        <section data-tour="5" data-tour-title-en="Workplace" data-tour-title-ar="بيئة العمل" data-tour-content-en="Profile, HR board, referrals, tasks, events, attendance, recruitment, and geo-fencing." data-tour-content-ar="الملف، لوحة الموارد البشرية، الإحالات، المهام، الفعاليات، الحضور، التوظيف وتحديد الموقع.">
          <h2 className="text-xl font-semibold !text-gray-900 dark:!text-white mb-4">🏢 {t('workspace.workplace.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* My Profile Card */}
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow">
              <h3 className="font-bold text-lg text-purple-700 dark:text-purple-300 mb-2">{t('workspace.workplace.myProfile.title')}</h3>
              <p className="text-gray-900 dark:text-gray-200">{t('workspace.workplace.myProfile.description')}</p>
            </div>
            {/* My HR Board Card */}
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow">
              <h3 className="font-bold text-lg text-purple-700 dark:text-purple-300 mb-2">{t('workspace.workplace.myHRBoard.title')}</h3>
              <ul className="space-y-2 text-gray-900 dark:text-gray-200">
                <li>{t('workspace.workplace.myHRBoard.monthlySalarySlip')} <button className="ml-2 text-xs bg-blue-700 text-white px-2 py-1 rounded">{t('workspace.workplace.myHRBoard.download')}</button></li>
                <li>{t('workspace.workplace.myHRBoard.leaveBalanceTracker')}</li>
                <li>{t('workspace.workplace.myHRBoard.performanceReviewForm')}</li>
              </ul>
            </div>
            {/* My Referral Card */}
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow">
              <h3 className="font-bold text-lg text-purple-700 dark:text-purple-300 mb-2">{t('workspace.workplace.myReferral.title')}</h3>
              <ul className="space-y-2 text-gray-900 dark:text-gray-200">
                <li>{t('workspace.workplace.myReferral.submitReferral')}</li>
                <li>{t('workspace.workplace.myReferral.trackReferralStatus')}</li>
              </ul>
            </div>
            {/* Task Box Card */}
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow">
              <h3 className="font-bold text-lg text-yellow-700 dark:text-yellow-300 mb-2">{t('workspace.workplace.taskBox.title')}</h3>
              <ul className="space-y-2 text-gray-900 dark:text-gray-200">
                <li>{t('workspace.workplace.taskBox.submitDepartmentalBudgetProposal')}</li>
                <li>{t('workspace.workplace.taskBox.conductInternalAuditForLabEquipment')}</li>
                <li>{t('workspace.workplace.taskBox.approveStudentResearchApplications')}</li>
              </ul>
            </div>
            {/* Events Card */}
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow">
              <h3 className="font-bold text-lg text-yellow-700 dark:text-yellow-300 mb-2">{t('workspace.workplace.events.title')}</h3>
              <ul className="space-y-2 text-gray-900 dark:text-gray-200">
                <li>{t('workspace.workplace.events.annualTechSymposiumRegistrationOpen')}</li>
                <li>{t('workspace.workplace.events.internalFDPSchedule')}</li>
              </ul>
            </div>
            {/* Attendance Card */}
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow">
              <h3 className="font-bold text-lg text-yellow-700 dark:text-yellow-300 mb-2">{t('workspace.workplace.attendance.title')}</h3>
              <ul className="space-y-2 text-gray-900 dark:text-gray-200">
                <li>{t('workspace.workplace.attendance.present')}: {t('workspace.workplace.attendance.days.present')}, {t('workspace.workplace.attendance.days.leave')}, {t('workspace.workplace.attendance.days.absent')}</li>
                <li>{t('workspace.workplace.attendance.submitAttendanceCorrection')}</li>
              </ul>
            </div>
            {/* Recruitment Card */}
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow">
              <h3 className="font-bold text-lg text-green-700 dark:text-green-300 mb-2">{t('workspace.workplace.recruitment.title')}</h3>
              <ul className="space-y-2 text-gray-900 dark:text-gray-200">
                <li>{t('workspace.workplace.recruitment.internalOpening')}: {t('workspace.workplace.recruitment.role.dean')}</li>
                <li>{t('workspace.workplace.recruitment.submitSOPForRoleUpgrade')}</li>
              </ul>
            </div>
            {/* Geo-Fencing Card (Optional) */}
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow">
              <h3 className="font-bold text-lg text-green-700 dark:text-green-300 mb-2">{t('workspace.workplace.geoFencing.title')}</h3>
              <ul className="space-y-2 text-gray-900 dark:text-gray-200">
                <li>{t('workspace.workplace.geoFencing.checkedIn')}: {t('workspace.workplace.geoFencing.time')}</li>
                <li>{t('workspace.workplace.geoFencing.alert')}: {t('workspace.workplace.geoFencing.outOfZoneAttendanceAttempt')}</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdmissionHeadWorkspace; 