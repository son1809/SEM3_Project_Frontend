import axios from "axios";
const apiURL = process.env.REACT_APP_API_URL;

export const requestReturnOrReplacement = async ({
  orderId,
  productId,
  reason,
  type  // "return" hoặc "replacement"
}) => {
  try {
    const body = {
      orderId,
      productId,
      reason,
      type
    };
    const res = await axios.post(`${apiURL}/api/returnorreplacement`, body);
    return res.data;
  } catch (error) {
    console.error("Error submitting return/replacement:", error);
  }
};
