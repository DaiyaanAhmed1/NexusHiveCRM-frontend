import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalization } from '../../../../hooks/useLocalization';
import MarketingAISearch from '../components/MarketingAISearch';
import enTranslations from '../../locals/en.json';
import arTranslations from '../../locals/ar.json';

import MarketingLeadRanking from '../components/MarketingLeadRanking';
import ReplySuggestionsModal from '../../shared/components/ReplySuggestionsModal';
import ConfirmationModal from '../../shared/components/ConfirmationModal';
import MarketingEmailTemplates from '../components/MarketingEmailTemplates';
import EmailConfirmationModal from '../../shared/components/EmailConfirmationModal';
// Add this import after line 9
import MarketingCampaignPrediction from '../components/MarketingCampaignPrediction';
import MarketingLeadBehaviorAnalysis from '../components/MarketingLeadBehaviorAnalysis';

const MarketingHeadEnhanced = () => {
  const { t } = useTranslation();
  const { isRTLMode } = useLocalization();
  const [searchResults, setSearchResults] = useState(null);
  const [showAIFeatures, setShowAIFeatures] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [sentMessage, setSentMessage] = useState('');
  const [leadRankings, setLeadRankings] = useState(null);
  const [showEmailTemplates, setShowEmailTemplates] = useState(false);
  const [showEmailConfirmation, setShowEmailConfirmation] = useState(false);
  const [sentEmail, setSentEmail] = useState(null);
 // Add this state after line 24 (after sentEmail state)
const [campaignPredictions, setCampaignPredictions] = useState([]); 
const [behaviorAnalysis, setBehaviorAnalysis] = useState(null);

  // Get translations based on current language
  const getTranslations = () => {
    return isRTLMode ? arTranslations : enTranslations;
  };

  // Helper function to get translation
  const getTranslation = (key, fallback) => {
    const translations = getTranslations();
    const keys = key.split('.');
    let value = translations;
    
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) break;
    }
    
    return value || fallback;
  };

  // Handle search results
  const handleSearchResults = (results) => {
    setSearchResults(results);
  };

  // Handle lead selection - open modal
  const handleSelectLead = (lead) => {
    setSelectedLead(lead);
    setShowReplyModal(true);
  };

  // Handle send message
  const handleSendMessage = (message) => {
    console.log('Sending message:', message);
    
    // Set the sent message and show confirmation
    setSentMessage(message);
    setShowConfirmation(true);
    
    // Close the reply modal
    setShowReplyModal(false);
    
    // Here you would integrate with your actual messaging system
    // For now, we'll just show the confirmation
  };

  // Handle lead ranking completion
  const handleRankingComplete = (rankings) => {
    setLeadRankings(rankings);
    console.log('Lead rankings updated:', rankings);
  };
// Handle behavior analysis completion
const handleBehaviorAnalysisComplete = (analysis) => {
  setBehaviorAnalysis(analysis);
  console.log('Behavior analysis completed:', analysis);
};
  // Handle email sent
  const handleEmailSent = (email) => {
    console.log('Email sent:', email);
    setSentEmail(email);
    setShowEmailConfirmation(true);
  };

  // Handle close email confirmation
  const handleCloseEmailConfirmation = () => {
    setShowEmailConfirmation(false);
    setSentEmail(null);
  };
// Add this handler after line 69 (after handleCloseEmailConfirmation)
// Handle campaign prediction completion
const handleCampaignPredictionComplete = (prediction) => {
  setCampaignPredictions(prev => [prediction, ...prev]);
  console.log('Campaign prediction completed:', prediction);
};

  // Close reply modal
  const handleCloseReplyModal = () => {
    setShowReplyModal(false);
    setSelectedLead(null);
  };

  // Close confirmation modal
  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
    setSentMessage('');
    setSelectedLead(null);
  };

  return (
    <div className="marketing-dashboard-enhanced min-h-screen bg-gray-50 dark:bg-gray-900" dir={isRTLMode ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Marketing Dashboard
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              AI-Enhanced Lead Management
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
                AI Features
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* AI Search Section */}
        {showAIFeatures && (
          <div className="mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <circle cx="6" cy="6" r="2" />
                    <circle cx="18" cy="6" r="2" />
                    <circle cx="6" cy="18" r="2" />
                    <circle cx="18" cy="18" r="2" />
                    <rect x="10" y="10" width="4" height="4" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    AI-Powered Search
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    Search leads, campaigns, and communications with natural language
                  </p>
                </div>
              </div>
              
              <MarketingAISearch 
                onSearchResults={handleSearchResults} 
                onSelectLead={handleSelectLead}
              />
            </div>
          </div>
        )}

        {/* AI Lead Ranking Section */}
        {showAIFeatures && (
          <div className="mb-8">
            <MarketingLeadRanking onRankingComplete={handleRankingComplete} />
          </div>
        )}

        {/* AI Email Templates Section */}
        {showAIFeatures && (
          <div className="mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Smart Email Templates
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    Generate personalized emails for leads
                  </p>
                </div>
              </div>
              
              <MarketingEmailTemplates onEmailSent={handleEmailSent} />
            </div>
          </div>
        )}
{/* // Add this section after line 187 (after AI Email Templates section, before AI Insights Panel) */}
{/* AI Campaign Prediction Section */}
{showAIFeatures && (
  <div className="mb-8">
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Campaign Performance Prediction
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            AI-powered campaign success forecasting
          </p>
        </div>
      </div>
      
      <MarketingCampaignPrediction onPredictionComplete={handleCampaignPredictionComplete} />
    </div>
  </div>
)}   
{/* // Add this section after the Campaign Performance Prediction section (around line 200) */}
{/* Lead Behavior Analysis Section */}
{showAIFeatures && (
  <div className="mb-8">
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {getTranslation('ai.behaviorAnalysis.title', 'Lead Behavior Analysis')}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            {getTranslation('ai.behaviorAnalysis.subtitle', 'AI-powered behavior insights and engagement tracking')}
          </p>
        </div>
      </div>
      <MarketingLeadBehaviorAnalysis
        onAnalysisComplete={handleBehaviorAnalysisComplete}
      />
    </div>
  </div>
)}     
        {/* AI Insights Panel */}
        {showAIFeatures && (
          <div className="mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    AI Insights
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    Smart recommendations and analytics
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                        {leadRankings ? leadRankings.filter(l => l.probability === 'High').length : 0}
                      </div>
                      <div className="text-sm text-blue-700 dark:text-blue-300">High-Priority Leads</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-900 dark:text-green-100">
                        {leadRankings ? leadRankings.filter(l => l.probability === 'Medium').length : 0}
                      </div>
                      <div className="text-sm text-green-700 dark:text-green-300">Medium-Priority Leads</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                        {leadRankings ? Math.round(leadRankings.reduce((acc, lead) => acc + lead.score, 0) / leadRankings.length) : 0}%
                      </div>
                      <div className="text-sm text-purple-700 dark:text-purple-300">Average Score</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Quick Actions
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <button className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-gray-900 dark:text-white">View Leads</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Manage prospects</div>
                  </div>
                </div>
              </button>
              
              <button className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-gray-900 dark:text-white">Create Campaign</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">New marketing campaign</div>
                  </div>
                </div>
              </button>
              
              {showAIFeatures && (
                <>
                  <button className="p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors">
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
                        <div className="font-medium text-gray-900 dark:text-white">AI Lead Ranking</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Prioritize prospects</div>
                      </div>
                    </div>
                  </button>
                  
                  <button className="p-4 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="text-left">
                        <div className="font-medium text-gray-900 dark:text-white">Smart Email</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">AI reply suggestions</div>
                      </div>
                    </div>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Search Results Summary */}
        {searchResults && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Search Summary
            </h2>
            <div className="text-gray-600 dark:text-gray-300">
              <p>Query: <span className="font-medium">"{searchResults.query}"</span></p>
              <p>Results: <span className="font-medium">{searchResults.results?.length || 0} leads found</span></p>
              {searchResults.aiExplanation && (
                <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    <strong>AI Analysis:</strong> {searchResults.aiExplanation}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Reply Suggestions Modal */}
      <ReplySuggestionsModal
        isOpen={showReplyModal}
        onClose={handleCloseReplyModal}
        lead={selectedLead}
        onSendMessage={handleSendMessage}
      />

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showConfirmation}
        onClose={handleCloseConfirmation}
        lead={selectedLead}
        message={sentMessage}
        type="success"
      />
      
      {/* Email Confirmation Modal */}
      <EmailConfirmationModal
        isOpen={showEmailConfirmation}
        onClose={handleCloseEmailConfirmation}
        email={sentEmail}
        type="success"
      />
    </div>
  );
};

export default MarketingHeadEnhanced;