import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../store/AuthContext.jsx";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const { adminSignin } = useAuth();

  const handleAdminSignin = (data) => {
    adminSignin(data);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className=" bg-slate-800 h-screen items-center flex justify-center w-screen">
      <div className=" flex flex-col h-3/6 justify-center items-center text-slate-950 bg-green-400 w-5/12 rounded-md">
        <h1 className=" font-medium m-3">LogIn Goes Here</h1>
        <form
          onSubmit={handleSubmit(handleAdminSignin)}
          className=" flex flex-col"
        >
          <input
            className=" m-2 p-1 rounded-md w-64 outline-none"
            placeholder="Email"
            {...register("email", { required: true })}
          />
          <input
            className=" m-2 p-1 rounded-md w-64 outline-none"
            placeholder="Password"
            {...register("password", { required: true })}
          />
          <input
            className=" m-2 p-1 rounded-md w-64 bg-red-700 text-white"
            type="submit"
          ></input>
        </form>
        <ToastContainer />
        <p>
          Dont have account. please{" "}
          <Link to="/admin/signup">
            <strong>Sign up</strong>
          </Link>
        </p>
      </div>
    </div>
  );
}
