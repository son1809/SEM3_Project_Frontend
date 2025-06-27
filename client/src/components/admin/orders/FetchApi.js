import axios from "axios";
const apiURL = process.env.REACT_APP_API_URL;

// Helper to get Authorization header
const getAuthHeader = () => {
  const jwt = localStorage.getItem("jwt");
  if (!jwt) return {};
  const token = JSON.parse(jwt).token || jwt;
  return { Authorization: `Bearer ${token}` };
};

// CATEGORY CRUD

// Get all categories
export const getAllCategories = async () => {
  try {
    const res = await axios.get(`${apiURL}/api/category`, {
      headers: getAuthHeader(),
    });
    return res.data;
  } catch (error) {
    console.error("Error getting categories:", error);
  }
};

// Get category by id
export const getCategoryById = async (id) => {
  try {
    const res = await axios.get(`${apiURL}/api/category/${id}`, {
      headers: getAuthHeader(),
    });
    return res.data;
  } catch (error) {
    console.error("Error getting category by id:", error);
  }
};

// Add new category
export const addCategory = async (categoryData) => {
  try {
    const res = await axios.post(`${apiURL}/api/category/add`, categoryData, {
      headers: { ...getAuthHeader(), "Content-Type": "application/json" },
    });
    return res.data;
  } catch (error) {
    console.error("Error adding category:", error);
  }
};

// Update category
export const updateCategory = async (id, categoryData) => {
  try {
    const res = await axios.put(`${apiURL}/api/category/${id}`, categoryData, {
      headers: { ...getAuthHeader(), "Content-Type": "application/json" },
    });
    return res.data;
  } catch (error) {
    console.error("Error updating category:", error);
  }
};

// Delete category
export const deleteCategory = async (id) => {
  try {
    const res = await axios.delete(`${apiURL}/api/category/${id}`, {
      headers: getAuthHeader(),
    });
    return res.data;
  } catch (error) {
    console.error("Error deleting category:", error);
  }
};

// Get products by category (correct endpoint)
export const getProductsByCategory = async (catId) => {
  try {
    const res = await axios.get(`${apiURL}/api/category/${catId}/products`, {
      headers: getAuthHeader(),
    });
    return res.data;
  } catch (error) {
    console.error("Error getting products by category:", error);
  }
};

// Create order
export const createOrder = async (orderData) => {
  try {
    const res = await axios.post(`${apiURL}/api/order`, orderData);
    return res.data;
  } catch (error) {
    console.error("Error creating order:", error);
  }
};

// Get all orders (admin/employee)
export const getAllOrder = async () => {
  try {
    const res = await axios.get(`${apiURL}/api/order`, {
      headers: getAuthHeader(),
    });
    // Wrap in { Orders: ... } for compatibility
    return { Orders: res.data };
  } catch (error) {
    console.error("Error getting all orders:", error);
  }
};

// Get order by id
export const getOrderById = async (id) => {
  try {
    const res = await axios.get(`${apiURL}/api/order/${id}`, {
      headers: getAuthHeader(),
    });
    return res.data;
  } catch (error) {
    console.error("Error getting order by id:", error);
  }
};

// Delete order (if supported)
export const deleteOrder = async (id) => {
  try {
    const res = await axios.delete(`${apiURL}/api/order/${id}`, {
      headers: getAuthHeader(),
    });
    return res.data;
  } catch (error) {
    console.error("Error deleting order:", error);
  }
};

// Update order (if supported)
export const updateOrder = async (id, updateData) => {
  try {
    const res = await axios.put(`${apiURL}/api/order/${id}`, updateData, {
      headers: { ...getAuthHeader(), "Content-Type": "application/json" },
    });
    return res.data;
  } catch (error) {
    console.error("Error updating order:", error);
  }
};

// Get my orders
export const getMyOrders = async () => {
  try {
    const res = await axios.get(`${apiURL}/api/order/my`);
    return res.data;
  } catch (error) {
    console.error("Error getting user orders:", error);
  }
};
