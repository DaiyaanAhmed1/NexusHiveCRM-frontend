import React from 'react';
import { useTranslation } from 'react-i18next';

const LocalizedText = ({ 
  ns = 'common', 
  i18nKey, 
  values = {}, 
  fallback = '', 
  className = '',
  as: Component = 'span',
  ...props 
}) => {
  const { t } = useTranslation(ns);
  
  const text = t(i18nKey, values);
  
  if (!text || text === i18nKey) {
    return fallback ? <Component className={className} {...props}>{fallback}</Component> : null;
  }
  
  return (
    <Component className={className} {...props}>
      {text}
    </Component>
  );
};

export default LocalizedText; 