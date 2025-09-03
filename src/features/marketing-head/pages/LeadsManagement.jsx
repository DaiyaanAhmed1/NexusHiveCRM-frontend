import React from 'react';

export default function LeadsManagement() {
  return (
    <div
      className="flex flex-col items-center justify-center h-full min-h-[60vh] text-center"
      data-tour="1"
      data-tour-title-en="Leads Management"
      data-tour-title-ar="إدارة العملاء المحتملين"
      data-tour-content-en="Upload single or bulk leads and manage the pipeline."
      data-tour-content-ar="قم برفع عميل واحد أو عدة عملاء وأدر خط العملاء."
      data-tour-position="bottom"
    >
      <h1 className="text-3xl font-bold mb-4">Leads Management</h1>
      <div className="flex flex-col md:flex-row gap-4 justify-center mb-6" data-tour="2" data-tour-title-en="Lead Upload Actions" data-tour-title-ar="إجراءات رفع العملاء" data-tour-content-en="Use these actions to upload single or bulk leads." data-tour-content-ar="استخدم هذه الإجراءات لرفع عميل واحد أو عدة عملاء.">
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">Upload Single Lead</button>
        <button className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition">Bulk Lead Upload</button>
      </div>
      <p className="text-lg text-gray-500 dark:text-gray-400">Content coming soon!</p>
    </div>
  );
} 