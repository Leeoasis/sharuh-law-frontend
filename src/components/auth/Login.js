import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchlogin } from '../../redux/auth/loginSlice';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import LoginBackground from '../../assets/Images/analysis.jpeg';

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
    <div className="bg-gray-50">
      {/* Navbar */}
      <Navbar />

      <div 
        className="min-h-screen bg-cover bg-center flex flex-col justify-center items-center relative" 
        style={{ backgroundImage: `url(${LoginBackground})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-50 z-0"></div>

        <div className="bg-white bg-opacity-70 p-8 rounded-lg shadow-md w-full max-w-3xl z-10 mt-20 mb-12">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Login to Your Account</h1>
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

            <button 
              type="submit" 
              className="bg-amber-500 text-white p-3 w-full rounded mt-4 hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              Login
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Login;
