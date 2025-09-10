import aiService from '../../../services/aiService';
import aiLanguageService from '../../../services/aiLanguageService';

class LeadBehaviorService {
  async analyzeBehavior(leads, context = {}) {
    try {
      // Try to get AI analysis first
      const aiResponse = await aiService.generateResponse(
        this.buildBehaviorPrompt(leads, context),
        'marketing',
        [],
        'en'
      );
      
      return this.processBehaviorAnalysis(aiResponse, leads);
    } catch (error) {
      console.error('Error analyzing lead behavior:', error);
      
      // Fallback to mock data when API fails
      return this.getFallbackAnalysis(leads);
    }
  }

  buildBehaviorPrompt(leads, context) {
    const leadData = leads.map(lead => ({
      name: lead.name,
      email: lead.email,
      location: lead.location,
      interest: lead.interest,
      engagement: lead.engagement,
      lastContact: lead.lastContact,
      behavior: lead.behavior || {}
    }));

    return `Analyze the behavior patterns of these marketing leads and provide insights:

Lead Data:
${JSON.stringify(leadData, null, 2)}

Context: ${JSON.stringify(context, null, 2)}

Please provide:
1. Summary of overall behavior patterns
2. Individual lead analysis with:
   - Behavior score (0-100)
   - Conversion probability (0-100%)
   - Engagement level (Very High, High, Medium, Low, Very Low)
   - Key behaviors
   - Recommendations
3. General insights
4. Recommendations

Format as JSON with this structure:
{
  "summary": "Overall analysis summary",
  "leadBehaviors": [
    {
      "leadId": 1,
      "name": "Lead Name",
      "behaviorScore": 85,
      "conversionProbability": 78,
      "engagementLevel": "High",
      "keyBehaviors": ["behavior1", "behavior2"],
      "recommendations": ["rec1", "rec2"]
    }
  ],
  "insights": ["insight1", "insight2"],
  "recommendations": ["rec1", "rec2"]
}`;
  }

  processBehaviorAnalysis(aiResponse, leads) {
    try {
      // Try to parse AI response
      const responseText = typeof aiResponse === 'string' ? aiResponse : aiResponse.content || aiResponse.message || '';
      
      // Extract JSON from response
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return parsed;
      }
      
      // If no JSON found, create structured response
      return this.createStructuredResponse(responseText, leads);
    } catch (error) {
      console.error('Error processing AI response:', error);
      return this.getFallbackAnalysis(leads);
    }
  }

  createStructuredResponse(responseText, leads) {
    const summary = this.extractSummary(responseText);
    const insights = this.extractInsights(responseText);
    const recommendations = this.extractRecommendations(responseText);
    
    const leadBehaviors = leads.map(lead => ({
      leadId: lead.id,
      name: lead.name,
      behaviorScore: this.calculateFallbackScore(lead),
      conversionProbability: this.calculateFallbackProbability(lead),
      engagementLevel: this.getEngagementLevel(lead),
      keyBehaviors: this.getKeyBehaviors(lead),
      recommendations: this.getRecommendations(lead)
    }));

    return {
      summary,
      leadBehaviors,
      insights,
      recommendations
    };
  }

  // Fallback analysis when API is unavailable
  getFallbackAnalysis(leads) {
    console.log('Using fallback analysis - API unavailable');
    
    const leadBehaviors = leads.map(lead => ({
      leadId: lead.id,
      name: lead.name,
      behaviorScore: this.calculateFallbackScore(lead),
      conversionProbability: this.calculateFallbackProbability(lead),
      engagementLevel: this.getEngagementLevel(lead),
      keyBehaviors: this.getKeyBehaviors(lead),
      recommendations: this.getRecommendations(lead)
    }));

    return {
      summary: `Analyzed ${leads.length} leads using fallback analysis. ${this.getEngagementSummary(leads)}`,
      leadBehaviors,
      insights: this.getFallbackInsights(leads),
      recommendations: this.getFallbackRecommendations(leads)
    };
  }

  calculateFallbackScore(lead) {
    let score = 50; // Base score
    
    // Engagement level scoring
    if (lead.engagement === 'High') score += 30;
    else if (lead.engagement === 'Medium') score += 15;
    else if (lead.engagement === 'Low') score -= 10;
    
    // Behavior scoring
    if (lead.behavior) {
      const behavior = lead.behavior;
      if (behavior.emailOpens > 5) score += 10;
      if (behavior.websiteVisits > 3) score += 10;
      if (behavior.contentDownloads > 2) score += 10;
      if (behavior.formSubmissions > 1) score += 15;
      if (behavior.eventAttendance > 0) score += 20;
    }
    
    // Recent activity bonus
    if (this.isRecent(lead.lastContact)) score += 10;
    
    return Math.min(100, Math.max(0, score));
  }

  calculateFallbackProbability(lead) {
    const score = this.calculateFallbackScore(lead);
    return Math.round(score * 0.8); // Convert to percentage
  }

  getEngagementLevel(lead) {
    const score = this.calculateFallbackScore(lead);
    if (score >= 80) return 'Very High';
    if (score >= 65) return 'High';
    if (score >= 45) return 'Medium';
    if (score >= 25) return 'Low';
    return 'Very Low';
  }

  getKeyBehaviors(lead) {
    const behaviors = [];
    
    if (lead.behavior) {
      const behavior = lead.behavior;
      if (behavior.emailOpens > 5) behaviors.push('High email engagement');
      if (behavior.websiteVisits > 3) behaviors.push('Active website visitor');
      if (behavior.contentDownloads > 2) behaviors.push('Content downloader');
      if (behavior.formSubmissions > 1) behaviors.push('Form submitter');
      if (behavior.eventAttendance > 0) behaviors.push('Event attendee');
    }
    
    if (this.isRecent(lead.lastContact)) {
      behaviors.push('Recent activity');
    }
    
    if (behaviors.length === 0) {
      behaviors.push('Limited engagement');
    }
    
    return behaviors;
  }

  getRecommendations(lead) {
    const recommendations = [];
    const score = this.calculateFallbackScore(lead);
    
    if (score >= 80) {
      recommendations.push('High priority - immediate follow-up');
      recommendations.push('Consider personalized outreach');
    } else if (score >= 60) {
      recommendations.push('Medium priority - schedule follow-up');
      recommendations.push('Send relevant content');
    } else if (score >= 40) {
      recommendations.push('Low priority - nurture campaign');
      recommendations.push('Re-engagement email');
    } else {
      recommendations.push('Very low priority - basic nurturing');
      recommendations.push('Consider removing from active list');
    }
    
    return recommendations;
  }

  getEngagementSummary(leads) {
    const highEngagement = leads.filter(lead => lead.engagement === 'High').length;
    const mediumEngagement = leads.filter(lead => lead.engagement === 'Medium').length;
    const lowEngagement = leads.filter(lead => lead.engagement === 'Low').length;
    
    return `${highEngagement} high engagement, ${mediumEngagement} medium engagement, ${lowEngagement} low engagement leads.`;
  }

  getFallbackInsights(leads) {
    const insights = [];
    
    const highEngagement = leads.filter(lead => lead.engagement === 'High').length;
    const totalLeads = leads.length;
    
    if (highEngagement > totalLeads * 0.3) {
      insights.push('Strong overall engagement levels');
    } else if (highEngagement < totalLeads * 0.1) {
      insights.push('Low engagement levels - needs attention');
    }
    
    const recentLeads = leads.filter(lead => this.isRecent(lead.lastContact)).length;
    if (recentLeads > totalLeads * 0.5) {
      insights.push('Good recent activity levels');
    }
    
    insights.push('Fallback analysis - API unavailable');
    
    return insights;
  }

  getFallbackRecommendations(leads) {
    return [
      'Focus on high-engagement leads first',
      'Implement re-engagement campaigns for low-engagement leads',
      'Monitor recent activity patterns',
      'Consider upgrading API plan for real-time analysis'
    ];
  }

  isRecent(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = (now - date) / (1000 * 60 * 60 * 24);
    return diffDays <= 7;
  }

  extractSummary(response) {
    if (typeof response === 'string') {
      const lines = response.split('\n');
      const summaryLine = lines.find(line => 
        line.toLowerCase().includes('summary') || 
        line.toLowerCase().includes('overall')
      );
      return summaryLine || 'Behavior analysis completed';
    }
    return 'Behavior analysis completed';
  }

  extractInsights(response) {
    if (typeof response === 'string') {
      const lines = response.split('\n');
      const insightLines = lines.filter(line => 
        line.includes('•') || line.includes('-') || line.includes('*')
      );
      return insightLines.slice(0, 3);
    }
    return ['Fallback insights generated'];
  }

  extractRecommendations(response) {
    if (typeof response === 'string') {
      const lines = response.split('\n');
      const recLines = lines.filter(line => 
        line.toLowerCase().includes('recommend') || 
        line.toLowerCase().includes('suggest')
      );
      return recLines.slice(0, 3);
    }
    return ['Fallback recommendations generated'];
  }
}

export default new LeadBehaviorService();