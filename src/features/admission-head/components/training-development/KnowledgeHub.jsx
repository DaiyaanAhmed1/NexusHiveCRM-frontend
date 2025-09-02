import React, { useState } from 'react';
import {
  BookOpenIcon,
  DocumentTextIcon,
  VideoCameraIcon,
  PresentationChartLineIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  ArrowDownTrayIcon,
  EyeIcon,
  UserIcon
} from "@heroicons/react/24/outline";

const initialResources = [
  {
    id: 1,
    title: "CRM User Guide 2024",
    type: "Document",
    category: "Technical",
    format: "PDF",
    size: "2.4 MB",
    uploadDate: "2024-07-01",
    downloads: 45,
    views: 120,
    tags: ["CRM", "Guide", "Technical"],
    description: "Comprehensive guide for using the CRM system effectively.",
    status: "Published",
    author: "Admin"
  },
  {
    id: 2,
    title: "Admission Process Walkthrough",
    type: "Video",
    category: "Process",
    format: "MP4",
    size: "156 MB",
    uploadDate: "2024-06-15",
    downloads: 32,
    views: 98,
    tags: ["Process", "Video", "Training"],
    description: "Step-by-step video guide for the admission process.",
    status: "Published",
    author: "Admin"
  },
  {
    id: 3,
    title: "Policy Updates Q3 2024",
    type: "Presentation",
    category: "Policy",
    format: "PPTX",
    size: "8.7 MB",
    uploadDate: "2024-07-10",
    downloads: 28,
    views: 85,
    tags: ["Policy", "Updates", "Q3"],
    description: "Latest policy updates and changes for Q3 2024.",
    status: "Published",
    author: "Admin"
  }
];

const resourceTypes = [
  { name: "Document", icon: DocumentTextIcon, color: "bg-blue-100 text-blue-800" },
  { name: "Video", icon: VideoCameraIcon, color: "bg-red-100 text-red-800" },
  { name: "Presentation", icon: PresentationChartLineIcon, color: "bg-purple-100 text-purple-800" },
  { name: "Guide", icon: BookOpenIcon, color: "bg-green-100 text-green-800" }
];

const KnowledgeHub = () => {
  const [resources, setResources] = useState(initialResources);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleDeleteResource = (id) => {
    setResources(resources.filter(resource => resource.id !== id));
  };

  const filteredResources = resources.filter(resource =>
    resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="p-6 space-y-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Knowledge Hub</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">Access training resources and documentation</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white dark:text-white rounded-lg hover:bg-primary-dark dark:hover:bg-primary-dark transition-colors"
        >
          <PlusIcon className="w-5 h-5" />
          Add Resource
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
        <input
          type="text"
          placeholder="Search resources..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
        />
      </div>

      {/* Resources Grid */}
      <div className="grid gap-4">
        {filteredResources.map((resource) => (
          <div key={resource.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{resource.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{resource.description}</p>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <UserIcon className="w-4 h-4" />
                    {resource.author}
                  </span>
                  <span>{resource.uploadDate}</span>
                  <span>{resource.size}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedResource(resource)}
                  className="p-1 text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary"
                >
                  <PencilIcon className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDeleteResource(resource.id)}
                  className="p-1 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {resourceTypes.find(type => type.name === resource.type)?.icon && (
                  <div className={`p-2 rounded-lg ${resourceTypes.find(type => type.name === resource.type)?.color} dark:bg-opacity-20`}>
                    {React.createElement(resourceTypes.find(type => type.name === resource.type)?.icon, { className: "w-5 h-5" })}
                  </div>
                )}
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{resource.type}</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <EyeIcon className="w-4 h-4" />
                  {resource.views}
                </span>
                <span className="flex items-center gap-1">
                  <ArrowDownTrayIcon className="w-4 h-4" />
                  {resource.downloads}
                </span>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {resource.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Resource Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Upload Resource</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Resource Title</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary focus:ring-primary dark:bg-gray-700 dark:text-white"
                  placeholder="Enter resource title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                <textarea
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary focus:ring-primary dark:bg-gray-700 dark:text-white"
                  placeholder="Enter resource description"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
                <select className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary focus:ring-primary dark:bg-gray-700 dark:text-white">
                  <option value="">Select category</option>
                  <option value="Technical">Technical</option>
                  <option value="Process">Process</option>
                  <option value="Policy">Policy</option>
                  <option value="Training">Training</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tags</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary focus:ring-primary dark:bg-gray-700 dark:text-white"
                  placeholder="Enter tags separated by commas"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">File Upload</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md dark:bg-gray-700">
                  <div className="space-y-1 text-center">
                    <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
                    <div className="flex text-sm text-gray-600 dark:text-gray-400">
                      <label className="relative cursor-pointer bg-white dark:bg-gray-600 rounded-md font-medium text-primary hover:text-primary-dark dark:text-primary-light">
                        <span>Upload a file</span>
                        <input type="file" className="sr-only" />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">PDF, MP4, PPTX up to 10MB</p>
                  </div>
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
                  className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-dark"
                >
                  Upload Resource
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default KnowledgeHub; 