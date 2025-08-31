import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { directorFeatures } from '../../../components/directorFeatures';

// Demo data will be generated dynamically with translations

export default function DirectorApprovalCenter() {
  const { t, ready } = useTranslation('director');
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedPriority, setSelectedPriority] = useState("All");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedRequests, setSelectedRequests] = useState([]);
  const [comment, setComment] = useState("");
  const [requests, setRequests] = useState([]);
  const user = JSON.parse(localStorage.getItem('rbac_current_user'));

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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
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
            className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="flex items-start gap-4">
              <input
                type="checkbox"
                checked={selectedRequests.includes(request.id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedRequests([...selectedRequests, request.id]);
                  } else {
                    setSelectedRequests(selectedRequests.filter(id => id !== request.id));
                  }
                }}
                className="mt-1"
              />
              <div 
                className="flex-1 cursor-pointer"
                onClick={() => setSelectedRequest(request)}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                    {request.status === "Revision Requested" ? t('approvalCenter.statuses.revision') : request.status}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(request.priority)}`}>
                    {request.priority}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {request.category} • {request.type}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  {request.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  {request.department} • {t('approvalCenter.requestDetails.requestedBy')} {request.requestedBy}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                  {request.description}
                </p>
              </div>
              <div className="flex flex-col items-end gap-2">
                {request.amount > 0 && (
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    ${request.amount.toLocaleString()}
                  </p>
                )}
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {new Date(request.date).toLocaleDateString()}
                </p>
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
        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
      >
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedRequest.status)}`}>
                {selectedRequest.status === "Revision Requested" ? t('approvalCenter.statuses.revision') : selectedRequest.status}
              </span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(selectedRequest.priority)}`}>
                {selectedRequest.priority}
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {selectedRequest.category} • {selectedRequest.type}
              </span>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
              {selectedRequest.title}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {selectedRequest.department} • {t('approvalCenter.requestDetails.requestedBy')} {selectedRequest.requestedBy}
            </p>
          </div>
          <button
            onClick={() => setSelectedRequest(null)}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{t('approvalCenter.requestDetails.description')}</h3>
            <p className="text-gray-600 dark:text-gray-300">{selectedRequest.description}</p>
          </div>

          {selectedRequest.amount > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{t('approvalCenter.requestDetails.amount')}</h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                ${selectedRequest.amount.toLocaleString()}
              </p>
            </div>
          )}

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{t('approvalCenter.requestDetails.attachments')}</h3>
            <div className="flex flex-wrap gap-2">
              {selectedRequest.attachments.map((file, index) => (
                <a
                  key={index}
                  href="#"
                  className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  {file}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{t('approvalCenter.requestDetails.comments')}</h3>
            <div className="space-y-4">
              {selectedRequest.comments.map((comment, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-medium text-gray-900 dark:text-white">{comment.user}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{comment.date}</p>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">{comment.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{t('approvalCenter.requestDetails.addComment')}</h3>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              rows="3"
              placeholder={t('approvalCenter.requestDetails.commentPlaceholder')}
            />
          </div>

          <div className="flex justify-end gap-4">
            <button 
              className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
              onClick={() => {
                if (!comment.trim()) {
                  alert(t('approvalCenter.alerts.revisionCommentRequired'));
                  return;
                }
                // Update status to 'Revision Requested' in local state
                setRequests(prev => prev.map(r => r.id === selectedRequest.id ? { ...r, status: "Revision Requested" } : r));
                setComment("");
                setSelectedRequest(null);
              }}
            >
              {t('approvalCenter.actions.requestRevision')}
            </button>
            <button 
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              onClick={() => {
                if (!comment.trim()) {
                  alert(t('approvalCenter.alerts.rejectionCommentRequired'));
                  return;
                }
                // Update status to 'Rejected' in local state
                setRequests(prev => prev.map(r => r.id === selectedRequest.id ? { ...r, status: "Rejected" } : r));
                setComment("");
                setSelectedRequest(null);
              }}
            >
              {t('approvalCenter.actions.reject')}
            </button>
            <button 
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              onClick={() => {
                // Update status to 'Approved' in local state
                setRequests(prev => prev.map(r => r.id === selectedRequest.id ? { ...r, status: "Approved" } : r));
                setComment("");
                setSelectedRequest(null);
              }}
            >
              {t('approvalCenter.actions.approve')}
            </button>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="flex min-h-screen bg-[#F6F7FA] dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800">
      <main className="flex-1 p-4 md:p-6 flex flex-col gap-4 overflow-x-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">{t('approvalCenter.title')}</h1>
            <p className="text-sm text-gray-600 dark:text-gray-300">{t('approvalCenter.subtitle')}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-1.5 text-sm rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.label}</option>
              ))}
            </select>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-1.5 text-sm rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
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
              className="px-3 py-1.5 text-sm rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="All">{t('approvalCenter.priorities.allPriorities')}</option>
              <option value="High">{t('approvalCenter.priorities.high')}</option>
              <option value="Medium">{t('approvalCenter.priorities.medium')}</option>
              <option value="Low">{t('approvalCenter.priorities.low')}</option>
            </select>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedRequests.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {selectedRequests.length} {t('approvalCenter.bulkActions.requestsSelected')}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleBulkAction("approve")}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  {t('approvalCenter.bulkActions.approveSelected')}
                </button>
                <button
                  onClick={() => handleBulkAction("reject")}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  {t('approvalCenter.bulkActions.rejectSelected')}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Content Section */}
        <div className="flex-1">
          {selectedRequest ? renderApprovalDetails() : renderApprovalList()}
        </div>
      </main>
    </div>
  );
} 