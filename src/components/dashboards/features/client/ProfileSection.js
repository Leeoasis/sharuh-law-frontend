import React, { useState, useEffect } from 'react';

const ProfileSection = ({ profile, onUpdate, loading, error, successMessage }) => {
  const [formData, setFormData] = useState({
    name: profile.name || '',
    email: profile.email || '',
    password: '',
    preferred_language: profile.preferred_language || '',
    budget: profile.budget || '',
    license_number: profile.license_number || '',
    specializations: profile.specializations || '',
    experience_years: profile.experience_years || '',
  });

  useEffect(() => {
    setFormData({
      name: profile.name || '',
      email: profile.email || '',
      password: '',
      preferred_language: profile.preferred_language || '',
      budget: profile.budget || '',
      license_number: profile.license_number || '',
      specializations: profile.specializations || '',
      experience_years: profile.experience_years || '',
    });
  }, [profile]);

  useEffect(() => {
    if (successMessage) {
      setFormData({
        name: profile.name || '',
        email: profile.email || '',
        password: '',
        preferred_language: profile.preferred_language || '',
        budget: profile.budget || '',
        license_number: profile.license_number || '',
        specializations: profile.specializations || '',
        experience_years: profile.experience_years || '',
      });
    }
  }, [successMessage, profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-primary-light mb-4">Profile</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <form onSubmit={handleSubmit}>
          {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
          <div className="mb-4">
            <label className="block text-secondary-light mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 rounded-lg bg-secondary-light text-primary"
            />
          </div>
          <div className="mb-4">
            <label className="block text-secondary-light mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 rounded-lg bg-secondary-light text-primary"
            />
          </div>
          <div className="mb-4">
            <label className="block text-secondary-light mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 rounded-lg bg-secondary-light text-primary"
            />
          </div>
          {profile.role === 'client' && (
            <>
              <div className="mb-4">
                <label className="block text-secondary-light mb-2">Preferred Language</label>
                <input
                  type="text"
                  name="preferred_language"
                  value={formData.preferred_language}
                  onChange={handleChange}
                  className="w-full p-2 rounded-lg bg-secondary-light text-primary"
                />
              </div>
              <div className="mb-4">
                <label className="block text-secondary-light mb-2">Budget</label>
                <input
                  type="number"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full p-2 rounded-lg bg-secondary-light text-primary"
                />
              </div>
            </>
          )}
          {profile.role === 'lawyer' && (
            <>
              <div className="mb-4">
                <label className="block text-secondary-light mb-2">License Number</label>
                <input
                  type="text"
                  name="license_number"
                  value={formData.license_number}
                  onChange={handleChange}
                  className="w-full p-2 rounded-lg bg-secondary-light text-primary"
                />
              </div>
              <div className="mb-4">
                <label className="block text-secondary-light mb-2">Specializations</label>
                <input
                  type="text"
                  name="specializations"
                  value={formData.specializations}
                  onChange={handleChange}
                  className="w-full p-2 rounded-lg bg-secondary-light text-primary"
                />
              </div>
              <div className="mb-4">
                <label className="block text-secondary-light mb-2">Experience Years</label>
                <input
                  type="number"
                  name="experience_years"
                  value={formData.experience_years}
                  onChange={handleChange}
                  className="w-full p-2 rounded-lg bg-secondary-light text-primary"
                />
              </div>
            </>
          )}
          <button type="submit" className="bg-primary text-secondary px-4 py-2 rounded hover:bg-primary-light">
            Update Profile
          </button>
        </form>
      )}
    </div>
  );
};

export default ProfileSection;