import React from "react";
import { BrowserRouter, Route, Routes,Outlet } from "react-router-dom";
import CreateProduct from "./CreateProduct";
import Dashboard from "./Dashboard";

const Admin = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/create_product" element={<CreateProduct />} />
      </Routes>
      {/* <Outlet />  */}
    </>
  );
};

export default Admin;
