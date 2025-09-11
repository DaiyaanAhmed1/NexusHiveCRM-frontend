import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalization } from "../../../../hooks/useLocalization";
import {
  DocumentArrowUpIcon,
  DocumentTextIcon,
  VideoCameraIcon,
  PresentationChartLineIcon,
  UserGroupIcon,
  ClockIcon,
  PlusIcon,
  TrashIcon,
  PencilIcon
} from "@heroicons/react/24/outline";

const initialModules = [
  {
    id: 1,
    title: "Policy Training 2025",
    type: "Document",
    format: "PDF",
    size: "2.4 MB",
    assignedTo: ["Foreign Applicants Team"],
    releaseDate: "2024-08-01",
    status: "Draft",
    icon: DocumentTextIcon
  },
  {
    id: 2,
    title: "CRM Masterclass",
    type: "Video",
    format: "MP4",
    size: "156 MB",
    assignedTo: ["All Counselors"],
    releaseDate: "2024-07-25",
    status: "Published",
    icon: VideoCameraIcon
  },
  {
    id: 3,
    title: "Admission Process Flow",
    type: "Presentation",
    format: "PPTX",
    size: "8.7 MB",
    assignedTo: ["New Joiners"],
    releaseDate: "2024-07-20",
    status: "Published",
    icon: PresentationChartLineIcon
  }
];

const moduleTypes = [
  { name: "Document", icon: DocumentTextIcon, color: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400" },
  { name: "Video", icon: VideoCameraIcon, color: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400" },
  { name: "Presentation", icon: PresentationChartLineIcon, color: "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400" },
  { name: "Quiz", icon: DocumentTextIcon, color: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400" }
];

const TrainingModules = () => {
  const { t } = useTranslation(['admission', 'common']);
  const { isRTL } = useLocalization();
  const [modules, setModules] = useState(initialModules);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedModule, setSelectedModule] = useState(null);
  const [newModule, setNewModule] = useState({
    title: '',
    type: 'Document',
    releaseDate: '',
    assignedTo: [],
    mandatory: false
  });

  const handleDeleteModule = (id) => {
    setModules(modules.filter(module => module.id !== id));
  };

  const handleAddModule = (e) => {
    e.preventDefault();
    if (newModule.title && newModule.releaseDate) {
      setModules([...modules, { 
        ...newModule, 
        id: Date.now(),
        format: newModule.type === 'Document' ? 'PDF' : newModule.type === 'Video' ? 'MP4' : 'PPTX',
        size: '0 MB',
        status: 'Draft',
        icon: newModule.type === 'Document' ? DocumentTextIcon : 
              newModule.type === 'Video' ? VideoCameraIcon : PresentationChartLineIcon
      }]);
      setNewModule({
        title: '',
        type: 'Document',
        releaseDate: '',
        assignedTo: [],
        mandatory: false
      });
      setShowAddModal(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Training Modules</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">Upload and manage training materials</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white dark:text-white rounded-lg hover:bg-primary-dark dark:hover:bg-primary-dark transition-colors dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          <PlusIcon className="w-5 h-5" />
          Upload Module
        </button>
      </div>

      {/* Module Types */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {moduleTypes.map((type) => (
          <div key={type.name} className={`p-4 rounded-lg ${type.color} flex items-center gap-3`}>
            <type.icon className="w-6 h-6" />
            <span className="font-medium">{type.name}</span>
          </div>
        ))}
      </div>

      {/* Modules List */}
      <div className="space-y-4">
        <h4 className="font-semibold text-gray-900 dark:text-white">Available Modules</h4>
        <div className="grid gap-4">
          {modules.map((module) => (
            <div key={module.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${
                    module.type === 'Document' ? 'bg-blue-100 dark:bg-blue-900/20' : 
                    module.type === 'Video' ? 'bg-red-100 dark:bg-red-900/20' : 
                    'bg-purple-100 dark:bg-purple-900/20'
                  }`}>
                    <module.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900 dark:text-white">{module.title}</h5>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-600 dark:text-gray-300">
                      <div className="flex items-center gap-1">
                        <DocumentArrowUpIcon className="w-4 h-4" />
                        {module.format} ({module.size})
                      </div>
                      <div className="flex items-center gap-1">
                        <ClockIcon className="w-4 h-4" />
                        Release: {module.releaseDate}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    module.status === 'Published' ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400' : 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400'
                  }`}>
                    {module.status}
                  </span>
                  <button
                    onClick={() => setSelectedModule(module)}
                    className="p-1 text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-blue-500"
                  >
                    <PencilIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteModule(module.id)}
                    className="p-1 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="mt-3 text-sm text-gray-600 dark:text-gray-300">
                <div className="flex items-center gap-1">
                  <UserGroupIcon className="w-4 h-4" />
                  Assigned to: {module.assignedTo.join(', ')}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add/Edit Module Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Upload Training Module</h3>
            <form onSubmit={handleAddModule} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
                <input
                  type="text"
                  value={newModule.title}
                  onChange={(e) => setNewModule({...newModule, title: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-primary focus:ring-primary dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="Enter module title"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Type</label>
                <select 
                  value={newModule.type}
                  onChange={(e) => setNewModule({...newModule, type: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-primary focus:ring-primary dark:focus:border-blue-500 dark:focus:ring-blue-500"
                >
                  {moduleTypes.map(type => (
                    <option key={type.name} value={type.name}>{type.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">File</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md hover:border-gray-400 dark:hover:border-gray-500 transition-colors">
                  <div className="space-y-1 text-center">
                    <DocumentArrowUpIcon className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
                    <div className="flex text-sm text-gray-600 dark:text-gray-300">
                      <label className="relative cursor-pointer bg-white dark:bg-gray-700 rounded-md font-medium text-primary hover:text-primary-dark dark:text-blue-500 dark:hover:text-blue-600">
                        <span>Upload a file</span>
                        <input type="file" className="sr-only" />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">PDF, MP4, PPTX up to 200MB</p>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Release Date</label>
                <input
                  type="date"
                  value={newModule.releaseDate}
                  onChange={(e) => setNewModule({...newModule, releaseDate: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-primary focus:ring-primary dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Assign To</label>
                <select 
                  multiple 
                  value={newModule.assignedTo}
                  onChange={(e) => setNewModule({...newModule, assignedTo: Array.from(e.target.selectedOptions, option => option.value)})}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-primary focus:ring-primary dark:focus:border-blue-500 dark:focus:ring-blue-500"
                >
                  <option value="all">All Staff</option>
                  <option value="counselors">Counselors</option>
                  <option value="verifiers">Document Verifiers</option>
                  <option value="managers">Managers</option>
                </select>
              </div>
              <div className="flex items-center">
                <input
                  id="mandatory"
                  name="mandatory"
                  type="checkbox"
                  checked={newModule.mandatory}
                  onChange={(e) => setNewModule({...newModule, mandatory: e.target.checked})}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:focus:ring-blue-500"
                />
                <label htmlFor="mandatory" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Mandatory Training
                </label>
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
                  className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-dark dark:bg-blue-600 dark:hover:bg-blue-700"
                >
                  Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainingModules;