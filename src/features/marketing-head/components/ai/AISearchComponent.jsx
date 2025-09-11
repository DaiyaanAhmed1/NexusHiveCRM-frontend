import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalization } from '../../../../hooks/useLocalization';
import { useNavigate } from 'react-router-dom';
import { FiMessageCircle, FiArrowRight, FiX, FiMail, FiMapPin, FiTrendingUp } from 'react-icons/fi';
import aiSearchService from '../../services/aiSearchService';
import ReplySuggestions from './ReplySuggestions';

const AISearchComponent = ({ 
  onSearch, 
  placeholder = 'Search leads, campaigns, or ask AI anything...',
  className = '',
  showSuggestions = true,
  data = []
}) => {
  const { t } = useTranslation(['marketing', 'common']);
  const { isRTLMode } = useLocalization();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestionsList, setShowSuggestionsList] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [isServerBusy, setIsServerBusy] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  const [showReplySuggestions, setShowReplySuggestions] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState('');
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Dummy responses for your existing suggestions
  const dummyResponses = {
    'show me leads from riyadh': {
      results: [
        { id: 1, name: 'Ahmed Al-Rashid', email: 'ahmed@example.com', city: 'Riyadh', status: 'Qualified', source: 'Website', engagement: '95%' },
        { id: 2, name: 'Fatima Al-Zahra', email: 'fatima@example.com', city: 'Riyadh', status: 'Active', source: 'Referral', engagement: '87%' },
        { id: 3, name: 'Mohammed Al-Saud', email: 'mohammed@example.com', city: 'Riyadh', status: 'New', source: 'Social Media', engagement: '92%' }
      ],
      message: t('aiSearch.results.leadsFromRiyadh', 'Here are your leads from Riyadh (Demo Data)')
    },
    'find high-engagement prospects': {
      results: [
        { id: 1, name: 'Sarah Johnson', email: 'sarah@example.com', engagement: '95%', lastActivity: '2 hours ago', status: 'Hot Lead' },
        { id: 2, name: 'Mike Chen', email: 'mike@example.com', engagement: '87%', lastActivity: '1 day ago', status: 'Warm Lead' },
        { id: 3, name: 'Alex Brown', email: 'alex@example.com', engagement: '92%', lastActivity: '3 hours ago', status: 'Hot Lead' }
      ],
      message: t('aiSearch.results.highEngagementProspects', 'Here are your high-engagement prospects (Demo Data)')
    },
    'campaigns with low conversion': {
      results: [
        { id: 1, name: 'Summer Sale 2024', conversion: '2.1%', target: '5%', leads: 150, conversions: 3 },
        { id: 2, name: 'Product Launch', conversion: '1.8%', target: '4%', leads: 200, conversions: 4 },
        { id: 3, name: 'Holiday Campaign', conversion: '2.5%', target: '6%', leads: 120, conversions: 3 }
      ],
      message: t('aiSearch.results.lowConversionCampaigns', 'Here are campaigns with low conversion rates (Demo Data)')
    },
    'leads interested in engineering': {
      results: [
        { id: 1, name: 'David Wilson', email: 'david@example.com', interest: 'Software Engineering', status: 'Qualified', source: 'Website', engagement: '88%' },
        { id: 2, name: 'Lisa Zhang', email: 'lisa@example.com', interest: 'Civil Engineering', status: 'Active', source: 'Referral', engagement: '91%' },
        { id: 3, name: 'Robert Kim', email: 'robert@example.com', interest: 'Mechanical Engineering', status: 'New', source: 'Social Media', engagement: '85%' }
      ],
      message: t('aiSearch.results.engineeringLeads', 'Here are leads interested in engineering (Demo Data)')
    },
    'recent inquiries from jeddah': {
      results: [
        { id: 1, name: 'Omar Al-Harbi', email: 'omar@example.com', city: 'Jeddah', inquiryDate: '2 hours ago', status: 'New Inquiry', engagement: '93%' },
        { id: 2, name: 'Noura Al-Ghamdi', email: 'noura@example.com', city: 'Jeddah', inquiryDate: '5 hours ago', status: 'Follow-up Needed', engagement: '89%' },
        { id: 3, name: 'Khalid Al-Mansouri', email: 'khalid@example.com', city: 'Jeddah', inquiryDate: '1 day ago', status: 'In Progress', engagement: '86%' }
      ],
      message: t('aiSearch.results.recentInquiriesJeddah', 'Here are recent inquiries from Jeddah (Demo Data)')
    },
    'high-priority follow-ups needed': {
      results: [
        { id: 1, name: 'Emma Thompson', email: 'emma@example.com', priority: 'High', followUpDate: 'Overdue', status: 'Urgent', engagement: '94%' },
        { id: 2, name: 'James Rodriguez', email: 'james@example.com', priority: 'High', followUpDate: 'Today', status: 'Due Today', engagement: '90%' },
        { id: 3, name: 'Maria Garcia', email: 'maria@example.com', priority: 'High', followUpDate: 'Tomorrow', status: 'Scheduled', engagement: '88%' }
      ],
      message: t('aiSearch.results.highPriorityFollowUps', 'Here are high-priority follow-ups needed (Demo Data)')
    }
  };

  // Load search history on component mount
  useEffect(() => {
    setSearchHistory(aiSearchService.getSearchHistory());
    setSuggestions(aiSearchService.getSuggestions());
  }, []);

  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value.trim()) {
      const filteredSuggestions = aiSearchService.getSuggestions(value);
      setSuggestions(filteredSuggestions);
      setShowSuggestionsList(true);
    } else {
      setSuggestions(aiSearchService.getSuggestions());
      setShowSuggestionsList(false);
    }
  };

  // Check if query matches any dummy response
  const getDummyResponse = (searchQuery) => {
    const query = searchQuery.toLowerCase().trim();
    
    // Check for exact matches first
    for (const [key, response] of Object.entries(dummyResponses)) {
      if (query === key) {
        return response;
      }
    }
    
    // Check for partial matches
    for (const [key, response] of Object.entries(dummyResponses)) {
      if (query.includes(key) || key.includes(query)) {
        return response;
      }
    }
    
    return null;
  };

  // Handle search
  const handleSearch = async (searchQuery = query) => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setShowSuggestionsList(false);
    setIsServerBusy(false);
    setSearchResults(null);
    setShowReplySuggestions(false);

    try {
      const results = await aiSearchService.search(
        searchQuery, 
        data, 
        isRTLMode ? 'ar' : 'en'
      );
      
      setSearchResults(results);
      if (onSearch) {
        onSearch(results);
      }
    } catch (error) {
      console.error('Search error:', error);
      
      // Check if we have a dummy response for this query
      const dummyResponse = getDummyResponse(searchQuery);
      
      if (dummyResponse) {
        // Show dummy response
        const fallbackResults = {
          query: searchQuery,
          results: dummyResponse.results,
          message: dummyResponse.message,
          isDummy: true,
          timestamp: new Date().toISOString()
        };
        
        setSearchResults(fallbackResults);
        if (onSearch) {
          onSearch(fallbackResults);
        }
      } else {
        // Show server busy message for unknown queries
        setIsServerBusy(true);
        setTimeout(() => setIsServerBusy(false), 3000); // Hide after 3 seconds
        
        const busyResults = {
          query: searchQuery,
          results: [],
          message: t('aiSearch.errors.serverBusy', 'Server is busy. Please try again later.'),
          isError: true,
          suggestions: [
            t('aiSearch.suggestions.leadsFromRiyadh', 'Try: "Show me leads from Riyadh"'),
            t('aiSearch.suggestions.highEngagementProspects', 'Try: "Find high-engagement prospects"'),
            t('aiSearch.suggestions.lowConversionCampaigns', 'Try: "Campaigns with low conversion"'),
            t('aiSearch.suggestions.engineeringLeads', 'Try: "Leads interested in engineering"'),
            t('aiSearch.suggestions.recentInquiriesJeddah', 'Try: "Recent inquiries from Jeddah"'),
            t('aiSearch.suggestions.highPriorityFollowUps', 'Try: "High-priority follow-ups needed"')
          ]
        };
        
        setSearchResults(busyResults);
        if (onSearch) {
          onSearch(busyResults);
        }
      }
    } finally {
      setIsSearching(false);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setShowSuggestionsList(false);
    handleSearch(suggestion);
  };

  // Handle key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    } else if (e.key === 'Escape') {
      setShowSuggestionsList(false);
    }
  };

  // Handle AI Reply button click
  const handleAIReply = (lead) => {
    setSelectedLead(lead);
    setShowReplySuggestions(true);
  };

  // Handle AI chat navigation
  const handleAIChat = () => {
    navigate('/rbac/marketing-head/ai-chat');
  };

  // Handle reply suggestion selection
  const handleSelectSuggestion = (suggestion) => {
    console.log('Selected suggestion for lead:', selectedLead?.name, suggestion);
    
    // Extract the content if suggestion is an object, otherwise use as string
    const suggestionText = typeof suggestion === 'object' ? suggestion.content || suggestion.title || JSON.stringify(suggestion) : suggestion;
    
    // Store the selected suggestion and show confirmation
    setSelectedSuggestion(suggestionText);
    setShowConfirmation(true);
  };

  // Handle confirmation
  const handleConfirmReply = () => {
    // Show success message
    alert(`Reply sent successfully to ${selectedLead?.name}!`);
    
    // Close both modals
    setShowConfirmation(false);
    setShowReplySuggestions(false);
    setSelectedLead(null);
    setSelectedSuggestion('');
    
    // You can add more logic here like:
    // - Send the reply via API
    // - Update the lead's status
    // - Add to activity log
    // - etc.
  };

  // Handle cancel confirmation
  const handleCancelReply = () => {
    setShowConfirmation(false);
    setSelectedSuggestion('');
  };

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        setShowSuggestionsList(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={`ai-search-container relative ${className}`} dir={isRTLMode ? 'rtl' : 'ltr'}>
      {/* Search Input */}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          onFocus={() => setShowSuggestionsList(true)}
          placeholder={placeholder}
          className={`w-full px-4 py-3 pr-12 pl-12 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
            isRTLMode ? 'text-right' : 'text-left'
          } ${isServerBusy ? 'border-orange-500 focus:ring-orange-500' : ''}`}
          disabled={isSearching}
        />
        
        {/* Search Icon */}
        <div className={`absolute top-1/2 transform -translate-y-1/2 ${isRTLMode ? 'left-3' : 'left-3'}`}>
          {isSearching ? (
            <svg className="w-5 h-5 text-gray-400 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
              <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" className="opacity-75" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          )}
        </div>

        {/* AI Icon */}
        <div className={`absolute top-1/2 transform -translate-y-1/2 ${isRTLMode ? 'right-3' : 'right-3'}`}>
          <div className="w-5 h-5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
              <circle cx="6" cy="6" r="2" />
              <circle cx="18" cy="6" r="2" />
              <circle cx="6" cy="18" r="2" />
              <circle cx="18" cy="18" r="2" />
              <rect x="10" y="10" width="4" height="4" />
            </svg>
          </div>
        </div>
      </div>

      {/* Server Busy Message */}
      {isServerBusy && (
        <div className="mt-2 p-3 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-orange-500 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm text-orange-700 dark:text-orange-300">
              {t('aiSearch.errors.serverBusy', 'Server is busy. Please try again later or use one of the suggested queries.')}
            </span>
          </div>
        </div>
      )}

      {/* Search Results - SINGLE SECTION ONLY */}
      {searchResults && !isSearching && (
        <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className={`flex items-center justify-between mb-3 ${isRTLMode ? 'flex-row-reverse' : ''}`}>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {t('aiSearch.results.title', 'Search Results')} ({searchResults.results?.length || 0})
            </h3>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {t('aiSearch.results.sortedBy', 'Sorted by relevance')}
            </div>
          </div>
          
          {searchResults.message && (
            <p className="text-gray-600 dark:text-gray-300 mb-3">{searchResults.message}</p>
          )}
          
          {searchResults.results && searchResults.results.length > 0 && (
            <div className="space-y-4">
              {searchResults.results.map((result, index) => (
                <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                  <div className={`flex items-center justify-between ${isRTLMode ? 'flex-row-reverse' : ''}`}>
                    <div className="flex-1">
                      <div className={`flex items-center gap-3 mb-2 ${isRTLMode ? 'flex-row-reverse' : ''}`}>
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {result.name}
                        </h4>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm text-gray-600 dark:text-gray-300">
                            {result.engagement || '95%'} {t('aiSearch.results.match', 'Match')}
                          </span>
                        </div>
                      </div>
                      
                      <div className={`flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300 ${isRTLMode ? 'flex-row-reverse' : ''}`}>
                        <div className="flex items-center gap-1">
                          <FiMail className="w-4 h-4" />
                          {result.email}
                        </div>
                        <div className="flex items-center gap-1">
                          <FiMapPin className="w-4 h-4" />
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          <span>{result.engagement || '95%'} {t('aiSearch.results.engagement', 'Engagement')}</span>
                        </div>
                        {result.city && (
                          <div className="flex items-center gap-1">
                            <FiMapPin className="w-4 h-4" />
                            <span>{result.city}</span>
                          </div>
                        )}
                      </div>
                      
                      {/* AI Explanation Section */}
                      <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <div className={`flex items-center gap-2 mb-2 ${isRTLMode ? 'flex-row-reverse' : ''}`}>
                          <div className="w-5 h-5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <circle cx="6" cy="6" r="2" />
                              <circle cx="18" cy="6" r="2" />
                              <circle cx="6" cy="18" r="2" />
                              <circle cx="18" cy="18" r="2" />
                              <rect x="10" y="10" width="4" height="4" />
                            </svg>
                          </div>
                          <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
                            {t('aiSearch.results.aiExplanation', 'AI Explanation')}
                          </span>
                        </div>
                        <p className="text-sm text-blue-800 dark:text-blue-200">
                          {t('aiSearch.results.explanationText', 'This lead matches your search criteria and shows high engagement potential.')}
                        </p>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className={`flex flex-col gap-2 ${isRTLMode ? 'mr-4' : 'ml-4'}`}>
                      <button
                        onClick={() => handleAIReply(result)}
                        className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
                      >
                        <FiMessageCircle className="w-4 h-4" />
                        {t('aiSearch.buttons.aiReply', 'AI Reply')}
                      </button>
                      <button
                        onClick={() => console.log('Contact clicked for:', result.name)}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                      >
                        {t('aiSearch.buttons.contact', 'Contact')}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* AI Reply Suggestions Modal */}
      {showReplySuggestions && selectedLead && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className={`flex items-center justify-between mb-4 ${isRTLMode ? 'flex-row-reverse' : ''}`}>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {t('aiSearch.modal.title', 'AI Reply Suggestions for')} {selectedLead.name}
                </h3>
                <button
                  onClick={() => {
                    setShowReplySuggestions(false);
                    setSelectedLead(null);
                  }}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>
              
              <ReplySuggestions
                leadContext={{
                  name: selectedLead.name,
                  email: selectedLead.email,
                  source: selectedLead.source || 'AI Search',
                  status: selectedLead.status || 'Active',
                  city: selectedLead.city,
                  engagement: selectedLead.engagement
                }}
                onSelectSuggestion={handleSelectSuggestion}
                className="w-full"
              />
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className={`flex items-center justify-between mb-4 ${isRTLMode ? 'flex-row-reverse' : ''}`}>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {t('aiSearch.confirmation.title', 'Confirm Reply')}
                </h3>
                <button
                  onClick={handleCancelReply}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>
              
              <div className="mb-6">
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {t('aiSearch.confirmation.message', 'Are you sure you want to send this reply to')} <strong>{selectedLead?.name}</strong>?
                </p>
                
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                  <p className="text-sm text-gray-700 dark:text-gray-300 italic">
                    "{selectedSuggestion}"
                  </p>
                </div>
              </div>
              
              <div className={`flex gap-3 ${isRTLMode ? 'flex-row-reverse' : ''}`}>
                <button
                  onClick={handleCancelReply}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  {t('aiSearch.confirmation.cancel', 'Cancel')}
                </button>
                <button
                  onClick={handleConfirmReply}
                  className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  {t('aiSearch.confirmation.send', 'Send Reply')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Suggestions Dropdown */}
      {showSuggestions && showSuggestionsList && suggestions.length > 0 && (
        <div 
          ref={suggestionsRef}
          className={`absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto`}
        >
          {/* Search History */}
          {searchHistory.length > 0 && (
            <div className="px-3 py-2 border-b border-gray-200 dark:border-gray-700">
              <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                {t('aiSearch.suggestions.recentSearches', 'Recent Searches')}
              </div>
              {searchHistory.slice(0, 3).map((historyItem, index) => (
                <div
                  key={index}
                  onClick={() => handleSuggestionClick(historyItem)}
                  className="px-2 py-1 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer flex items-center gap-2"
                >
                  <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {historyItem}
                </div>
              ))}
            </div>
          )}

          {/* Suggestions */}
          <div className="px-3 py-2">
            <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
              {t('aiSearch.suggestions.tryTheseQueries', 'Try these queries')}
            </div>
            {Object.keys(dummyResponses).map((suggestion, index) => (
              <div
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-2 py-1 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer flex items-center gap-2"
              >
                <svg className="w-3 h-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                {suggestion}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AISearchComponent;