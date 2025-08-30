import { useLocalization } from './useLocalization.jsx';
import { 
  getFlexDirection, 
  getTextAlign, 
  getMarginDirection, 
  getPaddingDirection, 
  getBorderRadius,
  getIconPosition,
  getFloatDirection,
  getTransformDirection
} from '../utils/rtl';

export const useRTL = () => {
  const { isRTL, currentLanguage } = useLocalization();

  return {
    isRTL,
    language: currentLanguage,
    flexDirection: (defaultDirection = 'row') => getFlexDirection(currentLanguage, defaultDirection),
    textAlign: (defaultAlign = 'left') => getTextAlign(currentLanguage, defaultAlign),
    margin: (leftValue, rightValue) => getMarginDirection(currentLanguage, leftValue, rightValue),
    padding: (leftValue, rightValue) => getPaddingDirection(currentLanguage, leftValue, rightValue),
    borderRadius: (leftRadius, rightRadius) => getBorderRadius(currentLanguage, leftRadius, rightRadius),
    iconPosition: (leftClass, rightClass) => getIconPosition(currentLanguage, leftClass, rightClass),
    float: (leftValue = 'left', rightValue = 'right') => getFloatDirection(currentLanguage, leftValue, rightValue),
    transform: (leftValue = 'translateX(-100%)', rightValue = 'translateX(100%)') => getTransformDirection(currentLanguage, leftValue, rightValue),
    className: (baseClass, rtlClass, ltrClass) => isRTL ? `${baseClass} ${rtlClass}` : `${baseClass} ${ltrClass}`,
    direction: isRTL ? 'rtl' : 'ltr',
  };
}; 