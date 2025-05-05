import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { acceptCase } from '../../../../redux/features/caseSlice';

const CaseManagementSection = ({ cases, loading, error }) => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.user);

  const handleAccept = (caseId) => {
    if (!profile?.id) return;
    dispatch(acceptCase({ caseId, lawyerId: profile.id }));
  };

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

              {caseItem.status === 'open' && (
                <div className="mt-4">
                  <button
                    onClick={() => handleAccept(caseItem.id)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                  >
                    Accept
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CaseManagementSection;
