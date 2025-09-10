import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalization } from '../../../../hooks/useLocalization';
import { FiMessageCircle, FiEdit2, FiCheck, FiX, FiRefreshCw } from 'react-icons/fi';
import replySuggestionsService from '../../services/replySuggestionsService';

const ReplySuggestions = ({ leadContext, onSelectSuggestion, className = '' }) => {
  const { t } = useTranslation();
  const { isRTLMode } = useLocalization();
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedType, setSelectedType] = useState('follow-up');
  const [editingSuggestion, setEditingSuggestion] = useState(null);
  const [editText, setEditText] = useState('');

  const messageTypes = [
    { 
      id: 'follow-up', 
      label: isRTLMode ? 'متابعة' : 'Follow-up', 
      icon: '📞', 
      description: isRTLMode ? 'متابعة المحادثة' : 'Continue the conversation' 
    },
    { 
      id: 'welcome', 
      label: isRTLMode ? 'ترحيب' : 'Welcome', 
      icon: '👋', 
      description: isRTLMode ? 'رسالة أول اتصال' : 'First contact message' 
    },
    { 
      id: 'reminder', 
      label: isRTLMode ? 'تذكير' : 'Reminder', 
      icon: '⏰', 
      description: isRTLMode ? 'متابعة الاتصال السابق' : 'Follow up on previous contact' 
    },
    { 
      id: 'closing', 
      label: isRTLMode ? 'إغلاق' : 'Closing', 
      icon: '🤝', 
      description: isRTLMode ? 'رسالة القرار النهائي' : 'Final decision message' 
    }
  ];

  const getFallbackSuggestions = (messageType) => {
    const fallbacks = {
      'follow-up': [
        { 
          id: 1,
          title: isRTLMode ? 'متابعة مهنية' : 'Professional Follow-up',
          content: isRTLMode ? `مرحباً ${leadContext.name || 'هناك'}، أردت متابعة محادثتنا السابقة. كيف يمكنني مساعدتك اليوم؟` : `Hi ${leadContext.name || 'there'}, I wanted to follow up on our previous conversation. How can I help you today?`,
          explanation: isRTLMode ? 'نهج مهني ومحترم' : 'Professional and respectful approach',
          type: 'follow-up'
        },
        { 
          id: 2,
          title: isRTLMode ? 'رد تفاعلي' : 'Engaging Response',
          content: isRTLMode ? `مرحباً ${leadContext.name || 'هناك'}، أتمنى أن تكون بخير. هل لديك أي أسئلة حول برامجنا؟` : `Hello ${leadContext.name || 'there'}, I hope you're doing well. Do you have any questions about our programs?`,
          explanation: isRTLMode ? 'يشجع على المزيد من التفاعل' : 'Encourages further engagement',
          type: 'follow-up'
        },
        { 
          id: 3,
          title: isRTLMode ? 'رد يركز على القيمة' : 'Value-focused Reply',
          content: isRTLMode ? `برامجنا مصممة لتوفير مهارات عملية وخبرة حقيقية. هل تود جدولة مكالمة لمناقشة أهدافك المهنية؟` : `Our programs are designed to provide practical skills and real-world experience. Would you like to schedule a call to discuss your career goals?`,
          explanation: isRTLMode ? 'يركز على القيمة المقترحة' : 'Focuses on value proposition',
          type: 'follow-up'
        }
      ],
      'welcome': [
        { 
          id: 1,
          title: isRTLMode ? 'رسالة ترحيب' : 'Welcome Message',
          content: isRTLMode ? `مرحباً ${leadContext.name || 'هناك'}! شكراً لاهتمامك ببرامجنا.` : `Welcome ${leadContext.name || 'there'}! Thank you for your interest in our programs.`,
          explanation: isRTLMode ? 'دافئ ومرحب' : 'Warm and welcoming',
          type: 'welcome'
        },
        { 
          id: 2,
          title: isRTLMode ? 'مقدمة' : 'Introduction',
          content: isRTLMode ? `مرحباً ${leadContext.name || 'هناك'}، أنا هنا لمساعدتك في استكشاف فرصنا التعليمية.` : `Hi ${leadContext.name || 'there'}, I'm here to help you explore our educational opportunities.`,
          explanation: isRTLMode ? 'شخصي ومفيد' : 'Personal and helpful',
          type: 'welcome'
        }
      ],
      'reminder': [
        { 
          id: 1,
          title: isRTLMode ? 'تذكير ودود' : 'Friendly Reminder',
          content: isRTLMode ? `مرحباً ${leadContext.name || 'هناك'}، تذكير ودود بجلسة المعلومات القادمة. هل تود الانضمام؟` : `Hi ${leadContext.name || 'there'}, just a friendly reminder about our upcoming information session. Would you like to join?`,
          explanation: isRTLMode ? 'لطيف وغير مزعج' : 'Gentle and non-pushy',
          type: 'reminder'
        },
        { 
          id: 2,
          title: isRTLMode ? 'تذكير بالموعد النهائي' : 'Deadline Reminder',
          content: isRTLMode ? `مرحباً ${leadContext.name || 'هناك'}، أردت تذكيرك بالموعد النهائي للتقديم. هل تحتاج أي مساعدة؟` : `Hello ${leadContext.name || 'there'}, I wanted to remind you about the application deadline. Do you need any help?`,
          explanation: isRTLMode ? 'مفيد وداعم' : 'Helpful and supportive',
          type: 'reminder'
        }
      ],
      'closing': [
        { 
          id: 1,
          title: isRTLMode ? 'رسالة شكر' : 'Thank You Message',
          content: isRTLMode ? `مرحباً ${leadContext.name || 'هناك'}، شكراً لاهتمامك. أتطلع لسماع منك قريباً!` : `Hi ${leadContext.name || 'there'}, thank you for your interest. I look forward to hearing from you soon!`,
          explanation: isRTLMode ? 'مهذب ومهني' : 'Polite and professional',
          type: 'closing'
        },
        { 
          id: 2,
          title: isRTLMode ? 'فحص نهائي' : 'Final Check',
          content: isRTLMode ? `مرحباً ${leadContext.name || 'هناك'}، يرجى إعلامي إذا كان لديك أي أسئلة أخرى. أتمنى لك يوماً رائعاً!` : `Hello ${leadContext.name || 'there'}, please let me know if you have any other questions. Have a great day!`,
          explanation: isRTLMode ? 'مفتوح وودود' : 'Open-ended and friendly',
          type: 'closing'
        }
      ]
    };
    
    return fallbacks[messageType] || fallbacks['follow-up'];
  };

  const handleGenerateSuggestions = async (messageType) => {
    setIsLoading(true);
    setSelectedType(messageType);
    
    try {
      const result = await replySuggestionsService.generateSuggestions(
        leadContext,
        messageType,
        isRTLMode ? 'ar' : 'en'
      );
      
      console.log('AI Service Result:', result);
      
      if (result && result.suggestions && result.suggestions.length > 0) {
        setSuggestions(result.suggestions);
        
        if (result.error) {
          console.log('Using fallback suggestions due to AI timeout');
        }
      } else {
        const fallbackSuggestions = getFallbackSuggestions(messageType);
        setSuggestions(fallbackSuggestions);
        console.log('Using local fallback suggestions');
      }
    } catch (error) {
      console.error('Error generating suggestions:', error);
      
      const fallbackSuggestions = getFallbackSuggestions(messageType);
      setSuggestions(fallbackSuggestions);
      
      console.log('AI service unavailable, using fallback suggestions');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectSuggestion = (suggestion) => {
    if (onSelectSuggestion) {
      onSelectSuggestion(suggestion);
    }
  };

  const handleEditSuggestion = (suggestion) => {
    setEditingSuggestion(suggestion);
    setEditText(suggestion.content);
  };

  const handleSaveEdit = () => {
    if (editingSuggestion) {
      const updatedSuggestions = suggestions.map(s => 
        s.id === editingSuggestion.id 
          ? { ...s, content: editText }
          : s
      );
      setSuggestions(updatedSuggestions);
      setEditingSuggestion(null);
      setEditText('');
    }
  };

  const handleCancelEdit = () => {
    setEditingSuggestion(null);
    setEditText('');
  };

  return (
    <div className={`reply-suggestions ${className} ${isRTLMode ? 'rtl' : 'ltr'}`}>
      {/* Message Type Selection */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {isRTLMode ? 'اختر نوع الرسالة' : 'Select Message Type'}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {messageTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => handleGenerateSuggestions(type.id)}
              disabled={isLoading}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedType === type.id
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              } ${isRTLMode ? 'text-right' : 'text-left'}`}
            >
              <div className="text-2xl mb-2">{type.icon}</div>
              <div className="font-medium text-gray-900 dark:text-white">{type.label}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {type.description}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiRefreshCw className="w-8 h-8 text-blue-500 animate-spin" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            {isRTLMode ? 'جاري إنشاء الاقتراحات...' : 'Generating suggestions...'}
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            {isRTLMode ? 'الذكاء الاصطناعي يحلل السياق' : 'AI is analyzing the context'}
          </p>
        </div>
      )}

      {/* Suggestions */}
      {!isLoading && suggestions.length > 0 && (
        <div className="space-y-4">
          <div className={`flex items-center justify-between ${isRTLMode ? 'flex-row-reverse' : ''}`}>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {isRTLMode ? `اقتراحات الرد (${suggestions.length})` : `Reply Suggestions (${suggestions.length})`}
            </h3>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {isRTLMode ? 'مرتبة حسب الجودة' : 'Sorted by quality'}
            </div>
          </div>

          {suggestions.map((suggestion, index) => (
            <div 
              key={suggestion.id || index}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4"
              dir={isRTLMode ? 'rtl' : 'ltr'}
            >
              <div className={`flex items-start justify-between ${isRTLMode ? 'flex-row-reverse' : ''}`}>
                <div className="flex-1">
                  <div className={`flex items-center gap-2 mb-2 ${isRTLMode ? 'flex-row-reverse' : ''}`}>
                    <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                      {suggestion.title || `${isRTLMode ? 'اقتراح' : 'Suggestion'} ${index + 1}`}
                    </span>
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full">
                      {suggestion.type || selectedType}
                    </span>
                  </div>
                  
                  {editingSuggestion?.id === suggestion.id ? (
                    <div className="space-y-3">
                      <textarea
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white resize-none"
                        rows={3}
                        dir={isRTLMode ? 'rtl' : 'ltr'}
                      />
                      <div className={`flex gap-2 ${isRTLMode ? 'flex-row-reverse' : ''}`}>
                        <button
                          onClick={handleSaveEdit}
                          className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 flex items-center gap-1"
                        >
                          <FiCheck className="w-4 h-4" />
                          {isRTLMode ? 'حفظ' : 'Save'}
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 flex items-center gap-1"
                        >
                          <FiX className="w-4 h-4" />
                          {isRTLMode ? 'إلغاء' : 'Cancel'}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {suggestion.content}
                      </p>
                      {suggestion.explanation && (
                        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                          <div className="text-xs font-medium text-blue-800 dark:text-blue-200 mb-1">
                            {isRTLMode ? 'السبب:' : 'Why this works:'}
                          </div>
                          <div className="text-sm text-blue-700 dark:text-blue-300">
                            {suggestion.explanation}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                
                <div className={`flex flex-col gap-2 ${isRTLMode ? 'mr-4' : 'ml-4'}`}>
                  <button
                    onClick={() => handleSelectSuggestion(suggestion)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                  >
                    <FiMessageCircle className="w-4 h-4" />
                    {isRTLMode ? 'استخدم هذا' : 'Use This'}
                  </button>
                  <button
                    onClick={() => handleEditSuggestion(suggestion)}
                    className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 flex items-center gap-1"
                  >
                    <FiEdit2 className="w-3 h-3" />
                    {isRTLMode ? 'تعديل' : 'Edit'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No Suggestions */}
      {!isLoading && suggestions.length === 0 && (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiMessageCircle className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            {isRTLMode ? 'لا توجد اقتراحات' : 'No suggestions available'}
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            {isRTLMode ? 'اختر نوع الرسالة لإنشاء اقتراحات' : 'Select a message type to generate suggestions'}
          </p>
        </div>
      )}
    </div>
  );
};

export default ReplySuggestions;