import React from "react";

const PanelistSection = ({ lawyers, onApprove }) => {
  const pending = lawyers.filter((l) => l.role === "lawyer" && !l.approved);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Pending Panelist Applications</h2>
      <ul className="space-y-4">
        {pending.map((lawyer) => (
          <li key={lawyer.id} className="p-4 border rounded bg-white text-black">
            <p><strong>Name:</strong> {lawyer.name}</p>
            <p><strong>Email:</strong> {lawyer.email}</p>
            <p><strong>Expertise:</strong> {lawyer.areas_of_expertise}</p>
            <div className="mt-2 space-x-2">
              <button onClick={() => onApprove(lawyer, true)} className="bg-green-600 text-white px-4 py-2 rounded">Approve</button>
              <button onClick={() => onApprove(lawyer, false)} className="bg-red-600 text-white px-4 py-2 rounded">Reject</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PanelistSection;
