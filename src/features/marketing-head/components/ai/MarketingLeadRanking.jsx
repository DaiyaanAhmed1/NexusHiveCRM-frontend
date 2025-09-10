import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalization } from '../../../../hooks/useLocalization';
// To this:
import { FiStar, FiTrendingUp, FiTrendingDown, FiMinus, FiRefreshCw, FiBarChart2 } from 'react-icons/fi';
import AILeadRanking from './AILeadRanking';

const MarketingLeadRanking = ({ leads, onRankingComplete }) => {
  const { t } = useTranslation();
  const { isRTLMode } = useLocalization();
  const [rankings, setRankings] = useState(null);
  const [isRanking, setIsRanking] = useState(false);
  const [rankingCriteria, setRankingCriteria] = useState('comprehensive');

  // Handle ranking completion
  const handleRankingComplete = (results) => {
    setRankings(results);
    setIsRanking(false);
    if (onRankingComplete) {
      onRankingComplete(results);
    }
  };

  // Handle ranking start
  const handleStartRanking = () => {
    setIsRanking(true);
    // Simulate AI ranking process
    setTimeout(() => {
      const mockRankings = leads.map((lead, index) => ({
        ...lead,
        rank: index + 1,
        score: Math.floor(Math.random() * 40) + 60, // 60-100
        trend: ['up', 'down', 'stable'][Math.floor(Math.random() * 3)],
        factors: [
          'High Engagement',
          'Complete Profile',
          'Quick Response',
          'High Interest',
          'Good Fit'
        ].slice(0, Math.floor(Math.random() * 3) + 2)
      })).sort((a, b) => b.score - a.score);
      
      handleRankingComplete(mockRankings);
    }, 2000);
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return <FiTrendingUp className="w-4 h-4 text-green-500" />;
      case 'down': return <FiTrendingDown className="w-4 h-4 text-red-500" />;
      default: return <FiMinus className="w-4 h-4 text-gray-500" />;
    }
  };

  const getTrendText = (trend) => {
    if (isRTLMode) {
      switch (trend) {
        case 'up': return 'صاعد';
        case 'down': return 'هابط';
        default: return 'مستقر';
      }
    } else {
      switch (trend) {
        case 'up': return 'Rising';
        case 'down': return 'Falling';
        default: return 'Stable';
      }
    }
  };

  return (
    <div className={`marketing-lead-ranking space-y-4 ${isRTLMode ? 'rtl' : 'ltr'}`}>
      {/* Header */}
      <div className={`flex items-center justify-between ${isRTLMode ? 'flex-row-reverse' : ''}`}>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {isRTLMode ? 'ترتيب العملاء بالذكاء الاصطناعي' : 'AI Lead Ranking'}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            {isRTLMode ? 'ترتيب العملاء حسب الأولوية والجودة' : 'Rank leads by priority and quality'}
          </p>
        </div>
        <button
          onClick={handleStartRanking}
          disabled={isRanking}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
        >
          <FiRefreshCw className={`w-4 h-4 ${isRanking ? 'animate-spin' : ''}`} />
          {isRTLMode ? 'بدء الترتيب' : 'Start Ranking'}
        </button>
      </div>

      {/* Ranking Criteria */}
      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
        <div className={`flex items-center gap-2 mb-3 ${isRTLMode ? 'flex-row-reverse' : ''}`}>
        <FiBarChart2 className="w-5 h-5 text-blue-500" />
          <h4 className="font-medium text-gray-900 dark:text-white">
            {isRTLMode ? 'معايير الترتيب' : 'Ranking Criteria'}
          </h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className={`flex items-center gap-2 ${isRTLMode ? 'flex-row-reverse' : ''}`}>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {isRTLMode ? 'مستوى التفاعل' : 'Engagement Level'}
            </span>
          </div>
          <div className={`flex items-center gap-2 ${isRTLMode ? 'flex-row-reverse' : ''}`}>
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {isRTLMode ? 'اكتمال الملف الشخصي' : 'Profile Completeness'}
            </span>
          </div>
          <div className={`flex items-center gap-2 ${isRTLMode ? 'flex-row-reverse' : ''}`}>
            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {isRTLMode ? 'سرعة الاستجابة' : 'Response Speed'}
            </span>
          </div>
        </div>
      </div>

      {/* Rankings */}
      {rankings && (
        <div className="space-y-3">
          <div className={`flex items-center justify-between ${isRTLMode ? 'flex-row-reverse' : ''}`}>
            <h4 className="font-medium text-gray-900 dark:text-white">
              {isRTLMode ? `الترتيب (${rankings.length} عميل)` : `Rankings (${rankings.length} leads)`}
            </h4>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {isRTLMode ? 'مرتبة حسب النقاط' : 'Sorted by score'}
            </div>
          </div>

          {rankings.map((lead, index) => (
            <div 
              key={lead.id} 
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4"
              dir={isRTLMode ? 'rtl' : 'ltr'}
            >
              <div className={`flex items-center justify-between ${isRTLMode ? 'flex-row-reverse' : ''}`}>
                <div className={`flex items-center gap-3 ${isRTLMode ? 'flex-row-reverse' : ''}`}>
                  {/* Rank */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    index < 3 ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {lead.rank}
                  </div>
                  
                  {/* Lead Info */}
                  <div className={isRTLMode ? 'text-right' : 'text-left'}>
                    <h5 className="font-medium text-gray-900 dark:text-white">{lead.name}</h5>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{lead.email}</p>
                  </div>
                </div>

                {/* Score and Trend */}
                <div className={`flex items-center gap-3 ${isRTLMode ? 'flex-row-reverse' : ''}`}>
                  <div className={isRTLMode ? 'text-left' : 'text-right'}>
                    <div className="text-lg font-bold text-gray-900 dark:text-white">{lead.score}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {isRTLMode ? 'نقطة' : 'points'}
                    </div>
                  </div>
                  
                  <div className={`flex items-center gap-1 ${isRTLMode ? 'flex-row-reverse' : ''}`}>
                    {getTrendIcon(lead.trend)}
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {getTrendText(lead.trend)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Factors */}
              <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                <div className={`flex flex-wrap gap-2 ${isRTLMode ? 'justify-end' : 'justify-start'}`}>
                  {lead.factors.map((factor, factorIndex) => (
                    <span 
                      key={factorIndex}
                      className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-xs rounded-full"
                    >
                      {factor}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Loading State */}
      {isRanking && (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiRefreshCw className="w-8 h-8 text-blue-500 animate-spin" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            {isRTLMode ? 'جاري ترتيب العملاء...' : 'Ranking leads...'}
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            {isRTLMode ? 'الذكاء الاصطناعي يحلل البيانات' : 'AI is analyzing the data'}
          </p>
        </div>
      )}

      {/* No Rankings */}
      {!rankings && !isRanking && (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiStar className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            {isRTLMode ? 'ابدأ ترتيب العملاء' : 'Start Lead Ranking'}
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            {isRTLMode ? 'اضغط على "بدء الترتيب" لتحليل العملاء' : 'Click "Start Ranking" to analyze leads'}
          </p>
        </div>
      )}
    </div>
  );
};

export default MarketingLeadRanking;