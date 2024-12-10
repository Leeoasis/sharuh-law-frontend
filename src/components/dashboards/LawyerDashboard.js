import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClients, fetchLawyers, updateProfile, clearSuccessMessage, fetchProfile } from '../../redux/features/userSlice';
import { fetchCases, createCase, updateCase, deleteCase } from '../../redux/features/caseSlice';
import ModalComponent from '../ModalComponent';
import { useNavigate } from 'react-router-dom';
import Footer from '../landingSite/Footer';
import Sidebar from '../dashboards/features/lawyer/Sidebar';
import Header from '../dashboards/features/lawyer/Header';
import ContentSection from '../dashboards/features/lawyer/ContentSection';
import CalendarSection from '../dashboards/features/lawyer/CalenderSection';
import WelcomeSection from '../dashboards/features/lawyer/WelcomeSection';
import ClientManagementSection from '../dashboards/features/lawyer/ClientManagementSection';
import CaseManagementSection from '../dashboards/features/lawyer/CaseManagementSection';
import ProfileSection from '../dashboards/features/lawyer/ProfileSection';

const LawyerDashboard = () => {
  const [selectedOption, setSelectedOption] = useState('Client Management');
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [eventTitle, setEventTitle] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { clients, profile, loading, error, successMessage } = useSelector((state) => state.user);
  const { cases } = useSelector((state) => state.case);

  useEffect(() => {
    // Fetch the user profile by role and ID when the component mounts
    const userId = profile.id; // Get the actual user ID from the profile state
    const userRole = profile.role; // Get the actual user role from the profile state
    if (userId && userRole) {
      dispatch(fetchProfile({ role: userRole, id: userId }));
    }
  }, [dispatch, profile.id, profile.role]);

  useEffect(() => {
    if (selectedOption === 'Client Management') {
      dispatch(fetchClients({}));
    }
    if (selectedOption === 'Case Management') {
      dispatch(fetchCases(profile.id));
    }
    if (selectedOption === 'Profile') {
      dispatch(fetchProfile({ role: profile.role, id: profile.id }));
    }
  }, [selectedOption, dispatch, profile.id, profile.role]);

  useEffect(() => {
    if (successMessage) {
      setTimeout(() => {
        dispatch(clearSuccessMessage());
      }, 3000);
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
    const id = profile.id;
    if (id) {
      const formattedProfileData = { user: profileData };
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
      'Client Management': (
        <ClientManagementSection clients={clients} loading={loading} error={error} />
      ),
      'Case Management': (
        <CaseManagementSection cases={cases} onCreate={handleCaseCreate} onUpdate={handleCaseUpdate} onDelete={handleCaseDelete} loading={loading} error={error} />
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
        <ContentSection title="Messages" description="Check your messages and communicate with clients." buttonText="View Messages" />
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

export default LawyerDashboard;