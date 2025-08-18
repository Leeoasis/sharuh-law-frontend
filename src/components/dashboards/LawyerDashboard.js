import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from "../../redux/actions/logout";
import {
  fetchProfile,
  updateProfile,
  clearSuccessMessage,
  rehydrateUser,
  fetchNotifications,
} from '../../redux/features/userSlice';
import {
  fetchCases,
  fetchAvailableCases,
  acceptCase,
} from '../../redux/features/caseSlice';

import SubscribeToNotifications from './features/lawyer/Notifications';
import { useNavigate } from 'react-router-dom';
import Footer from '../landingSite/Footer';
import Sidebar from './features/lawyer/Sidebar';
import Header from './features/lawyer/Header';
import ContentSection from './features/lawyer/ContentSection';
import CalendarSection from './features/lawyer/CalenderSection';
import WelcomeSection from './features/lawyer/WelcomeSection';
import ClientManagementSection from './features/lawyer/ClientManagementSection';
import CaseManagementSection from './features/lawyer/CaseManagementSection';
import ProfileSection from './features/lawyer/ProfileSection';
import ModalComponent from '../ModalComponent';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LawyerDashboard = () => {
  const [selectedOption, setSelectedOption] = useState('Client Management');
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [eventTitle, setEventTitle] = useState('');
  const [liveNotifications, setLiveNotifications] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    clients,
    profile,
    loading,
    error,
    successMessage,
    notifications: storedNotifications,
  } = useSelector((state) => state.user);

  const {
    cases,
    availableCases,
  } = useSelector((state) => state.case);

  // Rehydrate user on mount
  useEffect(() => {
    dispatch(rehydrateUser());
  }, [dispatch]);

  // Fetch profile on login
  useEffect(() => {
    if (profile?.id && profile?.role === 'lawyer') {
      dispatch(fetchProfile({ role: profile.role, id: profile.id }));
    }
  }, [dispatch, profile?.id, profile?.role]);

  // Fetch cases/available cases depending on selection
  useEffect(() => {
    if (!profile?.id) return;

    if (selectedOption === 'Client Management' || selectedOption === 'Case Management') {
      dispatch(fetchCases(profile.id));
    }
    if (selectedOption === 'Available Cases') {
      dispatch(fetchAvailableCases(profile.id));
    }
    if (selectedOption === 'Profile') {
      dispatch(fetchProfile({ role: profile.role, id: profile.id }));
    }
  }, [selectedOption, dispatch, profile?.id, profile?.role]);

  // Fetch notifications
  useEffect(() => {
    if (profile?.id) {
      dispatch(fetchNotifications(profile.id));
    }
  }, [dispatch, profile?.id]);

  // Redirect unapproved lawyers
  useEffect(() => {
    if (profile?.role === "lawyer" && profile.approved === false) {
      navigate("/pending-approval");
    }
  }, [profile, navigate]);

  // Live notifications subscription
  useEffect(() => {
    if (profile?.id) {
      const subscription = SubscribeToNotifications(profile.id, (notification) => {
        setLiveNotifications((prev) => [...prev, notification]);
      });
      return () => subscription.unsubscribe();
    }
  }, [profile?.id]);

  // Clear success message after 3s
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        dispatch(clearSuccessMessage());
      }, 3000);
      return () => clearTimeout(timer);
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
    dispatch(logout());
    navigate("/");
  };

  const handleProfileUpdate = (profileData) => {
    if (!profile?.id) return;
    dispatch(updateProfile({ id: profile.id, profileData: { user: profileData } }));
  };

  const handleCaseAccept = (caseId) => {
    if (!profile?.id) return;
    dispatch(acceptCase({ caseId, lawyerId: profile.id }))
      .then((res) => {
        if (res.meta.requestStatus === 'fulfilled') {
          toast.success("Case accepted successfully!");
          dispatch(fetchAvailableCases(profile.id));
          dispatch(fetchCases(profile.id));
        } else {
          toast.error("Failed to accept case.");
        }
      });
  };

  const hasAcceptedCases = cases && cases.length > 0;
  const allNotifications = [...liveNotifications, ...storedNotifications];

  const renderContent = () => {
    const contentMap = {
      'Client Management': hasAcceptedCases ? (
        <ClientManagementSection clients={clients} loading={loading} error={error} />
      ) : (
        <p className="text-white">You need to accept a case before viewing clients.</p>
      ),
      'Case Management': hasAcceptedCases ? (
        <CaseManagementSection
          cases={cases}
          loading={loading}
          error={error}
          allowAccept={false}
        />
      ) : (
        <p className="text-white">You need to accept a case before viewing case details.</p>
      ),
      'Available Cases': (
        <CaseManagementSection
          cases={availableCases}
          loading={loading}
          error={error}
          allowAccept={true}
          onAccept={handleCaseAccept}
        />
      ),
      Profile: (
        <ProfileSection
          profile={profile}
          onUpdate={handleProfileUpdate}
          loading={loading}
          error={error}
          successMessage={successMessage}
        />
      ),
      Notifications: (
        <div className="p-4 bg-gray-800 rounded-lg">
          <h2 className="text-lg font-bold text-white mb-3">Notifications</h2>
          {allNotifications.length > 0 ? (
            <ul className="space-y-2">
              {allNotifications.map((notif, index) => (
                <li key={index} className="p-2 bg-gray-700 rounded">
                  {notif.message}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">No new notifications.</p>
          )}
        </div>
      ),
      Calendar: (
        <CalendarSection
          date={date}
          setDate={setDate}
          events={events}
          openModal={openModal}
        />
      ),
      Messages: (
        <ContentSection
          title="Messages"
          description="Check your messages and communicate with clients."
          buttonText="View Messages"
        />
      ),
    };
    return contentMap[selectedOption] || <WelcomeSection />;
  };

  return (
    <div className="flex flex-col min-h-screen bg-secondary-light text-white">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="flex flex-col lg:flex-row flex-grow">
        <Sidebar selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
        <div className="flex-1 p-4 lg:p-8">
          <Header
            handleLogout={handleLogout}
            profile={profile}
            notifications={allNotifications}
          />
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
