import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiUpload, FiDownload, FiFileText, FiSettings, FiMail, FiUsers, FiMapPin, FiAlertCircle, FiZap, FiCheckCircle, FiXCircle, FiCalendar, FiEdit2, FiTrash2, FiPlus, FiEye, FiDatabase, FiRepeat, FiBarChart2, FiList, FiChevronDown, FiChevronUp, FiTool } from 'react-icons/fi';

// Mock data for demo
const mockLogs = [
  { id: 1, user: 'Noura Al-Zahra', action: 'Edited applicant', module: 'Applicants', date: '2024-06-10', details: 'Updated phone number' },
  { id: 2, user: 'Khalid Al-Sayed', action: 'Created lead', module: 'Leads', date: '2024-06-09', details: 'New lead from website' },
  { id: 3, user: 'Layla Al-Mansour', action: 'Updated status', module: 'Applications', date: '2024-06-08', details: 'Status changed to approved' },
  { id: 4, user: 'Omar Al-Mutairi', action: 'Generated report', module: 'Reports', date: '2024-06-07', details: 'Monthly enrollment report' },
  { id: 5, user: 'Aisha Al-Hassan', action: 'Sent email', module: 'Communication', date: '2024-06-06', details: 'Welcome email sent' },
];
const mockTasks = [
  { id: 1, task: 'Follow-up with Abdullah Al-Rashid', assigned: 'Noura Al-Zahra', deadline: '2024-06-12', priority: 'High', status: 'Pending' },
  { id: 2, task: 'Review applications', assigned: 'Khalid Al-Sayed', deadline: '2024-06-11', priority: 'Medium', status: 'In Progress' },
  { id: 3, task: 'Update website content', assigned: 'Layla Al-Mansour', deadline: '2024-06-10', priority: 'Low', status: 'Completed' },
  { id: 4, task: 'Prepare presentation', assigned: 'Omar Al-Mutairi', deadline: '2024-06-09', priority: 'High', status: 'Pending' },
  { id: 5, task: 'Contact references', assigned: 'Aisha Al-Hassan', deadline: '2024-06-08', priority: 'Medium', status: 'Completed' },
];
const mockTemplates = [
  { id: 1, name: 'Welcome Email', type: 'Email', content: 'Dear {Name}, welcome to our program!', fields: ['Name', 'Program'] },
  { id: 2, name: 'Payment Reminder', type: 'SMS', content: 'Dear {Name}, your payment for {Program} is due.', fields: ['Name', 'Program'] },
];
const mockGeo = [
  { region: 'Riyadh', count: 120 },
  { region: 'Jeddah', count: 80 },
  { region: 'Dammam', count: 60 },
];
const mockDuplicates = [
  { id: 'A001', name: 'Abdullah Al-Rashid', email: 'abdullah@email.com', match: 'Email' },
  { id: 'A002', name: 'Abdullah Al-Rashid', email: 'abdullah@email.com', match: 'Name (fuzzy)' },
];
const mockApiStatus = [
  { name: 'Payment Gateway', status: 'Active', lastSync: '2024-06-10', errors: 0 },
  { name: 'SMS Gateway', status: 'Error', lastSync: '2024-06-09', errors: 2 },
];

export default function ToolsUtilities() {
  const { t } = useTranslation(['admission', 'common']);
  const [uploadLog, setUploadLog] = useState([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showTimelineModal, setShowTimelineModal] = useState(false);
  const [showGeoModal, setShowGeoModal] = useState(false);
  const [showDuplicateModal, setShowDuplicateModal] = useState(false);
  const [showAuditModal, setShowAuditModal] = useState(false);
  const [showApiModal, setShowApiModal] = useState(false);
  const [toast, setToast] = useState(null);

  // Toast
  React.useEffect(() => { if (toast) { const t = setTimeout(() => setToast(null), 2000); return () => clearTimeout(t); } }, [toast]);

  // Card component for each tool
  function ToolCard({ icon, title, accent, children, desc }) {
    return (
      <div className={`bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-xl p-6 flex flex-col gap-2 border-t-4 ${accent} hover:scale-[1.02] transition-transform duration-200`}> 
        <div className="flex items-center gap-2 mb-1">
          {icon}
          <span className="font-bold text-lg text-gray-800 dark:text-gray-100">{title}</span>
        </div>
        {desc && <div className="text-xs text-gray-500 mb-2">{desc}</div>}
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 dark:from-gray-900 dark:to-gray-950 p-0 animate-fade-in">
      {/* Hero Header */}
      <div className="w-full bg-gradient-to-r from-blue-600 to-purple-500 py-10 px-6 md:px-12 flex flex-col md:flex-row items-center gap-6 mb-10 rounded-b-3xl shadow-lg animate-fade-in">
        <div className="flex items-center gap-4">
          <div className="bg-white/20 rounded-full p-4"><FiTool className="text-white" size={40} /></div>
          <div>
            <h1 className="text-4xl font-extrabold text-white mb-2 tracking-tight">{t('toolsUtilities.title')}</h1>
            <p className="text-white/90 text-lg max-w-xl">{t('toolsUtilities.subtitle')}</p>
          </div>
        </div>
      </div>
      {/* Grid of Tool Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto px-4 pb-16">
        <ToolCard icon={<FiUpload className="text-blue-500" size={22} />} title={t('toolsUtilities.tools.bulkUpload.title')} accent="border-blue-400" desc={t('toolsUtilities.tools.bulkUpload.desc')}>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition" onClick={() => setShowUploadModal(true)}>{t('toolsUtilities.tools.bulkUpload.button')}</button>
          <div className="text-xs text-gray-400 mt-2">{t('toolsUtilities.tools.bulkUpload.example')}</div>
        </ToolCard>
        <ToolCard icon={<FiDownload className="text-green-500" size={22} />} title={t('toolsUtilities.tools.bulkExport.title')} accent="border-green-400" desc={t('toolsUtilities.tools.bulkExport.desc')}>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold shadow hover:bg-green-700 transition" onClick={() => setShowExportModal(true)}>{t('toolsUtilities.tools.bulkExport.button')}</button>
          <div className="text-xs text-gray-400 mt-2">{t('toolsUtilities.tools.bulkExport.useCase')}</div>
        </ToolCard>
        <ToolCard icon={<FiFileText className="text-purple-500" size={22} />} title={t('toolsUtilities.tools.documentConverter.title')} accent="border-purple-400" desc={t('toolsUtilities.tools.documentConverter.desc')}>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg font-semibold shadow hover:bg-purple-700 transition">{t('toolsUtilities.tools.documentConverter.imageToPdf')}</button>
            <button className="px-4 py-2 bg-purple-200 text-purple-700 rounded-lg font-semibold shadow hover:bg-purple-300 transition">{t('toolsUtilities.tools.documentConverter.mergeCompress')}</button>
          </div>
          <div className="text-xs text-gray-400 mt-2">{t('toolsUtilities.tools.documentConverter.ideal')}</div>
        </ToolCard>
        <ToolCard icon={<FiSettings className="text-yellow-500" size={22} />} title={t('toolsUtilities.tools.feeEstimator.title')} accent="border-yellow-400" desc={t('toolsUtilities.tools.feeEstimator.desc')}>
          <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg font-semibold shadow hover:bg-yellow-700 transition">{t('toolsUtilities.tools.feeEstimator.button')}</button>
        </ToolCard>
        <ToolCard icon={<FiCalendar className="text-pink-500" size={22} />} title={t('toolsUtilities.tools.timelineGenerator.title')} accent="border-pink-400" desc={t('toolsUtilities.tools.timelineGenerator.desc')}>
          <button className="px-4 py-2 bg-pink-600 text-white rounded-lg font-semibold shadow hover:bg-pink-700 transition" onClick={() => setShowTimelineModal(true)}>{t('toolsUtilities.tools.timelineGenerator.button')}</button>
        </ToolCard>
        <ToolCard icon={<FiMail className="text-blue-400" size={22} />} title={t('toolsUtilities.tools.templatesManager.title')} accent="border-blue-300" desc={t('toolsUtilities.tools.templatesManager.desc')}>
          <button className="px-4 py-2 bg-blue-400 text-white rounded-lg font-semibold shadow hover:bg-blue-500 transition" onClick={() => setShowTemplateModal(true)}>{t('toolsUtilities.tools.templatesManager.button')}</button>
        </ToolCard>
        <ToolCard icon={<FiUsers className="text-green-500" size={22} />} title={t('toolsUtilities.tools.taskAssignment.title')} accent="border-green-300" desc={t('toolsUtilities.tools.taskAssignment.desc')}>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold shadow hover:bg-green-700 transition" onClick={() => setShowTaskModal(true)}>{t('toolsUtilities.tools.taskAssignment.button')}</button>
        </ToolCard>
        <ToolCard icon={<FiMapPin className="text-red-500" size={22} />} title={t('toolsUtilities.tools.geoInsights.title')} accent="border-red-400" desc={t('toolsUtilities.tools.geoInsights.desc')}>
          <button className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold shadow hover:bg-red-700 transition" onClick={() => setShowGeoModal(true)}>{t('toolsUtilities.tools.geoInsights.button')}</button>
        </ToolCard>
        <ToolCard icon={<FiAlertCircle className="text-yellow-600" size={22} />} title={t('toolsUtilities.tools.duplicateChecker.title')} accent="border-yellow-600" desc={t('toolsUtilities.tools.duplicateChecker.desc')}>
          <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg font-semibold shadow hover:bg-yellow-700 transition" onClick={() => setShowDuplicateModal(true)}>{t('toolsUtilities.tools.duplicateChecker.button')}</button>
        </ToolCard>
        <ToolCard icon={<FiList className="text-gray-500" size={22} />} title={t('toolsUtilities.tools.auditLog.title')} accent="border-gray-400" desc={t('toolsUtilities.tools.auditLog.desc')}>
          <button className="px-4 py-2 bg-gray-600 text-white rounded-lg font-semibold shadow hover:bg-gray-700 transition" onClick={() => setShowAuditModal(true)}>{t('toolsUtilities.tools.auditLog.button')}</button>
        </ToolCard>
        <ToolCard icon={<FiCalendar className="text-indigo-500" size={22} />} title={t('toolsUtilities.tools.scheduler.title')} accent="border-indigo-400" desc={t('toolsUtilities.tools.scheduler.desc')}>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold shadow hover:bg-indigo-700 transition">{t('toolsUtilities.tools.scheduler.button')}</button>
        </ToolCard>
        <ToolCard icon={<FiDatabase className="text-pink-500" size={22} />} title={t('toolsUtilities.tools.apiIntegration.title')} accent="border-pink-400" desc={t('toolsUtilities.tools.apiIntegration.desc')}>
          <button className="px-4 py-2 bg-pink-600 text-white rounded-lg font-semibold shadow hover:bg-pink-700 transition" onClick={() => setShowApiModal(true)}>{t('toolsUtilities.tools.apiIntegration.button')}</button>
        </ToolCard>
        <ToolCard icon={<FiZap className="text-yellow-500 animate-pulse" size={22} />} title={t('toolsUtilities.tools.aiUtilities.title')} accent="border-yellow-400" desc={t('toolsUtilities.tools.aiUtilities.desc')}>
          <div className="flex flex-wrap gap-2 mb-2">
            <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-semibold">{t('toolsUtilities.tools.aiUtilities.smartAutoFill')}</span>
            <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold">{t('toolsUtilities.tools.aiUtilities.predictiveImport')}</span>
            <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-semibold">{t('toolsUtilities.tools.aiUtilities.dataQualityScore')}</span>
            <span className="bg-pink-100 text-pink-700 px-2 py-1 rounded-full text-xs font-semibold">{t('toolsUtilities.tools.aiUtilities.anomalyDetector')}</span>
            <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-semibold">{t('toolsUtilities.tools.aiUtilities.bulkDocumentValidator')}</span>
          </div>
        </ToolCard>
      </div>
      {/* Toast */}
      {toast && <div className="fixed bottom-6 right-6 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in">{toast}</div>}
    </div>
  );
} 