// src/components/LawyerDashboard.js
import React from 'react';

const LawyerDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-4xl font-bold mb-6 text-center">Lawyer Dashboard</h1>
        <p className="text-lg mb-8 text-center">Welcome to your dashboard, where you can manage your clients and cases.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Client Management Section */}
          <div className="bg-blue-100 p-4 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Client Management</h2>
            <p className="mb-4">View and manage your clients.</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">View Clients</button>
          </div>

          {/* Case Management Section */}
          <div className="bg-green-100 p-4 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Case Management</h2>
            <p className="mb-4">Track and manage your cases.</p>
            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700">View Cases</button>
          </div>

          {/* Profile Section */}
          <div className="bg-yellow-100 p-4 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Profile</h2>
            <p className="mb-4">Update your profile and settings.</p>
            <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-700">Edit Profile</button>
          </div>

          {/* Notifications Section */}
          <div className="bg-purple-100 p-4 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Notifications</h2>
            <p className="mb-4">Check your latest notifications.</p>
            <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-700">View Notifications</button>
          </div>

          {/* Calendar Section */}
          <div className="bg-red-100 p-4 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Calendar</h2>
            <p className="mb-4">Manage your schedule and appointments.</p>
            <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700">View Calendar</button>
          </div>

          {/* Messages Section */}
          <div className="bg-indigo-100 p-4 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Messages</h2>
            <p className="mb-4">Check your messages and communicate with clients.</p>
            <button className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-700">View Messages</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LawyerDashboard;