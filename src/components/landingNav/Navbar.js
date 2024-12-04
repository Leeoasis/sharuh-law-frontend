import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesomeIcon
import { faBars } from "@fortawesome/free-solid-svg-icons"; // Import the specific icon

const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 w-full bg-gray-900 text-white shadow-lg z-50">
            <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
                {/* Logo */}
                <Link to="/" className="text-2xl font-bold text-amber-400">
                    LawyerConnect
                </Link>
                {/* Desktop Links */}
                <div className="hidden md:flex space-x-8">
                    <Link
                        to="/"
                        className="hover:text-amber-400 transition duration-300 flex items-center"
                    >
                        Home
                    </Link>
                    <Link
                        to="/about"
                        className="hover:text-amber-400 transition duration-300 flex items-center"
                    >
                        About
                    </Link>
                    <Link
                        to="/services"
                        className="hover:text-amber-400 transition duration-300 flex items-center"
                    >
                        Services
                    </Link>
                    <Link
                        to="/contact"
                        className="hover:text-amber-400 transition duration-300 flex items-center"
                    >
                        Contact
                    </Link>
                    {/* Add Signup and Login buttons with matching style */}
                    <Link
                        to="/register"
                        className="inline-block text-white hover:text-amber-400 transition duration-300 py-2 px-4 border border-transparent rounded flex items-center"
                    >
                        Sign Up
                    </Link>
                    <Link
                        to="/login"
                        className="inline-block text-white hover:text-amber-400 transition duration-300 py-2 px-4 border border-transparent rounded flex items-center"
                    >
                        Login
                    </Link>
                </div>
                {/* Hamburger Menu */}
                <button className="md:hidden flex items-center">
                    <span className="text-amber-400 text-2xl">
                        <FontAwesomeIcon icon={faBars} />
                    </span>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
