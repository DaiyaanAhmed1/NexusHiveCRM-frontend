import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useLocalization } from "../../../hooks/useLocalization";
import { 
  FiHelpCircle, 
  FiMessageSquare, 
  FiBookOpen, 
  FiPlus, 
  FiX, 
  FiEye, 
  FiMessageCircle,
  FiClock,
  FiUser,
  FiAlertCircle,
  FiCheckCircle,
  FiSearch,
  FiFilter,
  FiDownload
} from 'react-icons/fi';
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
  const { isRTL } = useLocalization();
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
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" 
           data-tour="5" 
           data-tour-title-en="Ticket Details" 
           data-tour-title-ar="تفاصيل التذكرة" 
           data-tour-content-en="View ticket details, status, and comments." 
           data-tour-content-ar="عرض تفاصيل التذكرة والحالة والتعليقات.">
        <div className="absolute inset-0" onClick={onClose} />
        <div className="relative z-10 bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full mx-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{ticket.subject}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              aria-label="Close"
            >
              <FiX className="w-6 h-6" />
            </button>
          </div>
          
          <div className="p-6 space-y-6">
            <div className="flex gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                ticket.priority === 'High' ? 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300' :
                ticket.priority === 'Medium' ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300' :
                'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300'
              }`}>
                {ticket.priority}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                ticket.status === 'Open' ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300' :
                ticket.status === 'In Progress' ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300' :
                'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300'
              }`}>
                {ticket.status}
              </span>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">{t('helpSupport.ticketDetails.title')}</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="text-sm text-gray-500 dark:text-gray-400">{t('helpSupport.ticketDetails.category')}</p>
                  <p className="font-medium text-gray-900 dark:text-white">{ticket.category} / {ticket.subcategory}</p>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="text-sm text-gray-500 dark:text-gray-400">{t('helpSupport.ticketDetails.location')}</p>
                  <p className="font-medium text-gray-900 dark:text-white">{ticket.location}</p>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="text-sm text-gray-500 dark:text-gray-400">{t('helpSupport.ticketDetails.assignedTo')}</p>
                  <p className="font-medium text-gray-900 dark:text-white">{ticket.assignedTo}</p>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="text-sm text-gray-500 dark:text-gray-400">{t('helpSupport.ticketDetails.expectedResolution')}</p>
                  <p className="font-medium text-gray-900 dark:text-white">{ticket.expectedResolution}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">{t('helpSupport.ticketDetails.description')}</h3>
              <p className="text-gray-700 dark:text-gray-200 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">{ticket.description}</p>
            </div>

            <div>
              <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">{t('helpSupport.ticketDetails.comments')}</h3>
              <div className="space-y-3">
                {ticket.comments.map((c, i) => (
                  <div key={i} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <FiUser className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                      <span className="font-semibold text-gray-900 dark:text-white">{c.user}</span>
                      <span className="text-xs text-gray-400 dark:text-gray-500">({c.date})</span>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-200">{c.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6" 
         data-tour="1" 
         data-tour-title-en="Help & Support Overview" 
         data-tour-title-ar="نظرة عامة على المساعدة والدعم" 
         data-tour-content-en="Manage support tickets or browse the knowledge base." 
         data-tour-content-ar="إدارة تذاكر الدعم أو تصفح قاعدة المعرفة.">
      
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
            <FiHelpCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('helpSupport.title')}</h1>
        </div>
        <p className="text-gray-600 dark:text-gray-300">Get help and support for your admission management needs</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-8 items-center" 
           data-tour="2" 
           data-tour-title-en="Tabs" 
           data-tour-title-ar="علامات التبويب" 
           data-tour-content-en="Switch between Support Tickets and Knowledge Base." 
           data-tour-content-ar="التبديل بين تذاكر الدعم وقاعدة المعرفة.">
<button
  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
    activeTab === 'tickets' 
      ? 'bg-blue-600 text-white shadow-lg' 
      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
  }`}
  onClick={() => setActiveTab('tickets')}
>
  <FiMessageSquare className="w-5 h-5" />
  {t('helpSupport.tabs.supportTickets')}
</button>
        <button
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
            activeTab === 'kb' 
              ? 'bg-blue-600 text-white shadow-lg' 
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
          }`}
          onClick={() => setActiveTab('kb')}
        >
          <FiBookOpen className="w-5 h-5" />
          {t('helpSupport.tabs.knowledgeBase')}
        </button>
        
        {/* Raise Ticket Button */}
        {activeTab === 'tickets' && (
          <button
            className="ml-auto flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold shadow-lg hover:bg-green-700 transition-colors dark:bg-green-700 dark:hover:bg-green-800"
            onClick={() => setShowNewTicketModal(true)}
            data-tour="3" 
            data-tour-title-en="Raise Ticket" 
            data-tour-title-ar="رفع تذكرة" 
            data-tour-content-en="Create a new support ticket here." 
            data-tour-content-ar="أنشئ تذكرة دعم جديدة من هنا."
          >
            <FiPlus className="w-5 h-5" />
            {t('helpSupport.actions.raiseTicket')}
          </button>
        )}
      </div>

      {/* Tickets Tab */}
      {activeTab === 'tickets' && (
        <div data-tour="4" 
             data-tour-title-en="Tickets" 
             data-tour-title-ar="التذاكر" 
             data-tour-content-en="Browse and open your support tickets." 
             data-tour-content-ar="تصفح وافتح تذاكر الدعم الخاصة بك.">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t('helpSupport.my_tickets')}</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {tickets.map(ticket => (
                <div key={ticket.id} 
                     className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 cursor-pointer hover:shadow-xl transition-all duration-200" 
                     onClick={() => handleTicketClick(ticket)}>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">{ticket.subject}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      ticket.status === 'Open' ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300' :
                      ticket.status === 'In Progress' ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300' :
                      'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300'
                    }`}>
                      {ticket.status}
                    </span>
                  </div>
                  
                  <div className="flex gap-2 mb-3">
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full">
                      {ticket.category}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      ticket.priority === 'High' ? 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300' :
                      ticket.priority === 'Medium' ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300' :
                      'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                    }`}>
                      {ticket.priority}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{ticket.description}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <FiClock className="w-4 h-4" />
                      {t('submitted_on')}: {ticket.submittedOn}
                    </div>
                    <div className="flex items-center gap-1">
                      <FiEye className="w-4 h-4" />
                      View Details
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Ticket Modal */}
          {showModal && <Modal ticket={selectedTicket} onClose={() => setShowModal(false)} />}
        </div>
      )}

      {/* Knowledge Base Tab */}
      {activeTab === 'kb' && (
        <div data-tour="4" 
             data-tour-title-en="Knowledge Base" 
             data-tour-title-ar="قاعدة المعرفة" 
             data-tour-content-en="Browse helpful articles and guides." 
             data-tour-content-ar="تصفح المقالات والأدلة المفيدة.">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t('helpSupport.knowledgeBase.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {knowledgeBaseArticles.map(article => (
              <div key={article.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-all duration-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                    <FiBookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white">{article.title}</h3>
                </div>
                
                <div className="flex gap-2 mb-3">
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full">
                    {article.category}
                  </span>
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs rounded-full">
                    {article.views} {t('helpSupport.knowledgeBase.views')}
                  </span>
                </div>
                
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {t('helpSupport.knowledgeBase.lastUpdated')}: {article.lastUpdated}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* New Ticket Modal */}
      {showNewTicketModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="absolute inset-0" onClick={() => setShowNewTicketModal(false)} />
          <form
            className="relative z-10 bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full mx-4 border border-gray-200 dark:border-gray-700"
            onSubmit={handleNewTicketSubmit}
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t('helpSupport.ticketForm.title')}</h2>
              <button
                type="button"
                onClick={() => setShowNewTicketModal(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                aria-label="Close"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">{t('helpSupport.ticketForm.subject')}</label>
                <input 
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white" 
                  value={newSubject} 
                  onChange={e => setNewSubject(e.target.value)} 
                  required 
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">{t('helpSupport.ticketForm.category')}</label>
                  <select 
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white" 
                    value={newCategory} 
                    onChange={e => setNewCategory(e.target.value)} 
                    required
                  >
                    <option value="">{t('helpSupport.ticketForm.select')}</option>
                    {CATEGORY_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">{t('helpSupport.ticketForm.subcategory')}</label>
                  <select 
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white" 
                    value={newSubcategory} 
                    onChange={e => setNewSubcategory(e.target.value)} 
                    required
                  >
                    <option value="">{t('helpSupport.ticketForm.select')}</option>
                    {(SUBCATEGORY_MAP[newCategory] || []).map(sub => <option key={sub} value={sub}>{sub}</option>)}
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">{t('helpSupport.ticketForm.location')}</label>
                <input 
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white" 
                  value={newLocation} 
                  onChange={e => setNewLocation(e.target.value)} 
                  required 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">{t('helpSupport.ticketForm.priority')}</label>
                <select 
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white" 
                  value={newPriority} 
                  onChange={e => setNewPriority(e.target.value)} 
                  required
                >
                  <option value="">{t('helpSupport.ticketForm.select')}</option>
                  {PRIORITY_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">{t('helpSupport.ticketForm.description')}</label>
                <textarea 
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white" 
                  rows={4} 
                  value={newDescription} 
                  onChange={e => setNewDescription(e.target.value)} 
                  required 
                />
              </div>
              
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button 
                  type="button" 
                  onClick={() => setShowNewTicketModal(false)}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 transition-colors"
                >
                  {t('helpSupport.actions.submitTicket')}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}