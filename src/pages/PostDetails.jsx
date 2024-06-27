import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "../store/PostContext-store";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import MainSidebar from "../component/MainSidebar";
import RelatedPosts from "../component/RelatedPosts";
import SocialShare from "../component/SocialShare";

export default function Post() {
  const { posts } = useContext(PostContext);
  const [data, setData] = useState(posts);
  const [currDate, setCurrDate] = useState(new Date());

  const { postId } = useParams();
  const location = useLocation();
  const newUrl = location.pathname.split("/")[1];

  const nevigate = useNavigate();

  useEffect(() => {
    setData(posts);
  }, [posts]);

  const viewPost = data.filter((item) => String(item.id) === postId);
  const currentIndex = data.findIndex((item) => String(item.id) === postId);

  const handlePostChange = (id) => {
    nevigate(`/${newUrl}/${id}`);
  };

  console.log("url:", location.pathname);

  return (
    <>
      <div className="flex">
        <div className=" bg-white dark:bg-slate-950 dark:text-white w-8/12  m-4 p-5">
          {viewPost.map((item) => (
            <div className="" key={item.id}>
              <img className=" w-[760px] h-[490px] mb-5" src={item.image}></img>
              <span className=" bg-orange-400 rounded-lg p-1">{item.tags}</span>

              <SocialShare
                url={`http://localhost:5173/${location.pathname}`}
                title={item.title}
              />

              <div className=" p-4">
                <h1 className=" text-xl font-semibold p-3">{item.title}</h1>
                <span className=" p-3">📅 {currDate.toLocaleDateString()}</span>
                <span className="p-3">👨 Admin</span>
                <span>👍{item.likes?.length}</span>
                <span>↪️{item.shares?.length}</span>
                <span className="p-3">💬 {item.comments?.length}</span>
              </div>
              <p>{item.body}</p>
              <div>
                <h3 className=" font-semibold">Comments</h3>
                {item.comments?.map((item) => (
                  <p>{item.comment}</p>
                ))}
              </div>
            </div>
          ))}

          <div className=" bg-red-500 rounded-md w-fit m-3">
            <button
              disabled={currentIndex === 0}
              className="p-2 disabled:text-gray-400"
              onClick={() => handlePostChange(String(Number(postId) - 1))}
            >
              Previous
            </button>

            <button
              disabled={currentIndex === data.length - 1}
              onClick={() => handlePostChange(String(Number(postId) + 1))}
              className=" p-2 disabled:text-gray-400"
            >
              Next
            </button>
          </div>
        </div>

        <MainSidebar date={currDate} />
      </div>
      <RelatedPosts />
    </>
  );
}
