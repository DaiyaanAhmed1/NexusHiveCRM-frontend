import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalization } from '../../hooks/useLocalization';
import { tourRegistry, hasTour } from './data/tourRegistry';
import { getTourData, getTourSteps } from './data/tourData';

// Main tour logic hook
export const useTour = () => {
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

  // Check if current page has a tour available
  const checkTourAvailability = useCallback((role, page) => {
    return hasTour(role, page);
  }, []);

  // Start tour for a specific role and page
  const startTour = useCallback((role, page) => {
    // Check if tour exists
    if (!checkTourAvailability(role, page)) {
      console.warn(`No tour available for ${role}/${page}`);
      return false;
    }

    // Get tour data
    const tour = getTourData(role, page);
    if (!tour) {
      console.warn(`Tour data not found for ${role}/${page}`);
      return false;
    }

    // Set tour state
    setCurrentRole(role);
    setCurrentPage(page);
    setTourSteps(getTourSteps(role, page));
    setTourTitle(tour.title[currentLanguage] || tour.title.en);
    setTourDescription(tour.description[currentLanguage] || tour.description.en);
    setCurrentStep(0);
    setIsActive(true);

    console.log(`Tour started for ${role}/${page} in ${currentLanguage}`);
    return true;
  }, [currentLanguage, checkTourAvailability]);

  // Stop tour
  const stopTour = useCallback(() => {
    setIsActive(false);
    setCurrentRole(null);
    setCurrentPage(null);
    setCurrentStep(0);
    setTourSteps([]);
    setTourTitle('');
    setTourDescription('');
    console.log('Tour stopped');
  }, []);

  // Go to next step
  const nextStep = useCallback(() => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
      console.log(`Tour step: ${currentStep + 1}/${tourSteps.length}`);
    } else {
      // Tour completed
      console.log('Tour completed');
      stopTour();
    }
  }, [currentStep, tourSteps.length, stopTour]);

  // Go to previous step
  const prevStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      console.log(`Tour step: ${currentStep - 1}/${tourSteps.length}`);
    }
  }, [currentStep, tourSteps.length]);

  // Go to specific step
  const goToStep = useCallback((stepIndex) => {
    if (stepIndex >= 0 && stepIndex < tourSteps.length) {
      setCurrentStep(stepIndex);
      console.log(`Tour step: ${stepIndex + 1}/${tourSteps.length}`);
    }
  }, [tourSteps.length]);

  // Skip tour
  const skipTour = useCallback(() => {
    console.log('Tour skipped');
    stopTour();
  }, [stopTour]);

  // Get current step data
  const getCurrentStep = useCallback(() => {
    if (tourSteps.length === 0 || currentStep >= tourSteps.length) {
      return null;
    }
    return tourSteps[currentStep];
  }, [tourSteps, currentStep]);

  // Check if tour is on first step
  const isFirstStep = currentStep === 0;

  // Check if tour is on last step
  const isLastStep = currentStep === tourSteps.length - 1;

  // Get tour progress percentage
  const getTourProgress = useCallback(() => {
    if (tourSteps.length === 0) return 0;
    return ((currentStep + 1) / tourSteps.length) * 100;
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
    // Show coming soon message (you can customize this)
    alert(t('tours.comingSoon') || 'Tour coming soon for this page!');
  }, [t]);

  // Auto-advance tour after a delay (optional)
  const [autoAdvance, setAutoAdvance] = useState(false);
  const [autoAdvanceDelay] = useState(5000); // 5 seconds

  useEffect(() => {
    if (autoAdvance && isActive && !isLastStep) {
      const timer = setTimeout(() => {
        nextStep();
      }, autoAdvanceDelay);

      return () => clearTimeout(timer);
    }
  }, [autoAdvance, isActive, isLastStep, nextStep, autoAdvanceDelay]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (isActive) {
        stopTour();
      }
    };
  }, [isActive, stopTour]);

  return {
    // State
    isActive,
    currentRole,
    currentPage,
    currentStep,
    tourSteps,
    tourTitle,
    tourDescription,
    
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
    
    // Configuration
    autoAdvance,
    setAutoAdvance,
    autoAdvanceDelay,
    
    // Tour info
    totalSteps: tourSteps.length,
    currentStepNumber: currentStep + 1
  };
}; 