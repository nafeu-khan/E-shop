import React, { useState, useEffect } from "react";
import { Carousel, Container, Row, Col, Card, Button } from "react-bootstrap";
import { getFeatured } from "../../services/productService/ProductService";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTruck,
  faClock,
  faShieldAlt,
} from "@fortawesome/free-solid-svg-icons";
import "font-awesome/css/font-awesome.min.css";
import "react-multi-carousel/lib/styles.css";
import "./Home.css";
import ProductCard from "../../components/Product/ProductCard/ProductCard";
import { FaFacebook, FaPhone, FaLinkedin } from "react-icons/fa";
import Footer from "../../components/footer/Footer";
import ProductSlider from "../../components/Product/ProductSlider";
const Home = () => {
  const navigate = useNavigate();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const featured = await getFeatured();
        setFeaturedProducts(featured.data);
      } catch (error) {
        console.error("Error fetching featured data:", error);
      }
    };
    fetchData();
  }, []);
 

  return (
    <>
      <section className="banner text-center d-flex align-items-center">
        <Container className="bannerContainer">
          <div className="bannerContent">
            <h2>Welcome to My E-commerce Store</h2>
            <p>Discover our latest products and deals!</p>
            <Button
              variant="primary"
              onClick={() => {
                navigate(`/shop`);
              }}
            >
              Shop Now
            </Button>
          </div>
        </Container>
      </section>
      <h2 className="text-center mt-5 mb-4">Featured Products</h2>
      <div >
          <ProductSlider products={featuredProducts}/>
      </div>
      <br />
      <br />
      <br />
      <br />
      <section className="features mt-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={4} className="text-center">
              <div className="feature">
                <FontAwesomeIcon icon={faTruck} className="feature-icon" />
                <h3>24/7 Fast Delivery</h3>
                <p>
                  Fast and reliable delivery services available round the clock.
                </p>
              </div>
            </Col>
            <Col md={4} className="text-center">
              <div className="feature">
                <FontAwesomeIcon icon={faClock} className="feature-icon" />
                <h3>Quick Checkout</h3>
                <p>
                  Effortless and quick checkout process for a seamless shopping
                  experience.
                </p>
              </div>
            </Col>
            <Col md={4} className="text-center">
              <div className="feature">
                <FontAwesomeIcon icon={faShieldAlt} className="feature-icon" />
                <h3>Secure Payments</h3>
                <p>
                  Safe and secure payment methods to protect your transactions.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <br />
      <br />
      <br />
      <br />
      <Footer />
    </>
  );
};

export default Home;
