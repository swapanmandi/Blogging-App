import React, { useContext, useState} from "react";
import { Navigate, Outlet } from "react-router-dom";
import { PrivateRouteContext } from "../store/PrivateRouteProvider.jsx";

export default function PrivateRoute() {

  const { isAuthenticated, loading } = useContext(PrivateRouteContext);

  if(loading){
    return <div>Loading...</div>
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" />;
}

