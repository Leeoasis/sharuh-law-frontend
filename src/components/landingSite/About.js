import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { FaShieldAlt, FaGavel, FaHandshake } from "react-icons/fa";

import AboutBackground from "../../assets/Images/aboutb.jpeg";

// Section images
import StoryImage from "../../assets/Images/ourstory.png";
import CTAImage from "../../assets/Images/cta-background.jpeg";

import FamilyLawImage from "../../assets/Images/familylaw.jpeg";
import CriminalLawImage from "../../assets/Images/criminallaw.jpeg";
import CorporateLawImage from "../../assets/Images/corporatelaw.jpeg";
import LaborLawImage from "../../assets/Images/labor.jpeg";
import ImmigrationImage from "../../assets/Images/immigration.jpeg";
import RealEstateImage from "../../assets/Images/realestate.jpeg";
import TaxLawImage from "../../assets/Images/taxlaw.jpeg";
import HumanRightsImage from "../../assets/Images/humanrights.jpeg";

const About = () => {
  const services = [
    {
      image: FamilyLawImage,
      problem: "Going through a divorce or custody battle?",
      context:
        "Family disputes are often deeply emotional and complex, requiring legal guidance that balances fairness and compassion.",
      solution:
        "Our family lawyers support you with clarity and empathy across all sensitive issues:",
      bullets: [
        "Divorce and separation settlements",
        "Child custody and visitation rights",
        "Adoption and guardianship",
        "Inheritance and estate disputes",
      ],
    },
    {
      image: CriminalLawImage,
      problem: "Facing criminal charges?",
      context:
        "A criminal accusation can put your freedom, reputation, and livelihood on the line.",
      solution: "Our defense attorneys fight tirelessly to ensure justice is upheld:",
      bullets: [
        "Representation in court hearings and trials",
        "Bail applications and appeals",
        "Negotiation of reduced sentences",
        "Protection of constitutional rights",
      ],
    },
    {
      image: CorporateLawImage,
      problem: "Starting or growing a business?",
      context:
        "Every business decision carries legal implications that can make or break your growth.",
      solution: "Our corporate lawyers help businesses thrive by providing:",
      bullets: [
        "Business formation and registration",
        "Contract drafting and review",
        "Intellectual property protection",
        "Mergers, acquisitions, and compliance",
      ],
    },
    {
      image: LaborLawImage,
      problem: "Workplace disputes or unfair treatment?",
      context:
        "Employment issues affect not only livelihoods but also morale and workplace culture.",
      solution:
        "Our labor law specialists safeguard rights for both employers and employees:",
      bullets: [
        "Unfair dismissal claims",
        "Workplace harassment and discrimination",
        "Employment contracts and disputes",
        "Union and collective bargaining matters",
      ],
    },
    {
      image: ImmigrationImage,
      problem: "Struggling with immigration issues?",
      context:
        "Immigration procedures are often complicated, time-consuming, and stressful.",
      solution:
        "Our immigration lawyers make the process smoother with expertise in:",
      bullets: [
        "Visa and residency applications",
        "Citizenship and naturalization",
        "Asylum and refugee cases",
        "Appeals for rejected applications",
      ],
    },
    {
      image: RealEstateImage,
      problem: "Buying or selling property?",
      context:
        "Property transactions involve high-value risks and legal complexities that require precision.",
      solution:
        "Our real estate lawyers guide you through safe and compliant transactions:",
      bullets: [
        "Property transfers and deeds",
        "Lease and rental agreements",
        "Dispute resolution for property conflicts",
        "Land development and zoning compliance",
      ],
    },
    {
      image: TaxLawImage,
      problem: "Trouble with taxes or audits?",
      context:
        "Mistakes in tax matters can lead to heavy penalties, audits, or financial losses.",
      solution:
        "Our tax lawyers provide expert assistance in minimizing risks and ensuring compliance:",
      bullets: [
        "Tax planning and advisory services",
        "Representation during audits",
        "Resolution of tax disputes",
        "Debt negotiation and settlements",
      ],
    },
    {
      image: HumanRightsImage,
      problem: "Facing discrimination or rights violations?",
      context:
        "Civil and human rights are fundamental, and violations can have life-changing consequences.",
      solution:
        "Our human rights advocates defend freedom and equality through:",
      bullets: [
        "Anti-discrimination litigation",
        "Constitutional law challenges",
        "Representation before human rights tribunals",
        "Advocacy for marginalized groups",
      ],
    },
  ];

  return (
    <div className="bg-white text-gray-900 overflow-hidden">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section
        className="relative flex items-center justify-center h-[70vh] bg-cover bg-center animate-fade-in"
        style={{ backgroundImage: `url(${AboutBackground})` }}
      >
        <div className="absolute inset-0 bg-blue-900/70"></div>
        <div className="relative z-10 text-center px-6 md:px-16 lg:px-24 py-8 max-w-3xl mx-auto animate-slide-up">
          <h1 className="text-6xl font-extrabold text-white drop-shadow mb-4 animate-float">
            About Legal Suise
          </h1>
          <p className="text-lg md:text-xl text-gray-100 mb-6 leading-relaxed animate-fade-in">
            We combine technology and legal expertise to give you faster,
            smarter, and more secure access to justice.
          </p>
        </div>
      </section>

      {/* Our Story - Split Layout */}
      <section className="py-20 bg-gradient-to-r from-gray-50 to-white px-6 md:px-16 lg:px-24 animate-fade-in">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="animate-slide-left">
            <img
              src={StoryImage}
              alt="Our Story"
              className="rounded-xl shadow-lg object-cover w-full h-96 animate-float"
            />
          </div>
          {/* Text */}
          <div className="animate-slide-right">
            <h2 className="text-4xl font-bold text-blue-700 mb-6 animate-float">Our Story</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Legal Suise was founded to make justice accessible to everyone. We
              know that finding the right lawyer at the right time can be
              overwhelming. Our platform removes the guesswork by connecting
              clients with vetted lawyers in every field — efficiently,
              transparently, and securely.
            </p>
            <blockquote className="text-xl italic text-amber-600 font-semibold border-l-4 border-amber-500 pl-4 animate-pulse-slow">
              “Justice should not be a privilege — it should be a right for all.”
            </blockquote>
          </div>
        </div>
      </section>

      {/* Why Clients Trust Us */}
      <section className="py-20 bg-gradient-to-r from-blue-50 via-white to-blue-50 px-6 md:px-16 lg:px-24 animate-fade-in">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-blue-700 mb-6 animate-float">
            Why Clients Trust Us
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-12">
            More than promises — here’s why thousands of clients place their
            trust in Legal Suise.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                icon: <FaShieldAlt className="text-amber-500 text-5xl mb-4 animate-wiggle" />,
                title: "Secure & Confidential",
                text: "Your documents and data are encrypted and handled with strict confidentiality.",
              },
              {
                icon: <FaGavel className="text-amber-500 text-5xl mb-4 animate-wiggle delay-200" />,
                title: "Proven Expertise",
                text: "Our network of vetted lawyers has a track record of winning complex cases.",
              },
              {
                icon: <FaHandshake className="text-amber-500 text-5xl mb-4 animate-wiggle delay-300" />,
                title: "Client-First Approach",
                text: "We prioritize outcomes that serve your best interests above all else.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition text-center animate-zoom-in"
              >
                {item.icon}
                <h3 className="text-xl font-semibold text-blue-700 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-gray-50 px-6 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-blue-700 text-center mb-12 animate-float">
            Your Problems, Our Solutions
          </h2>
          <div className="space-y-24">
            {services.map((service, i) => (
              <section
                key={i}
                className={`${i % 2 === 0 ? "bg-gray-50" : "bg-white"} py-12 rounded-xl animate-fade-in`}
              >
                <div
                  className={`flex flex-col md:flex-row items-center gap-10 ${
                    i % 2 === 1 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Image */}
                  <div className="flex-1 animate-slide-left">
                    <img
                      src={service.image}
                      alt={service.problem}
                      className="rounded-xl shadow-md w-full object-cover max-h-96 animate-float"
                    />
                  </div>
                  {/* Text */}
                  <div className="flex-1 animate-slide-right">
                    <h3 className="text-2xl font-bold text-blue-700 mb-4 animate-float">
                      {service.problem}
                    </h3>
                    <p className="text-gray-600 mb-4">{service.context}</p>
                    <p className="text-gray-700 font-semibold mb-3">
                      {service.solution}
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      {service.bullets.map((point, idx) => (
                        <li key={idx}>{point}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white px-6 md:px-16 lg:px-24 animate-fade-in">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-blue-700 mb-12 animate-float">
            Client Success Stories
          </h2>
          <div className="grid md:grid-cols-2 gap-8 mt-10">
            <div className="bg-gray-50 rounded-xl shadow-md p-6 animate-zoom-in">
              <blockquote className="italic text-lg text-gray-700">
                “Legal Suise resolved my custody battle in record time. They
                connected me with a compassionate lawyer who truly cared.”
              </blockquote>
              <p className="mt-4 font-bold text-amber-600">– Maria K.</p>
            </div>
            <div className="bg-gray-50 rounded-xl shadow-md p-6 animate-zoom-in delay-200">
              <blockquote className="italic text-lg text-gray-700">
                “As an entrepreneur, I’ve saved thousands thanks to Legal Suise’s
                reliable legal partners. They’re a game-changer.”
              </blockquote>
              <p className="mt-4 font-bold text-amber-600">– Daniel P.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="relative py-20 bg-cover bg-center text-center px-6 md:px-16 lg:px-24 animate-fade-in"
        style={{ backgroundImage: `url(${CTAImage})` }}
      >
        <div className="absolute inset-0 bg-white/80"></div>
        <div className="relative z-10 max-w-4xl mx-auto animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold text-blue-700 mb-6 animate-float">
            Put Your Case in the Right Hands
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-gray-700">
            With Legal Suise, you gain access to a trusted network of verified
            lawyers, transparent pricing, and proven results. Don’t leave your
            future to chance — let us guide your case with expertise.
          </p>
          <Link
            to="/register"
            className="bg-amber-500 text-gray-900 px-8 py-3 text-lg font-semibold rounded-full shadow-md hover:bg-amber-600 transition transform hover:scale-105 animate-pulse-slow"
          >
            Get Started Today
          </Link>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default About;
