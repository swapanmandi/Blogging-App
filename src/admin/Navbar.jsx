import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { authContext } from "./store/AuthProvider.jsx";
import Cookies from "js-cookie";

export default function Navbar() {
  const [isClickedMenu, setIsClickedMenu] = useState(false);

  const { setIsAuthenticated } = useContext(authContext);
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/signout",
        {},
        {
          withCredentials: true,
        }
      );
      setIsAuthenticated(false);
      navigate("/admin/login");
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      toast(response.data.data.message);
    } catch (error) {
      console.log("Error to log out", error);
      toast(error?.message);
    }
  };

  return (
    <>
      <div className=" bg-slate-800 text-white flex items-center">
        <ol className=" flex  justify-center">
          <li className=" p-4">
            <Link to="/admin">Home</Link>
          </li>
          <li className=" p-4">
            {" "}
            <Link to="/admin/signup">SignUp</Link>
          </li>
          <li className=" p-4">
            <NavLink to="/admin/login">LogIn</NavLink>
          </li>
          <li className=" p-4">
            <Link to="/">Go to Site</Link>
          </li>
          <li className=" p-4">
            <Link to="/admin/dashboard/list">List</Link>
          </li>
          <li className=" p-4">
            <Link to="/admin/dashboard">Dashboard</Link>
          </li>
        </ol>
        <div
          className=" right-0 pr-10 absolute"
        >
          <div  onClick={() => setIsClickedMenu(true)}>Profile</div>

          <div className={isClickedMenu ? `block bg-slate-600 items-center text-center absolute` : `hidden`}>
            <ol>
              <Link to="/admin/profile">
                
                <li>Profile</li>
              </Link>
              <Link to="">
                
                <li>Setting</li>
              </Link>
              <li className=" p-4 cursor-pointer" onClick={handleLogout}>
                LogOut
              </li>
            </ol>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
