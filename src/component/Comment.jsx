import axios from "axios";
import React, { useState } from "react";

export default function Comment() {
const [comment, setComment] = useState("")

  const handleCommentInput = (e) =>{
setComment(e.target.value)
  }

  const handleCommentBtn = async() =>{
await axios.post("http://localhost:3000/app/post/comment", {},{
  withCredentials: true
})
  }
  return (
    <>
      <div>
        <div className=" m-3 p-1 border-slate-400 border-2 rounded-md">
          <h3 className=" font-semibold p-1">Comments</h3>

          <div className="flex items-center">
            <span className=" bg-slate-500 rounded-sm pr-1">👨 Mr. John</span>
            <p className=" p-1 bg-slate-300 rounded-sm m-2">
              This is very interesting story!
            </p>
          </div>

          <div>
            <input
            value={comment}
            onChange={handleCommentInput}
              className=" outline-none m-3 mt-3 w-9/12"
              placeholder="Write..."
            ></input>

            <button onClick={handleCommentBtn} className=" bg-slate-900 text-white rounded-md p-1">
              Comment
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
