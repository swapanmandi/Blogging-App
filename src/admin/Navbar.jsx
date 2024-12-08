import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../store/AuthContext.jsx";

export default function Navbar({showSidebar, setShowSidebar}) {
  const [isClickedMenu, setIsClickedMenu] = useState(false);

  const { token, admin } = useAuth();


  const handleSidebar = () =>{
    setShowSidebar(!showSidebar)
  }
  return (
    <>
      <div className=" bg-slate-800 text-white flex items-center">
        <ol className=" flex  justify-center">
          <li className=" p-4" onClick={handleSidebar}>{showSidebar ? <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg> : <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-menu-2"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 6l16 0" /><path d="M4 12l16 0" /><path d="M4 18l16 0" /></svg>}</li>
          <li className=" p-4">
            <Link to="/admin/dashboard">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                class="icon icon-tabler icons-tabler-outline icon-tabler-home"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M5 12l-2 0l9 -9l9 9l-2 0" />
                <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
                <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
              </svg>
            </Link>
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
            <Link to="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                class="icon icon-tabler icons-tabler-outline icon-tabler-world-www"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M19.5 7a9 9 0 0 0 -7.5 -4a8.991 8.991 0 0 0 -7.484 4" />
                <path d="M11.5 3a16.989 16.989 0 0 0 -1.826 4" />
                <path d="M12.5 3a16.989 16.989 0 0 1 1.828 4" />
                <path d="M19.5 17a9 9 0 0 1 -7.5 4a8.991 8.991 0 0 1 -7.484 -4" />
                <path d="M11.5 21a16.989 16.989 0 0 1 -1.826 -4" />
                <path d="M12.5 21a16.989 16.989 0 0 0 1.828 -4" />
                <path d="M2 10l1 4l1.5 -4l1.5 4l1 -4" />
                <path d="M17 10l1 4l1.5 -4l1.5 4l1 -4" />
                <path d="M9.5 10l1 4l1.5 -4l1.5 4l1 -4" />
              </svg>
            </Link>
          </li>
        </ol>
        <div className=" right-0 pr-10 absolute">
          {token && admin && (
            <div onClick={() => setIsClickedMenu(true)}>
              <Link to="/admin/dashboard/profile">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  class="icon icon-tabler icons-tabler-outline icon-tabler-user"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                  <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
