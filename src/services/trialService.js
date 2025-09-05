// trialService.js
// Service for managing AI chat trial limits

const TRIAL_CONFIG = {
  MAX_QUESTIONS: 20,
  STORAGE_KEY: 'ai_trial_usage',
  SESSION_KEY: 'ai_trial_session'
};

class TrialService {
  constructor() {
    this.currentSession = this.getCurrentSession();
    this.usage = this.getUsage();
  }

  // Get current session ID (resets on page reload)
  getCurrentSession() {
    let sessionId = window.sessionStorage.getItem(TRIAL_CONFIG.SESSION_KEY);
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      window.sessionStorage.setItem(TRIAL_CONFIG.SESSION_KEY, sessionId);
    }
    return sessionId;
  }

  // Get usage data from localStorage
  getUsage() {
    try {
      const stored = window.localStorage.getItem(TRIAL_CONFIG.STORAGE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.error('Error loading trial usage:', error);
      return {};
    }
  }

  // Save usage data to localStorage
  saveUsage() {
    try {
      window.localStorage.setItem(TRIAL_CONFIG.STORAGE_KEY, JSON.stringify(this.usage));
    } catch (error) {
      console.error('Error saving trial usage:', error);
    }
  }

  // Reset trial for current session (called on login)
  resetTrialForSession() {
    this.currentSession = this.getCurrentSession();
    this.usage[this.currentSession] = {
      questionsUsed: 0,
      startTime: Date.now(),
      lastReset: Date.now()
    };
    this.saveUsage();
  }

  // Get current session usage
  getCurrentSessionUsage() {
    if (!this.usage[this.currentSession]) {
      this.usage[this.currentSession] = {
        questionsUsed: 0,
        startTime: Date.now(),
        lastReset: Date.now()
      };
      this.saveUsage();
    }
    return this.usage[this.currentSession];
  }

  // Check if user can ask more questions
  canAskQuestion() {
    const sessionUsage = this.getCurrentSessionUsage();
    return sessionUsage.questionsUsed < TRIAL_CONFIG.MAX_QUESTIONS;
  }

  // Record a question being asked
  recordQuestion() {
    const sessionUsage = this.getCurrentSessionUsage();
    sessionUsage.questionsUsed += 1;
    sessionUsage.lastQuestionTime = Date.now();
    this.saveUsage();
  }

  // Get remaining questions
  getRemainingQuestions() {
    const sessionUsage = this.getCurrentSessionUsage();
    return Math.max(0, TRIAL_CONFIG.MAX_QUESTIONS - sessionUsage.questionsUsed);
  }

  // Get questions used
  getQuestionsUsed() {
    const sessionUsage = this.getCurrentSessionUsage();
    return sessionUsage.questionsUsed;
  }

  // Get trial status
  getTrialStatus() {
    const sessionUsage = this.getCurrentSessionUsage();
    const remaining = this.getRemainingQuestions();
    const isExpired = remaining === 0;
    
    return {
      questionsUsed: sessionUsage.questionsUsed,
      remaining: remaining,
      maxQuestions: TRIAL_CONFIG.MAX_QUESTIONS,
      isExpired: isExpired,
      canAsk: this.canAskQuestion(),
      sessionId: this.currentSession,
      startTime: sessionUsage.startTime,
      lastQuestionTime: sessionUsage.lastQuestionTime
    };
  }

  // Clear all trial data (for testing or admin purposes)
  clearAllTrialData() {
    window.localStorage.removeItem(TRIAL_CONFIG.STORAGE_KEY);
    window.sessionStorage.removeItem(TRIAL_CONFIG.SESSION_KEY);
    this.usage = {};
    this.currentSession = this.getCurrentSession();
  }

  // Get trial progress percentage
  getTrialProgress() {
    const sessionUsage = this.getCurrentSessionUsage();
    return (sessionUsage.questionsUsed / TRIAL_CONFIG.MAX_QUESTIONS) * 100;
  }

  // Check if trial is about to expire (last 3 questions)
  isTrialAboutToExpire() {
    const remaining = this.getRemainingQuestions();
    return remaining <= 3 && remaining > 0;
  }
}

// Create and export singleton instance
const trialService = new TrialService();
export default trialService;