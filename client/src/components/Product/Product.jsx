import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { get_product } from "../../services/productService/ProductService";
import { Container, Row, Col, Image, Badge } from "react-bootstrap";
import env from "react-dotenv"
const Product = () => {
  const [product, setProduct] = useState({});
  const { product_id } = useParams();
  const {
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
  const server = env.SERVER_LINK
  return (
    <>
    <Container className="my-5">
      <Row>
        <Col md={6}>
          <Image src={`${server}/${product_photo}`} alt={product.product_name} fluid />
        </Col>
        <Col md={6}>
          <h2>{product.product_name}</h2>
          <p>
            <strong>Category:</strong> {product.product_category}
          </p>
          <p>
            <strong>Status:</strong> {product.product_status}
          </p>
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
