import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalization } from '../../../../hooks/useLocalization';
import ReplySuggestions from '../../shared/components/ReplySuggestions';

const MarketingReplySuggestions = ({ lead, onSendMessage }) => {
  const { t } = useTranslation();
  const { isRTLMode } = useLocalization();
  const [showSuggestions, setShowSuggestions] = useState(false);

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
    }
    setShowSuggestions(false);
  };

  return (
    <div className="marketing-reply-suggestions">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          AI Reply Suggestions for {lead?.name}
        </h3>
        <button
          onClick={() => setShowSuggestions(!showSuggestions)}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
            showSuggestions 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          {showSuggestions ? 'Hide Suggestions' : 'Show AI Suggestions'}
        </button>
      </div>

      {showSuggestions && (
        <ReplySuggestions 
          leadContext={leadContext}
          onSelectSuggestion={handleSelectSuggestion}
        />
      )}
    </div>
  );
};

export default MarketingReplySuggestions;