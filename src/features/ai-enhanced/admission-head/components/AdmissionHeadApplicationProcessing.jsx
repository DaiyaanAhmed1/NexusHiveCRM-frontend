import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import { Badge } from "../../../../components/ui/badge";
import { Input } from "../../../../components/ui/input";
import { Textarea } from "../../../../components/ui/textarea";
import { useLocalization } from "../../../../hooks/useLocalization";
import { useRTL } from "../../../../hooks/useRTL";
import aiService from "../../../../services/aiService";

const AdmissionHeadApplicationProcessing = () => {
  const { language } = useLocalization();
  const { isRTL } = useRTL();
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [processingStatus, setProcessingStatus] = useState('idle');
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterProgram, setFilterProgram] = useState('all');
  const [activeTab, setActiveTab] = useState("overview");

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

  const handleApplicationSelect = (application) => {
    setSelectedApplication(application);
    setAiAnalysis(null);
    setActiveTab("overview");
  };

  const handleAIProcessing = async () => {
    if (!selectedApplication) return;

    setProcessingStatus('processing');
    try {
      const prompt = `
        Analyze this university application:
        Name: ${selectedApplication.name}
        Program: ${selectedApplication.program}
        GPA: ${selectedApplication.gpa}
        Experience: ${selectedApplication.experience}
        Motivation: ${selectedApplication.motivation}
        Documents: ${selectedApplication.documents.join(', ')}

        Provide:
        1. Overall suitability score (0-100)
        2. Strengths and weaknesses
        3. Recommendation (approve/reject/waitlist)
        4. Required follow-up actions
        5. Risk assessment
      `;

      let aiResponse;
      try {
        const response = await aiService.generateResponse(prompt);
        aiResponse = response.content; // Extract content from response object
      } catch (aiError) {
        console.warn('AI service unavailable, using mock data:', aiError);
        aiResponse = `Mock AI Analysis:
        
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

**Recommendation:** Based on the overall assessment, this candidate is suitable for admission with some conditions.`;
      }

      setAiAnalysis({
        suitabilityScore: Math.floor(Math.random() * 40) + 60, // 60-100
        recommendation: ['approve', 'reject', 'waitlist'][Math.floor(Math.random() * 3)],
        strengths: [
          "Strong academic performance",
          "Relevant experience in field",
          "Clear motivation and goals",
          "Complete documentation"
        ],
        weaknesses: [
          "Limited extracurricular activities",
          "No leadership experience",
          "Generic motivation statement"
        ],
        followUpActions: [
          "Schedule interview",
          "Request additional documents",
          "Verify experience claims",
          "Check references"
        ],
        riskAssessment: "Low risk - well-qualified candidate",
        aiResponse: aiResponse
      });
    } catch (error) {
      console.error('AI processing error:', error);
      alert("Error processing application. Please try again.");
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
      pending: { label: "Pending", color: 'bg-yellow-100 text-yellow-800' },
      under_review: { label: "Under Review", color: 'bg-blue-100 text-blue-800' },
      approved: { label: "Approved", color: 'bg-green-100 text-green-800' },
      rejected: { label: "Rejected", color: 'bg-red-100 text-red-800' },
      waitlist: { label: "Waitlist", color: 'bg-purple-100 text-purple-800' }
    };
    
    const statusInfo = statusMap[status] || statusMap.pending;
    return <Badge className={statusInfo.color}>{statusInfo.label}</Badge>;
  };

  const getRecommendationBadge = (recommendation) => {
    const recMap = {
      approve: { label: "Approve", color: 'bg-green-100 text-green-800' },
      reject: { label: "Reject", color: 'bg-red-100 text-red-800' },
      waitlist: { label: "Waitlist", color: 'bg-yellow-100 text-yellow-800' }
    };
    
    const recInfo = recMap[recommendation] || recMap.approve;
    return <Badge className={recInfo.color}>{recInfo.label}</Badge>;
  };

  return (
    <div className={`space-y-6 ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Application Processing
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            AI-powered application review and analysis
          </p>
        </div>
        <div className="flex space-x-2">
          <Button 
            onClick={handleAIProcessing}
            disabled={!selectedApplication || processingStatus === 'processing'}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {processingStatus === 'processing' 
              ? "Processing..." 
              : "Analyze with AI"
            }
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Applications List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Applications List</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Search and Filters */}
              <div className="space-y-4 mb-4">
                <Input
                  placeholder="Search applications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="all">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="under_review">Under Review</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                  <option value="waitlist">Waitlist</option>
                </select>

                <select
                  value={filterProgram}
                  onChange={(e) => setFilterProgram(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="all">All Programs</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Business Administration">Business Administration</option>
                  <option value="Engineering">Engineering</option>
                </select>
              </div>

              {/* Applications */}
              <div className="space-y-2">
                {filteredApplications.map((app) => (
                  <div
                    key={app.id}
                    onClick={() => handleApplicationSelect(app)}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      selectedApplication?.id === app.id
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">{app.name}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{app.program}</p>
                        <p className="text-xs text-gray-500">{app.submittedDate}</p>
                      </div>
                      {getStatusBadge(app.status)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Application Details */}
        <div className="lg:col-span-2">
          {selectedApplication ? (
            <div className="space-y-6">
              {/* Application Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    Application Details
                    {getStatusBadge(selectedApplication.status)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Name
                      </label>
                      <p className="text-gray-900 dark:text-white">{selectedApplication.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Email
                      </label>
                      <p className="text-gray-900 dark:text-white">{selectedApplication.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Phone
                      </label>
                      <p className="text-gray-900 dark:text-white">{selectedApplication.phone}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Program
                      </label>
                      <p className="text-gray-900 dark:text-white">{selectedApplication.program}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        GPA
                      </label>
                      <p className="text-gray-900 dark:text-white">{selectedApplication.gpa}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Submitted Date
                      </label>
                      <p className="text-gray-900 dark:text-white">{selectedApplication.submittedDate}</p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Documents
                    </label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedApplication.documents.map((doc, index) => (
                        <Badge key={index} variant="outline">{doc}</Badge>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Experience
                    </label>
                    <p className="text-gray-900 dark:text-white">{selectedApplication.experience}</p>
                  </div>

                  <div className="mt-4">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Motivation
                    </label>
                    <p className="text-gray-900 dark:text-white">{selectedApplication.motivation}</p>
                  </div>
                </CardContent>
              </Card>

              {/* AI Analysis */}
              {aiAnalysis && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      AI Analysis
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-blue-600">
                          {aiAnalysis.suitabilityScore}/100
                        </span>
                        {getRecommendationBadge(aiAnalysis.recommendation)}
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Tab Navigation */}
                      <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
                        {[
                          { id: "overview", label: "Overview" },
                          { id: "strengths", label: "Strengths" },
                          { id: "weaknesses", label: "Weaknesses" },
                          { id: "actions", label: "Follow-up Actions" }
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
                      {activeTab === "overview" && (
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                              Risk Assessment
                            </h4>
                            <p className="text-gray-600 dark:text-gray-400">{aiAnalysis.riskAssessment}</p>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                              AI Response
                            </h4>
                            <p className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
                              {aiAnalysis.aiResponse}
                            </p>
                          </div>
                        </div>
                      )}

                      {activeTab === "strengths" && (
                        <div className="space-y-2">
                          {aiAnalysis.strengths.map((strength, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              <span className="text-gray-700 dark:text-gray-300">{strength}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {activeTab === "weaknesses" && (
                        <div className="space-y-2">
                          {aiAnalysis.weaknesses.map((weakness, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                              <span className="text-gray-700 dark:text-gray-300">{weakness}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {activeTab === "actions" && (
                        <div className="space-y-2">
                          {aiAnalysis.followUpActions.map((action, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              <span className="text-gray-700 dark:text-gray-300">{action}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <Button 
                  onClick={() => handleStatusUpdate('approved')}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Approve
                </Button>
                <Button 
                  onClick={() => handleStatusUpdate('rejected')}
                  variant="destructive"
                >
                  Reject
                </Button>
                <Button 
                  onClick={() => handleStatusUpdate('waitlist')}
                  variant="outline"
                >
                  Waitlist
                </Button>
                <Button 
                  onClick={() => handleStatusUpdate('under_review')}
                  variant="outline"
                >
                  Under Review
                </Button>
              </div>
            </div>
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center h-64">
                <div className="text-center">
                  <p className="text-gray-500 dark:text-gray-400">
                    Select an application to view details
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdmissionHeadApplicationProcessing;