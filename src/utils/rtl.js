export const RTL_LANGUAGES = ['ar', 'he', 'fa', 'ur'];

export const isRTL = (language) => {
  return RTL_LANGUAGES.includes(language);
};

export const getTextDirection = (language) => {
  return isRTL(language) ? 'rtl' : 'ltr';
};

export const getFlexDirection = (language, defaultDirection = 'row') => {
  return isRTL(language) ? `${defaultDirection}-reverse` : defaultDirection;
};

export const getTextAlign = (language, defaultAlign = 'left') => {
  return isRTL(language) ? 'right' : defaultAlign;
};

export const getMarginDirection = (language, leftValue, rightValue) => {
  return isRTL(language) 
    ? { marginRight: leftValue, marginLeft: rightValue } 
    : { marginLeft: leftValue, marginRight: rightValue };
};

export const getPaddingDirection = (language, leftValue, rightValue) => {
  return isRTL(language) 
    ? { paddingRight: leftValue, paddingLeft: rightValue } 
    : { paddingLeft: leftValue, paddingRight: rightValue };
};

export const getBorderRadius = (language, leftRadius, rightRadius) => {
  return isRTL(language) ? `${leftRadius} ${rightRadius}` : `${rightRadius} ${leftRadius}`;
};

export const getIconPosition = (language, leftClass, rightClass) => {
  return isRTL(language) ? rightClass : leftClass;
};

export const getFloatDirection = (language, leftValue = 'left', rightValue = 'right') => {
  return isRTL(language) ? rightValue : leftValue;
};

export const getTransformDirection = (language, leftValue = 'translateX(-100%)', rightValue = 'translateX(100%)') => {
  return isRTL(language) ? rightValue : leftValue;
};

// New function to restore RTL state safely
export const restoreRTLState = () => {
  if (typeof document === 'undefined') return false; // SSR safety
  
  try {
    const savedLanguage = localStorage.getItem('preferred-language') || 'en';
    const shouldBeRTL = isRTL(savedLanguage);
    
    console.log('Restoring RTL state for language:', savedLanguage, 'RTL:', shouldBeRTL);
    
    // Set document attributes safely
    document.documentElement.dir = shouldBeRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = savedLanguage;
    
    // Use specific class names to avoid conflicts
    if (shouldBeRTL) {
      document.body.classList.add('rtl-layout');
      document.body.classList.remove('ltr-layout');
    } else {
      document.body.classList.add('ltr-layout');
      document.body.classList.remove('rtl-layout');
    }
    
    console.log('RTL state restored successfully');
    return shouldBeRTL;
  } catch (error) {
    console.error('Failed to restore RTL state:', error);
    return false; // Graceful fallback
  }
};

// Function to force RTL scrollbar behavior
export const forceRTLScrollbar = () => {
  if (typeof document === 'undefined') return;
  
  try {
    // Add RTL scrollbar class
    document.body.classList.add('rtl-scrollbar');
    
    // Also ensure html element has RTL direction for scrollbar inheritance
    if (document.documentElement) {
      document.documentElement.style.direction = 'rtl';
    }
    
    // Apply RTL scrollbar styling to body
    if (document.body) {
      document.body.style.direction = 'rtl';
      document.body.style.overflow = 'auto';
    }
    
    console.log('RTL scrollbar applied with enhanced styling');
  } catch (error) {
    console.error('Failed to apply RTL scrollbar:', error);
  }
};

// Function to set LTR scrollbar behavior
export const setLTRScrollbar = () => {
  if (typeof document === 'undefined') return;
  
  try {
    // Reset scrollbar direction to LTR
    if (document.documentElement) {
      document.documentElement.style.direction = 'ltr';
    }
    if (document.body) {
      document.body.style.direction = 'ltr';
      document.body.style.overflow = '';
    }
    
    console.log('LTR scrollbar applied');
  } catch (error) {
    console.error('Failed to apply LTR scrollbar:', error);
  }
};

// Function to cleanup RTL styling
export const cleanupRTLStyling = () => {
  if (typeof document === 'undefined') return;
  
  try {
    // Remove all RTL-related classes
    const classesToRemove = ['rtl-layout', 'ltr-layout', 'rtl-scrollbar'];
    classesToRemove.forEach(className => {
      if (document.body.classList.contains(className)) {
        document.body.classList.remove(className);
        console.log(`Removed class: ${className}`);
      }
    });
    
    // Reset scrollbar-related styles
    if (document.documentElement) {
      document.documentElement.style.direction = '';
    }
    if (document.body) {
      document.body.style.direction = '';
      document.body.style.overflow = '';
    }
    
    console.log('RTL styling cleanup completed - scrollbar styles reset');
  } catch (error) {
    console.error('Failed to cleanup RTL styling:', error);
  }
};

// Debug function to check current RTL state
export const debugRTLState = () => {
  if (typeof document === 'undefined') return;
  
  try {
    const currentClasses = Array.from(document.body.classList);
    const rtlClasses = currentClasses.filter(cls => cls.includes('rtl') || cls.includes('ltr'));
    const dir = document.documentElement.dir;
    const lang = document.documentElement.lang;
    
    console.log('=== RTL Debug Info ===');
    console.log('Document direction:', dir);
    console.log('Document language:', lang);
    console.log('Body classes:', currentClasses);
    console.log('RTL/LTR classes:', rtlClasses);
    console.log('=====================');
    
    return {
      direction: dir,
      language: lang,
      bodyClasses: currentClasses,
      rtlClasses: rtlClasses
    };
  } catch (error) {
    console.error('Failed to debug RTL state:', error);
    return null;
  }
}; 