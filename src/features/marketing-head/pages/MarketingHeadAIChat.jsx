import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalization } from '../../../hooks/useLocalization';
import ChatLayout from '../../../components/ai-chat/ChatLayout';

const MarketingHeadAIChat = () => {
  const { t } = useTranslation();
  const { isRTLMode } = useLocalization();
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Marketing-specific quick actions
  const marketingQuickActions = [
    {
      id: 'campaign-strategy',
      title: t('ai.marketing.campaignStrategy'),
      icon: '🎯',
      prompt: 'Help me create a comprehensive marketing campaign strategy for student enrollment with target demographics and channels.'
    },
    {
      id: 'lead-analysis',
      title: t('ai.marketing.leadAnalysis'),
      icon: '📈',
      prompt: 'Analyze our current lead generation performance and suggest optimization strategies for better conversion rates.'
    },
    {
      id: 'content-ideas',
      title: t('ai.marketing.contentIdeas'),
      icon: '✍️',
      prompt: 'Generate content ideas for our social media platforms and marketing materials for the upcoming semester.'
    },
    {
      id: 'competitor-analysis',
      title: t('ai.marketing.competitorAnalysis'),
      icon: '🔍',
      prompt: 'Conduct a competitor analysis and identify opportunities for competitive advantage in our market.'
    },
    {
      id: 'budget-allocation',
      title: t('ai.marketing.budgetAllocation'),
      icon: '💰',
      prompt: 'Help me optimize our marketing budget allocation across different channels and campaigns for maximum ROI.'
    },
    {
      id: 'event-planning',
      title: t('ai.marketing.eventPlanning'),
      icon: '🎪',
      prompt: 'Plan a marketing event strategy including open houses, webinars, and campus tours to attract prospective students.'
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
      const aiResponse = generateMarketingResponse(message);
      setChatHistory(prev => [...prev, {
        sender: 'ai',
        content: aiResponse,
        timestamp: new Date().toLocaleTimeString()
      }]);
      setIsLoading(false);
    }, 1500);
  };

  const generateMarketingResponse = (message) => {
    // Simple response generation (replace with actual AI)
    const responses = [
      "Based on current marketing trends and your target audience, I recommend focusing on these key strategies...",
      "Your campaign performance data suggests these optimization opportunities for better lead generation...",
      "Here's a comprehensive marketing plan that aligns with your enrollment goals and budget constraints...",
      "I've analyzed the competition and identified these unique positioning opportunities for your institution..."
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
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {t('ai.marketing.quickActions')}
        </h3>
        
        <div className="space-y-3">
          {marketingQuickActions.map((action) => (
            <button
              key={action.id}
              onClick={() => handleQuickAction(action)}
              className="w-full p-3 text-left bg-gray-50 dark:bg-gray-700 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-lg transition-all duration-200 hover:scale-[1.02] border border-gray-200 dark:border-gray-600"
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
            
            <button className="w-full p-3 bg-green-100 dark:bg-green-900/30 hover:bg-green-200 dark:hover:bg-green-900/50 rounded-lg transition-colors text-green-900 dark:text-green-100">
              <div className="flex items-center gap-2">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
                </svg>
                <span className="text-sm font-medium">{t('ai.marketing.analytics')}</span>
              </div>
            </button>
            
            <button className="w-full p-3 bg-purple-100 dark:bg-purple-900/30 hover:bg-purple-200 dark:hover:bg-purple-900/50 rounded-lg transition-colors text-purple-900 dark:text-purple-100">
              <div className="flex items-center gap-2">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 6L9 17l-5-5"/>
                </svg>
                <span className="text-sm font-medium">{t('ai.marketing.leads')}</span>
              </div>
            </button>
            
            <button className="w-full p-3 bg-pink-100 dark:bg-pink-900/30 hover:bg-pink-200 dark:hover:bg-pink-900/50 rounded-lg transition-colors text-pink-900 dark:text-pink-100">
              <div className="flex items-center gap-2">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 19c1.1 0 2-.9 2-2v-5h2v5c0 1.1.9 2 2 2h3v-7l-4-4-4 4v7h1z"/>
                </svg>
                <span className="text-sm font-medium">{t('ai.marketing.social')}</span>
              </div>
            </button>
          </div>
        </div>

        {/* Campaign Performance */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {t('ai.marketing.performance')}
          </h3>
          
          <div className="space-y-3">
            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-green-900 dark:text-green-100">Spring Enrollment</span>
                <span className="text-xs text-green-600 dark:text-green-400">+15%</span>
              </div>
              <div className="w-full bg-green-200 dark:bg-green-800 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{width: '75%'}}></div>
              </div>
            </div>
            
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-blue-900 dark:text-blue-100">Digital Campaigns</span>
                <span className="text-xs text-blue-600 dark:text-blue-400">+8%</span>
              </div>
              <div className="w-full bg-blue-200 dark:bg-blue-800 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{width: '60%'}}></div>
              </div>
            </div>
            
            <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-orange-900 dark:text-orange-100">Events & Tours</span>
                <span className="text-xs text-orange-600 dark:text-orange-400">+22%</span>
              </div>
              <div className="w-full bg-orange-200 dark:bg-orange-800 rounded-full h-2">
                <div className="bg-orange-500 h-2 rounded-full" style={{width: '85%'}}></div>
              </div>
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
              <p className="text-sm text-gray-900 dark:text-white font-medium mb-1">Campaign Optimization</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">1 hour ago</p>
            </div>
            <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <p className="text-sm text-gray-900 dark:text-white font-medium mb-1">Content Strategy</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Yesterday</p>
            </div>
            <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <p className="text-sm text-gray-900 dark:text-white font-medium mb-1">Lead Generation</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">2 days ago</p>
            </div>
          </div>
        </div>
      </div>
    </ChatLayout>
  );
};

export default MarketingHeadAIChat; 