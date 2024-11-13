import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/AuthContext.jsx";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const { signinAdmin} = useAuth();
  
  const handleAdminSignin = (data) => {
   
    signinAdmin(data);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className=" bg-slate-400 h-screen items-center flex justify-center w-screen">
      <div className=" flex flex-col h-3/6 rounded-sm justify-center items-center text-slate-950 bg-red-400 w-5/12">
        <h1 className=" m-3">LogIn Goes Here</h1>
        <form
          onSubmit={handleSubmit(handleAdminSignin)}
          className=" flex flex-col"
        >
          <input
            className=" m-2 p-1 rounded-md w-64"
            placeholder="email"
            {...register("email", { required: true })}
          />
          <input
            className=" m-2 p-1 rounded-md w-64"
            placeholder="password"
            {...register("password", { required: true })}
          />
          <input
            className=" m-2 p-1 rounded-md w-64 bg-red-700 text-white"
            type="submit"
          ></input>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}
