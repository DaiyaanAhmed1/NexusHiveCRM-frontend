import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useLocalization } from "../../../hooks/useLocalization";
import { directorFeatures } from '../../../components/directorFeatures';
import DirectorStrategicInsights from './ai/DirectorStrategicInsights';
// ... existing code ...

import { 
  FiTarget, 
  FiCheckCircle, 
  FiXCircle, 
  FiEdit3,
  FiFilter,
  FiDownload,
  FiEye,
  FiClock,
  FiAlertTriangle,
  FiTrendingUp,
  FiUsers,
  FiDollarSign,
  FiShield,
  FiAward,
  FiBarChart2,
  FiZap,
  FiPlus,
  FiSearch,
  FiCalendar,
  FiChevronLeft,
  FiChevronRight, // Added missing import
  FiMinus,
  FiArrowUp,
  FiArrowDown,
  FiStar,
  FiFlag,
  FiUser,
  FiHome,
  FiTag,
  FiBookOpen,
  FiFileText,
  FiMessageSquare // Added missing import
} from 'react-icons/fi';

// ... existing code ...

// Demo data will be generated dynamically with translations

export default function DirectorApprovalCenter() {
  const { t, ready } = useTranslation('director');
  const { isRTLMode } = useLocalization();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedPriority, setSelectedPriority] = useState("All");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedRequests, setSelectedRequests] = useState([]);
  const [comment, setComment] = useState("");
  const [requests, setRequests] = useState([]);
  const user = JSON.parse(localStorage.getItem('rbac_current_user'));

  // AI Features State
  const [showStrategicInsights, setShowStrategicInsights] = useState(false);
  const [strategicInsights, setStrategicInsights] = useState(null);

  // Refs for auto-scroll functionality
  const strategicRef = useRef(null);

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
  const handleShowStrategicInsights = () => {
    setShowStrategicInsights(!showStrategicInsights);
    if (!showStrategicInsights) {
      setTimeout(() => scrollToAISection(strategicRef), 100);
    }
  };

  // Function to get translated demo data
  const getTranslatedApprovalRequests = () => [
    // Academic Approvals
    {
      id: 1,
      category: "Academic",
      type: t('approvalCenter.requestTypes.newCourseProposal'),
      title: t('approvalCenter.demoData.quantumComputing'),
      department: t('approvalCenter.departments.computerScience'),
      requestedBy: t('approvalCenter.faculty.drNoura'),
      amount: 0,
      status: "Pending",
      priority: "High",
      date: "2024-03-15",
      description: t('approvalCenter.descriptions.quantumComputing'),
      attachments: [t('approvalCenter.attachments.courseProposal'), t('approvalCenter.attachments.syllabusDraft')],
      comments: [
        { user: t('approvalCenter.faculty.drNoura'), text: t('approvalCenter.comments.courseAligned'), date: "2024-03-15" },
        { user: t('approvalCenter.teams.academicCommittee'), text: t('approvalCenter.comments.underReview'), date: "2024-03-16" }
      ],
      trend: "up",
      urgency: "high",
      daysPending: 3,
      categoryIcon: FiBookOpen,
      categoryColor: "blue"
    },
    {
      id: 2,
      category: "Academic",
      type: t('approvalCenter.requestTypes.curriculumRevision'),
      title: t('approvalCenter.demoData.aiSpecialization'),
      department: t('approvalCenter.departments.computerScience'),
      requestedBy: t('approvalCenter.faculty.drKhalid'),
      amount: 0,
      status: "Pending",
      priority: "Medium",
      date: "2024-03-14",
      description: t('approvalCenter.descriptions.aiSpecialization'),
      attachments: [t('approvalCenter.attachments.curriculumChanges'), t('approvalCenter.attachments.industryFeedback')],
      comments: [
        { user: t('approvalCenter.faculty.drKhalid'), text: t('approvalCenter.comments.updatedRequirements'), date: "2024-03-14" }
      ],
      trend: "stable",
      urgency: "medium",
      daysPending: 4,
      categoryIcon: FiBookOpen,
      categoryColor: "blue"
    },
    // Faculty & HR Approvals
    {
      id: 3,
      category: "HR",
      type: t('approvalCenter.requestTypes.facultyHiring'),
      title: t('approvalCenter.demoData.dataScienceProfessor'),
      department: t('approvalCenter.departments.computerScience'),
      requestedBy: t('approvalCenter.faculty.drLayla'),
      amount: 150000,
      status: "Pending",
      priority: "High",
      date: "2024-03-13",
      description: t('approvalCenter.descriptions.dataScienceProfessor'),
      attachments: [t('approvalCenter.attachments.jobDescription'), t('approvalCenter.attachments.candidateProfile')],
      comments: [
        { user: t('approvalCenter.teams.hrTeam'), text: t('approvalCenter.comments.positionReviewed'), date: "2024-03-13" }
      ],
      trend: "up",
      urgency: "high",
      daysPending: 5,
      categoryIcon: FiUsers,
      categoryColor: "green"
    },
    // Financial Approvals
    {
      id: 4,
      category: "Finance",
      type: t('approvalCenter.requestTypes.researchGrant'),
      title: t('approvalCenter.demoData.aiResearchProject'),
      department: t('approvalCenter.departments.computerScience'),
      requestedBy: t('approvalCenter.faculty.drAbdullah'),
      amount: 250000,
      status: "Pending",
      priority: "High",
      date: "2024-03-12",
      description: t('approvalCenter.descriptions.aiResearchProject'),
      attachments: [t('approvalCenter.attachments.projectProposal'), t('approvalCenter.attachments.budgetBreakdown')],
      comments: [
        { user: t('approvalCenter.teams.financeTeam'), text: t('approvalCenter.comments.budgetReview'), date: "2024-03-12" }
      ],
      trend: "up",
      urgency: "high",
      daysPending: 6,
      categoryIcon: FiDollarSign,
      categoryColor: "green"
    },
    // Administrative Approvals
    {
      id: 5,
      category: "Admin",
      type: t('approvalCenter.requestTypes.eventApproval'),
      title: t('approvalCenter.demoData.techSymposium'),
      department: t('approvalCenter.departments.computerScience'),
      requestedBy: t('approvalCenter.faculty.drAisha'),
      amount: 50000,
      status: "Pending",
      priority: "Medium",
      date: "2024-03-11",
      description: t('approvalCenter.descriptions.techSymposium'),
      attachments: [t('approvalCenter.attachments.eventPlan'), t('approvalCenter.attachments.budgetProposal')],
      comments: [
        { user: t('approvalCenter.teams.eventCommittee'), text: t('approvalCenter.comments.venueSpeakers'), date: "2024-03-11" }
      ],
      trend: "down",
      urgency: "low",
      daysPending: 7,
      categoryIcon: FiCalendar,
      categoryColor: "purple"
    },
    // Compliance Approvals
    {
      id: 6,
      category: "Compliance",
      type: t('approvalCenter.requestTypes.accreditationDocumentation'),
      title: t('approvalCenter.demoData.etecReport'),
      department: t('approvalCenter.departments.qualityAssurance'),
      requestedBy: t('approvalCenter.faculty.drOmar'),
      amount: 0,
      status: "Pending",
      priority: "High",
      date: "2024-03-10",
      description: t('approvalCenter.descriptions.etecReport'),
      attachments: [t('approvalCenter.attachments.etecReport'), t('approvalCenter.attachments.supportingDocs')],
      comments: [
        { user: t('approvalCenter.teams.qaTeam'), text: t('approvalCenter.comments.documentsCompiled'), date: "2024-03-10" }
      ],
      trend: "up",
      urgency: "high",
      daysPending: 8,
      categoryIcon: FiShield,
      categoryColor: "orange"
    }
  ];

  if (!ready) {
    return <div className="flex min-h-screen bg-[#F6F7FA] dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 items-center justify-center">
      <div className="text-lg text-gray-600 dark:text-gray-300">Loading...</div>
    </div>;
  }

  // Initialize requests with translated data when ready
  React.useEffect(() => {
    if (ready) {
      setRequests(getTranslatedApprovalRequests());
    }
  }, [ready, t]);

  const categories = [
    { id: "All", label: t('approvalCenter.categories.allCategories') },
    { id: "Academic", label: t('approvalCenter.categories.academic') },
    { id: "HR", label: t('approvalCenter.categories.facultyHr') },
    { id: "Finance", label: t('approvalCenter.categories.financial') },
    { id: "Admin", label: t('approvalCenter.categories.administrative') },
    { id: "Compliance", label: t('approvalCenter.categories.complianceAudit') }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "Approved":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "Rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "Escalated":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      case "Revision Requested":
      case "Revision":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "Low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return <FiArrowUp className="w-4 h-4 text-red-500" />;
      case 'down': return <FiArrowDown className="w-4 h-4 text-green-500" />;
      default: return <FiMinus className="w-4 h-4 text-gray-500" />;
    }
  };

  const getCategoryColor = (color) => {
    switch (color) {
      case 'blue': return 'text-blue-600 dark:text-blue-400';
      case 'green': return 'text-green-600 dark:text-green-400';
      case 'purple': return 'text-purple-600 dark:text-purple-400';
      case 'orange': return 'text-orange-600 dark:text-orange-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getCategoryBgColor = (color) => {
    switch (color) {
      case 'blue': return 'bg-blue-100 dark:bg-blue-900/30';
      case 'green': return 'bg-green-100 dark:bg-green-900/30';
      case 'purple': return 'bg-purple-100 dark:bg-purple-900/30';
      case 'orange': return 'bg-orange-100 dark:bg-orange-900/30';
      default: return 'bg-gray-100 dark:bg-gray-700';
    }
  };

  const handleBulkAction = (action) => {
    // Handle bulk approve/reject
    console.log(`Bulk ${action} for:`, selectedRequests);
    setSelectedRequests([]);
  };

  const renderApprovalList = () => (
    <div className="space-y-4">
      {requests
        .filter(request => selectedCategory === "All" || request.category === selectedCategory)
        .filter(request => selectedStatus === "All" || request.status === selectedStatus)
        .filter(request => selectedPriority === "All" || request.priority === selectedPriority)
        .map((request) => (
          <motion.div
            key={request.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 group cursor-pointer"
            onClick={() => setSelectedRequest(request)}
          >
            <div className={`flex items-start gap-4 ${isRTLMode ? 'flex-row-reverse' : ''}`}>
              <input
                type="checkbox"
                checked={selectedRequests.includes(request.id)}
                onChange={(e) => {
                  e.stopPropagation();
                  if (e.target.checked) {
                    setSelectedRequests([...selectedRequests, request.id]);
                  } else {
                    setSelectedRequests(selectedRequests.filter(id => id !== request.id));
                  }
                }}
                className="mt-1 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              
              <div className="flex-1">
                {/* Header with category and status badges */}
                <div className={`flex items-center justify-between mb-4 ${isRTLMode ? 'flex-row-reverse' : ''}`}>
                  <div className={`flex items-center gap-3 ${isRTLMode ? 'flex-row-reverse' : ''}`}>
                    <div className={`p-2 rounded-lg ${getCategoryBgColor(request.categoryColor)}`}>
                      <request.categoryIcon className={`w-4 h-4 ${getCategoryColor(request.categoryColor)}`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {request.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {request.department} • {t('approvalCenter.requestDetails.requestedBy')} {request.requestedBy}
                      </p>
                    </div>
                  </div>
                  
                  <div className={`flex items-center gap-2 ${isRTLMode ? 'flex-row-reverse' : ''}`}>
                    {request.amount > 0 && (
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900 dark:text-white">
                          ${request.amount.toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Amount</p>
                      </div>
                    )}
                    <div className="text-right">
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {new Date(request.date).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {request.daysPending} days pending
                      </p>
                    </div>
                  </div>
                </div>

                {/* Status and priority badges */}
                <div className={`flex items-center gap-2 mb-3 ${isRTLMode ? 'flex-row-reverse' : ''}`}>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                    {request.status === "Revision Requested" ? t('approvalCenter.statuses.revision') : request.status}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(request.priority)}`}>
                    {request.priority}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(request.urgency)}`}>
                    {request.urgency}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {request.category} • {request.type}
                  </span>
                  <div className="flex items-center gap-1">
                    {getTrendIcon(request.trend)}
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-4">
                  {request.description}
                </p>

                {/* Footer with attachments and comments count */}
                <div className={`flex items-center justify-between ${isRTLMode ? 'flex-row-reverse' : ''}`}>
                  <div className={`flex items-center gap-4 ${isRTLMode ? 'flex-row-reverse' : ''}`}>
                    <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                      <FiFileText className="w-3 h-3" />
                      <span>{request.attachments.length} attachments</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                      <FiMessageSquare className="w-3 h-3" />
                      <span>{request.comments.length} comments</span>
                    </div>
                  </div>
                  
                  <div className={`flex items-center gap-1 text-gray-400 group-hover:text-blue-500 transition-colors ${isRTLMode ? 'flex-row-reverse' : ''}`}>
                    <span className="text-sm">View Details</span>
                    {isRTLMode ? <FiChevronLeft className="w-4 h-4" /> : <FiChevronRight className="w-4 h-4" />}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
    </div>
  );

  const renderApprovalDetails = () => {
    if (!selectedRequest) return null;

    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700"
      >
        {/* Header */}
        <div className={`flex justify-between items-start mb-8 ${isRTLMode ? 'flex-row-reverse' : ''}`}>
          <div className="flex-1">
            <div className={`flex items-center gap-3 mb-4 ${isRTLMode ? 'flex-row-reverse' : ''}`}>
              <div className={`p-3 rounded-xl ${getCategoryBgColor(selectedRequest.categoryColor)}`}>
                <selectedRequest.categoryIcon className={`w-6 h-6 ${getCategoryColor(selectedRequest.categoryColor)}`} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {selectedRequest.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  {selectedRequest.department} • {t('approvalCenter.requestDetails.requestedBy')} {selectedRequest.requestedBy}
                </p>
              </div>
            </div>
            
            <div className={`flex items-center gap-3 ${isRTLMode ? 'flex-row-reverse' : ''}`}>
              <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(selectedRequest.status)}`}>
                {selectedRequest.status === "Revision Requested" ? t('approvalCenter.statuses.revision') : selectedRequest.status}
              </span>
              <span className={`px-4 py-2 rounded-full text-sm font-medium ${getPriorityColor(selectedRequest.priority)}`}>
                {selectedRequest.priority}
              </span>
              <span className={`px-3 py-2 rounded-full text-sm font-medium ${getUrgencyColor(selectedRequest.urgency)}`}>
                {selectedRequest.urgency}
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {selectedRequest.category} • {selectedRequest.type}
              </span>
            </div>
          </div>
          
          <button
            onClick={() => setSelectedRequest(null)}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <FiFileText className="w-5 h-5 text-blue-500" />
                {t('approvalCenter.requestDetails.description')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{selectedRequest.description}</p>
            </div>

            {/* Amount */}
            {selectedRequest.amount > 0 && (
              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <FiDollarSign className="w-5 h-5 text-green-500" />
                  {t('approvalCenter.requestDetails.amount')}
                </h3>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                  ${selectedRequest.amount.toLocaleString()}
                </p>
              </div>
            )}

            {/* Attachments */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <FiDownload className="w-5 h-5 text-purple-500" />
                {t('approvalCenter.requestDetails.attachments')}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedRequest.attachments.map((file, index) => (
                  <a
                    key={index}
                    href="#"
                    className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <FiFileText className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{file}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Comments */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <FiMessageSquare className="w-5 h-5 text-orange-500" />
                {t('approvalCenter.requestDetails.comments')}
              </h3>
              <div className="space-y-4">
                {selectedRequest.comments.map((comment, index) => (
                  <div key={index} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                    <div className={`flex justify-between items-start mb-2 ${isRTLMode ? 'flex-row-reverse' : ''}`}>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                          <FiUser className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        <p className="font-medium text-gray-900 dark:text-white">{comment.user}</p>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{comment.date}</p>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">{comment.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Add Comment */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <FiEdit3 className="w-5 h-5 text-indigo-500" />
                {t('approvalCenter.requestDetails.addComment')}
              </h3>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full p-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                rows="4"
                placeholder={t('approvalCenter.requestDetails.commentPlaceholder')}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Days Pending</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{selectedRequest.daysPending}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Attachments</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{selectedRequest.attachments.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Comments</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{selectedRequest.comments.length}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button 
                className="w-full px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 flex items-center justify-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg"
                onClick={() => {
                  setRequests(prev => prev.map(r => r.id === selectedRequest.id ? { ...r, status: "Approved" } : r));
                  setComment("");
                  setSelectedRequest(null);
                }}
              >
                <FiCheckCircle className="w-5 h-5" />
                {t('approvalCenter.actions.approve')}
              </button>
              
              <button 
                className="w-full px-6 py-3 bg-yellow-600 text-white rounded-xl hover:bg-yellow-700 flex items-center justify-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg"
                onClick={() => {
                  if (!comment.trim()) {
                    alert(t('approvalCenter.alerts.revisionCommentRequired'));
                    return;
                  }
                  setRequests(prev => prev.map(r => r.id === selectedRequest.id ? { ...r, status: "Revision Requested" } : r));
                  setComment("");
                  setSelectedRequest(null);
                }}
              >
                <FiEdit3 className="w-5 h-5" />
                {t('approvalCenter.actions.requestRevision')}
              </button>
              
              <button 
                className="w-full px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 flex items-center justify-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg"
                onClick={() => {
                  if (!comment.trim()) {
                    alert(t('approvalCenter.alerts.rejectionCommentRequired'));
                    return;
                  }
                  setRequests(prev => prev.map(r => r.id === selectedRequest.id ? { ...r, status: "Rejected" } : r));
                  setComment("");
                  setSelectedRequest(null);
                }}
              >
                <FiXCircle className="w-5 h-5" />
                {t('approvalCenter.actions.reject')}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className={`flex min-h-screen bg-[#F6F7FA] dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 ${isRTLMode ? 'rtl' : 'ltr'}`}>
      <main className="flex-1 p-4 md:p-6 flex flex-col gap-6 overflow-x-auto">
        {/* Header Section */}
        <div className={`flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 ${isRTLMode ? 'flex-row-reverse' : ''}`}>
          <div className={`flex-1 min-w-0 ${isRTLMode ? 'text-right' : 'text-left'}`}>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {t('approvalCenter.title')}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              {t('approvalCenter.subtitle')}
            </p>
          </div>
          
          <div className={`flex flex-col sm:flex-row gap-4 ${isRTLMode ? 'flex-row-reverse' : ''}`}>
            {/* AI Features Button */}
            <div className={`flex-shrink-0 ${isRTLMode ? 'text-right' : 'text-left'}`}>
              <button 
                className={`px-6 py-3 text-sm bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 flex items-center gap-3 transition-all duration-200 shadow-lg hover:shadow-xl whitespace-nowrap ${isRTLMode ? 'flex-row-reverse' : ''}`}
                onClick={handleShowStrategicInsights}
              >
                <FiTarget className="w-5 h-5 flex-shrink-0" /> 
                <span className="hidden sm:inline font-medium">
                  {isRTLMode ? 'الرؤى الاستراتيجية' : 'Strategic Insights'}
                </span>
                <span className="sm:hidden font-medium">
                  {isRTLMode ? 'استراتيجي' : 'Strategic'}
                </span>
              </button>
            </div>

            {/* Filter Controls */}
            <div className={`flex flex-wrap gap-3 ${isRTLMode ? 'flex-row-reverse' : ''}`}>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2.5 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{category.label}</option>
                ))}
              </select>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2.5 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              >
                <option value="All">{t('approvalCenter.statuses.allStatus')}</option>
                <option value="Pending">{t('approvalCenter.statuses.pending')}</option>
                <option value="Approved">{t('approvalCenter.statuses.approved')}</option>
                <option value="Rejected">{t('approvalCenter.statuses.rejected')}</option>
                <option value="Escalated">{t('approvalCenter.statuses.escalated')}</option>
                <option value="Revision Requested">{t('approvalCenter.statuses.revisionRequested')}</option>
              </select>
              <select
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
                className="px-4 py-2.5 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              >
                <option value="All">{t('approvalCenter.priorities.allPriorities')}</option>
                <option value="High">{t('approvalCenter.priorities.high')}</option>
                <option value="Medium">{t('approvalCenter.priorities.medium')}</option>
                <option value="Low">{t('approvalCenter.priorities.low')}</option>
              </select>
            </div>
          </div>
        </div>

        {/* AI Strategic Insights Section */}
        {showStrategicInsights && (
          <section 
            ref={strategicRef}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700"
            dir={isRTLMode ? 'rtl' : 'ltr'}
          >
            <div className={`flex items-center gap-3 mb-6 ${isRTLMode ? 'flex-row-reverse' : ''}`}>
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <FiTarget className="text-blue-600 dark:text-blue-400 w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {isRTLMode ? 'الرؤى الاستراتيجية والتخطيط الذكي' : 'Strategic Insights & Intelligent Planning'}
              </h2>
            </div>
            <div className="mb-6">
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                {isRTLMode 
                  ? 'رؤى استراتيجية مدعومة بالذكاء الاصطناعي لتحسين عملية الموافقات واتخاذ القرارات' 
                  : 'AI-powered strategic insights for enhanced approval processes and decision making'
                }
              </p>
            </div>
            <DirectorStrategicInsights 
              onInsightsGenerated={(insights) => {
                setStrategicInsights(insights);
                console.log('Strategic insights generated:', insights);
              }}
            />
          </section>
        )}

        {/* Bulk Actions */}
        {selectedRequests.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
          >
            <div className={`flex items-center justify-between ${isRTLMode ? 'flex-row-reverse' : ''}`}>
              <div className={`flex items-center gap-3 ${isRTLMode ? 'flex-row-reverse' : ''}`}>
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <FiCheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {selectedRequests.length} {t('approvalCenter.bulkActions.requestsSelected')}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-300">
                    Select actions to apply to all selected requests
                  </p>
                </div>
              </div>
              <div className={`flex gap-3 ${isRTLMode ? 'flex-row-reverse' : ''}`}>
                <button
                  onClick={() => handleBulkAction("approve")}
                  className="px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  <FiCheckCircle className="w-4 h-4" />
                  {t('approvalCenter.bulkActions.approveSelected')}
                </button>
                <button
                  onClick={() => handleBulkAction("reject")}
                  className="px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  <FiXCircle className="w-4 h-4" />
                  {t('approvalCenter.bulkActions.rejectSelected')}
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Content Section */}
        <div className="flex-1">
          {selectedRequest ? (
            <div>
              {renderApprovalDetails()}
            </div>
          ) : (
            <div>
              {renderApprovalList()}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}