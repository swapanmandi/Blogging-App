import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../store/AuthContext.jsx";

export default function SignIn() {
  const { register, handleSubmit } = useForm();

  const { signin } = useAuth();

  const onSubmit = (data) => {
    signin(data);
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className=" bg-green-200 flex flex-col justify-center items-center  h-2/3 w-2/4 rounded-md py-5">
        <h2 className=" font-medium pb-5">Sign In</h2>
        <form
          className=" flex flex-col justify-center items-center "
          onSubmit={handleSubmit(onSubmit)}
        >
          <label className=" grid grid-cols-3">
            <p className="flex justify-end items-center">Email:</p>
            <input
              className=" bg-cyan-600 rounded-md w-72 outline-none px-2 py-1 m-2"
              type="email"
              {...register("email", { required: true })}
            />
          </label>

          <label className=" grid grid-cols-3">
            <p className="flex justify-end items-center">Password:</p>
            <input
              className=" bg-cyan-600 rounded-md w-72 outline-none px-2 py-1 m-2"
              type="text"
              {...register("password", { required: true })}
            />
          </label>

          <input
            className=" bg-cyan-600 rounded-md w-fit outline-none px-2 py-1 m-2"
            type="submit"
          />
        </form>
        <h2 className=" m-4">
          Don't have Account?
          <Link to={"/signup"}>
            <strong> SignUp </strong>here.
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
