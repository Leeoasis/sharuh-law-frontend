// src/components/Register.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchreg } from '../../redux/auth/registerSlice';
import Navbar from '../landingNav/Navbar'; 
import Footer from '../landingNav/Footer';
import RegisterBackground from '../../assets/Images/analysis.jpeg';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    password_confirmation: '',
    name: '',
    role: 'client', // default role
    // phone_number: '',
    // profile_picture: '',
    // address: '',
    // Lawyer-specific fields
    license_number: '',
    specializations: '',
    experience_years: '',
    // bio: '',
    // languages: '',
    // hourly_rate: '',
    // office_address: '',
    // practice_state: '',
    // average_rating: '',
    // review_count: '',
    // certifications: '',
    // verification_status: false,
    // portfolio_url: '',
    // Client-specific fields
    preferred_language: '',
    budget: '',
    // case_type: '',
    // current_case_id: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(fetchreg(formData)).then((response) => {
      if (response.type === 'sign_up/fetchregistration/fulfilled') {
        if (response.payload.role === 'client') {
          navigate('/client-dashboard');
        } else if (response.payload.role === 'lawyer') {
          navigate('/lawyer-dashboard');
        }
        navigate('/login'); // Navigate to login page after successful registration
      }
    });
  };

  return (
    <div className="bg-gray-50">
      {/* Navbar */}
      <Navbar />

      <div 
        className="min-h-screen bg-cover bg-center flex flex-col justify-center items-center relative" 
        style={{ backgroundImage: `url(${RegisterBackground})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-50 z-0"></div>

        <div className="bg-white bg-opacity-70 p-8 rounded-lg shadow-md w-full max-w-3xl z-10 mt-20 mb-12">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Create Your Account</h1>
          <form onSubmit={handleSubmit}>
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              placeholder="Email" 
              required 
              className="mb-4 p-3 w-full border rounded focus:outline-none focus:ring-2 focus:ring-amber-500" 
            />
            <input 
              type="password" 
              name="password" 
              value={formData.password} 
              onChange={handleChange} 
              placeholder="Password" 
              required 
              className="mb-4 p-3 w-full border rounded focus:outline-none focus:ring-2 focus:ring-amber-500" 
            />
            <input 
              type="password" 
              name="password_confirmation" 
              value={formData.password_confirmation} 
              onChange={handleChange} 
              placeholder="Confirm Password" 
              required 
              className="mb-4 p-3 w-full border rounded focus:outline-none focus:ring-2 focus:ring-amber-500" 
            />
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              placeholder="Full Name" 
              required 
              className="mb-4 p-3 w-full border rounded focus:outline-none focus:ring-2 focus:ring-amber-500" 
            />
            <select 
              name="role" 
              value={formData.role} 
              onChange={handleChange} 
              className="mb-4 p-3 w-full border rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="client">Client</option>
              <option value="lawyer">Lawyer</option>
            </select>

            {formData.role === 'lawyer' && (
              <>
                <input 
                  type="text" 
                  name="license_number" 
                  value={formData.license_number} 
                  onChange={handleChange} 
                  placeholder="License Number" 
                  className="mb-4 p-3 w-full border rounded focus:outline-none focus:ring-2 focus:ring-amber-500" 
                />
                <textarea 
                  name="specializations" 
                  value={formData.specializations} 
                  onChange={handleChange} 
                  placeholder="Specializations" 
                  className="mb-4 p-3 w-full border rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
                ></textarea>
                <input 
                  type="number" 
                  name="experience_years" 
                  value={formData.experience_years} 
                  onChange={handleChange} 
                  placeholder="Years of Experience" 
                  className="mb-4 p-3 w-full border rounded focus:outline-none focus:ring-2 focus:ring-amber-500" 
                />
              </>
            )}

            {formData.role === 'client' && (
              <>
                <input 
                  type="text" 
                  name="preferred_language" 
                  value={formData.preferred_language} 
                  onChange={handleChange} 
                  placeholder="Preferred Language" 
                  className="mb-4 p-3 w-full border rounded focus:outline-none focus:ring-2 focus:ring-amber-500" 
                />
                <input 
                  type="text" 
                  name="budget" 
                  value={formData.budget} 
                  onChange={handleChange} 
                  placeholder="Budget" 
                  className="mb-4 p-3 w-full border rounded focus:outline-none focus:ring-2 focus:ring-amber-500" 
                />
              </>
            )}

            <button type="submit" className="bg-amber-500 text-white p-3 w-full rounded mt-4 hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500">
              Register
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Register;
