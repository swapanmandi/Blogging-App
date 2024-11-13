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
    <>
      <div className="w-full h-screen flex justify-center items-center">
        <div className="bg-green-200 h-1/2 w-2/4 flex flex-col justify-center items-center">
          <h2 className=" m-4">Sign In</h2>
          <form
            className=" flex flex-col h-fit w-fit"
            onSubmit={handleSubmit(onSubmit)}
          >
            <label>
              Email:
              <input
                className=" bg-cyan-600 rounded-md w-72 outline-none px-2 m-2"
                type="email"
                {...register("email", { required: true })}
              />
            </label>

            <label>
              Password:
              <input
                className=" bg-cyan-600 rounded-md w-72 outline-none px-2 m-2"
                type="text"
                {...register("password", { required: true })}
              />
            </label>

            <input
              className=" bg-cyan-600 rounded-md w-72 outline-none px-2 m-2"
              type="submit"
            />
          </form>
          <h2 className=" m-8">
            Back to
            <Link to={"/signup"}>
              <strong>SignUp</strong>
            </Link>
          </h2>
        </div>
      </div>
    </>
  );
}
