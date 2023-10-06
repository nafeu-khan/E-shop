import React from "react";
import { Card, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import "./ProductCard.css";
import { addToCart } from "../../../services/productService/ProductService";


const ProductCard = ({ product }) => {
  const {
    id,
    product_name,
    product_slug,
    product_category,
    product_status,
    product_left,
    product_description,
    product_price,
    product_photo,
  } = product;
  const server = "http://localhost:3001";
  const cardTitleStyle = {
    fontSize: "12px",
  };
  const cardStyle = {
    // width: '17rem',
    // height: '25rem', // Set the fixed height of the card
    margin: '0rem',
  };
  const handleCard=async(event)=>{
    event.preventDefault();
    try {
      const user_id = localStorage.getItem("userID");
      const product_id = id;
      const data = { product_id, user_id };
      const response = await addToCart(data);
      console.log(response)
      toast.success(response.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error){
      toast.error(error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }
  const productCard ={
    width: "50rem",
    maxWidth: "100%", 
    height: "95%",
    marginRight: "25px" 
  }
  return (
    <Card style={productCard} > 
      <Card.Img
        variant="top"
        src={`${server}/${product_photo}`}
        alt={product_name}
      />
      <Card.Body className="d-flex flex-column justify-content-between">
        <Card.Title  >{product_name}</Card.Title>
        <Card.Text style={{ marginTop: "auto"}}>Price: {product_price}</Card.Text>
        <Button variant="primary" onClick={handleCard}>Add to Cart</Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;