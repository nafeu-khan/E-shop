import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./NavBar.css";

const NavBar = ({ isLoggedIn, setisLoggedIn}) => {
  const [initialLoad, setInitialLoad] = useState(false);
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  useEffect(() => {
    if (!initialLoad) {
      const isLogged = localStorage.getItem("isLoggedIn") == "true";
      setisLoggedIn(isLogged);
      setInitialLoad(true);
    }
  }, [initialLoad, setisLoggedIn]);
  return (
    <>
      <nav>
        <h1>
          <Link to="/" className="logo">
            E-Shop
          </Link>
        </h1>
        <div className="nav-link">
          <NavLink to="/" className="a">
            Home
          </NavLink>
          <NavLink to="/shop" className="a">
            Shop
          </NavLink>
          <NavLink to="/cart" className="a">
            Cart
          </NavLink>
          <NavLink
            to={`/account/${localStorage.getItem("userID")}`}
            className="a"
          >
            Account
          </NavLink>
          <NavLink
            to={isLoggedIn ? "/logout" : "/login"}
            className="a"
            onClick={
              isLoggedIn
                ? () => {
                    setisLoggedIn(false);
                    localStorage.setItem("isLoggedIn", false);
                    localStorage.setItem("isAdmin", false);
                    localStorage.setItem("userID", null);
                  }
                : null
            }
          >
            {isLoggedIn ? "Logout" : "Login"}
          </NavLink>
          {isLoggedIn && isAdmin ? (
            <NavLink to="/admin/dashboard" className="a">
              Admin
            </NavLink>
          ) : localStorage.getItem("isLoggedIn") ? (
            <></>
          ) : (
            <NavLink to="/register" className="a">
              Register
            </NavLink>
          )
          
          }
        </div>
        <form className="d-flex" style={{ padding: "5px" }} role="search">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button className="btn btn-outline-success" type="submit">
            Search
          </button>
        </form>
      </nav>
    </>
  );
};

export default NavBar;
