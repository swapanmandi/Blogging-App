import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <>
      <div className=" bg-slate-800 w-fit h-screen">
        <ul>
          <Link to="/admin/dashboard/list">
            <li className="w-fit bg-slate-100 rounded-md p-1 m-2">All Posts</li>
          </Link>
          <Link to="/admin/dashboard/create-post">
            <li className=" w-fit bg-slate-100 rounded-md h-fit p-1 m-2">
              Create Post
            </li>
          </Link>
          <Link to="/admin/dashboard/draftList">
            <li className="w-fit bg-slate-100 rounded-md p-1 m-2">Drafts</li>
          </Link>

          <Link to="/admin/dashboard/blog/category">
            <li className="w-fit bg-slate-100 rounded-md p-1 m-2">
              Categories
            </li>
          </Link>
          <Link to="/admin/dashboard/settings">
            <li className="w-fit bg-slate-100 rounded-md p-1 m-2">Settings</li>
          </Link>
        </ul>
      </div>
    </>
  );
}
