import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalization } from '../../../../hooks/useLocalization';
import emailTemplatesService from "../../services/emailTemplatesService.js";
import EmailConfirmationModal from './EmailConfirmationModal';

const EmailTemplates = ({ lead, onEmailGenerated, onEmailSent, useDummyData = false, dummyTemplates = [] }) => {
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
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isSending, setIsSending] = useState(false);

  // Generate email when lead or email type changes
  useEffect(() => {
    if (lead && selectedEmailType) {
      handleGenerateEmail();
    }
  }, [lead, selectedEmailType]);

  // Handle email generation - Updated to use dummy data when flag is set
  const handleGenerateEmail = async () => {
    if (!lead) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      let email;
      
      if (useDummyData && dummyTemplates.length > 0) {
        // Use dummy data instead of real AI service
        const dummyTemplate = dummyTemplates.find(t => t.emailType === selectedEmailType) || dummyTemplates[0];
        email = {
          ...dummyTemplate,
          leadId: lead.id || 'unknown',
          leadName: lead.name,
          emailType: selectedEmailType,
          generatedAt: new Date().toISOString(),
          isPersonalized: true
        };
        
        // Simulate loading delay for better UX
        await new Promise(resolve => setTimeout(resolve, 800));
      } else {
        // Use real AI service
        email = await emailTemplatesService.generateEmail(lead, selectedEmailType);
      }
      
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
    if (!generatedEmail) return;
    
    setIsEditing(true);
    setEditedContent({
      subject: generatedEmail.subject || '',
      body: generatedEmail.body || '',
      callToAction: generatedEmail.callToAction || ''
    });
  };

  // Handle save edit
  const handleSaveEdit = () => {
    if (generatedEmail) {
      const updatedEmail = {
        ...generatedEmail,
        subject: editedContent.subject,
        body: editedContent.body,
        callToAction: editedContent.callToAction,
        isEdited: true,
        editedAt: new Date().toISOString()
      };
      setGeneratedEmail(updatedEmail);
      setIsEditing(false);
      setEditedContent({});
    }
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedContent({});
  };

  // Handle send email - Fixed with proper functionality
  const handleSendEmail = async () => {
    if (!generatedEmail) return;
    
    setIsSending(true);
    
    try {
      // Simulate sending delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show success message
      setShowSuccessMessage(true);
      
      // Call the parent callback
      if (onEmailSent) {
        onEmailSent(generatedEmail);
      }
      
      // Set sent email for confirmation modal
      setSentEmail(generatedEmail);
      setShowConfirmation(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
      
    } catch (err) {
      setError(err.message || 'Failed to send email');
    } finally {
      setIsSending(false);
    }
  };

  // Handle close confirmation
  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
    setSentEmail(null);
  };

  // Get email types
  const emailTypes = useDummyData 
    ? ['follow-up', 'program-introduction', 'event-invitation', 'application-reminder', 'welcome']
    : emailTemplatesService.getEmailTypes();

  return (
    <div className={`space-y-6 ${isRTLMode ? 'text-right' : 'text-left'}`}>
      {/* Success Message */}
      {showSuccessMessage && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 animate-fade-in">
          <div className="flex items-center gap-2 text-green-700 dark:text-green-300">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">
              {isRTLMode ? 'تم إرسال البريد الإلكتروني بنجاح!' : 'Email sent successfully!'}
            </span>
          </div>
        </div>
      )}

      {/* Email Type Selection */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
        <h3 className={`text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200 ${isRTLMode ? 'text-right' : 'text-left'}`}>
          {isRTLMode ? 'نوع البريد الإلكتروني' : 'Email Type'}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {emailTypes.map((type) => (
            <button
              key={type}
              onClick={() => handleEmailTypeChange(type)}
              className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                selectedEmailType === type
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300'
              }`}
            >
              <div className="font-medium">
                {useDummyData 
                  ? (type === 'follow-up' ? 'Follow-up' : 
                     type === 'program-introduction' ? 'Program Introduction' :
                     type === 'event-invitation' ? 'Event Invitation' :
                     type === 'application-reminder' ? 'Application Reminder' :
                     'Welcome')
                  : emailTemplatesService.getEmailTypeDisplayName(type)
                }
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {useDummyData 
                  ? (type === 'follow-up' ? 'Follow up after contact' :
                     type === 'program-introduction' ? 'Introduce programs' :
                     type === 'event-invitation' ? 'Invite to events' :
                     type === 'application-reminder' ? 'Remind about deadlines' :
                     'Welcome new leads')
                  : emailTemplatesService.getEmailTypeDescription(type)
                }
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Generate Button */}
      <div className="flex justify-center">
        <button
          onClick={handleGenerateEmail}
          disabled={isLoading || !lead}
          className={`px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg font-semibold transition-colors duration-200 flex items-center gap-2 ${
            isRTLMode ? 'flex-row-reverse' : ''
          }`}
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              {isRTLMode ? 'جاري الإنشاء...' : 'Generating...'}
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              {isRTLMode ? 'إنشاء بريد إلكتروني' : 'Generate Email'}
            </>
          )}
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="flex items-center gap-2 text-red-700 dark:text-red-300">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">{isRTLMode ? 'خطأ' : 'Error'}:</span>
            <span>{error}</span>
          </div>
        </div>
      )}

      {/* Generated Email Display */}
      {generatedEmail && (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              {isRTLMode ? 'البريد الإلكتروني المُنشأ' : 'Generated Email'}
            </h3>
            <div className="flex gap-2">
              <button
                onClick={handleEdit}
                disabled={isEditing}
                className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isRTLMode ? 'تعديل' : 'Edit'}
              </button>
              <button
                onClick={handleSendEmail}
                disabled={isSending}
                className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
              >
                {isSending ? (
                  <>
                    <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                    {isRTLMode ? 'جاري الإرسال...' : 'Sending...'}
                  </>
                ) : (
                  <>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    {isRTLMode ? 'إرسال' : 'Send'}
                  </>
                )}
              </button>
            </div>
          </div>

          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {isRTLMode ? 'الموضوع' : 'Subject'}
                </label>
                <input
                  type="text"
                  value={editedContent.subject}
                  onChange={(e) => setEditedContent({...editedContent, subject: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {isRTLMode ? 'المحتوى' : 'Content'}
                </label>
                <textarea
                  value={editedContent.body}
                  onChange={(e) => setEditedContent({...editedContent, body: e.target.value})}
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {isRTLMode ? 'دعوة للعمل' : 'Call to Action'}
                </label>
                <input
                  type="text"
                  value={editedContent.callToAction}
                  onChange={(e) => setEditedContent({...editedContent, callToAction: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleSaveEdit}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {isRTLMode ? 'حفظ' : 'Save'}
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
                >
                  {isRTLMode ? 'إلغاء' : 'Cancel'}
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">
                  {isRTLMode ? 'الموضوع' : 'Subject'}: {generatedEmail.subject}
                </h4>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="space-y-2 text-gray-700 dark:text-gray-300">
                  <p>{generatedEmail.greeting}</p>
                  <div className="whitespace-pre-line">{generatedEmail.body}</div>
                  <p className="font-medium">{generatedEmail.callToAction}</p>
                  <p>{generatedEmail.closing}</p>
                  <p>{generatedEmail.signature}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 text-sm text-gray-500 dark:text-gray-400">
                <span>{isRTLMode ? 'الكلمات' : 'Words'}: {generatedEmail.wordCount}</span>
                <span>•</span>
                <span>{isRTLMode ? 'النبرة' : 'Tone'}: {generatedEmail.tone}</span>
                <span>•</span>
                <span>{isRTLMode ? 'التخصيص' : 'Personalization'}: {generatedEmail.personalization}</span>
                {generatedEmail.isEdited && (
                  <>
                    <span>•</span>
                    <span className="text-blue-600 dark:text-blue-400">{isRTLMode ? 'مُعدّل' : 'Edited'}</span>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Email Confirmation Modal */}
      {showConfirmation && sentEmail && (
        <EmailConfirmationModal
          email={sentEmail}
          onClose={handleCloseConfirmation}
        />
      )}
    </div>
  );
};

export default EmailTemplates;