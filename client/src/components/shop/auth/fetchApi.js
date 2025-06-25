import axios from "axios";
const apiURL = process.env.REACT_APP_API_URL || "";

// Get JWT from localStorage
export const isAuthenticate = () =>
  localStorage.getItem("jwt") ? JSON.parse(localStorage.getItem("jwt")) : false;

// Check if user is admin (role: "Admin")
export const isAdmin = () =>
  localStorage.getItem("jwt")
    ? JSON.parse(localStorage.getItem("jwt")).role === "Admin"
    : false;

export const loginReq = async ({ email, password }) => {
  const data = { username: email, password };
  try {
    let res = await axios.post(`${apiURL}/api/auth/login`, data);
    return res.data;
  } catch (error) {
    if (error.response && error.response.data) return { error: error.response.data };
    return { error: "Đăng nhập thất bại" };  }
};

export const signupReq = async ({ name, email, password }) => {
  const data = { name, email, password };
  try {
    let res = await axios.post(`${apiURL}/api/auth/register/customer`, data);
    return { success: "Đăng ký thành công" };
  } catch (error) {
    if (error.response && error.response.data) return { error: { email: error.response.data } };
    return { error: { email: "Đăng ký thất bại" } };
  }
};
