import React from "react";
import Navbar from './Navbar';
import Footer from './Footer';
import ContactBackground from '../../assets/Images/contactB.jpeg';

const Contact = () => {
  return (
    <div className="bg-gray-900 text-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative flex items-center justify-center h-[70vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${ContactBackground})` }}
      >
        {/* Shadow Overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 py-8 max-w-3xl mx-auto">
          <h1 className="text-5xl font-extrabold text-amber-500 drop-shadow-lg mb-4 animate-fade-in">
            Contact Us
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-6 animate-slide-up">
            We're here to help. Reach out to us with any questions or concerns.
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-semibold mb-8 text-center">Get in Touch</h2>
          <form className="max-w-3xl mx-auto">
            <div className="mb-4">
              <label className="block text-lg mb-2" htmlFor="name">Name</label>
              <input className="w-full p-3 rounded-lg bg-gray-700 text-gray-300" type="text" id="name" name="name" required />
            </div>
            <div className="mb-4">
              <label className="block text-lg mb-2" htmlFor="email">Email</label>
              <input className="w-full p-3 rounded-lg bg-gray-700 text-gray-300" type="email" id="email" name="email" required />
            </div>
            <div className="mb-4">
              <label className="block text-lg mb-2" htmlFor="message">Message</label>
              <textarea className="w-full p-3 rounded-lg bg-gray-700 text-gray-300" id="message" name="message" rows="5" required></textarea>
            </div>
            <button className="w-full p-3 bg-amber-500 text-gray-900 font-semibold rounded-lg hover:bg-amber-600 transition duration-300" type="submit">Send Message</button>
          </form>
        </div>
      </section>

      {/* Additional Contact Information */}
      <section className="py-16 bg-gray-500 text-white">
        <div className="max-w-7xl mx-auto text-center px-6">
          <h2 className="text-4xl font-semibold mb-8">Contact Information</h2>
          <p className="mt-4 text-lg mb-12 leading-relaxed">
            You can also reach us at:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-700 p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-xl font-semibold mb-2 text-amber-400">Email</h3>
              <p className="text-gray-300">support@lawyerconnect.com</p>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-xl font-semibold mb-2 text-amber-400">Phone</h3>
              <p className="text-gray-300">(123) 456-7890</p>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-xl font-semibold mb-2 text-amber-400">Address</h3>
              <p className="text-gray-300">123 LawyerConnect St, Suite 100, Legal City, LC 12345</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Contact;