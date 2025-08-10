import React from "react";
import { Link } from "react-router-dom";
import Navbar from './Navbar';
import Footer from './Footer';
import { FaUsers, FaGavel, FaShieldAlt, FaHandHoldingUsd } from 'react-icons/fa';
import FamilyImage from '../../assets/Images/family.jpeg';
import CriminalLawImage from '../../assets/Images/criminal.jpeg';
import CorporateLawImage from '../../assets/Images/corporate.jpeg';
import AboutBackground from '../../assets/Images/aboutB.jpeg';

const About = () => {
  return (
    <div className="bg-gray-900 text-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative flex items-center justify-center h-[70vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${AboutBackground})` }}
      >
        {/* Shadow Overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 py-8 max-w-3xl mx-auto">
          <h1 className="text-5xl font-extrabold text-amber-500 drop-shadow-lg mb-4 animate-fade-in">
            About LawyerConnect
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-6 animate-slide-up">
            Connecting you with trusted lawyers to make legal services more accessible.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-gradient-to-r from-gray-800 to-gray-900 text-white">
        <div className="max-w-7xl mx-auto text-center px-6">
          <h2 className="text-4xl font-semibold mb-4">Our Story</h2>
          <p className="mt-4 text-lg leading-relaxed">
            LawyerConnect was founded with a simple goal: to bridge the gap between clients in need of legal help and trusted lawyers with the expertise they can rely on.
            We recognized that finding the right lawyer can be overwhelming, so we created a streamlined, user-friendly platform that makes it easier than ever to access legal support for any situation.
          </p>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-amber-400 text-gray-900">
        <div className="max-w-7xl mx-auto text-center px-6">
          <h2 className="text-4xl font-semibold mb-8">How It Works</h2>
          <p className="mt-4 text-lg mb-12 leading-relaxed">
            Connecting with a lawyer through LawyerConnect is simple and efficient. Here’s how it works:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-700 p-6 rounded-lg shadow-lg text-center transform transition duration-300 hover:scale-105">
              <FaGavel className="text-amber-400 text-4xl mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-amber-400">Step 1: Describe Your Legal Issue</h3>
              <p className="text-gray-300">Provide a brief overview of your legal needs to help us match you with the best lawyer.</p>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg shadow-lg text-center transform transition duration-300 hover:scale-105">
              <FaUsers className="text-amber-400 text-4xl mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-amber-400">Step 2: Receive Matches</h3>
              <p className="text-gray-300">Our system will suggest the most suitable lawyers based on your needs and location.</p>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg shadow-lg text-center transform transition duration-300 hover:scale-105">
              <FaShieldAlt className="text-amber-400 text-4xl mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-amber-400">Step 3: Connect & Consult</h3>
              <p className="text-gray-300">Once you choose a lawyer, get in touch directly to schedule your consultation and begin your legal journey.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto text-center px-6">
          <h2 className="text-4xl font-semibold mb-8">Our Core Values</h2>
          <p className="mt-4 text-lg mb-12 leading-relaxed">
            At LawyerConnect, we are committed to:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-700 p-6 rounded-lg shadow-lg text-center transform transition duration-300 hover:scale-105">
              <FaShieldAlt className="text-amber-400 text-4xl mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-amber-400">Trust</h3>
              <p className="text-gray-300">We ensure that every lawyer in our network is vetted and trustworthy, so you can have peace of mind.</p>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg shadow-lg text-center transform transition duration-300 hover:scale-105">
              <FaHandHoldingUsd className="text-amber-400 text-4xl mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-amber-400">Accessibility</h3>
              <p className="text-gray-300">Legal help should be accessible to everyone, which is why we provide easy-to-use tools for connecting with lawyers.</p>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg shadow-lg text-center transform transition duration-300 hover:scale-105">
              <FaUsers className="text-amber-400 text-4xl mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-amber-400">Expertise</h3>
              <p className="text-gray-300">Our lawyers are experienced and specialized in various fields, ensuring you get the best legal support possible.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto text-center px-6">
          <h2 className="text-4xl font-semibold mb-8">Our Services</h2>
          <p className="mt-4 text-lg mb-12 leading-relaxed">
            At LawyerConnect, we offer a variety of services to make the process of finding the right lawyer easier and faster. Our platform connects clients with lawyers who specialize in various areas of law.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-700 p-6 rounded-lg shadow-lg text-center transform transition duration-300 hover:scale-105">
              <img src={FamilyImage} alt="Family Law" className="mb-4 mx-auto rounded-lg" />
              <h3 className="text-xl font-semibold mb-2 text-amber-400">Family Law</h3>
              <p className="text-gray-300">Whether you need help with divorce, child custody, or other family matters, we have expert family lawyers ready to assist.</p>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg shadow-lg text-center transform transition duration-300 hover:scale-105">
              <img src={CriminalLawImage} alt="Criminal Defense" className="mb-4 mx-auto rounded-lg" />
              <h3 className="text-xl font-semibold mb-2 text-amber-400">Criminal Defense</h3>
              <p className="text-gray-300">Our network includes experienced criminal defense attorneys who can help you navigate criminal charges with confidence.</p>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg shadow-lg text-center transform transition duration-300 hover:scale-105">
              <img src={CorporateLawImage} alt="Corporate Law" className="mb-4 mx-auto rounded-lg" />
              <h3 className="text-xl font-semibold mb-2 text-amber-400">Corporate Law</h3>
              <p className="text-gray-300">For businesses in need of legal advice on mergers, contracts, and intellectual property, our corporate lawyers are here to help.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-amber-400 text-gray-900 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-semibold mb-4">Let Us Help You Find the Right Lawyer</h2>
          <p className="mt-4 text-lg mb-8 leading-relaxed">Ready to get legal advice? Connect with the right lawyer today!</p>
          <Link
            to="/register"
            className="inline-block px-8 py-3 bg-gray-900 text-amber-400 font-semibold rounded-lg shadow-lg hover:bg-gray-700 transition duration-300"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default About;