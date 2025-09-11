import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalization } from "../../../../hooks/useLocalization";
import {
  UserGroupIcon,
  AcademicCapIcon,
  DocumentCheckIcon,
  ClockIcon,
  ChartBarIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  ArrowPathIcon,
  CalendarIcon
} from "@heroicons/react/24/outline";

const initialCertifications = [
  {
    id: 1,
    name: "CRM Expert Certification",
    type: "Technical",
    validity: "2 years",
    requirements: [
      "Complete CRM Masterclass",
      "Pass Assessment Test",
      "Handle 50 Applications"
    ],
    teamMembers: [
      {
        name: "John Doe",
        status: "Certified",
        issueDate: "2024-01-15",
        expiryDate: "2026-01-15",
        score: 95
      },
      {
        name: "Jane Smith",
        status: "In Progress",
        progress: 60,
        remainingRequirements: ["Handle 50 Applications"]
      },
      {
        name: "Mike Johnson",
        status: "Not Started"
      }
    ],
    expiryDate: "2026-01-15",
    participants: 15,
    status: "Active"
  },
  {
    id: 2,
    name: "Document Verification Specialist",
    type: "Process",
    validity: "1 year",
    requirements: [
      "Complete Verification Training",
      "Pass Quality Assessment",
      "Process 100 Documents"
    ],
    teamMembers: [
      {
        name: "John Doe",
        status: "Certified",
        issueDate: "2024-03-01",
        expiryDate: "2025-03-01",
        score: 92
      },
      {
        name: "Jane Smith",
        status: "Certified",
        issueDate: "2024-02-15",
        expiryDate: "2025-02-15",
        score: 88
      },
      {
        name: "Mike Johnson",
        status: "In Progress",
        progress: 75,
        remainingRequirements: ["Process 100 Documents"]
      }
    ],
    expiryDate: "2025-03-01",
    participants: 10,
    status: "Inactive"
  }
];

const ProgressTracking = () => {
  const { t } = useTranslation(['admission', 'common']);
  const { isRTL } = useLocalization();
  const [certifications, setCertifications] = useState(initialCertifications);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCertification, setSelectedCertification] = useState(null);
  const [newCertification, setNewCertification] = useState({
    name: '',
    type: 'Technical',
    validity: '',
    requirements: []
  });
  const [newRequirement, setNewRequirement] = useState('');

  const handleDeleteCertification = (id) => {
    setCertifications(certifications.filter(cert => cert.id !== id));
  };

  const handleAddRequirement = () => {
    if (newRequirement.trim()) {
      setNewCertification({
        ...newCertification,
        requirements: [...newCertification.requirements, newRequirement.trim()]
      });
      setNewRequirement('');
    }
  };

  const handleRemoveRequirement = (index) => {
    setNewCertification({
      ...newCertification,
      requirements: newCertification.requirements.filter((_, i) => i !== index)
    });
  };

  const handleAddCertification = (e) => {
    e.preventDefault();
    if (newCertification.name && newCertification.type && newCertification.validity && newCertification.requirements.length > 0) {
      setCertifications([...certifications, { 
        ...newCertification, 
        id: Date.now(),
        teamMembers: [],
        expiryDate: '',
        participants: 0,
        status: 'Active'
      }]);
      setNewCertification({
        name: '',
        type: 'Technical',
        validity: '',
        requirements: []
      });
      setShowAddModal(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Progress Tracking</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">Monitor training progress and certifications</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white dark:text-white rounded-lg hover:bg-primary-dark dark:hover:bg-primary-dark transition-colors dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          <PlusIcon className="w-5 h-5" />
          Add Certification
        </button>
      </div>

      {/* Certifications List */}
      <div className="space-y-4">
        <h4 className="font-semibold text-gray-900 dark:text-white">Active Certifications</h4>
        <div className="grid gap-4">
          {certifications.map((certification) => (
            <div key={certification.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{certification.name}</h4>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center gap-1">
                      <CalendarIcon className="w-4 h-4" />
                      Expires: {certification.expiryDate}
                    </div>
                    <div className="flex items-center gap-1">
                      <UserGroupIcon className="w-4 h-4" />
                      {certification.participants} Participants
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    certification.status === 'Active' ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400' : 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400'
                  }`}>
                    {certification.status}
                  </span>
                  <button
                    onClick={() => setSelectedCertification(certification)}
                    className="p-1 text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-blue-500"
                  >
                    <PencilIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteCertification(certification.id)}
                    className="p-1 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Requirements */}
              <div className="mt-4">
                <h5 className="font-medium text-gray-900 dark:text-white mb-2">Requirements</h5>
                <div className="space-y-1">
                  {certification.requirements.map((requirement, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <DocumentCheckIcon className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                      {requirement}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add/Edit Certification Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Add New Certification</h3>
            <form onSubmit={handleAddCertification} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Certification Name</label>
                <input
                  type="text"
                  value={newCertification.name}
                  onChange={(e) => setNewCertification({...newCertification, name: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-primary focus:ring-primary dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="Enter certification name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Type</label>
                <select 
                  value={newCertification.type}
                  onChange={(e) => setNewCertification({...newCertification, type: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-primary focus:ring-primary dark:focus:border-blue-500 dark:focus:ring-blue-500"
                >
                  <option value="Technical">Technical</option>
                  <option value="Process">Process</option>
                  <option value="Knowledge">Knowledge</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Validity Period</label>
                <input
                  type="text"
                  value={newCertification.validity}
                  onChange={(e) => setNewCertification({...newCertification, validity: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-primary focus:ring-primary dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="e.g., 1 year"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Requirements</label>
                <div className="mt-2 space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newRequirement}
                      onChange={(e) => setNewRequirement(e.target.value)}
                      className="flex-1 rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-primary focus:ring-primary dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      placeholder="Add requirement"
                    />
                    <button
                      type="button"
                      onClick={handleAddRequirement}
                      className="p-2 text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-blue-500"
                    >
                      <PlusIcon className="w-5 h-5" />
                    </button>
                  </div>
                  {newCertification.requirements.length > 0 && (
                    <div className="space-y-1">
                      {newCertification.requirements.map((requirement, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded">
                          <span className="text-sm text-gray-900 dark:text-white">{requirement}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveRequirement(index)}
                            className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                          >
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
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
                  className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-dark dark:bg-blue-600 dark:hover:bg-blue-700"
                >
                  Add Certification
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressTracking;