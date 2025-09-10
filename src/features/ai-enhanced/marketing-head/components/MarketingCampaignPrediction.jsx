import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalization } from '../../../../hooks/useLocalization';
import CampaignPrediction from '../../shared/components/CampaignPrediction';

const MarketingCampaignPrediction = ({ onPredictionComplete }) => {
  const { t } = useTranslation();
  const { isRTLMode } = useLocalization();
  const [predictions, setPredictions] = useState([]);

  const handlePredictionComplete = (prediction) => {
    console.log('Campaign prediction completed:', prediction);
    setPredictions(prev => [prediction, ...prev]);
    
    if (onPredictionComplete) {
      onPredictionComplete(prediction);
    }
  };

  return (
    <div className="marketing-campaign-prediction">
      <CampaignPrediction onPredictionComplete={handlePredictionComplete} />
      
      {/* Recent Predictions */}
      {predictions.length > 0 && (
        <div className="mt-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Recent Predictions
            </h3>
            <div className="space-y-3">
              {predictions.slice(0, 3).map((prediction, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {prediction.campaignTitle}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {prediction.campaignType} • {prediction.successProbability}% success probability
                    </p>
                  </div>
                  <div className="text-right">
                    <div className={`text-lg font-bold ${
                      prediction.successProbability >= 80 ? 'text-green-600' :
                      prediction.successProbability >= 60 ? 'text-yellow-600' :
                      prediction.successProbability >= 40 ? 'text-orange-600' : 'text-red-600'
                    }`}>
                      {prediction.successProbability}%
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {prediction.confidence} confidence
                    </div>
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

export default MarketingCampaignPrediction;