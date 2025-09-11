import React from "react";
import { useTranslation } from "react-i18next";
import { useLocalization } from "../../../hooks/useLocalization";
import { 
  FiBookOpen, 
  FiShield, 
  FiUser, 
  FiUsers, 
  FiCalendar, 
  FiClock, 
  FiTarget, 
  FiMapPin,
  FiDownload,
  FiEye,
  FiUpload,
  FiAlertTriangle,
  FiCheckCircle,
  FiXCircle,
  FiTrendingUp,
  FiTrendingDown
} from 'react-icons/fi';

const AdmissionHeadWorkspace = () => {
  const { t } = useTranslation(['admission', 'common']);
  const { isRTL } = useLocalization();
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900" 
         data-tour="1" 
         data-tour-title-en="Workspace Overview" 
         data-tour-title-ar="نظرة عامة على مساحة العمل" 
         data-tour-content-en="Quick access to training, compliance, HR, tasks, events, attendance, recruitment, and geo-fencing." 
         data-tour-content-ar="وصول سريع إلى التدريب والامتثال والموارد البشرية والمهام والفعاليات والحضور والتوظيف وتحديد الموقع.">
      
      <main className="flex-1 p-6 flex flex-col gap-8 overflow-x-auto">
        {/* Header */}
        <header className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white" 
                data-tour="2" 
                data-tour-title-en="Header" 
                data-tour-title-ar="الرأس" 
                data-tour-content-en="Title and subtitle for your workspace." 
                data-tour-content-ar="العنوان والوصف لمساحة العمل.">
          <h1 className="text-3xl font-bold mb-2">{t('workspace.title')}</h1>
          <p className="text-blue-100 text-lg">{t('workspace.subtitle')}</p>
        </header>

        {/* Training & Development */}
        <section className="space-y-6" 
                 data-tour="3" 
                 data-tour-title-en="Training & Knowledge" 
                 data-tour-title-ar="التدريب والمعرفة" 
                 data-tour-content-en="Team training status and knowledge base links." 
                 data-tour-content-ar="حالة تدريب الفريق وروابط قاعدة المعرفة.">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
              <FiBookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('workspace.trainingDevelopment.title')}</h2>
          </div>
          
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Team Training Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                  <FiUsers className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{t('workspace.trainingDevelopment.teamTraining.title')}</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-gray-900 dark:text-white">{t('workspace.trainingDevelopment.teamTraining.admissionProcess')}</span>
                  <span className="px-3 py-1 text-xs font-medium bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 rounded-full">
                    {t('workspace.status.inProgress')}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-gray-900 dark:text-white">{t('workspace.trainingDevelopment.teamTraining.complianceTraining')}</span>
                  <span className="px-3 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded-full">
                    {t('workspace.status.completed')}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-gray-900 dark:text-white">{t('workspace.trainingDevelopment.teamTraining.digitalTools')}</span>
                  <span className="px-3 py-1 text-xs font-medium bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300 rounded-full">
                    {t('workspace.status.pending')}
                  </span>
                </div>
              </div>
            </div>

            {/* Knowledge Management Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                  <FiBookOpen className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{t('workspace.trainingDevelopment.knowledgeManagement.title')}</h3>
              </div>
              <div className="space-y-3">
                <a href="#" className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                  <FiEye className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <span className="text-gray-900 dark:text-white">{t('workspace.trainingDevelopment.knowledgeManagement.admissionGuidelines')}</span>
                </a>
                <a href="#" className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                  <FiEye className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <span className="text-gray-900 dark:text-white">{t('workspace.trainingDevelopment.knowledgeManagement.complianceProcedures')}</span>
                </a>
                <a href="#" className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                  <FiEye className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <span className="text-gray-900 dark:text-white">{t('workspace.trainingDevelopment.knowledgeManagement.departmentSOPs')}</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Compliance & Quality */}
        <section className="space-y-6" 
                 data-tour="4" 
                 data-tour-title-en="Compliance & Risk" 
                 data-tour-title-ar="الامتثال والمخاطر" 
                 data-tour-content-en="Quality assurance activities and risk signals with actions." 
                 data-tour-content-ar="أنشطة ضمان الجودة وإشارات المخاطر مع الإجراءات.">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
              <FiShield className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('workspace.complianceQuality.title')}</h2>
          </div>
          
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Quality Assurance Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                  <FiCheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{t('workspace.complianceQuality.qualityAssurance.title')}</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-gray-900 dark:text-white">{t('workspace.complianceQuality.qualityAssurance.admissionQualitySelfAssessment')}</span>
                  <button className="px-3 py-1 text-xs font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    {t('workspace.complianceQuality.qualityAssurance.start')}
                  </button>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-gray-900 dark:text-white">{t('workspace.complianceQuality.qualityAssurance.complianceCoverageAnalysis')}</span>
                  <button className="px-3 py-1 text-xs font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    {t('workspace.complianceQuality.qualityAssurance.view')}
                  </button>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-gray-900 dark:text-white">{t('workspace.complianceQuality.qualityAssurance.complianceUploads')}</span>
                  <button className="px-3 py-1 text-xs font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    {t('workspace.complianceQuality.qualityAssurance.upload')}
                  </button>
                </div>
              </div>
            </div>

            {/* Risk Management Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center">
                  <FiAlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{t('workspace.complianceQuality.riskManagement.title')}</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-gray-900 dark:text-white">{t('workspace.complianceQuality.riskManagement.delayedAdmissionProcess')}</span>
                  <span className="px-3 py-1 text-xs font-medium bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300 rounded-full">
                    {t('workspace.complianceQuality.riskManagement.high')}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-gray-900 dark:text-white">{t('workspace.complianceQuality.riskManagement.underperformanceInCompliance')}</span>
                  <span className="px-3 py-1 text-xs font-medium bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300 rounded-full">
                    {t('workspace.complianceQuality.riskManagement.medium')}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-gray-900 dark:text-white">{t('workspace.complianceQuality.riskManagement.increasedDropoutTrend')}</span>
                  <span className="px-3 py-1 text-xs font-medium bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-300 rounded-full">
                    {t('workspace.complianceQuality.riskManagement.alert')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Workplace */}
        <section className="space-y-6" 
                 data-tour="5" 
                 data-tour-title-en="Workplace" 
                 data-tour-title-ar="بيئة العمل" 
                 data-tour-content-en="Profile, HR board, referrals, tasks, events, attendance, recruitment, and geo-fencing." 
                 data-tour-content-ar="الملف، لوحة الموارد البشرية، الإحالات، المهام، الفعاليات، الحضور، التوظيف وتحديد الموقع.">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
              <FiUser className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('workspace.workplace.title')}</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* My Profile Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                  <FiUser className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t('workspace.workplace.myProfile.title')}</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">{t('workspace.workplace.myProfile.description')}</p>
            </div>

            {/* My HR Board Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                  <FiUsers className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t('workspace.workplace.myHRBoard.title')}</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-gray-900 dark:text-white">{t('workspace.workplace.myHRBoard.monthlySalarySlip')}</span>
                  <button className="flex items-center gap-1 px-3 py-1 text-xs font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <FiDownload className="w-3 h-3" />
                    {t('workspace.workplace.myHRBoard.download')}
                  </button>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-gray-900 dark:text-white">{t('workspace.workplace.myHRBoard.leaveBalanceTracker')}</span>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-gray-900 dark:text-white">{t('workspace.workplace.myHRBoard.performanceReviewForm')}</span>
                </div>
              </div>
            </div>

            {/* My Referral Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                  <FiTarget className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t('workspace.workplace.myReferral.title')}</h3>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-gray-900 dark:text-white">{t('workspace.workplace.myReferral.submitReferral')}</span>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-gray-900 dark:text-white">{t('workspace.workplace.myReferral.trackReferralStatus')}</span>
                </div>
              </div>
            </div>

            {/* Task Box Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center">
                  <FiTarget className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t('workspace.workplace.taskBox.title')}</h3>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-gray-900 dark:text-white">{t('workspace.workplace.taskBox.submitDepartmentalBudgetProposal')}</span>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-gray-900 dark:text-white">{t('workspace.workplace.taskBox.conductInternalAuditForLabEquipment')}</span>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-gray-900 dark:text-white">{t('workspace.workplace.taskBox.approveStudentResearchApplications')}</span>
                </div>
              </div>
            </div>

            {/* Events Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg flex items-center justify-center">
                  <FiCalendar className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t('workspace.workplace.events.title')}</h3>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-gray-900 dark:text-white">{t('workspace.workplace.events.annualTechSymposiumRegistrationOpen')}</span>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-gray-900 dark:text-white">{t('workspace.workplace.events.internalFDPSchedule')}</span>
                </div>
              </div>
            </div>

            {/* Attendance Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/20 rounded-lg flex items-center justify-center">
                  <FiClock className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t('workspace.workplace.attendance.title')}</h3>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-gray-900 dark:text-white">
                    {t('workspace.workplace.attendance.present')}: {t('workspace.workplace.attendance.days.present')}, {t('workspace.workplace.attendance.days.leave')}, {t('workspace.workplace.attendance.days.absent')}
                  </span>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-gray-900 dark:text-white">{t('workspace.workplace.attendance.submitAttendanceCorrection')}</span>
                </div>
              </div>
            </div>

            {/* Recruitment Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-teal-100 dark:bg-teal-900/20 rounded-lg flex items-center justify-center">
                  <FiUsers className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t('workspace.workplace.recruitment.title')}</h3>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-gray-900 dark:text-white">
                    {t('workspace.workplace.recruitment.internalOpening')}: {t('workspace.workplace.recruitment.role.dean')}
                  </span>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-gray-900 dark:text-white">{t('workspace.workplace.recruitment.submitSOPForRoleUpgrade')}</span>
                </div>
              </div>
            </div>

            {/* Geo-Fencing Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-pink-100 dark:bg-pink-900/20 rounded-lg flex items-center justify-center">
                  <FiMapPin className="w-5 h-5 text-pink-600 dark:text-pink-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t('workspace.workplace.geoFencing.title')}</h3>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-gray-900 dark:text-white">
                    {t('workspace.workplace.geoFencing.checkedIn')}: {t('workspace.workplace.geoFencing.time')}
                  </span>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-gray-900 dark:text-white">
                    {t('workspace.workplace.geoFencing.alert')}: {t('workspace.workplace.geoFencing.outOfZoneAttendanceAttempt')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdmissionHeadWorkspace;