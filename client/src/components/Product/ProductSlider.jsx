import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import env from "react-dotenv";
import { addToCart } from "../../services/productService/ProductService";
import { toast } from "react-toastify";
// import "../Product/Product/product.css";
import ProductCard from "./ProductCard/ProductCard";

const ProductSlider = ({ products }) => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 8,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };
  const card={
    height:"calc(100% - 15px)",
    marginBottom: "15px"
}
  return (
    <>
      <Carousel responsive={responsive}>
        {products.map((product) => (
          <Link
            key={product.id}
            style={{ textDecoration: "none" }}
            to={`/product/${product.id}`}
          >
            <ProductCard product={product} />
          </Link>
        ))}
      </Carousel>
    </>
  );
};

export default ProductSlider;
