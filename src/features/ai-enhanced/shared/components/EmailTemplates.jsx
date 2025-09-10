import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalization } from '../../../../hooks/useLocalization';
import emailTemplatesService from '../services/emailTemplatesService';
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

  // Handle close confirmation
  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
    setSentEmail(null);
  };

  // Get email types
  const emailTypes = emailTemplatesService.getEmailTypes();

  if (!lead) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Select a Lead
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Choose a lead to generate personalized emails
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Smart Email Templates
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
              Generate personalized emails for {lead.name}
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={handleGenerateEmail}
              disabled={isLoading}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white rounded-lg transition-colors text-sm"
            >
              {isLoading ? 'Generating...' : 'Refresh Email'}
            </button>
          </div>
        </div>
      </div>

      {/* Email Type Selection */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 block">
            Select Email Type:
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {emailTypes.map((emailType) => (
              <button
                key={emailType}
                onClick={() => handleEmailTypeChange(emailType)}
                className={`p-3 rounded-lg border text-left transition-colors ${
                  selectedEmailType === emailType
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300'
                }`}
              >
                <div className="font-medium text-sm">
                  {emailTemplatesService.getEmailTypeDisplayName(emailType)}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {emailTemplatesService.getEmailTypeDescription(emailType)}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Generated Email */}
      <div className="p-6">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                AI is crafting your email...
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Generating personalized content for {lead.name}
              </p>
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Email Generation Failed
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              {error}
            </p>
            <button
              onClick={handleGenerateEmail}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : generatedEmail ? (
          <div className="space-y-6">
            {/* Email Preview */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Email Preview
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {generatedEmail.wordCount} words
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    generatedEmail.isPersonalized 
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                      : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                  }`}>
                    {generatedEmail.isPersonalized ? 'AI Generated' : 'Template'}
                  </span>
                </div>
              </div>

              {/* Subject Line */}
              <div className="mb-4">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                  Subject:
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedContent.subject}
                    onChange={(e) => setEditedContent({...editedContent, subject: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                ) : (
                  <div className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg">
                    {generatedEmail.subject}
                  </div>
                )}
              </div>

              {/* Email Body */}
              <div className="mb-4">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                  Email Content:
                </label>
                {isEditing ? (
                  <textarea
                    value={editedContent.body}
                    onChange={(e) => setEditedContent({...editedContent, body: e.target.value})}
                    rows={8}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                ) : (
                  <div className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg whitespace-pre-line">
                    {generatedEmail.greeting}
                    
                    {generatedEmail.body}
                    
                    {generatedEmail.callToAction}
                    
                    {generatedEmail.closing}
                    {generatedEmail.signature}
                  </div>
                )}
              </div>

              {/* Call to Action */}
              {generatedEmail.callToAction && (
                <div className="mb-4">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    Call to Action:
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedContent.callToAction}
                      onChange={(e) => setEditedContent({...editedContent, callToAction: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  ) : (
                    <div className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg">
                      {generatedEmail.callToAction}
                    </div>
                  )}
                </div>
              )}

              {/* Personalization Info */}
              <div className="text-xs text-gray-500 dark:text-gray-400">
                <strong>Personalized for:</strong> {generatedEmail.personalization}
                <br />
                <strong>Tone:</strong> {generatedEmail.tone}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleSaveEdit}
                      className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleEdit}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                  >
                    Edit Email
                  </button>
                )}
              </div>

              <button
                onClick={handleSendEmail}
                className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors font-medium"
              >
                Send Email
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Ready to Generate
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Select an email type to generate personalized content
            </p>
          </div>
        )}
      </div>

      {/* Email Confirmation Modal */}
      <EmailConfirmationModal
        isOpen={showConfirmation}
        onClose={handleCloseConfirmation}
        email={sentEmail}
        type="success"
      />
    </div>
  );
};

export default EmailTemplates;