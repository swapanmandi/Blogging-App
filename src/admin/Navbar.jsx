import React, { useState } from "react";
import { Link, NavLink} from "react-router-dom";
import { useAuth } from "../store/AuthContext.jsx";

export default function Navbar() {
  const [isClickedMenu, setIsClickedMenu] = useState(false);

  const {token, admin} = useAuth();
  
 
  return (
    <>
      <div className=" bg-slate-800 text-white flex items-center">
        <ol className=" flex  justify-center">
          <li className=" p-4">
            <Link to="/admin">Home</Link>
          </li>
          {!token && !admin && (
            <li className=" p-4">
              <Link to="/admin/signup">SignUp</Link>
            </li>
          )}
          {!token && !admin && (
            <li className=" p-4">
              <NavLink to="/admin/signin">LogIn</NavLink>
            </li>
          )}
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
        <div className=" right-0 pr-10 absolute">
          {token && admin && (
            <div onClick={() => setIsClickedMenu(true)}>
            
              <Link to="/admin/profile">Profile </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
