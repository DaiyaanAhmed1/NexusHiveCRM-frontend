import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalization } from '../../../hooks/useLocalization';
import ChatLayout from '../../../components/ai-chat/ChatLayout';
import aiService from '../../../services/aiService';
import chatHistoryService from '../../../services/chatHistoryService';
import trialService from '../../../services/trialService';

const AdmissionHeadAIChat = () => {
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
      const newChat = chatHistoryService.createNewChat('admission-head');
      setCurrentChatId(newChat.id);
    }
  }, [currentChatId]);

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
    
    // Check trial limit before sending
    if (!trialService.canAskQuestion()) {
      alert(t('ai.trial.limitReached'));
      return;
    }
  
    // Record the question
    trialService.recordQuestion();
    
    // Dispatch event to update trial counter
    window.dispatchEvent(new CustomEvent('trialUpdated'));
    
    // Add user message to chat history
    if (currentChatId) {
      chatHistoryService.addMessage('admission-head', currentChatId, {
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
      const response = await aiService.generateResponse(message, 'admission-head', apiChatHistory, isRTLMode ? 'ar' : 'en');
      
      // Add AI response to chat history
      if (currentChatId) {
        chatHistoryService.addMessage('admission-head', currentChatId, {
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
        chatHistoryService.updateChatTitle('admission-head', currentChatId, newTitle);
      }

    } catch (error) {
      console.error('Error generating AI response:', error);
      setError(error.message);
      
      // Add error message to chat history
      if (currentChatId) {
        chatHistoryService.addMessage('admission-head', currentChatId, {
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
    const newChat = chatHistoryService.createNewChat('admission-head', 'New Conversation');
    setCurrentChatId(newChat.id);
  };

  const handleAttach = (type) => {
    console.log('Attach type:', type);
    // Handle file attachment - TODO: Implement file upload
  };

  const handleQuickAction = (action) => {
    handleSendMessage(action.prompt);
  };

  const generateChatTitle = (message) => {
    // Extract key words from the message to create a meaningful title
    const words = message.toLowerCase().split(' ');
    
    // Common admission-related keywords
    const keywords = {
      'application': 'Application Review',
      'enrollment': 'Enrollment Analysis',
      'admission': 'Admission Process',
      'document': 'Document Verification',
      'waitlist': 'Waitlist Management',
      'scholarship': 'Scholarship Allocation',
      'compliance': 'Compliance Review',
      'forecast': 'Enrollment Forecast',
      'criteria': 'Admission Criteria',
      'deadline': 'Deadline Management',
      'verification': 'Document Verification',
      'student': 'Student Management',
      'recruitment': 'Student Recruitment',
      'budget': 'Budget Planning',
      'regulatory': 'Regulatory Compliance'
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
      roleName={t('roles.admissionHead')}
      roleColor="green"
      chatHistory={chatHistory}
      onSendMessage={handleSendMessage}
      onNewChat={handleNewChat}
      onAttach={handleAttach}
      isLoading={isLoading}
      showChatHistory={showChatHistory}
      onToggleChatHistory={handleToggleChatHistory}
      onLoadChatHistory={handleLoadChatHistory}
    >
      {/* Admission-specific sidebar */}
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
          {t('ai.admission.quickActions')}
        </h3>
        
        <div className="space-y-3">
          {admissionQuickActions.map((action) => (
            <button
              key={action.id}
              onClick={() => handleQuickAction(action)}
              disabled={isLoading || !apiStatus?.configured}
              className="w-full p-3 text-left bg-gray-50 dark:bg-gray-700 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-all duration-200 hover:scale-[1.02] border border-gray-200 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
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
        {/* <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {t('ai.admission.tools')}
          </h3>
          
          <div className="space-y-2">
            <button className="w-full p-3 bg-green-100 dark:bg-green-900/30 hover:bg-green-200 dark:hover:bg-green-900/50 rounded-lg transition-colors text-green-900 dark:text-green-100">
              <div className="flex items-center gap-2">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
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
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <span className="text-sm font-medium">{t('ai.admission.scholarships')}</span>
              </div>
            </button>
          </div>
        </div> */}

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
              const recentChats = chatHistoryService.getRecentChats('admission-head', 5);
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
                    className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors"
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

export default AdmissionHeadAIChat;