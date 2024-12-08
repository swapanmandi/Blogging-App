import React from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../store/AuthContext.jsx";
import { Link } from "react-router-dom";

export default function Signup() {
  const { register, handleSubmit } = useForm();

  const { adminSignup } = useAuth();

  const handleSignupAdmin = (data) => {
    adminSignup(data);
  };

  return (
    <>
      <div className=" bg-slate-400 h-screen items-center flex justify-center w-screen">
        <div className=" flex flex-col h-3/6 rounded-sm justify-center items-center text-slate-950 bg-red-400 w-5/12">
          <h1 className=" m-3">Sign Up Goes Here</h1>
          <form
            onSubmit={handleSubmit(handleSignupAdmin)}
            className=" flex flex-col"
          >
            <input
              className=" m-2 p-1 rounded-md w-64"
              placeholder="fullName"
              {...register("fullName", { required: true })}
            />
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
          <p>
            You have a account already. please{" "}
            <Link to="/admin/signin">
              <strong>Signin</strong>
            </Link>
          </p>
          <ToastContainer />
        </div>
      </div>
    </>
  );
}
