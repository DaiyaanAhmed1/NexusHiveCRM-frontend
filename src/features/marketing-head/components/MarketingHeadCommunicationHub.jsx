import React, { useState, useEffect, useRef } from 'react';
import { useLocalization } from "/src/hooks/useLocalization";
import { FiTarget } from 'react-icons/fi';
import MarketingReplySuggestions from './ai/MarketingReplySuggestions';
import { useTranslation } from 'react-i18next';
import { FiMail, FiMessageCircle, FiPhone, FiUsers, FiBell, FiCalendar, FiZap, FiFileText, FiSend, FiUser, FiChevronRight, FiSearch, FiDownload, FiPlus, FiAlertCircle, FiStar, FiInbox, FiClock, FiTrendingUp, FiTrendingDown, FiSettings, FiCheck } from 'react-icons/fi';
// Demo data for communication channels
const communicationChannels = [
  {
    id: 1,
    name: 'Team Announcements',
    type: 'Internal',
    lastMessage: 'Q2 Marketing Strategy Meeting - Tomorrow at 10 AM',
    participants: 15,
    unread: 3,
    status: 'Active'
  },
  {
    id: 2,
    name: 'Campaign Updates',
    type: 'Project',
    lastMessage: 'Summer Campaign assets are ready for review',
    participants: 8,
    unread: 1,
    status: 'Active'
  },
  {
    id: 3,
    name: 'Client Communications',
    type: 'External',
    lastMessage: 'New client onboarding scheduled for next week',
    participants: 12,
    unread: 0,
    status: 'Active'
  }
];

// Demo data for recent messages
const recentMessages = [
  {
    id: 1,
    sender: 'John Doe',
    content: 'Please review the latest campaign metrics',
    timestamp: '10:30 AM',
    channel: 'Campaign Updates'
  },
  {
    id: 2,
    sender: 'Jane Smith',
    content: 'Team meeting agenda has been updated',
    timestamp: '09:45 AM',
    channel: 'Team Announcements'
  },
  {
    id: 3,
    sender: 'Mike Johnson',
    content: 'New client presentation is ready',
    timestamp: 'Yesterday',
    channel: 'Client Communications'
  }
];

// Demo data for lead communications (historical, before June 14, 2025)
const leadComms = [
  { id: 1, name: "Saudi Arabia", channel: "Email", lastMsg: "Interested in MBA program", date: "2025-06-10", engagement: 0.85 },
  { id: 2, name: "Saudi Arabia", channel: "WhatsApp", lastMsg: "Requested brochure", date: "2025-06-09", engagement: 0.72 },
  { id: 3, name: "Saudi Arabia", channel: "SMS", lastMsg: "Sent application link", date: "2025-06-08", engagement: 0.60 },
];

const teamChats = [
  { id: 1, room: "MBA Campaign", lastMsg: "Design ready for review", unread: 2 },
  { id: 2, room: "Social Media", lastMsg: "Scheduled next post", unread: 0 },
  { id: 3, room: "Events", lastMsg: "Venue confirmed", unread: 1 },
];

// Demo data for campaign messages (mix of future and past)
const campaignMsgs = [
  { id: 1, type: "Email", name: "Spring Blast", status: "Scheduled", segment: "All Leads", sendTime: "2025-06-16 10:00" },
  { id: 2, type: "WhatsApp", name: "Event Reminder", status: "Sent", segment: "Event Attendees", sendTime: "2025-06-12 09:00" },
  { id: 3, type: "SMS", name: "App Deadline", status: "Draft", segment: "Applicants", sendTime: "-" },
];

// Demo data for vendor communications (historical)
const vendorComms = [
  { id: 1, name: "Saudi Arabia", type: "Ad Agency", lastMsg: "Sent invoice", date: "2025-06-07", performance: "High" },
  { id: 2, name: "Saudi Arabia", type: "Printer", lastMsg: "Shared creative", date: "2025-06-06", performance: "Medium" },
];

// Demo data for communication calendar (future events)
const commCalendar = [
  { id: 1, event: "MBA Email Blast", type: "Email", date: "2025-06-16", time: "10:00" },
  { id: 2, event: "Open Day Reminder", type: "WhatsApp", date: "2025-06-18", time: "09:00" },
];

// Demo data for notifications (historical)
const notifications = [
  { id: 1, type: "Lead", msg: "Lead Saudi Arabia viewed brochure 3 times", date: "2025-06-10", urgent: false },
  { id: 2, type: "Campaign", msg: "Spring Blast sent successfully", date: "2025-06-09", urgent: false },
  { id: 3, type: "Internal", msg: "Reply pending from design team", date: "2025-06-08", urgent: true },
];

// Demo data for communication logs (historical)
const commLogs = [
  { id: 1, name: "Saudi Arabia", channel: "Email", outcome: "Opened", date: "2025-06-10" },
  { id: 2, name: "Saudi Arabia", channel: "WhatsApp", outcome: "Clicked", date: "2025-06-09" },
  { id: 3, name: "Saudi Arabia", channel: "SMS", outcome: "Delivered", date: "2025-06-08" },
];




export default function MarketingHeadCommunicationHub() {
  const { t, ready, i18n } = useTranslation('marketing');
  const [languageVersion, setLanguageVersion] = useState(0);
  const { isRTLMode } = useLocalization();
  
  // AI Features State
const [showReplySuggestions, setShowReplySuggestions] = useState(false);
const [selectedLeadForReply, setSelectedLeadForReply] = useState(null);
const [showConfirmation, setShowConfirmation] = useState(false);
const [confirmationMessage, setConfirmationMessage] = useState('');
const [confirmationType, setConfirmationType] = useState('');

// Refs for auto-scroll functionality
const replySuggestionsRef = useRef(null);

  useEffect(() => {
    setLanguageVersion(prev => prev + 1);
  }, [i18n.language]);

  // Show loading state while translations are loading
  if (!ready) {
    return <div className="flex items-center justify-center min-h-screen">{t('support.messages.loading')}</div>;
  }

  // Debug: Log translation keys to console
  console.log('Marketing Communication - Language:', i18n.language);
  console.log('Marketing Communication - Ready:', ready);
  console.log('Marketing Communication - Title translation:', t('communication.title'));

  const user = JSON.parse(localStorage.getItem('rbac_current_user'));
  const [expanded, setExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newMessage, setNewMessage] = useState('');

  const handleChannelClick = (channel) => {
    setSelectedChannel(channel);
    setShowModal(true);
  };

  // Auto-scroll to AI sections
const scrollToAISection = (sectionRef) => {
  if (sectionRef.current) {
    sectionRef.current.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start' 
    });
  }
};

// Handle AI button clicks with auto-scroll
const handleShowReplySuggestions = () => {
  setShowReplySuggestions(!showReplySuggestions);
  if (!showReplySuggestions) {
    setTimeout(() => scrollToAISection(replySuggestionsRef), 100);
  }
};

  const Modal = ({ channel, onClose }) => {
    if (!channel) return null;
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
            <h2 className="text-xl font-bold mb-2">{channel.name}</h2>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              channel.type === 'Internal' ? 'bg-blue-100 text-blue-700' :
              channel.type === 'Project' ? 'bg-green-100 text-green-700' :
              'bg-purple-100 text-purple-700'
            }`}>
              {t(`communication.status.${channel.type.toLowerCase()}`)}
            </span>
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">{t('communication.modal.channelDetails')}</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">{t('communication.modal.participants')}</p>
                  <p className="font-medium">{channel.participants}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">{t('communication.modal.status')}</p>
                  <p className="font-medium">{channel.status}</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">{t('communication.modal.recentMessages')}</h3>
              <div className="space-y-2">
                {recentMessages.map((message) => (
                  <div key={message.id} className="p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{message.sender}</p>
                        <p className="text-sm text-gray-500">{message.timestamp}</p>
                      </div>
                    </div>
                    <p className="text-sm mt-1">{message.content}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder={t('communication.modal.typeYourMessage')}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
                rows={3}
              />
              <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                {t('communication.modal.sendMessage')}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`flex flex-col gap-10 animate-fade-in ${isRTLMode ? 'rtl' : 'ltr'}`} data-tour="1" data-tour-title-en="Communication Overview" data-tour-title-ar="نظرة عامة على التواصل" data-tour-content-en="Lead comms, team collaboration, messaging, and calendar." data-tour-content-ar="تواصل العملاء، تعاون الفريق، الرسائل، والتقويم." data-tour-position="bottom">
{/* Header */}
<div className={`flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-2 border-b border-gray-200 dark:border-gray-700 ${isRTLMode ? 'flex-row-reverse' : ''}`}>
  <div className={isRTLMode ? 'text-right' : 'text-left'}>
    <h1 className={`text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2 ${isRTLMode ? 'flex-row-reverse' : ''}`}>
      {isRTLMode && <FiMessageCircle className="text-blue-500" />}
      {t('communication.title')}
      {!isRTLMode && <FiMessageCircle className="text-blue-500" />}
    </h1>
    <p className="text-sm text-gray-600 dark:text-gray-300">{t('communication.subtitle')}</p>
  </div>
  
  {/* AI Features Button */}
  <button 
    className={`px-4 py-2 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center gap-2 ${isRTLMode ? 'flex-row-reverse' : ''}`}
    onClick={handleShowReplySuggestions}
  >
    <FiTarget /> 
    {isRTLMode ? 'اقتراحات الرد بالذكاء الاصطناعي' : 'AI Reply Suggestions'}
  </button>
</div>

{/* AI Reply Suggestions Section */}
{showReplySuggestions && (
  <section 
    ref={replySuggestionsRef}
    className="bg-white dark:bg-gray-800 rounded-xl shadow p-6"
    dir={isRTLMode ? 'rtl' : 'ltr'}
  >
    <div className={`flex items-center gap-2 mb-4 ${isRTLMode ? 'flex-row-reverse' : ''}`}>
      <FiTarget className="text-purple-500" />
      <h2 className="text-lg font-semibold">
        {isRTLMode ? 'اقتراحات الرد بالذكاء الاصطناعي' : 'AI Reply Suggestions'}
      </h2>
    </div>
    <MarketingReplySuggestions 
      leadContext={{
        name: "Saudi Arabia",
        lastMessage: "Interested in MBA program",
        channel: "Email",
        engagement: 0.85
      }}
      onSelectSuggestion={(suggestion) => {
        console.log('Selected suggestion:', suggestion);
        setConfirmationMessage(`Reply suggestion "${suggestion}" has been applied successfully!`);
        setConfirmationType('success');
        setShowConfirmation(true);
      }}
      onShowConfirmation={(message, type) => {
        setConfirmationMessage(message);
        setConfirmationType(type);
        setShowConfirmation(true);
      }}
    />
  </section>
)}

      {/* 1. Lead Communication Panel */}
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow p-6" data-tour="2" data-tour-title-en="Lead Communication" data-tour-title-ar="تواصل العملاء" data-tour-content-en="Recent lead conversations and AI suggestions." data-tour-content-ar="محادثات العملاء الأخيرة واقتراحات الذكاء الاصطناعي.">
      <div className={`flex items-center gap-2 mb-4 ${isRTLMode ? 'flex-row-reverse' : ''}`}>
          <FiMail className="text-blue-500" />
          <h2 className="text-lg font-semibold">{t('communication.sections.leadCommunicationPanel')}</h2>
          <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded animate-pulse">{t('communication.aiFeatures.aiResponseSuggestions')}</span>
          <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded animate-pulse">{t('communication.aiFeatures.toneOptimizer')}</span>
          <span className="ml-2 text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded animate-pulse">{t('communication.aiFeatures.engagementTracker')}</span>
        </div>
        <div className="overflow-x-auto mb-4">
          <table className="w-full">
            <thead>
            <tr className={`border-b dark:border-gray-700 ${isRTLMode ? 'text-right' : 'text-left'}`}>
                <th className="pb-3 font-medium">{t('communication.leadCommunication.lead')}</th>
                <th className="pb-3 font-medium">{t('communication.leadCommunication.channel')}</th>
                <th className="pb-3 font-medium">{t('communication.leadCommunication.lastMessage')}</th>
                <th className="pb-3 font-medium">{t('communication.leadCommunication.date')}</th>
                <th className="pb-3 font-medium">{t('communication.leadCommunication.engagement')}</th>
              </tr>
            </thead>
            <tbody>
              {leadComms.map((c) => (
                <tr key={c.id} className="border-b dark:border-gray-700">
                  <td className="py-3 font-medium">{c.name}</td>
                  <td className="py-3">{c.channel}</td>
                  <td className="py-3">{c.lastMsg}</td>
                  <td className="py-3">{c.date}</td>
                  <td className="py-3">
                    <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="h-2 rounded-full bg-blue-500" style={{ width: `${c.engagement * 100}%` }}></div>
                    </div>
                    <span className="text-xs ml-2">{(c.engagement * 100).toFixed(0)}%</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex-1">
            <div className="font-medium mb-1">{t('communication.leadCommunication.aiResponseSuggestion')}</div>
            <div className="text-sm text-blue-700 dark:text-blue-300">"Hi, thanks for your interest! Would you like to schedule a call to discuss the MBA program?"</div>
          </div>
          <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg flex-1">
            <div className="font-medium mb-1">{t('communication.leadCommunication.aiToneOptimizer')}</div>
            <div className="text-sm text-green-700 dark:text-green-300">Suggestion: Use a more friendly tone for higher conversion.</div>
          </div>
        </div>
      </section>

      {/* 2. Team Collaboration Channel */}
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow p-6" data-tour="3" data-tour-title-en="Team Collaboration" data-tour-title-ar="تعاون الفريق" data-tour-content-en="Rooms, announcements, and AI summaries." data-tour-content-ar="الغرف والإعلانات وملخصات الذكاء الاصطناعي.">
        <div className="flex items-center gap-2 mb-4">
          <FiUsers className="text-purple-500" />
          <h2 className="text-lg font-semibold">{t('communication.sections.teamCollaborationChannel')}</h2>
          <span className="ml-2 text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded animate-pulse">{t('communication.aiFeatures.aiSummarization')}</span>
          <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded animate-pulse">{t('communication.aiFeatures.smartFileSuggestions')}</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h3 className="font-medium mb-2">{t('communication.teamCollaboration.chatRooms')}</h3>
            <ul className="space-y-2">
              {teamChats.map((chat) => (
                <li key={chat.id} className="flex items-center gap-2">
                  <FiMessageCircle className="text-blue-400" />
                  <span className="font-medium">{chat.room}</span>
                  <span className="text-xs text-gray-500">{chat.lastMsg}</span>
                  {chat.unread > 0 && <span className="ml-auto text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">{chat.unread} {t('communication.teamCollaboration.new')}</span>}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h3 className="font-medium mb-2">{t('communication.teamCollaboration.announcements')}</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2"><FiBell className="text-yellow-500" /> {t('communication.demoData.mbaCampaignKickoff')}</li>
              <li className="flex items-center gap-2"><FiBell className="text-yellow-500" /> {t('communication.demoData.socialMediaCalendarUpdated')}</li>
            </ul>
          </div>
        </div>
        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg mb-4">
          <div className="font-medium mb-1">{t('communication.teamCollaboration.aiAutoSummarization')}</div>
          <div className="text-sm text-yellow-700 dark:text-yellow-300">"3 action points: 1) Review design, 2) Approve content, 3) Schedule next post."</div>
        </div>
        <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
          <div className="font-medium mb-1">{t('communication.teamCollaboration.aiSmartFileSuggestion')}</div>
          <div className="text-sm text-blue-700 dark:text-blue-300">Suggested: "MBA_Brochure_v2.pdf" for campaign discussion.</div>
        </div>
      </section>

      {/* 3. Campaign Messaging Center */}
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow p-6" data-tour="4" data-tour-title-en="Messaging Center" data-tour-title-ar="مركز الرسائل" data-tour-content-en="Outbound messages, segments, and best times." data-tour-content-ar="الرسائل الصادرة والشرائح وأفضل الأوقات.">
        <div className="flex items-center gap-2 mb-4">
          <FiSend className="text-green-500" />
          <h2 className="text-lg font-semibold">{t('communication.sections.campaignMessagingCenter')}</h2>
          <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded animate-pulse">{t('communication.aiFeatures.sendTimeOptimization')}</span>
          <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded animate-pulse">{t('communication.aiFeatures.subjectLinePredictor')}</span>
          <span className="ml-2 text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded animate-pulse">{t('communication.aiFeatures.abTestingInsights')}</span>
        </div>
        <div className="overflow-x-auto mb-4">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b dark:border-gray-700">
                <th className="pb-3 font-medium">{t('communication.campaignMessaging.type')}</th>
                <th className="pb-3 font-medium">{t('communication.campaignMessaging.name')}</th>
                <th className="pb-3 font-medium">{t('communication.campaignMessaging.status')}</th>
                <th className="pb-3 font-medium">{t('communication.campaignMessaging.segment')}</th>
                <th className="pb-3 font-medium">{t('communication.campaignMessaging.sendTime')}</th>
              </tr>
            </thead>
            <tbody>
              {campaignMsgs.map((msg) => (
                <tr key={msg.id} className="border-b dark:border-gray-700">
                  <td className="py-3 font-medium">{msg.type}</td>
                  <td className="py-3">{msg.name}</td>
                  <td className="py-3">{msg.status}</td>
                  <td className="py-3">{msg.segment}</td>
                  <td className="py-3">{msg.sendTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg flex-1">
            <div className="font-medium mb-1">{t('communication.campaignMessaging.aiSendTimeOptimization')}</div>
            <div className="text-sm text-green-700 dark:text-green-300">Best time to send: 10:00 AM for max engagement.</div>
          </div>
          <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex-1">
            <div className="font-medium mb-1">{t('communication.campaignMessaging.aiSubjectLinePredictor')}</div>
            <div className="text-sm text-blue-700 dark:text-blue-300">Subject: "Unlock Your Future at Our MBA Program" (Predicted Open Rate: 38%)</div>
          </div>
        </div>
        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg mt-4">
          <div className="font-medium mb-1">{t('communication.campaignMessaging.aiAbTestingInsights')}</div>
          <div className="text-sm text-yellow-700 dark:text-yellow-300">Variant B performed 12% better in click-through rate.</div>
        </div>
      </section>

      {/* 4. Vendor & Partner Comms */}
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <div className="flex items-center gap-2 mb-4">
          <FiInbox className="text-pink-500" />
          <h2 className="text-lg font-semibold">{t('communication.sections.vendorPartnerComms')}</h2>
          <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded animate-pulse">{t('communication.aiFeatures.vendorPerformanceSummary')}</span>
          <span className="ml-2 text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded animate-pulse">{t('communication.aiFeatures.followUpNudges')}</span>
        </div>
        <div className="overflow-x-auto mb-4">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b dark:border-gray-700">
                <th className="pb-3 font-medium">{t('communication.vendorPartner.vendor')}</th>
                <th className="pb-3 font-medium">{t('communication.vendorPartner.type')}</th>
                <th className="pb-3 font-medium">{t('communication.vendorPartner.lastMessage')}</th>
                <th className="pb-3 font-medium">{t('communication.vendorPartner.date')}</th>
                <th className="pb-3 font-medium">{t('communication.vendorPartner.performance')}</th>
              </tr>
            </thead>
            <tbody>
              {vendorComms.map((v) => (
                <tr key={v.id} className="border-b dark:border-gray-700">
                  <td className="py-3 font-medium">{v.name}</td>
                  <td className="py-3">{v.type}</td>
                  <td className="py-3">{v.lastMsg}</td>
                  <td className="py-3">{v.date}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${v.performance === 'High' ? 'bg-green-100 text-green-700' : v.performance === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>{v.performance}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg flex-1">
            <div className="font-medium mb-1">{t('communication.vendorPartner.aiVendorPerformanceSummary')}</div>
            <div className="text-sm text-green-700 dark:text-green-300">Saudi Arabia: $5,000 spent, 120 leads, 30 conversions.</div>
          </div>
          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg flex-1">
            <div className="font-medium mb-1">{t('communication.vendorPartner.aiFollowUpNudge')}</div>
            <div className="text-sm text-yellow-700 dark:text-yellow-300">No follow-up sent to Saudi Arabia in 7 days.</div>
          </div>
        </div>
      </section>

      {/* 5. Integrated Communication Calendar */}
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow p-6" data-tour="5" data-tour-title-en="Communication Calendar" data-tour-title-ar="تقويم التواصل" data-tour-content-en="Scheduled comms and smart suggestions." data-tour-content-ar="التواصل المجدول والاقتراحات الذكية.">
        <div className="flex items-center gap-2 mb-4">
          <FiCalendar className="text-blue-400" />
          <h2 className="text-lg font-semibold">{t('communication.sections.integratedCommunicationCalendar')}</h2>
          <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded animate-pulse">{t('communication.aiFeatures.smartScheduling')}</span>
          <span className="ml-2 text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded animate-pulse">{t('communication.aiFeatures.missedOpportunityAlerts')}</span>
        </div>
        <div className="overflow-x-auto mb-4">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b dark:border-gray-700">
                <th className="pb-3 font-medium">{t('communication.communicationCalendar.event')}</th>
                <th className="pb-3 font-medium">{t('communication.communicationCalendar.type')}</th>
                <th className="pb-3 font-medium">{t('communication.communicationCalendar.date')}</th>
                <th className="pb-3 font-medium">{t('communication.communicationCalendar.time')}</th>
              </tr>
            </thead>
            <tbody>
              {commCalendar.map((e) => (
                <tr key={e.id} className="border-b dark:border-gray-700">
                  <td className="py-3 font-medium">{e.event}</td>
                  <td className="py-3">{e.type}</td>
                  <td className="py-3">{e.date}</td>
                  <td className="py-3">{e.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex-1">
            <div className="font-medium mb-1">{t('communication.communicationCalendar.aiSmartScheduling')}</div>
            <div className="text-sm text-blue-700 dark:text-blue-300">No message overlaps. Next free slot: 11:00 AM, 20th April.</div>
          </div>
          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg flex-1">
            <div className="font-medium mb-1">{t('communication.communicationCalendar.aiMissedOpportunityAlert')}</div>
            <div className="text-sm text-yellow-700 dark:text-yellow-300">No campaign scheduled for "Open Day" event.</div>
          </div>
        </div>
      </section>

      {/* 6. Notification & Alert Center */}
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow p-6" data-tour="6" data-tour-title-en="Notifications & Alerts" data-tour-title-ar="الإشعارات والتنبيهات" data-tour-content-en="Urgency, priorities, and follow-ups." data-tour-content-ar="مدى الإلحاح والأولويات والمتابعات.">
        <div className="flex items-center gap-2 mb-4">
          <FiBell className="text-green-500" />
          <h2 className="text-lg font-semibold">{t('communication.sections.notificationAlertCenter')}</h2>
          <span className="ml-2 text-xs bg-red-100 text-red-700 px-2 py-1 rounded animate-pulse">{t('communication.aiFeatures.urgencyDetector')}</span>
          <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded animate-pulse">{t('communication.aiFeatures.aiPrioritization')}</span>
        </div>
        <div className="overflow-x-auto mb-4">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b dark:border-gray-700">
                <th className="pb-3 font-medium">{t('communication.notificationAlert.type')}</th>
                <th className="pb-3 font-medium">{t('communication.notificationAlert.message')}</th>
                <th className="pb-3 font-medium">{t('communication.notificationAlert.date')}</th>
                <th className="pb-3 font-medium">{t('communication.notificationAlert.urgent')}</th>
              </tr>
            </thead>
            <tbody>
              {notifications.map((n) => (
                <tr key={n.id} className="border-b dark:border-gray-700">
                  <td className="py-3 font-medium">{n.type}</td>
                  <td className="py-3">{n.msg}</td>
                  <td className="py-3">{n.date}</td>
                  <td className="py-3">
                    {n.urgent ? <span className="text-xs text-red-700 bg-red-100 px-2 py-1 rounded">{t('communication.notificationAlert.urgentLabel')}</span> : <span className="text-xs text-green-700 bg-green-100 px-2 py-1 rounded">{t('communication.notificationAlert.normal')}</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="p-4 bg-red-50 dark:bg-red-900/30 rounded-lg flex-1">
            <div className="font-medium mb-1">{t('communication.notificationAlert.aiUrgencyDetector')}</div>
            <div className="text-sm text-red-700 dark:text-red-300">"Reply pending from design team" flagged as urgent.</div>
          </div>
          <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex-1">
            <div className="font-medium mb-1">{t('communication.notificationAlert.aiPrioritization')}</div>
            <div className="text-sm text-blue-700 dark:text-blue-300">Lead Saudi Arabia ranked high value, prioritize follow-up.</div>
          </div>
        </div>
      </section>
{/* Confirmation Modal */}
{showConfirmation && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
    <div className="absolute inset-0" onClick={() => setShowConfirmation(false)} />
    <div className={`relative z-10 bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4 ${isRTLMode ? 'text-right' : 'text-left'}`}>
      <div className={`flex items-center gap-3 mb-4 ${isRTLMode ? 'flex-row-reverse' : ''}`}>
        <div className={`p-2 rounded-full ${confirmationType === 'success' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
          {confirmationType === 'success' ? <FiCheck className="w-5 h-5" /> : <FiAlertCircle className="w-5 h-5" />}
        </div>
        <h3 className="text-lg font-semibold">
          {confirmationType === 'success' ? 
            (isRTLMode ? 'تم بنجاح!' : 'Success!') : 
            (isRTLMode ? 'تنبيه' : 'Alert')
          }
        </h3>
      </div>
      <p className="text-gray-600 dark:text-gray-300 mb-6">{confirmationMessage}</p>
      <div className={`flex gap-3 ${isRTLMode ? 'flex-row-reverse' : ''}`}>
        <button
          onClick={() => setShowConfirmation(false)}
          className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 ${isRTLMode ? 'flex-row-reverse' : ''}`}
        >
          {isRTLMode ? 'حسناً' : 'OK'}
        </button>
      </div>
    </div>
  </div>
)}

      {/* 7. Communication Logs & Analytics */}
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <div className="flex items-center gap-2 mb-4">
          <FiFileText className="text-blue-400" />
          <h2 className="text-lg font-semibold">{t('communication.sections.communicationLogsAnalytics')}</h2>
          <span className="ml-2 text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded animate-pulse">{t('communication.aiFeatures.dropOffDetector')}</span>
          <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded animate-pulse">{t('communication.aiFeatures.messageQualityAnalyzer')}</span>
        </div>
        <div className="overflow-x-auto mb-4">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b dark:border-gray-700">
                <th className="pb-3 font-medium">{t('communication.communicationLogs.name')}</th>
                <th className="pb-3 font-medium">{t('communication.communicationLogs.channel')}</th>
                <th className="pb-3 font-medium">{t('communication.communicationLogs.outcome')}</th>
                <th className="pb-3 font-medium">{t('communication.communicationLogs.date')}</th>
              </tr>
            </thead>
            <tbody>
              {commLogs.map((log) => (
                <tr key={log.id} className="border-b dark:border-gray-700">
                  <td className="py-3 font-medium">{log.name}</td>
                  <td className="py-3">{log.channel}</td>
                  <td className="py-3">{log.outcome}</td>
                  <td className="py-3">{log.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg flex-1">
            <div className="font-medium mb-1">{t('communication.communicationLogs.aiDropOffDetector')}</div>
            <div className="text-sm text-yellow-700 dark:text-yellow-300">Lead Saudi Arabia stopped engaging after last WhatsApp message.</div>
          </div>
          <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex-1">
            <div className="font-medium mb-1">{t('communication.communicationLogs.aiMessageQualityAnalyzer')}</div>
            <div className="text-sm text-blue-700 dark:text-blue-300">Suggestion: Clarify next steps in follow-up messages.</div>
          </div>
        </div>
      </section>

      {/* 8. AI Communication Assistant */}
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <div className="flex items-center gap-2 mb-4">
          <FiZap className="text-yellow-500 animate-pulse" />
          <h2 className="text-lg font-semibold">{t('communication.sections.aiCommunicationAssistant')}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h3 className="font-medium mb-2">{t('communication.aiAssistant.composeSmartResponse')}</h3>
            <div className="text-sm text-gray-700 dark:text-gray-300">"Thank you for your interest! Here's the brochure and next steps for your application."</div>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h3 className="font-medium mb-2">{t('communication.aiAssistant.recommendMessageTemplate')}</h3>
            <div className="text-sm text-gray-700 dark:text-gray-300">"Hi [First Name], are you ready to take the next step in your journey?"</div>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h3 className="font-medium mb-2">{t('communication.aiAssistant.generateDripCampaign')}</h3>
            <div className="text-sm text-gray-700 dark:text-gray-300">Day 1: Welcome email. Day 3: Program video. Day 5: Counselor call.</div>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h3 className="font-medium mb-2">{t('communication.aiAssistant.summarizeThread')}</h3>
            <div className="text-sm text-gray-700 dark:text-gray-300">"Lead Saudi Arabia requested info, received brochure, scheduled call."</div>
          </div>
        </div>
      </section>

      {showModal && <Modal channel={selectedChannel} onClose={() => setShowModal(false)} />}
    </div>
  );
} 