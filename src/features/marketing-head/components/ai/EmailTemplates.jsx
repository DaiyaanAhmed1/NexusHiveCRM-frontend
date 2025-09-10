import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalization } from '../../../../hooks/useLocalization';
import emailTemplatesService from '../../services/emailTemplatesService';
import EmailConfirmationModal from './EmailConfirmationModal';

const EmailTemplates = ({ lead, onEmailGenerated, onEmailSent }) => {
  const { t } = useTranslation();
  const { isRTLMode } = useLocalization();
  const [selectedEmailType, setSelectedEmailType] = useState('follow-up');
  const [generatedEmail, setGeneratedEmail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState({});
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [sentEmail, setSentEmail] = useState(null);

  // Generate email when lead or email type changes
  useEffect(() => {
    if (lead && selectedEmailType) {
      handleGenerateEmail();
    }
  }, [lead, selectedEmailType]);

  // Handle email generation
  const handleGenerateEmail = async () => {
    if (!lead) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const email = await emailTemplatesService.generateEmail(lead, selectedEmailType);
      setGeneratedEmail(email);
      setIsEditing(false);
      
      if (onEmailGenerated) {
        onEmailGenerated(email);
      }
    } catch (err) {
      setError(err.message);
      console.error('Error generating email:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle email type change
  const handleEmailTypeChange = (emailType) => {
    setSelectedEmailType(emailType);
    setGeneratedEmail(null);
  };

  // Handle edit mode
  const handleEdit = () => {
    setIsEditing(true);
    setEditedContent({
      subject: generatedEmail?.subject || '',
      body: generatedEmail?.body || '',
      callToAction: generatedEmail?.callToAction || ''
    });
  };

  // Handle save edit
  const handleSaveEdit = () => {
    if (generatedEmail) {
      const updatedEmail = {
        ...generatedEmail,
        ...editedContent,
        isEdited: true,
        editedAt: new Date().toISOString()
      };
      setGeneratedEmail(updatedEmail);
      setIsEditing(false);
    }
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedContent({});
  };

  // Handle send email
  const handleSendEmail = () => {
    if (generatedEmail && onEmailSent) {
      onEmailSent(generatedEmail);
      setSentEmail(generatedEmail);
      setShowConfirmation(true);
    }
  };

  // Get email types
  const emailTypes = [
    { value: 'follow-up', label: isRTLMode ? 'متابعة' : 'Follow-up' },
    { value: 'welcome', label: isRTLMode ? 'ترحيب' : 'Welcome' },
    { value: 'reminder', label: isRTLMode ? 'تذكير' : 'Reminder' },
    { value: 'promotional', label: isRTLMode ? 'ترويجي' : 'Promotional' },
    { value: 'thank-you', label: isRTLMode ? 'شكر' : 'Thank You' }
  ];

  if (!lead) {
    return (
      <div className={`text-center py-8 ${isRTLMode ? 'text-right' : 'text-left'}`}>
        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
          </svg>
        </div>
        <h3 className={`text-lg font-semibold text-gray-900 dark:text-white mb-2 ${isRTLMode ? 'text-right' : 'text-left'}`}>
          {isRTLMode ? 'اختر عميل محتمل' : 'Choose a lead'}
        </h3>
        <p className={`text-gray-500 dark:text-gray-400 ${isRTLMode ? 'text-right' : 'text-left'}`}>
          {isRTLMode ? 'لإنشاء رسائل بريد إلكتروني مخصصة' : 'to generate personalized emails'}
        </p>
      </div>
    );
  }

  return (
    <div className={`email-templates ${isRTLMode ? 'rtl' : 'ltr'}`} dir={isRTLMode ? 'rtl' : 'ltr'}>
      {/* Lead Info Header */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
        <div className={`flex items-center gap-3 ${isRTLMode ? 'flex-row-reverse' : 'flex-row'}`}>
          <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center text-lg font-semibold">
            {lead.name.charAt(0)}
          </div>
          <div>
            <h3 className={`font-semibold text-gray-900 dark:text-white ${isRTLMode ? 'text-right' : 'text-left'}`}>
              {isRTLMode ? `إنشاء رسائل بريد إلكتروني مخصصة لـ ${lead.name}` : `Generate personalized emails for ${lead.name}`}
            </h3>
            <p className={`text-sm text-gray-600 dark:text-gray-400 ${isRTLMode ? 'text-right' : 'text-left'}`}>
              {lead.location} • {lead.interest}
            </p>
          </div>
        </div>
      </div>

      {/* Email Type Selection */}
      <div className="mb-6">
        <h3 className={`text-lg font-semibold text-gray-900 dark:text-white mb-4 ${isRTLMode ? 'text-right' : 'text-left'}`}>
          {isRTLMode ? 'اختر نوع البريد الإلكتروني:' : 'Select Email Type:'}
        </h3>
        <div className={`flex flex-wrap gap-2 ${isRTLMode ? 'justify-end' : 'justify-start'}`}>
          {emailTypes.map((type) => (
            <button
              key={type.value}
              onClick={() => handleEmailTypeChange(type.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedEmailType === type.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* Generated Email */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        {isLoading ? (
          <div className="p-8 text-center">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h3 className={`text-lg font-semibold text-gray-900 dark:text-white mb-2 ${isRTLMode ? 'text-right' : 'text-left'}`}>
              {isRTLMode ? `جاري إنشاء محتوى مخصص لـ ${lead.name}` : `Generating personalized content for ${lead.name}`}
            </h3>
            <p className={`text-gray-500 dark:text-gray-400 ${isRTLMode ? 'text-right' : 'text-left'}`}>
              {isRTLMode ? 'يرجى الانتظار...' : 'Please wait...'}
            </p>
          </div>
        ) : error ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className={`text-lg font-semibold text-gray-900 dark:text-white mb-2 ${isRTLMode ? 'text-right' : 'text-left'}`}>
              {isRTLMode ? 'خطأ في الإنشاء' : 'Generation Error'}
            </h3>
            <p className={`text-gray-500 dark:text-gray-400 mb-4 ${isRTLMode ? 'text-right' : 'text-left'}`}>
              {error}
            </p>
            <button
              onClick={handleGenerateEmail}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
              {isRTLMode ? 'إعادة المحاولة' : 'Retry'}
            </button>
          </div>
        ) : generatedEmail ? (
          <div className="p-6">
            {/* Email Header */}
            <div className={`flex items-center justify-between mb-6 ${isRTLMode ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`flex items-center gap-3 ${isRTLMode ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {generatedEmail.wordCount} {isRTLMode ? 'كلمة' : 'words'}
                </div>
                <div className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                <div className={`text-sm ${generatedEmail.isPersonalized ? 'text-green-600 dark:text-green-400' : 'text-blue-600 dark:text-blue-400'}`}>
                  {generatedEmail.isPersonalized ? (isRTLMode ? 'منتج بالذكاء الاصطناعي' : 'AI Generated') : (isRTLMode ? 'قالب' : 'Template')}
                </div>
              </div>
              <div className={`flex gap-2 ${isRTLMode ? 'flex-row-reverse' : 'flex-row'}`}>
                {isEditing ? (
                  <>
                    <button
                      onClick={handleSaveEdit}
                      className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white text-sm rounded-lg transition-colors"
                    >
                      {isRTLMode ? 'حفظ' : 'Save'}
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="px-3 py-1 bg-gray-500 hover:bg-gray-600 text-white text-sm rounded-lg transition-colors"
                    >
                      {isRTLMode ? 'إلغاء' : 'Cancel'}
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleEdit}
                    className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-lg transition-colors"
                  >
                    {isRTLMode ? 'تحرير' : 'Edit'}
                  </button>
                )}
              </div>
            </div>

            {/* Subject Line */}
            <div className="mb-6">
              <label className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ${isRTLMode ? 'text-right' : 'text-left'}`}>
                {isRTLMode ? 'الموضوع:' : 'Subject:'}
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedContent.subject}
                  onChange={(e) => setEditedContent({...editedContent, subject: e.target.value})}
                  className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${isRTLMode ? 'text-right' : 'text-left'}`}
                />
              ) : (
                <div className={`bg-gray-50 dark:bg-gray-700 rounded-lg p-3 ${isRTLMode ? 'text-right' : 'text-left'}`}>
                  <p className="font-medium text-gray-900 dark:text-white">{generatedEmail.subject}</p>
                </div>
              )}
            </div>

            {/* Email Content */}
            <div className="mb-6">
              <label className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ${isRTLMode ? 'text-right' : 'text-left'}`}>
                {isRTLMode ? 'محتوى البريد الإلكتروني:' : 'Email Content:'}
              </label>
              {isEditing ? (
                <textarea
                  value={editedContent.body}
                  onChange={(e) => setEditedContent({...editedContent, body: e.target.value})}
                  rows={8}
                  className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${isRTLMode ? 'text-right' : 'text-left'}`}
                />
              ) : (
                <div className={`bg-gray-50 dark:bg-gray-700 rounded-lg p-4 ${isRTLMode ? 'text-right' : 'text-left'}`}>
                  <div className="space-y-3 text-gray-900 dark:text-white">
                    <p>{generatedEmail.greeting}</p>
                    <p>{generatedEmail.body}</p>
                    <p>{generatedEmail.callToAction}</p>
                    <p>{generatedEmail.closing}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{generatedEmail.signature}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Call to Action */}
            {generatedEmail.callToAction && (
              <div className="mb-6">
                <label className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ${isRTLMode ? 'text-right' : 'text-left'}`}>
                  {isRTLMode ? 'دعوة للعمل:' : 'Call to Action:'}
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedContent.callToAction}
                    onChange={(e) => setEditedContent({...editedContent, callToAction: e.target.value})}
                    className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${isRTLMode ? 'text-right' : 'text-left'}`}
                  />
                ) : (
                  <div className={`bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 ${isRTLMode ? 'text-right' : 'text-left'}`}>
                    <p className="font-medium text-blue-900 dark:text-blue-100">{generatedEmail.callToAction}</p>
                  </div>
                )}
              </div>
            )}

            {/* Personalization Info */}
            {generatedEmail.personalization && (
              <div className="mb-6">
                <div className={`bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3 ${isRTLMode ? 'text-right' : 'text-left'}`}>
                  <p className="text-sm text-green-800 dark:text-green-200">
                    <strong>{isRTLMode ? 'مخصص لـ:' : 'Personalized for:'}</strong> {generatedEmail.personalization}
                  </p>
                </div>
              </div>
            )}

            {/* Send Button */}
            <div className={`flex justify-end ${isRTLMode ? 'justify-start' : 'justify-end'}`}>
              <button
                onClick={handleSendEmail}
                className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors"
              >
                {isRTLMode ? 'إرسال البريد الإلكتروني' : 'Send Email'}
              </button>
            </div>
          </div>
        ) : (
          <div className={`text-center py-8 ${isRTLMode ? 'text-right' : 'text-left'}`}>
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className={`text-lg font-semibold text-gray-900 dark:text-white mb-2 ${isRTLMode ? 'text-right' : 'text-left'}`}>
              {isRTLMode ? 'جاهز للإنشاء' : 'Ready to Generate'}
            </h3>
            <p className={`text-gray-500 dark:text-gray-400 ${isRTLMode ? 'text-right' : 'text-left'}`}>
              {isRTLMode ? 'اختر نوع البريد الإلكتروني لبدء الإنشاء' : 'Select an email type to start generating'}
            </p>
          </div>
        )}
      </div>

      {/* Email Confirmation Modal */}
      <EmailConfirmationModal
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        email={sentEmail}
        type="success"
      />
    </div>
  );
};

export default EmailTemplates;