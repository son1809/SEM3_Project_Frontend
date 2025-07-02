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

const PERIODS = [
  { label: "Last 7 days", value: "7d" },
  { label: "Last 2 weeks", value: "14d" },
  { label: "Last 30 days", value: "30d" },
  { label: "Last 3 months", value: "90d" },
];

const DashboardAnalytics = () => {
  const [summary, setSummary] = useState(null);
  const [trend, setTrend] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState("30d");

  useEffect(() => {
    setLoading(true);
    Promise.all([
      axios.get(`${apiURL}/api/dashboard/summary?range=${period}`, { headers: getAuthHeader() }),
      axios.get(`${apiURL}/api/dashboard/revenue-trend?range=${period}`, { headers: getAuthHeader() }),
      axios.get(`${apiURL}/api/dashboard/top-products?limit=5&range=${period}`, { headers: getAuthHeader() }),
    ])
      .then(([summaryRes, trendRes, topRes]) => {
        setSummary(summaryRes.data);
        setTrend(trendRes.data);
        setTopProducts(topRes.data);
      })
      .finally(() => setLoading(false));
  }, [period]);

  return (
    <div className="bg-white rounded shadow p-6 my-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Dashboard Analytics</h2>
      <div className="flex justify-end mb-4">
        <select
          className="border rounded px-3 py-1"
          value={period}
          onChange={e => setPeriod(e.target.value)}
        >
          {PERIODS.map(p => (
            <option key={p.value} value={p.value}>{p.label}</option>
          ))}
        </select>
      </div>
      {loading ? (
        <div className="text-center py-8">Loading analytics...</div>
      ) : (
        <>
          {/* Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 rounded p-4 text-center">
              <div className="text-lg text-gray-600">Total Revenue</div>
              <div className="text-2xl font-bold text-blue-700">${summary?.totalRevenue?.toLocaleString() || 0}</div>
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
            <div className="text-lg font-semibold mb-2">Revenue Trend ({PERIODS.find(p => p.value === period)?.label})</div>
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
        </>
      )}
    </div>
  );
};

export default DashboardAnalytics;