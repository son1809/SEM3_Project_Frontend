import axios from "axios";
const apiURL = process.env.REACT_APP_API_URL;

export const sendFeedback = async (feedbackData) => {
  try {
    const res = await axios.post(`${apiURL}/api/feedback`, feedbackData);
    return res.data;
  } catch (error) {
    console.error("Error sending feedback:", error);
  }
};

export const getAllFeedbacks = async () => {
  try {
    const res = await axios.get(`${apiURL}/api/feedback`);
    return res.data;
  } catch (error) {
    console.error("Error fetching feedbacks:", error);
  }
};
