import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const ProtectedAc = ({ isLoggedIn, children }) => {
//   const [admin, setAdmin] = useState(false);
//   const isAdmin = localStorage.getItem("isAdmin") === "true";
  // console.log("in proteced ac",isLoggedIn);
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return <div>{children}</div>;
};

export default ProtectedAc;
