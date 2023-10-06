import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import CreateProduct from "./CreateProduct";

const Dashboard = () => {
  return (
    <>
    <h2 >Dashboard</h2>
      <div className="container mt-4">
        <div className="d-flex justify-content-between">
          <Link
            to="/admin/create_product"
            className="btn btn-primary btn-lg mr-2"
          >
            Create Product
          </Link>
          <Link to="/admin/create_category" className="btn btn-success btn-lg">
            Create Category
          </Link>
          <Link to="/admin/create_category" className="btn btn-success btn-lg">
            Select Featured Product
          </Link>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
