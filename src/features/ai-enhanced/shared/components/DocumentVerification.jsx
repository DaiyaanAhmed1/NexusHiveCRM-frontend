import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import { Badge } from "../../../../components/ui/badge";
import { useLocalization } from "../../../../hooks/useLocalization";
import { useRTL } from "../../../../hooks/useRTL";
import documentVerificationService from "../services/documentVerificationService";

const DocumentVerification = ({ 
  documentData, 
  onVerificationComplete, 
  showHistory = false,
  className = "" 
}) => {
  const { language } = useLocalization();
  const { isRTL } = useRTL();
  const [isLoading, setIsLoading] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);
  const [verificationHistory, setVerificationHistory] = useState([]);

  const handleVerification = async () => {
    if (!documentData) return;

    setIsLoading(true);
    try {
      const result = await documentVerificationService.verifyDocument(documentData, language);
      setVerificationResult(result);
      
      if (onVerificationComplete) {
        onVerificationComplete(result);
      }
    } catch (error) {
      console.error('Verification error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      case 'needs_review': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'approved': return language === 'ar' ? 'موافق عليه' : 'Approved';
      case 'rejected': return language === 'ar' ? 'مرفوض' : 'Rejected';
      case 'needs_review': return language === 'ar' ? 'يحتاج مراجعة' : 'Needs Review';
      default: return status;
    }
  };

  return (
    <div className={`document-verification ${className} ${isRTL ? 'rtl' : 'ltr'}`}>
      <Card>
        <CardHeader>
          <CardTitle>
            {language === 'ar' ? 'التحقق من الوثيقة' : 'Document Verification'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {documentData && (
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                {documentData.studentName}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {documentData.documentType} - {documentData.documentNumber}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500">
                {documentData.fileName} ({documentData.fileSize})
              </p>
            </div>
          )}

          <Button
            onClick={handleVerification}
            disabled={isLoading || !documentData}
            className="w-full"
          >
            {isLoading ? 
              (language === 'ar' ? 'جاري التحقق...' : 'Verifying...') :
              (language === 'ar' ? 'تحقق من الوثيقة' : 'Verify Document')
            }
          </Button>

          {verificationResult && (
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {language === 'ar' ? 'نتيجة التحقق' : 'Verification Result'}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {verificationResult.documentType}
                  </p>
                </div>
                <Badge className={getStatusColor(verificationResult.status)}>
                  {getStatusText(verificationResult.status)}
                </Badge>
              </div>

              {verificationResult.scores && Object.keys(verificationResult.scores).length > 0 && (
                <div className="mb-4">
                  <h5 className="font-medium text-gray-900 dark:text-white mb-2">
                    {language === 'ar' ? 'الدرجات' : 'Scores'}
                  </h5>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(verificationResult.scores).map(([category, score]) => (
                      <div key={category} className="flex justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                          {category.replace(/_/g, ' ')}
                        </span>
                        <span className="text-sm font-medium">{score}/100</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                <h5 className="font-medium text-gray-900 dark:text-white mb-2">
                  {language === 'ar' ? 'تحليل الذكاء الاصطناعي' : 'AI Analysis'}
                </h5>
                <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                  {verificationResult.aiAnalysis}
                </p>
              </div>

              {verificationResult.issues && verificationResult.issues.length > 0 && (
                <div className="mt-3">
                  <h5 className="font-medium text-red-600 dark:text-red-400 mb-2">
                    {language === 'ar' ? 'المشاكل المكتشفة' : 'Issues Found'}
                  </h5>
                  <ul className="list-disc list-inside text-sm text-red-600 dark:text-red-400">
                    {verificationResult.issues.map((issue, index) => (
                      <li key={index}>{issue}</li>
                    ))}
                  </ul>
                </div>
              )}

              {verificationResult.recommendations && verificationResult.recommendations.length > 0 && (
                <div className="mt-3">
                  <h5 className="font-medium text-blue-600 dark:text-blue-400 mb-2">
                    {language === 'ar' ? 'التوصيات' : 'Recommendations'}
                  </h5>
                  <ul className="list-disc list-inside text-sm text-blue-600 dark:text-blue-400">
                    {verificationResult.recommendations.map((rec, index) => (
                      <li key={index}>{rec}</li>
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

export default DocumentVerification;