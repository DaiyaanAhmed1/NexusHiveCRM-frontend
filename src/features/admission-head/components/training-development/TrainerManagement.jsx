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
  PhoneIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon
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
    ],
    feedback: [
      {
        id: 1,
        participant: "Ahmed Hassan",
        rating: 5,
        comment: "Excellent training session, very informative and engaging.",
        date: "2024-07-25"
      },
      {
        id: 2,
        participant: "Sarah Johnson",
        rating: 4,
        comment: "Great content, but could use more practical examples.",
        date: "2024-07-20"
      }
    ],
    evaluations: [
      {
        id: 1,
        type: "Session Quality",
        score: 92,
        date: "2024-07-30"
      },
      {
        id: 2,
        type: "Content Relevance",
        score: 88,
        date: "2024-07-25"
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
    ],
    feedback: [
      {
        id: 1,
        participant: "Lisa Wang",
        rating: 5,
        comment: "Very technical but well explained. Great trainer!",
        date: "2024-07-22"
      }
    ],
    evaluations: [
      {
        id: 1,
        type: "Technical Depth",
        score: 95,
        date: "2024-07-22"
      }
    ]
  }
];

const TrainerManagement = () => {
  const [trainers, setTrainers] = useState(initialTrainers);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [selectedTrainerForFeedback, setSelectedTrainerForFeedback] = useState(null);

  const handleDeleteTrainer = (id) => {
    setTrainers(trainers.filter(trainer => trainer.id !== id));
  };

  const handleViewFeedback = (trainer) => {
    setSelectedTrainerForFeedback(trainer);
    setShowFeedbackModal(true);
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
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white dark:text-white rounded-lg hover:bg-primary-dark dark:hover:bg-primary-dark transition-colors"
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
                      {trainer.role}
                    </div>
                    <div className="flex items-center gap-1">
                      <UserGroupIcon className="w-4 h-4" />
                      {trainer.sessions} sessions
                    </div>
                    <div className="flex items-center gap-1">
                      <StarIcon className="w-4 h-4 text-yellow-500" />
                      {trainer.rating}/5.0
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    trainer.availability === 'Full-time' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                  }`}>
                    {trainer.availability}
                  </span>
                  <button
                    onClick={() => handleViewFeedback(trainer)}
                    className="p-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                    title="View Feedback & Evaluations"
                  >
                    <ChatBubbleLeftRightIcon className="w-5 h-5" />
                  </button>
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

              {/* Quick Stats */}
              <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <div className="text-gray-600 dark:text-gray-400">Feedback</div>
                  <div className="font-semibold text-gray-900 dark:text-white">{trainer.feedback.length}</div>
                </div>
                <div className="text-center">
                  <div className="text-gray-600 dark:text-gray-400">Evaluations</div>
                  <div className="font-semibold text-gray-900 dark:text-white">{trainer.evaluations.length}</div>
                </div>
                <div className="text-center">
                  <div className="text-gray-600 dark:text-gray-400">Avg Score</div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {trainer.evaluations.length > 0 
                      ? Math.round(trainer.evaluations.reduce((sum, evaluation) => sum + evaluation.score, 0) / trainer.evaluations.length)
                      : 'N/A'
                    }
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add/Edit Trainer Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Add New Trainer</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary focus:ring-primary dark:bg-gray-700 dark:text-white"
                  placeholder="Enter trainer name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Role</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary focus:ring-primary dark:bg-gray-700 dark:text-white"
                  placeholder="Enter trainer role"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Areas of Expertise</label>
                <div className="mt-2 space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      className="flex-1 rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary focus:ring-primary dark:bg-gray-700 dark:text-white"
                      placeholder="Add expertise"
                    />
                    <button
                      type="button"
                      className="p-2 text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary"
                    >
                      <PlusIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Availability</label>
                <select className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary focus:ring-primary dark:bg-gray-700 dark:text-white">
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                <input
                  type="email"
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary focus:ring-primary dark:bg-gray-700 dark:text-white"
                  placeholder="Enter email address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone</label>
                <input
                  type="tel"
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary focus:ring-primary dark:bg-gray-700 dark:text-white"
                  placeholder="Enter phone number"
                />
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600"
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

      {/* Feedback & Evaluation Modal */}
      {showFeedbackModal && selectedTrainerForFeedback && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Feedback & Evaluations - {selectedTrainerForFeedback.name}
              </h3>
              <button
                onClick={() => setShowFeedbackModal(false)}
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <span className="sr-only">Close</span>
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Feedback Section */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <ChatBubbleLeftRightIcon className="w-5 h-5" />
                  Participant Feedback
                </h4>
                <div className="space-y-4">
                  {selectedTrainerForFeedback.feedback.map((item) => (
                    <div key={item.id} className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-600">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-medium text-gray-900 dark:text-white">{item.participant}</span>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <StarIcon
                              key={i}
                              className={`w-4 h-4 ${
                                i < item.rating ? 'text-yellow-500' : 'text-gray-300 dark:text-gray-600'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{item.comment}</p>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{item.date}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Evaluation Section */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <DocumentTextIcon className="w-5 h-5" />
                  Performance Evaluations
                </h4>
                <div className="space-y-4">
                                      {selectedTrainerForFeedback.evaluations.map((evaluation) => (
                      <div key={evaluation.id} className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-600">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-gray-900 dark:text-white">{evaluation.type}</span>
                          <span className="text-lg font-bold text-primary">{evaluation.score}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{ width: `${evaluation.score}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 block">{evaluation.date}</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Summary Stats */}
            <div className="mt-6 bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Summary Statistics</h4>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">{selectedTrainerForFeedback.rating}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Average Rating</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">{selectedTrainerForFeedback.sessions}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Total Sessions</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">
                    {selectedTrainerForFeedback.evaluations.length > 0 
                      ? Math.round(selectedTrainerForFeedback.evaluations.reduce((sum, evaluation) => sum + evaluation.score, 0) / selectedTrainerForFeedback.evaluations.length)
                      : 'N/A'
                    }
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Avg Evaluation Score</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainerManagement; 