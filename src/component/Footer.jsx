import React, { useContext } from "react";
import { PostContext } from "../store/PostContext-store";

export default function Footer() {
  return (
    <>
      <footer className="">
        <div className=" flex justify-center bg-orange-400 m-1 flex-col lg:w-full lg:flex lg:flex-row lg:justify-around">
          <div className=" text-black items-center flex-col flex justify-center">
            <h3 className=" font-semibold">Menu</h3>
            <div className=" bg-white h-[2px] w-12"></div>
            <ul>
              <li>About</li>
              <li>Blogs</li>
              <li>Latest</li>
            </ul>
          </div>

          <div className=" items-center flex-col flex justify-center  text-black md:flex md:flex-col md:m-2">
            <div className=" border-white md:border-b-2 md:border-solid ">
              <h3 className=" font-semibold">Latest Blogs</h3>
            </div>
            <ul className=" md:items-center md:flex md:flex-col">
              <li>About</li>
              <li>Blogs</li>
              <li>Latest</li>
            </ul>
          </div>

          <div className="text-black items-center flex-col flex justify-center md:flex md:flex-col">
            <h3 className=" font-semibold">Scocial</h3>
            <div className=" bg-white h-[2px] w-12"></div>
            <ul>
              <li>About</li>
              <li>Blogs</li>
              <li>Latest</li>
            </ul>
          </div>
        </div>
        <div className=" flex  bg-lime-100 justify-evenly p-2 dark:bg-slate-500">
         
          <span>Copyright © Swapan Dev. </span>
          <h2>All Rights Reserved.</h2>
        </div>
      </footer>
    </>
  );
}
