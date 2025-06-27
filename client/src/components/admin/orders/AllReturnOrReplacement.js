import React, { useEffect, useState } from "react";
import { getAllReturnOrReplacement, updateReturnOrReplacementStatus } from "./ReturnOrReplacementApi";

const AllReturnOrReplacement = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);

  const fetchData = () => {
    getAllReturnOrReplacement().then((data) => {
      setRequests(data || []);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleStatusChange = (id, status) => {
    setUpdating(id);
    updateReturnOrReplacementStatus(id, status).then(() => {
      fetchData();
      setUpdating(null);
    });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>All Return/Replacement Requests</h2>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Product ID</th>
            <th>Type</th>
            <th>Status</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((r) => (
            <tr key={r.id}>
              <td>{r.orderId}</td>
              <td>{r.productId}</td>
              <td>{r.requestType}</td>
              <td>{r.approvalStatus}</td>
              <td>{new Date(r.requestDate).toLocaleString()}</td>
              <td>
                <select
                  value={r.approvalStatus}
                  disabled={updating === r.id}
                  onChange={(e) => handleStatusChange(r.id, e.target.value)}
                >
                  <option value="PENDING">Pending</option>
                  <option value="APPROVED">Approve</option>
                  <option value="REJECTED">Reject</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllReturnOrReplacement;
