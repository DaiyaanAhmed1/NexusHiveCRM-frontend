import aiService from '../../../services/aiService';
import aiLanguageService from '../../../services/aiLanguageService';

class ReplySuggestionsService {
  constructor() {
    this.suggestionHistory = [];
  }

  // Generate reply suggestions
  async generateSuggestions(leadContext, messageType, language = 'en') {
    try {
      const prompt = this.buildReplyPrompt(leadContext, messageType, language);
      
      const aiResponse = await aiService.generateResponse(
        prompt,
        'marketing-head',
        [],
        language
      );

      const suggestions = this.parseSuggestions(aiResponse.content);
      
      return {
        suggestions: suggestions,
        context: leadContext,
        messageType: messageType
      };

    } catch (error) {
      console.error('Reply Suggestions Error:', error);
      return {
        suggestions: [],
        error: error.message
      };
    }
  }

  // Build AI prompt for reply suggestions
  buildReplyPrompt(leadContext, messageType, language) {
    const basePrompt = language === 'ar' 
      ? `أنت مساعد ذكي لكتابة الردود التسويقية. سياق العميل المحتمل:
      
      الاسم: ${leadContext.name}
      الموقع: ${leadContext.location}
      الاهتمام: ${leadContext.interest}
      مستوى التفاعل: ${leadContext.engagement}
      آخر تواصل: ${leadContext.lastContact}
      
      نوع الرسالة: ${messageType}
      
      اكتب 3 اقتراحات للردود المهنية والجذابة. كل رد يجب أن يكون:
      - مهنياً ومناسباً للسياق
      - جذاباً ومقنعاً
      - مناسباً للثقافة المحلية
      - يهدف إلى بناء علاقة قوية
      
      قدم الردود مع شرح سبب كل رد مناسب.`
      
      : `You are an AI assistant for writing marketing replies. Lead context:
      
      Name: ${leadContext.name}
      Location: ${leadContext.location}
      Interest: ${leadContext.interest}
      Engagement: ${leadContext.engagement}
      Last Contact: ${leadContext.lastContact}
      
      Message Type: ${messageType}
      
      Write 3 professional and engaging reply suggestions. Each reply should be:
      - Professional and contextually appropriate
      - Engaging and persuasive
      - Culturally appropriate
      - Aimed at building strong relationships
      
      Provide replies with explanations of why each reply is suitable.`;

    return basePrompt;
  }

  // Parse AI response into structured suggestions
  parseSuggestions(aiResponse) {
    const suggestions = [];
    const lines = aiResponse.split('\n');
    
    let currentSuggestion = null;
    
    for (const line of lines) {
      if (line.includes('Suggestion') || line.includes('Reply') || line.includes('Option')) {
        if (currentSuggestion) {
          suggestions.push(currentSuggestion);
        }
        currentSuggestion = {
          id: suggestions.length + 1,
          title: line.trim(),
          content: '',
          explanation: ''
        };
      } else if (currentSuggestion && line.trim()) {
        if (line.includes('Explanation') || line.includes('Why')) {
          currentSuggestion.explanation = line.replace(/.*(Explanation|Why):\s*/i, '').trim();
        } else {
          currentSuggestion.content += line.trim() + ' ';
        }
      }
    }
    
    if (currentSuggestion) {
      suggestions.push(currentSuggestion);
    }
    
    // If parsing failed, create default suggestions
    if (suggestions.length === 0) {
      return [
        {
          id: 1,
          title: 'Professional Follow-up',
          content: 'Thank you for your interest in our programs. I would be happy to discuss how we can help you achieve your educational goals.',
          explanation: 'Professional and respectful approach'
        },
        {
          id: 2,
          title: 'Engaging Response',
          content: 'I noticed you\'re interested in our programs. What specific aspects would you like to learn more about?',
          explanation: 'Encourages further engagement'
        },
        {
          id: 3,
          title: 'Value-focused Reply',
          content: 'Our programs are designed to provide practical skills and real-world experience. Would you like to schedule a call to discuss your career goals?',
          explanation: 'Focuses on value proposition'
        }
      ];
    }
    
    return suggestions;
  }

  // Get suggestion history
  getSuggestionHistory() {
    return this.suggestionHistory;
  }

  // Add to suggestion history
  addToHistory(suggestion) {
    this.suggestionHistory.unshift(suggestion);
    if (this.suggestionHistory.length > 20) {
      this.suggestionHistory = this.suggestionHistory.slice(0, 20);
    }
  }
}

// Create singleton instance
const replySuggestionsService = new ReplySuggestionsService();
export default replySuggestionsService;