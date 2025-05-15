import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLawyers,
  fetchClients,
  updateProfile,
  fetchNotifications,
  fetchProfile,
  clearSuccessMessage,
  rehydrateUser,
} from "../../redux/features/userSlice";
import {
  fetchUnassignedCasesForAdmin,
} from "../../redux/features/caseSlice";
import { logout } from "../../redux/actions/logout";
import { useNavigate } from "react-router-dom";
import Footer from "../landingSite/Footer";
import Header from "../dashboards/features/lawyer/Header";
import Sidebar from "../dashboards/features/admin/Sidebar";
import SubscribeToNotifications from "../dashboards/features/lawyer/Notifications";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import PanelistSection from "../dashboards/features/admin/PanelistSection";
import CaseMatchSection from "../dashboards/features/admin/CaseMatchSection";
import ProfileSection from "../dashboards/features/admin/AdminProfileSection";
import NotificationsSection from "../dashboards/features/admin/NotificationsSection";

const AdminDashboard = () => {
  const [selectedOption, setSelectedOption] = useState("Panelist Applications");
  const [liveNotifications, setLiveNotifications] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    lawyers,
    clients,
    profile,
    loading,
    notifications: storedNotifications,
    successMessage,
  } = useSelector((state) => state.user);

  const { cases } = useSelector((state) => state.case);

  useEffect(() => {
    dispatch(rehydrateUser());
  }, [dispatch]);

  useEffect(() => {
    if (profile?.id && profile?.role === "admin") {
      dispatch(fetchProfile({ role: "admin", id: profile.id }));
      dispatch(fetchLawyers());
      dispatch(fetchClients());
      dispatch(fetchUnassignedCasesForAdmin(profile.id));
      dispatch(fetchNotifications(profile.id));
    }
  }, [dispatch, profile?.id, profile?.role]);

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
        setLiveNotifications((prev) => [...prev, notification]);
      });
      return () => subscription.unsubscribe();
    }
  }, [profile?.id]);

  useEffect(() => {
    if (liveNotifications.length > 0 && profile?.id && profile?.role === "admin") {
      dispatch(fetchUnassignedCasesForAdmin(profile.id));
    }
  }, [liveNotifications.length]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleApproval = (lawyer, approved) => {
    const updatedData = {
      name: lawyer.name,
      email: lawyer.email,
      license_number: lawyer.license_number,
      experience_years: lawyer.experience_years,
      rate: lawyer.rate,
      areas_of_expertise: lawyer.areas_of_expertise,
      preferred_court: lawyer.preferred_court,
      preferred_language: lawyer.preferred_language || "English",
      address: lawyer.address || "Not Provided",
      phone_number: lawyer.phone_number || "0000000000",
      approved,
    };

    dispatch(updateProfile({ id: lawyer.id, profileData: { user: updatedData } }))
      .then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          toast.success(`${lawyer.name} has been approved`);
          dispatch(fetchLawyers()); // ✅ Refresh the lawyer list
        } else {
          toast.error("Approval failed");
        }
      });
  };

  const handleCaseAssign = (caseId, lawyerId, fee, commission) => {
    alert(`Assigned case ${caseId} to lawyer ${lawyerId} for R${fee} (R${commission} commission)`);
  };

  const handleProfileUpdate = (profileData) => {
    if (!profile?.id) return;
    dispatch(updateProfile({ id: profile.id, profileData: { user: profileData } }));
  };

  const renderContent = () => {
    switch (selectedOption) {
      case "Panelist Applications":
        return <PanelistSection lawyers={lawyers} onApprove={handleApproval} />;
      case "Client Case Matching":
        return <CaseMatchSection cases={cases} lawyers={lawyers} onAssign={handleCaseAssign} />;
      case "Profile":
        return <ProfileSection profile={profile} onUpdate={handleProfileUpdate} />;
      case "Notifications":
        return (
          <NotificationsSection
            notifications={[...liveNotifications, ...(storedNotifications || [])]}
          />
        );
      default:
        return <div>Select an option from the sidebar.</div>;
    }
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
            notifications={[...liveNotifications, ...(storedNotifications || [])]}
          />
          <div className="bg-secondary shadow-lg rounded-lg p-4 lg:p-6 flex-grow">
            {loading ? <p>Loading...</p> : renderContent()}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
