import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useLocalization } from '../../hooks/useLocalization';

// Find nearest scrollable ancestor (overflow auto/scroll and scrollable content)
const getScrollableAncestor = (element) => {
  if (!element) return null;
  let node = element.parentElement;
  while (node && node !== document.body) {
    const style = window.getComputedStyle(node);
    const overflowY = style.overflowY;
    const canScrollY = (overflowY === 'auto' || overflowY === 'scroll') && node.scrollHeight > node.clientHeight;
    const overflowX = style.overflowX;
    const canScrollX = (overflowX === 'auto' || overflowX === 'scroll') && node.scrollWidth > node.clientWidth;
    if (canScrollY || canScrollX) return node;
    node = node.parentElement;
  }
  return document.scrollingElement || document.documentElement;
};

const isMostlyInViewWithin = (targetEl, containerEl) => {
  if (!targetEl || !containerEl) return true;
  const tRect = targetEl.getBoundingClientRect();
  const cRect = containerEl === document.scrollingElement || containerEl === document.documentElement
    ? { top: 0, left: 0, right: window.innerWidth, bottom: window.innerHeight }
    : containerEl.getBoundingClientRect();
  const buffer = 40;
  const verticalInView = tRect.top >= cRect.top - buffer && tRect.bottom <= cRect.bottom + buffer;
  const horizontalInView = tRect.left >= cRect.left - buffer && tRect.right <= cRect.right + buffer;
  return verticalInView && horizontalInView;
};

const TourStep = ({ 
  step, 
  onNext, 
  onPrevious, 
  onSkip, 
  onClose, 
  currentStep, 
  totalSteps,
  isFirstStep,
  isLastStep 
}) => {
  const { t } = useTranslation();
  const { isRTLMode } = useLocalization();
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [arrowPosition, setArrowPosition] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  const stepRef = useRef(null);
  const [autoScrollComplete, setAutoScrollComplete] = useState(false);
  const [spotlightRect, setSpotlightRect] = useState({ top: 0, left: 0, width: 0, height: 0 });
  const [viewport, setViewport] = useState({ w: typeof window !== 'undefined' ? window.innerWidth : 0, h: typeof window !== 'undefined' ? window.innerHeight : 0 });
  const scrollContainerRef = useRef(null);

  // Calculate optimal position based on target element and available space
  const calculateOptimalPosition = (targetElement, stepElement) => {
    if (!targetElement || !stepElement) return { top: 0, left: 0 };

    const targetRect = targetElement.getBoundingClientRect();
    const stepRect = stepElement.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Available space in each direction
    const spaceAbove = targetRect.top;
    const spaceBelow = viewportHeight - targetRect.bottom;
    const spaceLeft = targetRect.left;
    const spaceRight = viewportWidth - targetRect.right;
    
    // Determine best position based on available space
    let preferredPosition = step.position || 'bottom';
    let finalPosition = preferredPosition;
    
    // Check if preferred position has enough space
    const hasEnoughSpace = (pos) => {
      switch (pos) {
        case 'top':
          return spaceAbove >= stepRect.height + 30;
        case 'bottom':
          return spaceBelow >= stepRect.height + 30;
        case 'left':
          return spaceLeft >= stepRect.width + 30;
        case 'right':
          return spaceRight >= stepRect.width + 30;
        case 'overlay':
          return true; // Overlay always works
        default:
          return false;
      }
    };
    
    // If preferred position doesn't have space, find the best alternative
    if (!hasEnoughSpace(preferredPosition)) {
      const positions = ['bottom', 'top', 'right', 'left', 'overlay'];
      for (const pos of positions) {
        if (hasEnoughSpace(pos)) {
          finalPosition = pos;
          break;
        }
      }
    }
    
    // Calculate coordinates based on final position
    let top, left;
    
    switch (finalPosition) {
      case 'top':
        top = targetRect.top - stepRect.height - 20;
        left = targetRect.left + (targetRect.width / 2) - (stepRect.width / 2);
        break;
      case 'bottom':
        top = targetRect.bottom + 20;
        left = targetRect.left + (targetRect.width / 2) - (stepRect.width / 2);
        break;
      case 'left':
        top = targetRect.top + (targetRect.height / 2) - (stepRect.height / 2);
        left = targetRect.left - stepRect.width - 20;
        break;
      case 'right':
        top = targetRect.top + (targetRect.height / 2) - (stepRect.height / 2);
        left = targetRect.right + 20;
        break;
      case 'overlay':
        // Center over the target element
        top = targetRect.top + (targetRect.height / 2) - (stepRect.height / 2);
        left = targetRect.left + (targetRect.width / 2) - (stepRect.width / 2);
        break;
      default:
        top = targetRect.bottom + 20;
        left = targetRect.left + (targetRect.width / 2) - (stepRect.width / 2);
    }
    
    // Ensure step stays within viewport bounds with better margins
    top = Math.max(30, Math.min(top, viewportHeight - stepRect.height - 30));
    left = Math.max(30, Math.min(left, viewportWidth - stepRect.width - 30));
    
    return { top, left, position: finalPosition };
  };

  // Calculate arrow position based on step position
  const calculateArrowPosition = (stepPosition, targetRect, stepRect) => {
    switch (stepPosition) {
      case 'top':
        return {
          bottom: -10,
          left: '50%',
          transform: 'translateX(-50%)',
          borderTop: '10px solid #3b82f6',
          borderLeft: '10px solid transparent',
          borderRight: '10px solid transparent'
        };
      case 'bottom':
        return {
          top: -10,
          left: '50%',
          transform: 'translateX(-50%)',
          borderBottom: '10px solid #3b82f6',
          borderLeft: '10px solid transparent',
          borderRight: '10px solid transparent'
        };
      case 'left':
        return {
          right: -10,
          top: '50%',
          transform: 'translateY(-50%)',
          borderLeft: '10px solid #3b82f6',
          borderTop: '10px solid transparent',
          borderBottom: '10px solid transparent'
        };
      case 'right':
        return {
          left: -10,
          top: '50%',
          transform: 'translateY(-50%)',
          borderRight: '10px solid #3b82f6',
          borderTop: '10px solid transparent',
          borderBottom: '10px solid transparent'
        };
      case 'overlay':
        return {}; // No arrow for overlay
      default:
        return {};
    }
  };

  // Auto-scroll to bring target element into view (fast)
  const scrollToTarget = (targetElement) => {
    if (!targetElement) return;
    const container = scrollContainerRef.current || getScrollableAncestor(targetElement);
    scrollContainerRef.current = container;

    // If already mostly in view within the container, finish
    if (isMostlyInViewWithin(targetElement, container)) {
      setAutoScrollComplete(true);
      return;
    }

    // Scroll container to center target
    if (container === document.scrollingElement || container === document.documentElement) {
      const rect = targetElement.getBoundingClientRect();
      const vh = window.innerHeight;
      const vw = window.innerWidth;
      const scrollTop = rect.top + window.scrollY - (vh / 2) + (rect.height / 2);
      const scrollLeft = rect.left + window.scrollX - (vw / 2) + (rect.width / 2);
      window.scrollTo({ top: Math.max(0, scrollTop), left: Math.max(0, scrollLeft), behavior: 'smooth' });
    } else {
      const containerRect = container.getBoundingClientRect();
      const targetRect = targetElement.getBoundingClientRect();
      const deltaY = (targetRect.top - containerRect.top) - (container.clientHeight / 2) + (targetRect.height / 2);
      const deltaX = (targetRect.left - containerRect.left) - (container.clientWidth / 2) + (targetRect.width / 2);
      container.scrollTo({ top: container.scrollTop + deltaY, left: container.scrollLeft + deltaX, behavior: 'smooth' });
    }
    setTimeout(() => setAutoScrollComplete(true), 250);
  };

  useEffect(() => {
    const targetElement = document.querySelector(step.target);
    if (!targetElement) return;

    // Faster fallback
    const fallbackTimeout = setTimeout(() => {
      if (!isVisible) {
        setIsVisible(true);
        setPosition({ top: 100, left: 100 });
      }
    }, 1000);

    const waitForStepRef = () => {
      if (!stepRef.current) {
        // yield one frame instead of 100ms polling
        requestAnimationFrame(waitForStepRef);
        return;
      }

      scrollToTarget(targetElement);

      const updatePosition = () => {
        const target = document.querySelector(step.target);
        if (!target) return;

        const { top, left, position: stepPosition } = calculateOptimalPosition(target, stepRef.current);
        setPosition({ top, left });
        const arrowPos = calculateArrowPosition(stepPosition, target.getBoundingClientRect(), stepRef.current.getBoundingClientRect());
        setArrowPosition(arrowPos);
        const r = target.getBoundingClientRect();
        setSpotlightRect({ top: r.top, left: r.left, width: r.width, height: r.height });
        setIsVisible(true);
      };

      if (autoScrollComplete) updatePosition();
    };

    waitForStepRef();

    return () => clearTimeout(fallbackTimeout);
  }, [step.target, autoScrollComplete, isVisible]);

  // Keep aligned on resize/scroll
  useEffect(() => {
    const handleResize = () => {
      setViewport({ w: window.innerWidth, h: window.innerHeight });
      const targetElement = document.querySelector(step.target);
      if (targetElement && stepRef.current) {
        const { top, left, position: stepPosition } = calculateOptimalPosition(targetElement, stepRef.current);
        setPosition({ top, left });
        const arrowPos = calculateArrowPosition(stepPosition, targetElement.getBoundingClientRect(), stepRef.current.getBoundingClientRect());
        setArrowPosition(arrowPos);
        const r = targetElement.getBoundingClientRect();
        setSpotlightRect({ top: r.top, left: r.left, width: r.width, height: r.height });
      }
    };

    const container = scrollContainerRef.current || getScrollableAncestor(document.querySelector(step.target));
    scrollContainerRef.current = container;

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleResize, { passive: true });
    if (container && container !== window && container !== document.scrollingElement && container !== document.documentElement) {
      container.addEventListener('scroll', handleResize, { passive: true });
    }
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleResize);
      if (container && container !== window && container !== document.scrollingElement && container !== document.documentElement) {
        container.removeEventListener('scroll', handleResize);
      }
    };
  }, [step.target]);

  if (!isVisible) return null;

  // Curtain sizes
  const topHeight = Math.max(0, spotlightRect.top);
  const leftWidth = Math.max(0, spotlightRect.left);
  const rightWidth = Math.max(0, viewport.w - (spotlightRect.left + spotlightRect.width));
  const bottomHeight = Math.max(0, viewport.h - (spotlightRect.top + spotlightRect.height));

  return (
    <>
      <div className="fixed inset-0 z-[9996] pointer-events-none">
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: topHeight, background: 'rgba(0,0,0,0.6)' }} />
        <div style={{ position: 'fixed', top: spotlightRect.top, left: 0, width: leftWidth, height: spotlightRect.height, background: 'rgba(0,0,0,0.6)' }} />
        <div style={{ position: 'fixed', top: spotlightRect.top, left: spotlightRect.left + spotlightRect.width, width: rightWidth, height: spotlightRect.height, background: 'rgba(0,0,0,0.6)' }} />
        <div style={{ position: 'fixed', top: spotlightRect.top + spotlightRect.height, left: 0, width: '100vw', height: bottomHeight, background: 'rgba(0,0,0,0.6)' }} />
      </div>

      <motion.div
        ref={stepRef}
        className="fixed z-[9999] max-w-sm bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700"
        style={{ top: position.top, left: position.left, ...(isRTLMode && { direction: 'rtl' }) }}
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 10 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        {step.position !== 'overlay' && (
          <div className="absolute w-0 h-0" style={arrowPosition} />
        )}

        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">{currentStep}</div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{step.title[isRTLMode ? 'ar' : 'en']}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{t('tours.step')} {currentStep} {t('tours.of')} {totalSteps}</p>
              </div>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">{step.content[isRTLMode ? 'ar' : 'en']}</p>

          <div className="mb-4">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full transition-all duration-200" style={{ width: `${(currentStep / totalSteps) * 100}%` }} />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {!isFirstStep && (
                <button onClick={onPrevious} className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">{t('tours.previous')}</button>
              )}
              <button onClick={onSkip} className="px-4 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">{t('tours.skip')}</button>
            </div>
            <div className="flex gap-2">
              {isLastStep ? (
                <button onClick={onClose} className="px-6 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors">{t('tours.finish')}</button>
              ) : (
                <button onClick={onNext} className="px-6 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors">{t('tours.next')}</button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default TourStep; 