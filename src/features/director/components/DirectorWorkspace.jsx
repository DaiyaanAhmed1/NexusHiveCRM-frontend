import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
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
  FiPieChart
} from 'react-icons/fi';
import DirectorFinancialIntelligence from './ai/DirectorFinancialIntelligence';
import DirectorStrategicInsights from './ai/DirectorStrategicInsights';
import DirectorOperationalExcellence from './ai/DirectorOperationalExcellence';
import { directorFeatures } from './directorFeatures';

export default function DirectorWorkspace() {
  const user = JSON.parse(localStorage.getItem('rbac_current_user'));
  const [expanded, setExpanded] = useState(false);
  const { t, ready } = useTranslation('director');
  const { isRTLMode } = useLocalization();

  // AI Features State
  const [showFinancialIntelligence, setShowFinancialIntelligence] = useState(false);
  const [showStrategicInsights, setShowStrategicInsights] = useState(false);
  const [showOperationalExcellence, setShowOperationalExcellence] = useState(false);
  const [financialAnalysis, setFinancialAnalysis] = useState(null);
  const [strategicInsights, setStrategicInsights] = useState(null);
  const [operationalAnalysis, setOperationalAnalysis] = useState(null);

  // Refs for auto-scroll functionality
  const financialRef = useRef(null);
  const strategicRef = useRef(null);
  const operationalRef = useRef(null);

  // Auto-scroll to AI sections
  const scrollToAISection = (sectionRef) => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  };

  // Handle AI button clicks with auto-scroll
  const handleShowFinancialIntelligence = () => {
    setShowFinancialIntelligence(!showFinancialIntelligence);
    if (!showFinancialIntelligence) {
      setTimeout(() => scrollToAISection(financialRef), 100);
    }
  };

  const handleShowStrategicInsights = () => {
    setShowStrategicInsights(!showStrategicInsights);
    if (!showStrategicInsights) {
      setTimeout(() => scrollToAISection(strategicRef), 100);
    }
  };

  const handleShowOperationalExcellence = () => {
    setShowOperationalExcellence(!showOperationalExcellence);
    if (!showOperationalExcellence) {
      setTimeout(() => scrollToAISection(operationalRef), 100);
    }
  };

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
    <div className={`flex min-h-screen bg-[#F6F7FA] dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 ${isRTLMode ? 'rtl' : 'ltr'}`}>
      <main className="flex-1 p-4 md:p-6 flex flex-col gap-8 overflow-x-auto">
      <header
          className={`flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 ${isRTLMode ? 'flex-row-reverse' : ''}`}
          data-tour="1"
          data-tour-title-en="Workspace Overview"
          data-tour-title-ar="نظرة عامة على مساحة العمل"
          data-tour-content-en="Your personalized hub: training, compliance, account tools, tasks, events, and more."
          data-tour-content-ar="مركزك الشخصي: التدريب، الامتثال، أدوات الحساب، المهام، الأحداث، والمزيد."
          data-tour-position="bottom"
        >
          <div className={`flex-1 min-w-0 ${isRTLMode ? 'text-right' : 'text-left'}`}>
            <h1 className="text-2xl font-bold !text-gray-900 dark:!text-white">
              {t('workspace.title')}
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              {t('workspace.subtitle')}
            </p>
          </div>
          
          {/* AI Features Buttons - Fixed Layout */}
          <div className={`flex-shrink-0 w-full lg:w-auto ${isRTLMode ? 'text-right' : 'text-left'}`}>
            <div className={`grid grid-cols-1 sm:grid-cols-3 gap-2 lg:flex lg:gap-3 ${isRTLMode ? 'lg:flex-row-reverse' : ''}`}>
              <button 
                className={`px-3 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 transition-colors whitespace-nowrap ${isRTLMode ? 'flex-row-reverse' : ''}`}
                onClick={handleShowFinancialIntelligence}
              >
                <FiDollarSign className="w-4 h-4 flex-shrink-0" /> 
                <span className="hidden sm:inline">
                  {isRTLMode ? 'الذكاء المالي' : 'Financial Intelligence'}
                </span>
                <span className="sm:hidden">
                  {isRTLMode ? 'مالي' : 'Financial'}
                </span>
              </button>
              
              <button 
                className={`px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-colors whitespace-nowrap ${isRTLMode ? 'flex-row-reverse' : ''}`}
                onClick={handleShowStrategicInsights}
              >
                <FiTarget className="w-4 h-4 flex-shrink-0" /> 
                <span className="hidden sm:inline">
                  {isRTLMode ? 'الرؤى الاستراتيجية' : 'Strategic Insights'}
                </span>
                <span className="sm:hidden">
                  {isRTLMode ? 'استراتيجي' : 'Strategic'}
                </span>
              </button>
              
              <button 
                className={`px-3 py-2 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center gap-2 transition-colors whitespace-nowrap ${isRTLMode ? 'flex-row-reverse' : ''}`}
                onClick={handleShowOperationalExcellence}
              >
                <FiZap className="w-4 h-4 flex-shrink-0" /> 
                <span className="hidden sm:inline">
                  {isRTLMode ? 'التميز التشغيلي' : 'Operational Excellence'}
                </span>
                <span className="sm:hidden">
                  {isRTLMode ? 'تشغيلي' : 'Operational'}
                </span>
              </button>
            </div>
          </div>
        </header>


        {/* AI Financial Intelligence Section */}
        {showFinancialIntelligence && (
          <section 
            ref={financialRef}
            className="bg-white dark:bg-gray-800 rounded-xl shadow p-6"
            dir={isRTLMode ? 'rtl' : 'ltr'}
          >
            <div className={`flex items-center gap-2 mb-4 ${isRTLMode ? 'flex-row-reverse' : ''}`}>
              <FiDollarSign className="text-green-500" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {isRTLMode ? 'الذكاء المالي والتحليل الاستراتيجي' : 'Financial Intelligence & Strategic Analysis'}
              </h2>
            </div>
            <div className="mb-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {isRTLMode 
                  ? 'تحليل مالي متقدم مدعوم بالذكاء الاصطناعي لاتخاذ قرارات استراتيجية مدروسة' 
                  : 'Advanced AI-powered financial analysis for strategic decision making'
                }
              </p>
            </div>
            <DirectorFinancialIntelligence 
              onAnalysisComplete={(analysis) => {
                setFinancialAnalysis(analysis);
                console.log('Financial analysis completed:', analysis);
              }}
            />
          </section>
        )}

        {/* AI Strategic Insights Section */}
        {showStrategicInsights && (
          <section 
            ref={strategicRef}
            className="bg-white dark:bg-gray-800 rounded-xl shadow p-6"
            dir={isRTLMode ? 'rtl' : 'ltr'}
          >
            <div className={`flex items-center gap-2 mb-4 ${isRTLMode ? 'flex-row-reverse' : ''}`}>
              <FiTarget className="text-blue-500" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {isRTLMode ? 'الرؤى الاستراتيجية والتخطيط الذكي' : 'Strategic Insights & Intelligent Planning'}
              </h2>
            </div>
            <div className="mb-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {isRTLMode 
                  ? 'رؤى استراتيجية مدعومة بالذكاء الاصطناعي لتحسين الأداء والتخطيط المستقبلي' 
                  : 'AI-powered strategic insights for enhanced performance and future planning'
                }
              </p>
            </div>
            <DirectorStrategicInsights 
              onInsightsGenerated={(insights) => {
                setStrategicInsights(insights);
                console.log('Strategic insights generated:', insights);
              }}
            />
          </section>
        )}

        {/* AI Operational Excellence Section */}
        {/* AI Operational Excellence Section */}
        {showOperationalExcellence && (
          <section 
            ref={operationalRef}
            className="bg-white dark:bg-gray-800 rounded-xl shadow p-6"
            dir={isRTLMode ? 'rtl' : 'ltr'}
          >
            <div className={`flex items-center gap-2 mb-4 ${isRTLMode ? 'flex-row-reverse' : ''}`}>
              <FiZap className="text-purple-500" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {isRTLMode ? 'التميز التشغيلي والتحسين الذكي' : 'Operational Excellence & Smart Optimization'}
              </h2>
            </div>
            <div className="mb-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {isRTLMode 
                  ? 'تحليل تشغيلي متقدم لتحسين الكفاءة والأداء باستخدام الذكاء الاصطناعي' 
                  : 'Advanced operational analysis for efficiency and performance optimization using AI'
                }
              </p>
            </div>
            <DirectorOperationalExcellence 
              onAnalysisComplete={(analysis) => {
                setOperationalAnalysis(analysis);
                console.log('Operational analysis completed:', analysis);
              }}
            />
          </section>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Training & Development */}
            <section
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
              data-tour="2"
              data-tour-title-en="Training & Development"
              data-tour-title-ar="التدريب والتطوير"
              data-tour-content-en="Team training progress and knowledge resources for leaders."
              data-tour-content-ar="تقدم تدريب الفريق ومصادر المعرفة للقادة."
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
                {/* Team Training */}
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-3">
                    {t('workspace.trainingDevelopment.teamTraining.title')}
                  </h3>
                  <div className="space-y-2">
                    {[
                      { text: t('workspace.trainingDevelopment.teamTraining.items.leadershipDevelopment'), status: 'inProgress' },
                      { text: t('workspace.trainingDevelopment.teamTraining.items.onboardingTraining'), status: 'completed' },
                      { text: t('workspace.trainingDevelopment.teamTraining.items.digitalTeachingTools'), status: 'pending' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between py-2">
                        <span className="text-sm text-gray-700 dark:text-gray-300">{item.text}</span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          item.status === 'inProgress' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                          item.status === 'completed' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                          'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                        }`}>
                          {t(`workspace.status.${item.status}`)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Knowledge Management */}
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-3">
                    {t('workspace.trainingDevelopment.knowledgeManagement.title')}
                  </h3>
                  <div className="space-y-2">
                    {[
                      t('workspace.trainingDevelopment.knowledgeManagement.items.publishResearch'),
                      t('workspace.trainingDevelopment.knowledgeManagement.items.internationalStudents'),
                      t('workspace.trainingDevelopment.knowledgeManagement.items.departmentSops')
                    ].map((item, index) => (
                      <a key={index} href="#" className="block py-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline">
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
              data-tour-title-en="Compliance & Quality"
              data-tour-title-ar="الامتثال والجودة"
              data-tour-content-en="Quality assurance workflows and risk management highlights."
              data-tour-content-ar="سير عمل ضمان الجودة وأبرز المخاطر."
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
                {/* Quality Assurance */}
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-3">
                    {t('workspace.complianceQuality.qualityAssurance.title')}
                  </h3>
                  <div className="space-y-2">
                    {[
                      { text: t('workspace.complianceQuality.qualityAssurance.items.semesterAssessment'), action: t('workspace.buttons.start') },
                      { text: t('workspace.complianceQuality.qualityAssurance.items.courseContentAnalysis'), action: t('workspace.buttons.view') },
                      { text: t('workspace.complianceQuality.qualityAssurance.items.complianceUploads'), action: t('workspace.buttons.upload') }
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
                  <h3 className="font-medium text-gray-900 dark:text-white mb-3">
                    {t('workspace.complianceQuality.riskManagement.title')}
                  </h3>
                  <div className="space-y-2">
                    {[
                      { text: t('workspace.complianceQuality.riskManagement.items.riskAssessment'), action: t('workspace.buttons.assess') },
                      { text: t('workspace.complianceQuality.riskManagement.items.incidentReporting'), action: t('workspace.buttons.report') },
                      { text: t('workspace.complianceQuality.riskManagement.items.auditTrail'), action: t('workspace.buttons.view') }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between py-2">
                        <span className="text-sm text-gray-700 dark:text-gray-300">{item.text}</span>
                        <button className="px-3 py-1 bg-red-600 text-white rounded text-xs font-medium hover:bg-red-700 transition-colors">
                          {item.action}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Account Management */}
            <section
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
              data-tour="4"
              data-tour-title-en="Account Management"
              data-tour-title-ar="إدارة الحساب"
              data-tour-content-en="Personal HR tools, tasks, events, and administrative functions."
              data-tour-content-ar="أدوات الموارد البشرية الشخصية، المهام، الأحداث، والوظائف الإدارية."
              data-tour-position="bottom"
            >
              <div className={`flex items-center gap-3 mb-6 ${isRTLMode ? 'flex-row-reverse' : ''}`}>
                <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                  <FiSettings className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {t('workspace.sections.accountManagement')}
                </h2>
              </div>
              
              <div className="grid grid-cols-1 gap-3">
                {[
                  { 
                    title: t('workspace.accountManagement.myHrBoard.title'), 
                    icon: FiPieChart, 
                    items: [
                      { text: t('workspace.accountManagement.myHrBoard.items.salarySlip'), action: t('workspace.buttons.download') },
                      { text: t('workspace.accountManagement.myHrBoard.items.leaveBalance') },
                      { text: t('workspace.accountManagement.myHrBoard.items.performanceReview') }
                    ]
                  },
                  { 
                    title: t('workspace.accountManagement.myReferral.title'), 
                    icon: FiUsers, 
                    items: [
                      { text: t('workspace.accountManagement.myReferral.items.submitReferral') },
                      { text: t('workspace.accountManagement.myReferral.items.trackReferral') }
                    ]
                  },
                  { 
                    title: t('workspace.accountManagement.taskBox.title'), 
                    icon: FiClock, 
                    items: [
                      { text: t('workspace.accountManagement.taskBox.items.budgetProposal') },
                      { text: t('workspace.accountManagement.taskBox.items.internalAudit') },
                      { text: t('workspace.accountManagement.taskBox.items.researchApplications') }
                    ]
                  },
                  { 
                    title: t('workspace.accountManagement.events.title'), 
                    icon: FiCalendar, 
                    items: [
                      { text: t('workspace.accountManagement.events.items.techSymposium') },
                      { text: t('workspace.accountManagement.events.items.fdpSchedule') }
                    ]
                  },
                  { 
                    title: t('workspace.accountManagement.attendance.title'), 
                    icon: FiCheckCircle, 
                    items: [
                      { text: t('workspace.accountManagement.attendance.items.summary') },
                      { text: t('workspace.accountManagement.attendance.items.correction') }
                    ]
                  },
                  { 
                    title: t('workspace.accountManagement.recruitment.title'), 
                    icon: FiStar, 
                    items: [
                      { text: t('workspace.accountManagement.recruitment.items.deanOpening') },
                      { text: t('workspace.accountManagement.recruitment.items.roleUpgrade') }
                    ]
                  },
                  { 
                    title: t('workspace.accountManagement.geoFencing.title'), 
                    icon: FiShield, 
                    items: [
                      { text: t('workspace.accountManagement.geoFencing.items.checkedIn') },
                      { text: t('workspace.accountManagement.geoFencing.items.outOfZoneAlert') }
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
                          {item.action && (
                            <button className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                              {item.action}
                            </button>
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