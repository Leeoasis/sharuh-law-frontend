import React from 'react';

const CaseManagementSection = ({ cases, loading, error }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-primary-light mb-4">Case Management</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : cases.length === 0 ? (
        <p className="text-gray-400">No cases assigned to you yet.</p>
      ) : (
        <ul className="space-y-4">
          {cases.map((caseItem) => (
            <li key={caseItem.id} className="bg-secondary-light p-4 rounded-lg shadow">
              <h3 className="text-xl font-bold text-primary">{caseItem.title}</h3>
              <p className="text-white">Description: {caseItem.description}</p>
              <p className="text-white">Status: {caseItem.status}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CaseManagementSection;


