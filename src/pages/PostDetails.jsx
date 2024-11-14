import React, {  useEffect, useState } from "react";
import { usePostContext } from "../store/PostContext-store.jsx";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import MainSidebar from "../component/MainSidebar.jsx";
import RelatedPosts from "../component/RelatedPosts.jsx";
import SocialShare from "../component/SocialShare.jsx";
import parse from "html-react-parser";
import ShareModal from "../component/ShareModal.jsx";
import axios from "axios";
import Comment from "../component/Comment.jsx";
import SavedPosts from "../component/SavedPosts.jsx";
import { useSettings } from "../store/SettingsContext.jsx";
import { useAuth } from "../store/AuthContext.jsx";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Post() {
  const { posts, formatdDate } = usePostContext();
  const [data, setData] = useState(posts);
  const [viewComment, setViewComment] = useState(false);
  const [isOpenedShareModal, setIsOpenedShareModel] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [totalLikes, setTotalLikes] = useState(0);
  const [totalViews, setTotalViews] = useState(0);

  const { user } = useAuth()

  const { postId } = useParams();

  console.log("postId", postId);

  const location = useLocation();
  const newUrl = location.pathname.split("/")[1];

  const nevigate = useNavigate();

  const {
    showCategoryOnPost = true,
    showTagOnPost = true,
    showAdminOnPost = true,
    showDateOnPost = true,
    showTimeOnPost = false,
    permalinkType = "title",
  } = useSettings()?.settings || {};

 
  useEffect(() => {
    window.scrollTo(0, 0);
    setData(posts);
  }, [posts]);

  let linkStruct = "slug";
  if (permalinkType === "id") {
    linkStruct = "_id";
  }

  console.log("per type", permalinkType)
  const viewPost = data.filter((item) => String(item?.[linkStruct]) === postId);

  console.log("post", viewPost);

  const currentIndex = data.findIndex(
    (item) => String(item?.[linkStruct]) === postId
  );

  console.log("index", currentIndex);

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
        `${import.meta.env.VITE_BACKEND_API}/api/v1/blog/post/liked/${postId}`,
        {
          withCredentials: true,
        }
      );
      setIsLiked(result.data.data.status);
      setTotalLikes(result.data.data.noOfLikes);
    };
    user && handleLikeStatus();
  }, [postId]);

  //like api

  const postLike = async () => {
    if (!user) {
      toast("You have not Logged in.");
      return;
    }

    try {
      const result = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/api/v1/blog/post/like/${postId}`,
        {},
        {
          withCredentials: true,
        }
      );

      setIsLiked(result.data.data.status);
      setTotalLikes((prevLikes) =>
        result.data.data.status ? prevLikes + 1 : prevLikes - 1
      );
    } catch (error) {
      console.error("Error Liking the Post", error);
    }
  };

  //for counting view
  useEffect(() => {
    const views = async () => {
      const result = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/api/v1/blog/post/views/${postId}`
      );
      setTotalViews(result.data.data.views);
    };
    user && views();
  }, []);

  // fetch initial save status

  useEffect(() => {
    const checkSavedStatus = async () => {
      const result = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/api/v1/blog/post/saved-status/${postId}`,
        { withCredentials: true }
      );
      setIsSaved(result.data.data.status);
    };
    user && checkSavedStatus();
  }, [postId]);

  // save post

  const savePost = async () => {
    const result = await axios.post(
      `${import.meta.env.VITE_BACKEND_API}/api/v1/blog/post/save-post/${postId}`,
      {},
      {
        withCredentials: true,
      }
    );
    //setIsSaved(true)
    setIsSaved(result.data.data.status);
  };

  return (
    <>
      <div className="flex">
        <div className=" bg-white dark:bg-slate-950 dark:text-white w-10/12  m-4 p-5">
          {viewPost.map((item) => (
            <div className="" key={item._id}>
              <img
                className=" w-[760px] h-[490px] mb-5"
                src={item.featuredImage}
              ></img>

              <div className=" p-4">
                <h1 className=" text-xl font-semibold p-3">{item.title}</h1>
              </div>

              {/* -------------content--------------- */}
              <div>{parse(item.content)}</div>

              <div className=" flex flex-col my-3">
                <div className=" flex">
                  {showAdminOnPost && (
                    <span className="p-1 m-2  w-fit">👨 Admin</span>
                  )}
                  {showDateOnPost && (
                    <span className=" p-1 m-2">
                      📅 {formatdDate(item.publishedAt)}
                    </span>
                  )}

                  {/* { showTimeOnPost &&  <span className=" p-1 m-2">
                    📅 {formatedDate(item.publishedAt)}
                  </span>} */}

                  {showCategoryOnPost &&
                    item.category?.map((item) => (
                      <span
                        key={item}
                        className=" bg-lime-200 rounded-md p-1 m-2"
                      >
                        {item}
                      </span>
                    ))}
                </div>

                <div>
                  <span className=" m-2 font-medium">Tags:</span>
                  {showTagOnPost &&
                    item.tags?.map((item) => (
                      <span
                        key={item}
                        className=" bg-orange-300 rounded-md m-1 px-1"
                      >
                        {item}
                      </span>
                    ))}
                </div>
              </div>

              <div className=" mt-10 items-center flex justify-between">
                <div className=" bg-red-400 h-10 rounded-md w-fit m-3">
                  <Link to={`/blogs/${prevPost?.[linkStruct]}`}>
                    <button
                      disabled={currentIndex === 0}
                      className="p-2 disabled:text-gray-400 mr-4"
                    >
                      Previous
                    </button>
                  </Link>

                  <Link to={`/blogs/${nextPost?.[linkStruct]}`}>
                    <button
                      disabled={currentIndex === data.length - 1}
                      className=" p-2 disabled:text-gray-400 ml-4"
                    >
                      Next
                    </button>
                  </Link>
                </div>

                <div className=" bg-red-400 rounded-md h-10 flex justify-center  items-center w-fit m-3 space-x-5">
                  <span className=" p-2">👁️ {Math.round(totalViews / 2)}</span>
                  <span className=" cursor-pointer p-2" onClick={savePost}>
                    {isSaved ? "✔" : "⛉"}
                  </span>
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

        <div>
          <MainSidebar />
          <SavedPosts />
        </div>
      </div>
      <RelatedPosts posts={posts} heading={"Related Posts"} />
      <ToastContainer />
    </>
  );
}
