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

export const loginReq = async ({ username, password }) => {
  const data = { username, password };
  try {
    let res = await axios.post(`${apiURL}/api/auth/login`, data);
    // If response contains token, return as { token: ... }
    if (res.data && res.data.token) {
      return { token: res.data.token };
    }
    // If response contains error, return as { error: ... }
    if (res.data && res.data.error) {
      return { error: res.data.error };
    }
    // If response is not as expected, return generic error
    return { error: "Đăng nhập thất bại" };
  } catch (error) {
    if (error.response && error.response.data) {
      // Try to extract a string error message
      if (typeof error.response.data === "string") {
        return { error: error.response.data };
      }
      // If error is an object, try to extract a message or status
      if (error.response.data.message) {
        return { error: error.response.data.message };
      }
      if (error.response.data.error) {
        return { error: error.response.data.error };
      }
      // Fallback: stringify the error object
      return { error: JSON.stringify(error.response.data) };
    }
    return { error: "Đăng nhập thất bại" };
  }
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
