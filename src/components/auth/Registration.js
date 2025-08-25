import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
    admission_enrollment_order: null,
    good_standing_letter: null,
    fidelity_fund_certificate: null,
    id_document: null,
    license_number: '',
    phone_number: '',
    practice_address: '',
    preferred_court: '',
    areas_of_expertise: '',
    experience_years: '',
    rate: '',
    engagement_form: null,
    client_id_document: null,
    client_proof_of_address: null,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { serverErrors, isLoading } = useSelector((state) => state.sign_up);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (const key in formData) {
      if (formData[key] !== null && formData[key] !== undefined && formData[key] !== '') {
        data.append(`user[${key}]`, formData[key]);
      }
    }

    dispatch(fetchreg(data))
      .unwrap()
      .then(() => {
        navigate('/login');
      })
      .catch(() => {
        // Errors will be shown below from serverErrors
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

          {serverErrors?.data?.errors && (
            <div className="mb-4 rounded-lg p-3 bg-red-50 border border-red-200 text-red-800">
              <p className="font-medium mb-2">We couldn’t complete your registration:</p>
              <ul className="list-disc pl-5 space-y-1">
                {serverErrors.data.errors.map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
              </ul>
            </div>
          )}

          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email" required className="mb-4 p-3 w-full border rounded" />
            <input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Password" required className="mb-4 p-3 w-full border rounded" />
            <input name="password_confirmation" type="password" value={formData.password_confirmation} onChange={handleChange} placeholder="Confirm Password" required className="mb-4 p-3 w-full border rounded" />
            <input name="name" type="text" value={formData.name} onChange={handleChange} placeholder="Full Name" required className="mb-4 p-3 w-full border rounded" />

            <select name="role" value={formData.role} onChange={handleChange} className="mb-4 p-3 w-full border rounded">
              <option value="client">Client</option>
              <option value="lawyer">Lawyer</option>
            </select>

            {formData.role === 'lawyer' && (
              <>
                <label className="block mb-2 text-sm">Admission & Enrollment Order</label>
                <input name="admission_enrollment_order" type="file" onChange={handleChange} required className="mb-4 p-3 w-full border rounded" />
                <label className="block mb-2 text-sm">Good Standing Letter</label>
                <input name="good_standing_letter" type="file" onChange={handleChange} required className="mb-4 p-3 w-full border rounded" />
                <label className="block mb-2 text-sm">Fidelity Fund Certificate</label>
                <input name="fidelity_fund_certificate" type="file" onChange={handleChange} required className="mb-4 p-3 w-full border rounded" />
                <label className="block mb-2 text-sm">Identity Document</label>
                <input name="id_document" type="file" onChange={handleChange} required className="mb-4 p-3 w-full border rounded" />
                <label className="block mb-2 text-sm">License Number</label>
                <input name="license_number" type="text" value={formData.license_number} onChange={handleChange} placeholder="License Number" required className="mb-4 p-3 w-full border rounded" />
                <label className="block mb-2 text-sm">Phone Number</label>
                <input name="phone_number" type="tel" value={formData.phone_number} onChange={handleChange} placeholder="+27821234567" required className="mb-4 p-3 w-full border rounded" />
                <input name="practice_address" type="text" value={formData.practice_address} onChange={handleChange} placeholder="Practice Address" required className="mb-4 p-3 w-full border rounded" />
                <input name="experience_years" type="number" value={formData.experience_years} onChange={handleChange} placeholder="Years of Experience" required className="mb-4 p-3 w-full border rounded" />
                <input name="rate" type="number" value={formData.rate} onChange={handleChange} placeholder="Hourly Rate" required className="mb-4 p-3 w-full border rounded" />
                <select name="preferred_court" value={formData.preferred_court} onChange={handleChange} required className="mb-4 p-3 w-full border rounded">
                  <option value="">Select Preferred Court</option>
                  {courts.map((court, index) => (
                    <option key={index} value={court}>{court}</option>
                  ))}
                </select>
                <select name="areas_of_expertise" value={formData.areas_of_expertise} onChange={handleChange} required className="mb-4 p-3 w-full border rounded">
                  <option value="">Select Area of Expertise</option>
                  {expertiseAreas.map((area, index) => (
                    <option key={index} value={area}>{area}</option>
                  ))}
                </select>
              </>
            )}

            {formData.role === 'client' && (
              <>
                <label className="block mb-2 text-sm">Engagement Form</label>
                <input name="engagement_form" type="file" onChange={handleChange} required className="mb-4 p-3 w-full border rounded" />
                <label className="block mb-2 text-sm">ID Document</label>
                <input name="client_id_document" type="file" onChange={handleChange} required className="mb-4 p-3 w-full border rounded" />
                <label className="block mb-2 text-sm">Proof of Address</label>
                <input name="client_proof_of_address" type="file" onChange={handleChange} required className="mb-4 p-3 w-full border rounded" />
              </>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="bg-amber-500 text-white p-3 w-full rounded mt-4 hover:bg-amber-400 disabled:opacity-70"
            >
              {isLoading ? 'Registering...' : 'Register'}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
