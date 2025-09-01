import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FiMail, FiMessageCircle, FiPhone, FiUsers, FiUser, FiCheckCircle, FiXCircle, FiAlertCircle, FiZap, FiDownload, FiEdit2, FiTrash2, FiChevronDown, FiChevronUp, FiSend, FiFilter, FiSearch, FiPlus, FiArrowRight, FiClock } from 'react-icons/fi';

// Mock data for communications
const mockRecipients = [
  { name: 'Abdullah Al-Rashid', role: 'Student' },
  { name: 'Layla Al-Mansour', role: 'Parent' },
  { name: 'Noura Al-Zahra', role: 'Team' },
];
const mockOutgoing = [
  { id: 1, recipient: mockRecipients[0], type: 'Email', subject: 'Application Received', preview: 'Dear Abdullah, your application...', date: '2024-06-10', time: '10:00', sentBy: 'User', status: 'Delivered' },
  { id: 2, recipient: mockRecipients[1], type: 'SMS', subject: 'Document Verification', preview: 'Dear Layla, please submit...', date: '2024-06-09', time: '14:30', sentBy: 'System', status: 'Sent' },
  { id: 3, recipient: mockRecipients[2], type: 'WhatsApp', subject: 'Interview Schedule', preview: 'Hi Noura, your interview is...', date: '2024-06-08', time: '16:45', sentBy: 'User', status: 'Read' },
];
const mockIncoming = [
  { id: 1, sender: mockRecipients[0], type: 'Email', subject: 'Re: Application', preview: 'Thank you for the update...', date: '2024-06-10', time: '10:30', status: 'Needs Follow-up', tags: ['Scholarship Query'] },
  { id: 2, sender: mockRecipients[1], type: 'SMS', subject: 'Parent Query', preview: 'Can I reschedule...', date: '2024-06-10', time: '11:10', status: 'Escalated', tags: ['Deadline Confusion'] },
  { id: 3, sender: mockRecipients[2], type: 'WhatsApp', subject: 'Agent Docs', preview: 'Documents attached...', date: '2024-06-09', time: '15:20', status: 'Replied', tags: [] },
];
const mockTemplates = [
  { id: 1, name: 'Application Acknowledgment', type: 'Email', content: 'Dear {Name}, your application {ApplicationID} has been received.', lang: 'EN', approved: true },
  { id: 2, name: 'Interview Invitation', type: 'SMS', content: 'Dear {Name}, your interview is scheduled on {Date}.', lang: 'EN', approved: false },
];
const mockNotes = [
  { id: 1, candidate: 'Abdullah Al-Rashid', note: 'VIP applicant, flag for director review.', tags: ['VIP', 'Flagged'], private: false },
  { id: 2, candidate: 'Layla Al-Mansour', note: 'Parent concerned about accommodation.', tags: ['Parent', 'Accommodation'], private: true },
];
const mockCalls = [
  { id: 1, caller: 'Abdullah Al-Rashid', type: 'Incoming', duration: '3:20', notes: 'Discussed scholarship.', aiSummary: 'Asked about scholarship eligibility.', date: '2024-06-10', status: 'Completed' },
  { id: 2, caller: 'Layla Al-Mansour', type: 'Outgoing', duration: '5:15', notes: 'Follow-up on application.', aiSummary: 'Confirmed document submission.', date: '2024-06-09', status: 'Completed' },
];
const mockChannels = [
  { name: 'Email', icon: FiMail, enabled: true },
  { name: 'SMS', icon: FiMessageCircle, enabled: true },
  { name: 'WhatsApp', icon: FiMessageCircle, enabled: false },
  { name: 'Chatbot', icon: FiZap, enabled: true },
  { name: 'In-app', icon: FiUsers, enabled: true },
];

export default function Communication() {
  const { t: translate, i18n, ready } = useTranslation(['admission'], { useSuspense: false });
  const [languageVersion, setLanguageVersion] = useState(0);

  // Debug logging
  console.log('i18n ready:', ready);
  console.log('i18n language:', i18n.language);
  console.log('i18n namespaces:', i18n.reportNamespaces.getUsedNamespaces());
  console.log('translate function:', typeof translate);
  console.log('Test translation:', translate('communication.title'));
  console.log('Available namespaces:', Object.keys(i18n.options.resources[i18n.language] || {}));

  // Language change detection
  useEffect(() => {
    const handleLanguageChange = () => {
      setLanguageVersion(prev => prev + 1);
    };

    i18n.on('languageChanged', handleLanguageChange);
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n]);

  // Force load admission namespace
  useEffect(() => {
    if (ready && i18n.language) {
      i18n.loadNamespaces(['admission']);
    }
  }, [ready, i18n.language, i18n]);

  // State for filters, modals, etc.
  const [outgoing, setOutgoing] = useState(mockOutgoing);
  const [incoming, setIncoming] = useState(mockIncoming);
  const [templates, setTemplates] = useState(mockTemplates);
  const [notes, setNotes] = useState(mockNotes);
  const [calls, setCalls] = useState(mockCalls);
  const [channels, setChannels] = useState(mockChannels);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [showCallModal, setShowCallModal] = useState(false);
  const [showAuditModal, setShowAuditModal] = useState(false);
  const [toast, setToast] = useState(null);

  if (!ready) {
    return <div className="flex items-center justify-center h-64">Loading...</div>;
  }

  // Dashboard metrics
  const weekComms = outgoing.filter(m => m.date >= '2024-06-03').length;
  const monthComms = outgoing.length;
  const emailsSent = outgoing.filter(m => m.type === 'Email').length;
  const smsSent = outgoing.filter(m => m.type === 'SMS').length;
  const whatsappSent = outgoing.filter(m => m.type === 'WhatsApp').length;
  const callsLogged = calls.length;
  const pendingReplies = incoming.filter(m => m.status === 'Needs Follow-up').length;
  const unread = incoming.filter(m => m.status === 'Escalated').length;

  // Toast
  useEffect(() => { if (toast) { const t = setTimeout(() => setToast(null), 2000); return () => clearTimeout(t); } }, [toast]);

  return (
    <div key={`${i18n.language}-${languageVersion}`} className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 dark:from-gray-900 dark:to-gray-950 p-6 animate-fade-in">
      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8 tracking-tight">{translate('communication.title')}</h1>
      {/* Overview Dashboard */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl p-4 flex flex-col items-center gap-1">
          <FiMail className="text-blue-500 mb-1" size={22} />
          <span className="text-xs text-gray-500">{translate('communication.dashboard.thisWeek')}</span>
          <span className="text-2xl font-bold text-blue-700 dark:text-blue-300">{weekComms}</span>
        </div>
        <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl p-4 flex flex-col items-center gap-1">
          <FiMail className="text-purple-500 mb-1" size={22} />
          <span className="text-xs text-gray-500">{translate('communication.dashboard.thisMonth')}</span>
          <span className="text-2xl font-bold text-purple-700 dark:text-purple-300">{monthComms}</span>
        </div>
        <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl p-4 flex flex-col items-center gap-1">
          <FiMail className="text-green-500 mb-1" size={22} />
          <span className="text-xs text-gray-500">{translate('communication.dashboard.emailsSent')}</span>
          <span className="text-2xl font-bold text-green-700 dark:text-green-300">{emailsSent}</span>
        </div>
        <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl p-4 flex flex-col items-center gap-1">
          <FiMessageCircle className="text-yellow-500 mb-1" size={22} />
          <span className="text-xs text-gray-500">{translate('communication.dashboard.smsSent')}</span>
          <span className="text-2xl font-bold text-yellow-700 dark:text-yellow-300">{smsSent}</span>
        </div>
        <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl p-4 flex flex-col items-center gap-1">
          <FiMessageCircle className="text-green-500 mb-1" size={22} />
          <span className="text-xs text-gray-500">{translate('communication.dashboard.whatsapp')}</span>
          <span className="text-2xl font-bold text-green-700 dark:text-green-300">{whatsappSent}</span>
        </div>
        <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl p-4 flex flex-col items-center gap-1">
          <FiPhone className="text-pink-500 mb-1" size={22} />
          <span className="text-xs text-gray-500">{translate('communication.dashboard.callsLogged')}</span>
          <span className="text-2xl font-bold text-pink-700 dark:text-pink-300">{callsLogged}</span>
        </div>
      </div>
      {/* Outgoing Communications */}
      <div className="bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-xl p-6 mb-10 animate-fade-in">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
          <h2 className="text-xl font-bold text-gray-700 dark:text-gray-200">{translate('communication.sections.outgoingCommunications')}</h2>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold" onClick={() => setShowBulkModal(true)}><FiSend className="inline mr-1" />{translate('communication.buttons.bulkSend')}</button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700">
                <th className="px-4 py-2 text-left font-semibold">{translate('communication.table.headers.recipient')}</th>
                <th className="px-4 py-2 text-left font-semibold">{translate('communication.table.headers.type')}</th>
                <th className="px-4 py-2 text-left font-semibold">{translate('communication.table.headers.subject')}</th>
                <th className="px-4 py-2 text-left font-semibold">{translate('communication.table.headers.dateTime')}</th>
                <th className="px-4 py-2 text-left font-semibold">{translate('communication.table.headers.sentBy')}</th>
                <th className="px-4 py-2 text-left font-semibold">{translate('communication.table.headers.status')}</th>
                <th className="px-4 py-2 text-left font-semibold">{translate('communication.table.headers.action')}</th>
              </tr>
            </thead>
            <tbody>
              {outgoing.map(m => (
                <tr key={m.id} className="hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                  <td className="px-4 py-2">{m.recipient.name} <span className="text-xs text-gray-400">({m.recipient.role})</span></td>
                  <td className="px-4 py-2">{m.type}</td>
                  <td className="px-4 py-2">{m.subject} <span className="text-xs text-gray-400">{m.preview}</span></td>
                  <td className="px-4 py-2">{m.date} {m.time}</td>
                  <td className="px-4 py-2">{m.sentBy}</td>
                  <td className="px-4 py-2"><span className={`px-2 py-1 rounded-full text-xs font-semibold ${m.status === 'Delivered' ? 'bg-green-100 text-green-700' : m.status === 'Sent' ? 'bg-blue-100 text-blue-700' : m.status === 'Read' ? 'bg-yellow-100 text-yellow-700' : ''}`}>{m.status === 'Delivered' ? translate('communication.status.delivered') : m.status === 'Sent' ? translate('communication.status.sent') : m.status === 'Read' ? translate('communication.status.read') : m.status}</span></td>
                  <td className="px-4 py-2">
                    <button className="text-blue-600 hover:underline font-semibold transition-colors mr-2">{translate('communication.buttons.resend')}</button>
                    <button className="text-indigo-600 hover:underline font-semibold transition-colors mr-2">{translate('communication.buttons.viewFull')}</button>
                    <button className="text-green-600 hover:underline font-semibold transition-colors">{translate('communication.buttons.followUp')}</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Incoming Messages / Logs */}
      <div className="bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-xl p-6 mb-10 animate-fade-in">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
          <h2 className="text-xl font-bold text-gray-700 dark:text-gray-200">{translate('communication.sections.incomingMessagesLogs')}</h2>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold" onClick={() => setShowNoteModal(true)}><FiPlus className="inline mr-1" />{translate('communication.buttons.addNote')}</button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700">
                <th className="px-4 py-2 text-left font-semibold">{translate('communication.table.headers.sender')}</th>
                <th className="px-4 py-2 text-left font-semibold">{translate('communication.table.headers.type')}</th>
                <th className="px-4 py-2 text-left font-semibold">{translate('communication.table.headers.subject')}</th>
                <th className="px-4 py-2 text-left font-semibold">{translate('communication.table.headers.dateTime')}</th>
                <th className="px-4 py-2 text-left font-semibold">{translate('communication.table.headers.status')}</th>
                <th className="px-4 py-2 text-left font-semibold">{translate('communication.table.headers.tags')}</th>
                <th className="px-4 py-2 text-left font-semibold">{translate('communication.table.headers.action')}</th>
              </tr>
            </thead>
            <tbody>
              {incoming.map(m => (
                <tr key={m.id} className="hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                  <td className="px-4 py-2">{m.sender.name} <span className="text-xs text-gray-400">({m.sender.role})</span></td>
                  <td className="px-4 py-2">{m.type}</td>
                  <td className="px-4 py-2">{m.subject} <span className="text-xs text-gray-400">{m.preview}</span></td>
                  <td className="px-4 py-2">{m.date} {m.time}</td>
                  <td className="px-4 py-2"><span className={`px-2 py-1 rounded-full text-xs font-semibold ${m.status === 'Needs Follow-up' ? 'bg-yellow-100 text-yellow-700' : m.status === 'Escalated' ? 'bg-red-100 text-red-700' : m.status === 'Replied' ? 'bg-green-100 text-green-700' : ''}`}>{m.status === 'Needs Follow-up' ? translate('communication.status.needsFollowup') : m.status === 'Escalated' ? translate('communication.status.escalated') : m.status === 'Replied' ? translate('communication.status.replied') : m.status}</span></td>
                  <td className="px-4 py-2">{m.tags.map(tag => <span key={tag} className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs mr-1">{tag}</span>)}</td>
                  <td className="px-4 py-2">
                    <button className="text-green-600 hover:underline font-semibold transition-colors mr-2">{translate('communication.buttons.reply')}</button>
                    <button className="text-yellow-600 hover:underline font-semibold transition-colors mr-2">{translate('communication.buttons.escalate')}</button>
                    <button className="text-blue-600 hover:underline font-semibold transition-colors">{translate('communication.buttons.assign')}</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Bulk Communication Tools */}
      <div className="bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-xl p-6 mb-10 animate-fade-in">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
          <h2 className="text-xl font-bold text-gray-700 dark:text-gray-200">{translate('communication.sections.bulkCommunicationTools')}</h2>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold" onClick={() => setShowBulkModal(true)}><FiSend className="inline mr-1" />{translate('communication.buttons.newCampaign')}</button>
        </div>
        <div className="flex flex-wrap gap-2 mb-2">
          <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs">{translate('communication.bulkTools.target')}: {translate('communication.bulkTools.allLeads')}</span>
          <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs">{translate('communication.bulkTools.mode')}: {translate('communication.bulkTools.email')}</span>
          <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full text-xs">{translate('communication.bulkTools.template')}: {translate('communication.bulkTools.applicationReminder')}</span>
          <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full text-xs">{translate('communication.bulkTools.personalization')}: {`{Name}`}</span>
        </div>
        <div className="flex gap-2 mt-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold">{translate('communication.buttons.sendNow')}</button>
          <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg font-semibold">{translate('communication.buttons.schedule')}</button>
        </div>
        <div className="mt-4 text-xs text-gray-500">{translate('communication.bulkTools.openRate')}: 78% | {translate('communication.bulkTools.clickRate')}: 42% | {translate('communication.bulkTools.deliveryRate')}: 95%</div>
      </div>
      {/* Templates Manager */}
      <div className="bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-xl p-6 mb-10 animate-fade-in">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
          <h2 className="text-xl font-bold text-gray-700 dark:text-gray-200">{translate('communication.templates.title')}</h2>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold" onClick={() => setShowTemplateModal(true)}><FiPlus className="inline mr-1" />{translate('communication.templates.newTemplate')}</button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700">
                <th className="px-4 py-2 text-left font-semibold">{translate('communication.templates.headers.name')}</th>
                <th className="px-4 py-2 text-left font-semibold">{translate('communication.templates.headers.type')}</th>
                <th className="px-4 py-2 text-left font-semibold">{translate('communication.templates.headers.content')}</th>
                <th className="px-4 py-2 text-left font-semibold">{translate('communication.templates.headers.language')}</th>
                <th className="px-4 py-2 text-left font-semibold">{translate('communication.templates.headers.approved')}</th>
                <th className="px-4 py-2 text-left font-semibold">{translate('communication.templates.headers.action')}</th>
              </tr>
            </thead>
            <tbody>
              {templates.map(t => (
                <tr key={t.id} className="hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                  <td className="px-4 py-2">{t.name}</td>
                  <td className="px-4 py-2">{t.type}</td>
                  <td className="px-4 py-2">{t.content}</td>
                  <td className="px-4 py-2">{t.lang}</td>
                  <td className="px-4 py-2">{t.approved ? <FiCheckCircle className="text-green-500 inline" /> : <FiXCircle className="text-red-500 inline" />}</td>
                  <td className="px-4 py-2">
                    <button className="text-blue-600 hover:underline font-semibold transition-colors mr-2">{translate('communication.templates.actions.edit')}</button>
                    <button className="text-red-600 hover:underline font-semibold transition-colors">{translate('communication.templates.actions.delete')}</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Internal Notes / Logbook */}
      <div className="bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-xl p-6 mb-10 animate-fade-in">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
          <h2 className="text-xl font-bold text-gray-700 dark:text-gray-200">{translate('communication.notes.title')}</h2>
          <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg font-semibold" onClick={() => setShowNoteModal(true)}><FiPlus className="inline mr-1" />{translate('communication.notes.addNote')}</button>
        </div>
        <div className="flex flex-col gap-2">
          {notes.map(n => (
            <div key={n.id} className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
              <span className="font-semibold text-gray-700 dark:text-gray-200">{n.candidate}</span>
              <span className="text-xs text-gray-500">{n.note}</span>
              {n.tags.map(tag => <span key={tag} className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs mr-1">{tag}</span>)}
              <span className={`px-2 py-0.5 rounded-full text-xs ${n.private ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>{n.private ? translate('communication.notes.private') : translate('communication.notes.team')}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Call Logs & Voice Notes */}
      <div className="bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-xl p-6 mb-10 animate-fade-in">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
          <h2 className="text-xl font-bold text-gray-700 dark:text-gray-200">{translate('communication.calls.title')}</h2>
          <button className="px-4 py-2 bg-pink-600 text-white rounded-lg font-semibold" onClick={() => setShowCallModal(true)}><FiPlus className="inline mr-1" />{translate('communication.calls.logCall')}</button>
        </div>
        <div className="flex flex-col gap-2">
          {calls.map(c => (
            <div key={c.id} className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
              <span className="font-semibold text-gray-700 dark:text-gray-200">{c.caller}</span>
              <span className="text-xs text-gray-500">{c.type} ({c.duration})</span>
              <span className="text-xs text-gray-500">{c.notes}</span>
              <span className="text-xs text-blue-500">{translate('communication.calls.aiSummary')}: {c.aiSummary}</span>
              <span className={`px-2 py-0.5 rounded-full text-xs ${c.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{c.status === 'Completed' ? translate('communication.calls.completed') : c.status}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Integration & Channels */}
      <div className="bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-xl p-6 mb-10 animate-fade-in">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
          <h2 className="text-xl font-bold text-gray-700 dark:text-gray-200">{translate('communication.integrations.title')}</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          {channels.map(ch => (
            <button key={ch.name} className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold shadow ${ch.enabled ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-700'} hover:scale-105 transition-transform`}>
              <ch.icon className="text-blue-500" /> {ch.name} {ch.enabled ? translate('communication.integrations.on') : translate('communication.integrations.off')}
            </button>
          ))}
        </div>
      </div>
      {/* AI-Powered Features */}
      <div className="bg-gradient-to-br from-yellow-50 to-pink-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-6 flex flex-col gap-4 mb-8 animate-fade-in">
        <div className="flex items-center gap-2 mb-2">
          <FiZap className="text-pink-500 animate-pulse" size={22} />
          <span className="font-semibold text-lg text-gray-800 dark:text-gray-100">{translate('communication.aiFeatures.title')}</span>
        </div>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2 bg-red-100 dark:bg-red-900/30 px-3 py-2 rounded-lg animate-bounce-in">
            <FiAlertCircle className="text-red-500" />
            <span className="font-medium text-red-800 dark:text-red-200">{translate('communication.aiFeatures.urgencyDetection')}: {translate('communication.aiFeatures.flagged')}</span>
          </div>
          <div className="flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 px-3 py-2 rounded-lg">
            <FiMail className="text-blue-500" />
            <span className="font-medium text-blue-800 dark:text-blue-200">{translate('communication.aiFeatures.replySuggestion')}: "Thank you for your patience..."</span>
          </div>
          <div className="flex items-center gap-2 bg-yellow-100 dark:bg-yellow-900/30 px-3 py-2 rounded-lg">
            <FiClock className="text-yellow-500" />
            <span className="font-medium text-yellow-800 dark:text-yellow-200">{translate('communication.aiFeatures.smartReminder')}: {translate('communication.aiFeatures.followUpsSuggested')}</span>
          </div>
          <div className="flex items-center gap-2 bg-green-100 dark:bg-green-900/30 px-3 py-2 rounded-lg">
            <FiUsers className="text-green-500" />
            <span className="font-medium text-green-800 dark:text-green-200">{translate('communication.aiFeatures.sentiment')}: "{translate('communication.aiFeatures.parentFrustrated')}"</span>
          </div>
          <div className="flex items-center gap-2 bg-purple-100 dark:bg-purple-900/30 px-3 py-2 rounded-lg">
            <FiZap className="text-purple-500" />
            <span className="font-medium text-purple-800 dark:text-purple-200">{translate('communication.aiFeatures.botLog')}: {translate('communication.aiFeatures.chatbotInteractions')}</span>
          </div>
        </div>
      </div>
      {/* Audit & History */}
      <div className="bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-xl p-6 mb-10 animate-fade-in">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
          <h2 className="text-xl font-bold text-gray-700 dark:text-gray-200">{translate('communication.audit.title')}</h2>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold" onClick={() => setShowAuditModal(true)}><FiDownload className="inline mr-1" />{translate('communication.audit.export')}</button>
        </div>
        <div className="text-xs text-gray-500">{translate('communication.audit.description')}</div>
      </div>
      {/* Toast */}
      {toast && <div className="fixed bottom-6 right-6 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in">{toast}</div>}
    </div>
  );
} 