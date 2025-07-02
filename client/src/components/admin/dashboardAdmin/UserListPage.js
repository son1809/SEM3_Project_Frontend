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

const fetchers = {
  customers: async () => {
    const res = await axios.get(`${apiURL}/api/auth/customers`, { headers: getAuthHeader() });
    return res.data;
  },
  employees: async () => {
    const res = await axios.get(`${apiURL}/api/auth/employees`, { headers: getAuthHeader() });
    return res.data;
  },
  admins: async () => {
    const res = await axios.get(`${apiURL}/api/auth/admins`, { headers: getAuthHeader() });
    return res.data;
  },
};

const UserListPage = () => {
  const [tab, setTab] = useState("customers");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  useEffect(() => {
    setLoading(true);
    setError("");
    fetchers[tab]()
      .then((res) => setData(res || []))
      .catch(() => setError("Failed to load data"))
      .finally(() => setLoading(false));
  }, [tab]);

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

  let sortedData = [...data];
  if (sortConfig.key && sortConfig.direction) {
    sortedData.sort((a, b) => {
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
          <h2 className="text-2xl font-bold mb-6 text-center">User List</h2>
          <div className="flex justify-center mb-6 space-x-4">
            <button
              className={`px-4 py-2 rounded ${tab === "customers" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
              onClick={() => setTab("customers")}
            >
              Customers
            </button>
            <button
              className={`px-4 py-2 rounded ${tab === "employees" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
              onClick={() => setTab("employees")}
            >
              Employees
            </button>
            <button
              className={`px-4 py-2 rounded ${tab === "admins" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
              onClick={() => setTab("admins")}
            >
              Admins
            </button>
          </div>
          {loading ? (
            <div className="text-center py-8">Loading...</div>
          ) : error ? (
            <div className="text-center text-red-600 py-8">{error}</div>
          ) : (
            <div>
              {tab === "customers" && (
                <table className="w-full border">
                  <thead>
                    <tr>
                      <th className="border px-2 py-1 cursor-pointer" onClick={() => handleSort('id')}>ID{getSortIcon('id')}</th>
                      <th className="border px-2 py-1 cursor-pointer" onClick={() => handleSort('name')}>Name{getSortIcon('name')}</th>
                      <th className="border px-2 py-1 cursor-pointer" onClick={() => handleSort('email')}>Email{getSortIcon('email')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedData.map((c) => (
                      <tr key={c.id}>
                        <td className="border px-2 py-1">{c.id}</td>
                        <td className="border px-2 py-1">{c.name}</td>
                        <td className="border px-2 py-1">{c.email}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              {tab === "employees" && (
                <table className="w-full border">
                  <thead>
                    <tr>
                      <th className="border px-2 py-1 cursor-pointer" onClick={() => handleSort('id')}>ID{getSortIcon('id')}</th>
                      <th className="border px-2 py-1 cursor-pointer" onClick={() => handleSort('username')}>Username{getSortIcon('username')}</th>
                      <th className="border px-2 py-1 cursor-pointer" onClick={() => handleSort('name')}>Name{getSortIcon('name')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedData.map((e) => (
                      <tr key={e.id}>
                        <td className="border px-2 py-1">{e.id}</td>
                        <td className="border px-2 py-1">{e.username}</td>
                        <td className="border px-2 py-1">{e.name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              {tab === "admins" && (
                <table className="w-full border">
                  <thead>
                    <tr>
                      <th className="border px-2 py-1 cursor-pointer" onClick={() => handleSort('id')}>ID{getSortIcon('id')}</th>
                      <th className="border px-2 py-1 cursor-pointer" onClick={() => handleSort('username')}>Username{getSortIcon('username')}</th>
                      <th className="border px-2 py-1 cursor-pointer" onClick={() => handleSort('name')}>Name{getSortIcon('name')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedData.map((a) => (
                      <tr key={a.id}>
                        <td className="border px-2 py-1">{a.id}</td>
                        <td className="border px-2 py-1">{a.username}</td>
                        <td className="border px-2 py-1">{a.name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default UserListPage;
