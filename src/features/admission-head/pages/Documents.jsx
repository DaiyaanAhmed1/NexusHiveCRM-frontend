import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalization } from '../../../hooks/useLocalization';
import { FiFileText, FiCheckCircle, FiXCircle, FiUpload, FiDownload, FiSearch, FiFilter, FiUser, FiUsers, FiAlertCircle, FiZap, FiPlus, FiEdit2, FiTrash2, FiChevronDown, FiChevronUp, FiLock, FiKey, FiEye, FiEyeOff, FiClock, FiBarChart2, FiPieChart, FiCpu, FiTarget } from 'react-icons/fi';
import AdmissionHeadDocumentVerification from '../components/ai/AdmissionHeadDocumentVerification';

// Mock data
const mockApplicants = [
  { id: 'A001', name: 'Abdullah Al-Rashid', dept: 'Engineering', status: 'Confirmed' },
  { id: 'A002', name: 'Sara Khan', dept: 'Business', status: 'Pending' },
  { id: 'A003', name: 'Carlos Martinez', dept: 'Engineering', status: 'Rejected' },
];
const docTypes = [
  'Application Form', 'ID Proof', '10th Marksheet', '12th Marksheet', 'UG Marksheet', 'Transfer Certificate', 'Caste Certificate', 'Photo', 'Signature', 'Scorecard'
];
const mockDocs = [
  { id: 1, applicant: mockApplicants[0], type: 'ID Proof', status: 'Verified', file: 'id_a001.pdf', uploaded: true, verified: true, rejected: false },
  { id: 2, applicant: mockApplicants[0], type: '10th Marksheet', status: 'Pending', file: '', uploaded: false, verified: false, rejected: false },
  { id: 3, applicant: mockApplicants[1], type: 'Application Form', status: 'Uploaded', file: 'form_a002.pdf', uploaded: true, verified: false, rejected: false },
  { id: 4, applicant: mockApplicants[2], type: 'Photo', status: 'Rejected', file: 'photo_a003.jpg', uploaded: true, verified: false, rejected: true },
];
const mockTemplates = [
  { id: 1, name: 'Admission Form', file: 'admission_form.pdf', version: 'v2', expires: '2025-06-01', downloads: 120 },
  { id: 2, name: 'Hostel Form', file: 'hostel_form.pdf', version: 'v1', expires: '2025-06-01', downloads: 80 },
];
const mockArchive = [
  { id: 1, applicant: mockApplicants[0], doc: 'form_a001.pdf', date: '2024-06-10', access: 2 },
];

export default function Documents() {
  const { t, i18n, ready } = useTranslation(['admission', 'common']);
  const { isRTL, isRTLMode } = useLocalization();
  const [languageVersion, setLanguageVersion] = useState(0);
  
  // AI State Variables
  const [showDocumentVerification, setShowDocumentVerification] = useState(false);
  const [selectedDocumentForAI, setSelectedDocumentForAI] = useState(null);
  const [aiVerificationResults, setAiVerificationResults] = useState(null);
  
  // State
  const [docs, setDocs] = useState(mockDocs);
  const [templates, setTemplates] = useState(mockTemplates);
  const [archive, setArchive] = useState(mockArchive);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showAuditModal, setShowAuditModal] = useState(false);
  const [toast, setToast] = useState(null);

  // AI Functions
  const handleDocumentVerification = (document) => {
    setSelectedDocumentForAI(document);
    setShowDocumentVerification(true);
  };

  const handleAIVerificationComplete = (results) => {
    setAiVerificationResults(results);
    console.log('AI Verification Results:', results);
    setToast(isRTLMode ? 'تم تحليل الوثيقة بالذكاء الاصطناعي بنجاح' : 'Document analyzed by AI successfully');
  };

  // Language change handler
  useEffect(() => {
    const handleLanguageChange = () => {
      setLanguageVersion(prev => prev + 1);
    };
    i18n.on('languageChanged', handleLanguageChange);
    return () => { i18n.off('languageChanged', handleLanguageChange); };
  }, [i18n]);

  if (!ready) {
    return <div className="flex items-center justify-center h-64">{t('common.loading')}</div>;
  }

  // Dashboard metrics
  const totalDocs = docs.length;
  const pendingVerif = docs.filter(d => d.status === 'Pending').length;
  const awaitingUpload = docs.filter(d => !d.uploaded).length;
  const expired = docs.filter(d => d.status === 'Rejected').length;
  const deptWise = mockApplicants.reduce((acc, a) => { acc[a.dept] = (acc[a.dept] || 0) + docs.filter(d => d.applicant.id === a.id).length; return acc; }, {});
  const completionRate = Math.round((docs.filter(d => d.status === 'Verified').length / (mockApplicants.length * docTypes.length)) * 100);

  // Toast
  useEffect(() => { if (toast) { const timeout = setTimeout(() => setToast(null), 2000); return () => clearTimeout(timeout); } }, [toast]);

  return (
    <div
      key={`${i18n.language}-${languageVersion}`}
      className="min-h-screen bg-gray-50 dark:bg-gray-900"
      data-tour="1"
      data-tour-title-en="Documents Overview"
      data-tour-title-ar="نظرة عامة على الوثائق"
      data-tour-content-en="KPIs, repository, upload portal, verification, bulk review, requests, templates, archive, access, and AI."
      data-tour-content-ar="المؤشرات، المستودع، بوابة الرفع، التحقق، المراجعة الجماعية، الطلبات، القوالب، الأرشيف، الوصول والذكاء."
      data-tour-position="bottom"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8" 
             data-tour="2" 
             data-tour-title-en="Page Title" 
             data-tour-title-ar="عنوان الصفحة" 
             data-tour-content-en="Documents & Verification for admissions." 
             data-tour-content-ar="الوثائق والتحقق للقبول.">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl p-8 text-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <FiFileText className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold">
                {t('documents.title')}
              </h1>
            </div>
            <p className="text-emerald-100 text-lg">
              {t('documents.subtitle')}
            </p>
          </div>
        </div>
        
        {/* Document Dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8" 
             data-tour="3" 
             data-tour-title-en="KPIs" 
             data-tour-title-ar="المؤشرات" 
             data-tour-content-en="Totals, pending, awaiting uploads, invalid, department-wise, completion rate." 
             data-tour-content-ar="الإجمالي، المعلّق، بانتظار الرفع، غير الصالح، حسب القسم، ومعدل الإكمال.">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 flex flex-col items-center gap-1 border border-gray-200 dark:border-gray-700">
            <FiFileText className="text-blue-500 mb-1" size={22} />
            <span className="text-xs text-gray-500 dark:text-gray-400">{t('documents.dashboard.totalUploaded')}</span>
            <span className="text-2xl font-bold text-blue-700 dark:text-blue-300">{totalDocs}</span>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 flex flex-col items-center gap-1 border border-gray-200 dark:border-gray-700">
            <FiCheckCircle className="text-yellow-500 mb-1" size={22} />
            <span className="text-xs text-gray-500 dark:text-gray-400">{t('documents.dashboard.pendingVerification')}</span>
            <span className="text-2xl font-bold text-yellow-700 dark:text-yellow-300">{pendingVerif}</span>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 flex flex-col items-center gap-1 border border-gray-200 dark:border-gray-700">
            <FiUpload className="text-green-500 mb-1" size={22} />
            <span className="text-xs text-gray-500 dark:text-gray-400">{t('documents.dashboard.awaitingUpload')}</span>
            <span className="text-2xl font-bold text-green-700 dark:text-green-300">{awaitingUpload}</span>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 flex flex-col items-center gap-1 border border-gray-200 dark:border-gray-700">
            <FiXCircle className="text-red-500 mb-1" size={22} />
            <span className="text-xs text-gray-500 dark:text-gray-400">{t('documents.dashboard.expiredInvalid')}</span>
            <span className="text-2xl font-bold text-red-700 dark:text-red-300">{expired}</span>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 flex flex-col items-center gap-1 border border-gray-200 dark:border-gray-700">
            <FiBarChart2 className="text-purple-500 mb-1" size={22} />
            <span className="text-xs text-gray-500 dark:text-gray-400">{t('documents.dashboard.deptWise')}</span>
            <span className="text-2xl font-bold text-purple-700 dark:text-purple-300">{Object.keys(deptWise).length}</span>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 flex flex-col items-center gap-1 border border-gray-200 dark:border-gray-700">
            <FiPieChart className="text-pink-500 mb-1" size={22} />
            <span className="text-xs text-gray-500 dark:text-gray-400">{t('documents.dashboard.completionRate')}</span>
            <span className="text-2xl font-bold text-pink-700 dark:text-pink-300">{completionRate}%</span>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="flex flex-wrap gap-3 mb-8" 
             data-tour="4" 
             data-tour-title-en="Quick Actions" 
             data-tour-title-ar="إجراءات سريعة" 
             data-tour-content-en="Upload, request missing, view by status, and AI completion." 
             data-tour-content-ar="رفع، طلب المفقود، عرض حسب الحالة، وإكمال بالذكاء.">
          <button 
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold shadow bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/30 transition-colors" 
            onClick={() => setShowUploadModal(true)}
          >
            <FiUpload className="w-4 h-4" />
            {t('documents.quickActions.uploadDocument')}
          </button>
          <button 
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold shadow bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400 hover:bg-yellow-200 dark:hover:bg-yellow-900/30 transition-colors" 
            onClick={() => setShowRequestModal(true)}
          >
            <FiAlertCircle className="w-4 h-4" />
            {t('documents.quickActions.requestMissing')}
          </button>
          <button 
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold shadow bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/30 transition-colors" 
            onClick={() => setShowBulkModal(true)}
          >
            <FiCheckCircle className="w-4 h-4" />
            {t('documents.quickActions.viewByStatus')}
          </button>
          <button 
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold shadow bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400 hover:bg-purple-200 dark:hover:bg-purple-900/30 transition-colors" 
            onClick={() => setShowDocumentVerification(true)}
          >
            <FiCpu className="w-4 h-4" />
            {isRTLMode ? 'التحقق الذكي من الوثائق' : 'AI Document Verification'}
          </button>
        </div>
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Applicant Document Repository */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700" 
               data-tour="5" 
               data-tour-title-en="Repository" 
               data-tour-title-ar="المستودع" 
               data-tour-content-en="Search, filter, and take actions on applicant documents." 
               data-tour-content-ar="البحث والفلترة واتخاذ الإجراءات على وثائق المتقدمين.">
            <div className="flex flex-col gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/20 rounded-lg flex items-center justify-center">
                  <FiFileText className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {t('documents.sections.applicantDocumentRepository')}
                </h2>
              </div>
              <div className="flex gap-2">
                <input 
                  className="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent" 
                  placeholder={t('documents.search.placeholder')} 
                />
                <select className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                  <option>{t('documents.search.allDepartments')}</option>
                </select>
                <select className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                  <option>{t('documents.search.allStatus')}</option>
                </select>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700">
                    <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">{t('documents.table.headers.applicant')}</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">{t('documents.table.headers.document')}</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">{t('documents.table.headers.status')}</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">{t('documents.table.headers.file')}</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">{t('documents.table.headers.action')}</th>
                  </tr>
                </thead>
                <tbody>
                  {docs.map(d => (
                    <tr key={d.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors border-b border-gray-200 dark:border-gray-700">
                      <td className="px-4 py-3 text-gray-900 dark:text-white">
                        {d.applicant.name} 
                        <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">({d.applicant.id})</span>
                      </td>
                      <td className="px-4 py-3 text-gray-900 dark:text-white">{d.type}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          d.status === 'Verified' 
                            ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400' 
                            : d.status === 'Pending' 
                            ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400' 
                            : d.status === 'Rejected' 
                            ? 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400' 
                            : d.status === 'Uploaded' 
                            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400' 
                            : ''
                        }`}>
                          {d.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {d.file ? (
                          <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-semibold transition-colors">
                            {t('documents.table.actions.download')}
                          </button>
                        ) : '-'}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 font-semibold transition-colors text-xs">
                            {t('documents.table.actions.approve')}
                          </button>
                          <button className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 font-semibold transition-colors text-xs">
                            {t('documents.table.actions.reject')}
                          </button>
                          <button className="text-yellow-600 hover:text-yellow-800 dark:text-yellow-400 dark:hover:text-yellow-300 font-semibold transition-colors text-xs">
                            {t('documents.table.actions.requestReupload')}
                          </button>
                          <button 
                            className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 font-semibold transition-colors text-xs"
                            onClick={() => handleDocumentVerification(d)}
                          >
                            <FiCpu className="inline w-3 h-3 mr-1" />
                            {isRTLMode ? 'تحقق ذكي' : 'AI Verify'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Document Upload Portal */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700" 
               data-tour="6" 
               data-tour-title-en="Upload Portal" 
               data-tour-title-ar="بوابة الرفع" 
               data-tour-content-en="Upload single or bulk, set deadlines." 
               data-tour-content-ar="رفع فردي أو جماعي، وتحديد المهل.">
            <div className="flex flex-col gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/20 rounded-lg flex items-center justify-center">
                  <FiUpload className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {t('documents.sections.documentUploadPortal')}
                </h2>
              </div>
              <button 
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors w-fit" 
                onClick={() => setShowUploadModal(true)}
              >
                <FiUpload className="inline mr-1" />
                {t('documents.upload.title')}
              </button>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              {t('documents.upload.description')}
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors">
                {t('documents.upload.bulkUpload')}
              </button>
              <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                {t('documents.upload.setDeadline')}
              </button>
            </div>
          </div>
        </div>

        {/* Additional Sections Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Verification & Validation */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700" 
               data-tour="7" 
               data-tour-title-en="Verification" 
               data-tour-title-ar="التحقق" 
               data-tour-content-en="Approve, reject, audit logs, and bulk actions." 
               data-tour-content-ar="الموافقة، الرفض، سجلات التدقيق والإجراءات الجماعية.">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/20 rounded-lg flex items-center justify-center">
                <FiCheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {t('documents.sections.verificationValidation')}
              </h2>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              {t('documents.verification.description')}
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors">
                {t('documents.verification.bulkApprove')}
              </button>
              <button className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors">
                {t('documents.verification.bulkReject')}
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                {t('documents.verification.auditLog')}
              </button>
            </div>
          </div>

          {/* Document Request System */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700" 
               data-tour="9" 
               data-tour-title-en="Requests" 
               data-tour-title-ar="الطلبات" 
               data-tour-content-en="Request missing documents from applicants." 
               data-tour-content-ar="طلب المستندات المفقودة من المتقدمين.">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/20 rounded-lg flex items-center justify-center">
                <FiAlertCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {t('documents.sections.documentRequestSystem')}
              </h2>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              {t('documents.requestSystem.description')}
            </div>
            <button 
              className="px-4 py-2 bg-yellow-600 text-white rounded-lg font-semibold hover:bg-yellow-700 transition-colors" 
              onClick={() => setShowRequestModal(true)}
            >
              <FiAlertCircle className="inline mr-1" />
              {t('documents.requestSystem.request')}
            </button>
          </div>
        </div>

        {/* Templates & Forms Library */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-200 dark:border-gray-700" 
             data-tour="10" 
             data-tour-title-en="Templates Library" 
             data-tour-title-ar="مكتبة القوالب" 
             data-tour-content-en="Manage downloadable templates and forms." 
             data-tour-content-ar="إدارة القوالب والنماذج القابلة للتنزيل.">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/20 rounded-lg flex items-center justify-center">
                <FiFileText className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {t('documents.sections.templatesFormsLibrary')}
              </h2>
            </div>
            <button 
              className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors" 
              onClick={() => setShowTemplateModal(true)}
            >
              <FiPlus className="inline mr-1" />
              {t('documents.templates.upload')}
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700">
                  <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">{t('documents.table.headers.name')}</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">{t('documents.table.headers.file')}</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">{t('documents.table.headers.version')}</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">{t('documents.table.headers.expires')}</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">{t('documents.table.headers.downloads')}</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">{t('documents.table.headers.action')}</th>
                </tr>
              </thead>
              <tbody>
                {templates.map(template => (
                  <tr key={template.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors border-b border-gray-200 dark:border-gray-700">
                    <td className="px-4 py-3 text-gray-900 dark:text-white">{template.name}</td>
                    <td className="px-4 py-3 text-gray-900 dark:text-white">{template.file}</td>
                    <td className="px-4 py-3 text-gray-900 dark:text-white">{template.version}</td>
                    <td className="px-4 py-3 text-gray-900 dark:text-white">{template.expires}</td>
                    <td className="px-4 py-3 text-gray-900 dark:text-white">{template.downloads}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-semibold transition-colors text-xs">
                          {t('documents.table.actions.download')}
                        </button>
                        <button className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 font-semibold transition-colors text-xs">
                          {t('documents.table.actions.delete')}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI & Smart Features */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg p-6 mb-8 border border-purple-200 dark:border-purple-800" 
             data-tour="13" 
             data-tour-title-en="AI Features" 
             data-tour-title-ar="ميزات الذكاء" 
             data-tour-content-en="OCR, duplicate detection, reminders, risk flags, completion analytics." 
             data-tour-content-ar="التعرّف البصري، اكتشاف التكرار، التذكيرات، أعلام المخاطر، تحليلات الإكمال.">
          <div className="flex items-center gap-3 mb-6">
            <FiZap className="text-purple-500 animate-pulse w-6 h-6" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {t('documents.sections.aiSmartFeatures')}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 bg-blue-100 dark:bg-blue-900/20 px-4 py-3 rounded-lg">
              <FiSearch className="text-blue-500 w-5 h-5" />
              <span className="font-medium text-blue-800 dark:text-blue-200">{t('documents.aiFeatures.ocrAutoTagging')}</span>
            </div>
            <div className="flex items-center gap-3 bg-yellow-100 dark:bg-yellow-900/20 px-4 py-3 rounded-lg">
              <FiAlertCircle className="text-yellow-500 w-5 h-5" />
              <span className="font-medium text-yellow-800 dark:text-yellow-200">{t('documents.aiFeatures.duplicateDetection')}</span>
            </div>
            <div className="flex items-center gap-3 bg-pink-100 dark:bg-pink-900/20 px-4 py-3 rounded-lg">
              <FiClock className="text-pink-500 w-5 h-5" />
              <span className="font-medium text-pink-800 dark:text-pink-200">{t('documents.aiFeatures.smartReminders')}</span>
            </div>
            <div className="flex items-center gap-3 bg-red-100 dark:bg-red-900/20 px-4 py-3 rounded-lg">
              <FiAlertCircle className="text-red-500 w-5 h-5" />
              <span className="font-medium text-red-800 dark:text-red-200">{t('documents.aiFeatures.riskFlagging')}</span>
            </div>
            <div className="flex items-center gap-3 bg-green-100 dark:bg-green-900/20 px-4 py-3 rounded-lg">
              <FiPieChart className="text-green-500 w-5 h-5" />
              <span className="font-medium text-green-800 dark:text-green-200">{t('documents.aiFeatures.completionAnalytics')}</span>
            </div>
          </div>
        </div>

        {/* AI Document Verification Modal */}
        {showDocumentVerification && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 w-full max-w-6xl max-h-[80vh] overflow-y-auto border border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {isRTLMode ? 'التحقق الذكي من الوثائق' : 'AI Document Verification'}
                </h3>
                <button
                  onClick={() => setShowDocumentVerification(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <FiXCircle className="w-6 h-6" />
                </button>
              </div>
              <AdmissionHeadDocumentVerification
                onVerificationComplete={handleAIVerificationComplete}
              />
            </div>
          </div>
        )}

        {/* Toast */}
        {toast && (
          <div className="fixed bottom-6 right-6 bg-emerald-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in">
            {toast}
          </div>
        )}
      </div>
    </div>
  );
}