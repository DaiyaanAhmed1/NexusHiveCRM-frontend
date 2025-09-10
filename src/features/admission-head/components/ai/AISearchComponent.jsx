import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalization } from '../../../../hooks/useLocalization';
import { FiSearch, FiCpu, FiClock, FiUser, FiFileText, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';
import aiSearchService from '../../services/aiSearchService';

const AISearchComponent = ({ onSearch, placeholder, className = '', useDummyData = false }) => {
  const { t } = useTranslation();
  const { isRTLMode } = useLocalization();
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);

  // Dummy data for fallback
  const dummySearchResults = [
    {
      id: 1,
      type: 'application',
      title: isRTLMode ? 'طلبات الهندسة' : 'Engineering Applications',
      description: isRTLMode ? 'تم العثور على 15 طلب في برامج الهندسة' : 'Found 15 applications in engineering programs',
      count: 15,
      confidence: 95,
      category: 'program',
      details: {
        programs: ['Computer Science', 'Mechanical Engineering', 'Electrical Engineering'],
        status: isRTLMode ? 'قيد المراجعة' : 'Under Review',
        avgScore: 85
      }
    },
    {
      id: 2,
      type: 'applicant',
      title: isRTLMode ? 'متقدمون من الدرجة الأولى' : 'Top Tier Applicants',
      description: isRTLMode ? 'متقدمون ذوو درجات عالية ومؤهلات ممتازة' : 'Applicants with high scores and excellent qualifications',
      count: 8,
      confidence: 92,
      category: 'quality',
      details: {
        avgGPA: 3.8,
        testScores: 'Above 90th percentile',
        experience: isRTLMode ? 'خبرة عملية' : 'Work Experience'
      }
    },
    {
      id: 3,
      type: 'status',
      title: isRTLMode ? 'طلبات معلقة' : 'Pending Applications',
      description: isRTLMode ? 'طلبات تنتظر مراجعة الوثائق' : 'Applications waiting for document review',
      count: 12,
      confidence: 88,
      category: 'status',
      details: {
        waitingTime: isRTLMode ? '5-7 أيام' : '5-7 days',
        priority: isRTLMode ? 'متوسط' : 'Medium',
        nextAction: isRTLMode ? 'مراجعة الوثائق' : 'Document Review'
      }
    },
    {
      id: 4,
      type: 'insight',
      title: isRTLMode ? 'اتجاهات القبول' : 'Admission Trends',
      description: isRTLMode ? 'زيادة 25% في طلبات برامج التكنولوجيا' : '25% increase in technology program applications',
      count: 0,
      confidence: 85,
      category: 'trend',
      details: {
        trend: isRTLMode ? 'تصاعدي' : 'Upward',
        period: isRTLMode ? 'آخر 3 أشهر' : 'Last 3 months',
        impact: isRTLMode ? 'عالي' : 'High'
      }
    }
  ];

  const dummySearchSuggestions = [
    isRTLMode ? 'أظهر لي أفضل المتقدمين' : 'Show me the best applicants',
    isRTLMode ? 'طلبات الهندسة المعلقة' : 'Pending engineering applications',
    isRTLMode ? 'متقدمون بحاجة لمراجعة' : 'Applicants needing review',
    isRTLMode ? 'إحصائيات القبول' : 'Admission statistics',
    isRTLMode ? 'طلبات منخفضة الجودة' : 'Low quality applications'
  ];

  // Handle search with dummy data fallback
  const handleSearch = useCallback(async (searchQuery) => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError(null);
    setQuery(searchQuery);

    try {
      if (useDummyData) {
        // Use dummy data with simulated delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Filter dummy results based on query
        const filteredResults = dummySearchResults.filter(result => 
          result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          result.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          result.category.toLowerCase().includes(searchQuery.toLowerCase())
        );
        
        setResults(filteredResults.length > 0 ? filteredResults : dummySearchResults.slice(0, 2));
      } else {
        // Use actual AI service
        const searchResults = await aiSearchService.searchApplications(searchQuery);
        setResults(searchResults);
      }

      // Add to search history
      setSearchHistory(prev => {
        const newHistory = [searchQuery, ...prev.filter(item => item !== searchQuery)];
        return newHistory.slice(0, 5); // Keep only last 5 searches
      });

      if (onSearch) {
        onSearch(searchQuery);
      }
    } catch (err) {
      console.error('Search error:', err);
      setError(isRTLMode ? 'فشل في البحث. جاري استخدام البيانات التجريبية...' : 'Search failed. Using fallback data...');
      
      // Fallback to dummy data on error
      setResults(dummySearchResults.slice(0, 3));
    } finally {
      setLoading(false);
    }
  }, [onSearch, useDummyData, isRTLMode]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(query);
  };

  const getResultIcon = (type) => {
    switch (type) {
      case 'application': return <FiFileText className="text-blue-500" />;
      case 'applicant': return <FiUser className="text-green-500" />;
      case 'status': return <FiClock className="text-yellow-500" />;
      case 'insight': return <FiCpu className="text-purple-500" />;
      default: return <FiSearch className="text-gray-500" />;
    }
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 90) return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20';
    if (confidence >= 80) return 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/20';
    if (confidence >= 70) return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/20';
    return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/20';
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 ${className}`} dir={isRTLMode ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <FiCpu className="text-purple-500" size={20} />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {isRTLMode ? 'البحث الذكي' : 'AI Search'}
        </h3>
        {useDummyData && (
          <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 rounded-full text-xs font-medium">
            {isRTLMode ? 'وضع تجريبي' : 'Demo Mode'}
          </span>
        )}
      </div>

      {/* Search Form */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="relative">
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder || (isRTLMode ? 'ابحث في الطلبات...' : 'Search applications...')}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            disabled={loading}
          />
          {loading && (
            <div className="absolute right-3 top-3">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-purple-500"></div>
            </div>
          )}
        </div>
      </form>

      {/* Search Suggestions */}
      {!loading && results.length === 0 && (
        <div className="mb-4">
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
            {isRTLMode ? 'اقتراحات البحث:' : 'Search suggestions:'}
          </p>
          <div className="flex flex-wrap gap-2">
            {dummySearchSuggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSearch(suggestion)}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Search History */}
      {searchHistory.length > 0 && (
        <div className="mb-4">
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
            {isRTLMode ? 'البحث الأخير:' : 'Recent searches:'}
          </p>
          <div className="flex flex-wrap gap-2">
            {searchHistory.map((item, index) => (
              <button
                key={index}
                onClick={() => handleSearch(item)}
                className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <div className="flex items-center gap-2">
            <FiAlertCircle className="text-yellow-500" />
            <p className="text-yellow-800 dark:text-yellow-200 text-sm">{error}</p>
          </div>
        </div>
      )}

      {/* Search Results */}
      {results.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900 dark:text-white">
            {isRTLMode ? 'نتائج البحث' : 'Search Results'}
          </h4>
          {results.map((result) => (
            <div key={result.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  {getResultIcon(result.type)}
                  <h5 className="font-medium text-gray-900 dark:text-white">
                    {result.title}
                  </h5>
                </div>
                <div className="flex items-center gap-2">
                  {result.count > 0 && (
                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full text-xs font-medium">
                      {result.count}
                    </span>
                  )}
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getConfidenceColor(result.confidence)}`}>
                    {result.confidence}%
                  </span>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                {result.description}
              </p>
              {result.details && (
                <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-600">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                    {Object.entries(result.details).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}:
                        </span>
                        <span className="text-gray-700 dark:text-gray-300 font-medium">
                          {Array.isArray(value) ? value.join(', ') : value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* No Results */}
      {!loading && results.length === 0 && query && (
        <div className="text-center py-8">
          <FiSearch className="text-gray-400 text-4xl mx-auto mb-2" />
          <p className="text-gray-600 dark:text-gray-300">
            {isRTLMode ? 'لم يتم العثور على نتائج' : 'No results found'}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {isRTLMode ? 'جرب مصطلحات بحث مختلفة' : 'Try different search terms'}
          </p>
        </div>
      )}
    </div>
  );
};

export default AISearchComponent;