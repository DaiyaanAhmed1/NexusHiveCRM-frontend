import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalization } from '../../../../hooks/useLocalization';
import aiSearchService from '../services/aiSearchService';

const AISearchComponent = ({ 
  onSearch, 
  placeholder = 'Search leads, campaigns, or ask AI anything...',
  className = '',
  showSuggestions = true,
  data = []
}) => {
  const { t } = useTranslation();
  const { isRTLMode } = useLocalization();
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestionsList, setShowSuggestionsList] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

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

  // Handle search
  const handleSearch = async (searchQuery = query) => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setShowSuggestionsList(false);

    try {
      const results = await aiSearchService.search(
        searchQuery, 
        data, 
        isRTLMode ? 'ar' : 'en'
      );
      
      if (onSearch) {
        onSearch(results);
      }
    } catch (error) {
      console.error('Search error:', error);
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
          }`}
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
                Recent Searches
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
              Suggestions
            </div>
            {suggestions.slice(0, 6).map((suggestion, index) => (
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