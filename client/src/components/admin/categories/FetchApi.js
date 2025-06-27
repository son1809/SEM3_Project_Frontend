import axios from "axios";
const apiURL = process.env.REACT_APP_API_URL;

const BearerToken = () =>
  localStorage.getItem("jwt")
    ? JSON.parse(localStorage.getItem("jwt")).token
    : false;

const Headers = () => {
  return {
    headers: {
      Authorization: `Bearer ${BearerToken()}`,
    },
  };
};

export const getAllCategory = async () => {
  try {
    let res = await axios.get(`${apiURL}/api/category`, Headers());
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const createCategory = async ({
  name,
  imageFile,
  description,
  status,
}) => {
  let formData = new FormData();
  formData.append("name", name);
  if (imageFile) formData.append("imageUrl", imageFile);
  if (description) formData.append("description", description);
  if (status) formData.append("status", status);

  try {
    let res = await axios.post(
      `${apiURL}/api/category/add`,
      formData,
      Headers()
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateCategory = async (id, { name, imageFile, description, status }) => {
  let formData = new FormData();
  if (name) formData.append("name", name);
  if (imageFile) formData.append("imageUrl", imageFile);
  if (description) formData.append("description", description);
  if (status) formData.append("status", status);

  try {
    let res = await axios.put(
      `${apiURL}/api/category/${id}`,
      formData,
      Headers()
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteCategory = async (id) => {
  try {
    let res = await axios.delete(
      `${apiURL}/api/category/${id}`,
      Headers()
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
