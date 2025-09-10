import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalization } from '../../../../hooks/useLocalization';
import AILeadRanking from '../../shared/components/AILeadRanking';

const MarketingLeadRanking = ({ onRankingComplete }) => {
  const { t } = useTranslation();
  const { isRTLMode } = useLocalization();
  const [leads, setLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load sample leads data
  useEffect(() => {
    loadSampleLeads();
  }, []);

  const loadSampleLeads = () => {
    // Sample leads data - in real implementation, this would come from API
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
      },
      {
        id: 4,
        name: 'Layla Al-Zahra',
        location: 'Riyadh',
        interest: 'Medicine',
        engagement: 'High',
        lastContact: '2024-01-12',
        source: 'Website',
        budget: '$60,000',
        timeline: 'Fall 2024'
      },
      {
        id: 5,
        name: 'Khalid Al-Harbi',
        location: 'Jeddah',
        interest: 'Architecture',
        engagement: 'Medium',
        lastContact: '2024-01-08',
        source: 'Email Campaign',
        budget: '$45,000',
        timeline: 'Spring 2025'
      }
    ];

    setLeads(sampleLeads);
    setIsLoading(false);
  };

  const handleRankingComplete = (rankings) => {
    console.log('Lead rankings completed:', rankings);
    if (onRankingComplete) {
      onRankingComplete(rankings);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-500 dark:text-gray-400">Loading leads...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="marketing-lead-ranking">
      <AILeadRanking
        leads={leads}
        onRankingComplete={handleRankingComplete}
        context={{
          focus: 'University enrollment conversion',
          priority: 'Engagement and program interest',
          programs: 'All undergraduate programs'
        }}
      />
    </div>
  );
};

export default MarketingLeadRanking;