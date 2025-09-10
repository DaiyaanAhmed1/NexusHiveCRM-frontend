import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalization } from '../../../../hooks/useLocalization';
import replySuggestionsService from '../services/replySuggestionsService';

const ReplySuggestions = ({ leadContext, onSelectSuggestion, className = '' }) => {
  const { t } = useTranslation();
  const { isRTLMode } = useLocalization();
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedType, setSelectedType] = useState('follow-up');
  const [editingSuggestion, setEditingSuggestion] = useState(null);
  const [editText, setEditText] = useState('');

  const messageTypes = [
    { id: 'follow-up', label: 'Follow-up', icon: '📞', description: 'Continue the conversation' },
    { id: 'welcome', label: 'Welcome', icon: '👋', description: 'First contact message' },
    { id: 'reminder', label: 'Reminder', icon: '⏰', description: 'Follow up on previous contact' },
    { id: 'closing', label: 'Closing', icon: '🤝', description: 'Final decision message' }
  ];

  const handleGenerateSuggestions = async (messageType) => {
    setIsLoading(true);
    setSelectedType(messageType);
    
    try {
      const result = await replySuggestionsService.generateSuggestions(
        leadContext,
        messageType,
        isRTLMode ? 'ar' : 'en'
      );
      
      setSuggestions(result.suggestions || []);
    } catch (error) {
      console.error('Error generating suggestions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectSuggestion = (suggestion) => {
    if (onSelectSuggestion) {
      onSelectSuggestion(suggestion);
    }
    replySuggestionsService.addToHistory(suggestion);
  };

  const handleEditSuggestion = (suggestion) => {
    setEditingSuggestion(suggestion);
    setEditText(suggestion.content);
  };

  const handleSaveEdit = () => {
    if (editingSuggestion && editText.trim()) {
      const updatedSuggestion = {
        ...editingSuggestion,
        content: editText.trim()
      };
      
      setSuggestions(prev => 
        prev.map(s => s.id === editingSuggestion.id ? updatedSuggestion : s)
      );
      
      setEditingSuggestion(null);
      setEditText('');
    }
  };

  const handleCancelEdit = () => {
    setEditingSuggestion(null);
    setEditText('');
  };

  return (
    <div className={`reply-suggestions ${className}`} dir={isRTLMode ? 'rtl' : 'ltr'}>
      {/* Message Type Buttons */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          Choose Message Type
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {messageTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => handleGenerateSuggestions(type.id)}
              disabled={isLoading}
              className={`p-4 rounded-lg font-medium transition-all duration-200 text-left ${
                selectedType === type.id
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">{type.icon}</span>
                <span className="font-semibold">{type.label}</span>
              </div>
              <p className="text-xs opacity-75">{type.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-blue-500 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
              <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" className="opacity-75" />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
            Generating AI Suggestions...
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Analyzing lead context and creating personalized responses
          </p>
        </div>
      )}

      {/* Suggestions */}
      {suggestions.length > 0 && !isLoading && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
              AI-Generated Suggestions
            </h4>
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-sm rounded-full">
              {suggestions.length} suggestions
            </span>
          </div>
          
          {suggestions.map((suggestion, index) => (
            <div 
              key={suggestion.id}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h5 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {suggestion.title}
                    </h5>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        AI Generated
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Message Content */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4">
                {editingSuggestion?.id === suggestion.id ? (
                  <div>
                    <textarea
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
                      rows="4"
                      placeholder="Edit your message..."
                    />
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={handleSaveEdit}
                        className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-sm rounded-lg transition-colors"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white text-sm rounded-lg transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {suggestion.content}
                  </p>
                )}
              </div>
              
              {/* AI Explanation */}
              {suggestion.explanation && (
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <circle cx="6" cy="6" r="2" />
                        <circle cx="18" cy="6" r="2" />
                        <circle cx="6" cy="18" r="2" />
                        <circle cx="18" cy="18" r="2" />
                        <rect x="10" y="10" width="4" height="4" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-1">
                        Why this works:
                      </div>
                      <div className="text-sm text-blue-700 dark:text-blue-300">
                        {suggestion.explanation}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Action Buttons */}
              <div className="flex gap-3">
                <button 
                  onClick={() => handleSelectSuggestion(suggestion)}
                  className="flex-1 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Use This Suggestion
                </button>
                <button 
                  onClick={() => handleEditSuggestion(suggestion)}
                  className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No Suggestions */}
      {suggestions.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
            Ready to Generate Suggestions
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Choose a message type above to get AI-powered reply suggestions
          </p>
        </div>
      )}
    </div>
  );
};

export default ReplySuggestions;