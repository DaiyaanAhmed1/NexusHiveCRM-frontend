import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalization } from '../../hooks/useLocalization';
import TrialCounter from './TrialCounter';
import trialService from '../../services/trialService';
import ChatHistory from './ChatHistory';
import chatHistoryService from '../../services/chatHistoryService';

const ChatLayout = ({ 
  roleName, 
  roleColor = 'blue', 
  chatHistory = [], 
  onSendMessage, 
  onNewChat, 
  onAttach,
  isLoading = false,
  showChatHistory: externalShowChatHistory = false,
  onToggleChatHistory,
  onLoadChatHistory,
  children 
}) =>  {
  const { t } = useTranslation();
  const { isRTLMode } = useLocalization();
  const [message, setMessage] = useState('');
  const [showChatHistory, setShowChatHistory] = useState(externalShowChatHistory);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [trialStatus, setTrialStatus] = useState(trialService.getTrialStatus());
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setShowChatHistory(externalShowChatHistory);
  }, [externalShowChatHistory]);
  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

 // Update trial status
useEffect(() => {
  const updateTrialStatus = () => {
    setTrialStatus(trialService.getTrialStatus());
  };

  window.addEventListener('trialUpdated', updateTrialStatus);
  updateTrialStatus();

  return () => {
    window.removeEventListener('trialUpdated', updateTrialStatus);
  };
}, []); 

const handleSendMessage = () => {
  if (message.trim() && !isLoading) {
    // Check trial limit before sending
    if (!trialService.canAskQuestion()) {
      alert('You have reached your free trial limit of 20 questions. Please upgrade to continue using AI chat.');
      return;
    }

    // Record the question
    trialService.recordQuestion();
    
    // Dispatch event to update trial counter
    window.dispatchEvent(new CustomEvent('trialUpdated'));
    
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
  const handleNewChat = () => {
    const newChat = chatHistoryService.createNewChat(roleName.toLowerCase().replace(' ', '-'));
    setCurrentChatId(newChat.id);
    onNewChat();
    setShowChatHistory(false);
  };

  const handleSelectChat = (chat) => {
    setCurrentChatId(chat.id);
    // Convert chat messages to the format expected by the parent component
    const formattedMessages = chat.messages.map(msg => ({
      sender: msg.sender,
      content: msg.content,
      timestamp: new Date(msg.timestamp).toLocaleTimeString(),
      usage: msg.usage,
      model: msg.model,
      isError: msg.isError
    }));
    
    // You'll need to add a prop to handle loading chat history
    if (onLoadChatHistory) {
      onLoadChatHistory(formattedMessages, chat.id);
    }
  };

  const handleDeleteChat = (chatId) => {
    if (currentChatId === chatId) {
      setCurrentChatId(null);
      onNewChat(); // Clear current chat
    }
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

  // Format AI response content with better styling
const formatAIResponse = (content) => {
  // Split content into paragraphs
  const paragraphs = content.split('\n\n');
  
  return paragraphs.map((paragraph, index) => {
    // Check for code blocks (```code```)
    if (paragraph.includes('```')) {
      const codeBlocks = paragraph.split('```');
      return (
        <div key={index} className="mb-4">
          {codeBlocks.map((block, blockIndex) => {
            if (blockIndex % 2 === 1) { // Odd indices are code blocks
              const lines = block.split('\n');
              const language = lines[0] || '';
              const code = lines.slice(1).join('\n');
              return (
                <div key={blockIndex} className="bg-gray-900 dark:bg-gray-800 rounded-lg p-4 mb-3">
                  {language && (
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-400 font-mono">{language}</span>
                      <button
                        onClick={() => navigator.clipboard.writeText(code)}
                        className="text-xs text-gray-400 hover:text-white transition-colors"
                        title="Copy code"
                      >
                        📋 Copy
                      </button>
                    </div>
                  )}
                  <pre className="text-sm text-gray-100 overflow-x-auto">
                    <code className="font-mono">{code}</code>
                  </pre>
                </div>
              );
            } else if (block.trim()) {
              return (
                <p key={blockIndex} className="text-gray-700 dark:text-gray-300 mb-2">
                  {block}
                </p>
              );
            }
            return null;
          })}
        </div>
      );
    }
    
    // Check for inline code (`code`)
    if (paragraph.includes('`') && !paragraph.includes('```')) {
      const parts = paragraph.split('`');
      return (
        <p key={index} className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
          {parts.map((part, partIndex) => {
            if (partIndex % 2 === 1) { // Odd indices are inline code
              return (
                <code key={partIndex} className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm font-mono text-gray-800 dark:text-gray-200">
                  {part}
                </code>
              );
            }
            return part;
          })}
        </p>
      );
    }
    
    // Check for markdown headers (### Header, ## Header, # Header)
    if (paragraph.match(/^#{1,6}\s+/)) {
      const level = paragraph.match(/^(#{1,6})/)[1].length;
      const text = paragraph.replace(/^#{1,6}\s+/, '');
      const HeaderTag = level === 1 ? 'h2' : level === 2 ? 'h3' : level === 3 ? 'h4' : 'h5';
      return (
        <HeaderTag key={index} className={`font-bold text-gray-900 dark:text-white mb-3 mt-4 ${
          level === 1 ? 'text-xl border-b border-gray-300 dark:border-gray-600 pb-2' : 
          level === 2 ? 'text-lg' : 
          level === 3 ? 'text-base' : 'text-sm'
        }`}>
          {text}
        </HeaderTag>
      );
    }
    
    // Check for bold headers like "**Legal Requirements**:"
    if (paragraph.match(/^\*\*[^*]+\*\*:\s*$/)) {
      const text = paragraph.replace(/^\*\*([^*]+)\*\*:\s*$/, '$1');
      return (
        <h4 key={index} className="font-bold text-gray-900 dark:text-white mb-2 mt-4 text-base border-l-4 border-blue-500 pl-3 bg-blue-50 dark:bg-blue-900/20 py-2 rounded-r-lg">
          {text}
        </h4>
      );
    }
        // Check for standalone bold headers like "**Public Awareness Campaigns**"
    if (paragraph.match(/^\*\*[^*]+\*\*$/)) {
      const text = paragraph.replace(/^\*\*([^*]+)\*\*$/, '$1');
      return (
        <h4 key={index} className="font-bold text-gray-900 dark:text-white mb-3 mt-4 text-base border-l-4 border-green-500 pl-3 bg-green-50 dark:bg-green-900/20 py-2 rounded-r-lg">
          {text}
        </h4>
      );
    }

    // Check for header followed by numbered list (like "Sweet Mango Varieties 1. **Item**")
    if (paragraph.includes(':') && paragraph.match(/\d+\./)) {
      const lines = paragraph.split('\n');
      const firstLine = lines[0];
      const remainingLines = lines.slice(1);
      
      // Check if first line is a header
      if (firstLine.includes(':') && !firstLine.match(/^\d+\./)) {
        const headerText = firstLine.replace(':', '');
        const isBoldHeader = headerText.includes('**');
        
        return (
          <div key={index} className="mb-4">
            {/* Header */}
            <h4 className={`font-bold text-gray-900 dark:text-white mb-3 mt-4 text-base border-l-4 border-purple-500 pl-3 bg-purple-50 dark:bg-purple-900/20 py-2 rounded-r-lg`}>
              {isBoldHeader ? headerText.replace(/\*\*/g, '') : headerText}
            </h4>
            
            {/* Numbered List */}
            <div className="ml-4">
              {remainingLines.map((line, lineIndex) => {
                if (line.match(/^\d+\./)) {
                  const number = line.match(/^(\d+)\./)[1];
                  const cleanText = line.replace(/^\d+\.\s*/, '');
                  const hasBoldText = cleanText.includes('**');
                  
                  return (
                    <div key={lineIndex} className="flex items-start gap-3 mb-2">
                      <span className="bg-purple-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center mt-0.5 flex-shrink-0 font-medium">
                        {number}
                      </span>
                      <div className="flex-1">
                        {hasBoldText ? (
                          <span className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            {cleanText.split('**').map((part, partIndex) => {
                              if (partIndex % 2 === 1) { // Odd indices are bold text
                                return <strong key={partIndex} className="font-semibold text-gray-900 dark:text-white">{part}</strong>;
                              }
                              return part;
                            })}
                          </span>
                        ) : (
                          <span className="text-gray-700 dark:text-gray-300 leading-relaxed">{cleanText}</span>
                        )}
                      </div>
                    </div>
                  );
                }
                return (
                  <p key={lineIndex} className="text-gray-700 dark:text-gray-300 mb-2 leading-relaxed">
                    {line}
                  </p>
                );
              })}
            </div>
          </div>
        );
      }
    }

    // Check for header with inline numbered list (like "Sweet Mango Varieties 1. **Alphonso**")
    if (paragraph.match(/^[^:]+:\s*\d+\./)) {
      const match = paragraph.match(/^([^:]+):\s*(\d+\.\s*.+)/);
      if (match) {
        const headerText = match[1].trim();
        const listContent = match[2];
        
        return (
          <div key={index} className="mb-4">
            {/* Header */}
            <h4 className="font-bold text-gray-900 dark:text-white mb-3 mt-4 text-base border-l-4 border-orange-500 pl-3 bg-orange-50 dark:bg-orange-900/20 py-2 rounded-r-lg">
              {headerText}
            </h4>
            
            {/* Inline List Content */}
            <div className="ml-4">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {listContent.split('**').map((part, partIndex) => {
                  if (partIndex % 2 === 1) { // Odd indices are bold text
                    return <strong key={partIndex} className="font-semibold text-gray-900 dark:text-white">{part}</strong>;
                  }
                  return part;
                })}
              </p>
            </div>
          </div>
        );
      }
    }
    // Check for bold text with colon (like "**Key**: Value")
    if (paragraph.includes('**') && paragraph.includes(':')) {
      const lines = paragraph.split('\n');
      return (
        <div key={index} className="mb-3">
          {lines.map((line, lineIndex) => {
            if (line.includes('**') && line.includes(':')) {
              const parts = line.split(':');
              const boldPart = parts[0].trim();
              const valuePart = parts.slice(1).join(':').trim();
              
              return (
                <div key={lineIndex} className="mb-2">
                  <span className="font-bold text-gray-900 dark:text-white">
                    {boldPart.replace(/\*\*/g, '')}:
                  </span>
                  <span className="text-gray-700 dark:text-gray-300 ml-2">
                    {valuePart}
                  </span>
                </div>
              );
            }
            return (
              <p key={lineIndex} className="text-gray-700 dark:text-gray-300 mb-2">
                {line}
              </p>
            );
          })}
        </div>
      );
    }
    
    // Check for tabular data (rows with | separators)
    if (paragraph.includes('|') && paragraph.split('\n').length > 2) {
      const lines = paragraph.split('\n').filter(line => line.trim());
      if (lines.length >= 2) {
        const rows = lines.map(line => 
          line.split('|').map(cell => cell.trim()).filter(cell => cell)
        );
        
        // Check if it's a proper table (has header separator)
        const hasHeaderSeparator = lines[1].includes('---') || lines[1].includes('===');
        
        if (hasHeaderSeparator && rows.length > 2) {
          const headers = rows[0];
          const dataRows = rows.slice(2);
          
          return (
            <div key={index} className="mb-4 overflow-x-auto">
              <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    {headers.map((header, headerIndex) => (
                      <th key={headerIndex} className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-b border-gray-200 dark:border-gray-600">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                  {dataRows.map((row, rowIndex) => (
                    <tr key={rowIndex} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex} className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
      }
    }
    
    // Check if paragraph is a list
    // Check if paragraph is a list
if (paragraph.includes('•') || paragraph.includes('-') || paragraph.includes('*')) {
  const lines = paragraph.split('\n');
  return (
    <div key={index} className="mb-4">
      {lines.map((line, lineIndex) => {
        const trimmedLine = line.trim();
        if (trimmedLine.startsWith('•') || trimmedLine.startsWith('-') || trimmedLine.startsWith('*')) {
          // Remove the bullet point and clean up the text
          const cleanText = trimmedLine.replace(/^[•\-*]\s*/, '');
          
          // Check if the text contains bold formatting
          const hasBoldText = cleanText.includes('**');
          
          return (
            <div key={lineIndex} className="flex items-start gap-3 mb-2">
              <span className="text-blue-500 dark:text-blue-400 mt-1 flex-shrink-0 text-lg">•</span>
              <div className="flex-1">
                {hasBoldText ? (
                  <span className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {cleanText.split('**').map((part, partIndex) => {
                      if (partIndex % 2 === 1) { // Odd indices are bold text
                        return <strong key={partIndex} className="font-semibold text-gray-900 dark:text-white">{part}</strong>;
                      }
                      return part;
                    })}
                  </span>
                ) : (
                  <span className="text-gray-700 dark:text-gray-300 leading-relaxed">{cleanText}</span>
                )}
              </div>
            </div>
          );
        }
        return (
          <p key={lineIndex} className="text-gray-700 dark:text-gray-300 mb-2 leading-relaxed">
            {line}
          </p>
        );
      })}
    </div>
  );
}
    // Check if paragraph is a numbered list
    // Check if paragraph is a numbered list
  if (paragraph.match(/^\d+\./)) {
    const lines = paragraph.split('\n');
    return (
      <div key={index} className="mb-4">
        {lines.map((line, lineIndex) => {
          if (line.match(/^\d+\./)) {
            const number = line.match(/^(\d+)\./)[1];
            const cleanText = line.replace(/^\d+\.\s*/, '');
            
            // Check if the text contains bold formatting
            const hasBoldText = cleanText.includes('**');
            
            return (
              <div key={lineIndex} className="flex items-start gap-3 mb-2">
                <span className="bg-blue-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center mt-0.5 flex-shrink-0 font-medium">
                  {number}
                </span>
                <div className="flex-1">
                  {hasBoldText ? (
                    <span className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {cleanText.split('**').map((part, partIndex) => {
                        if (partIndex % 2 === 1) { // Odd indices are bold text
                          return <strong key={partIndex} className="font-semibold text-gray-900 dark:text-white">{part}</strong>;
                        }
                        return part;
                      })}
                    </span>
                  ) : (
                    <span className="text-gray-700 dark:text-gray-300 leading-relaxed">{cleanText}</span>
                  )}
                </div>
              </div>
            );
          }
          return (
            <p key={lineIndex} className="text-gray-700 dark:text-gray-300 mb-2 leading-relaxed">
              {line}
            </p>
          );
        })}
      </div>
    );
  }
    
    // Check for key-value pairs (like "Key: Value")
    if (paragraph.includes(':') && paragraph.split('\n').length > 1) {
      const lines = paragraph.split('\n');
      const isKeyValue = lines.every(line => line.includes(':') && line.split(':').length === 2);
      
      if (isKeyValue) {
        return (
          <div key={index} className="mb-4 bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            {lines.map((line, lineIndex) => {
              const [key, value] = line.split(':');
              return (
                <div key={lineIndex} className="flex mb-2 last:mb-0">
                  <span className="font-medium text-gray-900 dark:text-white w-1/3 flex-shrink-0">
                    {key.trim()}:
                  </span>
                  <span className="text-gray-700 dark:text-gray-300 flex-1">
                    {value.trim()}
                  </span>
                </div>
              );
            })}
          </div>
        );
      }
    }
    
    // Check for quotes (lines starting with >)
    if (paragraph.startsWith('>')) {
      const lines = paragraph.split('\n');
      return (
        <div key={index} className="mb-4 border-l-4 border-blue-500 pl-4 bg-blue-50 dark:bg-blue-900/20 py-2 rounded-r-lg">
          {lines.map((line, lineIndex) => (
            <p key={lineIndex} className="text-gray-700 dark:text-gray-300 italic">
              {line.replace(/^>\s*/, '')}
            </p>
          ))}
        </div>
      );
    }
    
    // Regular paragraph
    return (
      <p key={index} className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
        {paragraph}
      </p>
    );
  });
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
          <div className="flex items-center gap-3">
            {/* Trial Counter */}
            <TrialCounter roleColor={roleColor} />
            
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
           {/* Chat History Toggle */}
<button
  onClick={() => {
    if (onToggleChatHistory) {
      onToggleChatHistory();
    } else {
      setShowChatHistory(!showChatHistory);
    }
  }}
  className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
  title={showChatHistory ? 'Hide Chat History' : 'Show Chat History'}
>
  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
    <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/>
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
                {trialStatus.isExpired && (
                  <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <p className="text-red-800 dark:text-red-200 font-medium">
                      Your free trial has expired. Please upgrade to continue using AI chat.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <>
                {chatHistory.map((msg, index) => (
                  <div key={index} className={`flex ${msg.sender === 'user' ? (isRTLMode ? 'justify-start' : 'justify-end') : (isRTLMode ? 'justify-end' : 'justify-start')}`}>
                    <div className={`max-w-xs sm:max-w-md lg:max-w-lg xl:max-w-2xl px-4 py-3 rounded-lg shadow-sm ${
                      msg.sender === 'user' 
                        ? `bg-gradient-to-r ${getColorClasses(roleColor)} text-white`
                        : msg.isError 
                          ? 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200'
                          : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700'
                    }`}>
                      {msg.sender === 'ai' ? (
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 mb-2">
                            <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${getColorClasses(roleColor)} flex items-center justify-center`}>
                              <svg width="12" height="12" fill="white" viewBox="0 0 24 24">
                                <circle cx="6" cy="6" r="2" />
                                <circle cx="18" cy="6" r="2" />
                                <circle cx="6" cy="18" r="2" />
                                <circle cx="18" cy="18" r="2" />
                                <rect x="10" y="10" width="4" height="4" />
                              </svg>
                            </div>
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Sage AI</span>
                          </div>
                          <div className="prose prose-sm max-w-none">
                            {formatAIResponse(msg.content)}
                          </div>
                          {msg.usage && (
                            <div className="mt-3 pt-2 border-t border-gray-200 dark:border-gray-600">
                              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                                <span>Sage AI</span>
                                <span>Tokens: {msg.usage.total_tokens}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div>
                          <p className="whitespace-pre-wrap">{msg.content}</p>
                        </div>
                      )}
                      <p className={`text-xs mt-2 ${msg.sender === 'user' ? 'text-white/70' : 'text-gray-500 dark:text-gray-400'}`}>
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
                  placeholder={trialStatus.isExpired ? "Trial expired - Please upgrade" : t('ai.messagePlaceholder')}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="1"
                  style={{ minHeight: '40px', maxHeight: '120px' }}
                  disabled={isLoading || trialStatus.isExpired}
                />
              </div>

              {/* Send Button */}
              <button
                onClick={handleSendMessage}
                disabled={!message.trim() || isLoading || trialStatus.isExpired}
                className={`p-2 bg-gradient-to-r ${getColorClasses(roleColor)} text-white rounded-lg transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-md`}
                title={trialStatus.isExpired ? "Trial expired" : t('ai.send')}
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
    {showChatHistory ? (
      <ChatHistory
        role={roleName.toLowerCase().replace(' ', '-')}
        currentChatId={currentChatId}
        onSelectChat={handleSelectChat}
        onNewChat={handleNewChat}
        onDeleteChat={handleDeleteChat}
        isOpen={showChatHistory}
        onClose={() => setShowChatHistory(false)}
      />
    ) : (
      children
    )}
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