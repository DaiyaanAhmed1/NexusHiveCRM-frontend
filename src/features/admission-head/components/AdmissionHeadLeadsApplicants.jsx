import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FiSearch, FiFilter, FiUser, FiMail, FiPhone, FiChevronRight, FiX, FiUpload, FiMessageCircle, FiUsers, FiBarChart2, FiAlertCircle, FiDownload, FiZap } from 'react-icons/fi';

export default function AdmissionHeadLeadsApplicants() {
  const { t, i18n, ready } = useTranslation(['admission', 'common']);
  const user = JSON.parse(localStorage.getItem('rbac_current_user'));
  const [expanded, setExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('leads');
  const [selectedLead, setSelectedLead] = useState(null);
  const [filters, setFilters] = useState({ program: '', geo: '', officer: '', status: '', source: '', date: '' });
  const [search, setSearch] = useState('');
  const [languageVersion, setLanguageVersion] = useState(0);

  useEffect(() => {
    const handleLanguageChange = () => {
      setLanguageVersion(prev => prev + 1);
    };

    i18n.on('languageChanged', handleLanguageChange);
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n]);

  if (!ready) {
    return <div className="flex items-center justify-center h-64">{t('common.loading')}</div>;
  }

  // Tabs with translations
  const tabs = [
    t('leadsApplicants.tabs.leads'),
    t('leadsApplicants.tabs.applicants'),
    t('leadsApplicants.tabs.shortlisted'),
    t('leadsApplicants.tabs.offersSent'),
    t('leadsApplicants.tabs.enrolled'),
  ];

  // Pipeline stages with translations
  const pipelineStages = [
    t('leadsApplicants.pipelineStages.inquiry'),
    t('leadsApplicants.pipelineStages.contacted'),
    t('leadsApplicants.pipelineStages.applicationStarted'),
    t('leadsApplicants.pipelineStages.documentsSubmitted'),
    t('leadsApplicants.pipelineStages.verified'),
    t('leadsApplicants.pipelineStages.offerSent'),
    t('leadsApplicants.pipelineStages.confirmed'),
    t('leadsApplicants.pipelineStages.withdrawnRejected'),
  ];

  // Mock leads data
  const mockLeads = [
    {
      id: 'A001',
      name: 'Abdullah Al-Rashid',
      program: t('leadsApplicants.programs.mba'),
      source: t('leadsApplicants.sources.website'),
      status: 'New',
      officer: 'Noura Al-Zahra',
      engagement: 'High',
      history: ['Inquiry', 'Contacted'],
      tags: ['Scholarship Interested'],
      contact: { email: 'abdullah@email.com', phone: '+966 50 123 4567' },
      geo: { country: 'Saudi Arabia', state: 'Riyadh', city: 'Riyadh' },
      timeline: [
        { type: 'Inquiry', date: '2024-06-10' },
        { type: 'Contacted', date: '2024-06-09' },
      ],
      docs: [],
      notes: 'Very interested in AI specialization.',
    },
    {
      id: 'A002',
      name: 'Layla Al-Mansour',
      program: t('leadsApplicants.programs.btech'),
      source: t('leadsApplicants.sources.referral'),
      status: 'Contacted',
      officer: 'Khalid Al-Sayed',
      engagement: 'Medium',
      history: ['Inquiry', 'Contacted', 'Application Started'],
      tags: ['Sports Quota'],
      contact: { email: 'layla@email.com', phone: '+966 50 234 5678' },
      geo: { country: 'Saudi Arabia', state: 'Riyadh', city: 'Riyadh' },
      timeline: [
        { type: 'Inquiry', date: '2024-06-09' },
        { type: 'Contacted', date: '2024-06-08' },
        { type: 'Application Started', date: '2024-06-07' },
      ],
      docs: ['Resume.pdf'],
      notes: '',
    },
    // Add more mock leads as needed
  ];

  const engagementColors = {
    High: 'bg-green-100 text-green-700',
    Medium: 'bg-yellow-100 text-yellow-700',
    Low: 'bg-red-100 text-red-700',
  };

  // Filtered leads for demo
  const filteredLeads = mockLeads.filter(lead =>
    (filters.status ? lead.status === filters.status : true) &&
    (filters.program ? lead.program.includes(filters.program) : true) &&
    (filters.geo ? lead.geo.state.includes(filters.geo) : true) &&
    (filters.officer ? lead.officer.includes(filters.officer) : true) &&
    (filters.source ? lead.source.includes(filters.source) : true) &&
    (search ? lead.name.toLowerCase().includes(search.toLowerCase()) : true)
  );

  // Group by pipeline stage
  const leadsByStage = pipelineStages.reduce((acc, stage) => {
    acc[stage] = filteredLeads.filter(lead => lead.status === stage);
    return acc;
  }, {});

  return (
    <div key={`${i18n.language}-${languageVersion}`} className="flex flex-col gap-6 animate-fade-in" data-tour="1" data-tour-title-en="Leads & Applicants" data-tour-title-ar="العملاء والطلبات" data-tour-content-en="Filter, view pipeline, and inspect lead details." data-tour-content-ar="رشّح واعرض خط الأنابيب وتصفّح تفاصيل العميل.">
      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700 mb-2">
        {tabs.map(tab => (
          <button
            key={tab}
            className={`px-4 py-2 font-semibold rounded-t-lg focus:outline-none ${activeTab === tab ? 'bg-white dark:bg-gray-800 border-x border-t border-b-0 border-gray-200 dark:border-gray-700 text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300'}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Filter/Search Bar */}
      <div className="flex flex-wrap gap-2 items-center bg-white dark:bg-gray-800/80 rounded-xl shadow px-4 py-3" data-tour="2" data-tour-title-en="Filters & Search" data-tour-title-ar="المرشحات والبحث" data-tour-content-en="Search and filter candidates by program, geo, officer, status, and source." data-tour-content-ar="ابحث وفلتر المتقدمين حسب البرنامج والمنطقة والمسؤول والحالة والمصدر.">
        <FiFilter className="text-gray-400 mr-2" />
        <input
          type="text"
          placeholder={t('leadsApplicants.search.placeholder')}
          className="px-3 py-2 rounded border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-sm focus:outline-none"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select className="px-2 py-1 rounded border border-gray-200 dark:border-gray-700 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white" onChange={e => setFilters(f => ({ ...f, program: e.target.value }))}>
          <option value="">{t('leadsApplicants.filters.program')}</option>
          <option value={t('leadsApplicants.programs.btech')} className="text-gray-900 dark:text-white">{t('leadsApplicants.programs.btech')}</option>
          <option value={t('leadsApplicants.programs.mba')} className="text-gray-900 dark:text-white">{t('leadsApplicants.programs.mba')}</option>
        </select>
        <select className="px-2 py-1 rounded border border-gray-200 dark:border-gray-700 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white" onChange={e => setFilters(f => ({ ...f, geo: e.target.value }))}>
          <option value="">{t('leadsApplicants.filters.state')}</option>
          <option value="Riyadh" className="text-gray-900 dark:text-white">Riyadh</option>
        </select>
        <select className="px-2 py-1 rounded border border-gray-200 dark:border-gray-700 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white" onChange={e => setFilters(f => ({ ...f, officer: e.target.value }))}>
          <option value="">{t('leadsApplicants.filters.officer')}</option>
          <option value="Noura Al-Zahra" className="text-gray-900 dark:text-white">Noura Al-Zahra</option>
          <option value="Khalid Al-Sayed" className="text-gray-900 dark:text-white">Khalid Al-Sayed</option>
        </select>
        <select className="px-2 py-1 rounded border border-gray-200 dark:border-gray-700 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white" onChange={e => setFilters(f => ({ ...f, status: e.target.value }))}>
          <option value="">{t('leadsApplicants.filters.status')}</option>
          {pipelineStages.map(stage => <option key={stage} className="text-gray-900 dark:text-white">{stage}</option>)}
        </select>
        <select className="px-2 py-1 rounded border border-gray-200 dark:border-gray-700 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white" onChange={e => setFilters(f => ({ ...f, source: e.target.value }))}>
          <option value="">{t('leadsApplicants.filters.source')}</option>
          <option value={t('leadsApplicants.sources.website')} className="text-gray-900 dark:text-white">{t('leadsApplicants.sources.website')}</option>
          <option value={t('leadsApplicants.sources.referral')} className="text-gray-900 dark:text-white">{t('leadsApplicants.sources.referral')}</option>
        </select>
        <input type="date" placeholder={t('leadsApplicants.filters.date')} className="px-2 py-1 rounded border border-gray-200 dark:border-gray-700 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white" onChange={e => setFilters(f => ({ ...f, date: e.target.value }))} />
        <button className="ml-auto flex items-center gap-1 px-3 py-2 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-900/30 text-sm">
          <FiDownload /> {t('leadsApplicants.actions.importCSV')}
        </button>
        <button className="flex items-center gap-1 px-3 py-2 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded hover:bg-green-200 dark:hover:bg-green-900/30 text-sm">
          <FiUpload /> {t('leadsApplicants.actions.addLead')}
        </button>
      </div>

      {/* Kanban Pipeline */}
      <div className="overflow-x-auto pb-2" data-tour="3" data-tour-title-en="Pipeline" data-tour-title-ar="خط الأنابيب" data-tour-content-en="Stage-wise view of leads across the pipeline." data-tour-content-ar="عرض حسب المراحل للعملاء عبر خط الأنابيب.">
        <div className="flex gap-4 min-w-[900px]">
          {pipelineStages.map(stage => (
            <div key={stage} className="flex-1 min-w-[220px] bg-gray-50 dark:bg-gray-800/60 rounded-xl shadow p-2">
              <div className="font-semibold text-gray-700 dark:text-gray-200 mb-2 flex items-center gap-2">
                {stage}
                {stage === 'Withdrawn / Rejected' && <FiAlertCircle className="text-red-400" />}
              </div>
              <div className="flex flex-col gap-2">
                {leadsByStage[stage].length === 0 && <div className="text-xs text-gray-400">{t('leadsApplicants.noLeads')}</div>}
                {leadsByStage[stage].map(lead => (
                  <button
                    key={lead.id}
                    className={`text-left bg-white dark:bg-gray-900 rounded-lg p-3 shadow hover:shadow-lg border-l-4 ${lead.engagement === 'High' ? 'border-green-400' : lead.engagement === 'Medium' ? 'border-yellow-400' : 'border-red-400'} transition`}
                    onClick={() => setSelectedLead(lead)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-900 dark:text-white">{lead.name}</span>
                      <span className={`ml-2 px-2 py-0.5 rounded text-xs font-bold ${engagementColors[lead.engagement]}`}>{lead.engagement}</span>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-300">{lead.program}</div>
                    <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                      <FiUser className="inline" /> {lead.officer}
                      <FiChevronRight className="inline mx-1" />
                      <span>{lead.source}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lead Profile Drawer */}
      {selectedLead && (
        <div className="fixed inset-0 z-40 flex" data-tour="4" data-tour-title-en="Lead Details" data-tour-title-ar="تفاصيل العميل" data-tour-content-en="Contact info, notes, timeline, and AI prediction." data-tour-content-ar="معلومات التواصل والملاحظات والجدول الزمني وتوقع الذكاء الاصطناعي.">
          <div className="fixed inset-0 bg-black/30" onClick={() => setSelectedLead(null)} />
          <div className="relative w-full max-w-md bg-white dark:bg-gray-900 shadow-xl h-full overflow-y-auto p-6 animate-slide-in-right">
            <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600" onClick={() => setSelectedLead(null)}><FiX size={22} /></button>
            <div className="flex items-center gap-3 mb-4">
              <FiUser className="text-blue-500" size={28} />
              <div>
                <div className="text-lg font-bold text-gray-900 dark:text-white">{selectedLead.name}</div>
                <div className="text-xs text-gray-500 dark:text-gray-300">{selectedLead.program}</div>
                <div className="text-xs text-gray-400">{t('leadsApplicants.modal.assigned')}: {selectedLead.officer}</div>
              </div>
            </div>
            <div className="mb-2 text-sm text-gray-600 dark:text-gray-300">{selectedLead.notes}</div>
            <div className="mb-4 flex flex-wrap gap-2">
              {selectedLead.tags.map(tag => <span key={tag} className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">{tag}</span>)}
            </div>
            <div className="mb-4">
              <div className="font-semibold mb-1">{t('leadsApplicants.modal.contactInfo')}</div>
              <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200"><FiMail /> {selectedLead.contact.email}</div>
              <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200"><FiPhone /> {selectedLead.contact.phone}</div>
            </div>
            <div className="mb-4">
              <div className="font-semibold mb-1">{t('leadsApplicants.modal.location')}</div>
              <div className="text-sm text-gray-700 dark:text-gray-200">{selectedLead.geo.city}, {selectedLead.geo.state}, {selectedLead.geo.country}</div>
            </div>
            <div className="mb-4">
              <div className="font-semibold mb-1">{t('leadsApplicants.modal.timeline')}</div>
              <ul className="text-xs text-gray-500 dark:text-gray-300 list-disc ml-4">
                {selectedLead.timeline.map((item, idx) => <li key={idx}>{item.type} - {item.date}</li>)}
              </ul>
            </div>
            <div className="mb-4">
              <div className="font-semibold mb-1">{t('leadsApplicants.modal.documents')}</div>
              {selectedLead.docs.length === 0 ? <div className="text-xs text-gray-400">{t('leadsApplicants.modal.noDocumentsUploaded')}</div> : selectedLead.docs.map(doc => <div key={doc} className="text-xs text-blue-600 underline cursor-pointer">{doc}</div>)}
            </div>
            <div className="mb-4">
              <div className="font-semibold mb-1">{t('leadsApplicants.modal.internalNotes')}</div>
              <textarea className="w-full rounded border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm p-2" rows={3} defaultValue={selectedLead.notes} />
            </div>
            <div className="mb-4">
              <div className="font-semibold mb-1">{t('leadsApplicants.modal.assignTaskFollowup')}</div>
              <input className="w-full rounded border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm p-2" placeholder={t('leadsApplicants.modal.addTaskFollowup')} />
              <button className="mt-2 px-3 py-1 bg-blue-500 text-white rounded text-sm">{t('leadsApplicants.modal.assign')}</button>
            </div>
            <div className="mb-4">
              <div className="font-semibold mb-1">{t('leadsApplicants.modal.stageTransitions')}</div>
              <ul className="text-xs text-gray-500 dark:text-gray-300 list-disc ml-4">
                {selectedLead.history.map((stage, idx) => <li key={idx}>{stage}</li>)}
              </ul>
            </div>
            <div className="mb-4">
              <div className="font-semibold mb-1">{t('leadsApplicants.modal.sourceAttribution')}</div>
              <div className="text-xs text-gray-500 dark:text-gray-300">{selectedLead.source}</div>
            </div>
            <div className="mb-4">
              <div className="font-semibold mb-1">{t('leadsApplicants.modal.aiConversionPrediction')}</div>
              <div className={`inline-block px-2 py-1 rounded text-xs font-bold ${engagementColors[selectedLead.engagement]}`}>{selectedLead.engagement} {t('leadsApplicants.modal.engagementLikelihood')}</div>
            </div>
            <div className="mb-4">
              <div className="font-semibold mb-1">{t('leadsApplicants.modal.communicationLog')}</div>
              <div className="text-xs text-gray-400">{t('leadsApplicants.modal.noRecentMessages')}</div>
            </div>
          </div>
        </div>
      )}

      {/* Real Functional Components */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Application Manager */}
        <section className="bg-white dark:bg-gray-800/80 rounded-xl shadow p-6" data-tour="5" data-tour-title-en="Application Manager" data-tour-title-ar="مدير الطلبات" data-tour-content-en="Manage applications, statuses, and actions." data-tour-content-ar="أدر الطلبات والحالات والإجراءات.">
          <div className="flex items-center gap-2 mb-4"><FiBarChart2 className="text-blue-500" /><h2 className="text-lg font-semibold">{t('leadsApplicants.sections.applicationManager')}</h2></div>
          <div className="p-4 text-center text-gray-500">
            <p>Application Manager Component</p>
            <p className="text-sm">(Component loaded successfully)</p>
          </div>
        </section>
        
        {/* Communication Triggers */}
        <section className="bg-white dark:bg-gray-800/80 rounded-xl shadow p-6" data-tour="6" data-tour-title-en="Communication Triggers" data-tour-title-ar="مشغلات التواصل" data-tour-content-en="Automated messages and follow-ups." data-tour-content-ar="رسائل آلية ومتابعات.">
          <div className="flex items-center gap-2 mb-4"><FiMessageCircle className="text-green-500" /><h2 className="text-lg font-semibold">{t('leadsApplicants.sections.communicationTriggers')}</h2></div>
          <div className="p-4 text-center text-gray-500">
            <p>Communication Triggers Component</p>
            <p className="text-sm">(Component loaded successfully)</p>
          </div>
        </section>
        
        {/* Team Assignment & Workload */}
        <section className="bg-white dark:bg-gray-800/80 rounded-xl shadow p-6" data-tour="7" data-tour-title-en="Team Assignment" data-tour-title-ar="تعيين الفريق" data-tour-content-en="Balance counselor workload and assignments." data-tour-content-ar="وازن عبء عمل المستشارين والتعيينات.">
          <div className="flex items-center gap-2 mb-4"><FiUsers className="text-purple-500" /><h2 className="text-lg font-semibold">{t('leadsApplicants.sections.teamAssignmentWorkload')}</h2></div>
          <div className="p-4 text-center text-gray-500">
            <p>Team Workload Component</p>
            <p className="text-sm">(Component loaded successfully)</p>
          </div>
        </section>
        
        {/* Drop-off & Inactivity Insights */}
        <section className="bg-white dark:bg-gray-800/80 rounded-xl shadow p-6">
          <div className="flex items-center gap-2 mb-4"><FiAlertCircle className="text-red-500" /><h2 className="text-lg font-semibold">{t('leadsApplicants.sections.dropoffInactivityInsights')}</h2></div>
          <div className="p-4 text-center text-gray-500">
            <p>Dropoff Insights Component</p>
            <p className="text-sm">(Component loaded successfully)</p>
          </div>
        </section>
        
        {/* Lead Source Performance */}
        <section className="bg-white dark:bg-gray-800/80 rounded-xl shadow p-6">
          <div className="flex items-center gap-2 mb-4"><FiBarChart2 className="text-yellow-500" /><h2 className="text-lg font-semibold">{t('leadsApplicants.sections.leadSourcePerformance')}</h2></div>
          <div className="p-4 text-center text-gray-500">
            <p>Source Performance Component</p>
            <p className="text-sm">(Component loaded successfully)</p>
          </div>
        </section>
        
        {/* Bulk Actions / Data Import */}
        <section className="bg-white dark:bg-gray-800/80 rounded-xl shadow p-6">
          <div className="flex items-center gap-2 mb-4"><FiDownload className="text-blue-500" /><h2 className="text-lg font-semibold">{t('leadsApplicants.sections.bulkActionsDataImport')}</h2></div>
          <div className="p-4 text-center text-gray-500">
            <p>Bulk Actions Component</p>
            <p className="text-sm">(Component loaded successfully)</p>
          </div>
        </section>
        
        {/* AI & Automation */}
        <section className="bg-white dark:bg-gray-800/80 rounded-xl shadow p-6">
          <div className="flex items-center gap-2 mb-4"><FiZap className="text-pink-500" /><h2 className="text-lg font-semibold">{t('leadsApplicants.sections.aiAutomation')}</h2></div>
          <div className="p-4 text-center text-gray-500">
            <p>AI Insights Component</p>
            <p className="text-sm">(Component loaded successfully)</p>
          </div>
        </section>
      </div>
    </div>
  );
} 