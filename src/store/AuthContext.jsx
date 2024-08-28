import axios from "axios";
import React, { useState, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const signin = async (data) => {
    try {
      const result = await axios.post("http://localhost:3000/signin", data, {
        withCredentials: true,
      });
      navigate("/");
    } catch (error) {
      console.error("An error occured during sign in", error);
    } finally {
      setLoading(false);
    }
  };

  const signout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/signout",
        {},
        {
          withCredentials: true,
        }
      );
      //console.log(response.data.data.role)
      if (response.data.data.role === "admin") {
        navigate("/admin/login");
      } else {
        navigate("/");
      }

      setIsAuthenticated(false);
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      toast(response.data.data.message);
    } catch (error) {
      console.log("Error to log out", error);
      toast(error?.message);
    }
  };

  // check protected
  useEffect(() => {
    const checkAuth = async () => {
     try {
       const result = await axios.get("http://localhost:3000/protected", {
         withCredentials: true,
       });
       //console.log("api calling for auth");
       setIsAuthenticated(result.data.data.status);
     } catch (error) {
      console.error("Error to check authentication")
     }finally{
      setLoading(false)
     }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        loading,
        setLoading,
        signin,
        signout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthContextProvider };
