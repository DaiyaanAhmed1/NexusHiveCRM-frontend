import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import { Badge } from "../../../../components/ui/badge";
import { useLocalization } from "../../../../hooks/useLocalization";
import { useRTL } from "../../../../hooks/useRTL";
import interviewSchedulingService from "../../../services/interviewSchedulingService";

const InterviewScheduling = ({ 
  studentData, 
  onSchedulingComplete, 
  showHistory = false,
  className = "" 
}) => {
  const { language } = useLocalization();
  const { isRTL } = useRTL();
  const [isLoading, setIsLoading] = useState(false);
  const [schedulingResult, setSchedulingResult] = useState(null);
  const [interviewHistory, setInterviewHistory] = useState([]);

  const handleScheduling = async () => {
    if (!studentData) return;

    setIsLoading(true);
    try {
      const result = await interviewSchedulingService.scheduleInterview(studentData, language);
      setSchedulingResult(result);
      
      if (onSchedulingComplete) {
        onSchedulingComplete(result);
      }
    } catch (error) {
      console.error('Scheduling error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'scheduled': return language === 'ar' ? 'مجدول' : 'Scheduled';
      case 'completed': return language === 'ar' ? 'مكتمل' : 'Completed';
      case 'cancelled': return language === 'ar' ? 'ملغي' : 'Cancelled';
      default: return status;
    }
  };

  return (
    <div className={`interview-scheduling ${className} ${isRTL ? 'rtl' : 'ltr'}`}>
      <Card>
        <CardHeader>
          <CardTitle>
            {language === 'ar' ? 'جدولة المقابلة' : 'Interview Scheduling'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {studentData && (
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                {studentData.studentName}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {studentData.program} - {studentData.interviewType}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500">
                {studentData.preferredDate} at {studentData.preferredTime}
              </p>
            </div>
          )}

          <Button
            onClick={handleScheduling}
            disabled={isLoading || !studentData}
            className="w-full"
          >
            {isLoading ? 
              (language === 'ar' ? 'جاري الجدولة...' : 'Scheduling...') :
              (language === 'ar' ? 'جدولة المقابلة' : 'Schedule Interview')
            }
          </Button>

          {schedulingResult && (
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {language === 'ar' ? 'نتيجة الجدولة' : 'Scheduling Result'}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {schedulingResult.program} - {schedulingResult.interviewType}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {schedulingResult.scheduledDate} at {schedulingResult.scheduledTime}
                  </p>
                </div>
                <Badge className={getStatusColor(schedulingResult.status)}>
                  {getStatusText(schedulingResult.status)}
                </Badge>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                <h5 className="font-medium text-gray-900 dark:text-white mb-2">
                  {language === 'ar' ? 'توصيات الذكاء الاصطناعي' : 'AI Recommendations'}
                </h5>
                <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                  {schedulingResult.aiRecommendations}
                </p>
              </div>

              {schedulingResult.preparationSuggestions && schedulingResult.preparationSuggestions.length > 0 && (
                <div className="mt-3">
                  <h5 className="font-medium text-blue-600 dark:text-blue-400 mb-2">
                    {language === 'ar' ? 'اقتراحات التحضير' : 'Preparation Suggestions'}
                  </h5>
                  <ul className="list-disc list-inside text-sm text-blue-600 dark:text-blue-400">
                    {schedulingResult.preparationSuggestions.map((suggestion, index) => (
                      <li key={index}>{suggestion}</li>
                    ))}
                  </ul>
                </div>
              )}

              {schedulingResult.requiredDocuments && schedulingResult.requiredDocuments.length > 0 && (
                <div className="mt-3">
                  <h5 className="font-medium text-green-600 dark:text-green-400 mb-2">
                    {language === 'ar' ? 'الوثائق المطلوبة' : 'Required Documents'}
                  </h5>
                  <ul className="list-disc list-inside text-sm text-green-600 dark:text-green-400">
                    {schedulingResult.requiredDocuments.map((doc, index) => (
                      <li key={index}>{doc}</li>
                    ))}
                  </ul>
                </div>
              )}

              {schedulingResult.preInterviewChecklist && schedulingResult.preInterviewChecklist.length > 0 && (
                <div className="mt-3">
                  <h5 className="font-medium text-purple-600 dark:text-purple-400 mb-2">
                    {language === 'ar' ? 'قائمة التحقق قبل المقابلة' : 'Pre-Interview Checklist'}
                  </h5>
                  <ul className="list-disc list-inside text-sm text-purple-600 dark:text-purple-400">
                    {schedulingResult.preInterviewChecklist.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default InterviewScheduling;