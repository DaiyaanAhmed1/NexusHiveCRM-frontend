import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalization } from '../../../../hooks/useLocalization';
import { useRTL } from '../../../../hooks/useRTL';
import OperationalExcellence from '../../shared/components/OperationalExcellence';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../components/ui/card';
import { Button } from '../../../../components/ui/button';
import { Badge } from '../../../../components/ui/badge';
import enTranslations from '../../locals/en.json';
import arTranslations from '../../locals/ar.json';
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
    // Academic Operations
    academic: {
      totalPrograms: 45,
      activeStudents: 12500,
      facultyCount: 850,
      staffCount: 1200,
      classCapacity: 95,
      graduationRate: 78,
      retentionRate: 85,
      averageClassSize: 28
    },
    
    // Administrative Operations
    administrative: {
      departments: 12,
      administrativeStaff: 450,
      processAutomation: 35,
      digitalTransformation: 60,
      paperlessProcesses: 70,
      responseTime: 2.5,
      customerSatisfaction: 8.2,
      processEfficiency: 78
    },
    
    // Facility Operations
    facilities: {
      totalBuildings: 25,
      totalArea: 450000,
      utilizationRate: 72,
      maintenanceBacklog: 15,
      energyEfficiency: 65,
      spaceOptimization: 68,
      technologyIntegration: 55,
      accessibilityCompliance: 92
    },
    
    // Technology Operations
    technology: {
      itStaff: 85,
      systemUptime: 99.2,
      networkCapacity: 85,
      cloudAdoption: 70,
      cybersecurityScore: 88,
      digitalTools: 45,
      automationLevel: 25,
      dataAnalytics: 60
    },
    
    // Financial Operations
    financial: {
      operationalBudget: 45000000,
      costPerStudent: 3600,
      administrativeCosts: 12000000,
      facilityCosts: 8500000,
      technologyCosts: 3500000,
      efficiencyRatio: 0.85,
      costOptimization: 15,
      budgetUtilization: 92
    },
    
    // Quality & Compliance
    quality: {
      accreditationStatus: "Fully Accredited",
      complianceRate: 94,
      qualityScore: 8.7,
      auditFindings: 3,
      improvementInitiatives: 12,
      bestPractices: 8,
      innovationProjects: 6,
      continuousImprovement: 80
    },
    
    // Performance Metrics
    performance: {
      kpiScore: 82,
      efficiencyRating: "Good",
      productivityIndex: 1.15,
      serviceLevel: 88,
      turnaroundTime: 3.2,
      errorRate: 2.1,
      customerRating: 8.5,
      employeeSatisfaction: 7.8
    },
    
    // Resource Utilization
    resources: {
      staffUtilization: 85,
      facilityUtilization: 72,
      technologyUtilization: 68,
      budgetUtilization: 92,
      spaceUtilization: 75,
      equipmentUtilization: 80,
      timeUtilization: 78,
      energyUtilization: 65
    },
    
    // Process Management
    processes: {
      totalProcesses: 150,
      automatedProcesses: 45,
      standardizedProcesses: 120,
      documentedProcesses: 135,
      optimizedProcesses: 85,
      processEfficiency: 78,
      processCompliance: 92,
      processInnovation: 25
    },
    
    // Capacity & Planning
    capacity: {
      currentCapacity: 85,
      optimalCapacity: 90,
      growthCapacity: 15,
      constraintAreas: ["Classroom Space", "IT Infrastructure", "Parking"],
      expansionPlans: 3,
      resourceGaps: 2,
      scalingReadiness: 75,
      futurePlanning: 80
    }
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

  // Get health score color
  const getHealthScoreColor = (score) => {
    if (score >= 90) return "text-green-600";
    if (score >= 80) return "text-blue-600";
    if (score >= 70) return "text-yellow-600";
    if (score >= 60) return "text-orange-600";
    return "text-red-600";
  };

  return (
    <div className={`space-y-6 ${className}`} dir={isRTLMode ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {getTranslation('operationalExcellence.title', 'Operational Excellence')}
          </h1>
          <p className="text-gray-600 mt-1">
            {getTranslation('operationalExcellence.subtitle', 'AI-powered operational analysis and optimization insights for university operations')}
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowDetails(!showDetails)}
            className="flex items-center space-x-2"
          >
            {showDetails ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            <span>{showDetails ? 'Hide Details' : 'Show Details'}</span>
          </Button>
          
          <Button
            onClick={handleGenerateAnalysis}
            disabled={isGenerating}
            className="flex items-center space-x-2"
          >
            <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>{getTranslation('operationalExcellence.refresh', 'Refresh Analysis')}</span>
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {getTranslation('operationalExcellence.operationalHealth', 'Operational Health')}
                </p>
                <p className={`text-2xl font-bold ${getHealthScoreColor(operationalAnalysis?.operationalHealth?.score || 82)}`}>
                  {operationalAnalysis?.operationalHealth?.score || 82}
                </p>
              </div>
              <Activity className="w-8 h-8 text-blue-600" />
            </div>
            <div className="mt-2">
              <Badge className={getPriorityColor(operationalAnalysis?.operationalHealth?.rating || 'Good')}>
                {operationalAnalysis?.operationalHealth?.rating || 'Good'}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {getTranslation('operationalExcellence.processEfficiency', 'Process Efficiency')}
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {operationalAnalysis?.processEfficiency?.overallEfficiency || 78}%
                </p>
              </div>
              <Settings className="w-8 h-8 text-green-600" />
            </div>
            <div className="mt-2">
              <div className="flex items-center space-x-1">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-sm text-green-600">Improving</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {getTranslation('operationalExcellence.resourceUtilization', 'Resource Utilization')}
                </p>
                <p className="text-2xl font-bold text-purple-600">
                  {operationalAnalysis?.resourceUtilization?.staffUtilization?.current || 85}%
                </p>
              </div>
              <Users className="w-8 h-8 text-purple-600" />
            </div>
            <div className="mt-2">
              <div className="flex items-center space-x-1">
                <BarChart3 className="w-4 h-4 text-purple-500" />
                <span className="text-sm text-purple-600">Good</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {getTranslation('operationalExcellence.automationPotential', 'Automation Potential')}
                </p>
                <p className="text-2xl font-bold text-orange-600">
                  {operationalAnalysis?.automationOpportunities?.automationPotential || 35}%
                </p>
              </div>
              <Zap className="w-8 h-8 text-orange-600" />
            </div>
            <div className="mt-2">
              <div className="flex items-center space-x-1">
                <Target className="w-4 h-4 text-orange-500" />
                <span className="text-sm text-orange-600">High Impact</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Latest Analysis Summary */}
      {operationalAnalysis && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Lightbulb className="w-5 h-5" />
              <span>{getTranslation('operationalExcellence.latestAnalysis', 'Latest Operational Analysis')}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">
                  {getTranslation('operationalExcellence.keyInsights', 'Key Insights')}
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-700">
                      {operationalAnalysis.operationalHealth?.keyStrengths?.[0] || 'Strong operational processes'}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-700">
                      {operationalAnalysis.operationalHealth?.keyStrengths?.[1] || 'Good resource utilization'}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm text-gray-700">
                      {operationalAnalysis.operationalHealth?.keyChallenges?.[0] || 'Process optimization needed'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">
                  {getTranslation('operationalExcellence.topRecommendations', 'Top Recommendations')}
                </h4>
                <div className="space-y-2">
                  {(operationalAnalysis.recommendations || []).slice(0, 3).map((recommendation, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <div className="w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                        {index + 1}
                      </div>
                      <span className="text-sm text-gray-700">{recommendation}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">
                  {getTranslation('operationalExcellence.immediateActions', 'Immediate Actions')}
                </h4>
                <div className="space-y-2">
                  {(operationalAnalysis.actionItems || [])
                    .filter(item => item.priority === 'High' || item.timeline === 'Immediate')
                    .slice(0, 3)
                    .map((item, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <Clock className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-sm text-gray-700">{item.item}</span>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge className={getPriorityColor(item.priority)} size="sm">
                            {item.priority}
                          </Badge>
                          <span className="text-xs text-gray-500">{item.owner}</span>
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
          <CardTitle className="flex items-center space-x-2">
            <Target className="w-5 h-5" />
            <span>{getTranslation('operationalExcellence.quickActions', 'Quick Actions')}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="outline" className="flex items-center space-x-2 h-auto p-4">
              <Download className="w-4 h-4" />
              <div className="text-left">
                <div className="font-medium">{getTranslation('operationalExcellence.exportReport', 'Export Report')}</div>
                <div className="text-xs text-gray-500">{getTranslation('operationalExcellence.downloadPDF', 'Download PDF')}</div>
              </div>
            </Button>
            
            <Button variant="outline" className="flex items-center space-x-2 h-auto p-4">
              <Share2 className="w-4 h-4" />
              <div className="text-left">
                <div className="font-medium">{getTranslation('operationalExcellence.shareAnalysis', 'Share Analysis')}</div>
                <div className="text-xs text-gray-500">{getTranslation('operationalExcellence.sendToTeam', 'Send to Team')}</div>
              </div>
            </Button>
            
            <Button variant="outline" className="flex items-center space-x-2 h-auto p-4">
              <Settings className="w-4 h-4" />
              <div className="text-left">
                <div className="font-medium">{getTranslation('operationalExcellence.configureAlerts', 'Configure Alerts')}</div>
                <div className="text-xs text-gray-500">{getTranslation('operationalExcellence.setNotifications', 'Set Notifications')}</div>
              </div>
            </Button>
            
            <Button variant="outline" className="flex items-center space-x-2 h-auto p-4">
              <BarChart3 className="w-4 h-4" />
              <div className="text-left">
                <div className="font-medium">{getTranslation('operationalExcellence.viewHistory', 'View History')}</div>
                <div className="text-xs text-gray-500">{getTranslation('operationalExcellence.pastAnalyses', 'Past Analyses')}</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DirectorOperationalExcellence;