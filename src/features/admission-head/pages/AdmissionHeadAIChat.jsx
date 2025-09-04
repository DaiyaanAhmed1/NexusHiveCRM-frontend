import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalization } from '../../../hooks/useLocalization';
import ChatLayout from '../../../components/ai-chat/ChatLayout';

const AdmissionHeadAIChat = () => {
  const { t } = useTranslation();
  const { isRTLMode } = useLocalization();
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Admission-specific quick actions
  const admissionQuickActions = [
    {
      id: 'application-review',
      title: t('ai.admission.applicationReview'),
      icon: '📋',
      prompt: 'Help me review and prioritize pending applications based on admission criteria and deadlines.'
    },
    {
      id: 'enrollment-forecast',
      title: t('ai.admission.enrollmentForecast'),
      icon: '📊',
      prompt: 'Generate an enrollment forecast for the upcoming semester based on current application trends and historical data.'
    },
    {
      id: 'document-verification',
      title: t('ai.admission.documentVerification'),
      icon: '✅',
      prompt: 'Create a checklist for document verification and identify common issues in application submissions.'
    },
    {
      id: 'waitlist-management',
      title: t('ai.admission.waitlistManagement'),
      icon: '⏳',
      prompt: 'Help me manage the waitlist efficiently and create communication strategies for waitlisted students.'
    },
    {
      id: 'scholarship-allocation',
      title: t('ai.admission.scholarshipAllocation'),
      icon: '🎓',
      prompt: 'Analyze scholarship allocation strategies to maximize enrollment while staying within budget constraints.'
    },
    {
      id: 'compliance-check',
      title: t('ai.admission.complianceCheck'),
      icon: '⚖️',
      prompt: 'Review our admission processes for regulatory compliance and suggest improvements.'
    }
  ];

  const handleSendMessage = async (message) => {
    const timestamp = new Date().toLocaleTimeString();
    
    // Add user message
    setChatHistory(prev => [...prev, {
      sender: 'user',
      content: message,
      timestamp
    }]);

    setIsLoading(true);

    // Simulate AI response (replace with actual AI integration)
    setTimeout(() => {
      const aiResponse = generateAdmissionResponse(message);
      setChatHistory(prev => [...prev, {
        sender: 'ai',
        content: aiResponse,
        timestamp: new Date().toLocaleTimeString()
      }]);
      setIsLoading(false);
    }, 1500);
  };

  const generateAdmissionResponse = (message) => {
    // Simple response generation (replace with actual AI)
    const responses = [
      "Based on admission trends and application data, here are my recommendations for optimizing your enrollment process...",
      "I've analyzed the current applications and here's a prioritized action plan for your admission pipeline...",
      "Your enrollment metrics suggest these strategic adjustments for better conversion rates and student quality...",
      "From a compliance perspective, here are the key areas that need attention in your admission process..."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleNewChat = () => {
    setChatHistory([]);
  };

  const handleAttach = (type) => {
    console.log('Attach type:', type);
    // Handle file attachment
  };

  const handleQuickAction = (action) => {
    handleSendMessage(action.prompt);
  };

  return (
    <ChatLayout
      roleName={t('roles.admissionHead')}
      roleColor="green"
      chatHistory={chatHistory}
      onSendMessage={handleSendMessage}
      onNewChat={handleNewChat}
      onAttach={handleAttach}
      isLoading={isLoading}
    >
      {/* Admission-specific sidebar */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {t('ai.admission.quickActions')}
        </h3>
        
        <div className="space-y-3">
          {admissionQuickActions.map((action) => (
            <button
              key={action.id}
              onClick={() => handleQuickAction(action)}
              className="w-full p-3 text-left bg-gray-50 dark:bg-gray-700 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-all duration-200 hover:scale-[1.02] border border-gray-200 dark:border-gray-600"
            >
              <div className="flex items-start gap-3">
                <span className="text-xl">{action.icon}</span>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 dark:text-white text-sm mb-1">
                    {action.title}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                    {action.prompt.substring(0, 60)}...
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Admission Tools */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {t('ai.admission.tools')}
          </h3>
          
          <div className="space-y-2">
            <button className="w-full p-3 bg-green-100 dark:bg-green-900/30 hover:bg-green-200 dark:hover:bg-green-900/50 rounded-lg transition-colors text-green-900 dark:text-green-100">
              <div className="flex items-center gap-2">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17 3H5c-1.11 0-2 .89-2 2v14c0 1.11.89 2 2 2h14c1.11 0 2-.89 2-2V7l-4-4z"/>
                </svg>
                <span className="text-sm font-medium">{t('ai.admission.applications')}</span>
              </div>
            </button>
            
            <button className="w-full p-3 bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/50 rounded-lg transition-colors text-blue-900 dark:text-blue-100">
              <div className="flex items-center gap-2">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
                </svg>
                <span className="text-sm font-medium">{t('ai.admission.analytics')}</span>
              </div>
            </button>
            
            <button className="w-full p-3 bg-purple-100 dark:bg-purple-900/30 hover:bg-purple-200 dark:hover:bg-purple-900/50 rounded-lg transition-colors text-purple-900 dark:text-purple-100">
              <div className="flex items-center gap-2">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4"/>
                </svg>
                <span className="text-sm font-medium">{t('ai.admission.verification')}</span>
              </div>
            </button>
            
            <button className="w-full p-3 bg-yellow-100 dark:bg-yellow-900/30 hover:bg-yellow-200 dark:hover:bg-yellow-900/50 rounded-lg transition-colors text-yellow-900 dark:text-yellow-100">
              <div className="flex items-center gap-2">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <span className="text-sm font-medium">{t('ai.admission.scholarships')}</span>
              </div>
            </button>
          </div>
        </div>

        {/* Application Status */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {t('ai.admission.status')}
          </h3>
          
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-blue-900 dark:text-blue-100">Pending Review</span>
                <span className="text-xs bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full">142</span>
              </div>
              <p className="text-xs text-blue-600 dark:text-blue-400">Applications awaiting review</p>
            </div>
            
            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-green-900 dark:text-green-100">Approved</span>
                <span className="text-xs bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 px-2 py-1 rounded-full">89</span>
              </div>
              <p className="text-xs text-green-600 dark:text-green-400">Ready for enrollment</p>
            </div>
            
            <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-yellow-900 dark:text-yellow-100">Waitlisted</span>
                <span className="text-xs bg-yellow-100 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded-full">34</span>
              </div>
              <p className="text-xs text-yellow-600 dark:text-yellow-400">Awaiting seat availability</p>
            </div>
            
            <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-red-900 dark:text-red-100">Incomplete</span>
                <span className="text-xs bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-200 px-2 py-1 rounded-full">27</span>
              </div>
              <p className="text-xs text-red-600 dark:text-red-400">Missing documents</p>
            </div>
          </div>
        </div>

        {/* Recent Chats */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {t('ai.recentChats')}
          </h3>
          
          <div className="space-y-2">
            <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <p className="text-sm text-gray-900 dark:text-white font-medium mb-1">Application Analysis</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">30 minutes ago</p>
            </div>
            <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <p className="text-sm text-gray-900 dark:text-white font-medium mb-1">Scholarship Review</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">2 hours ago</p>
            </div>
            <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <p className="text-sm text-gray-900 dark:text-white font-medium mb-1">Enrollment Forecast</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Yesterday</p>
            </div>
          </div>
        </div>
      </div>
    </ChatLayout>
  );
};

export default AdmissionHeadAIChat; 