import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { acceptCase } from '../../../../redux/features/caseSlice';

const CaseManagementSection = ({ cases = [], loading, error, allowAccept = false, onAccept }) => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.user);

  const handleAccept = (caseId) => {
    if (!profile?.id) return;
    if (onAccept) {
      onAccept(caseId);
    } else {
      dispatch(acceptCase({ caseId, lawyerId: profile.id }));
    }
  };

  // ✅ Only show claimed cases unless allowAccept is true
  const filteredCases = allowAccept
    ? cases
    : (cases || []).filter((c) => c.status === 'claimed');

  return (
    <div>
      <h2 className="text-2xl font-semibold text-primary-light mb-4">
        {allowAccept ? 'Available Cases' : 'Case Management'}
      </h2>

      {loading ? (
        <p className="text-gray-300">Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : filteredCases.length === 0 ? (
        <p className="text-gray-400">
          {allowAccept
            ? 'No open cases matching your expertise at the moment.'
            : 'You have no active claimed cases yet.'}
        </p>
      ) : (
        <ul className="space-y-4">
          {filteredCases.map((caseItem) => (
            <li key={caseItem.id} className="bg-secondary-light p-4 rounded-lg shadow">
              <h3 className="text-xl font-bold text-primary">{caseItem.title}</h3>
              <p className="text-white mt-1">Description: {caseItem.description}</p>
              <p className="text-white mt-1">Court: {caseItem.court}</p>
              <p className="text-white mt-1">Budget: R{caseItem.budget}</p>
              <p className="text-white mt-1">Type: {caseItem.case_type}</p>
              <p className="text-white mt-1">Status: {caseItem.status}</p>

              {caseItem.status === 'open' && allowAccept && (
                <div className="mt-4">
                  <button
                    onClick={() => handleAccept(caseItem.id)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                  >
                    Accept Case
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
