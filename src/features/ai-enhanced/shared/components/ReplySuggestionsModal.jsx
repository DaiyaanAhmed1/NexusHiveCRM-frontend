import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalization } from '../../../../hooks/useLocalization';
import ReplySuggestions from './ReplySuggestions';

const ReplySuggestionsModal = ({ isOpen, onClose, lead, onSendMessage }) => {
  const { t } = useTranslation();
  const { isRTLMode } = useLocalization();
  const [usedSuggestion, setUsedSuggestion] = useState(null);

  if (!isOpen) return null;

  // Lead context for AI
  const leadContext = {
    name: lead?.name || 'Unknown Lead',
    location: lead?.location || 'Unknown Location',
    interest: lead?.interest || 'General Interest',
    engagement: lead?.engagement || 'Medium',
    lastContact: lead?.lastContact || 'No previous contact'
  };

  const handleSelectSuggestion = (suggestion) => {
    if (onSendMessage) {
      onSendMessage(suggestion.content);
      setUsedSuggestion(suggestion);
      
      // Auto-close modal after 2 seconds
      setTimeout(() => {
        onClose();
        setUsedSuggestion(null);
      }, 2000);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              AI Reply Suggestions
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              For {lead?.name} • {lead?.location} • {lead?.interest}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Success Message */}
          {usedSuggestion && (
            <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-green-800 dark:text-green-200">
                    Suggestion Applied Successfully!
                  </h4>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    "{usedSuggestion.title}" has been used for {lead?.name}. This modal will close automatically.
                  </p>
                </div>
              </div>
            </div>
          )}

          <ReplySuggestions 
            leadContext={leadContext}
            onSelectSuggestion={handleSelectSuggestion}
          />
        </div>
      </div>
    </div>
  );
};

export default ReplySuggestionsModal;

