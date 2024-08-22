import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";


export default function Contact() {

  const {register, handleSubmit} = useForm()


    const handleSendMessage = async(data) =>{

      const result = await axios.post("http://localhost:3000/app/message",data,{withCredentials: true})


    }

  return (
    <>
      <div>
        <div className=" p-2 bg-slate-300 text-black md:items-center border dark:text-white dark:bg-slate-900">
          <form className=" m-5" onSubmit={handleSubmit(handleSendMessage)}>
            <h1>Contact Page</h1>
            <div className=" flex flex-col items-center text-center">
              <label>
                Name:
                <input
                  className=" p-1 m-2 rounded-md dark:bg-slate-950"
                  placeholder="Your Name"
                  type="text"
                  {...register("fullName")}
                ></input>
              </label>
              <label>
                Email:
                <input
                  className=' p-1 m-2 rounded-md dark:bg-slate-950'
                  placeholder="Your Email"
                  type="email"
                  {...register("email")}
                ></input>
              </label>
              <label className="flex-col md:flex">
                Message:
                <textarea
                  className=' w-80 p-1 m-2 rounded-md md:w-96 h-60 dark:bg-slate-950'
                  placeholder="Your Message"
                  type="text"
                  {...register("message",{required: true})}
                ></textarea>
              </label>

              <button className=" p-1 rounded-md bg-sky-400 w-20" type="submit" >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
