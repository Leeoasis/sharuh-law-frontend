import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLawyers, updateProfile } from '../../redux/features/userSlice';
import ReactCalendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
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
  const dispatch = useDispatch();
  const { lawyers, profile, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (selectedOption === 'Find a Lawyer') {
      dispatch(fetchLawyers({}));
    }
  }, [selectedOption, dispatch]);

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

  const handleProfileUpdate = (profileData) => {
    dispatch(updateProfile(profileData));
  };

  const renderContent = () => {
    const contentMap = {
      'Case Management': (
        <ContentSection title="Case Management" description="View and manage your cases." buttonText="View Cases" />
      ),
      'Find a Lawyer': (
        <LawyerSearchSection lawyers={lawyers} loading={loading} error={error} />
      ),
      'Profile': (
        <ProfileSection profile={profile} onUpdate={handleProfileUpdate} loading={loading} error={error} />
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

const ProfileSection = ({ profile, onUpdate, loading, error }) => {
  const [formData, setFormData] = useState({
    name: profile.name || '',
    email: profile.email || '',
    password: '',
    preferred_language: profile.preferred_language || '',
    budget: profile.budget || '',
    license_number: profile.license_number || '',
    specializations: profile.specializations || '',
    experience_years: profile.experience_years || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-primary-light mb-4">Profile</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-secondary-light mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 rounded-lg bg-secondary-light text-primary"
            />
          </div>
          <div className="mb-4">
            <label className="block text-secondary-light mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 rounded-lg bg-secondary-light text-primary"
            />
          </div>
          <div className="mb-4">
            <label className="block text-secondary-light mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 rounded-lg bg-secondary-light text-primary"
            />
          </div>
          {profile.role === 'client' && (
            <>
              <div className="mb-4">
                <label className="block text-secondary-light mb-2">Preferred Language</label>
                <input
                  type="text"
                  name="preferred_language"
                  value={formData.preferred_language}
                  onChange={handleChange}
                  className="w-full p-2 rounded-lg bg-secondary-light text-primary"
                />
              </div>
              <div className="mb-4">
                <label className="block text-secondary-light mb-2">Budget</label>
                <input
                  type="number"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full p-2 rounded-lg bg-secondary-light text-primary"
                />
              </div>
            </>
          )}
          {profile.role === 'lawyer' && (
            <>
              <div className="mb-4">
                <label className="block text-secondary-light mb-2">License Number</label>
                <input
                  type="text"
                  name="license_number"
                  value={formData.license_number}
                  onChange={handleChange}
                  className="w-full p-2 rounded-lg bg-secondary-light text-primary"
                />
              </div>
              <div className="mb-4">
                <label className="block text-secondary-light mb-2">Specializations</label>
                <input
                  type="text"
                  name="specializations"
                  value={formData.specializations}
                  onChange={handleChange}
                  className="w-full p-2 rounded-lg bg-secondary-light text-primary"
                />
              </div>
              <div className="mb-4">
                <label className="block text-secondary-light mb-2">Experience Years</label>
                <input
                  type="number"
                  name="experience_years"
                  value={formData.experience_years}
                  onChange={handleChange}
                  className="w-full p-2 rounded-lg bg-secondary-light text-primary"
                />
              </div>
            </>
          )}
          <button type="submit" className="bg-primary text-secondary px-4 py-2 rounded hover:bg-primary-light">
            Update Profile
          </button>
        </form>
      )}
    </div>
  );
};

export default ClientDashboard;