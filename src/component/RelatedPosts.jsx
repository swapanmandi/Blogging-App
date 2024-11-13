import React from "react";

import { Link } from "react-router-dom";

export default function ({ posts, heading }) {
  const relatedPosts = posts?.slice(0, 3);

  return (
    <>
      <div className=" m-2">
        <h1 className=" font-bold text-lg ml-6 p-1 bg-orange-400 rounded-md w-fit">
          {heading}
        </h1>
        <div className="flex">
          {relatedPosts?.map((item) => (
            <Link to={`/blogs/${item._id}`} key={item._id}>
              <div
                className=" dark:bg-slate-950 dark:text-white w-[260px] h-[340px] p-2 m-2 rounded-md"
              >
                <img
                  className="w-[324px] h-[281px] rounded-md"
                  src={item.featuredImage}
                ></img>
                <h1 className=" font-semibold font-serif">{item.title}</h1>
                <p>{item.tags}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
