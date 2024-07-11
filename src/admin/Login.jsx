import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { register, handleSubmit } = useForm();


  const navigate = useNavigate()

  const submit = async (data) => {
    console.log(data);
try {
  
      const response = await axios.post(
        "http://localhost:3000/signin",
        { email: data.email, password: data.password },
        {
          withCredentials: true,
        }
      );
  navigate("/admin/dashboard")
     toast(response.data.data.message)

} catch (error) {
  console.log("Error to log in", error)
  toast(error?.message)
}
  };

  return (
    <div className=" bg-slate-400 h-screen items-center flex justify-center">
      <div className=" flex flex-col h-3/6 rounded-sm justify-center items-center text-slate-950 bg-red-400 w-5/12">
        <h1 className=" m-3">LogIn Goes Here</h1>
        <form onSubmit={handleSubmit(submit)} className=" flex flex-col">
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
