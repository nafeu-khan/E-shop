import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { registerUser } from "../../services/UserService/UserService";

export const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    phone: ""
  });

  const handleInputChange = (event) => {
    setUser((prevState) => {  
      return { ...prevState, [event.target.name]: event.target.value };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await registerUser(user);
      toast.success(response.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      
    } catch (error) {
      toast.success(response.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    setUser({
      name: "",
      email: "",
      password: "",
      address: "",
      phone:""
    });
  };

  return (
    <div className="container center">
      <h1>User Registration</h1>
      <div className="card">
        <form className="registration-form" onSubmit={handleSubmit}>
          <div className="form-control">
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              name="name"
              id="name"
              value={user.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              name="email"
              id="email"
              value={user.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              name="password"
              id="password"
              value={user.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="address">Address: </label>
            <textarea
              name="address"
              id="address"
              value={user.address}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="phone">Phone No: </label>
            <textarea
              name="phone"
              id="phone"
              value={user.phone}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-control">
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
