import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import env from "react-dotenv";
import { addToCart } from "../../services/productService/ProductService";
import { toast } from "react-toastify";
import "./product.css";

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
    // fontWeight: "bold", 
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
      console.log("in p slider",id," ",user_id)
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
  return (
    <Card style={cardStyle}> 
      <Card.Img
        variant="top"
        src={`${server}/${product_photo}`}
        alt={product_name}
      />
      <Card.Body>
        <Card.Title style={cardTitleStyle}>{product_name}</Card.Title>
        <Card.Text>Price: {product_price}</Card.Text>
        <Button variant="primary" onClick={handleCard}>Add to Cart</Button>
      </Card.Body>
    </Card>
  );
};

const ProductSlider = ({ products }) => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 10,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 7,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 5,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 5,
    },
  };
  return (
    <div className="product-slider">
      <Carousel responsive={responsive}>
        {products.map((product) => (
          <Link key={product.id} style={{"textDecoration": "none"}} to={`/product/${product.id}`}>
          <ProductCard  product={product} />
          </Link>
        ))}
      </Carousel>
    </div>
  );
};

export default ProductSlider;
