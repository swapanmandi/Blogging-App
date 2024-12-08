import axios from "axios";
import React, { useState, createContext, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  signinUser,
  signoutUser,
  signupUser,
  signupAdmin,
  signinAdmin,
} from "../api/index.js";

const AuthContext = createContext({
  user: null,
  token: null,
  admin: null,

  signup: async () => {},
  signin: async () => {},
  adminSignup: async () => {},
  adminSignin: async () => {},
  signout: async () => {},
});

const useAuth = () => useContext(AuthContext);

function AuthProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);

  const navigate = useNavigate();
  const check = "auth isworks";

  // user signup

  const signup = async (data) => {
    try {
      setLoading(true);
      await signupUser(data);
      navigate("/signin");
    } catch (error) {
      console.error("Error to sign up.", error);
    } finally {
      setLoading(false);
    }
  };

  // for logging to account
  const signin = async (data) => {
    try {
      setLoading(true);
      const result = await signinUser(data);
      setUser(result.data.data.user);
      setToken(result.data.data.accessToken);
      localStorage.setItem("token", result.data.data.accessToken);
      localStorage.setItem("user", JSON.stringify(result.data.data.user));
      localStorage.setItem("admin", null);
      navigate("/");
    } catch (error) {
      console.error("An error occured during sign in", error);
    } finally {
      setLoading(false);
    }
  };

  // admin signup

  const adminSignup = async (data) => {
    try {
      await signupAdmin(data);
    } catch (error) {
      console.error("eror to register", error);
    }
  };

  // ADMIN LOGIN

  const adminSignin = async (data) => {
    try {
      const response = await signinAdmin(data);
      setAdmin(response.data.data.user);
      setToken(response.data.data.accessToken);
      localStorage.setItem("token", response.data.data.accessToken);
      localStorage.setItem("admin", JSON.stringify(response.data.data.user));
      localStorage.setItem("user", null);
      toast(response.data.data.message);
      navigate("/admin");
    } catch (error) {
      console.error("Error to log in", error);
      toast(error?.message);
    } finally {
      setLoading(false);
    }
  };

  const signout = async () => {
    try {
      setLoading(true);
      const response = await signoutUser();
      //console.log(response.data.data.role)
      if (response.data.data.role === "admin") {
        navigate("/admin/login");
      } else {
        navigate("/signin");
      }

      setToken(null);
      setUser(null);
      localStorage.clear();
      setAuthenticatedUser(false);
      setAuthenticatedAdmin(false);
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      toast(response.data.data.message);
    } catch (error) {
      console.log("Error to log out", error);
      toast(error?.message);
    } finally {
      setLoading(false);
    }
  };

  // check authentication
  useEffect(() => {
    setLoading(true);
    const _token = localStorage.getItem("token");
    const _user = JSON.parse(localStorage.getItem("user") || "null");
    const _admin = JSON.parse(localStorage.getItem("admin") || "null");

    if (_token && _user?._id) {
      //console.log(_user)
      setToken(_token);
      setUser(_user);

      //console.log("Loaded token and user from storage on mount");
    }

    if (_admin && _token) {
      setAdmin(_admin);
      setToken(_token);
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        setLoading,
        loading,
        signin,
        signout,
        user,
        token,
        signup,
        admin,
        adminSignup,
        adminSignin,
        check,
      }}
    >
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider, useAuth };
