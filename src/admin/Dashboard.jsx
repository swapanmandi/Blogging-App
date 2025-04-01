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
        <div className="  w-full grid grid-cols-2 gap-4 p-2  h-fit lg:grid lg:grid-cols-3">
          <div className="  h-32 items-center flex flex-col bg-slate-300 rounded-md p-2 gap-4 ">
            <p className=" font-medium">All Users</p>
            <p className=" font-medium">{userCount || 0} </p>
          </div>

          <div className=" h-32 items-center flex flex-col gap-4 bg-slate-300 rounded-md p-2  ">
            <p className=" font-medium">Published Posts</p>
            <p className=" font-medium">
              {BlogCount?.publishedBlogsCount || 0}
            </p>
          </div>

          <div className=" h-32 items-center flex flex-col gap-4 bg-slate-300 rounded-md p-2 ">
            <p className=" font-medium">Draft Posts</p>
            <p className=" font-medium">
              {BlogCount?.blogsCount - BlogCount?.publishedBlogsCount || 0}
            </p>
          </div>

          <div className=" h-32 items-center flex flex-col gap-4 bg-slate-300 rounded-md p-2 ">
            <p className=" font-medium">Total Comment</p>
            <p className=" font-medium">{CommentCount || 0}</p>
          </div>

          <div className=" h-32 items-center flex flex-col gap-4 bg-slate-300 rounded-md p-2 font-medium ">
            Sort By:{" "}
            <input
              className=" bg-slate-300 rounded-md p-2 border-2 outline-none"
              type="date"
            ></input>
          </div>
        </div>
      </div>
    </div>
  );
}
