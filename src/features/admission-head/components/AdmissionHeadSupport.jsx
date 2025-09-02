import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

// Demo data for support tickets
const DEMO_TICKETS = [
  {
    id: "TCK-2001",
    subject: "Unable to access lead management dashboard",
    category: "IT",
    subcategory: "System issue",
    location: "Admissions Office",
    priority: "High",
    description: "Getting 500 error when accessing the dashboard.",
    status: "In Progress",
    assignedTo: "IT Support Team",
    submittedOn: "2024-07-01",
    expectedResolution: "2024-07-02",
    comments: [
      { user: "IT Support", text: "Issue acknowledged. Working on a fix.", date: "2024-07-01" },
      { user: "Admissions Head", text: "Please resolve urgently.", date: "2024-07-01" },
    ],
    feedback: null,
  },
  {
    id: "TCK-2002",
    subject: "Document upload not working for new applicants",
    category: "ERP",
    subcategory: "Feature request",
    location: "Admissions Portal",
    priority: "Medium",
    description: "Applicants are unable to upload documents during application.",
    status: "Pending",
    assignedTo: "ERP Team",
    submittedOn: "2024-06-30",
    expectedResolution: "2024-07-03",
    comments: [],
    feedback: null,
  },
];

// Demo data for knowledge base articles
const knowledgeBaseArticles = [
  {
    id: 1,
    title: 'How to Review Applications',
    category: 'Applications',
    views: 120,
    lastUpdated: '2024-06-25'
  },
  {
    id: 2,
    title: 'Managing Admission Cycles',
    category: 'Admissions',
    views: 98,
    lastUpdated: '2024-06-20'
  },
  {
    id: 3,
    title: 'Uploading and Verifying Documents',
    category: 'Documents',
    views: 75,
    lastUpdated: '2024-06-18'
  }
];

const CATEGORY_OPTIONS = [
  { value: "IT", label: "IT" },
  { value: "ERP", label: "ERP / CRM" },
  { value: "Admissions", label: "Admissions" },
  { value: "Documents", label: "Documents" },
  { value: "Payments", label: "Payments" },
  { value: "Facilities", label: "Facilities" },
];
const SUBCATEGORY_MAP = {
  IT: ["System issue", "Email issue", "Printer issue"],
  ERP: ["Login issue", "Data error", "Feature request"],
  Admissions: ["Cycle setup", "Lead assignment", "Application review"],
  Documents: ["Upload issue", "Verification", "Download error"],
  Payments: ["Payment link", "Refund", "Status update"],
  Facilities: ["Room issue", "Maintenance", "Cleaning"],
};
const PRIORITY_OPTIONS = ["Low", "Medium", "High", "Urgent"];

export default function AdmissionHeadSupport() {
  const { t } = useTranslation(['admission', 'common']);
  const user = JSON.parse(localStorage.getItem('rbac_current_user'));
  const [expanded, setExpanded] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState('tickets');
  const [showNewTicketModal, setShowNewTicketModal] = useState(false);

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

  // New Ticket Form State
  const [newSubject, setNewSubject] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newSubcategory, setNewSubcategory] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newPriority, setNewPriority] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const handleTicketClick = (ticket) => {
    setSelectedTicket(ticket);
    setShowModal(true);
  };

  const handleNewTicketSubmit = (e) => {
    e.preventDefault();
    const newTicket = {
      id: `TCK-${2000 + tickets.length + 1}`,
      subject: newSubject,
      category: newCategory,
      subcategory: newSubcategory,
      location: newLocation,
      priority: newPriority,
      description: newDescription,
      status: "Open",
      assignedTo: "Support Team",
      submittedOn: new Date().toISOString().slice(0, 10),
      expectedResolution: "TBD",
      comments: [],
      feedback: null,
    };
    setTickets([newTicket, ...tickets]);
    setShowNewTicketModal(false);
    setNewSubject(""); setNewCategory(""); setNewSubcategory(""); setNewLocation(""); setNewPriority(""); setNewDescription("");
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
            aria-label="Close"
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
                {ticket.priority}
              </span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                ticket.status === 'Open' ? 'bg-blue-100 text-blue-700' :
                ticket.status === 'In Progress' ? 'bg-yellow-100 text-yellow-700' :
                'bg-green-100 text-green-700'
              }`}>
                {ticket.status}
              </span>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">{t('helpSupport.ticketDetails.title')}</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">{t('helpSupport.ticketDetails.category')}</p>
                  <p className="font-medium">{ticket.category} / {ticket.subcategory}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">{t('helpSupport.ticketDetails.location')}</p>
                  <p className="font-medium">{ticket.location}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">{t('helpSupport.ticketDetails.assignedTo')}</p>
                  <p className="font-medium">{ticket.assignedTo}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">{t('helpSupport.ticketDetails.expectedResolution')}</p>
                  <p className="font-medium">{ticket.expectedResolution}</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">{t('helpSupport.ticketDetails.description')}</h3>
              <p className="text-gray-700 dark:text-gray-200">{ticket.description}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">{t('helpSupport.ticketDetails.comments')}</h3>
              <ul className="space-y-2">
                {ticket.comments.map((c, i) => (
                  <li key={i} className="text-sm"><span className="font-semibold">{c.user}:</span> {c.text} <span className="text-xs text-gray-400">({c.date})</span></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 animate-fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">{t('helpSupport.title')}</h1>
      <div className="flex gap-4 mb-6 items-center">
        <button
          className={`px-4 py-2 rounded-lg font-semibold ${activeTab === 'tickets' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-700'}`}
          onClick={() => setActiveTab('tickets')}
        >
          {t('helpSupport.tabs.supportTickets')}
        </button>
        <button
          className={`px-4 py-2 rounded-lg font-semibold ${activeTab === 'kb' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-700'}`}
          onClick={() => setActiveTab('kb')}
        >
          {t('helpSupport.tabs.knowledgeBase')}
        </button>
        {/* Raise Ticket Button */}
        {activeTab === 'tickets' && (
          <button
            className="ml-auto px-4 py-2 bg-green-600 text-white rounded-lg font-semibold shadow hover:bg-green-700 transition"
            onClick={() => setShowNewTicketModal(true)}
          >
            {t('helpSupport.actions.raiseTicket')}
          </button>
        )}
      </div>
      {activeTab === 'tickets' && (
        <div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">{t('my_tickets')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tickets.map(ticket => (
                <div key={ticket.id} className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 cursor-pointer hover:shadow-lg transition" onClick={() => handleTicketClick(ticket)}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-blue-700 dark:text-blue-300">{ticket.subject}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      ticket.status === 'Open' ? 'bg-blue-100 text-blue-700' :
                      ticket.status === 'In Progress' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {ticket.status}
                    </span>
                  </div>
                  <div className="flex gap-2 text-xs mb-1">
                    <span className="bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded">{ticket.category}</span>
                    <span className="bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded">{ticket.priority}</span>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">{ticket.description}</div>
                  <div className="text-xs text-gray-400 mt-2">{t('submitted_on')}: {ticket.submittedOn}</div>
                </div>
              ))}
            </div>
          </div>
          {/* Ticket Modal */}
          {showModal && <Modal ticket={selectedTicket} onClose={() => setShowModal(false)} />}
        </div>
      )}
      {activeTab === 'kb' && (
        <div>
          <h2 className="text-xl font-semibold mb-2">{t('helpSupport.knowledgeBase.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {knowledgeBaseArticles.map(article => (
              <div key={article.id} className="bg-white dark:bg-gray-800 rounded-xl shadow p-4">
                <div className="font-bold text-blue-700 dark:text-blue-300 mb-1">{article.title}</div>
                <div className="flex gap-2 text-xs mb-1">
                  <span className="bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded">{article.category}</span>
                  <span className="bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded">{article.views} {t('helpSupport.knowledgeBase.views')}</span>
                </div>
                <div className="text-xs text-gray-400">{t('helpSupport.knowledgeBase.lastUpdated')}: {article.lastUpdated}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* New Ticket Modal */}
      {showNewTicketModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="absolute inset-0" onClick={() => setShowNewTicketModal(false)} />
          <form
            className="relative z-10 bg-white dark:bg-gray-800 rounded-xl p-6 max-w-lg w-full mx-4"
            onSubmit={handleNewTicketSubmit}
          >
            <button
              type="button"
              onClick={() => setShowNewTicketModal(false)}
              className="absolute top-2 right-4 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-3xl font-bold"
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4">{t('helpSupport.ticketForm.title')}</h2>
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">{t('helpSupport.ticketForm.subject')}</label>
              <input className="w-full rounded border px-3 py-2" value={newSubject} onChange={e => setNewSubject(e.target.value)} required />
            </div>
            <div className="mb-3 grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1">{t('helpSupport.ticketForm.category')}</label>
                <select className="w-full rounded border px-3 py-2" value={newCategory} onChange={e => setNewCategory(e.target.value)} required>
                  <option value="">{t('helpSupport.ticketForm.select')}</option>
                  {CATEGORY_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">{t('helpSupport.ticketForm.subcategory')}</label>
                <select className="w-full rounded border px-3 py-2" value={newSubcategory} onChange={e => setNewSubcategory(e.target.value)} required>
                  <option value="">{t('helpSupport.ticketForm.select')}</option>
                  {(SUBCATEGORY_MAP[newCategory] || []).map(sub => <option key={sub} value={sub}>{sub}</option>)}
                </select>
              </div>
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">{t('helpSupport.ticketForm.location')}</label>
              <input className="w-full rounded border px-3 py-2" value={newLocation} onChange={e => setNewLocation(e.target.value)} required />
            </div>
            <div className="mb-3 grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1">{t('helpSupport.ticketForm.priority')}</label>
                <select className="w-full rounded border px-3 py-2" value={newPriority} onChange={e => setNewPriority(e.target.value)} required>
                  <option value="">{t('helpSupport.ticketForm.select')}</option>
                  {PRIORITY_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </div>
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">{t('helpSupport.ticketForm.description')}</label>
              <textarea className="w-full rounded border px-3 py-2" rows={3} value={newDescription} onChange={e => setNewDescription(e.target.value)} required />
            </div>
            <button type="submit" className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold">{t('helpSupport.actions.submitTicket')}</button>
          </form>
        </div>
      )}
    </div>
  );
} 