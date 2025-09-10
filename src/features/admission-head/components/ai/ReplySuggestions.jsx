import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalization } from '../../../../hooks/useLocalization';
import replySuggestionsService from "../../services/replySuggestionsService.js";

// Custom Popup Component
const ConfirmationPopup = ({ isOpen, onClose, suggestion, isRTLMode }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-4 animate-fade-in">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {isRTLMode ? 'تم اختيار الاقتراح بنجاح!' : 'Suggestion Selected Successfully!'}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {isRTLMode ? 'تم نسخ الاقتراح إلى الحافظة' : 'Suggestion copied to clipboard'}
              </p>
            </div>
          </div>

          {/* Selected Suggestion Preview */}
          {suggestion && (
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 mb-4">
              <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">
                {suggestion.title}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                {suggestion.content.substring(0, 100)}...
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
            >
              {isRTLMode ? 'موافق' : 'OK'}
            </button>
            <button
              onClick={() => {
                // Copy to clipboard functionality
                if (suggestion) {
                  navigator.clipboard.writeText(suggestion.content);
                }
                onClose();
              }}
              className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
            >
              {isRTLMode ? 'نسخ' : 'Copy'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ReplySuggestions = ({ leadContext, onSelectSuggestion, className = '' }) => {
  const { t } = useTranslation();
  const { isRTLMode } = useLocalization();
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedType, setSelectedType] = useState('follow-up');
  const [editingSuggestion, setEditingSuggestion] = useState(null);
  const [editText, setEditText] = useState('');
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);

  const messageTypes = [
    { id: 'follow-up', label: 'Follow-up', icon: '📞', description: 'Continue the conversation' },
    { id: 'welcome', label: 'Welcome', icon: '👋', description: 'First contact message' },
    { id: 'reminder', label: 'Reminder', icon: '⏰', description: 'Follow up on previous contact' },
    { id: 'closing', label: 'Closing', icon: '🤝', description: 'Final decision message' }
  ];


  // Dummy suggestions data
  const getDummySuggestions = (messageType, leadName = 'Student') => {
    const suggestions = {
      'follow-up': [
        {
          id: 'follow-up-1',
          title: isRTLMode ? 'متابعة مهذبة' : 'Polite Follow-up',
          content: isRTLMode 
            ? `مرحباً ${leadName}،\n\nأتمنى أن تكون بخير. أردت أن أتابع معك بخصوص استفسارك عن برنامجنا الأكاديمي.\n\nهل لديك أي أسئلة إضافية أو تحتاج إلى مزيد من المعلومات؟\n\nنتطلع لسماع منك قريباً.\n\nمع أطيب التحيات،\nفريق القبول`
            : `Hi ${leadName},\n\nI hope you're doing well. I wanted to follow up with you regarding your inquiry about our academic program.\n\nDo you have any additional questions or need more information?\n\nLooking forward to hearing from you soon.\n\nBest regards,\nAdmissions Team`,
          explanation: isRTLMode 
            ? 'هذه الرسالة مهذبة ومهنية، تظهر الاهتمام بالعميل وتشجعه على التواصل'
            : 'This message is polite and professional, shows interest in the client and encourages communication'
        },
        {
          id: 'follow-up-2',
          title: isRTLMode ? 'متابعة مع معلومات إضافية' : 'Follow-up with Additional Info',
          content: isRTLMode 
            ? `عزيزي/عزيزتي ${leadName}،\n\nشكراً لك على اهتمامك ببرنامجنا. أردت أن أشارك معك بعض المعلومات الإضافية التي قد تكون مفيدة:\n\n• مواعيد التقديم القادمة\n• المنح الدراسية المتاحة\n• جولة افتراضية في الحرم الجامعي\n\nهل تود تحديد موعد للحديث أكثر؟\n\nمع أطيب التحيات`
            : `Dear ${leadName},\n\nThank you for your interest in our program. I wanted to share some additional information that might be helpful:\n\n• Upcoming application deadlines\n• Available scholarships\n• Virtual campus tour\n\nWould you like to schedule a time to discuss further?\n\nBest regards`,
          explanation: isRTLMode 
            ? 'توفر هذه الرسالة قيمة إضافية للعميل مع دعوة واضحة للعمل'
            : 'This message provides additional value to the client with a clear call to action'
        }
      ],
      'welcome': [
        {
          id: 'welcome-1',
          title: isRTLMode ? 'ترحيب دافئ' : 'Warm Welcome',
          content: isRTLMode 
            ? `مرحباً ${leadName}،\n\nأهلاً وسهلاً بك في مجتمعنا الأكاديمي! نحن سعداء جداً لاهتمامك ببرنامجنا.\n\nفريقنا متاح لمساعدتك في كل خطوة من رحلتك الأكاديمية. لا تتردد في التواصل معنا في أي وقت.\n\nنتطلع لرؤيتك جزءاً من عائلتنا الأكاديمية.\n\nمع أطيب التحيات،\nفريق القبول`
            : `Hello ${leadName},\n\nWelcome to our academic community! We're thrilled that you're interested in our program.\n\nOur team is here to help you every step of the way in your academic journey. Feel free to reach out to us anytime.\n\nWe look forward to having you as part of our academic family.\n\nBest regards,\nAdmissions Team`,
          explanation: isRTLMode 
            ? 'رسالة ترحيب دافئة ومشجعة تخلق انطباعاً إيجابياً أولياً'
            : 'A warm and encouraging welcome message that creates a positive first impression'
        },
        {
          id: 'welcome-2',
          title: isRTLMode ? 'ترحيب مع معلومات أساسية' : 'Welcome with Basic Info',
          content: isRTLMode 
            ? `عزيزي/عزيزتي ${leadName}،\n\nمرحباً بك في جامعةنا! شكراً لك على اهتمامك ببرنامجنا الأكاديمي.\n\nفيما يلي بعض المعلومات الأساسية:\n\n• متطلبات القبول\n• الرسوم الدراسية\n• الخدمات الطلابية\n• الحياة في الحرم الجامعي\n\nهل تود معرفة المزيد عن أي من هذه النقاط؟\n\nمع أطيب التحيات`
            : `Dear ${leadName},\n\nWelcome to our university! Thank you for your interest in our academic program.\n\nHere are some basic information:\n\n• Admission requirements\n• Tuition fees\n• Student services\n• Campus life\n\nWould you like to know more about any of these points?\n\nBest regards`,
          explanation: isRTLMode 
            ? 'ترحيب شامل مع معلومات مفيدة للبداية'
            : 'Comprehensive welcome with useful information to get started'
        }
      ],
      'reminder': [
        {
          id: 'reminder-1',
          title: isRTLMode ? 'تذكير لطيف' : 'Gentle Reminder',
          content: isRTLMode 
            ? `عزيزي/عزيزتي ${leadName}،\n\nأتمنى أن تكون بخير. أردت أن أذكرك بأن موعد التقديم لبرنامجنا يقترب.\n\nإذا كنت بحاجة إلى أي مساعدة في إكمال طلبك، فنحن هنا لمساعدتك.\n\nلا تتردد في التواصل معنا إذا كان لديك أي أسئلة.\n\nمع أطيب التحيات،\nفريق القبول`
            : `Dear ${leadName},\n\nI hope you're doing well. I wanted to remind you that our program application deadline is approaching.\n\nIf you need any help completing your application, we're here to assist you.\n\nDon't hesitate to contact us if you have any questions.\n\nBest regards,\nAdmissions Team`,
          explanation: isRTLMode 
            ? 'تذكير مهذب ومفيد دون إلحاح مفرط'
            : 'Polite and helpful reminder without being overly pushy'
        },
        {
          id: 'reminder-2',
          title: isRTLMode ? 'تذكير مع تفاصيل' : 'Detailed Reminder',
          content: isRTLMode 
            ? `مرحباً ${leadName}،\n\nأردت أن أذكرك بأن موعد التقديم النهائي هو [التاريخ].\n\nلإكمال طلبك، ستحتاج إلى:\n• نسخة من الشهادة\n• خطاب التوصية\n• السيرة الذاتية\n• رسالة الدافع\n\nهل تحتاج إلى مساعدة في أي من هذه المستندات؟\n\nمع أطيب التحيات`
            : `Hello ${leadName},\n\nI wanted to remind you that the final application deadline is [Date].\n\nTo complete your application, you'll need:\n• Copy of certificate\n• Recommendation letter\n• CV\n• Motivation letter\n\nDo you need help with any of these documents?\n\nBest regards`,
          explanation: isRTLMode 
            ? 'تذكير مفصل مع قائمة واضحة بالمتطلبات'
            : 'Detailed reminder with clear list of requirements'
        }
      ],
      'closing': [
        {
          id: 'closing-1',
          title: isRTLMode ? 'إنهاء مهذب' : 'Polite Closing',
          content: isRTLMode 
            ? `عزيزي/عزيزتي ${leadName}،\n\nشكراً لك على وقتك واهتمامك ببرنامجنا.\n\nنحن نقدر اهتمامك ونتمنى لك التوفيق في رحلتك الأكاديمية.\n\nإذا قررت التقديم في المستقبل، سنكون سعداء لمساعدتك.\n\nمع أطيب التحيات،\nفريق القبول`
            : `Dear ${leadName},\n\nThank you for your time and interest in our program.\n\nWe appreciate your interest and wish you success in your academic journey.\n\nIf you decide to apply in the future, we'll be happy to help you.\n\nBest regards,\nAdmissions Team`,
          explanation: isRTLMode 
            ? 'إنهاء مهذب يترك الباب مفتوحاً للتواصل المستقبلي'
            : 'Polite closing that leaves the door open for future communication'
        },
        {
          id: 'closing-2',
          title: isRTLMode ? 'إنهاء مع دعوة' : 'Closing with Invitation',
          content: isRTLMode 
            ? `مرحباً ${leadName}،\n\nشكراً لك على التواصل معنا. نحن نقدر اهتمامك ببرنامجنا.\n\nنود أن ندعوك لحضور فعالياتنا القادمة أو جولات الحرم الجامعي.\n\nتابعنا على وسائل التواصل الاجتماعي للحصول على آخر الأخبار.\n\nمع أطيب التحيات،\nفريق القبول`
            : `Hello ${leadName},\n\nThank you for reaching out to us. We appreciate your interest in our program.\n\nWe'd like to invite you to our upcoming events or campus tours.\n\nFollow us on social media for the latest news.\n\nBest regards,\nAdmissions Team`,
          explanation: isRTLMode 
            ? 'إنهاء إيجابي مع دعوة للمشاركة في الأنشطة'
            : 'Positive closing with invitation to participate in activities'
        }
      ]
    };

    return suggestions[messageType] || suggestions['follow-up'];
  };

  const handleGenerateSuggestions = async (messageType) => {
    setIsLoading(true);
    setSelectedType(messageType);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // Use dummy data instead of real AI service
      const dummySuggestions = getDummySuggestions(messageType, leadContext?.name || 'Student');
      setSuggestions(dummySuggestions);
      
    } catch (error) {
      console.error('Error generating suggestions:', error);
      setSuggestions(getDummySuggestions(messageType, leadContext?.name || 'Student'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectSuggestion = async (suggestion) => {
    setSelectedSuggestion(suggestion);
    setShowConfirmationPopup(true);
    
    // Call the parent callback
    if (onSelectSuggestion) {
      onSelectSuggestion(suggestion);
    }
    
    // Add to history for tracking
    try {
      replySuggestionsService.addToHistory(suggestion);
    } catch (error) {
      console.log('History service unavailable');
    }
  };

  const handleClosePopup = () => {
    setShowConfirmationPopup(false);
    setSelectedSuggestion(null);
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
      {/* Custom Confirmation Popup */}
      <ConfirmationPopup
        isOpen={showConfirmationPopup}
        onClose={handleClosePopup}
        suggestion={selectedSuggestion}
        isRTLMode={isRTLMode}
      />

      {/* Lead Context Display */}
      {leadContext && (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
              {leadContext.name?.charAt(0) || 'L'}
            </div>
            <div>
              <h3 className="font-medium text-gray-800 dark:text-gray-200">{leadContext.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {leadContext.program} • {leadContext.status}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Message Type Buttons */}
      <div className="mb-6">
        <h3 className={`text-lg font-semibold text-gray-900 dark:text-white mb-4 ${isRTLMode ? 'text-right' : 'text-left'}`}>
          {isRTLMode ? 'اختر نوع الرسالة' : 'Choose Message Type'}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {messageTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => handleGenerateSuggestions(type.id)}
              disabled={isLoading}
              className={`p-3 rounded-lg border transition-all duration-200 text-left ${
                selectedType === type.id
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300'
              } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">{type.icon}</span>
                <span className="font-medium text-sm">{type.label}</span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">{type.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-8">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            {isRTLMode ? 'جاري إنشاء الاقتراحات...' : 'Generating Suggestions...'}
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            {isRTLMode ? 'تحليل سياق العميل وإنشاء ردود مخصصة' : 'Analyzing lead context and creating personalized responses'}
          </p>
        </div>
      )}

      {/* Suggestions */}
      {suggestions.length > 0 && !isLoading && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className={`text-lg font-semibold text-gray-900 dark:text-white ${isRTLMode ? 'text-right' : 'text-left'}`}>
              {isRTLMode ? 'اقتراحات الذكاء الاصطناعي' : 'AI-Generated Suggestions'}
            </h4>
            <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-xs rounded-full">
              {suggestions.length} {isRTLMode ? 'اقتراح' : 'suggestions'}
            </span>
          </div>
          
          {suggestions.map((suggestion, index) => (
            <div 
              key={suggestion.id}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                    {index + 1}
                  </div>
                  <h5 className="font-medium text-gray-900 dark:text-white">
                    {suggestion.title}
                  </h5>
                </div>
              </div>
              
              {/* Message Content */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 mb-3">
                {editingSuggestion?.id === suggestion.id ? (
                  <div>
                    <textarea
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none text-sm"
                      rows="4"
                      placeholder={isRTLMode ? 'عدّل رسالتك...' : 'Edit your message...'}
                    />
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={handleSaveEdit}
                        className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white text-xs rounded transition-colors"
                      >
                        {isRTLMode ? 'حفظ' : 'Save'}
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="px-3 py-1 bg-gray-500 hover:bg-gray-600 text-white text-xs rounded transition-colors"
                      >
                        {isRTLMode ? 'إلغاء' : 'Cancel'}
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed whitespace-pre-line">
                    {suggestion.content}
                  </p>
                )}
              </div>
              
              {/* AI Explanation */}
              {suggestion.explanation && (
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 mb-3">
                  <div className="flex items-start gap-2">
                    <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <circle cx="6" cy="6" r="2" />
                        <circle cx="18" cy="6" r="2" />
                        <circle cx="6" cy="18" r="2" />
                        <circle cx="18" cy="18" r="2" />
                        <rect x="10" y="10" width="4" height="4" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-xs font-medium text-blue-800 dark:text-blue-200 mb-1">
                        {isRTLMode ? 'لماذا يعمل هذا:' : 'Why this works:'}
                      </div>
                      <div className="text-xs text-blue-700 dark:text-blue-300">
                        {suggestion.explanation}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Action Buttons */}
              <div className="flex gap-2">
                <button 
                  onClick={() => handleSelectSuggestion(suggestion)}
                  className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded transition-colors text-sm flex items-center justify-center gap-1"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  {isRTLMode ? 'استخدم هذا الاقتراح' : 'Use This Suggestion'}
                </button>
                <button 
                  onClick={() => handleEditSuggestion(suggestion)}
                  className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white font-medium rounded transition-colors text-sm flex items-center gap-1"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  {isRTLMode ? 'تعديل' : 'Edit'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No Suggestions */}
      {suggestions.length === 0 && !isLoading && (
        <div className="text-center py-8">
          <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            {isRTLMode ? 'جاهز لإنشاء الاقتراحات' : 'Ready to Generate Suggestions'}
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            {isRTLMode ? 'اختر نوع الرسالة أعلاه للحصول على اقتراحات رد مدعومة بالذكاء الاصطناعي' : 'Choose a message type above to get AI-powered reply suggestions'}
          </p>
        </div>
      )}
    </div>
  );
};

export default ReplySuggestions;