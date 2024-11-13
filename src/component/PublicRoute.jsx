import React, { useEffect } from "react";
import { useAuth } from "../store/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

export default function PublicRoute({ children }) {
  const { user, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (token && user?._id) {
      navigate("/"); 
    }
  }, [token, user, navigate]);

 
  if (token && user?._id) {
    return null;
  }

  return children;
}
