import React, { useEffect, useState } from "react";
import AdminLayout from "../layout";
import axios from "axios";

const apiURL = process.env.REACT_APP_API_URL;

const getAuthHeader = () => {
  const jwt = localStorage.getItem("jwt");
  if (!jwt) return {};
  const token = JSON.parse(jwt).token || jwt;
  return { Authorization: `Bearer ${token}` };
};

const CustomersPage = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  useEffect(() => {
    setLoading(true);
    setError("");
    axios
      .get(`${apiURL}/api/auth/customers`, { headers: getAuthHeader() })
      .then((res) => setCustomers(res.data || []))
      .catch(() => setError("Failed to load customers"))
      .finally(() => setLoading(false));
  }, []);

  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        if (prev.direction === "asc") return { key, direction: "desc" };
        if (prev.direction === "desc") return { key: null, direction: null };
        return { key, direction: "asc" };
      }
      return { key, direction: "asc" };
    });
  };

  let sortedCustomers = [...customers];
  if (sortConfig.key && sortConfig.direction) {
    sortedCustomers.sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];
      if (typeof aValue === 'string') aValue = aValue.toLowerCase();
      if (typeof bValue === 'string') bValue = bValue.toLowerCase();
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return <span className="ml-1">⇅</span>;
    if (sortConfig.direction === 'asc') return <span className="ml-1">↑</span>;
    if (sortConfig.direction === 'desc') return <span className="ml-1">↓</span>;
    return <span className="ml-1">⇅</span>;
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-3xl mx-auto bg-white rounded shadow p-6">
          <h2 className="text-2xl font-bold mb-6 text-center">Customers List</h2>
          {loading ? (
            <div className="text-center py-8">Loading...</div>
          ) : error ? (
            <div className="text-center text-red-600 py-8">{error}</div>
          ) : (
            <table className="w-full border">
              <thead>
                <tr>
                  <th className="border px-2 py-1 cursor-pointer" onClick={() => handleSort('id')}>ID{getSortIcon('id')}</th>
                  <th className="border px-2 py-1 cursor-pointer" onClick={() => handleSort('name')}>Name{getSortIcon('name')}</th>
                  <th className="border px-2 py-1 cursor-pointer" onClick={() => handleSort('email')}>Email{getSortIcon('email')}</th>
                </tr>
              </thead>
              <tbody>
                {sortedCustomers.map((c) => (
                  <tr key={c.id}>
                    <td className="border px-2 py-1">{c.id}</td>
                    <td className="border px-2 py-1">{c.name}</td>
                    <td className="border px-2 py-1">{c.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default CustomersPage;
