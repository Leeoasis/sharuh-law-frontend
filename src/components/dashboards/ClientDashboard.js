import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateProfile,
  clearSuccessMessage,
  fetchProfile,
  rehydrateUser,
} from "../../redux/features/userSlice";
import {
  fetchCases,
  createCase,
  updateCase,
  deleteCase,
} from "../../redux/features/caseSlice";
import SubscribeToNotifications from "../dashboards/features/lawyer/Notifications";
import ModalComponent from "../ModalComponent";
import { useNavigate } from "react-router-dom";
import Footer from "../landingSite/Footer";
import Sidebar from "../dashboards/features/client/Sidebar";
import Header from "../dashboards/features/client/Header";
import ContentSection from "../dashboards/features/client/ContentSection";
import CalendarSection from "../dashboards/features/client/CalenderSection";
import WelcomeSection from "../dashboards/features/client/WelcomeSection";
import ProfileSection from "../dashboards/features/client/ProfileSection";
import CaseManagementSection from "../dashboards/features/client/CaseManagementSection";
import { notifySuccess, notifyError } from "../../utils/NotificationSystem";
import { ToastContainer } from "react-toastify";

const ClientDashboard = () => {
  const [selectedOption, setSelectedOption] = useState("Case Management");
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [eventTitle, setEventTitle] = useState("");
  const [notifications, setNotifications] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { profile, loading, error, successMessage } = useSelector(
    (state) => state.user
  );
  const { cases } = useSelector((state) => state.case);

  useEffect(() => {
    dispatch(rehydrateUser());
  }, [dispatch]);

  useEffect(() => {
    if (!profile?.id) return;

    dispatch(fetchProfile({ role: profile.role, id: profile.id }));

    if (selectedOption === "Case Management") {
      dispatch(fetchCases(profile.id));
    }
  }, [dispatch, profile?.id, profile?.role, selectedOption]);

  useEffect(() => {
    if (successMessage) {
      setTimeout(() => {
        dispatch(clearSuccessMessage());
      }, 3000);
    }
  }, [successMessage, dispatch]);

  useEffect(() => {
    if (profile?.id) {
      const subscription = SubscribeToNotifications(profile.id, (notification) => {
        setNotifications((prev) => [...prev, notification]);
      });

      return () => subscription.unsubscribe();
    }
  }, [profile?.id]);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => {
    setModalIsOpen(false);
    setEventTitle("");
  };

  const handleAddEvent = () => {
    if (eventTitle) {
      setEvents([...events, { date: date.toDateString(), title: eventTitle }]);
      closeModal();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("data");
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleProfileUpdate = (profileData) => {
    if (!profile?.id) return;
    const formattedProfileData = { user: profileData };
    dispatch(updateProfile({ id: profile.id, profileData: formattedProfileData }));
  };

  const handleCaseCreate = (caseData) => {
    dispatch(createCase({ userId: profile.id, caseData }))
      .unwrap()
      .then(() => notifySuccess("Case created successfully!"))
      .catch(() => notifyError("Failed to create case."));
  };

  const handleCaseUpdate = (caseId, caseData) => {
    dispatch(updateCase({ userId: profile.id, caseId, caseData }))
      .unwrap()
      .then(() => notifySuccess("Case updated successfully!"))
      .catch(() => notifyError("Failed to update case."));
  };

  const handleCaseDelete = (caseId) => {
    dispatch(deleteCase({ userId: profile.id, caseId }))
      .unwrap()
      .then(() => notifySuccess("Case deleted successfully!"))
      .catch(() => notifyError("Failed to delete case."));
  };

  const renderContent = () => {
    const contentMap = {
      "Case Management": (
        <CaseManagementSection
          cases={cases}
          onCreate={handleCaseCreate}
          onUpdate={handleCaseUpdate}
          onDelete={handleCaseDelete}
          loading={loading}
          error={error}
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
          {notifications.length > 0 ? (
            <ul className="space-y-2">
              {notifications.map((notif, index) => (
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
          description="Check your messages and communicate with lawyers."
          buttonText="View Messages"
        />
      ),
      Welcome: <WelcomeSection />,
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
      <ToastContainer />
    </div>
  );
};

export default ClientDashboard;
