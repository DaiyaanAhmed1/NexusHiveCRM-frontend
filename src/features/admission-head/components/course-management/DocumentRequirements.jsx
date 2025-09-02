import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

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

const DocumentRequirements = () => {
  const [docs, setDocs] = useState(initialDocs);
  const [showAdd, setShowAdd] = useState(false);
  const [newDoc, setNewDoc] = useState({ course: '', document: '', type: 'Mandatory' });
  const { t } = useTranslation();

  const handleAddDoc = () => {
    setDocs([
      ...docs,
      { ...newDoc, id: Date.now(), status: 'Active' },
    ]);
    setNewDoc({ course: '', document: '', type: 'Mandatory' });
    setShowAdd(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Document Requirements</h2>
        <button
          onClick={() => setShowAdd(true)}
          className="bg-primary text-white px-4 py-2 rounded-lg shadow hover:bg-primary-dark"
        >
          + Add Document
        </button>
      </div>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Course</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Document</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {docs.map(doc => (
              <tr key={doc.id}>
                <td className="px-6 py-4 whitespace-nowrap">{doc.course}</td>
                <td className="px-6 py-4 whitespace-nowrap">{doc.document}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${doc.type === 'Mandatory' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>{doc.type}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">{doc.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Add Document Modal */}
      {showAdd && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Add New Document</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Course Name"
                value={newDoc.course}
                onChange={e => setNewDoc({ ...newDoc, course: e.target.value })}
                className="w-full border rounded px-3 py-2"
              />
              <input
                type="text"
                placeholder="Document Name"
                value={newDoc.document}
                onChange={e => setNewDoc({ ...newDoc, document: e.target.value })}
                className="w-full border rounded px-3 py-2"
              />
              <select
                value={newDoc.type}
                onChange={e => setNewDoc({ ...newDoc, type: e.target.value })}
                className="w-full border rounded px-3 py-2"
              >
                {docTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setShowAdd(false)}
                className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleAddDoc}
                className="px-4 py-2 rounded bg-primary text-white hover:bg-primary-dark"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentRequirements; 