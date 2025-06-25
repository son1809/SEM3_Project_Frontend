import axios from "axios";
const apiURL = process.env.REACT_APP_API_URL;

export const getUserById = async (uId) => {
  try {
    let res = await axios.get(`${apiURL}/api/user/${uId}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const updatePersonalInformationFetch = async (userData) => {
  try {
    let res = await axios.put(`${apiURL}/api/user/${userData.id}`, userData);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// Get current user's orders (uses JWT for auth)
export const getOrderByUser = async () => {
  try {
    const jwt = JSON.parse(localStorage.getItem("jwt"));
    let res = await axios.get(`${apiURL}/api/order/my`, {
      headers: {
        Authorization: `Bearer ${jwt.token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const updatePassword = async (formData) => {
  try {
    let res = await axios.post(`${apiURL}/api/user/change-password`, formData);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
