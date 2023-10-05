import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginUser } from "../../services/UserService/UserService";
// import { login } from "../../features/userSlice";

const Login = ({ setisLoggedIn, isLoggedIn }) => {
  const navigate = useNavigate();
  const [value, setValue] = useState({
    email: "",
    password: "",
  });
  const [user_info, setUser_info] = useState({});
  const handleInputChange = (event) => {
    setValue((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await loginUser(value);
      if (response.message === "Login successful") {
        setisLoggedIn(true);
        setValue({ email: "", password: "" });
        const userdata=response.user
        // localStorage.setItem({"isLoggedIn": true ,"userID":userdata.id});
        localStorage.setItem("userID",userdata.id)
        localStorage.setItem("isLoggedIn", true )
        setUser_info(response.user);
        toast.success("login successful", {
          position: toast.POSITION.TOP_RIGHT,
        });
        if(userdata.role_id=="admin"){
          localStorage.setItem("isAdmin", true)
          navigate(`/admin/dashboard`, { user_info: response.user });
        }
        else{
          localStorage.setItem("isAdmin", false)
          navigate(`/account/${userdata.id}`, { user_info: response.user });
        }
       
        // const role = response.user.role_id;
        // navigate(`/${role}`, { user_info: response.user });
      }
    } catch (error) {
      toast(error.response.data.error);
    }
  };
  return (
    <>
      <div className="container center">
        <h1>User Login</h1>
        <div className="card">
          <form className="registration-form" onSubmit={handleSubmit}>
            <div className="form-control">
              <label htmlFor="email">Email: </label>
              <input
                type="email"
                name="email"
                id="email"
                value={value.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-control">
              <label htmlFor="password">Password: </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="password must be 6 characters"
                value={value.password}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit" className="btn btn-success">
              Login
            </button>
          </form>

          {/* <button
            onClick={() => {
              toast.success("Success Notification !", {
                position: toast.POSITION.TOP_RIGHT,
              });
            }}
          >
            toggle
          </button>
          <ToastContainer />;
          <article>hello {(isLoggedIn && toast("hi")) || toast("bye")}</article> */}
        </div>
      </div>
    </>
  );
};

export default Login;

/*
Smartphones
Feature Phone
Tablets
Cameras
Trendy Mobile Accessories
Projectors
Projector Screens 
Gaming Console
Audio
Wearable
Laptops
Desktops

*/
