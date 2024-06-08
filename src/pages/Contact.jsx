import React from "react";

export default function Contact() {

    const handleSendBtn = (e) =>{
e.preventDefault();
    }

  return (
    <>
      <div>
        <div className=" items-center border dark:text-white">
          <form className=" m-5" onSubmit={handleSendBtn}>
            <h1>Contact Page</h1>
            <div className=" flex flex-col items-center text-center">
              <label>
                Name:
                <input
                  className=" p-1 m-2 rounded-md dark:bg-slate-950"
                  placeholder="Your Name"
                  type="text"
                ></input>
              </label>
              <label>
                Email:
                <input
                  className=' p-1 m-2 rounded-md dark:bg-slate-950'
                  placeholder="Your Email"
                  type="email"
                ></input>
              </label>
              <label className=" flex">
                Message:
                <textarea
                  className=' p-1 m-2 rounded-md w-96 h-60 dark:bg-slate-950'
                  placeholder="Your Message"
                  type="text"
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
