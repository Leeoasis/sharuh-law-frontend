
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { update } from './redux/auth/authSlice';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Landing from './components/landingSite/WelcomePage';
import Register from './components/auth/Registration';
import Login from './components/auth/Login';
import ClientDashboard from './components/dashboards/ClientDashboard';
import LawyerDashboard from './components/dashboards/LawyerDashboard';
import About from './components/landingSite/About';
import Contact from './components/landingSite/Contact';
import AdminDashboard from './components/dashboards/AdminDashboard';
import PendingApproval from './components/auth/PendingApproval';

const App = () => {
  const dispatch = useDispatch();

  // ✅ Rehydrate Redux state from localStorage on load
  useEffect(() => {
    dispatch(update());
  }, [dispatch]);

  return (
    <Router>
      <>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/client-dashboard" element={<ClientDashboard />} />
          <Route path="/lawyer-dashboard" element={<LawyerDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} /> {/* Admin Dashboard */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/pending-approval" element={<PendingApproval />} />
        </Routes>
      </>
    </Router>
  );
};

export default App;
