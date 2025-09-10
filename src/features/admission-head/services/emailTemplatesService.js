import aiService from '../../../services/aiService';
import aiLanguageService from '../../../services/aiLanguageService';

class EmailTemplatesService {
  constructor() {
    this.templateHistory = [];
    this.emailTypes = [
      'follow-up',
      'program-introduction', 
      'event-invitation',
      'application-reminder',
      'welcome'
    ];
  }

  // Get email type display name
  getEmailTypeDisplayName(emailType) {
    const names = {
      'follow-up': 'Follow-up Email',
      'program-introduction': 'Program Introduction',
      'event-invitation': 'Event Invitation',
      'application-reminder': 'Application Reminder',
      'welcome': 'Welcome Email'
    };
    return names[emailType] || emailType;
  }

  // Get email type description
  getEmailTypeDescription(emailType) {
    const descriptions = {
      'follow-up': 'Follow up after initial contact with additional information',
      'program-introduction': 'Introduce specific academic programs and benefits',
      'event-invitation': 'Invite to university events and open houses',
      'application-reminder': 'Remind about application deadlines and requirements',
      'welcome': 'Welcome new leads to the university community'
    };
    return descriptions[emailType] || 'Generate personalized email content';
  }

  // Main email generation method with robust fallbacks
  async generateEmail(lead, emailType = 'follow-up', context = {}) {
    try {
      // Validate input
      if (!lead || !lead.name) {
        console.warn('Invalid lead data, using fallback');
        return this.getFallbackEmail(lead || { name: 'Student' }, emailType);
      }

      // Try AI generation first
      const prompt = this.buildEmailPrompt(lead, emailType, context);
      const response = await aiService.generateResponse(prompt, 'admission-head');
      
      if (response && response.content) {
        const processedEmail = this.processEmailResponse(response.content, lead, emailType);
        if (processedEmail) {
          this.addToHistory(processedEmail);
          return processedEmail;
        }
      }
      
      // If AI response is invalid, use fallback
      throw new Error('Invalid AI response');
      
    } catch (error) {
      console.warn('Using fallback email template due to error:', error.message);
      const fallbackEmail = this.getFallbackEmail(lead, emailType);
      this.addToHistory(fallbackEmail);
      return fallbackEmail;
    }
  }

  // Build AI prompt for email generation
  buildEmailPrompt(lead, emailType, context) {
    const leadData = {
      name: lead.name || 'Student',
      location: lead.location || 'Not specified',
      interest: lead.interest || lead.program || 'General Studies',
      engagement: lead.engagement || 'New lead',
      lastContact: lead.lastContact || 'None',
      source: lead.source || 'Website',
      budget: lead.budget || 'Not specified',
      timeline: lead.timeline || 'Not specified',
      program: lead.program || 'General Studies'
    };

    const emailTypeInstructions = this.getEmailTypeInstructions(emailType);
    
    return `You are an expert email marketing AI for a university. Generate a professional, personalized email for a prospective student.

LEAD INFORMATION:
${JSON.stringify(leadData, null, 2)}

EMAIL TYPE: ${emailType}
CONTEXT: ${JSON.stringify(context, null, 2)}

${emailTypeInstructions}

REQUIREMENTS:
1. Professional and warm tone
2. Personalized based on lead data
3. Clear call-to-action
4. University-appropriate language
5. 150-300 words
6. Include subject line
7. Include greeting and closing
8. Mention specific program if applicable
9. Include contact information

FORMAT AS JSON:
{
  "subject": "Email subject line",
  "greeting": "Personalized greeting",
  "body": "Main email content with paragraphs",
  "callToAction": "Specific next step",
  "closing": "Professional closing",
  "signature": "University signature",
  "personalization": "What was personalized",
  "tone": "Professional/Warm/Urgent"
}`;
  }

  // Get specific instructions for each email type
  getEmailTypeInstructions(emailType) {
    const instructions = {
      'follow-up': `
        This is a follow-up email after initial contact.
        - Reference previous interaction
        - Provide additional value
        - Encourage next steps
        - Be helpful and informative
      `,
      'program-introduction': `
        This introduces a specific academic program.
        - Highlight program benefits
        - Mention career opportunities
        - Include program details
        - Encourage application
      `,
      'event-invitation': `
        This invites to a university event.
        - Describe the event
        - Highlight benefits of attending
        - Include date, time, location
        - Create urgency
      `,
      'application-reminder': `
        This reminds about application deadlines.
        - Mention specific deadline
        - Highlight importance
        - Offer assistance
        - Create urgency
      `,
      'welcome': `
        This welcomes a new lead.
        - Thank for interest
        - Introduce university
        - Provide next steps
        - Be welcoming and informative
      `
    };
    
    return instructions[emailType] || instructions['follow-up'];
  }

  // Process AI email response with robust error handling
  processEmailResponse(aiResponse, lead, emailType) {
    try {
      // Handle different response formats
      let emailData;
      
      if (typeof aiResponse === 'string') {
        // Try to extract JSON from string response
        const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          emailData = JSON.parse(jsonMatch[0]);
        } else {
          throw new Error('No valid JSON found in AI response');
        }
      } else if (typeof aiResponse === 'object') {
        emailData = aiResponse;
      } else {
        throw new Error('Invalid response format');
      }

      // Validate required fields
      if (!emailData.subject || !emailData.greeting || !emailData.body) {
        throw new Error('Missing required email fields');
      }
      
      return {
        subject: emailData.subject,
        greeting: emailData.greeting,
        body: emailData.body,
        callToAction: emailData.callToAction || 'Contact us for more information',
        closing: emailData.closing || 'Best regards,',
        signature: emailData.signature || 'University Admissions Team',
        personalization: emailData.personalization || 'Name and program interest',
        tone: emailData.tone || 'Professional',
        leadId: lead.id || 'unknown',
        leadName: lead.name,
        emailType,
        generatedAt: new Date().toISOString(),
        wordCount: this.countWords(emailData.body),
        isPersonalized: true
      };

    } catch (error) {
      console.error('Error processing email response:', error);
      return null; // Return null to trigger fallback
    }
  }

  // Comprehensive fallback email templates
  getFallbackEmail(lead, emailType) {
    const leadName = lead?.name || 'Student';
    const program = lead?.program || 'academic';
    
    const templates = {
      'follow-up': {
        subject: `Follow-up: ${program} Program at Our University`,
        greeting: `Dear ${leadName},`,
        body: `Thank you for your interest in our ${program} program. We wanted to follow up and provide you with additional information that might be helpful in your decision-making process.\n\nOur university offers excellent opportunities in ${program}, and we believe you would be a great fit for our program. We'd love to schedule a personal consultation to discuss your goals and answer any questions you might have.`,
        callToAction: 'Schedule a consultation call with our admissions team',
        closing: 'Best regards,',
        signature: 'University Admissions Team',
        personalization: 'Program interest and name',
        tone: 'Professional'
      },
      'program-introduction': {
        subject: `Discover Our ${program} Program`,
        greeting: `Dear ${leadName},`,
        body: `We're excited to introduce you to our ${program} program, which has been designed to provide students with comprehensive knowledge and practical skills in this field.\n\nOur program offers:\n• Expert faculty with industry experience\n• State-of-the-art facilities\n• Career placement assistance\n• Flexible scheduling options\n\nWe believe this program aligns perfectly with your interests and career goals.`,
        callToAction: 'Learn more about our program and application process',
        closing: 'Warm regards,',
        signature: 'Academic Programs Team',
        personalization: 'Program interest and name',
        tone: 'Warm'
      },
      'event-invitation': {
        subject: `You're Invited: University Open House`,
        greeting: `Dear ${leadName},`,
        body: `We're delighted to invite you to our upcoming University Open House, where you can explore our campus, meet faculty, and learn more about our ${program} program.\n\nThis is a great opportunity to:\n• Tour our facilities\n• Meet current students\n• Speak with faculty\n• Get your questions answered\n\nWe'd love to see you there!`,
        callToAction: 'RSVP for the Open House event',
        closing: 'Looking forward to seeing you,',
        signature: 'Events Team',
        personalization: 'Program interest and name',
        tone: 'Welcoming'
      },
      'application-reminder': {
        subject: `Important: Application Deadline Approaching`,
        greeting: `Dear ${leadName},`,
        body: `We wanted to remind you that the application deadline for our ${program} program is approaching soon. We've been impressed by your interest and would hate for you to miss this opportunity.\n\nTo ensure your application is complete, please make sure to submit all required documents. If you need any assistance or have questions, our admissions team is here to help.`,
        callToAction: 'Complete your application before the deadline',
        closing: 'Best regards,',
        signature: 'Admissions Team',
        personalization: 'Program interest and name',
        tone: 'Urgent'
      },
      'welcome': {
        subject: `Welcome to Our University Community!`,
        greeting: `Dear ${leadName},`,
        body: `Welcome to our university community! We're thrilled that you've shown interest in our ${program} program.\n\nAs you begin your journey with us, we want to ensure you have all the information and support you need. Our dedicated team is here to guide you through every step of the process.\n\nWe look forward to helping you achieve your academic and career goals.`,
        callToAction: 'Explore our resources and next steps',
        closing: 'Welcome aboard,',
        signature: 'University Community',
        personalization: 'Program interest and name',
        tone: 'Welcoming'
      }
    };

    const template = templates[emailType] || templates['follow-up'];
    return {
      ...template,
      leadId: lead?.id || 'unknown',
      leadName: leadName,
      emailType,
      generatedAt: new Date().toISOString(),
      wordCount: this.countWords(template.body),
      isPersonalized: false
    };
  }

  // Count words in text
  countWords(text) {
    if (!text) return 0;
    return text.split(/\s+/).filter(word => word.length > 0).length;
  }

  // Get email types
  getEmailTypes() {
    return this.emailTypes;
  }

  // Get template history
  getTemplateHistory() {
    return this.templateHistory;
  }

  // Add to template history
  addToHistory(email) {
    if (!email) return;
    
    this.templateHistory.unshift({
      timestamp: new Date().toISOString(),
      leadName: email.leadName,
      emailType: email.emailType,
      subject: email.subject
    });
    
    // Keep only last 20 emails
    if (this.templateHistory.length > 20) {
      this.templateHistory = this.templateHistory.slice(0, 20);
    }
  }
}

export default new EmailTemplatesService();