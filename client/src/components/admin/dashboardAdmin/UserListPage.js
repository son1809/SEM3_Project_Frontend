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

  useEffect(() => {
    setLoading(true);
    setError("");
    fetchers[tab]()
      .then((res) => setData(res || []))
      .catch(() => setError("Failed to load data"))
      .finally(() => setLoading(false));
  }, [tab]);

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
                      <th className="border px-2 py-1">ID</th>
                      <th className="border px-2 py-1">Name</th>
                      <th className="border px-2 py-1">Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((c) => (
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
                      <th className="border px-2 py-1">ID</th>
                      <th className="border px-2 py-1">Username</th>
                      <th className="border px-2 py-1">Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((e) => (
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
                      <th className="border px-2 py-1">ID</th>
                      <th className="border px-2 py-1">Username</th>
                      <th className="border px-2 py-1">Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((a) => (
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
