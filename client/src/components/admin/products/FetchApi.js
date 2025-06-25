import axios from "axios";
const apiURL = process.env.REACT_APP_API_URL;

// Helper to get Authorization header
const getAuthHeader = () => {
  const jwt = localStorage.getItem("jwt");
  if (!jwt) return {};
  const token = JSON.parse(jwt).token || jwt;
  return { Authorization: `Bearer ${token}` };
};

// Get all products
export const getAllProduct = async () => {
  try {
    const res = await axios.get(`${apiURL}/api/product`);
    // Backend returns array, wrap in { Products: ... } for compatibility
    return { Products: res.data };
  } catch (error) {
    console.error("Error getting products:", error);
  }
};

// Get product by id
export const getProductById = async (id) => {
  try {
    const res = await axios.get(`${apiURL}/api/product/${id}`);
    return { Product: res.data };
  } catch (error) {
    console.error("Error fetching product by ID:", error);
  }
};

// Create product (admin/employee only)
export const createProduct = async (product) => {
  const data = {
    name: product.pName,
    description: product.pDescription,
    price: Number(product.pPrice),
    imageUrl: product.pImage, // Should be a string URL
    categoryId: Number(product.pCategory),
    warrantyPeriod: Number(product.pWarrantyPeriod),
    inventoryQuantity: Number(product.pQuantity),
  };
  try {
    const res = await axios.post(
      `${apiURL}/api/product`,
      data,
      { headers: { ...getAuthHeader(), "Content-Type": "application/json" } }
    );
    return res.data;
  } catch (error) {
    console.error("Error creating product:", error);
  }
};

// Edit product (admin/employee only)
export const editProduct = async (product) => {
  const data = {
    name: product.pName,
    description: product.pDescription,
    price: Number(product.pPrice),
    imageUrl: product.pImage,
    warrantyPeriod: Number(product.pWarrantyPeriod),
    categoryId: Number(product.pCategory),
    inventoryQuantity: Number(product.pQuantity),
  };
  try {
    const res = await axios.put(
      `${apiURL}/api/product/${product.pId}`,
      data,
      { headers: { ...getAuthHeader(), "Content-Type": "application/json" } }
    );
    return res.data;
  } catch (error) {
    console.error("Error editing product:", error);
  }
};

// Delete product (admin/employee only)
export const deleteProduct = async (id) => {
  try {
    await axios.delete(
      `${apiURL}/api/product/${id}`,
      { headers: getAuthHeader() }
    );
    return { success: true };
  } catch (error) {
    console.error("Error deleting product:", error);
    return { error: "Delete failed" };
  }
};

// Get products by category
export const productByCategory = async (catId) => {
  try {
    const res = await axios.get(`${apiURL}/api/product/category/${catId}`);
    return { Products: res.data };
  } catch (error) {
    console.error("Error getting products by category:", error);
  }
};

// Get products by price range
export const productByPrice = async (min, max) => {
  try {
    const res = await axios.get(`${apiURL}/api/product/price?min=${min}&max=${max}`);
    return { Products: res.data };
  } catch (error) {
    console.error("Error getting products by price:", error);
  }
};
