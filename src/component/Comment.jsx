import React, { useEffect, useState } from "react";
import { createComment, getComment } from "../api/index.js";

export default function Comment({ postId }) {
  const [comment, setComment] = useState("");
  const [getComments, setGetComments] = useState(null);
  const [commentCount, setCommentCount] = useState(0);

  const handleCommentInput = (e) => {
    setComment(e.target.value);
  };

  const handleCommentBtn = async () => {
    await createComment(postId, comment);
    setComment("");
  };

  useEffect(() => {
    const handleGetComments = async () => {
      const result = await getComment(postId);
      //console.log("comments", result.data.data)
      setGetComments(result.data.data.comments);
      setCommentCount(result.data.data.totalComments);
    };
    handleGetComments();
  }, [comment]);

  return (
    <>
      <div>
        <div className=" m-3 p-1 border-slate-400 border-2 rounded-md">
          <h3 className=" font-semibold p-1">Comments {commentCount}</h3>

          {getComments?.map((item) => (
            <div className="flex items-center" key={item._id}>
              <span className=" bg-slate-500 rounded-sm pr-1">
                👨 {item.commentedBy?.fullName}
              </span>
              <p className=" p-1 bg-slate-300 rounded-sm m-2">{item.content}</p>
            </div>
          ))}

          <div>
            <input
              value={comment}
              onChange={handleCommentInput}
              className=" outline-none m-3 mt-3 w-9/12"
              placeholder="Write..."
            ></input>

            <button
              onClick={handleCommentBtn}
              className=" bg-slate-900 text-white rounded-md p-1"
            >
              Comment
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
