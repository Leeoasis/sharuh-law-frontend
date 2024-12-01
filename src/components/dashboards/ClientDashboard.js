import React, { useState } from 'react';
import ReactCalendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Modal from 'react-modal';

const ClientDashboard = () => {
  const [selectedOption, setSelectedOption] = useState('Case Management');
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [eventTitle, setEventTitle] = useState('');

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setEventTitle('');
  };

  const handleAddEvent = () => {
    if (eventTitle) {
      setEvents([...events, { date: date.toDateString(), title: eventTitle }]);
      closeModal();
    }
  };

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
            <ReactCalendar
              onChange={setDate}
              value={date}
              tileContent={({ date }) =>
                events
                  .filter((event) => event.date === date.toDateString())
                  .map((event, index) => (
                    <p key={index} className="text-xs text-primary font-semibold">
                      {event.title}
                    </p>
                  ))
              }
              className="bg-secondary text-primary rounded-lg shadow-lg"
            />
            <button
              onClick={openModal}
              className="mt-4 bg-primary text-secondary px-4 py-2 rounded hover:bg-primary-light"
            >
              Add Event
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
        return (
          <div>
            <h2 className="text-2xl font-semibold text-primary-light mb-4">Welcome</h2>
            <p className="text-secondary-light">Please select an option from the sidebar.</p>
          </div>
        );
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

      {/* Modal for adding event */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Add Event"
        className="bg-secondary p-6 rounded-lg shadow-lg max-w-md mx-auto mt-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <h2 className="text-2xl font-semibold text-primary mb-4">Schedule Appointments</h2>
        <input
          type="text"
          value={eventTitle}
          onChange={(e) => setEventTitle(e.target.value)}
          placeholder="Event Title"
          className="w-full p-2 mb-4 rounded bg-secondary-light text-primary"
        />
        <div className="flex justify-end space-x-4">
          <button onClick={closeModal} className="bg-secondary-light text-primary px-4 py-2 rounded hover:bg-primary-light">
            Cancel
          </button>
          <button onClick={handleAddEvent} className="bg-primary text-secondary px-4 py-2 rounded hover:bg-primary-light">
            Add Event
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ClientDashboard;