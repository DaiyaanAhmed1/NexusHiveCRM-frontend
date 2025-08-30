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