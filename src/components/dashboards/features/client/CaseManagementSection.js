import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createCase } from '../../../../redux/features/caseSlice';

const courts = ["Supreme Court", "High Court", "Magistrate Court", "Family Court", "Commercial Court"];
const caseTypes = ["Criminal Law", "Family Law", "Corporate Law", "Intellectual Property", "Labor Law"];

const CaseManagementSection = ({ userId, cases, onUpdate, onDelete, loading, error }) => {
  const [caseData, setCaseData] = useState({ title: '', description: '', preferred_court: '', budget: '', areas_of_expertise: '' });
  const [matchingLawyers, setMatchingLawyers] = useState([]);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCaseData({ ...caseData, [name]: value });
  };

  const handleCreateCase = (e) => {
    e.preventDefault();
    if (!userId) {
      alert("User ID is missing");
      return;
    }
    dispatch(createCase({ userId, caseData }));
    setCaseData({ title: '', description: '', preferred_court: '', budget: '', areas_of_expertise: '' });
    setMatchingLawyers([]);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-primary-light mb-4">Describe Your Case</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div>
          <form onSubmit={handleCreateCase}>
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
              <label className="block text-secondary-light mb-2">Preferred Court</label>
              <select
                name="preferred_court"
                value={caseData.preferred_court}
                onChange={handleChange}
                className="w-full p-2 rounded-lg bg-secondary-light text-primary"
              >
                <option value="">Select Court</option>
                {courts.map((court, index) => (
                  <option key={index} value={court}>{court}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-secondary-light mb-2">Budget</label>
              <input
                type="number"
                name="budget"
                value={caseData.budget}
                onChange={handleChange}
                className="w-full p-2 rounded-lg bg-secondary-light text-primary"
              />
            </div>
            <div className="mb-4">
              <label className="block text-secondary-light mb-2">Case Type</label>
              <select
                name="areas_of_expertise"
                value={caseData.areas_of_expertise}
                onChange={handleChange}
                className="w-full p-2 rounded-lg bg-secondary-light text-primary"
              >
                <option value="">Select Case Type</option>
                {caseTypes.map((type, index) => (
                  <option key={index} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <button type="submit" className="bg-primary text-secondary px-4 py-2 rounded hover:bg-primary-light">
              Create Case
            </button>
          </form>
          {matchingLawyers.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold text-primary-light mb-4">Matching Lawyers</h3>
              <ul>
                {matchingLawyers.map((lawyer) => (
                  <li key={lawyer.id} className="mb-2">
                    <div className="bg-secondary-light p-4 rounded-lg shadow-lg">
                      <h4 className="text-lg font-bold text-primary">{lawyer.name}</h4>
                      <p className="text-white">Expertise: {lawyer.areas_of_expertise}</p>
                      <p className="text-white">Court: {lawyer.preferred_court}</p>
                      <p className="text-white">Rate: {lawyer.rate}</p>
                      <button onClick={() => handleCreateCase(lawyer.id)} className="bg-primary text-secondary px-4 py-2 rounded hover:bg-primary-light">
                        Accept Case
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <ul className="mt-4">
            {cases.map((caseItem) => (
              <li key={caseItem.id} className="mb-2">
                <div className="bg-secondary-light p-4 rounded-lg shadow-lg">
                  <h3 className="text-xl font-bold text-primary">{caseItem.title}</h3>
                  <p className="text-white">{caseItem.description}</p>
                  <p className="text-white">Court: {caseItem.preferred_court}</p>
                  <p className="text-white">Budget: {caseItem.budget}</p>
                  <p className="text-white">Case Type: {caseItem.areas_of_expertise}</p>
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