import React, { useState } from 'react';
import {
  TrophyIcon,
  StarIcon,
  UserGroupIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  SparklesIcon
} from "@heroicons/react/24/outline";

const initialLeaderboard = [
  {
    id: 1,
    name: "John Doe",
    role: "Senior Counselor",
    points: 1250,
    level: "Gold",
    achievements: [
      { name: "CRM Master", points: 500 },
      { name: "Policy Expert", points: 300 },
      { name: "Perfect Attendance", points: 200 }
    ],
    recentActivity: [
      { type: "Completed", title: "Advanced CRM Training", points: 100, date: "2024-07-20" },
      { type: "Achieved", title: "Policy Expert", points: 300, date: "2024-07-15" }
    ]
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Document Verifier",
    points: 980,
    level: "Silver",
    achievements: [
      { name: "Verification Pro", points: 400 },
      { name: "Quick Learner", points: 200 }
    ],
    recentActivity: [
      { type: "Completed", title: "Document Verification Course", points: 150, date: "2024-07-18" },
      { type: "Achieved", title: "Quick Learner", points: 200, date: "2024-07-10" }
    ]
  },
  {
    id: 3,
    name: "Mike Johnson",
    role: "Junior Counselor",
    points: 750,
    level: "Bronze",
    achievements: [
      { name: "First Steps", points: 100 },
      { name: "Team Player", points: 150 }
    ],
    recentActivity: [
      { type: "Completed", title: "Basic CRM Training", points: 200, date: "2024-07-19" },
      { type: "Achieved", title: "Team Player", points: 150, date: "2024-07-12" }
    ]
  }
];

const levelThresholds = [
  { name: "Bronze", points: 500, color: "bg-yellow-100 text-yellow-800" },
  { name: "Silver", points: 1000, color: "bg-gray-100 text-gray-800" },
  { name: "Gold", points: 2000, color: "bg-yellow-100 text-yellow-800" },
  { name: "Platinum", points: 5000, color: "bg-blue-100 text-blue-800" }
];

const Gamification = () => {
  const [leaderboard, setLeaderboard] = useState(initialLeaderboard);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedAchievement, setSelectedAchievement] = useState(null);

  const handleDeleteAchievement = (id) => {
    setLeaderboard(leaderboard.filter(item => item.id !== id));
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Gamification & Leaderboard</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">Track achievements and rewards</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white dark:text-white rounded-lg hover:bg-primary-dark dark:hover:bg-primary-dark transition-colors"
        >
          <PlusIcon className="w-5 h-5" />
          Add Achievement
        </button>
      </div>

      {/* Level Thresholds */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {levelThresholds.map((level) => (
          <div key={level.name} className={`p-4 rounded-lg ${level.color} dark:bg-opacity-20 flex items-center gap-3 border border-gray-200 dark:border-gray-600`}>
            <TrophyIcon className="w-6 h-6" />
            <div>
              <div className="font-semibold text-gray-900 dark:text-white">{level.name}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">{level.points} points</div>
            </div>
          </div>
        ))}
      </div>

      {/* Leaderboard */}
      <div className="space-y-6">
        {leaderboard.map((member, index) => (
          <div key={member.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div className="flex items-start gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{index + 1}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Rank</div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{member.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{member.role}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-lg font-bold text-primary">{member.points}</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">points</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  member.level === 'Gold' ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200' :
                  member.level === 'Silver' ? 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200' :
                  member.level === 'Bronze' ? 'bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200' :
                  'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                }`}>
                  {member.level}
                </span>
                <button
                  onClick={() => setSelectedAchievement(member)}
                  className="p-1 text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary"
                >
                  <PencilIcon className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDeleteAchievement(member.id)}
                  className="p-1 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Achievements */}
            <div className="mt-6">
              <h5 className="font-medium mb-3 text-gray-900 dark:text-white">Achievements</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {member.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600">
                    <div className="flex items-center gap-2">
                      <SparklesIcon className="w-5 h-5 text-yellow-400" />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{achievement.name}</span>
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-300">+{achievement.points}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="mt-6">
              <h5 className="font-medium mb-3 text-gray-900 dark:text-white">Recent Activity</h5>
              <div className="space-y-3">
                {member.recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          activity.type === 'Completed' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' :
                          'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                        }`}>
                          {activity.type}
                        </span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{activity.title}</span>
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">{activity.date}</div>
                    </div>
                    <span className="text-sm font-medium text-primary">+{activity.points}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Achievement Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Add New Achievement</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Achievement Name</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary focus:ring-primary dark:bg-gray-700 dark:text-white"
                  placeholder="Enter achievement name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Points</label>
                <input
                  type="number"
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary focus:ring-primary dark:bg-gray-700 dark:text-white"
                  placeholder="Enter points value"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                <textarea
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary focus:ring-primary dark:bg-gray-700 dark:text-white"
                  placeholder="Enter achievement description"
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
                  Add Achievement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gamification; 