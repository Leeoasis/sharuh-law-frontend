import React, { useState } from 'react';

const courts = ["Supreme Court", "High Court", "Magistrate Court", "Family Court", "Commercial Court"];
const caseTypes = ["Criminal", "Family", "Corporate", "Intellectual Property", "Labor"];

const CaseManagementSection = ({ profile, cases, onCreate }) => {
  const [caseData, setCaseData] = useState({
    title: '',
    description: '',
    court: '',
    budget: '',
    case_type: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCaseData({ ...caseData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(caseData);
    setCaseData({ title: '', description: '', court: '', budget: '', case_type: '' });
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-primary-light mb-4">Describe Your Case</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-secondary-light mb-2">Title</label>
          <input type="text" name="title" value={caseData.title} onChange={handleChange} className="w-full p-2 rounded-lg bg-secondary-light text-primary" />
        </div>
        <div className="mb-4">
          <label className="block text-secondary-light mb-2">Description</label>
          <textarea name="description" value={caseData.description} onChange={handleChange} className="w-full p-2 rounded-lg bg-secondary-light text-primary" />
        </div>
        <div className="mb-4">
          <label className="block text-secondary-light mb-2">Preferred Court</label>
          <select name="court" value={caseData.court} onChange={handleChange} className="w-full p-2 rounded-lg bg-secondary-light text-primary">
            <option value="">Select Court</option>
            {courts.map((court, index) => (
              <option key={index} value={court}>{court}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-secondary-light mb-2">Budget</label>
          <input type="number" name="budget" value={caseData.budget} onChange={handleChange} className="w-full p-2 rounded-lg bg-secondary-light text-primary" />
        </div>
        <div className="mb-4">
          <label className="block text-secondary-light mb-2">Case Type</label>
          <select name="case_type" value={caseData.case_type} onChange={handleChange} className="w-full p-2 rounded-lg bg-secondary-light text-primary">
            <option value="">Select Case Type</option>
            {caseTypes.map((type, index) => (
              <option key={index} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="bg-primary text-secondary px-4 py-2 rounded hover:bg-primary-light">Create Case</button>
      </form>

      <ul className="mt-4">
        {cases.map((caseItem) => (
          <li key={caseItem.id} className="mb-2">
            <div className="bg-secondary-light p-4 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-primary">{caseItem.title}</h3>
              <p className="text-white">{caseItem.description}</p>
              <p className="text-white">Court: {caseItem.court}</p>
              <p className="text-white">Status: {caseItem.status}</p>
              {caseItem.lawyer_id && (
                <p className="text-green-400">Accepted by lawyer #{caseItem.lawyer_id}</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CaseManagementSection;
