import React, { useEffect, useState } from "react";
import { getMyReturnOrReplacement } from "../../admin/orders/ReturnOrReplacementApi";

const MyReturnOrReplacement = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyReturnOrReplacement().then((data) => {
      setRequests(data || []);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>My Return/Replacement Requests</h2>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Product ID</th>
            <th>Type</th>
            <th>Status</th>
            <th>Date</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyReturnOrReplacement;
