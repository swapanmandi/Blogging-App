import React, { useEffect, useState } from "react";
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

  const { user } = useAuth();

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
    permalinkType = "id",
  } = useSettings()?.settings || {};

  useEffect(() => {
    window.scrollTo(0, 0);
    setData(posts);
  }, [posts]);

  let linkStruct = "slug";
  if (permalinkType === "id") {
    linkStruct = "_id";
  }

  //console.log("per type", permalinkType)
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
        `${
          import.meta.env.VITE_BACKEND_API
        }/api/v1/blog/post/saved-status/${postId}`,
        { withCredentials: true }
      );
      setIsSaved(result.data.data.status);
    };
    user && checkSavedStatus();
  }, [postId]);

  // save post

  const savePost = async () => {
    const result = await axios.post(
      `${
        import.meta.env.VITE_BACKEND_API
      }/api/v1/blog/post/save-post/${postId}`,
      {},
      {
        withCredentials: true,
      }
    );
    //setIsSaved(true)
    setIsSaved(result.data.data.status);
  };

  return (
    <div className=" w-full flex flex-col ">
      <div className=" w-full flex flex-col lg:flex lg:flex-row">
        <div className=" bg-red-500 dark:bg-slate-950 dark:text-white lg:w-10/12 h-fit p-1  m-1 lg:m-2">
          {viewPost.map((item) => (
            <div
              className=" bg-white items-center flex justify-center flex-col"
              key={item._id}
            >
              <img
                className=" max-w-full max-h-96 m-5"
                src={item.featuredImage}
              ></img>

              <div className=" p-4">
                <h1 className=" text-xl font-semibold p-3">{item.title}</h1>
              </div>

              {/* -------------content--------------- */}
              <div className=" m-2">{parse(item.content)}</div>

              <div className=" w-full flex flex-col space-y-2 my-3">
                <div className=" flex justify-between">
                  {showAdminOnPost && (
                    <div className=" flex p-1 m-2  w-fit">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="icon icon-tabler icons-tabler-outline icon-tabler-user"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                        <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                      </svg>
                      <span>Admin</span>
                    </div>
                  )}
                  {showDateOnPost && (
                    <div className=" flex p-1 m-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="icon icon-tabler icons-tabler-outline icon-tabler-calendar-due">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M4 5m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
                        <path d="M16 3v4" />
                        <path d="M8 3v4" />
                        <path d="M4 11h16" />
                        <path d="M12 16m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                      </svg>
                      <span>{formatdDate(item.publishedAt)}</span>
                    </div>
                  )}
                </div>

                <div className="  ">
                  <span className=" m-2 font-medium">Categories:</span>
                  {showCategoryOnPost &&
                    item.category?.map((item) => (
                      <span key={item} className=" rounded-md p-1 m-2">
                        {item}
                      </span>
                    ))}
                </div>

                <div className="  ">
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

              <div className=" w-full  mt-2 items-center flex flex-col p-1  lg:flex justify-around overflow-hidden">
                <div className=" bg-red-400 rounded-md h-10 flex justify-center  items-center w-full lg:w-fit m-3 space-x-5">
                  <div className=" flex p-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="icon icon-tabler icons-tabler-outline icon-tabler-eye"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                      <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
                    </svg>
                   <span> {Math.round(totalViews / 2)}</span>
                  </div>
                  <span className=" cursor-pointer p-2" onClick={savePost}>
                    {isSaved ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="icon icon-tabler icons-tabler-outline icon-tabler-browser-check"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M4 4m0 1a1 1 0 0 1 1 -1h14a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-14a1 1 0 0 1 -1 -1z" />
                        <path d="M4 8h16" />
                        <path d="M8 4v4" />
                        <path d="M9.5 14.5l1.5 1.5l3 -3" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="icon icon-tabler icons-tabler-outline icon-tabler-browser-plus"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M4 4m0 1a1 1 0 0 1 1 -1h14a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-14a1 1 0 0 1 -1 -1z" />
                        <path d="M4 8h16" />
                        <path d="M8 4v4" />
                        <path d="M10 14h4" />
                        <path d="M12 12v4" />
                      </svg>
                    )}
                  </span>
                  <div onClick={postLike} className=" flex p-2 cursor-pointer">
                    {isLiked ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="icon icon-tabler icons-tabler-filled icon-tabler-thumb-up"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M13 3a3 3 0 0 1 2.995 2.824l.005 .176v4h2a3 3 0 0 1 2.98 2.65l.015 .174l.005 .176l-.02 .196l-1.006 5.032c-.381 1.626 -1.502 2.796 -2.81 2.78l-.164 -.008h-8a1 1 0 0 1 -.993 -.883l-.007 -.117l.001 -9.536a1 1 0 0 1 .5 -.865a2.998 2.998 0 0 0 1.492 -2.397l.007 -.202v-1a3 3 0 0 1 3 -3z" />
                        <path d="M5 10a1 1 0 0 1 .993 .883l.007 .117v9a1 1 0 0 1 -.883 .993l-.117 .007h-1a2 2 0 0 1 -1.995 -1.85l-.005 -.15v-7a2 2 0 0 1 1.85 -1.995l.15 -.005h1z" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="icon icon-tabler icons-tabler-outline icon-tabler-thumb-up"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M7 11v8a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-7a1 1 0 0 1 1 -1h3a4 4 0 0 0 4 -4v-1a2 2 0 0 1 4 0v5h3a2 2 0 0 1 2 2l-1 5a2 3 0 0 1 -2 2h-7a3 3 0 0 1 -3 -3" />
                      </svg>
                    )}
                    {totalLikes}
                  </div>

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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="icon icon-tabler icons-tabler-outline icon-tabler-message"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M8 9h8" />
                      <path d="M8 13h6" />
                      <path d="M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-5l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12z" />
                    </svg>{" "}
                    {item.comments?.length}
                  </span>

                  <span
                    className=" p-2 cursor-pointer"
                    onClick={handleShareBtn}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="icon icon-tabler icons-tabler-outline icon-tabler-share-2"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M8 9h-1a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-8a2 2 0 0 0 -2 -2h-1" />
                      <path d="M12 14v-11" />
                      <path d="M9 6l3 -3l3 3" />
                    </svg>
                    {item.shares?.length}
                  </span>
                </div>

                <div className=" flex flex-row">
                  <button
                    disabled={currentIndex === 0}
                    className="  p-2 disabled:text-gray-400 mr-4"
                  >
                    <Link to={`/blogs/${prevPost?.[linkStruct]}`}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="icon icon-tabler icons-tabler-outline icon-tabler-chevrons-left"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M11 7l-5 5l5 5" />
                        <path d="M17 7l-5 5l5 5" />
                      </svg>
                    </Link>
                  </button>

                  <button
                    disabled={currentIndex === data.length - 1}
                    className="  p-2 disabled:text-gray-400 ml-4"
                  >
                    <Link to={`/blogs/${nextPost?.[linkStruct]}`}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="icon icon-tabler icons-tabler-outline icon-tabler-chevrons-right"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M7 7l5 5l-5 5" />
                        <path d="M13 7l5 5l-5 5" />
                      </svg>
                    </Link>
                  </button>
                </div>
              </div>

              {viewComment && <Comment postId={postId} />}
            </div>
          ))}
        </div>

        <div className="">
          <MainSidebar />
          <SavedPosts />
        </div>
      </div>
      <RelatedPosts posts={posts} heading={"Related Posts"} />
      <ToastContainer />
    </div>
  );
}
