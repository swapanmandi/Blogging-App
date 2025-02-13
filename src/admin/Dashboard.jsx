import React, { useEffect, useState } from "react";
import {
  getBlogDashboardCount,
  getCommentDashboardCount,
  getUserDashboardCount,
} from "../api/index.js";

export default function Dashboard() {
  const [userCount, setUserCount] = useState("");
  const [BlogCount, setBlogCount] = useState(null);
  const [CommentCount, setCommentCount] = useState("");

  const getUserCount = async () => {
    const result = await getUserDashboardCount();
    setUserCount(result.data.data);
  };

  const getBlogCount = async () => {
    const result = await getBlogDashboardCount();
    setBlogCount(result.data.data);
  };

  const getCommentCount = async () => {
    const result = await getCommentDashboardCount();
    setCommentCount(result.data.data);
  };

  useEffect(() => {
    Promise.all([getUserCount(), getBlogCount(), getCommentCount()]);
  }, []);

  return (
    <div className=" w-full flex">
      <div className=" relative h-svh w-full flex">
        <div className="  w-full grid grid-cols-2 gap-4 p-2  h-fit lg:grid lg:grid-cols-5">
          <div className="  h-20 items-center flex flex-col bg-slate-300  ">
            <span>All Users</span>
            <span>{userCount}</span>
          </div>

          <div className=" h-20 items-center flex flex-col bg-slate-300  ">
            <span>Published Posts</span>
            <span>{BlogCount?.publishedBlogsCount}</span>
          </div>

          <div className=" h-20 items-center flex flex-col bg-slate-300 ">
            <span>Draft Posts</span>
            <span>
              {BlogCount?.blogsCount - BlogCount?.publishedBlogsCount}
            </span>
          </div>

          <div className=" h-20 items-center flex flex-col bg-slate-300 ">
            <span>Total Comments</span>
            <span>{CommentCount}</span>
          </div>

          <div className=" h-20 items-center flex flex-col bg-slate-300 ">
            Sort By:
            <input className=" bg-slate-300 border-2" type="date"></input>
          </div>
        </div>
      </div>
    </div>
  );
}
