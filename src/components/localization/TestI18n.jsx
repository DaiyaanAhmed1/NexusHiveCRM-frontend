import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalization } from '../../hooks/useLocalization.jsx';
import { useRTL } from '../../hooks/useRTL';
import { debugRTLState } from '../../utils/rtl';
import LanguageSwitcher from './LanguageSwitcher';
import RTLWrapper from './RTLWrapper';
import LocalizedText from './LocalizedText';

const TestI18n = () => {
  const { t } = useTranslation(['common', 'navigation', 'dashboard']);
  const { currentLanguage, isRTLMode } = useLocalization();
  const { flexDirection, textAlign } = useRTL();

  const handleDebugRTL = () => {
    console.log('=== Manual RTL Debug ===');
    debugRTLState();
  };

  return (
    <RTLWrapper className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className={`flex ${flexDirection('row')} items-center justify-between mb-8`}>
          <div>
            <h1 className={`text-3xl font-bold text-gray-900 dark:text-white text-${textAlign('left')}`}>
              {t('dashboard.title')}
            </h1>
            <p className={`text-gray-600 dark:text-gray-300 mt-2 text-${textAlign('left')}`}>
              {t('dashboard.welcome')}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleDebugRTL}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Debug RTL State
            </button>
            <LanguageSwitcher />
          </div>
        </div>

        {/* Language Info */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">{t('language.currentLanguage')}</h2>
          <div className="space-y-2">
            <p><strong>Language:</strong> {currentLanguage}</p>
            <p><strong>RTL Mode:</strong> {isRTLMode ? 'Yes' : 'No'}</p>
            <p><strong>Direction:</strong> {isRTLMode ? 'rtl' : 'ltr'}</p>
            <p><strong>Document Dir:</strong> {document.documentElement?.dir || 'N/A'}</p>
            <p><strong>Body Classes:</strong> {document.body?.classList ? Array.from(document.body.classList).filter(cls => cls.includes('rtl') || cls.includes('ltr')).join(', ') || 'None' : 'N/A'}</p>
          </div>
        </div>

        {/* Test Translations */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Test Translations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Common Actions</h3>
              <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                <li>• {t('common.actions.add')}</li>
                <li>• {t('common.actions.edit')}</li>
                <li>• {t('common.actions.delete')}</li>
                <li>• {t('common.actions.save')}</li>
                <li>• {t('common.actions.cancel')}</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Navigation</h3>
              <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                <li>• {t('navigation.main.dashboard')}</li>
                <li>• {t('navigation.main.profile')}</li>
                <li>• {t('navigation.main.settings')}</li>
                <li>• {t('navigation.main.help')}</li>
                <li>• {t('navigation.main.logout')}</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Test LocalizedText Component */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">LocalizedText Component Test</h2>
          <div className="space-y-2">
            <LocalizedText 
              ns="common" 
              i18nKey="common.actions.search" 
              as="p" 
              className="text-blue-600"
            />
            <LocalizedText 
              ns="navigation" 
              i18nKey="navigation.sidebar.overview" 
              as="span" 
              className="bg-blue-100 px-2 py-1 rounded text-blue-800"
            />
            <LocalizedText 
              ns="dashboard" 
              i18nKey="dashboard.stats" 
              as="h3" 
              className="text-lg font-medium"
            />
          </div>
        </div>

        {/* RTL Layout Test */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">RTL Layout Test</h2>
          <div className={`flex ${flexDirection('row')} items-center space-x-4 mb-4`}>
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold">1</div>
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold">2</div>
            <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center text-white font-bold">3</div>
          </div>
          <p className={`text-gray-600 dark:text-gray-300 text-${textAlign('left')}`}>
            This layout should automatically reverse when Arabic is selected. The boxes above should flow from right to left in RTL mode.
          </p>
        </div>

        {/* RTL Scrollbar Test */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">RTL Scrollbar Test</h2>
          <div className="space-y-4">
            <div className="h-32 overflow-auto border border-gray-300 rounded p-4 bg-gray-50 dark:bg-gray-700">
              <div className="space-y-2">
                <p className="text-sm">This is a scrollable container to test RTL scrollbar behavior.</p>
                <p className="text-sm">In Arabic mode, the scrollbar should appear on the left side.</p>
                <p className="text-sm">In English mode, the scrollbar should appear on the right side.</p>
                <p className="text-sm">Scroll down to see more content...</p>
                <p className="text-sm">Line 5: Testing scrollbar positioning</p>
                <p className="text-sm">Line 6: More content to scroll</p>
                <p className="text-sm">Line 7: Even more content</p>
                <p className="text-sm">Line 8: Almost there</p>
                <p className="text-sm">Line 9: Final line</p>
                <p className="text-sm">Line 10: End of scrollable content</p>
              </div>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <p><strong>Current Scrollbar Position:</strong> {isRTLMode ? 'Left (RTL)' : 'Right (LTR)'}</p>
              <p><strong>Scrollbar Direction:</strong> {document.documentElement?.style.direction || document.documentElement?.dir || 'ltr'}</p>
            </div>
          </div>
        </div>
      </div>
    </RTLWrapper>
  );
};

export default TestI18n; 