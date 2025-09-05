import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalization } from '../../../hooks/useLocalization';
import ChatLayout from '../../../components/ai-chat/ChatLayout';
import aiService from '../../../services/aiService';
import chatHistoryService from '../../../services/chatHistoryService';
import trialService from '../../../services/trialService';

const DirectorAIChat = () => {
  const { t } = useTranslation();
  const { isRTLMode } = useLocalization();
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [apiStatus, setApiStatus] = useState(null);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [showChatHistory, setShowChatHistory] = useState(false);

  // Check API configuration on component mount
  useEffect(() => {
    const checkApiStatus = async () => {
      try {
        const status = aiService.getConfigStatus();
        setApiStatus(status);
      } catch (error) {
        console.error('Error checking API status:', error);
        setApiStatus({ configured: false });
      }
    };
    checkApiStatus();
  }, []);

  useEffect(() => {
    // Create a new chat if none exists
    if (!currentChatId) {
      const newChat = chatHistoryService.createNewChat('director');
      setCurrentChatId(newChat.id);
    }
  }, [currentChatId]);

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
    
    // Add user message to chat history
    if (currentChatId) {
      chatHistoryService.addMessage('director', currentChatId, {
        sender: 'user',
        content: message,
        timestamp
      });
    }
    
    // Add user message to local state
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
const response = await aiService.generateResponse(message, 'director', apiChatHistory);
      
      // Add AI response to chat history
      if (currentChatId) {
        chatHistoryService.addMessage('director', currentChatId, {
          sender: 'ai',
          content: response.content,
          timestamp: new Date().toLocaleTimeString(),
          usage: response.usage,
          model: response.model
        });
      }
      
      // Add AI response to local state
      setChatHistory(prev => [...prev, {
        sender: 'ai',
        content: response.content,
        timestamp: new Date().toLocaleTimeString(),
        usage: response.usage,
        model: response.model
      }]);
  
      // Update chat title if this is the first message
      if (currentChatId && chatHistory.length === 0) {
        const newTitle = generateChatTitle(message);
        chatHistoryService.updateChatTitle('director', currentChatId, newTitle);
      }
  
    } catch (error) {
      console.error('Error generating AI response:', error);
      setError(error.message);
      
      // Add error message to chat history
      if (currentChatId) {
        chatHistoryService.addMessage('director', currentChatId, {
          sender: 'ai',
          content: `Sorry, I encountered an error: ${error.message}. Please check your API configuration and try again.`,
          timestamp: new Date().toLocaleTimeString(),
          isError: true
        });
      }
      
      // Add error message to local state
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
    // Create a new chat with a better default title
    const newChat = chatHistoryService.createNewChat('director', 'New Conversation');
    setCurrentChatId(newChat.id);
  };

  const handleAttach = async (type, file = null) => {
    if (type === 'file' && file) {
      try {
        // Check trial limit
        if (!trialService.canAskQuestion()) {
          alert(t('ai.trial.limitReached'));
          return;
        }
  
        // Record the question
        trialService.recordQuestion();
        window.dispatchEvent(new CustomEvent('trialUpdated'));
  
        setIsLoading(true);
        setError(null);
  
        // Add file info to chat history
        const fileMessage = `📎 Attached file: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)}MB)`;
        setChatHistory(prev => [...prev, {
          sender: 'user',
          content: fileMessage,
          timestamp: new Date().toLocaleTimeString()
        }]);
  
        // Convert chat history to API format
        const apiChatHistory = chatHistory.map(msg => ({
          role: msg.sender === 'user' ? 'user' : 'assistant',
          content: msg.content
        }));
  
        // Generate AI response with file
        const response = await aiService.generateResponseWithFile(
          `Please analyze this file: ${file.name}`, 
          file, 
          'director', 
          apiChatHistory, 
          isRTLMode ? 'ar' : 'en'
        );
  
        // Add response to chat history
        setChatHistory(prev => [...prev, {
          sender: 'ai',
          content: response.content,
          timestamp: new Date().toLocaleTimeString(),
          usage: response.usage,
          model: response.model,
          hasAttachment: true,
          attachmentName: file.name
        }]);
  
      } catch (error) {
        console.error('Error processing file:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    } else {
      console.log('Attach type:', type);
    }
  };

  const handleQuickAction = (action) => {
    handleSendMessage(action.prompt);
  };

  const generateChatTitle = (message) => {
  // Extract key words from the message to create a meaningful title
  const words = message.toLowerCase().split(' ');
  
  // Common director-related keywords
  const keywords = {
    'strategic': 'Strategic Planning',
    'budget': 'Budget Planning',
    'department': 'Department Analysis',
    'risk': 'Risk Assessment',
    'compliance': 'Compliance Review',
    'meeting': 'Meeting Preparation',
    'performance': 'Performance Analysis',
    'quarterly': 'Quarterly Review',
    'annual': 'Annual Planning',
    'forecast': 'Forecasting',
    'analysis': 'Data Analysis',
    'report': 'Report Generation',
    'dashboard': 'Dashboard Review',
    'metrics': 'Metrics Analysis',
    'kpi': 'KPI Review',
    'financial': 'Financial Analysis',
    'operational': 'Operational Review',
    'staff': 'Staff Management',
    'training': 'Training & Development',
    'policy': 'Policy Review',
    'goals': 'Goal Setting',
    'objectives': 'Objective Planning'
  };
  
  // Find matching keywords
  for (const [key, title] of Object.entries(keywords)) {
    if (words.some(word => word.includes(key))) {
      return title;
    }
  }
  
  // If no keywords found, create title from first few words
  const firstWords = words.slice(0, 3).join(' ');
  return firstWords.charAt(0).toUpperCase() + firstWords.slice(1);
};
const handleToggleChatHistory = () => {
  setShowChatHistory(!showChatHistory);
};
const handleLoadChatHistory = (formattedMessages, chatId) => {
  setChatHistory(formattedMessages);
  setCurrentChatId(chatId);
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
  showChatHistory={showChatHistory}
  onToggleChatHistory={handleToggleChatHistory}
  onLoadChatHistory={handleLoadChatHistory}
>
      {/* Director-specific sidebar */}
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
          {t('ai.director.quickActions')}
        </h3>
        
        <div className="space-y-3">
          {directorQuickActions.map((action) => (
            <button
              key={action.id}
              onClick={() => handleQuickAction(action)}
              disabled={isLoading || !apiStatus?.configured}
              className="w-full p-3 text-left bg-gray-50 dark:bg-gray-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200 hover:scale-[1.02] border border-gray-200 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
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
        {/* <div className="mt-8">
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
        </div> */}

        {/* Recent Chats */}
        {/* Chat History */}
{/* Chat History */}
<div className="mt-8">
  <div className="flex items-center justify-between mb-4">
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
      {t('ai.chatHistory')}
    </h3>
    <button
  onClick={handleToggleChatHistory}
  className="text-xs text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
>
  {showChatHistory ? 'Hide History' : 'View All'}
</button>
  </div>
  
  <div className="space-y-2">
    {(() => {
      const recentChats = chatHistoryService.getRecentChats('director', 5);
      return recentChats.length === 0 ? (
        <div className="p-3 text-center text-gray-500 dark:text-gray-400 text-sm">
          No chat history yet
        </div>
      ) : (
        recentChats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => {
              // Load this chat
              const formattedMessages = chat.messages.map(msg => ({
                sender: msg.sender,
                content: msg.content,
                timestamp: new Date(msg.timestamp).toLocaleTimeString(),
                usage: msg.usage,
                model: msg.model,
                isError: msg.isError
              }));
              setChatHistory(formattedMessages);
              setCurrentChatId(chat.id);
            }}
            className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
          >
            <p className="text-sm text-gray-900 dark:text-white font-medium mb-1 truncate">
              {chat.title}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {new Date(chat.updatedAt).toLocaleDateString()} • {chat.messages.length} messages
            </p>
          </div>
        ))
      );
    })()}
  </div>
</div>
      </div>
    </ChatLayout>
  );
};

export default DirectorAIChat;