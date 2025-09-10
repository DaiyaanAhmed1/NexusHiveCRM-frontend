import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocalization } from "../../../../hooks/useLocalization";
import { FiCalendar, FiClock, FiUser, FiBookOpen, FiTarget, FiCheckCircle, FiXCircle, FiAlertCircle, FiCpu, FiPlus, FiEdit2, FiTrash2, FiEye, FiDownload, FiMail, FiPhone, FiMapPin, FiUsers, FiTrendingUp, FiBarChart2, FiPieChart } from "react-icons/fi";
import interviewSchedulingService from "../../services/interviewSchedulingService.js";

const AdmissionHeadInterviewScheduling = () => {
  const { t } = useTranslation();
  const { isRTLMode } = useLocalization();
  const [isLoading, setIsLoading] = useState(false);
  const [scheduledInterviews, setScheduledInterviews] = useState([]);
  const [interviewHistory, setInterviewHistory] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedInterview, setSelectedInterview] = useState(null);
  const [activeTab, setActiveTab] = useState("schedule");
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [newInterview, setNewInterview] = useState({
    studentName: '',
    program: '',
    interviewType: '',
    preferredDate: '',
    preferredTime: '',
    notes: ''
  });

  // Sample students for interview scheduling
  const sampleStudents = [
    {
      id: 1,
      name: "Ahmed Al-Rashid",
      program: "Computer Science",
      applicationId: "APP-2024-001",
      status: "pending_interview",
      gpa: 3.8,
      priority: "high",
      experience: "2 years software development",
      motivation: "Passionate about AI and machine learning"
    },
    {
      id: 2,
      name: "Fatima Al-Zahra",
      program: "Business Administration",
      applicationId: "APP-2024-002",
      status: "scheduled",
      gpa: 3.9,
      priority: "high",
      experience: "1 year marketing internship",
      motivation: "Want to start my own business"
    },
    {
      id: 3,
      name: "Omar Hassan",
      program: "Engineering",
      applicationId: "APP-2024-003",
      status: "completed",
      gpa: 3.6,
      priority: "medium",
      experience: "3 years engineering projects",
      motivation: "Innovate sustainable technology solutions"
    }
  ];

  const interviewTypes = [
    { value: "academic", label: isRTLMode ? "مقابلة أكاديمية" : "Academic Interview" },
    { value: "english", label: isRTLMode ? "مقابلة إتقان اللغة الإنجليزية" : "English Proficiency Interview" },
    { value: "technical", label: isRTLMode ? "مقابلة تقنية" : "Technical Interview" },
    { value: "general", label: isRTLMode ? "تقييم عام" : "General Assessment" },
    { value: "scholarship", label: isRTLMode ? "مقابلة منحة دراسية" : "Scholarship Interview" }
  ];

  const programs = [
    { value: "computer_science", label: isRTLMode ? "علوم الحاسوب" : "Computer Science" },
    { value: "business", label: isRTLMode ? "إدارة الأعمال" : "Business Administration" },
    { value: "engineering", label: isRTLMode ? "الهندسة" : "Engineering" },
    { value: "medicine", label: isRTLMode ? "الطب" : "Medicine" },
    { value: "law", label: isRTLMode ? "القانون" : "Law" },
    { value: "arts", label: isRTLMode ? "الفنون والعلوم الإنسانية" : "Arts & Humanities" }
  ];

  const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"
  ];

  // Initialize with some mock data
  useEffect(() => {
    const mockScheduledInterviews = [
      {
        id: 1,
        studentName: "Ahmed Al-Rashid",
        program: "Computer Science",
        interviewType: "Technical Interview",
        scheduledDate: "2024-01-20",
        scheduledTime: "10:00 AM",
        status: 'scheduled',
        aiRecommendations: isRTLMode ? "توصيات الذكاء الاصطناعي: مقابلة تقنية لمدة 60 دقيقة مع تركيز على مهارات البرمجة" : "AI Recommendations: 60-minute technical interview focusing on programming skills",
        notes: isRTLMode ? "مرشح قوي مع خبرة في تطوير البرمجيات" : "Strong candidate with software development experience",
        createdAt: new Date().toISOString()
      },
      {
        id: 2,
        studentName: "Fatima Al-Zahra",
        program: "Business Administration",
        interviewType: "Academic Interview",
        scheduledDate: "2024-01-22",
        scheduledTime: "02:00 PM",
        status: 'scheduled',
        aiRecommendations: isRTLMode ? "توصيات الذكاء الاصطناعي: مقابلة أكاديمية لمدة 45 دقيقة مع التركيز على الأهداف المهنية" : "AI Recommendations: 45-minute academic interview focusing on career goals",
        notes: isRTLMode ? "خبرة في التسويق وطموحة" : "Marketing experience and ambitious",
        createdAt: new Date().toISOString()
      }
    ];
    setScheduledInterviews(mockScheduledInterviews);
  }, [isRTLMode]);

  const handleScheduleInterview = async () => {
    if (!newInterview.studentName || !newInterview.program || !newInterview.interviewType) {
      alert(isRTLMode ? 'يرجى ملء جميع الحقول المطلوبة' : 'Please fill all required fields');
      return;
    }

    setIsLoading(true);
    try {
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Use dummy data for consistent experience
      const dummyRecommendations = isRTLMode ? 
        `توصيات الذكاء الاصطناعي:
        
1. **توصيات جدولة المقابلة المثلى:**
   - جدولة في ${newInterview.preferredDate} في ${newInterview.preferredTime}
   - السماح بـ 45-60 دقيقة لـ ${newInterview.interviewType}
   - التأكد من أن المحاور على دراية بمتطلبات ${newInterview.program}

2. **اقتراحات تحضير المقابلة:**
   - مراجعة المتطلبات الخاصة بالبرنامج
   - تحضير أمثلة على الخبرة ذات الصلة
   - ممارسة أسئلة المقابلة الشائعة
   - إحضار الوثائق المطلوبة

3. **الوثائق المطلوبة:**
   - كشوف الدرجات الأكاديمية
   - وثيقة الهوية
   - نموذج الطلب
   - أي مواد إضافية خاصة بالبرنامج

4. **مدة المقابلة:** 45-60 دقيقة

5. **اعتبارات خاصة:**
   - معايير التقييم الخاصة بالبرنامج
   - متطلبات إتقان اللغة
   - تقييم المهارات التقنية (إن أمكن)

6. **إجراءات المتابعة:**
   - إرسال بريد إلكتروني تأكيدي للطالب
   - تحضير مواد المقابلة
   - جدولة اجتماع متابعة إذا لزم الأمر` :
        `AI Recommendations:
        
1. **Optimal Interview Scheduling Recommendations:**
   - Schedule for ${newInterview.preferredDate} at ${newInterview.preferredTime}
   - Allow 45-60 minutes for ${newInterview.interviewType}
   - Ensure interviewer is familiar with ${newInterview.program} requirements

2. **Interview Preparation Suggestions:**
   - Review program-specific requirements
   - Prepare examples of relevant experience
   - Practice common interview questions
   - Bring required documents

3. **Required Documents:**
   - Academic transcripts
   - Identity document
   - Application form
   - Any additional program-specific materials

4. **Interview Duration:** 45-60 minutes

5. **Special Considerations:**
   - Program-specific assessment criteria
   - Language proficiency requirements
   - Technical skills evaluation (if applicable)

6. **Follow-up Actions:**
   - Send confirmation email to student
   - Prepare interview materials
   - Schedule follow-up meeting if needed`;

      const interviewRecord = {
        id: Date.now(),
        studentName: newInterview.studentName,
        program: newInterview.program,
        interviewType: newInterview.interviewType,
        scheduledDate: newInterview.preferredDate,
        scheduledTime: newInterview.preferredTime,
        status: 'scheduled',
        aiRecommendations: dummyRecommendations,
        notes: newInterview.notes,
        createdAt: new Date().toISOString()
      };

      setScheduledInterviews(prev => [interviewRecord, ...prev]);
      setInterviewHistory(prev => [interviewRecord, ...prev]);

      // Reset form
      setNewInterview({
        studentName: '',
        program: '',
        interviewType: '',
        preferredDate: '',
        preferredTime: '',
        notes: ''
      });

      alert(isRTLMode ? 'تم جدولة المقابلة بنجاح!' : 'Interview scheduled successfully!');

    } catch (error) {
      console.error('Interview scheduling error:', error);
      alert(isRTLMode ? 'خطأ في جدولة المقابلة. يرجى المحاولة مرة أخرى.' : 'Error scheduling interview. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAIAnalysis = async (interview) => {
    if (!interview) return;

    setIsLoading(true);
    try {
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Use dummy data for consistent experience
      const dummyAnalysis = isRTLMode ? 
        `تحليل الذكاء الاصطناعي:

**تقييم جاهزية المقابلة: 85/100**

**التحديات المحتملة:**
- قد يكون المرشح متوتراً بسبب طبيعة المقابلة عالية المخاطر
- قد تكون الأسئلة التقنية صعبة
- إدارة الوقت أثناء المقابلة

**أسئلة المقابلة المقترحة:**
1. أخبرني عن خبرتك في ${interview.program}
2. كيف تتعامل مع المواقف الصعبة؟
3. ما هي أهدافك المهنية؟
4. لماذا اخترت هذا البرنامج؟

**احتمالية النجاح: 78%**
- خلفية أكاديمية قوية
- خبرة ذات صلة
- دوافع واضحة

**معايير التقييم بعد المقابلة:**
- مهارات التواصل
- المعرفة التقنية
- القدرة على حل المشاكل
- التوافق الثقافي

**عوامل المخاطر:**
- خبرة محدودة في المقابلات
- منافسة عالية على البرنامج
- الحاجة لتحضير إضافي` :
        `AI Analysis:

**Interview Readiness Assessment: 85/100**

**Potential Challenges:**
- Candidate may be nervous due to high-stakes nature
- Technical questions might be challenging
- Time management during interview

**Recommended Interview Questions:**
1. Tell me about your experience with ${interview.program}
2. How do you handle challenging situations?
3. What are your career goals?
4. Why did you choose this program?

**Success Probability: 78%**
- Strong academic background
- Relevant experience
- Clear motivation

**Post-Interview Evaluation Criteria:**
- Communication skills
- Technical knowledge
- Problem-solving ability
- Cultural fit

**Risk Factors:**
- Limited interview experience
- High competition for program
- Need for additional preparation`;

      setAiAnalysis(dummyAnalysis);
      setSelectedInterview(interview);
    } catch (error) {
      console.error('AI analysis error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      scheduled: { 
        label: isRTLMode ? "مجدولة" : "Scheduled", 
        color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300',
        icon: FiCalendar
      },
      completed: { 
        label: isRTLMode ? "مكتملة" : "Completed", 
        color: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300',
        icon: FiCheckCircle
      },
      cancelled: { 
        label: isRTLMode ? "ملغية" : "Cancelled", 
        color: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300',
        icon: FiXCircle
      },
      pending: { 
        label: isRTLMode ? "معلقة" : "Pending", 
        color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300',
        icon: FiClock
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

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 p-6 ${isRTLMode ? 'rtl' : 'ltr'}`} dir={isRTLMode ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {isRTLMode ? "جدولة المقابلات الذكية" : "AI Interview Scheduling"}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {isRTLMode ? "جدولة وتحليل المقابلات بالذكاء الاصطناعي" : "AI-powered interview scheduling and analysis"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <FiCpu className="text-blue-600 w-5 h-5" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {isRTLMode ? "مدعوم بالذكاء الاصطناعي" : "AI Powered"}
              </span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            {[
              { id: "schedule", label: isRTLMode ? "جدولة جديدة" : "Schedule New", icon: FiPlus },
              { id: "scheduled", label: isRTLMode ? "المقابلات المجدولة" : "Scheduled Interviews", icon: FiCalendar },
              { id: "history", label: isRTLMode ? "السجل" : "History", icon: FiClock },
              { id: "analytics", label: isRTLMode ? "التحليلات" : "Analytics", icon: FiBarChart2 }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="p-6">
            {/* Schedule New Interview Tab */}
            {activeTab === "schedule" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Form */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {isRTLMode ? "تفاصيل المقابلة" : "Interview Details"}
                    </h3>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {isRTLMode ? "اسم الطالب" : "Student Name"}
                      </label>
                      <input
                        type="text"
                        value={newInterview.studentName}
                        onChange={(e) => setNewInterview(prev => ({ ...prev, studentName: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder={isRTLMode ? "أدخل اسم الطالب" : "Enter student name"}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {isRTLMode ? "البرنامج" : "Program"}
                      </label>
                      <select
                        value={newInterview.program}
                        onChange={(e) => setNewInterview(prev => ({ ...prev, program: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">{isRTLMode ? "اختر البرنامج" : "Select Program"}</option>
                        {programs.map((program) => (
                          <option key={program.value} value={program.value}>
                            {program.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {isRTLMode ? "نوع المقابلة" : "Interview Type"}
                      </label>
                      <select
                        value={newInterview.interviewType}
                        onChange={(e) => setNewInterview(prev => ({ ...prev, interviewType: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">{isRTLMode ? "اختر نوع المقابلة" : "Select Interview Type"}</option>
                        {interviewTypes.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          {isRTLMode ? "التاريخ المفضل" : "Preferred Date"}
                        </label>
                        <input
                          type="date"
                          value={newInterview.preferredDate}
                          onChange={(e) => setNewInterview(prev => ({ ...prev, preferredDate: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          {isRTLMode ? "الوقت المفضل" : "Preferred Time"}
                        </label>
                        <select
                          value={newInterview.preferredTime}
                          onChange={(e) => setNewInterview(prev => ({ ...prev, preferredTime: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">{isRTLMode ? "اختر الوقت" : "Select Time"}</option>
                          {timeSlots.map((time) => (
                            <option key={time} value={time}>
                              {time}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {isRTLMode ? "ملاحظات" : "Notes"}
                      </label>
                      <textarea
                        value={newInterview.notes}
                        onChange={(e) => setNewInterview(prev => ({ ...prev, notes: e.target.value }))}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder={isRTLMode ? "أي ملاحظات إضافية..." : "Any additional notes..."}
                      />
                    </div>

                    <button
                      onClick={handleScheduleInterview}
                      disabled={isLoading}
                      className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors ${
                        isLoading
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500'
                          : 'bg-blue-600 hover:bg-blue-700 text-white'
                      }`}
                    >
                      <FiCpu className="w-4 h-4" />
                      {isLoading 
                        ? (isRTLMode ? "جاري الجدولة..." : "Scheduling...") 
                        : (isRTLMode ? "جدولة بالذكاء الاصطناعي" : "Schedule with AI")
                      }
                    </button>
                  </div>

                  {/* AI Recommendations Preview */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {isRTLMode ? "معاينة توصيات الذكاء الاصطناعي" : "AI Recommendations Preview"}
                    </h3>
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-800 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                      <div className="flex items-center gap-2 mb-3">
                        <FiCpu className="text-blue-600 w-5 h-5" />
                        <span className="font-medium text-blue-800 dark:text-blue-200">
                          {isRTLMode ? "توصيات الذكاء الاصطناعي" : "AI Recommendations"}
                        </span>
                      </div>
                      <div className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                        <p>{isRTLMode ? "• مدة المقابلة المقترحة: 45-60 دقيقة" : "• Suggested interview duration: 45-60 minutes"}</p>
                        <p>{isRTLMode ? "• تحضير مواد المقابلة المطلوبة" : "• Prepare required interview materials"}</p>
                        <p>{isRTLMode ? "• إرسال تأكيد للطالب" : "• Send confirmation to student"}</p>
                        <p>{isRTLMode ? "• جدولة متابعة إذا لزم الأمر" : "• Schedule follow-up if needed"}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Scheduled Interviews Tab */}
            {activeTab === "scheduled" && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {isRTLMode ? "المقابلات المجدولة" : "Scheduled Interviews"}
                  </h3>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {scheduledInterviews.length} {isRTLMode ? "مقابلة" : "interviews"}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {scheduledInterviews.map((interview) => (
                    <div key={interview.id} className="bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">{interview.studentName}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{interview.program}</p>
                        </div>
                        {getStatusBadge(interview.status)}
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <FiCalendar className="w-4 h-4" />
                          {interview.scheduledDate}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <FiClock className="w-4 h-4" />
                          {interview.scheduledTime}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <FiTarget className="w-4 h-4" />
                          {interview.interviewType}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleAIAnalysis(interview)}
                          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                        >
                          <FiCpu className="w-4 h-4" />
                          {isRTLMode ? "تحليل" : "Analyze"}
                        </button>
                        <button className="px-3 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-200 rounded-lg text-sm font-medium transition-colors">
                          <FiEdit2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* History Tab */}
            {activeTab === "history" && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {isRTLMode ? "سجل المقابلات" : "Interview History"}
                </h3>
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <FiClock className="w-12 h-12 mx-auto mb-4" />
                  <p>{isRTLMode ? "لا توجد مقابلات في السجل بعد" : "No interviews in history yet"}</p>
                </div>
              </div>
            )}

            {/* Analytics Tab */}
            {activeTab === "analytics" && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {isRTLMode ? "تحليلات المقابلات" : "Interview Analytics"}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg p-6">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-600 rounded-full p-2">
                        <FiCalendar className="text-white w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-blue-800 dark:text-blue-200">{scheduledInterviews.length}</p>
                        <p className="text-sm text-blue-600 dark:text-blue-400">{isRTLMode ? "مقابلات مجدولة" : "Scheduled Interviews"}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg p-6">
                    <div className="flex items-center gap-3">
                      <div className="bg-green-600 rounded-full p-2">
                        <FiCheckCircle className="text-white w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-green-800 dark:text-green-200">0</p>
                        <p className="text-sm text-green-600 dark:text-green-400">{isRTLMode ? "مقابلات مكتملة" : "Completed Interviews"}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg p-6">
                    <div className="flex items-center gap-3">
                      <div className="bg-purple-600 rounded-full p-2">
                        <FiTrendingUp className="text-white w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-purple-800 dark:text-purple-200">85%</p>
                        <p className="text-sm text-purple-600 dark:text-purple-400">{isRTLMode ? "معدل النجاح" : "Success Rate"}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* AI Analysis Modal */}
        {aiAnalysis && selectedInterview && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {isRTLMode ? "تحليل الذكاء الاصطناعي" : "AI Analysis"}
              </h3>
              <button
                onClick={() => setAiAnalysis(null)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <FiXCircle className="w-5 h-5" />
              </button>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <FiCpu className="text-blue-600 w-5 h-5" />
                <span className="font-medium text-gray-900 dark:text-white">
                  {isRTLMode ? "تحليل مقابلة" : "Interview Analysis"}: {selectedInterview.studentName}
                </span>
              </div>
              <div className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
                {aiAnalysis}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdmissionHeadInterviewScheduling;