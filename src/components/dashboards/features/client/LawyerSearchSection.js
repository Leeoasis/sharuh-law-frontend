import React from 'react';

const LawyerSearchSection = ({ lawyers, loading, error }) => (
  <div>
    <h2 className="text-2xl font-semibold text-primary-light mb-4">Find a Lawyer</h2>
    {loading ? (
      <p>Loading...</p>
    ) : error ? (
      <p className="text-red-500">{error}</p>
    ) : (
      <ul>
        {lawyers.map((lawyer) => (
          <li key={lawyer.id} className="mb-2">
            <div className="bg-secondary-light p-4 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-primary">{lawyer.name}</h3>
              <p className="text-white">Specializations: {lawyer.specializations}</p>
              <p className="text-white">Experience: {lawyer.experience_years} years</p>
            </div>
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default LawyerSearchSection;