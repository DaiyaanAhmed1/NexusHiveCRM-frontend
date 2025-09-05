# Sage AI - OpenRoute API Integration

## Overview
The Sage AI chat system has been successfully integrated with OpenRoute APIs to provide real AI-powered assistance for different user roles in the NexusHive CRM system.

## Features Implemented

###  Complete AI Integration
- **Real API Integration**: Connected to OpenRoute API for actual AI responses
- **Role-Specific Prompts**: Customized AI behavior for Director, Marketing Head, and Admission Head
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **API Status Monitoring**: Real-time API connection status display
- **Streaming Support**: Ready for streaming responses (configurable)

###  Chat Features
- **Message History**: Persistent chat history with timestamps
- **Quick Actions**: Role-specific quick action buttons
- **File Attachments**: UI ready for file upload (implementation pending)
- **Loading States**: Proper loading indicators during API calls
- **Responsive Design**: Works on all screen sizes
- **Dark/Light Theme**: Full theme support
- **RTL Support**: Arabic language support with RTL layout

###  API Configuration
- **Environment Variables**: Secure API key management
- **Multiple Models**: Support for various AI models (GPT-4, Claude, Gemini, etc.)
- **Configurable Settings**: Timeout, retries, streaming options
- **Model Selection**: Easy switching between different AI models

## Setup Instructions

### 1. Install Dependencies
`ash
npm install axios dotenv --legacy-peer-deps
`

### 2. Configure Environment Variables
Create a .env file in the root directory:

`env
# OpenRoute API Configuration
VITE_OPENROUTE_API_KEY=your_openroute_api_key_here
VITE_OPENROUTE_BASE_URL=https://openrouter.ai/api/v1
VITE_OPENROUTE_MODEL=openai/gpt-4o-mini

# API Configuration
VITE_API_TIMEOUT=30000
VITE_MAX_RETRIES=3
VITE_STREAMING_ENABLED=true
`

### 3. Get OpenRoute API Key
1. Visit [OpenRouter.ai](https://openrouter.ai/)
2. Sign up for an account
3. Generate an API key
4. Add credits to your account
5. Replace your_openroute_api_key_here with your actual API key

### 4. Available AI Models
You can switch between different AI models by changing VITE_OPENROUTE_MODEL:

- openai/gpt-4o-mini (Recommended - Fast and cost-effective)
- openai/gpt-4o (Most capable)
- nthropic/claude-3.5-sonnet (Excellent for analysis)
- google/gemini-pro-1.5 (Good for general tasks)
- meta-llama/llama-3.1-8b-instruct (Open source option)

## Usage

### Accessing Sage AI
1. Navigate to any role-specific dashboard (Director, Marketing Head, Admission Head)
2. Click the animated Sage AI button in the sidebar
3. Start chatting with the AI assistant

### Role-Specific Features

#### Director AI Chat
- Strategic analysis and planning
- Budget management assistance
- Risk assessment guidance
- Compliance monitoring
- Executive decision support

#### Marketing Head AI Chat
- Campaign strategy development
- Lead analysis and optimization
- Content creation ideas
- Competitor analysis
- Budget allocation planning

#### Admission Head AI Chat
- Application review assistance
- Enrollment forecasting
- Document verification guidance
- Waitlist management
- Scholarship allocation strategies

## API Service Features

### Error Handling
- Invalid API key detection
- Rate limit handling
- Network error recovery
- Timeout management
- User-friendly error messages

### Performance Optimization
- Request timeout configuration
- Retry logic for failed requests
- Chat history context management (last 10 messages)
- Efficient API call batching

### Security
- API key stored in environment variables
- Secure headers for API requests
- No sensitive data in client-side code

## File Structure

`
src/
 services/
    aiService.js          # Main AI service with OpenRoute integration
 features/
    director/pages/
       DirectorAIChat.jsx    # Director-specific AI chat
    marketing-head/pages/
       MarketingHeadAIChat.jsx # Marketing AI chat
    admission-head/pages/
        AdmissionHeadAIChat.jsx # Admission AI chat
 components/
    ai-chat/
       ChatLayout.jsx        # Reusable chat interface
    ui/
        SageAIButton.jsx      # AI navigation button
 locales/
     en/common.json            # AI-related translations
`

## Troubleshooting

### Common Issues

1. **"API Not Configured" Error**
   - Check if .env file exists
   - Verify VITE_OPENROUTE_API_KEY is set
   - Ensure API key is valid and has credits

2. **"Rate Limit Exceeded" Error**
   - Wait a few minutes before retrying
   - Consider upgrading your OpenRouter plan
   - Check your usage in OpenRouter dashboard

3. **"Network Error"**
   - Check internet connection
   - Verify OpenRouter API is accessible
   - Check firewall settings

4. **Slow Responses**
   - Try a faster model like gpt-4o-mini
   - Reduce max_tokens in the service
   - Check your internet speed

### Debug Mode
Enable debug logging by opening browser console to see detailed API request/response information.

## Future Enhancements

### Planned Features
- [ ] File upload and analysis
- [ ] Chat history persistence
- [ ] Model selection UI
- [ ] Usage analytics
- [ ] Custom prompt templates
- [ ] Multi-language AI responses
- [ ] Voice input/output
- [ ] Integration with CRM data

### Advanced Features
- [ ] Streaming responses for real-time chat
- [ ] Context-aware responses using CRM data
- [ ] Automated report generation
- [ ] Predictive analytics integration
- [ ] Custom AI training for university-specific knowledge

## Support

For technical support or questions about the Sage AI integration:
1. Check the troubleshooting section above
2. Review the OpenRouter documentation
3. Check browser console for error details
4. Verify API key and account status

## Cost Considerations

OpenRouter pricing varies by model:
- GPT-4o-mini: ~.15/1M input tokens, ~.60/1M output tokens
- GPT-4o: ~.50/1M input tokens, ~/1M output tokens
- Claude 3.5 Sonnet: ~/1M input tokens, ~/1M output tokens

Monitor your usage in the OpenRouter dashboard to manage costs effectively.
