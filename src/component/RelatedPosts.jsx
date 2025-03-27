import React from "react";

import { Link } from "react-router-dom";

export default function ({ posts, heading }) {
  const relatedPosts = posts?.slice(0, 3);

  return (

      <div className=" relative w-full ">
        <h1 className=" font-bold text-lg p-1 m-2 bg-orange-400 rounded-md w-fit">
          {heading}
        </h1>
        <div className=" w-full h-full flex flex-col justify-center items-center lg:flex lg:flex-row">
          {relatedPosts?.map((item) => (
            <Link
              className=" w-full bg-slate-200  flex flex-col items-center justify-center  dark:bg-slate-900 dark:text-white overflow-hidden p-2 lg:m-2 rounded-md  my-2"
              to={`/blogs/${item._id}`}
              key={item._id}
            >
              <img
                className="w-[254px] h-[290px] rounded-md"
                src={item.featuredImage}
              ></img>
              <h1 className=" w-full h-12 p-2 text-center font-semibold font-serif">
                {item.title}
              </h1>
              {/* <p>{item.tags}</p> */}
            </Link>
          ))}
        </div>
      </div>
  
  );
}
