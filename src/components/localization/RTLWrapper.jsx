import React from 'react';
import { useLocalization } from '../../hooks/useLocalization.jsx';

const RTLWrapper = ({ children, className = '' }) => {
  const { isRTLMode, textDirection } = useLocalization();

  return (
    <div 
      className={`${className} ${isRTLMode ? 'rtl-layout' : 'ltr-layout'}`}
      dir={textDirection}
      lang={isRTLMode ? 'ar' : 'en'}
    >
      {children}
    </div>
  );
};

export default RTLWrapper; 