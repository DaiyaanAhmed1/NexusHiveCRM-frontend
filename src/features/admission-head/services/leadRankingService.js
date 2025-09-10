import aiService from '../../../services/aiService';
import aiLanguageService from '../../../services/aiLanguageService';

class LeadRankingService {
  constructor() {
    this.rankingHistory = [];
  }

  // Main function to rank leads
  async rankLeads(leads, context = {}) {
    try {
      // Build AI prompt for lead ranking
      const prompt = this.buildRankingPrompt(leads, context);
      
      // Get AI response
      const aiResponse = await aiService.generateResponse(prompt);
      
      // Process and return ranked leads
      return this.processRankingResults(aiResponse, leads);
    } catch (error) {
      console.error('Error ranking leads:', error);
      // Fallback to basic ranking
      return this.getFallbackRanking(leads);
    }
  }

  // Build AI prompt for lead ranking
  buildRankingPrompt(leads, context) {
    const leadsData = leads.map(lead => ({
      id: lead.id,
      name: lead.name,
      location: lead.location,
      interest: lead.interest,
      engagement: lead.engagement,
      lastContact: lead.lastContact,
      source: lead.source || 'Unknown',
      budget: lead.budget || 'Not specified',
      timeline: lead.timeline || 'Not specified'
    }));

    return `You are an expert lead scoring AI for a university marketing team. Analyze these leads and rank them by conversion probability (1-100 score).

LEADS TO RANK:
${JSON.stringify(leadsData, null, 2)}

CONTEXT:
- Current focus: ${context.focus || 'General lead conversion'}
- Priority criteria: ${context.priority || 'Engagement and interest level'}
- Target programs: ${context.programs || 'All programs'}

RANKING CRITERIA:
1. Engagement Level (High=40pts, Medium=25pts, Low=10pts)
2. Interest Alignment (Strong=30pts, Moderate=20pts, Weak=10pts)
3. Location Relevance (High=20pts, Medium=15pts, Low=5pts)
4. Recent Activity (Within 7 days=10pts, Within 30 days=5pts, Older=0pts)
5. Source Quality (Referral=15pts, Website=10pts, Social=8pts, Other=5pts)

For each lead, provide:
- Conversion Score (1-100)
- Ranking Position (1-${leads.length})
- Key Strengths (2-3 points)
- Conversion Probability (High/Medium/Low)
- Recommended Next Action
- Risk Factors (if any)

Format as JSON array with this structure:
[
  {
    "id": "lead_id",
    "score": 85,
    "rank": 1,
    "strengths": ["High engagement", "Strong interest alignment"],
    "probability": "High",
    "nextAction": "Schedule personal call within 24 hours",
    "risks": ["Budget not specified"],
    "reasoning": "Brief explanation of ranking decision"
  }
]`;
  }

  // Process AI ranking results
  processRankingResults(aiResponse, originalLeads) {
    try {
      // Extract JSON from AI response
      const jsonMatch = aiResponse.match(/\[[\s\S]*\]/);
      if (!jsonMatch) {
        throw new Error('No valid JSON found in AI response');
      }

      const rankings = JSON.parse(jsonMatch[0]);
      
      // Merge with original lead data
      const rankedLeads = rankings.map(ranking => {
        const originalLead = originalLeads.find(lead => lead.id === ranking.id);
        return {
          ...originalLead,
          ...ranking,
          originalData: originalLead
        };
      });

      // Sort by rank
      return rankedLeads.sort((a, b) => a.rank - b.rank);

    } catch (error) {
      console.error('Error processing ranking results:', error);
      return this.getFallbackRanking(originalLeads);
    }
  }

  // Fallback ranking when AI fails
  getFallbackRanking(leads) {
    return leads.map((lead, index) => ({
      ...lead,
      score: this.calculateFallbackScore(lead),
      rank: index + 1,
      strengths: this.getFallbackStrengths(lead),
      probability: this.getFallbackProbability(lead),
      nextAction: this.getFallbackNextAction(lead),
      risks: this.getFallbackRisks(lead),
      reasoning: 'Basic ranking based on engagement and interest level'
    })).sort((a, b) => b.score - a.score);
  }

  // Calculate fallback score
  calculateFallbackScore(lead) {
    let score = 0;
    
    // Engagement scoring
    if (lead.engagement === 'High') score += 40;
    else if (lead.engagement === 'Medium') score += 25;
    else if (lead.engagement === 'Low') score += 10;

    // Interest scoring
    if (lead.interest && lead.interest.length > 10) score += 30;
    else if (lead.interest && lead.interest.length > 5) score += 20;
    else score += 10;

    // Location scoring
    if (lead.location && lead.location.length > 5) score += 20;
    else score += 10;

    // Recent activity scoring
    if (lead.lastContact) {
      const daysSince = this.getDaysSince(lead.lastContact);
      if (daysSince <= 7) score += 10;
      else if (daysSince <= 30) score += 5;
    }

    return Math.min(score, 100);
  }

  // Helper methods for fallback ranking
  getFallbackStrengths(lead) {
    const strengths = [];
    if (lead.engagement === 'High') strengths.push('High engagement level');
    if (lead.interest && lead.interest.length > 10) strengths.push('Strong interest alignment');
    if (lead.location && lead.location.length > 5) strengths.push('Clear location preference');
    return strengths.length > 0 ? strengths : ['Basic lead information available'];
  }

  getFallbackProbability(lead) {
    const score = this.calculateFallbackScore(lead);
    if (score >= 70) return 'High';
    if (score >= 40) return 'Medium';
    return 'Low';
  }

  getFallbackNextAction(lead) {
    if (lead.engagement === 'High') return 'Schedule personal call within 24 hours';
    if (lead.engagement === 'Medium') return 'Send follow-up email with program details';
    return 'Send introductory email and program brochure';
  }

  getFallbackRisks(lead) {
    const risks = [];
    if (!lead.budget) risks.push('Budget not specified');
    if (!lead.timeline) risks.push('Timeline not specified');
    if (lead.engagement === 'Low') risks.push('Low engagement level');
    return risks;
  }

  // Utility methods
  getDaysSince(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    return Math.floor((now - date) / (1000 * 60 * 60 * 24));
  }

  // Get ranking history
  getRankingHistory() {
    return this.rankingHistory;
  }

  // Add to ranking history
  addToHistory(ranking) {
    this.rankingHistory.unshift({
      timestamp: new Date().toISOString(),
      totalLeads: ranking.length,
      topLead: ranking[0]?.name || 'Unknown'
    });
    
    // Keep only last 10 rankings
    if (this.rankingHistory.length > 10) {
      this.rankingHistory = this.rankingHistory.slice(0, 10);
    }
  }
}

export default new LeadRankingService();