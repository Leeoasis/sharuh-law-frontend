// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './components/WelcomePage';
import Register from './components/auth/Registration';
import Login from './components/auth/Login';
import ClientDashboard from './components/dashboards/ClientDashboard';
import LawyerDashboard from './components/dashboards/LawyerDashboard';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/client-dashboard" element={<ClientDashboard />} />
      <Route path="/lawyer-dashboard" element={<LawyerDashboard />} />
      {/* Add other routes as needed */}
    </Routes>
  </Router>
);

export default App;