import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {

  return (
    <>
      <div className=" bg-red-600 w-48 h-screen">
        <ul>
          <Link to="/admin/dashboard/list">
            <li className=" bg-slate-100 rounded-md h-8 p-1 m-2">All Posts</li>
          </Link>
          <Link to="/admin/dashboard/create-post">
            <li className=" bg-slate-100 rounded-md h-8 p-1 m-2">
              Create Post
            </li>
          </Link>
          <Link to="/admin/dashboard/draftList">
            <li className=" bg-slate-100 rounded-md h-8 p-1 m-2">Drafts</li>
          </Link>
          
         <Link to="/admin/dashboard/blog/category"> <li className=" bg-slate-100 rounded-md h-8 p-1 m-2">Categories</li></Link>
          <Link to="/admin/dashboard/settings"><li className=" bg-slate-100 rounded-md h-8 p-1 m-2">Settings</li></Link>
         </ul>
      </div>
    </>
  );
}
