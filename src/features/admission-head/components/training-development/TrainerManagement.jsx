import React, { useState } from 'react';
import {
  UserGroupIcon,
  AcademicCapIcon,
  CalendarIcon,
  StarIcon,
  ClockIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EnvelopeIcon,
  PhoneIcon
} from "@heroicons/react/24/outline";

const initialTrainers = [
  {
    id: 1,
    name: "Dr. Noura Al-Zahra",
    role: "Senior Trainer",
    expertise: ["CRM", "Policy", "Document Verification"],
    rating: 4.8,
    sessions: 45,
    availability: "Full-time",
    contact: {
      email: "noura.zahra@example.com",
      phone: "+1 (555) 123-4567"
    },
    upcomingSessions: [
      {
        title: "CRM Masterclass",
        date: "2024-08-01",
        time: "10:00 AM",
        participants: 15
      },
      {
        title: "Policy Update Training",
        date: "2024-08-03",
        time: "2:00 PM",
        participants: 20
      }
    ]
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Technical Trainer",
    expertise: ["CRM", "Technical Skills"],
    rating: 4.6,
    sessions: 32,
    availability: "Part-time",
    contact: {
      email: "michael.chen@example.com",
      phone: "+1 (555) 987-6543"
    },
    upcomingSessions: [
      {
        title: "Advanced CRM Features",
        date: "2024-08-02",
        time: "11:00 AM",
        participants: 12
      }
    ]
  }
];

const TrainerManagement = () => {
  const [trainers, setTrainers] = useState(initialTrainers);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState(null);

  const handleDeleteTrainer = (id) => {
    setTrainers(trainers.filter(trainer => trainer.id !== id));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Trainer Management</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">Manage trainers and their schedules</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
        >
          <PlusIcon className="w-5 h-5" />
          Add Trainer
        </button>
      </div>

      {/* Trainers List */}
      <div className="space-y-4">
        <h4 className="font-semibold text-gray-900 dark:text-white">Active Trainers</h4>
        <div className="grid gap-4">
          {trainers.map((trainer) => (
            <div key={trainer.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{trainer.name}</h4>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center gap-1">
                      <AcademicCapIcon className="w-4 h-4" />
                      {trainer.specialization}
                    </div>
                    <div className="flex items-center gap-1">
                      <UserGroupIcon className="w-4 h-4" />
                      {trainer.sessionsCompleted} sessions
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    trainer.status === 'Available' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                  }`}>
                    {trainer.status}
                  </span>
                  <button
                    onClick={() => setSelectedTrainer(trainer)}
                    className="p-1 text-gray-500 dark:text-gray-400 hover:text-primary"
                  >
                    <PencilIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteTrainer(trainer.id)}
                    className="p-1 text-gray-500 dark:text-gray-400 hover:text-red-600"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>

                              {/* Trainer Skills */}
                <div className="mt-4">
                  <h5 className="font-medium text-gray-900 dark:text-white mb-2">Skills</h5>
                  <div className="flex flex-wrap gap-2">
                    {trainer.expertise.map((skill, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add/Edit Trainer Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Add New Trainer</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  placeholder="Enter trainer name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  placeholder="Enter trainer role"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Areas of Expertise</label>
                <div className="mt-2 space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                      placeholder="Add expertise"
                    />
                    <button
                      type="button"
                      className="p-2 text-gray-500 hover:text-primary"
                    >
                      <PlusIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Availability</label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary">
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  placeholder="Enter email address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  placeholder="Enter phone number"
                />
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-dark"
                >
                  Add Trainer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainerManagement; 