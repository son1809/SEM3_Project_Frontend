import axios from "axios";
const apiURL = process.env.REACT_APP_API_URL;

// Get JWT from localStorage
export const isAuthenticate = () =>
  localStorage.getItem("jwt") ? JSON.parse(localStorage.getItem("jwt")) : false;

// Check if user is admin (role: "Admin")
export const isAdmin = () =>
  localStorage.getItem("jwt")
    ? JSON.parse(localStorage.getItem("jwt")).role === "Admin"
    : false;

// Login API (username & password)
export const loginReq = async ({ username, password }) => {
  const data = { username, password };
  try {
    let res = await axios.post(`${apiURL}/api/auth/login`, data);
    // The backend returns only token, so decode or store as needed
    return res.data;
  } catch (error) {
    console.log(error);
    return { error: "Login failed" };
  }
};

// Register customer
export const signupReq = async ({ username, password, name, email }) => {
  const data = { username, password, name, email };
  try {
    let res = await axios.post(`${apiURL}/api/auth/register/customer`, data);
    return res.data;
  } catch (error) {
    console.log(error);
    return { error: "Registration failed" };
  }
};
