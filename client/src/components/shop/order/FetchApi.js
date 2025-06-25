import axios from "axios";
const apiURL = process.env.REACT_APP_API_URL;

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
