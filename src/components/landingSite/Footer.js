// src/components/Footer.js
import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faTwitter,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Section */}
        <div>
          <h3 className="text-lg font-bold mb-4 text-amber-400">About Us</h3>
          <p className="text-gray-400">
            Lawyer-Client Connect is your trusted platform for finding legal
            experts quickly and efficiently.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-bold mb-4 text-amber-400">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/about" className="hover:text-amber-400">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-amber-400">
                Our Services
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-amber-400">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-bold mb-4 text-amber-400">Contact Us</h3>
          <p className="text-gray-400">
            <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
            support@lawyerclientconnect.com
          </p>
          <p className="text-gray-400">
            <FontAwesomeIcon icon={faPhone} className="mr-2" />
            (123) 456-7890
          </p>

          <div className="flex space-x-4 mt-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-400"
            >
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-400"
            >
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-400"
            >
              <FontAwesomeIcon icon={faLinkedinIn} />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-gray-600 mt-8">
        &copy; {new Date().getFullYear()} Lawyer-Client Connect. All rights
        reserved.
      </div>
    </footer>
  );
};

export default Footer;
