import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalization } from '../../../hooks/useLocalization';
import ChatLayout from '../../../components/ai-chat/ChatLayout';

const DirectorAIChat = () => {
  const { t } = useTranslation();
  const { isRTLMode } = useLocalization();
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Director-specific quick actions
  const directorQuickActions = [
    {
      id: 'strategic-analysis',
      title: t('ai.director.strategicAnalysis'),
      icon: '📊',
      prompt: 'Provide a strategic analysis of our current performance metrics and suggest improvements for the next quarter.'
    },
    {
      id: 'department-overview',
      title: t('ai.director.departmentOverview'),
      icon: '🏢',
      prompt: 'Give me an overview of all department performances and highlight areas that need attention.'
    },
    {
      id: 'budget-planning',
      title: t('ai.director.budgetPlanning'),
      icon: '💰',
      prompt: 'Help me create a budget allocation plan for the upcoming fiscal year across all departments.'
    },
    {
      id: 'risk-assessment',
      title: t('ai.director.riskAssessment'),
      icon: '⚠️',
      prompt: 'Conduct a risk assessment for our current operations and suggest mitigation strategies.'
    },
    {
      id: 'compliance-check',
      title: t('ai.director.complianceCheck'),
      icon: '✅',
      prompt: 'Review our compliance status across all regulatory requirements and highlight any gaps.'
    },
    {
      id: 'meeting-prep',
      title: t('ai.director.meetingPrep'),
      icon: '📅',
      prompt: 'Help me prepare for the upcoming board meeting with key talking points and data summaries.'
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
      const aiResponse = generateDirectorResponse(message);
      setChatHistory(prev => [...prev, {
        sender: 'ai',
        content: aiResponse,
        timestamp: new Date().toLocaleTimeString()
      }]);
      setIsLoading(false);
    }, 1500);
  };

  const generateDirectorResponse = (message) => {
    // Simple response generation (replace with actual AI)
    const responses = [
      "As your AI assistant, I've analyzed the data and here are my recommendations for director-level decision making...",
      "Based on current institutional metrics, I suggest focusing on these strategic priorities...",
      "From a leadership perspective, here's what the data tells us about departmental performance...",
      "I've reviewed the compliance requirements and budget allocations. Here's my executive summary..."
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
      roleName={t('roles.director')}
      roleColor="blue"
      chatHistory={chatHistory}
      onSendMessage={handleSendMessage}
      onNewChat={handleNewChat}
      onAttach={handleAttach}
      isLoading={isLoading}
    >
      {/* Director-specific sidebar */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {t('ai.director.quickActions')}
        </h3>
        
        <div className="space-y-3">
          {directorQuickActions.map((action) => (
            <button
              key={action.id}
              onClick={() => handleQuickAction(action)}
              className="w-full p-3 text-left bg-gray-50 dark:bg-gray-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200 hover:scale-[1.02] border border-gray-200 dark:border-gray-600"
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

        {/* Director Tools */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {t('ai.director.tools')}
          </h3>
          
          <div className="space-y-2">
            <button className="w-full p-3 bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/50 rounded-lg transition-colors text-blue-900 dark:text-blue-100">
              <div className="flex items-center gap-2">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
                </svg>
                <span className="text-sm font-medium">{t('ai.director.dashboard')}</span>
              </div>
            </button>
            
            <button className="w-full p-3 bg-green-100 dark:bg-green-900/30 hover:bg-green-200 dark:hover:bg-green-900/50 rounded-lg transition-colors text-green-900 dark:text-green-100">
              <div className="flex items-center gap-2">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <span className="text-sm font-medium">{t('ai.director.reports')}</span>
              </div>
            </button>
            
            <button className="w-full p-3 bg-purple-100 dark:bg-purple-900/30 hover:bg-purple-200 dark:hover:bg-purple-900/50 rounded-lg transition-colors text-purple-900 dark:text-purple-100">
              <div className="flex items-center gap-2">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17 3H5c-1.11 0-2 .89-2 2v14c0 1.11.89 2 2 2h14c1.11 0 2-.89 2-2V7l-4-4z"/>
                </svg>
                <span className="text-sm font-medium">{t('ai.director.analytics')}</span>
              </div>
            </button>
          </div>
        </div>

        {/* Recent Chats */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {t('ai.recentChats')}
          </h3>
          
          <div className="space-y-2">
            <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <p className="text-sm text-gray-900 dark:text-white font-medium mb-1">Strategic Planning Q4</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">2 hours ago</p>
            </div>
            <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <p className="text-sm text-gray-900 dark:text-white font-medium mb-1">Budget Review</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Yesterday</p>
            </div>
            <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <p className="text-sm text-gray-900 dark:text-white font-medium mb-1">Department Analysis</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">3 days ago</p>
            </div>
          </div>
        </div>
      </div>
    </ChatLayout>
  );
};

export default DirectorAIChat; 