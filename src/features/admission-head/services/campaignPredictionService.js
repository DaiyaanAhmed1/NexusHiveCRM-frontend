import aiService from '../../../services/aiService';
import aiLanguageService from '../../../services/aiLanguageService';

class CampaignPredictionService {
  constructor() {
    this.predictionHistory = [];
    this.campaignTypes = [
      'email',
      'social-media',
      'event',
      'content',
      'paid-advertising'
    ];
  }

  // Main function to predict campaign performance
  async predictCampaign(campaignData, context = {}) {
    try {
      const prompt = this.buildPredictionPrompt(campaignData, context);
      const aiResponse = await aiService.generateResponse(prompt);
      return this.processPredictionResponse(aiResponse, campaignData);
    } catch (error) {
      console.error('Error predicting campaign:', error);
      return this.getFallbackPrediction(campaignData);
    }
  }

  // Build AI prompt for campaign prediction
  buildPredictionPrompt(campaignData, context) {
    const campaignInfo = {
      type: campaignData.type,
      title: campaignData.title,
      targetAudience: campaignData.targetAudience,
      budget: campaignData.budget,
      duration: campaignData.duration,
      content: campaignData.content,
      channels: campaignData.channels,
      goals: campaignData.goals,
      launchDate: campaignData.launchDate
    };

    const typeInstructions = this.getCampaignTypeInstructions(campaignData.type);
    
    return `You are an expert marketing AI for a university. Analyze this marketing campaign and predict its performance.

CAMPAIGN INFORMATION:
${JSON.stringify(campaignInfo, null, 2)}

CONTEXT:
- University focus: ${context.focus || 'Higher education marketing'}
- Target market: ${context.market || 'Saudi Arabia and Middle East'}
- Season: ${context.season || 'Current academic year'}
- Previous performance: ${context.previousPerformance || 'No historical data'}

${typeInstructions}

PREDICTION REQUIREMENTS:
1. Success Probability (1-100%)
2. Expected Engagement Metrics
3. Optimal Launch Timing
4. Target Audience Insights
5. Content Recommendations
6. Budget Optimization
7. Risk Factors
8. Improvement Suggestions

FORMAT AS JSON:
{
  "successProbability": 85,
  "confidence": "High",
  "expectedMetrics": {
    "reach": 15000,
    "engagement": 8.5,
    "conversion": 12.3,
    "costPerLead": 25.50
  },
  "optimalTiming": {
    "bestDay": "Tuesday",
    "bestTime": "10:00 AM",
    "reasoning": "Peak engagement time for target audience"
  },
  "targetAudience": {
    "primary": "High school graduates aged 17-19",
    "secondary": "Parents of prospective students",
    "insights": "Most active on social media during evening hours"
  },
  "contentRecommendations": [
    "Use video content for higher engagement",
    "Include testimonials from current students",
    "Highlight scholarship opportunities"
  ],
  "budgetOptimization": {
    "recommendedBudget": 5000,
    "allocation": {
      "socialMedia": 40,
      "email": 30,
      "content": 20,
      "events": 10
    },
  "riskFactors": [
    "Competition from other universities",
    "Seasonal timing challenges"
  ],
  "improvements": [
    "Add more visual content",
    "Include interactive elements",
    "Target specific geographic areas"
  ],
  "reasoning": "Based on similar campaigns and target audience analysis, this campaign shows strong potential for success with proper execution."
}`;
  }

  // Get specific instructions for each campaign type
  getCampaignTypeInstructions(campaignType) {
    const instructions = {
      'email': `
        This is an email marketing campaign.
        - Focus on open rates, click rates, and conversion rates
        - Consider subject line effectiveness
        - Analyze send timing and frequency
        - Evaluate list quality and segmentation
      `,
      'social-media': `
        This is a social media marketing campaign.
        - Focus on reach, engagement, and shares
        - Consider platform-specific metrics
        - Analyze content performance
        - Evaluate audience targeting
      `,
      'event': `
        This is an event marketing campaign.
        - Focus on attendance and registration rates
        - Consider event timing and location
        - Analyze promotion effectiveness
        - Evaluate target audience interest
      `,
      'content': `
        This is a content marketing campaign.
        - Focus on views, downloads, and engagement
        - Consider content quality and relevance
        - Analyze distribution channels
        - Evaluate audience interest
      `,
      'paid-advertising': `
        This is a paid advertising campaign.
        - Focus on cost per lead and conversion rates
        - Consider ad placement and targeting
        - Analyze creative effectiveness
        - Evaluate budget allocation
      `
    };
    
    return instructions[campaignType] || instructions['email'];
  }

  // Process AI prediction response
  processPredictionResponse(aiResponse, campaignData) {
    try {
      // Extract JSON from AI response
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No valid JSON found in AI response');
      }

      const prediction = JSON.parse(jsonMatch[0]);
      
      return {
        ...prediction,
        campaignId: campaignData.id || Date.now(),
        campaignTitle: campaignData.title,
        campaignType: campaignData.type,
        predictedAt: new Date().toISOString(),
        isAI: true
      };

    } catch (error) {
      console.error('Error processing prediction response:', error);
      return this.getFallbackPrediction(campaignData);
    }
  }

  // Fallback prediction when AI fails
  getFallbackPrediction(campaignData) {
    const basePrediction = {
      successProbability: this.calculateFallbackProbability(campaignData),
      confidence: this.getFallbackConfidence(campaignData),
      expectedMetrics: this.getFallbackMetrics(campaignData),
      optimalTiming: this.getFallbackTiming(campaignData),
      targetAudience: this.getFallbackAudience(campaignData),
      contentRecommendations: this.getFallbackContent(campaignData),
      budgetOptimization: this.getFallbackBudget(campaignData),
      riskFactors: this.getFallbackRisks(campaignData),
      improvements: this.getFallbackImprovements(campaignData),
      reasoning: 'Basic prediction based on campaign type and common industry standards',
      campaignId: campaignData.id || Date.now(),
      campaignTitle: campaignData.title,
      campaignType: campaignData.type,
      predictedAt: new Date().toISOString(),
      isAI: false
    };

    return basePrediction;
  }

  // Calculate fallback success probability
  calculateFallbackProbability(campaignData) {
    let probability = 50; // Base probability
    
    // Adjust based on campaign type
    const typeMultipliers = {
      'email': 1.2,
      'social-media': 1.1,
      'event': 0.9,
      'content': 1.0,
      'paid-advertising': 1.3
    };
    
    probability *= (typeMultipliers[campaignData.type] || 1.0);
    
    // Adjust based on budget
    if (campaignData.budget > 10000) probability += 10;
    else if (campaignData.budget > 5000) probability += 5;
    else if (campaignData.budget < 1000) probability -= 10;
    
    // Adjust based on duration
    if (campaignData.duration > 30) probability += 5;
    else if (campaignData.duration < 7) probability -= 5;
    
    return Math.min(Math.max(probability, 10), 95);
  }

  // Get fallback confidence level
  getFallbackConfidence(campaignData) {
    const probability = this.calculateFallbackProbability(campaignData);
    if (probability >= 80) return 'High';
    if (probability >= 60) return 'Medium';
    return 'Low';
  }

  // Get fallback expected metrics
  getFallbackMetrics(campaignData) {
    const baseReach = campaignData.budget ? campaignData.budget * 10 : 5000;
    const baseEngagement = 5 + Math.random() * 5;
    const baseConversion = 2 + Math.random() * 8;
    const baseCostPerLead = campaignData.budget ? campaignData.budget / (baseReach * 0.1) : 50;

    return {
      reach: Math.round(baseReach),
      engagement: Math.round(baseEngagement * 10) / 10,
      conversion: Math.round(baseConversion * 10) / 10,
      costPerLead: Math.round(baseCostPerLead * 100) / 100
    };
  }

  // Get fallback optimal timing
  getFallbackTiming(campaignData) {
    const timings = {
      'email': { day: 'Tuesday', time: '10:00 AM', reasoning: 'Peak email engagement time' },
      'social-media': { day: 'Wednesday', time: '7:00 PM', reasoning: 'Evening social media activity' },
      'event': { day: 'Saturday', time: '2:00 PM', reasoning: 'Weekend availability' },
      'content': { day: 'Monday', time: '9:00 AM', reasoning: 'Start of week content consumption' },
      'paid-advertising': { day: 'Thursday', time: '11:00 AM', reasoning: 'Mid-week advertising effectiveness' }
    };

    return timings[campaignData.type] || timings['email'];
  }

  // Get fallback target audience
  getFallbackAudience(campaignData) {
    return {
      primary: 'High school graduates aged 17-19',
      secondary: 'Parents of prospective students',
      insights: 'Most active during evening hours and weekends'
    };
  }

  // Get fallback content recommendations
  getFallbackContent(campaignData) {
    const recommendations = {
      'email': [
        'Use compelling subject lines',
        'Include clear call-to-action',
        'Personalize content based on interests'
      ],
      'social-media': [
        'Use high-quality visuals',
        'Include user-generated content',
        'Engage with comments and messages'
      ],
      'event': [
        'Create detailed event descriptions',
        'Include speaker profiles',
        'Add interactive elements'
      ],
      'content': [
        'Focus on educational value',
        'Use storytelling techniques',
                'Include multimedia elements'
      ],
      'paid-advertising': [
        'A/B test different creatives',
        'Use precise targeting',
        'Monitor and optimize regularly'
      ]
    };

    return recommendations[campaignData.type] || recommendations['email'];
  }

  // Get fallback budget optimization
  getFallbackBudget(campaignData) {
    const recommendedBudget = campaignData.budget || 5000;
    const allocations = {
      'email': { socialMedia: 20, email: 50, content: 20, events: 10 },
      'social-media': { socialMedia: 60, email: 20, content: 15, events: 5 },
      'event': { socialMedia: 30, email: 30, content: 20, events: 20 },
      'content': { socialMedia: 25, email: 25, content: 40, events: 10 },
      'paid-advertising': { socialMedia: 40, email: 20, content: 20, events: 20 }
    };

    return {
      recommendedBudget,
      allocation: allocations[campaignData.type] || allocations['email']
    };
  }

  // Get fallback risk factors
  getFallbackRisks(campaignData) {
    return [
      'Competition from other universities',
      'Seasonal timing challenges',
      'Budget constraints affecting reach',
      'Target audience engagement variability'
    ];
  }

  // Get fallback improvements
  getFallbackImprovements(campaignData) {
    return [
      'Increase budget for better reach',
      'Improve targeting precision',
      'Enhance content quality',
      'Optimize timing based on audience behavior'
    ];
  }

  // Get campaign types
  getCampaignTypes() {
    return this.campaignTypes;
  }

  // Get campaign type display name
  getCampaignTypeDisplayName(campaignType) {
    const names = {
      'email': 'Email Campaign',
      'social-media': 'Social Media Campaign',
      'event': 'Event Campaign',
      'content': 'Content Campaign',
      'paid-advertising': 'Paid Advertising Campaign'
    };
    return names[campaignType] || campaignType;
  }

  // Get campaign type description
  getCampaignTypeDescription(campaignType) {
    const descriptions = {
      'email': 'Email marketing campaigns for lead nurturing and conversions',
      'social-media': 'Social media campaigns for brand awareness and engagement',
      'event': 'Event marketing campaigns for attendance and registrations',
      'content': 'Content marketing campaigns for thought leadership and engagement',
      'paid-advertising': 'Paid advertising campaigns for targeted reach and conversions'
    };
    return descriptions[campaignType] || 'Marketing campaign for various objectives';
  }

  // Get prediction history
  getPredictionHistory() {
    return this.predictionHistory;
  }

  // Add to prediction history
  addToHistory(prediction) {
    this.predictionHistory.unshift({
      timestamp: new Date().toISOString(),
      campaignTitle: prediction.campaignTitle,
      campaignType: prediction.campaignType,
      successProbability: prediction.successProbability,
      confidence: prediction.confidence
    });
    
    // Keep only last 20 predictions
    if (this.predictionHistory.length > 20) {
      this.predictionHistory = this.predictionHistory.slice(0, 20);
    }
  }
}

export default new CampaignPredictionService();