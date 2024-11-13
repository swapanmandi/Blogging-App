import React, { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
//import { useAuth } from "../store/AuthContext";

export default function PrivateRoute() {
   //const { user, token, loading, setLoading } = useAuth()
   //console.log(token)


  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Simulate loading phase
    const loadAuthData = () => {
      try {
        const _token = localStorage.getItem("token");
        const _user = JSON.parse(localStorage.getItem("user") || "null");

        if (_token && _user?._id && _user.role === "user") {
          setToken(_token);
          setUser(_user);
          console.log("Loaded token and user from storage on mount");
        } else {
          console.log("No valid token or user found");
        }
      } catch (error) {
        console.error("Error loading auth data", error);
      } finally {
        setLoading(false); // Stop loading after data fetch
      }
    };

    loadAuthData();
  }, []);

  if (loading) {
    return <div>Loading... Auth</div>;
  }

  return token && user?._id ? <Outlet /> : <Navigate to="/signin" />;
}
