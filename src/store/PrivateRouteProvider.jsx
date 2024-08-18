import axios from "axios";
import React, { useState, createContext, useEffect } from "react";

const PrivateRouteContext = createContext();

function PrivateRouteProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const privateRoute = async () => {
      try {
        const result = await axios.get("http://localhost:3000/protected", {
          withCredentials: true,
        });

        setIsAuthenticated(result.data.data.status);
        //console.log("auth", result.data.data.status)
      } catch (error) {
        console.error("Error to verify authntication.", error);
      } finally {
        setLoading(false);
      }
    };
    privateRoute();
  }, []);

  return (
    <PrivateRouteContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, loading }}
    >
      {children}
    </PrivateRouteContext.Provider>
  );
}

export { PrivateRouteContext, PrivateRouteProvider };
