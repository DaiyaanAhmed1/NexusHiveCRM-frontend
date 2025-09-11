import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalization } from "../../../../hooks/useLocalization";
import {
  ChartBarIcon,
  UserGroupIcon,
  AcademicCapIcon,
  DocumentCheckIcon,
  ArrowTrendingUpIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon
} from "@heroicons/react/24/outline";

const initialSkills = [
  {
    id: 1,
    name: "CRM Proficiency",
    category: "Technical",
    requiredLevel: 4,
    teamAverage: 3.2,
    gap: 0.8,
    critical: true,
    teamMembers: [
      { name: "John Doe", level: 4.5, status: "Above Required" },
      { name: "Jane Smith", level: 2.8, status: "Below Required" },
      { name: "Mike Johnson", level: 3.5, status: "Below Required" }
    ]
  },
  {
    id: 2,
    name: "Document Verification",
    category: "Process",
    requiredLevel: 4,
    teamAverage: 3.8,
    gap: 0.2,
    critical: false,
    teamMembers: [
      { name: "John Doe", level: 4.2, status: "Above Required" },
      { name: "Jane Smith", level: 3.5, status: "Below Required" },
      { name: "Mike Johnson", level: 3.7, status: "Below Required" }
    ]
  },
  {
    id: 3,
    name: "Policy Knowledge",
    category: "Knowledge",
    requiredLevel: 5,
    teamAverage: 3.5,
    gap: 1.5,
    critical: true,
    teamMembers: [
      { name: "John Doe", level: 4.0, status: "Below Required" },
      { name: "Jane Smith", level: 3.2, status: "Below Required" },
      { name: "Mike Johnson", level: 3.3, status: "Below Required" }
    ]
  }
];

const skillCategories = [
  { name: "Technical", icon: ChartBarIcon, color: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400" },
  { name: "Process", icon: DocumentCheckIcon, color: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400" },
  { name: "Knowledge", icon: AcademicCapIcon, color: "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400" },
  { name: "Soft Skills", icon: UserGroupIcon, color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400" }
];

const SkillGapAnalysis = () => {
  const { t } = useTranslation(['admission', 'common']);
  const { isRTL } = useLocalization();
  const [skills, setSkills] = useState(initialSkills);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [newSkill, setNewSkill] = useState({
    name: '',
    category: 'Technical',
    requiredLevel: 3,
    critical: false
  });

  const handleDeleteSkill = (id) => {
    setSkills(skills.filter(skill => skill.id !== id));
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (newSkill.name && newSkill.category && newSkill.requiredLevel) {
      setSkills([...skills, { 
        ...newSkill, 
        id: Date.now(),
        teamAverage: 0,
        gap: newSkill.requiredLevel,
        teamMembers: []
      }]);
      setNewSkill({
        name: '',
        category: 'Technical',
        requiredLevel: 3,
        critical: false
      });
      setShowAddModal(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Skill Gap Analysis</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">Track and manage team skill levels</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white dark:text-white rounded-lg hover:bg-primary-dark dark:hover:bg-primary-dark transition-colors dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          <PlusIcon className="w-5 h-5" />
          Add Skill
        </button>
      </div>

      {/* Skill Categories */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {skillCategories.map((category) => (
          <div key={category.name} className={`p-4 rounded-lg ${category.color} flex items-center gap-3`}>
            <category.icon className="w-6 h-6" />
            <span className="font-medium">{category.name}</span>
          </div>
        ))}
      </div>

      {/* Skills List */}
      <div className="space-y-4">
        <h4 className="font-semibold text-gray-900 dark:text-white">Skills Assessment</h4>
        <div className="grid gap-4">
          {skills.map((skill) => (
            <div key={skill.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h5 className="font-semibold text-gray-900 dark:text-white">{skill.name}</h5>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center gap-1">
                      <ChartBarIcon className="w-4 h-4" />
                      {skill.category}
                    </div>
                    <div className="flex items-center gap-1">
                      <ArrowTrendingUpIcon className="w-4 h-4" />
                      Gap: {skill.gap}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    skill.critical ? 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400' : 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400'
                  }`}>
                    {skill.critical ? 'Critical' : 'Standard'}
                  </span>
                  <button
                    onClick={() => setSelectedSkill(skill)}
                    className="p-1 text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-blue-500"
                  >
                    <PencilIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteSkill(skill.id)}
                    className="p-1 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Skill Levels */}
              <div className="mt-4">
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-2">
                  <span>Required: {skill.requiredLevel}</span>
                  <span>Team Average: {skill.teamAverage}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full dark:bg-blue-500"
                    style={{ width: `${(skill.teamAverage / 5) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Team Members */}
              <div className="mt-4">
                <h6 className="font-medium text-gray-900 dark:text-white mb-2">Team Members</h6>
                <div className="space-y-2">
                  {skill.teamMembers.map((member, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded">
                      <span className="text-sm text-gray-900 dark:text-white">{member.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-600 dark:text-gray-300">Level {member.level}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          member.status === 'Above Required' ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400' :
                          'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400'
                        }`}>
                          {member.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add/Edit Skill Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Add New Skill</h3>
            <form onSubmit={handleAddSkill} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Skill Name</label>
                <input
                  type="text"
                  value={newSkill.name}
                  onChange={(e) => setNewSkill({...newSkill, name: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-primary focus:ring-primary dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="Enter skill name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
                <select 
                  value={newSkill.category}
                  onChange={(e) => setNewSkill({...newSkill, category: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-primary focus:ring-primary dark:focus:border-blue-500 dark:focus:ring-blue-500"
                >
                  {skillCategories.map(category => (
                    <option key={category.name} value={category.name}>{category.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Required Level (1-5)</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  step="0.1"
                  value={newSkill.requiredLevel}
                  onChange={(e) => setNewSkill({...newSkill, requiredLevel: parseFloat(e.target.value)})}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-primary focus:ring-primary dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  required
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="critical"
                  checked={newSkill.critical}
                  onChange={(e) => setNewSkill({...newSkill, critical: e.target.checked})}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:focus:ring-blue-500"
                />
                <label htmlFor="critical" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Mark as Critical Skill
                </label>
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
                  Add Skill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillGapAnalysis;