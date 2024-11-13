import React from "react";

export default function Footer() {
  return (
    <>
      <footer className="">
        <div className=" flex justify-center bg-orange-400 flex-col lg:w-full lg:flex lg:flex-row lg:justify-around">
          <div className=" text-black items-center flex-col flex justify-center">
            <h3 className=" font-semibold bg-orange-600 h-6 w-fit p-2 items-center flex px-5 -skew-x-6 m-2">Menu</h3>
            
            <ul>
              <li>About</li>
              <li>Blogs</li>
              <li>Latest</li>
            </ul>
          </div>

          <div className=" items-center flex-col flex justify-center  text-black md:flex md:flex-col md:m-2">
            <div className=" border-white md:border-b-2 md:border-solid ">
              <h3 className=" font-semibold bg-orange-600 h-6 w-fit p-2 items-center flex px-5 -skew-x-6 m-2">Latest Blogs</h3>
            </div>
            <ul className=" md:items-center md:flex md:flex-col">
              <li>About</li>
              <li>Blogs</li>
              <li>Latest</li>
            </ul>
          </div>

          <div className="text-black items-center flex-col flex justify-center md:flex md:flex-col">
            <h3 className=" font-semibold bg-orange-600 h-6 w-fit p-2 items-center flex px-5 -skew-x-6 m-2">Scocial</h3>
           
            <ul>
              <li>About</li>
              <li>Blogs</li>
              <li>Latest</li>
            </ul>
          </div>
        </div>
        <div className=" flex bg-slate-700 justify-evenly p-2 dark:bg-slate-500">
         
          <span>Copyright © Swapan Dev. </span>
          <h2>All Rights Reserved.</h2>
        </div>
      </footer>
    </>
  );
}
