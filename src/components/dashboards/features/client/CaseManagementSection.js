import React, { useState } from 'react';

const CaseManagementSection = ({ cases, onCreate, onUpdate, onDelete, loading, error }) => {
  const [caseData, setCaseData] = useState({ title: '', description: '', lawyer_id: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCaseData({ ...caseData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(caseData);
    setCaseData({ title: '', description: '', lawyer_id: '' });
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-primary-light mb-4">Case Management</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-secondary-light mb-2">Title</label>
              <input
                type="text"
                name="title"
                value={caseData.title}
                onChange={handleChange}
                className="w-full p-2 rounded-lg bg-secondary-light text-primary"
              />
            </div>
            <div className="mb-4">
              <label className="block text-secondary-light mb-2">Description</label>
              <textarea
                name="description"
                value={caseData.description}
                onChange={handleChange}
                className="w-full p-2 rounded-lg bg-secondary-light text-primary"
              />
            </div>
            <div className="mb-4">
              <label className="block text-secondary-light mb-2">Lawyer ID</label>
              <input
                type="text"
                name="lawyer_id"
                value={caseData.lawyer_id}
                onChange={handleChange}
                className="w-full p-2 rounded-lg bg-secondary-light text-primary"
              />
            </div>
            <button type="submit" className="bg-primary text-secondary px-4 py-2 rounded hover:bg-primary-light">
              Create Case
            </button>
          </form>
          <ul className="mt-4">
            {cases.map((caseItem) => (
              <li key={caseItem.id} className="mb-2">
                <div className="bg-secondary-light p-4 rounded-lg shadow-lg">
                  <h3 className="text-xl font-bold text-primary">{caseItem.title}</h3>
                  <p className="text-white">{caseItem.description}</p>
                  <p className="text-white">Lawyer ID: {caseItem.lawyer_id}</p>
                  <button onClick={() => onUpdate(caseItem.id, caseData)} className="bg-primary text-secondary px-4 py-2 rounded hover:bg-primary-light">
                    Update
                  </button>
                  <button onClick={() => onDelete(caseItem.id)} className="bg-red-500 text-secondary px-4 py-2 rounded hover:bg-red-700 ml-2">
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CaseManagementSection;