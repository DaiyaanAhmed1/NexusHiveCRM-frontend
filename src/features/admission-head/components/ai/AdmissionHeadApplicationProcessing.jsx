import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useLocalization } from "../../../../hooks/useLocalization";
import { FiUser, FiMail, FiPhone, FiBookOpen, FiCalendar, FiFileText, FiCheckCircle, FiXCircle, FiClock, FiAlertCircle, FiSearch, FiFilter, FiCpu, FiTarget, FiTrendingUp, FiEye, FiDownload } from "react-icons/fi";
import applicationProcessingService from "../../services/applicationProcessingService.js";

const AdmissionHeadApplicationProcessing = () => {
  const { t } = useTranslation();
  const { isRTLMode } = useLocalization();
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [processingStatus, setProcessingStatus] = useState('idle');
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterProgram, setFilterProgram] = useState('all');
  const [activeTab, setActiveTab] = useState("overview");

  // Ref for AI analysis section
  const aiAnalysisRef = useRef(null);

  // Mock data for applications
  useEffect(() => {
    const mockApplications = [
      {
        id: 1,
        name: "Ahmed Al-Rashid",
        email: "ahmed.rashid@email.com",
        phone: "+966501234567",
        program: "Computer Science",
        status: "pending",
        submittedDate: "2024-01-15",
        documents: ["High School Certificate", "Identity Document", "English Proficiency"],
        gpa: 3.8,
        experience: "2 years software development",
        motivation: "Passionate about AI and machine learning"
      },
      {
        id: 2,
        name: "Fatima Al-Zahra",
        email: "fatima.zahra@email.com",
        phone: "+966507654321",
        program: "Business Administration",
        status: "under_review",
        submittedDate: "2024-01-14",
        documents: ["High School Certificate", "Identity Document"],
        gpa: 3.9,
        experience: "1 year marketing internship",
        motivation: "Want to start my own business"
      },
      {
        id: 3,
        name: "Omar Hassan",
        email: "omar.hassan@email.com",
        phone: "+966509876543",
        program: "Engineering",
        status: "approved",
        submittedDate: "2024-01-13",
        documents: ["High School Certificate", "Identity Document", "English Proficiency", "Portfolio"],
        gpa: 3.7,
        experience: "3 years engineering projects",
        motivation: "Innovate sustainable technology solutions"
      }
    ];
    setApplications(mockApplications);
  }, []);

  // Auto-scroll to AI analysis section - using useEffect to wait for DOM update
  useEffect(() => {
    if (aiAnalysis && aiAnalysisRef.current) {
      setTimeout(() => {
        aiAnalysisRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest'
        });
      }, 200); // Increased delay to ensure DOM is updated
    }
  }, [aiAnalysis]); // Trigger when aiAnalysis changes

  const handleApplicationSelect = (application) => {
    setSelectedApplication(application);
    setAiAnalysis(null);
    setActiveTab("overview");
  };

  const handleAIProcessing = async () => {
    if (!selectedApplication) return;

    setProcessingStatus('processing');
    try {
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Use dummy data for consistent experience
      const dummyAnalysis = {
        suitabilityScore: Math.floor(Math.random() * 30) + 70, // 70-100
        recommendation: ['approve', 'waitlist'][Math.floor(Math.random() * 2)],
        strengths: [
          isRTLMode ? "أداء أكاديمي قوي" : "Strong academic performance",
          isRTLMode ? "خبرة ذات صلة في المجال" : "Relevant experience in field",
          isRTLMode ? "دوافع واضحة وأهداف مهنية" : "Clear motivation and career goals",
          isRTLMode ? "وثائق مكتملة" : "Complete documentation"
        ],
        weaknesses: [
          isRTLMode ? "أنشطة خارجية محدودة" : "Limited extracurricular activities",
          isRTLMode ? "لا توجد خبرة قيادية" : "No leadership experience",
          isRTLMode ? "بيان الدافع عام" : "Generic motivation statement"
        ],
        followUpActions: [
          isRTLMode ? "جدولة مقابلة" : "Schedule interview",
          isRTLMode ? "طلب وثائق إضافية" : "Request additional documents",
          isRTLMode ? "التحقق من ادعاءات الخبرة" : "Verify experience claims",
          isRTLMode ? "فحص المراجع" : "Check references"
        ],
        riskAssessment: isRTLMode ? "مخاطر منخفضة - مرشح مؤهل جيداً" : "Low risk - well-qualified candidate",
        aiResponse: isRTLMode ? 
          `تحليل الذكاء الاصطناعي:
          
**التقييم العام:**
يظهر هذا المرشح إمكانات قوية لبرنامج ${selectedApplication.program}. الطلب يوضح أداءً أكاديمياً قوياً وخبرة ذات صلة.

**نقاط القوة الرئيسية:**
- سجل أكاديمي قوي بمعدل تراكمي ${selectedApplication.gpa}
- خبرة ذات صلة في المجال
- دوافع واضحة وأهداف مهنية
- وثائق مكتملة

**مجالات التحسين:**
- يمكن الاستفادة من المزيد من الخبرة القيادية
- النظر في أنشطة خارجية إضافية
- بيان الدافع يمكن أن يكون أكثر تحديداً

**التوصية:** بناءً على التقييم العام، هذا المرشح مناسب للقبول مع بعض الشروط.` :
          `AI Analysis:
          
**Overall Assessment:**
This candidate shows strong potential for the ${selectedApplication.program} program. The application demonstrates solid academic performance and relevant experience.

**Key Strengths:**
- Strong academic record with GPA of ${selectedApplication.gpa}
- Relevant experience in the field
- Clear motivation and career goals
- Complete documentation

**Areas for Improvement:**
- Could benefit from more leadership experience
- Consider additional extracurricular activities
- Motivation statement could be more specific

**Recommendation:** Based on the overall assessment, this candidate is suitable for admission with some conditions.`
      };

      setAiAnalysis(dummyAnalysis);
      // Note: Removed the direct scrollToAIAnalysis call here
      // The useEffect will handle the scrolling when aiAnalysis state changes
      
    } catch (error) {
      console.error('AI processing error:', error);
    } finally {
      setProcessingStatus('completed');
    }
  };

  const handleStatusUpdate = (newStatus) => {
    if (selectedApplication) {
      setApplications(prev => 
        prev.map(app => 
          app.id === selectedApplication.id 
            ? { ...app, status: newStatus }
            : app
        )
      );
      setSelectedApplication(prev => ({ ...prev, status: newStatus }));
    }
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || app.status === filterStatus;
    const matchesProgram = filterProgram === 'all' || app.program === filterProgram;
    
    return matchesSearch && matchesStatus && matchesProgram;
  });

  const getStatusBadge = (status) => {
    const statusMap = {
      pending: { 
        label: isRTLMode ? "معلق" : "Pending", 
        color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300',
        icon: FiClock
      },
      under_review: { 
        label: isRTLMode ? "قيد المراجعة" : "Under Review", 
        color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300',
        icon: FiEye
      },
      approved: { 
        label: isRTLMode ? "موافق عليه" : "Approved", 
        color: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300',
        icon: FiCheckCircle
      },
      rejected: { 
        label: isRTLMode ? "مرفوض" : "Rejected", 
        color: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300',
        icon: FiXCircle
      },
      waitlist: { 
        label: isRTLMode ? "قائمة الانتظار" : "Waitlist", 
        color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300',
        icon: FiAlertCircle
      }
    };
    
    const statusInfo = statusMap[status] || statusMap.pending;
    const Icon = statusInfo.icon;
    
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
        <Icon className="w-3 h-3" />
        {statusInfo.label}
      </span>
    );
  };

  const getRecommendationBadge = (recommendation) => {
    const recMap = {
      approve: { 
        label: isRTLMode ? "موافقة" : "Approve", 
        color: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300',
        icon: FiCheckCircle
      },
      reject: { 
        label: isRTLMode ? "رفض" : "Reject", 
        color: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300',
        icon: FiXCircle
      },
      waitlist: { 
        label: isRTLMode ? "قائمة الانتظار" : "Waitlist", 
        color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300',
        icon: FiClock
      }
    };
    
    const recInfo = recMap[recommendation] || recMap.approve;
    const Icon = recInfo.icon;
    
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${recInfo.color}`}>
        <Icon className="w-3 h-3" />
        {recInfo.label}
      </span>
    );
  };

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 p-6 ${isRTLMode ? 'rtl' : 'ltr'}`} dir={isRTLMode ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {isRTLMode ? "معالجة الطلبات" : "Application Processing"}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {isRTLMode ? "مراجعة وتحليل الطلبات بالذكاء الاصطناعي" : "AI-powered application review and analysis"}
              </p>
            </div>
            <button 
              onClick={handleAIProcessing}
              disabled={!selectedApplication || processingStatus === 'processing'}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                !selectedApplication || processingStatus === 'processing'
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              <FiCpu className="w-4 h-4" />
              {processingStatus === 'processing' 
                ? (isRTLMode ? "جاري المعالجة..." : "Processing...") 
                : (isRTLMode ? "تحليل بالذكاء الاصطناعي" : "Analyze with AI")
              }
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Applications List */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {isRTLMode ? "قائمة الطلبات" : "Applications List"}
                </h3>
              </div>
              <div className="p-4 space-y-4">
                {/* Search and Filters */}
                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder={isRTLMode ? "البحث في الطلبات..." : "Search applications..."}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">{isRTLMode ? "جميع الحالات" : "All Statuses"}</option>
                    <option value="pending">{isRTLMode ? "معلق" : "Pending"}</option>
                    <option value="under_review">{isRTLMode ? "قيد المراجعة" : "Under Review"}</option>
                    <option value="approved">{isRTLMode ? "موافق عليه" : "Approved"}</option>
                    <option value="rejected">{isRTLMode ? "مرفوض" : "Rejected"}</option>
                    <option value="waitlist">{isRTLMode ? "قائمة الانتظار" : "Waitlist"}</option>
                  </select>

                  <select
                    value={filterProgram}
                    onChange={(e) => setFilterProgram(e.target.value)}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">{isRTLMode ? "جميع البرامج" : "All Programs"}</option>
                    <option value="Computer Science">{isRTLMode ? "علوم الحاسوب" : "Computer Science"}</option>
                    <option value="Business Administration">{isRTLMode ? "إدارة الأعمال" : "Business Administration"}</option>
                    <option value="Engineering">{isRTLMode ? "الهندسة" : "Engineering"}</option>
                  </select>
                </div>

                {/* Applications */}
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {filteredApplications.map((app) => (
                    <div
                      key={app.id}
                      onClick={() => handleApplicationSelect(app)}
                      className={`p-3 border rounded-lg cursor-pointer transition-all duration-200 ${
                        selectedApplication?.id === app.id
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-sm'
                          : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 hover:shadow-sm'
                      }`}
                    >
                      <div className="flex justify-between items-start gap-2">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 dark:text-white truncate">{app.name}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{app.program}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-500">{app.submittedDate}</p>
                        </div>
                        {getStatusBadge(app.status)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Application Details */}
          <div className="lg:col-span-2">
            {selectedApplication ? (
              <div className="space-y-6">
                {/* Application Info */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {isRTLMode ? "تفاصيل الطلب" : "Application Details"}
                      </h3>
                      {getStatusBadge(selectedApplication.status)}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                            <FiUser className="w-4 h-4" />
                            {isRTLMode ? "الاسم" : "Name"}
                          </label>
                          <p className="text-gray-900 dark:text-white mt-1">{selectedApplication.name}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                            <FiMail className="w-4 h-4" />
                            {isRTLMode ? "البريد الإلكتروني" : "Email"}
                          </label>
                          <p className="text-gray-900 dark:text-white mt-1">{selectedApplication.email}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                            <FiPhone className="w-4 h-4" />
                            {isRTLMode ? "الهاتف" : "Phone"}
                          </label>
                          <p className="text-gray-900 dark:text-white mt-1">{selectedApplication.phone}</p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                            <FiBookOpen className="w-4 h-4" />
                            {isRTLMode ? "البرنامج" : "Program"}
                          </label>
                          <p className="text-gray-900 dark:text-white mt-1">{selectedApplication.program}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                            <FiTarget className="w-4 h-4" />
                            {isRTLMode ? "المعدل التراكمي" : "GPA"}
                          </label>
                          <p className="text-gray-900 dark:text-white mt-1">{selectedApplication.gpa}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                            <FiCalendar className="w-4 h-4" />
                            {isRTLMode ? "تاريخ التقديم" : "Submitted Date"}
                          </label>
                          <p className="text-gray-900 dark:text-white mt-1">{selectedApplication.submittedDate}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                          <FiFileText className="w-4 h-4" />
                          {isRTLMode ? "الوثائق" : "Documents"}
                        </label>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {selectedApplication.documents.map((doc, index) => (
                            <span key={index} className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                              {doc}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {isRTLMode ? "الخبرة" : "Experience"}
                        </label>
                        <p className="text-gray-900 dark:text-white mt-1">{selectedApplication.experience}</p>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {isRTLMode ? "الدافع" : "Motivation"}
                        </label>
                        <p className="text-gray-900 dark:text-white mt-1">{selectedApplication.motivation}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI Analysis - with ref for auto-scroll */}
                {aiAnalysis && (
                  <div ref={aiAnalysisRef} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {isRTLMode ? "تحليل الذكاء الاصطناعي" : "AI Analysis"}
                        </h3>
                        <div className="flex items-center gap-3">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                              {aiAnalysis.suitabilityScore}/100
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              {isRTLMode ? "نقاط" : "Score"}
                            </div>
                          </div>
                          {getRecommendationBadge(aiAnalysis.recommendation)}
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      {/* Tab Navigation */}
                      <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg mb-6">
                        {[
                          { id: "overview", label: isRTLMode ? "نظرة عامة" : "Overview" },
                          { id: "strengths", label: isRTLMode ? "نقاط القوة" : "Strengths" },
                          { id: "weaknesses", label: isRTLMode ? "نقاط الضعف" : "Weaknesses" },
                          { id: "actions", label: isRTLMode ? "إجراءات المتابعة" : "Follow-up Actions" }
                        ].map((tab) => (
                          <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                              activeTab === tab.id
                                ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                            }`}
                          >
                            {tab.label}
                          </button>
                        ))}
                      </div>

                      {/* Tab Content */}
                      {activeTab === "overview" && (
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                              {isRTLMode ? "تقييم المخاطر" : "Risk Assessment"}
                            </h4>
                            <p className="text-gray-600 dark:text-gray-400">{aiAnalysis.riskAssessment}</p>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                              {isRTLMode ? "استجابة الذكاء الاصطناعي" : "AI Response"}
                            </h4>
                            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap text-sm leading-relaxed">
                                {aiAnalysis.aiResponse}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {activeTab === "strengths" && (
                        <div className="space-y-3">
                          {aiAnalysis.strengths.map((strength, index) => (
                            <div key={index} className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-gray-700 dark:text-gray-300">{strength}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {activeTab === "weaknesses" && (
                        <div className="space-y-3">
                          {aiAnalysis.weaknesses.map((weakness, index) => (
                            <div key={index} className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-gray-700 dark:text-gray-300">{weakness}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {activeTab === "actions" && (
                        <div className="space-y-3">
                          {aiAnalysis.followUpActions.map((action, index) => (
                            <div key={index} className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-gray-700 dark:text-gray-300">{action}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3">
                  <button 
                    onClick={() => handleStatusUpdate('approved')}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                  >
                    <FiCheckCircle className="w-4 h-4" />
                    {isRTLMode ? "موافقة" : "Approve"}
                  </button>
                  <button 
                    onClick={() => handleStatusUpdate('rejected')}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                  >
                    <FiXCircle className="w-4 h-4" />
                    {isRTLMode ? "رفض" : "Reject"}
                  </button>
                  <button 
                    onClick={() => handleStatusUpdate('waitlist')}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg font-medium transition-colors"
                  >
                    <FiClock className="w-4 h-4" />
                    {isRTLMode ? "قائمة الانتظار" : "Waitlist"}
                  </button>
                  <button 
                    onClick={() => handleStatusUpdate('under_review')}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                  >
                    <FiEye className="w-4 h-4" />
                    {isRTLMode ? "قيد المراجعة" : "Under Review"}
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                <div className="flex items-center justify-center h-64">
                  <div className="text-center">
                    <FiUser className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">
                      {isRTLMode ? "اختر طلباً لعرض التفاصيل" : "Select an application to view details"}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdmissionHeadApplicationProcessing;