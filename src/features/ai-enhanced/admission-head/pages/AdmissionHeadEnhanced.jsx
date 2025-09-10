import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalization } from '../../../../hooks/useLocalization';
import AdmissionHeadApplicationProcessing from '../components/AdmissionHeadApplicationProcessing';
import AdmissionHeadDocumentVerification from '../components/AdmissionHeadDocumentVerification';
import AdmissionHeadInterviewScheduling from '../components/AdmissionHeadInterviewScheduling';
import ApplicationProcessingAI from '../../shared/components/ApplicationProcessingAI';
import enTranslations from '../../locals/en.json';
import arTranslations from '../../locals/ar.json';

const AdmissionHeadEnhanced = () => {
  const { t } = useTranslation();
  const { isRTLMode } = useLocalization();
  
  const [showAIFeatures, setShowAIFeatures] = useState(false);
  const [applicationProcessing, setApplicationProcessing] = useState(null);
  const [documentVerification, setDocumentVerification] = useState(null);
  const [interviewScheduling, setInterviewScheduling] = useState(null);
  const [activeFeature, setActiveFeature] = useState('application-processing'); // 'application-processing', 'document-verification', or 'interview-scheduling'

  // Handle application processing completion
  const handleApplicationProcessingComplete = (result) => {
    setApplicationProcessing(result);
    console.log('Application processing completed:', result);
  };

  // Handle document verification completion
  const handleDocumentVerificationComplete = (result) => {
    setDocumentVerification(result);
    console.log('Document verification completed:', result);
  };

  // Handle interview scheduling completion
  const handleInterviewSchedulingComplete = (result) => {
    setInterviewScheduling(result);
    console.log('Interview scheduling completed:', result);
  };

  // Helper function to get translation with fallback
// Helper function to get translation with fallback
const getTranslation = (key, fallback) => {
  try {
    // Try AI-enhanced translations first
    const translations = isRTLMode ? arTranslations : enTranslations;
    const keys = key.split('.');
    let value = translations;
    
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) break;
    }
    
    if (value) return value;
    
    // Fallback to i18n
    return t(key) || fallback;
  } catch (error) {
    return fallback;
  }
};

  return (
    <div className="admission-head-dashboard-enhanced min-h-screen bg-gray-50 dark:bg-gray-900" dir={isRTLMode ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {getTranslation('admission.dashboard.title', 'Admission Head Dashboard')}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              {getTranslation('admission.dashboard.subtitle', 'AI-Enhanced Admission Management')}
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAIFeatures(!showAIFeatures)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                showAIFeatures 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <circle cx="6" cy="6" r="2" />
                    <circle cx="18" cy="6" r="2" />
                    <circle cx="6" cy="18" r="2" />
                    <circle cx="18" cy="18" r="2" />
                    <rect x="10" y="10" width="4" height="4" />
                  </svg>
                </div>
                {getTranslation('admission.dashboard.aiFeatures', 'AI Features')}
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* AI Features Toggle */}
        {showAIFeatures && (
          <div className="mb-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
              <div className="flex items-center gap-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {getTranslation('admission.dashboard.selectFeature', 'Select AI Feature')}
                </h3>
                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => setActiveFeature('application-processing')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      activeFeature === 'application-processing'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {getTranslation('admission.dashboard.applicationProcessing', 'Application Processing')}
                  </button>
                  <button
                    onClick={() => setActiveFeature('document-verification')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      activeFeature === 'document-verification'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {getTranslation('admission.dashboard.documentVerification', 'Document Verification')}
                  </button>
                  <button
                    onClick={() => setActiveFeature('interview-scheduling')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      activeFeature === 'interview-scheduling'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {getTranslation('admission.dashboard.interviewScheduling', 'Interview Scheduling')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Application Processing Section */}
        {showAIFeatures && activeFeature === 'application-processing' && (
          <div className="mb-8">
            <AdmissionHeadApplicationProcessing onProcessingComplete={handleApplicationProcessingComplete} />
          </div>
        )}

        {/* Document Verification Section */}
        {showAIFeatures && activeFeature === 'document-verification' && (
          <div className="mb-8">
            <AdmissionHeadDocumentVerification />
          </div>
        )}

        {/* Interview Scheduling Section */}
        {showAIFeatures && activeFeature === 'interview-scheduling' && (
          <div className="mb-8">
            <AdmissionHeadInterviewScheduling />
          </div>
        )}

        {/* Quick Actions */}
        <div className="mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {getTranslation('admission.dashboard.quickActions', 'Quick Actions')}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <button className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-gray-900 dark:text-white">
                      {getTranslation('admission.dashboard.manageApplications', 'Manage Applications')}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {getTranslation('admission.dashboard.reviewApplications', 'Review applications')}
                    </div>
                  </div>
                </div>
              </button>
              
              <button className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-gray-900 dark:text-white">
                      {getTranslation('admission.dashboard.verifyDocuments', 'Verify Documents')}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {getTranslation('admission.dashboard.documentVerification', 'Document verification')}
                    </div>
                  </div>
                </div>
              </button>
              
              {showAIFeatures && (
                <>
                  <button 
                    onClick={() => setActiveFeature('application-processing')}
                    className={`p-4 border rounded-lg transition-colors ${
                      activeFeature === 'application-processing'
                        ? 'bg-purple-100 dark:bg-purple-900/30 border-purple-300 dark:border-purple-700'
                        : 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-900/30'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <circle cx="6" cy="6" r="2" />
                          <circle cx="18" cy="6" r="2" />
                          <circle cx="6" cy="18" r="2" />
                          <circle cx="18" cy="18" r="2" />
                          <rect x="10" y="10" width="4" height="4" />
                        </svg>
                      </div>
                      <div className="text-left">
                        <div className="font-medium text-gray-900 dark:text-white">
                          {getTranslation('admission.dashboard.aiApplicationProcessing', 'AI Application Processing')}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {getTranslation('admission.dashboard.smartProcessing', 'Smart processing')}
                        </div>
                      </div>
                    </div>
                  </button>
                  
                  <button 
                    onClick={() => setActiveFeature('document-verification')}
                    className={`p-4 border rounded-lg transition-colors ${
                      activeFeature === 'document-verification'
                        ? 'bg-orange-100 dark:bg-orange-900/30 border-orange-300 dark:border-orange-700'
                        : 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800 hover:bg-orange-100 dark:hover:bg-orange-900/30'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="text-left">
                        <div className="font-medium text-gray-900 dark:text-white">
                          {getTranslation('admission.dashboard.aiDocumentVerification', 'AI Document Verification')}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {getTranslation('admission.dashboard.automatedVerification', 'Automated verification')}
                        </div>
                      </div>
                    </div>
                  </button>
                  
                  <button 
                    onClick={() => setActiveFeature('interview-scheduling')}
                    className={`p-4 border rounded-lg transition-colors ${
                      activeFeature === 'interview-scheduling'
                        ? 'bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700'
                        : 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 hover:bg-green-100 dark:hover:bg-green-900/30'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="text-left">
                        <div className="font-medium text-gray-900 dark:text-white">
                          {getTranslation('admission.dashboard.aiInterviewScheduling', 'AI Interview Scheduling')}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {getTranslation('admission.dashboard.smartScheduling', 'Smart scheduling')}
                        </div>
                      </div>
                    </div>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Application Processing Summary */}
        {applicationProcessing && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {getTranslation('admission.dashboard.latestApplicationProcessing', 'Latest Application Processing')}
            </h2>
            <div className="text-gray-600 dark:text-gray-300">
              <p><strong>{getTranslation('admission.dashboard.studentName', 'Student Name')}:</strong> {applicationProcessing.studentName}</p>
              <p><strong>{getTranslation('admission.dashboard.program', 'Program')}:</strong> {applicationProcessing.program}</p>
              <p><strong>{getTranslation('admission.dashboard.status', 'Status')}:</strong> {applicationProcessing.status}</p>
              <p><strong>{getTranslation('admission.dashboard.score', 'Score')}:</strong> {applicationProcessing.overallScore || 0}/100</p>
              <p><strong>{getTranslation('admission.dashboard.recommendation', 'Recommendation')}:</strong> {applicationProcessing.recommendation || 'N/A'}</p>
              <p><strong>{getTranslation('admission.dashboard.processedAt', 'Processed At')}:</strong> {new Date(applicationProcessing.processedAt || Date.now()).toLocaleString()}</p>
            </div>
          </div>
        )}

        {/* Document Verification Summary */}
        {documentVerification && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {getTranslation('admission.dashboard.latestDocumentVerification', 'Latest Document Verification')}
            </h2>
            <div className="text-gray-600 dark:text-gray-300">
              <p><strong>{getTranslation('admission.dashboard.studentName', 'Student Name')}:</strong> {documentVerification.studentName}</p>
              <p><strong>{getTranslation('admission.dashboard.documentType', 'Document Type')}:</strong> {documentVerification.documentType}</p>
              <p><strong>{getTranslation('admission.dashboard.status', 'Status')}:</strong> {documentVerification.status}</p>
              <p><strong>{getTranslation('admission.dashboard.authenticityScore', 'Authenticity Score')}:</strong> {documentVerification.scores?.authenticity || 0}/100</p>
              <p><strong>{getTranslation('admission.dashboard.completenessScore', 'Completeness Score')}:</strong> {documentVerification.scores?.completeness || 0}/100</p>
              <p><strong>{getTranslation('admission.dashboard.verifiedAt', 'Verified At')}:</strong> {new Date(documentVerification.verifiedAt || Date.now()).toLocaleString()}</p>
            </div>
          </div>
        )}

        {/* Interview Scheduling Summary */}
        {interviewScheduling && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {getTranslation('admission.dashboard.latestInterviewScheduling', 'Latest Interview Scheduling')}
            </h2>
            <div className="text-gray-600 dark:text-gray-300">
              <p><strong>{getTranslation('admission.dashboard.studentName', 'Student Name')}:</strong> {interviewScheduling.studentName}</p>
              <p><strong>{getTranslation('admission.dashboard.program', 'Program')}:</strong> {interviewScheduling.program}</p>
              <p><strong>{getTranslation('admission.dashboard.interviewType', 'Interview Type')}:</strong> {interviewScheduling.interviewType}</p>
              <p><strong>{getTranslation('admission.dashboard.scheduledDate', 'Scheduled Date')}:</strong> {interviewScheduling.scheduledDate}</p>
              <p><strong>{getTranslation('admission.dashboard.scheduledTime', 'Scheduled Time')}:</strong> {interviewScheduling.scheduledTime}</p>
              <p><strong>{getTranslation('admission.dashboard.status', 'Status')}:</strong> {interviewScheduling.status}</p>
              <p><strong>{getTranslation('admission.dashboard.scheduledAt', 'Scheduled At')}:</strong> {new Date(interviewScheduling.createdAt || Date.now()).toLocaleString()}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdmissionHeadEnhanced;