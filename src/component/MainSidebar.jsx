import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "../store/PostContext-store";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

export default function MainSidebar({ date = new Date() }) {
  const { posts, loading } = useContext(PostContext);
  const todayDate = date.toLocaleDateString();
  const latestPost = posts.slice(0, 5);

  return (
    <>
      {loading ? (
         <div className=" w-4/12 m-4 rounded-xl">
        <div className=" bg-white dark:bg-slate-950 min-h-screen p-3 rounded-md">
         <Skeleton height={30} width={100} /> 
         {
        [...Array(6)].map((_, index) => (
          <div
            className=" flex p-3 items-center"
            key={index}
          >
        <Skeleton height={64} width={64}/>
        <div className=" p-4 flex flex-col">
          <Skeleton height={24} width={60}/>
          <Skeleton height={24} width={80}/>
          </div>
          </div>
        ))}
        </div>
        </div>
      ) : (
        <div className=" sm:text-blue-800 md:text-orange-500 lg:text-lime-400 md:w-1/3">
          <aside className=" bg-white dark:bg-slate-950 min-h-screen p-3 rounded-md">
            <div className=" text-wrap">
              <h2 className="  bg-orange-300 font-semibold rounded-md p-1 w-fit">
                Trending Posts
              </h2>
              {latestPost.map((item) => (
                <Link to={`/trending-posts/${item.id}`} key={item.id}>
                  <div className=" flex m-5">
                    <img
                      className=" w-[88px] h-[88px] rounded-md"
                      src={item.image}
                    ></img>
                    <div>
                      <h2 className=" m-4">{item.title}</h2>
                      <span className=" m-4">📅 {todayDate}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
