import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalization } from "../../../../hooks/useLocalization";
import { FiUsers, FiSend, FiAlertCircle, FiCheckCircle, FiX, FiEye, FiEyeOff } from 'react-icons/fi';

const BulkTransferPanel = ({ selectedLeads, setSelectedLeads }) => {
  const { t } = useTranslation(['admission']);
  const { isRTL } = useLocalization();
  
  const [transferData, setTransferData] = useState({
    newAssignee: '',
    reason: '',
    notifyUsers: true,
    notifyStudent: false
  });

  const [showAISuggestions, setShowAISuggestions] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState([
    {
      counselor: 'Khalid Al-Sayed',
      matchScore: 85,
      reason: 'Best performance with North-East region leads',
      leadsCount: 8
    },
    {
      counselor: 'Yousef Al-Harbi',
      matchScore: 75,
      reason: 'High conversion rate with technical courses',
      leadsCount: 5
    }
  ]);

  // Mock data - replace with actual API call
  const leads = [
    {
      id: 1,
      name: "Abdullah Al-Rashid",
      applicationId: "APP001",
      program: "B.Tech Computer Science",
      currentOwner: "Noura Al-Zahra"
    },
    {
      id: 2,
      name: "Layla Al-Mansour",
      applicationId: "APP002",
      program: "MBA",
      currentOwner: "Khalid Al-Sayed"
    },
    {
      id: 3,
      name: "Omar Al-Mutairi",
      applicationId: "APP003",
      program: "B.Tech Mechanical",
      currentOwner: "Aisha Al-Hassan"
    }
  ];

  const counselors = [
    { id: 1, name: "Noura Al-Zahra", activeLeads: 15 },
    { id: 2, name: "Khalid Al-Sayed", activeLeads: 20 },
    { id: 3, name: "Aisha Al-Hassan", activeLeads: 12 }
  ];

  const handleTransfer = () => {
    // Implement transfer logic
    console.log('Transfer initiated:', {
      selectedLeads,
      transferData
    });
  };

  return (
    <div className="space-y-6">
      {/* AI Suggestions Panel */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">AI-Powered Suggestions</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Get intelligent recommendations for lead assignments</p>
          </div>
          <button
            onClick={() => setShowAISuggestions(!showAISuggestions)}
            className="flex items-center gap-2 px-3 py-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 bg-blue-50 dark:bg-blue-900/20 rounded-lg transition-colors"
          >
            {showAISuggestions ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
            {showAISuggestions ? 'Hide Suggestions' : 'Show Suggestions'}
          </button>
        </div>

        {showAISuggestions && (
          <div className="space-y-4">
            {aiSuggestions.map((suggestion, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{suggestion.counselor}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{suggestion.reason}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                      <span>Match Score: {suggestion.matchScore}%</span>
                      <span>{suggestion.leadsCount} leads</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setTransferData({ ...transferData, newAssignee: suggestion.counselor })}
                    className="ml-4 px-3 py-1 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 bg-blue-50 dark:bg-blue-900/20 rounded-md transition-colors"
                  >
                    Apply Suggestion
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bulk Transfer Form */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Bulk Lead Transfer</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Transfer multiple leads to a new counselor</p>
        </div>
        
        <div className="space-y-6">
          {/* Lead Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Select Leads ({selectedLeads.length} selected)
            </label>
            <div className="max-h-60 overflow-y-auto border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700">
              {leads.map((lead) => (
                <div key={lead.id} className="flex items-center p-4 border-b border-gray-200 dark:border-gray-600 last:border-b-0 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                  <input
                    type="checkbox"
                    checked={selectedLeads.includes(lead.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedLeads([...selectedLeads, lead.id]);
                      } else {
                        setSelectedLeads(selectedLeads.filter(id => id !== lead.id));
                      }
                    }}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
                  />
                  <div className="ml-3 flex-1">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{lead.name}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {lead.applicationId} • {lead.program}
                    </div>
                    <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                      Current: {lead.currentOwner}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* New Assignee Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              New Assignee *
            </label>
            <select
              value={transferData.newAssignee}
              onChange={(e) => setTransferData({ ...transferData, newAssignee: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="">Select Counselor</option>
              {counselors.map(counselor => (
                <option key={counselor.id} value={counselor.name}>
                  {counselor.name} ({counselor.activeLeads} active leads)
                </option>
              ))}
            </select>
          </div>

          {/* Transfer Reason */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Reason for Transfer *
            </label>
            <textarea
              value={transferData.reason}
              onChange={(e) => setTransferData({ ...transferData, reason: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="Enter reason for transfer..."
            />
          </div>

          {/* Notification Options */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Notification Options</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={transferData.notifyUsers}
                  onChange={(e) => setTransferData({ ...transferData, notifyUsers: e.target.checked })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
                />
                <label className="ml-3 text-sm text-gray-700 dark:text-gray-300">
                  Notify both counselors via email
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={transferData.notifyStudent}
                  onChange={(e) => setTransferData({ ...transferData, notifyStudent: e.target.checked })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
                />
                <label className="ml-3 text-sm text-gray-700 dark:text-gray-300">
                  Notify student about counselor change
                </label>
              </div>
            </div>
          </div>

          {/* Transfer Button */}
          <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={handleTransfer}
              disabled={!selectedLeads.length || !transferData.newAssignee || !transferData.reason}
              className={`
                inline-flex items-center px-6 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white transition-colors
                ${(!selectedLeads.length || !transferData.newAssignee || !transferData.reason)
                  ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                }
              `}
            >
              <FiSend className="mr-2 w-4 h-4" />
              Transfer {selectedLeads.length} Lead{selectedLeads.length !== 1 ? 's' : ''}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkTransferPanel;