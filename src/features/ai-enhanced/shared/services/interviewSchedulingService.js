import aiService from '../../../../services/aiService';

class InterviewSchedulingService {
  constructor() {
    this.scheduledInterviews = [];
    this.interviewTypes = [
      "Academic Interview",
      "English Proficiency Interview", 
      "Technical Interview",
      "General Assessment",
      "Scholarship Interview",
      "Admission Committee Interview",
      "Faculty Interview",
      "Program-Specific Interview"
    ];
    
    this.programs = [
      "Computer Science",
      "Business Administration", 
      "Engineering",
      "Medicine",
      "Law",
      "Arts & Humanities",
      "Sciences",
      "Education",
      "Architecture",
      "Pharmacy"
    ];

    this.timeSlots = [
      "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
      "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
      "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM",
      "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM"
    ];
  }

  // Main interview scheduling function
  async scheduleInterview(interviewData, language = 'en') {
    try {
      console.log('Interview Scheduling:', interviewData, 'Language:', language);
      
      if (!interviewData || !interviewData.studentName || !interviewData.program) {
        throw new Error('Invalid interview data provided');
      }

      const prompt = this.buildSchedulingPrompt(interviewData, language);
      const aiResponse = await aiService.generateResponse(
        prompt,
        'admission-head',
        [],
        language
      );

      const schedulingResult = this.processSchedulingResult(
        aiResponse.content,
        interviewData,
        language
      );

      // Add to scheduled interviews
      this.addToScheduled(schedulingResult);

      return schedulingResult;

    } catch (error) {
      console.error('Interview scheduling error:', error);
      return this.getFallbackResult(interviewData, error.message, language);
    }
  }

  // Build AI prompt for interview scheduling
  buildSchedulingPrompt(interviewData, language) {
    return `As an AI interview scheduling assistant for university admissions, please help schedule an interview with the following details:

**Student Information:**
- Student Name: ${interviewData.studentName}
- Program: ${interviewData.program}
- Interview Type: ${interviewData.interviewType || 'General Assessment'}
- Preferred Date: ${interviewData.preferredDate || 'Not specified'}
- Preferred Time: ${interviewData.preferredTime || 'Not specified'}
- Additional Notes: ${interviewData.notes || 'None'}

Please provide comprehensive interview scheduling recommendations including:

1. **Optimal Interview Scheduling** recommendations
2. **Interview Preparation Suggestions** for the student
3. **Required Documents or Materials** needed for the interview
4. **Interview Duration Estimation** (in minutes)
5. **Special Considerations** based on the program and interview type
6. **Interview Format** recommendations (in-person, online, hybrid)
7. **Follow-up Actions** after the interview
8. **Interviewer Assignment** suggestions
9. **Technical Requirements** (if online interview)
10. **Pre-interview Checklist** for the student

**Response Format:**
- Use clear headings for each section
- Provide specific time recommendations
- Include actionable preparation steps
- Consider program-specific requirements
- Be professional and helpful

Respond in ${language === 'ar' ? 'Arabic' : 'English'} with detailed recommendations.`;
  }

  // Process AI response into structured result
  processSchedulingResult(aiResponse, interviewData, language) {
    const result = {
      id: Date.now(),
      studentName: interviewData.studentName,
      program: interviewData.program,
      interviewType: interviewData.interviewType || 'General Assessment',
      scheduledDate: interviewData.preferredDate || this.getNextAvailableDate(),
      scheduledTime: interviewData.preferredTime || this.getNextAvailableTime(),
      status: 'scheduled',
      aiRecommendations: aiResponse,
      preparationSuggestions: this.extractPreparationSuggestions(aiResponse),
      requiredDocuments: this.extractRequiredDocuments(aiResponse),
      interviewDuration: this.extractInterviewDuration(aiResponse),
      specialConsiderations: this.extractSpecialConsiderations(aiResponse),
      interviewFormat: this.extractInterviewFormat(aiResponse),
      followUpActions: this.extractFollowUpActions(aiResponse),
      technicalRequirements: this.extractTechnicalRequirements(aiResponse),
      preInterviewChecklist: this.extractPreInterviewChecklist(aiResponse),
      notes: interviewData.notes || '',
      createdAt: new Date().toISOString(),
      createdBy: 'AI Interview Scheduling System',
      language: language
    };

    return result;
  }

  // Extract preparation suggestions from AI response
  extractPreparationSuggestions(response) {
    const suggestions = [];
    const suggestionPattern = /(?:prepare|suggestion|recommend|advise)[:\-]?\s*([^.\n]+)/gi;
    let match;

    while ((match = suggestionPattern.exec(response)) !== null) {
      const suggestion = match[1].trim();
      if (suggestion && !suggestions.includes(suggestion)) {
        suggestions.push(suggestion);
      }
    }

    return suggestions;
  }

  // Extract required documents from AI response
  extractRequiredDocuments(response) {
    const documents = [];
    const docPattern = /(?:document|material|bring|required)[:\-]?\s*([^.\n]+)/gi;
    let match;

    while ((match = docPattern.exec(response)) !== null) {
      const doc = match[1].trim();
      if (doc && !documents.includes(doc)) {
        documents.push(doc);
      }
    }

    return documents;
  }

  // Extract interview duration from AI response
  extractInterviewDuration(response) {
    const durationPattern = /(\d+)\s*(?:minutes?|mins?|hours?|hrs?)/i;
    const match = response.match(durationPattern);
    return match ? parseInt(match[1]) : 60; // Default 60 minutes
  }

  // Extract special considerations from AI response
  extractSpecialConsiderations(response) {
    const considerations = [];
    const considerationPattern = /(?:consider|special|note|important)[:\-]?\s*([^.\n]+)/gi;
    let match;

    while ((match = considerationPattern.exec(response)) !== null) {
      const consideration = match[1].trim();
      if (consideration && !considerations.includes(consideration)) {
        considerations.push(consideration);
      }
    }

    return considerations;
  }

  // Extract interview format from AI response
  extractInterviewFormat(response) {
    const responseLower = response.toLowerCase();
    if (responseLower.includes('online') || responseLower.includes('virtual')) {
      return 'online';
    } else if (responseLower.includes('hybrid')) {
      return 'hybrid';
    } else {
      return 'in-person';
    }
  }

  // Extract follow-up actions from AI response
  extractFollowUpActions(response) {
    const actions = [];
    const actionPattern = /(?:follow.?up|after|next|action)[:\-]?\s*([^.\n]+)/gi;
    let match;

    while ((match = actionPattern.exec(response)) !== null) {
      const action = match[1].trim();
      if (action && !actions.includes(action)) {
        actions.push(action);
      }
    }

    return actions;
  }

  // Extract technical requirements from AI response
  extractTechnicalRequirements(response) {
    const requirements = [];
    const techPattern = /(?:technical|technology|equipment|software)[:\-]?\s*([^.\n]+)/gi;
    let match;

    while ((match = techPattern.exec(response)) !== null) {
      const requirement = match[1].trim();
      if (requirement && !requirements.includes(requirement)) {
        requirements.push(requirement);
      }
    }

    return requirements;
  }

  // Extract pre-interview checklist from AI response
  extractPreInterviewChecklist(response) {
    const checklist = [];
    const checklistPattern = /(?:checklist|check|verify|ensure)[:\-]?\s*([^.\n]+)/gi;
    let match;

    while ((match = checklistPattern.exec(response)) !== null) {
      const item = match[1].trim();
      if (item && !checklist.includes(item)) {
        checklist.push(item);
      }
    }

    return checklist;
  }

  // Get next available date
  getNextAvailableDate() {
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    return nextWeek.toISOString().split('T')[0];
  }

  // Get next available time
  getNextAvailableTime() {
    return this.timeSlots[0]; // Return first available time slot
  }

  // Get fallback result for errors
  getFallbackResult(interviewData, errorMessage, language) {
    return {
      id: Date.now(),
      studentName: interviewData.studentName,
      program: interviewData.program,
      interviewType: interviewData.interviewType || 'General Assessment',
      scheduledDate: this.getNextAvailableDate(),
      scheduledTime: this.getNextAvailableTime(),
      status: 'scheduled',
      aiRecommendations: language === 'ar' ? 
        'حدث خطأ في جدولة المقابلة. يرجى المحاولة مرة أخرى أو الاتصال بالدعم الفني.' :
        'An error occurred during interview scheduling. Please try again or contact technical support.',
      preparationSuggestions: [
        language === 'ar' ? 
          'التحضير للمقابلة حسب نوع البرنامج' :
          'Prepare for interview based on program type'
      ],
      requiredDocuments: [
        language === 'ar' ? 
          'الوثائق المطلوبة للقبول' :
          'Required admission documents'
      ],
      interviewDuration: 60,
      specialConsiderations: [],
      interviewFormat: 'in-person',
      followUpActions: [
        language === 'ar' ? 
          'مراجعة يدوية للجدولة' :
          'Manual scheduling review required'
      ],
      technicalRequirements: [],
      preInterviewChecklist: [
        language === 'ar' ? 
          'التحقق من جميع المتطلبات' :
          'Verify all requirements'
      ],
      notes: interviewData.notes || '',
      createdAt: new Date().toISOString(),
      createdBy: 'AI System (Error)',
      language: language,
      error: errorMessage
    };
  }

  // Add interview to scheduled list
  addToScheduled(interviewResult) {
    this.scheduledInterviews.unshift(interviewResult);
    
    // Keep only last 200 interviews
    if (this.scheduledInterviews.length > 200) {
      this.scheduledInterviews = this.scheduledInterviews.slice(0, 200);
    }
  }

  // Get scheduled interviews
  getScheduledInterviews(limit = 50) {
    return this.scheduledInterviews.slice(0, limit);
  }

  // Get interview statistics
  getInterviewStats() {
    const total = this.scheduledInterviews.length;
    if (total === 0) return { total: 0, scheduled: 0, completed: 0, cancelled: 0 };

    const stats = this.scheduledInterviews.reduce((acc, interview) => {
      acc[interview.status] = (acc[interview.status] || 0) + 1;
      return acc;
    }, {});

    return {
      total,
      scheduled: stats.scheduled || 0,
      completed: stats.completed || 0,
      cancelled: stats.cancelled || 0,
      completion_rate: total > 0 ? Math.round((stats.completed || 0) / total * 100) : 0
    };
  }

  // Get available time slots for a date
  getAvailableTimeSlots(date) {
    // This would typically check against existing scheduled interviews
    // For now, return all time slots
    return this.timeSlots;
  }

  // Check if time slot is available
  isTimeSlotAvailable(date, time) {
    const existingInterview = this.scheduledInterviews.find(
      interview => interview.scheduledDate === date && interview.scheduledTime === time
    );
    return !existingInterview;
  }

  // Get interview types
  getInterviewTypes() {
    return this.interviewTypes;
  }

  // Get programs
  getPrograms() {
    return this.programs;
  }

  // Get time slots
  getTimeSlots() {
    return this.timeSlots;
  }

  // Update interview status
  updateInterviewStatus(interviewId, newStatus) {
    const interview = this.scheduledInterviews.find(i => i.id === interviewId);
    if (interview) {
      interview.status = newStatus;
      interview.updatedAt = new Date().toISOString();
      return true;
    }
    return false;
  }

  // Cancel interview
  cancelInterview(interviewId, reason = '') {
    return this.updateInterviewStatus(interviewId, 'cancelled');
  }

  // Complete interview
  completeInterview(interviewId, notes = '') {
    const updated = this.updateInterviewStatus(interviewId, 'completed');
    if (updated) {
      const interview = this.scheduledInterviews.find(i => i.id === interviewId);
      if (interview) {
        interview.completionNotes = notes;
        interview.completedAt = new Date().toISOString();
      }
    }
    return updated;
  }
}

// Create and export singleton instance
const interviewSchedulingService = new InterviewSchedulingService();
export default interviewSchedulingService;