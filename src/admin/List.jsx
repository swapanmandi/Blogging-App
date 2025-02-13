import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { deletePost, publishedPosts } from "../api/index.js";

export default function List() {
  const [editList, setEditList] = useState(null);
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    const list = async () => {
      const response = await publishedPosts();
      toast(response.message);
      //console.log("li", response.data.data);
      setEditList(response.data.data);
    };
    list();
  }, [isDeleted]);

  // delete

  const handleDelete = async (id) => {
    try {
      const result = await deletePost(id);
      toast(result.data.message);
      setIsDeleted(true);
    } catch (error) {
      console.log("error to delete post", error);
    }
  };

  const formatDate = (e) => {
    const date = new Date(e);
    const dd = date.getDate().toString().padStart(2, "0");
    const mm = (date.getMonth() + 1).toString().padStart(2, "0");
    const yyyy = date.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  };

  return (
    <div className=" w-full h-full ">
      <div className=" bg-slate-500 grid grid-cols-5 gap-2 m-1">
        <div className=" bg-slate-50 text-center cursor-pointer">Title</div>
        <div className="bg-slate-50 text-center cursor-pointer">
          Published Date
        </div>
        <div className=" bg-slate-50 text-center cursor-pointer">Category</div>
        <div className="bg-slate-50 text-center cursor-pointer">Edit</div>
        <div className=" bg-slate-50 text-center cursor-pointer">Delete</div>
      </div>

      {editList?.map((item) => (
        <div
          className=" h-fit text-black bg-slate-300 m-1 my-2 flex justify-around"
          key={item._id}
        >
          <h3 className=" w-80">{item.title}</h3>
          <span>{formatDate(item.publishedAt)}</span>
          <div className=" w-60">
            <span className="">{item.category}</span>
          </div>
          <span>
            <Link to={`/admin/dashboard/blog/post/edit/${item._id}`}>Edit</Link>
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
  );
}
