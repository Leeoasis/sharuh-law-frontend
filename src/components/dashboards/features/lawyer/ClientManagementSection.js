import React from 'react';

const ClientManagementSection = ({ clients, loading, error }) => (
  <div>
    <h2 className="text-2xl font-semibold text-primary-light mb-4">Client Management</h2>

    {loading ? (
      <p>Loading...</p>
    ) : error ? (
      <p className="text-red-500">{error}</p>
    ) : clients.length === 0 ? (
      <p className="text-gray-400">You have no clients assigned yet.</p>
    ) : (
      <ul>
        {clients.map((client) => (
          <li key={client.id} className="mb-2">
            <div className="bg-secondary-light p-4 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-primary">{client.name}</h3>
              <p className="text-white">Preferred Language: {client.preferred_language}</p>
              <p className="text-white">Budget: {client.budget}</p>
            </div>
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default ClientManagementSection;
