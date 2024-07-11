import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Signup() {
  const { register, handleSubmit } = useForm();

  const submit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/signup",
        {
          fullName: data.fullName,
          email: data.email,
          password: data.password,
        },
        {
          withCredentials: true,
        }
      );

      toast(response.data.data.message);
    } catch (error) {
      console.log("eror to register", error);
      toast(error?.message);
    }
  };

  return (
    <>
      <div className=" bg-slate-400 h-screen items-center flex justify-center">
        <div className=" flex flex-col h-3/6 rounded-sm justify-center items-center text-slate-950 bg-red-400 w-5/12">
          <h1 className=" m-3">Sign Up Goes Here</h1>
          <form onSubmit={handleSubmit(submit)} className=" flex flex-col">
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
          <ToastContainer />
        </div>
      </div>
    </>
  );
}
