import React, { useContext } from "react";
import { PostContext } from "../store/PostContext-store";
import { Link } from "react-router-dom";

export default function () {

    const {posts} = useContext(PostContext)
    const relatedPosts = posts.slice(0, 3)

  return (
    <>
      <div className=" m-2">
        <h1 className=" font-bold text-lg ml-6 p-1 bg-orange-400 rounded-md w-fit">Related Posts</h1>
        <div className="flex">
        {
            relatedPosts.map(item => (
                <Link to={`/relatedPosts/${item.id}`}>
        <div className=" bg-white dark:bg-slate-950 dark:text-white w-[260px] h-[320px] p-2 m-2 rounded-md">
            <img className="w-[230px] h-[160px] rounded-md" src={item.image}></img>
            <h1>{item.title}</h1>
            <p>{item.tags}</p>
            </div>
            </Link>
            ))
        }
      </div>
      </div>
    </>
  );
}
