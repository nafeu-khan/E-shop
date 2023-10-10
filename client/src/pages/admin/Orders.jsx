import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import { Orders_show } from "../../services/orderService/OrderService";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Orders_show(); 
        setOrders(response);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchData();
    console.log(orders)
  }, []);

  return (
    <div className="container mt-4">
      <h2>Orders</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer Name</th>
            <th>Customer Email</th>
            <th>Customer Address</th>
            <th>Customer Phone</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Product Price</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              {console.log(order)}
              <td>{order.id}</td>
              <td>{order.customer_name}</td>
              <td>{order.customer_email}</td>
              <td>{order.customer_address}</td>
              <td>{order.customer_phone}</td>
              <td>
                {order.order_products.map((product, index) => (
                  <div key={index}>{product.product_name}</div>
                ))}
              </td>
              <td>
                {order.order_products.map((product, index) => (
                  <div key={index}>{product.quantity}</div>
                ))}
              </td>
              <td>
                {order.order_products.map((product, index) => (
                  <div key={index}>${product.product_price}</div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Orders;
