import axios from "axios";
const apiURL = process.env.REACT_APP_API_URL;

// CATEGORY ENDPOINTS

// Get all categories
export const getAllCategories = async () => {
  try {
    const res = await axios.get(`${apiURL}/api/category`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// Get products by category (correct endpoint)
export const getProductsByCategory = async (catId) => {
  try {
    const res = await axios.get(`${apiURL}/api/category/${catId}/products`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// Create a new order (customer)
export const createOrder = async (orderData) => {
  try {
    const jwt = JSON.parse(localStorage.getItem("jwt"));
    let res = await axios.post(
      `${apiURL}/api/order`,
      orderData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt.token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// Get current user's orders
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

// Get order by orderId
export const getOrderById = async (orderId) => {
  try {
    const jwt = JSON.parse(localStorage.getItem("jwt"));
    let res = await axios.get(`${apiURL}/api/order/${orderId}`, {
      headers: {
        Authorization: `Bearer ${jwt.token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getBrainTreeToken = async () => {
  let uId = JSON.parse(localStorage.getItem("jwt")).user._id;
  try {
    let res = await axios.post(`${apiURL}/api/braintree/get-token`, {
      uId: uId,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getPaymentProcess = async (paymentData) => {
  try {
    let res = await axios.post(`${apiURL}/api/braintree/payment`, paymentData);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// Start PayPal payment
export const startPayment = async ({ orderId, amount }) => {
  try {
    const jwt = JSON.parse(localStorage.getItem("jwt"));
    const res = await axios.post(
      `${apiURL}/api/payment/start`,
      { orderId, amount },
      { headers: { Authorization: `Bearer ${jwt.token}` } }
    );
    return res.data; // { payUrl }
  } catch (error) {
    console.error("Error starting payment:", error);
  }
};

// Confirm PayPal payment (callback)
export const confirmPaypalPayment = async (token) => {
  try {
    const res = await axios.post(`${apiURL}/api/payment/paypal/callback`, { token });
    return res.data;
  } catch (error) {
    console.error("Error confirming PayPal payment:", error);
  }
};

// Get payment status
export const getPaymentStatus = async (orderId) => {
  try {
    const jwt = JSON.parse(localStorage.getItem("jwt"));
    const res = await axios.get(
      `${apiURL}/api/payment/status/${orderId}`,
      { headers: { Authorization: `Bearer ${jwt.token}` } }
    );
    return res.data;
  } catch (error) {
    console.error("Error getting payment status:", error);
  }
};

// Cancel order (customer)
export const cancelOrder = async (orderId) => {
  try {
    const jwt = JSON.parse(localStorage.getItem("jwt"));
    const res = await axios.put(
      `${apiURL}/api/order/${orderId}/cancel`,
      {},
      { headers: { Authorization: `Bearer ${jwt.token}` } }
    );
    return res.data;
  } catch (error) {
    console.error("Error cancelling order:", error);
  }
};

// Update delivery status (employee only)
export const updateDeliveryStatus = async (orderId, newStatus) => {
  try {
    const res = await axios.put(
      `${apiURL}/api/order/${orderId}/delivery`,
      { newStatus },
      { headers: { ...getAuthHeader(), "Content-Type": "application/json" } }
    );
    return res.data;
  } catch (error) {
    console.error("Error updating delivery status:", error);
  }
};
