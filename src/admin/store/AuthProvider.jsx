import React, { useEffect, useState } from "react";
import { createContext } from "react";
import axios from "axios";


export const authContext = createContext();

function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authCheck = async () => {
      try {
        const response = await axios.get("http://localhost:3000/protected", {
          withCredentials: true,
        });
       // console.log("auth", response);

        if (response.status === 200) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.log("Error to check authentication");
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    authCheck();
  }, []);

  return (
    <>
      <authContext.Provider
        value={{ isAuthenticated, setIsAuthenticated, loading, setLoading }}
      >
        {children}
      </authContext.Provider>
    </>
  );
}

export { AuthProvider };
