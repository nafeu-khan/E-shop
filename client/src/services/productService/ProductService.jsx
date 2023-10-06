import axios from "axios";
axios.defaults.withCredentials = true;

const baseURL = "http://localhost:3001/api" // process.env.REACT_APP_API;

export const getFeatured = async () => {
  const response = await axios.get(`${baseURL}/product/featured_products`);
  return response.data;
};

export const updateCartQuantity = async (data) => {
  const response = await axios.post(`${baseURL}/product/update_cart`,data);
  return response.data;
};
export const removeFromCart = async (data) => {
  const response = await axios.post(`${baseURL}/product/remove_from_cart`,data);
  return response.data;
};
export const getFromCart = async (data) => {
  const response = await axios.post(`${baseURL}/product/get_from_cart`,data);
  return response.data;
};
export const addToCart = async (data) => {
  const response = await axios.post(`${baseURL}/product/add_to_cart`,data);
  return response.data;
};
export const create_category = async (category) => {
  const response = await axios.post(`${baseURL}/product/create_category`, category);
  return response.data;
};
export const get_category = async (category) => {
    const response = await axios.get(`${baseURL}/product/get_category`, category);
    return response.data;
};
export const create_product = async (product) => {
  const response = await axios.post(`${baseURL}/product/create_product`, product);
  return response.data;
};
export const get_products = async (category) => {
    const response = await axios.get(`${baseURL}/product/get_products`, category);
    return response.data;
  };
 export const get_product = async (product_id) => {
    const response = await axios.get(`${baseURL}/product/get_product/${product_id}`,product_id);
    return response.data;
  };