import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalization } from '../../../hooks/useLocalization';
import ChatLayout from '../../../components/ai-chat/ChatLayout';
import aiService from '../../../services/aiService';

const MarketingHeadAIChat = () => {
  const { t } = useTranslation();
  const { isRTLMode } = useLocalization();
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [apiStatus, setApiStatus] = useState(null);

  // Check API configuration on component mount
  useEffect(() => {
    const configStatus = aiService.getConfigStatus();
    setApiStatus(configStatus);
  }, []);

  // Marketing-specific quick actions
  const marketingQuickActions = [
    {
      id: 'campaign-strategy',
      title: t('ai.marketing.campaignStrategy'),
      icon: '🎯',
      prompt: 'Help me develop a comprehensive marketing campaign strategy for the upcoming enrollment period.'
    },
    {
      id: 'lead-analysis',
      title: t('ai.marketing.leadAnalysis'),
      icon: '📈',
      prompt: 'Analyze our current lead generation performance and suggest optimization strategies.'
    },
    {
      id: 'content-ideas',
      title: t('ai.marketing.contentIdeas'),
      icon: '✍️',
      prompt: 'Generate creative content ideas for our social media and digital marketing campaigns.'
    },
    {
      id: 'competitor-analysis',
      title: t('ai.marketing.competitorAnalysis'),
      icon: '🔍',
      prompt: 'Conduct a competitive analysis of other universities in our market and identify opportunities.'
    },
    {
      id: 'budget-allocation',
      title: t('ai.marketing.budgetAllocation'),
      icon: '💰',
      prompt: 'Help me optimize our marketing budget allocation across different channels and campaigns.'
    },
    {
      id: 'event-planning',
      title: t('ai.marketing.eventPlanning'),
      icon: '📅',
      prompt: 'Plan and coordinate marketing events for student recruitment and brand awareness.'
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
    setError(null);

    try {
      // Check if API is configured
      if (!aiService.isAPIConfigured()) {
        throw new Error('OpenRoute API key not configured. Please set VITE_OPENROUTE_API_KEY in your .env file.');
      }

      // Convert chat history to API format
      const apiChatHistory = chatHistory.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.content
      }));

      // Generate AI response
      const response = await aiService.generateResponse(message, 'marketing-head', apiChatHistory);
      
      // Add AI response to chat history
      setChatHistory(prev => [...prev, {
        sender: 'ai',
        content: response.content,
        timestamp: new Date().toLocaleTimeString(),
        usage: response.usage,
        model: response.model
      }]);

    } catch (error) {
      console.error('Error generating AI response:', error);
      setError(error.message);
      
      // Add error message to chat
      setChatHistory(prev => [...prev, {
        sender: 'ai',
        content: `Sorry, I encountered an error: ${error.message}. Please check your API configuration and try again.`,
        timestamp: new Date().toLocaleTimeString(),
        isError: true
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewChat = () => {
    setChatHistory([]);
    setError(null);
  };

  const handleAttach = (type) => {
    console.log('Attach type:', type);
    // Handle file attachment - TODO: Implement file upload
  };

  const handleQuickAction = (action) => {
    handleSendMessage(action.prompt);
  };

  return (
    <ChatLayout
      roleName={t('roles.marketingHead')}
      roleColor="orange"
      chatHistory={chatHistory}
      onSendMessage={handleSendMessage}
      onNewChat={handleNewChat}
      onAttach={handleAttach}
      isLoading={isLoading}
    >
      {/* Marketing-specific sidebar */}
      <div className="p-6">
        {/* API Status */}
        {apiStatus && (
          <div className="mb-6 p-3 rounded-lg border">
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-2 h-2 rounded-full ${apiStatus.configured ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {apiStatus.configured ? 'API Connected' : 'API Not Configured'}
              </span>
            </div>
            {apiStatus.configured && (
              <div className="text-xs text-gray-500 dark:text-gray-400">
                <div>Model: Sage AI</div>
                <div>Streaming: {apiStatus.streaming ? 'Enabled' : 'Disabled'}</div>
              </div>
            )}
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <div className="text-sm text-red-800 dark:text-red-200">
              <strong>Error:</strong> {error}
            </div>
          </div>
        )}

        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {t('ai.marketing.quickActions')}
        </h3>
        
        <div className="space-y-3">
          {marketingQuickActions.map((action) => (
            <button
              key={action.id}
              onClick={() => handleQuickAction(action)}
              disabled={isLoading || !apiStatus?.configured}
              className="w-full p-3 text-left bg-gray-50 dark:bg-gray-700 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-lg transition-all duration-200 hover:scale-[1.02] border border-gray-200 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
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

        {/* Marketing Tools */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {t('ai.marketing.tools')}
          </h3>
          
          <div className="space-y-2">
            <button className="w-full p-3 bg-orange-100 dark:bg-orange-900/30 hover:bg-orange-200 dark:hover:bg-orange-900/50 rounded-lg transition-colors text-orange-900 dark:text-orange-100">
              <div className="flex items-center gap-2">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <span className="text-sm font-medium">{t('ai.marketing.campaigns')}</span>
              </div>
            </button>
            
            <button className="w-full p-3 bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/50 rounded-lg transition-colors text-blue-900 dark:text-blue-100">
              <div className="flex items-center gap-2">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
                </svg>
                <span className="text-sm font-medium">{t('ai.marketing.analytics')}</span>
              </div>
            </button>
            
            <button className="w-full p-3 bg-green-100 dark:bg-green-900/30 hover:bg-green-200 dark:hover:bg-green-900/50 rounded-lg transition-colors text-green-900 dark:text-green-100">
              <div className="flex items-center gap-2">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <span className="text-sm font-medium">{t('ai.marketing.leads')}</span>
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
              <p className="text-sm text-gray-900 dark:text-white font-medium mb-1">Campaign Strategy Q4</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">1 hour ago</p>
            </div>
            <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <p className="text-sm text-gray-900 dark:text-white font-medium mb-1">Lead Analysis</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Yesterday</p>
            </div>
            <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <p className="text-sm text-gray-900 dark:text-white font-medium mb-1">Content Planning</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">2 days ago</p>
            </div>
          </div>
        </div>
      </div>
    </ChatLayout>
  );
};

export default MarketingHeadAIChat;