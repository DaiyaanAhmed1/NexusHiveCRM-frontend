class AILanguageService {
    constructor() {
      this.currentLanguage = this.getStoredLanguage() || 'en';
    }
  
    // Get stored language preference
    getStoredLanguage() {
      try {
        return localStorage.getItem('aiResponseLanguage') || 'en';
      } catch (error) {
        console.warn('Could not access localStorage:', error);
        return 'en';
      }
    }
  
    // Set language preference
    setLanguage(language) {
      this.currentLanguage = language;
      try {
        localStorage.setItem('aiResponseLanguage', language);
      } catch (error) {
        console.warn('Could not save to localStorage:', error);
      }
    }
  
    // Get current language
    getCurrentLanguage() {
      return this.currentLanguage;
    }
  
    // Get language-specific prompt suffix
    getLanguagePrompt() {
      if (this.currentLanguage === 'ar') {
        return '\n\nيرجى الرد باللغة العربية فقط.';
      }
      return '\n\nPlease respond in English only.';
    }
  }
  
  export default new AILanguageService();