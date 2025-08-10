// components/auth/PendingApproval.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const PendingApproval = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-secondary-light text-white">
      <div className="bg-secondary p-6 rounded-lg shadow-lg max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4">Awaiting Approval</h1>
        <p className="mb-4">Your registration has been received and is pending admin approval.</p>
        <button onClick={() => navigate("/login")} className="bg-primary hover:bg-primary-light px-4 py-2 rounded">
          Return to Login
        </button>
      </div>
    </div>
  );
};

export default PendingApproval;
