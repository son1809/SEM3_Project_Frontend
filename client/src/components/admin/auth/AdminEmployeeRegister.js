import React, { useState } from "react";
import { registerEmployee, registerAdmin } from "./AdminApi";

const AdminEmployeeRegister = () => {
  const [form, setForm] = useState({
    name: "",
    username: "",
    password: "",
    isAdmin: false,
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleToggle = () => {
    setForm({ ...form, isAdmin: !form.isAdmin });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const { name, username, password, isAdmin } = form;
    if (!name || !username || !password) {
      setError("All fields are required");
      return;
    }
    const apiCall = isAdmin ? registerAdmin : registerEmployee;
    const res = await apiCall({ name, username, password });
    if (res && res.error) {
      setError(res.error);
    } else {
      setSuccess(isAdmin ? "Admin registered!" : "Employee registered!");
      setForm({ name: "", username: "", password: "", isAdmin });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Register {form.isAdmin ? "Admin" : "Employee"}
        </h2>
        {error && <div className="mb-4 text-red-600">{error}</div>}
        {success && <div className="mb-4 text-green-600">{success}</div>}
        <div className="mb-4">
          <label className="block mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Username</label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            checked={form.isAdmin}
            onChange={handleToggle}
            id="isAdmin"
            className="mr-2"
          />
          <label htmlFor="isAdmin">Register as Admin</label>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default AdminEmployeeRegister;
