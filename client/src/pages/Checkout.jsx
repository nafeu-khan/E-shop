import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import {
  Order_info,
  product_order,
} from "../services/orderService/OrderService";
import { getFromCart } from "../services/productService/ProductService";
import { toast } from "react-toastify";

const Checkout = () => {
  const [customerInfo, setCustomerInfo] = useState({
    customer_name: "",
    customer_email: "",
    customer_address: "",
    customer_phone: "",
    user_id: localStorage.getItem("userID")
  });
  const [cartData, setCartData] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleOrder = async () => {
    const userid = localStorage.getItem("userID");
    try {
      const { order_id } = await Order_info(customerInfo);
      console.log(" order_id ",order_id)
      try {
        const data = { userid: userid };
        const fetchCard = await getFromCart(data);
        console.log(fetchCard)
        setCartData(fetchCard.data);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
      try {
        cartData.map(async (product) => {
            // if(order_id){
          const productData = { ...product, order_id };
          console.log(productData)
          const msz=await product_order(productData);
          console.log(msz.message)
          // else console.log("order_id not found")
        });
      } catch {
        console.error("failed to place products to product_order");
      }
      setShowAlert(true);
    } catch (error) {
      console.error("Error placing order: ", error);
    }
  };

  return (
    <Container className="my-5">
      <h2 className="mb-4">Checkout</h2>
      <Form>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            name="customer_name"
            value={customerInfo.customer_name}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            name="customer_email"
            value={customerInfo.customer_email}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formAddress">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your address"
            name="customer_address"
            value={customerInfo.customer_address}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPhone">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="tel"
            placeholder="Enter your phone number"
            name="customer_phone"
            value={customerInfo.customer_phone}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Button variant="primary" onClick={handleOrder}>
          Place Order
        </Button>
      </Form>

      {showAlert && (
        <Alert variant="success" className="mt-4">
          Order completed! Your products will be delivered soon.
        </Alert>
      )}
    </Container>
  )
};

export default Checkout;
