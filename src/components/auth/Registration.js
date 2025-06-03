import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchreg } from '../../redux/auth/registerSlice';
import Navbar from '../landingSite/Navbar';
import Footer from '../landingSite/Footer';
import RegisterBackground from '../../assets/Images/analysis.jpeg';

const courts = [
  "CCMA/Bargaining Council (Arbitration)",
  "District Magistrate Court",
  "Regional Magistrate Court",
  "High Court/Labour Court",
  "Supreme Court of Appeal/Labour Appeal Court",
  "Constitutional Court"
];
const expertiseAreas = [
  "Criminal Law",
  "Family Law",
  "Corporate Law",
  "Intellectual Property",
  "Labor Law"
];

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    password_confirmation: '',
    name: '',
    role: 'client',
    admission_enrollment_order: '',
    good_standing_letter: '',
    fidelity_fund_certificate: '',
    id_document: '',
    practice_address: '',
    preferred_court: '',
    areas_of_expertise: '',
    experience_years: '',
    rate: '',
    engagement_form: '',
    client_id_document: '',
    client_proof_of_address: ''
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(fetchreg(formData)).then((response) => {
      if (response.type === 'sign_up/fetchregistration/fulfilled') {
        if (response.payload.role === 'client') {
          navigate('/client-dashboard');
        } else if (response.payload.role === 'lawyer') {
          navigate('/lawyer-dashboard');
        }
        navigate('/login');
      }
    });
  };

  return (
    <div className="bg-gray-50">
      <Navbar />

      <div
        className="min-h-screen bg-cover bg-center flex flex-col justify-center items-center relative"
        style={{ backgroundImage: `url(${RegisterBackground})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50 z-0"></div>

        <div className="bg-white bg-opacity-70 p-8 rounded-lg shadow-md w-full max-w-3xl z-10 mt-20 mb-12">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Create Your Account</h1>
          <form onSubmit={handleSubmit}>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required className="mb-4 p-3 w-full border rounded" />
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required className="mb-4 p-3 w-full border rounded" />
            <input type="password" name="password_confirmation" value={formData.password_confirmation} onChange={handleChange} placeholder="Confirm Password" required className="mb-4 p-3 w-full border rounded" />
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" required className="mb-4 p-3 w-full border rounded" />

            <select name="role" value={formData.role} onChange={handleChange} className="mb-4 p-3 w-full border rounded">
              <option value="client">Client</option>
              <option value="lawyer">Lawyer</option>
            </select>

            {formData.role === 'lawyer' && (
              <>
                <input type="text" name="admission_enrollment_order" value={formData.admission_enrollment_order} onChange={handleChange} placeholder="Admission and Enrollment Order" required className="mb-4 p-3 w-full border rounded" />
                <input type="text" name="good_standing_letter" value={formData.good_standing_letter} onChange={handleChange} placeholder="Letter of Good Standing" required className="mb-4 p-3 w-full border rounded" />
                <input type="text" name="fidelity_fund_certificate" value={formData.fidelity_fund_certificate} onChange={handleChange} placeholder="Fidelity Fund Certificate" required className="mb-4 p-3 w-full border rounded" />
                <input type="text" name="id_document" value={formData.id_document} onChange={handleChange} placeholder="Identity Document / Passport" required className="mb-4 p-3 w-full border rounded" />
                <input type="text" name="practice_address" value={formData.practice_address} onChange={handleChange} placeholder="Practice Address" required className="mb-4 p-3 w-full border rounded" />
                <input type="number" name="experience_years" value={formData.experience_years} onChange={handleChange} placeholder="Years of Experience" required className="mb-4 p-3 w-full border rounded" />
                <input type="number" name="rate" value={formData.rate} onChange={handleChange} placeholder="Rate" required className="mb-4 p-3 w-full border rounded" />
                <select name="preferred_court" value={formData.preferred_court} onChange={handleChange} className="mb-4 p-3 w-full border rounded" required>
                  <option value="">Select Preferred Court</option>
                  {courts.map((court, index) => (
                    <option key={index} value={court}>{court}</option>
                  ))}
                </select>
                <select name="areas_of_expertise" value={formData.areas_of_expertise} onChange={handleChange} className="mb-4 p-3 w-full border rounded" required>
                  <option value="">Select Area of Expertise</option>
                  {expertiseAreas.map((area, index) => (
                    <option key={index} value={area}>{area}</option>
                  ))}
                </select>
              </>
            )}

            {formData.role === 'client' && (
              <>
                <input type="text" name="engagement_form" value={formData.engagement_form} onChange={handleChange} placeholder="Engagement Form" required className="mb-4 p-3 w-full border rounded" />
                <input type="text" name="client_id_document" value={formData.client_id_document} onChange={handleChange} placeholder="Identity Document" required className="mb-4 p-3 w-full border rounded" />
                <input type="text" name="client_proof_of_address" value={formData.client_proof_of_address} onChange={handleChange} placeholder="Proof of Address" required className="mb-4 p-3 w-full border rounded" />
              </>
            )}

            <button type="submit" className="bg-amber-500 text-white p-3 w-full rounded mt-4 hover:bg-amber-400">Register</button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Register;
