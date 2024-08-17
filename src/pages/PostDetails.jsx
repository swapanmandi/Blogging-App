import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "../store/PostContext-store";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import MainSidebar from "../component/MainSidebar";
import RelatedPosts from "../component/RelatedPosts";
import SocialShare from "../component/SocialShare";
import parse from "html-react-parser";
import ShareModal from "../component/ShareModal.jsx";
import axios from "axios";
import Comment from "../component/Comment.jsx";

export default function Post() {
  const { posts } = useContext(PostContext);
  const [data, setData] = useState(posts);
  const [currDate, setCurrDate] = useState(new Date());
  const [viewComment, setViewComment] = useState(false);
  const [isOpenedShareModal, setIsOpenedShareModel] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeStatus, setLikeStatus] = useState(false);
  const [totalLikes, setTotalLikes] = useState(0);

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

  //initial fetch like status and total likes

  useEffect(() => {
    const handleLikeStatus = async () => {
      const result = await axios.get(
        `http://localhost:3000/app/post/liked/${postId}`,
        {
          withCredentials: true,
        }
      );
      setIsLiked(result.data.data.status);
      setTotalLikes(result.data.data.noOfLikes);
    };
    handleLikeStatus();
  }, [postId]);

  //like api

  // useEffect(() => {
  //   isLiked && setLikeStatus(true);
  // }, [isLiked]);

  const postLike = async () => {
   
    const result = await axios.post(
      `http://localhost:3000/app/post/like/${postId}`,
      {},
      {
        withCredentials: true,
      }
    );

    setIsLiked(result.data.data.status);
    setTotalLikes((prevLikes) =>
      result.data.data.status ? prevLikes + 1 : prevLikes - 1
    );
  };

  //for counting view
  useEffect(() => {
    const views = async () => {
      await axios.get(`http://localhost:3000/blog/post/views/${postId}`);
      console.log("view");
    };
    views();
  }, []);

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
              <span className=" bg-orange-400 rounded-lg">{item.tags}</span>

              <div className=" p-4">
                <h1 className=" text-xl font-semibold p-3">{item.title}</h1>
                <span className=" p-3">📅 {item.publishedAt}</span>

                <span className="p-3">👨 Admin</span>
              </div>

              {/* -------------content--------------- */}
              <div>{parse(item.content)}</div>

              <div className=" mt-10 items-center flex justify-between">
                <div className=" bg-red-400 h-10 rounded-md w-fit m-3">
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

                <div className=" bg-red-400 rounded-md h-10 flex justify-center  items-center w-fit m-3 space-x-5">
                  <span onClick={postLike} className=" p-2 cursor-pointer">
                    {isLiked ? "💙" : "🤍"}
                    {totalLikes}
                  </span>
                  <span
                    className=" p-2 cursor-pointer"
                    onClick={handleShareBtn}
                  >
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
                    className="p-2 cursor-pointer"
                    onClick={clickCommentHandler}
                  >
                    💬 {item.comments?.length}
                  </span>
                </div>
              </div>

              {viewComment && <Comment postId={postId} />}
            </div>
          ))}
        </div>

        <MainSidebar date={currDate} />
      </div>
      <RelatedPosts posts={posts} heading={"Related Posts"} />
    </>
  );
}
