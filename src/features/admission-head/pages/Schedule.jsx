import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalization } from '../../../hooks/useLocalization';
import { FiCalendar, FiUsers, FiUserCheck, FiAlertCircle, FiClock, FiMapPin, FiMail, FiPlus, FiChevronDown, FiChevronUp, FiCheckCircle, FiXCircle, FiZap, FiEdit2, FiTrash2, FiArrowRight, FiRepeat, FiDownload, FiChevronLeft, FiChevronRight, FiCpu, FiTarget } from 'react-icons/fi';
import AdmissionHeadInterviewScheduling from '../components/ai/AdmissionHeadInterviewScheduling';

// Mock data for appointments
const mockTypes = [
  { label: 'Student Interview', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400', icon: <FiUserCheck /> },
  { label: 'Parent Counseling', color: 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400', icon: <FiUsers /> },
  { label: 'Agent Meeting', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400', icon: <FiMail /> },
  { label: 'High School Outreach', color: 'bg-pink-100 text-pink-700 dark:bg-pink-900/20 dark:text-pink-400', icon: <FiMapPin /> },
  { label: 'Campus Visit', color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400', icon: <FiMapPin /> },
  { label: 'Team Sync', color: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-400', icon: <FiUsers /> },
  { label: 'Walk-In', color: 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400', icon: <FiUserCheck /> },
];
const mockStaff = [
  { name: 'Noura Al-Zahra', avatar: 'https://randomuser.me/api/portraits/women/8.jpg', color: 'bg-blue-200' },
  { name: 'Khalid Al-Sayed', avatar: 'https://randomuser.me/api/portraits/men/11.jpg', color: 'bg-pink-200' },
  { name: 'Aisha Al-Hassan', avatar: 'https://randomuser.me/api/portraits/women/10.jpg', color: 'bg-purple-200' },
  { name: 'Omar Al-Mutairi', avatar: 'https://randomuser.me/api/portraits/men/9.jpg', color: 'bg-green-200' },
];
const today = new Date();
function addDays(date, days) { const d = new Date(date); d.setDate(d.getDate() + days); return d; }
const mockAppointments = [
  { id: 1, title: 'Interview: Abdullah Al-Rashid', type: 'Student Interview', staff: mockStaff[0], date: today, time: '10:00 AM', status: 'Confirmed', mode: 'Online', applicant: 'Abdullah Al-Rashid', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400' },
  { id: 2, title: 'Parent Counseling: Layla Al-Mansour', type: 'Parent Counseling', staff: mockStaff[1], date: addDays(today, 1), time: '2:00 PM', status: 'Pending', mode: 'Offline', applicant: 'Layla Al-Mansour', color: 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400' },
  { id: 3, title: 'Agent Meeting: EduWorld', type: 'Agent Meeting', staff: mockStaff[2], date: addDays(today, 2), time: '4:00 PM', status: 'Confirmed', mode: 'Online', applicant: 'EduWorld', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400' },
  { id: 4, title: 'Outreach: St. Xavier School', type: 'High School Outreach', staff: mockStaff[3], date: addDays(today, 3), time: '11:00 AM', status: 'Confirmed', mode: 'Offline', applicant: 'St. Xavier School', color: 'bg-pink-100 text-pink-700 dark:bg-pink-900/20 dark:text-pink-400' },
  { id: 5, title: 'Campus Visit: Omar Al-Mutairi', type: 'Campus Visit', staff: mockStaff[0], date: addDays(today, 4), time: '9:00 AM', status: 'Pending', mode: 'Offline', applicant: 'Omar Al-Mutairi', color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400' },
  { id: 6, title: 'Team Sync', type: 'Team Sync', staff: mockStaff[1], date: addDays(today, 5), time: '3:00 PM', status: 'Confirmed', mode: 'Offline', applicant: '', color: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-400' },
  { id: 7, title: 'Walk-In: Fatima Al-Rashid', type: 'Walk-In', staff: mockStaff[2], date: addDays(today, 6), time: '1:00 PM', status: 'Pending', mode: 'Offline', applicant: 'Fatima Al-Rashid', color: 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400' },
];

function formatDate(date) {
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}
function isToday(date) {
  const now = new Date();
  return date.getDate() === now.getDate() && date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
}
function isThisWeek(date) {
  const now = new Date();
  const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
  const weekEnd = new Date(weekStart); weekEnd.setDate(weekEnd.getDate() + 6);
  return date >= weekStart && date <= weekEnd;
}
function isThisMonth(date) {
  const now = new Date();
  return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
}

// AI Smart Suggestions Panel
function AISmartPanel({ appointments, staff }) {
  // Mock logic for best slot, no-show risk, load balancer
  const bestSlot = 'Tomorrow, 11:00 AM';
  const noShowRisk = appointments.filter(a => a.status === 'No-Show').length > 2 ? 'High' : 'Low';
  const overloaded = staff.find(s => appointments.filter(a => a.staff.name === s.name && isToday(a.date)).length > 3);
  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg p-6 border border-purple-200 dark:border-purple-800" 
         data-tour="4" 
         data-tour-title-en="AI Smart Suggestions" 
         data-tour-title-ar="اقتراحات ذكية" 
         data-tour-content-en="Smart suggestions for best slot, no-show risk, and load balancing." 
         data-tour-content-ar="اقتراحات ذكية للوقت الأفضل، خطر الإلغاء، وتوزيع الحمل.">
      <div className="flex items-center gap-3 mb-4">
        <FiZap className="text-purple-500 animate-pulse w-6 h-6" />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">AI Smart Suggestions</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center gap-3 bg-blue-100 dark:bg-blue-900/20 px-4 py-3 rounded-lg">
          <FiClock className="text-blue-500 w-5 h-5" />
          <span className="font-medium text-blue-800 dark:text-blue-200">Best Slot: {bestSlot}</span>
        </div>
        <div className="flex items-center gap-3 bg-yellow-100 dark:bg-yellow-900/20 px-4 py-3 rounded-lg">
          <FiAlertCircle className="text-yellow-500 w-5 h-5" />
          <span className="font-medium text-yellow-800 dark:text-yellow-200">No-Show Risk: {noShowRisk}</span>
        </div>
        {overloaded && (
          <div className="flex items-center gap-3 bg-red-100 dark:bg-red-900/20 px-4 py-3 rounded-lg">
            <FiUsers className="text-red-500 w-5 h-5" />
            <span className="font-medium text-red-800 dark:text-red-200">Load Balancer: {overloaded.name} is overbooked today!</span>
          </div>
        )}
      </div>
    </div>
  );
}

// Analytics Widgets
function AnalyticsWidgets({ appointments, staff }) {
  // Bar chart: appointments by type this month
  const types = [...new Set(appointments.map(a => a.type))];
  const typeCounts = types.map(type => appointments.filter(a => a.type === type && isThisMonth(a.date)).length);
  // Pie chart: status breakdown
  const statuses = ['Confirmed', 'Pending', 'Rescheduled', 'Cancelled', 'No-Show', 'Attended'];
  const statusCounts = statuses.map(status => appointments.filter(a => a.status === status && isThisMonth(a.date)).length);
  // Leaderboard: staff with most appointments
  const staffCounts = staff.map(s => ({ ...s, count: appointments.filter(a => a.staff.name === s.name && isThisMonth(a.date)).length }));
  staffCounts.sort((a, b) => b.count - a.count);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8" 
         data-tour="3" 
         data-tour-title-en="Analytics Widgets" 
         data-tour-title-ar="واجهات تحليلية" 
         data-tour-content-en="Bar chart for appointment types and pie chart for status breakdown." 
         data-tour-content-ar="رسم بياني لأنواع المواعيد ودائرة لتفصيل الحالة.">
      
      {/* Bar Chart - Appointments by Type */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">Appointments by Type</h3>
        <div className="space-y-3">
          {types.map((type, i) => {
            const count = typeCounts[i];
            const maxCount = Math.max(...typeCounts);
            const percentage = maxCount > 0 ? (count / maxCount) * 100 : 0;
            
            return (
              <div key={type} className="flex items-center gap-3">
                <div className="w-20 text-xs font-medium text-gray-600 dark:text-gray-400 truncate">
                  {type}
                </div>
                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <div className="w-8 text-sm font-bold text-gray-900 dark:text-white text-right">
                  {count}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Status Breakdown with Pie Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">Status Breakdown</h3>
        
        {/* Pie Chart */}
        <div className="flex justify-center mb-4">
          <div className="relative w-32 h-32">
            <svg width="128" height="128" viewBox="0 0 32 32" className="transform -rotate-90">
              {(() => {
                let acc = 0;
                const total = statusCounts.reduce((a, b) => a + b, 0) || 1;
                const colors = ['#10b981', '#f59e0b', '#3b82f6', '#ef4444', '#6b7280', '#8b5cf6'];
                return statusCounts.map((count, i) => {
                  if (count === 0) return null;
                  const val = (count / total) * 100;
                  const r = 12;
                  const circ = 2 * Math.PI * r;
                  const len = circ * (val / 100);
                  const dasharray = `${len} ${circ - len}`;
                  const offset = circ * (1 - acc / 100);
                  acc += val;
                  return (
                    <circle
                      key={statuses[i]}
                      r={r}
                      cx="16"
                      cy="16"
                      fill="transparent"
                      stroke={colors[i % colors.length]}
                      strokeWidth="6"
                      strokeDasharray={dasharray}
                      strokeDashoffset={offset}
                      className="transition-all duration-500"
                    />
                  );
                });
              })()}
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900 dark:text-white">
                  {statusCounts.reduce((a, b) => a + b, 0)}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Total</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Legend */}
        <div className="space-y-2">
          {statuses.map((status, i) => {
            const count = statusCounts[i];
            const total = statusCounts.reduce((a, b) => a + b, 0);
            const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
            
            const statusColors = {
              'Confirmed': 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400',
              'Pending': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400',
              'Rescheduled': 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400',
              'Cancelled': 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400',
              'No-Show': 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400',
              'Attended': 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400'
            };
            
            const pieColors = ['#10b981', '#f59e0b', '#3b82f6', '#ef4444', '#6b7280', '#8b5cf6'];
            
            if (count === 0) return null;
            
            return (
              <div key={status} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: pieColors[i % pieColors.length] }}
                  ></div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{status}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-gray-900 dark:text-white">{count}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">({percentage}%)</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Staff Leaderboard */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">Staff Leaderboard</h3>
        <div className="space-y-3">
          {staffCounts.map((s, i) => (
            <div key={s.name} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className={`w-8 h-8 rounded-full ${s.color} flex items-center justify-center text-sm font-bold text-white`}>
                {i + 1}
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300">{s.name}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{s.count} appointments</div>
              </div>
              <div className="text-lg font-bold text-gray-900 dark:text-white">
                {s.count}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Schedule() {
  const { t, i18n, ready } = useTranslation(['admission', 'common']);
  const { isRTL, isRTLMode } = useLocalization();
  const [languageVersion, setLanguageVersion] = useState(0);
  
  // AI State Variables
  const [showInterviewScheduling, setShowInterviewScheduling] = useState(false);
  const aiInterviewSchedulingRef = useRef(null);
  
  // State
  const [appointments, setAppointments] = useState(mockAppointments);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('month');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [addType, setAddType] = useState('');
  const [toast, setToast] = useState(null);

  // AI Functions
  const scrollToAISection = () => {
    if (aiInterviewSchedulingRef.current) {
      aiInterviewSchedulingRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  };

  const handleInterviewScheduling = () => {
    setShowInterviewScheduling(true);
    setTimeout(scrollToAISection, 100);
  };

  // Language change handler
  useEffect(() => {
    const handleLanguageChange = () => {
      setLanguageVersion(prev => prev + 1);
    };
    i18n.on('languageChanged', handleLanguageChange);
    return () => { i18n.off('languageChanged', handleLanguageChange); };
  }, [i18n]);

  if (!ready) {
    return <div className="flex items-center justify-center h-64">{t('common.loading')}</div>;
  }

  // Dashboard metrics
  const todayCount = appointments.filter(a => isToday(a.date)).length;
  const weekCount = appointments.filter(a => isThisWeek(a.date)).length;

  // Add appointment
  function handleAddAppointment(app) {
    setAppointments([...appointments, app]);
    setShowAddModal(false);
    setToast('Appointment added!');
  }
  // Reschedule
  function handleReschedule(app, newDate, newTime) {
    setAppointments(appointments.map(a => a.id === app.id ? { ...a, date: newDate, time: newTime, status: 'Rescheduled' } : a));
    setShowEventModal(false);
    setToast('Appointment rescheduled!');
  }
  // Assign staff
  function handleAssignStaff(app, staff) {
    setAppointments(appointments.map(a => a.id === app.id ? { ...a, staff, status: 'Confirmed' } : a));
    setShowEventModal(false);
    setToast('Staff assigned!');
  }
  // Cancel
  function handleCancel(app) {
    setAppointments(appointments.map(a => a.id === app.id ? { ...a, status: 'Cancelled' } : a));
    setShowEventModal(false);
    setToast('Appointment cancelled!');
  }
  // Mark as attended
  function handleAttend(app) {
    setAppointments(appointments.map(a => a.id === app.id ? { ...a, status: 'Attended' } : a));
    setShowEventModal(false);
    setToast('Marked as attended!');
  }
  // Send reminder
  function handleReminder(app) {
    setToast('Reminder sent!');
  }

  // Calendar grid (month view, simple mock)
  function CalendarGrid() {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    const days = [];
    for (let d = 1; d <= end.getDate(); d++) {
      days.push(new Date(now.getFullYear(), now.getMonth(), d));
    }
    return (
      <div className="grid grid-cols-7 gap-2" 
           data-tour="5" 
           data-tour-title-en="Calendar Grid" 
           data-tour-title-ar="شبكة التقويم" 
           data-tour-content-en="Monthly view with scheduled items." 
           data-tour-content-ar="عرض شهري بالعناصر المجدولة.">
        {days.map(day => (
          <div key={day.toISOString()} className={`rounded-xl p-2 min-h-[80px] border ${
            isToday(day) 
              ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20' 
              : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
          } flex flex-col gap-1 relative`}>
            <span className="text-xs font-bold text-gray-500 dark:text-gray-400">{day.getDate()}</span>
            {appointments.filter(a => a.date.getDate() === day.getDate() && a.date.getMonth() === day.getMonth()).map(a => (
              <button 
                key={a.id} 
                className={`w-full text-xs rounded px-1 py-0.5 mt-1 truncate ${a.color} hover:scale-105 transition-transform`} 
                onClick={() => { setSelectedEvent(a); setShowEventModal(true); }}
              >
                {a.title}
              </button>
            ))}
          </div>
        ))}
      </div>
    );
  }

  // Toast
  useEffect(() => { if (toast) { const t = setTimeout(() => setToast(null), 2000); return () => clearTimeout(t); } }, [toast]);

  return (
    <div
      key={`${i18n.language}-${languageVersion}`}
      className="min-h-screen bg-gray-50 dark:bg-gray-900"
      data-tour="1"
      data-tour-title-en="Schedule & Appointments"
      data-tour-title-ar="الجدولة والمواعيد"
      data-tour-content-en="Dashboard, AI suggestions, analytics, types, and calendar."
      data-tour-content-ar="لوحة المعلومات، اقتراحات الذكاء، التحليلات، الأنواع والتقويم."
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8" 
             data-tour="2" 
             data-tour-title-en="Header" 
             data-tour-title-ar="الرأس" 
             data-tour-content-en="Page title and overview." 
             data-tour-content-ar="عنوان الصفحة ونظرة عامة.">
          <div className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl p-8 text-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <FiCalendar className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold">
                {t('schedule.title')}
              </h1>
            </div>
            <p className="text-cyan-100 text-lg">
              {t('schedule.subtitle')}
            </p>
            <div className="mt-4">
              <button 
                className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg font-semibold transition-all duration-200 backdrop-blur-sm"
                onClick={handleInterviewScheduling}
              >
                <FiCpu className="w-4 h-4" />
                {isRTLMode ? 'جدولة المقابلات الذكية' : 'AI Interview Scheduling'}
              </button>
            </div>
          </div>
        </div>

        {/* Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8" 
             data-tour="3" 
             data-tour-title-en="KPIs" 
             data-tour-title-ar="المؤشرات" 
             data-tour-content-en="Today, this week, pending and confirmed counts." 
             data-tour-content-ar="أعداد اليوم وهذا الأسبوع والمعلّقة والمؤكدة.">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex items-center gap-4 border border-gray-200 dark:border-gray-700">
            <div className="bg-blue-100 dark:bg-blue-900/20 rounded-full p-3">
              <FiCalendar className="text-blue-600 dark:text-blue-400" size={24} />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">{todayCount}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{t('schedule.dashboard.today')}</div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex items-center gap-4 border border-gray-200 dark:border-gray-700">
            <div className="bg-green-100 dark:bg-green-900/20 rounded-full p-3">
              <FiClock className="text-green-600 dark:text-green-400" size={24} />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">{weekCount}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{t('schedule.dashboard.thisWeek')}</div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex items-center gap-4 border border-gray-200 dark:border-gray-700">
            <div className="bg-purple-100 dark:bg-purple-900/20 rounded-full p-3">
              <FiUsers className="text-purple-600 dark:text-purple-400" size={24} />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">{appointments.filter(a => a.status === 'Pending').length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{t('schedule.dashboard.pending')}</div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex items-center gap-4 border border-gray-200 dark:border-gray-700">
            <div className="bg-yellow-100 dark:bg-yellow-900/20 rounded-full p-3">
              <FiAlertCircle className="text-yellow-600 dark:text-yellow-400" size={24} />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">{appointments.filter(a => a.status === 'Confirmed').length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{t('schedule.dashboard.confirmed')}</div>
            </div>
          </div>
        </div>
        
        {/* AI & Analytics widgets */}
        <div data-tour="4" 
             data-tour-title-en="AI & Analytics" 
             data-tour-title-ar="الذكاء والتحليلات" 
             data-tour-content-en="Smart suggestions and analytics widgets." 
             data-tour-content-ar="اقتراحات ذكية وواجهات تحليلية.">
          <AISmartPanel appointments={appointments} staff={mockStaff} />
          <AnalyticsWidgets appointments={appointments} staff={mockStaff} />
        </div>

        {/* AI Interview Scheduling Section */}
        {showInterviewScheduling && (
          <div ref={aiInterviewSchedulingRef} className="mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <FiCpu className="text-purple-500 animate-pulse w-6 h-6" />
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                    {isRTLMode ? 'جدولة المقابلات الذكية' : 'AI Interview Scheduling'}
                  </h2>
                </div>
                <button
                  onClick={() => setShowInterviewScheduling(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <FiXCircle className="w-6 h-6" />
                </button>
              </div>
              <AdmissionHeadInterviewScheduling />
            </div>
          </div>
        )}

        {/* Appointment Types */}
        <div className="mb-8" 
             data-tour="6" 
             data-tour-title-en="Appointment Types" 
             data-tour-title-ar="أنواع المواعيد" 
             data-tour-content-en="Quick actions to add different appointment types." 
             data-tour-content-ar="إجراءات سريعة لإضافة أنواع مختلفة من المواعيد.">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            {t('schedule.types.title')}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {mockTypes.map((type, index) => (
              <button
                key={index}
                onClick={() => { setAddType(type.label); setShowAddModal(true); }}
                className={`${type.color} rounded-xl p-4 flex flex-col items-center gap-2 hover:scale-105 transition-transform`}
              >
                {type.icon}
                <span className="text-sm font-medium text-center">{type.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Calendar Controls */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-200 dark:border-gray-700" 
             data-tour="7" 
             data-tour-title-en="Calendar Controls" 
             data-tour-title-ar="عناصر التحكم في التقويم" 
             data-tour-content-en="Navigate months and switch views." 
             data-tour-content-ar="تنقل بين الشهور وغيّر طرق العرض.">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1))} 
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <FiChevronLeft className="text-gray-600 dark:text-gray-400" />
              </button>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </h2>
              <button 
                onClick={() => setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1))} 
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <FiChevronRight className="text-gray-600 dark:text-gray-400" />
              </button>
            </div>
            <div className="flex gap-2">
              <button 
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  view === 'month' 
                    ? 'bg-cyan-600 text-white shadow' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`} 
                onClick={() => setView('month')}
              >
                {t('schedule.view.month')}
              </button>
              <button 
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  view === 'week' 
                    ? 'bg-cyan-600 text-white shadow' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`} 
                onClick={() => setView('week')}
              >
                {t('schedule.view.week')}
              </button>
              <button 
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  view === 'day' 
                    ? 'bg-cyan-600 text-white shadow' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`} 
                onClick={() => setView('day')}
              >
                {t('schedule.view.day')}
              </button>
            </div>
          </div>
        </div>
        
        {/* Calendar & Filters */}
        <CalendarGrid />
        
        {/* Toast */}
        {toast && (
          <div className="fixed bottom-6 right-6 bg-cyan-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in">
            {toast}
          </div>
        )}
        
        {/* Add Appointment Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 min-w-[320px] max-w-[90vw] relative border border-gray-200 dark:border-gray-700">
              <button 
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" 
                onClick={() => setShowAddModal(false)}
              >
                <FiXCircle className="w-6 h-6" />
              </button>
              <h2 className="text-lg font-bold mb-4 text-gray-800 dark:text-gray-100">
                {t('schedule.actions.addAppointment')} {addType}
              </h2>
              <form onSubmit={e => { 
                e.preventDefault(); 
                handleAddAppointment({ 
                  id: Date.now(), 
                  title: `${addType}: ${e.target.applicant.value}`, 
                  type: addType, 
                  staff: mockStaff[0], 
                  date: new Date(e.target.date.value), 
                  time: e.target.time.value, 
                  status: 'Pending', 
                  mode: e.target.mode.value, 
                  applicant: e.target.applicant.value, 
                  color: mockTypes.find(t => t.label === addType)?.color || 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400' 
                }); 
              }} className="flex flex-col gap-3">
                <input 
                  name="applicant" 
                  placeholder={t('schedule.form.applicantName')} 
                  className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent" 
                  required 
                />
                <input 
                  name="date" 
                  type="date" 
                  className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent" 
                  required 
                />
                <input 
                  name="time" 
                  type="time" 
                  className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent" 
                  required 
                />
                <select 
                  name="mode" 
                  className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                >
                  <option>{t('schedule.modes.online')}</option>
                  <option>{t('schedule.modes.offline')}</option>
                </select>
                <button 
                  type="submit" 
                  className="mt-2 px-4 py-2 bg-cyan-600 text-white rounded-lg font-semibold hover:bg-cyan-700 transition-colors"
                >
                  {t('schedule.actions.addAppointment')}
                </button>
              </form>
            </div>
          </div>
        )}
        
        {/* Event Modal */}
        {showEventModal && selectedEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 min-w-[320px] max-w-[90vw] relative border border-gray-200 dark:border-gray-700">
              <button 
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" 
                onClick={() => setShowEventModal(false)}
              >
                <FiXCircle className="w-6 h-6" />
              </button>
              <h2 className="text-lg font-bold mb-4 text-gray-800 dark:text-gray-100">{selectedEvent.title}</h2>
              <div className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                {formatDate(selectedEvent.date)} at {selectedEvent.time} ({selectedEvent.mode})
              </div>
              <div className="mb-2 flex items-center gap-2">
                <FiUsers className="text-blue-400 w-4 h-4" />
                <span className="text-sm text-gray-700 dark:text-gray-300">{selectedEvent.staff.name}</span>
              </div>
              <div className="mb-2 flex items-center gap-2">
                <FiUserCheck className="text-green-400 w-4 h-4" />
                <span className="text-sm text-gray-700 dark:text-gray-300">{selectedEvent.applicant}</span>
              </div>
              <div className="mb-4 flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded-full text-xs ${selectedEvent.color}`}>{selectedEvent.type}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <button 
                  className="px-3 py-1 bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400 rounded font-semibold hover:bg-yellow-200 dark:hover:bg-yellow-900/30 transition-colors" 
                  onClick={() => handleReschedule(selectedEvent, addDays(selectedEvent.date, 1), selectedEvent.time)}
                >
                  <FiRepeat className="inline mr-1" />
                  {t('schedule.actions.reschedule')}
                </button>
                <button 
                  className="px-3 py-1 bg-indigo-100 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-400 rounded font-semibold hover:bg-indigo-200 dark:hover:bg-indigo-900/30 transition-colors" 
                  onClick={() => handleAssignStaff(selectedEvent, mockStaff[1])}
                >
                  <FiUsers className="inline mr-1" />
                  {t('schedule.actions.assignStaff')}
                </button>
                <button 
                  className="px-3 py-1 bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400 rounded font-semibold hover:bg-green-200 dark:hover:bg-green-900/30 transition-colors" 
                  onClick={() => handleAttend(selectedEvent)}
                >
                  <FiCheckCircle className="inline mr-1" />
                  {t('schedule.actions.markAttended')}
                </button>
                <button 
                  className="px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 rounded font-semibold hover:bg-blue-200 dark:hover:bg-blue-900/30 transition-colors" 
                  onClick={() => handleReminder(selectedEvent)}
                >
                  <FiMail className="inline mr-1" />
                  {t('schedule.actions.sendReminder')}
                </button>
                <button 
                  className="px-3 py-1 bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400 rounded font-semibold hover:bg-red-200 dark:hover:bg-red-900/30 transition-colors" 
                  onClick={() => handleCancel(selectedEvent)}
                >
                  <FiXCircle className="inline mr-1" />
                  {t('schedule.actions.cancel')}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}