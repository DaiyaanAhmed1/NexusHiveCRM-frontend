import axios from 'axios';
import aiLanguageService from './aiLanguageService';

// OpenRoute API Configuration
const OPENROUTE_CONFIG = {
  baseURL: import.meta.env.VITE_OPENROUTE_BASE_URL || 'https://openrouter.ai/api/v1',
  apiKey: import.meta.env.VITE_OPENROUTE_API_KEY,
  model: import.meta.env.VITE_OPENROUTE_MODEL || 'openai/gpt-4o-mini',
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT) || 30000,
  maxRetries: parseInt(import.meta.env.VITE_MAX_RETRIES) || 3,
  streaming: import.meta.env.VITE_STREAMING_ENABLED === 'true'
};

// Create axios instance
const apiClient = axios.create({
  baseURL: OPENROUTE_CONFIG.baseURL,
  timeout: OPENROUTE_CONFIG.timeout,
  headers: {
    'Authorization': `Bearer ${OPENROUTE_CONFIG.apiKey}`,
    'Content-Type': 'application/json',
    'HTTP-Referer': window.location.origin,
    'X-Title': 'NexusHive CRM - Sage AI'
  }
});

// Role-specific system prompts
const ROLE_PROMPTS = {
  director: `You are Sage AI, an intelligent assistant for university directors. You help with strategic planning, budget management, risk assessment, compliance monitoring, and executive decision-making. Provide concise, actionable insights based on institutional data and best practices.`,
  
  'marketing-head': `You are Sage AI, a marketing specialist assistant for university marketing heads. You help with campaign strategy, lead generation, content creation, competitor analysis, budget allocation, and marketing performance optimization. Focus on enrollment growth and brand positioning.`,
  
  'admission-head': `You are Sage AI, an admissions specialist assistant for university admission heads. You help with application review, enrollment forecasting, document verification, waitlist management, scholarship allocation, and compliance monitoring. Focus on student quality and enrollment targets.`
};

class AIService {
  constructor() {
    this.isConfigured = !!OPENROUTE_CONFIG.apiKey && OPENROUTE_CONFIG.apiKey !== 'your_openroute_api_key_here';
  }

  // Check if API is properly configured
  isAPIConfigured() {
    return this.isConfigured;
  }

  // Get configuration status
  getConfigStatus() {
    return {
      configured: this.isConfigured,
      model: OPENROUTE_CONFIG.model,
      baseURL: OPENROUTE_CONFIG.baseURL,
      streaming: OPENROUTE_CONFIG.streaming
    };
  }

  // Generate AI response
  async generateResponse(message, role = 'director', chatHistory = [], currentUILanguage = 'en') {
    if (!this.isConfigured) {
      throw new Error('OpenRoute API key not configured. Please set VITE_OPENROUTE_API_KEY in your .env file.');
    }

    try {
      const basePrompt = ROLE_PROMPTS[role] || ROLE_PROMPTS.director;
      const languagePrompt = aiLanguageService.getLanguagePrompt(currentUILanguage);
      const systemPrompt = basePrompt + languagePrompt;
      
      // Build conversation context
      const messages = [
        { role: 'system', content: systemPrompt },
        ...chatHistory.slice(-10), // Keep last 10 messages for context
        { role: 'user', content: message }
      ];

      const requestData = {
        model: OPENROUTE_CONFIG.model,
        messages: messages,
        max_tokens: 1000,
        temperature: 0.7,
        top_p: 0.9,
        frequency_penalty: 0.1,
        presence_penalty: 0.1
      };

      const response = await apiClient.post('/chat/completions', requestData);
      
      if (response.data && response.data.choices && response.data.choices.length > 0) {
        return {
          content: response.data.choices[0].message.content,
          usage: response.data.usage,
          model: response.data.model
        };
      } else {
        throw new Error('Invalid response format from OpenRoute API');
      }

    } catch (error) {
      console.error('AI Service Error:', error);
      
      if (error.response) {
        // API error response
        const status = error.response.status;
        const message = error.response.data?.error?.message || 'API request failed';
        
        switch (status) {
          case 401:
            throw new Error('Invalid API key. Please check your OpenRoute API key.');
          case 429:
            throw new Error('Rate limit exceeded. Please try again later.');
          case 500:
            throw new Error('OpenRoute API server error. Please try again later.');
          default:
            throw new Error(`API Error (${status}): ${message}`);
        }
      } else if (error.code === 'ECONNABORTED') {
        throw new Error('Request timeout. Please try again.');
      } else {
        throw new Error('Network error. Please check your connection and try again.');
      }
    }
  }

  // Generate AI response with file attachment
  async generateResponseWithFile(message, file, role = 'director', chatHistory = [], currentUILanguage = 'en') {
    console.log('generateResponseWithFile called with:', file.name, file.type);
    
    if (!this.isConfigured) {
      throw new Error('OpenRoute API key not configured. Please set VITE_OPENROUTE_API_KEY in your .env file.');
    }

    try {
      const basePrompt = ROLE_PROMPTS[role] || ROLE_PROMPTS.director;
      const languagePrompt = aiLanguageService.getLanguagePrompt(currentUILanguage);
      const systemPrompt = basePrompt + languagePrompt;
      
      // Process file content
      const fileContent = await this.processFile(file);
      console.log('File content processed:', fileContent.substring(0, 100) + '...');
      
      // Build conversation context with file
      const messages = [
        { role: 'system', content: systemPrompt },
        ...chatHistory.slice(-10),
        { 
          role: 'user', 
          content: `${message}\n\n[Attached file: ${file.name}]\n${fileContent}` 
        }
      ];

      const requestData = {
        model: OPENROUTE_CONFIG.model,
        messages: messages,
        max_tokens: 1500, // Increased for file content
        temperature: 0.7,
        top_p: 0.9,
        frequency_penalty: 0.1,
        presence_penalty: 0.1
      };

      const response = await apiClient.post('/chat/completions', requestData);
      
      if (response.data && response.data.choices && response.data.choices.length > 0) {
        return {
          content: response.data.choices[0].message.content,
          usage: response.data.usage,
          model: response.data.model,
          hasAttachment: true,
          attachmentName: file.name,
          attachmentType: file.type
        };
      } else {
        throw new Error('Invalid response format from OpenRoute API');
      }

    } catch (error) {
      console.error('AI Service Error with file:', error);
      throw error;
    }
  }

  // Process different file types
  async processFile(file) {
    const fileType = file.type;
    const fileName = file.name;
    const fileSize = (file.size / 1024 / 1024).toFixed(2); // Size in MB
    
    console.log(`Processing file: ${fileName}, Type: ${fileType}, Size: ${fileSize}MB`);
    
    try {
      if (fileType === 'application/pdf') {
        return `PDF File: ${fileName}\nSize: ${fileSize}MB\n\nNote: PDF content extraction requires additional setup. Please convert to text format for full analysis.`;
      } else if (fileType.startsWith('text/')) {
        return await this.readTextFile(file);
      } else if (fileType.includes('csv')) {
        return await this.processCSV(file);
      } else if (fileType.includes('json')) {
        return await this.processJSON(file);
      } else if (fileType.includes('xml')) {
        return await this.processXML(file);
      } else if (fileType.includes('markdown')) {
        return await this.readTextFile(file);
      } else if (fileType.includes('rtf')) {
        return await this.readTextFile(file);
      } else if (fileType.includes('document') || fileType.includes('word')) {
        return `Document File: ${fileName}\nSize: ${fileSize}MB\n\nNote: Document content extraction requires additional setup. Please convert to text format for full analysis.`;
      } else {
        return `[File: ${fileName} - ${fileSize}MB, Type: ${fileType}]\nNote: This file type is not fully supported for content analysis.`;
      }
    } catch (error) {
      console.error('Error processing file:', error);
      return `[File: ${fileName} - ${fileSize}MB, Type: ${fileType}]\nError: Could not process file content.`;
    }
  }

  // Read text file content
  async readTextFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        // Limit content length for AI processing
        const maxLength = 5000;
        if (content.length > maxLength) {
          resolve(content.substring(0, maxLength) + '\n\n[Content truncated - file too long]');
        } else {
          resolve(content);
        }
      };
      reader.onerror = (e) => reject(e);
      reader.readAsText(file);
    });
  }

  // Process CSV files
  async processCSV(file) {
    const content = await this.readTextFile(file);
    const lines = content.split('\n');
    const preview = lines.slice(0, 10).join('\n'); // First 10 lines
    return `CSV File Content (Preview):\n${preview}\n\n[Total rows: ${lines.length}]`;
  }

  // Process JSON files
  async processJSON(file) {
    const content = await this.readTextFile(file);
    try {
      const jsonData = JSON.parse(content);
      return `JSON File Content:\n${JSON.stringify(jsonData, null, 2)}`;
    } catch (error) {
      return `JSON File Content (Raw):\n${content}`;
    }
  }

  // Process XML files
  async processXML(file) {
    const content = await this.readTextFile(file);
    return `XML File Content:\n${content}`;
  }

  // Generate streaming response (for future implementation)
  async generateStreamingResponse(message, role = 'director', chatHistory = [], onChunk, currentUILanguage = 'en') {
    if (!this.isConfigured) {
      throw new Error('OpenRoute API key not configured. Please set VITE_OPENROUTE_API_KEY in your .env file.');
    }

    if (!OPENROUTE_CONFIG.streaming) {
      // Fallback to non-streaming
      return await this.generateResponse(message, role, chatHistory, currentUILanguage);
    }

    try {
      const basePrompt = ROLE_PROMPTS[role] || ROLE_PROMPTS.director;
      const languagePrompt = aiLanguageService.getLanguagePrompt(currentUILanguage);
      const systemPrompt = basePrompt + languagePrompt;
      
      const messages = [
        { role: 'system', content: systemPrompt },
        ...chatHistory.slice(-10),
        { role: 'user', content: message }
      ];

      const requestData = {
        model: OPENROUTE_CONFIG.model,
        messages: messages,
        max_tokens: 1000,
        temperature: 0.7,
        stream: true
      };

      const response = await fetch(`${OPENROUTE_CONFIG.baseURL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENROUTE_CONFIG.apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.origin,
          'X-Title': 'NexusHive CRM - Sage AI'
        },
        body: JSON.stringify(requestData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullResponse = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') continue;

            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices?.[0]?.delta?.content;
              if (content) {
                fullResponse += content;
                onChunk(content);
              }
            } catch (e) {
              // Skip invalid JSON
            }
          }
        }
      }

      return {
        content: fullResponse,
        streaming: true
      };

    } catch (error) {
      console.error('Streaming AI Service Error:', error);
      throw error;
    }
  }

  // Get available models (for future model selection feature)
  async getAvailableModels() {
    if (!this.isConfigured) {
      throw new Error('OpenRoute API key not configured.');
    }

    try {
      const response = await apiClient.get('/models');
      return response.data.data || [];
    } catch (error) {
      console.error('Error fetching models:', error);
      throw new Error('Failed to fetch available models');
    }
  }
}

// Create and export singleton instance
const aiService = new AIService();
export default aiService;
