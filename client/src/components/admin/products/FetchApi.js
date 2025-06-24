import axios from "axios";
const apiURL = process.env.REACT_APP_API_URL;

export const getAllProduct = async () => {
  try {
    const res = await axios.get(`${apiURL}/api/product`);
    return res.data;
  } catch (error) {
    console.error("Error getting products:", error);
  }
};

export const createProduct = async (product) => {
  try {
    const res = await axios.post(`${apiURL}/api/product`, product);
    return res.data;
  } catch (error) {
    console.error("Error creating product:", error);
  }
};

export const getProductById = async (id) => {
  try {
    const res = await axios.get(`${apiURL}/api/product/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
  }
};
