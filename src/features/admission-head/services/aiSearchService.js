import aiService from '../../../services/aiService';
import aiLanguageService from '../../../services/aiLanguageService';

class AISearchService {
  constructor() {
    this.searchHistory = [];
    this.suggestions = [
      'Show me leads from Riyadh',
      'Find high-engagement prospects',
      'Campaigns with low conversion',
      'Leads interested in engineering',
      'Recent inquiries from Jeddah',
      'High-priority follow-ups needed'
    ];
  }

  // Main search function
  async search(query, data, language = 'en') {
    try {
      console.log('AI Search:', query, 'Language:', language);
      
      // Check if query is empty
      if (!query.trim()) {
        return { results: [], suggestions: this.suggestions };
      }

      // Add to search history
      this.addToHistory(query);

      // Use AI service to process the search query
      const aiPrompt = this.buildSearchPrompt(query, language);
      const aiResponse = await aiService.generateResponse(
        aiPrompt,
        'marketing-head',
        [],
        language
      );

      // Process the AI response and match with data
      const results = this.processSearchResults(aiResponse.content, data, query);
      
      return {
        results: results,
        suggestions: this.suggestions,
        aiExplanation: aiResponse.content,
        query: query
      };

    } catch (error) {
      console.error('AI Search Error:', error);
      return {
        results: [],
        suggestions: this.suggestions,
        error: error.message
      };
    }
  }

  // Build AI prompt for search
  buildSearchPrompt(query, language) {
    const basePrompt = language === 'ar' 
      ? `أنت مساعد ذكي للبحث في بيانات التسويق. المستخدم يبحث عن: "${query}"
      
      قم بتحليل هذا البحث وقدم اقتراحات للبيانات المناسبة. ابحث عن:
      - العملاء المحتملين (Leads) المطابقين
      - الحملات التسويقية ذات الصلة
      - الاتصالات السابقة
      
      قدم النتائج مع شرح سبب ملاءمة كل نتيجة.`
      
      : `You are an AI assistant for marketing data search. The user is searching for: "${query}"
      
      Analyze this search and provide suggestions for relevant data. Look for:
      - Matching leads/prospects
      - Relevant marketing campaigns
      - Previous communications
      
      Provide results with explanations of why each result is relevant.`;

    return basePrompt;
  }

  // Process AI response and match with actual data
  // Process AI response and match with actual data
processSearchResults(aiResponse, data, query) {
  const results = [];
  
  // Sample data structure - in real implementation, this would come from props/state
  const sampleData = this.getSampleData();
  
  // Enhanced keyword matching
  const queryLower = query.toLowerCase();
  
  sampleData.forEach(item => {
    let relevanceScore = 0;
    let reasons = [];

    // Check location match (enhanced)
    if (item.location && this.matchesLocation(queryLower, item.location)) {
      relevanceScore += 40;
      reasons.push('Location matches search');
    }

    // Check name match
    if (item.name.toLowerCase().includes(queryLower)) {
      relevanceScore += 30;
      reasons.push('Name matches search');
    }

    // Check interest match
    if (item.interest && item.interest.toLowerCase().includes(queryLower)) {
      relevanceScore += 25;
      reasons.push('Interest matches search');
    }

    // Check engagement level
    if (this.matchesEngagement(queryLower, item.engagement)) {
      relevanceScore += 20;
      reasons.push('Engagement level matches search');
    }

    // Check recent activity
    if (queryLower.includes('recent') && this.isRecent(item.lastContact)) {
      relevanceScore += 15;
      reasons.push('Recent activity');
    }

    // Check for "leads" keyword
    if (queryLower.includes('lead') && item.type === 'lead') {
      relevanceScore += 10;
      reasons.push('Lead type matches search');
    }

    // Add to results if relevant
    if (relevanceScore > 0) {
      results.push({
        ...item,
        relevanceScore,
        reasons,
        aiExplanation: `Found ${item.name} - ${reasons.join(', ')}`
      });
    }
  });

  // Sort by relevance score
  return results.sort((a, b) => b.relevanceScore - a.relevanceScore);
}

// Enhanced location matching
matchesLocation(query, location) {
  const locationLower = location.toLowerCase();
  const queryLower = query.toLowerCase();
  
  // Direct match
  if (queryLower.includes(locationLower)) return true;
  
  // Check for city variations
  const cityVariations = {
    'riyadh': ['riyad', 'riyadha'],
    'jeddah': ['jiddah', 'jidda'],
    'dammam': ['damam', 'dahran']
  };
  
  for (const [city, variations] of Object.entries(cityVariations)) {
    if (locationLower === city && variations.some(variation => queryLower.includes(variation))) {
      return true;
    }
  }
  
  return false;
}

// Enhanced engagement matching
matchesEngagement(query, engagement) {
  const queryLower = query.toLowerCase();
  const engagementLower = engagement.toLowerCase();
  
  if (queryLower.includes('high') && engagementLower === 'high') return true;
  if (queryLower.includes('medium') && engagementLower === 'medium') return true;
  if (queryLower.includes('low') && engagementLower === 'low') return true;
  if (queryLower.includes('engagement') && engagementLower === 'high') return true;
  
  return false;
}

  // Get sample data for testing
  getSampleData() {
    return [
      {
        id: 1,
        name: "Ahmed Al-Rashid",
        email: "ahmed.rashid@example.com",
        location: "Riyadh",
        interest: "Engineering",
        engagement: "High",
        lastContact: "2024-01-15",
        type: "lead"
      },
      {
        id: 2,
        name: "Sara Al-Mansouri",
        email: "sara.mansouri@example.com",
        location: "Jeddah",
        interest: "Business",
        engagement: "Medium",
        lastContact: "2024-01-10",
        type: "lead"
      },
      {
        id: 3,
        name: "Mohammed Al-Zahra",
        email: "mohammed.zahra@example.com",
        location: "Riyadh",
        interest: "Medicine",
        engagement: "High",
        lastContact: "2024-01-12",
        type: "lead"
      },
      {
        id: 4,
        name: "Fatima Al-Sheikh",
        email: "fatima.sheikh@example.com",
        location: "Dammam",
        interest: "Engineering",
        engagement: "Low",
        lastContact: "2024-01-08",
        type: "lead"
      },
      {
        id: 5,
        name: "Omar Al-Hassan",
        email: "omar.hassan@example.com",
        location: "Jeddah",
        interest: "Business",
        engagement: "High",
        lastContact: "2024-01-14",
        type: "lead"
      }
    ];
  }

  // Check if date is recent (within last 7 days)
  isRecent(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7;
  }

  // Add query to search history
  addToHistory(query) {
    this.searchHistory.unshift(query);
    if (this.searchHistory.length > 10) {
      this.searchHistory = this.searchHistory.slice(0, 10);
    }
  }

  // Get search suggestions
  getSuggestions(query = '') {
    if (!query.trim()) {
      return this.suggestions;
    }

    return this.suggestions.filter(suggestion =>
      suggestion.toLowerCase().includes(query.toLowerCase())
    );
  }

  // Get search history
  getSearchHistory() {
    return this.searchHistory;
  }
}

// Create singleton instance
const aiSearchService = new AISearchService();
export default aiSearchService;