import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  addToCart,
  get_product,
} from "../../../services/productService/ProductService";
import { Container, Row, Col, Image, Badge, Button } from "react-bootstrap";
import env from "react-dotenv";
import { toast } from "react-toastify";

const Product = () => {
  const [product, setProduct] = useState({});
  const { product_id } = useParams();
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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await get_product(product_id);
        setProduct(response.product[0]);
      } catch (error) {
        console.error("Error fetching product", error);
      }
    };
    fetchData();
  }, [product_id]);
  const server = "http://localhost:3001";
  const handleCard = async (event) => {
    event.preventDefault();
    try {
      const user_id = localStorage.getItem("userID");
      if(user_id!=null){
      const product_id = id;
      const data = { product_id, user_id };
      const response = await addToCart(data);
      console.log(response)
      toast.success(response.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    else {
      toast.info("Please log in first", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    }catch (error) {
      toast.error(error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  return (
    <>
      <Container className="my-5">
        <Row>
          <Col md={6}>
            <Image
              src={`${server}/${product_photo}`}
              alt={product.product_name}
              fluid
            />
          </Col>
          <Col md={6}>
            <h2>{product.product_name}</h2>
            <p>
              <strong>Category:</strong> {product.product_category}
            </p>
            <p>
              <strong>Status:</strong> {product.product_status}
            </p>
            <Button variant="primary" onClick={handleCard}>
              Add to Cart
            </Button>

            <p>
              <strong>Left:</strong> {product.product_left}
            </p>
            <p>
              <strong>Description:</strong> {product.product_description}
            </p>
            <p>
              <strong>Price:</strong> {product.product_price}
            </p>
            <Badge variant="primary">{product.product_slug}</Badge>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Product;
