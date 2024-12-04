import React, { useState } from 'react';
import ReactCalendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import ModalComponent from '../ModalComponent';
import { FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Footer from '../landingSite/Footer';

const ClientDashboard = () => {
  const [selectedOption, setSelectedOption] = useState('Case Management');
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [eventTitle, setEventTitle] = useState('');
  const navigate = useNavigate();

  const openModal = () => setModalIsOpen(true);
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

  const handleLogout = () => {
    navigate('/');
  };

  const renderContent = () => {
    const contentMap = {
      'Case Management': (
        <ContentSection title="Case Management" description="View and manage your cases." buttonText="View Cases" />
      ),
      'Find a Lawyer': (
        <ContentSection title="Find a Lawyer" description="Search for lawyers to assist you with your cases." buttonText="Search Lawyers" />
      ),
      'Profile': (
        <ContentSection title="Profile" description="Update your profile and settings." buttonText="Edit Profile" />
      ),
      'Notifications': (
        <ContentSection title="Notifications" description="Check your latest notifications." buttonText="View Notifications" />
      ),
      'Calendar': (
        <CalendarSection date={date} setDate={setDate} events={events} openModal={openModal} />
      ),
      'Messages': (
        <ContentSection title="Messages" description="Check your messages and communicate with lawyers." buttonText="View Messages" />
      ),
      'Welcome': (
        <WelcomeSection />
      ),
    };
    return contentMap[selectedOption] || <WelcomeSection />;
  };

  return (
    <div className="flex flex-col min-h-screen bg-secondary-light text-white">
      <div className="flex flex-col lg:flex-row flex-grow">
        <Sidebar selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
        <div className="flex-1 p-4 lg:p-8">
          <Header handleLogout={handleLogout} />
          <div className="bg-secondary shadow-lg rounded-lg p-4 lg:p-6 flex-grow">
            {renderContent()}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const Sidebar = ({ selectedOption, setSelectedOption }) => (
  <div className="w-full lg:w-64 bg-secondary p-4 lg:p-6 shadow-lg">
    <h2 className="text-3xl font-bold text-primary mb-4 lg:mb-8">Dashboard</h2>
    <nav className="space-y-2 lg:space-y-4">
      {['Case Management', 'Find a Lawyer', 'Profile', 'Notifications', 'Calendar', 'Messages'].map((option) => (
        <button
          key={option}
          className={`w-full text-left px-4 py-2 rounded-lg ${selectedOption === option ? 'bg-primary text-secondary' : 'bg-secondary-light text-primary-light hover:bg-primary hover:text-secondary'}`}
          onClick={() => setSelectedOption(option)}
        >
          {option}
        </button>
      ))}
    </nav>
  </div>
);

const Header = ({ handleLogout }) => (
  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-4 lg:mb-8">
    <h1 className="text-4xl font-bold text-primary mb-4 lg:mb-0">Client Dashboard</h1>
    <div className="flex items-center space-x-4">
      <span className="text-lg">Welcome, Client</span>
      <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-primary font-bold">C</div>
      <button onClick={handleLogout} className="flex items-center bg-primary text-secondary px-4 py-2 rounded hover:bg-primary-light">
        <FaSignOutAlt className="mr-2" /> Logout
      </button>
    </div>
  </div>
);

const ContentSection = ({ title, description, buttonText }) => (
  <div>
    <h2 className="text-2xl font-semibold text-primary-light mb-4">{title}</h2>
    <p className="text-secondary-light mb-4">{description}</p>
    <button className="bg-primary text-secondary px-4 py-2 rounded hover:bg-primary-light">{buttonText}</button>
  </div>
);

const CalendarSection = ({ date, setDate, events, openModal }) => (
  <div>
    <h2 className="text-2xl font-semibold text-primary-light mb-4">Calendar</h2>
    <p className="text-secondary-light mb-4">Manage your schedule and appointments.</p>
    <ReactCalendar
      onChange={setDate}
      value={date}
      tileContent={({ date }) =>
        events.filter((event) => event.date === date.toDateString()).map((event, index) => (
          <p key={index} className="text-xs text-primary font-semibold">{event.title}</p>
        ))
      }
      className="bg-secondary text-primary rounded-lg shadow-lg"
    />
    <button onClick={openModal} className="mt-4 bg-primary text-secondary px-4 py-2 rounded hover:bg-primary-light">Add Event</button>
  </div>
);

const WelcomeSection = () => (
  <div>
    <h2 className="text-2xl font-semibold text-primary-light mb-4">Welcome</h2>
    <p className="text-secondary-light">Please select an option from the sidebar.</p>
  </div>
);

export default ClientDashboard;