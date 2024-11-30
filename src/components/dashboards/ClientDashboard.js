// // src/components/ClientDashboard.js
// import React from 'react';

// const ClientDashboard = () => {
//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-6">
//         <h1 className="text-4xl font-bold mb-6 text-center">Client Dashboard</h1>
//         <p className="text-lg mb-8 text-center">Welcome to your dashboard, where you can manage your cases and connect with lawyers.</p>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {/* Case Management Section */}
//           <div className="bg-blue-100 p-4 rounded-lg shadow-md">
//             <h2 className="text-2xl font-semibold mb-4">Case Management</h2>
//             <p className="mb-4">View and manage your cases.</p>
//             <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">View Cases</button>
//           </div>

//           {/* Lawyer Search Section */}
//           <div className="bg-green-100 p-4 rounded-lg shadow-md">
//             <h2 className="text-2xl font-semibold mb-4">Find a Lawyer</h2>
//             <p className="mb-4">Search for lawyers to assist you with your cases.</p>
//             <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700">Search Lawyers</button>
//           </div>

//           {/* Profile Section */}
//           <div className="bg-yellow-100 p-4 rounded-lg shadow-md">
//             <h2 className="text-2xl font-semibold mb-4">Profile</h2>
//             <p className="mb-4">Update your profile and settings.</p>
//             <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-700">Edit Profile</button>
//           </div>

//           {/* Notifications Section */}
//           <div className="bg-purple-100 p-4 rounded-lg shadow-md">
//             <h2 className="text-2xl font-semibold mb-4">Notifications</h2>
//             <p className="mb-4">Check your latest notifications.</p>
//             <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-700">View Notifications</button>
//           </div>

//           {/* Calendar Section */}
//           <div className="bg-red-100 p-4 rounded-lg shadow-md">
//             <h2 className="text-2xl font-semibold mb-4">Calendar</h2>
//             <p className="mb-4">Manage your schedule and appointments.</p>
//             <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700">View Calendar</button>
//           </div>

//           {/* Messages Section */}
//           <div className="bg-indigo-100 p-4 rounded-lg shadow-md">
//             <h2 className="text-2xl font-semibold mb-4">Messages</h2>
//             <p className="mb-4">Check your messages and communicate with lawyers.</p>
//             <button className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-700">View Messages</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ClientDashboard;

// src/components/ClientDashboard.js
import React, { useState } from 'react';

const ClientDashboard = () => {
  const [selectedOption, setSelectedOption] = useState('Case Management');

  const renderContent = () => {
    switch (selectedOption) {
      case 'Case Management':
        return (
          <div>
            <h2 className="text-2xl font-semibold text-amber-300 mb-4">Case Management</h2>
            <p className="text-gray-300 mb-4">View and manage your cases.</p>
            <button className="bg-amber-400 text-slate-900 px-4 py-2 rounded hover:bg-amber-500">
              View Cases
            </button>
          </div>
        );
      case 'Find a Lawyer':
        return (
          <div>
            <h2 className="text-2xl font-semibold text-amber-300 mb-4">Find a Lawyer</h2>
            <p className="text-gray-300 mb-4">Search for lawyers to assist you with your cases.</p>
            <button className="bg-amber-400 text-slate-900 px-4 py-2 rounded hover:bg-amber-500">
              Search Lawyers
            </button>
          </div>
        );
      case 'Profile':
        return (
          <div>
            <h2 className="text-2xl font-semibold text-amber-300 mb-4">Profile</h2>
            <p className="text-gray-300 mb-4">Update your profile and settings.</p>
            <button className="bg-amber-400 text-slate-900 px-4 py-2 rounded hover:bg-amber-500">
              Edit Profile
            </button>
          </div>
        );
      case 'Notifications':
        return (
          <div>
            <h2 className="text-2xl font-semibold text-amber-300 mb-4">Notifications</h2>
            <p className="text-gray-300 mb-4">Check your latest notifications.</p>
            <button className="bg-amber-400 text-slate-900 px-4 py-2 rounded hover:bg-amber-500">
              View Notifications
            </button>
          </div>
        );
      case 'Calendar':
        return (
          <div>
            <h2 className="text-2xl font-semibold text-amber-300 mb-4">Calendar</h2>
            <p className="text-gray-300 mb-4">Manage your schedule and appointments.</p>
            <button className="bg-amber-400 text-slate-900 px-4 py-2 rounded hover:bg-amber-500">
              View Calendar
            </button>
          </div>
        );
      case 'Messages':
        return (
          <div>
            <h2 className="text-2xl font-semibold text-amber-300 mb-4">Messages</h2>
            <p className="text-gray-300 mb-4">Check your messages and communicate with lawyers.</p>
            <button className="bg-amber-400 text-slate-900 px-4 py-2 rounded hover:bg-amber-500">
              View Messages
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-900 text-white">
      {/* Sidebar Navigation */}
      <div className="w-64 bg-slate-800 p-6 shadow-lg">
        <h2 className="text-3xl font-bold text-amber-400 mb-8">Dashboard</h2>
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
                  ? 'bg-amber-400 text-slate-900'
                  : 'bg-slate-700 text-amber-300 hover:bg-amber-400 hover:text-slate-900'
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
          <h1 className="text-4xl font-bold text-amber-400">Client Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-lg">Welcome, Client</span>
            <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center text-amber-400 font-bold">
              C
            </div>
          </div>
        </div>

        {/* Dynamic Content */}
        <div className="bg-slate-800 shadow-lg rounded-lg p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
