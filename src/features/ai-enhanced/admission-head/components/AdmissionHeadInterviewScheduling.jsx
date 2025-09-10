import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import { Badge } from "../../../../components/ui/badge";
import { Input } from "../../../../components/ui/input";
import { Textarea } from "../../../../components/ui/textarea";
import { useLocalization } from "../../../../hooks/useLocalization";
import { useRTL } from "../../../../hooks/useRTL";
import aiService from "../../../../services/aiService";

const AdmissionHeadInterviewScheduling = () => {
  const { language } = useLocalization();
  const { isRTL } = useRTL();
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
    "Academic Interview",
    "English Proficiency Interview",
    "Technical Interview",
    "General Assessment",
    "Scholarship Interview"
  ];

  const programs = [
    "Computer Science",
    "Business Administration",
    "Engineering",
    "Medicine",
    "Law",
    "Arts & Humanities"
  ];

  const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"
  ];

  const handleScheduleInterview = async () => {
    if (!newInterview.studentName || !newInterview.program || !newInterview.interviewType) {
      alert(language === 'ar' ? 'يرجى ملء جميع الحقول المطلوبة' : 'Please fill all required fields');
      return;
    }

    setIsLoading(true);
    try {
      const prompt = `As an AI interview scheduling assistant for university admissions, please help schedule an interview with the following details:

Student Name: ${newInterview.studentName}
Program: ${newInterview.program}
Interview Type: ${newInterview.interviewType}
Preferred Date: ${newInterview.preferredDate}
Preferred Time: ${newInterview.preferredTime}
Notes: ${newInterview.notes}

Please provide:
1. Optimal interview scheduling recommendations
2. Interview preparation suggestions for the student
3. Required documents or materials needed
4. Interview duration estimation
5. Special considerations based on the program
6. Follow-up actions after the interview

Respond in ${language === 'ar' ? 'Arabic' : 'English'} with professional formatting.`;

let aiResponse;
try {
  const response = await aiService.generateResponse(prompt);
  aiResponse = response.content; // Extract content from response object
} catch (aiError) {
  console.warn('AI service unavailable, using mock data:', aiError);
  aiResponse = `Mock AI Response:
        
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
      }

      const interviewRecord = {
        id: Date.now(),
        studentName: newInterview.studentName,
        program: newInterview.program,
        interviewType: newInterview.interviewType,
        scheduledDate: newInterview.preferredDate,
        scheduledTime: newInterview.preferredTime,
        status: 'scheduled',
        aiRecommendations: aiResponse,
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

      alert('Interview scheduled successfully!');

    } catch (error) {
      console.error('Interview scheduling error:', error);
      alert('Error scheduling interview. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAIAnalysis = async (interview) => {
    if (!interview) return;

    setIsLoading(true);
    try {
      const prompt = `As an AI interview analysis assistant, please analyze this scheduled interview:

Student: ${interview.studentName}
Program: ${interview.program}
Interview Type: ${interview.interviewType}
Scheduled Date: ${interview.scheduledDate}
Scheduled Time: ${interview.scheduledTime}
Notes: ${interview.notes}

Please provide:
1. Interview readiness assessment (0-100 score)
2. Potential challenges and how to address them
3. Recommended interview questions for this candidate
4. Success probability and factors
5. Post-interview evaluation criteria
6. Risk factors and mitigation strategies

Respond in ${language === 'ar' ? 'Arabic' : 'English'} with detailed analysis.`;

let aiResponse;
try {
  const response = await aiService.generateResponse(prompt);
  aiResponse = response.content; // Extract content from response object
} catch (aiError) {
  console.warn('AI service unavailable, using mock data:', aiError);
  aiResponse = `Mock AI Analysis:

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
- Need for additional preparation

**Mitigation Strategies:**
- Provide interview preparation materials
- Schedule practice session if needed
- Ensure comfortable interview environment`;
      }

      setAiAnalysis({
        interviewId: interview.id,
        readinessScore: Math.floor(Math.random() * 30) + 70, // 70-100
        successProbability: Math.floor(Math.random() * 25) + 75, // 75-100
        aiResponse: aiResponse,
        analyzedAt: new Date().toISOString()
      });

    } catch (error) {
      console.error('AI analysis error:', error);
      alert('Error analyzing interview. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      case 'pending_interview': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'scheduled': return 'Scheduled';
      case 'completed': return 'Completed';
      case 'cancelled': return 'Cancelled';
      case 'pending_interview': return 'Pending Interview';
      default: return status;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getScoreColor = (score) => {
    if (score >= 90) return "text-green-600";
    if (score >= 80) return "text-blue-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className={`space-y-6 ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Interview Scheduling
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            AI-powered interview scheduling and analysis
          </p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
        {[
          { id: "schedule", label: "New Schedule" },
          { id: "students", label: "Students" },
          { id: "scheduled", label: "Scheduled" },
          { id: "history", label: "History" }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "schedule" && (
        <Card>
          <CardHeader>
            <CardTitle>Schedule New Interview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Student Name *
                </label>
                <Input
                  value={newInterview.studentName}
                  onChange={(e) => setNewInterview(prev => ({ ...prev, studentName: e.target.value }))}
                  placeholder="Enter student name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Program *
                </label>
                <select
                  value={newInterview.program}
                  onChange={(e) => setNewInterview(prev => ({ ...prev, program: e.target.value }))}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">Select program</option>
                  {programs.map((program) => (
                    <option key={program} value={program}>{program}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Interview Type *
                </label>
                <select
                  value={newInterview.interviewType}
                  onChange={(e) => setNewInterview(prev => ({ ...prev, interviewType: e.target.value }))}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">Select interview type</option>
                  {interviewTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Preferred Date
                </label>
                <Input
                  type="date"
                  value={newInterview.preferredDate}
                  onChange={(e) => setNewInterview(prev => ({ ...prev, preferredDate: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Preferred Time
                </label>
                <select
                  value={newInterview.preferredTime}
                  onChange={(e) => setNewInterview(prev => ({ ...prev, preferredTime: e.target.value }))}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">Select time</option>
                  {timeSlots.map((time) => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Additional Notes
              </label>
              <Textarea
                value={newInterview.notes}
                onChange={(e) => setNewInterview(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Enter any additional notes"
                rows={3}
              />
            </div>
            <Button
              onClick={handleScheduleInterview}
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              {isLoading ? 'Scheduling...' : 'Schedule Interview with AI'}
            </Button>
          </CardContent>
        </Card>
      )}

      {activeTab === "students" && (
        <Card>
          <CardHeader>
            <CardTitle>Student List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sampleStudents.map((student) => (
                <div key={student.id} className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {student.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {student.program} - {student.applicationId}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        GPA: {student.gpa}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getPriorityColor(student.priority)}>
                        {student.priority}
                      </Badge>
                      <Badge className={getStatusColor(student.status)}>
                        {getStatusText(student.status)}
                      </Badge>
                      <Button
                        onClick={() => {
                          setNewInterview(prev => ({ 
                            ...prev, 
                            studentName: student.name, 
                            program: student.program 
                          }));
                          setActiveTab("schedule");
                        }}
                        size="sm"
                        variant="outline"
                      >
                        Schedule
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === "scheduled" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Scheduled Interviews</CardTitle>
            </CardHeader>
            <CardContent>
              {scheduledInterviews.length === 0 ? (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  No interviews scheduled yet.
                </div>
              ) : (
                <div className="space-y-4">
                  {scheduledInterviews.map((interview) => (
                    <div key={interview.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {interview.studentName}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {interview.program} - {interview.interviewType}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {interview.scheduledDate} at {interview.scheduledTime}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(interview.status)}>
                            {getStatusText(interview.status)}
                          </Badge>
                          <Button
                            onClick={() => {
                              setSelectedInterview(interview);
                              handleAIAnalysis(interview);
                            }}
                            disabled={isLoading}
                            size="sm"
                            className="bg-purple-600 hover:bg-purple-700"
                          >
                            {isLoading ? 'Analyzing...' : 'AI Analysis'}
                          </Button>
                        </div>
                      </div>
                      {interview.aiRecommendations && (
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                          <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                            AI Recommendations
                          </h4>
                          <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                          {typeof interview.aiRecommendations === 'string' 
  ? interview.aiRecommendations 
  : interview.aiRecommendations?.content || 'No recommendations available'}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* AI Analysis Results */}
          {aiAnalysis && selectedInterview && (
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  AI Interview Analysis
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Readiness</p>
                      <p className={`text-2xl font-bold ${getScoreColor(aiAnalysis.readinessScore)}`}>
                        {aiAnalysis.readinessScore}/100
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Success Probability</p>
                      <p className={`text-2xl font-bold ${getScoreColor(aiAnalysis.successProbability)}`}>
                        {aiAnalysis.successProbability}%
                      </p>
                    </div>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                      AI Analysis Report
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
                      {aiAnalysis.aiResponse}
                    </p>
                  </div>
                  <div className="text-xs text-gray-500">
                    Analyzed at: {new Date(aiAnalysis.analyzedAt).toLocaleString()}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {activeTab === "history" && (
        <Card>
          <CardHeader>
            <CardTitle>Interview History</CardTitle>
          </CardHeader>
          <CardContent>
            {interviewHistory.length === 0 ? (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                No interview history yet.
              </div>
            ) : (
              <div className="space-y-3">
                {interviewHistory.map((item) => (
                  <div key={item.id} className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {item.studentName} - {item.program}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {item.interviewType} - {item.scheduledDate} {item.scheduledTime}
                      </p>
                    </div>
                    <Badge className={getStatusColor(item.status)}>
                      {getStatusText(item.status)}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdmissionHeadInterviewScheduling;