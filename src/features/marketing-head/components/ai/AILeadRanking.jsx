import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalization } from '../../../../hooks/useLocalization';
import leadRankingService from '../../services/leadRankingService';

const AILeadRanking = ({ leads, onRankingComplete, context = {} }) => {
  const { t } = useTranslation();
  const { isRTLMode } = useLocalization();
  const [rankedLeads, setRankedLeads] = useState([]);
  const [originalRankedLeads, setOriginalRankedLeads] = useState([]); // Store original data
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('rank');
  const [filterBy, setFilterBy] = useState('all');

  // Rank leads when component mounts or leads change
  useEffect(() => {
    if (leads && leads.length > 0) {
      handleRankLeads();
    }
  }, [leads]);

  // Handle lead ranking
  const handleRankLeads = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const rankings = await leadRankingService.rankLeads(leads, context);
      setRankedLeads(rankings);
      setOriginalRankedLeads(rankings); // Store original data
      
      // Add to history
      leadRankingService.addToHistory(rankings);
      
      // Notify parent component
      if (onRankingComplete) {
        onRankingComplete(rankings);
      }
    } catch (err) {
      setError(err.message);
      console.error('Error ranking leads:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle sorting
  const handleSort = (criteria) => {
    setSortBy(criteria);
    const sorted = [...rankedLeads].sort((a, b) => {
      switch (criteria) {
        case 'score':
          return b.score - a.score;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'engagement':
          const engagementOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
          return engagementOrder[b.engagement] - engagementOrder[a.engagement];
        case 'probability':
          const probOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
          return probOrder[b.probability] - probOrder[a.probability];
        default:
          return a.rank - b.rank;
      }
    });
    setRankedLeads(sorted);
  };

  // Handle filtering - FIXED VERSION
  const handleFilter = (criteria) => {
    setFilterBy(criteria);
    
    if (criteria === 'all') {
      // Show all leads from original data
      setRankedLeads([...originalRankedLeads]);
    } else {
      // Filter based on probability
      const filtered = originalRankedLeads.filter(lead => 
        lead.probability.toLowerCase() === criteria.toLowerCase()
      );
      setRankedLeads(filtered);
    }
  };

  // Get probability color
  const getProbabilityColor = (probability) => {
    switch (probability.toLowerCase()) {
      case 'high':
        return 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'low':
        return 'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  // Get score color
  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    if (score >= 40) return 'text-orange-600';
    return 'text-red-600';
  };

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              AI is analyzing your leads...
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Ranking leads by conversion probability
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Ranking Failed
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            {error}
          </p>
          <button
            onClick={handleRankLeads}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
          >
            Try Again
          </button>
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
              AI Lead Ranking
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
              Leads ranked by conversion probability
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={handleRankLeads}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors text-sm"
            >
              Refresh Rankings
            </button>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap gap-4">
          {/* Sort By */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Sort by:
            </label>
            <select
              value={sortBy}
              onChange={(e) => handleSort(e.target.value)}
              className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
            >
              <option value="rank">Rank</option>
              <option value="score">Score</option>
              <option value="name">Name</option>
              <option value="engagement">Engagement</option>
              <option value="probability">Probability</option>
            </select>
          </div>

          {/* Filter By */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Filter by:
            </label>
            <select
              value={filterBy}
              onChange={(e) => handleFilter(e.target.value)}
              className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
            >
              <option value="all">All Leads</option>
              <option value="high">High Probability</option>
              <option value="medium">Medium Probability</option>
              <option value="low">Low Probability</option>
            </select>
          </div>

          {/* Results Count */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Showing {rankedLeads.length} of {originalRankedLeads.length} leads
            </span>
          </div>
        </div>
      </div>

      {/* Rankings List */}
      <div className="p-6">
        {rankedLeads.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {filterBy === 'all' ? 'No leads to rank' : 'No leads match this filter'}
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {filterBy === 'all' 
                ? 'Add some leads to see AI-powered rankings' 
                : 'Try changing the filter criteria'
              }
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {rankedLeads.map((lead, index) => (
              <div
                key={lead.id}
                className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  {/* Lead Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                        {lead.rank}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {lead.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {lead.location} • {lead.interest}
                        </p>
                      </div>
                    </div>

                    {/* Strengths */}
                    <div className="mb-3">
                      <div className="flex flex-wrap gap-2">
                        {lead.strengths?.map((strength, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs rounded-full"
                          >
                            {strength}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Next Action */}
                    <div className="mb-3">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <strong>Next Action:</strong> {lead.nextAction}
                      </p>
                    </div>

                    {/* Risks */}
                    {lead.risks && lead.risks.length > 0 && (
                      <div className="mb-3">
                        <div className="flex flex-wrap gap-2">
                          {lead.risks.map((risk, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-xs rounded-full"
                            >
                              {risk}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Score & Probability */}
                  <div className="text-right ml-4">
                    <div className={`text-2xl font-bold ${getScoreColor(lead.score)}`}>
                      {lead.score}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                      Score
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${getProbabilityColor(lead.probability)}`}>
                      {lead.probability} Probability
                    </div>
                  </div>
                </div>

                {/* Reasoning */}
                {lead.reasoning && (
                  <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      <strong>AI Reasoning:</strong> {lead.reasoning}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AILeadRanking;