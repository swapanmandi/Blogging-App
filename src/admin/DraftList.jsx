import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import { deletePost, getDraftPost } from "../api";

export default function DraftList() {
  const [draftList, setDraftList] = useState(null);
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    const draftPost = async () => {
      const result = await getDraftPost();
      setDraftList(result.data.data);
      //toast(result.data.message);
    };
    draftPost();
  }, [isDeleted]);

  const handleDelete = async (id) => {
    try {
      const result = await deletePost(id);
      setIsDeleted(true);
      toast(result.data.message);
    } catch (error) {
      console.log("error to delete post");
      toast(error);
    }
  };

  return (
    <>
      <div className=" bg-slate-800">
        {draftList?.map((item) => (
          <div
            className=" h-10 bg-red-600 rounded-md p-1 w-full m-3 flex justify-around"
            key={item._id}
          >
            <h3 className="">
              <Link to={`/admin/dashboard/blog/post/edit/${item._id}`}>
                {item.title}
              </Link>
            </h3>
            <span>{item.status}</span>
            <span>{item.category}</span>
            <span>
              <Link to={`/admin/dashboard/blog/api/edit/${item._id}`}>
                Edit
              </Link>
            </span>
            <span
              className=" cursor-pointer"
              onClick={() => handleDelete(item._id)}
            >
              Delete
            </span>
          </div>
        ))}
        <ToastContainer />
      </div>
    </>
  );
}
