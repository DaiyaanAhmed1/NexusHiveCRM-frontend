import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalization } from "/src/hooks/useLocalization";
import RiskAssessment from './RiskAssessment';
import riskAssessmentService from '../../services/riskAssessmentService';

const DirectorRiskAssessment = () => {
  const { t } = useTranslation();
  const { isRTLMode } = useLocalization();
  const [showRiskAssessment, setShowRiskAssessment] = useState(false);
  const [riskAssessment, setRiskAssessment] = useState(null);

  // Get translations based on current language
  const getTranslations = () => {
    return isRTLMode ? arTranslations : enTranslations;
  };

  // Helper function to get translation with fallback
  const getTranslation = (key, fallback) => {
    const translations = getTranslations();
    const keys = key.split('.');
    let value = translations;
    
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) break;
    }
    
    return value || fallback;
  };

  // Sample university data for risk assessment
  const getSampleUniversityData = () => {
    return {
      enrollment: {
        current: 8500,
        target: 10000,
        growth: 5.2,
        retention: 87.3
      },
      financial: {
        budget: 45000000,
        revenue: 42000000,
        expenses: 41000000,
        reserves: 8500000,
        debt: 12000000
      },
      academic: {
        programs: 45,
        faculty: 320,
        studentFacultyRatio: 26.5,
        accreditation: 'AACSB',
        researchFunding: 8500000
      },
      operational: {
        staff: 450,
        facilities: 12,
        technologyAge: 3.2,
        maintenanceBacklog: 2500000,
        energyCosts: 1200000
      },
      reputation: {
        ranking: 45,
        satisfaction: 4.2,
        employerRating: 4.1,
        socialMedia: {
          followers: 25000,
          engagement: 3.8
        }
      },
      compliance: {
        accreditationStatus: 'Active',
        lastAudit: '2024-01-15',
        violations: 0,
        trainingCompletion: 94.2
      },
      market: {
        competition: 'High',
        marketShare: 12.5,
        tuition: 25000,
        scholarships: 8500000,
        internationalStudents: 15.2
      }
    };
  };

  const handleAssessmentComplete = useCallback((assessment) => {
    console.log('Risk assessment completed:', assessment);
    setRiskAssessment(assessment);
  }, []);

  const toggleRiskAssessment = useCallback(() => {
    setShowRiskAssessment(prev => !prev);
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {getTranslation('ai.riskAssessment.title', 'Risk Assessment')}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            {getTranslation('ai.riskAssessment.directorSubtitle', 'AI-powered risk analysis for strategic decision making')}
          </p>
        </div>
        <button
          onClick={toggleRiskAssessment}
          className={`px-4 py-2 rounded-lg transition-colors ${
            showRiskAssessment
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          {showRiskAssessment
            ? getTranslation('ai.riskAssessment.hide', 'Hide Assessment')
            : getTranslation('ai.riskAssessment.show', 'Show Assessment')
          }
        </button>
      </div>

      {/* Quick Stats */}
      {riskAssessment && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {riskAssessment.totalRisks}
            </div>
            <div className="text-sm text-blue-800 dark:text-blue-200">
              {getTranslation('ai.riskAssessment.totalRisks', 'Total Risks')}
            </div>
          </div>
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">
              {riskAssessment.criticalRisks}
            </div>
            <div className="text-sm text-red-800 dark:text-red-200">
              {getTranslation('ai.riskAssessment.criticalRisks', 'Critical Risks')}
            </div>
          </div>
          <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              {riskAssessment.highRisks}
            </div>
            <div className="text-sm text-orange-800 dark:text-orange-200">
              {getTranslation('ai.riskAssessment.highRisks', 'High Risks')}
            </div>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {riskAssessment.risks?.filter(r => r.riskScore < 40).length || 0}
            </div>
            <div className="text-sm text-green-800 dark:text-green-200">
              {getTranslation('ai.riskAssessment.lowRisks', 'Low Risks')}
            </div>
          </div>
        </div>
      )}

      {/* Risk Assessment Component */}
      {showRiskAssessment && (
        <div className="mt-6">
          <RiskAssessment
            universityData={getSampleUniversityData()}
            onAssessmentComplete={handleAssessmentComplete}
          />
        </div>
      )}

      {/* Quick Actions */}
      {!showRiskAssessment && (
        <div className="space-y-4">
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
              {getTranslation('ai.riskAssessment.quickActions', 'Quick Actions')}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <button
                onClick={toggleRiskAssessment}
                className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
              >
                <span className="text-blue-600 dark:text-blue-400 text-lg">📊</span>
                <div className="text-left">
                  <div className="font-medium text-blue-900 dark:text-blue-100">
                    {getTranslation('ai.riskAssessment.runAssessment', 'Run Risk Assessment')}
                  </div>
                  <div className="text-sm text-blue-700 dark:text-blue-200">
                    {getTranslation('ai.riskAssessment.runAssessmentDesc', 'Analyze current risks and get AI recommendations')}
                  </div>
                </div>
              </button>
              
              <button
                onClick={() => {
                  // Future: View risk history
                  console.log('View risk history');
                }}
                className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
              >
                <span className="text-green-600 dark:text-green-400 text-lg">📈</span>
                <div className="text-left">
                  <div className="font-medium text-green-900 dark:text-green-100">
                    {getTranslation('ai.riskAssessment.viewHistory', 'View Risk History')}
                  </div>
                  <div className="text-sm text-green-700 dark:text-green-200">
                    {getTranslation('ai.riskAssessment.viewHistoryDesc', 'Review past assessments and trends')}
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Risk Categories Preview */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 dark:text-white mb-3">
              {getTranslation('ai.riskAssessment.riskCategories', 'Risk Categories')}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {[
                { category: 'financial', icon: '💰', name: getTranslation('ai.riskAssessment.financial', 'Financial') },
                { category: 'operational', icon: '⚙️', name: getTranslation('ai.riskAssessment.operational', 'Operational') },
                { category: 'strategic', icon: '🎯', name: getTranslation('ai.riskAssessment.strategic', 'Strategic') },
                { category: 'compliance', icon: '📋', name: getTranslation('ai.riskAssessment.compliance', 'Compliance') },
                { category: 'reputation', icon: '🏛️', name: getTranslation('ai.riskAssessment.reputation', 'Reputation') }
              ].map(({ category, icon, name }) => (
                <div key={category} className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-600">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">{icon}</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {name}
                    </span>
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-300">
                    {getTranslation(`ai.riskAssessment.${category}Desc`, `${category} risks`)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DirectorRiskAssessment;