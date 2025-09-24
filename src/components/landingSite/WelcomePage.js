import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faSignInAlt,
  faGavel,
  faBalanceScale,
  faShieldAlt,
  faFileAlt,
  faComments,
  faHandshake,
} from "@fortawesome/free-solid-svg-icons";
import Navbar from "./Navbar";
import Footer from "./Footer";
import MessageImage from "../../assets/Images/analysis.jpeg";
import WhyUsImage from "../../assets/Images/ourstory.png";
import CTAImage from "../../assets/Images/cta-background.jpeg";

import FamilyLawImage from "../../assets/Images/familylaw.jpeg";
import CriminalLawImage from "../../assets/Images/criminallaw.jpeg";
import CorporateLawImage from "../../assets/Images/corporatelaw.jpeg";
import LaborLawImage from "../../assets/Images/labor.jpeg";
import ImmigrationImage from "../../assets/Images/immigration.jpeg";
import RealEstateImage from "../../assets/Images/realestate.jpeg";

const Landing = () => {
  const services = [
    {
      image: CriminalLawImage,
      title: "Criminal Law",
      context:
        "Facing criminal charges can be overwhelming. Whether it's minor offenses or serious accusations, your future is at stake.",
      bullets: [
        "Court representation for all criminal charges",
        "Bail applications and appeals",
        "Negotiation for reduced sentences",
        "Protection of constitutional rights",
      ],
    },
    {
      image: FamilyLawImage,
      title: "Family Law",
      context:
        "Family disputes are deeply personal and require compassionate yet firm legal support.",
      bullets: [
        "Divorce and separation settlements",
        "Child custody and visitation rights",
        "Adoption and guardianship",
        "Inheritance and estate disputes",
      ],
    },
    {
      image: CorporateLawImage,
      title: "Corporate Law",
      context:
        "Businesses face daily legal challenges, from contracts to compliance. We ensure your growth is protected.",
      bullets: [
        "Business formation and registration",
        "Contract drafting and review",
        "Intellectual property protection",
        "Mergers, acquisitions, and compliance",
      ],
    },
    {
      image: LaborLawImage,
      title: "Labor Law",
      context:
        "Workplace conflicts can impact livelihoods and morale. Protect your rights as an employee or employer.",
      bullets: [
        "Unfair dismissal claims",
        "Workplace harassment and discrimination",
        "Employment contract disputes",
        "Union and collective bargaining matters",
      ],
    },
    {
      image: ImmigrationImage,
      title: "Immigration",
      context:
        "Immigration procedures are complex and stressful. Our experts guide you through every step.",
      bullets: [
        "Visa and residency applications",
        "Citizenship and naturalization",
        "Asylum and refugee cases",
        "Appeals for rejected applications",
      ],
    },
    {
      image: RealEstateImage,
      title: "Real Estate",
      context:
        "Property deals involve high-value risks. Legal expertise ensures smooth transactions.",
      bullets: [
        "Property transfers and deeds",
        "Lease and rental agreements",
        "Dispute resolution for property conflicts",
        "Land development and zoning compliance",
      ],
    },
  ];

  return (
    <div className="bg-white text-gray-900 overflow-hidden">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <div
        className="relative flex items-center justify-center h-[100vh] bg-cover bg-center animate-fade-in pt-10 md:pt-10"
        style={{ backgroundImage: `url(${MessageImage})` }}
      >
        <div className="absolute inset-0 bg-blue-900/70"></div>
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto animate-slide-up">
          <h1 className="text-6xl md:text-7xl font-extrabold text-white drop-shadow-lg mb-6 animate-float">
            Legal Suise
          </h1>
          <p className="text-xl md:text-2xl text-gray-100 mb-10 leading-relaxed animate-fade-in">
            Where law meets innovation. Legal Suise is the ultimate digital
            bridge between clients and trusted lawyers — secure, transparent, and
            powerful.
          </p>
          <div className="flex flex-wrap justify-center gap-6 animate-bounce-slow">
            <Link
              to="/register"
              className="bg-amber-500 px-10 py-4 text-lg font-bold rounded-full shadow-md hover:bg-amber-600 transition transform hover:scale-105 animate-pulse-slow"
            >
              <FontAwesomeIcon icon={faUserPlus} className="mr-2" /> Get Started
            </Link>
            <Link
              to="/login"
              className="bg-blue-700 px-10 py-4 text-lg font-bold rounded-full shadow-md hover:bg-blue-800 transition transform hover:scale-105 animate-pulse-slow"
            >
              <FontAwesomeIcon icon={faSignInAlt} className="mr-2" /> Login
            </Link>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-r from-gray-50 via-white to-gray-50 px-6 md:px-16 lg:px-24 animate-fade-in">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Text Side */}
          <div className="animate-slide-left">
            <h2 className="text-4xl font-bold text-blue-700 mb-6 animate-float">
              Why Clients Choose Legal Suise
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Finding the right lawyer shouldn’t feel overwhelming. At Legal Suise,
              we make legal help accessible, transparent, and built around your needs.
            </p>
            <ul className="space-y-6">
              <li className="flex items-start gap-4 animate-fade-in">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 flex-shrink-0 animate-wiggle hover:animate-none">
                  <FontAwesomeIcon icon={faGavel} className="text-blue-700 text-xl" />
                </div>
                <p className="text-gray-700 text-lg">
                  <span className="font-semibold">Top Lawyers,</span> vetted and ready
                  to handle even the most complex cases.
                </p>
              </li>
              <li className="flex items-start gap-4 animate-fade-in delay-200">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 flex-shrink-0 animate-wiggle hover:animate-none">
                  <FontAwesomeIcon icon={faBalanceScale} className="text-blue-700 text-xl" />
                </div>
                <p className="text-gray-700 text-lg">
                  <span className="font-semibold">Clear Pricing,</span> no hidden fees
                  or billing surprises.
                </p>
              </li>
              <li className="flex items-start gap-4 animate-fade-in delay-300">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 flex-shrink-0 animate-wiggle hover:animate-none">
                  <FontAwesomeIcon icon={faShieldAlt} className="text-blue-700 text-xl" />
                </div>
                <p className="text-gray-700 text-lg">
                  <span className="font-semibold">Privacy Guaranteed,</span> with
                  secure and confidential handling of your case.
                </p>
              </li>
            </ul>
          </div>
          {/* Image Side */}
          <div className="animate-slide-right">
            <img
              src={WhyUsImage}
              alt="Why choose us"
              className="rounded-xl shadow-lg w-full object-cover h-96 animate-float"
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white px-6 md:px-16 lg:px-24 animate-fade-in">
        <div className="text-center mb-14 animate-slide-up">
          <h2 className="text-4xl font-bold text-blue-700 animate-float">How It Works</h2>
          <p className="text-lg text-gray-600">
            Connecting clients and lawyers in 3 powerful steps.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            {
              icon: faFileAlt,
              step: "1. Post Your Case",
              text: "Describe your legal issue with confidence.",
            },
            {
              icon: faComments,
              step: "2. Get Matched",
              text: "AI-driven matching with top lawyers.",
            },
            {
              icon: faHandshake,
              step: "3. Resolve",
              text: "Collaborate securely to reach success.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-gray-50 p-10 rounded-xl shadow-md text-center hover:shadow-lg transition transform hover:scale-105 animate-zoom-in"
            >
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-blue-100 animate-wiggle hover:animate-none">
                <FontAwesomeIcon icon={item.icon} className="text-blue-700 text-2xl" />
              </div>
              <h3 className="text-2xl font-semibold text-blue-700 mb-2">{item.step}</h3>
              <p className="text-gray-600">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services - Alternating Layout */}
      {services.map((service, i) => (
        <section
          key={i}
          className={`py-20 ${i % 2 === 0 ? "bg-gray-50" : "bg-white"} px-6 md:px-16 lg:px-24 animate-fade-in`}
        >
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
            {/* Image */}
            <div className={`flex-1 ${i % 2 === 1 ? "md:order-2" : ""} animate-slide-left`}>
              <img
                src={service.image}
                alt={service.title}
                className="rounded-xl shadow-md w-full h-80 object-cover animate-float"
              />
            </div>
            {/* Text */}
            <div className="flex-1 animate-slide-right">
              <h3 className="text-2xl font-bold text-blue-700 mb-4 animate-float">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-4">{service.context}</p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 mb-6">
                {service.bullets.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
              <Link
                to="/services"
                className="inline-block mt-2 px-6 py-2 bg-amber-500 text-gray-900 font-semibold rounded-full shadow hover:bg-amber-600 transition transform hover:scale-105 animate-pulse-slow"
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>
      ))}

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-r from-blue-50 via-white to-blue-50 px-6 md:px-16 lg:px-24 animate-fade-in">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-blue-700 mb-12 animate-float">
            Client Success Stories
          </h2>
          <div className="grid md:grid-cols-2 gap-8 mt-10">
            <div className="bg-gray-50 rounded-xl shadow-md p-6 animate-zoom-in">
              <blockquote className="italic text-lg text-gray-700">
                “Legal Suise helped me resolve a major business dispute in weeks
                instead of months.”
              </blockquote>
              <p className="mt-4 font-bold text-amber-600">– Sarah M.</p>
            </div>
            <div className="bg-gray-50 rounded-xl shadow-md p-6 animate-zoom-in delay-200">
              <blockquote className="italic text-lg text-gray-700">
                “A futuristic platform. I felt safe, supported, and empowered.”
              </blockquote>
              <p className="mt-4 font-bold text-amber-600">– Daniel K.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section
        className="relative py-20 bg-cover bg-center text-center px-6 md:px-16 lg:px-24 animate-fade-in"
        style={{ backgroundImage: `url(${CTAImage})` }}
      >
        <div className="absolute inset-0 bg-white/80"></div>
        <div className="relative z-10 max-w-4xl mx-auto animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold text-blue-700 mb-6 animate-float">
            Ready to Experience Legal Suise?
          </h2>
          <p className="text-lg mb-10 max-w-2xl mx-auto text-gray-700">
            Take the first step into the future of law today. Sign up and connect
            with trusted legal professionals in just a few clicks.
          </p>
          <Link
            to="/register"
            className="bg-amber-500 text-gray-900 px-10 py-4 text-lg font-bold rounded-full shadow-md hover:bg-amber-600 transition transform hover:scale-105 animate-pulse-slow"
          >
            Join Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Landing;
