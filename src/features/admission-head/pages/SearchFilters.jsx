import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
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
      ? 'bg-green-100 text-green-700'
      : status === 'Pending'
      ? 'bg-yellow-100 text-yellow-700'
      : status === 'Rejected'
      ? 'bg-red-100 text-red-700'
      : 'bg-blue-100 text-blue-700';
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${color}`}>{status}</span>
  );
}

function ResultsTable({ results, onRowClick, selected, setSelected }) {
  return (
    <div className="overflow-x-auto rounded-2xl shadow-xl bg-white/90 dark:bg-gray-800/90 mb-8">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-700">
            <th className="px-4 py-2"><input type="checkbox" checked={selected.length === results.length} onChange={e => setSelected(e.target.checked ? results.map(r => r.id) : [])} /></th>
            <th className="px-4 py-2 text-left">Applicant</th>
            <th className="px-4 py-2 text-left">Program</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Tags</th>
            <th className="px-4 py-2 text-left">Assigned</th>
            <th className="px-4 py-2 text-left">Score</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {results.map(r => (
            <tr key={r.id} className="hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
              <td className="px-4 py-2">
                <input type="checkbox" checked={selected.includes(r.id)} onChange={e => setSelected(e.target.checked ? [...selected, r.id] : selected.filter(id => id !== r.id))} />
              </td>
              <td className="px-4 py-2 flex items-center gap-2 cursor-pointer" onClick={() => onRowClick(r)}>
                <img src={r.avatar} alt={r.name} className="w-7 h-7 rounded-full border" />
                <span className="font-semibold">{r.name}</span>
                <span className="text-xs text-gray-400">({r.id})</span>
              </td>
              <td className="px-4 py-2">{r.program}</td>
              <td className="px-4 py-2"><StatusChip status={r.status} /></td>
              <td className="px-4 py-2">{r.tags.map(t => <span key={t} className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs mr-1">{t}</span>)}</td>
              <td className="px-4 py-2">{r.assigned}</td>
              <td className="px-4 py-2">{r.score}</td>
              <td className="px-4 py-2 flex gap-2">
                <button className="text-blue-600 hover:underline text-xs" onClick={e => { e.stopPropagation(); onRowClick(r); }}>View</button>
                <button className="text-green-600 hover:underline text-xs">Communicate</button>
                <button className="text-yellow-600 hover:underline text-xs">Tag</button>
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
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/30 animate-fade-in">
      <div className="bg-white dark:bg-gray-900 rounded-l-2xl shadow-xl p-6 w-full max-w-md h-full overflow-y-auto relative">
        <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700" onClick={onClose}>&times;</button>
        <div className="flex flex-col items-center gap-2 mb-4">
          <img src={profile.avatar} alt={profile.name} className="w-20 h-20 rounded-full border-4 border-blue-200" />
          <h2 className="text-xl font-bold">{profile.name}</h2>
          <span className="text-xs text-gray-400">{profile.id}</span>
          <StatusChip status={profile.status} />
        </div>
        <div className="mb-2"><b>Email:</b> {profile.email}</div>
        <div className="mb-2"><b>Phone:</b> {profile.phone}</div>
        <div className="mb-2"><b>Program:</b> {profile.program}</div>
        <div className="mb-2"><b>Tags:</b> {profile.tags.map(t => <span key={t} className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs mr-1">{t}</span>)}</div>
        <div className="mb-2"><b>Assigned:</b> {profile.assigned}</div>
        <div className="mb-2"><b>Last Follow-Up:</b> {profile.lastFollowUp}</div>
        <div className="mb-2"><b>Score:</b> {profile.score}</div>
        <div className="flex gap-2 mt-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold">Send Email</button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold">Schedule Call</button>
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
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-gray-900 shadow-lg flex gap-2 p-4 justify-center animate-fade-in">
      <button className="px-3 py-2 bg-blue-600 text-white rounded-lg font-semibold" onClick={() => onAction('assign')}>Bulk Assign</button>
      <button className="px-3 py-2 bg-yellow-600 text-white rounded-lg font-semibold" onClick={() => onAction('tag')}>Bulk Tag</button>
      <button className="px-3 py-2 bg-green-600 text-white rounded-lg font-semibold" onClick={() => onAction('export')}>Export</button>
      <button className="px-3 py-2 bg-pink-600 text-white rounded-lg font-semibold" onClick={() => onAction('communicate')}>Bulk Communicate</button>
      <button className="px-3 py-2 bg-purple-600 text-white rounded-lg font-semibold" onClick={() => onAction('schedule')}>Bulk Schedule</button>
      <button className="px-3 py-2 bg-red-600 text-white rounded-lg font-semibold" onClick={() => onAction('delete')}>Delete</button>
      <span className="ml-4 text-gray-500 dark:text-gray-300">{selected.length} selected</span>
    </div>
  );
}

export default function SearchFilters() {
  const { t } = useTranslation(['admission', 'common']);
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 dark:from-gray-900 dark:to-gray-950 p-0 animate-fade-in">
      {/* Hero Header */}
      <div className="w-full bg-gradient-to-r from-blue-600 to-purple-500 py-10 px-6 md:px-12 flex flex-col md:flex-row items-center gap-6 mb-10 rounded-b-3xl shadow-lg animate-fade-in">
        <div className="flex items-center gap-4">
          <div className="bg-white/20 rounded-full p-4"><FiSearch className="text-white" size={40} /></div>
          <div>
            <h1 className="text-4xl font-extrabold text-white mb-2 tracking-tight">{t('searchFilters.title')}</h1>
            <p className="text-white/90 text-lg max-w-xl">{t('searchFilters.subtitle')}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        {/* Search Bar */}
        <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl p-6 mb-8">
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t('searchFilters.search.placeholder')}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
        {/* 2. Quick Filters (Mobile) */}
        <div className="md:hidden flex flex-wrap gap-2 mb-4">
          {quickFilters.map((q, i) => (
            <button key={i} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold" onClick={() => handleSearch(q)}>{q}</button>
          ))}
          <button className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold" onClick={() => setShowMobileFilters(v => !v)}><FiFilter className="inline mr-1" />{t('searchFilters.filters.mobile')}</button>
        </div>
        {/* 3. Advanced Filter Builder Panel */}
        {(showFilterPanel || showMobileFilters) && (
          <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/30 animate-fade-in">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 w-full max-w-2xl relative">
              <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700" onClick={() => { setShowFilterPanel(false); setShowMobileFilters(false); }}>&times;</button>
              <h2 className="text-lg font-bold mb-4 text-gray-800 dark:text-gray-100 flex items-center gap-2"><FiFilter />{t('searchFilters.filters.advanced')}</h2>
              {/* Example filter fields, expand as needed */}
              <div className="flex flex-col gap-3">
                <div className="flex gap-2">
                  <input className="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900" placeholder={t('searchFilters.filters.applicationId')} />
                  <input className="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900" placeholder={t('searchFilters.filters.name')} />
                </div>
                <div className="flex gap-2">
                  <input className="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900" placeholder={t('searchFilters.filters.email')} />
                  <input className="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900" placeholder={t('searchFilters.filters.phone')} />
                </div>
                <div className="flex gap-2">
                  <select className="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900"><option>{t('searchFilters.filters.allStatus')}</option></select>
                  <select className="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900"><option>{t('searchFilters.filters.allPrograms')}</option></select>
                </div>
                <div className="flex gap-2">
                  <input className="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900" placeholder={t('searchFilters.filters.tags')} />
                  <input className="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900" placeholder={t('searchFilters.filters.counselor')} />
                </div>
                <div className="flex gap-2">
                  <input className="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900" placeholder={t('searchFilters.filters.dateRange')} />
                  <input className="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900" placeholder={t('searchFilters.filters.scoreRange')} />
                </div>
                {/* Add more filter fields as per spec */}
              </div>
              <div className="flex gap-2 mt-4">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold" onClick={() => { setShowFilterPanel(false); setShowMobileFilters(false); setToast(t('searchFilters.filters.apply')); }}>{t('searchFilters.filters.apply')}</button>
                <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg font-semibold" onClick={() => { setShowFilterPanel(false); setShowMobileFilters(false); }}>{t('searchFilters.filters.cancel')}</button>
              </div>
            </div>
          </div>
        )}
        {/* 4. Saved Views & Custom Filters */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <FiSave className="text-green-500" />
            <span className="font-semibold text-gray-700 dark:text-gray-200">{t('searchFilters.savedViews.title')}</span>
            <button className="ml-auto px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-semibold" onClick={handleSaveView}><FiPlus className="inline mr-1" />{t('searchFilters.savedViews.saveCurrent')}</button>
          </div>
          <div className="flex flex-wrap gap-2">
            {savedViews.map((v, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow px-3 py-2 flex items-center gap-2">
                <span className="font-semibold text-blue-700 dark:text-blue-300">{v.name}</span>
                <span className="text-xs text-gray-400">{v.desc}</span>
                {v.default && <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs">{t('searchFilters.savedViews.default')}</span>}
                {v.shared && <FiShare2 className="text-blue-400" />}
                <button className="text-xs text-gray-400 hover:text-red-500" onClick={() => setSavedViews(savedViews.filter((_, idx) => idx !== i))}><FiTrash2 /></button>
              </div>
            ))}
          </div>
        </div>
        {/* 5. Bulk Action Enablers */}
        {bulkEnabled && (
          <div className="mb-6 flex flex-wrap gap-2">
            <button className="px-3 py-2 bg-blue-600 text-white rounded-lg font-semibold" onClick={() => handleBulkAction('Bulk Email')}><FiMail className="inline mr-1" />{t('searchFilters.bulkActions.bulkEmail')}</button>
            <button className="px-3 py-2 bg-green-600 text-white rounded-lg font-semibold" onClick={() => handleBulkAction('Bulk Approve')}><FiCheckCircle className="inline mr-1" />{t('searchFilters.bulkActions.bulkApprove')}</button>
            <button className="px-3 py-2 bg-red-600 text-white rounded-lg font-semibold" onClick={() => handleBulkAction('Bulk Reject')}><FiXCircle className="inline mr-1" />{t('searchFilters.bulkActions.bulkReject')}</button>
            <button className="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold" onClick={() => handleBulkAction('Export CSV')}><FiDownload className="inline mr-1" />{t('searchFilters.bulkActions.exportCSV')}</button>
            <button className="px-3 py-2 bg-yellow-200 text-yellow-700 rounded-lg font-semibold" onClick={() => handleBulkAction('Add Tag')}><FiTag className="inline mr-1" />{t('searchFilters.bulkActions.addTag')}</button>
            <button className="px-3 py-2 bg-purple-200 text-purple-700 rounded-lg font-semibold" onClick={() => handleBulkAction('Schedule Appointments')}><FiCalendar className="inline mr-1" />{t('searchFilters.bulkActions.schedule')}</button>
          </div>
        )}
        {/* 6. Smart Suggestions & AI Filters */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <FiZap className="text-pink-500 animate-pulse" />
            <span className="font-semibold text-gray-700 dark:text-gray-200">{t('searchFilters.aiFilters.title')}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {aiSuggestions.map((a, i) => (
              <button key={i} className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold hover:bg-yellow-200" onClick={() => handleSearch(a)}><FiZap className="inline mr-1" />{a}</button>
            ))}
          </div>
        </div>
        {/* 7. Access & Control */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <FiSettings className="text-blue-500" />
            <span className="font-semibold text-gray-700 dark:text-gray-200">{t('searchFilters.accessControl.title')}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs">{t('searchFilters.accessControl.role')}: {role}</span>
            <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs">{t('searchFilters.accessControl.admin')}</span>
            <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full text-xs">{t('searchFilters.accessControl.counselor')}</span>
          </div>
        </div>
        <ResultsTable
          results={results}
          onRowClick={profile => setProfileDrawer({ open: true, profile })}
          selected={selected}
          setSelected={setSelected}
        />
        <ProfileDrawer
          open={profileDrawer.open}
          onClose={() => setProfileDrawer({ open: false, profile: null })}
          profile={profileDrawer.profile}
        />
        <BulkActionBar selected={selected} onAction={handleBulkAction} />
        {/* Toast */}
        {toast && <div className="fixed bottom-6 right-6 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in">{toast}</div>}
      </div>
    </div>
  );
} 