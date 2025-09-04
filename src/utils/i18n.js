import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import all locale files
import enCommon from '../locales/en/common.json';
import enNavigation from '../locales/en/navigation.json';
import enForms from '../locales/en/forms.json';
import enMessages from '../locales/en/messages.json';
import enValidation from '../locales/en/validation.json';
// import enErrors from '../locales/en/errors.json';
import enDashboard from '../locales/en/dashboard.json';
import enAdmission from '../locales/en/admission.json';
import enMarketing from '../locales/en/marketing.json';

import enHR from '../locales/en/hr.json';
import enDirector from '../locales/en/director.json';
import enAdmin from '../locales/en/admin.json';
import enStudent from '../locales/en/student.json';
import enProfessor from '../locales/en/professor.json';
import enParent from '../locales/en/parent.json';
import enSettings from '../locales/en/settings.json';
import enAuth from '../locales/en/auth.json';
import enUniversity from '../locales/en/university.json';

import arCommon from '../locales/ar/common.json';
import arNavigation from '../locales/ar/navigation.json';
import arForms from '../locales/ar/forms.json';
import arMessages from '../locales/ar/messages.json';
import arValidation from '../locales/ar/validation.json';
// import arErrors from '../locales/ar/errors.json';
import arDashboard from '../locales/ar/dashboard.json';
import arAdmission from '../locales/ar/admission.json';
import arMarketing from '../locales/ar/marketing.json';

import arHR from '../locales/ar/hr.json';
import arDirector from '../locales/ar/director.json';
import arAdmin from '../locales/ar/admin.json';
import arStudent from '../locales/ar/student.json';
import arProfessor from '../locales/ar/professor.json';
import arParent from '../locales/ar/parent.json';
import arSettings from '../locales/ar/settings.json';
import arAuth from '../locales/ar/auth.json';
import arUniversity from '../locales/ar/university.json';

const resources = {
  en: {
    common: enCommon,
    navigation: enNavigation,
    forms: enForms,
    messages: enMessages,
    validation: enValidation,
    // errors: enErrors,
    dashboard: enDashboard,
    admission: enAdmission,
    marketing: enMarketing,
    
    hr: enHR,
    director: enDirector,
    admin: enAdmin,
    student: enStudent,
    professor: enProfessor,
    parent: enParent,
    settings: enSettings,
    auth: enAuth,
    university: enUniversity,
  },
  ar: {
    common: arCommon,
    navigation: arNavigation,
    forms: arForms,
    messages: arMessages,
    validation: arValidation,
    // errors: arErrors,
    dashboard: arDashboard,
    admission: arAdmission,
    marketing: arMarketing,
    
    hr: arHR,
    director: arDirector,
    admin: arAdmin,
    student: arStudent,
    professor: arProfessor,
    parent: arParent,
    settings: arSettings,
    auth: arAuth,
    university: arUniversity,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    
    interpolation: {
      escapeValue: false,
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
    
    ns: [
      'common', 'navigation', 'forms', 'messages', 'validation',
                    'dashboard', 'admission', 'marketing', 'hr', 'director', 'admin',
      'student', 'professor', 'parent', 'settings', 'auth', 'university'
    ],
    defaultNS: 'common',
  });

export default i18n; 