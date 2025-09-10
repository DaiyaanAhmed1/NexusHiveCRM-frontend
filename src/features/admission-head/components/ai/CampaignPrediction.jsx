import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalization } from '../../../../hooks/useLocalization';
import campaignPredictionService from '../../../services/campaignPredictionService'; // ← Fixed: changed '../services/' to '../../../services/'

const CampaignPrediction = ({ onPredictionComplete }) => {
  const { t } = useTranslation();
  const { isRTLMode } = useLocalization();
  const [campaignData, setCampaignData] = useState({
    type: 'email',
    title: '',
    targetAudience: '',
    budget: '',
    duration: '',
    content: '',
    channels: [],
    goals: '',
    launchDate: ''
  });
  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle form input changes
  const handleInputChange = (field, value) => {
    setCampaignData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle channel selection
  const handleChannelToggle = (channel) => {
    setCampaignData(prev => ({
      ...prev,
      channels: prev.channels.includes(channel)
        ? prev.channels.filter(c => c !== channel)
        : [...prev.channels, channel]
    }));
  };

  // Handle campaign prediction
  const handlePredict = async () => {
    if (!campaignData.title || !campaignData.targetAudience) {
      setError('Please fill in required fields');
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const result = await campaignPredictionService.predictCampaign(campaignData);
      setPrediction(result);
      
      // Add to history
      campaignPredictionService.addToHistory(result);
      
      // Notify parent component
      if (onPredictionComplete) {
        onPredictionComplete(result);
      }
    } catch (err) {
      setError(err.message);
      console.error('Error predicting campaign:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Get campaign types
  const campaignTypes = campaignPredictionService.getCampaignTypes();
  const channels = ['Email', 'Social Media', 'Website', 'Events', 'Paid Ads'];

  // Get probability color
  const getProbabilityColor = (probability) => {
    if (probability >= 80) return 'text-green-600';
    if (probability >= 60) return 'text-yellow-600';
    if (probability >= 40) return 'text-orange-600';
    return 'text-red-600';
  };

  // Get confidence color
  const getConfidenceColor = (confidence) => {
    switch (confidence.toLowerCase()) {
      case 'high':
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400';
      case 'medium':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400';
      case 'low':
        return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-400';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Campaign Performance Prediction
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
              AI-powered campaign success forecasting
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={handlePredict}
              disabled={isLoading || !campaignData.title || !campaignData.targetAudience}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white rounded-lg transition-colors text-sm"
            >
              {isLoading ? 'Predicting...' : 'Predict Performance'}
            </button>
          </div>
        </div>
      </div>

      {/* Campaign Form */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Campaign Type */}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
              Campaign Type *
            </label>
            <select
              value={campaignData.type}
              onChange={(e) => handleInputChange('type', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              {campaignTypes.map((type) => (
                <option key={type} value={type}>
                  {campaignPredictionService.getCampaignTypeDisplayName(type)}
                </option>
              ))}
            </select>
          </div>

          {/* Campaign Title */}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
              Campaign Title *
            </label>
            <input
              type="text"
              value={campaignData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Enter campaign title"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          {/* Target Audience */}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
              Target Audience *
            </label>
            <input
              type="text"
              value={campaignData.targetAudience}
              onChange={(e) => handleInputChange('targetAudience', e.target.value)}
              placeholder="e.g., High school graduates, Parents"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          {/* Budget */}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
              Budget (SAR)
            </label>
            <input
              type="number"
              value={campaignData.budget}
              onChange={(e) => handleInputChange('budget', e.target.value)}
              placeholder="Enter budget amount"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

         
{/* Duration */}
<div>
  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
    Duration (Days)
  </label>
  <input
    type="number"
    min="1"
    max="365"
    value={campaignData.duration}
    onChange={(e) => {
      const value = parseInt(e.target.value);
      if (value >= 1 && value <= 365) {
        handleInputChange('duration', value);
      } else if (e.target.value === '') {
        handleInputChange('duration', '');
      }
    }}
    placeholder="Enter campaign duration (1-365 days)"
    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
  />
  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
    Enter duration between 1 and 365 days
  </p>
</div>
          {/* Launch Date */}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
              Launch Date
            </label>
            <input
              type="date"
              value={campaignData.launchDate}
              onChange={(e) => handleInputChange('launchDate', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
        </div>

        {/* Channels */}
        <div className="mt-6">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 block">
            Marketing Channels
          </label>
          <div className="flex flex-wrap gap-3">
            {channels.map((channel) => (
              <button
                key={channel}
                onClick={() => handleChannelToggle(channel)}
                className={`px-3 py-2 rounded-lg border text-sm transition-colors ${
                  campaignData.channels.includes(channel)
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                    : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300'
                }`}
              >
                {channel}
              </button>
            ))}
          </div>
        </div>

        {/* Goals */}
        <div className="mt-6">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
            Campaign Goals
          </label>
          <textarea
            value={campaignData.goals}
            onChange={(e) => handleInputChange('goals', e.target.value)}
            placeholder="Describe your campaign objectives..."
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        {/* Content Description */}
        <div className="mt-6">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
            Content Description
          </label>
          <textarea
            value={campaignData.content}
            onChange={(e) => handleInputChange('content', e.target.value)}
            placeholder="Describe your campaign content..."
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
      </div>

      {/* Prediction Results */}
      <div className="p-6">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                AI is analyzing your campaign...
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Predicting performance and success probability
              </p>
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Prediction Failed
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              {error}
            </p>
            <button
              onClick={handlePredict}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : prediction ? (
          <div className="space-y-6">
            {/* Success Probability */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Success Prediction
                </h3>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getConfidenceColor(prediction.confidence)}`}>
                    {prediction.confidence} Confidence
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    prediction.isAI ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                  }`}>
                    {prediction.isAI ? 'AI Generated' : 'Template'}
                  </span>
                </div>
              </div>

              <div className="text-center">
                <div className={`text-6xl font-bold ${getProbabilityColor(prediction.successProbability)} mb-2`}>
                  {prediction.successProbability}%
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  Success Probability
                </p>
              </div>
            </div>

            {/* Expected Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                  {prediction.expectedMetrics?.reach?.toLocaleString() || 'N/A'}
                </div>
                <div className="text-sm text-blue-700 dark:text-blue-300">Expected Reach</div>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <div className="text-2xl font-bold text-green-900 dark:text-green-100">
                  {prediction.expectedMetrics?.engagement || 'N/A'}%
                </div>
                <div className="text-sm text-green-700 dark:text-green-300">Engagement Rate</div>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
                <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                  {prediction.expectedMetrics?.conversion || 'N/A'}%
                </div>
                <div className="text-sm text-purple-700 dark:text-purple-300">Conversion Rate</div>
              </div>
              
              <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
                <div className="text-2xl font-bold text-orange-900 dark:text-orange-100">
                  SAR {prediction.expectedMetrics?.costPerLead || 'N/A'}
                </div>
                <div className="text-sm text-orange-700 dark:text-orange-300">Cost Per Lead</div>
              </div>
            </div>

            {/* Optimal Timing */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Optimal Launch Timing</h4>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Best Day:</strong> {prediction.optimalTiming?.bestDay}<br />
                <strong>Best Time:</strong> {prediction.optimalTiming?.bestTime}<br />
                <strong>Reasoning:</strong> {prediction.optimalTiming?.reasoning}
              </p>
            </div>

            {/* Content Recommendations */}
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Content Recommendations</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                {prediction.contentRecommendations?.map((rec, index) => (
                  <li key={index}>{rec}</li>
                ))}
              </ul>
            </div>

            {/* Risk Factors */}
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Risk Factors</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                {prediction.riskFactors?.map((risk, index) => (
                  <li key={index}>{risk}</li>
                ))}
              </ul>
            </div>

            {/* AI Reasoning */}
            {prediction.reasoning && (
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">AI Reasoning</h4>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  {prediction.reasoning}
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Ready to Predict
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Fill in the campaign details and click "Predict Performance"
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CampaignPrediction;