import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function AdminPrivateRoute() {
 
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const loadAuthData = () => {
      try {
        const _token = localStorage.getItem("token");
        const _admin = JSON.parse(localStorage.getItem("admin") || "null");


        if (_token && _admin?._id && _admin?.role === "admin") {
          console.log(_token)
          setToken(_token);
          setAdmin(_admin);

        } else {
          console.log("No valid token or admin found");
        }
      } catch (error) {
        console.error("Error loading auth data", error);
      } finally {
        setLoading(false);
      }
    };

    loadAuthData();
  }, []);

  if (loading) {
    return <div>Loading... Auth</div>;
  }

  return token && admin?._id ? <Outlet /> : <Navigate to="admin/signin" />;
}