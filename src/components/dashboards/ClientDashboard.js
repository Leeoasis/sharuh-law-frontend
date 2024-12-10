import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLawyers, updateProfile, clearSuccessMessage } from '../../redux/features/userSlice';
import { fetchCases, createCase, updateCase, deleteCase } from '../../redux/features/caseSlice';
import ReactCalendar from 'react-calendar';
import ModalComponent from '../ModalComponent'; 
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
  const { lawyers, profile, loading, error, successMessage } = useSelector((state) => state.user);
  const { cases } = useSelector((state) => state.case);

  useEffect(() => {
    if (selectedOption === 'Find a Lawyer') {
      dispatch(fetchLawyers({}));
    }
    if (selectedOption === 'Case Management') {
      dispatch(fetchCases(profile.id));
    }
  }, [selectedOption, dispatch, profile.id]);

  useEffect(() => {
    console.log('Profile:', profile); // Check if profile is correctly populated
  }, [profile]);

  useEffect(() => {
    if (successMessage) {
      setTimeout(() => {
        dispatch(clearSuccessMessage());
      }, 3000); // Clear success message after 3 seconds
    }
  }, [successMessage, dispatch]);

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
    const id = profile.id; // Ensure profile.id contains the user's ID
    console.log('User ID:', id); // Check if id is not undefined
    console.log('Profile Data:', profileData); // Log profileData to check its structure
    if (id) {
      const formattedProfileData = { user: profileData }; // Nest profileData under 'user'
      dispatch(updateProfile({ id, profileData: formattedProfileData }));
    } else {
      console.error('User ID is missing');
    }
  };

  const handleCaseCreate = (caseData) => {
    dispatch(createCase({ userId: profile.id, caseData }));
  };

  const handleCaseUpdate = (caseId, caseData) => {
    dispatch(updateCase({ userId: profile.id, caseId, caseData }));
  };

  const handleCaseDelete = (caseId) => {
    dispatch(deleteCase({ userId: profile.id, caseId }));
  };

  const renderContent = () => {
    const contentMap = {
      'Case Management': (
        <CaseManagementSection cases={cases} onCreate={handleCaseCreate} onUpdate={handleCaseUpdate} onDelete={handleCaseDelete} loading={loading} error={error} />
      ),
      'Find a Lawyer': (
        <LawyerSearchSection lawyers={lawyers} loading={loading} error={error} />
      ),
      'Profile': (
        <ProfileSection profile={profile} onUpdate={handleProfileUpdate} loading={loading} error={error} successMessage={successMessage} />
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
          <Header handleLogout={handleLogout} profile={profile} />
          <div className="bg-secondary shadow-lg rounded-lg p-4 lg:p-6 flex-grow">
            {renderContent()}
          </div>
        </div>
      </div>
      <Footer />
      <ModalComponent
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        eventTitle={eventTitle}
        setEventTitle={setEventTitle}
        handleAddEvent={handleAddEvent}
      />
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

const Header = ({ handleLogout, profile }) => (
  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-4 lg:mb-8">
    <h1 className="text-4xl font-bold text-primary mb-4 lg:mb-0">Client Dashboard</h1>
    <div className="flex items-center space-x-4">
      <span className="text-lg">Welcome, {profile.name}</span>
      <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-primary font-bold">
        {profile.name ? profile.name.charAt(0) : 'C'}
      </div>
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

const ProfileSection = ({ profile, onUpdate, loading, error, successMessage }) => {
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

  useEffect(() => {
    setFormData({
      name: profile.name || '',
      email: profile.email || '',
      password: '',
      preferred_language: profile.preferred_language || '',
      budget: profile.budget || '',
      license_number: profile.license_number || '',
      specializations: profile.specializations || '',
      experience_years: profile.experience_years || '',
    });
  }, [profile]);

  useEffect(() => {
    if (successMessage) {
      setFormData({
        name: profile.name || '',
        email: profile.email || '',
        password: '',
        preferred_language: profile.preferred_language || '',
        budget: profile.budget || '',
        license_number: profile.license_number || '',
        specializations: profile.specializations || '',
        experience_years: profile.experience_years || '',
      });
    }
  }, [successMessage, profile]);

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
          {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
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

const CaseManagementSection = ({ cases, onCreate, onUpdate, onDelete, loading, error }) => {
  const [caseData, setCaseData] = useState({ title: '', description: '', lawyer_id: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCaseData({ ...caseData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(caseData);
    setCaseData({ title: '', description: '', lawyer_id: '' });
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-primary-light mb-4">Case Management</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-secondary-light mb-2">Title</label>
              <input
                type="text"
                name="title"
                value={caseData.title}
                onChange={handleChange}
                className="w-full p-2 rounded-lg bg-secondary-light text-primary"
              />
            </div>
            <div className="mb-4">
              <label className="block text-secondary-light mb-2">Description</label>
              <textarea
                name="description"
                value={caseData.description}
                onChange={handleChange}
                className="w-full p-2 rounded-lg bg-secondary-light text-primary"
              />
            </div>
            <div className="mb-4">
              <label className="block text-secondary-light mb-2">Lawyer ID</label>
              <input
                type="text"
                name="lawyer_id"
                value={caseData.lawyer_id}
                onChange={handleChange}
                className="w-full p-2 rounded-lg bg-secondary-light text-primary"
              />
            </div>
            <button type="submit" className="bg-primary text-secondary px-4 py-2 rounded hover:bg-primary-light">
              Create Case
            </button>
          </form>
          <ul className="mt-4">
            {cases.map((caseItem) => (
              <li key={caseItem.id} className="mb-2">
                <div className="bg-secondary-light p-4 rounded-lg shadow-lg">
                  <h3 className="text-xl font-bold text-primary">{caseItem.title}</h3>
                  <p className="text-white">{caseItem.description}</p>
                  <p className="text-white">Lawyer ID: {caseItem.lawyer_id}</p>
                  <button onClick={() => onUpdate(caseItem.id, caseData)} className="bg-primary text-secondary px-4 py-2 rounded hover:bg-primary-light">
                    Update
                  </button>
                  <button onClick={() => onDelete(caseItem.id)} className="bg-red-500 text-secondary px-4 py-2 rounded hover:bg-red-700 ml-2">
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ClientDashboard;