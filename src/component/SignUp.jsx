import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAuth } from "../store/AuthContext.jsx";

export default function SignUp() {
  const { signup} = useAuth();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    signup(data);
  };

  return (

      <div className=" flex justify-center items-center w-full h-screen">
        <div className=" bg-green-200 w-1/2 h-2/3 flex  flex-col items-center justify-center rounded-md">
          <h2 className=" font-medium m-5">Please Sign Up</h2>

          <form
            className="flex flex-col justify-center items-center h-fit w-fit"
            onSubmit={handleSubmit(onSubmit)}
          >
           <label className=" grid grid-cols-3">
            <p className="flex justify-end items-center">Full Name:</p>
              <input
                className=" bg-cyan-600 rounded-md w-72 outline-none px-2 py-1 m-2"
                type="text"
                {...register("fullName", {
                  required: true,
                  maxLength: 30,
                  pattern: /^[A-Za-z\s]+$/i,
                })}
              />
            </label>

           <label className=" grid grid-cols-3">
            <p className="flex justify-end items-center">Email:</p>
              <input
                className=" bg-cyan-600 rounded-md w-72 outline-none px-2 py-1 m-2"
                type="email"
                {...register("email", {
                  required: true,
                  maxLength: 30,
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Enter a valid email address",
                  },
                })}
              />
            </label>
           <label className=" grid grid-cols-3">
            <p className="flex justify-end items-center">Password:</p>
              <input
                className=" bg-cyan-600 rounded-md w-72 outline-none px-2 py-1 m-2"
                {...register("password", { required: true })}
              />
            </label>
            <input
              className=" bg-cyan-600 rounded-md w-fit outline-none px-2 py-1 m-2"
              type="submit"
            />
          </form>

          <h2 className=" flex m-5 gap-2">
            You have already a account. Please
            <Link to={"/signin"}>
              <strong>Sign In</strong>
            </Link>
          </h2>
          <h2 className="">
            If you want to publish your blog? 
            <Link to={"/admin/signup"}>
              <strong> SignUp </strong>here.
            </Link>
          </h2>
        </div>
      </div>
  );
}
