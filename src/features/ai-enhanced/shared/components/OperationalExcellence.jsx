import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalization } from '../../../../hooks/useLocalization';
import operationalExcellenceService from '../services/operationalExcellenceService';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../components/ui/card';
import { Button } from '../../../../components/ui/button';
import { Badge } from '../../../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../../components/ui/tabs';
import enTranslations from '../../locals/en.json';
import arTranslations from '../../locals/ar.json';
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

  // Get priority color
  const getPriorityColor = (priority) => {
    if (!priority) return "bg-gray-100 text-gray-800";
    switch (priority.toLowerCase()) {
      case 'high': return "bg-red-100 text-red-800";
      case 'medium': return "bg-yellow-100 text-yellow-800";
      case 'low': return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  // Get impact color
  const getImpactColor = (impact) => {
    if (!impact) return "bg-gray-100 text-gray-800";
    switch (impact.toLowerCase()) {
      case 'high': return "bg-red-100 text-red-800";
      case 'medium': return "bg-yellow-100 text-yellow-800";
      case 'low': return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  // Get trend icon
  const getTrendIcon = (trend) => {
    if (!trend) return <Minus className="w-4 h-4 text-gray-500" />;
    switch (trend.toLowerCase()) {
      case 'up': return <ArrowUp className="w-4 h-4 text-green-500" />;
      case 'down': return <ArrowDown className="w-4 h-4 text-red-500" />;
      case 'stable': return <Minus className="w-4 h-4 text-gray-500" />;
      default: return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  // Get health score color
  const getHealthScoreColor = (score) => {
    if (score >= 90) return "text-green-600";
    if (score >= 80) return "text-blue-600";
    if (score >= 70) return "text-yellow-600";
    if (score >= 60) return "text-orange-600";
    return "text-red-600";
  };

  if (loading) {
    return (
      <div className={`flex items-center justify-center p-8 ${className}`}>
        <div className="text-center">
          <Activity className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">
            {getTranslation('operationalExcellence.analyzing', 'Analyzing operational excellence...')}
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`p-6 ${className}`}>
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <AlertCircle className="w-6 h-6 text-red-600" />
              <div>
                <h3 className="text-lg font-semibold text-red-800">
                  {getTranslation('operationalExcellence.error', 'Analysis Error')}
                </h3>
                <p className="text-red-600">{error}</p>
                <Button 
                  onClick={generateAnalysis}
                  className="mt-3"
                  variant="outline"
                  size="sm"
                >
                  {getTranslation('operationalExcellence.retry', 'Retry Analysis')}
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
            <Activity className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              {getTranslation('operationalExcellence.noData', 'No Analysis Available')}
            </h3>
            <p className="text-gray-500 mb-4">
              {getTranslation('operationalExcellence.noDataDesc', 'Generate operational excellence analysis to view insights.')}
            </p>
            <Button onClick={generateAnalysis}>
              {getTranslation('operationalExcellence.generate', 'Generate Analysis')}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {getTranslation('operationalExcellence.title', 'Operational Excellence')}
          </h2>
          <p className="text-gray-600 mt-1">
            {getTranslation('operationalExcellence.subtitle', 'AI-powered operational analysis and optimization insights')}
          </p>
        </div>
        
        {/* Analysis Controls */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {getTranslation('operationalExcellence.analysisType', 'Analysis Type')}
            </label>
            <select
              value={analysisType}
              onChange={(e) => setAnalysisType(e.target.value)}
              className="w-40 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="efficiency">
                {getTranslation('operationalExcellence.efficiency', 'Efficiency')}
              </option>
              <option value="optimization">
                {getTranslation('operationalExcellence.optimization', 'Optimization')}
              </option>
              <option value="benchmarking">
                {getTranslation('operationalExcellence.benchmarking', 'Benchmarking')}
              </option>
              <option value="automation">
                {getTranslation('operationalExcellence.automation', 'Automation')}
              </option>
              <option value="quality">
                {getTranslation('operationalExcellence.quality', 'Quality')}
              </option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {getTranslation('operationalExcellence.timePeriod', 'Time Period')}
            </label>
            <select
              value={timePeriod}
              onChange={(e) => setTimePeriod(e.target.value)}
              className="w-32 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="monthly">
                {getTranslation('operationalExcellence.monthly', 'Monthly')}
              </option>
              <option value="quarterly">
                {getTranslation('operationalExcellence.quarterly', 'Quarterly')}
              </option>
              <option value="yearly">
                {getTranslation('operationalExcellence.yearly', 'Yearly')}
              </option>
              <option value="6-month">
                {getTranslation('operationalExcellence.sixMonth', '6-Month')}
              </option>
            </select>
          </div>
          
          <div className="flex items-end">
            <Button onClick={generateAnalysis} disabled={loading}>
              {getTranslation('operationalExcellence.refresh', 'Refresh')}
            </Button>
          </div>
        </div>
      </div>

      {/* Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Gauge className="w-5 h-5" />
            <span>{getTranslation('operationalExcellence.summary', 'Analysis Summary')}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 leading-relaxed">
            {analysis.summary || getTranslation('operationalExcellence.noSummary', 'No summary available.')}
          </p>
        </CardContent>
      </Card>

      {/* Operational Health Score */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="w-5 h-5" />
            <span>{getTranslation('operationalExcellence.operationalHealth', 'Operational Health')}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className={`text-3xl font-bold ${getHealthScoreColor(analysis.operationalHealth?.score || 0)}`}>
                {analysis.operationalHealth?.score || 0}
              </div>
              <p className="text-sm text-gray-600">
                {getTranslation('operationalExcellence.healthScore', 'Health Score')}
              </p>
            </div>
            
            <div className="text-center">
              <Badge className={`text-sm ${getPriorityColor(analysis.operationalHealth?.rating || 'Unknown')}`}>
                {analysis.operationalHealth?.rating || 'Unknown'}
              </Badge>
              <p className="text-sm text-gray-600 mt-1">
                {getTranslation('operationalExcellence.rating', 'Rating')}
              </p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1">
                {getTrendIcon(analysis.operationalHealth?.trend || 'stable')}
                <span className="text-sm font-medium">
                  {analysis.operationalHealth?.trend || 'Stable'}
                </span>
              </div>
              <p className="text-sm text-gray-600">
                {getTranslation('operationalExcellence.trend', 'Trend')}
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-sm text-gray-600">
                {getTranslation('operationalExcellence.lastUpdated', 'Last Updated')}
              </div>
              <p className="text-xs text-gray-500">
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
            {getTranslation('operationalExcellence.processes', 'Processes')}
          </TabsTrigger>
          <TabsTrigger value="resources">
            {getTranslation('operationalExcellence.resources', 'Resources')}
          </TabsTrigger>
          <TabsTrigger value="performance">
            {getTranslation('operationalExcellence.performance', 'Performance')}
          </TabsTrigger>
          <TabsTrigger value="optimization">
            {getTranslation('operationalExcellence.optimization', 'Optimization')}
          </TabsTrigger>
        </TabsList>

        {/* Process Efficiency Tab */}
        <TabsContent value="processes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="w-5 h-5" />
                <span>{getTranslation('operationalExcellence.processEfficiency', 'Process Efficiency')}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Overall Efficiency */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">
                    {getTranslation('operationalExcellence.overallEfficiency', 'Overall Efficiency')}
                  </h4>
                  <div className="text-2xl font-bold text-blue-600">
                    {analysis.processEfficiency?.overallEfficiency || 0}%
                  </div>
                </div>

                {/* Bottlenecks */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">
                    {getTranslation('operationalExcellence.bottlenecks', 'Key Bottlenecks')}
                  </h4>
                  <div className="space-y-2">
                    {(analysis.processEfficiency?.bottlenecks || []).slice(0, 3).map((bottleneck, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm font-medium">{bottleneck.process || 'Unknown Process'}</span>
                        <Badge className={getPriorityColor(bottleneck.severity || 'Medium')}>
                          {bottleneck.severity || 'Medium'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Optimization Opportunities */}
              <div className="mt-6">
                <h4 className="font-semibold text-gray-900 mb-3">
                  {getTranslation('operationalExcellence.optimizationOpportunities', 'Optimization Opportunities')}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(analysis.processEfficiency?.optimizationOpportunities || []).map((opportunity, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium">{opportunity.area || 'Unknown Area'}</h5>
                        <Badge className={getPriorityColor(opportunity.priority || 'Medium')}>
                          {opportunity.priority || 'Medium'}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <TrendingUpIcon className="w-4 h-4" />
                          <span>{opportunity.potential || 0}% potential</span>
                        </div>
                        <div className="flex items-center space-x-2 mt-1">
                          <Clock className="w-4 h-4" />
                          <span>{opportunity.timeline || 'Unknown'}</span>
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
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>{getTranslation('operationalExcellence.resourceUtilization', 'Resource Utilization')}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Staff Utilization */}
                <div className="text-center">
                  <Users className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {getTranslation('operationalExcellence.staffUtilization', 'Staff Utilization')}
                  </h4>
                  <div className="text-2xl font-bold text-blue-600">
                    {analysis.resourceUtilization?.staffUtilization?.current || 0}%
                  </div>
                  <p className="text-sm text-gray-600">
                    {getTranslation('operationalExcellence.optimal', 'Optimal')}: {analysis.resourceUtilization?.staffUtilization?.optimal || 0}%
                  </p>
                  <Badge className={`mt-2 ${getImpactColor(analysis.resourceUtilization?.staffUtilization?.efficiency || 'Medium')}`}>
                    {analysis.resourceUtilization?.staffUtilization?.efficiency || 'Medium'}
                  </Badge>
                </div>

                {/* Facility Utilization */}
                <div className="text-center">
                  <Building className="w-8 h-8 mx-auto mb-2 text-green-600" />
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {getTranslation('operationalExcellence.facilityUtilization', 'Facility Utilization')}
                  </h4>
                  <div className="text-2xl font-bold text-green-600">
                    {analysis.resourceUtilization?.facilityUtilization?.current || 0}%
                  </div>
                  <p className="text-sm text-gray-600">
                    {getTranslation('operationalExcellence.optimal', 'Optimal')}: {analysis.resourceUtilization?.facilityUtilization?.optimal || 0}%
                  </p>
                  <Badge className={`mt-2 ${getImpactColor(analysis.resourceUtilization?.facilityUtilization?.efficiency || 'Medium')}`}>
                    {analysis.resourceUtilization?.facilityUtilization?.efficiency || 'Medium'}
                  </Badge>
                </div>

                {/* Technology Utilization */}
                <div className="text-center">
                  <Monitor className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {getTranslation('operationalExcellence.technologyUtilization', 'Technology Utilization')}
                  </h4>
                  <div className="text-2xl font-bold text-purple-600">
                    {analysis.resourceUtilization?.technologyUtilization?.current || 0}%
                  </div>
                  <p className="text-sm text-gray-600">
                    {getTranslation('operationalExcellence.optimal', 'Optimal')}: {analysis.resourceUtilization?.technologyUtilization?.optimal || 0}%
                  </p>
                  <Badge className={`mt-2 ${getImpactColor(analysis.resourceUtilization?.technologyUtilization?.efficiency || 'Medium')}`}>
                    {analysis.resourceUtilization?.technologyUtilization?.efficiency || 'Medium'}
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
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5" />
                <span>{getTranslation('operationalExcellence.performanceMetrics', 'Performance Metrics')}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Operational KPIs */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">
                    {getTranslation('operationalExcellence.operationalKPIs', 'Operational KPIs')}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(analysis.performanceMetrics?.operationalKPIs || []).map((kpi, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-medium">{kpi.kpi || 'Unknown KPI'}</h5>
                          <div className="flex items-center space-x-1">
                            {getTrendIcon(kpi.trend || 'stable')}
                            <span className="text-sm text-gray-600">{kpi.trend || 'Stable'}</span>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-sm">
                          <div>
                            <span className="text-gray-600">{getTranslation('operationalExcellence.current', 'Current')}:</span>
                            <div className="font-semibold">{kpi.current || 0}</div>
                          </div>
                          <div>
                            <span className="text-gray-600">{getTranslation('operationalExcellence.target', 'Target')}:</span>
                            <div className="font-semibold">{kpi.target || 0}</div>
                          </div>
                          <div>
                            <span className="text-gray-600">{getTranslation('operationalExcellence.benchmark', 'Benchmark')}:</span>
                            <div className="font-semibold">{kpi.benchmark || 0}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quality Management */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">
                    {getTranslation('operationalExcellence.qualityManagement', 'Quality Management')}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {analysis.qualityManagement?.qualityScore || 0}
                      </div>
                      <p className="text-sm text-gray-600">
                        {getTranslation('operationalExcellence.qualityScore', 'Quality Score')}
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {analysis.qualityManagement?.complianceRate || 0}%
                      </div>
                      <p className="text-sm text-gray-600">
                        {getTranslation('operationalExcellence.complianceRate', 'Compliance Rate')}
                      </p>
                    </div>
                    <div className="text-center">
                      <Badge className={`text-sm ${getPriorityColor(analysis.qualityManagement?.qualityAreas?.[0]?.status || 'Good')}`}>
                        {analysis.qualityManagement?.qualityAreas?.[0]?.status || 'Good'}
                      </Badge>
                      <p className="text-sm text-gray-600 mt-1">
                        {getTranslation('operationalExcellence.overallStatus', 'Overall Status')}
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
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="w-5 h-5" />
                  <span>{getTranslation('operationalExcellence.automationOpportunities', 'Automation Opportunities')}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="text-2xl font-bold text-blue-600">
                    {analysis.automationOpportunities?.automationPotential || 0}%
                  </div>
                  <p className="text-sm text-gray-600">
                    {getTranslation('operationalExcellence.automationPotential', 'Automation Potential')}
                  </p>
                </div>
                
                <div className="space-y-3">
                  {(analysis.automationOpportunities?.opportunities || []).slice(0, 3).map((opportunity, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium text-sm">{opportunity.process || 'Unknown Process'}</h5>
                        <Badge className={getPriorityColor(opportunity.automationLevel || 'Medium')}>
                          {opportunity.automationLevel || 'Medium'}
                        </Badge>
                      </div>
                      <div className="text-xs text-gray-600">
                        <div className="flex items-center space-x-2">
                          <DollarSign className="w-3 h-3" />
                          <span>${(opportunity.savings || 0).toLocaleString()}</span>
                        </div>
                        <div className="flex items-center space-x-2 mt-1">
                          <Clock className="w-3 h-3" />
                          <span>{opportunity.timeline || 'Unknown'}</span>
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
                <CardTitle className="flex items-center space-x-2">
                  <DollarSign className="w-5 h-5" />
                  <span>{getTranslation('operationalExcellence.costOptimization', 'Cost Optimization')}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="text-2xl font-bold text-green-600">
                    ${(analysis.costOptimization?.totalOperationalCosts || 0).toLocaleString()}
                  </div>
                  <p className="text-sm text-gray-600">
                    {getTranslation('operationalExcellence.totalCosts', 'Total Operational Costs')}
                  </p>
                </div>
                
                <div className="space-y-3">
                  {(analysis.costOptimization?.savingsOpportunities || []).slice(0, 3).map((opportunity, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium text-sm">{opportunity.area || 'Unknown Area'}</h5>
                        <Badge className={getPriorityColor(opportunity.priority || 'Medium')}>
                          {opportunity.priority || 'Medium'}
                        </Badge>
                      </div>
                      <div className="text-xs text-gray-600">
                        <div className="flex items-center space-x-2">
                          <DollarSign className="w-3 h-3" />
                          <span>${(opportunity.potential || 0).toLocaleString()} potential</span>
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
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-5 h-5" />
                <span>{getTranslation('operationalExcellence.actionItems', 'Action Items')}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {(analysis.actionItems || []).map((item, index) => (
                  <div key={index} className="flex items-start space-x-3 p-4 border rounded-lg">
                    <div className="flex-shrink-0">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                    <div className="flex-1">
                      <h5 className="font-medium text-gray-900">{item.item || 'Unknown Action'}</h5>
                      <div className="flex items-center space-x-4 mt-2">
                        <Badge className={getPriorityColor(item.priority || 'Medium')}>
                          {item.priority || 'Medium'}
                        </Badge>
                        <Badge className={getImpactColor(item.impact || 'Medium')}>
                          {item.impact || 'Medium'} Impact
                        </Badge>
                        <div className="flex items-center space-x-1 text-sm text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>{item.timeline || 'Unknown'}</span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {getTranslation('operationalExcellence.owner', 'Owner')}: {item.owner || 'Unknown'}
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
          <CardTitle className="flex items-center space-x-2">
            <Lightbulb className="w-5 h-5" />
            <span>{getTranslation('operationalExcellence.recommendations', 'Key Recommendations')}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {(analysis.recommendations || []).map((recommendation, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                <div className="flex-shrink-0">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                </div>
                <p className="text-gray-700">{recommendation}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OperationalExcellence;