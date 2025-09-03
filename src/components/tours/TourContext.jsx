import React, { createContext, useContext, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalization } from '../../hooks/useLocalization';
import { tourRegistry, hasTour } from './data/tourRegistry';
import { getTourData, getTourSteps } from './data/tourData';

const TourContext = createContext();

export const TourProvider = ({ children }) => {
  const { t } = useTranslation();
  const { currentLanguage, isRTLMode } = useLocalization();
  
  // Tour state
  const [isActive, setIsActive] = useState(false);
  const [currentRole, setCurrentRole] = useState(null);
  const [currentPage, setCurrentPage] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [tourSteps, setTourSteps] = useState([]);
  const [tourTitle, setTourTitle] = useState('');
  const [tourDescription, setTourDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Build steps from DOM [data-tour] markers
  const buildAutoSteps = useCallback((language) => {
    const nodes = Array.from(document.querySelectorAll('[data-tour]'));
    if (!nodes.length) return [];

    const visibleNodes = nodes.filter(el => {
      const rect = el.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0;
    });

    const sorted = visibleNodes.sort((a, b) => {
      const ao = Number(a.getAttribute('data-tour')) || 0;
      const bo = Number(b.getAttribute('data-tour')) || 0;
      if (ao !== bo) return ao - bo;
      return a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
    });

    return sorted.map((el, idx) => {
      const order = Number(el.getAttribute('data-tour')) || idx + 1;
      const titleEn = el.getAttribute('data-tour-title-en');
      const titleAr = el.getAttribute('data-tour-title-ar');
      const contentEn = el.getAttribute('data-tour-content-en');
      const contentAr = el.getAttribute('data-tour-content-ar');
      return {
        id: order,
        target: `[data-tour="${order}"]`,
        title: {
          en: titleEn || el.getAttribute('data-tour-title') || 'Section',
          ar: titleAr || el.getAttribute('data-tour-title') || 'القسم'
        },
        content: {
          en: contentEn || '',
          ar: contentAr || ''
        },
        position: el.getAttribute('data-tour-position') || 'bottom'
      };
    });
  }, []);

  // Check if current page has a tour available
  const checkTourAvailability = useCallback((role, page) => {
    return hasTour(role, page);
  }, []);

  // Start tour for a specific role and page
  const startTour = useCallback((role, page) => {
    console.log('TourContext: Starting tour for', role, page);
    setIsLoading(true);
    
    // Check if tour exists
    if (!checkTourAvailability(role, page)) {
      console.warn(`No tour available for ${role}/${page}`);
      setIsLoading(false);
      return false;
    }

    // Get tour data
    const tour = getTourData(role, page);
    if (!tour) {
      console.warn(`Tour data not found for ${role}/${page}`);
      setIsLoading(false);
      return false;
    }

    // Determine steps (auto-scan if enabled)
    let steps = [];
    if (tour.autoScan) {
      steps = buildAutoSteps(currentLanguage);
    }
    if (!steps || steps.length === 0) {
      steps = getTourSteps(role, page);
    }

    if (!steps || steps.length === 0) {
      console.warn('TourContext: No steps found for tour');
      setIsLoading(false);
      return false;
    }

    // Set tour state
    setCurrentRole(role);
    setCurrentPage(page);
    setTourSteps(steps);
    setTourTitle(tour.title[currentLanguage] || tour.title.en);
    setTourDescription(tour.description[currentLanguage] || tour.description.en);
    setCurrentStep(1); // Start at step 1
    setIsActive(true);
    // Defer turning off loading so UI can render spinner
    setTimeout(() => setIsLoading(false), 150);

    console.log(`TourContext: Tour started for ${role}/${page} in ${currentLanguage}`);
    return true;
  }, [currentLanguage, checkTourAvailability, buildAutoSteps]);

  // Stop tour
  const stopTour = useCallback(() => {
    console.log('TourContext: Stopping tour');
    setIsActive(false);
    setCurrentRole(null);
    setCurrentPage(null);
    setCurrentStep(0);
    setTourSteps([]);
    setTourTitle('');
    setTourDescription('');
  }, []);

  // Go to next step
  const nextStep = useCallback(() => {
    if (currentStep < tourSteps.length) {
      setCurrentStep(prev => prev + 1);
    } else {
      stopTour();
    }
  }, [currentStep, tourSteps.length, stopTour]);

  // Go to previous step
  const prevStep = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep]);

  // Go to specific step
  const goToStep = useCallback((stepIndex) => {
    if (stepIndex >= 1 && stepIndex <= tourSteps.length) {
      setCurrentStep(stepIndex);
    }
  }, [tourSteps.length]);

  // Skip tour
  const skipTour = useCallback(() => {
    stopTour();
  }, [stopTour]);

  // Get current step data
  const getCurrentStep = useCallback(() => {
    if (tourSteps.length === 0 || currentStep < 1 || currentStep > tourSteps.length) {
      return null;
    }
    return tourSteps[currentStep - 1];
  }, [tourSteps, currentStep]);

  // Check if tour is on first/last step
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === tourSteps.length;

  // Get tour progress percentage
  const getTourProgress = useCallback(() => {
    if (tourSteps.length === 0) return 0;
    return (currentStep / tourSteps.length) * 100;
  }, [currentStep, tourSteps.length]);

  // Get tour status for smart button behavior
  const getTourStatus = useCallback((role, page) => {
    if (hasTour(role, page)) {
      return {
        available: true,
        text: t('sidebar.startTour'),
        icon: '⭐',
        action: 'start'
      };
    } else {
      return {
        available: false,
        text: t('sidebar.tourComingSoon'),
        icon: '🚧',
        action: 'coming-soon'
      };
    }
  }, [t]);

  // Handle tour coming soon
  const handleTourComingSoon = useCallback(() => {
    alert(t('tours.comingSoon') || 'Tour coming soon for this page!');
  }, [t]);

  const value = {
    // State
    isActive,
    currentRole,
    currentPage,
    currentStep,
    tourSteps,
    tourTitle,
    tourDescription,
    isLoading,
    
    // Actions
    startTour,
    stopTour,
    nextStep,
    prevStep,
    goToStep,
    skipTour,
    
    // Utilities
    getCurrentStep,
    isFirstStep,
    isLastStep,
    getTourProgress,
    getTourStatus,
    checkTourAvailability,
    handleTourComingSoon,
    
    // Tour info
    totalSteps: tourSteps.length,
    currentStepNumber: currentStep
  };

  return (
    <TourContext.Provider value={value}>
      {children}
    </TourContext.Provider>
  );
};

export const useTour = () => {
  const context = useContext(TourContext);
  if (!context) {
    throw new Error('useTour must be used within a TourProvider');
  }
  return context;
}; 