import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalization } from "../../../../hooks/useLocalization";
import {
  UserPlusIcon,
  CalendarIcon,
  UserGroupIcon,
  CheckCircleIcon,
  ClockIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  ArrowPathIcon
} from "@heroicons/react/24/outline";

const initialPrograms = [
  {
    id: 1,
    title: "Counselor Onboarding 2024",
    duration: "2 weeks",
    startDate: "2024-08-01",
    participants: 12,
    completed: 8,
    status: "In Progress",
    modules: [
      { name: "CRM Basics", status: "Completed" },
      { name: "Policy Overview", status: "In Progress" },
      { name: "Document Verification", status: "Pending" }
    ]
  },
  {
    id: 2,
    title: "Document Verifier Training",
    duration: "1 week",
    startDate: "2024-07-15",
    participants: 5,
    completed: 5,
    status: "Completed",
    modules: [
      { name: "Document Types", status: "Completed" },
      { name: "Verification Process", status: "Completed" },
      { name: "Quality Standards", status: "Completed" }
    ]
  }
];

const OnboardingPrograms = () => {
  const { t } = useTranslation(['admission', 'common']);
  const { isRTL } = useLocalization();
  const [programs, setPrograms] = useState(initialPrograms);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [newProgram, setNewProgram] = useState({
    title: '',
    duration: '',
    startDate: '',
    participants: '',
    modules: []
  });

  const handleDeleteProgram = (id) => {
    setPrograms(programs.filter(program => program.id !== id));
  };

  const handleAddProgram = (e) => {
    e.preventDefault();
    if (newProgram.title && newProgram.duration && newProgram.startDate && newProgram.participants) {
      setPrograms([...programs, { 
        ...newProgram, 
        id: Date.now(),
        participants: parseInt(newProgram.participants),
        completed: 0,
        status: 'In Progress',
        modules: []
      }]);
      setNewProgram({
        title: '',
        duration: '',
        startDate: '',
        participants: '',
        modules: []
      });
      setShowAddModal(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Onboarding Programs</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">Manage structured onboarding for new team members</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white dark:text-white rounded-lg hover:bg-primary-dark dark:hover:bg-primary-dark transition-colors dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          <PlusIcon className="w-5 h-5" />
          Add Program
        </button>
      </div>

      {/* Programs List */}
      <div className="grid gap-6">
        {programs.map((program) => (
          <div key={program.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{program.title}</h4>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-600 dark:text-gray-300">
                  <div className="flex items-center gap-1">
                    <CalendarIcon className="w-4 h-4" />
                    {program.duration} • Starts {program.startDate}
                  </div>
                  <div className="flex items-center gap-1">
                    <UserGroupIcon className="w-4 h-4" />
                    {program.participants} Participants
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  program.status === 'Completed' ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400' : 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400'
                }`}>
                  {program.status}
                </span>
                <button
                  onClick={() => setSelectedProgram(program)}
                  className="p-1 text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-blue-500"
                >
                  <PencilIcon className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDeleteProgram(program.id)}
                  className="p-1 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-4">
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-1">
                <span>Progress</span>
                <span>{Math.round((program.completed / program.participants) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full dark:bg-blue-500"
                  style={{ width: `${(program.completed / program.participants) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Modules List */}
            <div className="mt-6">
              <h5 className="font-medium mb-3 text-gray-900 dark:text-white">Program Modules</h5>
              <div className="space-y-2">
                {program.modules.map((module, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded">
                    <span className="text-sm text-gray-900 dark:text-white">{module.name}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      module.status === 'Completed' ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400' :
                      module.status === 'In Progress' ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400' :
                      'bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-200'
                    }`}>
                      {module.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Program Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Create Onboarding Program</h3>
            <form onSubmit={handleAddProgram} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Program Title</label>
                <input
                  type="text"
                  value={newProgram.title}
                  onChange={(e) => setNewProgram({...newProgram, title: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-primary focus:ring-primary dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="Enter program title"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Duration</label>
                <input
                  type="text"
                  value={newProgram.duration}
                  onChange={(e) => setNewProgram({...newProgram, duration: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-primary focus:ring-primary dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="e.g., 2 weeks"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Start Date</label>
                <input
                  type="date"
                  value={newProgram.startDate}
                  onChange={(e) => setNewProgram({...newProgram, startDate: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-primary focus:ring-primary dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Max Participants</label>
                <input
                  type="number"
                  value={newProgram.participants}
                  onChange={(e) => setNewProgram({...newProgram, participants: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-primary focus:ring-primary dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="Enter max participants"
                  required
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark dark:bg-blue-600 dark:hover:bg-blue-700"
                >
                  Create Program
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default OnboardingPrograms;