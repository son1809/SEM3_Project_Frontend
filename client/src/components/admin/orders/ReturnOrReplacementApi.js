import axios from "axios";
const apiURL = process.env.REACT_APP_API_URL;

// Create return/replacement request (Customer only)
export const requestReturnOrReplacement = async ({ orderId, productId, requestType }) => {
  try {
    const jwt = JSON.parse(localStorage.getItem("jwt"));
    const res = await axios.post(
      `${apiURL}/api/returnorreplacement`,
      { orderId, productId, requestType },
      { headers: { Authorization: `Bearer ${jwt.token}` } }
    );
    return res.data;
  } catch (error) {
    console.error("Error submitting return/replacement:", error);
  }
};

// Get all return/replacement requests (Admin only)
export const getAllReturnOrReplacement = async () => {
  try {
    const jwt = JSON.parse(localStorage.getItem("jwt"));
    const res = await axios.get(`${apiURL}/api/returnorreplacement`, {
      headers: { Authorization: `Bearer ${jwt.token}` }
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching all return/replacement:", error);
  }
};

// Update approval status (Admin only)
export const updateReturnOrReplacementStatus = async (id, status) => {
  try {
    const jwt = JSON.parse(localStorage.getItem("jwt"));
    const res = await axios.put(
      `${apiURL}/api/returnorreplacement/${id}/status`,
      { status },
      { headers: { Authorization: `Bearer ${jwt.token}` } }
    );
    return res.data;
  } catch (error) {
    console.error("Error updating return/replacement status:", error);
  }
};

// Get own return/replacement requests (Customer only)
export const getMyReturnOrReplacement = async () => {
  try {
    const jwt = JSON.parse(localStorage.getItem("jwt"));
    const res = await axios.get(`${apiURL}/api/returnorreplacement/my`, {
      headers: { Authorization: `Bearer ${jwt.token}` }
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching my return/replacement:", error);
  }
};
