import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalization } from "../../../../hooks/useLocalization";
import { useRTL } from '../../../../hooks/useRTL';
import OperationalExcellence from './OperationalExcellence';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../components/ui/card';
import { Button } from '../../../../components/ui/button';
import { Badge } from '../../../../components/ui/badge';
import enTranslations from "../../../../locales/en/director.json";
import arTranslations from "../../../../locales/ar/director.json";
import { 
  Activity, 
  TrendingUp, 
  Users, 
  Building, 
  Monitor, 
  Target, 
  Zap, 
  DollarSign,
  BarChart3,
  Settings,
  Lightbulb,
  Clock,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Download,
  Share2,
  Eye,
  EyeOff
} from 'lucide-react';

const DirectorOperationalExcellence = ({ 
  onAnalysisComplete,
  className = "" 
}) => {
  const { t } = useTranslation();
  const { isRTLMode } = useLocalization();
  const { isRTLMode: rtlMode } = useRTL();
  const [operationalAnalysis, setOperationalAnalysis] = useState(null);
  const [showDetails, setShowDetails] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

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

  // Sample university operational data for Director role
  const sampleUniversityData = {
    // ... existing data ...
  };

  // Handle operational analysis completion
  const handleOperationalAnalysisComplete = useCallback((analysis) => {
    console.log("Operational excellence analysis completed:", analysis);
    setOperationalAnalysis(analysis);
    
    if (onAnalysisComplete) {
      onAnalysisComplete(analysis);
    }
  }, [onAnalysisComplete]);

  // Generate new analysis
  const handleGenerateAnalysis = useCallback(() => {
    setIsGenerating(true);
    // The OperationalExcellence component will handle the actual generation
    setTimeout(() => setIsGenerating(false), 1000);
  }, []);

  // Get priority color with dark mode support
  const getPriorityColor = (priority) => {
    if (!priority) return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    switch (priority.toLowerCase()) {
      case 'high': return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      case 'medium': return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
      case 'low': return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  // Get health score color with dark mode support
  const getHealthScoreColor = (score) => {
    if (score >= 90) return "text-green-600 dark:text-green-400";
    if (score >= 80) return "text-blue-600 dark:text-blue-400";
    if (score >= 70) return "text-yellow-600 dark:text-yellow-400";
    if (score >= 60) return "text-orange-600 dark:text-orange-400";
    return "text-red-600 dark:text-red-400";
  };

  return (
    <div className={`space-y-6 ${className}`} dir={isRTLMode ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className={`flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 ${isRTLMode ? 'flex-row-reverse' : ''}`}>
        <div className={isRTLMode ? 'text-right' : 'text-left'}>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {isRTLMode ? 'التميز التشغيلي والتحسين الذكي' : 'Operational Excellence & Smart Optimization'}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            {isRTLMode 
              ? 'تحليل تشغيلي متقدم لتحسين الكفاءة والأداء باستخدام الذكاء الاصطناعي' 
              : 'Advanced operational analysis for efficiency and performance optimization using AI'
            }
          </p>
        </div>
        
        <div className={`flex items-center space-x-3 ${isRTLMode ? 'flex-row-reverse space-x-reverse' : ''}`}>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowDetails(!showDetails)}
            className={`flex items-center space-x-2 ${isRTLMode ? 'flex-row-reverse space-x-reverse' : ''}`}
          >
            {showDetails ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            <span>{showDetails ? (isRTLMode ? 'إخفاء التفاصيل' : 'Hide Details') : (isRTLMode ? 'عرض التفاصيل' : 'Show Details')}</span>
          </Button>
          
          <Button
            onClick={handleGenerateAnalysis}
            disabled={isGenerating}
            className={`flex items-center space-x-2 ${isRTLMode ? 'flex-row-reverse space-x-reverse' : ''}`}
          >
            <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>{isRTLMode ? 'تحديث التحليل' : 'Refresh Analysis'}</span>
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className={`flex items-center justify-between ${isRTLMode ? 'flex-row-reverse' : ''}`}>
              <div className={isRTLMode ? 'text-right' : 'text-left'}>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {isRTLMode ? 'الصحة التشغيلية' : 'Operational Health'}
                </p>
                <p className={`text-2xl font-bold ${getHealthScoreColor(operationalAnalysis?.operationalHealth?.score || 82)}`}>
                  {operationalAnalysis?.operationalHealth?.score || 82}
                </p>
              </div>
              <Activity className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="mt-2">
              <Badge className={getPriorityColor(operationalAnalysis?.operationalHealth?.rating || 'Good')}>
                {operationalAnalysis?.operationalHealth?.rating || (isRTLMode ? 'جيد' : 'Good')}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className={`flex items-center justify-between ${isRTLMode ? 'flex-row-reverse' : ''}`}>
              <div className={isRTLMode ? 'text-right' : 'text-left'}>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {isRTLMode ? 'كفاءة العمليات' : 'Process Efficiency'}
                </p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {operationalAnalysis?.processEfficiency?.overallEfficiency || 78}%
                </p>
              </div>
              <Settings className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <div className="mt-2">
              <div className={`flex items-center space-x-1 ${isRTLMode ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <TrendingUp className="w-4 h-4 text-green-500 dark:text-green-400" />
                <span className="text-sm text-green-600 dark:text-green-400">
                  {isRTLMode ? 'يتحسن' : 'Improving'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className={`flex items-center justify-between ${isRTLMode ? 'flex-row-reverse' : ''}`}>
              <div className={isRTLMode ? 'text-right' : 'text-left'}>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {isRTLMode ? 'استخدام الموارد' : 'Resource Utilization'}
                </p>
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {operationalAnalysis?.resourceUtilization?.staffUtilization?.current || 85}%
                </p>
              </div>
              <Users className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="mt-2">
              <div className={`flex items-center space-x-1 ${isRTLMode ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <BarChart3 className="w-4 h-4 text-purple-500 dark:text-purple-400" />
                <span className="text-sm text-purple-600 dark:text-purple-400">
                  {isRTLMode ? 'جيد' : 'Good'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className={`flex items-center justify-between ${isRTLMode ? 'flex-row-reverse' : ''}`}>
              <div className={isRTLMode ? 'text-right' : 'text-left'}>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {isRTLMode ? 'إمكانات الأتمتة' : 'Automation Potential'}
                </p>
                <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                  {operationalAnalysis?.automationOpportunities?.automationPotential || 35}%
                </p>
              </div>
              <Zap className="w-8 h-8 text-orange-600 dark:text-orange-400" />
            </div>
            <div className="mt-2">
              <div className={`flex items-center space-x-1 ${isRTLMode ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <Target className="w-4 h-4 text-orange-500 dark:text-orange-400" />
                <span className="text-sm text-orange-600 dark:text-orange-400">
                  {isRTLMode ? 'تأثير عالي' : 'High Impact'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Latest Analysis Summary */}
      {operationalAnalysis && (
        <Card>
          <CardHeader>
            <CardTitle className={`flex items-center space-x-2 ${isRTLMode ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <Lightbulb className="w-5 h-5" />
              <span>{isRTLMode ? 'أحدث التحليل التشغيلي' : 'Latest Operational Analysis'}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                  {isRTLMode ? 'الرؤى الرئيسية' : 'Key Insights'}
                </h4>
                <div className="space-y-2">
                  <div className={`flex items-center space-x-2 ${isRTLMode ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <CheckCircle className="w-4 h-4 text-green-500 dark:text-green-400" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {operationalAnalysis.operationalHealth?.keyStrengths?.[0] || (isRTLMode ? 'عمليات تشغيلية قوية' : 'Strong operational processes')}
                    </span>
                  </div>
                  <div className={`flex items-center space-x-2 ${isRTLMode ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <CheckCircle className="w-4 h-4 text-green-500 dark:text-green-400" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {operationalAnalysis.operationalHealth?.keyStrengths?.[1] || (isRTLMode ? 'استخدام جيد للموارد' : 'Good resource utilization')}
                    </span>
                  </div>
                  <div className={`flex items-center space-x-2 ${isRTLMode ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <AlertCircle className="w-4 h-4 text-yellow-500 dark:text-yellow-400" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {operationalAnalysis.operationalHealth?.keyChallenges?.[0] || (isRTLMode ? 'تحسين العمليات مطلوب' : 'Process optimization needed')}
                    </span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                  {isRTLMode ? 'أفضل التوصيات' : 'Top Recommendations'}
                </h4>
                <div className="space-y-2">
                  {(operationalAnalysis.recommendations || []).slice(0, 3).map((recommendation, index) => (
                    <div key={index} className={`flex items-start space-x-2 ${isRTLMode ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className="w-5 h-5 bg-blue-600 dark:bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                        {index + 1}
                      </div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">{recommendation}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                  {isRTLMode ? 'الإجراءات الفورية' : 'Immediate Actions'}
                </h4>
                <div className="space-y-2">
                  {(operationalAnalysis.actionItems || [])
                    .filter(item => item.priority === 'High' || item.timeline === 'Immediate')
                    .slice(0, 3)
                    .map((item, index) => (
                    <div key={index} className={`flex items-start space-x-2 ${isRTLMode ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <Clock className="w-4 h-4 text-red-500 dark:text-red-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-sm text-gray-700 dark:text-gray-300">{item.item}</span>
                        <div className={`flex items-center space-x-2 mt-1 ${isRTLMode ? 'flex-row-reverse space-x-reverse' : ''}`}>
                          <Badge className={getPriorityColor(item.priority)} size="sm">
                            {item.priority}
                          </Badge>
                          <span className="text-xs text-gray-500 dark:text-gray-400">{item.owner}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Operational Excellence Component */}
      {showDetails && (
        <OperationalExcellence
          universityData={sampleUniversityData}
          onAnalysisComplete={handleOperationalAnalysisComplete}
          isRTL={isRTLMode}
        />
      )}

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className={`flex items-center space-x-2 ${isRTLMode ? 'flex-row-reverse space-x-reverse' : ''}`}>
            <Target className="w-5 h-5" />
            <span>{isRTLMode ? 'الإجراءات السريعة' : 'Quick Actions'}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="outline" className={`flex items-center space-x-2 h-auto p-4 ${isRTLMode ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <Download className="w-4 h-4" />
              <div className={isRTLMode ? 'text-right' : 'text-left'}>
                <div className="font-medium">{isRTLMode ? 'تصدير التقرير' : 'Export Report'}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{isRTLMode ? 'تحميل PDF' : 'Download PDF'}</div>
              </div>
            </Button>
            
            <Button variant="outline" className={`flex items-center space-x-2 h-auto p-4 ${isRTLMode ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <Share2 className="w-4 h-4" />
              <div className={isRTLMode ? 'text-right' : 'text-left'}>
                <div className="font-medium">{isRTLMode ? 'مشاركة التحليل' : 'Share Analysis'}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{isRTLMode ? 'إرسال للفريق' : 'Send to Team'}</div>
              </div>
            </Button>
            
            <Button variant="outline" className={`flex items-center space-x-2 h-auto p-4 ${isRTLMode ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <Settings className="w-4 h-4" />
              <div className={isRTLMode ? 'text-right' : 'text-left'}>
                <div className="font-medium">{isRTLMode ? 'تكوين التنبيهات' : 'Configure Alerts'}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{isRTLMode ? 'تعيين الإشعارات' : 'Set Notifications'}</div>
              </div>
            </Button>
            
            <Button variant="outline" className={`flex items-center space-x-2 h-auto p-4 ${isRTLMode ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <BarChart3 className="w-4 h-4" />
              <div className={isRTLMode ? 'text-right' : 'text-left'}>
                <div className="font-medium">{isRTLMode ? 'عرض التاريخ' : 'View History'}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{isRTLMode ? 'التحليلات السابقة' : 'Past Analyses'}</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DirectorOperationalExcellence;