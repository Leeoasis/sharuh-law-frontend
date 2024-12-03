import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-500 to-slate-800 flex flex-col justify-center items-center text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-primary-light">Welcome to Lawyer-Client Connect</h1>
        <p className="text-xl mb-8 text-primary-light">Connecting clients with lawyers for legal assistance.</p>
        <div className="space-x-4">
          <Link to="/register" className="bg-primary text-white px-6 py-3 rounded hover:bg-secondary transition duration-300">Sign Up</Link>
          <Link to="/login" className="bg-secondary text-white px-6 py-3 rounded hover:bg-primary transition duration-300">Login</Link>
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