import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalization } from "../../../../hooks/useLocalization";
import {
  ChatBubbleLeftRightIcon,
  StarIcon,
  UserGroupIcon,
  ChartBarIcon,
  ClockIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  ArrowTrendingUpIcon,
  XMarkIcon
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
  const { t } = useTranslation(['admission', 'common']);
  const { isRTL } = useLocalization();
  const [feedback, setFeedback] = useState(initialFeedback);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [newFeedback, setNewFeedback] = useState({
    sessionTitle: '',
    trainer: '',
    date: '',
    participants: '',
    categories: {
      content: 0,
      delivery: 0,
      materials: 0,
      engagement: 0
    },
    comments: ''
  });

  const handleDeleteFeedback = (id) => {
    setFeedback(feedback.filter(item => item.id !== id));
  };

  const handleCategoryRating = (category, rating) => {
    setNewFeedback({
      ...newFeedback,
      categories: {
        ...newFeedback.categories,
        [category]: rating
      }
    });
  };

  const handleAddFeedback = (e) => {
    e.preventDefault();
    if (newFeedback.sessionTitle && newFeedback.trainer && newFeedback.date) {
      const averageRating = Object.values(newFeedback.categories).reduce((sum, rating) => sum + rating, 0) / 4;
      setFeedback([...feedback, { 
        ...newFeedback, 
        id: Date.now(),
        averageRating: averageRating,
        participants: parseInt(newFeedback.participants),
        comments: newFeedback.comments ? [{
          author: "Anonymous",
          rating: Math.round(averageRating),
          comment: newFeedback.comments,
          date: newFeedback.date
        }] : []
      }]);
      setNewFeedback({
        sessionTitle: '',
        trainer: '',
        date: '',
        participants: '',
        categories: {
          content: 0,
          delivery: 0,
          materials: 0,
          engagement: 0
        },
        comments: ''
      });
      setShowAddModal(false);
    }
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
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Training Feedback</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">Collect and analyze feedback from training sessions</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white dark:text-white rounded-lg hover:bg-primary-dark dark:hover:bg-primary-dark transition-colors dark:bg-blue-600 dark:hover:bg-blue-700"
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
                  className="p-1 text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-blue-500"
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
        <div className="fixed inset-0 bg-black bg-opacity-30 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Add Training Feedback</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleAddFeedback} className="p-6 space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Session Title *
                  </label>
                  <input
                    type="text"
                    value={newFeedback.sessionTitle}
                    onChange={(e) => setNewFeedback({...newFeedback, sessionTitle: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter session title"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Trainer *
                  </label>
                  <input
                    type="text"
                    value={newFeedback.trainer}
                    onChange={(e) => setNewFeedback({...newFeedback, trainer: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter trainer name"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Date *
                  </label>
                  <input
                    type="date"
                    value={newFeedback.date}
                    onChange={(e) => setNewFeedback({...newFeedback, date: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Number of Participants *
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={newFeedback.participants}
                    onChange={(e) => setNewFeedback({...newFeedback, participants: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter number of participants"
                    required
                  />
                </div>
              </div>

              {/* Category Ratings */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                  Category Ratings *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {['content', 'delivery', 'materials', 'engagement'].map((category) => (
                    <div key={category} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium capitalize text-gray-900 dark:text-white">
                          {category}
                        </span>
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          {newFeedback.categories[category] > 0 ? `${newFeedback.categories[category]}/5` : 'Not rated'}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => handleCategoryRating(category, star)}
                            className={`transition-colors ${
                              star <= newFeedback.categories[category] 
                                ? 'text-yellow-400 hover:text-yellow-500' 
                                : 'text-gray-300 dark:text-gray-600 hover:text-yellow-400 dark:hover:text-yellow-400'
                            }`}
                          >
                            <StarIcon className="w-6 h-6" />
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Comments */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Comments
                </label>
                <textarea
                  rows={4}
                  value={newFeedback.comments}
                  onChange={(e) => setNewFeedback({...newFeedback, comments: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Enter your feedback comments (optional)"
                />
              </div>

              {/* Modal Footer */}
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-6 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
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