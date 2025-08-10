import React from "react";

const RAILS_HOST = "http://localhost:3001"; // Update for production as needed

const PanelistSection = ({ lawyers = [], onApprove }) => {
  const pendingLawyers = lawyers.filter((lawyer) => !lawyer.approved);

  // Always force absolute URLs for document links
  const makeAbsoluteUrl = (url) => {
    if (!url) return null;
    // Remove any leading host from the url to avoid double host
    const cleanedUrl = url.replace(/^https?:\/\/[^/]+/, "");
    // Always prepend Rails host and ensure single slash
    return `${RAILS_HOST}${cleanedUrl.startsWith("/") ? cleanedUrl : "/" + cleanedUrl}`;
  };

  const renderDocumentLink = (url, label) => {
    const absoluteUrl = makeAbsoluteUrl(url);
    return absoluteUrl ? (
      <span
        className="text-blue-300 underline cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          window.open(absoluteUrl, "_blank", "noopener,noreferrer");
        }}
      >
        {label}
      </span>
    ) : (
      <span className="text-gray-400">{label} not uploaded</span>
    );
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-primary-light">Pending Lawyer Applications</h2>

      {pendingLawyers.length === 0 ? (
        <p className="text-gray-300">No pending applications at the moment.</p>
      ) : (
        <ul className="space-y-6">
          {pendingLawyers.map((lawyer) => (
            <li
              key={lawyer.id}
              className="bg-secondary-light p-6 rounded-lg shadow-lg space-y-2"
            >
              <h3 className="text-xl font-semibold text-white">{lawyer.name}</h3>
              <p className="text-gray-300">Email: {lawyer.email}</p>
              <p className="text-gray-300">License #: {lawyer.license_number}</p>
              <p className="text-gray-300">Years of Experience: {lawyer.experience_years}</p>
              <p className="text-gray-300">Rate: R{lawyer.rate}</p>
              <p className="text-gray-300">Expertise: {lawyer.areas_of_expertise}</p>
              <p className="text-gray-300">Preferred Court: {lawyer.preferred_court}</p>

              <div className="space-y-1 mt-2">
                {renderDocumentLink(lawyer.admission_enrollment_order, "Admission/Enrollment Order")}
                <br />
                {renderDocumentLink(lawyer.good_standing_letter, "Good Standing Letter")}
                <br />
                {renderDocumentLink(lawyer.fidelity_fund_certificate, "Fidelity Fund Certificate")}
                <br />
                {renderDocumentLink(lawyer.id_document, "ID Document")}
              </div>

              <div className="mt-4 space-x-4">
                <button
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  onClick={() => onApprove(lawyer, true)}
                >
                  Approve
                </button>
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  onClick={() => onApprove(lawyer, false)}
                >
                  Reject
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PanelistSection;