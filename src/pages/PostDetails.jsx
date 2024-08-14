import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "../store/PostContext-store";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import MainSidebar from "../component/MainSidebar";
import RelatedPosts from "../component/RelatedPosts";
import SocialShare from "../component/SocialShare";
import parse from "html-react-parser";
import ShareModal from "../component/ShareModal.jsx";
import axios from "axios";

export default function Post() {
  const { posts } = useContext(PostContext);
  const [data, setData] = useState(posts);
  const [currDate, setCurrDate] = useState(new Date());
  const [viewComment, setViewComment] = useState(false);
  const [isOpenedShareModal, setIsOpenedShareModel] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeStatus, setLikeStatus] = useState(isLiked);
  const [totalLikes, setTotalLikes] = useState(0)

  const { postId } = useParams();
  const location = useLocation();
  const newUrl = location.pathname.split("/")[1];

  const nevigate = useNavigate();

  useEffect(() => {
    setData(posts);
  }, [posts]);

  const viewPost = data.filter((item) => String(item._id) === postId);
  const currentIndex = data.findIndex((item) => String(item._id) === postId);

  const prevPost = data[currentIndex - 1];
  const nextPost = data[currentIndex + 1];

  const handleShareBtn = () => setIsOpenedShareModel(!isOpenedShareModal);

  const clickCommentHandler = () => {
    if (viewComment) {
      setViewComment(false);
    } else {
      setViewComment(true);
    }
  };

  //like api

  const postLike = async () => {
    const like = await axios.post(
      `http://localhost:3000/app/post/like/${postId}`,
      {},
      {
        withCredentials: true,
      }
    );
    setLikeStatus(!likeStatus);
  };

  //fetch like status and number

  useEffect(() => {
    const handleLikeStatus = async () => {
      const result = await axios.get(
        `http://localhost:3000/app/post/liked/${postId}`,
        {
          withCredentials: true,
        }
      );
      setIsLiked(result.data.data.status);
      setTotalLikes(result.data.data.noOfLikes)
    };
    handleLikeStatus();
  }, [postId]);

  return (
    <>
      <div className="flex">
        <div className=" bg-white dark:bg-slate-950 dark:text-white w-8/12  m-4 p-5">
          {viewPost.map((item) => (
            <div className="" key={item._id}>
              <img
                className=" w-[760px] h-[490px] mb-5"
                src={item.featuredImage}
              ></img>
              <span className=" bg-orange-400 rounded-lg p-1">{item.tags}</span>

              <SocialShare
                url={`http://localhost:5173/${location.pathname}`}
                title={item.title}
                onClose={handleShareBtn}
              />

              <div className=" p-4">
                <h1 className=" text-xl font-semibold p-3">{item.title}</h1>
                <span className=" p-3">📅 {item.createddAt}</span>

                <span className="p-3">👨 Admin</span>
              </div>

              {/* -------------content--------------- */}
              <div>{parse(item.content)}</div>

              <div className=" m-3">
                <span onClick={postLike} className=" p-3 cursor-pointer">
                  {likeStatus || isLiked ? "💙" : "🤍"}
                  {totalLikes}
                </span>
                <span className=" p-3 cursor-pointer" onClick={handleShareBtn}>
                  ↪️{item.shares?.length}
                </span>

                {isOpenedShareModal && (
                  <ShareModal
                    postUrl={`http://localhost:5173/blogs/${item._id}`}
                    postTitle={item.title}
                    onClose={handleShareBtn}
                  />
                )}

                <span
                  className="p-3 cursor-pointer"
                  onClick={clickCommentHandler}
                >
                  {" "}
                  💬 {item.comments?.length}
                </span>
              </div>
              {viewComment && (
                <div className=" m-3 p-1 border-slate-400 border-2 rounded-md">
                  <h3 className=" font-semibold p-3">Comments</h3>
                  {item.comments?.length
                    ? item.comments?.map((item, index) => (
                        <div key={index} className="flex items-center">
                          {item.userId}:<p className=" p-3">{item.comment}</p>
                        </div>
                      ))
                    : "No Comments!"}
                </div>
              )}
            </div>
          ))}

          <div className=" bg-red-500 rounded-md w-fit m-3">
            <Link to={`/blogs/${prevPost?._id}`}>
              <button
                disabled={currentIndex === 0}
                className="p-2 disabled:text-gray-400"
              >
                Previous
              </button>
            </Link>

            <Link to={`/blogs/${nextPost?._id}`}>
              <button
                disabled={currentIndex === data.length - 1}
                className=" p-2 disabled:text-gray-400"
              >
                Next
              </button>
            </Link>
          </div>
        </div>

        <MainSidebar date={currDate} />
      </div>
      <RelatedPosts />
    </>
  );
}
