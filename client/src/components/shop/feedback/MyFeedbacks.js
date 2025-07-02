
import React, { useEffect, useState } from "react";
import { getMyFeedbacks } from "./FeedbackApi";

const MyFeedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const data = await getMyFeedbacks();
        setFeedbacks(data || []);
      } catch (err) {
        setError("Failed to load feedbacks");
      } finally {
        setLoading(false);
      }
    };
    fetchFeedbacks();
  }, []);

  if (loading) return <div className="text-center py-8 text-lg">Loading your feedbacks...</div>;
  if (error) return <div className="text-center text-red-500 py-8">{error}</div>;

  return (
    <div className="flex flex-col w-full my-4 md:my-0 md:w-9/12 md:px-8">
      <div className="border">
        <div className="py-4 px-4 text-lg font-semibold border-t-2 border-yellow-700">
          My Feedbacks
        </div>
        <hr />
        <div className="overflow-auto bg-white shadow-lg p-4">
          {feedbacks.length === 0 ? (
            <div className="text-center text-gray-500">No feedbacks found.</div>
          ) : (
            <table className="table-auto border w-full my-2">
              <thead className="bg-yellow-50">
                <tr>
                  <th className="px-4 py-2 border">ID</th>
                  <th className="px-4 py-2 border">Product ID</th>
                  <th className="px-4 py-2 border">Message</th>
                  <th className="px-4 py-2 border">Date</th>
                </tr>
              </thead>
              <tbody>
                {feedbacks.map((fb) => (
                  <tr key={fb.id} className="hover:bg-yellow-50">
                    <td className="px-4 py-2 border text-center">{fb.id}</td>
                    <td className="px-4 py-2 border text-center">{fb.productId}</td>
                    <td className="px-4 py-2 border">{fb.message}</td>
                    <td className="px-4 py-2 border text-center">{new Date(fb.createdAt).toLocaleString()}</td>
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

export default MyFeedbacks;
