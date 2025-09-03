import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../../components/Sidebar';
import { admissionHeadFeatures } from '../components/admissionHeadFeatures';
import { useTranslation } from 'react-i18next';
import { TourProvider, TourOverlay } from '../../../components/tours';

export default function AdmissionHeadLayout() {
  const user = JSON.parse(localStorage.getItem('rbac_current_user'));
  const { t } = useTranslation();
  
  return (
    <TourProvider>
      <div className="flex h-screen bg-[#F6F7FA] dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800">
        <Sidebar features={admissionHeadFeatures} userLabel={user?.displayName || t('roles.admissionHead')} />
        <main className="flex-1 overflow-y-auto">
          <div className="p-6 md:p-8 lg:p-10 flex flex-col gap-6">
            <Outlet />
          </div>
        </main>
        <TourOverlay />
      </div>
    </TourProvider>
  );
} 