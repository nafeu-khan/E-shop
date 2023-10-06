import React, { useState, useEffect } from "react";
import { Carousel, Container, Row, Col, Card, Button } from "react-bootstrap";
import { FaFacebook, FaPhone, FaLinkedin } from "react-icons/fa";
const Footer = () => {
  return (
    <footer
      className="footer text-center py-3"
      style={{ backgroundColor: "#f8f9fa" }}
    >
      <Container>
        <Row>
          <Col md={6}>
            <h5>Contact Us</h5>
            <p>Ghatail, Tangail, Bangladesh</p>
            <p>Email: nafeu@e-shop.com</p>
            <p>Phone: +8801537573258</p>
          </Col>
          <Col md={6}>
            <h5>Follow Us</h5>
            <Button variant="primary" className="m-1">
              <FaFacebook /> Facebook
            </Button>
            <Button variant="info" className="m-1">
              <FaPhone /> Call Us
            </Button>
            <Button variant="primary" className="m-1">
              <FaLinkedin /> LinkedIn
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>&copy; 2023 E-shop. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
