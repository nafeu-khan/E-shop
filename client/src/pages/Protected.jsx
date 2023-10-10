import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const Protected = ({ isAdmin, children }) => {
//   const [admin, setAdmin] = useState(false);
//   const isAdmin = localStorage.getItem("isAdmin") === "true";
  // console.log("in proteced",isAdmin);
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }
  return <div>{children}</div>;
};

export default Protected;
