import axios from "axios";
const apiURL = process.env.REACT_APP_API_URL;

const getAuthHeader = () => {
  const jwt = localStorage.getItem("jwt");
  if (!jwt) return {};
  const token = JSON.parse(jwt).token || jwt;
  return { Authorization: `Bearer ${token}` };
};

// Register employee (admin only)
export const registerEmployee = async ({ name, username, password }) => {
  try {
    const res = await axios.post(
      `${apiURL}/api/auth/register/employee`,
      { name, username, password },
      { headers: { ...getAuthHeader(), "Content-Type": "application/json" } }
    );
    return res.data;
  } catch (error) {
    return { error: error?.response?.data?.error || "Registration failed" };
  }
};

// Register admin (admin only)
export const registerAdmin = async ({ name, username, password }) => {
  try {
    const res = await axios.post(
      `${apiURL}/api/auth/register/admin`,
      { name, username, password },
      { headers: { ...getAuthHeader(), "Content-Type": "application/json" } }
    );
    return res.data;
  } catch (error) {
    return { error: error?.response?.data?.error || "Registration failed" };
  }
};

// Admin changes employee password
export const changeEmployeePassword = async ({ username, oldPassword, newPassword }) => {
  try {
    const res = await axios.post(
      `${apiURL}/api/auth/admin/change-employee-password`,
      { username, oldPassword, newPassword },
      { headers: { ...getAuthHeader(), "Content-Type": "application/json" } }
    );
    return res.data;
  } catch (error) {
    return { error: error?.response?.data?.error || "Change password failed" };
  }
};

// List all customers (admin only)
export const getAllCustomers = async () => {
  try {
    const res = await axios.get(`${apiURL}/api/auth/customers`, { headers: getAuthHeader() });
    return res.data;
  } catch (error) {
    return [];
  }
};

// List all employees (admin only)
export const getAllEmployees = async () => {
  try {
    const res = await axios.get(`${apiURL}/api/auth/employees`, { headers: getAuthHeader() });
    return res.data;
  } catch (error) {
    return [];
  }
};

// List all admins (admin only)
export const getAllAdmins = async () => {
  try {
    const res = await axios.get(`${apiURL}/api/auth/admins`, { headers: getAuthHeader() });
    return res.data;
  } catch (error) {
    return [];
  }
};
