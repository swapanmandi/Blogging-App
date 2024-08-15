import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export default function SignUp() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <>
      <div className=" flex justify-center items-center w-full h-screen">
        <div className=" bg-green-200 rounded-sm w-1/2 h-3/5 flex  flex-col items-center justify-center">
        <h2 className=" m-5">Please Sign Up</h2>
        <img src="" className=" bg-no-repeat"></img>
        <form className="flex flex-col h-fit w-fit"  onSubmit={handleSubmit(onSubmit)}>
          <label>
            First Name:
            <input
             className=" bg-cyan-600 rounded-md w-72 outline-none px-2 m-2"
              type="text"
              {...register("firstName", {
                required: true,
                maxLength: 20,
                pattern: /^[A-Za-z]+$/i,
              })}
            />
          </label>
          <label>
            Last Name:
            <input
            className=" bg-cyan-600 rounded-md w-72 outline-none px-2 m-2"
              type="text"
              {...register("lastName", {
                maxLength: 20,
                pattern: /^[A-Za-z]+$/i,
              })}
            />
          </label>
          <label>
            Email:
            <input
            className=" bg-cyan-600 rounded-md w-72 outline-none px-2 m-2"
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
          <label>
            Password:
            <input
            className=" bg-cyan-600 rounded-md w-72 outline-none px-2 m-2"
             {...register("password", { required: true })} />
          </label>
          <input className=" bg-cyan-600 rounded-md w-72 outline-none px-2 m-2" type="submit" />
        </form>

        <h2 className="m-10">You have already a account. Please <Link to={"/signin"}><strong>Sign In</strong></Link></h2>
        </div>
        
      </div>
    </>
  );
}
