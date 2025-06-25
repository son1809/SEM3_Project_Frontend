import axios from "axios";
const apiURL = process.env.REACT_APP_API_URL;

// Updated: Use GET /api/product/:id and map to backend fields
export const getSingleProduct = async (pId) => {
  try {
    let res = await axios.get(`${apiURL}/api/product/${pId}`);
    // Wrap in { Product: ... } for compatibility with existing code
    return { Product: res.data };
  } catch (error) {
    console.log(error);
  }
};

export const postAddReview = async (formData) => {
  try {
    let res = await axios.post(`${apiURL}/api/product/add-review`, formData);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const postDeleteReview = async (formData) => {
  try {
    let res = await axios.post(`${apiURL}/api/product/delete-review`, formData);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
