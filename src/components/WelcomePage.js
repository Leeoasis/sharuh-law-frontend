import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-green-500 flex flex-col justify-center items-center text-white">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">Welcome to Lawyer-Client Connect</h1>
        <p className="text-2xl mb-8">Connecting clients with lawyers for legal assistance.</p>
        <div className="space-x-4">
          <Link to="/register" className="bg-blue-700 text-white px-6 py-3 rounded-full hover:bg-blue-900 transition duration-300">Sign Up</Link>
          <Link to="/login" className="bg-green-700 text-white px-6 py-3 rounded-full hover:bg-green-900 transition duration-300">Login</Link>
        </div>
      </div>
      <div className="mt-12">
        <img src="https://via.placeholder.com/800x400" alt="Lawyer-Client Connect" className="rounded-lg shadow-lg" />
      </div>
      <div className="mt-12 text-center">
        <h2 className="text-4xl font-semibold mb-4">Why Choose Us?</h2>
        <p className="text-xl mb-4">We provide a platform that connects clients with experienced lawyers to help with their legal needs.</p>
        <p className="text-xl mb-4">Our platform is easy to use and ensures that you get the best legal assistance available.</p>
      </div>
    </div>
  );
};

export default Landing;