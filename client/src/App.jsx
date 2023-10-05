import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home";
import Account from "./pages/Account";
import Error from "./pages/error";
import Shop from "./pages/Shop";
import NavBar from "./components/NavBar/NavBar";
import Login from "./pages/user/Login";
import { Register } from "./pages/user/Register";
import Protected from "./pages/Protected";
import Admin from "./pages/admin/Admin";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./pages/admin/Dashboard";
import CreateProduct from "./pages/admin/CreateProduct";
import { ToastContainer } from "react-toastify";
import CreateCategory from "./pages/admin/CreateCategory";
import Logout from "./pages/user/logout";
import ProtectedAc from "./components/ProtectedAc";
import Product from "./components/Product/Product";
import Cart from "./components/cart/Cart";
function App() {
  const [isLoggedIn, setisLoggedIn] = useState(
    localStorage.getItem("isLoggedIn")
  );
  const [isAdmin, setisAdmin] = useState(localStorage.getItem("isAdmin"));
  return (
    <>
      <BrowserRouter>
        <NavBar
          isLoggedIn={isLoggedIn}
          setisLoggedIn={setisLoggedIn}
          isAdmin={isAdmin}
          setisAdmin={setisAdmin}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route
            path="/login"
            element={
              <Login setisLoggedIn={setisLoggedIn} isLoggedIn={isLoggedIn} />
            }
          />
          <Route path="/logout" element={<Logout/>} />
          <Route path="/product/:product_id" element={<Product/>}/>
          <Route path="/register" element={<Register/>} />
          <Route path="/cart" element={< Cart/>} />
          <Route
            path="/account/*"
            element={
              <ProtectedAc isLoggedIn={isLoggedIn}>
                <Routes>
                  <Route path="/" element={<Account />} />
                  <Route path="/:userid" element={<Account />} />
                </Routes>
              </ProtectedAc>
            }
          />
          <Route
            path="/admin/*"
            element={
              <Protected isAdmin={isAdmin}>
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/create_product" element={<CreateProduct />} />
                  <Route path="/create_category" element={<CreateCategory />} />
                </Routes>
              </Protected>
            }
          />
          <Route path="/user" element={<Account />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <ToastContainer />;
      </BrowserRouter>
    </>
  );
}

export default App;
