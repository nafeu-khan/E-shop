import React, { useEffect, useState } from "react";
import {
  getFromCart,
  removeFromCart,
  updateCartQuantity,
} from "../../services/productService/ProductService";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Cart = () => {
  const [cartData, setCartData] = useState([]);
  const [total_price, setTotalPrice] = useState(0);
  const userid = localStorage.getItem("userID");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = { userid: userid };
        const fetchCard = await getFromCart(data);
        setCartData(fetchCard.data);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };
    fetchData();
  }, [userid]);
  const handleIncreaseQuantity = async ({ product_id }) => {
    try {
      await updateCartQuantity({ userid, product_id: product_id, quantity: 1 });
      const fetchCard = await getFromCart({ userid: userid });
      setCartData(fetchCard.data);
    } catch (error) {
      console.error("Error increasing quantity:", error);
    }
  };

  const handleDecreaseQuantity = async (product) => {
    const { product_id, quantity } = product;
    if (quantity > 1) {
      try {
        await updateCartQuantity({
          userid,
          product_id: product_id,
          quantity: -1,
        });
        const fetchCard = await getFromCart({ userid: userid });
        setCartData(fetchCard.data);
      } catch (error) {
        console.error("Error decreasing quantity:", error);
      }
    }
  };

  const handleRemoveFromCart = async (productId) => {
    try {
      await removeFromCart({ userid, product_id: productId });
      const fetchCard = await getFromCart({ userid: userid });
      setCartData(fetchCard.data);
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };
  let total = 0;

  return userid ? (
    <Container className="mt-5">
      <h2 className="mb-4">Shopping Cart</h2>
      {cartData.map((product) => {
        total += product.product_price * product.quantity;
        return (
          <Row key={product.id} className="mb-3 border p-3">
            <Col md={2}>
              <Image
                src={`http://localhost:3001/${product.product_photo}`}
                alt={product.product_name}
                fluid
              />
            </Col>
            <Col md={4}>
              <h4>{product.product_name}</h4>
              <p>{product.product_price}</p>
            </Col>
            <Col md={2}>
              <Button
                variant="outline-primary"
                onClick={() => handleDecreaseQuantity(product)}
              >
                -
              </Button>
              <span className="mx-2">{product.quantity}</span>
              <Button
                variant="outline-primary"
                onClick={() => handleIncreaseQuantity(product)}
              >
                +
              </Button>
            </Col>
            <Col md={2}>
              <p>Total: ${product.product_price * product.quantity}</p>
            </Col>
            <Col md={2}>
              <Button
                variant="danger"
                onClick={() => handleRemoveFromCart(product.id)}
              >
                Remove
              </Button>
            </Col>
          </Row>
        );
      })}
      <Row className="mt-3">
        <Col md={8}>
          <h5>Total Price: ${total.toFixed(2)}</h5>
        </Col>
        <Col md={4}>
          <Button
            variant="primary"
            block
            onClick={() => {
              navigate("/checkout");
            }}
          >
            Checkout
          </Button>
        </Col>
      </Row>
    </Container>
  ) : (
    toast.info("Please log in first to add a product to the cart", {
      position: toast.POSITION.TOP_RIGHT,
    })
  );
};

export default Cart;
