import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLawyers, updateProfile, clearSuccessMessage } from '../../redux/features/userSlice';
import { fetchCases, createCase, updateCase, deleteCase } from '../../redux/features/caseSlice';
import ModalComponent from '../ModalComponent';
import { useNavigate } from 'react-router-dom';
import Footer from '../landingSite/Footer';
import Sidebar from '../dashboards/features/client/Sidebar';
import Header from '../dashboards/features/client/Header';
import ContentSection from '../dashboards/features/client/ContentSection';
import CalendarSection from '../dashboards/features/client/CalenderSection';
import WelcomeSection from '../dashboards/features/client/WelcomeSection';
import LawyerSearchSection from '../dashboards/features/client/LawyerSearchSection';
import ProfileSection from '../dashboards/features/client/ProfileSection';
import CaseManagementSection from '../dashboards/features/client/CaseManagementSection';

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

export default ClientDashboard;