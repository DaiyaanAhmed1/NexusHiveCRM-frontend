import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  FiPlus, 
  FiEdit, 
  FiTrash2, 
  FiSave, 
  FiX,
  FiFileText,
  FiBookOpen,
  FiCheckCircle,
  FiAlertCircle,
  FiEye,
  FiEyeOff
} from 'react-icons/fi';

const initialDocs = [
  {
    id: 1,
    course: 'B.Tech Computer Science',
    document: '10th Marksheet',
    type: 'Mandatory',
    status: 'Active',
  },
  {
    id: 2,
    course: 'MBA Finance',
    document: 'Graduation Certificate',
    type: 'Mandatory',
    status: 'Active',
  },
  {
    id: 3,
    course: 'M.Sc Data Science',
    document: 'Passport Size Photo',
    type: 'Optional',
    status: 'Active',
  },
];

const docTypes = ['Mandatory', 'Optional'];
const statusTypes = ['Active', 'Inactive'];

const DocumentRequirements = () => {
  const [docs, setDocs] = useState(initialDocs);
  const [showAdd, setShowAdd] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newDoc, setNewDoc] = useState({ 
    course: '', 
    document: '', 
    type: 'Mandatory',
    status: 'Active'
  });
  const { t } = useTranslation(['admission', 'common']);

  const handleAddDoc = () => {
    if (newDoc.course && newDoc.document) {
      setDocs([
        ...docs,
        { ...newDoc, id: Date.now() },
      ]);
      setNewDoc({ course: '', document: '', type: 'Mandatory', status: 'Active' });
      setShowAdd(false);
    }
  };

  const handleEditDoc = (id) => {
    setEditingId(editingId === id ? null : id);
  };

  const handleDeleteDoc = (id) => {
    setDocs(docs.filter(doc => doc.id !== id));
  };

  const handleUpdateDoc = (id, field, value) => {
    setDocs(docs.map(doc => 
      doc.id === id ? { ...doc, [field]: value } : doc
    ));
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Mandatory':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'Optional':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'Inactive':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const mandatoryCount = docs.filter(doc => doc.type === 'Mandatory').length;
  const optionalCount = docs.filter(doc => doc.type === 'Optional').length;
  const activeCount = docs.filter(doc => doc.status === 'Active').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
            <FiFileText className="w-6 h-6 mr-2 text-blue-500" />
            {t('courseManagement.documentRequirements.title')}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {t('courseManagement.documentRequirements.subtitle')}
          </p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <FiPlus className="w-4 h-4 mr-2" />
          {t('courseManagement.documentRequirements.addDocument')}
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-lg">
              <FiAlertCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {t('courseManagement.documentRequirements.mandatoryDocuments')}
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{mandatoryCount}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
              <FiFileText className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {t('courseManagement.documentRequirements.optionalDocuments')}
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{optionalCount}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <FiCheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {t('courseManagement.documentRequirements.activeDocuments')}
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{activeCount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Documents Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {t('courseManagement.documentRequirements.courseName')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {t('courseManagement.documentRequirements.documentName')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {t('courseManagement.documentRequirements.documentType')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {t('courseManagement.documentRequirements.status')}
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {t('courseManagement.documentRequirements.actions')}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {docs.map((doc) => (
                <tr key={doc.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingId === doc.id ? (
                      <input
                        type="text"
                        value={doc.course}
                        onChange={(e) => handleUpdateDoc(doc.id, 'course', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <div className="flex items-center">
                        <FiBookOpen className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{doc.course}</span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingId === doc.id ? (
                      <input
                        type="text"
                        value={doc.document}
                        onChange={(e) => handleUpdateDoc(doc.id, 'document', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <div className="flex items-center">
                        <FiFileText className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900 dark:text-white">{doc.document}</span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingId === doc.id ? (
                      <select
                        value={doc.type}
                        onChange={(e) => handleUpdateDoc(doc.id, 'type', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {docTypes.map(type => (
                          <option key={type} value={type}>
                            {type === 'Mandatory' ? t('courseManagement.documentRequirements.mandatory') : t('courseManagement.documentRequirements.optional')}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(doc.type)}`}>
                        {doc.type === 'Mandatory' ? (
                          <FiAlertCircle className="w-3 h-3 mr-1" />
                        ) : (
                          <FiFileText className="w-3 h-3 mr-1" />
                        )}
                        {doc.type === 'Mandatory' ? t('courseManagement.documentRequirements.mandatory') : t('courseManagement.documentRequirements.optional')}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingId === doc.id ? (
                      <select
                        value={doc.status}
                        onChange={(e) => handleUpdateDoc(doc.id, 'status', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {statusTypes.map(status => (
                          <option key={status} value={status}>
                            {status === 'Active' ? t('courseManagement.documentRequirements.active') : t('courseManagement.documentRequirements.inactive')}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                        {doc.status === 'Active' ? (
                          <FiCheckCircle className="w-3 h-3 mr-1" />
                        ) : (
                          <FiX className="w-3 h-3 mr-1" />
                        )}
                        {doc.status === 'Active' ? t('courseManagement.documentRequirements.active') : t('courseManagement.documentRequirements.inactive')}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => handleEditDoc(doc.id)}
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                        title={editingId === doc.id ? t('common.save') : t('common.edit')}
                      >
                        {editingId === doc.id ? (
                          <FiSave className="w-4 h-4" />
                        ) : (
                          <FiEdit className="w-4 h-4" />
                        )}
                      </button>
                      <button
                        onClick={() => handleDeleteDoc(doc.id)}
                        className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                        title={t('common.delete')}
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Document Modal */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {t('courseManagement.documentRequirements.addNewDocument')}
              </h3>
              <button
                onClick={() => setShowAdd(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('courseManagement.documentRequirements.courseName')}
                </label>
                <input
                  type="text"
                  placeholder={t('courseManagement.documentRequirements.courseNamePlaceholder')}
                  value={newDoc.course}
                  onChange={e => setNewDoc({ ...newDoc, course: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('courseManagement.documentRequirements.documentName')}
                </label>
                <input
                  type="text"
                  placeholder={t('courseManagement.documentRequirements.documentNamePlaceholder')}
                  value={newDoc.document}
                  onChange={e => setNewDoc({ ...newDoc, document: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('courseManagement.documentRequirements.documentType')}
                </label>
                <select
                  value={newDoc.type}
                  onChange={e => setNewDoc({ ...newDoc, type: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {docTypes.map(type => (
                    <option key={type} value={type}>
                      {type === 'Mandatory' ? t('courseManagement.documentRequirements.mandatory') : t('courseManagement.documentRequirements.optional')}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowAdd(false)}
                className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                {t('common.cancel')}
              </button>
              <button
                onClick={handleAddDoc}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                {t('courseManagement.documentRequirements.addDocument')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentRequirements;