import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FiFileText, FiCheckCircle, FiXCircle, FiUpload, FiDownload, FiSearch, FiFilter, FiUser, FiUsers, FiAlertCircle, FiZap, FiPlus, FiEdit2, FiTrash2, FiChevronDown, FiChevronUp, FiLock, FiKey, FiEye, FiEyeOff, FiClock, FiBarChart2, FiPieChart } from 'react-icons/fi';

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
  const { t, i18n, ready } = useTranslation(['admission'], { useSuspense: false });
  const [languageVersion, setLanguageVersion] = useState(0);
  
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
    <div key={`${i18n.language}-${languageVersion}`} className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 dark:from-gray-900 dark:to-gray-950 p-6 animate-fade-in">
      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8 tracking-tight">
        {t('documents.title')}
      </h1>
      
      {/* Document Dashboard */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl p-4 flex flex-col items-center gap-1">
          <FiFileText className="text-blue-500 mb-1" size={22} />
          <span className="text-xs text-gray-500">{t('documents.dashboard.totalUploaded')}</span>
          <span className="text-2xl font-bold text-blue-700 dark:text-blue-300">{totalDocs}</span>
        </div>
        <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl p-4 flex flex-col items-center gap-1">
          <FiCheckCircle className="text-yellow-500 mb-1" size={22} />
          <span className="text-xs text-gray-500">{t('documents.dashboard.pendingVerification')}</span>
          <span className="text-2xl font-bold text-yellow-700 dark:text-yellow-300">{pendingVerif}</span>
        </div>
        <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl p-4 flex flex-col items-center gap-1">
          <FiUpload className="text-green-500 mb-1" size={22} />
          <span className="text-xs text-gray-500">{t('documents.dashboard.awaitingUpload')}</span>
          <span className="text-2xl font-bold text-green-700 dark:text-green-300">{awaitingUpload}</span>
        </div>
        <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl p-4 flex flex-col items-center gap-1">
          <FiXCircle className="text-red-500 mb-1" size={22} />
          <span className="text-xs text-gray-500">{t('documents.dashboard.expiredInvalid')}</span>
          <span className="text-2xl font-bold text-red-700 dark:text-red-300">{expired}</span>
        </div>
        <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl p-4 flex flex-col items-center gap-1">
          <FiBarChart2 className="text-purple-500 mb-1" size={22} />
          <span className="text-xs text-gray-500">{t('documents.dashboard.deptWise')}</span>
          <span className="text-2xl font-bold text-purple-700 dark:text-purple-300">{Object.keys(deptWise).length}</span>
        </div>
        <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl p-4 flex flex-col items-center gap-1">
          <FiPieChart className="text-pink-500 mb-1" size={22} />
          <span className="text-xs text-gray-500">{t('documents.dashboard.completionRate')}</span>
          <span className="text-2xl font-bold text-pink-700 dark:text-pink-300">{completionRate}%</span>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3 mb-8">
        <button className="flex items-center gap-2 px-4 py-2 rounded-full font-semibold shadow bg-blue-100 text-blue-700 hover:scale-105 transition-transform" onClick={() => setShowUploadModal(true)}><FiUpload />{t('documents.quickActions.uploadDocument')}</button>
        <button className="flex items-center gap-2 px-4 py-2 rounded-full font-semibold shadow bg-yellow-100 text-yellow-700 hover:scale-105 transition-transform" onClick={() => setShowRequestModal(true)}><FiAlertCircle />{t('documents.quickActions.requestMissing')}</button>
        <button className="flex items-center gap-2 px-4 py-2 rounded-full font-semibold shadow bg-green-100 text-green-700 hover:scale-105 transition-transform" onClick={() => setShowBulkModal(true)}><FiCheckCircle />{t('documents.quickActions.viewByStatus')}</button>
        <span className="flex items-center gap-2 px-4 py-2 rounded-full font-semibold shadow bg-pink-100 text-pink-700"><FiZap />{t('documents.quickActions.aiCompletion')}</span>
      </div>
      
      {/* Applicant Document Repository */}
      <div className="bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-xl p-6 mb-10 animate-fade-in">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
          <h2 className="text-xl font-bold text-gray-700 dark:text-gray-200">{t('documents.sections.applicantDocumentRepository')}</h2>
          <div className="flex gap-2">
            <input className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white" placeholder={t('documents.search.placeholder')} />
            <select className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"><option>{t('documents.search.allDepartments')}</option></select>
            <select className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"><option>{t('documents.search.allStatus')}</option></select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700">
                <th className="px-4 py-2 text-left font-semibold">{t('documents.table.headers.applicant')}</th>
                <th className="px-4 py-2 text-left font-semibold">{t('documents.table.headers.document')}</th>
                <th className="px-4 py-2 text-left font-semibold">{t('documents.table.headers.status')}</th>
                <th className="px-4 py-2 text-left font-semibold">{t('documents.table.headers.file')}</th>
                <th className="px-4 py-2 text-left font-semibold">{t('documents.table.headers.action')}</th>
              </tr>
            </thead>
            <tbody>
              {docs.map(d => (
                <tr key={d.id} className="hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                  <td className="px-4 py-2">{d.applicant.name} <span className="text-xs text-gray-400">({d.applicant.id})</span></td>
                  <td className="px-4 py-2">{d.type}</td>
                  <td className="px-4 py-2"><span className={`px-2 py-1 rounded-full text-xs font-semibold ${d.status === 'Verified' ? 'bg-green-100 text-green-700' : d.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : d.status === 'Rejected' ? 'bg-red-100 text-red-700' : d.status === 'Uploaded' ? 'bg-blue-100 text-blue-700' : ''}`}>{d.status}</span></td>
                  <td className="px-4 py-2">{d.file ? <button className="text-blue-600 hover:underline font-semibold transition-colors">{t('documents.table.actions.download')}</button> : '-'}</td>
                  <td className="px-4 py-2">
                    <button className="text-green-600 hover:underline font-semibold transition-colors mr-2">{t('documents.table.actions.approve')}</button>
                    <button className="text-red-600 hover:underline font-semibold transition-colors mr-2">{t('documents.table.actions.reject')}</button>
                    <button className="text-yellow-600 hover:underline font-semibold transition-colors">{t('documents.table.actions.requestReupload')}</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Document Upload Portal */}
      <div className="bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-xl p-6 mb-10 animate-fade-in">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
          <h2 className="text-xl font-bold text-gray-700 dark:text-gray-200">{t('documents.sections.documentUploadPortal')}</h2>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold" onClick={() => setShowUploadModal(true)}><FiUpload className="inline mr-1" />{t('documents.upload.title')}</button>
        </div>
        <div className="text-xs text-gray-500 mb-2">{t('documents.upload.description')}</div>
        <div className="flex gap-2 mt-2">
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold">{t('documents.upload.bulkUpload')}</button>
          <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg font-semibold">{t('documents.upload.setDeadline')}</button>
        </div>
      </div>
      
      {/* Verification & Validation */}
      <div className="bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-xl p-6 mb-10 animate-fade-in">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
          <h2 className="text-xl font-bold text-gray-700 dark:text-gray-200">{t('documents.sections.verificationValidation')}</h2>
        </div>
        <div className="text-xs text-gray-500 mb-2">{t('documents.verification.description')}</div>
        <div className="flex gap-2 mt-2">
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold">{t('documents.verification.bulkApprove')}</button>
          <button className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold">{t('documents.verification.bulkReject')}</button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold">{t('documents.verification.auditLog')}</button>
        </div>
      </div>
      
      {/* Bulk Document Review & Actions */}
      <div className="bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-xl p-6 mb-10 animate-fade-in">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
          <h2 className="text-xl font-bold text-gray-700 dark:text-gray-200">{t('documents.sections.bulkDocumentReview')}</h2>
        </div>
        <div className="text-xs text-gray-500 mb-2">{t('documents.bulkReview.description')}</div>
        <div className="flex gap-2 mt-2">
          <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg font-semibold">{t('documents.bulkReview.sendReminders')}</button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold">{t('documents.bulkReview.exportExcel')}</button>
        </div>
      </div>
      
      {/* Document Request System */}
      <div className="bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-xl p-6 mb-10 animate-fade-in">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
          <h2 className="text-xl font-bold text-gray-700 dark:text-gray-200">{t('documents.sections.documentRequestSystem')}</h2>
          <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg font-semibold" onClick={() => setShowRequestModal(true)}><FiAlertCircle className="inline mr-1" />{t('documents.requestSystem.request')}</button>
        </div>
        <div className="text-xs text-gray-500 mb-2">{t('documents.requestSystem.description')}</div>
      </div>
      
      {/* Templates & Forms Library */}
      <div className="bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-xl p-6 mb-10 animate-fade-in">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
          <h2 className="text-xl font-bold text-gray-700 dark:text-gray-200">{t('documents.sections.templatesFormsLibrary')}</h2>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold" onClick={() => setShowTemplateModal(true)}><FiPlus className="inline mr-1" />{t('documents.templates.upload')}</button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700">
                <th className="px-4 py-2 text-left font-semibold">{t('documents.table.headers.name')}</th>
                <th className="px-4 py-2 text-left font-semibold">{t('documents.table.headers.file')}</th>
                <th className="px-4 py-2 text-left font-semibold">{t('documents.table.headers.version')}</th>
                <th className="px-4 py-2 text-left font-semibold">{t('documents.table.headers.expires')}</th>
                <th className="px-4 py-2 text-left font-semibold">{t('documents.table.headers.downloads')}</th>
                <th className="px-4 py-2 text-left font-semibold">{t('documents.table.headers.action')}</th>
              </tr>
            </thead>
            <tbody>
              {templates.map(template => (
                <tr key={template.id} className="hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                  <td className="px-4 py-2">{template.name}</td>
                  <td className="px-4 py-2">{template.file}</td>
                  <td className="px-4 py-2">{template.version}</td>
                  <td className="px-4 py-2">{template.expires}</td>
                  <td className="px-4 py-2">{template.downloads}</td>
                  <td className="px-4 py-2">
                    <button className="text-blue-600 hover:underline font-semibold transition-colors mr-2">{t('documents.table.actions.download')}</button>
                    <button className="text-red-600 hover:underline font-semibold transition-colors">{t('documents.table.actions.delete')}</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Archive & Retention Management */}
      <div className="bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-xl p-6 mb-10 animate-fade-in">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
          <h2 className="text-xl font-bold text-gray-700 dark:text-gray-200">{t('documents.sections.archiveRetentionManagement')}</h2>
        </div>
        <div className="flex flex-col gap-2">
          {archive.map(a => (
            <div key={a.id} className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
              <span className="font-semibold text-gray-700 dark:text-gray-200">{a.applicant.name}</span>
              <span className="text-xs text-gray-500">{a.doc}</span>
              <span className="text-xs text-gray-500">{a.date}</span>
              <span className="text-xs text-blue-500">{t('documents.archive.access')}: {a.access}</span>
            </div>
          ))}
        </div>
        <div className="mt-2 text-xs text-gray-500">{t('documents.archive.retention')}</div>
      </div>
      
      {/* Access Control & Permissions */}
      <div className="bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-xl p-6 mb-10 animate-fade-in">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
          <h2 className="text-xl font-bold text-gray-700 dark:text-gray-200">{t('documents.sections.accessControlPermissions')}</h2>
        </div>
        <div className="flex flex-wrap gap-2 mb-2">
          <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs">{t('documents.accessControl.view')}</span>
          <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs">{t('documents.accessControl.upload')}</span>
          <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full text-xs">{t('documents.accessControl.approve')}</span>
          <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded-full text-xs">{t('documents.accessControl.delete')}</span>
          <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full text-xs">{t('documents.accessControl.download')}</span>
        </div>
        <div className="flex gap-2 mt-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold"><FiLock className="inline mr-1" />{t('documents.accessControl.encryption')}</button>
          <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg font-semibold"><FiKey className="inline mr-1" />{t('documents.accessControl.accessLogs')}</button>
        </div>
      </div>
      
      {/* AI & Smart Features */}
      <div className="bg-gradient-to-br from-yellow-50 to-pink-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-6 flex flex-col gap-4 mb-8 animate-fade-in">
        <div className="flex items-center gap-2 mb-2">
          <FiZap className="text-pink-500 animate-pulse" size={22} />
          <span className="font-semibold text-lg text-gray-800 dark:text-gray-100">{t('documents.sections.aiSmartFeatures')}</span>
        </div>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 px-3 py-2 rounded-lg">
            <FiSearch className="text-blue-500" />
            <span className="font-medium text-blue-800 dark:text-blue-200">{t('documents.aiFeatures.ocrAutoTagging')}</span>
          </div>
          <div className="flex items-center gap-2 bg-yellow-100 dark:bg-yellow-900/30 px-3 py-2 rounded-lg">
            <FiAlertCircle className="text-yellow-500" />
            <span className="font-medium text-yellow-800 dark:text-yellow-200">{t('documents.aiFeatures.duplicateDetection')}</span>
          </div>
          <div className="flex items-center gap-2 bg-pink-100 dark:bg-pink-900/30 px-3 py-2 rounded-lg">
            <FiClock className="text-pink-500" />
            <span className="font-medium text-pink-800 dark:text-pink-200">{t('documents.aiFeatures.smartReminders')}</span>
          </div>
          <div className="flex items-center gap-2 bg-red-100 dark:bg-red-900/30 px-3 py-2 rounded-lg animate-bounce-in">
            <FiAlertCircle className="text-red-500" />
            <span className="font-medium text-red-800 dark:text-red-200">{t('documents.aiFeatures.riskFlagging')}</span>
          </div>
          <div className="flex items-center gap-2 bg-green-100 dark:bg-green-900/30 px-3 py-2 rounded-lg">
            <FiPieChart className="text-green-500" />
            <span className="font-medium text-green-800 dark:text-green-200">{t('documents.aiFeatures.completionAnalytics')}</span>
          </div>
        </div>
      </div>
      
      {/* Toast */}
      {toast && <div className="fixed bottom-6 right-6 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in">{toast}</div>}
    </div>
  );
} 