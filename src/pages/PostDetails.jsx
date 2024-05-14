import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "../store/PostContext-store";
import { useParams } from "react-router-dom";
import MainSidebar from "../component/MainSidebar";
import RelatedPosts from "../component/RelatedPosts";

export default function Post() {
  const { posts } = useContext(PostContext);
  const [data, setData] = useState(posts);
  const [currDate, setCurrDate] = useState(new Date());

  const { postId } = useParams();

  useEffect(() => {
    setData(posts);
  }, [posts]);

  const viewPost = data.filter((item) => String(item.id) === postId);

  return (
    <>
      <div className="flex">
        <div className=" bg-slate-950 w-8/12  m-4 p-5">
          {viewPost.map((item) => (
            <div className="" key={item.id}>
              <img className=" w-[760px] h-[490px] mb-5" src={item.image}></img>
              <span className=" bg-orange-400 rounded-lg p-1">{item.tags}</span>
              <div className=" p-4">
                <h1 className=" text-xl font-semibold p-3">{item.title}</h1>
                <span className=" p-3">📅 {currDate.toLocaleDateString()}</span>
                <span className="p-3">👨 Admin</span>
                <span className="p-3">💬 0</span>
              </div>
              <p>{item.body}</p>
            </div>
          ))}
        </div>

        <MainSidebar date={currDate} />
      </div>
      <RelatedPosts />
    </>
  );
}
