import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar
} from "recharts";

const apiURL = process.env.REACT_APP_API_URL;

const getAuthHeader = () => {
  const jwt = localStorage.getItem("jwt");
  if (!jwt) return {};
  const token = JSON.parse(jwt).token || jwt;
  return { Authorization: `Bearer ${token}` };
};

const DashboardAnalytics = () => {
  const [summary, setSummary] = useState(null);
  const [trend, setTrend] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [lowStock, setLowStock] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      axios.get(`${apiURL}/api/dashboard/summary`, { headers: getAuthHeader() }),
      axios.get(`${apiURL}/api/dashboard/revenue-trend?range=30d`, { headers: getAuthHeader() }),
      axios.get(`${apiURL}/api/dashboard/top-products?limit=5`, { headers: getAuthHeader() }),
      axios.get(`${apiURL}/api/dashboard/low-stock?threshold=5`, { headers: getAuthHeader() }),
    ])
      .then(([summaryRes, trendRes, topRes, lowRes]) => {
        setSummary(summaryRes.data);
        setTrend(trendRes.data);
        setTopProducts(topRes.data);
        setLowStock(lowRes.data);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-white rounded shadow p-6 my-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Dashboard Analytics</h2>
      {loading ? (
        <div className="text-center py-8">Loading analytics...</div>
      ) : (
        <>
          {/* Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 rounded p-4 text-center">
              <div className="text-lg text-gray-600">Total Revenue</div>
              <div className="text-2xl font-bold text-blue-700">{summary?.totalRevenue?.toLocaleString() || 0}₫</div>
            </div>
            <div className="bg-green-50 rounded p-4 text-center">
              <div className="text-lg text-gray-600">Orders</div>
              <div className="text-2xl font-bold text-green-700">{summary?.orderCount || 0}</div>
            </div>
            <div className="bg-yellow-50 rounded p-4 text-center">
              <div className="text-lg text-gray-600">New Customers</div>
              <div className="text-2xl font-bold text-yellow-700">{summary?.newCustomers || 0}</div>
            </div>
          </div>

          {/* Revenue Trend */}
          <div className="mb-10">
            <div className="text-lg font-semibold mb-2">Revenue Trend (Last 30 Days)</div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Top Products */}
          <div className="mb-10">
            <div className="text-lg font-semibold mb-2">Top Products (by Units Sold)</div>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={topProducts}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="productName" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="unitsSold" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Low Stock */}
          <div>
            <div className="text-lg font-semibold mb-2">Low Stock Products (≤ 5 left)</div>
            {lowStock.length === 0 ? (
              <div className="text-gray-500">No low stock products 🎉</div>
            ) : (
              <table className="w-full border mt-2">
                <thead>
                  <tr>
                    <th className="border px-2 py-1">Product</th>
                    <th className="border px-2 py-1">Stock Left</th>
                  </tr>
                </thead>
                <tbody>
                  {lowStock.map((p) => (
                    <tr key={p.productName}>
                      <td className="border px-2 py-1">{p.productName}</td>
                      <td className="border px-2 py-1 text-red-600 font-bold">{p.stock}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardAnalytics;