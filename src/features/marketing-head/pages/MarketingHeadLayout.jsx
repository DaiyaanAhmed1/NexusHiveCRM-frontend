import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { marketingHeadFeatures } from '../../../components/marketingHeadFeatures';

export default function MarketingHeadLayout() {
  const [expanded, setExpanded] = useState(false);
  const user = JSON.parse(localStorage.getItem('rbac_current_user'));
  
  return (
    <div className="flex h-screen bg-[#F6F7FA] dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800">
      <Sidebar 
        features={marketingHeadFeatures} 
        userLabel={user?.displayName || user?.role || "Marketing Head"} 
        expanded={expanded}
        setExpanded={setExpanded}
      />
      <main className="flex-1 overflow-y-auto">
        <div className="p-6 md:p-8 lg:p-10 flex flex-col gap-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
} 