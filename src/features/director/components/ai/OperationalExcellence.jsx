import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalization } from "../../../../hooks/useLocalization";
import operationalExcellenceService from '../../services/operationalExcellenceService';
import aiService from '../../../../services/aiService';
import aiLanguageService from '../../../../services/aiLanguageService';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../components/ui/card';
import { Button } from '../../../../components/ui/button';
import { Badge } from '../../../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../../components/ui/tabs';
import enTranslations from "../../../../locales/en/director.json";
import arTranslations from "../../../../locales/ar/director.json";
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Users, 
  Building, 
  Monitor, 
  Target, 
  Zap, 
  DollarSign, 
  BarChart3,
  CheckCircle,
  AlertCircle,
  Clock,
  ArrowUp,
  ArrowDown,
  Minus,
  Gauge,
  Settings,
  Lightbulb,
  TrendingUp as TrendingUpIcon
} from 'lucide-react';

const OperationalExcellence = ({ 
  universityData, 
  onAnalysisComplete,
  className = "",
  isRTL = false 
}) => {
  const { t } = useTranslation();
  const { isRTLMode } = useLocalization();
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [analysisType, setAnalysisType] = useState('efficiency');
  const [timePeriod, setTimePeriod] = useState('quarterly');

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

  // Generate operational analysis
  const generateAnalysis = useCallback(async () => {
    if (!universityData) return;

    setLoading(true);
    setError(null);

    try {
      console.log("Starting operational excellence analysis with data:", universityData);
      
      const result = await operationalExcellenceService.analyzeOperations(
        universityData,
        analysisType,
        timePeriod
      );

      console.log("Operational excellence analysis result:", result);
      
      setAnalysis(result);
      
      // Save to history
      operationalExcellenceService.saveToHistory(result);
      
      // Notify parent component
      if (onAnalysisComplete) {
        onAnalysisComplete(result);
      }
    } catch (err) {
      console.error("Operational excellence analysis error:", err);
      setError(err.message || "Failed to generate operational analysis");
    } finally {
      setLoading(false);
    }
  }, [universityData, analysisType, timePeriod, onAnalysisComplete]);

  // Auto-generate analysis on mount
  useEffect(() => {
    if (universityData && !analysis) {
      generateAnalysis();
    }
  }, [universityData, analysis, generateAnalysis]);

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

  // Get impact color with dark mode support
  const getImpactColor = (impact) => {
    if (!impact) return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    switch (impact.toLowerCase()) {
      case 'high': return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      case 'medium': return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
      case 'low': return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  // Get trend icon with dark mode support
  const getTrendIcon = (trend) => {
    if (!trend) return <Minus className="w-4 h-4 text-gray-500 dark:text-gray-400" />;
    switch (trend.toLowerCase()) {
      case 'up': return <ArrowUp className="w-4 h-4 text-green-500 dark:text-green-400" />;
      case 'down': return <ArrowDown className="w-4 h-4 text-red-500 dark:text-red-400" />;
      case 'stable': return <Minus className="w-4 h-4 text-gray-500 dark:text-gray-400" />;
      default: return <Minus className="w-4 h-4 text-gray-500 dark:text-gray-400" />;
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

  if (loading) {
    return (
      <div className={`flex items-center justify-center p-8 ${className}`}>
        <div className="text-center">
          <Activity className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600 dark:text-blue-400" />
          <p className="text-gray-600 dark:text-gray-300">
            {isRTLMode ? 'جاري تحليل التميز التشغيلي...' : 'Analyzing operational excellence...'}
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`p-6 ${className}`}>
        <Card className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20">
          <CardContent className="p-6">
            <div className={`flex items-center space-x-3 ${isRTLMode ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
              <div>
                <h3 className="text-lg font-semibold text-red-800 dark:text-red-300">
                  {isRTLMode ? 'خطأ في التحليل' : 'Analysis Error'}
                </h3>
                <p className="text-red-600 dark:text-red-400">{error}</p>
                <Button 
                  onClick={generateAnalysis}
                  className="mt-3"
                  variant="outline"
                  size="sm"
                >
                  {isRTLMode ? 'إعادة المحاولة' : 'Retry Analysis'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className={`p-6 ${className}`}>
        <Card>
          <CardContent className="p-6 text-center">
            <Activity className="w-12 h-12 mx-auto mb-4 text-gray-400 dark:text-gray-500" />
            <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2">
              {isRTLMode ? 'لا يوجد تحليل متاح' : 'No Analysis Available'}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              {isRTLMode ? 'قم بتوليد تحليل التميز التشغيلي لعرض الرؤى.' : 'Generate operational excellence analysis to view insights.'}
            </p>
            <Button onClick={generateAnalysis}>
              {isRTLMode ? 'توليد التحليل' : 'Generate Analysis'}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`} dir={isRTLMode ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 ${isRTLMode ? 'flex-row-reverse' : ''}`}>
        <div className={isRTLMode ? 'text-right' : 'text-left'}>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {isRTLMode ? 'التميز التشغيلي والتحسين الذكي' : 'Operational Excellence & Smart Optimization'}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            {isRTLMode 
              ? 'تحليل تشغيلي متقدم لتحسين الكفاءة والأداء باستخدام الذكاء الاصطناعي' 
              : 'Advanced operational analysis for efficiency and performance optimization using AI'
            }
          </p>
        </div>
        
        {/* Analysis Controls */}
        <div className={`flex flex-col sm:flex-row gap-3 ${isRTLMode ? 'flex-row-reverse' : ''}`}>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {isRTLMode ? 'نوع التحليل' : 'Analysis Type'}
            </label>
            <select
              value={analysisType}
              onChange={(e) => setAnalysisType(e.target.value)}
              className="w-40 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="efficiency">
                {isRTLMode ? 'الكفاءة' : 'Efficiency'}
              </option>
              <option value="optimization">
                {isRTLMode ? 'التحسين' : 'Optimization'}
              </option>
              <option value="benchmarking">
                {isRTLMode ? 'المقارنة المرجعية' : 'Benchmarking'}
              </option>
              <option value="automation">
                {isRTLMode ? 'الأتمتة' : 'Automation'}
              </option>
              <option value="quality">
                {isRTLMode ? 'الجودة' : 'Quality'}
              </option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {isRTLMode ? 'الفترة الزمنية' : 'Time Period'}
            </label>
            <select
              value={timePeriod}
              onChange={(e) => setTimePeriod(e.target.value)}
              className="w-32 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="monthly">
                {isRTLMode ? 'شهري' : 'Monthly'}
              </option>
              <option value="quarterly">
                {isRTLMode ? 'ربعي' : 'Quarterly'}
              </option>
              <option value="yearly">
                {isRTLMode ? 'سنوي' : 'Yearly'}
              </option>
              <option value="6-month">
                {isRTLMode ? '6 أشهر' : '6-Month'}
              </option>
            </select>
          </div>
          
          <div className="flex items-end">
            <Button onClick={generateAnalysis} disabled={loading}>
              {isRTLMode ? 'تحديث' : 'Refresh'}
            </Button>
          </div>
        </div>
      </div>

      {/* Summary */}
      <Card>
        <CardHeader>
          <CardTitle className={`flex items-center space-x-2 ${isRTLMode ? 'flex-row-reverse space-x-reverse' : ''}`}>
            <Gauge className="w-5 h-5" />
            <span>{isRTLMode ? 'ملخص التحليل' : 'Analysis Summary'}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {analysis.summary || (isRTLMode ? 'لا يوجد ملخص متاح.' : 'No summary available.')}
          </p>
        </CardContent>
      </Card>

      {/* Operational Health Score */}
      <Card>
        <CardHeader>
          <CardTitle className={`flex items-center space-x-2 ${isRTLMode ? 'flex-row-reverse space-x-reverse' : ''}`}>
            <Activity className="w-5 h-5" />
            <span>{isRTLMode ? 'الصحة التشغيلية' : 'Operational Health'}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className={`text-3xl font-bold ${getHealthScoreColor(analysis.operationalHealth?.score || 0)}`}>
                {analysis.operationalHealth?.score || 0}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {isRTLMode ? 'درجة الصحة' : 'Health Score'}
              </p>
            </div>
            
            <div className="text-center">
              <Badge className={`text-sm ${getPriorityColor(analysis.operationalHealth?.rating || 'Unknown')}`}>
                {analysis.operationalHealth?.rating || (isRTLMode ? 'غير معروف' : 'Unknown')}
              </Badge>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {isRTLMode ? 'التقييم' : 'Rating'}
              </p>
            </div>
            
            <div className="text-center">
              <div className={`flex items-center justify-center space-x-1 ${isRTLMode ? 'flex-row-reverse space-x-reverse' : ''}`}>
                {getTrendIcon(analysis.operationalHealth?.trend || 'stable')}
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {analysis.operationalHealth?.trend || (isRTLMode ? 'مستقر' : 'Stable')}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {isRTLMode ? 'الاتجاه' : 'Trend'}
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {isRTLMode ? 'آخر تحديث' : 'Last Updated'}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-500">
                {new Date(analysis.lastUpdated).toLocaleDateString()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Analysis Tabs */}
      <Tabs defaultValue="processes" className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
          <TabsTrigger value="processes">
            {isRTLMode ? 'العمليات' : 'Processes'}
          </TabsTrigger>
          <TabsTrigger value="resources">
            {isRTLMode ? 'الموارد' : 'Resources'}
          </TabsTrigger>
          <TabsTrigger value="performance">
            {isRTLMode ? 'الأداء' : 'Performance'}
          </TabsTrigger>
          <TabsTrigger value="optimization">
            {isRTLMode ? 'التحسين' : 'Optimization'}
          </TabsTrigger>
        </TabsList>

        {/* Process Efficiency Tab */}
        <TabsContent value="processes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className={`flex items-center space-x-2 ${isRTLMode ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <Settings className="w-5 h-5" />
                <span>{isRTLMode ? 'كفاءة العمليات' : 'Process Efficiency'}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Overall Efficiency */}
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                    {isRTLMode ? 'الكفاءة الإجمالية' : 'Overall Efficiency'}
                  </h4>
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {analysis.processEfficiency?.overallEfficiency || 0}%
                  </div>
                </div>

                {/* Bottlenecks */}
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                    {isRTLMode ? 'الاختناقات الرئيسية' : 'Key Bottlenecks'}
                  </h4>
                  <div className="space-y-2">
                    {(analysis.processEfficiency?.bottlenecks || []).slice(0, 3).map((bottleneck, index) => (
                      <div key={index} className={`flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded ${isRTLMode ? 'flex-row-reverse' : ''}`}>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{bottleneck.process || (isRTLMode ? 'عملية غير معروفة' : 'Unknown Process')}</span>
                        <Badge className={getPriorityColor(bottleneck.severity || 'Medium')}>
                          {bottleneck.severity || (isRTLMode ? 'متوسط' : 'Medium')}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Optimization Opportunities */}
              <div className="mt-6">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                  {isRTLMode ? 'فرص التحسين' : 'Optimization Opportunities'}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(analysis.processEfficiency?.optimizationOpportunities || []).map((opportunity, index) => (
                    <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
                      <div className={`flex items-center justify-between mb-2 ${isRTLMode ? 'flex-row-reverse' : ''}`}>
                        <h5 className="font-medium text-gray-900 dark:text-white">{opportunity.area || (isRTLMode ? 'منطقة غير معروفة' : 'Unknown Area')}</h5>
                        <Badge className={getPriorityColor(opportunity.priority || 'Medium')}>
                          {opportunity.priority || (isRTLMode ? 'متوسط' : 'Medium')}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        <div className={`flex items-center space-x-2 ${isRTLMode ? 'flex-row-reverse space-x-reverse' : ''}`}>
                          <TrendingUpIcon className="w-4 h-4" />
                          <span>{opportunity.potential || 0}% {isRTLMode ? 'إمكانات' : 'potential'}</span>
                        </div>
                        <div className={`flex items-center space-x-2 mt-1 ${isRTLMode ? 'flex-row-reverse space-x-reverse' : ''}`}>
                          <Clock className="w-4 h-4" />
                          <span>{opportunity.timeline || (isRTLMode ? 'غير معروف' : 'Unknown')}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Resource Utilization Tab */}
        <TabsContent value="resources" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className={`flex items-center space-x-2 ${isRTLMode ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <Users className="w-5 h-5" />
                <span>{isRTLMode ? 'استخدام الموارد' : 'Resource Utilization'}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Staff Utilization */}
                <div className="text-center">
                  <Users className="w-8 h-8 mx-auto mb-2 text-blue-600 dark:text-blue-400" />
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {isRTLMode ? 'استخدام الموظفين' : 'Staff Utilization'}
                  </h4>
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {analysis.resourceUtilization?.staffUtilization?.current || 0}%
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {isRTLMode ? 'الأمثل' : 'Optimal'}: {analysis.resourceUtilization?.staffUtilization?.optimal || 0}%
                  </p>
                  <Badge className={`mt-2 ${getImpactColor(analysis.resourceUtilization?.staffUtilization?.efficiency || 'Medium')}`}>
                    {analysis.resourceUtilization?.staffUtilization?.efficiency || (isRTLMode ? 'متوسط' : 'Medium')}
                  </Badge>
                </div>

                {/* Facility Utilization */}
                <div className="text-center">
                  <Building className="w-8 h-8 mx-auto mb-2 text-green-600 dark:text-green-400" />
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {isRTLMode ? 'استخدام المرافق' : 'Facility Utilization'}
                  </h4>
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {analysis.resourceUtilization?.facilityUtilization?.current || 0}%
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {isRTLMode ? 'الأمثل' : 'Optimal'}: {analysis.resourceUtilization?.facilityUtilization?.optimal || 0}%
                  </p>
                  <Badge className={`mt-2 ${getImpactColor(analysis.resourceUtilization?.facilityUtilization?.efficiency || 'Medium')}`}>
                    {analysis.resourceUtilization?.facilityUtilization?.efficiency || (isRTLMode ? 'متوسط' : 'Medium')}
                  </Badge>
                </div>

                {/* Technology Utilization */}
                <div className="text-center">
                  <Monitor className="w-8 h-8 mx-auto mb-2 text-purple-600 dark:text-purple-400" />
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {isRTLMode ? 'استخدام التكنولوجيا' : 'Technology Utilization'}
                  </h4>
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {analysis.resourceUtilization?.technologyUtilization?.current || 0}%
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {isRTLMode ? 'الأمثل' : 'Optimal'}: {analysis.resourceUtilization?.technologyUtilization?.optimal || 0}%
                  </p>
                  <Badge className={`mt-2 ${getImpactColor(analysis.resourceUtilization?.technologyUtilization?.efficiency || 'Medium')}`}>
                    {analysis.resourceUtilization?.technologyUtilization?.efficiency || (isRTLMode ? 'متوسط' : 'Medium')}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Performance Metrics Tab */}
        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className={`flex items-center space-x-2 ${isRTLMode ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <BarChart3 className="w-5 h-5" />
                <span>{isRTLMode ? 'مقاييس الأداء' : 'Performance Metrics'}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Operational KPIs */}
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                    {isRTLMode ? 'مؤشرات الأداء التشغيلي' : 'Operational KPIs'}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(analysis.performanceMetrics?.operationalKPIs || []).map((kpi, index) => (
                      <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
                        <div className={`flex items-center justify-between mb-2 ${isRTLMode ? 'flex-row-reverse' : ''}`}>
                          <h5 className="font-medium text-gray-900 dark:text-white">{kpi.kpi || (isRTLMode ? 'مؤشر غير معروف' : 'Unknown KPI')}</h5>
                          <div className={`flex items-center space-x-1 ${isRTLMode ? 'flex-row-reverse space-x-reverse' : ''}`}>
                            {getTrendIcon(kpi.trend || 'stable')}
                            <span className="text-sm text-gray-600 dark:text-gray-400">{kpi.trend || (isRTLMode ? 'مستقر' : 'Stable')}</span>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-sm">
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">{isRTLMode ? 'الحالي:' : 'Current:'}</span>
                            <div className="font-semibold text-gray-900 dark:text-white">{kpi.current || 0}</div>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">{isRTLMode ? 'الهدف:' : 'Target:'}</span>
                            <div className="font-semibold text-gray-900 dark:text-white">{kpi.target || 0}</div>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">{isRTLMode ? 'المعيار:' : 'Benchmark:'}</span>
                            <div className="font-semibold text-gray-900 dark:text-white">{kpi.benchmark || 0}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quality Management */}
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                    {isRTLMode ? 'إدارة الجودة' : 'Quality Management'}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {analysis.qualityManagement?.qualityScore || 0}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {isRTLMode ? 'درجة الجودة' : 'Quality Score'}
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {analysis.qualityManagement?.complianceRate || 0}%
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {isRTLMode ? 'معدل الامتثال' : 'Compliance Rate'}
                      </p>
                    </div>
                    <div className="text-center">
                      <Badge className={`text-sm ${getPriorityColor(analysis.qualityManagement?.qualityAreas?.[0]?.status || 'Good')}`}>
                        {analysis.qualityManagement?.qualityAreas?.[0]?.status || (isRTLMode ? 'جيد' : 'Good')}
                      </Badge>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {isRTLMode ? 'الحالة الإجمالية' : 'Overall Status'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Optimization Tab */}
        <TabsContent value="optimization" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Automation Opportunities */}
            <Card>
              <CardHeader>
                <CardTitle className={`flex items-center space-x-2 ${isRTLMode ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <Zap className="w-5 h-5" />
                  <span>{isRTLMode ? 'فرص الأتمتة' : 'Automation Opportunities'}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {analysis.automationOpportunities?.automationPotential || 0}%
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {isRTLMode ? 'إمكانات الأتمتة' : 'Automation Potential'}
                  </p>
                </div>
                
                <div className="space-y-3">
                  {(analysis.automationOpportunities?.opportunities || []).slice(0, 3).map((opportunity, index) => (
                    <div key={index} className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
                      <div className={`flex items-center justify-between mb-2 ${isRTLMode ? 'flex-row-reverse' : ''}`}>
                        <h5 className="font-medium text-sm text-gray-900 dark:text-white">{opportunity.process || (isRTLMode ? 'عملية غير معروفة' : 'Unknown Process')}</h5>
                        <Badge className={getPriorityColor(opportunity.automationLevel || 'Medium')}>
                          {opportunity.automationLevel || (isRTLMode ? 'متوسط' : 'Medium')}
                        </Badge>
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        <div className={`flex items-center space-x-2 ${isRTLMode ? 'flex-row-reverse space-x-reverse' : ''}`}>
                          <DollarSign className="w-3 h-3" />
                          <span>${(opportunity.savings || 0).toLocaleString()}</span>
                        </div>
                        <div className={`flex items-center space-x-2 mt-1 ${isRTLMode ? 'flex-row-reverse space-x-reverse' : ''}`}>
                          <Clock className="w-3 h-3" />
                          <span>{opportunity.timeline || (isRTLMode ? 'غير معروف' : 'Unknown')}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Cost Optimization */}
            <Card>
              <CardHeader>
                <CardTitle className={`flex items-center space-x-2 ${isRTLMode ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <DollarSign className="w-5 h-5" />
                  <span>{isRTLMode ? 'تحسين التكاليف' : 'Cost Optimization'}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    ${(analysis.costOptimization?.totalOperationalCosts || 0).toLocaleString()}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {isRTLMode ? 'إجمالي التكاليف التشغيلية' : 'Total Operational Costs'}
                  </p>
                </div>
                
                <div className="space-y-3">
                  {(analysis.costOptimization?.savingsOpportunities || []).slice(0, 3).map((opportunity, index) => (
                    <div key={index} className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
                      <div className={`flex items-center justify-between mb-2 ${isRTLMode ? 'flex-row-reverse' : ''}`}>
                        <h5 className="font-medium text-sm text-gray-900 dark:text-white">{opportunity.area || (isRTLMode ? 'منطقة غير معروفة' : 'Unknown Area')}</h5>
                        <Badge className={getPriorityColor(opportunity.priority || 'Medium')}>
                          {opportunity.priority || (isRTLMode ? 'متوسط' : 'Medium')}
                        </Badge>
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        <div className={`flex items-center space-x-2 ${isRTLMode ? 'flex-row-reverse space-x-reverse' : ''}`}>
                          <DollarSign className="w-3 h-3" />
                          <span>${(opportunity.potential || 0).toLocaleString()} {isRTLMode ? 'إمكانات' : 'potential'}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Items */}
          <Card>
            <CardHeader>
              <CardTitle className={`flex items-center space-x-2 ${isRTLMode ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <Target className="w-5 h-5" />
                <span>{isRTLMode ? 'بنود العمل' : 'Action Items'}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {(analysis.actionItems || []).map((item, index) => (
                  <div key={index} className={`flex items-start space-x-3 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 ${isRTLMode ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className="flex-shrink-0">
                      <CheckCircle className="w-5 h-5 text-green-500 dark:text-green-400" />
                    </div>
                    <div className="flex-1">
                      <h5 className="font-medium text-gray-900 dark:text-white">{item.item || (isRTLMode ? 'إجراء غير معروف' : 'Unknown Action')}</h5>
                      <div className={`flex items-center space-x-4 mt-2 ${isRTLMode ? 'flex-row-reverse space-x-reverse' : ''}`}>
                        <Badge className={getPriorityColor(item.priority || 'Medium')}>
                          {item.priority || (isRTLMode ? 'متوسط' : 'Medium')}
                        </Badge>
                        <Badge className={getImpactColor(item.impact || 'Medium')}>
                          {item.impact || (isRTLMode ? 'متوسط' : 'Medium')} {isRTLMode ? 'تأثير' : 'Impact'}
                        </Badge>
                        <div className={`flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400 ${isRTLMode ? 'flex-row-reverse space-x-reverse' : ''}`}>
                          <Clock className="w-4 h-4" />
                          <span>{item.timeline || (isRTLMode ? 'غير معروف' : 'Unknown')}</span>
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {isRTLMode ? 'المالك:' : 'Owner:'} {item.owner || (isRTLMode ? 'غير معروف' : 'Unknown')}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className={`flex items-center space-x-2 ${isRTLMode ? 'flex-row-reverse space-x-reverse' : ''}`}>
            <Lightbulb className="w-5 h-5" />
            <span>{isRTLMode ? 'التوصيات الرئيسية' : 'Key Recommendations'}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {(analysis.recommendations || []).map((recommendation, index) => (
              <div key={index} className={`flex items-start space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg ${isRTLMode ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className="flex-shrink-0">
                  <div className="w-6 h-6 bg-blue-600 dark:bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300">{recommendation}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OperationalExcellence;