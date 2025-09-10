import aiService from '../../../services/aiService';

class ReplySuggestionsService {
  constructor() {
    this.cache = new Map();
    this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
    this.suggestionHistory = [];
  }

  // Add cache key generation
  generateCacheKey(leadContext, messageType, language) {
    return `${leadContext.name}-${messageType}-${language}`;
  }

  // Check if cached result exists and is still valid
  getCachedResult(cacheKey) {
    const cached = this.cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.data;
    }
    return null;
  }

  // Cache the result
  setCachedResult(cacheKey, data) {
    this.cache.set(cacheKey, {
      data,
      timestamp: Date.now()
    });
  }

  async generateSuggestions(leadContext, messageType, language = 'en') {
    const cacheKey = this.generateCacheKey(leadContext, messageType, language);
    
    // Check cache first
    const cached = this.getCachedResult(cacheKey);
    if (cached) {
      console.log('Using cached suggestions');
      return cached;
    }
  
    try {
      const aiResponse = await aiService.generateResponse(
        this.buildPrompt(leadContext, messageType, language),
        'marketing-head',
        [],
        language
      );
  
      // Parse the AI response into structured suggestions
      const parsedSuggestions = this.parseSuggestions(aiResponse);
      
      // If parsing failed, use fallback suggestions
      const finalSuggestions = parsedSuggestions.length > 0 
        ? parsedSuggestions 
        : this.getFallbackSuggestions(messageType);
  
      const result = {
        suggestions: finalSuggestions,
        messageType: messageType,
        timestamp: new Date().toISOString()
      };
  
      // Cache the result
      this.setCachedResult(cacheKey, result);
      
      return result;
    } catch (error) {
      console.error('Reply Suggestions Error:', error);
      // Return fallback suggestions in the expected format
      return {
        suggestions: this.getFallbackSuggestions(messageType),
        messageType: messageType,
        timestamp: new Date().toISOString(),
        error: 'AI service unavailable, using fallback suggestions'
      };
    }
  }

  // Build AI prompt for reply suggestions
  buildPrompt(leadContext, messageType, language) {
    const basePrompt = language === 'ar' 
      ? `أنت مساعد ذكي لكتابة الردود التسويقية. سياق العميل المحتمل:
      
      الاسم: ${leadContext.name}
      الموقع: ${leadContext.location || 'غير محدد'}
      الاهتمام: ${leadContext.interest || 'غير محدد'}
      مستوى التفاعل: ${leadContext.engagement || 'غير محدد'}
      آخر تواصل: ${leadContext.lastContact || 'غير محدد'}
      
      نوع الرسالة: ${messageType}
      
      اكتب 3 اقتراحات للردود المهنية والجذابة. كل رد يجب أن يكون:
      - مهنياً ومناسباً للسياق
      - جذاباً ومقنعاً
      - مناسباً للثقافة المحلية
      - يهدف إلى بناء علاقة قوية
      
      قدم الردود مع شرح سبب كل رد مناسب.`
      
      : `You are an AI assistant for writing marketing replies. Lead context:
      
      Name: ${leadContext.name}
      Location: ${leadContext.location || 'Not specified'}
      Interest: ${leadContext.interest || 'Not specified'}
      Engagement: ${leadContext.engagement || 'Not specified'}
      Last Contact: ${leadContext.lastContact || 'Not specified'}
      
      Message Type: ${messageType}
      
      Write 3 professional and engaging reply suggestions. Each reply should be:
      - Professional and contextually appropriate
      - Engaging and persuasive
      - Culturally appropriate
      - Aimed at building strong relationships
      
      Provide replies with explanations of why each reply is suitable.`;

    return basePrompt;
  }

  // Get fallback suggestions when AI fails
  getFallbackSuggestions(messageType) {
    const fallbacks = {
      'follow-up': [
        {
          id: 1,
          title: 'Professional Follow-up',
          content: 'Hi {name}, I wanted to follow up on our previous conversation. How can I help you today?',
          explanation: 'Professional and respectful approach'
        },
        {
          id: 2,
          title: 'Engaging Response',
          content: 'Hello {name}, I hope you\'re doing well. Do you have any questions about our programs?',
          explanation: 'Encourages further engagement'
        },
        {
          id: 3,
          title: 'Value-focused Reply',
          content: 'Our programs are designed to provide practical skills. Would you like to schedule a call?',
          explanation: 'Focuses on value proposition'
        }
      ],
      'welcome': [
        {
          id: 1,
          title: 'Welcome Message',
          content: 'Welcome {name}! Thank you for your interest in our programs.',
          explanation: 'Warm and welcoming'
        },
        {
          id: 2,
          title: 'Introduction',
          content: 'Hi {name}, I\'m here to help you explore our educational opportunities.',
          explanation: 'Personal and helpful'
        }
      ],
      'default': [
        {
          id: 1,
          title: 'Professional Response',
          content: 'Thank you for your interest, {name}. How can I assist you today?',
          explanation: 'Professional and helpful'
        },
        {
          id: 2,
          title: 'Engaging Reply',
          content: 'Hi {name}, I\'d love to help you learn more about our programs.',
          explanation: 'Friendly and engaging'
        }
      ]
    };

    return fallbacks[messageType] || fallbacks['default'];
  }

// Parse AI response into structured suggestions
parseSuggestions(aiResponse) {
  console.log('Parsing AI response:', aiResponse);
  
  // Try to parse as JSON first
  try {
    const jsonResponse = JSON.parse(aiResponse);
    if (jsonResponse.suggestions && Array.isArray(jsonResponse.suggestions)) {
      return jsonResponse.suggestions;
    }
  } catch (e) {
    // Not JSON, continue with text parsing
  }

  const suggestions = [];
  const lines = aiResponse.split('\n').filter(line => line.trim());
  
  let currentSuggestion = null;
  let suggestionCount = 0;
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    
    // Look for numbered suggestions or bullet points
    if (trimmedLine.match(/^\d+\./) || trimmedLine.startsWith('-') || trimmedLine.startsWith('•')) {
      if (currentSuggestion) {
        suggestions.push(currentSuggestion);
      }
      suggestionCount++;
      currentSuggestion = {
        id: suggestionCount,
        title: `Suggestion ${suggestionCount}`,
        content: trimmedLine.replace(/^\d+\.\s*/, '').replace(/^[-•]\s*/, '').trim(),
        explanation: '',
        type: 'ai-generated'
      };
    } else if (currentSuggestion && trimmedLine) {
      // Add content to current suggestion
      if (trimmedLine.toLowerCase().includes('explanation') || trimmedLine.toLowerCase().includes('why')) {
        currentSuggestion.explanation = trimmedLine.replace(/.*(explanation|why):\s*/i, '').trim();
      } else {
        currentSuggestion.content += ' ' + trimmedLine;
      }
    }
  }
  
  if (currentSuggestion) {
    suggestions.push(currentSuggestion);
  }
  
  // If still no suggestions found, try to extract any text that looks like suggestions
  if (suggestions.length === 0) {
    const textBlocks = aiResponse.split(/\n\s*\n/).filter(block => block.trim().length > 20);
    textBlocks.slice(0, 3).forEach((block, index) => {
      suggestions.push({
        id: index + 1,
        title: `Suggestion ${index + 1}`,
        content: block.trim(),
        explanation: 'AI-generated suggestion',
        type: 'ai-generated'
      });
    });
  }
  
  console.log('Parsed suggestions:', suggestions);
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