import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalization } from '../../../../hooks/useLocalization';

const EmailConfirmationModal = ({ isOpen, onClose, email, type = 'success' }) => {
  const { t } = useTranslation();
  const { isRTLMode } = useLocalization();

  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return (
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
        );
      case 'error':
        return (
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  const getTitle = () => {
    switch (type) {
      case 'success':
        return 'Email Sent Successfully!';
      case 'error':
        return 'Failed to Send Email';
      default:
        return 'Confirmation';
    }
  };

  const getTitleColor = () => {
    switch (type) {
      case 'success':
        return 'text-green-800 dark:text-green-200';
      case 'error':
        return 'text-red-800 dark:text-red-200';
      default:
        return 'text-gray-800 dark:text-gray-200';
    }
  };

  const getEmailTypeDisplayName = (emailType) => {
    const names = {
      'follow-up': 'Follow-up Email',
      'program-introduction': 'Program Introduction',
      'event-invitation': 'Event Invitation',
      'application-reminder': 'Application Reminder',
      'welcome': 'Welcome Email'
    };
    return names[emailType] || emailType;
  };

  const getEmailTypeColor = (emailType) => {
    const colors = {
      'follow-up': 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
      'program-introduction': 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400',
      'event-invitation': 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
      'application-reminder': 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400',
      'welcome': 'bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-400'
    };
    return colors[emailType] || 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-400';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full">
        {/* Modal Content */}
        <div className="p-8 text-center">
          {getIcon()}
          
          <h3 className={`text-xl font-semibold mb-2 ${getTitleColor()}`}>
            {getTitle()}
          </h3>
          
          <div className="mb-6">
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Email sent to <span className="font-semibold text-gray-900 dark:text-white">{email?.leadName}</span>
            </p>
            
            {/* Email Type Badge */}
            <div className="mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getEmailTypeColor(email?.emailType)}`}>
                {getEmailTypeDisplayName(email?.emailType)}
              </span>
            </div>

            {/* Subject Line */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border-l-4 border-blue-500 mb-4">
              <p className="text-sm text-gray-700 dark:text-gray-300 font-medium mb-1">
                Subject:
              </p>
              <p className="text-sm text-gray-800 dark:text-gray-200 italic">
                "{email?.subject}"
              </p>
            </div>

            {/* Email Preview */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800 mb-4">
              <p className="text-sm text-blue-800 dark:text-blue-200 mb-2">
                <strong>Email Preview:</strong>
              </p>
              <div className="text-sm text-blue-700 dark:text-blue-300 text-left max-h-32 overflow-y-auto">
                <p className="mb-2">{email?.greeting}</p>
                <p className="mb-2">{email?.body?.substring(0, 150)}...</p>
                <p className="mb-2"><strong>Call to Action:</strong> {email?.callToAction}</p>
                <p className="text-xs text-blue-600 dark:text-blue-400">
                  {email?.closing}<br />
                  {email?.signature}
                </p>
              </div>
            </div>

            {/* Email Details */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-400">Type:</span>
                </div>
                <p className="font-medium text-gray-900 dark:text-white">
                  {getEmailTypeDisplayName(email?.emailType)}
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2" />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-400">Words:</span>
                </div>
                <p className="font-medium text-gray-900 dark:text-white">
                  {email?.wordCount} words
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-400">Sent:</span>
                </div>
                <p className="font-medium text-gray-900 dark:text-white">
                  {new Date().toLocaleTimeString()}
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-400">Status:</span>
                </div>
                <p className="font-medium text-green-600 dark:text-green-400">
                  Delivered
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
              }}
              className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors"
            >
              Send Another
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailConfirmationModal;