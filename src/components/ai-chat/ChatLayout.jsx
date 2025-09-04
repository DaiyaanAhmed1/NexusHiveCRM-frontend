import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalization } from '../../hooks/useLocalization';

const ChatLayout = ({ 
  roleName, 
  roleColor = 'blue', 
  chatHistory = [], 
  onSendMessage, 
  onNewChat, 
  onAttach,
  isLoading = false,
  children 
}) => {
  const { t } = useTranslation();
  const { isRTLMode } = useLocalization();
  const [message, setMessage] = useState('');
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  const handleSendMessage = () => {
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleAttachFile = (type) => {
    setShowAttachMenu(false);
    if (type === 'file') {
      fileInputRef.current?.click();
    }
    onAttach(type);
  };

  const getColorClasses = (color) => {
    const colors = {
      blue: 'from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500',
      orange: 'from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500',
      green: 'from-green-500 to-green-600 hover:from-green-400 hover:to-green-500',
      purple: 'from-purple-500 to-purple-600 hover:from-purple-400 hover:to-purple-500'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className={`flex flex-col h-screen bg-gray-50 dark:bg-gray-900 ${isRTLMode ? 'rtl' : 'ltr'}`} dir={isRTLMode ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className={`bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 shadow-sm`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* AI Avatar */}
            <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${getColorClasses(roleColor)} flex items-center justify-center shadow-lg`}>
              <svg width="20" height="20" fill="white" viewBox="0 0 24 24" className="w-5 h-5">
                <circle cx="6" cy="6" r="2" />
                <circle cx="18" cy="6" r="2" />
                <circle cx="6" cy="18" r="2" />
                <circle cx="18" cy="18" r="2" />
                <rect x="10" y="10" width="4" height="4" />
              </svg>
            </div>
            
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                {t('ai.sageChatTitle')} - {roleName}
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {isLoading ? t('ai.thinking') : t('ai.readyToHelp')}
              </p>
            </div>
          </div>

          {/* Header Actions */}
          <div className="flex items-center gap-2">
            {/* New Chat Button */}
            <button
              onClick={onNewChat}
              className={`px-4 py-2 bg-gradient-to-r ${getColorClasses(roleColor)} text-white rounded-lg font-medium transition-all duration-200 hover:scale-105 shadow-md`}
              title={t('ai.newChat')}
            >
              <div className="flex items-center gap-2">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2v20M2 12h20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <span className="hidden sm:inline">{t('ai.newChat')}</span>
              </div>
            </button>

            {/* Chat History Toggle */}
            <button
              className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              title={t('ai.chatHistory')}
            >
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {chatHistory.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${getColorClasses(roleColor)} flex items-center justify-center mb-4 shadow-lg`}>
                  <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
                    <circle cx="6" cy="6" r="2" />
                    <circle cx="18" cy="6" r="2" />
                    <circle cx="6" cy="18" r="2" />
                    <circle cx="18" cy="18" r="2" />
                    <rect x="10" y="10" width="4" height="4" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {t('ai.welcomeTitle')}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 max-w-md">
                  {t('ai.welcomeMessage', { role: roleName })}
                </p>
              </div>
            ) : (
              <>
                {chatHistory.map((msg, index) => (
                  <div key={index} className={`flex ${msg.sender === 'user' ? (isRTLMode ? 'justify-start' : 'justify-end') : (isRTLMode ? 'justify-end' : 'justify-start')}`}>
                    <div className={`max-w-xs sm:max-w-md lg:max-w-lg xl:max-w-xl px-4 py-2 rounded-lg ${
                      msg.sender === 'user' 
                        ? `bg-gradient-to-r ${getColorClasses(roleColor)} text-white`
                        : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700'
                    }`}>
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                      <p className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-white/70' : 'text-gray-500 dark:text-gray-400'}`}>
                        {msg.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
            <div className="flex items-end gap-3">
              {/* Attach Button */}
              <div className="relative">
                <button
                  onClick={() => setShowAttachMenu(!showAttachMenu)}
                  className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  title={t('ai.attach')}
                >
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.5 2c-2.5 0-4.5 2-4.5 4.5v9c0 1.5 1 2.5 2.5 2.5s2.5-1 2.5-2.5v-8.5c0-.5-.5-1-1-1s-1 .5-1 1v8c0 .25-.25.5-.5.5s-.5-.25-.5-.5v-8.5c0-1.5 1-2.5 2.5-2.5s2.5 1 2.5 2.5v9c0 3.5-3 6.5-6.5 6.5S2 19.5 2 16v-9.5c0-.5.5-1 1-1s1 .5 1 1V16c0 2.5 2 4.5 4.5 4.5S13 18.5 13 16v-9c0-3.5-3-6.5-6.5-6.5"/>
                  </svg>
                </button>

                {/* Attach Menu */}
                {showAttachMenu && (
                  <div className="absolute bottom-full mb-2 left-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-2 min-w-48 z-10">
                    <button
                      onClick={() => handleAttachFile('file')}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white flex items-center gap-2"
                    >
                      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
                      </svg>
                      {t('ai.attachFile')}
                    </button>
                    <button
                      onClick={() => handleAttachFile('image')}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white flex items-center gap-2"
                    >
                      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                        <circle cx="8.5" cy="8.5" r="1.5"/>
                        <path d="M21 15l-5-5L5 21"/>
                      </svg>
                      {t('ai.attachImage')}
                    </button>
                  </div>
                )}
              </div>

              {/* Message Input */}
              <div className="flex-1">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={t('ai.messagePlaceholder')}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="1"
                  style={{ minHeight: '40px', maxHeight: '120px' }}
                  disabled={isLoading}
                />
              </div>

              {/* Send Button */}
              <button
                onClick={handleSendMessage}
                disabled={!message.trim() || isLoading}
                className={`p-2 bg-gradient-to-r ${getColorClasses(roleColor)} text-white rounded-lg transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-md`}
                title={t('ai.send')}
              >
                {isLoading ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" className="animate-spin">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" opacity="0.25" />
                    <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="3" fill="none" />
                  </svg>
                ) : (
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 2L11 13l-3-3-6 6 3 3 9-9L22 2z"/>
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Role-specific Sidebar */}
        {children && (
          <div className="w-80 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 overflow-y-auto">
            {children}
          </div>
        )}
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={(e) => {
          // Handle file upload
          console.log('File selected:', e.target.files[0]);
        }}
      />
    </div>
  );
};

export default ChatLayout; 