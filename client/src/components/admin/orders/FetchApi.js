import axios from "axios";
const apiURL = process.env.REACT_APP_API_URL;

export const createOrder = async (orderData) => {
  try {
    const res = await axios.post(`${apiURL}/api/order`, orderData);
    return res.data;
  } catch (error) {
    console.error("Error creating order:", error);
  }
};

export const getMyOrders = async () => {
  try {
    const res = await axios.get(`${apiURL}/api/order/my`);
    return res.data;
  } catch (error) {
    console.error("Error getting user orders:", error);
  }
};
