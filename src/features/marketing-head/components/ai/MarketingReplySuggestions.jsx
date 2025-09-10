import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalization } from '../../../../hooks/useLocalization';
import ReplySuggestions from './ReplySuggestions';

const MarketingReplySuggestions = ({ lead, onClose, onShowConfirmation }) => {
  const { t } = useTranslation();
  const { isRTLMode } = useLocalization();
  const [showSuggestions, setShowSuggestions] = useState(true);

  // Lead context for AI
  const leadContext = {
    name: lead?.name || 'Unknown Lead',
    email: lead?.email || 'No email',
    phone: lead?.phone || 'No phone',
    source: lead?.source || 'Unknown source',
    status: lead?.status || 'Unknown status',
    lastContact: lead?.lastContact || 'No previous contact',
    notes: lead?.notes || 'No notes'
  };

  const handleSelectSuggestion = (suggestion) => {
    // Show confirmation modal
    if (onShowConfirmation) {
      onShowConfirmation(true);
    }
    
    // Close the reply suggestions modal
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className={`marketing-reply-suggestions ${isRTLMode ? 'rtl' : 'ltr'}`}>
      <div className="mb-6">
        <h3 className={`text-lg font-semibold text-gray-900 dark:text-white mb-2 ${isRTLMode ? 'text-right' : 'text-left'}`}>
          {isRTLMode ? `اقتراحات الرد بالذكاء الاصطناعي لـ ${lead?.name}` : `AI Reply Suggestions for ${lead?.name}`}
        </h3>
        <p className={`text-sm text-gray-500 dark:text-gray-400 ${isRTLMode ? 'text-right' : 'text-left'}`}>
          {isRTLMode ? 'اختر من الرسائل المخصصة المنشأة بالذكاء الاصطناعي بناءً على سياق العميل' : 'Choose from AI-generated personalized messages based on lead context'}
        </p>
      </div>

      <ReplySuggestions 
        leadContext={leadContext}
        onSelectSuggestion={handleSelectSuggestion}
        className="w-full"
      />
    </div>
  );
};

export default MarketingReplySuggestions;