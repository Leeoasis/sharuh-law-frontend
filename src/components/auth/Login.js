// src/components/Login.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchlogin } from '../../redux/auth/loginSlice';


const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(fetchlogin(formData)).then((response) => {
      if (response.type === 'login/fetchlogin/fulfilled') {
        if (response.payload.role === 'client') {
          navigate('/client-dashboard');
        } else if (response.payload.role === 'lawyer') {
          navigate('/lawyer-dashboard');
        }
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required className="mb-4 p-2 w-full border rounded" />
        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required className="mb-4 p-2 w-full border rounded" />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 w-full">Login</button>
      </form>
    </div>
  );
};

export default Login;
