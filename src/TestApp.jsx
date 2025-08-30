import React from 'react';
import { LocalizationProvider } from './hooks/useLocalization.jsx';
import TestI18n from './components/localization/TestI18n';
import './utils/i18n'; // Initialize i18n

function TestApp() {
  return (
    <LocalizationProvider>
      <TestI18n />
    </LocalizationProvider>
  );
}

export default TestApp; 