import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCase } from "../../../../redux/features/caseSlice";

const CaseMatchSection = ({ cases, lawyers }) => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.user);
  const unmatched = cases.filter((c) => !c.lawyer_id);

  const handleAssign = (caseId, lawyerId, fee, commission) => {
    dispatch(updateCase({
      userId: profile.id,
      caseId,
      caseData: {
        lawyer_id: lawyerId,
        fee,
        commission
      }
    }));
  };

  const getMatchingLawyers = (caseItem) => {
    const caseType = caseItem.case_type?.toLowerCase().trim();
    const court = caseItem.court?.toLowerCase().trim();

    return lawyers.filter((lawyer) => {
      const expertiseArray = lawyer.areas_of_expertise?.toLowerCase().split(',').map(e => e.trim()) || [];
      const courtArray = lawyer.preferred_court?.toLowerCase().split(',').map(c => c.trim()) || [];

      const matchesExpertise = expertiseArray.includes(caseType);
      const matchesCourt = courtArray.includes(court);

      return matchesExpertise && matchesCourt && lawyer.approved;
    });
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Unmatched Client Cases</h2>
      {unmatched.length === 0 ? (
        <p>No new cases.</p>
      ) : (
        <ul className="space-y-6">
          {unmatched.map((c) => {
            const matchingLawyers = getMatchingLawyers(c);

            return (
              <li key={c.id} className="p-4 border rounded bg-white text-black">
                <p><strong>Client ID:</strong> {c.client_id}</p>
                <p><strong>Case Type:</strong> {c.case_type}</p>
                <p><strong>Preferred Court:</strong> {c.court}</p>
                <p><strong>Description:</strong> {c.description}</p>

                {matchingLawyers.length === 0 ? (
                  <p className="text-red-500 mt-2">No matching lawyers for this case.</p>
                ) : (
                  <form
                    className="mt-4 space-y-2"
                    onSubmit={(e) => {
                      e.preventDefault();
                      const fee = parseFloat(e.target.fee.value);
                      const commission = parseFloat(e.target.commission.value);
                      const lawyerId = parseInt(e.target.lawyer_id.value);
                      handleAssign(c.id, lawyerId, fee, commission);
                    }}
                  >
                    <label className="block">Assign to:</label>
                    <select name="lawyer_id" required className="w-full border p-2 rounded">
                      <option value="">Select Lawyer</option>
                      {matchingLawyers.map((lawyer) => (
                        <option key={lawyer.id} value={lawyer.id}>
                          {lawyer.name} ({lawyer.areas_of_expertise})
                        </option>
                      ))}
                    </select>
                    <input
                      type="number"
                      name="fee"
                      placeholder="Set Case Fee"
                      required
                      className="w-full border p-2 rounded"
                    />
                    <input
                      type="number"
                      name="commission"
                      placeholder="Set Platform Commission"
                      required
                      className="w-full border p-2 rounded"
                    />
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                      Assign & Set Fee
                    </button>
                  </form>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default CaseMatchSection;
