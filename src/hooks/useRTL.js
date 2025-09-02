import React from 'react';
import { useLocalization } from './useLocalization.jsx';
import { 
  getFlexDirection, 
  getTextAlign, 
  getMarginDirection, 
  getPaddingDirection, 
  getBorderRadius,
  getIconPosition,
  getFloatDirection,
  getTransformDirection,
  forceRTLScrollbar,
  setLTRScrollbar,
  cleanupRTLStyling
} from '../utils/rtl';

export const useRTL = () => {
  const { isRTLMode, currentLanguage } = useLocalization();

  // Apply RTL scrollbar when RTL mode is active, clean up when not
  React.useEffect(() => {
    if (isRTLMode) {
      forceRTLScrollbar();
    } else {
      // Set LTR scrollbar when switching to LTR
      setLTRScrollbar();
      console.log('LTR scrollbar applied');
    }
  }, [isRTLMode]);

  return {
    isRTL: isRTLMode,
    language: currentLanguage,
    flexDirection: (defaultDirection = 'row') => getFlexDirection(currentLanguage, defaultDirection),
    textAlign: (defaultAlign = 'left') => getTextAlign(currentLanguage, defaultAlign),
    margin: (leftValue, rightValue) => getMarginDirection(currentLanguage, leftValue, rightValue),
    padding: (leftValue, rightValue) => getPaddingDirection(currentLanguage, leftValue, rightValue),
    borderRadius: (leftRadius, rightRadius) => getBorderRadius(currentLanguage, leftRadius, rightRadius),
    iconPosition: (leftClass, rightClass) => getIconPosition(currentLanguage, leftClass, rightClass),
    float: (leftValue = 'left', rightValue = 'right') => getFloatDirection(currentLanguage, leftValue, rightValue),
    transform: (leftValue = 'translateX(-100%)', rightValue = 'translateX(100%)') => getTransformDirection(currentLanguage, leftValue, rightValue),
    className: (baseClass, rtlClass, ltrClass) => isRTLMode ? `${baseClass} ${rtlClass}` : `${baseClass} ${ltrClass}`,
    direction: isRTLMode ? 'rtl' : 'ltr',
  };
}; 