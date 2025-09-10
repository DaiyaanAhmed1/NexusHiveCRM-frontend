import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalization } from '../../../../hooks/useLocalization';
import AISearchComponent from '../../shared/components/AISearchComponent';

const MarketingAISearch = ({ onSearchResults, onSelectLead }) => {
  const { t } = useTranslation();
  const { isRTLMode } = useLocalization();
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Handle search results
  const handleSearch = async (results) => {
    setSearchResults(results.results || []);
    setIsSearching(false);
    
    if (onSearchResults) {
      onSearchResults(results);
    }
  };

  // Handle lead selection - SIMPLIFIED
  const handleLeadClick = (lead) => {
    console.log('Lead clicked:', lead);
    console.log('onSelectLead function:', onSelectLead);
    console.log('onSelectLead type:', typeof onSelectLead);
    
    if (onSelectLead) {
      console.log('Calling onSelectLead with:', lead);
      onSelectLead(lead);
      console.log('onSelectLead called successfully');
    } else {
      console.log('onSelectLead is not defined or falsy');
    }
  };

  return (
    <div className="marketing-ai-search space-y-4">
      {/* AI Search Component */}
      <div className="ai-search-section">
        <AISearchComponent 
          onSearch={handleSearch}
          placeholder={isRTLMode ? 'ابحث في العملاء المحتملين أو الحملات أو اسأل الذكاء الاصطناعي...' : 'Search leads, campaigns, or ask AI anything...'}
          className="w-full"
          showSuggestions={true}
        />
      </div>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="search-results">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Search Results ({searchResults.length})
            </h3>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Sorted by relevance
            </div>
          </div>

          <div className="space-y-3">
            {searchResults.map((result) => (
              <div 
                key={result.id} 
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleLeadClick(result)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                        {result.name}
                      </h4>
                      <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-xs rounded-full">
                        {result.type}
                      </span>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {result.relevanceScore}% Match
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span className="text-sm text-gray-600 dark:text-gray-300">{result.email}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-sm text-gray-600 dark:text-gray-300">{result.location}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                        <span className="text-sm text-gray-600 dark:text-gray-300">{result.interest}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${
                          result.engagement === 'High' ? 'bg-green-500' : 
                          result.engagement === 'Medium' ? 'bg-yellow-500' : 'bg-red-500'
                        }`}></div>
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          {result.engagement} Engagement
                        </span>
                      </div>
                    </div>

                    {/* AI Explanation */}
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                      <div className="flex items-start gap-2">
                        <div className="w-5 h-5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <circle cx="6" cy="6" r="2" />
                            <circle cx="18" cy="6" r="2" />
                            <circle cx="6" cy="18" r="2" />
                            <circle cx="18" cy="18" r="2" />
                            <rect x="10" y="10" width="4" height="4" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-xs font-medium text-blue-800 dark:text-blue-200 mb-1">
                            AI Explanation
                          </div>
                          <div className="text-sm text-blue-700 dark:text-blue-300">
                            {result.aiExplanation}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex flex-col gap-2 ml-4">
                    <button 
                      className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-xs rounded-lg transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log('Button clicked for lead:', result);
                        handleLeadClick(result);
                      }}
                    >
                      Select for AI Reply
                    </button>
                    <button 
                      className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white text-xs rounded-lg transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log('Contact button clicked for lead:', result);
                      }}
                    >
                      Contact
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No Results */}
      {searchResults.length === 0 && !isSearching && (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No results found
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Try a different search query
          </p>
        </div>
      )}
    </div>
  );
};

export default MarketingAISearch;