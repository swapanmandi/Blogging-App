import React, { useContext, useState} from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../store/AuthContext.jsx";

export default function PrivateRoute() {

  const { isAuthenticated, loading } = useContext(AuthContext);
 
  console.log("auth status", isAuthenticated)

  if(loading){
    return <div>Loading...</div>
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" />;
}

