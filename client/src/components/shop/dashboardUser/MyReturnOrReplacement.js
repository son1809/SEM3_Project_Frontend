import React, { useEffect, useState } from "react";
import { getMyReturnOrReplacement } from "../../admin/orders/ReturnOrReplacementApi";

const MyReturnOrReplacement = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReturns = async () => {
      try {
        const data = await getMyReturnOrReplacement();
        setRequests(data || []);
      } catch (err) {
        setError("Failed to load return/replacement requests");
      } finally {
        setLoading(false);
      }
    };
    fetchReturns();
  }, []);

  if (loading) return <div className="text-center py-8 text-lg">Loading your return/replacement requests...</div>;
  if (error) return <div className="text-center text-red-500 py-8">{error}</div>;

  return (
    <div className="flex flex-col w-full my-4 md:my-0 md:w-9/12 md:px-8">
      <div className="border">
        <div className="py-4 px-4 text-lg font-semibold border-t-2 border-yellow-700">
          My Return/Replacement Requests
        </div>
        <hr />
        <div className="overflow-auto bg-white shadow-lg p-4">
          {requests.length === 0 ? (
            <div className="text-center text-gray-500">No return or replacement requests found.</div>
          ) : (
            <table className="table-auto border w-full my-2">
              <thead className="bg-yellow-50">
                <tr>
                  <th className="px-4 py-2 border">Order ID</th>
                  <th className="px-4 py-2 border">Product ID</th>
                  <th className="px-4 py-2 border">Type</th>
                  <th className="px-4 py-2 border">Status</th>
                  <th className="px-4 py-2 border">Date</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((r) => (
                  <tr key={r.id} className="hover:bg-yellow-50">
                    <td className="px-4 py-2 border text-center">{r.orderId}</td>
                    <td className="px-4 py-2 border text-center">{r.productId}</td>
                    <td className="px-4 py-2 border text-center">{r.requestType}</td>
                    <td className="px-4 py-2 border text-center">
                      <span className={
                        r.approvalStatus === "Approved"
                          ? "text-green-700 font-semibold"
                          : r.approvalStatus === "Rejected"
                          ? "text-red-600 font-semibold"
                          : "text-yellow-700 font-semibold"
                      }>
                        {r.approvalStatus}
                      </span>
                    </td>
                    <td className="px-4 py-2 border text-center">{new Date(r.requestDate).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyReturnOrReplacement;
