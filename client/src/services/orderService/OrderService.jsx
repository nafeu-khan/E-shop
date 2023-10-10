import axios from "axios";
axios.defaults.withCredentials = true;

const baseURL = "http://localhost:3001/api" // process.env.REACT_APP_API;

export const Orders_show=async ()=>{
    const response =await axios.get(`${baseURL}/orders/`);
    return response.data
}
export const Order_info=async (data)=>{
    const response =await axios.post(`${baseURL}/orders/user_info`, data);
    return response.data
}
export const product_order=async (data)=>{
    const response =await axios.post(`${baseURL}/orders/product_orders`, data);
    return response.data
}