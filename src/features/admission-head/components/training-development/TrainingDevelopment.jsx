import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalization } from "../../../../hooks/useLocalization";
import {
  CalendarIcon,
  BookOpenIcon,
  UserGroupIcon,
  ChartBarIcon,
  AcademicCapIcon,
  TrophyIcon,
  UserIcon,
  ChatBubbleLeftRightIcon,
  BookmarkIcon,
  SparklesIcon
} from "@heroicons/react/24/outline";

// Import child components (to be created)
import TrainingCalendar from "./TrainingCalendar";
import TrainingModules from "./TrainingModules";
import OnboardingPrograms from "./OnboardingPrograms";
import SkillGapAnalysis from "./SkillGapAnalysis";
import ProgressTracking from "./ProgressTracking";
import TrainerManagement from "./TrainerManagement";
import TrainingFeedback from "./TrainingFeedback";
import KnowledgeHub from "./KnowledgeHub";
import Gamification from "./Gamification";

const TrainingDevelopment = () => {
  const { t } = useTranslation(['admission', 'common']);
  const { isRTL } = useLocalization();
  const [selectedTab, setSelectedTab] = useState(0);

  const tabs = [
    { name: t('trainingDevelopment.tabs.trainingCalendar'), icon: CalendarIcon, component: TrainingCalendar, tour: { step: 4, titleEn: 'Training Calendar', titleAr: 'تقويم التدريب', contentEn: 'Plan and schedule training sessions.', contentAr: 'تخطيط وجدولة جلسات التدريب.' } },
    { name: t('trainingDevelopment.tabs.trainingModules'), icon: BookOpenIcon, component: TrainingModules, tour: { step: 5, titleEn: 'Training Modules', titleAr: 'وحدات التدريب', contentEn: 'Browse modules and assign learning.', contentAr: 'تصفح الوحدات وتعيين التعلم.' } },
    { name: t('trainingDevelopment.tabs.onboardingPrograms'), icon: UserGroupIcon, component: OnboardingPrograms, tour: { step: 6, titleEn: 'Onboarding Programs', titleAr: 'برامج الإعداد', contentEn: 'Design onboarding paths for roles.', contentAr: 'تصميم مسارات الإعداد للأدوار.' } },
    { name: t('trainingDevelopment.tabs.skillGapAnalysis'), icon: ChartBarIcon, component: SkillGapAnalysis, tour: { step: 7, titleEn: 'Skill Gap Analysis', titleAr: 'تحليل فجوات المهارات', contentEn: 'Analyze skills and recommend training.', contentAr: 'تحليل المهارات والتوصية بالتدريب.' } },
    { name: t('trainingDevelopment.tabs.progressTracking'), icon: AcademicCapIcon, component: ProgressTracking, tour: { step: 8, titleEn: 'Progress Tracking', titleAr: 'تتبع التقدم', contentEn: 'Track completions, scores, and badges.', contentAr: 'تتبع الإكمال والدرجات والشارات.' } },
    { name: t('trainingDevelopment.tabs.trainerManagement'), icon: UserIcon, component: TrainerManagement, tour: { step: 9, titleEn: 'Trainer Management', titleAr: 'إدارة المدربين', contentEn: 'Manage trainers and workloads.', contentAr: 'إدارة المدربين وأعباء العمل.' } },
    { name: t('trainingDevelopment.tabs.trainingFeedback'), icon: ChatBubbleLeftRightIcon, component: TrainingFeedback, tour: { step: 10, titleEn: 'Feedback & Evaluation', titleAr: 'التغذية الراجعة والتقييم', contentEn: 'Collect feedback and evaluate impact.', contentAr: 'جمع التغذية الراجعة وتقييم الأثر.' } },
    { name: t('trainingDevelopment.tabs.knowledgeHub'), icon: BookmarkIcon, component: KnowledgeHub, tour: { step: 11, titleEn: 'Knowledge Hub', titleAr: 'مركز المعرفة', contentEn: 'Access learning resources and guides.', contentAr: 'الوصول إلى الموارد والأدلة.' } },
    { name: t('trainingDevelopment.tabs.gamification'), icon: TrophyIcon, component: Gamification, tour: { step: 12, titleEn: 'Gamification', titleAr: 'اللعبية', contentEn: 'Badges, leaderboards, and rewards.', contentAr: 'شارات، لوحات الصدارة والمكافآت.' } },
  ];

  return (
    <div className="space-y-6" 
         data-tour="1" 
         data-tour-title-en="Training & Development Overview" 
         data-tour-title-ar="نظرة عامة على التدريب والتطوير" 
         data-tour-content-en="Header, tabs, calendar, modules, onboarding, skill gaps, progress, trainers, feedback, knowledge hub, and gamification." 
         data-tour-content-ar="الرأس، علامات التبويب، التقويم، الوحدات، الإعداد، فجوات المهارات، التقدم، المدربون، التغذية، مركز المعرفة واللعبية.">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white" 
           data-tour="2" 
           data-tour-title-en="Header" 
           data-tour-title-ar="الرأس" 
           data-tour-content-en="Module title and AI insights." 
           data-tour-content-ar="عنوان الوحدة ورؤى الذكاء.">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold mb-2">{t('trainingDevelopment.title')}</h2>
            <p className="text-blue-100 text-lg">{t('trainingDevelopment.subtitle')}</p>
          </div>
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3">
            <SparklesIcon className="w-6 h-6 text-yellow-300" />
            <span className="text-sm font-medium">{t('trainingDevelopment.aiPoweredInsights')}</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden" 
           data-tour="3" 
           data-tour-title-en="Tabs" 
           data-tour-title-ar="علامات التبويب" 
           data-tour-content-en="Navigate through training sections." 
           data-tour-content-ar="التنقل بين أقسام التدريب.">
        <nav className="flex space-x-1 overflow-x-auto p-2">
          {tabs.map((tab, index) => (
            <button
              key={tab.name}
              onClick={() => setSelectedTab(index)}
              className={`
                flex items-center gap-2 px-4 py-3 rounded-lg font-medium text-sm transition-all duration-200 whitespace-nowrap
                ${selectedTab === index
                  ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                }
              `}
            >
              <tab.icon className="w-5 h-5" />
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden" 
           data-tour={tabs[selectedTab].tour.step} 
           data-tour-title-en={tabs[selectedTab].tour.titleEn} 
           data-tour-title-ar={tabs[selectedTab].tour.titleAr} 
           data-tour-content-en={tabs[selectedTab].tour.contentEn} 
           data-tour-content-ar={tabs[selectedTab].tour.contentAr}>
        {React.createElement(tabs[selectedTab].component)}
      </div>
    </div>
  );
};

export default TrainingDevelopment;