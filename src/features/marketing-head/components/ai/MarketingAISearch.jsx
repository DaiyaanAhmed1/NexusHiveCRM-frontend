import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalization } from '../../../../hooks/useLocalization';
import { FiMessageCircle, FiMail, FiMapPin, FiTarget, FiUsers } from 'react-icons/fi';
import AISearchComponent from './AISearchComponent';

const MarketingAISearch = ({ onSearchResults, onSelectLead, onSelectForAIReply }) => {
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

  // Handle lead selection
  const handleLeadClick = (lead) => {
    if (onSelectLead) {
      onSelectLead(lead);
    }
  };

  // Handle AI Reply selection
  const handleAIReplyClick = (lead) => {
    if (onSelectForAIReply) {
      onSelectForAIReply(lead);
    }
  };

  return (
    <div className={`marketing-ai-search space-y-4 ${isRTLMode ? 'rtl' : 'ltr'}`}>
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
          <div className={`flex items-center justify-between mb-4 ${isRTLMode ? 'flex-row-reverse' : ''}`}>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {isRTLMode ? `نتائج البحث (${searchResults.length})` : `Search Results (${searchResults.length})`}
            </h3>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {isRTLMode ? 'مرتبة حسب الصلة' : 'Sorted by relevance'}
            </div>
          </div>

          <div className="space-y-3">
            {searchResults.map((result) => (
              <div 
                key={result.id} 
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleLeadClick(result)}
                dir={isRTLMode ? 'rtl' : 'ltr'}
              >
                <div className={`flex items-start justify-between ${isRTLMode ? 'flex-row-reverse' : ''}`}>
                  <div className="flex-1">
                    <div className={`flex items-center gap-3 mb-2 ${isRTLMode ? 'flex-row-reverse' : ''}`}>
                      <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                        {result.name}
                      </h4>
                      <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-xs rounded-full">
                        {result.type}
                      </span>
                      <div className={`flex items-center gap-1 ${isRTLMode ? 'flex-row-reverse' : ''}`}>
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {isRTLMode ? `${result.relevanceScore}% تطابق` : `${result.relevanceScore}% Match`}
                        </span>
                      </div>
                    </div>
                    
                    <div className={`grid grid-cols-1 md:grid-cols-2 gap-2 mb-3 ${isRTLMode ? 'text-right' : 'text-left'}`}>
                      <div className={`flex items-center gap-2 ${isRTLMode ? 'flex-row-reverse' : ''}`}>
                        <FiMail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span className="text-sm text-gray-600 dark:text-gray-300">{result.email}</span>
                      </div>
                      
                      <div className={`flex items-center gap-2 ${isRTLMode ? 'flex-row-reverse' : ''}`}>
                        <FiMapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span className="text-sm text-gray-600 dark:text-gray-300">{result.location}</span>
                      </div>
                      
                      <div className={`flex items-center gap-2 ${isRTLMode ? 'flex-row-reverse' : ''}`}>
                      
                      <FiTarget className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span className="text-sm text-gray-600 dark:text-gray-300">{result.interest}</span>
                      </div>
                      
                      <div className={`flex items-center gap-2 ${isRTLMode ? 'flex-row-reverse' : ''}`}>
                        <div className={`w-2 h-2 rounded-full ${
                          result.engagement === 'High' ? 'bg-green-500' : 
                          result.engagement === 'Medium' ? 'bg-yellow-500' : 'bg-red-500'
                        }`}></div>
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          {isRTLMode ? `${result.engagement} تفاعل` : `${result.engagement} Engagement`}
                        </span>
                      </div>
                    </div>

                    {/* AI Explanation */}
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                      <div className={`flex items-start gap-2 ${isRTLMode ? 'flex-row-reverse' : ''}`}>
                        <div className="w-5 h-5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <FiUsers className="w-3 h-3 text-white" />
                        </div>
                        <div className={isRTLMode ? 'text-right' : 'text-left'}>
                          <div className="text-xs font-medium text-blue-800 dark:text-blue-200 mb-1">
                            {isRTLMode ? 'شرح الذكاء الاصطناعي' : 'AI Explanation'}
                          </div>
                          <div className="text-sm text-blue-700 dark:text-blue-300">
                            {result.aiExplanation}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className={`flex flex-col gap-2 ${isRTLMode ? 'mr-4' : 'ml-4'}`}>
                    <button 
                      className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white text-xs rounded-lg transition-colors flex items-center gap-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAIReplyClick(result);
                      }}
                    >
                      <FiMessageCircle className="w-3 h-3" />
                      {isRTLMode ? 'رد ذكي' : 'AI Reply'}
                    </button>
                    <button 
                      className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white text-xs rounded-lg transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log('Contact button clicked for lead:', result);
                      }}
                    >
                      {isRTLMode ? 'تواصل' : 'Contact'}
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
            {isRTLMode ? 'لم يتم العثور على نتائج' : 'No results found'}
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            {isRTLMode ? 'جرب استعلام بحث مختلف' : 'Try a different search query'}
          </p>
        </div>
      )}
    </div>
  );
};

export default MarketingAISearch;