import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "../store/PostContext-store";
import { Link } from "react-router-dom";

export default function PostList() {
  //for geting data
  const { posts } = useContext(PostContext);
  const { loading } = useContext(PostContext);
  const [currDate, setCurrDate] = useState(new Date());

 

  return (
    <>
      <div className="">
        {posts.map((item) => (
          <Link to={`blogs/${item.id}`}>
            <div
              className=" flex bg-slate-950 p-4 text-md m-4 rounded-xl"
              key={item.id}
            >
              <img className=" w-[324px] h-[281px]" src={`${item.image}`}></img>
              <div className=" p-3">
                <span className=" bg-amber-400 rounded-md p-2 font-semibold">
                  {item.tags}
                </span>
                <div className=" p-4">
                  <h1 className=" text-xl font-semibold p-3">{item.title}</h1>
                  <span className=" p-3">
                    📅 {currDate.toLocaleDateString()}
                  </span>
                  <span className="p-3">👨 Admin</span>
                  <span className="p-3">💬 0</span>
                </div>
                <p>{item.body}</p>
                <h3 className=" font-semibold">Read More</h3>
              </div>
            </div>
          </Link>
        ))}
        
      </div>
    </>
  );
}
