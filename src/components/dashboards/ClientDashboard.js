import React, { useState } from 'react';

const ClientDashboard = () => {
  const [selectedOption, setSelectedOption] = useState('Case Management');

  const renderContent = () => {
    switch (selectedOption) {
      case 'Case Management':
        return (
          <div>
            <h2 className="text-2xl font-semibold text-primary-light mb-4">Case Management</h2>
            <p className="text-secondary-light mb-4">View and manage your cases.</p>
            <button className="bg-primary text-secondary px-4 py-2 rounded hover:bg-primary-light">
              View Cases
            </button>
          </div>
        );
      case 'Find a Lawyer':
        return (
          <div>
            <h2 className="text-2xl font-semibold text-primary-light mb-4">Find a Lawyer</h2>
            <p className="text-secondary-light mb-4">Search for lawyers to assist you with your cases.</p>
            <button className="bg-primary text-secondary px-4 py-2 rounded hover:bg-primary-light">
              Search Lawyers
            </button>
          </div>
        );
      case 'Profile':
        return (
          <div>
            <h2 className="text-2xl font-semibold text-primary-light mb-4">Profile</h2>
            <p className="text-secondary-light mb-4">Update your profile and settings.</p>
            <button className="bg-primary text-secondary px-4 py-2 rounded hover:bg-primary-light">
              Edit Profile
            </button>
          </div>
        );
      case 'Notifications':
        return (
          <div>
            <h2 className="text-2xl font-semibold text-primary-light mb-4">Notifications</h2>
            <p className="text-secondary-light mb-4">Check your latest notifications.</p>
            <button className="bg-primary text-secondary px-4 py-2 rounded hover:bg-primary-light">
              View Notifications
            </button>
          </div>
        );
      case 'Calendar':
        return (
          <div>
            <h2 className="text-2xl font-semibold text-primary-light mb-4">Calendar</h2>
            <p className="text-secondary-light mb-4">Manage your schedule and appointments.</p>
            <button className="bg-primary text-secondary px-4 py-2 rounded hover:bg-primary-light">
              View Calendar
            </button>
          </div>
        );
      case 'Messages':
        return (
          <div>
            <h2 className="text-2xl font-semibold text-primary-light mb-4">Messages</h2>
            <p className="text-secondary-light mb-4">Check your messages and communicate with lawyers.</p>
            <button className="bg-primary text-secondary px-4 py-2 rounded hover:bg-primary-light">
              View Messages
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-secondary-light text-white">
      {/* Sidebar Navigation */}
      <div className="w-64 bg-secondary p-6 shadow-lg">
        <h2 className="text-3xl font-bold text-primary mb-8">Dashboard</h2>
        <nav className="space-y-4">
          {[
            'Case Management',
            'Find a Lawyer',
            'Profile',
            'Notifications',
            'Calendar',
            'Messages',
          ].map((option) => (
            <button
              key={option}
              className={`w-full text-left px-4 py-2 rounded-lg ${
                selectedOption === option
                  ? 'bg-primary text-secondary'
                  : 'bg-secondary-light text-primary-light hover:bg-primary hover:text-secondary'
              }`}
              onClick={() => setSelectedOption(option)}
            >
              {option}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-primary">Client Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-lg">Welcome, Client</span>
            <div className="w-12 h-12 bg-secondary-light rounded-full flex items-center justify-center text-primary font-bold">
              C
            </div>
          </div>
        </div>

        {/* Dynamic Content */}
        <div className="bg-secondary shadow-lg rounded-lg p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;

