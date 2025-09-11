import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalization } from "../../../../hooks/useLocalization";
import {
  CalendarIcon,
  ClockIcon,
  UserIcon,
  VideoCameraIcon,
  DocumentTextIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  PlusIcon
} from "@heroicons/react/24/outline";

const initialSessions = [
  {
    id: 1,
    title: "Effective Follow-up Tactics",
    date: "2024-07-26",
    time: "11:00 AM",
    type: "Soft Skills",
    trainer: "Dr. Noura Al-Zahra",
    mandatory: true,
    attendees: ["All New Counselors"],
    format: "Virtual",
    status: "Upcoming"
  },
  {
    id: 2,
    title: "CRM Usage & Automation",
    date: "2024-07-28",
    time: "02:00 PM",
    type: "Technical",
    trainer: "Michael Chen",
    mandatory: true,
    attendees: ["All Staff"],
    format: "In-Person",
    status: "Upcoming"
  },
  {
    id: 3,
    title: "Document Verification Best Practices",
    date: "2024-07-30",
    time: "10:00 AM",
    type: "Compliance",
    trainer: "Emma Wilson",
    mandatory: true,
    attendees: ["Document Verifiers"],
    format: "Hybrid",
    status: "Upcoming"
  }
];

const sessionTypes = [
  { name: "System Walkthrough", icon: VideoCameraIcon, color: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400" },
  { name: "Technical Training", icon: DocumentTextIcon, color: "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400" },
  { name: "Soft Skills", icon: UserGroupIcon, color: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400" },
  { name: "Compliance", icon: ShieldCheckIcon, color: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400" }
];

const TrainingCalendar = () => {
  const { t } = useTranslation(['admission', 'common']);
  const { isRTL } = useLocalization();
  const [sessions, setSessions] = useState(initialSessions);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [newSession, setNewSession] = useState({
    title: '',
    date: '',
    time: '',
    type: 'Soft Skills',
    trainer: '',
    format: 'Virtual',
    mandatory: false,
    attendees: ''
  });

  const handleAddSession = (e) => {
    e.preventDefault();
    if (newSession.title && newSession.date && newSession.time && newSession.trainer) {
      setSessions([...sessions, { 
        ...newSession, 
        id: Date.now(),
        attendees: newSession.attendees.split(',').map(a => a.trim()),
        status: 'Upcoming'
      }]);
      setNewSession({
        title: '',
        date: '',
        time: '',
        type: 'Soft Skills',
        trainer: '',
        format: 'Virtual',
        mandatory: false,
        attendees: ''
      });
      setShowAddModal(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Training Calendar</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">Schedule and manage training sessions</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white dark:text-white rounded-lg hover:bg-primary-dark dark:hover:bg-primary-dark transition-colors dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          <PlusIcon className="w-5 h-5" />
          Schedule Session
        </button>
      </div>

      {/* Session Types */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {sessionTypes.map((type) => (
          <div key={type.name} className={`p-4 rounded-lg ${type.color} flex items-center gap-3`}>
            <type.icon className="w-6 h-6" />
            <span className="font-medium">{type.name}</span>
          </div>
        ))}
      </div>

      {/* Upcoming Sessions */}
      <div className="space-y-4">
        <h4 className="font-semibold text-gray-900 dark:text-white">Upcoming Sessions</h4>
        <div className="grid gap-4">
          {sessions.map((session) => (
            <div key={session.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h5 className="font-semibold text-gray-900 dark:text-white">{session.title}</h5>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center gap-1">
                      <CalendarIcon className="w-4 h-4" />
                      {session.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <ClockIcon className="w-4 h-4" />
                      {session.time}
                    </div>
                    <div className="flex items-center gap-1">
                      <UserIcon className="w-4 h-4" />
                      {session.trainer}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    session.mandatory ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200' : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                  }`}>
                    {session.mandatory ? 'Mandatory' : 'Optional'}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    session.format === 'Virtual' ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200' :
                    session.format === 'In-Person' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' :
                    'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200'
                  }`}>
                    {session.format}
                  </span>
                </div>
              </div>
              <div className="mt-3 text-sm text-gray-600 dark:text-gray-300">
                <div className="flex items-center gap-1">
                  <UserGroupIcon className="w-4 h-4" />
                  {session.attendees.join(', ')}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Session Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Schedule New Training Session</h3>
            <form onSubmit={handleAddSession} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
                <input
                  type="text"
                  value={newSession.title}
                  onChange={(e) => setNewSession({...newSession, title: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-primary focus:ring-primary dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="Enter session title"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Date</label>
                  <input
                    type="date"
                    value={newSession.date}
                    onChange={(e) => setNewSession({...newSession, date: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-primary focus:ring-primary dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Time</label>
                  <input
                    type="time"
                    value={newSession.time}
                    onChange={(e) => setNewSession({...newSession, time: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-primary focus:ring-primary dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Type</label>
                <select 
                  value={newSession.type}
                  onChange={(e) => setNewSession({...newSession, type: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-primary focus:ring-primary dark:focus:border-blue-500 dark:focus:ring-blue-500"
                >
                  {sessionTypes.map(type => (
                    <option key={type.name} value={type.name}>{type.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Trainer</label>
                <input
                  type="text"
                  value={newSession.trainer}
                  onChange={(e) => setNewSession({...newSession, trainer: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-primary focus:ring-primary dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="Enter trainer name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Format</label>
                <select 
                  value={newSession.format}
                  onChange={(e) => setNewSession({...newSession, format: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-primary focus:ring-primary dark:focus:border-blue-500 dark:focus:ring-blue-500"
                >
                  <option value="Virtual">Virtual</option>
                  <option value="In-Person">In-Person</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Attendees</label>
                <input
                  type="text"
                  value={newSession.attendees}
                  onChange={(e) => setNewSession({...newSession, attendees: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-primary focus:ring-primary dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="Enter attendees (comma separated)"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="mandatory"
                  checked={newSession.mandatory}
                  onChange={(e) => setNewSession({...newSession, mandatory: e.target.checked})}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-blue-500"
                />
                <label htmlFor="mandatory" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Mandatory Session
                </label>
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-dark dark:bg-blue-600 dark:hover:bg-blue-700"
                >
                  Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainingCalendar;