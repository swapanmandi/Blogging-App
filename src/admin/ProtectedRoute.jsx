import React, { useContext } from "react";
import { authContext } from "./store/AuthProvider.jsx";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, setIsAuthenticated, loading } =
    useContext(authContext);

  if (loading) {
    return <div>Loading...</div>;
  } else if (!isAuthenticated) {
    return <Navigate to="/admin/signup" />;
  } else {
    return <>{children}</>;
  }
}
