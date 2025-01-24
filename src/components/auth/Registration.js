import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchreg } from '../../redux/auth/registerSlice';
import Navbar from '../landingSite/Navbar'; 
import Footer from '../landingSite/Footer';
import RegisterBackground from '../../assets/Images/analysis.jpeg';

const courts = ["Supreme Court", "High Court", "Magistrate Court", "Family Court", "Commercial Court"];
const expertiseAreas = ["Criminal Law", "Family Law", "Corporate Law", "Intellectual Property", "Labor Law"];

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    password_confirmation: '',
    name: '',
    role: 'client', // default role
    // profile_picture: '',
    // address: '',
    // Lawyer-specific fields
    preferred_court: '',
    license_number: '',
    areas_of_expertise: '',
    experience_years: '',
    // bio: '',
    rate: '',
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
                <input 
                  type="text" 
                  name="rate"
                  value={formData.rate}
                  onChange={handleChange} 
                  placeholder="Rate" 
                  className="mb-4 p-3 w-full border rounded focus:outline-none focus:ring-2 focus:ring-amber-500" 
                />
                <select 
                  name="areas_of_expertise"
                  value={formData.areas_of_expertise}
                  onChange={handleChange} 
                  className="mb-4 p-3 w-full border rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="">Select Area of Expertise</option>
                  {expertiseAreas.map((area, index) => (
                    <option key={index} value={area}>{area}</option>
                  ))}
                </select>
                <input 
                  type="number" 
                  name="experience_years" 
                  value={formData.experience_years} 
                  onChange={handleChange} 
                  placeholder="Years of Experience" 
                  className="mb-4 p-3 w-full border rounded focus:outline-none focus:ring-2 focus:ring-amber-500" 
                />
                <select 
                  name="preferred_court" 
                  value={formData.preferred_court} 
                  onChange={handleChange} 
                  className="mb-4 p-3 w-full border rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="">Select Preferred Court</option>
                  {courts.map((court, index) => (
                    <option key={index} value={court}>{court}</option>
                  ))}
                </select>
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