import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Navbar, Nav, Form, FormControl, Button, Dropdown } from "react-bootstrap";
import "./NavBar.css";
import axios from "axios";

const NavBar = ({ isLoggedIn, setisLoggedIn }) => {
  const [initialLoad, setInitialLoad] = useState(false);
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (!initialLoad) {
      const isLogged = localStorage.getItem("isLoggedIn") == "true";
      setisLoggedIn(isLogged);
      setInitialLoad(true);
    }
  }, [initialLoad, setisLoggedIn]);
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`/api/products?search=${searchQuery}`);
      setSearchResults(response.data); // Assuming the API returns an array of products
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

 
  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="nav-bar justify-content-center align-items-center">
    <Navbar.Brand as={Link} to="/" className="logo">
      <i className="fas fa-shopping-cart mr-2"></i>
      E-Shop
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav"  className="nav-bar justify-content-center align-items-center">
        <Nav className="mx-auto">
          <Nav.Link as={NavLink} to="/" className="nav-link">
            Home
          </Nav.Link>
          <Nav.Link as={NavLink} to="/shop" className="nav-link">
            Shop
          </Nav.Link>
          <Nav.Link as={NavLink} to="/cart" className="nav-link">
            Cart
          </Nav.Link>
          <Nav.Link as={NavLink} to={`/account/${localStorage.getItem("userID")}`} className="nav-link">
            Account
          </Nav.Link>
          <Nav.Link
            as={NavLink}
            to={isLoggedIn ? "/logout" : "/login"}
            className="nav-link"
            onClick={() => {
              if (isLoggedIn) {
                setisLoggedIn(false);
                localStorage.setItem("isLoggedIn", false);
                localStorage.setItem("isAdmin", false);
                localStorage.setItem("userID", null);
              }
            }}
          >
            {isLoggedIn ? "Logout" : "Login"}
          </Nav.Link>
          {isAdmin ? (
            <Nav.Link as={NavLink} to="/admin/dashboard" style={{color:"Yellow",borderBottom:"5px",borderBottomColor:"white"}} className="nav-link">
              Admin
            </Nav.Link>
          ) : (!isLoggedIn ? (
            <Nav.Link as={NavLink} to="/register" className="nav-link">
              Register
            </Nav.Link>
          ) : null)}
        </Nav>
        <Form className="d-flex" style={{ padding: "5px" }} onSubmit={handleSearch}>
          <FormControl
            type="search"
            placeholder="Search"
            className="mr-2"
            aria-label="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button variant="outline-light" type="submit">
            Search
          </Button>
        </Form>
        {/* {searchQuery && (
          <Dropdown className="search-dropdown">
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Search Results
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {searchResults.map((result) => (
                <Dropdown.Item key={result.id}>
                  <Link to={`/product/${result.id}`}>{result.name}</Link>
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        )} */}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;