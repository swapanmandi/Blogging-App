import React from "react";

export default function Dashboard() {
  return (
    <>
      <div className=" h-svh w-full flex">
        <div className=" flex justify-around bg-gray-700  w-full h-1/4">
          <div className=" flex flex-col bg-slate-300 h-28 w-40">
            <span>All Users</span>
            <span>0000</span>
          </div>

          <div className=" flex flex-col bg-slate-300 h-28 w-40">
            <span>Published Posts</span>
            <span>0000</span>
          </div>

          <div className=" flex flex-col bg-slate-300 h-28 w-40">
            <span>Draft Posts</span>
            <span>0000</span>
          </div>

          <div className=" flex flex-col bg-slate-300 h-28 w-40">
            <span>Total Comments</span>
            <span>0000</span>
          </div>

          <div className=" bg-slate-300">
            Sort By:
            <input type="date"></input>
          </div>
        </div>
      </div>
    </>
  );
}
