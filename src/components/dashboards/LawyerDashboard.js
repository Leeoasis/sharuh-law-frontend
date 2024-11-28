// src/components/LawyerDashboard.js
import React from 'react';
import {
  FaUser,
  FaFolderOpen,
  FaCalendarAlt,
  FaBell,
  FaEnvelope,
  FaFileInvoiceDollar,
  FaChartLine,
  FaFileAlt,
} from 'react-icons/fa';
import Navbar from '../features/Navbar';
import Footer from '../features/Footer'; // Correct import
import Clients from '../../assets/Images/clients.jpeg';
import Cases from '../../assets/Images/cases.jpeg';
import Profile from '../../assets/Images/profile.jpeg';
import Notifications from '../../assets/Images/notifications.jpeg';
import Calendar from '../../assets/Images/calender.jpeg';
import Messages from '../../assets/Images/messages.jpeg';
import Billing from '../../assets/Images/billing.jpeg';
import Documents from '../../assets/Images/documents.jpeg';
import Analysis from '../../assets/Images/analysis.jpeg';

const LawyerDashboard = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <div className="flex-grow container mx-auto p-8">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <header className="mb-12">
            <h1 className="text-5xl font-bold text-center text-blue-600">Lawyer Dashboard</h1>
            <p className="text-xl text-center text-gray-700 mt-4">
              Welcome to your professional dashboard. Manage your clients, cases, and schedule efficiently.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Reusable Section */}
            {[
              {
                img: Clients,
                icon: <FaUser className="text-blue-600 text-4xl mb-4" />,
                title: 'Client Management',
                description: "View and manage your clients' information and cases.",
                btnColor: 'bg-blue-500 hover:bg-blue-700',
              },
              {
                img: Cases,
                icon: <FaFolderOpen className="text-green-600 text-4xl mb-4" />,
                title: 'Case Management',
                description: 'Track and manage all your ongoing cases.',
                btnColor: 'bg-green-500 hover:bg-green-700',
              },
              {
                img: Profile,
                icon: <FaUser className="text-yellow-600 text-4xl mb-4" />,
                title: 'Profile',
                description: 'Update your personal information and settings.',
                btnColor: 'bg-yellow-500 hover:bg-yellow-700',
              },
              {
                img: Notifications,
                icon: <FaBell className="text-purple-600 text-4xl mb-4" />,
                title: 'Notifications',
                description: 'Stay updated with real-time notifications.',
                btnColor: 'bg-purple-500 hover:bg-purple-700',
              },
              {
                img: Calendar,
                icon: <FaCalendarAlt className="text-red-600 text-4xl mb-4" />,
                title: 'Calendar',
                description: 'Manage your appointments and schedules.',
                btnColor: 'bg-red-500 hover:bg-red-700',
              },
              {
                img: Messages,
                icon: <FaEnvelope className="text-orange-600 text-4xl mb-4" />,
                title: 'Messages',
                description: 'Communicate with clients and team members.',
                btnColor: 'bg-orange-500 hover:bg-orange-700',
              },
              {
                img: Billing,
                icon: <FaFileInvoiceDollar className="text-indigo-600 text-4xl mb-4" />,
                title: 'Billing',
                description: 'Manage your billing and invoices.',
                btnColor: 'bg-indigo-500 hover:bg-indigo-700',
              },
              {
                img: Documents,
                icon: <FaFileAlt className="text-gray-600 text-4xl mb-4" />,
                title: 'Document Management',
                description: 'Store, access, and manage all your legal documents.',
                btnColor: 'bg-gray-500 hover:bg-gray-700',
              },
              {
                img: Analysis,
                icon: <FaChartLine className="text-teal-600 text-4xl mb-4" />,
                title: 'Analysis',
                description: 'Get insights and track your performance.',
                btnColor: 'bg-teal-500 hover:bg-teal-700',
              },
              // Add other sections here...
            ].map((section, index) => (
              <div
              key={index}
              className="relative bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 overflow-hidden group"
            >
              <div className="absolute inset-0">
                <img
                  src={section.img}
                  alt={section.title}
                  className="w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 opacity-20 group-hover:opacity-30 transition-opacity duration-300 rounded-lg"></div>
              </div>
              <div className="relative z-10 flex flex-col items-center">
                {section.icon}
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 group-hover:text-gray-900 transition-colors duration-300">
                  {section.title}
                </h2>
                <p className="mb-6 text-gray-700 text-center leading-relaxed">
                  {section.description}
                </p>
                <button
                  className={`${section.btnColor} text-white px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}
                >
                  View {section.title}
                </button>
              </div>
            </div>
            
            ))}
          </div>
        </div>
      </div>
      <Footer className="bg-gray-800 text-white p-4 text-center mt-8" />
    </div>
  );
};

export default LawyerDashboard;
