import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserPlus,
  faSignInAlt,
  faGavel,
  faFileAlt,
  faComments,
  faEnvelope,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';
import Navbar from './Navbar';
import Footer from './Footer';
import MessageImage from '../../assets/Images/analysis.jpeg';

const Landing = () => {
  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <div
        className="relative flex items-center justify-center h-[70vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${MessageImage})` }}
      >
        {/* Shadow Overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 py-8 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-amber-500 drop-shadow-lg mb-4 animate-fade-in">
            Lawyer-Client Connect
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-6 animate-slide-up">
            Connecting you with trusted legal experts worldwide.
          </p>
          <div className="flex flex-wrap justify-center gap-4 animate-fade-in">
            <Link
              to="/register"
              className="bg-amber-500 px-6 py-3 text-lg font-semibold rounded-full hover:bg-amber-400 transition duration-300 shadow-lg"
            >
              <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
              Sign Up
            </Link>
            <Link
              to="/login"
              className="bg-gray-700 px-6 py-3 text-lg font-semibold rounded-full hover:bg-gray-600 transition duration-300 shadow-lg"
            >
              <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
              Login
            </Link>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-gray-800 text-white py-16 px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-amber-500">Why Choose Us?</h2>
          <p className="text-lg mt-4 text-gray-300">
            Discover why thousands of clients trust Lawyer-Client Connect.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-gray-700 p-6 rounded-lg shadow-lg text-center">
            <FontAwesomeIcon icon={faGavel} className="text-amber-400 text-3xl mb-4" />
            <h3 className="text-xl font-semibold mb-2">Expert Lawyers</h3>
            <p className="text-gray-300">Access a network of experienced legal professionals.</p>
          </div>
          <div className="bg-gray-700 p-6 rounded-lg shadow-lg text-center">
            <FontAwesomeIcon icon={faFileAlt} className="text-amber-400 text-3xl mb-4" />
            <h3 className="text-xl font-semibold mb-2">Easy Process</h3>
            <p className="text-gray-300">Find the right lawyer with just a few clicks.</p>
          </div>
          <div className="bg-gray-700 p-6 rounded-lg shadow-lg text-center">
            <FontAwesomeIcon icon={faComments} className="text-amber-400 text-3xl mb-4" />
            <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
            <p className="text-gray-300">Get assistance whenever you need it.</p>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-gray-900 text-white py-16 px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-amber-500">What Our Clients Say</h2>
        </div>
        <div className="carousel max-w-5xl mx-auto">
          <div className="carousel-item p-6 bg-gray-800 rounded-lg shadow-lg text-center">
            <blockquote className="italic text-lg">
              "Lawyer-Client Connect made finding a lawyer stress-free! Highly recommend."
            </blockquote>
            <p className="mt-4 font-bold text-amber-500">- Jane Doe</p>
          </div>
          <div className="carousel-item p-6 bg-gray-800 rounded-lg shadow-lg text-center">
            <blockquote className="italic text-lg">
              "The platform is professional and easy to use. Exceptional service!"
            </blockquote>
            <p className="mt-4 font-bold text-amber-500">- John Smith</p>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-gray-800 text-white py-16 px-4">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-amber-500">Contact Us</h2>
          <p className="text-lg mt-4 text-gray-300">
            Need help? Reach out to us today!
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-8 max-w-5xl mx-auto">
          <div className="flex-1 bg-gray-700 p-8 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">Contact Information</h3>
            <p className="text-lg flex items-center mb-4">
              <FontAwesomeIcon icon={faEnvelope} className="mr-2" /> support@lawyerclientconnect.com
            </p>
            <p className="text-lg flex items-center">
              <FontAwesomeIcon icon={faPhone} className="mr-2" /> (123) 456-7890
            </p>
          </div>
          <div className="flex-1 bg-gray-700 p-8 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">Send Us a Message</h3>
            <form>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full mb-4 p-3 rounded bg-gray-600 text-white"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full mb-4 p-3 rounded bg-gray-600 text-white"
              />
              <textarea
                placeholder="Your Message"
                className="w-full mb-4 p-3 rounded bg-gray-600 text-white"
                rows="4"
              ></textarea>
              <button className="bg-amber-500 text-white px-6 py-3 rounded-full hover:bg-amber-400 transition duration-300">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Landing;
