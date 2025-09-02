import React, { useState } from 'react';
import {
  ChatBubbleLeftRightIcon,
  StarIcon,
  UserGroupIcon,
  ChartBarIcon,
  ClockIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  ArrowTrendingUpIcon
} from "@heroicons/react/24/outline";

const initialFeedback = [
  {
    id: 1,
    sessionTitle: "CRM Masterclass",
    trainer: "Dr. Noura Al-Zahra",
    date: "2024-07-15",
    participants: 15,
    averageRating: 4.7,
    categories: {
      content: 4.8,
      delivery: 4.6,
      materials: 4.7,
      engagement: 4.8
    },
    comments: [
      {
        author: "John Doe",
        rating: 5,
        comment: "Excellent session! The practical examples were very helpful.",
        date: "2024-07-15"
      },
      {
        author: "Jane Smith",
        rating: 4,
        comment: "Good content, but could use more hands-on practice.",
        date: "2024-07-15"
      }
    ]
  },
  {
    id: 2,
    sessionTitle: "Policy Update Training",
    trainer: "Michael Chen",
    date: "2024-07-10",
    participants: 20,
    averageRating: 4.5,
    categories: {
      content: 4.6,
      delivery: 4.4,
      materials: 4.5,
      engagement: 4.5
    },
    comments: [
      {
        author: "Mike Johnson",
        rating: 5,
        comment: "Very informative session. Clear explanations of policy changes.",
        date: "2024-07-10"
      }
    ]
  }
];

const TrainingFeedback = () => {
  const [feedback, setFeedback] = useState(initialFeedback);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  const handleDeleteFeedback = (id) => {
    setFeedback(feedback.filter(item => item.id !== id));
  };

  const renderRatingStars = (rating) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <StarIcon
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Training Feedback</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">Collect and analyze feedback from training sessions</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white dark:text-white rounded-lg hover:bg-primary-dark dark:hover:bg-primary-dark transition-colors"
        >
          <PlusIcon className="w-5 h-5" />
          Add Feedback
        </button>
      </div>

      {/* Feedback List */}
      <div className="grid gap-6">
        {feedback.map((item) => (
          <div key={item.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{item.sessionTitle}</h4>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-600 dark:text-gray-300">
                  <div className="flex items-center gap-1">
                    <UserGroupIcon className="w-4 h-4" />
                    {item.trainer}
                  </div>
                  <div className="flex items-center gap-1">
                    <ClockIcon className="w-4 h-4" />
                    {item.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <UserGroupIcon className="w-4 h-4" />
                    {item.participants} participants
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedFeedback(item)}
                  className="p-1 text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary"
                >
                  <PencilIcon className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDeleteFeedback(item.id)}
                  className="p-1 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Rating Categories */}
            <div className="mt-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl font-semibold text-gray-900 dark:text-white">{item.averageRating}</span>
                {renderRatingStars(Math.round(item.averageRating))}
                <span className="text-sm text-gray-600 dark:text-gray-300">Average Rating</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(item.categories).map(([category, rating]) => (
                  <div key={category} className="p-3 bg-gray-50 dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600">
                    <div className="text-sm font-medium capitalize text-gray-900 dark:text-white">{category}</div>
                    <div className="flex items-center gap-1 mt-1">
                      {renderRatingStars(Math.round(rating))}
                      <span className="text-sm text-gray-600 dark:text-gray-300">({rating})</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Comments */}
            <div className="mt-6">
              <h5 className="font-medium mb-3 text-gray-900 dark:text-white">Comments</h5>
              <div className="space-y-4">
                {item.comments.map((comment, index) => (
                  <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">{comment.author}</div>
                        <div className="flex items-center gap-2 mt-1">
                          {renderRatingStars(comment.rating)}
                          <span className="text-sm text-gray-600 dark:text-gray-300">{comment.date}</span>
                        </div>
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{comment.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Feedback Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Add Training Feedback</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Session Title</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary focus:ring-primary dark:bg-gray-700 dark:text-white"
                  placeholder="Enter session title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Trainer</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary focus:ring-primary dark:bg-gray-700 dark:text-white"
                  placeholder="Enter trainer name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Date</label>
                <input
                  type="date"
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary focus:ring-primary dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Number of Participants</label>
                <input
                  type="number"
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary focus:ring-primary dark:bg-gray-700 dark:text-white"
                  placeholder="Enter number of participants"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category Ratings</label>
                <div className="mt-2 space-y-3">
                  {['content', 'delivery', 'materials', 'engagement'].map((category) => (
                    <div key={category} className="flex items-center justify-between">
                      <span className="text-sm font-medium capitalize text-gray-900 dark:text-white">{category}</span>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            className="text-gray-300 hover:text-yellow-400 dark:text-gray-600 dark:hover:text-yellow-400"
                          >
                            <StarIcon className="w-5 h-5" />
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Comments</label>
                <textarea
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary focus:ring-primary dark:bg-gray-700 dark:text-white"
                  placeholder="Enter your feedback comments"
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
                  Submit Feedback
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainingFeedback; 