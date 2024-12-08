import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { getTrendPosts } from "../api/index.js";

export default function MainSidebar() {
  const [trendPosts, setTrendPosts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const result = await getTrendPosts();
        setTrendPosts(result.data?.data);
      } catch (error) {
        console.error("Error to fetch trending posts", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const displayPosts = trendPosts?.slice(0, 5);

  return (
    <>
      {loading ? (
        <div className=" w-full m-2 rounded-xl">
          <div className=" bg-white dark:bg-slate-950 min-h-screen p-3 rounded-md">
            <Skeleton height={30} width={100} />
            {[...Array(6)].map((_, index) => (
              <div className=" flex p-3 items-center" key={index}>
                <Skeleton height={64} width={64} />
                <div className=" p-4 flex flex-col">
                  <Skeleton height={24} width={60} />
                  <Skeleton height={24} width={80} />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-orange-500 w-full">
          <aside className=" w-full dark:bg-slate-950 min-h-screen p-3 rounded-md">
            <div className=" w-full text-wrap">
              <h2 className="  bg-orange-300 font-semibold rounded-md p-1 w-fit">
                Trending Posts
              </h2>
              {displayPosts?.map((item) => (
                <Link
                  key={item._id}
                  className=" lg:w-full bg-slate-200 h-28 m-2 p-1 flex lg:flex items-center lg:flex-row"
                  to={`/blogs/${item._id}`}
                >
                  <div className=" min-w-[30%] w-[30%] h-24 lg:w-[88 px] lg:h-[88px] rounded-md m-1">
                    <img
                      className=" w-full h-full"
                      src={item.featuredImage}
                    ></img>
                  </div>
                  <div className=" bg-purple-500 w-full h-24 rounded-sm text-black m-1">
                    <h2 className=" font-semibold font-serif m-4">
                      {item.title}
                    </h2>
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
