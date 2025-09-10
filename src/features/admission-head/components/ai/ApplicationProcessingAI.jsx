import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalization } from '../../../../hooks/useLocalization';
import applicationProcessingService from '../../../services/applicationProcessingService'; // ← Fixed: changed '../services/' to '../../../services/'

const ApplicationProcessingAI = ({ 
  applicationData, 
  onProcessingComplete,
  showHistory = false,
  className = ""
}) => {
  const { t } = useTranslation();
  const { isRTLMode } = useLocalization();
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingResult, setProcessingResult] = useState(null);
  const [error, setError] = useState(null);
  const [processingHistory, setProcessingHistory] = useState([]);

  // Local getTranslation helper function
  const getTranslation = (key, fallback = key) => {
    try {
      return t(key) || fallback;
    } catch (error) {
      return fallback;
    }
  };

  // Get priority color
  const getPriorityColor = (priority) => {
    if (!priority) return 'bg-gray-500';
    switch (priority.toLowerCase()) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  // Get risk level color
  const getRiskColor = (riskLevel) => {
    if (!riskLevel) return 'bg-gray-500';
    switch (riskLevel.toLowerCase()) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  // Get completeness color
  const getCompletenessColor = (completeness) => {
    if (completeness >= 90) return 'text-green-600';
    if (completeness >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  // Process application
  const handleProcessApplication = async () => {
    if (!applicationData) {
      setError('No application data provided');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const result = await applicationProcessingService.processApplication(applicationData);
      setProcessingResult(result);
      
      // Save to history
      applicationProcessingService.saveToHistory(result);
      
      // Notify parent component
      if (onProcessingComplete) {
        onProcessingComplete(result);
      }
    } catch (error) {
      console.error('Error processing application:', error);
      setError('Failed to process application. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Load processing history
  useEffect(() => {
    if (showHistory) {
      const history = applicationProcessingService.getProcessingHistory();
      setProcessingHistory(history);
    }
  }, [showHistory]);

  // Auto-process on mount if data is available
  useEffect(() => {
    if (applicationData && !processingResult) {
      handleProcessApplication();
    }
  }, [applicationData]);

  return (
    <div className={`application-processing-ai ${className} ${isRTLMode ? 'rtl' : 'ltr'}`}>
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {getTranslation('ai.admission.applicationProcessing', 'Application Processing AI')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {getTranslation('ai.admission.applicationProcessingDesc', 'AI-powered application review and processing')}
            </p>
          </div>
          <button
            onClick={handleProcessApplication}
            disabled={isProcessing || !applicationData}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                {getTranslation('common.processing', 'Processing...')}
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {getTranslation('ai.admission.processApplication', 'Process Application')}
              </>
            )}
          </button>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-red-700">{error}</span>
          </div>
        </div>
      )}

      {/* Processing Result */}
      {processingResult && (
        <div className="space-y-6">
          {/* Summary */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              {getTranslation('ai.admission.processingSummary', 'Processing Summary')}
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              {processingResult.summary || getTranslation('ai.admission.noSummary', 'No summary available')}
            </p>
          </div>

          {/* Document Verification */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {getTranslation('ai.admission.documentVerification', 'Document Verification')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {getTranslation('ai.admission.completeness', 'Completeness')}
                  </span>
                  <span className={`text-sm font-semibold ${getCompletenessColor(processingResult.documentVerification?.completeness || 0)}`}>
                    {processingResult.documentVerification?.completeness || 0}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${processingResult.documentVerification?.completeness || 0}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {getTranslation('ai.admission.authenticity', 'Authenticity')}
                </span>
                <span className="ml-2 text-sm font-semibold text-green-600">
                  {processingResult.documentVerification?.authenticity || 'Unknown'}
                </span>
              </div>
            </div>
            
            {/* Missing Documents */}
            {processingResult.documentVerification?.missingDocuments?.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                  {getTranslation('ai.admission.missingDocuments', 'Missing Documents')}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {processingResult.documentVerification.missingDocuments.map((doc, index) => (
                    <span key={index} className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                      {doc}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Recommendations */}
            {processingResult.documentVerification?.recommendations?.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                  {getTranslation('ai.admission.recommendations', 'Recommendations')}
                </h4>
                <ul className="space-y-1">
                  {processingResult.documentVerification.recommendations.map((rec, index) => (
                    <li key={index} className="text-sm text-gray-700 dark:text-gray-300 flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Eligibility Assessment */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {getTranslation('ai.admission.eligibilityAssessment', 'Eligibility Assessment')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center">
                <div className={`w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center ${
                  processingResult.eligibilityAssessment?.academicEligibility ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  <svg className={`w-6 h-6 ${processingResult.eligibilityAssessment?.academicEligibility ? 'text-green-600' : 'text-red-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {getTranslation('ai.admission.academic', 'Academic')}
                </p>
              </div>
              <div className="text-center">
                <div className={`w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center ${
                  processingResult.eligibilityAssessment?.languageProficiency ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  <svg className={`w-6 h-6 ${processingResult.eligibilityAssessment?.languageProficiency ? 'text-green-600' : 'text-red-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {getTranslation('ai.admission.language', 'Language')}
                </p>
              </div>
              <div className="text-center">
                <div className={`w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center ${
                  processingResult.eligibilityAssessment?.financialEligibility ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  <svg className={`w-6 h-6 ${processingResult.eligibilityAssessment?.financialEligibility ? 'text-green-600' : 'text-red-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {getTranslation('ai.admission.financial', 'Financial')}
                </p>
              </div>
              <div className="text-center">
                <div className={`w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center ${
                  processingResult.eligibilityAssessment?.overallEligible ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  <svg className={`w-6 h-6 ${processingResult.eligibilityAssessment?.overallEligible ? 'text-green-600' : 'text-red-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {getTranslation('ai.admission.overall', 'Overall')}
                </p>
              </div>
            </div>

            {/* Issues */}
            {processingResult.eligibilityAssessment?.issues?.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                  {getTranslation('ai.admission.issues', 'Issues')}
                </h4>
                <ul className="space-y-1">
                  {processingResult.eligibilityAssessment.issues.map((issue, index) => (
                    <li key={index} className="text-sm text-red-600 flex items-start">
                      <span className="text-red-500 mr-2">•</span>
                      {issue}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Priority Scoring */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {getTranslation('ai.admission.priorityScoring', 'Priority Scoring')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  {processingResult.priorityScoring?.overallScore || 0}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {getTranslation('ai.admission.overallScore', 'Overall Score')}
                </p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">
                  {processingResult.priorityScoring?.academicScore || 0}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {getTranslation('ai.admission.academicScore', 'Academic Score')}
                </p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 mb-1">
                  {processingResult.priorityScoring?.profileScore || 0}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {getTranslation('ai.admission.profileScore', 'Profile Score')}
                </p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600 mb-1">
                  {processingResult.priorityScoring?.urgencyScore || 0}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {getTranslation('ai.admission.urgencyScore', 'Urgency Score')}
                </p>
              </div>
            </div>
            <div className="mt-4 text-center">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white ${getPriorityColor(processingResult.priorityScoring?.priority)}`}>
                {processingResult.priorityScoring?.priority || 'Unknown'} Priority
              </span>
            </div>
          </div>

          {/* Risk Assessment */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {getTranslation('ai.admission.riskAssessment', 'Risk Assessment')}
            </h3>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {getTranslation('ai.admission.riskLevel', 'Risk Level')}
              </span>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white ${getRiskColor(processingResult.riskAssessment?.riskLevel)}`}>
                {processingResult.riskAssessment?.riskLevel || 'Unknown'}
              </span>
            </div>
            
            {/* Risks */}
            {processingResult.riskAssessment?.risks?.length > 0 && (
              <div className="space-y-3">
                {processingResult.riskAssessment.risks.map((risk, index) => (
                  <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {risk.type || 'Unknown Risk'}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {risk.description || 'No description available'}
                        </p>
                        <p className="text-sm text-blue-600 mt-2">
                          <strong>{getTranslation('ai.admission.mitigation', 'Mitigation')}:</strong> {risk.mitigation || 'No mitigation available'}
                        </p>
                      </div>
                      <span className={`ml-4 px-2 py-1 rounded-full text-xs font-medium ${
                        risk.severity === 'High' ? 'bg-red-100 text-red-800' :
                        risk.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {risk.severity || 'Unknown'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Next Steps */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {getTranslation('ai.admission.nextSteps', 'Next Steps')}
            </h3>
            <div className="space-y-3">
              {processingResult.nextSteps?.map((step, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium mr-3">
                    {index + 1}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Processing Info */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-600 dark:text-gray-400">
                  {getTranslation('ai.admission.processingTime', 'Processing Time')}:
                </span>
                <span className="ml-2 text-gray-900 dark:text-white">
                  {processingResult.processingTime || 'Unknown'}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-600 dark:text-gray-400">
                  {getTranslation('ai.admission.assignedTo', 'Assigned To')}:
                </span>
                <span className="ml-2 text-gray-900 dark:text-white">
                  {processingResult.assignedTo || 'Unknown'}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-600 dark:text-gray-400">
                  {getTranslation('ai.admission.dataSource', 'Data Source')}:
                </span>
                <span className="ml-2 text-gray-900 dark:text-white">
                  {processingResult.dataSource || 'Unknown'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Processing History */}
      {showHistory && processingHistory.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {getTranslation('ai.admission.processingHistory', 'Processing History')}
          </h3>
          <div className="space-y-3">
            {processingHistory.slice(0, 5).map((item) => (
              <div key={item.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {item.result.summary || 'Processing completed'}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(item.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    item.result.priorityScoring?.priority === 'High' ? 'bg-red-100 text-red-800' :
                    item.result.priorityScoring?.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {item.result.priorityScoring?.priority || 'Unknown'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationProcessingAI;