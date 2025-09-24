import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ContactBackground from "../../assets/Images/contactB.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

const Contact = () => {
  return (
    <div className="bg-white text-gray-900 overflow-hidden">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
        <section
          className="relative flex items-center justify-center h-[70vh] bg-cover bg-center pt-16 md:pt-20"
          style={{ backgroundImage: `url(${ContactBackground})` }}
        >

        <div className="absolute inset-0 bg-blue-900/70"></div>
        <div className="relative z-10 text-center px-6 py-8 max-w-3xl mx-auto animate-fade-in">
          <h1 className="text-5xl font-extrabold text-white drop-shadow mb-4">
            Contact Us
          </h1>
          <p className="text-lg md:text-xl text-gray-100 mb-6 leading-relaxed animate-slide-up">
            We're here to help. Reach out to us with any questions or concerns.
          </p>
        </div>
      </section>

      {/* Contact Form + Info (Split Layout) */}
      <section className="py-20 bg-gradient-to-r from-gray-50 via-white to-gray-50 px-6 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">
          {/* Form */}
          <div className="bg-white rounded-xl shadow-md p-8 flex flex-col justify-between h-full animate-slide-left">
            <h2 className="text-3xl font-bold text-blue-700 mb-6">
              Get in Touch
            </h2>
            <form className="space-y-6 flex-1">
              <div>
                <label
                  className="block text-lg font-medium text-gray-700 mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 outline-none"
                  type="text"
                  id="name"
                  name="name"
                  required
                />
              </div>
              <div>
                <label
                  className="block text-lg font-medium text-gray-700 mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 outline-none"
                  type="email"
                  id="email"
                  name="email"
                  required
                />
              </div>
              <div>
                <label
                  className="block text-lg font-medium text-gray-700 mb-2"
                  htmlFor="message"
                >
                  Message
                </label>
                <textarea
                  className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 outline-none"
                  id="message"
                  name="message"
                  rows="6"
                  required
                ></textarea>
              </div>
              <button
                className="w-full p-3 bg-amber-500 text-gray-900 font-semibold rounded-lg hover:bg-amber-600 transition duration-300 transform hover:scale-105"
                type="submit"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="bg-gray-50 rounded-xl shadow-md p-8 flex flex-col justify-between h-full animate-slide-right">
            <div>
              <h2 className="text-3xl font-bold text-blue-700 mb-6">
                Contact Information
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                You can also reach us directly via:
              </p>
              <ul className="space-y-8">
                <li className="flex items-center gap-4">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="text-amber-500 text-2xl"
                  />
                  <span className="text-gray-700 text-lg">
                    support@legalsuise.com
                  </span>
                </li>
                <li className="flex items-center gap-4">
                  <FontAwesomeIcon
                    icon={faPhone}
                    className="text-amber-500 text-2xl"
                  />
                  <span className="text-gray-700 text-lg">(123) 456-7890</span>
                </li>
                <li className="flex items-center gap-4">
                  <FontAwesomeIcon
                    icon={faMapMarkerAlt}
                    className="text-amber-500 text-2xl"
                  />
                  <span className="text-gray-700 text-lg">
                    123 Legal Suise St, Suite 100, Legal City, LC 12345
                  </span>
                </li>
              </ul>
            </div>
            <div className="mt-10">
              <p className="text-gray-600 italic">
                Available Mon–Fri, 9 AM – 6 PM
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Map / CTA Placeholder */}
      <section className="py-16 bg-blue-50 text-center animate-fade-in">
        <h2 className="text-3xl font-bold text-blue-700 mb-4">
          We’re Here for You
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Whether you need quick legal advice or long-term representation,
          Legal Suise is your trusted bridge to justice. Don’t hesitate —
          contact us today.
        </p>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Contact;
