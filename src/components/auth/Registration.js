// src/components/Register.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchreg } from '../../redux/auth/registerSlice';

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
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mb-4">Register</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required className="mb-4 p-2 w-full border rounded" />
        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required className="mb-4 p-2 w-full border rounded" />
        <input type="password" name="password_confirmation" value={formData.password_confirmation} onChange={handleChange} placeholder="Confirm Password" required className="mb-4 p-2 w-full border rounded" />
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required className="mb-4 p-2 w-full border rounded" />
        <select name="role" value={formData.role} onChange={handleChange} className="mb-4 p-2 w-full border rounded">
          <option value="client">Client</option>
          <option value="lawyer">Lawyer</option>
        </select>

        {formData.role === 'lawyer' && (
          <>
            <input type="text" name="license_number" value={formData.license_number} onChange={handleChange} placeholder="License Number" className="mb-4 p-2 w-full border rounded" />
            <textarea name="specializations" value={formData.specializations} onChange={handleChange} placeholder="Specializations" className="mb-4 p-2 w-full border rounded"></textarea>
            <input type="number" name="experience_years" value={formData.experience_years} onChange={handleChange} placeholder="Experience Years" className="mb-4 p-2 w-full border rounded" />
            {/* <textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="Bio" className="mb-4 p-2 w-full border rounded"></textarea> */}
            {/* <input type="text" name="languages" value={formData.languages} onChange={handleChange} placeholder="Languages" className="mb-4 p-2 w-full border rounded" /> */}
            {/* <input type="number" name="hourly_rate" value={formData.hourly_rate} onChange={handleChange} placeholder="Hourly Rate" className="mb-4 p-2 w-full border rounded" /> */}
            {/* <textarea name="office_address" value={formData.office_address} onChange={handleChange} placeholder="Office Address" className="mb-4 p-2 w-full border rounded"></textarea>
            <input type="text" name="practice_state" value={formData.practice_state} onChange={handleChange} placeholder="Practice State" className="mb-4 p-2 w-full border rounded" />
            <input type="number" name="average_rating" value={formData.average_rating} onChange={handleChange} placeholder="Average Rating" className="mb-4 p-2 w-full border rounded" />
            <input type="number" name="review_count" value={formData.review_count} onChange={handleChange} placeholder="Review Count" className="mb-4 p-2 w-full border rounded" />
            <textarea name="certifications" value={formData.certifications} onChange={handleChange} placeholder="Certifications" className="mb-4 p-2 w-full border rounded"></textarea>
            <input type="checkbox" name="verification_status" checked={formData.verification_status} onChange={handleChange} className="mb-4 p-2 w-full border rounded" /> Verification Status */}
            {/* <input type="text" name="portfolio_url" value={formData.portfolio_url} onChange={handleChange} placeholder="Portfolio URL" className="mb-4 p-2 w-full border rounded" /> */}
          </>
        )}

        {formData.role === 'client' && (
          <>
            <input type="text" name="preferred_language" value={formData.preferred_language} onChange={handleChange} placeholder="Preferred Language" className="mb-4 p-2 w-full border rounded" />
            <input type="text" name="budget" value={formData.budget} onChange={handleChange} placeholder="Budget" className="mb-4 p-2 w-full border rounded" />
            {/* <input type="text" name="case_type" value={formData.case_type} onChange={handleChange} placeholder="Case Type" className="mb-4 p-2 w-full border rounded" /> */}
            {/* <input type="number" name="current_case_id" value={formData.current_case_id} onChange={handleChange} placeholder="Current Case ID" className="mb-4 p-2 w-full border rounded" /> */}
          </>
        )}

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 w-full">Register</button>
      </form>
    </div>
  );
};

export default Register;