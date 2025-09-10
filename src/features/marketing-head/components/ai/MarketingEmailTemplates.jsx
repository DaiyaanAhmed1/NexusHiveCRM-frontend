import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalization } from '../../../../hooks/useLocalization';
import EmailTemplates from './EmailTemplates';
import EmailConfirmationModal from './EmailConfirmationModal';

const MarketingEmailTemplates = ({ onEmailSent }) => {
  const { t } = useTranslation();
  const { isRTLMode } = useLocalization();
  const [selectedLead, setSelectedLead] = useState(null);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [sentEmail, setSentEmail] = useState(null);
  
  // Sample leads data - in real implementation, this would come from props/API
  const sampleLeads = [
    {
      id: 1,
      name: 'Ahmed Al-Rashid',
      location: 'Riyadh',
      interest: 'Computer Science',
      engagement: 'High',
      lastContact: '2024-01-15',
      source: 'Website',
      budget: '$50,000',
      timeline: 'Fall 2024'
    },
    {
      id: 2,
      name: 'Fatima Al-Sheikh',
      location: 'Jeddah',
      interest: 'Business Administration',
      engagement: 'Medium',
      lastContact: '2024-01-10',
      source: 'Referral',
      budget: '$40,000',
      timeline: 'Spring 2025'
    },
    {
      id: 3,
      name: 'Omar Al-Mansouri',
      location: 'Dammam',
      interest: 'Engineering',
      engagement: 'Low',
      lastContact: '2024-01-05',
      source: 'Social Media',
      budget: 'Not specified',
      timeline: 'Not specified'
    }
  ];

  const handleLeadSelect = (lead) => {
    setSelectedLead(lead);
    setShowEmailModal(true);
  };

  const handleEmailGenerated = (email) => {
    console.log('Email generated:', email);
  };

  const handleEmailSent = (email) => {
    console.log('Email sent:', email);
    setSentEmail(email);
    setShowConfirmation(true);
    setShowEmailModal(false);
    setSelectedLead(null);
    
    if (onEmailSent) {
      onEmailSent(email);
    }
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
    setSentEmail(null);
  };

  const handleCloseModal = () => {
    setShowEmailModal(false);
    setSelectedLead(null);
  };

  return (
    <div className={`marketing-email-templates ${isRTLMode ? 'rtl' : 'ltr'}`} dir={isRTLMode ? 'rtl' : 'ltr'}>
      {/* Lead Selection */}
      <div className="mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className={`text-lg font-semibold text-gray-900 dark:text-white mb-4 ${isRTLMode ? 'text-right' : 'text-left'}`}>
            {isRTLMode ? 'اختر العميل المحتمل للبريد الإلكتروني' : 'Select Lead for Email'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sampleLeads.map((lead) => (
              <button
                key={lead.id}
                onClick={() => handleLeadSelect(lead)}
                className={`p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors ${isRTLMode ? 'text-right' : 'text-left'}`}
              >
                <div className={`flex items-center gap-3 mb-2 ${isRTLMode ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                    {lead.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {lead.name}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {lead.location}
                    </p>
                  </div>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  <p><strong>{isRTLMode ? 'الاهتمام:' : 'Interest:'}</strong> {lead.interest}</p>
                  <p><strong>{isRTLMode ? 'مستوى التفاعل:' : 'Engagement:'}</strong> {lead.engagement}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Email Templates Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden ${isRTLMode ? 'rtl' : 'ltr'}`} dir={isRTLMode ? 'rtl' : 'ltr'}>
            {/* Modal Header */}
            <div className={`flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 ${isRTLMode ? 'flex-row-reverse' : 'flex-row'}`}>
              <div>
                <h2 className={`text-xl font-semibold text-gray-900 dark:text-white ${isRTLMode ? 'text-right' : 'text-left'}`}>
                  {isRTLMode ? 'قوالب البريد الإلكتروني الذكية' : 'Smart Email Templates'}
                </h2>
                <p className={`text-gray-500 dark:text-gray-400 text-sm mt-1 ${isRTLMode ? 'text-right' : 'text-left'}`}>
                  {isRTLMode ? `إنشاء رسائل بريد إلكتروني مخصصة لـ ${selectedLead?.name}` : `Generate personalized emails for ${selectedLead?.name}`}
                </p>
              </div>
              <button
                onClick={handleCloseModal}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <svg className="w-6 h-6 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
              <EmailTemplates
                lead={selectedLead}
                onEmailGenerated={handleEmailGenerated}
                onEmailSent={handleEmailSent}
              />
            </div>
          </div>
        </div>
      )}
    
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

export default MarketingEmailTemplates;