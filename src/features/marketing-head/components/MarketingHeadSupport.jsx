import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

// Demo data for support tickets
const supportTickets = [
  {
    id: 1,
    title: 'Campaign Analytics Dashboard Issue',
    category: 'Technical',
    priority: 'High',
    status: 'Open',
    assignedTo: 'IT Support',
    createdAt: '2024-03-15',
    lastUpdated: '2024-03-15',
    description: 'Unable to access campaign analytics dashboard. Getting 404 error.'
  },
  {
    id: 2,
    title: 'Marketing Automation Tool Access',
    category: 'Access',
    priority: 'Medium',
    status: 'In Progress',
    assignedTo: 'System Admin',
    createdAt: '2024-03-14',
    lastUpdated: '2024-03-15',
    description: 'Need access to the new marketing automation tool for the team.'
  },
  {
    id: 3,
    title: 'Email Template Editor Bug',
    category: 'Bug',
    priority: 'Low',
    status: 'Resolved',
    assignedTo: 'Development Team',
    createdAt: '2024-03-10',
    lastUpdated: '2024-03-12',
    description: 'Email template editor is not saving changes properly.'
  }
];

// Demo data for knowledge base articles
const knowledgeBaseArticles = [
  {
    id: 1,
    title: 'How to Create a New Campaign',
    category: 'Campaigns',
    views: 245,
    lastUpdated: '2024-03-10'
  },
  {
    id: 2,
    title: 'Understanding Marketing Analytics',
    category: 'Analytics',
    views: 189,
    lastUpdated: '2024-03-08'
  },
  {
    id: 3,
    title: 'Team Collaboration Guidelines',
    category: 'Team',
    views: 156,
    lastUpdated: '2024-03-05'
  }
];

const CATEGORY_OPTIONS = [
  { value: "IT", label: "IT" },
  { value: "Electrical", label: "Electrical" },
  { value: "Furniture", label: "Furniture / Infrastructure" },
  { value: "Housekeeping", label: "Housekeeping / Sanitation" },
  { value: "Transport", label: "Transportation" },
  { value: "Hostel", label: "Hostel or Accommodation" },
  { value: "Examination", label: "Examination Portal" },
  { value: "ERP", label: "ERP / CRM" },
];
const SUBCATEGORY_MAP = {
  IT: ["internetNotWorking", "systemIssue", "emailIssue", "printerIssue"],
  Electrical: ["powerOutage", "lightsNotWorking", "acNotWorking"],
  Furniture: ["chairBroken", "tableReplacement", "whiteboardIssue"],
  Housekeeping: ["cleaningRequired", "sanitization", "garbagePickup"],
  Transport: ["busDelay", "routeChange", "driverIssue"],
  Hostel: ["roomIssue", "waterSupply", "maintenance"],
  Examination: ["portalAccess", "resultIssue", "examSchedule"],
  ERP: ["loginIssue", "dataError", "featureRequest"],
};
const PRIORITY_OPTIONS = ["Low", "Medium", "High", "Urgent"];

const DEMO_USER = {
  name: "Khalid Al-Sayed",
  role: "Digital Marketing Specialist",
  email: "khalid.alsayed@mbsc.edu.sa",
  phone: "+1-234-567-8901",
};

const DEMO_TICKETS = [
  {
    id: "TCK-1001",
    subject: "WiFi not working on 2nd floor, Main Campus",
    category: "IT",
    subcategory: "internetNotWorking",
    location: "Main Campus - 2nd Floor",
    priority: "High",
    description: "No internet connectivity in the Computer Science lab.",
    status: "In Progress",
    assignedTo: "IT Support Team",
    submittedOn: "2024-06-30",
    expectedResolution: "2024-07-01",
    comments: [
      { user: "IT Support", text: "We are looking into this.", date: "2024-06-30" },
      { user: "Khalid Al-Sayed", text: "Please resolve ASAP.", date: "2024-06-30" },
    ],
    feedback: null,
  },
  {
    id: "TCK-1002",
    subject: "AC not working in classroom A302",
    category: "Electrical",
    subcategory: "acNotWorking",
    location: "Classroom A302",
    priority: "Medium",
    description: "AC is not cooling properly.",
    status: "Pending",
    assignedTo: "Campus Electrical Dept",
    submittedOn: "2024-06-29",
    expectedResolution: "2024-07-02",
    comments: [],
    feedback: null,
  },
];

export default function MarketingHeadSupport() {
  const { t, ready, i18n } = useTranslation('marketing');
  const [languageVersion, setLanguageVersion] = useState(0);
  
  // Force re-render when language changes
  useEffect(() => {
    setLanguageVersion(prev => prev + 1);
  }, [i18n.language]);

  const user = JSON.parse(localStorage.getItem('rbac_current_user'));
  const [expanded, setExpanded] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState('tickets');

  // Form state
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [location, setLocation] = useState("");
  const [priority, setPriority] = useState("");
  const [description, setDescription] = useState("");
  const [attachment, setAttachment] = useState(null);
  // Tickets state
  const [tickets, setTickets] = useState(DEMO_TICKETS);
  const [comment, setComment] = useState("");
  const [feedback, setFeedback] = useState("");
  const [showNewTicketModal, setShowNewTicketModal] = useState(false);

  // Show loading state while translations are loading
  if (!ready) {
    return <div className="flex items-center justify-center min-h-screen">{t('support.messages.loading')}</div>;
  }

  const handleTicketClick = (ticket) => {
    setSelectedTicket(ticket);
    setShowModal(true);
  };

  const Modal = ({ ticket, onClose }) => {
    if (!ticket) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
        <div className="absolute inset-0" onClick={onClose} />
        <div className="relative z-10 bg-white dark:bg-gray-800 rounded-xl p-6 max-w-2xl w-full mx-4">
          <button
            onClick={onClose}
            className="absolute top-2 right-4 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-3xl font-bold"
            aria-label={t('support.modal.close')}
          >
            &times;
          </button>
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-2">{ticket.subject}</h2>
            <div className="flex gap-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                ticket.priority === 'High' ? 'bg-red-100 text-red-700' :
                ticket.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                'bg-green-100 text-green-700'
              }`}>
                {t(`support.tickets.priority.${ticket.priority.toLowerCase()}`)}
              </span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                ticket.status === 'Open' ? 'bg-blue-100 text-blue-700' :
                ticket.status === 'In Progress' ? 'bg-yellow-100 text-yellow-700' :
                'bg-green-100 text-green-700'
              }`}>
                {t(`support.tickets.status.${ticket.status.toLowerCase().replace(' ', '')}`)}
              </span>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">{t('support.modal.ticketDetails')}</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">{t('support.tickets.table.category')}</p>
                  <p className="font-medium">{ticket.category} / {ticket.subcategory}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">{t('support.form.location')}</p>
                  <p className="font-medium">{ticket.location}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">{t('support.tickets.table.assignedTo')}</p>
                  <p className="font-medium">{ticket.assignedTo}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">{t('support.messages.created')}</p>
                  <p className="font-medium">{ticket.submittedOn}</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">{t('support.form.description')}</h3>
              <p className="text-gray-700 dark:text-gray-300">{ticket.description}</p>
            </div>
          </div>
          <div className="mt-6 flex gap-3">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              {t('support.modal.updateStatus')}
            </button>
            <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">
              {t('support.modal.addComment')}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const newTicket = {
      id: `TCK-${1000 + tickets.length + 1}`,
      subject: description.slice(0, 40) + (description.length > 40 ? "..." : ""),
      category,
      subcategory,
      location,
      priority,
      description,
      status: "Pending",
      assignedTo: getAssignedDept(category),
      submittedOn: new Date().toISOString().slice(0, 10),
      expectedResolution: "TBD",
      comments: [],
      feedback: null,
    };
    setTickets([newTicket, ...tickets]);
    // Reset form
    setCategory(""); setSubcategory(""); setLocation(""); setPriority(""); setDescription(""); setAttachment(null);
    alert(t('support.messages.ticketSubmitted'));
  };

  function getAssignedDept(cat) {
    switch (cat) {
      case "IT": return "IT Support Team";
      case "Electrical": return "Campus Electrical Dept";
      case "Furniture": return "Facilities Management";
      case "Housekeeping": return "Campus Maintenance";
      case "Transport": return "Transport Department";
      case "Hostel": return "Hostel Warden Office";
      case "Examination": return "Exam Support Team";
      case "ERP": return "CRM Admin Support";
      default: return "General Support";
    }
  }

  // Modal actions
  const openModal = (ticket) => { setSelectedTicket(ticket); setShowModal(true); setComment(""); setFeedback(ticket.feedback || ""); };
  const closeModal = () => { setShowModal(false); setSelectedTicket(null); setComment(""); setFeedback(""); };
  const handleAddComment = () => {
    if (comment.trim()) {
      setTickets(tickets.map(t => t.id === selectedTicket.id ? { ...t, comments: [...t.comments, { user: DEMO_USER.name, text: comment, date: new Date().toISOString().slice(0, 10) }] } : t));
      setComment("");
    }
  };
  const handleCloseTicket = () => {
    setTickets(tickets.map(t => t.id === selectedTicket.id ? { ...t, status: "Resolved", feedback } : t));
    closeModal();
  };

  return (
    <div key={`${i18n.language}-${languageVersion}`} className="flex flex-col gap-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('support.title')}</h1>
          <p className="text-sm text-gray-600 dark:text-gray-300">{t('support.subtitle')}</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700" onClick={() => setShowNewTicketModal(true)}>
            {t('support.buttons.newTicket')}
          </button>
          <button className="px-4 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">
            {t('support.buttons.contactSupport')}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b dark:border-gray-700">
        <button
          className={`pb-2 px-1 ${
            activeTab === 'tickets'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('tickets')}
        >
          {t('support.tabs.tickets')}
        </button>
        <button
          className={`pb-2 px-1 ${
            activeTab === 'knowledge'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('knowledge')}
        >
          {t('support.tabs.knowledge')}
        </button>
      </div>

      {/* Content */}
      {activeTab === 'tickets' ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">{t('support.tickets.title')}</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b dark:border-gray-700">
                    <th className="pb-3 font-medium">{t('support.tickets.table.title')}</th>
                    <th className="pb-3 font-medium">{t('support.tickets.table.category')}</th>
                    <th className="pb-3 font-medium">{t('support.tickets.table.priority')}</th>
                    <th className="pb-3 font-medium">{t('support.tickets.table.status')}</th>
                    <th className="pb-3 font-medium">{t('support.tickets.table.assignedTo')}</th>
                    <th className="pb-3 font-medium">{t('support.tickets.table.lastUpdated')}</th>
                    <th className="pb-3 font-medium">{t('support.tickets.table.actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {tickets.map((ticket) => (
                    <tr key={ticket.id} className="border-b dark:border-gray-700">
                      <td className="py-4">
                        <div>
                          <p className="font-medium">{ticket.subject}</p>
                          <p className="text-sm text-gray-500">
                            {t('support.messages.created')}: {ticket.submittedOn}
                          </p>
                        </div>
                      </td>
                      <td className="py-4">{t(`support.categories.${ticket.category}`)} / {t(`support.subcategories.${ticket.subcategory}`)}</td>
                      <td className="py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          ticket.priority === 'High' ? 'bg-red-100 text-red-700' :
                          ticket.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {t(`support.tickets.priority.${ticket.priority.toLowerCase()}`)}
                        </span>
                      </td>
                      <td className="py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          ticket.status === 'Open' ? 'bg-blue-100 text-blue-700' :
                          ticket.status === 'In Progress' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {t(`support.tickets.status.${ticket.status.toLowerCase().replace(' ', '')}`)}
                        </span>
                      </td>
                      <td className="py-4">{ticket.assignedTo}</td>
                      <td className="py-4">{ticket.expectedResolution}</td>
                      <td className="py-4">
                        <button
                          onClick={() => openModal(ticket)}
                          className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          {t('support.tickets.actions.viewDetails')}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">{t('support.knowledge.title')}</h2>
            <div className="grid gap-4">
              {knowledgeBaseArticles.map((article) => (
                <div
                  key={article.id}
                  className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{article.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {t('support.knowledge.category')}: {article.category}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">
                        {article.views} {t('support.knowledge.views')}
                      </p>
                      <p className="text-sm text-gray-500">
                        {t('support.knowledge.updated')}: {article.lastUpdated}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {showModal && selectedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="absolute inset-0" onClick={closeModal} />
          <div className="relative z-10 bg-white dark:bg-gray-800 rounded-xl p-6 max-w-lg w-full mx-4">
            <button onClick={closeModal} className="absolute top-2 right-4 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-3xl font-bold" aria-label={t('support.modal.close')}>&times;</button>
            <h2 className="text-xl font-bold mb-2">{t('support.modal.ticketDetails')}</h2>
            <div className="mb-2 text-xs text-gray-500">ID: {selectedTicket.id}</div>
            <div className="mb-2"><b>{t('support.modal.subject')}:</b> {selectedTicket.subject}</div>
            <div className="mb-2"><b>{t('support.tickets.table.category')}:</b> {t(`support.categories.${selectedTicket.category}`)} / {t(`support.subcategories.${selectedTicket.subcategory}`)}</div>
            <div className="mb-2"><b>{t('support.form.location')}:</b> {selectedTicket.location}</div>
            <div className="mb-2"><b>{t('support.tickets.table.priority')}:</b> {selectedTicket.priority}</div>
            <div className="mb-2"><b>{t('support.tickets.table.status')}:</b> {selectedTicket.status}</div>
            <div className="mb-2"><b>{t('support.tickets.table.assignedTo')}:</b> {selectedTicket.assignedTo}</div>
            <div className="mb-2"><b>{t('support.form.description')}:</b> {selectedTicket.description}</div>
            <div className="mb-2"><b>{t('support.messages.created')}:</b> {selectedTicket.submittedOn}</div>
            <div className="mb-2"><b>{t('support.modal.expectedResolution')}:</b> {selectedTicket.expectedResolution}</div>
            {/* Comments */}
            <div className="mt-4">
              <h3 className="font-semibold mb-2">{t('support.modal.comments')}</h3>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {selectedTicket.comments.map((c, i) => (
                  <div key={i} className="bg-gray-100 dark:bg-gray-700 rounded p-2 text-xs">
                    <b>{c.user}:</b> {c.text} <span className="text-gray-400">({c.date})</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-2 mt-2">
                <input className="flex-1 rounded border px-2 py-1 text-xs" value={comment} onChange={e => setComment(e.target.value)} placeholder={t('support.form.addComment')} />
                <button className="px-3 py-1 bg-blue-600 text-white rounded text-xs" onClick={handleAddComment}>{t('support.modal.send')}</button>
              </div>
            </div>
            {/* Feedback/Close */}
            {selectedTicket.status !== "Resolved" ? (
              <div className="mt-4 flex justify-end">
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg" onClick={handleCloseTicket}>{t('support.modal.closeAndRate')}</button>
              </div>
            ) : (
              <div className="mt-4">
                <label className="block text-sm font-medium mb-1">{t('support.form.feedback')}</label>
                <textarea className="w-full rounded border px-3 py-2" value={feedback} onChange={e => setFeedback(e.target.value)} rows={2} placeholder={t('support.form.feedbackPlaceholder')} />
              </div>
            )}
          </div>
        </div>
      )}

      {showNewTicketModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="absolute inset-0" onClick={() => setShowNewTicketModal(false)} />
          <div className="relative z-10 bg-white dark:bg-gray-800 rounded-xl p-6 max-w-lg w-full mx-4">
            <button onClick={() => setShowNewTicketModal(false)} className="absolute top-2 right-4 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-3xl font-bold" aria-label={t('support.modal.close')}>&times;</button>
            <h2 className="text-xl font-bold mb-4">{t('support.modal.createNewTicket')}</h2>
            <form onSubmit={e => { handleSubmit(e); setShowNewTicketModal(false); }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">{t('support.form.category')}</label>
                <select className="w-full rounded border px-3 py-2" value={category} onChange={e => { setCategory(e.target.value); setSubcategory(""); }} required>
                  <option value="">{t('support.form.selectCategory')}</option>
                  {CATEGORY_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{t(`support.categories.${opt.value}`)}</option>)}
                </select>
              </div>
              {category && (
                <div>
                  <label className="block text-sm font-medium mb-1">{t('support.form.subcategory')}</label>
                  <select className="w-full rounded border px-3 py-2" value={subcategory} onChange={e => setSubcategory(e.target.value)} required>
                    <option value="">{t('support.form.selectSubcategory')}</option>
                    {SUBCATEGORY_MAP[category].map(sub => <option key={sub} value={sub}>{t(`support.subcategories.${sub}`)}</option>)}
                  </select>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium mb-1">{t('support.form.location')}</label>
                <input className="w-full rounded border px-3 py-2" value={location} onChange={e => setLocation(e.target.value)} required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">{t('support.form.priority')}</label>
                <select className="w-full rounded border px-3 py-2" value={priority} onChange={e => setPriority(e.target.value)} required>
                  <option value="">{t('support.form.selectPriority')}</option>
                  {PRIORITY_OPTIONS.map(opt => <option key={opt} value={opt}>{t(`support.tickets.priority.${opt.toLowerCase()}`)}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">{t('support.form.description')}</label>
                <textarea className="w-full rounded border px-3 py-2" value={description} onChange={e => setDescription(e.target.value)} rows={3} required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">{t('support.form.attachment')}</label>
                <input type="file" className="w-full" onChange={e => setAttachment(e.target.files[0])} />
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button type="button" className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600" onClick={() => setShowNewTicketModal(false)}>{t('support.modal.cancel')}</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">{t('support.modal.submitTicket')}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 