import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalization } from "../../../hooks/useLocalization";
import { FiSearch, FiFilter, FiUser, FiMail, FiPhone, FiFileText, FiCheckCircle, FiXCircle, FiZap, FiSave, FiShare2, FiDownload, FiTag, FiUsers, FiChevronDown, FiChevronUp, FiEdit2, FiTrash2, FiPlus, FiSettings, FiEye, FiEyeOff, FiList, FiCalendar, FiAlertCircle, FiStar, FiArrowRight } from 'react-icons/fi';

// Mock data for suggestions, filters, and roles
const mockRecentSearches = [
  'Abdullah Al-Rashid',
  'APP-001',
  'payment due',
  'Noura Al-Zahra',
  'Pending Docs',
  'EWS applicants',
];
const mockDeepLinks = [
  { label: 'Applicant: Abdullah Al-Rashid', type: 'profile', id: 'A001' },
  { label: 'Invoice: INV-2024-001', type: 'payment', id: 'INV-2024-001' },
  { label: 'Doc: id_a001.pdf', type: 'document', id: 'id_a001.pdf' },
  { label: 'Call Log: Noura Al-Zahra', type: 'communication', id: 'A002' },
];
const mockSavedViews = [
  { name: 'All Verified Applicants', desc: 'Applicants with all docs verified', filters: { status: 'Verified' }, shared: true, default: true },
  { name: 'Pending Payments', desc: 'Applicants with pending fees', filters: { payment: 'Pending' }, shared: false },
];
const mockRole = 'admission_head';
const mockFilterFields = [
  // ... see full implementation for all filter fields ...
];

// --- Mock Data ---
const mockResults = [
  {
    id: 'A001',
    name: 'Abdullah Al-Rashid',
    email: 'abdullah.rashid@email.com',
    phone: '+966 50 123 4567',
    status: 'Verified',
    program: 'Engineering',
    tags: ['Scholarship', 'EWS'],
    assigned: 'Noura Al-Zahra',
    lastFollowUp: '2024-06-10',
    score: 92,
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    id: 'A002',
    name: 'Layla Al-Mansour',
    email: 'layla.mansour@email.com',
    phone: '+966 50 234 5678',
    status: 'Pending',
    program: 'Business',
    tags: ['International'],
    assigned: 'Khalid Al-Sayed',
    lastFollowUp: '2024-06-09',
    score: 78,
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
  },
  {
    id: 'A003',
    name: 'Omar Al-Mutairi',
    email: 'omar.mutairi@email.com',
    phone: '+966 50 345 6789',
    status: 'Rejected',
    program: 'Arts',
    tags: ['Sports Quota'],
    assigned: 'Aisha Al-Hassan',
    lastFollowUp: '2024-06-08',
    score: 60,
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
  },
  {
    id: 'A004',
    name: 'Aisha Al-Hassan',
    email: 'aisha.hassan@email.com',
    phone: '+966 50 456 7890',
    status: 'Verified',
    program: 'Medical Sciences',
    tags: ['Scholarship'],
    assigned: 'Fatima Al-Rashid',
    lastFollowUp: '2024-06-07',
    score: 88,
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
  },
  {
    id: 'A005',
    name: 'Yousef Al-Harbi',
    email: 'yousef.harbi@email.com',
    phone: '+966 50 567 8901',
    status: 'Pending',
    program: 'Law',
    tags: ['EWS', 'Special Category'],
    assigned: 'Noura Al-Zahra',
    lastFollowUp: '2024-06-06',
    score: 74,
    avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
  },
  {
    id: 'A006',
    name: 'Maha Al-Shehri',
    email: 'maha.shehri@email.com',
    phone: '+966 50 678 9012',
    status: 'Verified',
    program: 'Computer Science',
    tags: ['International', 'Scholarship'],
    assigned: 'Khalid Al-Sayed',
    lastFollowUp: '2024-06-05',
    score: 95,
    avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
  },
  {
    id: 'A007',
    name: 'Sami Al-Shammari',
    email: 'sami.shammari@email.com',
    phone: '+966 50 789 0123',
    status: 'Pending',
    program: 'Engineering',
    tags: ['Transfer'],
    assigned: 'Aisha Al-Hassan',
    lastFollowUp: '2024-06-04',
    score: 81,
    avatar: 'https://randomuser.me/api/portraits/men/7.jpg',
  },
  {
    id: 'A008',
    name: 'Fatima Al-Rashid',
    email: 'fatima.rashid@email.com',
    phone: '+966 50 890 1234',
    status: 'Verified',
    program: 'Business',
    tags: ['Scholarship', 'Sports Quota'],
    assigned: 'Fatima Al-Rashid',
    lastFollowUp: '2024-06-03',
    score: 90,
    avatar: 'https://randomuser.me/api/portraits/women/8.jpg',
  },
  {
    id: 'A009',
    name: 'Bader Al-Farhan',
    email: 'bader.farhan@email.com',
    phone: '+966 50 901 2345',
    status: 'Rejected',
    program: 'Arts',
    tags: ['Special Category'],
    assigned: 'Noura Al-Zahra',
    lastFollowUp: '2024-06-02',
    score: 55,
    avatar: 'https://randomuser.me/api/portraits/men/9.jpg',
  },
  {
    id: 'A010',
    name: 'Huda Al-Mutlaq',
    email: 'huda.mutlaq@email.com',
    phone: '+966 50 012 3456',
    status: 'Pending',
    program: 'Medical Sciences',
    tags: ['International'],
    assigned: 'Khalid Al-Sayed',
    lastFollowUp: '2024-06-01',
    score: 77,
    avatar: 'https://randomuser.me/api/portraits/women/10.jpg',
  },
];

function StatusChip({ status }) {
  const color =
    status === 'Verified'
      ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
      : status === 'Pending'
      ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400'
      : status === 'Rejected'
      ? 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'
      : 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400';
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${color}`}>{status}</span>
  );
}

function ResultsTable({ results, onRowClick, selected, setSelected }) {
  return (
    <div className="overflow-x-auto rounded-xl shadow-lg bg-white dark:bg-gray-800 mb-8 border border-gray-200 dark:border-gray-700">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="bg-gray-50 dark:bg-gray-700">
            <th className="px-4 py-3 text-left">
              <input 
                type="checkbox" 
                checked={selected.length === results.length} 
                onChange={e => setSelected(e.target.checked ? results.map(r => r.id) : [])} 
                className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
              />
            </th>
            <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">Applicant</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">Program</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">Status</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">Tags</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">Assigned</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">Score</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">Actions</th>
          </tr>
        </thead>
        <tbody>
          {results.map(r => (
            <tr key={r.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-3">
                <input 
                  type="checkbox" 
                  checked={selected.includes(r.id)} 
                  onChange={e => setSelected(e.target.checked ? [...selected, r.id] : selected.filter(id => id !== r.id))} 
                  className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                />
              </td>
              <td className="px-4 py-3 flex items-center gap-3 cursor-pointer" onClick={() => onRowClick(r)}>
                <img src={r.avatar} alt={r.name} className="w-8 h-8 rounded-full border-2 border-gray-200 dark:border-gray-600" />
                <div>
                  <span className="font-semibold text-gray-900 dark:text-white">{r.name}</span>
                  <div className="text-xs text-gray-500 dark:text-gray-400">({r.id})</div>
                </div>
              </td>
              <td className="px-4 py-3 text-gray-900 dark:text-white">{r.program}</td>
              <td className="px-4 py-3"><StatusChip status={r.status} /></td>
              <td className="px-4 py-3">
                <div className="flex flex-wrap gap-1">
                  {r.tags.map(t => (
                    <span key={t} className="bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 px-2 py-0.5 rounded-full text-xs">
                      {t}
                    </span>
                  ))}
                </div>
              </td>
              <td className="px-4 py-3 text-gray-900 dark:text-white">{r.assigned}</td>
              <td className="px-4 py-3 text-gray-900 dark:text-white">{r.score}</td>
              <td className="px-4 py-3">
                <div className="flex gap-2">
                  <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-xs font-medium" onClick={e => { e.stopPropagation(); onRowClick(r); }}>View</button>
                  <button className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 text-xs font-medium">Communicate</button>
                  <button className="text-yellow-600 hover:text-yellow-800 dark:text-yellow-400 dark:hover:text-yellow-300 text-xs font-medium">Tag</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ProfileDrawer({ open, onClose, profile }) {
  if (!open || !profile) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-l-2xl shadow-2xl p-6 w-full max-w-md h-full overflow-y-auto relative border-l border-gray-200 dark:border-gray-700">
        <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" onClick={onClose}>
          <FiXCircle className="w-6 h-6" />
        </button>
        <div className="flex flex-col items-center gap-3 mb-6">
          <img src={profile.avatar} alt={profile.name} className="w-20 h-20 rounded-full border-4 border-blue-200 dark:border-blue-800" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">{profile.name}</h2>
          <span className="text-xs text-gray-500 dark:text-gray-400">{profile.id}</span>
          <StatusChip status={profile.status} />
        </div>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="font-semibold text-gray-700 dark:text-gray-300">Email:</span>
            <span className="text-gray-900 dark:text-white">{profile.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-700 dark:text-gray-300">Phone:</span>
            <span className="text-gray-900 dark:text-white">{profile.phone}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-700 dark:text-gray-300">Program:</span>
            <span className="text-gray-900 dark:text-white">{profile.program}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-700 dark:text-gray-300">Tags:</span>
            <div className="flex flex-wrap gap-1">
              {profile.tags.map(t => (
                <span key={t} className="bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 px-2 py-0.5 rounded-full text-xs">
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-700 dark:text-gray-300">Assigned:</span>
            <span className="text-gray-900 dark:text-white">{profile.assigned}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-700 dark:text-gray-300">Last Follow-Up:</span>
            <span className="text-gray-900 dark:text-white">{profile.lastFollowUp}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-700 dark:text-gray-300">Score:</span>
            <span className="text-gray-900 dark:text-white">{profile.score}</span>
          </div>
        </div>
        <div className="flex gap-2 mt-6">
          <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            <FiMail className="inline mr-2" />
            Send Email
          </button>
          <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors">
            <FiPhone className="inline mr-2" />
            Schedule Call
          </button>
        </div>
      </div>
      <div className="flex-1" onClick={onClose}></div>
    </div>
  );
}

// 1. Bulk Action Bar
function BulkActionBar({ selected, onAction }) {
  if (!selected.length) return null;
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-gray-800 shadow-lg border-t border-gray-200 dark:border-gray-700 flex gap-2 p-4 justify-center">
      <button className="px-3 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors" onClick={() => onAction('assign')}>
        <FiUsers className="inline mr-1" />
        Bulk Assign
      </button>
      <button className="px-3 py-2 bg-yellow-600 text-white rounded-lg font-semibold hover:bg-yellow-700 transition-colors" onClick={() => onAction('tag')}>
        <FiTag className="inline mr-1" />
        Bulk Tag
      </button>
      <button className="px-3 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors" onClick={() => onAction('export')}>
        <FiDownload className="inline mr-1" />
        Export
      </button>
      <button className="px-3 py-2 bg-pink-600 text-white rounded-lg font-semibold hover:bg-pink-700 transition-colors" onClick={() => onAction('communicate')}>
        <FiMail className="inline mr-1" />
        Bulk Communicate
      </button>
      <button className="px-3 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors" onClick={() => onAction('schedule')}>
        <FiCalendar className="inline mr-1" />
        Bulk Schedule
      </button>
      <button className="px-3 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors" onClick={() => onAction('delete')}>
        <FiTrash2 className="inline mr-1" />
        Delete
      </button>
      <span className="ml-4 text-gray-500 dark:text-gray-300 font-medium">{selected.length} selected</span>
    </div>
  );
}

export default function SearchFilters() {
  const { t } = useTranslation(['admission', 'common']);
  const { isRTL } = useLocalization();
  
  // State
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [recent, setRecent] = useState(mockRecentSearches);
  const [deepLinks, setDeepLinks] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filters, setFilters] = useState({});
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [savedViews, setSavedViews] = useState(mockSavedViews);
  const [bulkEnabled, setBulkEnabled] = useState(false);
  const [selected, setSelected] = useState([]);
  const [aiSuggestions, setAISuggestions] = useState([
    'Likely to Convert',
    'At Risk of Drop-off',
    'Incomplete Applications with High Potential',
    'Students from High-Converting Regions',
    'Duplicate Leads',
    'Overlapping Payment Receipts',
    'Missing Contact Information',
  ]);
  const [quickFilters, setQuickFilters] = useState([
    'My Applicants', 'Recent Leads', 'Urgent Payments', 'Pending Docs'
  ]);
  const [role, setRole] = useState(mockRole);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [toast, setToast] = useState(null);
  const [results, setResults] = useState(mockResults);
  const [profileDrawer, setProfileDrawer] = useState({ open: false, profile: null });
  const [bulkAction, setBulkAction] = useState(null);

  // Smart suggestions and intent
  useEffect(() => {
    if (search.length > 1) {
      setSuggestions(mockRecentSearches.filter(s => s.toLowerCase().includes(search.toLowerCase())));
      setDeepLinks(mockDeepLinks.filter(d => d.label.toLowerCase().includes(search.toLowerCase())));
    } else {
      setSuggestions([]);
      setDeepLinks([]);
    }
  }, [search]);

  // Toast
  useEffect(() => { if (toast) { const t = setTimeout(() => setToast(null), 2000); return () => clearTimeout(t); } }, [toast]);

  // Handlers
  const handleSearch = (q) => {
    setSearch(q);
    setShowSuggestions(false);
    setRecent([q, ...recent.filter(r => r !== q)].slice(0, 6));
    setToast('Search executed!');
  };
  const handleSaveView = () => {
    setSavedViews([...savedViews, { name: search || 'New View', desc: 'Custom filter', filters, shared: false }]);
    setToast('View saved!');
  };
  const handleBulkAction = (action) => {
    setBulkAction(action);
    setToast(`Bulk action: ${action}`);
  };

  // UI
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900" 
         data-tour="1" 
         data-tour-title-en="Advanced Search Overview" 
         data-tour-title-ar="نظرة عامة على البحث المتقدم" 
         data-tour-content-en="Header, smart search, advanced filters, saved views, AI filters, access, results, and bulk actions." 
         data-tour-content-ar="الرأس، البحث الذكي، المرشحات المتقدمة، العروض المحفوظة، مرشحات الذكاء، الوصول، النتائج والإجراءات الجماعية.">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8" 
             data-tour="2" 
             data-tour-title-en="Header" 
             data-tour-title-ar="الرأس" 
             data-tour-content-en="Page title and description of advanced search." 
             data-tour-content-ar="عنوان الصفحة ووصف البحث المتقدم.">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-8 text-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <FiSearch className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold">
                {t('searchFilters.title')}
              </h1>
            </div>
            <p className="text-indigo-100 text-lg">
              {t('searchFilters.subtitle')}
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Search Bar */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700" 
               data-tour="3" 
               data-tour-title-en="Smart Search" 
               data-tour-title-ar="بحث ذكي" 
               data-tour-content-en="Search with suggestions and deep links." 
               data-tour-content-ar="بحث مع اقتراحات وروابط مباشرة.">
            <div className="relative">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t('searchFilters.search.placeholder')}
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <FiXCircle size={20} />
                </button>
              )}
            </div>
          </div>

          {/* Quick Filters (Mobile) */}
          <div className="md:hidden flex flex-wrap gap-2" 
               data-tour="4" 
               data-tour-title-en="Quick Filters" 
               data-tour-title-ar="مرشحات سريعة" 
               data-tour-content-en="One-tap filters for mobile." 
               data-tour-content-ar="مرشحات بلمسة واحدة للجوال.">
            {quickFilters.map((q, i) => (
              <button 
                key={i} 
                className="bg-indigo-100 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-400 px-3 py-1 rounded-full text-xs font-semibold hover:bg-indigo-200 dark:hover:bg-indigo-900/30 transition-colors" 
                onClick={() => handleSearch(q)}
              >
                {q}
              </button>
            ))}
            <button 
              className="bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-xs font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors" 
              onClick={() => setShowMobileFilters(v => !v)}
            >
              <FiFilter className="inline mr-1" />
              {t('searchFilters.filters.mobile')}
            </button>
          </div>

          {/* Advanced Filter Builder Panel */}
          <div className="flex gap-4" 
               data-tour="5" 
               data-tour-title-en="Advanced Filters" 
               data-tour-title-ar="مرشحات متقدمة" 
               data-tour-content-en="Open the builder to combine multiple criteria." 
               data-tour-content-ar="افتح المُنشئ لدمج معايير متعددة.">
            <button 
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center gap-2" 
              onClick={() => setShowFilterPanel(true)}
            >
              <FiFilter className="w-4 h-4" />
              {t('searchFilters.filters.advanced')}
            </button>
            <button 
              className="px-4 py-2 bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors flex items-center gap-2" 
              onClick={() => setBulkEnabled(!bulkEnabled)}
            >
              <FiUsers className="w-4 h-4" />
              {bulkEnabled ? 'Disable Bulk' : 'Enable Bulk'}
            </button>
          </div>

          {/* Filter Panel Modal */}
          {(showFilterPanel || showMobileFilters) && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 w-full max-w-2xl relative border border-gray-200 dark:border-gray-700">
                <button 
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" 
                  onClick={() => { setShowFilterPanel(false); setShowMobileFilters(false); }}
                >
                  <FiXCircle className="w-6 h-6" />
                </button>
                <h2 className="text-lg font-bold mb-4 text-gray-800 dark:text-gray-100 flex items-center gap-2">
                  <FiFilter className="w-5 h-5" />
                  {t('searchFilters.filters.advanced')}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input 
                    className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
                    placeholder={t('searchFilters.filters.applicationId')} 
                  />
                  <input 
                    className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
                    placeholder={t('searchFilters.filters.name')} 
                  />
                  <input 
                    className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
                    placeholder={t('searchFilters.filters.email')} 
                  />
                  <input 
                    className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
                    placeholder={t('searchFilters.filters.phone')} 
                  />
                  <select className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                    <option>{t('searchFilters.filters.allStatus')}</option>
                  </select>
                  <select className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                    <option>{t('searchFilters.filters.allPrograms')}</option>
                  </select>
                  <input 
                    className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
                    placeholder={t('searchFilters.filters.tags')} 
                  />
                  <input 
                    className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
                    placeholder={t('searchFilters.filters.counselor')} 
                  />
                </div>
                <div className="flex gap-2 mt-6">
                  <button 
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors" 
                    onClick={() => { setShowFilterPanel(false); setShowMobileFilters(false); setToast(t('searchFilters.filters.apply')); }}
                  >
                    {t('searchFilters.filters.apply')}
                  </button>
                  <button 
                    className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors" 
                    onClick={() => { setShowFilterPanel(false); setShowMobileFilters(false); }}
                  >
                    {t('searchFilters.filters.cancel')}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Saved Views */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700" 
               data-tour="7" 
               data-tour-title-en="Saved Views" 
               data-tour-title-ar="العروض المحفوظة" 
               data-tour-content-en="Reuse, share, or set default views." 
               data-tour-content-ar="أعد الاستخدام أو شارك أو اجعل العرض افتراضياً.">
            <div className="flex items-center gap-2 mb-4">
              <FiSave className="text-green-500 w-5 h-5" />
              <span className="font-semibold text-gray-700 dark:text-gray-200">{t('searchFilters.savedViews.title')}</span>
              <button 
                className="ml-auto px-3 py-1 bg-indigo-100 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-400 rounded-lg text-xs font-semibold hover:bg-indigo-200 dark:hover:bg-indigo-900/30 transition-colors" 
                onClick={handleSaveView}
              >
                <FiPlus className="inline mr-1" />
                {t('searchFilters.savedViews.saveCurrent')}
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {savedViews.map((v, i) => (
                <div key={i} className="bg-gray-50 dark:bg-gray-700 rounded-lg px-3 py-2 flex items-center gap-2">
                  <span className="font-semibold text-indigo-700 dark:text-indigo-300">{v.name}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{v.desc}</span>
                  {v.default && <span className="bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400 px-2 py-0.5 rounded-full text-xs">{t('searchFilters.savedViews.default')}</span>}
                  {v.shared && <FiShare2 className="text-indigo-400 w-4 h-4" />}
                  <button 
                    className="text-xs text-gray-400 hover:text-red-500 transition-colors" 
                    onClick={() => setSavedViews(savedViews.filter((_, idx) => idx !== i))}
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* AI Filters */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700" 
               data-tour="8" 
               data-tour-title-en="AI Filters" 
               data-tour-title-ar="مرشحات الذكاء" 
               data-tour-content-en="AI-based segments to search faster." 
               data-tour-content-ar="شرائح معتمدة على الذكاء للبحث أسرع.">
            <div className="flex items-center gap-2 mb-4">
              <FiZap className="text-pink-500 animate-pulse w-5 h-5" />
              <span className="font-semibold text-gray-700 dark:text-gray-200">{t('searchFilters.aiFilters.title')}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {aiSuggestions.map((a, i) => (
                <button 
                  key={i} 
                  className="bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400 px-3 py-1 rounded-full text-xs font-semibold hover:bg-yellow-200 dark:hover:bg-yellow-900/30 transition-colors" 
                  onClick={() => handleSearch(a)}
                >
                  <FiZap className="inline mr-1" />
                  {a}
                </button>
              ))}
            </div>
          </div>

          {/* Access Control */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700" 
               data-tour="9" 
               data-tour-title-en="Access & Control" 
               data-tour-title-ar="الوصول والتحكم" 
               data-tour-content-en="Role-based defaults and access hints." 
               data-tour-content-ar="افتراضات حسب الدور ونصائح الوصول.">
            <div className="flex items-center gap-2 mb-4">
              <FiSettings className="text-blue-500 w-5 h-5" />
              <span className="font-semibold text-gray-700 dark:text-gray-200">{t('searchFilters.accessControl.title')}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 px-2 py-0.5 rounded-full text-xs">
                {t('searchFilters.accessControl.role')}: {role}
              </span>
              <span className="bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400 px-2 py-0.5 rounded-full text-xs">
                {t('searchFilters.accessControl.admin')}
              </span>
              <span className="bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400 px-2 py-0.5 rounded-full text-xs">
                {t('searchFilters.accessControl.counselor')}
              </span>
            </div>
          </div>

          {/* Results */}
          <div data-tour="10" 
               data-tour-title-en="Results" 
               data-tour-title-ar="النتائج" 
               data-tour-content-en="Interactive results with profile preview." 
               data-tour-content-ar="نتائج تفاعلية مع معاينة الملف.">
            <ResultsTable
              results={results}
              onRowClick={profile => setProfileDrawer({ open: true, profile })}
              selected={selected}
              setSelected={setSelected}
            />
          </div>
        </div>

        {/* Profile Drawer */}
        <ProfileDrawer
          open={profileDrawer.open}
          onClose={() => setProfileDrawer({ open: false, profile: null })}
          profile={profileDrawer.profile}
        />

        {/* Bulk Action Bar */}
        <BulkActionBar selected={selected} onAction={handleBulkAction} />

        {/* Toast */}
        {toast && (
          <div className="fixed bottom-6 right-6 bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in">
            {toast}
          </div>
        )}
      </div>
    </div>
  );
}