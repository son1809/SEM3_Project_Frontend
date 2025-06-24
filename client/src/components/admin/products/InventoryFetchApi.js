import axios from "axios";
const apiURL = process.env.REACT_APP_API_URL;

export const getInventory = async (productId) => {
  try {
    const res = await axios.get(`${apiURL}/api/inventory/${productId}`);
    return res.data;
  } catch (error) {
    console.error("Error getting inventory:", error);
  }
};

export const addStock = async (productId, quantity) => {
  try {
    const res = await axios.post(`${apiURL}/api/inventory/${productId}/add`, null, {
      params: { quantity }
    });
    return res.data;
  } catch (error) {
    console.error("Error adding stock:", error);
  }
};

export const updateStock = async (productId, quantity) => {
  try {
    const res = await axios.put(`${apiURL}/api/inventory/${productId}/update`, null, {
      params: { quantity }
    });
    return res.data;
  } catch (error) {
    console.error("Error updating stock:", error);
  }
};
